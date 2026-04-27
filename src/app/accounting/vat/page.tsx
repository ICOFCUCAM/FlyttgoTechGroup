import { requireRole, getSupabaseAuthClient } from '@/lib/auth/server';
import SectionHeader from '@/components/accounting/SectionHeader';
import { isFrameworkCode, FRAMEWORKS } from '@/lib/accounting/frameworks';

export const dynamic = 'force-dynamic';

type CodeRow = {
  id: string;
  code: string;
  name: string;
  description: string | null;
  is_active: boolean;
  vat_rates: Array<{
    rate_percent: number;
    effective_from: string;
    effective_to: string | null;
    reverse_charge: boolean;
  }>;
};

export default async function VatCenterPage() {
  const session = await requireRole('accountant');
  const supabase = getSupabaseAuthClient();

  const { data: settings } = await supabase
    .from('org_settings')
    .select('default_country, vat_period')
    .eq('organization_id', session.organizationId)
    .maybeSingle();
  const framework = isFrameworkCode(settings?.default_country) ? settings!.default_country : 'NO';
  const cfg = FRAMEWORKS[framework];

  const { data: codes } = await supabase
    .from('tax_codes')
    .select('id, code, name, description, is_active, vat_rates(rate_percent, effective_from, effective_to, reverse_charge)')
    .eq('organization_id', session.organizationId)
    .eq('framework', framework)
    .order('code');

  const today = new Date().toISOString().slice(0, 10);

  return (
    <div>
      <SectionHeader
        code="AC.03"
        eyebrow="VAT center"
        title={cfg.vatLabel}
        description={`Active tax codes and effective rates for the ${cfg.label} framework. Reporting period: ${settings?.vat_period ?? cfg.vatPeriod}. Adjust rates via /accounting/vat/rates when statutory rates change.`}
        meta={<span>{(codes ?? []).length} tax codes</span>}
      />

      <div className="mt-8 rounded-2xl border border-slate-200/80 dark:border-slate-800/60 overflow-hidden">
        <table className="w-full text-sm tabular-nums">
          <thead className="bg-slate-50 dark:bg-slate-900/60 text-left">
            <tr className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
              <th className="px-4 py-3 w-32">Code</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3 w-24 text-right">Rate</th>
              <th className="px-4 py-3 w-32">Effective from</th>
              <th className="px-4 py-3 w-28">Reverse</th>
              <th className="px-4 py-3 w-28">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200/60 dark:divide-slate-800/60">
            {(codes ?? []).map((c: CodeRow) => {
              const active = (c.vat_rates ?? []).find(
                (r) => r.effective_from <= today && (r.effective_to === null || r.effective_to >= today),
              ) ?? c.vat_rates?.[0];
              return (
                <tr key={c.id}>
                  <td className="px-4 py-2.5 font-mono tracking-tight text-slate-900 dark:text-white">
                    {c.code}
                  </td>
                  <td className="px-4 py-2.5 text-slate-800 dark:text-slate-200">
                    <div>{c.name}</div>
                    {c.description && (
                      <div className="text-[12px] text-slate-500 dark:text-slate-500 mt-0.5 leading-snug">
                        {c.description}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-2.5 text-right text-slate-900 dark:text-white">
                    {active ? `${Number(active.rate_percent).toFixed(2)}%` : '—'}
                  </td>
                  <td className="px-4 py-2.5 font-mono text-[12px] text-slate-600 dark:text-slate-400">
                    {active?.effective_from ?? '—'}
                  </td>
                  <td className="px-4 py-2.5">
                    {active?.reverse_charge ? (
                      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-amber-600 dark:text-amber-400">
                        Yes
                      </span>
                    ) : (
                      <span className="text-slate-400">—</span>
                    )}
                  </td>
                  <td className="px-4 py-2.5">
                    <span
                      className={`inline-block px-2 py-0.5 rounded font-mono text-[10px] uppercase tracking-[0.18em] ${
                        c.is_active
                          ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
                          : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                      }`}
                    >
                      {c.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                </tr>
              );
            })}
            {(!codes || codes.length === 0) && (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-slate-400">
                  No tax codes seeded — re-run framework setup.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400 leading-relaxed max-w-3xl">
        Rates are stamped onto journal lines at posting time via the
        vat_amount column. Retrospective period reports always recompute
        from the rate effective on the entry date — even after the
        statutory rate changes.
      </p>
    </div>
  );
}
