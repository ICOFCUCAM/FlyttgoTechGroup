'use client';

import React, { useMemo, useState } from 'react';
import { Send, Copy, ExternalLink } from 'lucide-react';

/**
 * Live API playground.
 *
 * Curated catalogue of public-surface endpoints. The user picks one,
 * the panel renders the request shape, hitting Send fires a real fetch
 * from the visitor's browser and shows the response inline. No
 * back-end proxy — the playground is just a pretty wrapper around
 * fetch().
 *
 * Tenant-scoped endpoints (anything under /api/accounting) are listed
 * for completeness but flagged as "401 without token" since the
 * playground doesn't yet hold workspace credentials.
 */

type Endpoint = {
  id: string;
  method: 'GET' | 'POST';
  path: string;
  category: 'public' | 'tenant';
  description: string;
  example_query?: Record<string, string>;
  example_body?: Record<string, unknown>;
  output_hint: string;
};

const CATALOGUE: Endpoint[] = [
  {
    id: 'mcp-discovery',
    method: 'GET',
    path: '/.well-known/mcp.json',
    category: 'public',
    description:
      'MCP (Model Context Protocol) discovery manifest. AI agents auto-discover the FlyttGo capability surface here.',
    output_hint: 'JSON manifest with tools[], resources[], and the planned /api/mcp endpoint URL.',
  },
  {
    id: 'sitemap',
    method: 'GET',
    path: '/sitemap.xml',
    category: 'public',
    description: 'Public sitemap — lists every indexable page and the locale variants.',
    output_hint: 'XML sitemap (urlset).',
  },
  {
    id: 'robots',
    method: 'GET',
    path: '/robots.txt',
    category: 'public',
    description: 'Crawler policy and sitemap discovery hint.',
    output_hint: 'Plain text.',
  },
  {
    id: 'rss',
    method: 'GET',
    path: '/rss.xml',
    category: 'public',
    description: 'Insights feed — RSS 2.0 of the latest insight posts.',
    output_hint: 'XML rss feed.',
  },
  {
    id: 'manifest',
    method: 'GET',
    path: '/manifest.webmanifest',
    category: 'public',
    description: 'PWA manifest — icons, theme colour, scope.',
    output_hint: 'JSON manifest.',
  },
  {
    id: 'contact',
    method: 'POST',
    path: '/api/contact',
    category: 'public',
    description: 'Submit a deployment-intake lead. Validated server-side; rate-limited per IP.',
    example_body: {
      name: 'Sample Visitor',
      email: 'visitor@example.com',
      institution: 'Municipality',
      objective: 'Mobility coordination',
      scale: 'City rollout',
      timeline: '3–6 months',
      message: 'Playground demo — ignore.',
    },
    output_hint: 'JSON { ok: true } on success; 422 with issues[] on validation failure.',
  },
  {
    id: 'auditor-notes',
    method: 'POST',
    path: '/api/accounting/auditor-notes',
    category: 'tenant',
    description: 'Append an immutable annotation to a posted journal entry. Requires accountant or auditor session.',
    example_body: {
      entry_id: '00000000-0000-0000-0000-000000000000',
      body: 'Reviewed for sample selection.',
    },
    output_hint: '401 here without a workspace session cookie. In a signed-in browser this returns the inserted note row.',
  },
  {
    id: 'exports-saft',
    method: 'GET',
    path: '/api/accounting/exports/saf-t',
    category: 'tenant',
    description: 'Emit the Norwegian SAF-T XML for the configured period. Requires Norway-jurisdiction org session.',
    example_query: { from: '2026-01-01', to: '2026-12-31' },
    output_hint: '401 here without a session. Real call returns Skatteetaten v1.30 XML with Content-Disposition: attachment.',
  },
];

type Result =
  | { state: 'idle' }
  | { state: 'loading' }
  | { state: 'done'; status: number; body: string; contentType: string; ms: number }
  | { state: 'error'; error: string };

