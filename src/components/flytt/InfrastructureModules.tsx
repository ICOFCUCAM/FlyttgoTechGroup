import React from 'react';
import Link from 'next/link';
import {
  ArrowUpRight,
  CreditCard,
  Fingerprint,
  Store,
  Sparkles,
  LayoutDashboard,
  BarChart3,
  type LucideIcon,
} from 'lucide-react';
import { Reveal } from '@/components/flytt/Reveal';

type Module = {
  icon: LucideIcon;
  id: string;
  name: string;
  description: string;
  surfaces: string[];
  accent: string;
  featured?: boolean;
};

const modules: Module[] = [
  {
    id: 'M3',
    icon: Store,
    name: 'Marketplace engine',
    description:
      'Vendor, order and listing orchestration with tenant-scoped catalog, commission rules and operator workflows — the layer that powers white-label marketplaces across regions.',
    surfaces: ['Multi-vendor', 'Commission rules', 'Order routing', 'Tenant catalog'],
    accent: '#E67E1E',
    featured: true,
  },
  {
    id: 'M1',
    icon: CreditCard,
    name: 'Payments layer',
    description: 'Multi-provider payments, tenant-scoped ledgers and region-aware settlement.',
    surfaces: ['Card & wallet', 'Ledger & payouts', 'Regional acquirers'],
    accent: '#1E6FD9',
  },
  {
    id: 'M2',
    icon: Fingerprint,
    name: 'Identity layer',
    description: 'OAuth, SSO, multi-tenant identity, RBAC and audit-ready sessions.',
    surfaces: ['SSO / OAuth', 'RBAC', 'Audit logging'],
    accent: '#0FB5A6',
  },
  {
    id: 'M4',
    icon: Sparkles,
    name: 'Relocation intelligence',
    description:
      'AI-assisted routing, territory balancing and demand prediction — the logistics intelligence FlyttGo was named for.',
    surfaces: ['Routing AI', 'Demand forecast', 'Territory balance'],
    accent: '#7C5CE6',
  },
  {
    id: 'M5',
    icon: LayoutDashboard,
    name: 'Admin dashboards',
    description: 'Operator cockpits for dispatch, fleet, support, tenant admin and compliance.',
    surfaces: ['Dispatch cockpit', 'Tenant admin', 'Support console'],
    accent: '#0A3A6B',
  },
  {
    id: 'M6',
    icon: BarChart3,
    name: 'Analytics layer',
    description: 'Real-time pipelines, geospatial analytics and role-aware reporting across every operator view.',
    surfaces: ['Real-time pipelines', 'Geospatial analytics', 'Reporting'],
    accent: '#E11D48',
  },
];

const InfrastructureModules: React.FC = () => {
  return (
    <section
      id="infrastructure-modules"
      aria-labelledby="infrastructure-modules-heading"
      className="relative py-28 lg:py-36 bg-gradient-to-b from-white via-[#F7FAFD] to-white"
    >
      <div
        className="absolute inset-x-0 top-0 h-[420px] pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage:
            'linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(ellipse at top, black 10%, transparent 70%)',
          opacity: 0.35,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <Reveal className="max-w-3xl">
          <p className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full text-xs font-semibold text-slate-700 uppercase tracking-[0.18em]">
            Infrastructure Modules
          </p>
          <h2
            id="infrastructure-modules-heading"
            className="mt-6 text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-slate-900 leading-[1.05]"
          >
            Modular Infrastructure{' '}
            <span className="text-[#0A3A6B]">Components</span>
          </h2>
          <p className="mt-6 text-lg lg:text-xl text-slate-600 leading-relaxed max-w-2xl">
            Six composable modules that power every FlyttGo deployment. Activate together or
            independently, per tenant and region.
          </p>
        </Reveal>

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 auto-rows-[220px] gap-5">
          {modules.map((m, i) => {
            const Icon = m.icon;
            const isFeatured = m.featured;
            const outer =
              isFeatured
                ? 'md:col-span-2 lg:col-span-2 lg:row-span-2 row-span-2 bg-gradient-to-br from-[#0A1F3D] via-[#0A3A6B] to-[#1E6FD9] text-white border-transparent'
                : 'bg-white border border-slate-200/80 shadow-[0_1px_0_0_rgb(15_23_42/0.04)] hover:shadow-[0_1px_0_0_rgb(15_23_42/0.04),0_20px_40px_-16px_rgb(15_23_42/0.18)]';
            const delay = i * 60;
            return (
              <Reveal
                key={m.id}
                delay={delay}
                as="article"
                className={`group relative overflow-hidden rounded-3xl p-7 lg:p-8 motion-safe:transition-all hover:-translate-y-0.5 ${outer}`}
              >
                {isFeatured && (
                  <>
                    <div
                      className="absolute inset-0 opacity-10 pointer-events-none"
                      aria-hidden="true"
                      style={{
                        backgroundImage:
                          'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
                        backgroundSize: '48px 48px',
                        maskImage: 'radial-gradient(ellipse at top left, black 10%, transparent 70%)',
                      }}
                    />
                    <div
                      aria-hidden="true"
                      className="absolute -top-24 -right-16 w-[360px] h-[360px] rounded-full bg-[#0FB5A6]/20 blur-3xl pointer-events-none"
                    />
                  </>
                )}
                <div className="relative flex flex-col h-full">
                  <div className="flex items-start justify-between">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center motion-safe:transition-transform group-hover:-rotate-6 ${
                        isFeatured ? 'bg-white/15 text-white' : ''
                      }`}
                      style={isFeatured ? undefined : { backgroundColor: `${m.accent}14`, color: m.accent }}
                      aria-hidden="true"
                    >
                      <Icon size={22} strokeWidth={1.75} />
                    </div>
                    <span
                      className={`text-[10px] font-mono font-semibold uppercase tracking-[0.2em] px-2 py-1 rounded-md ${
                        isFeatured ? 'bg-white/15 text-white/80' : ''
                      }`}
                      style={isFeatured ? undefined : { backgroundColor: `${m.accent}10`, color: m.accent }}
                    >
                      {m.id}
                    </span>
                  </div>
                  <h3
                    className={`mt-7 font-semibold tracking-tight ${
                      isFeatured ? 'text-white text-2xl lg:text-3xl' : 'text-slate-900 text-xl lg:text-2xl'
                    }`}
                  >
                    {m.name}
                  </h3>
                  <p
                    className={`mt-3 text-sm leading-relaxed ${
                      isFeatured ? 'text-white/80 max-w-md' : 'text-slate-600'
                    }`}
                  >
                    {m.description}
                  </p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {m.surfaces.map((s) => (
                      <li
                        key={s}
                        className={`inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-medium ${
                          isFeatured
                            ? 'bg-white/10 border border-white/20 text-white/85'
                            : 'bg-slate-50 border border-slate-200/80 text-slate-700'
                        }`}
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                  {isFeatured && (
                    <div className="mt-auto pt-7">
                      <Link
                        href="/platforms/marketstack"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-white hover:gap-2.5 motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-[3px] focus-visible:ring-offset-[#0A1F3D] rounded-sm"
                      >
                        See MarketStack in action
                        <ArrowUpRight size={14} aria-hidden="true" />
                      </Link>
                    </div>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/technology"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-white border border-slate-200/80 text-slate-900 font-semibold rounded-lg hover:bg-slate-50 hover:border-slate-300 motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9]/40 focus-visible:ring-offset-[3px]"
          >
            See full architecture
            <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default InfrastructureModules;
