import { requireRole, getSupabaseAuthClient } from '@/lib/auth/server';
import SectionHeader from '@/components/accounting/SectionHeader';
import AccountsTable from './AccountsTable';
import { isFrameworkCode } from '@/lib/accounting/frameworks';

export const dynamic = 'force-dynamic';

export default async function ChartOfAccountsPage() {
  const session = await requireRole('accountant');
  const supabase = getSupabaseAuthClient();

  const { data: settings } = await supabase
    .from('org_settings')
    .select('default_country')
    .eq('organization_id', session.organizationId)
    .maybeSingle();

  const framework = isFrameworkCode(settings?.default_country)
    ? settings!.default_country
    : 'NO';

  const { data: accounts } = await supabase
    .from('accounts')
    .select('id, code, name, account_type, is_statutory, is_active, vat_default_code')
    .eq('organization_id', session.organizationId)
    .eq('framework', framework)
    .order('code', { ascending: true });

  return (
    <div>
      <SectionHeader
        code="AC.02"
        eyebrow="Chart of accounts"
        title={`Chart of accounts — ${framework}`}
        description="Statutory accounts cannot be deleted, only deactivated. Custom accounts may be added inside the same framework numbering convention."
        meta={
          <>
            <span>{accounts?.length ?? 0} accounts</span>
          </>
        }
      />
      <div className="mt-8">
        <AccountsTable rows={accounts ?? []} />
      </div>
    </div>
  );
}
