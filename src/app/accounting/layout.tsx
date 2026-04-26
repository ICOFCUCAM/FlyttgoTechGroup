import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { requireRole } from '@/lib/auth/server';
import WorkspaceNav from '@/components/accounting/WorkspaceNav';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default async function AccountingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireRole('accountant');
  if (!session.organizationId) {
    redirect('/sign-in');
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
