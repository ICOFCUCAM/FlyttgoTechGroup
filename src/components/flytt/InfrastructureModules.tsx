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
} from 'lucide-react';

type Module = {
  icon: typeof CreditCard;
  id: string;
  name: string;
  description: string;
  surfaces: string[];
  accent: string;
};

const modules: Module[] = [
  {
    id: 'M1',
    icon: CreditCard,
    name: 'Payments layer',
    description:
      'Multi-provider payments, tenant-scoped ledgers and region-aware settlement flows — wired into every deployment.',
    surfaces: ['Card & wallet', 'Ledger & payouts', 'Regional acquirers'],
    accent: '#1E6FD9',
  },
  {
    id: 'M2',
    icon: Fingerprint,
    name: 'Identity layer',
    description:
      'OAuth, SSO, multi-tenant identity, RBAC and audit-ready session management across all operator interfaces.',
    surfaces: ['SSO / OAuth', 'RBAC', 'Audit logging'],
    accent: '#0FB5A6',
  },
  {
    id: 'M3',
    icon: Store,
    name: 'Marketplace engine',
    description:
      'Vendor, order and listing orchestration with tenant-scoped catalog, commission rules and operator workflows.',
    surfaces: ['Multi-vendor', 'Commission rules', 'Order routing'],
    accent: '#E67E1E',
  },
  {
    id: 'M4',
    icon: Sparkles,
    name: 'Relocation intelligence',
    description:
      'AI-assisted routing, territory balancing and demand prediction — the logistics intelligence layer FlyttGo was named for.',
    surfaces: ['Routing AI', 'Demand forecast', 'Territory balance'],
    accent: '#7C5CE6',
  },
  {
    id: 'M5',
    icon: LayoutDashboard,
    name: 'Admin dashboards',
    description:
      'Purpose-built operator cockpits for dispatch, fleet, support, tenant admin and compliance oversight.',
    surfaces: ['Dispatch cockpit', 'Tenant admin', 'Support console'],
    accent: '#0A3A6B',
  },
  {
    id: 'M6',
    icon: BarChart3,
    name: 'Analytics layer',
    description:
      'Real-time pipelines, geospatial analytics and role-aware reporting across operator, regional and institutional views.',
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
        <div className="max-w-3xl motion-safe:animate-fade-up">
          <p className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full text-xs font-semibold text-slate-700 uppercase tracking-wider">
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
        </div>

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {modules.map((m) => {
            const Icon = m.icon;
            return (
              <article
                key={m.id}
                className="group relative p-7 lg:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-0.5 motion-safe:transition-all"
              >
                <div className="flex items-start justify-between">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center motion-safe:transition-transform group-hover:-rotate-6"
                    style={{ backgroundColor: `${m.accent}14`, color: m.accent }}
                    aria-hidden="true"
                  >
                    <Icon size={22} strokeWidth={1.75} />
                  </div>
                  <span
                    className="text-[10px] font-mono font-semibold uppercase tracking-[0.2em] px-2 py-1 rounded-md"
                    style={{ backgroundColor: `${m.accent}10`, color: m.accent }}
                  >
                    {m.id}
                  </span>
                </div>
                <h3 className="mt-7 text-xl lg:text-2xl font-semibold tracking-tight text-slate-900">
                  {m.name}
                </h3>
                <p className="mt-3 text-sm lg:text-base text-slate-600 leading-relaxed">{m.description}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {m.surfaces.map((s) => (
                    <li
                      key={s}
                      className="inline-flex items-center px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-md text-[11px] font-medium text-slate-700"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/technology"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-white border border-slate-200 text-slate-900 font-semibold rounded-lg hover:bg-slate-50 hover:border-slate-300 motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9] focus-visible:ring-offset-2"
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
