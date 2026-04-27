import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getSession, getSupabaseAuthClient } from '@/lib/auth/server';
import {
  buildBalanceSheet,
  buildGeneralLedger,
  buildIncomeStatement,
  buildTrialBalance,
  buildVatReport,
} from '@/lib/accounting/reports';
import { isFrameworkCode, formatAmount, formatDate } from '@/lib/accounting/frameworks';
import { toCsv } from '@/lib/accounting/exports/csv';
import { renderWordDoc, type DocSection } from '@/lib/accounting/exports/doc';
import { renderPrintableHtml } from '@/lib/accounting/exports/pdf';
import { footerForCsv, type FooterMeta } from '@/lib/accounting/exports/footer';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const querySchema = z.object({
  report: z.enum(['trial-balance', 'general-ledger', 'income-statement', 'balance-sheet', 'vat']),
  format: z.enum(['csv', 'doc', 'pdf']),
  from: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  to: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
});

export async function GET(request: Request) {
  const session = await getSession();
  if (!session || !session.organizationId) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }
  const url = new URL(request.url);
  const parsed = querySchema.safeParse({
    report: url.searchParams.get('report'),
    format: url.searchParams.get('format'),
    from: url.searchParams.get('from') ?? undefined,
    to: url.searchParams.get('to') ?? undefined,
  });
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid export request.' }, { status: 400 });
  }
  const { report, format } = parsed.data;

  const today = new Date().toISOString().slice(0, 10);
  const yearStart = `${new Date().getFullYear()}-01-01`;
  const range = { from: parsed.data.from ?? yearStart, to: parsed.data.to ?? today };

  const supabase = getSupabaseAuthClient();
  const { data: settings } = await supabase
    .from('org_settings')
    .select('default_country')
    .eq('organization_id', session.organizationId)
    .maybeSingle();
  const framework = isFrameworkCode(settings?.default_country) ? settings!.default_country : 'NO';

  // Build the report payload
  let title = '';
  let csvHeaders: string[] = [];
  let csvRows: Array<Array<string | number | null>> = [];
  let sections: DocSection[] = [];

  switch (report) {
    case 'trial-balance': {
      const tb = await buildTrialBalance(supabase, session.organizationId, range);
      title = 'Trial balance';
      csvHeaders = ['Code', 'Account', 'Type', 'Debit', 'Credit', 'Balance'];
      csvRows = tb.rows.map((r) => [r.code, r.name, r.account_type, r.debit, r.credit, r.balance]);
      csvRows.push(['', 'TOTAL', '', tb.totals.debit, tb.totals.credit, tb.totals.debit - tb.totals.credit]);
      sections = [
        {
          heading: 'Trial balance',
          columnHeaders: csvHeaders,
          rows: tb.rows.map((r) => [
            r.code,
            r.name,
            r.account_type,
            formatAmount(r.debit, framework),
            formatAmount(r.credit, framework),
            formatAmount(r.balance, framework),
          ]),
          totals: ['', 'TOTAL', '', formatAmount(tb.totals.debit, framework), formatAmount(tb.totals.credit, framework), formatAmount(tb.totals.debit - tb.totals.credit, framework)],
        },
      ];
      break;
    }
    case 'general-ledger': {
      const gl = await buildGeneralLedger(supabase, session.organizationId, range);
      title = 'General ledger';
      csvHeaders = ['Entry', 'Date', 'Account code', 'Account name', 'Description', 'Side', 'Amount'];
      csvRows = gl.map((r) => [r.entry_number, r.entry_date, r.account_code, r.account_name, r.description ?? '', r.side, r.amount]);
      sections = [
        {
          heading: 'General ledger',
          columnHeaders: csvHeaders,
          rows: gl.map((r) => [
            `#${r.entry_number}`,
            formatDate(r.entry_date, framework),
            r.account_code,
            r.account_name,
            r.description ?? '',
            r.side,
            formatAmount(r.amount, framework),
          ]),
        },
      ];
      break;
    }
    case 'income-statement': {
      const stmt = await buildIncomeStatement(supabase, session.organizationId, range);
      title = 'Income statement';
      csvHeaders = ['Section', 'Code', 'Account', 'Amount'];
      csvRows = [];
      for (const r of stmt.revenue.lines) csvRows.push(['Revenue', r.code, r.name, r.credit - r.debit]);
      csvRows.push(['Revenue', '', 'TOTAL REVENUE', stmt.revenue.total]);
      for (const r of stmt.cogs_and_expenses.lines) csvRows.push(['Expenses', r.code, r.name, r.debit - r.credit]);
      csvRows.push(['Expenses', '', 'TOTAL EXPENSES', stmt.cogs_and_expenses.total]);
      csvRows.push(['Result', '', 'NET INCOME', stmt.net_income]);
      sections = [
        {
          heading: 'Revenue',
          columnHeaders: ['Code', 'Account', 'Amount'],
          rows: stmt.revenue.lines.map((r) => [r.code, r.name, formatAmount(r.credit - r.debit, framework)]),
          totals: ['', 'TOTAL', formatAmount(stmt.revenue.total, framework)],
        },
        {
          heading: 'COGS + operating expenses',
          columnHeaders: ['Code', 'Account', 'Amount'],
          rows: stmt.cogs_and_expenses.lines.map((r) => [r.code, r.name, formatAmount(r.debit - r.credit, framework)]),
          totals: ['', 'TOTAL', formatAmount(stmt.cogs_and_expenses.total, framework)],
        },
        {
          heading: 'Net result',
          columnHeaders: ['Metric', 'Value'],
          rows: [['Net income', formatAmount(stmt.net_income, framework)]],
        },
      ];
      break;
    }
    case 'balance-sheet': {
      const bs = await buildBalanceSheet(supabase, session.organizationId, range.to);
      title = `Balance sheet — as of ${bs.as_of}`;
      csvHeaders = ['Section', 'Code', 'Account', 'Amount'];
      csvRows = [];
      for (const r of bs.assets.lines) csvRows.push(['Assets', r.code, r.name, r.debit - r.credit]);
      csvRows.push(['Assets', '', 'TOTAL ASSETS', bs.assets.total]);
      for (const r of bs.liabilities.lines) csvRows.push(['Liabilities', r.code, r.name, r.credit - r.debit]);
      csvRows.push(['Liabilities', '', 'TOTAL LIABILITIES', bs.liabilities.total]);
      for (const r of bs.equity.lines) csvRows.push(['Equity', r.code, r.name, r.credit - r.debit]);
      csvRows.push(['Equity', '', 'TOTAL EQUITY', bs.equity.total]);
      csvRows.push(['Check', '', 'TOTAL L+E', bs.total_liabilities_and_equity]);
      sections = [
        { heading: 'Assets', columnHeaders: ['Code', 'Account', 'Amount'],
          rows: bs.assets.lines.map((r) => [r.code, r.name, formatAmount(r.debit - r.credit, framework)]),
          totals: ['', 'TOTAL', formatAmount(bs.assets.total, framework)] },
        { heading: 'Liabilities', columnHeaders: ['Code', 'Account', 'Amount'],
          rows: bs.liabilities.lines.map((r) => [r.code, r.name, formatAmount(r.credit - r.debit, framework)]),
          totals: ['', 'TOTAL', formatAmount(bs.liabilities.total, framework)] },
        { heading: 'Equity', columnHeaders: ['Code', 'Account', 'Amount'],
          rows: bs.equity.lines.map((r) => [r.code, r.name, formatAmount(r.credit - r.debit, framework)]),
          totals: ['', 'TOTAL', formatAmount(bs.equity.total, framework)] },
      ];
      break;
    }
    case 'vat': {
      const vat = await buildVatReport(supabase, session.organizationId, range);
      title = 'VAT report';
      csvHeaders = ['Code', 'Name', 'Rate %', 'Net', 'VAT'];
      csvRows = vat.rows.map((r) => [r.code, r.name, r.rate_percent, r.net_amount, r.vat_amount]);
      csvRows.push(['', 'TOTAL', '', vat.totals.net, vat.totals.vat]);
      sections = [
        {
          heading: 'VAT report',
          columnHeaders: csvHeaders,
          rows: vat.rows.map((r) => [
            r.code, r.name, `${r.rate_percent.toFixed(2)}%`,
            formatAmount(r.net_amount, framework), formatAmount(r.vat_amount, framework),
          ]),
          totals: ['', 'TOTAL', '', formatAmount(vat.totals.net, framework), formatAmount(vat.totals.vat, framework)],
        },
      ];
      break;
    }
  }

  const subtitle = `Period ${range.from} → ${range.to} · framework ${framework}`;
  const generatedAt = new Date().toISOString();
  const fileBase = `flyttgo-${report}-${range.from}-${range.to}`;

  const { data: orgRow } = await supabase
    .from('organizations')
    .select('name, registration_number, vat_number')
    .eq('id', session.organizationId)
    .maybeSingle();

  const footer: FooterMeta = {
    jurisdiction: framework,
    currency: settings?.default_country
      ? (orgRow?.name ? '' : '') + (framework === 'NO' ? 'NOK' : framework === 'UK' ? 'GBP' : framework === 'US' ? 'USD' : 'EUR')
      : 'EUR',
    generatedAt,
    generatedBy: session.email,
    organizationName: orgRow?.name ?? undefined,
    registrationNumber: orgRow?.registration_number ?? null,
    vatNumber: orgRow?.vat_number ?? null,
  };

  if (format === 'csv') {
    const body = toCsv(csvHeaders, csvRows) + footerForCsv(footer);
    return new NextResponse(body, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${fileBase}.csv"`,
        'Cache-Control': 'private, no-store',
      },
    });
  }

  if (format === 'doc') {
    const body = renderWordDoc({ title, subtitle, generatedAt, sections, footer });
    return new NextResponse(body, {
      status: 200,
      headers: {
        'Content-Type': 'application/msword; charset=utf-8',
        'Content-Disposition': `attachment; filename="${fileBase}.doc"`,
        'Cache-Control': 'private, no-store',
      },
    });
  }

  // PDF — print-optimised HTML with inline disposition + auto-print.
  const body = renderPrintableHtml({ title, subtitle, generatedAt, sections, footer });
  return new NextResponse(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Content-Disposition': `inline; filename="${fileBase}.html"`,
      'Cache-Control': 'private, no-store',
    },
  });
}