export default function ApiPlayground() {
  const [selected, setSelected] = useState<Endpoint>(CATALOGUE[0]);
  const [body, setBody] = useState<string>(
    selected.example_body ? JSON.stringify(selected.example_body, null, 2) : '',
  );
  const [query, setQuery] = useState<string>(
    selected.example_query
      ? Object.entries(selected.example_query)
          .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
          .join('&')
      : '',
  );
  const [result, setResult] = useState<Result>({ state: 'idle' });

  function pick(endpoint: Endpoint) {
    setSelected(endpoint);
    setBody(endpoint.example_body ? JSON.stringify(endpoint.example_body, null, 2) : '');
    setQuery(
      endpoint.example_query
        ? Object.entries(endpoint.example_query)
            .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
            .join('&')
        : '',
    );
    setResult({ state: 'idle' });
  }

  const fullUrl = useMemo(() => {
    const qs = query ? `?${query}` : '';
    return `${selected.path}${qs}`;
  }, [selected, query]);

  async function send() {
    setResult({ state: 'loading' });
    const t0 = performance.now();
    try {
      const init: RequestInit =
        selected.method === 'POST'
          ? {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: body || '{}',
            }
          : { method: 'GET' };
      const res = await fetch(fullUrl, init);
      const ct = res.headers.get('content-type') || '';
      const text = await res.text();
      const ms = Math.round(performance.now() - t0);
      setResult({ state: 'done', status: res.status, body: text, contentType: ct, ms });
    } catch (err) {
      setResult({
        state: 'error',
        error: err instanceof Error ? err.message : String(err),
      });
    }
  }

  function copy(value: string) {
    navigator.clipboard.writeText(value).catch(() => {});
  }

  return (
    <div className="grid lg:grid-cols-12 gap-6">
      {/* Catalogue */}
      <aside className="lg:col-span-4">
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500 mb-3">
          <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">CAT.00</span>
          <span className="mx-2 text-slate-300 dark:text-slate-700">·</span>
          Endpoint catalogue
        </div>
        <ul className="space-y-1.5">
          {CATALOGUE.map((e) => {
            const isSelected = selected.id === e.id;
            return (
              <li key={e.id}>
                <button
                  type="button"
                  onClick={() => pick(e)}
                  className={`w-full text-left p-3 rounded-xl border motion-safe:transition-colors ${
                    isSelected
                      ? 'border-[#0A3A6B] bg-[#0A3A6B]/5 dark:bg-[#9ED0F9]/10'
                      : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-1.5 py-0.5 rounded font-mono text-[10px] uppercase tracking-[0.14em] font-semibold ${
                        e.method === 'GET'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300'
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300'
                      }`}
                    >
                      {e.method}
                    </span>
                    <span className="font-mono text-[12px] text-slate-700 dark:text-slate-300 truncate">
                      {e.path}
                    </span>
                  </div>
                  <div className="mt-1 text-[12px] text-slate-500 dark:text-slate-500 leading-snug">
                    {e.description}
                  </div>
                  {e.category === 'tenant' && (
                    <div className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-amber-600 dark:text-amber-400">
                      Tenant-scoped · 401 without token
                    </div>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </aside>

      {/* Request + response panel */}
      <div className="lg:col-span-8 space-y-6">
        {/* Request */}
        <div className="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800/60 bg-white dark:bg-slate-900">
          <div className="flex items-center gap-2 mb-3">
            <span
              className={`px-2 py-0.5 rounded font-mono text-[10px] uppercase tracking-[0.14em] font-semibold ${
                selected.method === 'GET'
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300'
                  : 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300'
              }`}
            >
              {selected.method}
            </span>
            <code className="font-mono text-[13px] text-slate-700 dark:text-slate-300 truncate flex-1">
              {fullUrl}
            </code>
            <button
              type="button"
              onClick={() => copy(fullUrl)}
              className="p-1.5 rounded text-slate-400 hover:text-slate-700 dark:hover:text-white"
              aria-label="Copy URL"
            >
              <Copy size={13} />
            </button>
          </div>

          {selected.method === 'GET' && selected.example_query && (
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500 mb-1.5">
                Query string
              </label>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-mono"
              />
            </div>
          )}

          {selected.method === 'POST' && (
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500 mb-1.5">
                Request body (JSON)
              </label>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={Math.min(12, Math.max(5, body.split('\n').length))}
                spellCheck={false}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-[12px] font-mono leading-[1.55]"
              />
            </div>
          )}

          <div className="mt-4 flex items-center gap-3">
            <button
              type="button"
              onClick={send}
              disabled={result.state === 'loading'}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#0A3A6B] text-white text-sm font-semibold hover:bg-[#0A3A6B]/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={13} />
              {result.state === 'loading' ? 'Sending…' : 'Send'}
            </button>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">
              {selected.output_hint}
            </span>
          </div>
        </div>

        {/* Response */}
        <div className="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800/60 bg-white dark:bg-slate-900">
          <div className="flex items-center justify-between mb-3">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500">
              <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">RES.00</span>
              <span className="mx-2 text-slate-300 dark:text-slate-700">·</span>
              Response
            </div>
            {result.state === 'done' && (
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em]">
                <span
                  className={
                    result.status < 300
                      ? 'text-emerald-700 dark:text-emerald-400 font-semibold'
                      : result.status < 500
                        ? 'text-amber-700 dark:text-amber-400 font-semibold'
                        : 'text-rose-700 dark:text-rose-400 font-semibold'
                  }
                >
                  HTTP {result.status}
                </span>
                <span className="text-slate-300 dark:text-slate-700">·</span>
                <span className="text-slate-500">{result.ms} ms</span>
                <span className="text-slate-300 dark:text-slate-700">·</span>
                <span className="text-slate-500 normal-case tracking-tight truncate max-w-[200px]">
                  {result.contentType}
                </span>
              </div>
            )}
          </div>

          {result.state === 'idle' && (
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-400 py-8 text-center">
              Hit Send to see the response.
            </p>
          )}
          {result.state === 'loading' && (
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-400 py-8 text-center">
              Awaiting response…
            </p>
          )}
          {result.state === 'error' && (
            <p className="text-sm text-rose-600 dark:text-rose-400 font-mono">
              {result.error}
            </p>
          )}
          {result.state === 'done' && (
            <pre className="px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-950 text-[11px] leading-[1.55] font-mono whitespace-pre-wrap break-all text-slate-700 dark:text-slate-300 max-h-[420px] overflow-auto border border-slate-200/70 dark:border-slate-800/60">
              {result.body || '(empty body)'}
            </pre>
          )}
        </div>

        {/* Footer reminder */}
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400 leading-relaxed">
          Public endpoints respond in this browser. Tenant-scoped
          endpoints require a workspace session — sign in at /admin,
          /accounting or /audit and the same fetch will succeed.{' '}
          <a
            href="/.well-known/mcp.json"
            className="text-[#0A3A6B] dark:text-[#9ED0F9] hover:underline underline-offset-4 inline-flex items-center gap-0.5"
          >
            MCP discovery manifest
            <ExternalLink size={9} aria-hidden="true" />
          </a>
        </p>
      </div>
    </div>
  );
}
