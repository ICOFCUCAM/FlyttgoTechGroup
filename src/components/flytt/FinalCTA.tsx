'use client';

import React from 'react';
import Link from '@/components/flytt/LocaleLink';
import { ArrowRight, CalendarClock, Sparkles, Globe2 } from 'lucide-react';
import { useI18n } from '@/lib/i18n/I18nProvider';

const highlights = [
  { icon: Globe2, label: 'Multi-region · EU · AF · MENA' },
  { icon: Sparkles, label: 'Modular platforms · Independent licensing' },
  { icon: CalendarClock, label: '60–120 day deployment cycle' },
];

const FinalCTA: React.FC = () => {
  const { t } = useI18n();
  return (
    <section
      id="ct-06"
      aria-labelledby="final-cta-heading"
      className="relative py-28 lg:py-36 overflow-hidden bg-gradient-to-b from-white to-[#F5F8FC] dark:from-slate-950 dark:to-slate-900 scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="relative rounded-[32px] overflow-hidden bg-gradient-to-br from-[#0A1F3D] via-[#0A3A6B] to-[#1E6FD9] text-white shadow-2xl shadow-slate-900/20">
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            aria-hidden="true"
            style={{
              backgroundImage:
                'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
              backgroundSize: '48px 48px',
              maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 85%)',
            }}
          />
          <div
            className="absolute -top-32 -right-24 w-[520px] h-[520px] rounded-full bg-white/10 blur-3xl pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-32 -left-24 w-[460px] h-[460px] rounded-full bg-[#0FB5A6]/20 blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative px-8 py-16 lg:px-20 lg:py-28">
            <div className="max-w-3xl mx-auto text-center motion-safe:animate-fade-up">
              {/* Engineering section index — inverted variant for the dark CTA panel */}
              <div className="flex items-center justify-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-white/55">
                <span className="text-[#9ED0F9] font-semibold">CT.06</span>
                <span aria-hidden="true" className="w-12 h-px bg-white/15" />
                <span>Deployment Engagement</span>
              </div>

              <p className="mt-6 inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur border border-white/15 rounded-full text-xs font-semibold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 motion-safe:animate-pulse" aria-hidden="true" />
                {t('home.cta.eyebrow')}
              </p>
              <h2
                id="final-cta-heading"
                className="mt-6 font-serif text-4xl md:text-5xl lg:text-[60px] font-medium tracking-tight leading-[1.05]"
              >
                {t('home.cta.title.part1')}{' '}
                <em className="not-italic font-serif italic font-normal bg-gradient-to-r from-white via-white to-[#9ED0F9] bg-clip-text text-transparent">
                  {t('home.cta.title.part2')}
                </em>
              </h2>
              <p className="mt-6 text-lg lg:text-xl text-white/80 leading-[1.6]">
                Scope a deployment with the FlyttGo platform team — from pilot tenant to national
                rollout, across logistics, education, government and white-label workforce
                platforms.
              </p>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 px-7 py-4 bg-white text-[#0A3A6B] font-semibold rounded-lg hover:bg-slate-100 dark:bg-slate-800/60 motion-safe:transition-colors shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A3A6B]"
                >
                  {t('home.cta.primary')}
                  <ArrowRight
                    size={18}
                    className="motion-safe:transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
                <Link
                  href="/contact?intent=demo"
                  className="inline-flex items-center gap-2 px-7 py-4 border border-white/25 text-white font-semibold rounded-lg hover:bg-white/10 motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A3A6B]"
                >
                  <CalendarClock size={16} aria-hidden="true" />
                  {t('home.cta.secondary')}
                </Link>
              </div>

              {/* Lifecycle rail — pilot → regional → national */}
              <div className="mt-14 pt-10 border-t border-white/10">
                <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-white/55 mb-4">
                  Deployment lifecycle
                </div>
                <ol className="grid grid-cols-3 gap-3 text-left">
                  {[
                    { stage: 'Pilot', win: '60–120 days', note: 'Single tenant · 1 region' },
                    { stage: 'Regional rollout', win: '6–12 months', note: 'Multi-tenant · 1–3 regions' },
                    { stage: 'National rollout', win: '12+ months', note: 'Federated · sovereign-ready' },
                  ].map((s, i) => (
                    <li
                      key={s.stage}
                      className="relative p-4 rounded-xl bg-white/[0.06] border border-white/10"
                    >
                      <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.22em] uppercase text-[#9ED0F9]">
                        <span className="font-semibold">LF.0{i + 1}</span>
                        <span className="text-white/40">·</span>
                        <span className="text-white/70">{s.win}</span>
                      </div>
                      <div className="mt-2 text-base font-semibold text-white">{s.stage}</div>
                      <div className="mt-1 text-xs text-white/60 leading-snug">{s.note}</div>
                    </li>
                  ))}
                </ol>
              </div>

              <ul className="mt-10 pt-8 border-t border-white/10 grid sm:grid-cols-3 gap-6">
                {highlights.map((h) => {
                  const Icon = h.icon;
                  return (
                    <li key={h.label} className="flex items-center justify-center gap-2.5 text-sm text-white/80">
                      <Icon size={16} className="text-emerald-300" aria-hidden="true" />
                      <span>{h.label}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
