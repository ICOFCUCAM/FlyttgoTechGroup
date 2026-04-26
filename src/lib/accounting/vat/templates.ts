import type { FrameworkCode } from '../frameworks';

export type TaxCodeTemplate = {
  code: string;
  name: string;
  description?: string;
  default_rate_percent: number;
  reverse_charge?: boolean;
};

/**
 * Tax code skeletons keyed by framework. Real rates land in Phase 6.
 * The accountant can override per-rate values via the VAT center —
 * these are factory defaults only.
 */
export const TAX_CODE_TEMPLATES: Record<FrameworkCode, TaxCodeTemplate[]> = {
  NO: [],
  UK: [],
  US: [],
  IFRS: [],
};
