'use client';

import React from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Line,
} from 'react-simple-maps';
import {
  Globe2,
  ArrowUpRight,
} from 'lucide-react';
import Link from '@/components/flytt/LocaleLink';

/**
 * HP.MAP — Homepage global deployment surface.
 *
 * Renders real continent geography from world-atlas TopoJSON via
 * react-simple-maps (geoEqualEarth projection). Pins, halos and
 * cross-region arcs are layered on top in the institutional colour
 * set against the navy hero canvas.
 *
 * The TopoJSON is fetched from CDN once per session (~120 KB cached)
 * and reused by /global-coverage too — so this component does not
 * add bundle weight beyond what the marketing site already pays.
 */

const GEO_URL =
  'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

type Tier = 'primary' | 'sovereign' | 'secondary' | 'rollout';

type Pin = {
  code: string;
  city: string;
  country: string;
  /** [lon, lat] — react-simple-maps convention. */
  coords: [number, number];
  tier: Tier;
  note: string;
};

const PINS: Pin[] = [
  // EU primary — HQ
  { code: 'NO-OS', city: 'Oslo',         country: 'Norway',  coords: [10.75, 59.91],  tier: 'primary',   note: 'HQ · primary EU' },
  { code: 'SE-ST', city: 'Stockholm',    country: 'Sweden',  coords: [18.07, 59.33],  tier: 'primary',   note: 'Nordic ops' },
  { code: 'UK-LN', city: 'London',       country: 'UK',      coords: [-0.13, 51.51],  tier: 'primary',   note: 'UK · Commonwealth' },
  { code: 'DE-FR', city: 'Frankfurt',    country: 'Germany', coords: [8.68, 50.11],   tier: 'primary',   note: 'Mainland EU SaaS' },
  { code: 'NL-AM', city: 'Amsterdam',    country: 'NL',      coords: [4.90, 52.37],   tier: 'secondary', note: 'EU edge' },

  // North America
  { code: 'US-W',  city: 'San Francisco', country: 'USA',    coords: [-122.4, 37.78], tier: 'primary',   note: 'NA-West SaaS' },
  { code: 'US-E',  city: 'N. Virginia',   country: 'USA',    coords: [-77.4, 39.0],   tier: 'primary',   note: 'NA-East SaaS' },
  { code: 'CA-E',  city: 'Toronto',       country: 'Canada', coords: [-79.4, 43.7],   tier: 'secondary', note: 'NA edge' },

  // Africa rollout (named explicitly in upgrade brief)
  { code: 'CM-YA', city: 'Yaoundé',      country: 'Cameroon', coords: [11.52, 3.85],  tier: 'rollout',   note: 'Central Africa rollout' },
  { code: 'UG-KP', city: 'Kampala',      country: 'Uganda',   coords: [32.59, 0.35],  tier: 'rollout',   note: 'East Africa rollout' },
  { code: 'ET-AA', city: 'Addis Ababa',  country: 'Ethiopia', coords: [38.74, 9.03],  tier: 'rollout',   note: 'Horn of Africa rollout' },
  { code: 'KE-NB', city: 'Nairobi',      country: 'Kenya',    coords: [36.82, -1.29], tier: 'secondary', note: 'East Africa hub' },
  { code: 'NG-LG', city: 'Lagos',        country: 'Nigeria',  coords: [3.38, 6.52],   tier: 'secondary', note: 'West Africa' },
  { code: 'ZA-JN', city: 'Johannesburg', country: 'ZA',       coords: [28.05, -26.2], tier: 'sovereign', note: 'Sovereign · ZA' },

  // MENA — sovereign deployments
  { code: 'AE-DX', city: 'Dubai',        country: 'UAE',      coords: [55.27, 25.20], tier: 'sovereign', note: 'Sovereign · GCC' },
  { code: 'SA-RD', city: 'Riyadh',       country: 'KSA',      coords: [46.67, 24.71], tier: 'sovereign', note: 'Sovereign · KSA' },
  { code: 'EG-CR', city: 'Cairo',        country: 'Egypt',    coords: [31.24, 30.04], tier: 'secondary', note: 'North Africa' },

  // Asia + Oceania
  { code: 'IN-MU', city: 'Mumbai',       country: 'India',    coords: [72.88, 19.08], tier: 'secondary', note: 'South Asia' },
  { code: 'SG',    city: 'Singapore',    country: 'SG',       coords: [103.82, 1.35], tier: 'primary',   note: 'APAC hub' },
  { code: 'JP-TY', city: 'Tokyo',        country: 'Japan',    coords: [139.69, 35.69], tier: 'secondary', note: 'East Asia' },
  { code: 'AU-SY', city: 'Sydney',       country: 'Australia', coords: [151.21, -33.87], tier: 'secondary', note: 'Oceania' },

  // South America
  { code: 'BR-SE', city: 'São Paulo',    country: 'Brazil',   coords: [-46.6, -23.55], tier: 'secondary', note: 'LatAm hub' },
];

const TIER_COLOUR: Record<Tier, { dot: string; label: string }> = {
  primary:   { dot: '#9ED0F9', label: 'Primary EU / NA' },
  sovereign: { dot: '#D6B575', label: 'Sovereign envelope' },
  secondary: { dot: '#0FB5A6', label: 'Secondary region' },
  rollout:   { dot: '#7C5CE6', label: 'Africa rollout' },
};

