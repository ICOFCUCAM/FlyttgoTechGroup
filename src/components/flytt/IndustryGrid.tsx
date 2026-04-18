import React from 'react';
import Link from 'next/link';
import {
  Truck,
  GraduationCap,
  Building2,
  Car,
  Store,
  Briefcase,
  Radar,
  MapPinned,
  ArrowUpRight,
} from 'lucide-react';

const industries = [
  {
    icon: Truck,
    title: 'Logistics Networks',
    desc: 'Dispatch coordination and delivery orchestration across cities.',
    href: '/industries/logistics',
  },
  {
    icon: GraduationCap,
    title: 'Education Systems',
    desc: 'Attendance, performance and institutional intelligence.',
    href: '/industries/education',
  },
  {
    icon: Building2,
    title: 'Municipal Services',
    desc: 'Permit workflows and citizen service coordination.',
    href: '/industries/government',
  },
  {
    icon: Car,
    title: 'Smart Cities',
    desc: 'Transport analytics and urban coverage visualization.',
    href: '/industries/transport',
  },
  {
    icon: Store,
    title: 'Service Marketplaces',
    desc: 'Multi-vendor marketplace deployment engines.',
    href: '/industries/marketplaces',
  },
  {
    icon: Briefcase,
    title: 'Enterprise Operations',
    desc: 'Fleet telemetry and operations performance dashboards.',
    href: '/industries/enterprise',
  },
  {
    icon: Radar,
    title: 'Transport Regulators',
    desc: 'Cross-agency oversight and fleet visibility dashboards.',
    href: '/industries/transport',
  },
  {
    icon: MapPinned,
    title: 'Regional Rollouts',
    desc: 'Multi-region deployment and territory analytics.',
    href: '/industries/logistics',
  },
];

const IndustryGrid: React.FC = () => {
  return (
    <section id="industries" className="py-20 lg:py-24 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-slate-800/60 rounded-full text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Industries Served
            </div>
            <h2 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight text-slate-900 dark:text-white">
              One infrastructure layer. Every platform industry.
            </h2>
          </div>
          <p className="text-slate-600 dark:text-slate-400 max-w-md">
            FlyttGo modules are deployed across transport, education, government, enterprise and marketplace
            ecosystems — powered by a single cloud-native architecture.
          </p>
        </div>

        <ul className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {industries.map((ind) => {
            const Icon = ind.icon;
            return (
              <li key={ind.title}>
                <Link
                  href={ind.href}
                  className="group block h-full p-6 rounded-2xl bg-gradient-to-br from-white to-slate-50/50 dark:from-slate-900 dark:to-slate-900/60 border border-slate-200/80 dark:border-slate-800/60 hover:border-[#1E6FD9]/40 hover:shadow-lg motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9]/40 focus-visible:ring-offset-[3px]"
                >
                  <div className="flex items-start justify-between">
                    <div className="w-11 h-11 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 flex items-center justify-center text-[#0A3A6B] dark:text-[#9ED0F9] group-hover:bg-[#0A3A6B] group-hover:text-white group-hover:border-[#0A3A6B] motion-safe:transition-colors">
                      <Icon size={20} strokeWidth={1.75} />
                    </div>
                    <ArrowUpRight
                      size={14}
                      className="text-slate-300 group-hover:text-slate-700 dark:group-hover:text-white motion-safe:transition-colors"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-slate-900 dark:text-white tracking-tight">
                    {ind.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {ind.desc}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default IndustryGrid;
