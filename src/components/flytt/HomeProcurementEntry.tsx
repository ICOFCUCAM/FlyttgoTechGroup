import React from 'react';
import Link from '@/components/flytt/LocaleLink';
import { ArrowUpRight, FileCheck2, Building2, Globe2, Map, Layers3 } from 'lucide-react';

/**
 * Procurement compatibility entry surface — the home-page lead-in to
 * /procurement-compatibility. Five compatibility tiers presented as a
 * scale ladder so a procurement officer can place their RFI into the
 * right tier immediately. Editorial / institutional tone, not
 * marketing.
 */

const TIERS = [
  {
    code: 'PR.01',
    icon: Layers3,
    title: 'Pilot deployments',
    body: 'Single-city, single-agency or single-operator pilots. Fixed scope, signed SOW, success metrics agreed before code ships.',
    cadence: '60–90 days',
  },
  {
    code: 'PR.02',
    icon: Building2,
    title: 'City rollouts',
    body: 'Production deployment across one urban jurisdiction. Identity-federation, payments orchestration and audit trail wired into the city\'s existing systems.',
    cadence: '90–150 days',
  },
  {
    code: 'PR.03',
    icon: Map,
    title: 'Regional deployments',
    body: 'Multi-city or county-scale. Shared identity backbone, region-aware data residency, and coordinated rollout cadence with regulatory checkpoints.',
    cadence: '4–9 months',
  },
  {
    code: 'PR.04',
    icon: Globe2,
    title: 'National infrastructure programmes',
    body: 'Country-scale digital infrastructure programmes. Sovereign deployment, ministry-level governance, statutory export readiness.',
    cadence: '6–18 months',
  },
  {
    code: 'PR.05',
    icon: FileCheck2,
    title: 'White-label platform licensing',
    body: 'Re-brand, re-deploy under your jurisdiction or operator brand. Source escrow, shared-runbook handover, separate compliance attestation chain.',
    cadence: 'Per agreement',
  },
];

export default function HomeProcurementEntry() {
  return (
    <section
      aria-labelledby="procurement-entry-heading"
      className="relative bg-gradient-to-b from-white to-[#F7FAFD] dark:from-slate-950 dark:to-slate-900 py-20 lg:py-24 border-t border-slate-200/60 dark:border-slate-800/60"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
          <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">PR.00</span>
          <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
          <span>Procurement compatibility</span>
        </div>

        <div className="mt-6 grid lg:grid-cols-12 gap-8 items-end">
          <h2
            id="procurement-entry-heading"
            className="lg:col-span-7 font-serif text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-slate-900 dark:text-white leading-[1.05]"
          >
            From pilot{' '}
            <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
              to national infrastructure.
            </em>
          </h2>
          <p className="lg:col-span-5 text-base text-slate-600 dark:text-slate-400 leading-[1.65]">
            FlyttGo deploys at five procurement tiers — pick the tier that
            matches your programme. Frameworks, scope, cadence and
            statutory artefacts are pre-shaped per tier; engineering
            response within one business day.
          </p>
        </div>

        <ol className="mt-12 grid md:grid-cols-2 lg:grid-cols-5 gap-3">
          {TIERS.map((t, i, arr) => {
            const Icon = t.icon;
            return (
              <li
                key={t.code}
                className="relative flex flex-col p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 motion-safe:transition-colors hover:border-slate-300 dark:hover:border-slate-700"
              >
                <div className="flex items-start justify-between gap-2">
                  <span
                    className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800/60 text-[#0A3A6B] dark:text-[#9ED0F9] flex items-center justify-center flex-shrink-0"
                    aria-hidden="true"
                  >
                    <Icon size={18} strokeWidth={1.75} />
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] font-semibold text-[#0A3A6B] dark:text-[#9ED0F9]">
                    {t.code}
                  </span>
                </div>
                <h3 className="mt-3 text-[14px] font-semibold tracking-tight text-slate-900 dark:text-white leading-snug">
                  {t.title}
                </h3>
                <p className="mt-1 text-[12px] text-slate-600 dark:text-slate-400 leading-snug flex-1">
                  {t.body}
                </p>
                <div className="mt-4 pt-3 border-t border-slate-200/70 dark:border-slate-800/60 font-mono text-[10px] uppercase tracking-[0.16em]">
                  <span className="text-slate-400">Cadence</span>
                  <span className="mx-2 text-slate-300 dark:text-slate-700">·</span>
                  <span className="text-slate-700 dark:text-slate-300 normal-case tracking-tight">
                    {t.cadence}
                  </span>
                </div>
                {i < arr.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="hidden lg:block absolute top-1/2 -right-2 w-4 h-px bg-slate-300 dark:bg-slate-700"
                  />
                )}
              </li>
            );
          })}
        </ol>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            href="/procurement-compatibility"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-[#0A3A6B] text-white text-sm font-semibold hover:bg-[#0A3A6B]/90 motion-safe:transition-colors"
          >
            See full procurement matrix
            <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 motion-safe:transition-colors"
          >
            Schedule infrastructure architecture discussion
            <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400">
            Engineering response within one business day
          </span>
        </div>
      </div>
    </section>
  );
}
