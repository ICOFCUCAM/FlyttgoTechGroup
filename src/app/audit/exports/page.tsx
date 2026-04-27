import { requireRole, getSupabaseAuthClient } from '@/lib/auth/server';
import SectionHeader from '@/components/accounting/SectionHeader';

export const dynamic = 'force-dynamic';

const TYPE_LABEL: Record<string, string> = {
  'saf-t': 'SAF-T XML (Norway)',
  mva: 'MVA summary (Norway)',
  'vat-100': 'VAT-100 (UK)',
  'gaap-trial-balance': 'GAAP trial balance (US)',
  'gaap-general-ledger': 'GAAP general ledger (US)',
  'gaap-income-statement': 'GAAP income statement (US)',
  'gaap-balance-sheet': 'GAAP balance sheet (US)',
  'ifrs-package': 'IFRS reporting package',
  csv: 'Generic CSV',
  doc: 'Generic DOC',
  pdf: 'Generic PDF',
};

export default async function AuditorExportRegistryPage({
  searchParams,
}: {
  searchParams: { jurisdiction?: string; type?: string };
}) {
  const session = await requireRole('auditor');
  const supabase = getSupabaseAuthClient();

  let query = supabase
    .from('export_history')
    .select('id, export_type, jurisdiction, period_from, period_to, file_name, emitted_at, user_id')
    .eq('organization_id', session.organizationId)
    .order('emitted_at', { ascending: false })
    .limit(200);
  if (searchParams.jurisdiction) {
    query = query.eq('jurisdiction', searchParams.jurisdiction);
  }
  if (searchParams.type) {
    query = query.eq('export_type', searchParams.type);
  }

  const { data: rows } = await query;

  return (
    <div>
      <SectionHeader
        code="AU.04"
        eyebrow="Export registry"
        title="Statutory export history"
        description="Append-only registry of every statutory export emitted from this organization. Filter by jurisdiction or export type. Each row carries the responsible user id, the period covered, and the file name as emitted."
        meta={<span>{(rows ?? []).length} entries</span>}
      />

      <div className="mt-6 flex flex-wrap items-center gap-2 print:hidden">
        {['NO', 'UK', 'US', 'IFRS'].map((j) => (
          <a
            key={j}
            href={`/audit/exports?jurisdiction=${j}`}
            className={`px-2.5 py-1 rounded-md border font-mono text-[10px] uppercase tracking-[0.18em] ${
              searchParams.jurisdiction === j
                ? 'bg-[#0A3A6B] text-white border-[#0A3A6B]'
                : 'border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900'
            }`}
          >
            {j}
          </a>
        ))}
        {(searchParams.jurisdiction || searchParams.type) && (
          <a
            href="/audit/exports"
            className="px-2.5 py-1 rounded-md border border-slate-300 dark:border-slate-700 font-mono text-[10px] uppercase tracking-[0.18em] hover:bg-slate-50 dark:hover:bg-slate-900"
          >
            Clear
          </a>
        )}
      </div>

      <div className="mt-8 rounded-2xl border border-slate-200/80 dark:border-slate-800/60 overflow-hidden">
        <table className="w-full text-sm tabular-nums">
          <thead className="bg-slate-50 dark:bg-slate-900/60 text-left">
            <tr className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
              <th className="px-4 py-3 w-44">Emitted</th>
              <th className="px-4 py-3 w-44">Type</th>
              <th className="px-4 py-3 w-24">Jurisdiction</th>
              <th className="px-4 py-3">Period</th>
              <th className="px-4 py-3">File name</th>
              <th className="px-4 py-3 w-72">User</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200/60 dark:divide-slate-800/60">
            {(rows ?? []).map((r) => (
              <tr key={r.id}>
                <td className="px-4 py-2 font-mono text-[12px] text-slate-700 dark:text-slate-300">
                  {r.emitted_at?.replace('T', ' ').slice(0, 19)}
                </td>
                <td className="px-4 py-2 font-mono text-[11px] tracking-tight text-[#0A3A6B] dark:text-[#9ED0F9]">
                  {TYPE_LABEL[r.export_type] ?? r.export_type}
                </td>
                <td className="px-4 py-2 font-mono text-[11px]">{r.jurisdiction ?? '—'}</td>
                <td className="px-4 py-2 font-mono text-[12px] text-slate-500">
                  {r.period_from && r.period_to ? `${r.period_from} → ${r.period_to}` : '—'}
                </td>
                <td className="px-4 py-2 font-mono text-[12px] text-slate-700 dark:text-slate-300 truncate">
                  {r.file_name ?? '—'}
                </td>
                <td className="px-4 py-2 font-mono text-[11px] text-slate-500 truncate">
                  {r.user_id ?? <span className="text-slate-400">system</span>}
                </td>
              </tr>
            ))}
            {(!rows || rows.length === 0) && (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-slate-400">
                  No exports recorded yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">
        Append-only at the policy level — UPDATE and DELETE on
        export_history are blocked by the RLS deny policies.
      </p>
    </div>
  );
}
