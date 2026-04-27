import { requireRole, getSupabaseAuthClient } from '@/lib/auth/server';
import SectionHeader from '@/components/accounting/SectionHeader';
import StatutoryReportPrintMeta from '@/components/accounting/StatutoryReportPrintMeta';
import PeriodPicker from '@/components/accounting/PeriodPicker';
import { buildGeneralLedger } from '@/lib/accounting/reports';
import { isFrameworkCode, formatAmount, formatDate } from '@/lib/accounting/frameworks';

export const dynamic = 'force-dynamic';

export default async function GeneralLedgerPage({
  searchParams,
}: {
  searchParams: { from?: string; to?: string };
}) {
  const session = await requireRole('auditor');
  const supabase = getSupabaseAuthClient();
  const { data: settings } = await supabase
    .from('org_settings')
    .select('default_country')
    .eq('organization_id', session.organizationId)
    .maybeSingle();
  const framework = isFrameworkCode(settings?.default_country) ? settings!.default_country : 'NO';

  const now = new Date();
  const def = {
    from: new Date(now.getFullYear(), 0, 1).toISOString().slice(0, 10),
    to: now.toISOString().slice(0, 10),
  };
  const range = {
    from: searchParams.from && /^\d{4}-\d{2}-\d{2}$/.test(searchParams.from) ? searchParams.from : def.from,
    to: searchParams.to && /^\d{4}-\d{2}-\d{2}$/.test(searchParams.to) ? searchParams.to : def.to,
  };

  const rows = await buildGeneralLedger(supabase, session.organizationId!, range);

  return (
    <div className="statutory-report-print">
      {/* Phase 31 — regulator-ready printed header + footer */}
      <StatutoryReportPrintMeta
        organizationId={session.organizationId!}
        reportTitle="General ledger"
        periodLabel={range.from + ' → ' + range.to}
      />

      <SectionHeader
        code="AC.04.02"
        eyebrow="General ledger"
        title="General ledger"
        description={`Every posted line from ${range.from} to ${range.to} ordered chronologically by entry date and entry number.`}
        meta={<span>{rows.length} lines</span>}
      />
      <div className="mt-6">
        <PeriodPicker
          from={range.from}
          to={range.to}
          basePath="/accounting/reports/general-ledger"
          exportReport="general-ledger"
          exportFormats={['csv', 'doc', 'pdf']}
        />
      </div>

      <div className="mt-8 rounded-2xl border border-slate-200/80 dark:border-slate-800/60 overflow-hidden print:border-0 print:rounded-none">
        <table className="w-full text-sm tabular-nums">
          <thead className="bg-slate-50 dark:bg-slate-900/60 text-left">
            <tr className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
              <th className="px-4 py-3 w-24">Entry</th>
              <th className="px-4 py-3 w-32">Date</th>
              <th className="px-4 py-3 w-28">Account</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3 w-20">Side</th>
              <th className="px-4 py-3 w-32 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200/60 dark:divide-slate-800/60">
            {rows.map((r, i) => (
              <tr key={i} className="break-inside-avoid">
                <td className="px-4 py-2 font-mono text-slate-900 dark:text-white">#{r.entry_number}</td>
                <td className="px-4 py-2 font-mono text-[12px] text-slate-700 dark:text-slate-300">
                  {formatDate(r.entry_date, framework)}
                </td>
                <td className="px-4 py-2 font-mono text-slate-900 dark:text-white">{r.account_code}</td>
                <td className="px-4 py-2 text-slate-800 dark:text-slate-200">
                  <div>{r.account_name}</div>
                  {r.description && (
                    <div className="text-[12px] text-slate-500 leading-snug mt-0.5">{r.description}</div>
                  )}
                </td>
                <td className="px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-slate-500">
                  {r.side}
                </td>
                <td className="px-4 py-2 text-right">{formatAmount(r.amount, framework)}</td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-slate-400">
                  No posted lines in this period.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
