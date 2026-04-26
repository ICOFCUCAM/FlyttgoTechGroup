'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Building2,
  Calculator,
  CheckCircle2,
  CreditCard,
  Fingerprint,
  GraduationCap,
  Landmark,
  Layers,
  Loader2,
  Route,
  ShoppingBag,
  Truck,
  UserCheck,
  type LucideIcon,
} from 'lucide-react';
import {
  INSTITUTION_TYPES,
  DEPLOYMENT_OBJECTIVES,
  DEPLOYMENT_SCALES,
  DEPLOYMENT_TIMELINES,
  type InstitutionType,
  type DeploymentObjective,
  type DeploymentScale,
  type DeploymentTimeline,
  type DeploymentType,
} from '@/lib/contact-schema';
import TurnstileWidget from '@/components/flytt/TurnstileWidget';

// ---------- step-01 options ----------------------------------------------

type InstitutionOption = {
  code: string;
  value: InstitutionType;
  icon: LucideIcon;
  label: string;
  sub: string;
};

// ---------- step-02 options + platform routing --------------------------

type ObjectiveOption = {
  code: string;
  value: DeploymentObjective;
  sub: string;
};

const OBJECTIVE_OPTIONS: ObjectiveOption[] = [
  { code: 'OB.01', value: 'Mobility coordination', sub: 'Dispatch · routing · telematics' },
  { code: 'OB.02', value: 'Payments infrastructure', sub: 'PSP rails · payouts · reconciliation' },
  { code: 'OB.03', value: 'Government services', sub: 'Permits · citizen dashboards · audit' },
  { code: 'OB.04', value: 'Education platforms', sub: 'Admissions · scholarships · analytics' },
  { code: 'OB.05', value: 'Workforce coordination', sub: 'Onboarding · certification · shifts' },
  { code: 'OB.06', value: 'Identity infrastructure', sub: 'OIDC · SAML · KYC · national eID' },
  { code: 'OB.07', value: 'Multi-platform rollout', sub: 'Federated · cross-domain · sovereign' },
];

type PlatformChip = {
  slug: string;
  name: string;
  icon: LucideIcon;
  accent: string;
};

const ALL_PLATFORMS: PlatformChip[] = [
  { slug: 'transify', name: 'Transify', icon: Route, accent: '#60A5FA' },
  { slug: 'workverge', name: 'Workverge', icon: UserCheck, accent: '#5EEAD4' },
  { slug: 'civitas', name: 'Civitas', icon: Landmark, accent: '#A78BFA' },
  { slug: 'edupro', name: 'EduPro', icon: GraduationCap, accent: '#FBBF24' },
  { slug: 'identra', name: 'Identra', icon: Fingerprint, accent: '#F472B6' },
  { slug: 'payvera', name: 'Payvera', icon: CreditCard, accent: '#34D399' },
  { slug: 'ledgera', name: 'Ledgera', icon: Calculator, accent: '#2DD4BF' },
  { slug: 'flyttgo', name: 'FlyttGo', icon: Truck, accent: '#FCD34D' },
];

// Platform routing per objective — drives the dynamic preview rail.
// Order matters: highlighted modules are listed in deployment-priority
// order (the most foundational module first).
const OBJECTIVE_TO_MODULES: Record<DeploymentObjective, string[]> = {
  'Mobility coordination': ['transify', 'workverge', 'identra'],
  'Payments infrastructure': ['payvera', 'ledgera', 'identra'],
  'Government services': ['civitas', 'identra', 'payvera'],
  'Education platforms': ['edupro', 'identra', 'payvera'],
  'Workforce coordination': ['workverge', 'identra'],
  'Identity infrastructure': ['identra', 'payvera'],
  'Multi-platform rollout': [
    'transify',
    'workverge',
    'civitas',
    'edupro',
    'identra',
    'payvera',
    'ledgera',
    'flyttgo',
  ],
};

// ---------- step-03 options ---------------------------------------------

type ScaleOption = {
  code: string;
  value: DeploymentScale;
  footprint: string;
};

