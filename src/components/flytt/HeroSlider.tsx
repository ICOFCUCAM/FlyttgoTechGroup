'use client';

import React from 'react';
import Link from '@/components/flytt/LocaleLink';
import { ArrowRight, Sparkles } from 'lucide-react';
import PlatformOrbitGraph from './PlatformOrbitGraph';
import { useI18n } from '@/lib/i18n/I18nProvider';

const HeroSlider: React.FC = () => {
  const { t } = useI18n();
  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden bg-[#0A1F3D] text-white"
    >
      {/* Radial gradient mesh backdrop */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(1200px 600px at 18% 20%, rgba(30,111,217,0.55), transparent 60%),' +
            'radial-gradient(900px 500px at 85% 15%, rgba(15,181,166,0.28), transparent 60%),' +
            'radial-gradient(1000px 600px at 70% 90%, rgba(124,92,230,0.24), transparent 60%)',
        }}
      />

      {/* 64px grid overlay with radial mask */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.8) 1px, transparent 1px),' +
            'linear-gradient(to bottom, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse at 30% 40%, black 35%, transparent 85%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28 xl:py-32">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left — headline, subheadline, CTAs */}
          <div className="lg:col-span-7 xl:col-span-6">
            <p className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur border border-white/15 rounded-full text-[11px] font-semibold uppercase tracking-[0.18em]">
              <span
                className="w-1.5 h-1.5 rounded-full bg-emerald-300 motion-safe:animate-pulse"
                aria-hidden="true"
              />
              {t('hero.eyebrow')}
            </p>

            <h1
              id="hero-heading"
              className="mt-6 text-[32px] sm:text-[38px] md:text-[44px] lg:text-[48px] xl:text-[54px] leading-[1.08] font-semibold tracking-tight text-white"
            >
              {t('hero.title.part1')}{' '}
              <span className="text-[#9ED0F9]">{t('hero.title.part2')}</span>
            </h1>

            <p className="mt-5 text-base md:text-lg text-white/80 leading-relaxed max-w-2xl font-normal">
              {t('hero.subtitle')}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/platforms"
                className="group inline-flex items-center gap-2 px-6 py-3.5 bg-white text-[#0A3A6B] text-sm font-semibold rounded-lg hover:bg-slate-100 motion-safe:transition-all shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-[3px] focus-visible:ring-offset-[#0A1F3D]"
              >
                <Sparkles size={15} aria-hidden="true" />
                {t('hero.cta.primary')}
                <ArrowRight
                  size={16}
                  className="motion-safe:transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
              <Link
                href="/contact?intent=partnership"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 backdrop-blur border border-white/20 text-white text-sm font-semibold rounded-lg hover:bg-white/20 motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-[3px] focus-visible:ring-offset-[#0A1F3D]"
              >
                {t('hero.cta.secondary')}
              </Link>
            </div>
          </div>

          {/* Right — interactive platform ecosystem graph */}
          <div className="lg:col-span-5 xl:col-span-6">
            <PlatformOrbitGraph />
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
      />
    </section>
  );
};

export default HeroSlider;
