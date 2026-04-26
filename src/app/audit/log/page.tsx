import { requireRole, getSupabaseAuthClient } from '@/lib/auth/server';
import SectionHeader from '@/components/accounting/SectionHeader';

export const dynamic = 'force-dynamic';

const ACTION_ACCENT: Record<string, string> = {
  insert: 'text-emerald-600 dark:text-emerald-400',
  update: 'text-amber-600 dark:text-amber-400',
  delete: 'text-rose-600 dark:text-rose-400',
};

export default async function AuditLogPage({
  searchParams,
}: {
  searchParams: { table?: string };
}) {
  const session = await requireRole('auditor');
  const supabase = getSupabaseAuthClient();

  let query = supabase
    .from('audit_log')
    .select('id, table_name, row_pk, action, user_id, occurred_at')
    .eq('organization_id', session.organizationId)
    .order('occurred_at', { ascending: false })
    .limit(200);

  if (searchParams.table) {
    query = query.eq('table_name', searchParams.table);
  }

  const { data: rows } = await query;

  return (
    <div>
      <SectionHeader
        code="AU.02"
        eyebrow="Audit log"
        title="Append-only audit log"
        description="Every insert / update / delete on every accounting table — captured by trigger with full before/after JSONB snapshots. Filter by table via ?table=…"
        meta={<span>{(rows ?? []).length} most recent</span>}
      />

      <div className="mt-6 flex flex-wrap items-center gap-2 print:hidden">
        {['journal_entries', 'journal_lines', 'accounts', 'tax_codes', 'vat_rates', 'attachments', 'auditor_notes'].map((t) => (
          <a
            key={t}
            href={`/audit/log?table=${t}`}
            className={`px-2.5 py-1 rounded-md border font-mono text-[10px] uppercase tracking-[0.18em] ${
              searchParams.table === t
                ? 'bg-[#0A3A6B] text-white border-[#0A3A6B]'
                : 'border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900'
            }`}
          >
            {t}
          </a>
        ))}
        {searchParams.table && (
          <a
            href="/audit/log"
            className="px-2.5 py-1 rounded-md border border-slate-300 dark:border-slate-700 font-mono text-[10px] uppercase tracking-[0.18em] hover:bg-slate-50 dark:hover:bg-slate-900"
          >
            Clear filter
          </a>
        )}
      </div>

      <div className="mt-8 rounded-2xl border border-slate-200/80 dark:border-slate-800/60 overflow-hidden">
        <table className="w-full text-sm tabular-nums">
          <thead className="bg-slate-50 dark:bg-slate-900/60 text-left">
            <tr className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
              <th className="px-4 py-3 w-44">Timestamp</th>
              <th className="px-4 py-3 w-40">Table</th>
              <th className="px-4 py-3 w-24">Action</th>
              <th className="px-4 py-3">Row pk</th>
              <th className="px-4 py-3 w-72">User</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200/60 dark:divide-slate-800/60">
            {(rows ?? []).map((r) => (
              <tr key={r.id}>
                <td className="px-4 py-2 font-mono text-[12px] text-slate-700 dark:text-slate-300">
                  {r.occurred_at?.replace('T', ' ').slice(0, 19)}
                </td>
                <td className="px-4 py-2 font-mono text-slate-900 dark:text-white">{r.table_name}</td>
                <td className={`px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] ${ACTION_ACCENT[r.action]}`}>
                  {r.action}
                </td>
                <td className="px-4 py-2 font-mono text-[11px] text-slate-600 dark:text-slate-400 truncate">
                  {r.row_pk}
                </td>
                <td className="px-4 py-2 font-mono text-[11px] text-slate-500 truncate">
                  {r.user_id ?? <span className="text-slate-400">system</span>}
                </td>
              </tr>
            ))}
            {(!rows || rows.length === 0) && (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-slate-400">
                  No audit log entries found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">
        UPDATE and DELETE on audit_log are blocked at the trigger level —
        rows in this table cannot be modified after insert.
      </p>
    </div>
  );
}
