'use client';

import React from 'react';
import Link from '@/components/flytt/LocaleLink';
import { useI18n } from '@/lib/i18n/I18nProvider';
import {
  ArrowUpRight,
  Building2,
  GraduationCap,
  Truck,
  Briefcase,
  Landmark,
  Banknote,
  HeartPulse,
  Factory,
  ShoppingBag,
  type LucideIcon,
} from 'lucide-react';
import SectionIndex from '@/components/flytt/SectionIndex';

type Sector = {
  code: string;
  icon: LucideIcon;
  label: string;
  scale: string;
  modules: string;
  href: string;
};

const sectors: Sector[] = [
  // Public sector
  {
    code: 'IN.01',
    icon: Landmark,
    label: 'Governments & ministries',
    scale: 'National',
    modules: 'Civitas · Identra · Payvera',
    href: '/industries/government',
  },
  {
    code: 'IN.02',
    icon: Building2,
    label: 'Municipalities',
    scale: 'Metro',
    modules: 'Civitas · Payvera',
    href: '/industries/government',
  },
  {
    code: 'IN.03',
    icon: GraduationCap,
    label: 'Universities & education',
    scale: 'Multi-institution',
    modules: 'EduPro · Identra · Payvera',
    href: '/industries/education',
  },
  {
    code: 'IN.04',
    icon: Truck,
    label: 'Transport operators',
    scale: 'Regional',
    modules: 'Transify · Workverge',
    href: '/industries/transport',
  },
  // Enterprise
  {
    code: 'IN.05',
    icon: Briefcase,
    label: 'Enterprise workforce',
    scale: 'BU-wide',
    modules: 'Workverge · Payvera · Ledgera',
    href: '/industries/enterprise',
  },
  {
    code: 'IN.06',
    icon: Banknote,
    label: 'Financial services',
    scale: 'Regulated',
    modules: 'Payvera · Identra · Ledgera',
    href: '/industries/enterprise',
  },
  {
    code: 'IN.07',
    icon: HeartPulse,
    label: 'Healthcare networks',
    scale: 'Multi-facility',
    modules: 'Workverge · Identra · Civitas',
    href: '/industries/enterprise',
  },
  {
    code: 'IN.08',
    icon: Factory,
    label: 'Manufacturing & supply chain',
    scale: 'Multi-plant',
    modules: 'Transify · Workverge · Ledgera',
    href: '/industries/logistics',
  },
  {
    code: 'IN.09',
    icon: ShoppingBag,
    label: 'B2B SaaS + marketplaces',
    scale: 'Multi-tenant',
    modules: 'Identra · Payvera · Transify · Ledgera',
    href: '/industries/marketplaces',
  },
];

const HomeIndustriesStrip: React.FC = () => {
  const { t } = useI18n();
  return (
    <section
      id="in-03"
      aria-labelledby="home-industries-heading"
      className="relative py-24 lg:py-28 bg-white dark:bg-slate-950 scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionIndex
          code="IN.03"
          title="Institutional Deployment Sectors"
          meta="9 sector profiles · public + enterprise · platform-mapped"
          className="max-w-2xl"
        />

        <div className="mt-8 grid lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7">
            <h2
              id="home-industries-heading"
              className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-slate-900 dark:text-white leading-[1.05]"
            >
              {t('home.industries.title.part1')}
              <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                {t('home.industries.title.part2')}
              </em>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-base text-slate-600 dark:text-slate-400 leading-[1.65]">
              {t('home.industries.description')}{' '}
              <Link
                href="/industries"
                className="font-semibold text-[#0A3A6B] dark:text-[#9ED0F9] hover:underline underline-offset-4"
              >
                {t('home.industries.cta')}
              </Link>
              .
            </p>
          </div>
        </div>

        <ul className="mt-10 grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {sectors.map((s) => {
            const Icon = s.icon;
            return (
              <li key={s.code}>
                <Link
                  href={s.href}
                  className="group flex flex-col h-full p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-white dark:hover:bg-slate-900/80 motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9]/40 focus-visible:ring-offset-[3px]"
                >
                  <div className="flex items-start justify-between">
                    <Icon
                      size={16}
                      className="text-[#0A3A6B] dark:text-[#9ED0F9]"
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                    <span className="font-mono text-[10px] tracking-[0.22em] font-semibold text-slate-400">
                      {s.code}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold text-slate-900 dark:text-white tracking-tight">
                      {s.label}
                    </span>
                    <ArrowUpRight
                      size={12}
                      className="text-slate-300 group-hover:text-slate-700 dark:group-hover:text-white motion-safe:transition-colors flex-shrink-0"
                      aria-hidden="true"
                    />
                  </div>
                  <dl className="mt-auto pt-3 border-t border-slate-200/70 dark:border-slate-800/60 space-y-1 font-mono text-[9px] tracking-[0.18em] uppercase">
                    <div className="flex items-center justify-between">
                      <dt className="text-slate-400">Scale</dt>
                      <dd className="text-slate-700 dark:text-slate-300">{s.scale}</dd>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <dt className="text-slate-400 flex-shrink-0">Modules</dt>
                      <dd
                        className="text-[#0A3A6B] dark:text-[#9ED0F9] truncate"
                        title={s.modules}
                      >
                        {s.modules}
                      </dd>
                    </div>
                  </dl>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default HomeIndustriesStrip;
