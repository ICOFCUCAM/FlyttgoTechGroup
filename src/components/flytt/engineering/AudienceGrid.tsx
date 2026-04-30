'use client';

import React from 'react';
import {
  Store,
  Briefcase,
  GraduationCap,
  Bus,
  ShoppingBag,
  Building2,
  Landmark,
  Globe2,
  type LucideIcon,
} from 'lucide-react';

/**
 * SE.AU — Audience segmentation grid. Eight institutional buyer
 * profiles served by the engineering division, displayed below the
 * capability ladder so a visitor can find their own organisation
 * shape inside the addressable surface.
 */

type Audience = {
  code: string;
  icon: LucideIcon;
  label: string;
  context: string;
  match: string;
};

const AUDIENCES: Audience[] = [
  { code: 'AU.01', icon: Store,         label: 'Small businesses & consultants', context: 'Single-page presence · service pages · contact intake', match: 'L.01 · L.02' },
  { code: 'AU.02', icon: Briefcase,     label: 'SMEs & mid-market',              context: 'CMS-edited business sites · blog · lead capture',     match: 'L.02 · L.03' },
  { code: 'AU.03', icon: GraduationCap, label: 'Universities & schools',         context: 'Faculty portals · admissions · research microsites',  match: 'L.03 · L.04' },
  { code: 'AU.04', icon: Bus,           label: 'Transport authorities',          context: 'Public-information sites · operator portals · timetables', match: 'L.04 · L.05' },
  { code: 'AU.05', icon: ShoppingBag,   label: 'Marketplaces & operators',       context: 'Multi-sided platforms · provider directory · checkout', match: 'L.03 · L.04' },
  { code: 'AU.06', icon: Building2,     label: 'Enterprise operators',           context: 'Internal platforms · multi-department dashboards',     match: 'L.04' },
  { code: 'AU.07', icon: Landmark,      label: 'Ministries & municipalities',    context: 'Citizen portals · public-services · sovereign deployments', match: 'L.05' },
  { code: 'AU.08', icon: Globe2,        label: 'National & cross-border',        context: 'Platform ecosystems · multi-country · regulator-bounded',   match: 'L.05 · L.06' },
];

export default function AudienceGrid() {
  return (
    <section
      id="audience"
      aria-labelledby="se-au-heading"
      className="relative bg-white dark:bg-slate-950 py-24 lg:py-28 border-t border-slate-200/60 dark:border-slate-800/60 scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
          <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">SE.AU</span>
          <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
          <span>Audience segmentation · who the ladder serves</span>
        </div>

        <div className="mt-6 grid lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7">
            <h2
              id="se-au-heading"
              className="font-serif text-3xl md:text-4xl font-medium tracking-tight text-slate-900 dark:text-white leading-[1.05]"
            >
              Eight buyer profiles.{' '}
              <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                One ladder of capability.
              </em>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-base text-slate-600 dark:text-slate-400 leading-[1.65]">
              Each tile shows the ladder levels that profile most commonly
              starts at. Programmes typically advance one or two tiers as
              audience and scope grow.
            </p>
          </div>
        </div>

        {/* 2-column matrix on tablet + desktop, 1-column stack on mobile.
            grid-auto-rows: 1fr ensures every cell shares the same height
            so the matrix reads as a structured taxonomy surface, not a
            paragraph list with ragged wrapping. */}
        <ul
          className="mt-10 grid sm:grid-cols-2 gap-3"
          style={{ gridAutoRows: '1fr' }}
        >
          {AUDIENCES.map((a) => {
            const Icon = a.icon;
            return (
              <li
                key={a.code}
                className="flex items-stretch p-5 rounded-2xl bg-slate-50/70 dark:bg-slate-900/40 border border-slate-200/70 dark:border-slate-800/60 hover:border-slate-300 dark:hover:border-slate-700 motion-safe:transition-colors"
              >
                <div className="flex w-full items-start gap-4">
                  <span
                    className="w-11 h-11 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[#0A3A6B] dark:text-[#9ED0F9] flex items-center justify-center flex-shrink-0"
                    aria-hidden="true"
                  >
                    <Icon size={17} strokeWidth={1.75} />
                  </span>
                  <div className="flex-1 min-w-0 flex flex-col">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[10px] tracking-[0.22em] uppercase font-semibold text-[#0A3A6B] dark:text-[#9ED0F9]">
                        {a.code}
                      </span>
                      <span className="font-mono text-[9px] tracking-[0.18em] uppercase text-slate-400">
                        {a.match}
                      </span>
                    </div>
                    <div className="mt-1.5 text-[14px] font-semibold tracking-tight text-slate-900 dark:text-white leading-snug">
                      {a.label}
                    </div>
                    <div className="mt-1 text-[12px] text-slate-500 dark:text-slate-400 leading-snug flex-1">
                      {a.context}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
