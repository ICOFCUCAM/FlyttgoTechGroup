import { requireRole, getSupabaseAuthClient } from '@/lib/auth/server';
import SectionHeader from '@/components/accounting/SectionHeader';
import FxRateForm from './FxRateForm';

export const dynamic = 'force-dynamic';

export default async function FxPage() {
  const session = await requireRole('accountant');
  const supabase = getSupabaseAuthClient();

  const { data: rates } = await supabase
    .from('exchange_rates')
    .select('id, rate_date, base_currency, quote_currency, rate, source, created_at')
    .eq('organization_id', session.organizationId)
    .order('rate_date', { ascending: false })
    .order('base_currency')
    .limit(100);

  const { data: currencies } = await supabase
    .from('currencies')
    .select('code, name')
    .order('code');

  return (
    <div>
      <SectionHeader
        code="AC.06"
        eyebrow="FX rates"
        title="Exchange rate snapshots"
        description="Record the rate snapshot used to convert foreign-currency lines into base currency at posting time. Posted entries inherit the rate active on their entry date."
        meta={<span>{rates?.length ?? 0} rates on file</span>}
      />

      <div className="mt-8">
        <FxRateForm currencies={currencies ?? []} />
      </div>

      <div className="mt-10 rounded-2xl border border-slate-200/80 dark:border-slate-800/60 overflow-hidden">
        <table className="w-full text-sm tabular-nums">
          <thead className="bg-slate-50 dark:bg-slate-900/60 text-left">
            <tr className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
              <th className="px-4 py-3 w-32">Date</th>
              <th className="px-4 py-3 w-24">Base</th>
              <th className="px-4 py-3 w-24">Quote</th>
              <th className="px-4 py-3 w-32 text-right">Rate</th>
              <th className="px-4 py-3">Source</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200/60 dark:divide-slate-800/60">
            {(rates ?? []).map((r) => (
              <tr key={r.id}>
                <td className="px-4 py-2.5 font-mono text-[12px] text-slate-700 dark:text-slate-300">
                  {r.rate_date}
                </td>
                <td className="px-4 py-2.5 font-mono text-slate-900 dark:text-white">
                  {r.base_currency}
                </td>
                <td className="px-4 py-2.5 font-mono text-slate-900 dark:text-white">
                  {r.quote_currency}
                </td>
                <td className="px-4 py-2.5 text-right tabular-nums text-slate-900 dark:text-white">
                  {Number(r.rate).toFixed(6)}
                </td>
                <td className="px-4 py-2.5 text-slate-600 dark:text-slate-400">
                  {r.source ?? <span className="text-slate-400">—</span>}
                </td>
              </tr>
            ))}
            {(!rates || rates.length === 0) && (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-slate-400">
                  No rates recorded yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
