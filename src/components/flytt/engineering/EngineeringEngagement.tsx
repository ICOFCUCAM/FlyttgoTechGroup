'use client';

import React from 'react';
import Link from '@/components/flytt/LocaleLink';
import { ArrowRight, ArrowUpRight, Compass, FileCheck2, Rocket, type LucideIcon } from 'lucide-react';

/**
 * SE.04 — Engagement model. Three-step delivery sequence applied
 * uniformly across the six capability levels: discovery, scoping,
 * delivery. Closes with the primary intake CTA into
 * /contact?intent=engineering.
 */

type Step = {
  code: string;
  icon: LucideIcon;
  title: string;
  duration: string;
  body: string;
  artefact: string;
};

const STEPS: Step[] = [
  {
    code: 'SE.D1',
    icon: Compass,
    title: 'Capability scope',
    duration: '60 minutes · no obligation',
    body:
      "A working session between the recipient's lead and the engineering division. Walks the recipient's programme against the six-level ladder, names the tier, and tests the add-on mix against the regulatory frame.",
    artefact: 'Output: assigned tier · add-on shortlist · indicative envelope',
  },
  {
    code: 'SE.D2',
    icon: FileCheck2,
    title: 'Build scoping',
    duration: '1 – 3 weeks · NDA-bound',
    body:
      'Formal scoping engagement under NDA. Pins the feature list, integration anchors, deployment substrate, identity boundary and the build-sprint cadence. Output is a written build brief and a fixed-fee or tier-priced order form — both reviewable by the recipient procurement and legal.',
    artefact: 'Output: written build brief · order form · point pricing',
  },
  {
    code: 'SE.D3',
    icon: Rocket,
    title: 'Build & deployment',
    duration: 'Per level · 5 days – 18 months',
    body:
      'Sprint-cadenced build under the agreed delivery schedule. Levels 1–3 ship in days to weeks; levels 4–6 ship in months under steering cadence. Every engagement closes with a written hand-over, optional ongoing operations and a documented audit trail.',
    artefact: 'Output: live deployment · written hand-over · operations runbook',
  },
];

export default function EngineeringEngagement() {
  return (
    <section
      id="se-04"
      aria-labelledby="se-04-heading"
      className="relative bg-gradient-to-b from-[#F7FAFD] to-white dark:from-slate-900 dark:to-slate-950 py-28 lg:py-32 border-t border-slate-200/60 dark:border-slate-800/60 scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
          <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">SE.04</span>
          <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
          <span>Delivery model</span>
        </div>

        <div className="mt-8 grid lg:grid-cols-12 gap-10 lg:gap-12 items-end">
          <div className="lg:col-span-7">
            <h2
              id="se-04-heading"
              className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-slate-900 dark:text-white leading-[1.05]"
            >
              Three steps from scoping{' '}
              <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                to live deployment.
              </em>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-base text-slate-600 dark:text-slate-400 leading-[1.65]">
              The same delivery cadence applies across every capability
              level. What changes between Level 1 and Level 6 is the
              sprint count, the integration depth and the regulator
              footprint — not the engagement shape.
            </p>
          </div>
        </div>

        <ol className="mt-12 grid md:grid-cols-3 gap-4">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <li
                key={s.code}
                className="relative flex flex-col p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60"
              >
                <div className="flex items-start justify-between">
                  <span
                    className="w-10 h-10 rounded-xl bg-[#0A3A6B]/8 text-[#0A3A6B] dark:bg-[#9ED0F9]/12 dark:text-[#9ED0F9] flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <Icon size={16} strokeWidth={1.75} />
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.22em] font-semibold text-[#0A3A6B] dark:text-[#9ED0F9]">
                    {s.code}
                  </span>
                </div>
                <div className="mt-4 text-[15px] font-semibold tracking-tight text-slate-900 dark:text-white leading-snug">
                  {s.title}
                </div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">
                  {s.duration}
                </div>
                <p className="mt-4 text-sm text-slate-600 dark:text-slate-400 leading-relaxed flex-1">
                  {s.body}
                </p>
                <div className="mt-5 pt-4 border-t border-slate-200/70 dark:border-slate-800/60 font-mono text-[10px] uppercase tracking-[0.16em] text-[#0A3A6B] dark:text-[#9ED0F9]">
                  {s.artefact}
                </div>
                {i < STEPS.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="hidden md:block absolute top-1/2 -right-2 w-4 h-px bg-slate-300 dark:bg-slate-700"
                  />
                )}
              </li>
            );
          })}
        </ol>

        <div className="mt-12 flex flex-wrap items-center gap-4">
          <Link
            href="/contact?intent=engineering"
            className="group inline-flex items-center gap-2 px-7 py-3.5 bg-[#0A3A6B] text-white text-sm font-semibold tracking-tight rounded-lg hover:bg-[#0A3A6B]/90 motion-safe:transition-colors shadow-[0_1px_0_0_rgb(10_58_107/0.6),0_8px_24px_-12px_rgb(10_58_107/0.5)]"
          >
            Open scoping intake
            <ArrowRight
              size={16}
              className="motion-safe:transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
          <Link
            href="/government"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 text-slate-900 dark:text-white text-sm font-semibold rounded-lg hover:border-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900/80 motion-safe:transition-colors"
          >
            Public-sector surface · GV.00
            <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
          <Link
            href="/platforms"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 text-slate-900 dark:text-white text-sm font-semibold rounded-lg hover:border-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900/80 motion-safe:transition-colors"
          >
            Platform ecosystem · PL.00
            <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400">
            Engineering response within one business day
          </span>
        </div>

        <p className="mt-8 max-w-3xl font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400 leading-relaxed">
          Institutional Systems Engineering · platform@flyttgotech.com · audit log retains every authentication and engagement event
        </p>
      </div>
    </section>
  );
}
