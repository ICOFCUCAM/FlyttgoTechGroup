'use client';

import { useState, useTransition } from 'react';
import { Paperclip, ExternalLink } from 'lucide-react';

type Attachment = {
  id: string;
  file_name: string;
  content_type: string | null;
  byte_size: number | null;
  document_type: string | null;
  created_at: string;
};

function humanBytes(n: number | null): string {
  if (n == null) return '—';
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}

export default function AttachmentLink({ attachment }: { attachment: Attachment }) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function open() {
    setError(null);
    startTransition(async () => {
      const res = await fetch(`/api/accounting/attachments/${attachment.id}`);
      const json = (await res.json().catch(() => ({}))) as { url?: string; error?: string };
      if (!res.ok || !json.url) {
        setError(json.error || 'Could not generate link.');
        return;
      }
      window.open(json.url, '_blank', 'noopener,noreferrer');
    });
  }

  return (
    <div className="p-3 rounded-xl border border-slate-200/80 dark:border-slate-800/60 bg-white dark:bg-slate-900 flex items-center gap-3">
      <Paperclip size={14} className="text-slate-400 flex-shrink-0" aria-hidden="true" />
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">
          {attachment.file_name}
        </div>
        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
          {attachment.document_type ?? 'other'} · {humanBytes(attachment.byte_size)} · {attachment.content_type ?? '?'}
        </div>
        {error && (
          <div className="text-[11px] text-rose-600 dark:text-rose-400 mt-1 font-mono">
            {error}
          </div>
        )}
      </div>
      <button
        type="button"
        onClick={open}
        disabled={pending}
        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-slate-300 dark:border-slate-700 text-xs font-medium hover:bg-slate-50 dark:hover:bg-slate-900 disabled:opacity-50"
      >
        {pending ? 'Opening…' : 'Open'}
        <ExternalLink size={12} />
      </button>
    </div>
  );
}
