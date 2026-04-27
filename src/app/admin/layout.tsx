import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth/server';
import { hasAtLeastRole, defaultLandingPath } from '@/lib/auth/roles';
import WorkspaceNav from '@/components/accounting/WorkspaceNav';
import InlineSignIn from '@/components/auth/InlineSignIn';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  // Not signed in — render the inline sign-in form right here. No
  // separate /sign-in page exists; each role-specific URL is its own
  // entrance.
  if (!session) {
    return (
      <InlineSignIn
        workspaceLabel="the admin workspace"
        code="AD.00"
        requiredRole="admin"
      />
    );
  }

  // Signed in but at the wrong URL — bounce to the role's natural home.
  if (!hasAtLeastRole(session.role, 'admin')) {
    redirect(defaultLandingPath(session.role));
  }
  if (!session.organizationId) {
    redirect('/');
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <WorkspaceNav role={session.role} email={session.email} active="admin" />
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">{children}</div>
    </div>
  );
}
