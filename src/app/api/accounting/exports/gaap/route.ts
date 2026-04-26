import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getSession, getSupabaseAuthClient } from '@/lib/auth/server';
import { buildGaapBundle } from '@/lib/accounting/exports/gaap-bundle';
import { recordExport, type ExportType } from '@/lib/accounting/exports/history';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const ALLOWED: ReadonlyArray<string> = ['super_admin', 'admin', 'accountant', 'auditor'];

const querySchema = z.object({
  from: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  to: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  /**
   * Pick a single CSV from the bundle. When unspecified the route
   * returns a multipart-style concatenation with file separators so
   * the accountant can split into the four individual files.
   */
  file: z.enum(['trial_balance', 'general_ledger', 'income_statement', 'balance_sheet', 'all']).default('all'),
});

const FILE_TO_HISTORY_TYPE: Record<string, ExportType> = {
  trial_balance: 'gaap-trial-balance',
  general_ledger: 'gaap-general-ledger',
  income_statement: 'gaap-income-statement',
  balance_sheet: 'gaap-balance-sheet',
  all: 'gaap-trial-balance',
};

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
    file: url.searchParams.get('file') ?? 'all',
  });
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid query.' }, { status: 400 });
  }

  const supabase = getSupabaseAuthClient();
  const { data: org } = await supabase
    .from('organizations')
    .select('default_country, name, registration_number, vat_number')
    .eq('id', session.organizationId)
    .maybeSingle();
  if (org?.default_country !== 'US') {
    return NextResponse.json(
      { error: 'GAAP structured exports are only available for US-jurisdiction organizations.' },
      { status: 422 },
    );
  }

  const bundle = await buildGaapBundle({
    supabase,
    organizationId: session.organizationId,
    range: { from: parsed.data.from, to: parsed.data.to },
    meta: {
      organization_name: org.name,
      ein: org.registration_number ?? org.vat_number ?? null,
      period_label: `${parsed.data.from} → ${parsed.data.to}`,
    },
  });

  const file = parsed.data.file;
  if (file !== 'all') {
    const csv = bundle.get(`${file}.csv`) ?? '';
    await recordExport({
      organizationId: session.organizationId,
      userId: session.userId,
      exportType: FILE_TO_HISTORY_TYPE[file],
      jurisdiction: 'US',
      periodFrom: parsed.data.from,
      periodTo: parsed.data.to,
      fileName: `${file}_${parsed.data.from}_${parsed.data.to}.csv`,
    });
    return new NextResponse(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${file}_${parsed.data.from}_${parsed.data.to}.csv"`,
        'Cache-Control': 'private, no-store',
      },
    });
  }

  // Concatenate all four files with a clear separator. CSV-aware tools
  // (Excel "Get Data") import this as text; users routinely split on
  // the separator string.
  const combined = Array.from(bundle.entries())
    .map(([name, body]) => `\r\n# ===== ${name} =====\r\n${body}`)
    .join('\r\n');

  await recordExport({
    organizationId: session.organizationId,
    userId: session.userId,
    exportType: 'gaap-trial-balance',
    jurisdiction: 'US',
    periodFrom: parsed.data.from,
    periodTo: parsed.data.to,
    fileName: `gaap_bundle_${parsed.data.from}_${parsed.data.to}.csv`,
  });

  return new NextResponse(combined, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="gaap_bundle_${parsed.data.from}_${parsed.data.to}.csv"`,
      'Cache-Control': 'private, no-store',
    },
  });
}
