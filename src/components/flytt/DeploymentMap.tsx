import React from 'react';
import Image from 'next/image';

const nodes = [
  { city: 'Stockholm', x: 52, y: 28, active: true },
  { city: 'Oslo', x: 49, y: 26, active: true },
  { city: 'Berlin', x: 51, y: 35, active: true },
  { city: 'Amsterdam', x: 48, y: 34, active: true },
  { city: 'Paris', x: 46, y: 38, active: true },
  { city: 'Madrid', x: 43, y: 45, active: true },
  { city: 'Istanbul', x: 59, y: 44, active: true },
  { city: 'Dubai', x: 65, y: 55, active: true },
  { city: 'Riyadh', x: 62, y: 58, active: true },
  { city: 'Cairo', x: 57, y: 54, active: true },
  { city: 'Lagos', x: 48, y: 66, active: true },
  { city: 'Nairobi', x: 60, y: 70, active: true },
  { city: 'Cape Town', x: 55, y: 82, active: true },
];

const DeploymentMap: React.FC = () => {
  return (
    <section className="py-24 lg:py-32 bg-gradient-to-b from-white to-[#F5F8FC]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full text-xs font-semibold text-slate-700 uppercase tracking-wider">
            Global Deployment Readiness
          </div>
          <h2 className="mt-5 text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900 leading-tight">
            Infrastructure Ready for Europe, Africa and the Middle East
          </h2>
          <p className="mt-5 text-lg text-slate-600 leading-relaxed">
            FlyttGo modules are portable across three continents — supporting phased expansion from city-level
            deployments to national and regional rollouts.
          </p>
        </div>

        <div className="mt-14 relative rounded-3xl bg-white border border-slate-200 p-6 lg:p-10 overflow-hidden">
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-gradient-to-br from-[#F5F8FC] via-[#EEF4FA] to-[#E4EEF8]">
            {/* Background map image */}
            <Image
              src="https://d64gsuwffb70l.cloudfront.net/69e11d90fabede744a45a3ba_1776361148730_52effefc.png"
              alt=""
              role="presentation"
              fill
              sizes="(min-width: 1024px) 1024px, 100vw"
              className="absolute inset-0 object-cover opacity-60"
            />

            {/* SVG overlay with connections and nodes */}
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
              {/* connecting arcs between nodes */}
              {nodes.slice(0, -1).map((n, i) => {
                const next = nodes[i + 1];
                return (
                  <line
                    key={i}
                    x1={n.x}
                    y1={n.y}
                    x2={next.x}
                    y2={next.y}
                    stroke="#1E6FD9"
                    strokeWidth="0.15"
                    strokeDasharray="0.5 0.5"
                    opacity="0.4"
                  />
                );
              })}
              {nodes.map((n) => (
                <g key={n.city}>
                  <circle cx={n.x} cy={n.y} r="1.8" fill="#1E6FD9" opacity="0.15">
                    <animate attributeName="r" values="1.8;3.5;1.8" dur="3s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.15;0;0.15" dur="3s" repeatCount="indefinite" />
                  </circle>
                  <circle cx={n.x} cy={n.y} r="0.8" fill="#0A3A6B" />
                </g>
              ))}
            </svg>

            {/* Region labels */}
            <div className="absolute top-6 left-6 px-3 py-1.5 bg-white/95 backdrop-blur rounded-full text-xs font-semibold text-slate-700 shadow">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#1E6FD9] mr-2" />
              Europe · 6 Cities
            </div>
            <div className="absolute top-6 right-6 px-3 py-1.5 bg-white/95 backdrop-blur rounded-full text-xs font-semibold text-slate-700 shadow">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#0FB5A6] mr-2" />
              Middle East · 3 Hubs
            </div>
            <div className="absolute bottom-6 left-6 px-3 py-1.5 bg-white/95 backdrop-blur rounded-full text-xs font-semibold text-slate-700 shadow">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#7C5CE6] mr-2" />
              Africa · 4 Regions
            </div>
          </div>

          <div className="mt-8 grid md:grid-cols-3 gap-4">
            {[
              { r: 'Europe', desc: 'Nordic · Western · Central EU deployment corridors', color: '#1E6FD9' },
              { r: 'Middle East', desc: 'GCC and Levant infrastructure-ready environments', color: '#0FB5A6' },
              { r: 'Africa', desc: 'North · West · East regional deployment readiness', color: '#7C5CE6' },
            ].map((r) => (
              <div key={r.r} className="p-5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: r.color }} />
                  <span className="text-sm font-semibold text-slate-900">{r.r}</span>
                </div>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeploymentMap;
