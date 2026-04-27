'use client';

import { useState } from 'react';
import type { FrameworkCode } from '@/lib/accounting/frameworks';

type Props = {
  framework: FrameworkCode;
  range: { from: string; to: string };
  orgName: string | null;
  regNumber: string | null;
  vatNumber: string | null;
};

type Bundle = {
  code: string;
  title: string;
  description: string;
  endpoint: string;
  formats: string[];
};

const BUNDLES: Record<FrameworkCode, Bundle[]> = {
  NO: [
    {
      code: 'EX.NO.SAFT',
      title: 'SAF-T Financial XML',
      description: 'OECD SAF-T 2.0 / Skatteetaten v1.30 — accounts, journal entries, customers, suppliers, tax codes.',
      endpoint: '/api/accounting/exports/saf-t',
      formats: ['XML'],
    },
    {
      code: 'EX.NO.MVA',
      title: 'MVA summary',
      description: 'Norwegian VAT summary — input VAT, output VAT, payable, receivable. Altinn-compatible structure.',
      endpoint: '/api/accounting/exports/mva',
      formats: ['CSV', 'PDF'],
    },
  ],
  UK: [
    {
      code: 'EX.UK.VAT100',
      title: 'VAT-100 return',
      description: 'HMRC Making Tax Digital — Box 1 through Box 9 with sales/purchases breakdown.',
      endpoint: '/api/accounting/exports/vat-100',
      formats: ['CSV', 'PDF'],
    },
  ],
  US: [
    {
      code: 'EX.US.GAAP',
      title: 'US GAAP structured exports',
      description: 'Trial balance, general ledger, income statement, balance sheet — Form 1120 / 1065 / Schedule C compatible.',
      endpoint: '/api/accounting/exports/gaap',
      formats: ['CSV bundle'],
    },
  ],
  IFRS: [
    {
      code: 'EX.IFRS',
      title: 'IFRS reporting package',
      description: 'Trial balance, income statement, balance sheet mapped to international classification.',
      endpoint: '/api/accounting/exports/ifrs',
      formats: ['CSV bundle'],
    },
  ],
};

export default function StatutoryExportPanel({ framework, range, orgName, regNumber, vatNumber }: Props) {
  const [from, setFrom] = useState(range.from);
  const [to, setTo] = useState(range.to);
  const bundles = BUNDLES[framework] ?? [];

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-3 gap-4 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800/60 bg-slate-50 dark:bg-slate-900/60">
        <div>
          <label className="block font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">From</label>
          <input
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="mt-1 w-full px-2 py-1.5 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm tabular-nums"
          />
        </div>
        <div>
          <label className="block font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">To</label>
          <input
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="mt-1 w-full px-2 py-1.5 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm tabular-nums"
          />
        </div>
        <div className="flex items-end">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500 leading-snug">
            <div>{orgName ?? '—'}</div>
            <div className="mt-0.5 text-slate-400">Reg {regNumber ?? '—'} · VAT {vatNumber ?? '—'}</div>
          </div>
        </div>
      </div>

      <ul className="grid sm:grid-cols-2 gap-3">
        {bundles.map((b) => (
          <li
            key={b.code}
            className="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800/60 bg-white dark:bg-slate-900"
          >
            <div className="flex items-center justify-between gap-2 font-mono text-[10px] tracking-[0.22em] uppercase">
              <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">{b.code}</span>
              <span className="text-slate-400">{b.formats.join(' · ')}</span>
            </div>
            <h3 className="mt-3 text-base font-semibold tracking-tight">{b.title}</h3>
            <p className="mt-1 text-[13px] text-slate-500 dark:text-slate-500 leading-snug">{b.description}</p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {b.formats.map((fmt) => {
                const ext = fmt === 'XML' ? '' : `&format=${fmt.toLowerCase().split(' ')[0]}`;
                return (
                  <a
                    key={fmt}
                    href={`${b.endpoint}?from=${from}&to=${to}${ext}`}
                    className="px-3 py-1.5 rounded-md border border-slate-300 dark:border-slate-700 font-mono text-[10px] uppercase tracking-[0.18em] hover:bg-slate-50 dark:hover:bg-slate-900"
                  >
                    Export {fmt}
                  </a>
                );
              })}
            </div>
          </li>
        ))}
        {bundles.length === 0 && (
          <li className="col-span-2 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800/60 bg-white dark:bg-slate-900 font-mono text-[11px] uppercase tracking-[0.18em] text-slate-400">
            No statutory bundles defined for this jurisdiction.
          </li>
        )}
      </ul>
    </div>
  );
}
