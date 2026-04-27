import Link from 'next/link';
import { requireRole, getSupabaseAuthClient } from '@/lib/auth/server';
import SectionHeader from '@/components/accounting/SectionHeader';
import { isFrameworkCode, formatAmount, formatDate } from '@/lib/accounting/frameworks';

export const dynamic = 'force-dynamic';

type Row = {
  id: string;
  entry_number: number;
  entry_date: string;
  description: string | null;
  status: string;
  total_amount: number;
};

export default async function JournalIndexPage() {
  const session = await requireRole('accountant');
  const supabase = getSupabaseAuthClient();

  const { data: settings } = await supabase
    .from('org_settings')
    .select('default_country')
    .eq('organization_id', session.organizationId)
    .maybeSingle();
  const framework = isFrameworkCode(settings?.default_country) ? settings!.default_country : 'NO';

  const { data: entries } = await supabase
    .from('journal_entries')
    .select('id, entry_number, entry_date, description, status, journal_lines(amount_base_currency, side)')
    .eq('organization_id', session.organizationId)
    .order('entry_date', { ascending: false })
    .order('entry_number', { ascending: false })
    .limit(50);

  const rows: Row[] = (entries ?? []).map((e: {
    id: string;
    entry_number: number;
    entry_date: string;
    description: string | null;
    status: string;
    journal_lines: Array<{ amount_base_currency: number; side: string }>;
  }) => {
    const debits = (e.journal_lines ?? [])
      .filter((l) => l.side === 'debit')
      .reduce((sum, l) => sum + Number(l.amount_base_currency || 0), 0);
    return {
      id: e.id,
      entry_number: e.entry_number,
      entry_date: e.entry_date,
      description: e.description,
      status: e.status,
      total_amount: debits,
    };
  });

  return (
    <div>
      <SectionHeader
        code="AC.01"
        eyebrow="Journal"
        title="Journal entries"
        description="Recent ledger activity. Drafts can be edited; posted entries are append-only and require a reversing entry to correct."
        meta={<span>{rows.length} recent entries</span>}
      />

      <div className="mt-6 flex items-center gap-3 print:hidden">
        <Link
          href="/accounting/journal/new"
          className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-[#0A3A6B] text-white text-sm font-semibold tracking-tight hover:bg-[#0A3A6B]/90"
        >
          New entry
        </Link>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">
          Drafts post only when balanced in base currency
        </span>
      </div>

      <div className="mt-8 rounded-2xl border border-slate-200/80 dark:border-slate-800/60 overflow-hidden">
        <table className="w-full text-sm tabular-nums">
          <thead className="bg-slate-50 dark:bg-slate-900/60 text-left">
            <tr className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
              <th className="px-4 py-3 w-24">Entry</th>
              <th className="px-4 py-3 w-32">Date</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3 w-32 text-right">Total (base)</th>
              <th className="px-4 py-3 w-28">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200/60 dark:divide-slate-800/60">
            {rows.map((r) => (
              <tr key={r.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/40">
                <td className="px-4 py-2.5 font-mono text-slate-900 dark:text-white">
                  #{r.entry_number}
                </td>
                <td className="px-4 py-2.5 text-slate-700 dark:text-slate-300 font-mono text-[12px]">
                  {formatDate(r.entry_date, framework)}
                </td>
                <td className="px-4 py-2.5 text-slate-800 dark:text-slate-200">
                  {r.description ?? <span className="text-slate-400">—</span>}
                </td>
                <td className="px-4 py-2.5 text-right text-slate-900 dark:text-white">
                  {formatAmount(r.total_amount, framework)}
                </td>
                <td className="px-4 py-2.5">
                  <span
                    className={`inline-block px-2 py-0.5 rounded font-mono text-[10px] uppercase tracking-[0.18em] ${
                      r.status === 'posted'
                        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
                        : r.status === 'reversed'
                          ? 'bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300'
                          : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                    }`}
                  >
                    {r.status}
                  </span>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-slate-400">
                  No entries yet — create the first one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
