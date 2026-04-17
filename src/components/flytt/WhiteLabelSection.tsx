import React from 'react';
import {
  LayoutTemplate,
  Palette,
  ToggleRight,
  Rocket,
  Globe,
  CreditCard,
  Languages,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

const workflow = [
  { icon: LayoutTemplate, title: 'Select Platform Template', desc: 'Choose from logistics, marketplace, education or municipal templates.' },
  { icon: Palette, title: 'Configure Branding', desc: 'Apply your brand identity, domain and regional settings.' },
  { icon: ToggleRight, title: 'Activate Modules', desc: 'Enable dispatch, analytics, telemetry and workflow modules.' },
  { icon: Rocket, title: 'Deploy Infrastructure', desc: 'Launch your platform across cities and regions in weeks.' },
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
    <section id="whitelabel" className="py-24 lg:py-32 bg-gradient-to-b from-[#F7FAFD] to-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0A3A6B]/5 rounded-full text-xs font-semibold text-[#0A3A6B] uppercase tracking-wider">
            White-Label Deployment
          </div>
          <h2 className="mt-5 text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900 leading-tight">
            Launch Your Own Platform Using FlyttGo Infrastructure
          </h2>
          <p className="mt-5 text-lg text-slate-600 leading-relaxed">
            FlyttGo Technologies Group enables organizations to deploy fully branded logistics platforms,
            service marketplaces, education intelligence dashboards and municipal coordination systems using
            modular infrastructure architecture designed for rapid deployment across cities and regions.
          </p>
        </div>

        {/* Workflow diagram */}
        <div className="mt-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 relative">
            {workflow.map((w, i) => {
              const Icon = w.icon;
              return (
                <div
                  key={i}
                  className="relative p-7 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-slate-300 transition-all group"
                >
                  <div className="text-xs font-mono text-slate-400 font-semibold">
                    STEP 0{i + 1}
                  </div>
                  <div className="mt-4 w-12 h-12 rounded-xl bg-gradient-to-br from-[#EEF4FA] to-[#E0EBF7] flex items-center justify-center text-[#0A3A6B]">
                    <Icon size={22} strokeWidth={1.75} />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-slate-900 tracking-tight">{w.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{w.desc}</p>
                  {i < workflow.length - 1 && (
                    <div className="hidden lg:flex absolute top-1/2 -right-3 -translate-y-1/2 w-6 h-6 rounded-full bg-white border border-slate-200 items-center justify-center z-10 shadow-sm">
                      <ArrowRight size={12} className="text-slate-400" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Customization + CTA panel */}
        <div className="mt-10 grid lg:grid-cols-12 gap-6">
          {/* Left: Customization grid */}
          <div className="lg:col-span-7 p-8 lg:p-10 rounded-3xl bg-white border border-slate-200">
            <h3 className="text-xl font-semibold text-slate-900 tracking-tight">
              Configure Every Layer of Your Deployment
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Organizations retain full brand identity, domain control and platform ownership.
            </p>
            <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
              {customization.map((c) => {
                const Icon = c.icon;
                return (
                  <div
                    key={c.title}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-slate-300 transition-all"
                  >
                    <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[#1E6FD9]">
                      <Icon size={18} strokeWidth={1.75} />
                    </div>
                    <div className="mt-3 text-sm font-semibold text-slate-900">{c.title}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: conversion CTA */}
          <div className="lg:col-span-5 p-8 lg:p-10 rounded-3xl bg-gradient-to-br from-[#0A3A6B] via-[#0E4687] to-[#1E6FD9] text-white relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: 'radial-gradient(circle at 20% 30%, white 1px, transparent 1px), radial-gradient(circle at 70% 70%, white 1px, transparent 1px)',
                backgroundSize: '40px 40px, 60px 60px',
              }}
            />
            <div className="relative">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-semibold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                Infrastructure Ready
              </div>
              <h3 className="mt-5 text-2xl font-semibold tracking-tight leading-tight">
                Launch marketplace infrastructure in weeks — not years.
              </h3>

              <div className="mt-6 space-y-3">
                {[
                  'Retain brand and domain identity',
                  'Independent platform environments',
                  'Multi-tenant architecture included',
                  'Scales across cities and regions',
                ].map((t) => (
                  <div key={t} className="flex items-start gap-2.5 text-sm text-white/90">
                    <CheckCircle2 size={18} className="text-emerald-300 flex-shrink-0 mt-0.5" />
                    {t}
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3">
                <button
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-[#0A3A6B] font-semibold rounded-lg hover:bg-slate-100 transition-colors"
                >
                  Start White-Label Deployment
                  <ArrowRight size={16} />
                </button>
                <button
                  onClick={() => document.getElementById('platforms')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full px-6 py-3.5 border border-white/25 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
                >
                  Explore Platform Modules
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Target segments */}
        <div className="mt-10">
          <div className="text-xs uppercase tracking-[0.2em] text-slate-500 font-semibold">
            Deployment segments powered by FlyttGo infrastructure
          </div>
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
                className="p-4 bg-white border border-slate-200 rounded-xl text-center text-sm font-medium text-slate-700 hover:border-[#1E6FD9] hover:text-[#0A3A6B] transition-colors"
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
