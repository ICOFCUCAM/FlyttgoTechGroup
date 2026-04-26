'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

export default function AuditorNoteForm({ entryId }: { entryId: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [body, setBody] = useState('');
  const [error, setError] = useState<string | null>(null);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (body.trim().length < 1) return;
    startTransition(async () => {
      const res = await fetch('/api/accounting/auditor-notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entry_id: entryId, body: body.trim() }),
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setError(json.error || 'Failed to save note.');
        return;
      }
      setBody('');
      router.refresh();
    });
  }

  return (
    <form onSubmit={submit} className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800/60 bg-slate-50 dark:bg-slate-900/60 print:hidden">
      <label className="block font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
        New annotation
      </label>
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={3}
        maxLength={4000}
        className="mt-2 w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm leading-[1.55]"
        placeholder="Observation, follow-up question, or sample-of-records flag…"
      />
      {error && (
        <p role="alert" className="mt-2 text-xs text-rose-600 dark:text-rose-400 font-mono">
          {error}
        </p>
      )}
      <div className="mt-2 flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">
          Notes are immutable once saved.
        </span>
        <button
          type="submit"
          disabled={pending || body.trim().length === 0}
          className="px-3 py-1.5 rounded-md bg-[#0A3A6B] text-white text-sm font-semibold hover:bg-[#0A3A6B]/90 disabled:opacity-50"
        >
          {pending ? 'Saving…' : 'Add note'}
        </button>
      </div>
    </form>
  );
}
