'use client';

import { useMemo, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2, Plus } from 'lucide-react';
import type { FrameworkCode } from '@/lib/accounting/frameworks';
import { formatAmount } from '@/lib/accounting/frameworks';
import { lineTotals } from '@/lib/accounting/journal-schema';

type Account = {
  id: string;
  code: string;
  name: string;
  account_type: string;
  vat_default_code: string | null;
};

type TaxCode = { id: string; code: string; name: string };
type Currency = { code: string; name: string };

type Line = {
  account_id: string;
  side: 'debit' | 'credit';
  amount: string;
  currency: string;
  exchange_rate: string;
  vat_code_id: string;
  description: string;
};

const blankLine = (currency: string): Line => ({
  account_id: '',
  side: 'debit',
  amount: '',
  currency,
  exchange_rate: '1',
  vat_code_id: '',
  description: '',
});

export default function EntryComposer({
  accounts,
  taxCodes,
  currencies,
  baseCurrency,
  framework,
}: {
  accounts: Account[];
  taxCodes: TaxCode[];
  currencies: Currency[];
  baseCurrency: string;
  framework: FrameworkCode;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const today = new Date().toISOString().slice(0, 10);
  const [entryDate, setEntryDate] = useState(today);
  const [description, setDescription] = useState('');
  const [lines, setLines] = useState<Line[]>([
    blankLine(baseCurrency),
    blankLine(baseCurrency),
  ]);

  function setLine(idx: number, patch: Partial<Line>) {
    setLines((prev) => prev.map((l, i) => (i === idx ? { ...l, ...patch } : l)));
  }
  function addLine() {
    setLines((prev) => [...prev, blankLine(baseCurrency)]);
  }
  function removeLine(idx: number) {
    setLines((prev) => prev.filter((_, i) => i !== idx));
  }

  const totals = useMemo(() => {
    const numericLines = lines
      .filter((l) => l.account_id && l.amount)
      .map((l) => ({
        account_id: l.account_id,
        side: l.side,
        amount: Number(l.amount),
        currency: l.currency,
        exchange_rate: Number(l.exchange_rate || '1'),
        vat_code_id: l.vat_code_id || null,
        description: l.description,
      }));
    return lineTotals(numericLines);
  }, [lines]);

  function buildPayload(): {
    entry_date: string;
    description: string | undefined;
    lines: Array<{
      account_id: string;
      side: 'debit' | 'credit';
      amount: number;
      currency: string;
      exchange_rate: number;
      vat_code_id: string | null;
      description: string | undefined;
    }>;
  } {
    return {
      entry_date: entryDate,
      description: description.trim() || undefined,
      lines: lines.map((l) => ({
        account_id: l.account_id,
        side: l.side,
        amount: Number(l.amount),
        currency: l.currency,
        exchange_rate: Number(l.exchange_rate || '1'),
        vat_code_id: l.vat_code_id || null,
        description: l.description.trim() || undefined,
      })),
    };
  }

  function submit(intent: 'save_draft' | 'post') {
    setError(null);
    if (lines.some((l) => !l.account_id || !l.amount)) {
      setError('Each line must have an account and an amount.');
      return;
    }
    if (intent === 'post' && !totals.balanced) {
      setError(`Entry must balance before posting. Debits ${totals.debits}, credits ${totals.credits}.`);
      return;
    }
    startTransition(async () => {
      const res = await fetch('/api/accounting/journal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ intent, entry: buildPayload() }),
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setError(json.error || 'Save failed.');
        return;
      }
      router.replace('/accounting/journal');
      router.refresh();
    });
  }

  return (
    <div className="space-y-8">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
            Entry date
          </label>
          <input
            type="date"
            value={entryDate}
            onChange={(e) => setEntryDate(e.target.value)}
            className="mt-2 w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm tabular-nums"
          />
        </div>
        <div>
          <label className="block font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
            Description
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Narrative for the audit trail…"
            className="mt-2 w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
            Lines · double-entry
          </span>
          <button
            type="button"
            onClick={addLine}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md border border-slate-300 dark:border-slate-700 text-xs font-medium hover:bg-slate-50 dark:hover:bg-slate-900"
          >
            <Plus size={12} /> Add line
          </button>
        </div>
        <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/60 overflow-hidden">
          <table className="w-full text-sm tabular-nums">
            <thead className="bg-slate-50 dark:bg-slate-900/60 text-left">
              <tr className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
                <th className="px-3 py-2.5">Account</th>
                <th className="px-3 py-2.5 w-24">Side</th>
                <th className="px-3 py-2.5 w-32 text-right">Amount</th>
                <th className="px-3 py-2.5 w-24">Currency</th>
                <th className="px-3 py-2.5 w-24 text-right">Rate</th>
                <th className="px-3 py-2.5 w-32">VAT</th>
                <th className="px-3 py-2.5">Description</th>
                <th className="px-3 py-2.5 w-12" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/60 dark:divide-slate-800/60">
              {lines.map((l, i) => (
                <tr key={i}>
                  <td className="px-2 py-1.5">
                    <select
                      value={l.account_id}
                      onChange={(e) => {
                        const account = accounts.find((a) => a.id === e.target.value);
                        setLine(i, {
                          account_id: e.target.value,
                          vat_code_id: account?.vat_default_code
                            ? taxCodes.find((tc) => tc.code === account.vat_default_code)?.id ?? l.vat_code_id
                            : l.vat_code_id,
                        });
                      }}
                      className="w-full px-2 py-1.5 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-[13px] font-mono"
                    >
                      <option value="">— select —</option>
                      {accounts.map((a) => (
                        <option key={a.id} value={a.id}>
                          {a.code} · {a.name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-2 py-1.5">
                    <select
                      value={l.side}
                      onChange={(e) => setLine(i, { side: e.target.value as 'debit' | 'credit' })}
                      className="w-full px-2 py-1.5 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-[13px] font-mono uppercase tracking-[0.14em]"
                    >
                      <option value="debit">Debit</option>
                      <option value="credit">Credit</option>
                    </select>
                  </td>
                  <td className="px-2 py-1.5">
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={l.amount}
                      onChange={(e) => setLine(i, { amount: e.target.value })}
                      className="w-full text-right px-2 py-1.5 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-[13px] tabular-nums"
                    />
                  </td>
                  <td className="px-2 py-1.5">
                    <select
                      value={l.currency}
                      onChange={(e) => setLine(i, { currency: e.target.value })}
                      className="w-full px-2 py-1.5 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-[13px] font-mono uppercase"
                    >
                      {currencies.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.code}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-2 py-1.5">
                    <input
                      type="number"
                      step="0.0001"
                      min="0"
                      value={l.exchange_rate}
                      onChange={(e) => setLine(i, { exchange_rate: e.target.value })}
                      disabled={l.currency === baseCurrency}
                      className="w-full text-right px-2 py-1.5 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-[13px] tabular-nums disabled:bg-slate-50 dark:disabled:bg-slate-900/50 disabled:text-slate-400"
                    />
                  </td>
                  <td className="px-2 py-1.5">
                    <select
                      value={l.vat_code_id}
                      onChange={(e) => setLine(i, { vat_code_id: e.target.value })}
                      className="w-full px-2 py-1.5 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-[13px] font-mono"
                    >
                      <option value="">—</option>
                      {taxCodes.map((tc) => (
                        <option key={tc.id} value={tc.id}>
                          {tc.code}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-2 py-1.5">
                    <input
                      type="text"
                      value={l.description}
                      onChange={(e) => setLine(i, { description: e.target.value })}
                      placeholder="line memo"
                      className="w-full px-2 py-1.5 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-[13px]"
                    />
                  </td>
                  <td className="px-2 py-1.5">
                    <button
                      type="button"
                      onClick={() => removeLine(i)}
                      disabled={lines.length <= 2}
                      className="p-1.5 rounded text-slate-400 hover:text-rose-600 disabled:opacity-30 disabled:cursor-not-allowed"
                      aria-label="Remove line"
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/60">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">Debits</div>
          <div className="mt-1 text-lg font-semibold tracking-tight tabular-nums">
            {formatAmount(totals.debits, framework)}
          </div>
        </div>
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">Credits</div>
          <div className="mt-1 text-lg font-semibold tracking-tight tabular-nums">
            {formatAmount(totals.credits, framework)}
          </div>
        </div>
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">Balance</div>
          <div
            className={`mt-1 text-lg font-semibold tracking-tight tabular-nums ${
              totals.balanced ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
            }`}
          >
            {totals.balanced ? 'Balanced' : formatAmount(totals.debits - totals.credits, framework)}
          </div>
        </div>
      </div>

      {error && (
        <p
          role="alert"
          className="text-sm text-rose-600 dark:text-rose-400 font-mono tracking-tight"
        >
          {error}
        </p>
      )}

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => submit('save_draft')}
          disabled={pending}
          className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-900 disabled:opacity-50"
        >
          {pending ? 'Saving…' : 'Save draft'}
        </button>
        <button
          type="button"
          onClick={() => submit('post')}
          disabled={pending || !totals.balanced}
          className="px-4 py-2 rounded-lg bg-[#0A3A6B] text-white text-sm font-semibold hover:bg-[#0A3A6B]/90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {pending ? 'Posting…' : 'Post entry'}
        </button>
        <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">
          Posting is irreversible — corrections require a reversing entry
        </span>
      </div>
    </div>
  );
}
