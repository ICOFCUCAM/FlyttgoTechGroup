'use client';

import React from 'react';
import Link from 'next/link';
import {
  LayoutTemplate,
  Palette,
  ToggleRight,
  Rocket,
  Globe,
  CreditCard,
  Languages,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Truck,
  BarChart3,
  Building2,
} from 'lucide-react';

type LaunchPath = {
  icon: typeof Truck;
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
  href: string;
  accent: string;
};

const launchPaths: LaunchPath[] = [
  {
    icon: Truck,
    eyebrow: 'Logistics Marketplaces',
    title: 'Launch your own logistics platform',
    description:
      'Deploy a branded logistics marketplace with dispatch orchestration, driver coordination and multi-zone delivery infrastructure — configured to your region, brand and operating model.',
    bullets: ['Dispatch & driver apps', 'Multi-zone delivery', 'Tenant-scoped data'],
    href: '/platforms/flyttgo',
    accent: '#1E6FD9',
  },
  {
    icon: BarChart3,
    eyebrow: 'Analytics Platforms',
    title: 'Launch analytics dashboards',
    description:
      'Stand up branded analytics environments — operational, education or enterprise performance dashboards — backed by the FlyttGo analytics pipeline, geospatial intelligence and reporting engine.',
    bullets: ['Real-time pipelines', 'Geospatial analytics', 'Role-based access'],
    href: '/platforms/edupro',
    accent: '#0FB5A6',
  },
  {
    icon: Building2,
    eyebrow: 'Municipal Coordination',
    title: 'Launch municipal coordination systems',
    description:
      'Deliver branded municipal coordination platforms — permit workflows, citizen service orchestration and transport oversight — deployable as pilot, metro-scale or national environments.',
    bullets: ['Permit workflows', 'Citizen services', 'Cross-agency coordination'],
    href: '/platforms/govstack',
    accent: '#7C5CE6',
  },
];

const workflow = [
  { icon: LayoutTemplate, title: 'Select Platform Template', desc: 'Choose logistics, marketplace, analytics or municipal templates.' },
  { icon: Palette, title: 'Configure Branding', desc: 'Apply your brand identity, domain and regional settings.' },
  { icon: ToggleRight, title: 'Activate Modules', desc: 'Enable dispatch, analytics, telemetry and workflow modules.' },
  { icon: Rocket, title: 'Deploy Infrastructure', desc: 'Launch across cities and regions — in weeks, not years.' },
];

const customization = [
  { icon: Palette, title: 'Brand Identity' },
  { icon: Globe, title: 'Custom Domains' },
  { icon: CreditCard, title: 'Payment Providers' },
  { icon: Languages, title: 'Language & Currency' },
  { icon: ToggleRight, title: 'Module Activation' },
  { icon: Rocket, title: 'Regional Deployment' },
];

