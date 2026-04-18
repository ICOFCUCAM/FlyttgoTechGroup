import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, CheckCircle2, Link2 } from 'lucide-react';
import { platformList } from '@/data/platforms';

const accentTint: Record<string, string> = {
  transify: 'from-blue-50 to-white',
  workverge: 'from-teal-50 to-white',
  civitas: 'from-violet-50 to-white',
  edupro: 'from-emerald-50 to-white',
  identra: 'from-indigo-50 to-white',
  payvera: 'from-amber-50 to-white',
  flyttgo: 'from-orange-50 to-white',
};

const PlatformEcosystemOverview: React.FC = () => {
  return (
    <section
      id="platforms"
      aria-labelledby="platform-overview-heading"
      className="relative py-28 lg:py-36 bg-white dark:bg-slate-950"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-4xl motion-safe:animate-fade-up">
          <p className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-slate-800/60 rounded-full text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            <span className="w-1 h-1 rounded-full bg-[#1E6FD9]" aria-hidden="true" />
            Platform Ecosystem
          </p>
          <h2
            id="platform-overview-heading"
            className="mt-6 text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-slate-900 dark:text-white leading-[1.05]"
          >
            One Infrastructure Ecosystem.{' '}
            <span className="text-[#0A3A6B]">Seven Deployment Platforms.</span>
          </h2>
          <p className="mt-6 text-lg lg:text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
            FlyttGo Technologies Group builds modular deployment platforms used by governments,
            municipalities, universities, transport operators and enterprise workforce programmes —
            plus a single marketplace platform that runs on top of the stack.
          </p>
        </div>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {platformList.map((p) => {
            const Icon = p.icon;
            const tint = accentTint[p.slug] ?? 'from-slate-50 to-white';
            const isMarketplace = p.category === 'marketplace';
            return (
              <Link
                key={p.slug}
                href={`/platforms/${p.slug}`}
                className="group relative block p-7 lg:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 shadow-sm hover:shadow-xl hover:shadow-slate-900/5 hover:-translate-y-1 motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9]/40 focus-visible:ring-offset-[3px]"
                aria-label={`${p.name}: ${p.subtitle}`}
              >
                <div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${tint} opacity-0 group-hover:opacity-100 motion-safe:transition-opacity pointer-events-none`}
                  aria-hidden="true"
                />
                <div className="relative flex flex-col h-full">
                  <div className="flex items-start justify-between">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center motion-safe:transition-transform group-hover:-rotate-3"
                      style={{ backgroundColor: `${p.color}14`, color: p.color }}
                      aria-hidden="true"
                    >
                      <Icon size={22} strokeWidth={1.75} />
                    </div>
                    <ArrowUpRight
                      size={18}
                      className="text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white motion-safe:transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </div>

                  <div className="mt-7">
                    <p
                      className="text-[11px] uppercase tracking-[0.18em] font-semibold"
                      style={{ color: p.color }}
                    >
                      {isMarketplace ? 'Marketplace Platform' : 'Infrastructure Platform'}
                    </p>
                    <h3 className="mt-2 text-xl lg:text-2xl font-semibold tracking-tight text-slate-900 dark:text-white leading-tight">
                      {p.name}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-slate-500 tracking-tight">
                      {p.subtitle}
                    </p>
                  </div>

                  <p className="mt-4 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {p.description}
                  </p>

                  <ul className="mt-5 flex flex-wrap gap-2">
                    {p.capabilities.slice(0, 3).map((c) => (
                      <li
                        key={c}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/60 rounded-md text-[11px] font-medium text-slate-700 dark:text-slate-300"
                      >
                        <CheckCircle2 size={11} style={{ color: p.color }} aria-hidden="true" />
                        {c}
                      </li>
                    ))}
                  </ul>

                  {p.dependsOn && (
                    <p className="mt-4 inline-flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-500">
                      <Link2 size={11} aria-hidden="true" />
                      Runs on <span className="font-semibold text-slate-700 dark:text-slate-300">Transify</span>{' '}
                      mobility infrastructure.
                    </p>
                  )}

                  <div
                    className="mt-auto pt-6 inline-flex items-center gap-2 text-sm font-semibold motion-safe:transition-all group-hover:gap-3"
                    style={{ color: p.color }}
                  >
                    Explore {p.name}
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <p className="mt-12 max-w-4xl text-sm lg:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          <strong className="text-slate-900 dark:text-white font-semibold">Platform relationship.</strong>{' '}
          FlyttGo marketplace services operate on top of the{' '}
          <Link href="/platforms/transify" className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold underline-offset-4 hover:underline">
            Transify
          </Link>{' '}
          mobility infrastructure platform and demonstrate how FlyttGo Technologies Group deployment
          platforms support real-world logistics coordination environments.
        </p>
      </div>
    </section>
  );
};

export default PlatformEcosystemOverview;
