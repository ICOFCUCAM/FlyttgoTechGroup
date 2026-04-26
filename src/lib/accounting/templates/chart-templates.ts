import type { FrameworkCode } from '../frameworks';

export type ChartAccountTemplate = {
  code: string;
  name: string;
  account_type: 'asset' | 'liability' | 'equity' | 'revenue' | 'expense' | 'contra';
  is_statutory?: boolean;
  vat_default_code?: string | null;
};

/**
 * Per-framework chart of accounts skeletons. These are starting points
 * — Phase 4 expands them into the full statutory chart for each
 * jurisdiction. Real production deployments must be reviewed by a
 * licensed accountant for the destination jurisdiction before posting
 * statutory reports.
 */
export const CHART_TEMPLATES: Record<FrameworkCode, ChartAccountTemplate[]> = {
  NO: [],
  UK: [],
  US: [],
  IFRS: [],
};
