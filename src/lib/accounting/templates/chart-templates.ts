import type { FrameworkCode } from '../frameworks';

export type ChartAccountTemplate = {
  code: string;
  name: string;
  account_type: 'asset' | 'liability' | 'equity' | 'revenue' | 'expense' | 'contra';
  is_statutory?: boolean;
  vat_default_code?: string | null;
};

/**
 * Norwegian Standard Kontoplan (NS 4102) — high-frequency posting
 * accounts. Source: Norsk Standard NS 4102. Statutory flagging marks
 * accounts that must remain in the chart for VAT and årsregnskap
 * (annual accounts) reporting; deactivation is allowed, deletion is
 * not (enforced by guard_statutory_account_delete trigger).
 */
const NO_KONTOPLAN: ChartAccountTemplate[] = [
  // Klasse 1 — Eiendeler (Assets)
  { code: '1000', name: 'Forskning og utvikling', account_type: 'asset' },
  { code: '1020', name: 'Konsesjoner', account_type: 'asset' },
  { code: '1080', name: 'Goodwill', account_type: 'asset' },
  { code: '1130', name: 'Tomter, eiendommer', account_type: 'asset', is_statutory: true },
  { code: '1230', name: 'Maskiner og anlegg', account_type: 'asset' },
  { code: '1250', name: 'Inventar', account_type: 'asset' },
  { code: '1280', name: 'Kontormaskiner', account_type: 'asset' },
  { code: '1500', name: 'Kundefordringer', account_type: 'asset', is_statutory: true },
  { code: '1530', name: 'Opptjente, ikke fakturerte inntekter', account_type: 'asset' },
  { code: '1900', name: 'Kontanter', account_type: 'asset' },
  { code: '1920', name: 'Bankinnskudd', account_type: 'asset', is_statutory: true },
  { code: '1950', name: 'Bankinnskudd valuta', account_type: 'asset' },

  // Klasse 2 — Egenkapital og gjeld (Equity & liabilities)
  { code: '2000', name: 'Aksjekapital', account_type: 'equity', is_statutory: true },
  { code: '2050', name: 'Annen egenkapital', account_type: 'equity', is_statutory: true },
  { code: '2080', name: 'Udekket tap', account_type: 'equity' },
  { code: '2200', name: 'Konvertible lån', account_type: 'liability' },
  { code: '2240', name: 'Pantelån', account_type: 'liability' },
  { code: '2400', name: 'Leverandørgjeld', account_type: 'liability', is_statutory: true },
  { code: '2600', name: 'Skattetrekk', account_type: 'liability', is_statutory: true },
  { code: '2700', name: 'Utgående merverdiavgift, høy sats', account_type: 'liability', is_statutory: true, vat_default_code: 'NO-OUT-HIGH' },
  { code: '2710', name: 'Inngående merverdiavgift, høy sats', account_type: 'asset', is_statutory: true, vat_default_code: 'NO-IN-HIGH' },
  { code: '2740', name: 'Oppgjørskonto merverdiavgift', account_type: 'liability', is_statutory: true },
  { code: '2770', name: 'Skyldig arbeidsgiveravgift', account_type: 'liability', is_statutory: true },
  { code: '2780', name: 'Påløpt arbeidsgiveravgift', account_type: 'liability' },

  // Klasse 3 — Salgs- og driftsinntekter (Revenue)
  { code: '3000', name: 'Salgsinntekt, avgiftspliktig høy sats', account_type: 'revenue', is_statutory: true, vat_default_code: 'NO-OUT-HIGH' },
  { code: '3010', name: 'Salgsinntekt, avgiftspliktig middels sats', account_type: 'revenue', vat_default_code: 'NO-OUT-MID' },
  { code: '3100', name: 'Salgsinntekt, avgiftsfri', account_type: 'revenue', vat_default_code: 'NO-OUT-ZERO' },
  { code: '3900', name: 'Annen driftsrelatert inntekt', account_type: 'revenue' },

  // Klasse 4 — Varekostnad
  { code: '4000', name: 'Varekjøp, høy sats', account_type: 'expense', vat_default_code: 'NO-IN-HIGH' },
  { code: '4090', name: 'Innkjøpsprisavvik', account_type: 'expense' },

  // Klasse 5 — Lønnskostnader
  { code: '5000', name: 'Lønn til ansatte', account_type: 'expense', is_statutory: true },
  { code: '5400', name: 'Arbeidsgiveravgift', account_type: 'expense', is_statutory: true },
  { code: '5800', name: 'Refusjon av sykepenger', account_type: 'expense' },

  // Klasse 6 — Andre driftskostnader
  { code: '6300', name: 'Leie lokaler', account_type: 'expense', vat_default_code: 'NO-IN-HIGH' },
  { code: '6500', name: 'Verktøy, inventar', account_type: 'expense' },
  { code: '6700', name: 'Fremmed tjeneste', account_type: 'expense', vat_default_code: 'NO-IN-HIGH' },
  { code: '6800', name: 'Kontorrekvisita', account_type: 'expense', vat_default_code: 'NO-IN-HIGH' },
  { code: '6900', name: 'Telekommunikasjon, porto', account_type: 'expense', vat_default_code: 'NO-IN-HIGH' },

  // Klasse 7
  { code: '7000', name: 'Drivstoff', account_type: 'expense' },
  { code: '7100', name: 'Reisekostnad', account_type: 'expense' },
  { code: '7140', name: 'Reisekostnad, ikke oppgavepliktig', account_type: 'expense' },
  { code: '7320', name: 'Reklamekostnader', account_type: 'expense' },
  { code: '7770', name: 'Bankgebyrer', account_type: 'expense' },

  // Klasse 8 — Finansposter og resultatdisponering
  { code: '8050', name: 'Renteinntekt fra bank', account_type: 'revenue' },
  { code: '8150', name: 'Rentekostnad', account_type: 'expense' },
  { code: '8160', name: 'Valutatap', account_type: 'expense' },
  { code: '8060', name: 'Valutagevinst', account_type: 'revenue' },
  { code: '8300', name: 'Betalbar skatt', account_type: 'expense', is_statutory: true },
  { code: '8800', name: 'Årsresultat', account_type: 'equity', is_statutory: true },
];

