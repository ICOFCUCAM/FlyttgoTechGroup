import 'server-only';

import type { SupabaseClient } from '@supabase/supabase-js';

/**
 * UK VAT-100 return — HMRC Making Tax Digital structure.
 *
 * Maps Phase-6 UK tax codes onto the nine-box VAT return:
 *   Box 1 — VAT due on sales and other outputs
 *   Box 2 — VAT due on acquisitions from EU member states
 *   Box 3 — Total VAT due (Box 1 + Box 2)
 *   Box 4 — VAT reclaimed on purchases and other inputs
 *   Box 5 — Net VAT to pay HMRC or reclaim (|Box 3 − Box 4|)
 *   Box 6 — Total value of sales and all other outputs (excluding VAT)
 *   Box 7 — Total value of purchases and all other inputs (excluding VAT)
 *   Box 8 — Total value of all supplies of goods to EU
 *   Box 9 — Total value of all acquisitions of goods from EU
 *
 * Disclaimer: this generator computes the boxes from posted journal
 * activity using the seeded UK code mapping. Real submission via the
 * MTD VAT API requires fraud-prevention headers (Gov-Client-* /
 * Gov-Vendor-*), an OAuth-2 access token, and HMRC sandbox testing
 * before live use. This module returns the data structure that a
 * future submission integration will POST.
 */

export type VatBox = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';

export type VatReturn = {
  jurisdiction: 'UK';
  period: { from: string; to: string };
  // MTD JSON-compatible field names mirror HMRC's Submit VAT Return spec.
  vatDueSales: number;          // Box 1
  vatDueAcquisitions: number;   // Box 2
  totalVatDue: number;          // Box 3
  vatReclaimedCurrPeriod: number; // Box 4
  netVatDue: number;            // Box 5 — always >= 0 per HMRC spec
  totalValueSalesExVAT: number; // Box 6
  totalValuePurchasesExVAT: number; // Box 7
  totalValueGoodsSuppliedExVAT: number; // Box 8
  totalAcquisitionsExVAT: number;       // Box 9
};

const STD_OUT = new Set(['UK-STD-OUT', 'UK-RED-OUT']);
const ZERO_OUT = new Set(['UK-ZERO-OUT', 'UK-EXEMPT']);
const STD_IN = new Set(['UK-STD-IN']);
const REVERSE = new Set(['UK-RC']);

export async function buildVatReturn(
  supabase: SupabaseClient,
  organizationId: string,
  range: { from: string; to: string },
): Promise<VatReturn> {
  type LineRow = {
    side: 'debit' | 'credit';
    amount_base_currency: number;
    vat_amount: number | null;
    vat_code_id: string | null;
    journal_entries: { entry_date: string; status: string };
    tax_codes: { code: string } | null;
    accounts: { account_type: string } | null;
  };

  const { data } = await supabase
    .from('journal_lines')
    .select(`
      side, amount_base_currency, vat_amount, vat_code_id,
      journal_entries!inner ( entry_date, status ),
      tax_codes ( code ),
      accounts ( account_type )
    `)
    .eq('organization_id', organizationId)
    .eq('journal_entries.status', 'posted')
    .gte('journal_entries.entry_date', range.from)
    .lte('journal_entries.entry_date', range.to);

  const rows = (data ?? []) as unknown as LineRow[];

  let box1 = 0;
  let box2 = 0;
  let box4 = 0;
  let box6 = 0;
  let box7 = 0;
  let box8 = 0;
  let box9 = 0;

  for (const r of rows) {
    const code = r.tax_codes?.code ?? '';
    const net = Number(r.amount_base_currency);
    const vat = Number(r.vat_amount ?? 0);
    const accountType = r.accounts?.account_type;

    if (STD_OUT.has(code)) {
      box1 += vat;
      if (accountType === 'revenue') box6 += net;
    } else if (ZERO_OUT.has(code)) {
      if (accountType === 'revenue') box6 += net;
    } else if (STD_IN.has(code)) {
      box4 += vat;
      if (accountType === 'expense' || accountType === 'asset') box7 += net;
    } else if (REVERSE.has(code)) {
      // Reverse charge — both an output and a reclaim. Box 1 + Box 4
      // each receive the same VAT figure under MTD conventions.
      box1 += vat;
      box4 += vat;
      // EU-supplied services on reverse charge contribute to Box 6 + Box 7.
      box6 += net;
      box7 += net;
      // EU goods specifically — would feed Box 2 + Box 9 in a real
      // implementation that tracks counterparty country. The current
      // schema doesn't capture counterparty country; box 2 + 9 stay
      // zero pending that enrichment.
    }
  }

  const box3 = box1 + box2;
  const box5 = Math.abs(box3 - box4);

  return {
    jurisdiction: 'UK',
    period: range,
    vatDueSales: round2(box1),
    vatDueAcquisitions: round2(box2),
    totalVatDue: round2(box3),
    vatReclaimedCurrPeriod: round2(box4),
    netVatDue: round2(box5),
    totalValueSalesExVAT: round2(box6),
    totalValuePurchasesExVAT: round2(box7),
    totalValueGoodsSuppliedExVAT: round2(box8),
    totalAcquisitionsExVAT: round2(box9),
  };
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}
