import 'server-only';

import type { SupabaseClient } from '@supabase/supabase-js';

export type DateRange = { from: string; to: string };

type LineWithAccount = {
  amount_base_currency: number;
  side: 'debit' | 'credit';
  vat_amount: number | null;
  vat_code_id: string | null;
  account: {
    id: string;
    code: string;
    name: string;
    account_type: 'asset' | 'liability' | 'equity' | 'revenue' | 'expense' | 'contra';
  };
  entry: {
    id: string;
    entry_number: number;
    entry_date: string;
    description: string | null;
    status: string;
  };
};

async function fetchPostedLines(
  supabase: SupabaseClient,
  organizationId: string,
  range: DateRange,
): Promise<LineWithAccount[]> {
  const { data } = await supabase
    .from('journal_lines')
    .select(`
      amount_base_currency, side, vat_amount, vat_code_id,
      account:accounts!inner ( id, code, name, account_type ),
      entry:journal_entries!inner ( id, entry_number, entry_date, description, status )
    `)
    .eq('organization_id', organizationId)
    .eq('entry.status', 'posted')
    .gte('entry.entry_date', range.from)
    .lte('entry.entry_date', range.to);
  return (data ?? []) as unknown as LineWithAccount[];
}

// ---------------------------------------------------------------------
// Trial balance
// ---------------------------------------------------------------------

export type TrialBalanceRow = {
  account_id: string;
  code: string;
  name: string;
  account_type: string;
  debit: number;
  credit: number;
  balance: number;
};

export async function buildTrialBalance(
  supabase: SupabaseClient,
  organizationId: string,
  range: DateRange,
): Promise<{ rows: TrialBalanceRow[]; totals: { debit: number; credit: number } }> {
  const lines = await fetchPostedLines(supabase, organizationId, range);
  const map = new Map<string, TrialBalanceRow>();
  for (const l of lines) {
    const key = l.account.id;
    const existing = map.get(key) ?? {
      account_id: l.account.id,
      code: l.account.code,
      name: l.account.name,
      account_type: l.account.account_type,
      debit: 0,
      credit: 0,
      balance: 0,
    };
    if (l.side === 'debit') existing.debit += Number(l.amount_base_currency);
    else existing.credit += Number(l.amount_base_currency);
    map.set(key, existing);
  }
  const rows = Array.from(map.values()).map((r) => ({
    ...r,
    balance: r.debit - r.credit,
  }));
  rows.sort((a, b) => a.code.localeCompare(b.code));
  const totals = rows.reduce(
    (acc, r) => ({ debit: acc.debit + r.debit, credit: acc.credit + r.credit }),
    { debit: 0, credit: 0 },
  );
  return { rows, totals };
}

// ---------------------------------------------------------------------
// General ledger
// ---------------------------------------------------------------------

export type GeneralLedgerRow = {
  entry_number: number;
  entry_date: string;
  description: string | null;
  account_code: string;
  account_name: string;
  side: 'debit' | 'credit';
  amount: number;
};

export async function buildGeneralLedger(
  supabase: SupabaseClient,
  organizationId: string,
  range: DateRange,
): Promise<GeneralLedgerRow[]> {
  const lines = await fetchPostedLines(supabase, organizationId, range);
  const rows = lines.map((l) => ({
    entry_number: l.entry.entry_number,
    entry_date: l.entry.entry_date,
    description: l.entry.description,
    account_code: l.account.code,
    account_name: l.account.name,
    side: l.side,
    amount: Number(l.amount_base_currency),
  }));
  rows.sort((a, b) => {
    if (a.entry_date !== b.entry_date) return a.entry_date.localeCompare(b.entry_date);
    return a.entry_number - b.entry_number;
  });
  return rows;
}

// ---------------------------------------------------------------------
// Income statement (P&L)
// ---------------------------------------------------------------------

export type IncomeStatement = {
  revenue: { total: number; lines: TrialBalanceRow[] };
  cogs_and_expenses: { total: number; lines: TrialBalanceRow[] };
  net_income: number;
};

export async function buildIncomeStatement(
  supabase: SupabaseClient,
  organizationId: string,
  range: DateRange,
): Promise<IncomeStatement> {
  const tb = await buildTrialBalance(supabase, organizationId, range);
  const revenue = tb.rows.filter((r) => r.account_type === 'revenue');
  const expenses = tb.rows.filter(
    (r) => r.account_type === 'expense' || r.account_type === 'contra',
  );
  // Revenue accounts have a credit normal balance; surface as positive.
  const revenueTotal = revenue.reduce((s, r) => s + (r.credit - r.debit), 0);
  const expensesTotal = expenses.reduce((s, r) => s + (r.debit - r.credit), 0);
  return {
    revenue: { total: revenueTotal, lines: revenue },
    cogs_and_expenses: { total: expensesTotal, lines: expenses },
    net_income: revenueTotal - expensesTotal,
  };
}

