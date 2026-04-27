import { requireRole, getSupabaseAuthClient } from '@/lib/auth/server';
import SectionHeader from '@/components/accounting/SectionHeader';
import OrgProfileForm from './OrgProfileForm';
import { isFrameworkCode, FRAMEWORKS } from '@/lib/accounting/frameworks';

export const dynamic = 'force-dynamic';

export default async function OrganizationProfilePage() {
  const session = await requireRole('accountant');
  const supabase = getSupabaseAuthClient();

  const { data: org } = await supabase
    .from('organizations')
    .select('id, name, registration_number, vat_number, default_country, base_currency, fiscal_year_start_month')
    .eq('id', session.organizationId)
    .maybeSingle();

  const framework = isFrameworkCode(org?.default_country) ? org!.default_country : 'NO';
  const cfg = FRAMEWORKS[framework];

  return (
    <div>
      <SectionHeader
        code="AC.08"
        eyebrow="Organization profile"
        title="Organization profile"
        description="The metadata embedded in every statutory export and printed report. Registration number and VAT number appear in SAF-T Company / VAT-100 declarant blocks; the organization name appears in report headers and printed page bands."
      />

      <div className="mt-8 grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <OrgProfileForm
            initial={{
              name: org?.name ?? '',
              registration_number: org?.registration_number ?? '',
              vat_number: org?.vat_number ?? '',
            }}
          />
        </div>
        <aside className="space-y-3">
          <div className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800/60 bg-slate-50 dark:bg-slate-900/60">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500">
              <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">PR.LOCK</span>
              <span className="mx-2 text-slate-300 dark:text-slate-700">·</span>
              Locked profile fields
            </div>
            <dl className="mt-3 space-y-2 font-mono text-[11px] uppercase tracking-[0.16em]">
              <Row label="Jurisdiction" value={cfg.label} />
              <Row label="Reporting currency" value={org?.base_currency ?? cfg.baseCurrency} />
              <Row label="Fiscal year start" value={`Month ${(org?.fiscal_year_start_month ?? cfg.fiscalYearStartMonth).toString().padStart(2, '0')}`} />
            </dl>
            <p className="mt-3 text-[11px] text-slate-500 leading-snug normal-case tracking-tight">
              Change these via the AC.05 settings page — they cascade
              into chart of accounts, tax codes, and report formats.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <dt className="text-slate-400">{label}</dt>
      <dd className="text-slate-700 dark:text-slate-300">{value}</dd>
    </div>
  );
}
