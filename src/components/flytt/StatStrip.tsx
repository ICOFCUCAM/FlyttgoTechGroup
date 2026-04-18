import React from 'react';
import { Truck, Users, ShieldCheck, Activity } from 'lucide-react';
import { CountUp } from '@/components/flytt/CountUp';
import { Reveal } from '@/components/flytt/Reveal';

type Stat = {
  icon: typeof Truck;
  to: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
  sub: string;
};

const stats: Stat[] = [
  {
    icon: Truck,
    to: 500,
    suffix: 'k+',
    label: 'shipments routed',
    sub: 'Across EU, AF and MENA in the last 12 months.',
  },
  {
    icon: Users,
    to: 18,
    label: 'operator tenants',
    sub: 'Governments, ministries, enterprise fleets, founders.',
  },
  {
    icon: ShieldCheck,
    to: 99.95,
    suffix: '%',
    decimals: 2,
    label: 'uptime target',
    sub: 'Multi-region, tenant-isolated production SLAs.',
  },
  {
    icon: Activity,
    to: 120,
    suffix: 'ms',
    label: 'p95 dispatch response',
    sub: 'Continuous re-optimization of live routes.',
  },
];

const StatStrip: React.FC = () => {
  return (
    <section
      aria-labelledby="stat-strip-heading"
      className="relative py-16 lg:py-20 bg-white dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800/60"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 id="stat-strip-heading" className="sr-only">
          Platform scale highlights
        </h2>

        <Reveal as="dl" className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="relative">
                {i > 0 && (
                  <span
                    aria-hidden="true"
                    className="hidden lg:block absolute -left-4 top-1 bottom-1 w-px bg-slate-200/80"
                  />
                )}
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-slate-500 font-semibold">
                  <Icon size={13} strokeWidth={1.75} className="text-[#0A3A6B]" aria-hidden="true" />
                  <span>{s.label}</span>
                </div>
                <dd className="mt-3 text-[40px] lg:text-[52px] leading-none font-semibold tracking-tight text-slate-900 dark:text-white">
                  <CountUp
                    to={s.to}
                    prefix={s.prefix}
                    suffix={s.suffix}
                    decimals={s.decimals}
                    ariaLabel={`${s.prefix ?? ''}${s.to}${s.suffix ?? ''} ${s.label}`}
                  />
                </dd>
                <dt className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-xs">{s.sub}</dt>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
};

export default StatStrip;
