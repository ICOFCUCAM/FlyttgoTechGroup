import { notFound } from 'next/navigation';
import { requireRole, getSupabaseAuthClient } from '@/lib/auth/server';
import SectionHeader from '@/components/accounting/SectionHeader';

export const dynamic = 'force-dynamic';

export default async function AuditLogDetailPage({ params }: { params: { id: string } }) {
  const session = await requireRole('auditor');
  const supabase = getSupabaseAuthClient();

  const numericId = Number(params.id);
  if (!Number.isFinite(numericId)) notFound();

  const { data: row } = await supabase
    .from('audit_log')
    .select('id, occurred_at, table_name, row_pk, action, user_id, before_state, after_state')
    .eq('id', numericId)
    .eq('organization_id', session.organizationId)
    .maybeSingle();
  if (!row) notFound();

  return (
    <div>
      <SectionHeader
        code={`AU.02.${row.id}`}
        eyebrow={`Audit log #${row.id}`}
        title={`${row.table_name} · ${row.action}`}
        description={`Captured ${row.occurred_at}. Row pk ${row.row_pk}. Triggered by ${row.user_id ?? 'system'}.`}
      />

      <div className="mt-8 grid lg:grid-cols-2 gap-6">
        <Snapshot title="Before" body={row.before_state} />
        <Snapshot title="After" body={row.after_state} />
      </div>
    </div>
  );
}

function Snapshot({ title, body }: { title: string; body: unknown }) {
  return (
    <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/60 overflow-hidden">
      <div className="px-4 py-3 bg-slate-50 dark:bg-slate-900/60 font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500">
        {title}
      </div>
      <pre className="px-4 py-4 text-[11px] leading-[1.55] font-mono whitespace-pre-wrap break-all text-slate-700 dark:text-slate-300 max-h-[600px] overflow-auto">
        {body == null ? '— null —' : JSON.stringify(body, null, 2)}
      </pre>
    </div>
  );
}
