import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getSession, getSupabaseAuthClient } from '@/lib/auth/server';
import { getSupabaseServerClient } from '@/lib/supabase';
import { isWriteRole } from '@/lib/auth/roles';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_BYTES = 10 * 1024 * 1024; // 10MB hard cap per file
const ALLOWED_MIME = new Set([
  'application/pdf',
  'image/png',
  'image/jpeg',
  'image/heic',
  'image/webp',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/msword',
  'application/vnd.ms-excel',
  'text/csv',
  'text/plain',
]);

const metadataSchema = z.object({
  entry_id: z.string().uuid().optional().nullable(),
  document_type: z.enum(['receipt', 'invoice', 'contract', 'other']).optional(),
});

export async function POST(request: Request) {
  const session = await getSession();
  if (!session || !isWriteRole(session.role) || !session.organizationId) {
    return NextResponse.json({ error: 'Forbidden.' }, { status: 403 });
  }

  const contentType = request.headers.get('content-type') || '';
  if (!contentType.startsWith('multipart/form-data')) {
    return NextResponse.json({ error: 'Expected multipart/form-data.' }, { status: 400 });
  }

  const form = await request.formData();
  const file = form.get('file');
  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'Missing file.' }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: 'File exceeds 10MB.' }, { status: 413 });
  }
  if (file.type && !ALLOWED_MIME.has(file.type)) {
    return NextResponse.json(
      { error: `Unsupported content-type: ${file.type}` },
      { status: 415 },
    );
  }

  const meta = metadataSchema.safeParse({
    entry_id: form.get('entry_id') || undefined,
    document_type: form.get('document_type') || undefined,
  });
  if (!meta.success) {
    return NextResponse.json({ error: 'Invalid metadata.' }, { status: 422 });
  }

  // Verify the entry belongs to the caller's org before associating.
  if (meta.data.entry_id) {
    const supabase = getSupabaseAuthClient();
    const { data: entry } = await supabase
      .from('journal_entries')
      .select('id, organization_id')
      .eq('id', meta.data.entry_id)
      .maybeSingle();
    if (!entry || entry.organization_id !== session.organizationId) {
      return NextResponse.json({ error: 'Entry not in your organization.' }, { status: 403 });
    }
  }

  // Storage uploads need the service-role client — anon key cannot
  // write to the private bucket. RLS-equivalent checks above are the
  // gate.
  const admin = getSupabaseServerClient();

  const safeName = (file.name || 'attachment').replace(/[^A-Za-z0-9._-]/g, '_').slice(0, 200);
  const storagePath = `${session.organizationId}/${crypto.randomUUID()}-${safeName}`;
  const { error: uploadErr } = await admin.storage
    .from('accounting-attachments')
    .upload(storagePath, file, {
      contentType: file.type || 'application/octet-stream',
      upsert: false,
    });
  if (uploadErr) {
    return NextResponse.json(
      { error: `Upload failed: ${uploadErr.message}` },
      { status: 500 },
    );
  }

  const { data: row, error: insertErr } = await admin
    .from('attachments')
    .insert({
      organization_id: session.organizationId,
      entry_id: meta.data.entry_id ?? null,
      storage_bucket: 'accounting-attachments',
      storage_path: storagePath,
      file_name: file.name || safeName,
      content_type: file.type || null,
      byte_size: file.size,
      document_type: meta.data.document_type ?? 'other',
      uploaded_by: session.userId,
    })
    .select('id, file_name, content_type, byte_size, document_type, created_at')
    .single();

  if (insertErr || !row) {
    // Clean up the orphan storage object — failure here is logged but
    // doesn't block the error response.
    await admin.storage.from('accounting-attachments').remove([storagePath]);
    return NextResponse.json(
      { error: `Failed to record attachment: ${insertErr?.message}` },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true, attachment: row }, { status: 201 });
}
