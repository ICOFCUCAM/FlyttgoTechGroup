'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

type Profile = {
  name: string;
  registration_number: string;
  vat_number: string;
};

export default function OrgProfileForm({ initial }: { initial: Profile }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [form, setForm] = useState<Profile>(initial);
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function set<K extends keyof Profile>(key: K, value: Profile[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const res = await fetch('/api/accounting/profile', {
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
    <form onSubmit={submit} className="space-y-5">
      <Field label="Organization name *" hint="Appears in SAF-T Header.Company.Name and on every printed report band.">
        <input
          type="text"
          required
          minLength={2}
          value={form.name}
          onChange={(e) => set('name', e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm"
        />
      </Field>
      <Field label="Registration number" hint="Org. nr (Norway) · Companies House number (UK) · EIN (US).">
        <input
          type="text"
          value={form.registration_number}
          onChange={(e) => set('registration_number', e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-mono"
        />
      </Field>
      <Field label="VAT registration number" hint="MVA nr (Norway) · VRN (UK) · VAT ID (IFRS jurisdictions).">
        <input
          type="text"
          value={form.vat_number}
          onChange={(e) => set('vat_number', e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-mono"
        />
      </Field>

      {error && <p role="alert" className="text-sm text-rose-600 dark:text-rose-400 font-mono">{error}</p>}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="px-5 py-2.5 rounded-lg bg-[#0A3A6B] text-white text-sm font-semibold hover:bg-[#0A3A6B]/90 disabled:opacity-50"
        >
          {pending ? 'Saving…' : 'Save profile'}
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

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">{label}</span>
      <div className="mt-2">{children}</div>
      {hint && (
        <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400">{hint}</span>
      )}
    </label>
  );
}
