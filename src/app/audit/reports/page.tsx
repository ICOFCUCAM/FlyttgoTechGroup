import Link from 'next/link';
import { requireRole } from '@/lib/auth/server';
import SectionHeader from '@/components/accounting/SectionHeader';

export const dynamic = 'force-dynamic';

const REPORTS = [
  { code: 'AU.03.01', href: '/accounting/reports/trial-balance', title: 'Trial balance' },
  { code: 'AU.03.02', href: '/accounting/reports/general-ledger', title: 'General ledger' },
  { code: 'AU.03.03', href: '/accounting/reports/income-statement', title: 'Income statement' },
  { code: 'AU.03.04', href: '/accounting/reports/balance-sheet', title: 'Balance sheet' },
  { code: 'AU.03.05', href: '/accounting/reports/vat', title: 'VAT report' },
];

export default async function AuditReportsPage() {
  await requireRole('auditor');
  return (
    <div>
      <SectionHeader
        code="AU.03"
        eyebrow="Reports"
        title="Auditor reports"
        description="Same statutory reports the accountant works with — read-only with the period-picker and export buttons enabled."
      />
      <ul className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {REPORTS.map((r) => (
          <li key={r.code}>
            <Link
              href={r.href}
              className="block p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800/60 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md motion-safe:transition-all"
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">
                {r.code}
              </div>
              <div className="mt-3 text-base font-semibold tracking-tight">{r.title}</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