/**
 * UK FRS-102 Section 1A starting chart. Codes follow the SAGE-style
 * 4-digit nominal-code convention common across UK accounting software.
 * Source: FRS-102 disclosure requirements + HMRC VAT-100 box mapping.
 */
const UK_GAAP: ChartAccountTemplate[] = [
  // Fixed assets (0001-0999)
  { code: '0010', name: 'Freehold property', account_type: 'asset', is_statutory: true },
  { code: '0020', name: 'Plant and machinery', account_type: 'asset' },
  { code: '0030', name: 'Office equipment', account_type: 'asset' },
  { code: '0040', name: 'Furniture and fixtures', account_type: 'asset' },
  { code: '0050', name: 'Motor vehicles', account_type: 'asset' },

  // Current assets (1000-1999)
  { code: '1100', name: 'Trade debtors', account_type: 'asset', is_statutory: true },
  { code: '1200', name: 'Bank current account', account_type: 'asset', is_statutory: true },
  { code: '1230', name: 'Petty cash', account_type: 'asset' },
  { code: '1240', name: 'Bank deposit account', account_type: 'asset' },

  // Current liabilities (2000-2399)
  { code: '2100', name: 'Trade creditors', account_type: 'liability', is_statutory: true },
  { code: '2200', name: 'VAT control account', account_type: 'liability', is_statutory: true },
  { code: '2201', name: 'VAT — sales (output)', account_type: 'liability', is_statutory: true, vat_default_code: 'UK-STD-OUT' },
  { code: '2202', name: 'VAT — purchases (input)', account_type: 'asset', is_statutory: true, vat_default_code: 'UK-STD-IN' },
  { code: '2210', name: 'PAYE / NIC control', account_type: 'liability', is_statutory: true },
  { code: '2220', name: 'Wages control', account_type: 'liability' },
  { code: '2300', name: 'Loans (current portion)', account_type: 'liability' },

  // Long-term liabilities (2400-2999)
  { code: '2500', name: 'Loans — long term', account_type: 'liability' },
  { code: '2700', name: 'Hire purchase obligations', account_type: 'liability' },

  // Capital (3000-3999)
  { code: '3000', name: 'Ordinary share capital', account_type: 'equity', is_statutory: true },
  { code: '3100', name: 'Share premium', account_type: 'equity', is_statutory: true },
  { code: '3200', name: 'Retained earnings', account_type: 'equity', is_statutory: true },

  // Sales (4000-4999)
  { code: '4000', name: 'Sales — standard rate', account_type: 'revenue', is_statutory: true, vat_default_code: 'UK-STD-OUT' },
  { code: '4001', name: 'Sales — reduced rate', account_type: 'revenue', vat_default_code: 'UK-RED-OUT' },
  { code: '4002', name: 'Sales — zero rate', account_type: 'revenue', vat_default_code: 'UK-ZERO-OUT' },
  { code: '4900', name: 'Other operating income', account_type: 'revenue' },

  // Cost of sales (5000-5999)
  { code: '5000', name: 'Materials purchased', account_type: 'expense', vat_default_code: 'UK-STD-IN' },
  { code: '5100', name: 'Subcontractors', account_type: 'expense', vat_default_code: 'UK-STD-IN' },

  // Overheads (6000-9999)
  { code: '7000', name: 'Gross wages', account_type: 'expense', is_statutory: true },
  { code: '7006', name: 'Employer NIC', account_type: 'expense', is_statutory: true },
  { code: '7100', name: 'Rent', account_type: 'expense', vat_default_code: 'UK-STD-IN' },
  { code: '7200', name: 'Utilities', account_type: 'expense', vat_default_code: 'UK-STD-IN' },
  { code: '7400', name: 'Travel and subsistence', account_type: 'expense' },
  { code: '7500', name: 'Telephone and IT', account_type: 'expense', vat_default_code: 'UK-STD-IN' },
  { code: '7900', name: 'Bank charges', account_type: 'expense' },
  { code: '8200', name: 'Sundry expenses', account_type: 'expense' },
  { code: '9000', name: 'Corporation tax', account_type: 'expense', is_statutory: true },
];

