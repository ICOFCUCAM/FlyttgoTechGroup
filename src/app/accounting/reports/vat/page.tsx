import { requireRole, getSupabaseAuthClient } from '@/lib/auth/server';
import SectionHeader from '@/components/accounting/SectionHeader';
import StatutoryReportPrintMeta from '@/components/accounting/StatutoryReportPrintMeta';
import PeriodPicker from '@/components/accounting/PeriodPicker';
import { buildVatReport } from '@/lib/accounting/reports';
import { isFrameworkCode, formatAmount } from '@/lib/accounting/frameworks';

export const dynamic = 'force-dynamic';

export default async function VatReportPage({
  searchParams,
}: {
  searchParams: { from?: string; to?: string };
}) {
  const session = await requireRole('auditor');
  const supabase = getSupabaseAuthClient();
  const { data: settings } = await supabase
    .from('org_settings')
    .select('default_country, vat_period')
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

  const { rows, totals } = await buildVatReport(supabase, session.organizationId!, range);

  return (
    <div className="statutory-report-print">
      {/* Phase 31 — regulator-ready printed header + footer */}
      <StatutoryReportPrintMeta
        organizationId={session.organizationId!}
        reportTitle="VAT report"
        periodLabel={range.from + ' → ' + range.to}
      />

      <SectionHeader
        code="AC.04.05"
        eyebrow="VAT report"
        title="VAT report"
        description={`Tax-code summary from ${range.from} to ${range.to}. Reporting period configured: ${settings?.vat_period ?? '—'}.`}
        meta={<span>{rows.length} tax codes with activity</span>}
      />
      <div className="mt-6">
        <PeriodPicker
          from={range.from}
          to={range.to}
          basePath="/accounting/reports/vat"
          exportReport="vat"
          exportFormats={['csv', 'doc', 'pdf']}
        />
      </div>

      <div className="mt-8 rounded-2xl border border-slate-200/80 dark:border-slate-800/60 overflow-hidden print:border-0 print:rounded-none">
        <table className="w-full text-sm tabular-nums">
          <thead className="bg-slate-50 dark:bg-slate-900/60 text-left">
            <tr className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
              <th className="px-4 py-3 w-32">Code</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3 w-20 text-right">Rate</th>
              <th className="px-4 py-3 w-32 text-right">Net</th>
              <th className="px-4 py-3 w-32 text-right">VAT</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200/60 dark:divide-slate-800/60">
            {rows.map((r) => (
              <tr key={r.tax_code_id} className="break-inside-avoid">
                <td className="px-4 py-2 font-mono">{r.code}</td>
                <td className="px-4 py-2 text-slate-800 dark:text-slate-200">{r.name}</td>
                <td className="px-4 py-2 text-right">{r.rate_percent.toFixed(2)}%</td>
                <td className="px-4 py-2 text-right">{formatAmount(r.net_amount, framework)}</td>
                <td className="px-4 py-2 text-right">{formatAmount(r.vat_amount, framework)}</td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-slate-400">
                  No VAT-coded posted activity in this period.
                </td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr className="bg-slate-50 dark:bg-slate-900/60 border-t-2 border-slate-300 dark:border-slate-700 font-semibold">
              <td colSpan={3} className="px-4 py-3 font-mono text-[10px] uppercase tracking-[0.18em]">
                Totals
              </td>
              <td className="px-4 py-3 text-right">{formatAmount(totals.net, framework)}</td>
              <td className="px-4 py-3 text-right">{formatAmount(totals.vat, framework)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
