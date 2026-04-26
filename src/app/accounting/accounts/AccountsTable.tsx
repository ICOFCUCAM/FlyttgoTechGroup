'use client';

import { useMemo, useState } from 'react';

type Row = {
  id: string;
  code: string;
  name: string;
  account_type: string;
  is_statutory: boolean;
  is_active: boolean;
  vat_default_code: string | null;
};

const TYPE_ACCENT: Record<string, string> = {
  asset: '#1E6FD9',
  liability: '#7C5CE6',
  equity: '#0FB5A6',
  revenue: '#10B981',
  expense: '#F5B547',
  contra: '#94A3B8',
};

export default function AccountsTable({ rows }: { rows: Row[] }) {
  const [filter, setFilter] = useState('');
  const [type, setType] = useState<string>('');

  const filtered = useMemo(() => {
    const q = filter.trim().toLowerCase();
    return rows.filter(
      (r) =>
        (!type || r.account_type === type) &&
        (q === '' ||
          r.code.toLowerCase().includes(q) ||
          r.name.toLowerCase().includes(q)),
    );
  }, [rows, filter, type]);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3 mb-4 print:hidden">
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Search code or name…"
          className="px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm w-72"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-mono uppercase tracking-[0.14em]"
        >
          <option value="">All types</option>
          <option value="asset">Asset</option>
          <option value="liability">Liability</option>
          <option value="equity">Equity</option>
          <option value="revenue">Revenue</option>
          <option value="expense">Expense</option>
          <option value="contra">Contra</option>
        </select>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">
          {filtered.length} of {rows.length}
        </span>
      </div>

      <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/60 overflow-hidden">
        <table className="w-full text-sm tabular-nums">
          <thead className="bg-slate-50 dark:bg-slate-900/60 text-left">
            <tr className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
              <th className="px-4 py-3 w-24">Code</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3 w-32">Type</th>
              <th className="px-4 py-3 w-32">VAT default</th>
              <th className="px-4 py-3 w-28">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200/60 dark:divide-slate-800/60">
            {filtered.map((r) => (
              <tr key={r.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/40">
                <td className="px-4 py-2.5 font-mono tracking-tight text-slate-900 dark:text-white">
                  {r.code}
                </td>
                <td className="px-4 py-2.5">
                  <span className="text-slate-800 dark:text-slate-200">{r.name}</span>
                  {r.is_statutory && (
                    <span className="ml-2 inline-block px-1.5 py-0.5 rounded font-mono text-[9px] uppercase tracking-[0.18em] bg-[#0A3A6B]/10 text-[#0A3A6B] dark:bg-[#9ED0F9]/10 dark:text-[#9ED0F9]">
                      Statutory
                    </span>
                  )}
                </td>
                <td className="px-4 py-2.5">
                  <span
                    className="font-mono text-[11px] uppercase tracking-[0.16em]"
                    style={{ color: TYPE_ACCENT[r.account_type] ?? '#94A3B8' }}
                  >
                    {r.account_type}
                  </span>
                </td>
                <td className="px-4 py-2.5 font-mono text-[11px] tracking-[0.04em] text-slate-600 dark:text-slate-400">
                  {r.vat_default_code ?? '—'}
                </td>
                <td className="px-4 py-2.5">
                  <span
                    className={`inline-block px-2 py-0.5 rounded font-mono text-[10px] uppercase tracking-[0.18em] ${
                      r.is_active
                        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
                        : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                    }`}
                  >
                    {r.is_active ? 'Active' : 'Inactive'}
                  </span>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-slate-400">
                  No accounts match your filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
