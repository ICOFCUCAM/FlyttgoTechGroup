'use client';

import React from 'react';
import Link from '@/components/flytt/LocaleLink';
import { useI18n } from '@/lib/i18n/I18nProvider';
import {
  Building2,
  Bus,
  GraduationCap,
  Landmark,
  ShieldCheck,
  Truck,
  type LucideIcon,
} from 'lucide-react';

type Sector = {
  code: string;
  label: string;
  icon: LucideIcon;
  href: string;
};

const sectors: Sector[] = [
  { code: 'TR.01', label: 'Ministries', icon: Landmark, href: '/industries/government' },
  { code: 'TR.02', label: 'Municipalities', icon: Building2, href: '/industries/government' },
  { code: 'TR.03', label: 'Universities', icon: GraduationCap, href: '/industries/education' },
  { code: 'TR.04', label: 'Transport operators', icon: Bus, href: '/industries/transport' },
  { code: 'TR.05', label: 'Enterprise fleets', icon: Truck, href: '/industries/enterprise' },
  { code: 'TR.06', label: 'Regulated marketplaces', icon: ShieldCheck, href: '/industries/marketplaces' },
];

const TrustIndicators: React.FC = () => {
  const { t } = useI18n();
  return (
    <section
      aria-labelledby="trust-heading"
      className="relative py-10 lg:py-12 bg-white dark:bg-slate-950 border-y border-slate-100 dark:border-slate-900/60"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Engineering rail — maintains institutional tone right under the hero */}
        <div className="flex items-center gap-3 mb-6 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400 dark:text-slate-500">
          <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">TR.00</span>
          <span aria-hidden="true" className="flex-1 h-px bg-slate-200/70 dark:bg-slate-800/60 max-w-[200px]" />
          <h2
            id="trust-heading"
            className="m-0"
          >
            {t('home.trust.heading')}
          </h2>
        </div>

        <ul
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-3"
          aria-label="Sectors FlyttGo platforms serve"
        >
          {sectors.map((s) => {
            const Icon = s.icon;
            return (
              <li key={s.code}>
                <Link
                  href={s.href}
                  className="group flex items-center gap-3 px-3 py-2.5 rounded-md border border-transparent hover:border-slate-200/80 dark:hover:border-slate-800/60 hover:bg-slate-50/60 dark:hover:bg-slate-900/40 motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9]/40 focus-visible:ring-offset-[3px]"
                >
                  <Icon
                    size={16}
                    strokeWidth={1.6}
                    aria-hidden="true"
                    className="text-slate-400 group-hover:text-[#0A3A6B] dark:group-hover:text-[#9ED0F9] motion-safe:transition-colors flex-shrink-0"
                  />
                  <span className="flex flex-col leading-tight min-w-0">
                    <span className="font-mono text-[9px] tracking-[0.22em] text-slate-400 dark:text-slate-500 font-semibold">
                      {s.code}
                    </span>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300 tracking-tight truncate group-hover:text-slate-900 dark:group-hover:text-white motion-safe:transition-colors">
                      {s.label}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default TrustIndicators;
