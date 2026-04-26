import { requireRole, getSupabaseAuthClient } from '@/lib/auth/server';
import SectionHeader from '@/components/accounting/SectionHeader';
import StatutoryReportPrintMeta from '@/components/accounting/StatutoryReportPrintMeta';
import PeriodPicker from '@/components/accounting/PeriodPicker';
import { buildBalanceSheet } from '@/lib/accounting/reports';
import { isFrameworkCode, formatAmount } from '@/lib/accounting/frameworks';

export const dynamic = 'force-dynamic';

export default async function BalanceSheetPage({
  searchParams,
}: {
  searchParams: { to?: string };
}) {
  const session = await requireRole('auditor');
  const supabase = getSupabaseAuthClient();
  const { data: settings } = await supabase
    .from('org_settings')
    .select('default_country')
    .eq('organization_id', session.organizationId)
    .maybeSingle();
  const framework = isFrameworkCode(settings?.default_country) ? settings!.default_country : 'NO';

  const today = new Date().toISOString().slice(0, 10);
  const asOf = searchParams.to && /^\d{4}-\d{2}-\d{2}$/.test(searchParams.to) ? searchParams.to : today;

  const bs = await buildBalanceSheet(supabase, session.organizationId!, asOf);

  return (
    <div className="statutory-report-print">
      {/* Phase 31 — regulator-ready printed header + footer */}
      <StatutoryReportPrintMeta
        organizationId={session.organizationId!}
        reportTitle="Balance sheet"
        periodLabel={asOf}
      />

      <SectionHeader
        code="AC.04.04"
        eyebrow="Balance sheet"
        title={`Balance sheet — as of ${bs.as_of}`}
        description="Cumulative position from the beginning of records through the closing date."
      />
      <div className="mt-6">
        <PeriodPicker
          from={bs.as_of}
          to={bs.as_of}
          basePath="/accounting/reports/balance-sheet"
          exportReport="balance-sheet"
          exportFormats={['csv', 'doc', 'pdf']}
        />
      </div>

      <section className="mt-8 grid lg:grid-cols-2 gap-6">
        <Section
          title="Assets"
          rows={bs.assets.lines.map((r) => ({ code: r.code, name: r.name, amount: r.debit - r.credit }))}
          total={bs.assets.total}
          framework={framework}
        />
        <div className="space-y-6">
          <Section
            title="Liabilities"
            rows={bs.liabilities.lines.map((r) => ({ code: r.code, name: r.name, amount: r.credit - r.debit }))}
            total={bs.liabilities.total}
            framework={framework}
          />
          <Section
            title="Equity"
            rows={bs.equity.lines.map((r) => ({ code: r.code, name: r.name, amount: r.credit - r.debit }))}
            total={bs.equity.total}
            framework={framework}
          />
        </div>
      </section>

      <div className="mt-8 grid sm:grid-cols-2 gap-4">
        <Tile
          label="Total assets"
          value={formatAmount(bs.assets.total, framework)}
          accent="emerald"
        />
        <Tile
          label="Total liabilities + equity"
          value={formatAmount(bs.total_liabilities_and_equity, framework)}
          accent={
            Math.round((bs.assets.total - bs.total_liabilities_and_equity) * 100) === 0
              ? 'emerald'
              : 'rose'
          }
        />
      </div>
    </div>
  );
}

function Section({
  title,
  rows,
  total,
  framework,
}: {
  title: string;
  rows: Array<{ code: string; name: string; amount: number }>;
  total: number;
  framework: 'NO' | 'UK' | 'US' | 'IFRS';
}) {
  return (
    <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/60 overflow-hidden print:border-slate-300">
      <div className="px-4 py-3 bg-slate-50 dark:bg-slate-900/60 font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500">
        {title}
      </div>
      <table className="w-full text-sm tabular-nums">
        <tbody className="divide-y divide-slate-200/60 dark:divide-slate-800/60">
          {rows.map((r) => (
            <tr key={r.code} className="break-inside-avoid">
              <td className="px-4 py-2 font-mono w-20">{r.code}</td>
              <td className="px-4 py-2 text-slate-800 dark:text-slate-200">{r.name}</td>
              <td className="px-4 py-2 text-right">{formatAmount(r.amount, framework)}</td>
            </tr>
          ))}
          {rows.length === 0 && (
            <tr>
              <td colSpan={3} className="px-4 py-8 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-slate-400">
                No activity
              </td>
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr className="bg-slate-50 dark:bg-slate-900/60 border-t-2 border-slate-300 dark:border-slate-700">
            <td colSpan={2} className="px-4 py-3 font-mono text-[10px] uppercase tracking-[0.18em]">Total</td>
            <td className="px-4 py-3 text-right font-semibold">{formatAmount(total, framework)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

function Tile({ label, value, accent }: { label: string; value: string; accent: 'emerald' | 'rose' }) {
  const cls =
    accent === 'emerald'
      ? 'border-emerald-300/60 bg-emerald-50/60 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300'
      : 'border-rose-300/60 bg-rose-50/60 dark:bg-rose-900/20 text-rose-700 dark:text-rose-300';
  return (
    <div className={`p-5 rounded-2xl border ${cls} print:bg-white print:text-black print:border-slate-300`}>
      <div className="font-mono text-[10px] uppercase tracking-[0.22em] opacity-70">{label}</div>
      <div className="mt-2 text-2xl font-semibold tabular-nums">{value}</div>
    </div>
  );
}
