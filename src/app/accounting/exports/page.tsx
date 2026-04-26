import { requireRole, getSupabaseAuthClient } from '@/lib/auth/server';
import SectionHeader from '@/components/accounting/SectionHeader';
import { isFrameworkCode, FRAMEWORKS } from '@/lib/accounting/frameworks';
import StatutoryExportPanel from './StatutoryExportPanel';

export const dynamic = 'force-dynamic';

export default async function StatutoryExportsPage({
  searchParams,
}: {
  searchParams: { from?: string; to?: string };
}) {
  const session = await requireRole('auditor');
  const supabase = getSupabaseAuthClient();

  const { data: org } = await supabase
    .from('organizations')
    .select('default_country, base_currency, name, registration_number, vat_number')
    .eq('id', session.organizationId)
    .maybeSingle();

  const framework = isFrameworkCode(org?.default_country) ? org!.default_country : 'NO';
  const cfg = FRAMEWORKS[framework];
  const today = new Date().toISOString().slice(0, 10);
  const yearStart = `${new Date().getFullYear()}-01-01`;
  const range = {
    from: searchParams.from && /^\d{4}-\d{2}-\d{2}$/.test(searchParams.from) ? searchParams.from : yearStart,
    to: searchParams.to && /^\d{4}-\d{2}-\d{2}$/.test(searchParams.to) ? searchParams.to : today,
  };

  const { data: history } = await supabase
    .from('export_history')
    .select('id, export_type, jurisdiction, period_from, period_to, file_name, emitted_at, user_id')
    .eq('organization_id', session.organizationId)
    .order('emitted_at', { ascending: false })
    .limit(40);

  return (
    <div>
      <SectionHeader
        code="AC.07"
        eyebrow="Statutory exports"
        title={`Statutory exports — ${cfg.label}`}
        description={`Jurisdiction-specific export bundles for ${cfg.label}. ${cfg.reportFormat.toUpperCase()} structure. Reporting in ${cfg.baseCurrency}.`}
        meta={<span>{(history ?? []).length} recent exports</span>}
      />

      <div className="mt-8">
        <StatutoryExportPanel
          framework={framework}
          range={range}
          orgName={org?.name ?? null}
          regNumber={org?.registration_number ?? null}
          vatNumber={org?.vat_number ?? null}
        />
      </div>

      <div className="mt-12">
        <h2 className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500">
          <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">EX.HIST</span>
          <span className="mx-2 text-slate-300 dark:text-slate-700">·</span>
          Export history
        </h2>
        <div className="mt-4 rounded-2xl border border-slate-200/80 dark:border-slate-800/60 overflow-hidden">
          <table className="w-full text-sm tabular-nums">
            <thead className="bg-slate-50 dark:bg-slate-900/60 text-left">
              <tr className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
                <th className="px-4 py-3 w-44">Emitted</th>
                <th className="px-4 py-3 w-28">Type</th>
                <th className="px-4 py-3 w-24">Jurisdiction</th>
                <th className="px-4 py-3">Period</th>
                <th className="px-4 py-3">File</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/60 dark:divide-slate-800/60">
              {(history ?? []).map((h) => (
                <tr key={h.id}>
                  <td className="px-4 py-2 font-mono text-[12px] text-slate-700 dark:text-slate-300">
                    {h.emitted_at?.replace('T', ' ').slice(0, 19)}
                  </td>
                  <td className="px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-[#0A3A6B] dark:text-[#9ED0F9]">
                    {h.export_type}
                  </td>
                  <td className="px-4 py-2 font-mono text-[11px]">{h.jurisdiction ?? '—'}</td>
                  <td className="px-4 py-2 font-mono text-[12px] text-slate-500">
                    {h.period_from && h.period_to ? `${h.period_from} → ${h.period_to}` : '—'}
                  </td>
                  <td className="px-4 py-2 font-mono text-[12px] text-slate-700 dark:text-slate-300 truncate">
                    {h.file_name ?? '—'}
                  </td>
                </tr>
              ))}
              {(!history || history.length === 0) && (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-slate-400">
                    No exports recorded yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
