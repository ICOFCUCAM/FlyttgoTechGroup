import React from 'react';
import Link from 'next/link';
import {
  Building2,
  GraduationCap,
  Truck,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';

type Audience = {
  icon: typeof Building2;
  title: string;
  tagline: string;
  description: string;
  outcomes: string[];
  href: string;
  accent: string;
  tint: string;
};

const audiences: Audience[] = [
  {
    icon: Building2,
    title: 'Government agencies',
    tagline: 'Ministries · Municipalities · Regulators',
    description:
      'Deploy municipal dashboards, permit systems and transport oversight infrastructure — pilot, metro or national scale.',
    outcomes: ['Municipal coordination', 'Permit workflows', 'Regulator oversight'],
    href: '/platforms/civitas',
    accent: '#7C5CE6',
    tint: 'from-violet-50 to-white',
  },
  {
    icon: GraduationCap,
    title: 'Universities',
    tagline: 'Institutions · Districts · Education ministries',
    description:
      'Stand up attendance, performance and institutional analytics platforms — from single campus to ministry-level rollouts.',
    outcomes: ['Attendance analytics', 'Institution dashboards', 'Ministry reporting'],
    href: '/platforms/edupro',
    accent: '#0FB5A6',
    tint: 'from-teal-50 to-white',
  },
  {
    icon: Truck,
    title: 'Logistics operators',
    tagline: 'Fleets · Carriers · Regional movers',
    description:
      'Run dispatch, telemetry, route optimization and territory analytics on a production-grade operator stack.',
    outcomes: ['Dispatch intelligence', 'Fleet telemetry', 'Route optimization'],
    href: '/platforms/flyttgo',
    accent: '#1E6FD9',
    tint: 'from-blue-50 to-white',
  },
  {
    icon: Sparkles,
    title: 'Marketplace founders',
    tagline: 'Platform builders · Workforce operators',
    description:
      'Launch branded logistics, service or workforce marketplaces without engineering backend systems from scratch.',
    outcomes: ['Branded marketplaces', 'Operator dashboards', 'Modular activation'],
    href: '/platforms/flyttgo',
    accent: '#E67E1E',
    tint: 'from-orange-50 to-white',
  },
];

const TargetUsers: React.FC = () => {
  return (
    <section
      aria-labelledby="target-users-heading"
      className="relative py-28 lg:py-36 bg-white dark:bg-slate-950"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl motion-safe:animate-fade-up">
          <p className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-slate-800/60 rounded-full text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            Who It&rsquo;s For
          </p>
          <h2
            id="target-users-heading"
            className="mt-6 text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-slate-900 dark:text-white leading-[1.05]"
          >
            Built for{' '}
            <span className="text-[#0A3A6B]">Governments, Universities,</span>{' '}
            <span className="bg-gradient-to-r from-[#1E6FD9] to-[#0FB5A6] bg-clip-text text-transparent">
              Operators &amp; Platform Builders
            </span>
          </h2>
          <p className="mt-6 text-lg lg:text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
            Four distinct operator profiles, one shared infrastructure layer — each with a
            purpose-built deployment template and supporting modules.
          </p>
        </div>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {audiences.map((a) => {
            const Icon = a.icon;
            return (
              <Link
                key={a.title}
                href={a.href}
                className={`group relative flex flex-col p-7 lg:p-8 rounded-3xl bg-gradient-to-br ${a.tint} border border-slate-200/80 dark:border-slate-800/60 hover:shadow-xl hover:-translate-y-1 motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9] focus-visible:ring-offset-2`}
              >
                <div className="flex items-start justify-between">
                  <div
                    className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 shadow-sm flex items-center justify-center motion-safe:transition-transform group-hover:-rotate-6"
                    style={{ color: a.accent }}
                    aria-hidden="true"
                  >
                    <Icon size={22} strokeWidth={1.75} />
                  </div>
                  <ArrowUpRight
                    size={16}
                    className="text-slate-300 group-hover:text-slate-900 dark:text-white motion-safe:transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="mt-7 text-xl lg:text-2xl font-semibold tracking-tight text-slate-900 dark:text-white leading-tight">
                  {a.title}
                </h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wider" style={{ color: a.accent }}>
                  {a.tagline}
                </p>
                <p className="mt-4 text-sm text-slate-600 dark:text-slate-400 leading-relaxed flex-1">{a.description}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {a.outcomes.map((o) => (
                    <li
                      key={o}
                      className="px-2.5 py-1 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 rounded-md text-[11px] font-medium text-slate-700 dark:text-slate-300"
                    >
                      {o}
                    </li>
                  ))}
                </ul>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TargetUsers;
