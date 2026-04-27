'use client';

import React from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Line,
} from 'react-simple-maps';

/**
 * WorldDeploymentMap — real TopoJSON world map.
 *
 * Switched from handcrafted continent silhouettes to
 * `react-simple-maps` + `world-atlas` 110m TopoJSON. Country borders,
 * landmass shapes and lat/lon projection all come from real geo
 * data; FlyttGo deployment pins are layered on top with per-tier
 * accent colours and animated halos. Cross-region arcs use d3-geo
 * great-circle interpolation via the <Line/> primitive.
 *
 * The TopoJSON is fetched from the world-atlas CDN at render time
 * (~120 KB cached); rendering is fully client-side, no bundle bloat.
 */

const GEO_URL =
  'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

type Tier = 'primary' | 'secondary' | 'sovereign';

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
  // North America — explicit US deployment plane
  { code: 'US-W',  city: 'San Francisco',     country: 'USA',    coords: [-122.4, 37.78], tier: 'primary',   note: 'SaaS · customer-cloud west' },
  { code: 'US-NW', city: 'Seattle',           country: 'USA',    coords: [-122.33, 47.6], tier: 'primary',   note: 'NA-West · enterprise SaaS' },
  { code: 'US-MW', city: 'Chicago',           country: 'USA',    coords: [-87.65, 41.88], tier: 'secondary', note: 'NA-Central · enterprise edge' },
  { code: 'US-NE', city: 'Boston',            country: 'USA',    coords: [-71.06, 42.36], tier: 'primary',   note: 'NA-East · enterprise SaaS' },
  { code: 'US-E',  city: 'Northern Virginia', country: 'USA',    coords: [-77.4, 39.0],   tier: 'primary',   note: 'SaaS · customer-cloud east' },
  { code: 'US-S',  city: 'Atlanta',           country: 'USA',    coords: [-84.39, 33.75], tier: 'secondary', note: 'NA-South · enterprise edge' },
  { code: 'US-SC', city: 'Dallas',            country: 'USA',    coords: [-96.8, 32.78],  tier: 'secondary', note: 'NA-South-Central · IaaS' },
  { code: 'US-SE', city: 'Miami',             country: 'USA',    coords: [-80.19, 25.76], tier: 'secondary', note: 'LatAm gateway · enterprise' },
  { code: 'CA-E',  city: 'Toronto',           country: 'Canada', coords: [-79.4, 43.7],   tier: 'secondary', note: 'Edge presence' },

  // South America
  { code: 'BR-SE', city: 'São Paulo', country: 'Brazil', coords: [-46.6, -23.55], tier: 'secondary', note: 'LatAm hub' },

  // Europe
  { code: 'NO-OS', city: 'Oslo',      country: 'Norway',         coords: [10.75, 59.91], tier: 'primary',   note: 'HQ + primary EU' },
  { code: 'SE-ST', city: 'Stockholm', country: 'Sweden',         coords: [18.07, 59.33], tier: 'primary',   note: 'Nordic ops' },
  { code: 'UK-LN', city: 'London',    country: 'United Kingdom', coords: [-0.13, 51.51], tier: 'primary',   note: 'UK + Commonwealth' },
  { code: 'DE-FR', city: 'Frankfurt', country: 'Germany',        coords: [8.68, 50.11],  tier: 'primary',   note: 'Mainland EU' },
  { code: 'NL-AM', city: 'Amsterdam', country: 'Netherlands',    coords: [4.9, 52.37],   tier: 'secondary', note: 'EU edge' },

  // Africa
  { code: 'KE-NB', city: 'Nairobi',      country: 'Kenya',         coords: [36.82, -1.29], tier: 'secondary', note: 'East Africa hub' },
  { code: 'ZA-JN', city: 'Johannesburg', country: 'South Africa',  coords: [28.05, -26.2], tier: 'sovereign', note: 'Sovereign · ZA' },
  { code: 'NG-LG', city: 'Lagos',        country: 'Nigeria',       coords: [3.38, 6.52],   tier: 'secondary', note: 'West Africa' },
  { code: 'CM-YA', city: 'Yaoundé',      country: 'Cameroon',      coords: [11.52, 3.85],  tier: 'secondary', note: 'Central Africa rollout' },
  { code: 'UG-KP', city: 'Kampala',      country: 'Uganda',        coords: [32.59, 0.35],  tier: 'secondary', note: 'East Africa rollout' },
  { code: 'ET-AA', city: 'Addis Ababa',  country: 'Ethiopia',      coords: [38.74, 9.03],  tier: 'secondary', note: 'Horn of Africa rollout' },

  // MENA
  { code: 'AE-DX', city: 'Dubai',  country: 'United Arab Emirates', coords: [55.27, 25.2],  tier: 'sovereign', note: 'Sovereign · GCC' },
  { code: 'SA-RD', city: 'Riyadh', country: 'Saudi Arabia',         coords: [46.67, 24.71], tier: 'sovereign', note: 'Sovereign · KSA' },
  { code: 'EG-CR', city: 'Cairo',  country: 'Egypt',                coords: [31.24, 30.04], tier: 'secondary', note: 'North Africa' },

  // Asia + Oceania
  { code: 'IN-MU', city: 'Mumbai',    country: 'India',     coords: [72.88, 19.08],  tier: 'secondary', note: 'South Asia' },
  { code: 'SG',    city: 'Singapore', country: 'Singapore', coords: [103.82, 1.35],  tier: 'primary',   note: 'APAC hub' },
  { code: 'JP-TY', city: 'Tokyo',     country: 'Japan',     coords: [139.69, 35.69], tier: 'secondary', note: 'East Asia' },
  { code: 'AU-SY', city: 'Sydney',    country: 'Australia', coords: [151.21, -33.87], tier: 'secondary', note: 'Oceania' },
];

