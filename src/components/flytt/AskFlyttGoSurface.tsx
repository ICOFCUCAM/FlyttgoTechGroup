'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from '@/components/flytt/LocaleLink';
import {
  ArrowUpRight,
  Sparkles,
  ShieldCheck,
  FileText,
  Briefcase,
  Loader2,
  Copy,
  Check,
  Download,
  RotateCcw,
  type LucideIcon,
} from 'lucide-react';

/**
 * Three-mode artefact generator. Streams from /api/ai/ask via SSE,
 * renders incrementally, persists the last artefact per mode in
 * localStorage so a return visitor sees what they generated last.
 */

type Artefact = 'caiq' | 'rfp' | 'proposal';

type ArtefactDef = {
  code: string;
  artefact: Artefact;
  icon: LucideIcon;
  title: string;
  blurb: string;
  outputName: string;
};

const ARTEFACTS: ArtefactDef[] = [
  {
    code: 'AS.A1', artefact: 'caiq', icon: ShieldCheck,
    title: 'CAIQ security questionnaire',
    blurb: 'CAIQ v4-aligned response across 16 control families. Cites TC.00 / SB.00 / OS.00 / AG.00 evidence sources and routes to /consultation.',
    outputName: 'flyttgo-caiq-response.md',
  },
  {
    code: 'AS.A2', artefact: 'rfp', icon: FileText,
    title: 'RFP procurement response',
    blurb: 'Six-section technical RFP response tailored to your jurisdiction + tier + module bundle. Includes risk register and pricing-posture pointer.',
    outputName: 'flyttgo-rfp-response.md',
  },
  {
    code: 'AS.A3', artefact: 'proposal', icon: Briefcase,
    title: 'Custom procurement proposal',
    blurb: 'Six-section tailored proposal — programme summary, capability fit, deployment substrate recommendation, engagement cadence, ROI signal, scoping intake.',
    outputName: 'flyttgo-proposal.md',
  },
];

const JURISDICTIONS = [
  { value: 'eu',     label: 'European Union' },
  { value: 'uk',     label: 'United Kingdom' },
  { value: 'no',     label: 'Norway' },
  { value: 'sa',     label: 'Saudi Arabia' },
  { value: 'ae',     label: 'United Arab Emirates' },
  { value: 'za',     label: 'South Africa' },
  { value: 'other',  label: 'Other' },
];

const MODULE_OPTIONS = [
  'Identra', 'Transify', 'Workverge', 'Civitas', 'EduPro', 'Payvera', 'Ledgera', 'FlyttGo Marketplace',
];

const TIERS = ['L.03', 'L.04', 'L.05', 'L.06'];

const LS_KEY = 'flytt:assistant:lastArtefact';

type StoredArtefact = {
  artefact: Artefact;
  output: string;
  ctx: ArtefactContext;
  generatedAt: number;
};

type ArtefactContext = {
  organisation: string;
  jurisdiction: string;
  tier: string;
  modules: string[];
  programme: string;
  intent: string;
};

const initialCtx: ArtefactContext = {
  organisation: '',
  jurisdiction: 'eu',
  tier:         'L.04',
  modules:      ['Identra'],
  programme:    'platform deployment',
  intent:       'evaluate platform fit',
};

