import React from 'react';
import Link from '@/components/flytt/LocaleLink';
import { ArrowRight, ArrowUpRight, FileText, Users, Briefcase, type LucideIcon } from 'lucide-react';

/**
 * GV.09 — Engagement intake.
 *
 * Three-step engagement model rendered as a stepper, then the
 * primary intake CTA into /contact?intent=government. Closes the
 * page with an institutional posture — engagement is a documented
 * sequence of artefacts, not a sales pipeline.
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
    code: 'EG.01',
    icon: Users,
    title: 'Capability deep-dive',
    duration: '60 minutes',
    body:
      "A working session between the recipient's technical lead and the FlyttGo platform team. Walks the capability brief against the recipient's stated programme, names the constraints, and tests the deployment posture against the recipient's regulatory frame.",
    artefact: 'Output: working notes · capability scoring',
  },
  {
    code: 'EG.02',
    icon: FileText,
    title: 'Pilot scoping',
    duration: '2–4 weeks · NDA-bound',
    body:
      'A formal scoping engagement under NDA. Defines the pilot scope, success criteria, sovereignty posture, integration anchors, and the commercial envelope. Output is a written pilot brief and a price-shape proposal — both reviewable by the recipient\'s procurement and legal offices.',
    artefact: 'Output: written pilot brief · price-shape proposal',
  },
  {
    code: 'EG.03',
    icon: Briefcase,
    title: 'Procurement engagement',
    duration: 'Per tier · 60 days – 18 months',
    body:
      'Moves to one of the five procurement tiers — pilot, city, regional, national, or white-label — with the corresponding contract instrument. The pilot proposal (PP.00) becomes the master scope reference; the contract instrument anchors data residency, key custody, audit rights and sovereignty posture.',
    artefact: 'Output: signed order form · contract instrument',
  },
];

export default function GovernmentEngagement() {
  return (
    <section
      id="gv-09"
      aria-labelledby="gv-09-heading"
      className="relative bg-gradient-to-b from-[#F7FAFD] to-white dark:from-slate-900 dark:to-slate-950 py-28 lg:py-32 border-t border-slate-200/60 dark:border-slate-800/60 scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
          <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">GV.09</span>
          <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
          <span>Engagement intake</span>
        </div>

        <div className="mt-8 grid lg:grid-cols-12 gap-10 lg:gap-12 items-end">
          <div className="lg:col-span-7">
            <h2
              id="gv-09-heading"
              className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-slate-900 dark:text-white leading-[1.05]"
            >
              Three steps from capability brief{' '}
              <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                to signed contract instrument.
              </em>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-base text-slate-600 dark:text-slate-400 leading-[1.65]">
              The engagement model is a documented sequence — each
              step has a named output and a defined duration. No
              step is skipped; no step is shortened to accommodate
              quarterly targets. Public-sector procurement runs on
              evidence, not on momentum.
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
            href="/contact?intent=government"
            className="group inline-flex items-center gap-2 px-7 py-3.5 bg-[#0A3A6B] text-white text-sm font-semibold tracking-tight rounded-lg hover:bg-[#0A3A6B]/90 motion-safe:transition-colors shadow-[0_1px_0_0_rgb(10_58_107/0.6),0_8px_24px_-12px_rgb(10_58_107/0.5)]"
          >
            Open public-sector engagement intake
            <ArrowRight
              size={16}
              className="motion-safe:transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
          <Link
            href="/procurement-compatibility"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 text-slate-900 dark:text-white text-sm font-semibold rounded-lg hover:border-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900/80 motion-safe:transition-colors"
          >
            Procurement compatibility surface
            <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400">
            Engineering response within one business day
          </span>
        </div>

        <p className="mt-8 max-w-3xl font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400 leading-relaxed">
          Public-sector engagement desk · platform@flyttgotech.com · audit
          log retains every authentication and engagement event
        </p>
      </div>
    </section>
  );
}
