'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from '@/components/flytt/LocaleLink';
import {
  ArrowUpRight,
  Sparkles,
  Loader2,
  Copy,
  Check,
  Download,
  RotateCcw,
  CheckCircle2,
  Compass,
  Cpu,
} from 'lucide-react';

/**
 * Deployment-architecture recommendation engine. Streams a tailored
 * recommendation through /api/ai/ask (artefact='recommendation') and
 * persists the last result in localStorage.
 *
 * Inputs: programme, jurisdiction, vertical, scale, sensitivity,
 * modules-of-interest, organisation. Output: 7-section markdown
 * recommendation with cross-links and artefact-log provenance.
 */

const LS_KEY = 'flytt:recommend:last';

type Ctx = {
  organisation: string;
  programme:    string;
  jurisdiction: string;
  vertical:     string;
  scale:        string;
  sensitivity:  string;
  modules:      string[];
};

const initialCtx: Ctx = {
  organisation: '',
  programme:    'platform deployment',
  jurisdiction: 'eu',
  vertical:     'general',
  scale:        'mid-scale',
  sensitivity:  'standard',
  modules:      ['Identra'],
};

const JURISDICTIONS = [
  { value: 'eu',    label: 'European Union' },
  { value: 'uk',    label: 'United Kingdom' },
  { value: 'no',    label: 'Norway' },
  { value: 'sa',    label: 'Saudi Arabia' },
  { value: 'ae',    label: 'United Arab Emirates' },
  { value: 'za',    label: 'South Africa' },
  { value: 'other', label: 'Other' },
];

const VERTICALS = [
  { value: 'general',    label: 'General · cross-sector' },
  { value: 'defense',    label: 'Defense + intelligence' },
  { value: 'healthcare', label: 'Healthcare + life sciences' },
  { value: 'financial',  label: 'Financial services' },
  { value: 'government', label: 'Government · municipal' },
  { value: 'education',  label: 'Education · ministries' },
  { value: 'mobility',   label: 'Mobility · transport' },
  { value: 'marketplace', label: 'Marketplace · multi-sided' },
];

const SCALE = [
  { value: 'pilot',          label: 'Pilot · single team' },
  { value: 'small-scale',    label: 'Small · single department' },
  { value: 'mid-scale',      label: 'Mid · multi-department' },
  { value: 'national-scale', label: 'National · agency-wide' },
  { value: 'cross-border',   label: 'Cross-border · multi-jurisdiction' },
];

const SENSITIVITY = [
  { value: 'standard',           label: 'Standard · public-facing data' },
  { value: 'regulated',          label: 'Regulated · GDPR / HIPAA / PCI' },
  { value: 'sovereign-required', label: 'Sovereign-required · jurisdiction-pinned' },
  { value: 'classified',         label: 'Classified · vendor-can\'t-read' },
];

const MODULE_OPTIONS = [
  'Identra', 'Transify', 'Workverge', 'Civitas', 'EduPro', 'Payvera', 'Ledgera', 'FlyttGo Marketplace',
];

type StoredRec = {
  ctx: Ctx;
  output: string;
  generatedAt: number;
  artefactCode?: string;
  outputSha256?: string;
};