const WhiteLabelSection: React.FC = () => {
  return (
    <section
      id="whitelabel"
      aria-labelledby="whitelabel-heading"
      className="py-24 lg:py-32 bg-gradient-to-b from-[#F7FAFD] to-white"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <p className="inline-flex items-center gap-2 px-3 py-1 bg-[#0A3A6B]/5 rounded-full text-xs font-semibold text-[#0A3A6B] uppercase tracking-wider">
              <Rocket size={12} aria-hidden="true" />
              White-Label Deployment
            </p>
            <h2
              id="whitelabel-heading"
              className="mt-5 text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900 leading-tight"
            >
              Launch your own infrastructure platform on FlyttGo — branded, tenant-isolated, production-ready.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-lg text-slate-600 leading-relaxed">
              Organizations retain brand identity, domain control and platform ownership — while deploying on
              a modular, multi-tenant infrastructure layer built for rapid regional rollout.
            </p>
            <div className="mt-6">
              <Link
                href="/white-label"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#0A3A6B] text-white font-semibold rounded-lg hover:bg-[#0a2f57] transition-colors shadow-lg shadow-blue-900/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9] focus-visible:ring-offset-2"
              >
                Launch Your Platform
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {launchPaths.map((p) => {
            const Icon = p.icon;
            return (
              <article
                key={p.title}
                className="group relative p-7 lg:p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    aria-hidden="true"
                    style={{ backgroundColor: `${p.accent}12`, color: p.accent }}
                  >
                    <Icon size={22} strokeWidth={1.75} />
                  </div>
                  <ArrowUpRight
                    size={16}
                    className="text-slate-300 group-hover:text-slate-900 transition-colors"
                    aria-hidden="true"
                  />
                </div>
                <p className="mt-6 text-[11px] uppercase tracking-wider font-semibold" style={{ color: p.accent }}>
                  {p.eyebrow}
                </p>
                <h3 className="mt-1.5 text-xl font-semibold text-slate-900 tracking-tight leading-snug">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">{p.description}</p>
                <ul className="mt-6 space-y-2">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <CheckCircle2 size={16} className="flex-shrink-0 mt-0.5" style={{ color: p.accent }} aria-hidden="true" />
                      <span className="leading-snug">{b}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={p.href}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold group-hover:gap-2.5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9] focus-visible:ring-offset-2 rounded-sm"
                  style={{ color: p.accent }}
                >
                  Explore platform
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </article>
            );
          })}
        </div>

        <div className="mt-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 relative">
            {workflow.map((w, i) => {
              const Icon = w.icon;
              return (
                <div
                  key={w.title}
                  className="relative p-7 bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-lg hover:border-slate-300 transition-all"
                >
                  <div className="text-xs font-mono text-slate-400 font-semibold">STEP 0{i + 1}</div>
                  <div className="mt-4 w-12 h-12 rounded-xl bg-gradient-to-br from-[#EEF4FA] to-[#E0EBF7] flex items-center justify-center text-[#0A3A6B]" aria-hidden="true">
                    <Icon size={22} strokeWidth={1.75} />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-slate-900 tracking-tight">{w.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{w.desc}</p>
                  {i < workflow.length - 1 && (
                    <div className="hidden lg:flex absolute top-1/2 -right-3 -translate-y-1/2 w-6 h-6 rounded-full bg-white border border-slate-200/80 items-center justify-center z-10 shadow-sm" aria-hidden="true">
                      <ArrowRight size={12} className="text-slate-400" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-10 grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 p-8 lg:p-10 rounded-3xl bg-white border border-slate-200/80">
            <h3 className="text-xl font-semibold text-slate-900 tracking-tight">
              Configure every layer of your deployment
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Retain full brand identity, domain control and platform ownership across every module.
            </p>
            <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
              {customization.map((c) => {
                const Icon = c.icon;
                return (
                  <div
                    key={c.title}
                    className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-slate-300 transition-all"
                  >
                    <div className="w-9 h-9 rounded-lg bg-white border border-slate-200/80 flex items-center justify-center text-[#1E6FD9]" aria-hidden="true">
                      <Icon size={18} strokeWidth={1.75} />
                    </div>
                    <div className="mt-3 text-sm font-semibold text-slate-900">{c.title}</div>
                  </div>
                );
              })}
            </div>
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
                Infrastructure Ready
              </div>
              <h3 className="mt-5 text-2xl font-semibold tracking-tight leading-tight">
                Launch marketplace infrastructure in weeks — not years.
              </h3>
              <ul className="mt-6 space-y-3">
                {[
                  'Retain brand and domain identity',
                  'Independent tenant environments',
                  'Multi-tenant architecture included',
                  'Scales across cities and regions',
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2.5 text-sm text-white/90">
                    <CheckCircle2 size={18} className="text-emerald-300 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-8 flex flex-col gap-3">
                <Link
                  href="/white-label"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-[#0A3A6B] font-semibold rounded-lg hover:bg-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A3A6B]"
                >
                  Launch Your Platform
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
                <Link
                  href="/platforms"
                  className="w-full text-center px-6 py-3.5 border border-white/25 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A3A6B]"
                >
                  Explore Platform Modules
                </Link>
              </div>
            </div>
          </aside>
        </div>

        <div className="mt-10">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500 font-semibold">
            Deployment segments powered by FlyttGo infrastructure
          </p>
          <div className="mt-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              'Transport Operators',
              'Regional Logistics',
              'Municipal Governments',
              'Education Ministries',
              'Enterprise Fleets',
              'Marketplace Founders',
            ].map((s) => (
              <div
                key={s}
                className="p-4 bg-white border border-slate-200/80 rounded-xl text-center text-sm font-medium text-slate-700 hover:border-[#1E6FD9] hover:text-[#0A3A6B] transition-colors"
              >
                {s}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhiteLabelSection;
