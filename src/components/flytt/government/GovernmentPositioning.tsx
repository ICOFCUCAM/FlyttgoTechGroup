import React from 'react';
import {
  Landmark,
  Bus,
  GraduationCap,
  Building2,
  Compass,
  FileCheck2,
  type LucideIcon,
} from 'lucide-react';

/**
 * GV.01 — Programme positioning.
 *
 * Two-column institutional surface naming the public-sector
 * programme contexts FlyttGo serves. Left column carries the
 * positioning copy; right column lists the named buyer types so
 * a recipient knows immediately whether the page is for them.
 */

type Buyer = {
  code: string;
  icon: LucideIcon;
  label: string;
  context: string;
};

const BUYERS: Buyer[] = [
  {
    code: 'BR.01',
    icon: Landmark,
    label: 'Ministry of Digital Affairs',
    context: 'National digital-strategy programmes · cross-ministry data infrastructure',
  },
  {
    code: 'BR.02',
    icon: Bus,
    label: 'Ministry of Transport',
    context: 'Transport-data backbones · regional dispatch · statutory mobility reporting',
  },
  {
    code: 'BR.03',
    icon: GraduationCap,
    label: 'Ministry of Education',
    context: 'Admissions consolidation · scholarship orchestration · institutional analytics',
  },
  {
    code: 'BR.04',
    icon: Compass,
    label: 'Central Digitalisation Agency',
    context: 'National-eID rollouts · government-services portals · sovereign cloud programmes',
  },
  {
    code: 'BR.05',
    icon: Building2,
    label: 'Municipal Modernisation Programme',
    context: 'Citizen services unification · council operations · residents portals',
  },
  {
    code: 'BR.06',
    icon: FileCheck2,
    label: 'Public-Sector Procurement Office',
    context: 'Framework agreements · pilot procurement · multi-tier deployment commitments',
  },
];

export default function GovernmentPositioning() {
  return (
    <section
      id="gv-01"
      aria-labelledby="gv-01-heading"
      className="relative bg-white dark:bg-slate-950 py-24 lg:py-28 border-t border-slate-200/60 dark:border-slate-800/60 scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
          <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">GV.01</span>
          <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
          <span>Programme positioning</span>
        </div>

        <div className="mt-8 grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-7">
            <h2
              id="gv-01-heading"
              className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-slate-900 dark:text-white leading-[1.05]"
            >
              Public-sector platform infrastructure,{' '}
              <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                deployed under your jurisdiction.
              </em>
            </h2>
            <p className="mt-6 text-base md:text-lg text-slate-600 dark:text-slate-400 leading-[1.65] max-w-2xl">
              FlyttGo Technologies Group AB designs and operates modular
              cloud platform infrastructure deployed across European,
              African and Middle Eastern public-sector programmes. The
              capability surface this page describes is in production
              today; the deployment posture is the same one our regulator-
              bounded installations operate under.
            </p>
            <p className="mt-5 text-base md:text-lg text-slate-600 dark:text-slate-400 leading-[1.65] max-w-2xl">
              Eight independently licensed modules — identity, payments,
              mobility, workforce, education, government services,
              financial operations and a regulated marketplace — are
              orchestrated through the FlyttGoTech Core. Three deployment
              modes accommodate every sovereignty posture from managed
              SaaS in EU primary regions through to sovereign national
              datacenters under national HSM and national-eID integration.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-slate-500 mb-4">
              Recipients of this surface
            </div>
            <ul className="space-y-2.5">
              {BUYERS.map((b) => {
                const Icon = b.icon;
                return (
                  <li
                    key={b.code}
                    className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50/70 dark:bg-slate-900/40 border border-slate-200/70 dark:border-slate-800/60"
                  >
                    <span
                      className="w-9 h-9 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center flex-shrink-0"
                      aria-hidden="true"
                    >
                      <Icon size={14} strokeWidth={1.75} className="text-[#0A3A6B] dark:text-[#9ED0F9]" />
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[9px] tracking-[0.22em] uppercase font-semibold text-[#0A3A6B] dark:text-[#9ED0F9]">
                          {b.code}
                        </span>
                      </div>
                      <div className="mt-0.5 text-[13px] font-semibold tracking-tight text-slate-900 dark:text-white">
                        {b.label}
                      </div>
                      <div className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                        {b.context}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
