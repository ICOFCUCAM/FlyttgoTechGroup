'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowUpRight,
  Check,
  Copy,
  Trash2,
  Plus,
  ShieldCheck,
  ShieldAlert,
  Send,
  Activity,
  Webhook,
  Loader2,
  RotateCcw,
} from 'lucide-react';

/**
 * WH.00 — webhook inspector.
 *
 * Two parts:
 *   1. The inspector URL — every visitor gets a unique random URL
 *      (whk_<8>) persisted to localStorage. POST anything to it, see
 *      the request appear in the timeline. (Real receiver lands when
 *      the platform-policy API does; this surface ships the URL +
 *      timeline UI shape now.)
 *   2. The signature validator — paste a payload + HMAC signature +
 *      the signing secret; we verify HMAC-SHA256 + 5-minute timestamp
 *      window, exactly the way the platform validates webhooks.
 *
 * The synthetic event-stream tab seeds five sample events from each
 * module so dev teams can pattern-match against real shapes without
 * needing to wire production receivers first.
 */

const LS_KEY_INSPECTOR  = 'flytt:webhook:inspector-id';
const LS_KEY_HISTORY    = 'flytt:webhook:history';

type WebhookEvent = {
  id: string;
  receivedAt: number;
  module: 'transify' | 'identra' | 'payvera' | 'civitas' | 'workverge';
  type: string;
  payload: Record<string, unknown>;
  signatureValid: boolean;
  source: 'synthetic' | 'live';
};

const SAMPLE_EVENTS: Omit<WebhookEvent, 'id' | 'receivedAt' | 'source'>[] = [
  {
    module: 'transify',
    type: 'order.routed',
    payload: { orderId: 'ord_8jK2sL', providerId: 'prv_29A', route: { distanceKm: 528, durationS: 18420 }, sla: 'express' },
    signatureValid: true,
  },
  {
    module: 'identra',
    type: 'identity.verified',
    payload: { subjectId: 'sub_4f8X', loa: 'substantial', method: 'eidas-qes', verifiedAt: '2026-04-22T14:08:51Z' },
    signatureValid: true,
  },
  {
    module: 'payvera',
    type: 'payment.intent.succeeded',
    payload: { intentId: 'pi_K2x4Q', amount: 12000, currency: 'EUR', rail: 'sct-inst', settledIn: '8.4s' },
    signatureValid: true,
  },
  {
    module: 'civitas',
    type: 'application.submitted',
    payload: { applicationId: 'app_77Lp', templateId: 'tpl_residence_no', submittedBy: 'sub_4f8X' },
    signatureValid: true,
  },
  {
    module: 'workverge',
    type: 'shift.scheduled',
    payload: { shiftId: 'sh_19Q', team: 'eu-west-fleet', startsAt: '2026-04-23T06:00:00Z', operatorId: 'op_8K' },
    signatureValid: true,
  },
];

const generateInspectorId = () => {
  const seg = Array.from({ length: 8 }, () =>
    'abcdef0123456789'[Math.floor(Math.random() * 16)],
  ).join('');
  return `whk_${seg}`;
};

const generateEventId = () => `evt_${Math.random().toString(36).slice(2, 10)}`;

/* --- HMAC-SHA256 over Web Crypto, signature = base64(hmac) --- */

async function computeHmacSha256(secret: string, payload: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify'],
  );
  const sig = await crypto.subtle.sign('HMAC', key, encoder.encode(payload));
  return btoa(String.fromCharCode(...new Uint8Array(sig)));
}

const fmtTs = (ms: number) => {
  const d = new Date(ms);
  return d.toISOString().slice(11, 19);
};

const MODULE_CLS: Record<WebhookEvent['module'], string> = {
  transify:  'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  identra:   'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
  payvera:   'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
  civitas:   'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
  workverge: 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300',
};

