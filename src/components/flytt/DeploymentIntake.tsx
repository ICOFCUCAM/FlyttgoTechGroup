'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import {
  type InstitutionType,
  type DeploymentObjective,
  type DeploymentScale,
  type DeploymentTimeline,
  type DeploymentType,
} from '@/lib/contact-schema';
import TurnstileWidget from '@/components/flytt/TurnstileWidget';

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

      <div className="p-6 sm:p-8 lg:p-10 min-h-[420px]">
        {/* Step content slots in here in subsequent parts */}
        <div className="text-sm text-slate-500 font-mono uppercase tracking-[0.18em]">
          {STEP_META[step - 1].code} · {STEP_META[step - 1].label}
        </div>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          (Step renderer slot — populated in subsequent parts.)
        </p>

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
