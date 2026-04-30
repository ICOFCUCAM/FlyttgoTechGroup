'use client';

import React from 'react';
import {
  Briefcase,
  Building2,
  GraduationCap,
  Bus,
  Landmark,
  ShoppingBag,
  Globe2,
  Store,
  type LucideIcon,
} from 'lucide-react';

/**
 * SE.01 — Division positioning. Names the audience the Institutional
 * Systems Engineering division serves, end to end: from
 * single-page digital presence to national platform ecosystems.
 */

type Audience = {
  code: string;
  icon: LucideIcon;
  label: string;
  context: string;
};

const AUDIENCES: Audience[] = [
  { code: 'AU.01', icon: Store,         label: 'Small businesses & consultants', context: 'Single-page presence · service pages · contact intake' },
  { code: 'AU.02', icon: Briefcase,     label: 'SMEs & mid-market',              context: 'CMS-edited business sites · blog · lead capture' },
  { code: 'AU.03', icon: GraduationCap, label: 'Universities & schools',         context: 'Faculty portals · admissions surfaces · research microsites' },
  { code: 'AU.04', icon: Bus,           label: 'Transport authorities',          context: 'Public-information sites · operator portals · timetable surfaces' },
  { code: 'AU.05', icon: ShoppingBag,   label: 'Marketplaces & operators',       context: 'Multi-sided platforms · provider directories · checkout surfaces' },
  { code: 'AU.06', icon: Building2,     label: 'Enterprise operators',           context: 'Internal platforms · multi-department dashboards · workflow systems' },
  { code: 'AU.07', icon: Landmark,      label: 'Ministries & municipalities',    context: 'Citizen portals · public-services surfaces · sovereign deployments' },
  { code: 'AU.08', icon: Globe2,        label: 'National & cross-border programmes', context: 'Platform ecosystems · multi-country deployments · regulator-bounded operations' },
];

export default function EngineeringPositioning() {
  return (
    <section
      id="se-01"
      aria-labelledby="se-01-heading"
      className="relative bg-white dark:bg-slate-950 py-24 lg:py-28 border-t border-slate-200/60 dark:border-slate-800/60 scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
          <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">SE.01</span>
          <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
          <span>Division positioning</span>
        </div>

        <div className="mt-8 grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-7">
            <h2
              id="se-01-heading"
              className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-slate-900 dark:text-white leading-[1.05]"
            >
              From digital presence to national platform infrastructure,{' '}
              <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                engineered on the same substrate.
              </em>
            </h2>
            <p className="mt-6 text-base md:text-lg text-slate-600 dark:text-slate-400 leading-[1.65] max-w-2xl">
              FlyttGo Institutional Systems Engineering builds websites,
              applications and platform ecosystems across six capability
              levels. The division began as the engineering team that
              shipped FlyttGo&apos;s own platform ecosystem — Level 6, in this
              taxonomy — and now applies the same engineering rigour to
              every level beneath it.
            </p>
            <p className="mt-5 text-base md:text-lg text-slate-600 dark:text-slate-400 leading-[1.65] max-w-2xl">
              Every engagement runs on the same FlyttGoTech Core, the same
              compliance posture, the same audit log. A Level 1 small-
              business website inherits the engineering discipline that
              ships sovereign-deployed national infrastructure; a Level 6
              programme inherits the speed and clarity that ship a digital
              presence in two weeks.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-slate-500 mb-4">
              Audience taxonomy
            </div>
            <ul className="grid sm:grid-cols-2 gap-2">
              {AUDIENCES.map((a) => {
                const Icon = a.icon;
                return (
                  <li
                    key={a.code}
                    className="flex items-start gap-3 p-3 rounded-xl bg-slate-50/70 dark:bg-slate-900/40 border border-slate-200/70 dark:border-slate-800/60"
                  >
                    <span
                      className="w-8 h-8 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center flex-shrink-0"
                      aria-hidden="true"
                    >
                      <Icon size={13} strokeWidth={1.75} className="text-[#0A3A6B] dark:text-[#9ED0F9]" />
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="font-mono text-[9px] tracking-[0.22em] uppercase font-semibold text-[#0A3A6B] dark:text-[#9ED0F9]">
                        {a.code}
                      </div>
                      <div className="mt-0.5 text-[12px] font-semibold tracking-tight text-slate-900 dark:text-white">
                        {a.label}
                      </div>
                      <div className="mt-0.5 text-[10px] text-slate-500 dark:text-slate-400 leading-snug">
                        {a.context}
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
