import React from 'react';
import { Layers, Network, Gauge, GitBranch, Boxes, MapPin } from 'lucide-react';

const InvestorSection: React.FC = () => {
  const architecture = [
    { layer: 'Frontend Interface Layer', desc: 'Next.js · React · Tenant theming', color: '#1E6FD9' },
    { layer: 'Service Orchestration Layer', desc: 'NestJS · Microservices · REST & gRPC', color: '#0FB5A6' },
    { layer: 'Analytics Processing Layer', desc: 'Real-time pipelines · Streaming events', color: '#7C5CE6' },
    { layer: 'Geospatial Intelligence Layer', desc: 'PostGIS · Routing engines · Map overlays', color: '#E67E1E' },
    { layer: 'Multi-Tenant Deployment Layer', desc: 'Isolated environments · Configurable modules', color: '#0A3A6B' },
  ];

  const pathways = [
    { icon: Boxes, title: 'Module Reuse', desc: 'Dispatch, analytics, routing and telemetry modules reused across industry deployments.' },
    { icon: Network, title: 'Multi-Tenant Architecture', desc: 'Shared infrastructure layers with isolated tenant environments for parallel rollouts.' },
    { icon: GitBranch, title: 'Phased Expansion', desc: 'Incremental activation supports city → region → national deployment sequencing.' },
    { icon: Gauge, title: 'Deployment Economics', desc: 'Platform reuse reduces time-to-market across logistics, education and government.' },
  ];

  return (
    <section id="investors" className="py-24 lg:py-32 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-slate-800/60 rounded-full text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Platform Scale
            </div>
            <h2 className="mt-5 text-3xl md:text-4xl lg:text-[44px] font-semibold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
              Infrastructure Designed for Multi-Industry Platform Deployment at Scale
            </h2>
            <p className="mt-5 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              FlyttGo Technologies Group develops modular infrastructure platforms that enable logistics
              coordination, education intelligence, municipal dashboards and enterprise fleet analytics layers
              to be deployed across cities, regions and national networks using scalable multi-tenant
              architecture.
            </p>

            {/* Architecture stack diagram */}
            <div className="mt-8 space-y-2">
              {architecture.map((a, i) => (
                <div
                  key={a.layer}
                  className="relative p-4 rounded-xl border border-slate-200/80 dark:border-slate-800/60 bg-white flex items-center gap-4"
                  style={{ marginLeft: `${i * 8}px` }}
                >
                  <div className="w-1 h-10 rounded-full" style={{ backgroundColor: a.color }} />
                  <Layers size={16} className="text-slate-400" />
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-slate-900 dark:text-white">{a.layer}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{a.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid md:grid-cols-2 gap-5">
              {pathways.map((p) => {
                const Icon = p.icon;
                return (
                  <div
                    key={p.title}
                    className="p-7 bg-gradient-to-br from-slate-50 to-white rounded-2xl border border-slate-200/80 dark:border-slate-800/60 hover:shadow-lg hover:-translate-y-0.5 transition-all"
                  >
                    <div className="w-11 h-11 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 flex items-center justify-center text-[#0A3A6B]">
                      <Icon size={20} strokeWidth={1.75} />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white tracking-tight">{p.title}</h3>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{p.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* Deployment footprint */}
            <div className="mt-6 p-8 rounded-2xl bg-gradient-to-br from-[#0A1F3D] to-[#0A3A6B] text-white relative overflow-hidden">
              <div className="flex items-start justify-between gap-6 flex-wrap">
                <div>
                  <div className="text-xs uppercase tracking-[0.2em] text-white/60 font-semibold">
                    Deployment Footprint
                  </div>
                  <h3 className="mt-2 text-2xl font-semibold tracking-tight">
                    Infrastructure portable across 3 continents
                  </h3>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-slate-900/10 rounded-full text-xs font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Ready
                </div>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-4">
                {[
                  { region: 'Europe', cities: 'Nordic · EU', color: '#1E6FD9' },
                  { region: 'Middle East', cities: 'GCC · Levant', color: '#0FB5A6' },
                  { region: 'Africa', cities: 'North · West · East', color: '#7C5CE6' },
                ].map((r) => (
                  <div key={r.region} className="p-4 bg-white dark:bg-slate-900/5 border border-white/10 rounded-xl">
                    <MapPin size={16} style={{ color: r.color }} />
                    <div className="mt-3 text-sm font-semibold">{r.region}</div>
                    <div className="text-xs text-white/60 mt-0.5">{r.cities}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 text-xs text-white/50 font-mono">
                {`> infrastructure.deploy({ region: "eu-north-1" }) → environment ready`}
              </div>
            </div>

            {/* Cross-industry activation grid */}
            <div className="mt-6 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60">
              <div className="text-xs uppercase tracking-[0.2em] text-slate-500 font-semibold mb-4">
                Cross-industry platform activation
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {['Logistics Networks', 'Education Systems', 'Municipal Services', 'Enterprise Fleets', 'Marketplaces'].map(
                  (i) => (
                    <div
                      key={i}
                      className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 text-center"
                    >
                      {i}
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvestorSection;
