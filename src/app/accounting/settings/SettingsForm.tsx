'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { FRAMEWORK_CODES, FRAMEWORKS, type FrameworkCode } from '@/lib/accounting/frameworks';

type Settings = {
  default_country: string;
  base_currency: string;
  fiscal_year_start_month: number;
  vat_period: 'monthly' | 'bimonthly' | 'quarterly' | 'yearly';
  number_format: 'space-comma' | 'comma-dot' | 'dot-comma';
  date_format: 'YYYY-MM-DD' | 'DD/MM/YYYY' | 'MM/DD/YYYY';
};

type Currency = { code: string; name: string };

export default function SettingsForm({
  initial,
  currencies,
}: {
  initial: Settings;
  currencies: Currency[];
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [form, setForm] = useState<Settings>(initial);
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function set<K extends keyof Settings>(key: K, value: Settings[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function applyFrameworkDefaults(code: FrameworkCode) {
    const cfg = FRAMEWORKS[code];
    setForm({
      default_country: code,
      base_currency: cfg.baseCurrency,
      fiscal_year_start_month: cfg.fiscalYearStartMonth,
      vat_period: cfg.vatPeriod,
      number_format: cfg.numberFormat,
      date_format: cfg.dateFormat,
    });
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const res = await fetch('/api/accounting/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setError(json.error || 'Save failed.');
        return;
      }
      setSavedAt(new Date().toISOString().slice(0, 19).replace('T', ' '));
      router.refresh();
    });
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      <Field label="Default country">
        <select
          value={form.default_country}
          onChange={(e) => applyFrameworkDefaults(e.target.value as FrameworkCode)}
          className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm"
        >
          {FRAMEWORK_CODES.map((c) => (
            <option key={c} value={c}>
              {FRAMEWORKS[c].label} · {c}
            </option>
          ))}
        </select>
        <Hint>Applies country-typical defaults for the other fields.</Hint>
      </Field>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Base currency">
          <select
            value={form.base_currency}
            onChange={(e) => set('base_currency', e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-mono uppercase"
          >
            {currencies.map((c) => (
              <option key={c.code} value={c.code}>
                {c.code} · {c.name}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Fiscal year start (month)">
          <input
            type="number"
            min={1}
            max={12}
            value={form.fiscal_year_start_month}
            onChange={(e) => set('fiscal_year_start_month', Number(e.target.value))}
            className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm tabular-nums"
          />
        </Field>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <Field label="VAT period">
          <select
            value={form.vat_period}
            onChange={(e) => set('vat_period', e.target.value as Settings['vat_period'])}
            className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm"
          >
            {(['monthly', 'bimonthly', 'quarterly', 'yearly'] as const).map((v) => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
        </Field>
        <Field label="Number format">
          <select
            value={form.number_format}
            onChange={(e) => set('number_format', e.target.value as Settings['number_format'])}
            className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-mono"
          >
            <option value="space-comma">1 234,56</option>
            <option value="comma-dot">1,234.56</option>
            <option value="dot-comma">1.234,56</option>
          </select>
        </Field>
        <Field label="Date format">
          <select
            value={form.date_format}
            onChange={(e) => set('date_format', e.target.value as Settings['date_format'])}
            className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-mono"
          >
            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
          </select>
        </Field>
      </div>

      {error && (
        <p role="alert" className="text-sm text-rose-600 dark:text-rose-400 font-mono">
          {error}
        </p>
      )}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="px-5 py-2.5 rounded-lg bg-[#0A3A6B] text-white text-sm font-semibold hover:bg-[#0A3A6B]/90 disabled:opacity-50"
        >
          {pending ? 'Saving…' : 'Save settings'}
        </button>
        {savedAt && (
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
            Saved at {savedAt}
          </span>
        )}
      </div>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
        {label}
      </span>
      <div className="mt-2">{children}</div>
    </label>
  );
}

function Hint({ children }: { children: React.ReactNode }) {
  return (
    <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">
      {children}
    </span>
  );
}
