import { redirect } from 'next/navigation';
import { requireRole, getSupabaseAuthClient } from '@/lib/auth/server';
import SectionHeader from '@/components/accounting/SectionHeader';

export const dynamic = 'force-dynamic';

export default async function AccountingHomePage() {
  const session = await requireRole('accountant');
  const supabase = getSupabaseAuthClient();

  if (session.organizationId) {
    const { data: settings } = await supabase
      .from('org_settings')
      .select('default_country')
      .eq('organization_id', session.organizationId)
      .maybeSingle();
    if (!settings?.default_country) {
      redirect('/accounting/setup');
    }
  }

  return (
    <div>
      <SectionHeader
        code="AC.01"
        eyebrow="Journal"
        title="Journal entries"
        description="Recent activity in the financial ledger. Posting requires a balanced double-entry record in base currency."
      />
      <p className="mt-10 text-sm text-slate-500 dark:text-slate-500 font-mono uppercase tracking-[0.16em]">
        Entry index renders here once Phase 5 ships.
      </p>
    </div>
  );
}
