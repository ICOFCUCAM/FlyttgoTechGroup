import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getSession, getSupabaseAuthClient } from '@/lib/auth/server';
import { buildVatReturn } from '@/lib/accounting/exports/vat-100';
import { toCsv } from '@/lib/accounting/exports/csv';
import { renderPrintableHtml } from '@/lib/accounting/exports/pdf';
import { recordExport } from '@/lib/accounting/exports/history';
import { footerForCsv, type FooterMeta } from '@/lib/accounting/exports/footer';
import { formatAmount } from '@/lib/accounting/frameworks';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const ALLOWED: ReadonlyArray<string> = ['super_admin', 'admin', 'accountant', 'auditor'];

const querySchema = z.object({
  from: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  to: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  format: z.enum(['csv', 'pdf', 'json']).default('pdf'),
});

const BOX_LABELS: Record<string, [string, keyof Omit<Awaited<ReturnType<typeof buildVatReturn>>, 'jurisdiction' | 'period'>]> = {
  '1': ['VAT due on sales and other outputs', 'vatDueSales'],
  '2': ['VAT due on acquisitions from EU', 'vatDueAcquisitions'],
  '3': ['Total VAT due (Box 1 + Box 2)', 'totalVatDue'],
  '4': ['VAT reclaimed on purchases', 'vatReclaimedCurrPeriod'],
  '5': ['Net VAT (|Box 3 − Box 4|)', 'netVatDue'],
  '6': ['Total sales (excluding VAT)', 'totalValueSalesExVAT'],
  '7': ['Total purchases (excluding VAT)', 'totalValuePurchasesExVAT'],
  '8': ['Total EU goods dispatched', 'totalValueGoodsSuppliedExVAT'],
  '9': ['Total EU goods acquired', 'totalAcquisitionsExVAT'],
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
    format: url.searchParams.get('format') ?? 'pdf',
  });
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid query.' }, { status: 400 });
  }

  const supabase = getSupabaseAuthClient();
  const { data: org } = await supabase
    .from('organizations')
    .select('default_country, name, vat_number, registration_number')
    .eq('id', session.organizationId)
    .maybeSingle();
  if (org?.default_country !== 'UK') {
    return NextResponse.json(
      { error: 'VAT-100 return is only available for UK-jurisdiction organizations.' },
      { status: 422 },
    );
  }

  const ret = await buildVatReturn(supabase, session.organizationId, {
    from: parsed.data.from,
    to: parsed.data.to,
  });

  const fileBase = `vat_return_${parsed.data.from}_${parsed.data.to}`;
  const footer: FooterMeta = {
    jurisdiction: 'UK',
    currency: 'GBP',
    generatedAt: new Date().toISOString(),
    generatedBy: session.email,
    organizationName: org?.name ?? undefined,
    registrationNumber: org?.registration_number ?? null,
    vatNumber: org?.vat_number ?? null,
  };

  if (parsed.data.format === 'json') {
    await recordExport({
      organizationId: session.organizationId,
      userId: session.userId,
      exportType: 'vat-100',
      jurisdiction: 'UK',
      periodFrom: parsed.data.from,
      periodTo: parsed.data.to,
      fileName: `${fileBase}.json`,
    });
    return NextResponse.json(ret, {
      status: 200,
      headers: { 'Cache-Control': 'private, no-store' },
    });
  }

  if (parsed.data.format === 'csv') {
    const headers = ['Box', 'Label', 'Value (GBP)'];
    const rows = Object.entries(BOX_LABELS).map(([box, [label, key]]) => [
      `Box ${box}`,
      label,
      ret[key],
    ]);
    const csv = toCsv(headers, rows) + footerForCsv(footer);
    await recordExport({
      organizationId: session.organizationId,
      userId: session.userId,
      exportType: 'vat-100',
      jurisdiction: 'UK',
      periodFrom: parsed.data.from,
      periodTo: parsed.data.to,
      fileName: `${fileBase}.csv`,
    });
    return new NextResponse(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${fileBase}.csv"`,
        'Cache-Control': 'private, no-store',
      },
    });
  }

  // PDF / HTML
  const html = renderPrintableHtml({
    title: 'VAT-100 return — HMRC Making Tax Digital',
    subtitle: `Period ${parsed.data.from} → ${parsed.data.to} · ${org?.name ?? '—'} · VRN ${org?.vat_number ?? '—'}`,
    generatedAt: new Date().toISOString(),
    footer,
    sections: [
      {
        heading: 'Nine-box VAT return',
        columnHeaders: ['Box', 'Label', 'Value'],
        rows: Object.entries(BOX_LABELS).map(([box, [label, key]]) => [
          `Box ${box}`,
          label,
          formatAmount(Number(ret[key]), 'UK'),
        ]),
      },
      {
        heading: 'Submission notes',
        columnHeaders: ['Field', 'Value'],
        rows: [
          ['Organization', org?.name ?? ''],
          ['VAT registration number', org?.vat_number ?? ''],
          ['Registration number', org?.registration_number ?? ''],
          ['Reporting period', `${parsed.data.from} → ${parsed.data.to}`],
          ['Generated by', session.email],
          ['MTD-ready', org?.vat_number ? 'yes (VRN present)' : 'no — VRN missing'],
        ],
      },
    ],
  });

  await recordExport({
    organizationId: session.organizationId,
    userId: session.userId,
    exportType: 'vat-100',
    jurisdiction: 'UK',
    periodFrom: parsed.data.from,
    periodTo: parsed.data.to,
    fileName: `${fileBase}.html`,
  });

  return new NextResponse(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Content-Disposition': `inline; filename="${fileBase}.html"`,
      'Cache-Control': 'private, no-store',
    },
  });
}
