'use client';

import React from 'react';
import Link from '@/components/flytt/LocaleLink';
import { CloudCog, Layers3, ServerCog, ShieldCheck, ArrowUpRight, type LucideIcon } from 'lucide-react';
import { useI18n } from '@/lib/i18n/I18nProvider';

/**
 * GV.02 — Service-model declaration. Four-card row stating the four
 * service postures FlyttGo operates against. Localised via i18n.
 */

type Posture = {
  code: string;
  icon: LucideIcon;
  accent: string;
  titleKey: string;
  serviceKey: string;
  bodyKey: string;
  href: string;
  ctaKey: string;
};

const POSTURES: Posture[] = [
  { code: 'SM.01', icon: CloudCog,    accent: '#1E6FD9', titleKey: 'government.gv02.sm01.title', serviceKey: 'government.gv02.sm01.service', bodyKey: 'government.gv02.sm01.body', href: '/deployment/managed',        ctaKey: 'government.gv02.sm01.cta' },
  { code: 'SM.02', icon: Layers3,     accent: '#0FB5A6', titleKey: 'government.gv02.sm02.title', serviceKey: 'government.gv02.sm02.service', bodyKey: 'government.gv02.sm02.body', href: '/infrastructure-architecture', ctaKey: 'government.gv02.sm02.cta' },
  { code: 'SM.03', icon: ServerCog,   accent: '#0A3A6B', titleKey: 'government.gv02.sm03.title', serviceKey: 'government.gv02.sm03.service', bodyKey: 'government.gv02.sm03.body', href: '/deployment/customer-cloud', ctaKey: 'government.gv02.sm03.cta' },
  { code: 'SM.04', icon: ShieldCheck, accent: '#7C5CE6', titleKey: 'government.gv02.sm04.title', serviceKey: 'government.gv02.sm04.service', bodyKey: 'government.gv02.sm04.body', href: '/deployment/sovereign',      ctaKey: 'government.gv02.sm04.cta' },
];

export default function GovernmentServiceModels() {
  const { t } = useI18n();

  return (
    <section
      id="gv-02"
      aria-labelledby="gv-02-heading"
      className="relative bg-gradient-to-b from-white to-[#F5F8FC] dark:from-slate-950 dark:to-slate-900 py-24 lg:py-28 border-t border-slate-200/60 dark:border-slate-800/60 scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
          <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">GV.02</span>
          <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
          <span>{t('government.gv02.eyebrow')}</span>
        </div>

        <div className="mt-8 grid lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7">
            <h2
              id="gv-02-heading"
              className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-slate-900 dark:text-white leading-[1.05]"
            >
              {t('government.gv02.title.part1')}
              <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                {t('government.gv02.title.part2')}
              </em>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-base text-slate-600 dark:text-slate-400 leading-[1.65]">
              {t('government.gv02.description')}
            </p>
          </div>
        </div>

        <ul className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {POSTURES.map((p) => {
            const Icon = p.icon;
            return (
              <li key={p.code}>
                <Link
                  href={p.href}
                  className="group flex flex-col h-full p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9]/40 focus-visible:ring-offset-[3px]"
                >
                  <div className="flex items-start justify-between">
                    <span
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${p.accent}14`, color: p.accent }}
                      aria-hidden="true"
                    >
                      <Icon size={18} strokeWidth={1.75} />
                    </span>
                    <span
                      className="font-mono text-[10px] tracking-[0.22em] font-semibold"
                      style={{ color: p.accent }}
                    >
                      {p.code}
                    </span>
                  </div>
                  <div className="mt-4 text-[15px] font-semibold tracking-tight text-slate-900 dark:text-white leading-snug">
                    {t(p.titleKey)}
                  </div>
                  <div className="mt-1 font-mono text-[10px] tracking-[0.16em] uppercase text-slate-500">
                    {t(p.serviceKey)}
                  </div>
                  <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed flex-1">
                    {t(p.bodyKey)}
                  </p>
                  <div className="mt-5 pt-4 border-t border-slate-200/70 dark:border-slate-800/60 flex items-center justify-between gap-2">
                    <span className="text-[12px] font-medium text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white motion-safe:transition-colors">
                      {t(p.ctaKey)}
                    </span>
                    <ArrowUpRight
                      size={13}
                      className="text-slate-300 group-hover:text-slate-700 dark:group-hover:text-white motion-safe:transition-all flex-shrink-0"
                      aria-hidden="true"
                    />
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
