import { requireRole, getSupabaseAuthClient } from '@/lib/auth/server';
import SectionHeader from '@/components/accounting/SectionHeader';
import { isFrameworkCode } from '@/lib/accounting/frameworks';
import EntryComposer from './EntryComposer';

export const dynamic = 'force-dynamic';

export default async function NewJournalEntryPage() {
  const session = await requireRole('accountant');
  const supabase = getSupabaseAuthClient();

  const { data: settings } = await supabase
    .from('org_settings')
    .select('default_country, base_currency')
    .eq('organization_id', session.organizationId)
    .maybeSingle();

  const framework = isFrameworkCode(settings?.default_country) ? settings!.default_country : 'NO';
  const baseCurrency = settings?.base_currency ?? 'NOK';

  const { data: accounts } = await supabase
    .from('accounts')
    .select('id, code, name, account_type, vat_default_code')
    .eq('organization_id', session.organizationId)
    .eq('framework', framework)
    .eq('is_active', true)
    .order('code');

  const { data: taxCodes } = await supabase
    .from('tax_codes')
    .select('id, code, name')
    .eq('organization_id', session.organizationId)
    .eq('framework', framework)
    .eq('is_active', true)
    .order('code');

  const { data: currencies } = await supabase
    .from('currencies')
    .select('code, name')
    .order('code');

  return (
    <div>
      <SectionHeader
        code="AC.01.NEW"
        eyebrow="New journal entry"
        title="Compose journal entry"
        description="Record at least two lines — debits must equal credits in base currency before posting. Supporting documents can be attached after the entry is saved."
      />
      <div className="mt-8">
        <EntryComposer
          accounts={accounts ?? []}
          taxCodes={taxCodes ?? []}
          currencies={currencies ?? []}
          baseCurrency={baseCurrency}
          framework={framework}
        />
      </div>
    </div>
  );
}
