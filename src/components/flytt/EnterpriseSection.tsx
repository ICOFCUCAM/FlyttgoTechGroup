import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Route,
  Radar,
  CheckCircle2,
  Gauge,
  Network,
} from 'lucide-react';

type Capability = {
  icon: typeof BarChart3;
  title: string;
  description: string;
  bullets: string[];
};

const capabilities: Capability[] = [
  {
    icon: BarChart3,
    title: 'Fleet Analytics Dashboards',
    description:
      'Unified operational telemetry across every vehicle, route and driver — rendered as real-time dashboards built for dispatch centers, regional managers and executive oversight.',
    bullets: [
      'Live utilization & availability heatmaps',
      'Per-vehicle performance baselines',
      'Regional rollout performance views',
    ],
  },
  {
    icon: Radar,
    title: 'Dispatch Intelligence',
    description:
      'AI-assisted dispatch orchestration assigns drivers, vehicles and routes against live demand — reducing idle capacity and compressing operational response windows.',
    bullets: [
      'Priority-aware job allocation',
      'Multi-depot coordination',
      'Operational SLA monitoring',
    ],
  },
  {
    icon: Route,
    title: 'Route Optimization Infrastructure',
    description:
      'A PostGIS-backed routing engine continuously re-optimizes runs against traffic, constraints, customer windows and fleet mix — the same layer national operators deploy at scale.',
    bullets: [
      'Constraint-aware routing engine',
      'Zone & territory intelligence',
      'Continuous route re-optimization',
    ],
  },
];

const stats = [
  { value: '35%+', label: 'Average dispatch efficiency uplift' },
  { value: '<120ms', label: 'Route re-optimization cycle' },
  { value: '99.95%', label: 'Operational uptime target' },
];

const EnterpriseSection: React.FC = () => {
  return (
    <section
      id="enterprise"
      aria-labelledby="enterprise-heading"
      className="relative py-24 lg:py-32 bg-white"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <p className="inline-flex items-center gap-2 px-3 py-1 bg-[#0A3A6B]/5 rounded-full text-xs font-semibold text-[#0A3A6B] uppercase tracking-wider">
              <Network size={12} aria-hidden="true" />
              Enterprise Logistics Deployment
            </p>
            <h2
              id="enterprise-heading"
              className="mt-5 text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900 leading-tight"
            >
              Enterprise-grade logistics infrastructure for national fleets, regional operators and commercial transport groups.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-lg text-slate-600 leading-relaxed">
              Deploy the same modular infrastructure layer that powers multi-region logistics programs —
              fleet analytics, dispatch intelligence and route optimization, delivered as production-ready
              modules rather than bespoke projects.
            </p>
          </div>
        </div>

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {capabilities.map((c) => {
            const Icon = c.icon;
            return (
              <article
                key={c.title}
                className="group relative p-7 lg:p-8 rounded-2xl bg-gradient-to-br from-white to-slate-50/60 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#EEF4FA] to-[#E0EBF7] flex items-center justify-center text-[#0A3A6B]" aria-hidden="true">
                    <Icon size={22} strokeWidth={1.75} />
                  </div>
                  <ArrowUpRight
                    size={16}
                    className="text-slate-300 group-hover:text-slate-900 transition-colors"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-slate-900 tracking-tight">{c.title}</h3>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">{c.description}</p>
                <ul className="mt-6 space-y-2">
                  {c.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <CheckCircle2 size={16} className="text-[#1E6FD9] flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="leading-snug">{b}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>

        <div className="mt-10 grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 p-8 lg:p-10 rounded-3xl border border-slate-200 bg-white">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
              <Gauge size={14} aria-hidden="true" />
              Operational Outcomes
            </div>
            <h3 className="mt-3 text-2xl lg:text-3xl font-semibold text-slate-900 tracking-tight leading-tight">
              Measurable uplift across fleet productivity, dispatch response and route utilization.
            </h3>
            <dl className="mt-8 grid grid-cols-3 gap-6 border-t border-slate-100 pt-8">
              {stats.map((s) => (
                <div key={s.label}>
                  <dd className="text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">
                    {s.value}
                  </dd>
                  <dt className="mt-2 text-xs lg:text-sm text-slate-500 leading-snug">{s.label}</dt>
                </div>
              ))}
            </dl>
          </div>

          <aside className="lg:col-span-5 p-8 lg:p-10 rounded-3xl bg-gradient-to-br from-[#0A3A6B] via-[#0E4687] to-[#1E6FD9] text-white relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-10"
              aria-hidden="true"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 20% 30%, white 1px, transparent 1px), radial-gradient(circle at 70% 70%, white 1px, transparent 1px)',
                backgroundSize: '40px 40px, 60px 60px',
              }}
            />
            <div className="relative flex flex-col h-full">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-semibold uppercase tracking-wider self-start">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 motion-safe:animate-pulse" aria-hidden="true" />
                Production-Ready
              </div>
              <h3 className="mt-5 text-2xl font-semibold tracking-tight leading-tight">
                Deploy enterprise logistics infrastructure across your fleet — in weeks.
              </h3>
              <ul className="mt-6 space-y-3">
                {[
                  'Multi-depot orchestration',
                  'Driver & vehicle telemetry',
                  'Territory & regional analytics',
                  'Enterprise-grade SLAs',
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2.5 text-sm text-white/90">
                    <CheckCircle2 size={18} className="text-emerald-300 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-8 flex flex-col gap-3">
                <Link
                  href="/solutions#enterprise"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-[#0A3A6B] font-semibold rounded-lg hover:bg-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A3A6B]"
                >
                  Explore Enterprise Deployment Solutions
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
                <Link
                  href="/contact"
                  className="w-full text-center px-6 py-3.5 border border-white/25 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A3A6B]"
                >
                  Talk to Enterprise Deployment
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default EnterpriseSection;
