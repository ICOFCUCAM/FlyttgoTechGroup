import { requireRole, getSupabaseAuthClient } from '@/lib/auth/server';
import SectionHeader from '@/components/accounting/SectionHeader';
import SettingsForm from './SettingsForm';

export const dynamic = 'force-dynamic';

export default async function SettingsPage() {
  const session = await requireRole('accountant');
  const supabase = getSupabaseAuthClient();

  const { data: settings } = await supabase
    .from('org_settings')
    .select('default_country, base_currency, fiscal_year_start_month, vat_period, number_format, date_format')
    .eq('organization_id', session.organizationId)
    .maybeSingle();

  const { data: currencies } = await supabase
    .from('currencies')
    .select('code, name')
    .order('code');

  return (
    <div>
      <SectionHeader
        code="AC.05"
        eyebrow="Settings"
        title="Organization settings"
        description="Defaults applied across the workspace. Changing the default country re-seeds the chart of accounts only when no posted entries exist for the new framework — otherwise the change is recorded but the chart stays untouched."
      />
      <div className="mt-8 max-w-2xl">
        <SettingsForm
          initial={
            settings ?? {
              default_country: 'NO',
              base_currency: 'NOK',
              fiscal_year_start_month: 1,
              vat_period: 'bimonthly',
              number_format: 'space-comma',
              date_format: 'YYYY-MM-DD',
            }
          }
          currencies={currencies ?? []}
        />
      </div>
    </div>
  );
}