const SCALE_OPTIONS: ScaleOption[] = [
  { code: 'DS.01', value: 'Pilot', footprint: '1 tenant · 1 region · 1 module' },
  { code: 'DS.02', value: 'City rollout', footprint: '1 metro · 1–2 modules' },
  { code: 'DS.03', value: 'Regional rollout', footprint: 'Multi-tenant · 1–3 regions' },
  { code: 'DS.04', value: 'National rollout', footprint: 'Federated · sovereign-ready' },
  { code: 'DS.05', value: 'Cross-border rollout', footprint: 'Multi-jurisdiction · multi-region' },
];

// ---------- step-04 options ---------------------------------------------

type TimelineOption = {
  code: string;
  value: DeploymentTimeline;
  fit: string;
};

const TIMELINE_OPTIONS: TimelineOption[] = [
  { code: 'TM.01', value: '0–3 months', fit: 'Managed pilot · single tenant' },
  { code: 'TM.02', value: '3–6 months', fit: 'City rollout · 1–2 modules' },
  { code: 'TM.03', value: '6–12 months', fit: 'Regional rollout · multi-tenant' },
  { code: 'TM.04', value: '12+ months', fit: 'National / cross-border · sovereign' },
];

const INSTITUTION_OPTIONS: InstitutionOption[] = [
  {
    code: 'IT.01',
    value: 'Ministry',
    icon: Landmark,
    label: 'Ministry',
    sub: 'National-scale digital service delivery',
  },
  {
    code: 'IT.02',
    value: 'Municipality',
    icon: Building2,
    label: 'Municipality',
    sub: 'City / metro permits, services, transport',
  },
  {
    code: 'IT.03',
    value: 'University',
    icon: GraduationCap,
    label: 'University',
    sub: 'Admissions, scholarships, institutional analytics',
  },
  {
    code: 'IT.04',
    value: 'Transport authority',
    icon: Truck,
    label: 'Transport authority',
    sub: 'Fleet, dispatch, mobility regulation',
  },
  {
    code: 'IT.05',
    value: 'Enterprise operator',
    icon: Briefcase,
    label: 'Enterprise operator',
    sub: 'Internal platforms on customer-cloud tenancy',
  },
  {
    code: 'IT.06',
    value: 'Marketplace operator',
    icon: ShoppingBag,
    label: 'Marketplace operator',
    sub: 'Regulated multi-sided platforms',
  },
];

// ---------- types --------------------------------------------------------

type IntakeState = {
  institution?: InstitutionType;
  objective?: DeploymentObjective;
  scale?: DeploymentScale;
  timeline?: DeploymentTimeline;
  name: string;
  email: string;
  organization: string;
  country: string;
  message: string;
  // honeypot + captcha
  website: string;
  turnstile_token: string;
};

const INITIAL_STATE: IntakeState = {
  institution: undefined,
  objective: undefined,
  scale: undefined,
  timeline: undefined,
  name: '',
  email: '',
  organization: '',
  country: '',
  message: '',
  website: '',
  turnstile_token: '',
};

const TURNSTILE_CONFIGURED = Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);
const TOTAL_STEPS = 5;

const STEP_META = [
  { code: 'STEP 01', label: 'Institution type', field: 'institution' },
  { code: 'STEP 02', label: 'Deployment objective', field: 'objective' },
  { code: 'STEP 03', label: 'Deployment scale', field: 'scale' },
  { code: 'STEP 04', label: 'Timeline', field: 'timeline' },
  { code: 'STEP 05', label: 'Contact details', field: 'contact' },
] as const;

// ---------- component ----------------------------------------------------

