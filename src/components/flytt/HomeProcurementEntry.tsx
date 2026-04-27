import React from 'react';
import Link from '@/components/flytt/LocaleLink';
import { ArrowUpRight, FileCheck2, Building2, Globe2, Map, Layers3 } from 'lucide-react';

/**
 * Procurement compatibility entry surface — home-page tier-ladder
 * teaser. Compact rendering: code + title + cadence only. Full per-tier
 * descriptions and the four-framework matrix live on
 * /procurement-compatibility (PC.00) — keeping them off the home avoids
 * duplicate content between the two surfaces (Section A · Phase 17).
 */

const TIERS = [
  { code: 'PR.01', icon: Layers3,    title: 'Pilot deployments',                cadence: '60–90 days' },
  { code: 'PR.02', icon: Building2,  title: 'City rollouts',                    cadence: '90–150 days' },
  { code: 'PR.03', icon: Map,        title: 'Regional deployments',             cadence: '4–9 months' },
  { code: 'PR.04', icon: Globe2,     title: 'National infrastructure programmes', cadence: '6–18 months' },
  { code: 'PR.05', icon: FileCheck2, title: 'White-label platform licensing',   cadence: 'Per agreement' },
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
            className="scroll-reveal-tighten lg:col-span-7 font-serif text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-slate-900 dark:text-white leading-[1.05]"
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
                className="relative flex items-start gap-3 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60"
              >
                <span
                  className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800/60 text-[#0A3A6B] dark:text-[#9ED0F9] flex items-center justify-center flex-shrink-0"
                  aria-hidden="true"
                >
                  <Icon size={18} strokeWidth={1.75} />
                </span>
                <div className="flex-1 min-w-0">
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] font-semibold text-[#0A3A6B] dark:text-[#9ED0F9]">
                    {t.code}
                  </div>
                  <div className="mt-1 text-[13px] font-semibold tracking-tight text-slate-900 dark:text-white leading-snug">
                    {t.title}
                  </div>
                  <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">
                    {t.cadence}
                  </div>
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
