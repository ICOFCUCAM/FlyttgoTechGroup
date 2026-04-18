import React from 'react';
import Link from 'next/link';
import {
  Building2,
  Bus,
  GraduationCap,
  Landmark,
  ShieldCheck,
  Truck,
} from 'lucide-react';

const sectors = [
  { label: 'Ministries', icon: Landmark, href: '/industries/government' },
  { label: 'Municipalities', icon: Building2, href: '/industries/government' },
  { label: 'Universities', icon: GraduationCap, href: '/industries/education' },
  { label: 'Transport operators', icon: Bus, href: '/industries/transport' },
  { label: 'Enterprise fleets', icon: Truck, href: '/industries/enterprise' },
  { label: 'Regulated marketplaces', icon: ShieldCheck, href: '/industries/marketplaces' },
];

const TrustIndicators: React.FC = () => {
  return (
    <section
      aria-labelledby="trust-heading"
      className="relative py-12 lg:py-14 bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-900/60"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10">
          <h2
            id="trust-heading"
            className="shrink-0 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-500"
          >
            Deployed for
          </h2>
          <ul
            className="flex-1 grid grid-cols-2 sm:grid-cols-3 lg:flex lg:flex-wrap items-center gap-x-10 gap-y-4"
            aria-label="Sectors FlyttGo platforms serve"
          >
            {sectors.map((s) => {
              const Icon = s.icon;
              return (
                <li key={s.label}>
                  <Link
                    href={s.href}
                    className="inline-flex items-center gap-2 text-slate-500 dark:text-slate-500 motion-safe:transition-colors hover:text-slate-800 dark:hover:text-slate-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9]/40 focus-visible:ring-offset-[3px] rounded-sm"
                  >
                    <Icon size={16} strokeWidth={1.6} aria-hidden="true" />
                    <span className="text-sm font-medium tracking-tight">{s.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators;
