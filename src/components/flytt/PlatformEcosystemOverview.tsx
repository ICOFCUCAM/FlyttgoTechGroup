'use client';

import React from 'react';
import Link from '@/components/flytt/LocaleLink';
import { ArrowUpRight, Info, Link2 } from 'lucide-react';
import { platformList } from '@/data/platforms';
import { useI18n } from '@/lib/i18n/I18nProvider';
import SectionIndex from '@/components/flytt/SectionIndex';
import OrchestrationFlow from '@/components/flytt/diagrams/OrchestrationFlow';

const LEDGERA_TOOLTIP =
  'Ledgera integrates with Payvera for payment orchestration and supports compliance reporting across Transify, Workverge, Civitas and EduPro environments.';

// Per-platform deployment readiness signal — drives the platform card
// metadata rail. Mapped here rather than in src/data/platforms.ts so
// it stays orthogonal to product copy.
const READINESS: Record<string, { stage: string; sectors: string }> = {
  transify: { stage: 'GA', sectors: 'Transport · Enterprise · Marketplaces' },
  workverge: { stage: 'GA', sectors: 'Workforce · Public · Enterprise' },
  civitas: { stage: 'GA', sectors: 'Government · Municipal' },
  edupro: { stage: 'GA', sectors: 'Education · Ministries' },
  identra: { stage: 'GA', sectors: 'Identity · Cross-platform' },
  payvera: { stage: 'GA', sectors: 'Payments · Cross-platform' },
  ledgera: { stage: 'GA', sectors: 'Finance · Cross-platform' },
  flyttgo: { stage: 'GA', sectors: 'Marketplace · Mobility' },
};

const PlatformEcosystemOverview: React.FC = () => {
  const { t } = useI18n();
  return (
    <section
      id="pl-01"
      aria-labelledby="platform-overview-heading"
      className="relative py-24 lg:py-28 bg-white dark:bg-slate-950 scroll-mt-24"
    >
      {/* Legacy anchor target — keeps existing /#platforms links working */}
      <div id="platforms" aria-hidden="true" className="absolute -top-24" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionIndex
          code="PL.01"
          title="Platform Ecosystem Architecture"
          meta="8 platforms · 7 infrastructure modules + 1 marketplace"
          className="max-w-2xl motion-safe:animate-fade-up"
        />

        <div className="mt-8 grid lg:grid-cols-12 gap-8 items-end motion-safe:animate-fade-up">
          <div className="lg:col-span-7">
            <h2
              id="platform-overview-heading"
              className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-slate-900 dark:text-white leading-[1.05]"
            >
              {t('home.platform.title.part1')}{' '}
              <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                {t('home.platform.title.part2')}
              </em>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-base text-slate-600 dark:text-slate-400 leading-[1.65]">
              {t('home.platform.description')}{' '}
              <Link href="/platforms" className="font-semibold text-[#0A3A6B] dark:text-[#9ED0F9] hover:underline underline-offset-4">
                {t('home.platform.cta')}
              </Link>
              .
            </p>
          </div>
        </div>

        <ul className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {platformList.map((p, i) => {
            const Icon = p.icon;
            const isMarketplace = p.category === 'marketplace';
            const isLedgera = p.slug === 'ledgera';
            const readiness = READINESS[p.slug];
            const code = `PL.${String(i + 1).padStart(2, '0')}`;
            return (
              <li key={p.slug}>
                <Link
                  href={`/platforms/${p.slug}`}
                  title={isLedgera ? LEDGERA_TOOLTIP : undefined}
                  /* View Transitions API — the card morphs into the matching
                     element on /platforms/{slug} (PlatformView hero). Name
                     must be unique per page, so only the linked module card
                     carries it here. Browsers without support ignore the
                     style with no fallback needed. */
                  style={{ viewTransitionName: `platform-card-${p.slug}` }}
                  className="group relative flex flex-col gap-3 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9]/40 focus-visible:ring-offset-[3px] h-full"
                >
                  {/* Top row — icon + module code */}
                  <div className="flex items-start justify-between">
                    <span
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${p.color}14`, color: p.color }}
                      aria-hidden="true"
                    >
                      <Icon size={18} strokeWidth={1.75} />
                    </span>
                    <span
                      className="font-mono text-[10px] tracking-[0.22em] font-semibold"
                      style={{ color: p.color }}
                    >
                      {code}
                    </span>
                  </div>

                  {/* Identity block */}
                  <div className="flex flex-col flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-base font-semibold tracking-tight text-slate-900 dark:text-white">
                        {p.name}
                      </span>
                      <ArrowUpRight
                        size={14}
                        className="text-slate-300 group-hover:text-slate-700 dark:group-hover:text-white motion-safe:transition-all flex-shrink-0"
                        aria-hidden="true"
                      />
                    </div>
                    <span className="mt-0.5 text-xs text-slate-500 dark:text-slate-500 leading-snug">
                      {p.subtitle}
                    </span>
                  </div>

                  {/* Integration connectors */}
                  {(isMarketplace || isLedgera) && (
                    <div className="text-[10px] uppercase tracking-[0.14em] text-slate-500 font-semibold inline-flex items-center gap-1 font-mono">
                      <Link2 size={10} aria-hidden="true" />
                      {isMarketplace ? 'Runs on Transify' : 'Integrates with Payvera'}
                    </div>
                  )}

                  {/* Readiness rail — mono metadata at bottom */}
                  {readiness && (
                    <dl className="mt-auto pt-3 border-t border-slate-200/70 dark:border-slate-800/60 grid grid-cols-2 gap-1.5 font-mono text-[9px] tracking-[0.18em] uppercase">
                      <div>
                        <dt className="text-slate-400">Status</dt>
                        <dd className="mt-0.5 text-emerald-600 dark:text-emerald-400 font-semibold">
                          {readiness.stage}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-slate-400">Sector</dt>
                        <dd
                          className="mt-0.5 truncate"
                          style={{ color: p.color }}
                          title={readiness.sectors}
                        >
                          {readiness.sectors.split(' · ')[0]}
                        </dd>
                      </div>
                    </dl>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Orchestration flow — left-to-right module pipeline */}
        <div className="mt-10 p-4 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between gap-4 mb-3">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500">
              <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">OF.00</span>
              <span className="mx-2">·</span>Module orchestration flow
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400 hidden sm:inline">
              Identity → Payments → Mobility → Workforce → Finance
            </span>
          </div>
          <OrchestrationFlow className="overflow-x-auto" />
        </div>

        {/* Ecosystem description — mirrors the platform hierarchy including Ledgera */}
        <div className="mt-10 grid lg:grid-cols-12 gap-6 items-start">
          <p className="lg:col-span-10 text-base lg:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-4xl">
            FlyttGo Technologies Group platforms operate together as a modular infrastructure
            ecosystem supporting{' '}
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              mobility coordination, workforce deployment, education intelligence, identity
              verification, payment orchestration and financial operations automation
            </span>{' '}
            across cities, enterprises and government environments.
          </p>
          <p className="lg:col-span-2 text-xs text-slate-500 dark:text-slate-500 inline-flex items-start gap-2 leading-snug">
            <Info size={14} className="flex-shrink-0 mt-0.5 text-[#1E6FD9]" aria-hidden="true" />
            <span>
              Ledgera integrates with Payvera and reports across Transify, Workverge, Civitas and EduPro.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default PlatformEcosystemOverview;
