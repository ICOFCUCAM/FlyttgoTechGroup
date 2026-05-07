'use client';

import React, { useEffect, useState } from 'react';
import Link from '@/components/flytt/LocaleLink';
import {
  ArrowUpRight,
  CheckCircle2,
  Loader2,
  Copy,
  Check,
  Cpu,
  ShieldCheck,
  Globe2,
  Workflow,
  Clock,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';

/**
 * SB.SP — Self-serve sandbox provisioning.
 *
 * Three-state machine:
 *   intake    → six-field form
 *   provisioning → 9-step synthetic provisioning ticker
 *   ready     → workspace token + console URL + countdown to TTL
 *
 * State persists in localStorage so a return visitor lands on the
 * ready state with their existing workspace, not the empty form.
 */

type SandboxState =
  | { phase: 'intake' }
  | { phase: 'provisioning'; step: number }
  | { phase: 'ready'; workspace: Workspace };

type Workspace = {
  id: string;
  email: string;
  org: string;
  jurisdiction: string;
  intent: string;
  modules: string[];
  token: string;
  createdAt: number;
  ttlMs: number;
};

const LS_KEY = 'flytt:sandbox:workspace';
const TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

const PROVISIONING_STEPS = [
  'Allocating workspace identity (Identra)',
  'Reserving sovereign-region tenant slot',
  'Spinning up Transify routing core',
  'Wiring Identra MFA + agent-token issuance',
  'Seeding synthetic telemetry into Workverge',
  'Provisioning Payvera sandbox payment rails',
  'Linking Civitas service templates',
  'Sealing audit envelope · Sigstore-signed',
  'Workspace ready · routing to console',
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
  { value: 'transify',  label: 'Transify · Mobility' },
  { value: 'workverge', label: 'Workverge · Workforce' },
  { value: 'civitas',   label: 'Civitas · Government' },
  { value: 'edupro',    label: 'EduPro · Education' },
  { value: 'identra',   label: 'Identra · Identity' },
  { value: 'payvera',   label: 'Payvera · Payments' },
  { value: 'ledgera',   label: 'Ledgera · Financial Ops' },
  { value: 'flyttgo',   label: 'FlyttGo Marketplace' },
];

const INTENT_OPTIONS = [
  { value: 'evaluate',  label: 'Evaluate platform fit' },
  { value: 'integrate', label: 'Build a proof-of-concept integration' },
  { value: 'agent',     label: 'Drive the platform with AI agents (MCP)' },
  { value: 'security',  label: 'Run a security review' },
  { value: 'other',     label: 'Other' },
];

const generateToken = () => {
  // Synthetic but realistic-looking token. In production a real workspace
  // token is issued by the trust desk; this is the sandbox stand-in.
  const seg = (n: number) =>
    Array.from({ length: n }, () =>
      'abcdef0123456789'[Math.floor(Math.random() * 16)],
    ).join('');
  return `sk_sbx_${seg(8)}_${seg(24)}`;
};

const generateId = () => `ws_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;

export default function SandboxFlow() {
  const [state, setState] = useState<SandboxState>({ phase: 'intake' });
  const [tokenCopied, setTokenCopied] = useState(false);
  const [now, setNow] = useState(Date.now());
  const [form, setForm] = useState({
    email: '',
    org: '',
    jurisdiction: 'eu',
    intent: 'evaluate',
    modules: ['identra', 'transify'] as string[],
    accept: false,
  });

  // Hydrate from localStorage on mount.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const raw = window.localStorage.getItem(LS_KEY);
    if (!raw) return;
    try {
      const ws = JSON.parse(raw) as Workspace;
      const expired = Date.now() > ws.createdAt + ws.ttlMs;
      if (expired) {
        window.localStorage.removeItem(LS_KEY);
        return;
      }
      setState({ phase: 'ready', workspace: ws });
    } catch {
      window.localStorage.removeItem(LS_KEY);
    }
  }, []);

  // Tick a countdown so the TTL banner stays accurate.
  useEffect(() => {
    if (state.phase !== 'ready') return;
    const t = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(t);
  }, [state.phase]);

  // Provisioning step ticker.
  useEffect(() => {
    if (state.phase !== 'provisioning') return;
    if (state.step >= PROVISIONING_STEPS.length - 1) {
      // Last step lingers for a beat then resolves.
      const t = window.setTimeout(() => {
        const workspace: Workspace = {
          id:           generateId(),
          email:        form.email,
          org:          form.org,
          jurisdiction: form.jurisdiction,
          intent:       form.intent,
          modules:      form.modules,
          token:        generateToken(),
          createdAt:    Date.now(),
          ttlMs:        TTL_MS,
        };
        window.localStorage.setItem(LS_KEY, JSON.stringify(workspace));
        setState({ phase: 'ready', workspace });
      }, 1100);
      return () => window.clearTimeout(t);
    }
    const t = window.setTimeout(() => {
      setState({ phase: 'provisioning', step: state.step + 1 });
    }, 850 + Math.random() * 600);
    return () => window.clearTimeout(t);
  }, [state, form]);

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.org || !form.accept || form.modules.length === 0) return;
    setState({ phase: 'provisioning', step: 0 });
  };

  const teardown = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(LS_KEY);
    }
    setState({ phase: 'intake' });
  };

  const copyToken = async () => {
    if (state.phase !== 'ready') return;
    try {
      await navigator.clipboard.writeText(state.workspace.token);
      setTokenCopied(true);
      window.setTimeout(() => setTokenCopied(false), 2000);
    } catch { /* clipboard unavailable */ }
  };

  if (state.phase === 'intake') {
    return <IntakeForm form={form} setForm={setForm} onSubmit={submitForm} />;
  }
  if (state.phase === 'provisioning') {
    return <Provisioning step={state.step} />;
  }
  return (
    <Ready
      workspace={state.workspace}
      now={now}
      onCopy={copyToken}
      onTeardown={teardown}
      tokenCopied={tokenCopied}
    />
  );
}

/* ---------- intake ---------- */

type FormState = {
  email: string;
  org: string;
  jurisdiction: string;
  intent: string;
  modules: string[];
  accept: boolean;
};

const IntakeForm: React.FC<{
  form: FormState;
  setForm: React.Dispatch<React.SetStateAction<FormState>>;
  onSubmit: (e: React.FormEvent) => void;
}> = ({ form, setForm, onSubmit }) => {
  const toggleModule = (m: string) =>
    setForm((f) => ({
      ...f,
      modules: f.modules.includes(m) ? f.modules.filter((x) => x !== m) : [...f.modules, m],
    }));

  const valid = form.email.includes('@') && form.org.length > 1 && form.modules.length > 0 && form.accept;

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 p-6 lg:p-8 shadow-[0_30px_120px_-50px_rgba(10,58,107,0.20)]"
    >
      <div className="grid md:grid-cols-2 gap-5">
        <Field label="Work email" code="SB.F1">
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            placeholder="cto@example.gov"
            className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 focus:border-[#0A3A6B] dark:focus:border-[#9ED0F9] focus:outline-none text-[14px]"
          />
        </Field>
        <Field label="Organisation" code="SB.F2">
          <input
            type="text"
            required
            value={form.org}
            onChange={(e) => setForm((f) => ({ ...f, org: e.target.value }))}
            placeholder="Ministry of Digital Affairs"
            className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 focus:border-[#0A3A6B] dark:focus:border-[#9ED0F9] focus:outline-none text-[14px]"
          />
        </Field>
        <Field label="Jurisdiction" code="SB.F3">
          <select
            value={form.jurisdiction}
            onChange={(e) => setForm((f) => ({ ...f, jurisdiction: e.target.value }))}
            className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 focus:border-[#0A3A6B] dark:focus:border-[#9ED0F9] focus:outline-none text-[14px]"
          >
            {JURISDICTIONS.map((j) => (
              <option key={j.value} value={j.value}>{j.label}</option>
            ))}
          </select>
        </Field>
        <Field label="Primary intent" code="SB.F4">
          <select
            value={form.intent}
            onChange={(e) => setForm((f) => ({ ...f, intent: e.target.value }))}
            className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 focus:border-[#0A3A6B] dark:focus:border-[#9ED0F9] focus:outline-none text-[14px]"
          >
            {INTENT_OPTIONS.map((i) => (
              <option key={i.value} value={i.value}>{i.label}</option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-6">
        <Field label="Modules to seed" code="SB.F5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {MODULE_OPTIONS.map((m) => {
              const active = form.modules.includes(m.value);
              return (
                <button
                  key={m.value}
                  type="button"
                  onClick={() => toggleModule(m.value)}
                  className={`text-left px-3 py-2.5 rounded-lg border text-[12px] motion-safe:transition-colors ${
                    active
                      ? 'bg-[#0A3A6B] text-white border-[#0A3A6B] dark:bg-[#9ED0F9]/20 dark:border-[#9ED0F9] dark:text-white'
                      : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    {active && <CheckCircle2 size={11} aria-hidden="true" />}
                    <span className="font-medium tracking-tight">{m.label}</span>
                  </div>
                </button>
              );
            })}
          </div>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400">
            {form.modules.length === 0 ? 'Pick at least one module to seed' : `${form.modules.length} selected`}
          </p>
        </Field>
      </div>

      <div className="mt-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={form.accept}
            onChange={(e) => setForm((f) => ({ ...f, accept: e.target.checked }))}
            className="mt-1 w-4 h-4 rounded border-slate-300"
          />
          <span className="text-[12px] text-slate-700 dark:text-slate-300 leading-relaxed">
            Sandbox tenant lifetime is 7 days, runs on synthetic data, and
            cannot reach production rails. I accept the FlyttGo sandbox
            acceptable-use policy and that the workspace token is for my
            organisation&apos;s evaluation use only.
          </span>
        </label>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={!valid}
          className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#0A3A6B] text-white text-sm font-semibold tracking-tight rounded-lg hover:bg-[#0A3A6B]/90 disabled:opacity-40 disabled:cursor-not-allowed motion-safe:transition-all"
        >
          <Sparkles size={14} aria-hidden="true" />
          Spin up the sandbox
          <ArrowUpRight size={14} aria-hidden="true" />
        </button>
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400">
          Provisioning ≈ 8-15 seconds · 7-day TTL · no credit card
        </span>
      </div>
    </form>
  );
};