const DeploymentIntake: React.FC = () => {
  const [step, setStep] = useState<number>(1); // 1..5
  const [form, setForm] = useState<IntakeState>(INITIAL_STATE);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>(
    'idle',
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const intentRaw = searchParams?.get('intent') ?? '';

  // Step gating — `next` is only enabled when the current step's anchor
  // field is filled (or, for the contact step, when name + email pass
  // a minimum check).
  const canAdvance = useMemo(() => {
    switch (step) {
      case 1:
        return Boolean(form.institution);
      case 2:
        return Boolean(form.objective);
      case 3:
        return Boolean(form.scale);
      case 4:
        return Boolean(form.timeline);
      case 5:
        return (
          form.name.trim().length >= 2 &&
          /.+@.+\..+/.test(form.email.trim()) &&
          (!TURNSTILE_CONFIGURED || Boolean(form.turnstile_token))
        );
      default:
        return false;
    }
  }, [step, form]);

  const goNext = () => {
    if (!canAdvance) return;
    if (step < TOTAL_STEPS) setStep((s) => s + 1);
    else void submit();
  };
  const goBack = () => {
    if (step > 1) setStep((s) => s - 1);
  };

  const submit = async () => {
    if (status === 'submitting') return;
    setStatus('submitting');
    setErrorMessage(null);

    // Collapse the multi-step intake into the legacy /api/contact payload.
    // Structured fields land in their dedicated schema slots; a human-readable
    // summary goes into `message` so the existing deployment_leads row
    // captures the full picture without a DB migration.
    const summary = [
      `Institution:   ${form.institution ?? '—'}`,
      `Objective:     ${form.objective ?? '—'}`,
      `Scale:         ${form.scale ?? '—'}`,
      `Timeline:      ${form.timeline ?? '—'}`,
      form.message ? `\nNotes:\n${form.message}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    const deploymentTypeFromObjective: DeploymentType | undefined =
      form.objective === 'Government services'
        ? 'Government / Municipal Platform'
        : form.objective === 'Education platforms'
          ? 'Education Analytics Platform'
          : form.objective === 'Mobility coordination'
            ? 'Enterprise Fleet Intelligence'
            : form.objective === 'Multi-platform rollout'
              ? 'Marketplace Deployment Engine'
              : 'White-Label Deployment';

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-flyttgo-source': `contact/intake/${intentRaw || 'general'}`,
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.organization || undefined,
          country: form.country || undefined,
          deployment_type: deploymentTypeFromObjective,
          message: summary,
          institution: form.institution,
          objective: form.objective,
          scale: form.scale,
          timeline: form.timeline,
          website: form.website,
          turnstile_token: form.turnstile_token || undefined,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error ?? 'Submission failed. Please try again.');
      }
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMessage(
        err instanceof Error ? err.message : 'Submission failed. Please try again.',
      );
      if (TURNSTILE_CONFIGURED) {
        setForm((f) => ({ ...f, turnstile_token: '' }));
      }
    }
  };

  // ---- render ------------------------------------------------------------

  if (status === 'success') {
    return <IntakeSuccess />;
  }

  return (
    <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 shadow-sm overflow-hidden">
      <IntakeProgress step={step} />

      <div className="p-6 sm:p-8 lg:p-10 min-h-[460px]">
        <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-slate-400">
          <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">
            {STEP_META[step - 1].code}
          </span>
          <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[160px]" />
          <span>{STEP_META[step - 1].label}</span>
        </div>

        <div className="mt-5">
          {step === 1 && (
            <Step01Institution
              value={form.institution}
              onChange={(v) => setForm((f) => ({ ...f, institution: v }))}
            />
          )}
          {step === 2 && (
            <Step02Objective
              value={form.objective}
              onChange={(v) => setForm((f) => ({ ...f, objective: v }))}
            />
          )}
          {step === 3 && (
            <Step03Scale
              value={form.scale}
              onChange={(v) => setForm((f) => ({ ...f, scale: v }))}
            />
          )}
          {step === 4 && (
            <Step04Timeline
              value={form.timeline}
              onChange={(v) => setForm((f) => ({ ...f, timeline: v }))}
            />
          )}
          {step === 5 && (
            <Step05Contact
              form={form}
              onChange={(patch) => setForm((f) => ({ ...f, ...patch }))}
            />
          )}
        </div>

        {errorMessage && status === 'error' && (
          <div
            role="alert"
            className="mt-6 px-4 py-3 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 text-red-800 dark:text-red-200 text-sm"
          >
            {errorMessage}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between gap-4 px-6 sm:px-8 lg:px-10 py-5 border-t border-slate-200/80 dark:border-slate-800/60 bg-slate-50/60 dark:bg-slate-900/60">
        <button
          type="button"
          onClick={goBack}
          disabled={step === 1 || status === 'submitting'}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white disabled:opacity-40 disabled:cursor-not-allowed motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9]/40 focus-visible:ring-offset-[3px] rounded-md"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          Back
        </button>

        <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
          STEP {String(step).padStart(2, '0')} / {String(TOTAL_STEPS).padStart(2, '0')}
        </div>

        <button
          type="button"
          onClick={goNext}
          disabled={!canAdvance || status === 'submitting'}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0A3A6B] text-white text-sm font-semibold rounded-md hover:bg-[#0a2f57] disabled:opacity-40 disabled:cursor-not-allowed motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9]/60 focus-visible:ring-offset-[3px]"
        >
          {status === 'submitting' ? (
            <>
              <Loader2 size={14} className="animate-spin" aria-hidden="true" />
              Submitting…
            </>
          ) : step === TOTAL_STEPS ? (
            <>
              Submit intake
              <ArrowRight size={14} aria-hidden="true" />
            </>
          ) : (
            <>
              Next
              <ArrowRight size={14} aria-hidden="true" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

// ---------- progress bar -------------------------------------------------

const IntakeProgress: React.FC<{ step: number }> = ({ step }) => {
  const ratio = step / TOTAL_STEPS;
  return (
    <div className="border-b border-slate-200/80 dark:border-slate-800/60">
      <ol
        className="grid grid-cols-5"
        aria-label="Deployment intake steps"
      >
        {STEP_META.map((s, i) => {
          const idx = i + 1;
          const isCurrent = idx === step;
          const isPast = idx < step;
          return (
            <li
              key={s.code}
              aria-current={isCurrent ? 'step' : undefined}
              className={`px-3 py-3 sm:py-4 text-left border-r last:border-r-0 border-slate-200/80 dark:border-slate-800/60 ${
                isCurrent
                  ? 'bg-[#0A3A6B]/5 dark:bg-[#1E6FD9]/10'
                  : 'bg-transparent'
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`font-mono text-[10px] tracking-[0.22em] font-semibold ${
                    isCurrent
                      ? 'text-[#0A3A6B] dark:text-[#9ED0F9]'
                      : isPast
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-slate-400 dark:text-slate-600'
                  }`}
                >
                  {s.code}
                </span>
                {isPast && (
                  <CheckCircle2
                    size={12}
                    className="text-emerald-600 dark:text-emerald-400"
                    aria-hidden="true"
                  />
                )}
              </div>
              <div
                className={`mt-1 text-[12px] font-medium tracking-tight truncate ${
                  isCurrent
                    ? 'text-slate-900 dark:text-white'
                    : 'text-slate-500 dark:text-slate-500'
                }`}
              >
                {s.label}
              </div>
            </li>
          );
        })}
      </ol>
      {/* Underline progress fill */}
      <div className="h-[2px] bg-slate-100 dark:bg-slate-800/60">
        <div
          className="h-full bg-gradient-to-r from-[#0A3A6B] via-[#1E6FD9] to-[#0FB5A6] motion-safe:transition-all motion-safe:duration-500"
          style={{ width: `${ratio * 100}%` }}
        />
      </div>
    </div>
  );
};