/**
 * US GAAP starting chart. Numbering follows the AICPA-recommended
 * 4-digit convention: 1xxx assets, 2xxx liabilities, 3xxx equity,
 * 4xxx revenue, 5xxx COGS, 6xxx-7xxx operating expenses, 8xxx other,
 * 9xxx tax. Sales tax is jurisdiction-administered — accounts here
 * reflect the most common simplified state-collection pattern.
 */
const US_GAAP: ChartAccountTemplate[] = [
  // Assets
  { code: '1010', name: 'Cash — operating', account_type: 'asset', is_statutory: true },
  { code: '1020', name: 'Cash — payroll', account_type: 'asset' },
  { code: '1100', name: 'Accounts receivable', account_type: 'asset', is_statutory: true },
  { code: '1110', name: 'Allowance for doubtful accounts', account_type: 'contra' },
  { code: '1200', name: 'Inventory', account_type: 'asset' },
  { code: '1500', name: 'Property, plant & equipment', account_type: 'asset', is_statutory: true },
  { code: '1510', name: 'Accumulated depreciation', account_type: 'contra', is_statutory: true },
  { code: '1700', name: 'Intangible assets', account_type: 'asset' },

  // Liabilities
  { code: '2010', name: 'Accounts payable', account_type: 'liability', is_statutory: true },
  { code: '2100', name: 'Sales tax payable', account_type: 'liability', is_statutory: true, vat_default_code: 'US-SALES' },
  { code: '2200', name: 'Federal income tax withheld', account_type: 'liability', is_statutory: true },
  { code: '2210', name: 'FICA payable', account_type: 'liability', is_statutory: true },
  { code: '2300', name: 'Accrued payroll', account_type: 'liability' },
  { code: '2700', name: 'Notes payable — current', account_type: 'liability' },
  { code: '2800', name: 'Long-term debt', account_type: 'liability' },

  // Equity
  { code: '3010', name: 'Common stock', account_type: 'equity', is_statutory: true },
  { code: '3020', name: 'Additional paid-in capital', account_type: 'equity', is_statutory: true },
  { code: '3100', name: 'Retained earnings', account_type: 'equity', is_statutory: true },
  { code: '3200', name: 'Treasury stock', account_type: 'contra' },

  // Revenue
  { code: '4010', name: 'Product revenue', account_type: 'revenue', is_statutory: true, vat_default_code: 'US-SALES' },
  { code: '4020', name: 'Service revenue', account_type: 'revenue', vat_default_code: 'US-SALES' },
  { code: '4090', name: 'Sales returns and allowances', account_type: 'contra' },

  // COGS
  { code: '5010', name: 'Cost of goods sold', account_type: 'expense', is_statutory: true },
  { code: '5020', name: 'Direct labor', account_type: 'expense' },

  // Operating expenses
  { code: '6010', name: 'Salaries and wages', account_type: 'expense', is_statutory: true },
  { code: '6020', name: 'Employer payroll taxes', account_type: 'expense', is_statutory: true },
  { code: '6100', name: 'Rent expense', account_type: 'expense' },
  { code: '6200', name: 'Utilities', account_type: 'expense' },
  { code: '6300', name: 'Office supplies', account_type: 'expense' },
  { code: '6400', name: 'Travel and entertainment', account_type: 'expense' },
  { code: '6500', name: 'Professional fees', account_type: 'expense' },
  { code: '6600', name: 'Software subscriptions', account_type: 'expense' },
  { code: '6700', name: 'Insurance', account_type: 'expense' },
  { code: '6800', name: 'Depreciation expense', account_type: 'expense', is_statutory: true },

  // Other / non-operating
  { code: '8010', name: 'Interest income', account_type: 'revenue' },
  { code: '8020', name: 'Interest expense', account_type: 'expense' },
  { code: '8030', name: 'Foreign-exchange gain/loss', account_type: 'expense' },

  // Tax
  { code: '9010', name: 'Federal income tax', account_type: 'expense', is_statutory: true },
  { code: '9020', name: 'State income tax', account_type: 'expense', is_statutory: true },
];

