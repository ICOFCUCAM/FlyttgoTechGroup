'use client';

import React, { useState } from 'react';
import Link from '@/components/flytt/LocaleLink';
import { ChevronDown, ArrowUpRight } from 'lucide-react';
import { useI18n } from '@/lib/i18n/I18nProvider';
import SectionIndex from '@/components/flytt/SectionIndex';
import { PROCUREMENT_FAQ } from '@/data/faq';

const HomeFAQ: React.FC = () => {
  const [open, setOpen] = useState<number | null>(0);
  const { t } = useI18n();

  return (
    <section
      id="pr-05"
      aria-labelledby="home-faq-heading"
      className="relative py-20 lg:py-24 bg-white dark:bg-slate-950 scroll-mt-24"
    >
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <SectionIndex
          code="PR.05"
          title="Deployment Procurement Guide"
          meta="6 questions · timeline · compliance · multi-tenancy · sovereignty"
          className="max-w-2xl"
        />
        <div className="mt-8 grid lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7">
            <h2
              id="home-faq-heading"
              className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-slate-900 dark:text-white leading-[1.05]"
            >
              Common questions from{' '}
              <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                deployment partners.
              </em>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              If your RFP or procurement process needs detailed answers on
              compliance, data residency, SLAs or commercial terms,{' '}
              <Link href="/contact?intent=procurement" className="font-semibold text-[#0A3A6B] dark:text-[#9ED0F9] hover:underline underline-offset-4">
                request a solution brief
              </Link>
              .
            </p>
          </div>
        </div>

        <ul className="mt-10 divide-y divide-slate-200/80 dark:divide-slate-800/60 border-y border-slate-200/80 dark:border-slate-800/60">
          {PROCUREMENT_FAQ.map((item, i) => {
            const expanded = open === i;
            const headingId = `faq-${i}-heading`;
            const panelId = `faq-${i}-panel`;
            return (
              <li key={item.code}>
                <h3 id={headingId}>
                  <button
                    type="button"
                    aria-expanded={expanded}
                    aria-controls={panelId}
                    onClick={() => setOpen(expanded ? null : i)}
                    className="group w-full flex items-center justify-between gap-4 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9]/40 focus-visible:ring-offset-[3px] rounded-md"
                  >
                    <span className="flex items-center gap-4 min-w-0">
                      <span
                        aria-hidden="true"
                        className="font-mono text-[10px] tracking-[0.22em] font-semibold text-[#0A3A6B] dark:text-[#9ED0F9] flex-shrink-0 w-12"
                      >
                        {item.code}
                      </span>
                      <span className="text-base md:text-lg font-semibold text-slate-900 dark:text-white tracking-tight">
                        {item.q}
                      </span>
                    </span>
                    <ChevronDown
                      size={18}
                      aria-hidden="true"
                      className={`flex-shrink-0 text-slate-400 group-hover:text-slate-700 dark:group-hover:text-white motion-safe:transition-transform ${expanded ? 'rotate-180' : ''}`}
                    />
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={headingId}
                  hidden={!expanded}
                  className="pb-6 pl-16 pr-10 text-[15px] text-slate-600 dark:text-slate-400 leading-[1.65]"
                >
                  {item.a()}
                </div>
              </li>
            );
          })}
        </ul>

        <div className="mt-8">
          <Link
            href="/contact?intent=procurement"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white hover:gap-3 motion-safe:transition-all"
          >
            Talk to deployment engineering
            <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeFAQ;
