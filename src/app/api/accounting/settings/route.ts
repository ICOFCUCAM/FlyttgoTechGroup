import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getSession, getSupabaseAuthClient } from '@/lib/auth/server';
import { isWriteRole } from '@/lib/auth/roles';
import { FRAMEWORK_CODES } from '@/lib/accounting/frameworks';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const inputSchema = z.object({
  default_country: z.enum(FRAMEWORK_CODES),
  base_currency: z.string().trim().length(3).toUpperCase(),
  fiscal_year_start_month: z.coerce.number().int().min(1).max(12),
  vat_period: z.enum(['monthly', 'bimonthly', 'quarterly', 'yearly']),
  number_format: z.enum(['space-comma', 'comma-dot', 'dot-comma']),
  date_format: z.enum(['YYYY-MM-DD', 'DD/MM/YYYY', 'MM/DD/YYYY']),
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
    return NextResponse.json(
      {
        error: 'Validation failed.',
        issues: parsed.error.issues.map((i) => ({ path: i.path.join('.'), message: i.message })),
      },
      { status: 422 },
    );
  }

  const supabase = getSupabaseAuthClient();
  const now = new Date().toISOString();

  const { error: settingsErr } = await supabase
    .from('org_settings')
    .upsert(
      { organization_id: session.organizationId, ...parsed.data, updated_at: now },
      { onConflict: 'organization_id' },
    );
  if (settingsErr) {
    return NextResponse.json(
      { error: `Failed to update settings: ${settingsErr.message}` },
      { status: 500 },
    );
  }

  await supabase
    .from('organizations')
    .update({
      default_country: parsed.data.default_country,
      base_currency: parsed.data.base_currency,
      fiscal_year_start_month: parsed.data.fiscal_year_start_month,
      vat_period: parsed.data.vat_period,
      updated_at: now,
    })
    .eq('id', session.organizationId);

  return NextResponse.json({ ok: true }, { status: 200 });
}
