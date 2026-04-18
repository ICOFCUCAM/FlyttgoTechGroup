import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  GraduationCap,
  ShieldCheck,
  CheckCircle2,
  Landmark,
  BarChart3,
} from 'lucide-react';

type Programme = {
  icon: typeof Building2;
  title: string;
  description: string;
  bullets: string[];
  accent: string;
  iconBg: string;
  iconColor: string;
};

const programmes: Programme[] = [
  {
    icon: Building2,
    title: 'Municipal Dashboards',
    description:
      'Citywide operational visibility for municipal leadership — permit pipelines, service response, infrastructure coverage and cross-agency oversight unified in a single service layer.',
    bullets: [
      'Permit & licence workflows',
      'Citizen service coordination',
      'Cross-agency oversight',
    ],
    accent: '#7C5CE6',
    iconBg: 'bg-violet-50',
    iconColor: 'text-[#7C5CE6]',
  },
  {
    icon: GraduationCap,
    title: 'Education Analytics Platforms',
    description:
      'Attendance, performance and institutional analytics for schools, districts and ministries — deployed nationally with multi-tenant isolation and role-based access.',
    bullets: [
      'Attendance & performance analytics',
      'District & ministry reporting',
      'Institution-level drill-down',
    ],
    accent: '#0FB5A6',
    iconBg: 'bg-teal-50',
    iconColor: 'text-[#0FB5A6]',
  },
  {
    icon: ShieldCheck,
    title: 'Transport Oversight Infrastructure',
    description:
      'Regulatory-grade transport coordination: driver credentialing, permit enforcement, operator compliance and multi-operator fleet visibility for transport authorities.',
    bullets: [
      'Operator credentialing & compliance',
      'Fleet visibility for regulators',
      'Multi-operator coordination',
    ],
    accent: '#1E6FD9',
    iconBg: 'bg-blue-50',
    iconColor: 'text-[#1E6FD9]',
  },
];

const trustBullets = [
  'Multi-tenant national architecture',
  'Regional deployment portability',
  'OAuth & RBAC by default',
  'Audit-ready operational logs',
];

const GovernmentSection: React.FC = () => {
  return (
    <section
      id="government"
      aria-labelledby="government-heading"
      className="relative py-24 lg:py-32 bg-gradient-to-b from-[#F7FAFD] via-white to-[#F5F8FC] dark:from-slate-900 dark:via-slate-950 dark:to-slate-900"
    >
      <div
        className="absolute inset-0 opacity-[0.35] pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage:
            'linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <p className="inline-flex items-center gap-2 px-3 py-1 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 rounded-full text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider shadow-sm">
              <Landmark size={12} aria-hidden="true" />
              Government Deployment
            </p>
            <h2
              id="government-heading"
              className="mt-5 text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900 dark:text-white leading-tight"
            >
              Infrastructure for municipalities, education ministries and transport authorities.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              Deploy production-ready government service platforms — municipal dashboards, national education
              analytics environments and transport oversight systems — on a single modular infrastructure layer
              designed for multi-region public deployments.
            </p>
          </div>
        </div>

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {programmes.map((p) => {
            const Icon = p.icon;
            return (
              <article
                key={p.title}
                className="group relative p-7 lg:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div
                    className={`w-12 h-12 rounded-xl ${p.iconBg} flex items-center justify-center ${p.iconColor}`}
                    aria-hidden="true"
                  >
                    <Icon size={22} strokeWidth={1.75} />
                  </div>
                  <ArrowUpRight
                    size={16}
                    className="text-slate-300 group-hover:text-slate-900 dark:text-white transition-colors"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-slate-900 dark:text-white tracking-tight">{p.title}</h3>
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{p.description}</p>
                <ul className="mt-6 space-y-2">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300">
                      <CheckCircle2
                        size={16}
                        className="flex-shrink-0 mt-0.5"
                        style={{ color: p.accent }}
                        aria-hidden="true"
                      />
                      <span className="leading-snug">{b}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 text-[11px] uppercase tracking-wider font-semibold" style={{ color: p.accent }}>
                  Deployed across EU · AF · MENA
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-10 grid lg:grid-cols-12 gap-6">
          <aside className="lg:col-span-5 p-8 lg:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
              <BarChart3 size={14} aria-hidden="true" />
              Institutional Trust
            </div>
            <h3 className="mt-3 text-xl lg:text-2xl font-semibold text-slate-900 dark:text-white tracking-tight leading-tight">
              Institutional-grade foundations — from tenancy isolation to audit readiness.
            </h3>
            <ul className="mt-6 space-y-3">
              {trustBullets.map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300">
                  <CheckCircle2 size={18} className="text-[#1E6FD9] flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="leading-snug">{b}</span>
                </li>
              ))}
            </ul>
          </aside>

          <div className="lg:col-span-7 p-8 lg:p-10 rounded-3xl bg-gradient-to-br from-[#0A3A6B] via-[#0E4687] to-[#1E6FD9] text-white relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-10"
              aria-hidden="true"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 20% 30%, white 1px, transparent 1px), radial-gradient(circle at 70% 70%, white 1px, transparent 1px)',
                backgroundSize: '40px 40px, 60px 60px',
              }}
            />
            <div className="relative">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white dark:bg-slate-900/10 rounded-full text-xs font-semibold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 motion-safe:animate-pulse" aria-hidden="true" />
                Public-Sector Ready
              </div>
              <h3 className="mt-5 text-2xl lg:text-3xl font-semibold tracking-tight leading-tight">
                From municipal pilot to national rollout on one infrastructure layer.
              </h3>
              <p className="mt-4 text-white/80 leading-relaxed max-w-xl">
                FlyttGo partners with municipalities, ministries and transport authorities to operationalize
                dashboards, analytics pipelines and oversight platforms — deployable as individual modules or
                unified national environments.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/solutions#government"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-[#0A3A6B] font-semibold rounded-lg hover:bg-slate-100 dark:bg-slate-800/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A3A6B]"
                >
                  Explore Government Deployment Solutions
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-white/25 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A3A6B]"
                >
                  Book a deployment review
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GovernmentSection;
