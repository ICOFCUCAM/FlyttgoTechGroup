import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { requireRole } from '@/lib/auth/server';
import { FRAMEWORKS, FRAMEWORK_CODES } from '@/lib/accounting/frameworks';
import FrameworkSelector from './FrameworkSelector';
import { getSupabaseAuthClient } from '@/lib/auth/server';

export const metadata: Metadata = {
  title: 'Accounting setup — FlyttGo',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default async function AccountingSetupPage() {
  const session = await requireRole('accountant');
  const supabase = getSupabaseAuthClient();

  // If settings already exist for this org, the framework was chosen —
  // redirect into the workspace.
  if (session.organizationId) {
    const { data } = await supabase
      .from('org_settings')
      .select('default_country')
      .eq('organization_id', session.organizationId)
      .maybeSingle();
    if (data?.default_country) {
      redirect('/accounting');
    }
  }

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-14 px-6 lg:px-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
          <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">
            JU.00
          </span>
          <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
          <span>Select accounting jurisdiction</span>
        </div>
        <h1 className="mt-6 font-serif text-3xl md:text-4xl font-medium tracking-tight leading-[1.05] max-w-3xl">
          Select the accounting jurisdiction{' '}
          <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
            this organization reports under.
          </em>
        </h1>
        <p className="mt-4 max-w-2xl text-sm text-slate-600 dark:text-slate-400 leading-[1.65]">
          Jurisdiction determines the chart of accounts template, tax codes,
          VAT logic, statutory report structures, currency defaults, and
          date format rules — all loaded dynamically and persisted at the
          organization level. Switching jurisdiction after journal entries
          are posted is restricted; re-statement requires a documented
          transition entry.
        </p>

        <div className="mt-10">
          <FrameworkSelector
            frameworks={FRAMEWORK_CODES.map((code) => FRAMEWORKS[code])}
            organizationId={session.organizationId}
          />
        </div>

        <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400 leading-relaxed max-w-2xl">
          Statutory templates are seeded on activation. Required statutory
          accounts cannot be deleted — only deactivated.
        </p>
      </div>
    </main>
  );
}
