import 'server-only';

import type { SupabaseClient } from '@supabase/supabase-js';

/**
 * Norwegian MVA-melding (VAT return) summary.
 *
 * Maps tax-code activity into the Skatteetaten "skattemelding for
 * merverdiavgift" category structure. Codes follow the Phase 6 seed
 * (NO-OUT-HIGH/MID/LOW/ZERO, NO-IN-HIGH/MID/LOW, NO-IN-RC, NO-EXEMPT).
 *
 * Disclaimer: classification follows the standard Skatteetaten code
 * mapping at time of writing. The accountant must reconcile against
 * the current published mva-melding box list before submitting via
 * Altinn.
 */

export type MvaCategory =
  | 'output_high'
  | 'output_mid'
  | 'output_low'
  | 'output_zero'
  | 'input_high'
  | 'input_mid'
  | 'input_low'
  | 'reverse_charge'
  | 'outside_scope'
  | 'other';

export type MvaCategoryRow = {
  category: MvaCategory;
  label: string;
  net_amount: number;
  vat_amount: number;
  rate_percent: number | null;
};

const CATEGORY_LABEL: Record<MvaCategory, string> = {
  output_high: 'Utgående MVA — høy sats (25%)',
  output_mid: 'Utgående MVA — middels sats (15%)',
  output_low: 'Utgående MVA — lav sats (12%)',
  output_zero: 'Utgående MVA — fritatt / 0%',
  input_high: 'Inngående MVA — høy sats (25%)',
  input_mid: 'Inngående MVA — middels sats (15%)',
  input_low: 'Inngående MVA — lav sats (12%)',
  reverse_charge: 'Omvendt avgiftsplikt',
  outside_scope: 'Utenfor avgiftsområdet',
  other: 'Annet',
};

const CODE_TO_CATEGORY: Record<string, MvaCategory> = {
  'NO-OUT-HIGH': 'output_high',
  'NO-OUT-MID': 'output_mid',
  'NO-OUT-LOW': 'output_low',
  'NO-OUT-ZERO': 'output_zero',
  'NO-IN-HIGH': 'input_high',
  'NO-IN-MID': 'input_mid',
  'NO-IN-LOW': 'input_low',
  'NO-IN-RC': 'reverse_charge',
  'NO-EXEMPT': 'outside_scope',
};

export type MvaSummary = {
  jurisdiction: 'NO';
  period: { from: string; to: string };
  categories: MvaCategoryRow[];
  totals: {
    output_vat: number;
    input_vat: number;
    payable: number;     // > 0 means VAT owed to the state
    receivable: number;  // > 0 means VAT to be refunded
  };
};

export async function buildMvaSummary(
  supabase: SupabaseClient,
  organizationId: string,
  range: { from: string; to: string },
): Promise<MvaSummary> {
  type LineRow = {
    amount_base_currency: number;
    vat_amount: number | null;
    vat_code_id: string | null;
    journal_entries: { entry_date: string; status: string };
    tax_codes: {
      code: string;
      vat_rates: Array<{ rate_percent: number; effective_from: string; effective_to: string | null }>;
    } | null;
  };

  const { data } = await supabase
    .from('journal_lines')
    .select(`
      amount_base_currency, vat_amount, vat_code_id,
      journal_entries!inner ( entry_date, status ),
      tax_codes ( code, vat_rates ( rate_percent, effective_from, effective_to ) )
    `)
    .eq('organization_id', organizationId)
    .not('vat_code_id', 'is', null)
    .eq('journal_entries.status', 'posted')
    .gte('journal_entries.entry_date', range.from)
    .lte('journal_entries.entry_date', range.to);

  const rows = (data ?? []) as unknown as LineRow[];
  const buckets = new Map<MvaCategory, MvaCategoryRow>();

  for (const r of rows) {
    if (!r.tax_codes) continue;
    const category = CODE_TO_CATEGORY[r.tax_codes.code] ?? 'other';
    const onDate = r.journal_entries.entry_date;
    const effective =
      (r.tax_codes.vat_rates ?? []).find(
        (rt) => rt.effective_from <= onDate && (rt.effective_to === null || rt.effective_to >= onDate),
      ) ?? r.tax_codes.vat_rates?.[0];
    const ratePercent = effective ? Number(effective.rate_percent) : null;

    const bucket = buckets.get(category) ?? {
      category,
      label: CATEGORY_LABEL[category],
      net_amount: 0,
      vat_amount: 0,
      rate_percent: ratePercent,
    };
    bucket.net_amount += Number(r.amount_base_currency);
    bucket.vat_amount += Number(r.vat_amount ?? 0);
    if (bucket.rate_percent === null && ratePercent !== null) bucket.rate_percent = ratePercent;
    buckets.set(category, bucket);
  }

  const categories = Array.from(buckets.values()).sort((a, b) =>
    a.category.localeCompare(b.category),
  );

  const outputVat = categories
    .filter((c) => c.category.startsWith('output_'))
    .reduce((s, c) => s + c.vat_amount, 0);
  const inputVat = categories
    .filter((c) => c.category.startsWith('input_') || c.category === 'reverse_charge')
    .reduce((s, c) => s + c.vat_amount, 0);
  const net = outputVat - inputVat;

  return {
    jurisdiction: 'NO',
    period: range,
    categories,
    totals: {
      output_vat: outputVat,
      input_vat: inputVat,
      payable: net > 0 ? net : 0,
      receivable: net < 0 ? -net : 0,
    },
  };
}
