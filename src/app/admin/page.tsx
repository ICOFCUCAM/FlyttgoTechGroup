import Link from 'next/link';
import { requireRole, getSupabaseAuthClient } from '@/lib/auth/server';
import SectionHeader from '@/components/accounting/SectionHeader';
import CreateUserForm from './CreateUserForm';
import { type PlatformRole } from '@/lib/auth/roles';

export const dynamic = 'force-dynamic';

function rolesGrantableBy(actor: PlatformRole): PlatformRole[] {
  if (actor === 'super_admin') {
    return ['super_admin', 'admin', 'accountant', 'auditor', 'finance_viewer'];
  }
  if (actor === 'admin') {
    return ['accountant', 'auditor', 'finance_viewer'];
  }
  return [];
}

export default async function AdminHomePage() {
  const session = await requireRole('admin');
  const supabase = getSupabaseAuthClient();

  const { data: members } = await supabase
    .from('users_roles')
    .select('user_id, role, created_at')
    .eq('organization_id', session.organizationId)
    .order('created_at', { ascending: false });

  const grantable = rolesGrantableBy(session.role);

  return (
    <div>
      <SectionHeader
        code="AD.01"
        eyebrow="Administration"
        title="Platform administration"
        description="Manage roles, organization settings, and inspect the full audit log. Super-admin actions are protected by the last-super_admin guard at the database layer."
        meta={<span>{(members ?? []).length} members</span>}
      />

      <div className="mt-8 grid lg:grid-cols-2 gap-6">
        <Link
          href="/accounting"
          className="block p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800/60 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md motion-safe:transition-all"
        >
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">
            AD.02
          </div>
          <div className="mt-3 text-base font-semibold tracking-tight">Open accounting workspace</div>
          <p className="mt-1 text-sm text-slate-500 leading-snug">
            Full accountant access — journal, chart of accounts, VAT center, reports, settings.
          </p>
        </Link>
        <Link
          href="/audit"
          className="block p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800/60 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md motion-safe:transition-all"
        >
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">
            AD.03
          </div>
          <div className="mt-3 text-base font-semibold tracking-tight">Open audit workspace</div>
          <p className="mt-1 text-sm text-slate-500 leading-snug">
            Read-only inspection surface — entries, attachments, audit log, reports.
          </p>
        </Link>
      </div>

      {grantable.length > 0 && (
        <div className="mt-10">
          <CreateUserForm grantableRoles={grantable} />
        </div>
      )}

      <div className="mt-10 rounded-2xl border border-slate-200/80 dark:border-slate-800/60 overflow-hidden">
        <div className="px-4 py-3 bg-slate-50 dark:bg-slate-900/60 font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500">
          Members
        </div>
        <table className="w-full text-sm">
          <thead className="text-left">
            <tr className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500 border-b border-slate-200/60 dark:border-slate-800/60">
              <th className="px-4 py-2.5">User id</th>
              <th className="px-4 py-2.5 w-40">Role</th>
              <th className="px-4 py-2.5 w-44">Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200/60 dark:divide-slate-800/60">
            {(members ?? []).map((m) => (
              <tr key={m.user_id}>
                <td className="px-4 py-2 font-mono text-[11px] text-slate-700 dark:text-slate-300 truncate">
                  {m.user_id}
                </td>
                <td className="px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[#0A3A6B] dark:text-[#9ED0F9]">
                  {m.role}
                </td>
                <td className="px-4 py-2 font-mono text-[11px] text-slate-500">
                  {m.created_at?.replace('T', ' ').slice(0, 19)}
                </td>
              </tr>
            ))}
            {(!members || members.length === 0) && (
              <tr>
                <td colSpan={3} className="px-4 py-12 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-slate-400">
                  No members in this organization.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">
        Created users sign in immediately at /sign-in with the password set
        in AD.04 above. Audit log captures both the auth.admin.createUser
        call and the users_roles insert.
      </p>
    </div>
  );
}
