'use client';

import React, { useState } from 'react';
import Link from '@/components/flytt/LocaleLink';
import Image from 'next/image';
import { ArrowUpRight, CheckCircle2, ArrowRight, Link2 } from 'lucide-react';
import { platformList } from '@/data/platforms';

const accentTint: Record<string, string> = {
  transify: 'bg-blue-50 dark:bg-blue-950/20',
  workverge: 'bg-teal-50 dark:bg-teal-950/20',
  civitas: 'bg-violet-50 dark:bg-violet-950/20',
  edupro: 'bg-emerald-50 dark:bg-emerald-950/20',
  identra: 'bg-indigo-50 dark:bg-indigo-950/20',
  payvera: 'bg-amber-50 dark:bg-amber-950/20',
  flyttgo: 'bg-orange-50 dark:bg-orange-950/20',
};

const PlatformEcosystem: React.FC = () => {
  const [active, setActive] = useState(platformList[0].slug);
  const current = platformList.find((p) => p.slug === active) ?? platformList[0];
  const CurrentIcon = current.icon;

  return (
    <section id="platforms" className="relative py-24 lg:py-32 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-slate-800/60 rounded-full text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            <span className="w-1 h-1 rounded-full bg-[#1E6FD9]" aria-hidden="true" />
            Platform Ecosystem
          </p>
          <h2 className="mt-5 text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900 dark:text-white leading-tight">
            A Modular Platform Ecosystem for Governments, Institutions and Operators
          </h2>
          <p className="mt-5 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Six infrastructure platforms — mobility, workforce, government, education, identity and
            payments — plus one marketplace platform (FlyttGo) that runs on top of Transify.
          </p>
        </div>

        {/* Platform cards grid */}
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {platformList.map((p) => {
            const Icon = p.icon;
            const isActive = active === p.slug;
            const isMarketplace = p.category === 'marketplace';
            return (
              <button
                key={p.slug}
                onClick={() => setActive(p.slug)}
                className={`group text-left p-7 rounded-2xl border transition-all duration-300 ${
                  isActive
                    ? 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 shadow-xl shadow-slate-900/5 -translate-y-1'
                    : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800/60 hover:border-slate-300 hover:shadow-lg hover:-translate-y-0.5'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div
                    className={`w-12 h-12 rounded-xl ${accentTint[p.slug] ?? 'bg-slate-100'} flex items-center justify-center`}
                    style={{ color: p.color }}
                    aria-hidden="true"
                  >
                    <Icon size={22} strokeWidth={1.75} />
                  </div>
                  <ArrowUpRight
                    size={18}
                    className="text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors"
                    aria-hidden="true"
                  />
                </div>
                <div className="mt-5">
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    {isMarketplace ? 'Marketplace Platform' : 'Infrastructure Platform'}
                  </div>
                  <h3 className="mt-1 text-xl font-semibold text-slate-900 dark:text-white tracking-tight">{p.name}</h3>
                  <p className="text-sm text-slate-500 mt-0.5">{p.subtitle}</p>
                </div>
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                  {p.description}
                </p>

                <div className="mt-5 pt-5 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-1.5">
                  {p.capabilities.slice(0, 2).map((c) => (
                    <span
                      key={c}
                      className="text-[11px] font-medium px-2 py-1 bg-slate-50 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 rounded-md"
                    >
                      {c}
                    </span>
                  ))}
                  {p.capabilities.length > 2 && (
                    <span className="text-[11px] font-medium px-2 py-1 bg-slate-50 dark:bg-slate-900/60 text-slate-500 rounded-md">
                      +{p.capabilities.length - 2} more
                    </span>
                  )}
                </div>

                {p.dependsOn && (
                  <p className="mt-4 inline-flex items-center gap-1.5 text-[11px] text-slate-500">
                    <Link2 size={11} aria-hidden="true" />
                    Runs on Transify infrastructure
                  </p>
                )}

                <Link
                  href={`/platforms/${p.slug}`}
                  onClick={(e) => e.stopPropagation()}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold group-hover:gap-2.5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9] focus-visible:ring-offset-2 rounded-sm"
                  style={{ color: p.color }}
                >
                  Explore {p.name}
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </button>
            );
          })}
        </div>

        {/* Active platform deep-view */}
        <div className="mt-10 rounded-3xl border border-slate-200/80 dark:border-slate-800/60 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 p-8 lg:p-12">
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-5">
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold"
                style={{ backgroundColor: `${current.color}10`, color: current.color }}
              >
                <CurrentIcon size={14} />
                {current.subtitle}
              </div>
              <h3 className="mt-4 text-3xl font-semibold text-slate-900 dark:text-white tracking-tight">
                {current.name}
              </h3>
              <p className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">{current.description}</p>

              <div className="mt-6 space-y-2.5">
                {current.capabilities.map((c) => (
                  <div key={c} className="flex items-center gap-2.5 text-sm text-slate-700 dark:text-slate-300">
                    <CheckCircle2 size={16} style={{ color: current.color }} />
                    {c}
                  </div>
                ))}
              </div>

              <Link
                href={`/platforms/${current.slug}`}
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white hover:gap-3 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9] focus-visible:ring-offset-2 rounded-sm"
              >
                View {current.name} platform page
                <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-800/60 shadow-xl shadow-slate-900/5 bg-white dark:bg-slate-900">
                <div className="flex items-center gap-1.5 px-4 py-3 border-b border-slate-200/80 dark:border-slate-800/60 bg-slate-50 dark:bg-slate-900/60">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <div className="ml-3 text-xs text-slate-500 font-mono">
                    {current.slug}.flyttgo.platform / dashboard
                  </div>
                </div>
                <div className="relative aspect-[16/10] w-full bg-slate-100">
                  <Image
                    src={current.dashboardImage}
                    alt={`${current.name} dashboard preview`}
                    fill
                    sizes="(min-width: 1024px) 55vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatformEcosystem;
