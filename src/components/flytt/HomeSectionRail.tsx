'use client';

import React from 'react';

const SECTIONS = [
  { code: 'PL.01', label: 'Platform Ecosystem', anchor: '#pl-01' },
  { code: 'DP.02', label: 'Deployment Architecture', anchor: '#dp-02' },
  { code: 'IN.03', label: 'Institutional Sectors', anchor: '#in-03' },
  { code: 'TX.04', label: 'Stack Architecture', anchor: '#tx-04' },
  { code: 'PR.05', label: 'Procurement Guide', anchor: '#pr-05' },
  { code: 'CT.06', label: 'Deployment Engagement', anchor: '#ct-06' },
];

/**
 * Engineering section index — six-row mono rail listing every home
 * section by code. Renders as a horizontally-scrollable row on mobile
 * and a tidy six-column grid on desktop. Functions like the
 * "table of contents" rail Anduril / Palantir use just below the hero
 * to make the page feel navigable, not just scrollable.
 */
const HomeSectionRail: React.FC = () => {
  return (
    <nav
      aria-label="Home page section index"
      className="relative bg-white dark:bg-slate-950 border-y border-slate-100 dark:border-slate-900/60"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <ol className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 -mx-3">
          {SECTIONS.map((s) => (
            <li key={s.code}>
              <a
                href={s.anchor}
                className="group flex items-center gap-3 px-3 py-3 lg:py-4 border-r border-slate-100 dark:border-slate-900/60 last:border-r-0 hover:bg-slate-50/60 dark:hover:bg-slate-900/40 motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9]/40 focus-visible:ring-offset-[3px]"
              >
                <span className="font-mono text-[10px] tracking-[0.22em] font-semibold text-[#0A3A6B] dark:text-[#9ED0F9] flex-shrink-0">
                  {s.code}
                </span>
                <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-slate-500 dark:text-slate-500 group-hover:text-slate-900 dark:group-hover:text-slate-200 motion-safe:transition-colors truncate">
                  {s.label}
                </span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
};

export default HomeSectionRail;
