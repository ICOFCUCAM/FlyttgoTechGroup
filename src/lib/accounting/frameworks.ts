/**
 * Accounting framework registry.
 *
 * The four frameworks supported by the workspace. Each carries the
 * default base currency, locale formatting hints, fiscal-year start,
 * VAT period, and report-format selector. Real-world deployments will
 * override these via /accounting/settings (Phase 15) — this is the
 * factory default for newly-onboarded organizations.
 */

export const FRAMEWORK_CODES = ['NO', 'UK', 'US', 'IFRS'] as const;
export type FrameworkCode = (typeof FRAMEWORK_CODES)[number];

export type ReportFormat = 'no-saft' | 'uk-fps' | 'us-gaap' | 'ifrs';

export type FrameworkConfig = {
  code: FrameworkCode;
  label: string;
  jurisdiction: string;
  baseCurrency: string;
  locale: string;
  fiscalYearStartMonth: number;
  vatPeriod: 'monthly' | 'bimonthly' | 'quarterly' | 'yearly';
  numberFormat: 'space-comma' | 'comma-dot' | 'dot-comma';
  dateFormat: 'YYYY-MM-DD' | 'DD/MM/YYYY' | 'MM/DD/YYYY';
  reportFormat: ReportFormat;
  vatLabel: string;
  /** Source authority for the chart of accounts template seeded on activation. */
  chartTemplate:
    | 'NO-Kontoplan'
    | 'UK-GAAP'
    | 'US-GAAP'
    | 'IFRS';
};

export const FRAMEWORKS: Record<FrameworkCode, FrameworkConfig> = {
  NO: {
    code: 'NO',
    label: 'Norway',
    jurisdiction: 'NO',
    baseCurrency: 'NOK',
    locale: 'nb-NO',
    fiscalYearStartMonth: 1,
    vatPeriod: 'bimonthly',
    numberFormat: 'space-comma',
    dateFormat: 'YYYY-MM-DD',
    reportFormat: 'no-saft',
    vatLabel: 'Merverdiavgift (MVA)',
    chartTemplate: 'NO-Kontoplan',
  },
  UK: {
    code: 'UK',
    label: 'United Kingdom',
    jurisdiction: 'GB',
    baseCurrency: 'GBP',
    locale: 'en-GB',
    fiscalYearStartMonth: 4,
    vatPeriod: 'quarterly',
    numberFormat: 'comma-dot',
    dateFormat: 'DD/MM/YYYY',
    reportFormat: 'uk-fps',
    vatLabel: 'Value Added Tax (VAT)',
    chartTemplate: 'UK-GAAP',
  },
  US: {
    code: 'US',
    label: 'United States',
    jurisdiction: 'US',
    baseCurrency: 'USD',
    locale: 'en-US',
    fiscalYearStartMonth: 1,
    vatPeriod: 'quarterly',
    numberFormat: 'comma-dot',
    dateFormat: 'MM/DD/YYYY',
    reportFormat: 'us-gaap',
    vatLabel: 'Sales tax (state-administered)',
    chartTemplate: 'US-GAAP',
  },
  IFRS: {
    code: 'IFRS',
    label: 'IFRS international',
    jurisdiction: 'INT',
    baseCurrency: 'EUR',
    locale: 'en',
    fiscalYearStartMonth: 1,
    vatPeriod: 'quarterly',
    numberFormat: 'space-comma',
    dateFormat: 'YYYY-MM-DD',
    reportFormat: 'ifrs',
    vatLabel: 'Indirect tax (jurisdiction-dependent)',
    chartTemplate: 'IFRS',
  },
};

export function isFrameworkCode(value: unknown): value is FrameworkCode {
  return typeof value === 'string' && (FRAMEWORK_CODES as readonly string[]).includes(value);
}

/**
 * Apply a framework's number format. We intentionally avoid a third-party
 * intl library here — every format we emit is deterministic and audit-
 * inspectable.
 */
export function formatAmount(
  amount: number,
  framework: FrameworkCode,
  options: { currency?: string } = {},
): string {
  const cfg = FRAMEWORKS[framework];
  const currency = options.currency ?? cfg.baseCurrency;
  try {
    return new Intl.NumberFormat(cfg.locale, {
      style: 'currency',
      currency,
      currencyDisplay: 'code',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    return `${amount.toFixed(2)} ${currency}`;
  }
}

export function formatDate(value: Date | string, framework: FrameworkCode): string {
  const date = typeof value === 'string' ? new Date(value) : value;
  if (Number.isNaN(date.getTime())) return String(value);
  const yyyy = date.getUTCFullYear().toString().padStart(4, '0');
  const mm = (date.getUTCMonth() + 1).toString().padStart(2, '0');
  const dd = date.getUTCDate().toString().padStart(2, '0');
  switch (FRAMEWORKS[framework].dateFormat) {
    case 'DD/MM/YYYY':
      return `${dd}/${mm}/${yyyy}`;
    case 'MM/DD/YYYY':
      return `${mm}/${dd}/${yyyy}`;
    case 'YYYY-MM-DD':
    default:
      return `${yyyy}-${mm}-${dd}`;
  }
}