export default function WebhookInspector() {
  const [tab, setTab] = useState<'inspector' | 'validator'>('inspector');
  const [inspectorId, setInspectorId] = useState<string>('');
  const [events, setEvents] = useState<WebhookEvent[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [copiedUrl, setCopiedUrl] = useState(false);

  /* --- validator state --- */
  const [valSecret, setValSecret] = useState('whsec_replace_me');
  const [valPayload, setValPayload] = useState('{"event":"order.routed","orderId":"ord_test"}');
  const [valTimestamp, setValTimestamp] = useState(Math.floor(Date.now() / 1000).toString());
  const [valSignature, setValSignature] = useState('');
  const [valResult, setValResult] = useState<null | { valid: boolean; reason: string; computed?: string }>(null);
  const [valBusy, setValBusy] = useState(false);

  // Hydrate inspector ID + event history.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    let id = window.localStorage.getItem(LS_KEY_INSPECTOR);
    if (!id) {
      id = generateInspectorId();
      window.localStorage.setItem(LS_KEY_INSPECTOR, id);
    }
    setInspectorId(id);

    const raw = window.localStorage.getItem(LS_KEY_HISTORY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as unknown as WebhookEvent[];
        setEvents(parsed);
        if (parsed.length) setSelectedId(parsed[0].id);
        return;
      } catch { /* fallthrough */ }
    }

    // First visit: seed timeline with sample events at staggered offsets.
    const seeded: WebhookEvent[] = SAMPLE_EVENTS.map((e, i) => ({
      ...e,
      id: generateEventId(),
      receivedAt: Date.now() - (i + 1) * 47_000,
      source: 'synthetic' as const,
    }));
    setEvents(seeded);
    setSelectedId(seeded[0].id);
    window.localStorage.setItem(LS_KEY_HISTORY, JSON.stringify(seeded));
  }, []);

  const persist = (next: WebhookEvent[]) => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(LS_KEY_HISTORY, JSON.stringify(next));
  };

  const inspectorUrl = useMemo(
    () => inspectorId ? `https://${inspectorId}.flyttgo.tech/hooks/inspect` : '',
    [inspectorId],
  );

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(inspectorUrl);
      setCopiedUrl(true);
      window.setTimeout(() => setCopiedUrl(false), 2000);
    } catch { /* clipboard unavailable */ }
  };

  const replay = (e: WebhookEvent) => {
    const next: WebhookEvent[] = [
      {
        ...e,
        id: generateEventId(),
        receivedAt: Date.now(),
        source: 'synthetic' as const,
      },
      ...events,
    ].slice(0, 30);
    setEvents(next);
    setSelectedId(next[0].id);
    persist(next);
  };

  const clearAll = () => {
    setEvents([]);
    setSelectedId(null);
    persist([]);
  };

  const rotate = () => {
    const id = generateInspectorId();
    setInspectorId(id);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(LS_KEY_INSPECTOR, id);
    }
  };

  /* --- validator --- */

  const recomputeSignature = async () => {
    setValBusy(true);
    try {
      const signed = `${valTimestamp}.${valPayload}`;
      const computed = await computeHmacSha256(valSecret, signed);
      setValSignature(computed);
      setValResult({ valid: true, reason: 'Signature recomputed against payload + timestamp', computed });
    } catch (err) {
      setValResult({ valid: false, reason: err instanceof Error ? err.message : 'computeHmac failed' });
    } finally {
      setValBusy(false);
    }
  };

  const validateSignature = async () => {
    setValBusy(true);
    try {
      const signed = `${valTimestamp}.${valPayload}`;
      const computed = await computeHmacSha256(valSecret, signed);
      const tsAge = Math.floor(Date.now() / 1000) - Number(valTimestamp);
      const tsValid = !isNaN(tsAge) && tsAge >= 0 && tsAge <= 300;
      const sigValid = computed === valSignature.trim();

      if (!tsValid) {
        setValResult({ valid: false, reason: `Timestamp outside 5-minute window (age ${tsAge}s)`, computed });
      } else if (!sigValid) {
        setValResult({ valid: false, reason: 'Signature mismatch — likely wrong secret or payload tampered', computed });
      } else {
        setValResult({ valid: true, reason: 'Signature valid · timestamp within 5-minute window', computed });
      }
    } catch (err) {
      setValResult({ valid: false, reason: err instanceof Error ? err.message : 'verify failed' });
    } finally {
      setValBusy(false);
    }
  };

  const selected = events.find((e) => e.id === selectedId) ?? null;

  return (
    <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 shadow-[0_30px_120px_-50px_rgba(10,58,107,0.20)] overflow-hidden">
      <div className="flex border-b border-slate-200/80 dark:border-slate-800/60">
        {([
          { id: 'inspector' as const, code: 'WH.IN', icon: Webhook,     label: 'Inspector URL + timeline' },
          { id: 'validator' as const, code: 'WH.VL', icon: ShieldCheck, label: 'Signature validator' },
        ]).map((t) => {
          const Icon = t.icon;
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`flex-1 px-5 py-4 text-left motion-safe:transition-colors border-r last:border-r-0 border-slate-200/80 dark:border-slate-800/60 ${
                active
                  ? 'bg-[#0A3A6B] text-white'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900/40'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <Icon size={14} aria-hidden="true" />
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] font-semibold">{t.code}</span>
              </div>
              <div className={`text-[14px] font-semibold tracking-tight ${active ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                {t.label}
              </div>
            </button>
          );
        })}
      </div>

      {tab === 'inspector' ? (
        <div className="grid lg:grid-cols-12">
          {/* URL panel */}
          <aside className="lg:col-span-5 p-6 border-b lg:border-b-0 lg:border-r border-slate-200/80 dark:border-slate-800/60 bg-slate-50/60 dark:bg-slate-900/40">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">
              WH.IN.URL · your inspector URL
            </div>
            <div className="mt-3 rounded-xl bg-[#0A1F3D] text-white border border-white/10 p-4">
              <code className="font-mono text-[12px] text-white/95 break-all leading-relaxed">
                {inspectorUrl || 'allocating…'}
              </code>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={copyUrl}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/[0.06] border border-white/15 text-white text-[11px] font-semibold hover:bg-white/[0.10] motion-safe:transition-colors"
                >
                  {copiedUrl ? <Check size={11} aria-hidden="true" /> : <Copy size={11} aria-hidden="true" />}
                  {copiedUrl ? 'Copied' : 'Copy URL'}
                </button>
                <button
                  type="button"
                  onClick={rotate}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/[0.06] border border-white/15 text-white text-[11px] font-semibold hover:bg-white/[0.10] motion-safe:transition-colors"
                >
                  <RotateCcw size={11} aria-hidden="true" />
                  Rotate
                </button>
              </div>
            </div>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500 leading-relaxed">
              POST anything · headers + body captured · HMAC-SHA256 verified against the secret you set on /developers/api.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={clearAll}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-[11px] font-semibold hover:border-slate-300 motion-safe:transition-colors"
              >
                <Trash2 size={11} aria-hidden="true" />
                Clear timeline
              </button>
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400">
                {events.length} event{events.length === 1 ? '' : 's'} captured
              </span>
            </div>
          </aside>

          {/* Timeline + payload */}
          <div className="lg:col-span-7 p-6">
            <div className="grid lg:grid-cols-5 gap-4 min-h-[480px]">
              <ul className="lg:col-span-2 space-y-1.5 max-h-[480px] overflow-y-auto">
                {events.length === 0 ? (
                  <li className="text-center py-12 text-[12px] text-slate-400">
                    No events yet · POST to the inspector URL
                  </li>
                ) : (
                  events.map((e) => {
                    const isSelected = e.id === selectedId;
                    return (
                      <li key={e.id}>
                        <button
                          type="button"
                          onClick={() => setSelectedId(e.id)}
                          className={`w-full text-left p-3 rounded-lg motion-safe:transition-colors ${
                            isSelected
                              ? 'bg-[#0A3A6B]/8 dark:bg-[#9ED0F9]/8 border border-[#0A3A6B]/30 dark:border-[#9ED0F9]/30'
                              : 'bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono uppercase tracking-[0.12em] font-semibold ${MODULE_CLS[e.module]}`}>
                              {e.module}
                            </span>
                            <span className="font-mono text-[10px] tabular-nums text-slate-400">
                              {fmtTs(e.receivedAt)}
                            </span>
                          </div>
                          <div className="font-mono text-[11px] font-semibold text-slate-900 dark:text-white truncate">
                            {e.type}
                          </div>
                          <div className="mt-1 inline-flex items-center gap-1 font-mono text-[10px]">
                            {e.signatureValid ? (
                              <>
                                <ShieldCheck size={10} className="text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                                <span className="text-emerald-700 dark:text-emerald-400">Signed · valid</span>
                              </>
                            ) : (
                              <>
                                <ShieldAlert size={10} className="text-red-600 dark:text-red-400" aria-hidden="true" />
                                <span className="text-red-700 dark:text-red-400">Signature invalid</span>
                              </>
                            )}
                          </div>
                        </button>
                      </li>
                    );
                  })
                )}
              </ul>

              <div className="lg:col-span-3">
                {selected ? (
                  <div className="rounded-xl bg-[#0A1F3D] text-white border border-white/10 overflow-hidden h-full flex flex-col">
                    <div className="flex items-center justify-between gap-2 px-4 py-2.5 border-b border-white/10">
                      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#9ED0F9]">
                        {selected.id} · {selected.source}
                      </span>
                      <button
                        type="button"
                        onClick={() => replay(selected)}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.06] border border-white/15 text-white text-[10px] font-semibold hover:bg-white/[0.10] motion-safe:transition-colors"
                      >
                        <Send size={10} aria-hidden="true" />
                        Replay
                      </button>
                    </div>
                    <pre className="p-4 text-[12px] leading-relaxed text-white/90 font-mono overflow-auto flex-1 min-h-0">
{`POST ${inspectorUrl}
Content-Type: application/json
X-FlyttGo-Event: ${selected.type}
X-FlyttGo-Timestamp: ${Math.floor(selected.receivedAt / 1000)}
X-FlyttGo-Signature: ${selected.signatureValid ? '✓ valid HMAC-SHA256' : '✗ invalid'}

${JSON.stringify(selected.payload, null, 2)}`}
                    </pre>
                  </div>
                ) : (
                  <div className="rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/60 h-full min-h-[280px] flex items-center justify-center text-[12px] text-slate-400">
                    Pick an event from the timeline
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid lg:grid-cols-12">
          <aside className="lg:col-span-6 p-6 border-b lg:border-b-0 lg:border-r border-slate-200/80 dark:border-slate-800/60 bg-slate-50/60 dark:bg-slate-900/40 space-y-4">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">
              WH.VL.IN · validator inputs
            </div>

            <Field label="Webhook signing secret" code="WH.VL.F1">
              <input
                type="text"
                value={valSecret}
                onChange={(e) => setValSecret(e.target.value)}
                placeholder="whsec_…"
                className="w-full px-3.5 py-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-[#0A3A6B] dark:focus:border-[#9ED0F9] focus:outline-none text-[12px] font-mono"
              />
            </Field>

            <Field label="Timestamp (epoch seconds)" code="WH.VL.F2">
              <input
                type="text"
                value={valTimestamp}
                onChange={(e) => setValTimestamp(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-[#0A3A6B] dark:focus:border-[#9ED0F9] focus:outline-none text-[12px] font-mono"
              />
            </Field>

            <Field label="Payload (raw body bytes)" code="WH.VL.F3">
              <textarea
                value={valPayload}
                onChange={(e) => setValPayload(e.target.value)}
                rows={6}
                className="w-full px-3.5 py-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-[#0A3A6B] dark:focus:border-[#9ED0F9] focus:outline-none text-[12px] font-mono resize-none"
              />
            </Field>

            <Field label="Signature (X-FlyttGo-Signature)" code="WH.VL.F4">
              <textarea
                value={valSignature}
                onChange={(e) => setValSignature(e.target.value)}
                rows={2}
                placeholder="Recompute or paste the value from your incoming webhook"
                className="w-full px-3.5 py-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-[#0A3A6B] dark:focus:border-[#9ED0F9] focus:outline-none text-[12px] font-mono resize-none break-all"
              />
            </Field>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={recomputeSignature}
                disabled={valBusy}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-[12px] font-semibold hover:border-slate-300 disabled:opacity-50 motion-safe:transition-colors"
              >
                <Plus size={11} aria-hidden="true" />
                Recompute signature
              </button>
              <button
                type="button"
                onClick={validateSignature}
                disabled={valBusy}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-[#0A3A6B] text-white text-[12px] font-semibold hover:bg-[#0A3A6B]/90 disabled:opacity-50 motion-safe:transition-colors"
              >
                {valBusy ? <Loader2 size={11} className="motion-safe:animate-spin" aria-hidden="true" /> : <ShieldCheck size={11} aria-hidden="true" />}
                Validate
              </button>
            </div>
          </aside>

          <div className="lg:col-span-6 p-6">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500 mb-3">
              WH.VL.OT · validation result
            </div>
            <div className={`rounded-xl border p-5 min-h-[300px] ${
              valResult === null
                ? 'border-slate-200/80 dark:border-slate-800/60 bg-slate-50/60 dark:bg-slate-900/40'
                : valResult.valid
                  ? 'border-emerald-200 dark:border-emerald-900/60 bg-emerald-50 dark:bg-emerald-900/10'
                  : 'border-red-200 dark:border-red-900/60 bg-red-50 dark:bg-red-900/10'
            }`}>
              {valResult === null ? (
                <div className="flex flex-col items-center justify-center text-center min-h-[260px]">
                  <Activity size={32} className="text-slate-300 dark:text-slate-700" aria-hidden="true" />
                  <p className="mt-4 max-w-md text-[13px] text-slate-500">
                    Paste the inputs from your incoming webhook + the signing secret on the
                    left, then click <strong>Validate</strong>. Computation runs entirely in your
                    browser via Web Crypto — nothing leaves the page.
                  </p>
                </div>
              ) : (
                <div>
                  <div className="flex items-center gap-2">
                    {valResult.valid ? (
                      <ShieldCheck size={20} className="text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                    ) : (
                      <ShieldAlert size={20} className="text-red-600 dark:text-red-400" aria-hidden="true" />
                    )}
                    <span className={`font-mono text-[14px] font-semibold uppercase tracking-[0.14em] ${valResult.valid ? 'text-emerald-700 dark:text-emerald-400' : 'text-red-700 dark:text-red-400'}`}>
                      {valResult.valid ? 'Signature valid' : 'Signature invalid'}
                    </span>
                  </div>
                  <p className="mt-3 text-[13px] text-slate-700 dark:text-slate-300 leading-relaxed">
                    {valResult.reason}
                  </p>
                  {valResult.computed && (
                    <div className="mt-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 p-3 break-all">
                      <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400 mb-1">Computed signature</div>
                      <code className="font-mono text-[11px] text-slate-700 dark:text-slate-300">
                        {valResult.computed}
                      </code>
                    </div>
                  )}
                </div>
              )}
            </div>
            <p className="mt-4 max-w-md font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400 leading-relaxed">
              Same algorithm the platform runs in production · HMAC-SHA256 over `{`${'{'}timestamp{'}'}.${'{'}body{'}'}`}` ·
              5-minute timestamp window enforced.
            </p>
          </div>
        </div>
      )}
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
