/**
 * VAT computation helpers shared between the journal composer and the
 * report engine. Rounding is half-away-from-zero at minor-unit precision
 * (matching the convention used by Skatteetaten and HMRC for VAT-100
 * filing). For US sales tax, the same rounding works because sales tax
 * is computed at line level on the same minor-unit basis.
 */

export type VatComputation = {
  net: number;
  vat: number;
  gross: number;
};

function roundMinor(value: number, minorUnits: number): number {
  const factor = 10 ** minorUnits;
  return Math.sign(value) * Math.round(Math.abs(value) * factor) / factor;
}

/**
 * Compute VAT given a NET amount (i.e. amount excludes tax). Returns the
 * VAT and gross. Use {@link computeFromGross} when the input is the
 * tax-inclusive amount (typical for cash-register and receipt entry).
 */
export function computeFromNet(
  netAmount: number,
  ratePercent: number,
  minorUnits = 2,
): VatComputation {
  const net = roundMinor(netAmount, minorUnits);
  const vat = roundMinor(net * (ratePercent / 100), minorUnits);
  const gross = roundMinor(net + vat, minorUnits);
  return { net, vat, gross };
}

/**
 * Compute VAT given a GROSS amount (tax-inclusive). The formula
 *    net = gross / (1 + rate/100)
 * is rearranged to avoid double rounding — we round the gross first,
 * compute the implied vat, then derive net = gross - vat.
 */
export function computeFromGross(
  grossAmount: number,
  ratePercent: number,
  minorUnits = 2,
): VatComputation {
  const gross = roundMinor(grossAmount, minorUnits);
  const vat = roundMinor(gross - gross / (1 + ratePercent / 100), minorUnits);
  const net = roundMinor(gross - vat, minorUnits);
  return { net, vat, gross };
}

/**
 * Pick the rate effective at a given date from a list of vat_rates rows.
 * Returns null when no rate covers the date. The rate table is the
 * source of truth for retrospective period reports.
 */
export function pickEffectiveRate<T extends { rate_percent: number; effective_from: string; effective_to: string | null }>(
  rates: T[],
  onDate: string,
): T | null {
  const candidates = rates.filter(
    (r) =>
      r.effective_from <= onDate &&
      (r.effective_to === null || r.effective_to >= onDate),
  );
  if (candidates.length === 0) return null;
  // Latest effective_from wins on overlap.
  candidates.sort((a, b) => (a.effective_from > b.effective_from ? -1 : 1));
  return candidates[0];
}
