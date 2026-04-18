import React from 'react';
import Image from 'next/image';
import { Cloud, Database, Cpu, Globe, Lock, Zap, Code2, Container } from 'lucide-react';
import { imagery } from '@/lib/imagery';

const stack = [
  { name: 'Next.js', role: 'Frontend Architecture', icon: Code2 },
  { name: 'NestJS', role: 'Service Orchestration', icon: Cpu },
  { name: 'PostgreSQL', role: 'Analytics Database', icon: Database },
  { name: 'PostGIS', role: 'Geospatial Intelligence', icon: Globe },
  { name: 'Redis', role: 'Real-time Messaging', icon: Zap },
  { name: 'Docker', role: 'Container Infrastructure', icon: Container },
  { name: 'Kubernetes', role: 'Orchestration Environment', icon: Cloud },
  { name: 'OAuth / RBAC', role: 'Role-based Access', icon: Lock },
];

const layers = [
  { title: 'Frontend Interface', items: ['Tenant theming', 'Responsive UI', 'SSR rendering'] },
  { title: 'Service Layer', items: ['Microservices', 'REST & gRPC', 'Event streams'] },
  { title: 'Analytics Engine', items: ['Real-time pipelines', 'Aggregations', 'Reporting'] },
  { title: 'Geospatial Layer', items: ['Routing', 'Map tiles', 'Coverage overlays'] },
  { title: 'Deployment Layer', items: ['Multi-tenant', 'Region routing', 'Module activation'] },
];

const TechnologySection: React.FC = () => {
  return (
    <section id="technology" className="py-24 lg:py-32 bg-gradient-to-b from-[#F5F8FC] to-white dark:from-slate-900 dark:to-slate-950 dark:from-slate-900 dark:to-slate-950">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-slate-800/60 rounded-full text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            Technology Architecture
          </div>
          <h2 className="mt-5 text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900 dark:text-white leading-tight">
            Cloud-Native Infrastructure Architecture Designed for Scalable Platform Deployment
          </h2>
          <p className="mt-5 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Platforms built on modular cloud-native architecture — supporting geospatial analytics, dispatch
            intelligence, multi-tenant environments and real-time operations visibility across every
            deployment context.
          </p>
        </div>

        <div className="mt-16 grid lg:grid-cols-12 gap-6">
          {/* Architecture diagram */}
          <div className="lg:col-span-7 p-8 rounded-3xl bg-[#0A1F3D] text-white relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
                backgroundSize: '32px 32px',
              }}
            />
            <div className="relative">
              <div className="text-xs uppercase tracking-[0.2em] text-white/60 font-semibold">
                Infrastructure Layers
              </div>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight">Platform Architecture</h3>

              <div className="mt-8 space-y-2.5">
                {layers.map((l, i) => (
                  <div
                    key={l.title}
                    className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#1E6FD9] to-[#0FB5A6] flex items-center justify-center text-xs font-mono font-bold">
                      L{i + 1}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold">{l.title}</div>
                      <div className="text-xs text-white/60 mt-0.5">{l.items.join(' · ')}</div>
                    </div>
                    <div className="hidden sm:flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[10px] text-white/60 font-mono">active</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-xs text-white/60">Uptime Target</div>
                  <div className="text-lg font-semibold mt-1">99.95%</div>
                </div>
                <div>
                  <div className="text-xs text-white/60">Multi-Region</div>
                  <div className="text-lg font-semibold mt-1">3 Continents</div>
                </div>
                <div>
                  <div className="text-xs text-white/60">Tenancy</div>
                  <div className="text-lg font-semibold mt-1">Isolated</div>
                </div>
              </div>
            </div>
          </div>

          {/* Tech stack grid */}
          <div className="lg:col-span-5 p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60">
            <div className="text-xs uppercase tracking-[0.2em] text-slate-500 font-semibold">
              Infrastructure Stack
            </div>
            <h3 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white tracking-tight">
              Built on proven open-source infrastructure
            </h3>

            <div className="mt-6 grid grid-cols-2 gap-3">
              {stack.map((s) => {
                const Icon = s.icon;
                return (
                  <div
                    key={s.name}
                    className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800/60 bg-slate-50 dark:bg-slate-900/60 hover:bg-white hover:border-slate-300 transition-colors"
                  >
                    <Icon size={18} className="text-[#0A3A6B]" strokeWidth={1.75} />
                    <div className="mt-3 text-sm font-semibold text-slate-900 dark:text-white">{s.name}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{s.role}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Dashboard showcase */}
        <div className="mt-10 rounded-3xl border border-slate-200/80 dark:border-slate-800/60 bg-white p-8 lg:p-10">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5">
              <div className="text-xs uppercase tracking-[0.2em] text-[#0FB5A6] font-semibold">
                Live Dashboard Preview
              </div>
              <h3 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white tracking-tight">
                Real dispatch environments, real analytics visibility
              </h3>
              <p className="mt-3 text-slate-600 dark:text-slate-400 leading-relaxed">
                Every deployment includes operational dashboards for dispatch intelligence, fleet heatmaps,
                territory analytics and institutional performance visibility.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {['Dispatch Engine', 'Fleet Heatmaps', 'Territory Analytics', 'Performance KPIs'].map((t) => (
                  <span
                    key={t}
                    className="text-xs font-medium px-3 py-1.5 bg-slate-100 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 rounded-md"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="lg:col-span-7">
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-slate-200/80 dark:border-slate-800/60 shadow-xl shadow-slate-900/5 bg-slate-100 dark:bg-slate-800/60">
                <Image
                  src={imagery.technology}
                  alt="Live operations dashboard showing dispatch, fleet heatmaps and territory analytics"
                  fill
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologySection;
