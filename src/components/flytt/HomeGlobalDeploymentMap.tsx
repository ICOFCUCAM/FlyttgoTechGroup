import {
  Globe2,
  ArrowUpRight,
} from 'lucide-react';
import Link from '@/components/flytt/LocaleLink';

/**
 * Pure-SVG global deployment surface for the homepage.
 *
 * Equirectangular projection (lon/lat → x/y):
 *   viewBox: 1000 × 500
 *   x = (lon + 180) × 1000 / 360
 *   y = (90 − lat) × 500 / 180
 *
 * Server-rendered. No external map library, no CDN fetch, no client
 * JS. Continent outlines are intentionally abstract — institutional
 * infrastructure maps (Stripe Atlas, AWS regions) communicate
 * presence through markers, not cartographic precision.
 */

type Tier = 'primary' | 'sovereign' | 'secondary' | 'rollout';

type Pin = {
  city: string;
  country: string;
  lon: number;
  lat: number;
  tier: Tier;
  note: string;
};

const PINS: Pin[] = [
  // EU primary — HQ
  { city: 'Oslo',         country: 'Norway',  lon: 10.75,  lat: 59.91, tier: 'primary',   note: 'HQ · primary EU' },
  { city: 'Stockholm',    country: 'Sweden',  lon: 18.07,  lat: 59.33, tier: 'primary',   note: 'Nordic ops' },
  { city: 'London',       country: 'UK',      lon: -0.13,  lat: 51.51, tier: 'primary',   note: 'UK · Commonwealth' },
  { city: 'Frankfurt',    country: 'Germany', lon: 8.68,   lat: 50.11, tier: 'primary',   note: 'Mainland EU SaaS' },
  { city: 'Amsterdam',    country: 'NL',      lon: 4.90,   lat: 52.37, tier: 'secondary', note: 'EU edge' },

  // North America — explicit US SaaS plane
  { city: 'San Francisco', country: 'USA',    lon: -122.4, lat: 37.78, tier: 'primary',   note: 'NA-West SaaS' },
  { city: 'N. Virginia',   country: 'USA',    lon: -77.4,  lat: 39.0,  tier: 'primary',   note: 'NA-East SaaS' },
  { city: 'Toronto',       country: 'Canada', lon: -79.4,  lat: 43.7,  tier: 'secondary', note: 'NA edge' },

  // Africa rollout — explicitly named in brief
  { city: 'Yaoundé',      country: 'Cameroon', lon: 11.52,  lat: 3.85,  tier: 'rollout',   note: 'Central Africa rollout' },
  { city: 'Kampala',      country: 'Uganda',   lon: 32.59,  lat: 0.35,  tier: 'rollout',   note: 'East Africa rollout' },
  { city: 'Addis Ababa',  country: 'Ethiopia', lon: 38.74,  lat: 9.03,  tier: 'rollout',   note: 'Horn of Africa rollout' },
  { city: 'Nairobi',      country: 'Kenya',    lon: 36.82,  lat: -1.29, tier: 'secondary', note: 'East Africa hub' },
  { city: 'Lagos',        country: 'Nigeria',  lon: 3.38,   lat: 6.52,  tier: 'secondary', note: 'West Africa' },
  { city: 'Johannesburg', country: 'ZA',       lon: 28.05,  lat: -26.2, tier: 'sovereign', note: 'Sovereign · ZA' },

  // MENA — sovereign deployments
  { city: 'Dubai',        country: 'UAE',      lon: 55.27,  lat: 25.20, tier: 'sovereign', note: 'Sovereign · GCC' },
  { city: 'Riyadh',       country: 'KSA',      lon: 46.67,  lat: 24.71, tier: 'sovereign', note: 'Sovereign · KSA' },
  { city: 'Cairo',        country: 'Egypt',    lon: 31.24,  lat: 30.04, tier: 'secondary', note: 'North Africa' },

  // Asia + Oceania
  { city: 'Mumbai',       country: 'India',    lon: 72.88,  lat: 19.08, tier: 'secondary', note: 'South Asia' },
  { city: 'Singapore',    country: 'SG',       lon: 103.82, lat: 1.35,  tier: 'primary',   note: 'APAC hub' },
  { city: 'Tokyo',        country: 'Japan',    lon: 139.69, lat: 35.69, tier: 'secondary', note: 'East Asia' },
  { city: 'Sydney',       country: 'Australia', lon: 151.21, lat: -33.87, tier: 'secondary', note: 'Oceania' },

  // South America
  { city: 'São Paulo',    country: 'Brazil',   lon: -46.6,  lat: -23.55, tier: 'secondary', note: 'LatAm hub' },
];

