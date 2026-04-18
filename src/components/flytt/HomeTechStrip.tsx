import React from 'react';
import Link from 'next/link';
import {
  ArrowUpRight,
  Code2,
  Cpu,
  Database,
  Globe,
  Zap,
  Container,
  Cloud,
  Lock,
} from 'lucide-react';

const stack = [
  { name: 'Next.js', icon: Code2 },
  { name: 'NestJS', icon: Cpu },
  { name: 'PostgreSQL', icon: Database },
  { name: 'PostGIS', icon: Globe },
  { name: 'Redis', icon: Zap },
  { name: 'Docker', icon: Container },
  { name: 'Kubernetes', icon: Cloud },
  { name: 'OAuth / RBAC', icon: Lock },
];

const HomeTechStrip: React.FC = () => {
  return (
    <section
      aria-labelledby="home-tech-heading"
      className="relative py-20 lg:py-24 bg-gradient-to-b from-white to-[#F7FAFD] dark:from-slate-950 dark:to-slate-900"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7">
            <p className="inline-flex items-center gap-2 px-3 py-1 bg-[#0A3A6B]/5 rounded-full text-[11px] font-semibold text-[#0A3A6B] uppercase tracking-[0.18em]">
              Technology Infrastructure
            </p>
            <h2
              id="home-tech-heading"
              className="mt-5 text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900 dark:text-white leading-[1.08]"
            >
              Cloud-native platform stack.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              Multi-tenant, region-aware, standards-based.{' '}
              <Link href="/technology" className="font-semibold text-[#0A3A6B] dark:text-[#9ED0F9] hover:underline underline-offset-4">
                Architecture overview
              </Link>
              .
            </p>
          </div>
        </div>

        <ul className="mt-10 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {stack.map((s) => {
            const Icon = s.icon;
            return (
              <li
                key={s.name}
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60"
              >
                <Icon size={14} className="text-[#0A3A6B] dark:text-[#9ED0F9] flex-shrink-0" strokeWidth={1.75} aria-hidden="true" />
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 tracking-tight truncate">
                  {s.name}
                </span>
              </li>
            );
          })}
        </ul>

        <div className="mt-8 flex justify-start">
          <Link
            href="/technology"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white hover:gap-3 motion-safe:transition-all"
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
