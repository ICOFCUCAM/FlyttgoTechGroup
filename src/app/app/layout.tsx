import type { Metadata } from 'next';
import { getSession } from '@/lib/auth/server';
import InlineSignIn from '@/components/auth/InlineSignIn';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

/**
 * /app — authenticated operator dashboard.
 *
 * Open to any authenticated platform role. Reads live sandbox workspaces +
 * AI artefacts from Supabase. If unauthenticated, renders the inline
 * sign-in form (same pattern as /admin /accounting /audit).
 */
export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  if (!session) {
    return (
      <InlineSignIn
        workspaceLabel="the operator workspace"
        code="AP.LO"
        requiredRole="finance_viewer"
      />
    );
  }

  return <>{children}</>;
}