// Highly abstracted continent outlines — equirectangular path strings.
// Hand-tuned to read as 'Earth' without claiming cartographic precision.
const CONTINENTS: { name: string; d: string }[] = [
  // North America
  {
    name: 'North America',
    d: 'M 165 95 L 215 80 L 270 90 L 305 110 L 320 145 L 305 175 L 280 200 L 245 220 L 220 230 L 200 220 L 175 195 L 160 165 L 150 130 Z',
  },
  // South America
  {
    name: 'South America',
    d: 'M 270 245 L 305 240 L 320 260 L 325 290 L 320 325 L 305 360 L 290 385 L 280 390 L 275 370 L 270 335 L 268 305 L 268 275 Z',
  },
  // Europe
  {
    name: 'Europe',
    d: 'M 470 95 L 510 90 L 540 100 L 555 115 L 545 135 L 525 150 L 500 155 L 480 145 L 465 125 Z',
  },
  // Africa
  {
    name: 'Africa',
    d: 'M 480 180 L 535 170 L 570 180 L 590 210 L 585 245 L 570 275 L 545 300 L 525 320 L 510 325 L 495 310 L 485 285 L 478 250 L 475 215 Z',
  },
  // Asia
  {
    name: 'Asia',
    d: 'M 555 90 L 620 80 L 700 85 L 780 95 L 830 115 L 855 145 L 845 175 L 815 195 L 770 200 L 720 195 L 670 180 L 625 165 L 595 145 L 575 120 Z',
  },
  // South-East Asia
  {
    name: 'SE Asia',
    d: 'M 770 200 L 805 205 L 830 215 L 825 235 L 805 245 L 780 240 L 765 225 Z',
  },
  // Oceania
  {
    name: 'Oceania',
    d: 'M 815 290 L 870 285 L 900 295 L 905 320 L 885 335 L 850 335 L 820 320 L 810 305 Z',
  },
];

// Cross-region orchestration arcs — illustrative, not literal.
const ARCS: { from: [number, number]; to: [number, number] }[] = [
  // Oslo HQ → US-East
  { from: [10.75, 59.91],  to: [-77.4, 39.0]  },
  // Oslo HQ → Singapore APAC
  { from: [10.75, 59.91],  to: [103.82, 1.35] },
  // Oslo HQ → Africa hub (Nairobi)
  { from: [10.75, 59.91],  to: [36.82, -1.29] },
  // Oslo HQ → MENA (Dubai)
  { from: [10.75, 59.91],  to: [55.27, 25.20] },
  // US-East → São Paulo
  { from: [-77.4, 39.0],   to: [-46.6, -23.55] },
];

const TIER_COLOUR: Record<Tier, { dot: string; halo: string; label: string }> = {
  primary:   { dot: '#9ED0F9', halo: 'rgba(158, 208, 249, 0.35)', label: 'Primary EU / NA' },
  sovereign: { dot: '#D6B575', halo: 'rgba(214, 181, 117, 0.35)', label: 'Sovereign envelope' },
  secondary: { dot: '#0FB5A6', halo: 'rgba(15, 181, 166, 0.35)',  label: 'Secondary region' },
  rollout:   { dot: '#7C5CE6', halo: 'rgba(124, 92, 230, 0.35)',  label: 'Africa rollout' },
};

const project = (lon: number, lat: number): [number, number] => [
  ((lon + 180) * 1000) / 360,
  ((90 - lat) * 500) / 180,
];

// Cubic-Bezier arc projecting through a point above the great-circle midpoint.
const arcPath = (from: [number, number], to: [number, number]): string => {
  const [x1, y1] = project(from[0], from[1]);
  const [x2, y2] = project(to[0], to[1]);
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  // Curve perpendicular to the segment, lifted by ~12 % of its length.
  const nx = -dy / len;
  const ny = dx / len;
  const lift = Math.min(60, len * 0.18);
  const cx = mx + nx * lift;
  const cy = my + ny * lift - 8;
  return `M ${x1.toFixed(1)} ${y1.toFixed(1)} Q ${cx.toFixed(1)} ${cy.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`;
};

