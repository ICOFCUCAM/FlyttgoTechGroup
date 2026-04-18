import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Info, Link2 } from 'lucide-react';
import { platformList } from '@/data/platforms';

const LEDGERA_TOOLTIP =
  'Ledgera integrates with Payvera for payment orchestration and supports compliance reporting across Transify, Workverge, Civitas and EduPro environments.';

const PlatformEcosystemOverview: React.FC = () => {
  return (
    <section
      id="platforms"
      aria-labelledby="platform-overview-heading"
      className="relative py-24 lg:py-28 bg-white dark:bg-slate-950"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 items-end motion-safe:animate-fade-up">
          <div className="lg:col-span-7">
            <p className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-slate-800/60 rounded-full text-[11px] font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-[0.18em]">
              <span className="w-1 h-1 rounded-full bg-[#1E6FD9]" aria-hidden="true" />
              Platform Ecosystem
            </p>
            <h2
              id="platform-overview-heading"
              className="mt-5 text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900 dark:text-white leading-[1.08]"
            >
              One infrastructure ecosystem.{' '}
              <span className="text-[#0A3A6B]">Modular deployment platforms.</span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              Governments, universities, transport operators and marketplace builders deploy
              FlyttGo platforms as modules.{' '}
              <Link href="/platforms" className="font-semibold text-[#0A3A6B] dark:text-[#9ED0F9] hover:underline underline-offset-4">
                See the full ecosystem
              </Link>
              .
            </p>
          </div>
        </div>

        <ul className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {platformList.map((p) => {
            const Icon = p.icon;
            const isMarketplace = p.category === 'marketplace';
            const isLedgera = p.slug === 'ledgera';
            return (
              <li key={p.slug}>
                <Link
                  href={`/platforms/${p.slug}`}
                  title={isLedgera ? LEDGERA_TOOLTIP : undefined}
                  className="group relative flex items-start gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9]/40 focus-visible:ring-offset-[3px] h-full"
                >
                  <span
                    className="mt-0.5 w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${p.color}14`, color: p.color }}
                    aria-hidden="true"
                  >
                    <Icon size={18} strokeWidth={1.75} />
                  </span>
                  <span className="flex flex-col min-w-0 flex-1">
                    <span className="flex items-center justify-between gap-2">
                      <span className="text-base font-semibold tracking-tight text-slate-900 dark:text-white">
                        {p.name}
                      </span>
                      <ArrowUpRight
                        size={14}
                        className="text-slate-300 group-hover:text-slate-700 dark:group-hover:text-white motion-safe:transition-all flex-shrink-0"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="mt-0.5 text-xs text-slate-500 dark:text-slate-500 leading-snug">
                      {p.subtitle}
                    </span>
                    {isMarketplace && (
                      <span className="mt-2 inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.14em] text-slate-500 font-semibold">
                        <Link2 size={10} aria-hidden="true" />
                        Runs on Transify
                      </span>
                    )}
                    {isLedgera && (
                      <span className="mt-2 inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.14em] text-slate-500 font-semibold">
                        <Link2 size={10} aria-hidden="true" />
                        Integrates with Payvera
                      </span>
                    )}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

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
