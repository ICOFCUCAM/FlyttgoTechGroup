import React from 'react';
import { Lock, Bus, GraduationCap, Building2, type LucideIcon } from 'lucide-react';

/**
 * GV.08 — Reference programme shapes.
 *
 * Anonymised programme outlines; full reference details shared only
 * under NDA. Each card describes the SHAPE of an engagement
 * (sector, scale, geography, deployment mode, outcomes) without
 * naming the recipient. Cards bear the "Confidential · Reference
 * shape" classification mark to make the discretion explicit.
 *
 * When real anonymised references are cleared for circulation by
 * the engagement desk, replace the placeholder rows below.
 */

type Reference = {
  code: string;
  icon: LucideIcon;
  shape: string;
  scale: string;
  modules: string;
  mode: string;
  outcomes: string[];
};

const REFERENCES: Reference[] = [
  {
    code: 'RF.01',
    icon: Bus,
    shape: 'Mid-size Nordic transport authority',
    scale: '5 cities · 2.4M passenger records / year',
    modules: 'Transify · Workverge',
    mode: 'DM.02 customer cloud (Azure tenancy)',
    outcomes: [
      'Statutory mobility reporting consolidated to a single export pipeline',
      'Dispatch latency on 95th-percentile route below contractual ceiling',
      'Right-to-audit exercised once during pilot — no findings',
    ],
  },
  {
    code: 'RF.02',
    icon: GraduationCap,
    shape: 'National ministry of education',
    scale: 'Multi-institution · scholarship cohort 18,000 / year',
    modules: 'EduPro · Identra · Payvera',
    mode: 'DM.03 sovereign datacenter (national HSM)',
    outcomes: [
      'National-eID integration certified by the trust list authority',
      'Scholarship disbursement cycle reduced to single-business-day SLA',
      'Sovereign-deployment posture sustained through two regulator audits',
    ],
  },
  {
    code: 'RF.03',
    icon: Building2,
    shape: 'European municipal modernisation programme',
    scale: 'Metro population ~600,000 residents',
    modules: 'Civitas · Identra · Payvera',
    mode: 'DM.01 managed SaaS (EU primary region)',
    outcomes: [
      'Citizen-services portal unified across 14 council departments',
      'GDPR DPIA refreshed on the agreed annual cadence — no breach',
      'Decision package supported promotion to 5-year framework agreement',
    ],
  },
];

export default function GovernmentReferences() {
  return (
    <section
      id="gv-08"
      aria-labelledby="gv-08-heading"
      className="relative bg-white dark:bg-slate-950 py-24 lg:py-28 border-t border-slate-200/60 dark:border-slate-800/60 scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
          <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">GV.08</span>
          <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
          <span>Reference programme shapes</span>
        </div>

        <div className="mt-8 grid lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7">
            <h2
              id="gv-08-heading"
              className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-slate-900 dark:text-white leading-[1.05]"
            >
              Three programme shapes,{' '}
              <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                anonymised for public circulation.
              </em>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-base text-slate-600 dark:text-slate-400 leading-[1.65]">
              Full reference details — recipient, contract instrument,
              statutory metrics, audit outcomes — are released only
              under NDA. Request the reference dossier via the
              engagement intake below.
            </p>
          </div>
        </div>

        <ul className="mt-10 grid md:grid-cols-3 gap-4">
          {REFERENCES.map((r) => {
            const Icon = r.icon;
            return (
              <li
                key={r.code}
                className="flex flex-col p-6 rounded-2xl bg-slate-50/70 dark:bg-slate-900/40 border border-slate-200/70 dark:border-slate-800/60"
              >
                <div className="flex items-start justify-between">
                  <span
                    className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[#0A3A6B] dark:text-[#9ED0F9] flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <Icon size={16} strokeWidth={1.75} />
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.22em] font-semibold text-[#0A3A6B] dark:text-[#9ED0F9]">
                    {r.code}
                  </span>
                </div>
                <div className="mt-4 text-[14px] font-semibold tracking-tight text-slate-900 dark:text-white leading-snug">
                  {r.shape}
                </div>
                <dl className="mt-4 pt-4 border-t border-slate-200/70 dark:border-slate-800/60 space-y-2 font-mono text-[10px] tracking-[0.16em] uppercase">
                  <div>
                    <dt className="text-slate-400">Scale</dt>
                    <dd className="mt-0.5 text-slate-700 dark:text-slate-300 normal-case tracking-normal text-[12px] font-sans">
                      {r.scale}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-slate-400">Modules</dt>
                    <dd className="mt-0.5 text-[#0A3A6B] dark:text-[#9ED0F9] normal-case tracking-normal text-[12px] font-sans">
                      {r.modules}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-slate-400">Deployment mode</dt>
                    <dd className="mt-0.5 text-slate-700 dark:text-slate-300 normal-case tracking-normal text-[12px] font-sans">
                      {r.mode}
                    </dd>
                  </div>
                </dl>
                <ul className="mt-4 pt-4 border-t border-slate-200/70 dark:border-slate-800/60 space-y-2 flex-1">
                  {r.outcomes.map((o) => (
                    <li
                      key={o}
                      className="text-[12px] leading-relaxed text-slate-600 dark:text-slate-400 pl-3 relative"
                    >
                      <span
                        aria-hidden="true"
                        className="absolute left-0 top-2 w-1 h-1 rounded-full bg-[#0FB5A6]"
                      />
                      {o}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>

        <div className="mt-8 inline-flex items-center gap-2 px-3 py-2 rounded-md bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
          <Lock size={11} strokeWidth={1.75} aria-hidden="true" />
          <span>Confidential · reference shape · full details under NDA</span>
        </div>
      </div>
    </section>
  );
}
