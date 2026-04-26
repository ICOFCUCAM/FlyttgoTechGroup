import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getSession, getSupabaseAuthClient } from '@/lib/auth/server';
import { buildSaftXml } from '@/lib/accounting/exports/saf-t';
import { recordExport } from '@/lib/accounting/exports/history';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const ALLOWED: ReadonlyArray<string> = ['super_admin', 'admin', 'accountant', 'auditor'];

const querySchema = z.object({
  from: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  to: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

export async function GET(request: Request) {
  const session = await getSession();
  if (!session || !session.organizationId || !ALLOWED.includes(session.role)) {
    return NextResponse.json({ error: 'Forbidden.' }, { status: 403 });
  }
  const url = new URL(request.url);
  const today = new Date().toISOString().slice(0, 10);
  const yearStart = `${new Date().getFullYear()}-01-01`;
  const parsed = querySchema.safeParse({
    from: url.searchParams.get('from') ?? yearStart,
    to: url.searchParams.get('to') ?? today,
  });
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid period.' }, { status: 400 });
  }

  const supabase = getSupabaseAuthClient();
  const { data: org } = await supabase
    .from('organizations')
    .select('id, name, default_country, base_currency, fiscal_year_start_month, registration_number, vat_number')
    .eq('id', session.organizationId)
    .maybeSingle();

  if (org?.default_country !== 'NO') {
    return NextResponse.json(
      { error: 'SAF-T export is only available for Norway-jurisdiction organizations.' },
      { status: 422 },
    );
  }

  const xml = await buildSaftXml(supabase, session.organizationId, { from: parsed.data.from, to: parsed.data.to }, {
    organization_name: org?.name ?? 'Unknown',
    organization_id: session.organizationId,
    registration_number: org?.registration_number ?? null,
    vat_number: org?.vat_number ?? null,
    base_currency: org?.base_currency ?? 'NOK',
    fiscal_year_start_month: org?.fiscal_year_start_month ?? 1,
    generated_by_email: session.email,
  });

  await recordExport({
    organizationId: session.organizationId,
    userId: session.userId,
    exportType: 'saf-t',
    jurisdiction: 'NO',
    periodFrom: parsed.data.from,
    periodTo: parsed.data.to,
    fileName: `saf_t_${parsed.data.from}_${parsed.data.to}.xml`,
  });

  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Content-Disposition': `attachment; filename="saf_t_${parsed.data.from}_${parsed.data.to}.xml"`,
      'Cache-Control': 'private, no-store',
    },
  });
}