// ---------- step 01 ------------------------------------------------------

const Step01Institution: React.FC<{
  value: InstitutionType | undefined;
  onChange: (v: InstitutionType) => void;
}> = ({ value, onChange }) => {
  return (
    <fieldset>
      <legend className="font-serif text-2xl md:text-3xl font-medium tracking-tight text-slate-900 dark:text-white leading-[1.15]">
        Which kind of institution is{' '}
        <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
          deploying?
        </em>
      </legend>
      <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 max-w-xl leading-[1.65]">
        Routes the intake to the appropriate FlyttGo deployment team — public-sector
        engineering, transport authority architecture, enterprise integration, or
        marketplace operations.
      </p>

      <ul
        role="radiogroup"
        aria-label="Institution type"
        className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
      >
        {INSTITUTION_OPTIONS.map((opt) => {
          const Icon = opt.icon;
          const selected = value === opt.value;
          return (
            <li key={opt.value}>
              <button
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => onChange(opt.value)}
                className={`group w-full text-left flex flex-col h-full p-4 rounded-xl border motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9]/40 focus-visible:ring-offset-[3px] ${
                  selected
                    ? 'bg-[#0A3A6B]/5 dark:bg-[#1E6FD9]/10 border-[#0A3A6B]/40 dark:border-[#1E6FD9]/50 shadow-sm'
                    : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800/60 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between">
                  <Icon
                    size={18}
                    strokeWidth={1.75}
                    aria-hidden="true"
                    className={
                      selected
                        ? 'text-[#0A3A6B] dark:text-[#9ED0F9]'
                        : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-400 motion-safe:transition-colors'
                    }
                  />
                  <span
                    className={`font-mono text-[10px] tracking-[0.22em] font-semibold ${
                      selected
                        ? 'text-[#0A3A6B] dark:text-[#9ED0F9]'
                        : 'text-slate-400'
                    }`}
                  >
                    {opt.code}
                  </span>
                </div>
                <span className="mt-3 text-[15px] font-semibold text-slate-900 dark:text-white tracking-tight">
                  {opt.label}
                </span>
                <span className="mt-1 text-xs text-slate-500 dark:text-slate-500 leading-snug">
                  {opt.sub}
                </span>
                {selected && (
                  <span className="mt-3 inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.18em] uppercase text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 size={11} aria-hidden="true" />
                    Selected
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </fieldset>
  );
};

// ---------- step 02 ------------------------------------------------------

const Step02Objective: React.FC<{
  value: DeploymentObjective | undefined;
  onChange: (v: DeploymentObjective) => void;
}> = ({ value, onChange }) => {
  const recommended = value
    ? new Set(OBJECTIVE_TO_MODULES[value])
    : new Set<string>();

  return (
    <fieldset>
      <legend className="font-serif text-2xl md:text-3xl font-medium tracking-tight text-slate-900 dark:text-white leading-[1.15]">
        What does the deployment{' '}
        <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
          need to do?
        </em>
      </legend>
      <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 max-w-xl leading-[1.65]">
        Selects the deployment objective and previews the FlyttGo modules
        most likely to be activated for it.
      </p>

      <ul
        role="radiogroup"
        aria-label="Deployment objective"
        className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3"
      >
        {OBJECTIVE_OPTIONS.map((opt) => {
          const selected = value === opt.value;
          return (
            <li key={opt.value}>
              <button
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => onChange(opt.value)}
                className={`group w-full text-left flex flex-col h-full p-4 rounded-xl border motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9]/40 focus-visible:ring-offset-[3px] ${
                  selected
                    ? 'bg-[#0A3A6B]/5 dark:bg-[#1E6FD9]/10 border-[#0A3A6B]/40 dark:border-[#1E6FD9]/50 shadow-sm'
                    : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800/60 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="text-[15px] font-semibold text-slate-900 dark:text-white tracking-tight">
                    {opt.value}
                  </span>
                  <span
                    className={`font-mono text-[10px] tracking-[0.22em] font-semibold flex-shrink-0 ${
                      selected
                        ? 'text-[#0A3A6B] dark:text-[#9ED0F9]'
                        : 'text-slate-400'
                    }`}
                  >
                    {opt.code}
                  </span>
                </div>
                <span className="mt-1 text-xs text-slate-500 dark:text-slate-500 leading-snug">
                  {opt.sub}
                </span>
                {selected && (
                  <span className="mt-3 inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.18em] uppercase text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 size={11} aria-hidden="true" />
                    Routed
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>

      {/* Platform routing preview — dynamically highlights the modules
          most likely to be activated for the chosen objective. */}
      <div
        className="mt-7 p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/60"
        aria-live="polite"
      >
        <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500">
          <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">
            PR.00
          </span>
          <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[140px]" />
          <span>
            {value ? 'Recommended platform modules' : 'Pick an objective to preview module routing'}
          </span>
        </div>
        <ul className="mt-4 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {ALL_PLATFORMS.map((p) => {
            const Icon = p.icon;
            const active = recommended.has(p.slug);
            return (
              <li key={p.slug}>
                <div
                  className={`flex items-center gap-2 px-2.5 py-2 rounded-lg border motion-safe:transition-all ${
                    active
                      ? 'bg-white dark:bg-slate-900 border-slate-300/80 dark:border-slate-700 shadow-sm'
                      : 'bg-transparent border-slate-200/60 dark:border-slate-800/50 opacity-40'
                  }`}
                  aria-current={active ? 'true' : undefined}
                >
                  <Icon
                    size={13}
                    strokeWidth={1.75}
                    aria-hidden="true"
                    style={{ color: active ? p.accent : undefined }}
                    className={active ? '' : 'text-slate-400'}
                  />
                  <span
                    className={`text-xs font-semibold tracking-tight truncate ${
                      active
                        ? 'text-slate-900 dark:text-white'
                        : 'text-slate-400'
                    }`}
                  >
                    {p.name}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </fieldset>
  );
};

// ---------- step 03 ------------------------------------------------------

const Step03Scale: React.FC<{
  value: DeploymentScale | undefined;
  onChange: (v: DeploymentScale) => void;
}> = ({ value, onChange }) => {
  const selectedIndex = value
    ? SCALE_OPTIONS.findIndex((o) => o.value === value)
    : -1;
  // Fill ratio for the connecting rail — climbs to the selected rung's
  // centre. -1 (no selection) collapses the rail to 0%.
  const fillRatio =
    selectedIndex < 0
      ? 0
      : (selectedIndex + 0.5) / SCALE_OPTIONS.length;

  return (
    <fieldset>
      <legend className="font-serif text-2xl md:text-3xl font-medium tracking-tight text-slate-900 dark:text-white leading-[1.15]">
        At what{' '}
        <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
          scale?
        </em>
      </legend>
      <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 max-w-xl leading-[1.65]">
        Sets the deployment footprint. Each scale tier maps to a different
        engagement model — pilots run faster on managed SaaS, national and
        cross-border rollouts trigger sovereign + federated planning.
      </p>

      {/* Graded ladder — connecting rail climbs to the selected rung */}
      <div className="mt-7 relative">
        <div
          aria-hidden="true"
          className="absolute left-0 right-0 top-[20px] h-px bg-slate-200/80 dark:bg-slate-800/60"
        />
        <div
          aria-hidden="true"
          className="absolute left-0 top-[20px] h-px bg-gradient-to-r from-[#0A3A6B] via-[#1E6FD9] to-[#0FB5A6] motion-safe:transition-all motion-safe:duration-500"
          style={{ width: `${fillRatio * 100}%` }}
        />

        <ul
          role="radiogroup"
          aria-label="Deployment scale"
          className="relative grid grid-cols-1 sm:grid-cols-5 gap-3"
        >
          {SCALE_OPTIONS.map((opt, idx) => {
            const selected = value === opt.value;
            const passed = selectedIndex >= 0 && idx <= selectedIndex;
            return (
              <li key={opt.value}>
                <button
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => onChange(opt.value)}
                  className="group w-full flex flex-col items-center text-center focus-visible:outline-none rounded-md"
                >
                  {/* Rung dot */}
                  <span
                    aria-hidden="true"
                    className={`relative w-10 h-10 rounded-full flex items-center justify-center motion-safe:transition-all ${
                      selected
                        ? 'bg-gradient-to-br from-[#0A3A6B] to-[#1E6FD9] text-white shadow-[0_0_0_4px_rgba(30,111,217,0.18)]'
                        : passed
                          ? 'bg-[#0A3A6B]/10 dark:bg-[#1E6FD9]/15 text-[#0A3A6B] dark:text-[#9ED0F9] border border-[#0A3A6B]/30 dark:border-[#1E6FD9]/30'
                          : 'bg-white dark:bg-slate-900 text-slate-400 border border-slate-200/80 dark:border-slate-800/60 group-hover:border-slate-300 group-hover:text-slate-600 dark:group-hover:text-slate-400'
                    }`}
                  >
                    {selected ? (
                      <CheckCircle2 size={16} aria-hidden="true" />
                    ) : (
                      <span className="font-mono text-[11px] font-semibold">
                        0{idx + 1}
                      </span>
                    )}
                  </span>
                  <span
                    className={`mt-3 font-mono text-[10px] tracking-[0.22em] font-semibold ${
                      selected
                        ? 'text-[#0A3A6B] dark:text-[#9ED0F9]'
                        : 'text-slate-400'
                    }`}
                  >
                    {opt.code}
                  </span>
                  <span
                    className={`mt-1 text-[13px] font-semibold tracking-tight ${
                      selected
                        ? 'text-slate-900 dark:text-white'
                        : 'text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white motion-safe:transition-colors'
                    }`}
                  >
                    {opt.value}
                  </span>
                  <span className="mt-1 text-[11px] text-slate-500 dark:text-slate-500 leading-snug max-w-[180px]">
                    {opt.footprint}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </fieldset>
  );
};

// ---------- step 04 ------------------------------------------------------

const Step04Timeline: React.FC<{
  value: DeploymentTimeline | undefined;
  onChange: (v: DeploymentTimeline) => void;
}> = ({ value, onChange }) => {
  return (
    <fieldset>
      <legend className="font-serif text-2xl md:text-3xl font-medium tracking-tight text-slate-900 dark:text-white leading-[1.15]">
        On what{' '}
        <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
          timeline?
        </em>
      </legend>
      <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 max-w-xl leading-[1.65]">
        Sets the deployment window the FlyttGo team plans against. Each window
        carries an indicative deployment-fit note — most rollouts settle into
        the 6–12 month band once procurement and integration are scoped.
      </p>

      <ul
        role="radiogroup"
        aria-label="Deployment timeline"
        className="mt-7 grid grid-cols-2 lg:grid-cols-4 gap-3"
      >
        {TIMELINE_OPTIONS.map((opt) => {
          const selected = value === opt.value;
          return (
            <li key={opt.value}>
              <button
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => onChange(opt.value)}
                className={`group w-full text-left flex flex-col h-full p-5 rounded-xl border motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9]/40 focus-visible:ring-offset-[3px] ${
                  selected
                    ? 'bg-[#0A3A6B]/5 dark:bg-[#1E6FD9]/10 border-[#0A3A6B]/40 dark:border-[#1E6FD9]/50 shadow-sm'
                    : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800/60 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`font-mono text-[10px] tracking-[0.22em] font-semibold ${
                      selected
                        ? 'text-[#0A3A6B] dark:text-[#9ED0F9]'
                        : 'text-slate-400'
                    }`}
                  >
                    {opt.code}
                  </span>
                  {selected && (
                    <CheckCircle2
                      size={14}
                      className="text-emerald-600 dark:text-emerald-400"
                      aria-hidden="true"
                    />
                  )}
                </div>
                <span
                  className={`mt-3 font-serif text-2xl font-medium tracking-tight tabular-nums ${
                    selected
                      ? 'text-slate-900 dark:text-white'
                      : 'text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {opt.value}
                </span>
                <span className="mt-2 text-[11px] text-slate-500 dark:text-slate-500 leading-snug font-mono uppercase tracking-[0.14em]">
                  {opt.fit}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </fieldset>
  );
};

// ---------- step 05 ------------------------------------------------------

const Step05Contact: React.FC<{
  form: IntakeState;
  onChange: (patch: Partial<IntakeState>) => void;
}> = ({ form, onChange }) => {
  return (
    <div>
      <div>
        <h3 className="font-serif text-2xl md:text-3xl font-medium tracking-tight text-slate-900 dark:text-white leading-[1.15]">
          Who should our deployment team{' '}
          <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
            reply to?
          </em>
        </h3>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 max-w-xl leading-[1.65]">
          A solution architect routes the intake within one business day. We
          do not add work emails to marketing lists.
        </p>
      </div>

      {/* Intake recap — last-look summary of steps 1–4 */}
      <div className="mt-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/60">
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-400 mb-3">
          <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">SM.00</span>
          <span className="mx-2 text-slate-300 dark:text-slate-700">·</span>
          Intake summary
        </div>
        <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 font-mono text-[11px] tracking-[0.06em]">
          {[
            ['Institution', form.institution ?? '—'],
            ['Objective', form.objective ?? '—'],
            ['Scale', form.scale ?? '—'],
            ['Timeline', form.timeline ?? '—'],
          ].map(([label, value]) => (
            <div
              key={label}
              className="px-3 py-2 rounded-md bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800/60"
            >
              <dt className="text-[9px] uppercase tracking-[0.22em] text-slate-400">
                {label}
              </dt>
              <dd className="mt-1 text-[12px] text-slate-800 dark:text-slate-200 truncate">
                {value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Hidden honeypot — bots fill it; humans never see it. */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '-10000px',
          width: 1,
          height: 1,
          overflow: 'hidden',
        }}
      >
        <label htmlFor="intake-website">Website (leave blank)</label>
        <input
          id="intake-website"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={(e) => onChange({ website: e.target.value })}
        />
      </div>

      {/* Real fields */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field
          id="intake-name"
          label="Full name"
          required
          autoComplete="name"
          value={form.name}
          onChange={(v) => onChange({ name: v })}
        />
        <Field
          id="intake-organization"
          label="Organization"
          autoComplete="organization"
          value={form.organization}
          onChange={(v) => onChange({ organization: v })}
        />
        <Field
          id="intake-email"
          label="Work email"
          required
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={(v) => onChange({ email: v })}
        />
        <Field
          id="intake-country"
          label="Country"
          autoComplete="country-name"
          value={form.country}
          onChange={(v) => onChange({ country: v })}
        />
      </div>

      <div className="mt-4">
        <label
          htmlFor="intake-message"
          className="block font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500 mb-2"
        >
          Notes for the deployment team{' '}
          <span className="text-slate-400 font-mono normal-case">(optional)</span>
        </label>
        <textarea
          id="intake-message"
          value={form.message}
          onChange={(e) => onChange({ message: e.target.value })}
          rows={3}
          maxLength={2000}
          className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 rounded-lg text-sm font-sans text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-[#1E6FD9] focus:ring-2 focus:ring-[#1E6FD9]/20 motion-safe:transition-colors resize-none"
          placeholder="Programme context, regions, integration constraints, procurement framework — anything that helps the architect scope the call."
        />
      </div>

      {TURNSTILE_CONFIGURED && (
        <div className="mt-5">
          <TurnstileWidget
            onVerify={(token) => onChange({ turnstile_token: token })}
            onExpire={() => onChange({ turnstile_token: '' })}
          />
        </div>
      )}
    </div>
  );
};

// ---------- field helper ------------------------------------------------

const Field: React.FC<{
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  type?: string;
  autoComplete?: string;
}> = ({ id, label, value, onChange, required, type = 'text', autoComplete }) => (
  <div>
    <label
      htmlFor={id}
      className="block font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500 mb-2"
    >
      {label}
      {required && (
        <span className="ml-1 text-[#0A3A6B] dark:text-[#9ED0F9] normal-case">*</span>
      )}
    </label>
    <input
      id={id}
      type={type}
      required={required}
      autoComplete={autoComplete}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 rounded-lg text-sm font-sans text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-[#1E6FD9] focus:ring-2 focus:ring-[#1E6FD9]/20 motion-safe:transition-colors"
    />
  </div>
);

// ---------- success state ------------------------------------------------

const IntakeSuccess: React.FC = () => (
  <div
    role="status"
    aria-live="polite"
    className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 p-8 sm:p-10 lg:p-12 text-center shadow-sm"
  >
    <div className="w-14 h-14 mx-auto rounded-full bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center">
      <CheckCircle2 size={28} className="text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
    </div>
    <h3 className="mt-5 font-serif text-2xl md:text-3xl font-medium tracking-tight text-slate-900 dark:text-white">
      Intake received.
    </h3>
    <p className="mt-3 text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-[1.65]">
      A FlyttGo deployment solution architect will respond within one business day with
      a scoping outline matched to your institution and timeline.
    </p>
    <p className="mt-6 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
      DP.01 · Intake routed · Reference logged
    </p>
  </div>
);

export default DeploymentIntake;
