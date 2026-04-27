import React from 'react';
import Link from '@/components/flytt/LocaleLink';
import { Globe2, Compass, ArrowUpRight } from 'lucide-react';

type Region = {
  code: string;
  name: string;
  description: string;
  hubs: string[];
  accent: string;
  tint: string;
};

const regions: Region[] = [
  {
    code: 'EU',
    name: 'Europe',
    description:
      'Nordic-origin deployments scaled across the EU internal market — GDPR-aligned tenancy and localised operator environments.',
    hubs: ['Stockholm', 'Oslo', 'Berlin', 'Amsterdam', 'Paris', 'Madrid'],
    accent: '#1E6FD9',
    tint: 'from-blue-50 to-white',
  },
  {
    code: 'AF',
    name: 'Africa',
    description:
      'Regional deployments designed for multi-country rollouts, municipal coordination and workforce marketplaces across the continent.',
    hubs: ['Lagos', 'Nairobi', 'Cape Town', 'Accra', 'Casablanca'],
    accent: '#0FB5A6',
    tint: 'from-teal-50 to-white',
  },
  {
    code: 'MENA',
    name: 'Middle East',
    description:
      'Sovereign-ready deployments for government service layers, transport authorities and regional logistics operators across MENA markets.',
    hubs: ['Dubai', 'Riyadh', 'Doha', 'Amman', 'Cairo'],
    accent: '#7C5CE6',
    tint: 'from-violet-50 to-white',
  },
];

// Simplified city hub coordinates on a 1000x520 viewbox.
const hubDots: { x: number; y: number; r: number; color: string }[] = [
  // Europe
  { x: 505, y: 180, r: 3.5, color: '#1E6FD9' },
  { x: 495, y: 165, r: 3, color: '#1E6FD9' },
  { x: 520, y: 195, r: 3, color: '#1E6FD9' },
  { x: 485, y: 200, r: 2.5, color: '#1E6FD9' },
  { x: 475, y: 215, r: 3, color: '#1E6FD9' },
  { x: 455, y: 240, r: 3, color: '#1E6FD9' },
  // Africa
  { x: 515, y: 330, r: 3, color: '#0FB5A6' },
  { x: 560, y: 335, r: 2.5, color: '#0FB5A6' },
  { x: 555, y: 390, r: 3, color: '#0FB5A6' },
  { x: 490, y: 310, r: 2.5, color: '#0FB5A6' },
  // MENA
  { x: 620, y: 245, r: 3, color: '#7C5CE6' },
  { x: 600, y: 265, r: 3, color: '#7C5CE6' },
  { x: 625, y: 270, r: 2.5, color: '#7C5CE6' },
  { x: 585, y: 255, r: 2.5, color: '#7C5CE6' },
];

const MultiRegion: React.FC = () => {
  return (
    <section
      id="regions"
      aria-labelledby="multi-region-heading"
      className="relative py-28 lg:py-36 bg-gradient-to-b from-white via-[#F7FAFD] to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-full pointer-events-none opacity-[0.22]"
        style={{
          maskImage: 'radial-gradient(ellipse at center, black 45%, transparent 80%)',
        }}
      >
        <svg
          viewBox="0 0 1000 520"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 w-full h-full"
        >
          <defs>
            <pattern id="dotgrid" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.9" fill="#cbd5e1" />
            </pattern>
          </defs>
          <rect x="0" y="0" width="1000" height="520" fill="url(#dotgrid)" />
          {hubDots.map((d, i) => (
            <g key={i}>
              <circle cx={d.x} cy={d.y} r={d.r * 2.6} fill={d.color} opacity="0.18" />
              <circle cx={d.x} cy={d.y} r={d.r} fill={d.color} />
            </g>
          ))}
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 items-end motion-safe:animate-fade-up">
          <div className="lg:col-span-7">
            <p className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-slate-800/60 rounded-full text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              <Globe2 size={12} aria-hidden="true" />
              Multi-Region Capability
            </p>
            <h2
              id="multi-region-heading"
              className="mt-6 text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-slate-900 dark:text-white leading-[1.05]"
            >
              Multi-Region{' '}
              <span className="text-[#0A3A6B]">Deployment Architecture</span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-lg lg:text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
              A single infrastructure layer with tenant-scoped isolation, regional data residency
              options and country-level rollout templates — ready to deploy across Europe, Africa
              and the Middle East.
            </p>
          </div>
        </div>

        <div className="mt-16 grid lg:grid-cols-3 gap-5">
          {regions.map((r) => (
            <article
              key={r.code}
              className={`group relative p-7 lg:p-8 rounded-3xl bg-gradient-to-br ${r.tint} border border-slate-200/80 dark:border-slate-800/60 hover:shadow-xl hover:-translate-y-0.5 motion-safe:transition-all`}
            >
              <div className="flex items-center justify-between">
                <div
                  className="text-xs font-mono font-semibold tracking-[0.2em] uppercase"
                  style={{ color: r.accent }}
                >
                  {r.code}
                </div>
                <Compass size={16} className="text-slate-400" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-2xl lg:text-3xl font-semibold text-slate-900 dark:text-white tracking-tight">
                {r.name}
              </h3>
              <p className="mt-3 text-sm lg:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                {r.description}
              </p>
              <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${r.name} deployment hubs`}>
                {r.hubs.map((h) => (
                  <li
                    key={h}
                    className="inline-flex items-center px-2.5 py-1 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 rounded-md text-xs font-medium text-slate-700 dark:text-slate-300 shadow-sm"
                  >
                    {h}
                  </li>
                ))}
              </ul>
              <div className="mt-7 pt-5 border-t border-slate-200/70 dark:border-slate-800/60 flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">
                  Tenant-scoped · Data-resident
                </span>
                <span
                  className="inline-flex items-center gap-1.5 text-xs font-semibold"
                  style={{ color: r.accent }}
                >
                  <span className="w-1.5 h-1.5 rounded-full motion-safe:animate-pulse" style={{ backgroundColor: r.accent }} aria-hidden="true" />
                  Active
                </span>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/industries"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-white border border-slate-200/80 dark:border-slate-800/60 text-slate-900 dark:text-white font-semibold rounded-lg hover:bg-slate-50 dark:bg-slate-900/60 hover:border-slate-300 motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9] focus-visible:ring-offset-2"
          >
            See deployment map &amp; industries
            <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MultiRegion;
