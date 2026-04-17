import React from 'react';
import Link from 'next/link';
import {
  ArrowUpRight,
  Truck,
  GraduationCap,
  Building2,
  Store,
  CheckCircle2,
} from 'lucide-react';

type Tile = {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  capabilities: string[];
  icon: typeof Truck;
  accent: string;
  bg: string;
};

const tiles: Tile[] = [
  {
    eyebrow: 'Logistics',
    title: 'Logistics Marketplace Infrastructure',
    description:
      'Deploy branded logistics marketplaces with dispatch intelligence, driver coordination, multi-zone delivery orchestration and operator dashboards.',
    href: '/platforms/flyttgo',
    capabilities: ['Dispatch engine', 'Driver coordination', 'Territory analytics'],
    icon: Truck,
    accent: '#1E6FD9',
    bg: 'from-blue-50 to-white',
  },
  {
    eyebrow: 'Education',
    title: 'Education Intelligence Platforms',
    description:
      'Operationalize attendance, performance and institutional analytics for schools, districts and ministries — on a multi-tenant infrastructure layer.',
    href: '/platforms/edupro',
    capabilities: ['Attendance analytics', 'District reporting', 'Ministry dashboards'],
    icon: GraduationCap,
    accent: '#0FB5A6',
    bg: 'from-teal-50 to-white',
  },
  {
    eyebrow: 'Government',
    title: 'Government Service Layer Deployment',
    description:
      'Stand up municipal dashboards, permit workflows, transport oversight and citizen services — deployable as pilot, metro or national environments.',
    href: '/platforms/govstack',
    capabilities: ['Permit workflows', 'Citizen services', 'Cross-agency oversight'],
    icon: Building2,
    accent: '#7C5CE6',
    bg: 'from-violet-50 to-white',
  },
  {
    eyebrow: 'White-Label',
    title: 'White-Label Workforce Platforms',
    description:
      'Launch tenant-isolated workforce and service marketplaces with full branding, operator dashboards and modular module activation.',
    href: '/platforms/marketstack',
    capabilities: ['Branded marketplaces', 'Operator dashboards', 'Modular expansion'],
    icon: Store,
    accent: '#E67E1E',
    bg: 'from-orange-50 to-white',
  },
];

const PlatformEcosystemOverview: React.FC = () => {
  return (
    <section
      id="platforms"
      aria-labelledby="platform-overview-heading"
      className="relative py-28 lg:py-36 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-4xl motion-safe:animate-fade-up">
          <p className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full text-xs font-semibold text-slate-700 uppercase tracking-wider">
            <span className="w-1 h-1 rounded-full bg-[#1E6FD9]" aria-hidden="true" />
            Platform Ecosystem
          </p>
          <h2
            id="platform-overview-heading"
            className="mt-6 text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-slate-900 leading-[1.05]"
          >
            One Infrastructure Layer.{' '}
            <span className="text-[#0A3A6B]">Multiple Deployment Platforms.</span>
          </h2>
          <p className="mt-6 text-lg lg:text-xl text-slate-600 leading-relaxed max-w-2xl">
            A unified platform infrastructure layer enabling organizations to deploy logistics,
            education, government and workforce marketplace platforms — independently or as a
            unified multi-platform environment.
          </p>
        </div>

        <div className="mt-20 grid md:grid-cols-2 gap-6">
          {tiles.map((t) => {
            const Icon = t.icon;
            return (
              <Link
                key={t.href}
                href={t.href}
                className="group relative block p-8 lg:p-10 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-2xl hover:shadow-slate-900/5 hover:-translate-y-1 motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9] focus-visible:ring-offset-2"
                aria-label={`${t.title}: explore platform`}
              >
                <div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${t.bg} opacity-0 group-hover:opacity-100 motion-safe:transition-opacity pointer-events-none`}
                  aria-hidden="true"
                />
                <div className="relative">
                  <div className="flex items-start justify-between">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center motion-safe:transition-transform group-hover:-rotate-3"
                      style={{ backgroundColor: `${t.accent}14`, color: t.accent }}
                      aria-hidden="true"
                    >
                      <Icon size={26} strokeWidth={1.75} />
                    </div>
                    <ArrowUpRight
                      size={22}
                      className="text-slate-300 group-hover:text-slate-900 motion-safe:transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </div>

                  <p
                    className="mt-8 text-[11px] uppercase tracking-wider font-semibold"
                    style={{ color: t.accent }}
                  >
                    {t.eyebrow}
                  </p>
                  <h3 className="mt-2 text-2xl lg:text-3xl font-semibold tracking-tight text-slate-900 leading-tight">
                    {t.title}
                  </h3>
                  <p className="mt-4 text-base text-slate-600 leading-relaxed max-w-md">
                    {t.description}
                  </p>

                  <ul className="mt-7 flex flex-wrap gap-2">
                    {t.capabilities.map((c) => (
                      <li
                        key={c}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-full text-xs font-medium text-slate-700"
                      >
                        <CheckCircle2 size={12} style={{ color: t.accent }} aria-hidden="true" />
                        {c}
                      </li>
                    ))}
                  </ul>

                  <div
                    className="mt-8 inline-flex items-center gap-2 text-sm font-semibold motion-safe:transition-all group-hover:gap-3"
                    style={{ color: t.accent }}
                  >
                    Explore platform
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PlatformEcosystemOverview;