export default function RecommendEngine() {
  const [ctx, setCtx] = useState<Ctx>(initialCtx);
  const [streaming, setStreaming] = useState(false);
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [generatedAt, setGeneratedAt] = useState<number | null>(null);
  const [provenance, setProvenance] = useState<{ code: string; sha: string } | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Hydrate from localStorage.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const raw = window.localStorage.getItem(LS_KEY);
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as StoredRec;
      setCtx(parsed.ctx);
      setOutput(parsed.output);
      setGeneratedAt(parsed.generatedAt);
      setProvenance(
        parsed.artefactCode && parsed.outputSha256
          ? { code: parsed.artefactCode, sha: parsed.outputSha256 }
          : null,
      );
    } catch { /* noop */ }
  }, []);

  const persist = (snapshot: Ctx, fullOutput: string, prov: { code: string; sha: string } | null) => {
    if (typeof window === 'undefined') return;
    const stored: StoredRec = {
      ctx: snapshot,
      output: fullOutput,
      generatedAt: Date.now(),
      artefactCode: prov?.code,
      outputSha256: prov?.sha,
    };
    window.localStorage.setItem(LS_KEY, JSON.stringify(stored));
  };

  const logArtefact = async (snapshot: Ctx, fullOutput: string) => {
    try {
      const res = await fetch('/api/artefacts/log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          kind: 'recommendation',
          output: fullOutput,
          context: snapshot,
        }),
      });
      if (!res.ok) return null;
      const json = await res.json() as {
        artefact: { artefact_code: string; output_sha256: string };
      };
      return { code: json.artefact.artefact_code, sha: json.artefact.output_sha256 };
    } catch {
      return null;
    }
  };

  const generate = async () => {
    if (streaming) return;
    if (!ctx.organisation.trim()) {
      setOutput('# Organisation required\n\nProvide an organisation name in the panel above so the recommendation can be tailored.');
      return;
    }

    abortRef.current?.abort();
    abortRef.current = new AbortController();
    setStreaming(true);
    setOutput('');
    setGeneratedAt(null);
    setProvenance(null);

    let assembled = '';
    const snapshot = { ...ctx };

    try {
      const res = await fetch('/api/ai/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'artefact',
          artefact: 'recommendation',
          context: snapshot,
        }),
        signal: abortRef.current.signal,
      });
      if (!res.ok || !res.body) throw new Error(`HTTP ${res.status}`);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';
        for (const line of lines) {
          if (!line.startsWith('data:')) continue;
          const payload = line.slice(5).trim();
          if (!payload) continue;
          if (payload === '[DONE]') {
            setStreaming(false);
            setGeneratedAt(Date.now());
            const prov = await logArtefact(snapshot, assembled);
            if (prov) setProvenance(prov);
            persist(snapshot, assembled, prov);
            return;
          }
          try {
            const json = JSON.parse(payload) as { chunk?: string };
            if (typeof json.chunk === 'string') {
              assembled += json.chunk;
              setOutput((prev) => prev + json.chunk);
            }
          } catch { /* swallow malformed SSE */ }
        }
      }

      setStreaming(false);
      setGeneratedAt(Date.now());
      const prov = await logArtefact(snapshot, assembled);
      if (prov) setProvenance(prov);
      persist(snapshot, assembled, prov);
    } catch (err) {
      const aborted = err instanceof Error && err.name === 'AbortError';
      setStreaming(false);
      if (!aborted) {
        setOutput((prev) => prev + `\n\n[Stream interrupted: ${err instanceof Error ? err.message : 'unknown error'}]`);
      }
    }
  };

  const stop = () => {
    abortRef.current?.abort();
    setStreaming(false);
  };

  const reset = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(LS_KEY);
    }
    setOutput('');
    setGeneratedAt(null);
    setProvenance(null);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch { /* noop */ }
  };

  const download = () => {
    const blob = new Blob([output], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `flyttgo-recommendation-${ctx.organisation.toLowerCase().replace(/\s+/g, '-').slice(0, 40) || 'untitled'}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const toggleModule = (m: string) =>
    setCtx((c) => ({
      ...c,
      modules: c.modules.includes(m) ? c.modules.filter((x) => x !== m) : [...c.modules, m],
    }));

  return (
    <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 shadow-[0_30px_120px_-50px_rgba(10,58,107,0.20)] overflow-hidden">
      <div className="grid lg:grid-cols-12">
        {/* Inputs */}
        <aside className="lg:col-span-4 p-6 border-b lg:border-b-0 lg:border-r border-slate-200/80 dark:border-slate-800/60 bg-slate-50/60 dark:bg-slate-900/40 space-y-4">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold mb-2">
            RC.IN · programme inputs
          </div>

          <Field label="Organisation" code="RC.F1">
            <input
              type="text"
              value={ctx.organisation}
              onChange={(e) => setCtx((c) => ({ ...c, organisation: e.target.value }))}
              placeholder="e.g. Ministry of Digital Affairs"
              className="w-full px-3.5 py-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-[#0A3A6B] dark:focus:border-[#9ED0F9] focus:outline-none text-[14px]"
            />
          </Field>

          <Field label="Programme" code="RC.F2">
            <input
              type="text"
              value={ctx.programme}
              onChange={(e) => setCtx((c) => ({ ...c, programme: e.target.value }))}
              placeholder="e.g. national identity backbone"
              className="w-full px-3.5 py-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-[#0A3A6B] dark:focus:border-[#9ED0F9] focus:outline-none text-[14px]"
            />
          </Field>

          <Field label="Jurisdiction" code="RC.F3">
            <select
              value={ctx.jurisdiction}
              onChange={(e) => setCtx((c) => ({ ...c, jurisdiction: e.target.value }))}
              className="w-full px-3.5 py-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-[#0A3A6B] dark:focus:border-[#9ED0F9] focus:outline-none text-[14px]"
            >
              {JURISDICTIONS.map((j) => <option key={j.value} value={j.value}>{j.label}</option>)}
            </select>
          </Field>

          <Field label="Vertical" code="RC.F4">
            <select
              value={ctx.vertical}
              onChange={(e) => setCtx((c) => ({ ...c, vertical: e.target.value }))}
              className="w-full px-3.5 py-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-[#0A3A6B] dark:focus:border-[#9ED0F9] focus:outline-none text-[14px]"
            >
              {VERTICALS.map((v) => <option key={v.value} value={v.value}>{v.label}</option>)}
            </select>
          </Field>

          <Field label="Scale" code="RC.F5">
            <select
              value={ctx.scale}
              onChange={(e) => setCtx((c) => ({ ...c, scale: e.target.value }))}
              className="w-full px-3.5 py-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-[#0A3A6B] dark:focus:border-[#9ED0F9] focus:outline-none text-[14px]"
            >
              {SCALE.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </Field>

          <Field label="Data sensitivity" code="RC.F6">
            <select
              value={ctx.sensitivity}
              onChange={(e) => setCtx((c) => ({ ...c, sensitivity: e.target.value }))}
              className="w-full px-3.5 py-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-[#0A3A6B] dark:focus:border-[#9ED0F9] focus:outline-none text-[14px]"
            >
              {SENSITIVITY.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </Field>

          <Field label="Modules of interest" code="RC.F7">
            <div className="flex flex-wrap gap-1.5">
              {MODULE_OPTIONS.map((m) => {
                const active = ctx.modules.includes(m);
                return (
                  <button
                    key={m}
                    type="button"
                    onClick={() => toggleModule(m)}
                    className={`px-2.5 py-1.5 rounded-md text-[11px] motion-safe:transition-colors ${
                      active
                        ? 'bg-[#0A3A6B] text-white border border-[#0A3A6B]'
                        : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                    }`}
                  >
                    {m}
                  </button>
                );
              })}
            </div>
          </Field>

          <button
            type="button"
            onClick={streaming ? stop : generate}
            className={`w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-semibold text-sm tracking-tight motion-safe:transition-colors ${
              streaming
                ? 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                : 'bg-[#0A3A6B] text-white hover:bg-[#0A3A6B]/90'
            }`}
          >
            {streaming
              ? <><Loader2 size={14} className="motion-safe:animate-spin" aria-hidden="true" /> Stop streaming</>
              : <><Sparkles size={14} aria-hidden="true" /> Generate recommendation</>}
          </button>

          {generatedAt && !streaming && (
            <button
              type="button"
              onClick={reset}
              className="w-full inline-flex items-center justify-center gap-1.5 text-[11px] text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 motion-safe:transition-colors"
            >
              <RotateCcw size={11} aria-hidden="true" />
              Clear last recommendation
            </button>
          )}
        </aside>

        {/* Output */}
        <div className="lg:col-span-8 p-6 lg:p-7">
          <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
              {streaming ? (
                <span className="inline-flex items-center gap-1.5 text-amber-700 dark:text-amber-400">
                  <Loader2 size={11} className="motion-safe:animate-spin" aria-hidden="true" />
                  Streaming · {output.length.toLocaleString()} chars
                </span>
              ) : output ? (
                <span className="inline-flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400">
                  <Check size={11} aria-hidden="true" />
                  Generated · {output.length.toLocaleString()} chars
                </span>
              ) : (
                <span className="text-slate-400">No recommendation yet · fill inputs and generate</span>
              )}
            </div>
            {output && !streaming && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={copy}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 motion-safe:transition-colors"
                >
                  {copied ? <Check size={11} aria-hidden="true" /> : <Copy size={11} aria-hidden="true" />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
                <button
                  type="button"
                  onClick={download}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#0A3A6B] text-white text-[11px] font-semibold hover:bg-[#0A3A6B]/90 motion-safe:transition-colors"
                >
                  <Download size={11} aria-hidden="true" />
                  Download .md
                </button>
              </div>
            )}
          </div>

          <div className="rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/60 p-5 lg:p-6 min-h-[480px] max-h-[640px] overflow-y-auto">
            {output ? (
              <pre className="font-mono text-[12px] text-slate-800 dark:text-slate-200 leading-[1.7] whitespace-pre-wrap break-words">
                {output}
                {streaming && (
                  <span className="inline-block w-2 h-4 bg-[#0A3A6B] dark:bg-[#9ED0F9] motion-safe:animate-pulse align-middle ml-0.5" aria-hidden="true" />
                )}
              </pre>
            ) : (
              <div className="flex flex-col items-center justify-center text-center min-h-[440px]">
                <Sparkles size={32} className="text-slate-300 dark:text-slate-700" aria-hidden="true" />
                <p className="mt-4 max-w-md text-[13px] text-slate-500 leading-relaxed">
                  Tier + substrate + module-bundle recommendation tailored to your programme inputs.
                  Cross-references the engagement cadence, indicative pricing, and the next-step
                  routing through sandbox / artefact-generator / consultation.
                </p>
                <p className="mt-3 max-w-md font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400">
                  RC.OT · streamed via /api/ai/ask
                </p>
              </div>
            )}
          </div>

          {output && !streaming && (
            <>
              {provenance && (
                <div className="mt-4 p-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200/80 dark:border-emerald-800/60">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="font-mono text-[10px] uppercase tracking-[0.18em] font-semibold text-emerald-700 dark:text-emerald-400">
                      RC.PV · provenance logged
                    </div>
                    <Link
                      href="/governance/ai/artefacts"
                      className="font-mono text-[10px] uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-400 hover:underline underline-offset-4"
                    >
                      Open registry →
                    </Link>
                  </div>
                  <div className="mt-2 grid sm:grid-cols-2 gap-2 font-mono text-[11px]">
                    <div>
                      <span className="text-emerald-700 dark:text-emerald-400">Code · </span>
                      <span className="text-slate-700 dark:text-slate-300">{provenance.code}</span>
                    </div>
                    <div className="break-all">
                      <span className="text-emerald-700 dark:text-emerald-400">SHA-256 · </span>
                      <span className="text-slate-700 dark:text-slate-300">{provenance.sha.slice(0, 32)}…</span>
                    </div>
                  </div>
                </div>
              )}
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <Link
                  href="/sandbox"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 text-slate-900 dark:text-white text-sm font-semibold hover:border-slate-300 motion-safe:transition-colors"
                >
                  <Cpu size={13} aria-hidden="true" />
                  Spin up sandbox · SB.SP
                  <ArrowUpRight size={13} aria-hidden="true" />
                </Link>
                <Link
                  href="/ask-flyttgo"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 text-slate-900 dark:text-white text-sm font-semibold hover:border-slate-300 motion-safe:transition-colors"
                >
                  <CheckCircle2 size={13} aria-hidden="true" />
                  Generate CAIQ + RFP · AS.00
                  <ArrowUpRight size={13} aria-hidden="true" />
                </Link>
                <Link
                  href="/consultation"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 text-slate-900 dark:text-white text-sm font-semibold hover:border-slate-300 motion-safe:transition-colors"
                >
                  <Compass size={13} aria-hidden="true" />
                  Open scoping · CB.00
                  <ArrowUpRight size={13} aria-hidden="true" />
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const Field: React.FC<{ label: string; code: string; children: React.ReactNode }> = ({ label, code, children }) => (
  <label className="block">
    <div className="flex items-baseline justify-between mb-1.5">
      <span className="text-[12px] font-semibold tracking-tight text-slate-900 dark:text-white">{label}</span>
      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400">{code}</span>
    </div>
    {children}
  </label>
);
