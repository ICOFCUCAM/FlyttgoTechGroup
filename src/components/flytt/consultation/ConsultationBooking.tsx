'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Loader2,
  CalendarClock,
  Globe2,
  ListChecks,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';
import {
  ORG_TYPES,
  PURPOSES,
  REGIONS,
  DEPLOYMENT_MODELS,
  ARCH_LEVELS,
  CONSULTATION_TYPES,
  PREP_BRIEF,
  consultationTypeForPurpose,
  suggestedLevelFor,
  lookupLabel,
  type OrgCode,
  type PurposeCode,
  type RegionCode,
  type DeploymentModelCode,
  type ArchLevelCode,
} from '@/lib/consultation-schema';

/**
 * CB.00 — Architecture Consultation Booking Engine.
 *
 * Five-step structured intake replacing the generic-meeting flow:
 *   1. Organisation type
 *   2. Consultation purpose (drives the consultation_type)
 *   3. Deployment region
 *   4. Deployment model
 *   5. Preferred time (with browser-detected timezone) + contact
 *
 * On submit: POST /api/consultations → row in
 * public.consultation_requests → swap to a Confirmation panel showing
 * the consultation type, derived architecture tier and a category-
 * specific Preparation Brief (mirrors Accenture / Big-4 engagement
 * preparation briefs).
 */

const TOTAL_STEPS = 5;

type Step = 1 | 2 | 3 | 4 | 5;
type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

type FormState = {
  orgType?: OrgCode;
  orgName: string;
  purpose?: PurposeCode;
  region?: RegionCode;
  deployment?: DeploymentModelCode;
  archLevel?: ArchLevelCode;
  date: string;       // 'YYYY-MM-DD'
  time: string;       // 'HH:MM'
  timezone: string;   // IANA tz, browser-detected
  contactName: string;
  contactEmail: string;
  contactRole: string;
  notes: string;
};

const INITIAL_STATE: FormState = {
  orgName: '',
  date: '',
  time: '10:00',
  timezone: 'UTC',
  contactName: '',
  contactEmail: '',
  contactRole: '',
  notes: '',
};

