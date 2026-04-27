import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getSession, getSupabaseAuthClient } from '@/lib/auth/server';
import { isWriteRole } from '@/lib/auth/roles';
import { FRAMEWORK_CODES, FRAMEWORKS, type FrameworkCode } from '@/lib/accounting/frameworks';
import { seedFramework } from '@/lib/accounting/seed';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const inputSchema = z.object({
  framework: z.enum(FRAMEWORK_CODES),
  organizationId: z.string().uuid().nullable(),
});

export async function POST(request: Request) {
  const session = await getSession();
  if (!session || !isWriteRole(session.role)) {
    return NextResponse.json({ error: 'Forbidden.' }, { status: 403 });
  }
  if (!session.organizationId) {
    return NextResponse.json(
      { error: 'No organization assigned to this user.' },
      { status: 400 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }
  const parsed = inputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid framework.' }, { status: 400 });
  }
  if (parsed.data.organizationId !== session.organizationId) {
    return NextResponse.json({ error: 'Organization mismatch.' }, { status: 403 });
  }

  const framework: FrameworkCode = parsed.data.framework;
  const cfg = FRAMEWORKS[framework];
  const supabase = getSupabaseAuthClient();

  const { error: settingsErr } = await supabase
    .from('org_settings')
    .upsert(
      {
        organization_id: session.organizationId,
        default_country: framework,
        base_currency: cfg.baseCurrency,
        fiscal_year_start_month: cfg.fiscalYearStartMonth,
        vat_period: cfg.vatPeriod,
        number_format: cfg.numberFormat,
        date_format: cfg.dateFormat,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'organization_id' },
    );
  if (settingsErr) {
    return NextResponse.json(
      { error: `Failed to persist settings: ${settingsErr.message}` },
      { status: 500 },
    );
  }

  await supabase
    .from('organizations')
    .update({
      default_country: framework,
      base_currency: cfg.baseCurrency,
      fiscal_year_start_month: cfg.fiscalYearStartMonth,
      vat_period: cfg.vatPeriod,
      updated_at: new Date().toISOString(),
    })
    .eq('id', session.organizationId);

  const seedResult = await seedFramework({
    supabase,
    organizationId: session.organizationId,
    framework,
  });
  if (seedResult.ok === false) {
    return NextResponse.json(
      { error: `Framework seeding failed: ${seedResult.error}` },
      { status: 500 },
    );
  }

  return NextResponse.json(
    { ok: true, framework, accountsSeeded: seedResult.accountsSeeded },
    { status: 200 },
  );
}
