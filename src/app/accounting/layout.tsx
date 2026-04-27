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

export default async function AccountingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    return (
      <InlineSignIn
        workspaceLabel="the accountant workspace"
        code="AC.00"
        requiredRole="accountant"
      />
    );
  }

  if (!hasAtLeastRole(session.role, 'accountant')) {
    redirect(defaultLandingPath(session.role));
  }
  if (!session.organizationId) {
    redirect('/');
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <WorkspaceNav
        role={session.role}
        email={session.email}
        active="accounting"
      />
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">{children}</div>
    </div>
  );
}
