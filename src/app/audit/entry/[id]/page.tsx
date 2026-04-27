import { notFound } from 'next/navigation';
import { requireRole, getSupabaseAuthClient } from '@/lib/auth/server';
import SectionHeader from '@/components/accounting/SectionHeader';
import { isFrameworkCode, formatAmount, formatDate } from '@/lib/accounting/frameworks';
import AuditorNoteForm from './AuditorNoteForm';
import AttachmentLink from './AttachmentLink';

export const dynamic = 'force-dynamic';

export default async function AuditEntryDetailPage({ params }: { params: { id: string } }) {
  const session = await requireRole('auditor');
  const supabase = getSupabaseAuthClient();

  const { data: settings } = await supabase
    .from('org_settings')
    .select('default_country')
    .eq('organization_id', session.organizationId)
    .maybeSingle();
  const framework = isFrameworkCode(settings?.default_country) ? settings!.default_country : 'NO';

  const { data: entry } = await supabase
    .from('journal_entries')
    .select(`
      id, entry_number, entry_date, description, status, posted_at, created_at,
      journal_lines(
        id, line_number, side, amount, currency, exchange_rate, amount_base_currency,
        description, account:accounts(code, name, account_type)
      ),
      attachments(id, file_name, content_type, byte_size, document_type, created_at),
      auditor_notes(id, body, created_at, author_id)
    `)
    .eq('id', params.id)
    .eq('organization_id', session.organizationId)
    .maybeSingle();

  if (!entry) notFound();

  type LineRow = {
    id: string;
    line_number: number;
    side: 'debit' | 'credit';
    amount: number;
    currency: string;
    exchange_rate: number;
    amount_base_currency: number;
    description: string | null;
    account: { code: string; name: string; account_type: string } | null;
  };
  const lines = ((entry.journal_lines ?? []) as unknown as LineRow[]).sort(
    (a, b) => a.line_number - b.line_number,
  );
  const totalDebits = lines
    .filter((l) => l.side === 'debit')
    .reduce((s, l) => s + Number(l.amount_base_currency), 0);

  return (
    <div>
      <SectionHeader
        code={`AU.01.${entry.entry_number}`}
        eyebrow={`Journal entry #${entry.entry_number}`}
        title={entry.description ?? `Journal entry ${entry.entry_number}`}
        description={`Posted ${entry.posted_at ? formatDate(entry.posted_at, framework) : '—'} · entry date ${formatDate(entry.entry_date, framework)} · status ${entry.status}.`}
        meta={<span>{lines.length} lines · {formatAmount(totalDebits, framework)}</span>}
      />

      <div className="mt-8 rounded-2xl border border-slate-200/80 dark:border-slate-800/60 overflow-hidden">
        <table className="w-full text-sm tabular-nums">
          <thead className="bg-slate-50 dark:bg-slate-900/60 text-left">
            <tr className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
              <th className="px-4 py-3 w-12">#</th>
              <th className="px-4 py-3 w-28">Account</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3 w-20">Side</th>
              <th className="px-4 py-3 w-32 text-right">Amount</th>
              <th className="px-4 py-3 w-20">Curr.</th>
              <th className="px-4 py-3 w-24 text-right">Rate</th>
              <th className="px-4 py-3 w-32 text-right">Base</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200/60 dark:divide-slate-800/60">
            {lines.map((l) => (
              <tr key={l.id}>
                <td className="px-4 py-2 font-mono text-slate-500">{l.line_number}</td>
                <td className="px-4 py-2 font-mono">
                  {l.account?.code} <span className="text-slate-400">·</span> {l.account?.name}
                </td>
                <td className="px-4 py-2 text-slate-700 dark:text-slate-300">{l.description ?? '—'}</td>
                <td className="px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-slate-500">{l.side}</td>
                <td className="px-4 py-2 text-right">{Number(l.amount).toFixed(2)}</td>
                <td className="px-4 py-2 font-mono">{l.currency}</td>
                <td className="px-4 py-2 text-right">{Number(l.exchange_rate).toFixed(6)}</td>
                <td className="px-4 py-2 text-right font-medium">
                  {formatAmount(Number(l.amount_base_currency), framework)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-10 grid lg:grid-cols-2 gap-6">
        <section>
          <h2 className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500">
            <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">AU.01.D</span>
            <span className="mx-2 text-slate-300 dark:text-slate-700">·</span>
            Supporting documents
          </h2>
          <div className="mt-3 space-y-2">
            {((entry.attachments ?? []) as Array<{
              id: string;
              file_name: string;
              content_type: string | null;
              byte_size: number | null;
              document_type: string | null;
              created_at: string;
            }>).map((a) => (
              <AttachmentLink key={a.id} attachment={a} />
            ))}
            {(entry.attachments ?? []).length === 0 && (
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">
                No documents attached.
              </p>
            )}
          </div>
        </section>

        <section>
          <h2 className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500">
            <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">AU.01.N</span>
            <span className="mx-2 text-slate-300 dark:text-slate-700">·</span>
            Auditor notes
          </h2>
          <div className="mt-3 space-y-3">
            {((entry.auditor_notes ?? []) as Array<{ id: string; body: string; created_at: string; author_id: string }>)
              .sort((a, b) => (a.created_at < b.created_at ? 1 : -1))
              .map((n) => (
                <article
                  key={n.id}
                  className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800/60 bg-white dark:bg-slate-900"
                >
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
                    {new Date(n.created_at).toISOString().slice(0, 16).replace('T', ' ')}
                  </div>
                  <p className="mt-2 text-sm text-slate-700 dark:text-slate-300 leading-[1.55] whitespace-pre-wrap">
                    {n.body}
                  </p>
                </article>
              ))}
            {(entry.auditor_notes ?? []).length === 0 && (
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">
                No notes yet.
              </p>
            )}
            <AuditorNoteForm entryId={entry.id} />
          </div>
        </section>
      </div>
    </div>
  );
}
