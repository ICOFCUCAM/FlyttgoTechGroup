import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getSession, getSupabaseAuthClient } from '@/lib/auth/server';
import { isWriteRole } from '@/lib/auth/roles';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const inputSchema = z.object({
  name: z.string().trim().min(2).max(160),
  registration_number: z.string().trim().max(64).optional().or(z.literal('').transform(() => undefined)),
  vat_number: z.string().trim().max(64).optional().or(z.literal('').transform(() => undefined)),
});

export async function POST(request: Request) {
  const session = await getSession();
  if (!session || !isWriteRole(session.role) || !session.organizationId) {
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
  const { error } = await supabase
    .from('organizations')
    .update({
      name: parsed.data.name,
      registration_number: parsed.data.registration_number ?? null,
      vat_number: parsed.data.vat_number ?? null,
      updated_at: new Date().toISOString(),
    })
    .eq('id', session.organizationId);
  if (error) {
    return NextResponse.json(
      { error: `Failed to update organization profile: ${error.message}` },
      { status: 500 },
    );
  }
  return NextResponse.json({ ok: true }, { status: 200 });
}
