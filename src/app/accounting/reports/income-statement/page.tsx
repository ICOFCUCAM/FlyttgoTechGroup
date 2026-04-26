import { requireRole, getSupabaseAuthClient } from '@/lib/auth/server';
import SectionHeader from '@/components/accounting/SectionHeader';
import PeriodPicker from '@/components/accounting/PeriodPicker';
import { buildIncomeStatement } from '@/lib/accounting/reports';
import { isFrameworkCode, formatAmount } from '@/lib/accounting/frameworks';

export const dynamic = 'force-dynamic';

export default async function IncomeStatementPage({
  searchParams,
}: {
  searchParams: { from?: string; to?: string };
}) {
  const session = await requireRole('accountant');
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

  const stmt = await buildIncomeStatement(supabase, session.organizationId!, range);

  return (
    <div>
      <SectionHeader
        code="AC.04.03"
        eyebrow="Income statement"
        title="Income statement"
        description={`Revenue minus expenses for the period ${range.from} to ${range.to}.`}
      />
      <div className="mt-6">
        <PeriodPicker
          from={range.from}
          to={range.to}
          basePath="/accounting/reports/income-statement"
          exportFormats={['csv', 'doc', 'pdf']}
        />
      </div>

      <section className="mt-8 grid lg:grid-cols-2 gap-6">
        <SubLedger
          title="Revenue"
          rows={stmt.revenue.lines.map((r) => ({ code: r.code, name: r.name, amount: r.credit - r.debit }))}
          total={stmt.revenue.total}
          framework={framework}
        />
        <SubLedger
          title="COGS + operating expenses"
          rows={stmt.cogs_and_expenses.lines.map((r) => ({ code: r.code, name: r.name, amount: r.debit - r.credit }))}
          total={stmt.cogs_and_expenses.total}
          framework={framework}
        />
      </section>

      <div className="mt-8 p-6 rounded-2xl bg-[#0A1F3D] text-white border border-white/10 print:bg-white print:text-black print:border-slate-300">
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/55 print:text-slate-500">
          Net result
        </div>
        <div className="mt-2 font-serif text-3xl tracking-tight tabular-nums">
          {formatAmount(stmt.net_income, framework)}
        </div>
      </div>
    </div>
  );
}

function SubLedger({
  title,
  rows,
  total,
  framework,
}: {
  title: string;
  rows: Array<{ code: string; name: string; amount: number }>;
  total: number;
  framework: ReturnType<typeof isFrameworkCode> extends true ? string : string;
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
              <td className="px-4 py-2 text-right">{formatAmount(r.amount, framework as never)}</td>
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
            <td colSpan={2} className="px-4 py-3 font-mono text-[10px] uppercase tracking-[0.18em]">
              Total
            </td>
            <td className="px-4 py-3 text-right font-semibold">
              {formatAmount(total, framework as never)}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
