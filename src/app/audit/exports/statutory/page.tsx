import { requireRole, getSupabaseAuthClient } from '@/lib/auth/server';
import SectionHeader from '@/components/accounting/SectionHeader';
import { isFrameworkCode, FRAMEWORKS } from '@/lib/accounting/frameworks';
import StatutoryExportPanel from '@/app/accounting/exports/StatutoryExportPanel';

export const dynamic = 'force-dynamic';

export default async function AuditorStatutoryExportPage({
  searchParams,
}: {
  searchParams: { from?: string; to?: string };
}) {
  const session = await requireRole('auditor');
  const supabase = getSupabaseAuthClient();

  const { data: org } = await supabase
    .from('organizations')
    .select('default_country, base_currency, name, registration_number, vat_number')
    .eq('id', session.organizationId)
    .maybeSingle();

  const framework = isFrameworkCode(org?.default_country) ? org!.default_country : 'NO';
  const cfg = FRAMEWORKS[framework];
  const today = new Date().toISOString().slice(0, 10);
  const yearStart = `${new Date().getFullYear()}-01-01`;
  const range = {
    from: searchParams.from && /^\d{4}-\d{2}-\d{2}$/.test(searchParams.from) ? searchParams.from : yearStart,
    to: searchParams.to && /^\d{4}-\d{2}-\d{2}$/.test(searchParams.to) ? searchParams.to : today,
  };

  return (
    <div>
      <SectionHeader
        code="AU.05"
        eyebrow="Statutory exports"
        title={`Auditor export — ${cfg.label}`}
        description={`Read-only export access. Auditors can emit SAF-T, VAT summaries, trial balance, general ledger and the jurisdiction-specific statutory bundle. Auditors cannot edit entries, delete entries, or modify tax configuration — every export here is also recorded to AU.04 export history.`}
      />

      <div className="mt-6 p-4 rounded-2xl border border-amber-300/60 bg-amber-50/60 dark:bg-amber-900/15 print:hidden">
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-700 dark:text-amber-300 font-semibold">
          AU.05 · auditor read-only mode
        </div>
        <p className="mt-1 text-[12px] text-amber-800 dark:text-amber-200 leading-snug">
          Generating an export here does not modify accounting state. Every
          file emission is logged to the append-only export_history registry.
        </p>
      </div>

      <div className="mt-6">
        <StatutoryExportPanel
          framework={framework}
          range={range}
          orgName={org?.name ?? null}
          regNumber={org?.registration_number ?? null}
          vatNumber={org?.vat_number ?? null}
        />
      </div>
    </div>
  );
}
