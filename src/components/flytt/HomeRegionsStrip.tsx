import React from 'react';
import { Globe2 } from 'lucide-react';

/**
 * Deployment regions metadata strip — sits directly under the hero,
 * above the live-ops telemetry band. Compact infrastructure-status
 * styling: a row of mono uppercase region pills with a single
 * one-sentence positioning line above. Designed to read as a header
 * rail you'd see at the top of a regulator filing or an enterprise
 * status page, not a marketing badge.
 */

const REGION_PILLS = [
  { code: 'EU-N', label: 'Nordic EU', note: 'Oslo · primary HQ' },
  { code: 'EU-W', label: 'Western EU', note: 'Frankfurt · London' },
  { code: 'AF',   label: 'Africa',    note: 'Lagos · Yaoundé · Nairobi · Kampala · Addis · Johannesburg' },
  { code: 'MENA', label: 'MENA',      note: 'Dubai · Riyadh sovereign' },
  { code: 'NA',   label: 'NA SaaS',   note: 'San Francisco · Northern Virginia' },
  { code: 'APAC', label: 'APAC',      note: 'Singapore · Tokyo · Mumbai' },
];

export default function HomeRegionsStrip() {
  return (
    <section
      aria-labelledby="regions-strip-heading"
      className="relative bg-white dark:bg-slate-950 border-b border-slate-200/70 dark:border-slate-800/60"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500 mr-2">
            <Globe2 size={12} className="text-[#0A3A6B] dark:text-[#9ED0F9]" aria-hidden="true" />
            <span id="regions-strip-heading" className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">
              RG.00
            </span>
            <span className="text-slate-300 dark:text-slate-700">·</span>
            <span className="normal-case tracking-tight text-slate-700 dark:text-slate-300 text-[11px] font-normal">
              FlyttGo infrastructure operational across
            </span>
          </div>
          <ul className="flex flex-wrap items-center gap-1.5">
            {REGION_PILLS.map((r) => (
              <li
                key={r.code}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-slate-200/80 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60"
                title={r.note}
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] font-semibold text-[#0A3A6B] dark:text-[#9ED0F9]">
                  {r.code}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">
                  {r.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
