import Link from 'next/link';
import { requireRole } from '@/lib/auth/server';
import SectionHeader from '@/components/accounting/SectionHeader';

export const dynamic = 'force-dynamic';

const REPORTS = [
  {
    code: 'AC.04.01',
    href: '/accounting/reports/trial-balance',
    title: 'Trial balance',
    desc: 'Account-by-account debit and credit totals over a period.',
  },
  {
    code: 'AC.04.02',
    href: '/accounting/reports/general-ledger',
    title: 'General ledger',
    desc: 'Every posted line within the period, ordered chronologically.',
  },
  {
    code: 'AC.04.03',
    href: '/accounting/reports/income-statement',
    title: 'Income statement',
    desc: 'Revenue minus expenses — net result for the period.',
  },
  {
    code: 'AC.04.04',
    href: '/accounting/reports/balance-sheet',
    title: 'Balance sheet',
    desc: 'Assets, liabilities, and equity as of a closing date.',
  },
  {
    code: 'AC.04.05',
    href: '/accounting/reports/vat',
    title: 'VAT report',
    desc: 'Tax-code summary with net and VAT totals for a filing period.',
  },
];

export default async function ReportsIndexPage() {
  await requireRole('auditor');
  return (
    <div>
      <SectionHeader
        code="AC.04"
        eyebrow="Reports"
        title="Statutory and management reports"
        description="All reports are computed live from posted journal lines. Period bounds are inclusive. Reports are printable via the workspace print stylesheet."
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
              <div className="mt-3 text-base font-semibold tracking-tight">
                {r.title}
              </div>
              <p className="mt-1 text-[13px] text-slate-500 dark:text-slate-500 leading-snug">
                {r.desc}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
