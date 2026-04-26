import 'server-only';

import type { SupabaseClient } from '@supabase/supabase-js';

/**
 * Resolve the exchange rate to use when posting a journal line.
 *
 * Priority order:
 *   1. Explicit override passed through the composer (always wins).
 *   2. The latest exchange_rates row at-or-before the entry date for
 *      (organization_id, base_currency, quote_currency).
 *   3. 1.0 — only when from === to. Otherwise we surface an error so
 *      the accountant must record a rate before posting.
 *
 * The returned rate snapshot is stamped onto journal_lines.exchange_rate
 * — the generated column amount_base_currency = amount * exchange_rate
 * means subsequent rate revisions don't affect already-posted lines.
 */
export type ResolveRateArgs = {
  supabase: SupabaseClient;
  organizationId: string;
  fromCurrency: string;
  toCurrency: string;
  onDate: string; // YYYY-MM-DD
  override?: number;
};

export type ResolveRateResult =
  | { ok: true; rate: number; source: 'override' | 'snapshot' | 'identity' }
  | { ok: false; error: string };

export async function resolveExchangeRate({
  supabase,
  organizationId,
  fromCurrency,
  toCurrency,
  onDate,
  override,
}: ResolveRateArgs): Promise<ResolveRateResult> {
  if (typeof override === 'number' && override > 0) {
    return { ok: true, rate: override, source: 'override' };
  }
  if (fromCurrency === toCurrency) {
    return { ok: true, rate: 1, source: 'identity' };
  }

  const { data, error } = await supabase
    .from('exchange_rates')
    .select('rate, rate_date')
    .eq('organization_id', organizationId)
    .eq('base_currency', fromCurrency)
    .eq('quote_currency', toCurrency)
    .lte('rate_date', onDate)
    .order('rate_date', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    return { ok: false, error: error.message };
  }
  if (!data) {
    return {
      ok: false,
      error: `No exchange rate on or before ${onDate} for ${fromCurrency} → ${toCurrency}.`,
    };
  }
  return { ok: true, rate: Number(data.rate), source: 'snapshot' };
}
