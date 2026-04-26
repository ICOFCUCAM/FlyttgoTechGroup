import { requireRole, getSupabaseAuthClient } from '@/lib/auth/server';
import SectionHeader from '@/components/accounting/SectionHeader';
import PeriodPicker from '@/components/accounting/PeriodPicker';
import { buildTrialBalance } from '@/lib/accounting/reports';
import { isFrameworkCode, formatAmount } from '@/lib/accounting/frameworks';

export const dynamic = 'force-dynamic';

function defaultRange() {
  const now = new Date();
  const from = new Date(now.getFullYear(), 0, 1);
  return {
    from: from.toISOString().slice(0, 10),
    to: now.toISOString().slice(0, 10),
  };
}

export default async function TrialBalancePage({
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

  const def = defaultRange();
  const range = {
    from: searchParams.from && /^\d{4}-\d{2}-\d{2}$/.test(searchParams.from) ? searchParams.from : def.from,
    to: searchParams.to && /^\d{4}-\d{2}-\d{2}$/.test(searchParams.to) ? searchParams.to : def.to,
  };

  const { rows, totals } = await buildTrialBalance(supabase, session.organizationId!, range);

  return (
    <div>
      <SectionHeader
        code="AC.04.01"
        eyebrow="Trial balance"
        title="Trial balance"
        description={`Posted journal lines aggregated by account from ${range.from} to ${range.to}.`}
        meta={<span>{rows.length} accounts</span>}
      />
      <div className="mt-6">
        <PeriodPicker
          from={range.from}
          to={range.to}
          basePath="/accounting/reports/trial-balance"
          exportReport="trial-balance"
          exportFormats={['csv', 'doc', 'pdf']}
        />
      </div>

      <div className="mt-8 rounded-2xl border border-slate-200/80 dark:border-slate-800/60 overflow-hidden print:border-0 print:rounded-none">
        <table className="w-full text-sm tabular-nums">
          <thead className="bg-slate-50 dark:bg-slate-900/60 text-left">
            <tr className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
              <th className="px-4 py-3 w-24">Code</th>
              <th className="px-4 py-3">Account</th>
              <th className="px-4 py-3 w-24">Type</th>
              <th className="px-4 py-3 w-32 text-right">Debit</th>
              <th className="px-4 py-3 w-32 text-right">Credit</th>
              <th className="px-4 py-3 w-32 text-right">Balance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200/60 dark:divide-slate-800/60">
            {rows.map((r) => (
              <tr key={r.account_id} className="break-inside-avoid">
                <td className="px-4 py-2 font-mono text-slate-900 dark:text-white">{r.code}</td>
                <td className="px-4 py-2 text-slate-800 dark:text-slate-200">{r.name}</td>
                <td className="px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-slate-500">
                  {r.account_type}
                </td>
                <td className="px-4 py-2 text-right">{r.debit > 0 ? formatAmount(r.debit, framework) : '—'}</td>
                <td className="px-4 py-2 text-right">{r.credit > 0 ? formatAmount(r.credit, framework) : '—'}</td>
                <td className="px-4 py-2 text-right font-medium">
                  {formatAmount(r.balance, framework)}
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-slate-400">
                  No posted activity in this period.
                </td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr className="bg-slate-50 dark:bg-slate-900/60 border-t-2 border-slate-300 dark:border-slate-700 font-semibold">
              <td colSpan={3} className="px-4 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-700 dark:text-slate-200">
                Totals
              </td>
              <td className="px-4 py-3 text-right">{formatAmount(totals.debit, framework)}</td>
              <td className="px-4 py-3 text-right">{formatAmount(totals.credit, framework)}</td>
              <td className="px-4 py-3 text-right">
                <span
                  className={
                    Math.round((totals.debit - totals.credit) * 100) === 0
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-rose-600 dark:text-rose-400'
                  }
                >
                  {formatAmount(totals.debit - totals.credit, framework)}
                </span>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