// ---------------------------------------------------------------------
// Balance sheet
// ---------------------------------------------------------------------

export type BalanceSheet = {
  as_of: string;
  assets: { total: number; lines: TrialBalanceRow[] };
  liabilities: { total: number; lines: TrialBalanceRow[] };
  equity: { total: number; lines: TrialBalanceRow[] };
  total_liabilities_and_equity: number;
};

export async function buildBalanceSheet(
  supabase: SupabaseClient,
  organizationId: string,
  asOf: string,
): Promise<BalanceSheet> {
  // Cumulative-to-date balance — start from the genesis-equivalent.
  const tb = await buildTrialBalance(supabase, organizationId, {
    from: '1900-01-01',
    to: asOf,
  });
  const assets = tb.rows.filter((r) => r.account_type === 'asset');
  const liabilities = tb.rows.filter((r) => r.account_type === 'liability');
  const equity = tb.rows.filter((r) => r.account_type === 'equity' || r.account_type === 'contra');
  const assetsTotal = assets.reduce((s, r) => s + (r.debit - r.credit), 0);
  const liabilitiesTotal = liabilities.reduce((s, r) => s + (r.credit - r.debit), 0);
  const equityTotal = equity.reduce((s, r) => s + (r.credit - r.debit), 0);
  return {
    as_of: asOf,
    assets: { total: assetsTotal, lines: assets },
    liabilities: { total: liabilitiesTotal, lines: liabilities },
    equity: { total: equityTotal, lines: equity },
    total_liabilities_and_equity: liabilitiesTotal + equityTotal,
  };
}

// ---------------------------------------------------------------------
// VAT report
// ---------------------------------------------------------------------

export type VatReportRow = {
  tax_code_id: string;
  code: string;
  name: string;
  rate_percent: number;
  net_amount: number;
  vat_amount: number;
};

export async function buildVatReport(
  supabase: SupabaseClient,
  organizationId: string,
  range: DateRange,
): Promise<{ rows: VatReportRow[]; totals: { net: number; vat: number } }> {
  type LineRow = {
    amount_base_currency: number;
    vat_amount: number | null;
    vat_code_id: string | null;
    journal_entries: { entry_date: string; status: string };
    tax_codes: {
      id: string;
      code: string;
      name: string;
      vat_rates: Array<{ rate_percent: number; effective_from: string; effective_to: string | null }>;
    } | null;
  };
  const { data } = await supabase
    .from('journal_lines')
    .select(`
      amount_base_currency, vat_amount, vat_code_id,
      journal_entries!inner ( entry_date, status ),
      tax_codes ( id, code, name, vat_rates ( rate_percent, effective_from, effective_to ) )
    `)
    .eq('organization_id', organizationId)
    .not('vat_code_id', 'is', null)
    .eq('journal_entries.status', 'posted')
    .gte('journal_entries.entry_date', range.from)
    .lte('journal_entries.entry_date', range.to);

  const rows = (data ?? []) as unknown as LineRow[];
  const map = new Map<string, VatReportRow>();
  for (const r of rows) {
    if (!r.tax_codes) continue;
    const code = r.tax_codes;
    const onDate = r.journal_entries.entry_date;
    const effective =
      (code.vat_rates ?? []).find(
        (rt) => rt.effective_from <= onDate && (rt.effective_to === null || rt.effective_to >= onDate),
      ) ?? code.vat_rates?.[0];
    const ratePercent = Number(effective?.rate_percent ?? 0);
    const existing = map.get(code.id) ?? {
      tax_code_id: code.id,
      code: code.code,
      name: code.name,
      rate_percent: ratePercent,
      net_amount: 0,
      vat_amount: 0,
    };
    existing.net_amount += Number(r.amount_base_currency);
    existing.vat_amount += Number(r.vat_amount ?? 0);
    map.set(code.id, existing);
  }
  const rowsOut = Array.from(map.values()).sort((a, b) => a.code.localeCompare(b.code));
  const totals = rowsOut.reduce(
    (acc, r) => ({ net: acc.net + r.net_amount, vat: acc.vat + r.vat_amount }),
    { net: 0, vat: 0 },
  );
  return { rows: rowsOut, totals };
}
