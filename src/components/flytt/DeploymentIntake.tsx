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
          {step > 2 && (
            <p className="text-slate-600 dark:text-slate-400">
              (Step {step} renderer — populated in subsequent parts.)
            </p>
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