const ARC_PAIRS: Array<[string, string]> = [
  ['NO-OS', 'US-E'],
  ['NO-OS', 'SG'],
  ['NO-OS', 'KE-NB'],
  ['NO-OS', 'AE-DX'],
  ['NO-OS', 'ET-AA'],
  ['UK-LN', 'US-E'],
  ['DE-FR', 'AE-DX'],
  ['SG', 'AU-SY'],
  ['SG', 'JP-TY'],
  ['US-E', 'BR-SE'],
  ['KE-NB', 'UG-KP'],
  ['NG-LG', 'CM-YA'],
];

const PIN_INDEX = new Map(PINS.map((p) => [p.code, p]));

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
          <ComposableMap
            projection="geoEqualEarth"
            projectionConfig={{ scale: 175 }}
            width={980}
            height={500}
            style={{ width: '100%', height: 'auto' }}
            role="img"
            aria-label="FlyttGo global deployment map showing primary, sovereign, secondary and rollout regions"
          >
            <defs>
              {/* Subtle ocean-floor radial — gives the canvas depth */}
              <radialGradient id="hp-map-ocean" cx="50%" cy="50%" r="65%">
                <stop offset="0%" stopColor="#0F2D55" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#06152B" stopOpacity="0" />
              </radialGradient>
              {/* Land gradient — north warmer, south cooler */}
              <linearGradient id="hp-map-land" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#9ED0F9" stopOpacity="0.13" />
                <stop offset="100%" stopColor="#7AB7E6" stopOpacity="0.08" />
              </linearGradient>
              {/* Halo gradients per tier */}
              <radialGradient id="hp-halo-primary">
                <stop offset="0%" stopColor="#9ED0F9" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#9ED0F9" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="hp-halo-sovereign">
                <stop offset="0%" stopColor="#D6B575" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#D6B575" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="hp-halo-secondary">
                <stop offset="0%" stopColor="#0FB5A6" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#0FB5A6" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="hp-halo-rollout">
                <stop offset="0%" stopColor="#7C5CE6" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#7C5CE6" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Ocean depth radial */}
            <rect x="0" y="0" width="980" height="500" fill="url(#hp-map-ocean)" />

            {/* Equator + tropics graticule — subtle institutional reference */}
            <line x1="0" y1="250" x2="980" y2="250" stroke="#9ED0F9" strokeOpacity={0.07} strokeWidth={0.4} strokeDasharray="2 5" />
            <line x1="0" y1="186" x2="980" y2="186" stroke="#9ED0F9" strokeOpacity={0.04} strokeWidth={0.3} strokeDasharray="1 6" />
            <line x1="0" y1="314" x2="980" y2="314" stroke="#9ED0F9" strokeOpacity={0.04} strokeWidth={0.3} strokeDasharray="1 6" />

            {/* Continents from world-atlas TopoJSON, dark-themed */}
            <Geographies geography={GEO_URL}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="url(#hp-map-land)"
                    stroke="#9ED0F9"
                    strokeOpacity={0.30}
                    strokeWidth={0.45}
                    style={{
                      default: { outline: 'none' },
                      hover:   { outline: 'none', fillOpacity: 1 },
                      pressed: { outline: 'none' },
                    }}
                  />
                ))
              }
            </Geographies>

            {/* Cross-region orchestration arcs */}
            {ARC_PAIRS.map(([a, b], i) => {
              const from = PIN_INDEX.get(a);
              const to = PIN_INDEX.get(b);
              if (!from || !to) return null;
              const isPrimary = from.tier === 'primary' && to.tier === 'primary';
              return (
                <Line
                  key={`arc-${i}`}
                  from={from.coords}
                  to={to.coords}
                  stroke={isPrimary ? '#D6B575' : '#9ED0F9'}
                  strokeWidth={isPrimary ? 0.7 : 0.5}
                  strokeOpacity={isPrimary ? 0.65 : 0.30}
                  strokeDasharray={isPrimary ? '4 3' : '2 4'}
                  strokeLinecap="round"
                />
              );
            })}

            {/* Pins — halo · ring · dot · code label · city label */}
            {PINS.map((p) => {
              const colour = TIER_COLOUR[p.tier].dot;
              const beginDelay = `${((p.coords[0] + 180) / 200).toFixed(2)}s`;
              const labelOffsetY = p.coords[1] > 30 ? -8 : 11;
              return (
                <Marker key={p.code} coordinates={p.coords}>
                  <title>{`${p.code} · ${p.city} — ${p.note}`}</title>
                  {/* Animated halo */}
                  <circle r={3.4} fill={`url(#hp-halo-${p.tier})`}>
                    <animate
                      attributeName="r"
                      values="3.4;9;3.4"
                      dur="4s"
                      repeatCount="indefinite"
                      begin={beginDelay}
                    />
                    <animate
                      attributeName="opacity"
                      values="0.7;0;0.7"
                      dur="4s"
                      repeatCount="indefinite"
                      begin={beginDelay}
                    />
                  </circle>
                  {/* Outer ring */}
                  <circle r={2.6} fill="none" stroke={colour} strokeOpacity={0.55} strokeWidth={0.6} />
                  {/* Solid dot */}
                  <circle r={1.6} fill={colour} stroke="#06152B" strokeWidth={0.5} />
                  {/* City label — only shown for tier === primary or sovereign or rollout */}
                  {p.tier !== 'secondary' && (
                    <text
                      x={0}
                      y={labelOffsetY}
                      textAnchor="middle"
                      fontFamily="ui-sans-serif, Inter, system-ui, sans-serif"
                      fontSize={6.8}
                      fontWeight={500}
                      fill={colour}
                      fillOpacity={0.95}
                      style={{ pointerEvents: 'none' }}
                    >
                      {p.city}
                    </text>
                  )}
                </Marker>
              );
            })}
          </ComposableMap>

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
