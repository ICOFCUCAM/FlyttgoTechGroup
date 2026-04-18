import React from 'react';
import {
  Building2,
  Bus,
  GraduationCap,
  Landmark,
  ShieldCheck,
  Truck,
} from 'lucide-react';

const sectors = [
  { label: 'Ministries', icon: Landmark },
  { label: 'Municipalities', icon: Building2 },
  { label: 'Universities', icon: GraduationCap },
  { label: 'Transport operators', icon: Bus },
  { label: 'Enterprise fleets', icon: Truck },
  { label: 'Regulated marketplaces', icon: ShieldCheck },
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
                <li
                  key={s.label}
                  className="inline-flex items-center gap-2 text-slate-500 dark:text-slate-500 motion-safe:transition-colors hover:text-slate-800 dark:hover:text-slate-300"
                >
                  <Icon size={16} strokeWidth={1.6} aria-hidden="true" />
                  <span className="text-sm font-medium tracking-tight">{s.label}</span>
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
