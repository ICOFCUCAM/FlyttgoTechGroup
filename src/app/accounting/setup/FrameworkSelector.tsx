'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import type { FrameworkCode, FrameworkConfig } from '@/lib/accounting/frameworks';

type Props = {
  frameworks: FrameworkConfig[];
  organizationId: string | null;
};

export default function FrameworkSelector({ frameworks, organizationId }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [selected, setSelected] = useState<FrameworkCode | null>(null);
  const [error, setError] = useState<string | null>(null);

  function activate() {
    if (!selected) return;
    setError(null);
    startTransition(async () => {
      const res = await fetch('/api/accounting/setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ framework: selected, organizationId }),
      });
      if (!res.ok) {
        const json = (await res.json().catch(() => ({}))) as { error?: string };
        setError(json.error || 'Setup failed.');
        return;
      }
      router.replace('/accounting');
      router.refresh();
    });
  }

  return (
    <div>
      <ul className="grid sm:grid-cols-2 gap-3">
        {frameworks.map((f) => {
          const isSelected = selected === f.code;
          return (
            <li key={f.code}>
              <button
                type="button"
                onClick={() => setSelected(f.code)}
                aria-pressed={isSelected}
                className={`w-full text-left p-5 rounded-2xl border motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9]/40 focus-visible:ring-offset-[3px] ${
                  isSelected
                    ? 'border-[#0A3A6B] bg-[#0A3A6B]/5 dark:bg-[#9ED0F9]/10'
                    : 'border-slate-200/80 dark:border-slate-800/60 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between gap-2 font-mono text-[10px] tracking-[0.22em] uppercase">
                  <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">
                    AC.0{frameworks.indexOf(f) + 1}
                  </span>
                  <span className="text-slate-400">{f.jurisdiction}</span>
                </div>
                <div className="mt-3 text-base font-semibold tracking-tight">
                  {f.label}
                </div>
                <dl className="mt-4 grid grid-cols-2 gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">
                  <div>
                    <dt className="text-slate-400">Base currency</dt>
                    <dd className="mt-0.5 text-slate-700 dark:text-slate-300">{f.baseCurrency}</dd>
                  </div>
                  <div>
                    <dt className="text-slate-400">FY start</dt>
                    <dd className="mt-0.5 text-slate-700 dark:text-slate-300">
                      Month {f.fiscalYearStartMonth.toString().padStart(2, '0')}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-slate-400">VAT period</dt>
                    <dd className="mt-0.5 text-slate-700 dark:text-slate-300">{f.vatPeriod}</dd>
                  </div>
                  <div>
                    <dt className="text-slate-400">Chart</dt>
                    <dd className="mt-0.5 text-slate-700 dark:text-slate-300">{f.chartTemplate}</dd>
                  </div>
                </dl>
              </button>
            </li>
          );
        })}
      </ul>

      {error && (
        <p
          role="alert"
          className="mt-6 text-sm text-rose-600 dark:text-rose-400 font-mono tracking-tight"
        >
          {error}
        </p>
      )}

      <div className="mt-8 flex items-center gap-3">
        <button
          type="button"
          onClick={activate}
          disabled={!selected || pending}
          className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-[#0A3A6B] text-white text-sm font-semibold tracking-tight hover:bg-[#0A3A6B]/90 disabled:opacity-60 disabled:cursor-not-allowed motion-safe:transition-colors"
        >
          {pending ? 'Activating…' : 'Activate framework'}
        </button>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">
          Seeds chart of accounts + tax codes
        </span>
      </div>
    </div>
  );
}
