import Link from 'next/link';
import { requireRole, getSupabaseAuthClient } from '@/lib/auth/server';
import SectionHeader from '@/components/accounting/SectionHeader';
import { isFrameworkCode, formatAmount, formatDate } from '@/lib/accounting/frameworks';

export const dynamic = 'force-dynamic';

export default async function AuditHomePage() {
  const session = await requireRole('auditor');
  const supabase = getSupabaseAuthClient();

  const { data: settings } = await supabase
    .from('org_settings')
    .select('default_country')
    .eq('organization_id', session.organizationId)
    .maybeSingle();
  const framework = isFrameworkCode(settings?.default_country) ? settings!.default_country : 'NO';

  const { data: entries } = await supabase
    .from('journal_entries')
    .select(`
      id, entry_number, entry_date, description, status, posted_at,
      journal_lines(amount_base_currency, side),
      auditor_notes(id),
      attachments(id)
    `)
    .eq('organization_id', session.organizationId)
    .eq('status', 'posted')
    .order('entry_date', { ascending: false })
    .order('entry_number', { ascending: false })
    .limit(100);

  const rows = (entries ?? []).map((e: {
    id: string;
    entry_number: number;
    entry_date: string;
    description: string | null;
    status: string;
    posted_at: string | null;
    journal_lines: Array<{ amount_base_currency: number; side: string }>;
    auditor_notes: Array<{ id: string }>;
    attachments: Array<{ id: string }>;
  }) => {
    const total = (e.journal_lines ?? [])
      .filter((l) => l.side === 'debit')
      .reduce((s, l) => s + Number(l.amount_base_currency || 0), 0);
    return {
      id: e.id,
      entry_number: e.entry_number,
      entry_date: e.entry_date,
      description: e.description,
      status: e.status,
      total,
      notes: (e.auditor_notes ?? []).length,
      attachments: (e.attachments ?? []).length,
    };
  });

  return (
    <div>
      <SectionHeader
        code="AU.01"
        eyebrow="Audit workspace"
        title="Posted journal entries"
        description="Read-only ledger inspection. Annotate entries with auditor notes; corrections are routed back to the accountant for a reversing entry."
        meta={<span>{rows.length} posted entries</span>}
      />

      <div className="mt-8 rounded-2xl border border-slate-200/80 dark:border-slate-800/60 overflow-hidden">
        <table className="w-full text-sm tabular-nums">
          <thead className="bg-slate-50 dark:bg-slate-900/60 text-left">
            <tr className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
              <th className="px-4 py-3 w-24">Entry</th>
              <th className="px-4 py-3 w-32">Date</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3 w-32 text-right">Total</th>
              <th className="px-4 py-3 w-20 text-right">Docs</th>
              <th className="px-4 py-3 w-20 text-right">Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200/60 dark:divide-slate-800/60">
            {rows.map((r) => (
              <tr key={r.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/40">
                <td className="px-4 py-2.5 font-mono text-slate-900 dark:text-white">
                  <Link href={`/audit/entry/${r.id}`} className="hover:underline underline-offset-4">
                    #{r.entry_number}
                  </Link>
                </td>
                <td className="px-4 py-2.5 font-mono text-[12px] text-slate-700 dark:text-slate-300">
                  {formatDate(r.entry_date, framework)}
                </td>
                <td className="px-4 py-2.5">{r.description ?? <span className="text-slate-400">—</span>}</td>
                <td className="px-4 py-2.5 text-right">{formatAmount(r.total, framework)}</td>
                <td className="px-4 py-2.5 text-right font-mono text-[11px] text-slate-500">
                  {r.attachments > 0 ? r.attachments : '—'}
                </td>
                <td className="px-4 py-2.5 text-right font-mono text-[11px] text-slate-500">
                  {r.notes > 0 ? r.notes : '—'}
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-slate-400">
                  No posted entries to inspect.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
