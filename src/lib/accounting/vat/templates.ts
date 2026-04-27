import type { FrameworkCode } from '../frameworks';

export type TaxCodeTemplate = {
  code: string;
  name: string;
  description?: string;
  default_rate_percent: number;
  reverse_charge?: boolean;
  effective_from: string;
};

/**
 * VAT / sales-tax tax-code seeds per framework. Rates reflect statutory
 * defaults at time of writing. Production deployments must verify rates
 * against the current tax authority publication and refresh when rates
 * change — the vat_rates table carries effective_from / effective_to so
 * historical rates stay queryable for retrospective period reports.
 *
 * Sources:
 *   NO  — Skatteetaten (Norwegian Tax Administration)
 *   UK  — HMRC VAT-100 box mapping
 *   US  — Per-state administered; this is a simplified single-rate model
 */
export const TAX_CODE_TEMPLATES: Record<FrameworkCode, TaxCodeTemplate[]> = {
  NO: [
    {
      code: 'NO-OUT-HIGH',
      name: 'Utgående MVA 25%',
      description: 'Standard rate — output VAT on domestic sales of goods and most services.',
      default_rate_percent: 25,
      effective_from: '2024-01-01',
    },
    {
      code: 'NO-OUT-MID',
      name: 'Utgående MVA 15%',
      description: 'Reduced rate — output VAT on foodstuffs.',
      default_rate_percent: 15,
      effective_from: '2024-01-01',
    },
    {
      code: 'NO-OUT-LOW',
      name: 'Utgående MVA 12%',
      description: 'Lowered rate — output VAT on transport, hospitality, culture.',
      default_rate_percent: 12,
      effective_from: '2024-01-01',
    },
    {
      code: 'NO-OUT-ZERO',
      name: 'Utgående MVA 0%',
      description: 'Zero-rated — exports and certain exempt supplies.',
      default_rate_percent: 0,
      effective_from: '2024-01-01',
    },
    {
      code: 'NO-IN-HIGH',
      name: 'Inngående MVA 25%',
      description: 'Standard rate — input VAT on domestic purchases.',
      default_rate_percent: 25,
      effective_from: '2024-01-01',
    },
    {
      code: 'NO-IN-MID',
      name: 'Inngående MVA 15%',
      description: 'Reduced rate — input VAT on foodstuffs.',
      default_rate_percent: 15,
      effective_from: '2024-01-01',
    },
    {
      code: 'NO-IN-LOW',
      name: 'Inngående MVA 12%',
      description: 'Lowered rate — input VAT on transport, hospitality, culture.',
      default_rate_percent: 12,
      effective_from: '2024-01-01',
    },
    {
      code: 'NO-IN-RC',
      name: 'Inngående MVA — omvendt avgiftsplikt',
      description: 'Reverse charge — services from foreign supplier.',
      default_rate_percent: 25,
      reverse_charge: true,
      effective_from: '2024-01-01',
    },
    {
      code: 'NO-EXEMPT',
      name: 'Utenfor avgiftsområdet',
      description: 'Outside the scope of VAT.',
      default_rate_percent: 0,
      effective_from: '2024-01-01',
    },
  ],
  UK: [
    {
      code: 'UK-STD-OUT',
      name: 'Standard rate (output)',
      description: 'Output VAT on standard-rated supplies — Box 1.',
      default_rate_percent: 20,
      effective_from: '2011-01-04',
    },
    {
      code: 'UK-STD-IN',
      name: 'Standard rate (input)',
      description: 'Input VAT on standard-rated purchases — Box 4.',
      default_rate_percent: 20,
      effective_from: '2011-01-04',
    },
    {
      code: 'UK-RED-OUT',
      name: 'Reduced rate (output)',
      description: 'Output VAT on reduced-rated supplies (5%).',
      default_rate_percent: 5,
      effective_from: '1997-09-01',
    },
    {
      code: 'UK-ZERO-OUT',
      name: 'Zero rate (output)',
      description: 'Zero-rated supplies — exports, books, food.',
      default_rate_percent: 0,
      effective_from: '1973-04-01',
    },
    {
      code: 'UK-EXEMPT',
      name: 'Exempt',
      description: 'Exempt supplies — financial services, insurance.',
      default_rate_percent: 0,
      effective_from: '1973-04-01',
    },
    {
      code: 'UK-RC',
      name: 'Reverse charge',
      description: 'Domestic and cross-border reverse-charge transactions.',
      default_rate_percent: 20,
      reverse_charge: true,
      effective_from: '2021-03-01',
    },
  ],
  US: [
    {
      code: 'US-SALES',
      name: 'Sales tax (state-administered)',
      description:
        'Simplified single-jurisdiction sales tax. Real deployments capture the destination-jurisdiction breakdown per line.',
      default_rate_percent: 0,
      effective_from: '2024-01-01',
    },
    {
      code: 'US-EXEMPT',
      name: 'Sales tax exempt',
      description: 'Resale certificate, government, or non-taxable supply.',
      default_rate_percent: 0,
      effective_from: '2024-01-01',
    },
    {
      code: 'US-USE',
      name: 'Use tax',
      description: 'Self-assessed use tax on out-of-state purchases.',
      default_rate_percent: 0,
      effective_from: '2024-01-01',
    },
  ],
  IFRS: [
    {
      code: 'INT-IDX',
      name: 'Indirect tax (jurisdiction-specific)',
      description: 'Placeholder — real rates depend on the local jurisdiction.',
      default_rate_percent: 0,
      effective_from: '2024-01-01',
    },
    {
      code: 'INT-EXEMPT',
      name: 'Exempt',
      description: 'Outside indirect-tax scope.',
      default_rate_percent: 0,
      effective_from: '2024-01-01',
    },
  ],
};
