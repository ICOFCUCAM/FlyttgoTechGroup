'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Truck, GraduationCap, Building2, Store, Radar, ArrowUpRight, CheckCircle2, ArrowRight } from 'lucide-react';


const platforms = [
  {
    id: 'flyttgo',
    name: 'FlyttGo',
    subtitle: 'Logistics Infrastructure Platform',
    icon: Truck,
    color: '#1E6FD9',
    bg: 'bg-blue-50',
    desc: 'Deploy logistics coordination systems supporting dispatch intelligence, fleet routing optimization and multi-zone delivery orchestration across cities and regions.',
    capabilities: ['Driver coordination', 'Dispatch optimization', 'Multi-zone routing', 'Same-day deployment'],
  },
  {
    id: 'edupro',
    name: 'EduPro AI',
    subtitle: 'Education Intelligence Platform',
    icon: GraduationCap,
    color: '#0FB5A6',
    bg: 'bg-teal-50',
    desc: 'Deploy education analytics platforms supporting attendance monitoring, institutional performance visibility and national-scale education intelligence dashboards.',
    capabilities: ['Attendance analytics', 'Performance monitoring', 'Institution dashboards', 'Ministry reporting'],
  },
  {
    id: 'govstack',
    name: 'GovStack',
    subtitle: 'Municipal Infrastructure Platform',
    icon: Building2,
    color: '#7C5CE6',
    bg: 'bg-violet-50',
    desc: 'Deploy municipal service coordination platforms supporting permit workflows, transport analytics dashboards and citizen service orchestration.',
    capabilities: ['Permit workflows', 'Transport coordination', 'Service analytics', 'Citizen services'],
  },
  {
    id: 'marketstack',
    name: 'MarketStack',
    subtitle: 'Marketplace Deployment Engine',
    icon: Store,
    color: '#E67E1E',
    bg: 'bg-orange-50',
    desc: 'Deploy branded service marketplaces supporting vendor coordination, order routing infrastructure and workforce platforms without custom backend development.',
    capabilities: ['Multi-vendor marketplaces', 'Order orchestration', 'White-label deployment', 'Service ecosystems'],
  },
  {
    id: 'fleetstack',
    name: 'FleetStack',
    subtitle: 'Fleet Intelligence Platform',
    icon: Radar,
    color: '#0A3A6B',
    bg: 'bg-slate-100',
    desc: 'Deploy enterprise fleet analytics environments supporting vehicle telemetry tracking, route optimization intelligence and operations performance monitoring.',
    capabilities: ['Vehicle telemetry', 'Route optimization', 'Fleet performance', 'Operations dashboards'],
  },
];