export default function AskFlyttGoSurface() {
  const [activeArtefact, setActiveArtefact] = useState<Artefact>('caiq');
  const [ctx, setCtx] = useState<ArtefactContext>(initialCtx);
  const [streaming, setStreaming] = useState(false);
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [generatedAt, setGeneratedAt] = useState<number | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Hydrate last artefact (per-mode) from localStorage on mount + when mode flips.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const raw = window.localStorage.getItem(`${LS_KEY}:${activeArtefact}`);
    if (!raw) {
      setOutput('');
      setGeneratedAt(null);
      return;
    }
    try {
      const parsed = JSON.parse(raw) as StoredArtefact;
      setOutput(parsed.output);
      setGeneratedAt(parsed.generatedAt);
      setCtx(parsed.ctx);
    } catch {
      setOutput('');
      setGeneratedAt(null);
    }
  }, [activeArtefact]);

  const persist = (artefact: Artefact, fullOutput: string, snapshot: ArtefactContext) => {
    if (typeof window === 'undefined') return;
    const stored: StoredArtefact = {
      artefact,
      output: fullOutput,
      ctx: snapshot,
      generatedAt: Date.now(),
    };
    window.localStorage.setItem(`${LS_KEY}:${artefact}`, JSON.stringify(stored));
  };

  const generate = async () => {
    if (streaming) return;
    if (!ctx.organisation.trim()) {
      // Use a friendly inline prompt rather than alert().
      setOutput('# Organisation required\n\nProvide an organisation name in the panel above so the artefact can be tailored. The model needs the buyer name to address the response correctly.');
      return;
    }

    abortRef.current?.abort();
    abortRef.current = new AbortController();

    setStreaming(true);
    setOutput('');
    setGeneratedAt(null);

    let assembled = '';
    const snapshot = { ...ctx };

    try {
      const res = await fetch('/api/ai/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'artefact',
          artefact: activeArtefact,
          context: snapshot,
        }),
        signal: abortRef.current.signal,
      });

      if (!res.ok || !res.body) {
        throw new Error(`HTTP ${res.status}`);
      }

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
            // Stream complete.
            setStreaming(false);
            setGeneratedAt(Date.now());
            persist(activeArtefact, assembled, snapshot);
            return;
          }
          try {
            const json = JSON.parse(payload) as { chunk?: string };
            if (typeof json.chunk === 'string') {
              assembled += json.chunk;
              setOutput((prev) => prev + json.chunk);
            }
          } catch {
            // Drop unparseable SSE line silently.
          }
        }
      }

      // If we exited the loop without a [DONE] sentinel, persist what we have.
      setStreaming(false);
      setGeneratedAt(Date.now());
      persist(activeArtefact, assembled, snapshot);
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
      window.localStorage.removeItem(`${LS_KEY}:${activeArtefact}`);
    }
    setOutput('');
    setGeneratedAt(null);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch { /* clipboard unavailable */ }
  };

  const download = () => {
    const def = ARTEFACTS.find((a) => a.artefact === activeArtefact);
    if (!def) return;
    const blob = new Blob([output], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = def.outputName;
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

  const activeDef = ARTEFACTS.find((a) => a.artefact === activeArtefact)!;

  return (
    <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 shadow-[0_30px_120px_-50px_rgba(10,58,107,0.20)] overflow-hidden">
      {/* Mode tabs */}
      <div className="flex flex-wrap border-b border-slate-200/80 dark:border-slate-800/60">
        {ARTEFACTS.map((a) => {
          const Icon = a.icon;
          const active = a.artefact === activeArtefact;
          return (
            <button
              key={a.artefact}
              type="button"
              onClick={() => setActiveArtefact(a.artefact)}
              className={`flex-1 min-w-[200px] px-5 py-4 text-left motion-safe:transition-colors border-r last:border-r-0 border-slate-200/80 dark:border-slate-800/60 ${
                active
                  ? 'bg-[#0A3A6B] text-white'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900/40'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <Icon size={14} aria-hidden="true" />
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] font-semibold">
                  {a.code}
                </span>
              </div>
              <div className={`text-[14px] font-semibold tracking-tight ${active ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                {a.title}
              </div>
            </button>
          );
        })}
      </div>

      {/* Body */}
      <div className="grid lg:grid-cols-12">
        {/* Inputs */}
        <aside className="lg:col-span-4 p-6 border-b lg:border-b-0 lg:border-r border-slate-200/80 dark:border-slate-800/60 bg-slate-50/60 dark:bg-slate-900/40 space-y-5">
          <div>
            <div className="flex items-baseline justify-between mb-2">
              <span className="text-[12px] font-semibold tracking-tight text-slate-900 dark:text-white">Organisation</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400">AS.F1</span>
            </div>
            <input
              type="text"
              value={ctx.organisation}
              onChange={(e) => setCtx((c) => ({ ...c, organisation: e.target.value }))}
              placeholder="e.g. Ministry of Digital Affairs"
              className="w-full px-3.5 py-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-[#0A3A6B] dark:focus:border-[#9ED0F9] focus:outline-none text-[14px]"
            />
          </div>

          <div>
            <div className="flex items-baseline justify-between mb-2">
              <span className="text-[12px] font-semibold tracking-tight text-slate-900 dark:text-white">Jurisdiction</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400">AS.F2</span>
            </div>
            <select
              value={ctx.jurisdiction}
              onChange={(e) => setCtx((c) => ({ ...c, jurisdiction: e.target.value }))}
              className="w-full px-3.5 py-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-[#0A3A6B] dark:focus:border-[#9ED0F9] focus:outline-none text-[14px]"
            >
              {JURISDICTIONS.map((j) => (
                <option key={j.value} value={j.value}>{j.label}</option>
              ))}
            </select>
          </div>

          <div>
            <div className="flex items-baseline justify-between mb-2">
              <span className="text-[12px] font-semibold tracking-tight text-slate-900 dark:text-white">Tier</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400">AS.F3</span>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {TIERS.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setCtx((c) => ({ ...c, tier: t }))}
                  className={`px-2 py-2 rounded-md font-mono text-[11px] uppercase tracking-[0.14em] motion-safe:transition-colors ${
                    ctx.tier === t
                      ? 'bg-[#0A3A6B] text-white border border-[#0A3A6B]'
                      : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-baseline justify-between mb-2">
              <span className="text-[12px] font-semibold tracking-tight text-slate-900 dark:text-white">Modules</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400">AS.F4</span>
            </div>
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
          </div>

          <div>
            <div className="flex items-baseline justify-between mb-2">
              <span className="text-[12px] font-semibold tracking-tight text-slate-900 dark:text-white">Programme</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400">AS.F5</span>
            </div>
            <input
              type="text"
              value={ctx.programme}
              onChange={(e) => setCtx((c) => ({ ...c, programme: e.target.value }))}
              placeholder="e.g. national identity backbone"
              className="w-full px-3.5 py-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-[#0A3A6B] dark:focus:border-[#9ED0F9] focus:outline-none text-[14px]"
            />
          </div>

          <button
            type="button"
            onClick={streaming ? stop : generate}
            className={`w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-semibold text-sm tracking-tight motion-safe:transition-colors ${
              streaming
                ? 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                : 'bg-[#0A3A6B] text-white hover:bg-[#0A3A6B]/90'
            }`}
          >
            {streaming ? (
              <>
                <Loader2 size={14} className="motion-safe:animate-spin" aria-hidden="true" />
                Stop streaming
              </>
            ) : (
              <>
                <Sparkles size={14} aria-hidden="true" />
                Generate {activeDef.title.toLowerCase()}
              </>
            )}
          </button>

          {generatedAt && !streaming && (
            <button
              type="button"
              onClick={reset}
              className="w-full inline-flex items-center justify-center gap-1.5 text-[11px] text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 motion-safe:transition-colors"
            >
              <RotateCcw size={11} aria-hidden="true" />
              Clear last artefact
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
                <span className="text-slate-400">No artefact yet · pick inputs and generate</span>
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
                  {activeDef.blurb}
                </p>
                <p className="mt-3 max-w-md font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400">
                  {activeDef.code} · streamed via /api/ai/ask
                </p>
              </div>
            )}
          </div>

          {output && !streaming && (
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Link
                href="/consultation"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 text-slate-900 dark:text-white text-sm font-semibold hover:border-slate-300 motion-safe:transition-colors"
              >
                Open consultation · CB.00
                <ArrowUpRight size={13} aria-hidden="true" />
              </Link>
              <Link
                href="/sandbox"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 text-slate-900 dark:text-white text-sm font-semibold hover:border-slate-300 motion-safe:transition-colors"
              >
                Spin up sandbox · SB.SP
                <ArrowUpRight size={13} aria-hidden="true" />
              </Link>
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400">
                Indicative output · final artefacts countersigned during scoping (SE.D2)
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
