'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from '@/components/flytt/LocaleLink';

/**
 * SE.NAV — Engineering division sub-nav. Renders consistently across
 * every engineering surface so the seven pages read as a single
 * structured division micro-site rather than disconnected pages.
 *
 * Active page is highlighted using the current pathname; section
 * codes (SE.02, SE.03, SE.04, PR.00, etc.) are surfaced inline so
 * the taxonomy remains visible at all times.
 */

type Surface = {
  href: string;
  code: string;
  label: string;
};

const SURFACES: Surface[] = [
  { href: '/engineering',              code: 'SE.00', label: 'Overview' },
  { href: '/engineering/ladder',       code: 'SE.02', label: 'Capability ladder' },
  { href: '/engineering/modules',      code: 'SE.03', label: 'Modular add-ons' },
  { href: '/engineering/delivery',     code: 'SE.04', label: 'Delivery model' },
  { href: '/engineering/configurator', code: 'PR.00', label: 'Cost configurator' },
  { href: '/engineering/proposal',     code: 'SE.PG', label: 'Proposal generator' },
  { href: '/engineering/scoping',      code: 'SE.FN', label: 'Scoping intake' },
];

export default function EngineeringSubNav() {
  const pathname = usePathname() ?? '';
  // Strip the locale prefix (e.g. /no/engineering/ladder) so matching
  // works the same regardless of locale.
  const normalized = pathname.replace(/^\/[a-z]{2}(?=\/|$)/i, '');

  return (
    <nav
      aria-label="Engineering division surfaces"
      className="bg-white dark:bg-slate-950 border-b border-slate-200/70 dark:border-slate-800/60 sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-white/85 supports-[backdrop-filter]:dark:bg-slate-950/85"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <ol className="flex items-stretch gap-1 overflow-x-auto py-2">
          {SURFACES.map((s) => {
            const active =
              s.href === '/engineering'
                ? normalized === '/engineering'
                : normalized === s.href || normalized.startsWith(`${s.href}/`);
            return (
              <li key={s.href} className="flex-shrink-0">
                <Link
                  href={s.href}
                  aria-current={active ? 'page' : undefined}
                  className={`group flex items-center gap-2 px-3 py-2 rounded-md font-mono text-[10px] tracking-[0.18em] uppercase motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9]/40 focus-visible:ring-offset-[3px] ${
                    active
                      ? 'bg-[#0A3A6B]/8 dark:bg-[#9ED0F9]/12 text-[#0A3A6B] dark:text-[#9ED0F9]'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/60 dark:hover:bg-slate-900/60'
                  }`}
                >
                  <span
                    className={`font-semibold ${
                      active ? 'text-[#0A3A6B] dark:text-[#9ED0F9]' : 'text-slate-400'
                    }`}
                  >
                    {s.code}
                  </span>
                  <span
                    aria-hidden="true"
                    className={active ? 'text-slate-300 dark:text-slate-700' : 'text-slate-200 dark:text-slate-800'}
                  >
                    ·
                  </span>
                  <span className="normal-case tracking-tight font-sans text-[12px]">
                    {s.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
