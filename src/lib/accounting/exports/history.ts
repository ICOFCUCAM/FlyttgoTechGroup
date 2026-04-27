import 'server-only';

import { getSupabaseServerClient } from '@/lib/supabase';

export type ExportType =
  | 'saf-t'
  | 'mva'
  | 'vat-100'
  | 'gaap-trial-balance'
  | 'gaap-general-ledger'
  | 'gaap-income-statement'
  | 'gaap-balance-sheet'
  | 'ifrs-package'
  | 'csv'
  | 'doc'
  | 'pdf';

export type RecordExportArgs = {
  organizationId: string;
  userId: string;
  exportType: ExportType;
  jurisdiction: 'NO' | 'UK' | 'US' | 'IFRS' | null;
  periodFrom?: string | null;
  periodTo?: string | null;
  fileName?: string | null;
  fileLocation?: string | null;
  byteSize?: number | null;
};

/**
 * Append-only export-history writer. Failures are swallowed but logged
 * — emitting the document itself is the user-visible operation; the
 * registry is observability, not a gating control.
 */
export async function recordExport(args: RecordExportArgs): Promise<void> {
  try {
    const supabase = getSupabaseServerClient();
    await supabase.from('export_history').insert({
      organization_id: args.organizationId,
      user_id: args.userId,
      export_type: args.exportType,
      jurisdiction: args.jurisdiction,
      period_from: args.periodFrom ?? null,
      period_to: args.periodTo ?? null,
      file_name: args.fileName ?? null,
      file_location: args.fileLocation ?? null,
      byte_size: args.byteSize ?? null,
    });
  } catch (err) {
    console.error('[export-history] insert failed', err);
  }
}