const Field: React.FC<{ label: string; code: string; children: React.ReactNode }> = ({ label, code, children }) => (
  <label className="block">
    <div className="flex items-baseline justify-between mb-2">
      <span className="text-[12px] font-semibold tracking-tight text-slate-900 dark:text-white">{label}</span>
      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400">{code}</span>
    </div>
    {children}
  </label>
);

/* ---------- provisioning ---------- */

const Provisioning: React.FC<{ step: number }> = ({ step }) => (
  <div className="rounded-3xl bg-[#0A1F3D] text-white p-8 lg:p-10 border border-white/10 shadow-[0_30px_120px_-40px_rgba(0,0,0,0.6)]">
    <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-[#9ED0F9] font-semibold">
      <Loader2 size={14} className="motion-safe:animate-spin" aria-hidden="true" />
      SB.SP.PV · provisioning
    </div>
    <h3 className="mt-4 font-serif text-2xl md:text-3xl font-medium tracking-tight leading-snug max-w-2xl">
      Standing up your workspace,{' '}
      <em className="not-italic font-serif italic font-normal text-[#D6B575]">
        across nine surfaces.
      </em>
    </h3>

    <ol className="mt-8 space-y-2.5">
      {PROVISIONING_STEPS.map((s, i) => {
        const done = i < step;
        const active = i === step;
        const pending = i > step;
        return (
          <li
            key={s}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg motion-safe:transition-all ${
              done ? 'bg-emerald-500/10 border border-emerald-500/20' :
              active ? 'bg-white/[0.06] border border-[#9ED0F9]/30' :
              'bg-white/[0.02] border border-white/5'
            }`}
          >
            <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
              {done && <CheckCircle2 size={14} className="text-emerald-400" aria-hidden="true" />}
              {active && <Loader2 size={14} className="text-[#9ED0F9] motion-safe:animate-spin" aria-hidden="true" />}
              {pending && <span className="w-2 h-2 rounded-full bg-white/15" aria-hidden="true" />}
            </span>
            <span className={`text-[13px] tabular-nums font-mono uppercase tracking-[0.10em] flex-1 ${
              done ? 'text-white/85' : active ? 'text-white' : 'text-white/35'
            }`}>
              {s}
            </span>
            <span className="font-mono text-[10px] tabular-nums text-white/40">
              {String(i + 1).padStart(2, '0')} / 09
            </span>
          </li>
        );
      })}
    </ol>
  </div>
);

/* ---------- ready ---------- */

const Ready: React.FC<{
  workspace: Workspace;
  now: number;
  onCopy: () => void;
  onTeardown: () => void;
  tokenCopied: boolean;
}> = ({ workspace, now, onCopy, onTeardown, tokenCopied }) => {
  const expiresAt = workspace.createdAt + workspace.ttlMs;
  const remainingMs = Math.max(0, expiresAt - now);
  const days = Math.floor(remainingMs / (24 * 60 * 60 * 1000));
  const hours = Math.floor((remainingMs / (60 * 60 * 1000)) % 24);
  const minutes = Math.floor((remainingMs / (60 * 1000)) % 60);
  return (
    <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 p-6 lg:p-8 shadow-[0_30px_120px_-50px_rgba(10,58,107,0.20)]">
      <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-emerald-700 dark:text-emerald-400 font-semibold">
        <CheckCircle2 size={14} aria-hidden="true" />
        SB.SP.RD · workspace ready
      </div>

      <div className="mt-5 grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <h3 className="font-serif text-2xl md:text-3xl font-medium tracking-tight text-slate-900 dark:text-white leading-snug">
            Sandbox provisioned for{' '}
            <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
              {workspace.org}.
            </em>
          </h3>

          <dl className="mt-6 space-y-3 text-[13px]">
            <Row label="Workspace ID"  value={<code className="font-mono text-[12px]">{workspace.id}</code>} />
            <Row label="Operator"      value={workspace.email} />
            <Row label="Jurisdiction"  value={(JURISDICTIONS.find((j) => j.value === workspace.jurisdiction)?.label) ?? workspace.jurisdiction} />
            <Row label="Modules seeded" value={workspace.modules.join(' · ')} />
          </dl>

          <div className="mt-6 p-4 rounded-xl bg-[#0A1F3D] border border-white/10 text-white">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#9ED0F9] font-semibold mb-2">
              <ShieldCheck size={11} aria-hidden="true" />
              workspace token · scope sandbox:read,write
            </div>
            <div className="flex items-center gap-2">
              <code className="flex-1 font-mono text-[12px] text-white/95 truncate">
                {workspace.token}
              </code>
              <button
                type="button"
                onClick={onCopy}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/[0.06] border border-white/15 text-white text-[11px] font-semibold hover:bg-white/[0.10] motion-safe:transition-colors"
              >
                {tokenCopied ? <Check size={11} aria-hidden="true" /> : <Copy size={11} aria-hidden="true" />}
                {tokenCopied ? 'Copied' : 'Copy'}
              </button>
            </div>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-white/45">
              Sandbox-only · cannot reach production rails · audit-logged on every call
            </p>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href="/console"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#0A3A6B] text-white text-sm font-semibold hover:bg-[#0A3A6B]/90 motion-safe:transition-colors"
            >
              <Workflow size={14} aria-hidden="true" />
              Open the console · OC.00
              <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
            <Link
              href="/developers/playground"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 text-slate-900 dark:text-white text-sm font-semibold hover:border-slate-300 motion-safe:transition-colors"
            >
              <Cpu size={14} aria-hidden="true" />
              Live API playground
              <ArrowUpRight size={13} aria-hidden="true" />
            </Link>
            <Link
              href="/agents"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 text-slate-900 dark:text-white text-sm font-semibold hover:border-slate-300 motion-safe:transition-colors"
            >
              <Sparkles size={14} aria-hidden="true" />
              Drive with agents · AI.00
              <ArrowUpRight size={13} aria-hidden="true" />
            </Link>
          </div>
        </div>

        <aside className="lg:col-span-5">
          <div className="rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/60 p-5">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
              <Clock size={11} aria-hidden="true" />
              SB.TT · TTL countdown
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 text-center">
              <Tile big={String(days)}     small="Days" />
              <Tile big={String(hours).padStart(2, '0')}    small="Hours" />
              <Tile big={String(minutes).padStart(2, '0')} small="Minutes" />
            </div>
            <p className="mt-4 text-[12px] text-slate-600 dark:text-slate-400 leading-relaxed">
              Sandbox tears down automatically at expiry. Need longer access?
              The consultation desk extends sandbox tenants for active scoping
              engagements.
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <Link
                href="/consultation?intent=sandbox-extend"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-[#0A3A6B] text-white text-[12px] font-semibold hover:bg-[#0A3A6B]/90 motion-safe:transition-colors"
              >
                <Globe2 size={11} aria-hidden="true" />
                Extend via consultation
                <ArrowUpRight size={11} aria-hidden="true" />
              </Link>
              <button
                type="button"
                onClick={onTeardown}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 text-slate-700 dark:text-slate-300 text-[12px] font-semibold hover:border-slate-300 motion-safe:transition-colors"
              >
                Tear down sandbox
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

const Row: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
  <div className="flex items-baseline gap-3">
    <dt className="w-32 flex-shrink-0 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400">{label}</dt>
    <dd className="text-slate-700 dark:text-slate-300">{value}</dd>
  </div>
);

const Tile: React.FC<{ big: string; small: string }> = ({ big, small }) => (
  <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60">
    <div className="font-serif text-2xl font-medium tabular-nums text-slate-900 dark:text-white leading-none">
      {big}
    </div>
    <div className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-slate-400">
      {small}
    </div>
  </div>
);