// Generates the 30-day forward window starting tomorrow (no same-day
// bookings — the engagement desk needs at least one business day).
function generateDateOptions(): { value: string; label: string }[] {
  const out: { value: string; label: string }[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  for (let i = 1; i <= 30; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    // Skip Sat/Sun
    const dow = d.getDay();
    if (dow === 0 || dow === 6) continue;
    const value = d.toISOString().slice(0, 10);
    const label = d.toLocaleDateString('en-GB', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
    out.push({ value, label });
  }
  return out;
}

// 09:00–17:00 in 30-minute increments, in the visitor's local time.
function generateTimeOptions(): string[] {
  const out: string[] = [];
  for (let h = 9; h < 17; h++) {
    out.push(`${String(h).padStart(2, '0')}:00`);
    out.push(`${String(h).padStart(2, '0')}:30`);
  }
  out.push('17:00');
  return out;
}

const DATE_OPTIONS = generateDateOptions();
const TIME_OPTIONS = generateTimeOptions();

// --- UI helpers ---------------------------------------------------------

type PickerCardProps = {
  active: boolean;
  onClick: () => void;
  code: string;
  title: string;
  body?: string;
  accent?: string;
};
function PickerCard({ active, onClick, code, title, body, accent = '#0A3A6B' }: PickerCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`group w-full text-left p-4 rounded-xl border-2 motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9]/40 focus-visible:ring-offset-[3px] ${
        active
          ? 'bg-[#0A3A6B]/[0.04] dark:bg-[#9ED0F9]/[0.06]'
          : 'bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
      }`}
      style={{ borderColor: active ? accent : 'rgb(226 232 240 / 0.8)' }}
    >
      <div className="flex items-start gap-3">
        <span
          className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
            active ? 'border-transparent' : 'border-slate-300 dark:border-slate-600'
          }`}
          style={{ backgroundColor: active ? accent : 'transparent' }}
          aria-hidden="true"
        >
          {active && <Check size={12} strokeWidth={3} className="text-white" />}
        </span>
        <div className="flex-1 min-w-0">
          <div className="font-mono text-[10px] tracking-[0.22em] uppercase font-semibold" style={{ color: accent }}>
            {code}
          </div>
          <div className="mt-0.5 text-[14px] font-semibold tracking-tight text-slate-900 dark:text-white leading-snug">
            {title}
          </div>
          {body && (
            <div className="mt-1 text-[12px] text-slate-500 dark:text-slate-400 leading-snug">
              {body}
            </div>
          )}
        </div>
      </div>
    </button>
  );
}

// --- Main component -----------------------------------------------------

type ConfirmationData = {
  id: string;
  consultation_type: string;
  created_at: string;
};

export default function ConsultationBooking() {
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [status, setStatus] = useState<SubmitState>('idle');
  const [error, setError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<ConfirmationData | null>(null);

  // Detect browser timezone on mount.
  useEffect(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
      setForm((f) => ({ ...f, timezone: tz }));
    } catch {
      /* keep UTC default */
    }
  }, []);

  // Auto-suggest architecture tier when org type is picked.
  useEffect(() => {
    if (form.orgType && !form.archLevel) {
      setForm((f) => ({ ...f, archLevel: suggestedLevelFor(form.orgType!) }));
    }
  }, [form.orgType, form.archLevel]);

  const consultationType = useMemo(
    () => (form.purpose ? consultationTypeForPurpose(form.purpose) : null),
    [form.purpose],
  );

  const canAdvance = useMemo(() => {
    switch (step) {
      case 1: return Boolean(form.orgType);
      case 2: return Boolean(form.purpose);
      case 3: return Boolean(form.region);
      case 4: return Boolean(form.deployment);
      case 5:
        return (
          Boolean(form.date) &&
          Boolean(form.time) &&
          Boolean(form.archLevel) &&
          form.contactName.trim().length >= 2 &&
          /.+@.+\..+/.test(form.contactEmail.trim())
        );
      default:
        return false;
    }
  }, [step, form]);

  const goNext = () => {
    if (!canAdvance) return;
    if (step < TOTAL_STEPS) setStep((s) => (s + 1) as Step);
    else void submit();
  };
  const goBack = () => {
    if (step > 1) setStep((s) => (s - 1) as Step);
  };

  const submit = async () => {
    if (status === 'submitting') return;
    setStatus('submitting');
    setError(null);
    try {
      // Compose ISO timestamp from date + time + timezone. We send the
      // local date+time as a naive string and the IANA timezone separately;
      // the server reconstructs the absolute moment via the tz.
      // For simplicity here we treat date+time as local-to-tz and convert
      // to ISO using the visitor's offset at that moment.
      const localISO = new Date(`${form.date}T${form.time}:00`).toISOString();

      const res = await fetch('/api/consultations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          organization_type: form.orgType,
          organization_name: form.orgName.trim() || undefined,
          consultation_purpose: form.purpose,
          deployment_region: form.region,
          deployment_model: form.deployment,
          architecture_level: form.archLevel,
          requested_time: localISO,
          requested_timezone: form.timezone,
          contact_name: form.contactName.trim(),
          contact_email: form.contactEmail.trim(),
          contact_role: form.contactRole.trim() || undefined,
          notes: form.notes.trim() || undefined,
        }),
      });
      const json = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        id?: string;
        consultation_type?: string;
        created_at?: string;
        error?: string;
      };
      if (!res.ok || !json.ok || !json.id) {
        setStatus('error');
        setError(json.error || 'Could not save consultation request.');
        return;
      }
      setConfirmation({
        id: json.id,
        consultation_type: json.consultation_type ?? consultationType ?? 'CT.01',
        created_at: json.created_at ?? new Date().toISOString(),
      });
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Network error.');
    }
  };

  // Confirmation surface ------------------------------------------------
  if (status === 'success' && confirmation) {
    const ctMeta = CONSULTATION_TYPES.find((c) => c.code === confirmation.consultation_type);
    const brief = PREP_BRIEF[confirmation.consultation_type as keyof typeof PREP_BRIEF];
    return (
      <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        <div className="lg:col-span-7 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 overflow-hidden">
          <div className="px-6 py-4 bg-gradient-to-r from-[#0A1F3D] to-[#0A3A6B] text-white flex items-center gap-3">
            <span className="w-8 h-8 rounded-md bg-[#D6B575]/20 text-[#D6B575] flex items-center justify-center" aria-hidden="true">
              <Check size={14} strokeWidth={2.5} />
            </span>
            <div className="flex-1 min-w-0">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#D6B575] font-semibold">
                CB.00 · Consultation request received
              </div>
              <div className="mt-0.5 text-[14px] font-semibold tracking-tight text-white">
                Reference: {confirmation.id.slice(0, 8).toUpperCase()}
              </div>
            </div>
          </div>

          <div className="px-6 py-6">
            <h3 className="font-serif text-2xl md:text-3xl font-medium tracking-tight text-slate-900 dark:text-white leading-[1.1]">
              Engagement desk will respond within{' '}
              <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                one business day.
              </em>
            </h3>

            <dl className="mt-6 grid sm:grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">
                  Consultation type
                </dt>
                <dd className="mt-1 text-[14px] font-semibold tracking-tight text-slate-900 dark:text-white">
                  <span
                    className="font-mono text-[10px] tracking-[0.22em] mr-1.5"
                    style={{ color: ctMeta?.color }}
                  >
                    {confirmation.consultation_type}
                  </span>
                  {ctMeta?.label}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">
                  Deployment region
                </dt>
                <dd className="mt-1 text-[14px] font-semibold tracking-tight text-slate-900 dark:text-white">
                  {lookupLabel(REGIONS, form.region!)}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">
                  Deployment model
                </dt>
                <dd className="mt-1 text-[14px] font-semibold tracking-tight text-slate-900 dark:text-white">
                  {lookupLabel(DEPLOYMENT_MODELS, form.deployment!)}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">
                  Architecture tier
                </dt>
                <dd className="mt-1 text-[14px] font-semibold tracking-tight text-slate-900 dark:text-white">
                  {lookupLabel(ARCH_LEVELS, form.archLevel!)}
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">
                  Requested consultation time
                </dt>
                <dd className="mt-1 text-[14px] font-semibold tracking-tight text-slate-900 dark:text-white tabular-nums">
                  {form.date} · {form.time}
                  <span className="ml-2 font-mono text-[11px] uppercase tracking-[0.16em] text-slate-500 font-normal">
                    {form.timezone}
                  </span>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <aside className="lg:col-span-5 rounded-2xl bg-[#0A1F3D] text-white border border-[#D6B575]/20 overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10 flex items-center gap-2 font-mono text-[10px] tracking-[0.22em] uppercase">
            <ListChecks size={12} strokeWidth={2} aria-hidden="true" className="text-[#D6B575]" />
            <span className="text-[#D6B575] font-semibold">CB.PREP</span>
            <span aria-hidden="true" className="text-white/30">·</span>
            <span className="text-white/85">Consultation preparation brief</span>
          </div>
          <div className="px-6 py-5">
            <div className="font-serif text-[16px] font-medium text-white">
              {brief.title}
            </div>
            <p className="mt-2 text-[12px] text-white/65 leading-relaxed">
              Please prepare the following before the session. Materials
              shared with the desk in advance accelerate the SE.D2
              scoping engagement.
            </p>
            <ul className="mt-5 space-y-2">
              {brief.items.map((it) => (
                <li
                  key={it}
                  className="flex items-start gap-2.5 text-[13px] text-white/85 leading-snug"
                >
                  <span
                    className="mt-1.5 w-1 h-1 rounded-full bg-[#D6B575] flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span>{it}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 pt-4 border-t border-white/10 font-mono text-[10px] uppercase tracking-[0.18em] text-white/55">
              Audit log retains every consultation request · platform@flyttgotech.com
            </p>
          </div>
        </aside>
      </div>
    );
  }

  // Wizard surface ------------------------------------------------------
  return (
    <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 shadow-sm overflow-hidden">
      {/* Step rail */}
      <div className="px-6 sm:px-8 lg:px-10 py-4 border-b border-slate-200/70 dark:border-slate-800/60 bg-gradient-to-r from-slate-50/60 to-white dark:from-slate-900/40 dark:to-slate-900">
        <ol className="flex items-center gap-2 sm:gap-4 font-mono text-[10px] uppercase tracking-[0.16em]">
          {([1, 2, 3, 4, 5] as Step[]).map((n) => (
            <li key={n} className="flex items-center gap-2 flex-1 min-w-0">
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center font-semibold tabular-nums flex-shrink-0 ${
                  n < step
                    ? 'bg-[#0FB5A6] text-white'
                    : n === step
                    ? 'bg-[#0A3A6B] text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                }`}
              >
                {n < step ? <Check size={12} strokeWidth={3} /> : n}
              </span>
              <span
                className={`truncate ${
                  n === step ? 'text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold' : 'text-slate-400'
                } hidden sm:inline`}
              >
                {n === 1 && 'Organization'}
                {n === 2 && 'Purpose'}
                {n === 3 && 'Region'}
                {n === 4 && 'Deployment'}
                {n === 5 && 'Schedule'}
              </span>
            </li>
          ))}
        </ol>
      </div>

      <div className="px-6 sm:px-8 lg:px-10 py-7 min-h-[460px]">
        {/* Step indicator code */}
        <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400 mb-5">
          <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">
            CB.0{step}
          </span>
          <span aria-hidden="true" className="text-slate-200 dark:text-slate-700">·</span>
          <span className="text-slate-700 dark:text-slate-300 normal-case tracking-tight font-sans">
            Step {step} of {TOTAL_STEPS}
          </span>
        </div>

        {/* STEP 1 — ORG TYPE */}
        {step === 1 && (
          <div>
            <h3 className="font-serif text-2xl md:text-3xl font-medium tracking-tight text-slate-900 dark:text-white leading-[1.1]">
              What kind of organisation is booking?
            </h3>
            <p className="mt-2 text-[13px] text-slate-500 dark:text-slate-400">
              The engagement desk routes the request based on your organisation type.
            </p>
            <ul className="mt-6 grid sm:grid-cols-2 gap-3">
              {ORG_TYPES.map((o) => (
                <li key={o.code}>
                  <PickerCard
                    active={form.orgType === o.code}
                    onClick={() => setForm((f) => ({ ...f, orgType: o.code }))}
                    code={o.code}
                    title={o.label}
                    body={o.context}
                  />
                </li>
              ))}
            </ul>
            <div className="mt-5">
              <label
                htmlFor="orgName"
                className="block font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500 font-semibold"
              >
                Organisation name <span className="text-slate-400 font-normal">(optional)</span>
              </label>
              <input
                id="orgName"
                type="text"
                value={form.orgName}
                onChange={(e) => setForm((f) => ({ ...f, orgName: e.target.value }))}
                placeholder="Ministry of Digital Affairs · Acme Logistics · …"
                className="mt-2 w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm tracking-tight focus:outline-none focus:ring-2 focus:ring-[#1E6FD9]/40 focus:border-[#1E6FD9]"
              />
            </div>
          </div>
        )}

        {/* STEP 2 — PURPOSE */}
        {step === 2 && (
          <div>
            <h3 className="font-serif text-2xl md:text-3xl font-medium tracking-tight text-slate-900 dark:text-white leading-[1.1]">
              What is the purpose of the consultation?
            </h3>
            <p className="mt-2 text-[13px] text-slate-500 dark:text-slate-400">
              Drives the consultation type and the desk specialist who responds.
            </p>
            <ul className="mt-6 grid gap-3">
              {PURPOSES.map((p) => {
                const ct = consultationTypeForPurpose(p.code);
                const ctMeta = CONSULTATION_TYPES.find((c) => c.code === ct);
                return (
                  <li key={p.code}>
                    <PickerCard
                      active={form.purpose === p.code}
                      onClick={() => setForm((f) => ({ ...f, purpose: p.code }))}
                      code={p.code}
                      title={p.label}
                      body={`${p.context} · routed to ${ctMeta?.label}`}
                      accent={ctMeta?.color}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {/* STEP 3 — REGION */}
        {step === 3 && (
          <div>
            <h3 className="font-serif text-2xl md:text-3xl font-medium tracking-tight text-slate-900 dark:text-white leading-[1.1]">
              Which region will the deployment serve?
            </h3>
            <p className="mt-2 text-[13px] text-slate-500 dark:text-slate-400">
              Determines residency, regulatory frame and pricing band.
            </p>
            <ul className="mt-6 grid sm:grid-cols-2 gap-3">
              {REGIONS.map((r) => (
                <li key={r.code}>
                  <PickerCard
                    active={form.region === r.code}
                    onClick={() => setForm((f) => ({ ...f, region: r.code }))}
                    code={r.code}
                    title={r.label}
                    body={r.sub}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* STEP 4 — DEPLOYMENT */}
        {step === 4 && (
          <div>
            <h3 className="font-serif text-2xl md:text-3xl font-medium tracking-tight text-slate-900 dark:text-white leading-[1.1]">
              Which deployment substrate is most relevant?
            </h3>
            <p className="mt-2 text-[13px] text-slate-500 dark:text-slate-400">
              Choose the substrate your programme is most likely to operate
              under. Final substrate is locked at the SE.D2 scoping engagement.
            </p>
            <ul className="mt-6 grid sm:grid-cols-2 gap-3">
              {DEPLOYMENT_MODELS.map((d) => (
                <li key={d.code}>
                  <PickerCard
                    active={form.deployment === d.code}
                    onClick={() => setForm((f) => ({ ...f, deployment: d.code }))}
                    code={d.code}
                    title={d.label}
                    body={d.sub}
                    accent="#7C5CE6"
                  />
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* STEP 5 — SCHEDULE + CONTACT */}
        {step === 5 && (
          <div>
            <h3 className="font-serif text-2xl md:text-3xl font-medium tracking-tight text-slate-900 dark:text-white leading-[1.1]">
              When should the desk reach out?
            </h3>
            <p className="mt-2 text-[13px] text-slate-500 dark:text-slate-400">
              Pick a 30-minute window in your local timezone — autodetected
              as <span className="font-mono text-slate-700 dark:text-slate-300">{form.timezone}</span>.
              The engagement desk confirms the slot via email.
            </p>

            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="date"
                  className="block font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500 font-semibold"
                >
                  Date
                </label>
                <select
                  id="date"
                  value={form.date}
                  onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                  className="mt-2 w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm tracking-tight focus:outline-none focus:ring-2 focus:ring-[#1E6FD9]/40 focus:border-[#1E6FD9]"
                >
                  <option value="">Select a date</option>
                  {DATE_OPTIONS.map((d) => (
                    <option key={d.value} value={d.value}>{d.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="time"
                  className="block font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500 font-semibold"
                >
                  Time
                </label>
                <select
                  id="time"
                  value={form.time}
                  onChange={(e) => setForm((f) => ({ ...f, time: e.target.value }))}
                  className="mt-2 w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm tracking-tight focus:outline-none focus:ring-2 focus:ring-[#1E6FD9]/40 focus:border-[#1E6FD9] tabular-nums"
                >
                  {TIME_OPTIONS.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-200/70 dark:border-slate-800/60">
              <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-slate-500 mb-3">
                Architecture tier · auto-suggested for your organisation type
              </div>
              <select
                aria-label="Architecture tier"
                value={form.archLevel ?? ''}
                onChange={(e) => setForm((f) => ({ ...f, archLevel: e.target.value as ArchLevelCode }))}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm tracking-tight focus:outline-none focus:ring-2 focus:ring-[#1E6FD9]/40 focus:border-[#1E6FD9]"
              >
                {ARCH_LEVELS.map((a) => (
                  <option key={a.code} value={a.code}>
                    {a.code} · {a.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-200/70 dark:border-slate-800/60 grid sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="contactName"
                  className="block font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500 font-semibold"
                >
                  Your name
                </label>
                <input
                  id="contactName"
                  type="text"
                  value={form.contactName}
                  onChange={(e) => setForm((f) => ({ ...f, contactName: e.target.value }))}
                  required
                  className="mt-2 w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E6FD9]/40 focus:border-[#1E6FD9]"
                />
              </div>
              <div>
                <label
                  htmlFor="contactEmail"
                  className="block font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500 font-semibold"
                >
                  Work email
                </label>
                <input
                  id="contactEmail"
                  type="email"
                  value={form.contactEmail}
                  onChange={(e) => setForm((f) => ({ ...f, contactEmail: e.target.value }))}
                  placeholder="name@organisation.tld"
                  required
                  className="mt-2 w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E6FD9]/40 focus:border-[#1E6FD9]"
                />
              </div>
              <div>
                <label
                  htmlFor="contactRole"
                  className="block font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500 font-semibold"
                >
                  Your role <span className="text-slate-400 font-normal">(optional)</span>
                </label>
                <input
                  id="contactRole"
                  type="text"
                  value={form.contactRole}
                  onChange={(e) => setForm((f) => ({ ...f, contactRole: e.target.value }))}
                  placeholder="CIO · Director · Programme manager"
                  className="mt-2 w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E6FD9]/40 focus:border-[#1E6FD9]"
                />
              </div>
              <div>
                <label
                  htmlFor="notes"
                  className="block font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500 font-semibold"
                >
                  Notes <span className="text-slate-400 font-normal">(optional)</span>
                </label>
                <input
                  id="notes"
                  type="text"
                  value={form.notes}
                  onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                  placeholder="Programme name · context · constraints"
                  className="mt-2 w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E6FD9]/40 focus:border-[#1E6FD9]"
                />
              </div>
            </div>

            {error && (
              <p
                role="alert"
                className="mt-4 px-3 py-2 rounded-md bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-sm text-rose-700 dark:text-rose-300 font-mono tracking-tight inline-flex items-center gap-2"
              >
                <AlertCircle size={13} aria-hidden="true" />
                {error}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Step nav */}
      <div className="px-6 sm:px-8 lg:px-10 py-4 border-t border-slate-200/70 dark:border-slate-800/60 bg-slate-50/60 dark:bg-slate-900/40 flex items-center gap-3">
        <button
          type="button"
          onClick={goBack}
          disabled={step === 1 || status === 'submitting'}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white disabled:opacity-40 disabled:cursor-not-allowed motion-safe:transition-colors"
        >
          <ChevronLeft size={14} aria-hidden="true" />
          Back
        </button>
        <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400 hidden sm:inline">
          Step {step} of {TOTAL_STEPS}
        </span>
        <button
          type="button"
          onClick={goNext}
          disabled={!canAdvance || status === 'submitting'}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#0A3A6B] text-white text-sm font-semibold tracking-tight hover:bg-[#0A3A6B]/90 disabled:opacity-50 disabled:cursor-not-allowed motion-safe:transition-colors"
        >
          {status === 'submitting' ? (
            <>
              <Loader2 size={14} strokeWidth={2} className="motion-safe:animate-spin" aria-hidden="true" />
              Submitting…
            </>
          ) : step === TOTAL_STEPS ? (
            <>
              <CalendarClock size={14} strokeWidth={2} aria-hidden="true" />
              Request consultation
            </>
          ) : (
            <>
              Continue
              <ChevronRight size={14} aria-hidden="true" />
            </>
          )}
        </button>
      </div>

      <div className="px-6 sm:px-8 lg:px-10 py-3 border-t border-slate-200/70 dark:border-slate-800/60 flex items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">
        <span className="inline-flex items-center gap-1.5">
          <ShieldCheck size={11} className="text-[#0FB5A6]" aria-hidden="true" />
          Audit log retains every consultation request
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Globe2 size={11} className="text-[#0A3A6B] dark:text-[#9ED0F9]" aria-hidden="true" />
          {form.timezone}
        </span>
      </div>
    </div>
  );
}
