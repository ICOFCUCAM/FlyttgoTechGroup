'use client';

import React from 'react';
import Link from '@/components/flytt/LocaleLink';
import { useI18n } from '@/lib/i18n/I18nProvider';
import { ArrowUpRight } from 'lucide-react';
import SectionIndex from '@/components/flytt/SectionIndex';
import LayeredStack from '@/components/flytt/diagrams/LayeredStack';

const HomeTechStrip: React.FC = () => {
  const { t } = useI18n();
  return (
    <section
      aria-labelledby="home-tech-heading"
      className="relative py-24 lg:py-28 bg-gradient-to-b from-white to-[#F7FAFD] dark:from-slate-950 dark:to-slate-900"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionIndex
          code="TX.04"
          title="Infrastructure Stack Architecture"
          meta="6 layers · service delivery → cloud-native runtime"
          className="max-w-2xl"
        />

        <div className="mt-8 grid lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7">
            <h2
              id="home-tech-heading"
              className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-slate-900 dark:text-white leading-[1.05]"
            >
              {t('home.tech.title.part1') || 'A six-layer stack '}
              <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                engineered to be deployed.
              </em>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-base text-slate-600 dark:text-slate-400 leading-[1.65]">
              {t('home.tech.description')}{' '}
              <Link
                href="/technology"
                className="font-semibold text-[#0A3A6B] dark:text-[#9ED0F9] hover:underline underline-offset-4"
              >
                {t('home.tech.cta')}
              </Link>
              .
            </p>
          </div>
        </div>

        {/* Layered stack diagram replaces the previous flat badge grid */}
        <div className="mt-10 p-4 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 shadow-sm overflow-hidden">
          <LayeredStack className="overflow-x-auto" />
        </div>

        <div className="mt-6 flex justify-start">
          <Link
            href="/technology"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white hover:gap-3 motion-safe:transition-all"
          >
            See full architecture
            <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeTechStrip;
