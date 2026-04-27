import React from 'react';
import Link from '@/components/flytt/LocaleLink';
import { Quote, ArrowUpRight, Building2 } from 'lucide-react';
import { Reveal } from '@/components/flytt/Reveal';

const CaseStudyCard: React.FC = () => {
  return (
    <section aria-labelledby="case-study-heading" className="relative py-24 lg:py-32 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <Reveal className="relative overflow-hidden rounded-[32px] border border-slate-200/80 dark:border-slate-800/60 bg-gradient-to-br from-white via-[#F7FAFD] to-white shadow-[0_1px_0_0_rgb(15_23_42/0.04),0_24px_48px_-16px_rgb(15_23_42/0.14)]">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"
          />
          <div
            aria-hidden="true"
            className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full bg-gradient-to-br from-[#1E6FD9]/10 via-[#0FB5A6]/10 to-transparent blur-3xl pointer-events-none"
          />

          <div className="relative grid lg:grid-cols-12 gap-10 p-10 lg:p-14">
            <div className="lg:col-span-7">
              <p className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-slate-800/60 rounded-full text-[11px] font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-[0.18em]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
                Case Study · Government Service Layer
              </p>
              <h2
                id="case-study-heading"
                className="mt-5 text-3xl md:text-4xl lg:text-[44px] font-semibold tracking-tight text-slate-900 dark:text-white leading-[1.05]"
              >
                How a Nordic transport authority deployed{' '}
                <span className="text-[#0A3A6B]">Civitas</span> in{' '}
                <span className="bg-gradient-to-r from-[#1E6FD9] to-[#0FB5A6] bg-clip-text text-transparent">
                  4 weeks.
                </span>
              </h2>
              <div className="mt-6 relative pl-5 border-l-2 border-[#1E6FD9]/30">
                <Quote
                  size={18}
                  className="absolute -left-[11px] top-0 text-[#1E6FD9] bg-white dark:bg-slate-900 rounded-full"
                  aria-hidden="true"
                />
                <p className="text-base lg:text-lg text-slate-700 dark:text-slate-300 leading-relaxed italic max-w-2xl">
                  &ldquo;We scoped a permit coordination platform on a Monday, stood up the tenant
                  environment on Friday, and had the first municipal cohort live the following
                  month. Modular activation turned what used to be a 12-month RFP into a
                  deployment exercise.&rdquo;
                </p>
              </div>
              <div className="mt-6 flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0A3A6B] to-[#1E6FD9] flex items-center justify-center text-white font-semibold tracking-wider"
                  aria-hidden="true"
                >
                  NT
                </div>
                <div className="leading-tight">
                  <div className="text-sm font-semibold text-slate-900 dark:text-white tracking-tight">
                    Director, Digital Services
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5 inline-flex items-center gap-1.5">
                    <Building2 size={12} aria-hidden="true" />
                    Nordic Transport Authority · Representative engagement
                  </div>
                </div>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/platforms/civitas"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0A3A6B] text-white text-sm font-semibold rounded-lg hover:bg-[#0a2f57] motion-safe:transition-colors shadow-[0_1px_0_0_rgb(10_58_107/0.6),0_6px_18px_-6px_rgb(10_58_107/0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9]/40 focus-visible:ring-offset-[3px]"
                >
                  Read the Civitas brief
                  <ArrowUpRight size={14} aria-hidden="true" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-slate-900 dark:text-white text-sm font-semibold rounded-lg border border-slate-200/80 dark:border-slate-800/60 hover:border-slate-300 hover:bg-slate-50 dark:bg-slate-900/60 motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9]/40 focus-visible:ring-offset-[3px]"
                >
                  Scope a similar deployment
                </Link>
              </div>
            </div>

            <dl className="lg:col-span-5 grid grid-cols-2 gap-4 content-center">
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 shadow-[0_1px_0_0_rgb(15_23_42/0.04)]">
                <dt className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-semibold">Time-to-pilot</dt>
                <dd className="mt-3 text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900 dark:text-white">
                  4 <span className="text-base font-medium text-slate-500">weeks</span>
                </dd>
              </div>
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 shadow-[0_1px_0_0_rgb(15_23_42/0.04)]">
                <dt className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-semibold">Modules activated</dt>
                <dd className="mt-3 text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900 dark:text-white">6 / 6</dd>
              </div>
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 shadow-[0_1px_0_0_rgb(15_23_42/0.04)]">
                <dt className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-semibold">Operators onboarded</dt>
                <dd className="mt-3 text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900 dark:text-white">14</dd>
              </div>
              <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0A1F3D] to-[#0A3A6B] text-white shadow-[0_1px_0_0_rgb(255_255_255/0.08),0_20px_40px_-16px_rgb(10_31_61/0.35)]">
                <dt className="text-[10px] uppercase tracking-[0.2em] text-white/60 font-semibold">Platform status</dt>
                <dd className="mt-3 text-sm font-semibold tracking-tight inline-flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 motion-safe:animate-pulse" aria-hidden="true" />
                  Live · Multi-region
                </dd>
                <div className="mt-3 text-[11px] text-white/70">Hosted in EU-North with tenant isolation.</div>
              </div>
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default CaseStudyCard;
