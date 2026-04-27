'use client';

import React from 'react';
import {
  Landmark,
  Bus,
  GraduationCap,
  Building2,
  Compass,
  FileCheck2,
  type LucideIcon,
} from 'lucide-react';
import { useI18n } from '@/lib/i18n/I18nProvider';

/**
 * GV.01 — Programme positioning. Localised via i18n; primary
 * jurisdiction copy lives in EN + NO.
 */

type Buyer = {
  code: string;
  icon: LucideIcon;
  labelKey: string;
  contextKey: string;
};

const BUYERS: Buyer[] = [
  { code: 'BR.01', icon: Landmark,      labelKey: 'government.gv01.br01.label', contextKey: 'government.gv01.br01.context' },
  { code: 'BR.02', icon: Bus,           labelKey: 'government.gv01.br02.label', contextKey: 'government.gv01.br02.context' },
  { code: 'BR.03', icon: GraduationCap, labelKey: 'government.gv01.br03.label', contextKey: 'government.gv01.br03.context' },
  { code: 'BR.04', icon: Compass,       labelKey: 'government.gv01.br04.label', contextKey: 'government.gv01.br04.context' },
  { code: 'BR.05', icon: Building2,     labelKey: 'government.gv01.br05.label', contextKey: 'government.gv01.br05.context' },
  { code: 'BR.06', icon: FileCheck2,    labelKey: 'government.gv01.br06.label', contextKey: 'government.gv01.br06.context' },
];

export default function GovernmentPositioning() {
  const { t } = useI18n();

  return (
    <section
      id="gv-01"
      aria-labelledby="gv-01-heading"
      className="relative bg-white dark:bg-slate-950 py-24 lg:py-28 border-t border-slate-200/60 dark:border-slate-800/60 scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
          <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">GV.01</span>
          <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
          <span>{t('government.gv01.eyebrow')}</span>
        </div>

        <div className="mt-8 grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-7">
            <h2
              id="gv-01-heading"
              className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-slate-900 dark:text-white leading-[1.05]"
            >
              {t('government.gv01.title.part1')}
              <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                {t('government.gv01.title.part2')}
              </em>
            </h2>
            <p className="mt-6 text-base md:text-lg text-slate-600 dark:text-slate-400 leading-[1.65] max-w-2xl">
              {t('government.gv01.body1')}
            </p>
            <p className="mt-5 text-base md:text-lg text-slate-600 dark:text-slate-400 leading-[1.65] max-w-2xl">
              {t('government.gv01.body2')}
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-slate-500 mb-4">
              {t('government.gv01.recipients.heading')}
            </div>
            <ul className="space-y-2.5">
              {BUYERS.map((b) => {
                const Icon = b.icon;
                return (
                  <li
                    key={b.code}
                    className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50/70 dark:bg-slate-900/40 border border-slate-200/70 dark:border-slate-800/60"
                  >
                    <span
                      className="w-9 h-9 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center flex-shrink-0"
                      aria-hidden="true"
                    >
                      <Icon size={14} strokeWidth={1.75} className="text-[#0A3A6B] dark:text-[#9ED0F9]" />
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[9px] tracking-[0.22em] uppercase font-semibold text-[#0A3A6B] dark:text-[#9ED0F9]">
                          {b.code}
                        </span>
                      </div>
                      <div className="mt-0.5 text-[13px] font-semibold tracking-tight text-slate-900 dark:text-white">
                        {t(b.labelKey)}
                      </div>
                      <div className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                        {t(b.contextKey)}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
