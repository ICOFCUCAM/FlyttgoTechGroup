import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getSession, getSupabaseAuthClient } from '@/lib/auth/server';
import { isWriteRole } from '@/lib/auth/roles';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const inputSchema = z.object({
  rate_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  base_currency: z.string().trim().length(3).toUpperCase(),
  quote_currency: z.string().trim().length(3).toUpperCase(),
  rate: z.coerce.number().positive().finite().max(1_000_000),
  source: z.string().trim().max(120).optional().or(z.literal('').transform(() => undefined)),
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
  if (parsed.data.base_currency === parsed.data.quote_currency) {
    return NextResponse.json(
      { error: 'Base and quote currencies must differ.' },
      { status: 422 },
    );
  }

  const supabase = getSupabaseAuthClient();
  const { error } = await supabase.from('exchange_rates').upsert(
    {
      organization_id: session.organizationId,
      rate_date: parsed.data.rate_date,
      base_currency: parsed.data.base_currency,
      quote_currency: parsed.data.quote_currency,
      rate: parsed.data.rate,
      source: parsed.data.source ?? null,
    },
    { onConflict: 'organization_id,rate_date,base_currency,quote_currency' },
  );
  if (error) {
    return NextResponse.json(
      { error: `Failed to record rate: ${error.message}` },
      { status: 500 },
    );
  }
  return NextResponse.json({ ok: true }, { status: 200 });
}
