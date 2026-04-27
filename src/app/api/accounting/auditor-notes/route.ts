import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getSession, getSupabaseAuthClient } from '@/lib/auth/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const inputSchema = z.object({
  entry_id: z.string().uuid(),
  body: z.string().trim().min(1).max(4000),
});

const ALLOWED: ReadonlyArray<string> = ['super_admin', 'admin', 'accountant', 'auditor'];

export async function POST(request: Request) {
  const session = await getSession();
  if (!session || !session.organizationId || !ALLOWED.includes(session.role)) {
    return NextResponse.json({ error: 'Forbidden.' }, { status: 403 });
  }
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }
  const parsed = inputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Validation failed.' }, { status: 422 });
  }

  const supabase = getSupabaseAuthClient();
  const { data: entry } = await supabase
    .from('journal_entries')
    .select('id, organization_id')
    .eq('id', parsed.data.entry_id)
    .maybeSingle();
  if (!entry || entry.organization_id !== session.organizationId) {
    return NextResponse.json({ error: 'Entry not in your organization.' }, { status: 403 });
  }

  const { data: row, error } = await supabase
    .from('auditor_notes')
    .insert({
      organization_id: session.organizationId,
      entry_id: parsed.data.entry_id,
      author_id: session.userId,
      body: parsed.data.body,
    })
    .select('id, body, created_at')
    .single();

  if (error || !row) {
    return NextResponse.json(
      { error: `Failed to save note: ${error?.message}` },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true, note: row }, { status: 201 });
}
