import React from 'react';
import Link from 'next/link';
import {
  ArrowUpRight,
  Building2,
  GraduationCap,
  Truck,
  Briefcase,
  Landmark,
} from 'lucide-react';

const items = [
  { icon: Landmark, label: 'Governments & ministries' },
  { icon: Building2, label: 'Municipalities' },
  { icon: GraduationCap, label: 'Universities & education' },
  { icon: Truck, label: 'Transport operators' },
  { icon: Briefcase, label: 'Enterprise workforce programmes' },
];

const HomeIndustriesStrip: React.FC = () => {
  return (
    <section
      aria-labelledby="home-industries-heading"
      className="relative py-20 lg:py-24 bg-white dark:bg-slate-950"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7">
            <p className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-slate-800/60 rounded-full text-[11px] font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-[0.18em]">
              Industries Served
            </p>
            <h2
              id="home-industries-heading"
              className="mt-5 text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900 dark:text-white leading-[1.08]"
            >
              Built for institutions and operators.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              Ministries, municipalities, universities and transport operators deploy FlyttGo
              platforms at pilot, metro or national scale.{' '}
              <Link href="/industries" className="font-semibold text-[#0A3A6B] dark:text-[#9ED0F9] hover:underline underline-offset-4">
                Industries overview
              </Link>
              .
            </p>
          </div>
        </div>

        <ul className="mt-10 flex flex-wrap gap-3">
          {items.map((it) => {
            const Icon = it.icon;
            return (
              <li key={it.label}>
                <Link
                  href="/industries"
                  className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-white dark:hover:bg-slate-900 motion-safe:transition-colors text-sm font-medium text-slate-700 dark:text-slate-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9]/40 focus-visible:ring-offset-[3px]"
                >
                  <Icon size={14} className="text-[#0A3A6B] dark:text-[#9ED0F9]" strokeWidth={1.75} aria-hidden="true" />
                  {it.label}
                  <ArrowUpRight size={12} className="text-slate-400 group-hover:text-slate-700 dark:group-hover:text-white motion-safe:transition-colors" aria-hidden="true" />
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
