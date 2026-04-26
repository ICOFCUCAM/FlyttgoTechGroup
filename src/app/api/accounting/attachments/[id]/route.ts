import { NextResponse } from 'next/server';
import { getSession, getSupabaseAuthClient } from '@/lib/auth/server';
import { getSupabaseServerClient } from '@/lib/supabase';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const SIGNED_URL_TTL_SECONDS = 60 * 5; // 5 minutes

/**
 * Mint a short-lived signed URL for an attachment in the caller's
 * organization. Both accountants and auditors may read; finance_viewers
 * may read; anyone outside the org is rejected.
 */
export async function GET(
  _request: Request,
  { params }: { params: { id: string } },
) {
  const session = await getSession();
  if (!session || !session.organizationId) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  const supabase = getSupabaseAuthClient();
  const { data: row, error } = await supabase
    .from('attachments')
    .select('id, organization_id, storage_bucket, storage_path, file_name, content_type, byte_size, document_type, created_at')
    .eq('id', params.id)
    .maybeSingle();

  if (error || !row) {
    return NextResponse.json({ error: 'Not found.' }, { status: 404 });
  }
  if (row.organization_id !== session.organizationId) {
    return NextResponse.json({ error: 'Forbidden.' }, { status: 403 });
  }

  const admin = getSupabaseServerClient();
  const { data: signed, error: signErr } = await admin.storage
    .from(row.storage_bucket)
    .createSignedUrl(row.storage_path, SIGNED_URL_TTL_SECONDS);
  if (signErr || !signed) {
    return NextResponse.json(
      { error: `Failed to mint URL: ${signErr?.message}` },
      { status: 500 },
    );
  }

  return NextResponse.json(
    {
      ok: true,
      url: signed.signedUrl,
      expires_in: SIGNED_URL_TTL_SECONDS,
      file_name: row.file_name,
      content_type: row.content_type,
      byte_size: row.byte_size,
      document_type: row.document_type,
      created_at: row.created_at,
    },
    { status: 200, headers: { 'Cache-Control': 'private, no-store' } },
  );
}