/**
 * IFRS — minimal universal chart. Real IFRS deployments inherit from
 * the local jurisdiction's chart; this is a fallback when the
 * organization's reporting jurisdiction is "international" without a
 * specific country chart.
 */
const IFRS_BASE: ChartAccountTemplate[] = [
  { code: '1010', name: 'Cash and cash equivalents', account_type: 'asset', is_statutory: true },
  { code: '1110', name: 'Trade receivables', account_type: 'asset', is_statutory: true },
  { code: '1500', name: 'Property, plant and equipment', account_type: 'asset', is_statutory: true },
  { code: '1600', name: 'Intangible assets', account_type: 'asset' },
  { code: '2010', name: 'Trade payables', account_type: 'liability', is_statutory: true },
  { code: '2100', name: 'Indirect tax payable', account_type: 'liability', is_statutory: true },
  { code: '2300', name: 'Borrowings — current', account_type: 'liability' },
  { code: '2500', name: 'Borrowings — non-current', account_type: 'liability' },
  { code: '3010', name: 'Issued capital', account_type: 'equity', is_statutory: true },
  { code: '3100', name: 'Retained earnings', account_type: 'equity', is_statutory: true },
  { code: '3200', name: 'Other reserves', account_type: 'equity' },
  { code: '4010', name: 'Revenue from contracts with customers', account_type: 'revenue', is_statutory: true },
  { code: '5010', name: 'Cost of sales', account_type: 'expense', is_statutory: true },
  { code: '6010', name: 'Employee benefit expense', account_type: 'expense', is_statutory: true },
  { code: '6100', name: 'Depreciation and amortization', account_type: 'expense', is_statutory: true },
  { code: '6200', name: 'Other operating expense', account_type: 'expense' },
  { code: '8010', name: 'Finance income', account_type: 'revenue' },
  { code: '8020', name: 'Finance cost', account_type: 'expense' },
  { code: '9010', name: 'Income tax expense', account_type: 'expense', is_statutory: true },
];

export const CHART_TEMPLATES: Record<FrameworkCode, ChartAccountTemplate[]> = {
  NO: NO_KONTOPLAN,
  UK: UK_GAAP,
  US: US_GAAP,
  IFRS: IFRS_BASE,
};
