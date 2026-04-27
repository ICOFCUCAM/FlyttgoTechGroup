'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

type Currency = { code: string; name: string };

export default function FxRateForm({ currencies }: { currencies: Currency[] }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const today = new Date().toISOString().slice(0, 10);
  const [form, setForm] = useState({
    rate_date: today,
    base_currency: 'EUR',
    quote_currency: 'NOK',
    rate: '',
    source: '',
  });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!form.rate || Number(form.rate) <= 0) {
      setError('Enter a positive rate.');
      return;
    }
    if (form.base_currency === form.quote_currency) {
      setError('Base and quote currencies must differ.');
      return;
    }
    startTransition(async () => {
      const res = await fetch('/api/accounting/fx', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, rate: Number(form.rate) }),
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setError(json.error || 'Save failed.');
        return;
      }
      setForm((f) => ({ ...f, rate: '', source: '' }));
      router.refresh();
    });
  }

  return (
    <form
      onSubmit={submit}
      className="flex flex-wrap items-end gap-3 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800/60 bg-slate-50 dark:bg-slate-900/60"
    >
      <div className="flex-1 min-w-[140px]">
        <label className="block font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
          Date
        </label>
        <input
          type="date"
          value={form.rate_date}
          onChange={(e) => setForm({ ...form, rate_date: e.target.value })}
          className="mt-1 w-full px-2 py-1.5 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm tabular-nums"
        />
      </div>
      <div>
        <label className="block font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
          Base
        </label>
        <select
          value={form.base_currency}
          onChange={(e) => setForm({ ...form, base_currency: e.target.value })}
          className="mt-1 px-2 py-1.5 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-mono uppercase"
        >
          {currencies.map((c) => (
            <option key={c.code} value={c.code}>
              {c.code}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
          Quote
        </label>
        <select
          value={form.quote_currency}
          onChange={(e) => setForm({ ...form, quote_currency: e.target.value })}
          className="mt-1 px-2 py-1.5 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-mono uppercase"
        >
          {currencies.map((c) => (
            <option key={c.code} value={c.code}>
              {c.code}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
          Rate
        </label>
        <input
          type="number"
          step="0.000001"
          min="0"
          value={form.rate}
          onChange={(e) => setForm({ ...form, rate: e.target.value })}
          className="mt-1 w-32 px-2 py-1.5 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm tabular-nums text-right"
          placeholder="0.000000"
        />
      </div>
      <div className="flex-1 min-w-[160px]">
        <label className="block font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
          Source
        </label>
        <input
          type="text"
          value={form.source}
          onChange={(e) => setForm({ ...form, source: e.target.value })}
          placeholder="ECB · Norges Bank · contract"
          className="mt-1 w-full px-2 py-1.5 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm"
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="px-4 py-2 rounded-lg bg-[#0A3A6B] text-white text-sm font-semibold hover:bg-[#0A3A6B]/90 disabled:opacity-50"
      >
        {pending ? 'Saving…' : 'Record rate'}
      </button>
      {error && (
        <p role="alert" className="basis-full text-sm text-rose-600 dark:text-rose-400 font-mono">
          {error}
        </p>
      )}
    </form>
  );
}
