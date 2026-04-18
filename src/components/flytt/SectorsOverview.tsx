import React from 'react';
import Link from '@/components/flytt/LocaleLink';
import { ArrowUpRight } from 'lucide-react';
import { industrySectors } from '@/data/industries';
import { localizeIndustry } from '@/data/industries.i18n';
import { serverLocale } from '@/lib/i18n/server';

const SectorsOverview: React.FC = () => {
  const locale = serverLocale();
  const sectors = industrySectors.map((s) => localizeIndustry(s, locale));

  return (
    <section
      aria-labelledby="sectors-overview-heading"
      className="relative py-20 lg:py-24 bg-white dark:bg-slate-950"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7">
            <p className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-slate-800/60 rounded-full text-[11px] font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-[0.18em]">
              Sector deployments
            </p>
            <h2
              id="sectors-overview-heading"
              className="mt-5 text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900 dark:text-white leading-[1.08]"
            >
              One infrastructure layer. Six sector deployments.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              Every sector ships as a configured FlyttGo deployment — the
              modules active, the challenges addressed, and the deployment
              pattern that typically wins.
            </p>
          </div>
        </div>

        <ul className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sectors.map((s) => {
            const Icon = s.icon;
            return (
              <li key={s.slug}>
                <Link
                  href={`/industries/${s.slug}`}
                  className="group flex flex-col h-full p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9]/40 focus-visible:ring-offset-[3px]"
                >
                  <div className="flex items-start justify-between">
                    <span
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${s.accent}14`, color: s.accent }}
                      aria-hidden="true"
                    >
                      <Icon size={18} strokeWidth={1.75} />
                    </span>
                    <ArrowUpRight
                      size={14}
                      className="text-slate-300 group-hover:text-slate-700 dark:group-hover:text-white motion-safe:transition-colors"
                      aria-hidden="true"
                    />
                  </div>
                  <p
                    className="mt-5 text-[11px] font-semibold uppercase tracking-[0.18em]"
                    style={{ color: s.accent }}
                  >
                    {s.eyebrow}
                  </p>
                  <h3 className="mt-2 text-base md:text-lg font-semibold tracking-tight text-slate-900 dark:text-white leading-snug group-hover:underline underline-offset-4">
                    {s.name}
                  </h3>
                  <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed flex-1">
                    {s.description}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default SectorsOverview;