const TIER_ACCENT: Record<Tier, string> = {
  primary: '#1E6FD9',
  secondary: '#0FB5A6',
  sovereign: '#7C5CE6',
};

const ARCS: Array<[string, string]> = [
  ['NO-OS', 'US-E'],
  ['NO-OS', 'UK-LN'],
  ['UK-LN', 'US-E'],
  ['DE-FR', 'AE-DX'],
  ['DE-FR', 'SG'],
  ['SG', 'AU-SY'],
  ['SG', 'JP-TY'],
  ['NO-OS', 'KE-NB'],
  ['AE-DX', 'IN-MU'],
  ['UK-LN', 'ZA-JN'],
  ['US-W', 'JP-TY'],
  ['US-E', 'BR-SE'],
  ['NO-OS', 'ET-AA'],
  ['KE-NB', 'UG-KP'],
  ['NG-LG', 'CM-YA'],
  // US backbone
  ['US-W', 'US-MW'],
  ['US-MW', 'US-E'],
  ['US-NE', 'UK-LN'],
  ['US-NW', 'JP-TY'],
  ['US-SE', 'BR-SE'],
];

const PIN_INDEX = new Map(PINS.map((p) => [p.code, p]));

const WorldDeploymentMap: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={className}>
      <ComposableMap
        projection="geoEqualEarth"
        projectionConfig={{ scale: 165 }}
        width={980}
        height={500}
        style={{ width: '100%', height: 'auto' }}
        role="img"
        aria-label="FlyttGo world deployment map — primary, secondary and sovereign presence across North America, South America, Europe, Africa, MENA, Asia and Oceania"
      >
        {/* Land + country borders from world-atlas TopoJSON */}
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#0A3A6B"
                fillOpacity={0.08}
                stroke="#0A3A6B"
                strokeOpacity={0.32}
                strokeWidth={0.45}
                style={{
                  default: { outline: 'none' },
                  hover:   { outline: 'none', fillOpacity: 0.14 },
                  pressed: { outline: 'none' },
                }}
              />
            ))
          }
        </Geographies>

        {/* Cross-region arcs */}
        {ARCS.map(([a, b], i) => {
          const from = PIN_INDEX.get(a);
          const to = PIN_INDEX.get(b);
          if (!from || !to) return null;
          return (
            <Line
              key={`arc-${i}`}
              from={from.coords}
              to={to.coords}
              stroke="#1E6FD9"
              strokeWidth={0.85}
              strokeOpacity={0.45}
              strokeLinecap="round"
            />
          );
        })}

        {/* Region pins with pulsing halos */}
        {PINS.map((p) => {
          const accent = TIER_ACCENT[p.tier];
          return (
            <Marker key={p.code} coordinates={p.coords}>
              <title>{`${p.code} · ${p.city} — ${p.note}`}</title>
              {/* Halo pulse */}
              <circle r={3.5} fill={accent} fillOpacity={0.25}>
                <animate
                  attributeName="r"
                  values="3.5;9;3.5"
                  dur="3.6s"
                  repeatCount="indefinite"
                  begin={`${(p.coords[0] + 180) / 200}s`}
                />
                <animate
                  attributeName="opacity"
                  values="0.55;0;0.55"
                  dur="3.6s"
                  repeatCount="indefinite"
                  begin={`${(p.coords[0] + 180) / 200}s`}
                />
              </circle>
              <circle r={2.2} fill="#FFFFFF" stroke={accent} strokeWidth={0.9} />
              <circle r={0.85} fill={accent} />
              <text
                x={5}
                y={-3}
                fontFamily="ui-monospace, JetBrains Mono, monospace"
                fontSize="6"
                fontWeight="600"
                fill={accent}
                style={{ letterSpacing: '0.18em' }}
              >
                {p.code}
              </text>
              <text
                x={5}
                y={4}
                fontFamily="ui-sans-serif, Inter, system-ui, sans-serif"
                fontSize="6"
                fill="#0F172A"
                fontWeight="500"
              >
                {p.city}
              </text>
            </Marker>
          );
        })}
      </ComposableMap>

      {/* Legend rail */}
      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-[0.18em]">
        {([
          ['Primary',   '#1E6FD9'],
          ['Secondary', '#0FB5A6'],
          ['Sovereign', '#7C5CE6'],
        ] as Array<[string, string]>).map(([label, color]) => (
          <span key={label} className="inline-flex items-center gap-1.5">
            <span
              aria-hidden="true"
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: color }}
            />
            <span className="text-slate-600 dark:text-slate-400">{label}</span>
          </span>
        ))}
        <span className="ml-auto text-slate-400 hidden sm:inline">
          {PINS.length} cities · {ARCS.length} cross-region flows
        </span>
      </div>
    </div>
  );
};

export default WorldDeploymentMap;