const PlatformEcosystem: React.FC = () => {
  const [active, setActive] = useState('flyttgo');
  const current = platforms.find((p) => p.id === active) || platforms[0];

  return (
    <section id="platforms" className="relative py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full text-xs font-semibold text-slate-700 uppercase tracking-wider">
            <span className="w-1 h-1 rounded-full bg-[#1E6FD9]" />
            Platform Ecosystem
          </div>
          <h2 className="mt-5 text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900 leading-tight">
            A Modular Infrastructure Platform Ecosystem for Cities, Enterprises and Digital Marketplaces
          </h2>
          <p className="mt-5 text-lg text-slate-600 leading-relaxed">
            FlyttGo Technologies Group provides a unified infrastructure layer enabling organizations to deploy
            logistics coordination systems, education intelligence platforms, municipal service dashboards,
            marketplace ecosystems and enterprise fleet analytics environments using configurable platform modules.
          </p>
        </div>

        {/* Platform cards grid */}
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {platforms.map((p) => {
            const Icon = p.icon;
            const isActive = active === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setActive(p.id)}
                className={`group text-left p-7 rounded-2xl border transition-all duration-300 ${
                  isActive
                    ? 'bg-white border-slate-300 shadow-xl shadow-slate-900/5 -translate-y-1'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-lg hover:-translate-y-0.5'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div
                    className={`w-12 h-12 rounded-xl ${p.bg} flex items-center justify-center`}
                    style={{ color: p.color }}
                  >
                    <Icon size={22} strokeWidth={1.75} />
                  </div>
                  <ArrowUpRight
                    size={18}
                    className="text-slate-400 group-hover:text-slate-900 transition-colors"
                  />
                </div>
                <div className="mt-5">
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    {p.subtitle}
                  </div>
                  <h3 className="mt-1 text-xl font-semibold text-slate-900 tracking-tight">{p.name}</h3>
                </div>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed line-clamp-3">{p.desc}</p>

                <div className="mt-5 pt-5 border-t border-slate-100 flex flex-wrap gap-1.5">
                  {p.capabilities.slice(0, 2).map((c) => (
                    <span
                      key={c}
                      className="text-[11px] font-medium px-2 py-1 bg-slate-50 text-slate-600 rounded-md"
                    >
                      {c}
                    </span>
                  ))}
                  <span className="text-[11px] font-medium px-2 py-1 bg-slate-50 text-slate-500 rounded-md">
                    +{p.capabilities.length - 2} more
                  </span>
                </div>

                <Link
                  href={`/platforms/${p.id}`}
                  onClick={(e) => e.stopPropagation()}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold group-hover:gap-2.5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9] focus-visible:ring-offset-2 rounded-sm"
                  style={{ color: p.color }}
                >
                  Explore {p.name}
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </button>
            );
          })}


          {/* Orchestration tile */}
          <div className="p-7 rounded-2xl bg-gradient-to-br from-[#0A3A6B] to-[#1E6FD9] text-white flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="3" stroke="white" strokeWidth="1.75" />
                  <circle cx="12" cy="4" r="2" stroke="white" strokeWidth="1.75" />
                  <circle cx="12" cy="20" r="2" stroke="white" strokeWidth="1.75" />
                  <circle cx="4" cy="12" r="2" stroke="white" strokeWidth="1.75" />
                  <circle cx="20" cy="12" r="2" stroke="white" strokeWidth="1.75" />
                  <path d="M12 6V9M12 15V18M6 12H9M15 12H18" stroke="white" strokeWidth="1.75" />
                </svg>
              </div>
              <h3 className="mt-5 text-xl font-semibold tracking-tight">Ecosystem Orchestration</h3>
              <p className="mt-3 text-sm text-white/80 leading-relaxed">
                Platform modules operate independently or as unified multi-platform deployments — sharing
                data, analytics and deployment architecture.
              </p>
            </div>
            <div className="mt-5 pt-5 border-t border-white/15 text-xs text-white/70 font-medium uppercase tracking-wider">
              5 Platforms · 1 Infrastructure
            </div>
          </div>
        </div>

        {/* Active platform deep-view */}
        <div className="mt-10 rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-8 lg:p-12">
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-5">
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold"
                style={{ backgroundColor: current.bg === 'bg-slate-100' ? '#f1f5f9' : undefined, color: current.color }}
              >
                <current.icon size={14} />
                {current.subtitle}
              </div>
              <h3 className="mt-4 text-3xl font-semibold text-slate-900 tracking-tight">{current.name}</h3>
              <p className="mt-4 text-slate-600 leading-relaxed">{current.desc}</p>

              <div className="mt-6 space-y-2.5">
                {current.capabilities.map((c) => (
                  <div key={c} className="flex items-center gap-2.5 text-sm text-slate-700">
                    <CheckCircle2 size={16} style={{ color: current.color }} />
                    {c}
                  </div>
                ))}
              </div>

              <Link
                href={`/platforms/${current.id}`}
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-900 hover:gap-3 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9] focus-visible:ring-offset-2 rounded-sm"
              >
                View {current.name} platform page
                <ArrowUpRight size={16} aria-hidden="true" />
              </Link>

            </div>

            <div className="lg:col-span-7">
              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-xl shadow-slate-900/5 bg-white">
                <div className="flex items-center gap-1.5 px-4 py-3 border-b border-slate-200 bg-slate-50">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <div className="ml-3 text-xs text-slate-500 font-mono">
                    {current.id}.flyttgo.platform / dashboard
                  </div>
                </div>
                <div className="relative aspect-[16/10] w-full bg-slate-100">
                  <Image
                    src="https://d64gsuwffb70l.cloudfront.net/69e11d90fabede744a45a3ba_1776361106438_daf08b2d.png"
                    alt={`${current.name} dashboard preview`}
                    fill
                    sizes="(min-width: 1024px) 55vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatformEcosystem;