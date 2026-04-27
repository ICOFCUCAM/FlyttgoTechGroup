'use client';

import React from 'react';
import Link from '@/components/flytt/LocaleLink';
import { ArrowRight, ArrowUpRight, FileText, Users, Briefcase, Download, type LucideIcon } from 'lucide-react';
import { useI18n } from '@/lib/i18n/I18nProvider';

/**
 * GV.09 — Engagement intake. Three-step engagement model + primary
 * intake CTA. Localised via i18n.
 */

type Step = {
  code: string;
  icon: LucideIcon;
  titleKey: string;
  durationKey: string;
  bodyKey: string;
  artefactKey: string;
};

const STEPS: Step[] = [
  { code: 'EG.01', icon: Users,     titleKey: 'government.gv09.eg01.title', durationKey: 'government.gv09.eg01.duration', bodyKey: 'government.gv09.eg01.body', artefactKey: 'government.gv09.eg01.artefact' },
  { code: 'EG.02', icon: FileText,  titleKey: 'government.gv09.eg02.title', durationKey: 'government.gv09.eg02.duration', bodyKey: 'government.gv09.eg02.body', artefactKey: 'government.gv09.eg02.artefact' },
  { code: 'EG.03', icon: Briefcase, titleKey: 'government.gv09.eg03.title', durationKey: 'government.gv09.eg03.duration', bodyKey: 'government.gv09.eg03.body', artefactKey: 'government.gv09.eg03.artefact' },
];

export default function GovernmentEngagement() {
  const { t } = useI18n();

  return (
    <section
      id="gv-09"
      aria-labelledby="gv-09-heading"
      className="relative bg-gradient-to-b from-[#F7FAFD] to-white dark:from-slate-900 dark:to-slate-950 py-28 lg:py-32 border-t border-slate-200/60 dark:border-slate-800/60 scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
          <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">GV.09</span>
          <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
          <span>{t('government.gv09.eyebrow')}</span>
        </div>

        <div className="mt-8 grid lg:grid-cols-12 gap-10 lg:gap-12 items-end">
          <div className="lg:col-span-7">
            <h2
              id="gv-09-heading"
              className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-slate-900 dark:text-white leading-[1.05]"
            >
              {t('government.gv09.title.part1')}
              <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                {t('government.gv09.title.part2')}
              </em>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-base text-slate-600 dark:text-slate-400 leading-[1.65]">
              {t('government.gv09.description')}
            </p>
          </div>
        </div>

        <ol className="mt-12 grid md:grid-cols-3 gap-4">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <li
                key={s.code}
                className="relative flex flex-col p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60"
              >
                <div className="flex items-start justify-between">
                  <span
                    className="w-10 h-10 rounded-xl bg-[#0A3A6B]/8 text-[#0A3A6B] dark:bg-[#9ED0F9]/12 dark:text-[#9ED0F9] flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <Icon size={16} strokeWidth={1.75} />
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.22em] font-semibold text-[#0A3A6B] dark:text-[#9ED0F9]">
                    {s.code}
                  </span>
                </div>
                <div className="mt-4 text-[15px] font-semibold tracking-tight text-slate-900 dark:text-white leading-snug">
                  {t(s.titleKey)}
                </div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">
                  {t(s.durationKey)}
                </div>
                <p className="mt-4 text-sm text-slate-600 dark:text-slate-400 leading-relaxed flex-1">
                  {t(s.bodyKey)}
                </p>
                <div className="mt-5 pt-4 border-t border-slate-200/70 dark:border-slate-800/60 font-mono text-[10px] uppercase tracking-[0.16em] text-[#0A3A6B] dark:text-[#9ED0F9]">
                  {t(s.artefactKey)}
                </div>
                {i < STEPS.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="hidden md:block absolute top-1/2 -right-2 w-4 h-px bg-slate-300 dark:bg-slate-700"
                  />
                )}
              </li>
            );
          })}
        </ol>

        <div className="mt-12 flex flex-wrap items-center gap-4">
          <Link
            href="/contact?intent=government"
            className="group inline-flex items-center gap-2 px-7 py-3.5 bg-[#0A3A6B] text-white text-sm font-semibold tracking-tight rounded-lg hover:bg-[#0A3A6B]/90 motion-safe:transition-colors shadow-[0_1px_0_0_rgb(10_58_107/0.6),0_8px_24px_-12px_rgb(10_58_107/0.5)]"
          >
            {t('government.gv09.cta.primary')}
            <ArrowRight
              size={16}
              className="motion-safe:transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
          <Link
            href="/government/capability-brief"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 text-slate-900 dark:text-white text-sm font-semibold rounded-lg hover:border-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900/80 motion-safe:transition-colors"
          >
            <Download size={13} strokeWidth={2} aria-hidden="true" />
            {t('government.gv09.cta.brief')}
          </Link>
          <Link
            href="/procurement-compatibility"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 text-slate-900 dark:text-white text-sm font-semibold rounded-lg hover:border-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900/80 motion-safe:transition-colors"
          >
            {t('government.gv09.cta.procurement')}
            <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400">
            {t('government.gv09.cta.response')}
          </span>
        </div>

        <p className="mt-8 max-w-3xl font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400 leading-relaxed">
          {t('government.gv09.footer')}
        </p>
      </div>
    </section>
  );
}
