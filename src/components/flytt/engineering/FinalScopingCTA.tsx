import React from 'react';
import Link from '@/components/flytt/LocaleLink';
import { ArrowRight, ArrowUpRight, Landmark, Workflow } from 'lucide-react';

/**
 * SE.FN — Final scoping entry surface. Closes the engineering page
 * with the primary scoping CTA + cross-links to the public-sector
 * surface (GV.00) and the platform ecosystem (PL.00). Mirrors the
 * cross-link pattern on /government's GV.09.
 */

export default function FinalScopingCTA() {
  return (
    <section
      id="se-fn"
      aria-labelledby="se-fn-heading"
      className="relative bg-gradient-to-b from-[#F7FAFD] to-white dark:from-slate-900 dark:to-slate-950 py-24 lg:py-28 border-t border-slate-200/60 dark:border-slate-800/60 scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
          <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">SE.FN</span>
          <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
          <span>Scoping intake · cross-links</span>
        </div>

        <div className="mt-8 grid lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7">
            <h2
              id="se-fn-heading"
              className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-slate-900 dark:text-white leading-[1.05]"
            >
              Open the scoping intake{' '}
              <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                for the engineering division.
              </em>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-base text-slate-600 dark:text-slate-400 leading-[1.65]">
              Engagement desk responds within one business day with a
              capability deep-dive (SE.D1) calendar. From there the
              engagement enters scoping (SE.D2) and the order form is
              issued.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            href="/contact?intent=engineering"
            className="group inline-flex items-center gap-2 px-7 py-3.5 bg-[#0A3A6B] text-white text-sm font-semibold tracking-tight rounded-lg hover:bg-[#0A3A6B]/90 motion-safe:transition-colors shadow-[0_1px_0_0_rgb(10_58_107/0.6),0_8px_24px_-12px_rgb(10_58_107/0.5)]"
          >
            Open scoping intake
            <ArrowRight
              size={16}
              className="motion-safe:transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400">
            Engineering response within one business day
          </span>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200/70 dark:border-slate-800/60">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500 mb-4">
            Adjacent capability surfaces
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <Link
              href="/government"
              className="group flex items-start gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 hover:border-slate-300 dark:hover:border-slate-700 motion-safe:transition-colors"
            >
              <span
                className="w-10 h-10 rounded-xl bg-[#0A3A6B]/8 dark:bg-[#9ED0F9]/12 text-[#0A3A6B] dark:text-[#9ED0F9] flex items-center justify-center flex-shrink-0"
                aria-hidden="true"
              >
                <Landmark size={16} strokeWidth={1.75} />
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] tracking-[0.22em] uppercase font-semibold text-[#0A3A6B] dark:text-[#9ED0F9]">
                    GV.00
                  </span>
                  <ArrowUpRight
                    size={13}
                    className="text-slate-400 group-hover:text-slate-700 dark:group-hover:text-white motion-safe:transition-colors ml-auto"
                    aria-hidden="true"
                  />
                </div>
                <div className="mt-1 text-[14px] font-semibold tracking-tight text-slate-900 dark:text-white">
                  Public-sector surface
                </div>
                <div className="mt-1 text-[12px] text-slate-500 dark:text-slate-400 leading-snug">
                  Capability brief, sovereignty framework, pilot proposal — for ministries and authorities.
                </div>
              </div>
            </Link>

            <Link
              href="/platforms"
              className="group flex items-start gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 hover:border-slate-300 dark:hover:border-slate-700 motion-safe:transition-colors"
            >
              <span
                className="w-10 h-10 rounded-xl bg-[#0FB5A6]/15 text-[#0FB5A6] flex items-center justify-center flex-shrink-0"
                aria-hidden="true"
              >
                <Workflow size={16} strokeWidth={1.75} />
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] tracking-[0.22em] uppercase font-semibold text-[#0FB5A6]">
                    PL.00
                  </span>
                  <ArrowUpRight
                    size={13}
                    className="text-slate-400 group-hover:text-slate-700 dark:group-hover:text-white motion-safe:transition-colors ml-auto"
                    aria-hidden="true"
                  />
                </div>
                <div className="mt-1 text-[14px] font-semibold tracking-tight text-slate-900 dark:text-white">
                  Platform ecosystem surface
                </div>
                <div className="mt-1 text-[12px] text-slate-500 dark:text-slate-400 leading-snug">
                  Eight modular platforms — Transify, Workverge, Civitas, EduPro, Identra, Payvera, Ledgera, Marketplace.
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
