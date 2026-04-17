import React, { useState } from 'react';
import { Building2, Briefcase, Factory, Store, ArrowUpRight, CheckCircle2 } from 'lucide-react';

const tabs = [
  {
    id: 'government',
    label: 'Government & Municipal',
    icon: Building2,
    image: 'https://d64gsuwffb70l.cloudfront.net/69e11d90fabede744a45a3ba_1776361047212_157a0e34.jpg',
    headline: 'Infrastructure Platforms for Municipal and National Digital Service Environments',
    description:
      'Modular infrastructure enabling municipalities, regional authorities and national agencies to deploy analytics-enabled service coordination, transport oversight dashboards, education intelligence and citizen services.',
    capabilities: [
      'Transport coordination dashboards',
      'Permit workflow automation',
      'Education ministry analytics',
      'Smart-city service visibility',
      'Multi-level administrative deployment',
    ],
    segments: ['Municipal Governments', 'Regional Authorities', 'Transport Regulators', 'Education Ministries'],
  },
  {
    id: 'enterprise',
    label: 'Enterprise Logistics',
    icon: Factory,
    image: 'https://d64gsuwffb70l.cloudfront.net/69e11d90fabede744a45a3ba_1776361070291_5b36825e.png',
    headline: 'Enterprise Logistics Intelligence Infrastructure for Fleet and Operations Visibility',
    description:
      'Deploy analytics-enabled coordination environments supporting fleet telemetry monitoring, dispatch intelligence orchestration, multi-region routing optimization and operations performance visibility.',
    capabilities: [
      'Vehicle telemetry dashboards',
      'Real-time dispatch intelligence',
      'Multi-region routing analytics',
      'Operations performance indicators',
      'Fleet distribution heatmaps',
    ],
    segments: ['Transport Companies', 'Regional Delivery Operators', 'Moving Service Networks', 'Fleet-Based Providers'],
  },
  {
    id: 'startups',
    label: 'Platform Founders',
    icon: Briefcase,
    image: 'https://d64gsuwffb70l.cloudfront.net/69e11d90fabede744a45a3ba_1776361027671_eebffd68.jpg',
    headline: 'Launch Your Own Digital Platform Without Building Infrastructure From Scratch',
    description:
      'Founders, regional operators and emerging organizations deploy logistics coordination platforms, service marketplaces and analytics dashboards using accelerated deployment architecture.',
    capabilities: [
      'Delivery marketplace templates',
      'Workforce coordination platforms',
      'Service dispatch environments',
      'Custom branding & domains',
      'Phased regional expansion',
    ],
    segments: ['Regional Logistics Founders', 'Marketplace Operators', 'Delivery Platform Builders', 'Service Innovators'],
  },
  {
    id: 'marketplaces',
    label: 'Marketplace Operators',
    icon: Store,
    image: 'https://d64gsuwffb70l.cloudfront.net/69e11d90fabede744a45a3ba_1776361148730_52effefc.png',
    headline: 'Deploy Branded Service Marketplaces at City and Regional Scale',
    description:
      'Launch multi-vendor marketplaces supporting order routing, vendor coordination, workforce platforms and logistics-enabled digital service ecosystems using MarketStack infrastructure.',
    capabilities: [
      'Multi-vendor orchestration',
      'Order routing infrastructure',
      'Workforce coordination',
      'Vendor analytics dashboards',
      'White-label marketplace deployment',
    ],
    segments: ['Service Marketplaces', 'Workforce Platforms', 'Delivery Networks', 'Multi-Vendor Ecosystems'],
  },
];

const SolutionsSection: React.FC = () => {
  const [active, setActive] = useState('government');
  const current = tabs.find((t) => t.id === active) || tabs[0];

  return (
    <section id="government" className="py-24 lg:py-32 bg-gradient-to-b from-white to-[#F5F8FC]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full text-xs font-semibold text-slate-700 uppercase tracking-wider">
            Solutions by Segment
          </div>
          <h2 className="mt-5 text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900 leading-tight">
            Infrastructure for Governments, Enterprises, Founders and Marketplaces
          </h2>
          <p className="mt-5 text-lg text-slate-600 leading-relaxed">
            FlyttGo Technologies Group infrastructure operates across multiple industries simultaneously —
            supporting institutional deployments, commercial operations and emerging platform ecosystems.
          </p>
        </div>

        {/* Tabs */}
        <div className="mt-12 flex flex-wrap gap-2 border-b border-slate-200">
          {tabs.map((t) => {
            const Icon = t.icon;
            const isActive = active === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                className={`inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold transition-colors border-b-2 -mb-px ${
                  isActive
                    ? 'border-[#0A3A6B] text-[#0A3A6B]'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                <Icon size={16} />
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        <div id={current.id} className="mt-10 grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-slate-200 shadow-lg">
            <div className="relative aspect-[16/10]">
              <img src={current.image} alt={current.label} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/95 backdrop-blur flex items-center justify-center text-[#0A3A6B]">
                  <current.icon size={18} />
                </div>
                <div className="text-white">
                  <div className="text-[10px] font-semibold uppercase tracking-wider opacity-80">Deployment Scenario</div>
                  <div className="text-sm font-semibold">{current.label}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <h3 className="text-2xl lg:text-3xl font-semibold text-slate-900 tracking-tight leading-tight">
              {current.headline}
            </h3>
            <p className="mt-4 text-slate-600 leading-relaxed">{current.description}</p>

            <div className="mt-6 space-y-2.5">
              {current.capabilities.map((c) => (
                <div key={c} className="flex items-start gap-2.5 text-sm text-slate-700">
                  <CheckCircle2 size={16} className="text-[#0FB5A6] flex-shrink-0 mt-0.5" />
                  {c}
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-slate-200">
              <div className="text-xs uppercase tracking-[0.15em] text-slate-500 font-semibold mb-3">
                Target Deployment Segments
              </div>
              <div className="flex flex-wrap gap-2">
                {current.segments.map((s) => (
                  <span
                    key={s}
                    className="px-3 py-1.5 text-xs font-medium bg-white border border-slate-200 text-slate-700 rounded-md"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="mt-7 inline-flex items-center gap-2 px-5 py-3 bg-[#0A3A6B] text-white font-semibold rounded-lg hover:bg-[#0a2f57] transition-colors"
            >
              Explore Deployment Solutions
              <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* enterprise id anchor */}
      <div id="enterprise" className="h-0" />
    </section>
  );
};

export default SolutionsSection;
