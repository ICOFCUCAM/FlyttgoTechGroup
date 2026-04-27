import { redirect } from 'next/navigation';
import { requireRole, getSupabaseAuthClient } from '@/lib/auth/server';

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
  redirect('/accounting/journal');
}