export default function HomeGlobalDeploymentMap() {
  return (
    <section
      id="hp-map"
      aria-labelledby="hp-map-heading"
      className="relative bg-[#0A1F3D] text-white py-24 lg:py-28 border-t border-white/[0.08] overflow-hidden"
    >
      {/* Ambient gradient mesh */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            'radial-gradient(900px 500px at 18% 20%, rgba(30,111,217,0.30), transparent 60%),' +
            'radial-gradient(700px 400px at 85% 70%, rgba(15,181,166,0.18), transparent 60%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-white/55">
          <span className="text-[#9ED0F9] font-semibold">HP.MAP</span>
          <span aria-hidden="true" className="flex-1 h-px bg-white/10 max-w-[200px]" />
          <span>Global deployment surface</span>
        </div>

        <h2
          id="hp-map-heading"
          className="mt-6 max-w-3xl font-serif text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-white leading-[1.05]"
        >
          One platform substrate,{' '}
          <em className="not-italic font-serif italic font-normal text-[#D6B575]">
            deployed across four continents.
          </em>
        </h2>
        <p className="mt-4 max-w-3xl text-base text-white/70 leading-[1.65]">
          Oslo headquarters, primary EU and US zones, sovereign envelopes
          across MENA and Southern Africa, active rollout across Cameroon,
          Uganda and Ethiopia. The same orchestration core operates under
          every deployment — what changes is which substrate runs the
          workload and who holds the keys.
        </p>

        <div className="relative mt-12 rounded-3xl bg-[#06152B] border border-white/[0.08] p-4 lg:p-6 shadow-[0_30px_120px_-40px_rgba(0,0,0,0.6)]">
          <svg
            viewBox="0 0 1000 500"
            preserveAspectRatio="xMidYMid meet"
            role="img"
            aria-label="FlyttGo global deployment map showing primary, sovereign, secondary and rollout regions"
            className="w-full h-auto"
          >
            <defs>
              {/* Graticule pattern */}
              <pattern id="hp-map-grid" x="0" y="0" width="55.55" height="55.55" patternUnits="userSpaceOnUse">
                <path d="M 55.55 0 L 0 0 0 55.55" fill="none" stroke="rgba(158, 208, 249, 0.06)" strokeWidth="0.5" />
              </pattern>
              {/* Halo gradient for primary pins */}
              <radialGradient id="hp-pin-halo-primary">
                <stop offset="0%" stopColor="rgba(158,208,249,0.55)" />
                <stop offset="100%" stopColor="rgba(158,208,249,0)" />
              </radialGradient>
              <radialGradient id="hp-pin-halo-sovereign">
                <stop offset="0%" stopColor="rgba(214,181,117,0.50)" />
                <stop offset="100%" stopColor="rgba(214,181,117,0)" />
              </radialGradient>
              <radialGradient id="hp-pin-halo-secondary">
                <stop offset="0%" stopColor="rgba(15,181,166,0.45)" />
                <stop offset="100%" stopColor="rgba(15,181,166,0)" />
              </radialGradient>
              <radialGradient id="hp-pin-halo-rollout">
                <stop offset="0%" stopColor="rgba(124,92,230,0.50)" />
                <stop offset="100%" stopColor="rgba(124,92,230,0)" />
              </radialGradient>
            </defs>

            <rect x="0" y="0" width="1000" height="500" fill="url(#hp-map-grid)" />

            {/* Equator + prime meridian */}
            <line x1="0" y1="250" x2="1000" y2="250" stroke="rgba(158, 208, 249, 0.10)" strokeWidth="0.5" strokeDasharray="2 4" />
            <line x1="500" y1="0" x2="500" y2="500" stroke="rgba(158, 208, 249, 0.10)" strokeWidth="0.5" strokeDasharray="2 4" />

            {/* Continents */}
            <g aria-hidden="true">
              {CONTINENTS.map((c) => (
                <path
                  key={c.name}
                  d={c.d}
                  fill="rgba(158, 208, 249, 0.07)"
                  stroke="rgba(158, 208, 249, 0.18)"
                  strokeWidth="0.7"
                  strokeLinejoin="round"
                />
              ))}
            </g>

            {/* Cross-region arcs */}
            <g aria-hidden="true">
              {ARCS.map((a, i) => (
                <path
                  key={`${i}`}
                  d={arcPath(a.from, a.to)}
                  fill="none"
                  stroke="rgba(214, 181, 117, 0.55)"
                  strokeWidth="0.8"
                  strokeDasharray="3 3"
                  strokeLinecap="round"
                />
              ))}
            </g>

            {/* Pins */}
            <g>
              {PINS.map((p) => {
                const [x, y] = project(p.lon, p.lat);
                const colour = TIER_COLOUR[p.tier];
                return (
                  <g key={`${p.city}-${p.country}`}>
                    <circle
                      cx={x}
                      cy={y}
                      r="11"
                      fill={`url(#hp-pin-halo-${p.tier})`}
                    />
                    <circle
                      cx={x}
                      cy={y}
                      r="3.4"
                      fill={colour.dot}
                      stroke="rgba(10, 31, 61, 0.85)"
                      strokeWidth="0.8"
                    >
                      <title>{`${p.city}, ${p.country} — ${p.note}`}</title>
                    </circle>
                  </g>
                );
              })}
            </g>
          </svg>

          {/* Legend strip */}
          <ul className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-x-5 gap-y-2 px-2 pb-1 font-mono text-[10px] uppercase tracking-[0.16em] text-white/55">
            {(['primary', 'sovereign', 'secondary', 'rollout'] as Tier[]).map((t) => (
              <li key={t} className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: TIER_COLOUR[t].dot }}
                />
                {TIER_COLOUR[t].label}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Link
            href="/global-coverage"
            className="group inline-flex items-center gap-2 px-6 py-3 bg-white text-[#0A3A6B] text-sm font-semibold rounded-lg hover:bg-slate-100 motion-safe:transition-colors"
          >
            <Globe2 size={14} aria-hidden="true" />
            Open global coverage · GC.00
            <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
          <Link
            href="/sovereign"
            className="group inline-flex items-center gap-2 px-6 py-3 bg-white/[0.06] border border-white/15 text-white text-sm font-semibold rounded-lg hover:bg-white/[0.10] hover:border-white/25 motion-safe:transition-colors"
          >
            Sovereign envelopes · SV.00
            <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/45">
            EU · NA · LatAm · MENA · Africa · APAC · Oceania
          </span>
        </div>
      </div>
    </section>
  );
}
