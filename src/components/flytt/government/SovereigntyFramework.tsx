'use client';

import React from 'react';
import Link from '@/components/flytt/LocaleLink';
import { ShieldCheck, KeyRound, Globe2, FileSearch, ArrowUpRight, type LucideIcon } from 'lucide-react';
import { useI18n } from '@/lib/i18n/I18nProvider';

/**
 * GV.05 — Sovereignty framework. The dark editorial anchor of the
 * /government page. Localised via i18n.
 */

type Row = {
  code: string;
  icon: LucideIcon;
  titleKey: string;
  postureKey: string;
  detailKey: string;
};

const ROWS: Row[] = [
  { code: 'SV.01', icon: Globe2,      titleKey: 'government.gv05.sv01.title', postureKey: 'government.gv05.sv01.posture', detailKey: 'government.gv05.sv01.detail' },
  { code: 'SV.02', icon: KeyRound,    titleKey: 'government.gv05.sv02.title', postureKey: 'government.gv05.sv02.posture', detailKey: 'government.gv05.sv02.detail' },
  { code: 'SV.03', icon: ShieldCheck, titleKey: 'government.gv05.sv03.title', postureKey: 'government.gv05.sv03.posture', detailKey: 'government.gv05.sv03.detail' },
  { code: 'SV.04', icon: FileSearch,  titleKey: 'government.gv05.sv04.title', postureKey: 'government.gv05.sv04.posture', detailKey: 'government.gv05.sv04.detail' },
];

export default function SovereigntyFramework() {
  const { t } = useI18n();

  return (
    <section
      id="gv-05"
      aria-labelledby="gv-05-heading"
      className="relative bg-[#070D1A] text-white py-24 lg:py-28 scroll-mt-24"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(800px 500px at 18% 12%, rgba(214,181,117,0.08), transparent 60%),' +
            'radial-gradient(900px 500px at 84% 88%, rgba(30,111,217,0.10), transparent 60%)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.6) 1px, transparent 1px),' +
            'linear-gradient(to bottom, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-white/55">
          <span className="text-[#D6B575] font-semibold">GV.05</span>
          <span aria-hidden="true" className="flex-1 h-px bg-white/15 max-w-[200px]" />
          <span>{t('government.gv05.eyebrow')}</span>
        </div>

        <div className="mt-8 grid lg:grid-cols-12 gap-10 lg:gap-12 items-end">
          <div className="lg:col-span-7">
            <h2
              id="gv-05-heading"
              className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-white leading-[1.05]"
            >
              {t('government.gv05.title.part1')}
              <em className="not-italic font-serif italic font-normal text-[#D6B575]">
                {t('government.gv05.title.part2')}
              </em>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-base text-white/80 leading-[1.65]">
              {t('government.gv05.description')}
            </p>
          </div>
        </div>

        <ul className="mt-12 grid md:grid-cols-2 gap-4">
          {ROWS.map((r) => {
            const Icon = r.icon;
            return (
              <li
                key={r.code}
                className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-white/20 motion-safe:transition-colors"
              >
                <div className="flex items-start gap-3">
                  <span
                    className="w-10 h-10 rounded-xl bg-[#D6B575]/15 text-[#D6B575] flex items-center justify-center flex-shrink-0"
                    aria-hidden="true"
                  >
                    <Icon size={16} strokeWidth={1.75} />
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="font-mono text-[10px] uppercase tracking-[0.22em] font-semibold text-[#D6B575]">
                      {r.code}
                    </div>
                    <div className="mt-1 text-[15px] font-semibold tracking-tight text-white">
                      {t(r.titleKey)}
                    </div>
                    <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-white/55">
                      {t(r.postureKey)}
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-[13px] leading-relaxed text-white/75">
                  {t(r.detailKey)}
                </p>
              </li>
            );
          })}
        </ul>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            href="/government/orchestration"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/[0.06] border border-white/15 text-white text-sm font-semibold tracking-tight hover:bg-white/[0.10] hover:border-white/25 motion-safe:transition-colors"
          >
            {t('government.gv05.cta.orchestration')}
            <ArrowUpRight size={13} aria-hidden="true" className="text-[#D6B575]" />
          </Link>
          <Link
            href="/government/capability-brief"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/[0.06] border border-white/15 text-white text-sm font-semibold tracking-tight hover:bg-white/[0.10] hover:border-white/25 motion-safe:transition-colors"
          >
            {t('government.gv05.cta.brief')}
            <ArrowUpRight size={13} aria-hidden="true" className="text-[#D6B575]" />
          </Link>
        </div>
        <p className="mt-6 max-w-3xl font-mono text-[10px] uppercase tracking-[0.18em] text-white/55">
          {t('government.gv05.footer')}
        </p>
      </div>
    </section>
  );
}
