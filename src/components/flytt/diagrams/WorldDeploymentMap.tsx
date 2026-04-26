'use client';

import React from 'react';

/**
 * WorldDeploymentMap — equirectangular world projection rendered as a
 * dot field with FlyttGo regional presence pins layered on top.
 *
 * Replaces the earlier RegionalRollout topology diagram. Shows a real
 * world map silhouette (dots arranged into continent shapes) with
 * pinned regions including North America (USA), South America,
 * Europe (Nordics, UK), Africa, MENA, Asia, and Oceania, plus
 * great-circle arcs connecting active hubs.
 *
 * Coordinates use a simple linear lon/lat → (x, y) projection over the
 * SVG viewBox. Continent dots are hand-positioned in the same lon/lat
 * space so the world silhouette stays geographically credible.
 */

const VBOX_W = 1000;
const VBOX_H = 480;

// Linear equirectangular projection: lon ∈ [-180, 180], lat ∈ [-60, 75].
// Trims Antarctica and the upper Arctic that don't carry information.
const LON_MIN = -180;
const LON_MAX = 180;
const LAT_MIN = -60;
const LAT_MAX = 75;

function project(lon: number, lat: number): { x: number; y: number } {
  const x = ((lon - LON_MIN) / (LON_MAX - LON_MIN)) * VBOX_W;
  const y = ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * VBOX_H;
  return { x, y };
}

// Continent dot field — approximate land-mass coverage. Each tuple is
// [lon, lat]. Dense in continent interiors, sparse at coastlines, gaps
// where there's water. Order is roughly NA → SA → EU → AF → ME → ASIA →
// OCE so a reader can walk the map.
const LAND: Array<[number, number]> = [
  // North America
  [-160, 65], [-150, 65], [-140, 65], [-130, 65], [-120, 65],
  [-160, 60], [-150, 60], [-140, 60], [-130, 60], [-120, 60], [-110, 60], [-100, 60], [-90, 60], [-80, 60], [-70, 60],
  [-155, 55], [-140, 55], [-125, 55], [-115, 55], [-105, 55], [-95, 55], [-85, 55], [-75, 55], [-65, 55], [-58, 55],
  [-128, 50], [-118, 50], [-108, 50], [-98, 50], [-88, 50], [-78, 50], [-68, 50], [-60, 50],
  [-125, 45], [-115, 45], [-105, 45], [-95, 45], [-85, 45], [-75, 45], [-67, 45],
  [-122, 40], [-112, 40], [-102, 40], [-92, 40], [-82, 40], [-74, 40],
  [-120, 35], [-108, 35], [-98, 35], [-88, 35], [-78, 35], [-72, 35],
  [-115, 30], [-105, 30], [-95, 30], [-85, 30], [-78, 30],
  [-110, 25], [-100, 25], [-90, 25], [-82, 25],
  [-105, 20], [-95, 20], [-88, 20],
  [-100, 15], [-88, 15], [-82, 15],
  [-92, 10], [-85, 10], [-78, 10],

  // South America
  [-78, 5], [-72, 5], [-65, 5], [-58, 5], [-52, 5],
  [-78, 0], [-72, 0], [-65, 0], [-58, 0], [-50, 0],
  [-78, -5], [-72, -5], [-65, -5], [-58, -5], [-50, -5], [-42, -5],
  [-75, -10], [-68, -10], [-60, -10], [-52, -10], [-45, -10], [-38, -10],
  [-72, -15], [-65, -15], [-58, -15], [-50, -15], [-42, -15],
  [-70, -20], [-62, -20], [-55, -20], [-48, -20], [-42, -20],
  [-70, -25], [-62, -25], [-55, -25], [-48, -25],
  [-72, -30], [-65, -30], [-58, -30],
  [-72, -35], [-65, -35], [-58, -35],
  [-72, -40], [-65, -40],
  [-70, -45], [-65, -45],
  [-68, -50],

  // Europe
  [-10, 60], [0, 60], [10, 60], [20, 60], [30, 60], [40, 60], [55, 60],
  [-8, 55], [2, 55], [12, 55], [22, 55], [32, 55], [42, 55],
  [-8, 50], [2, 50], [12, 50], [22, 50], [32, 50], [42, 50],
  [-8, 45], [0, 45], [10, 45], [20, 45], [30, 45], [40, 45],
  [-5, 40], [5, 40], [15, 40], [25, 40], [35, 40], [42, 40],

  // Iceland, Greenland edge, Scandinavia tails
  [-20, 65], [-22, 64],
  [10, 70], [22, 68], [25, 70],

  // Africa
  [-15, 30], [-5, 30], [5, 30], [15, 30], [25, 30], [33, 30],
  [-15, 25], [-5, 25], [5, 25], [15, 25], [25, 25], [33, 25],
  [-15, 20], [-5, 20], [5, 20], [15, 20], [25, 20], [33, 20],
  [-15, 15], [-5, 15], [5, 15], [15, 15], [25, 15], [35, 15], [42, 15],
  [-12, 10], [-5, 10], [5, 10], [15, 10], [25, 10], [35, 10], [42, 10],
  [-8, 5], [0, 5], [10, 5], [20, 5], [30, 5], [38, 5],
  [10, 0], [20, 0], [28, 0], [35, 0], [42, 0],
  [12, -5], [22, -5], [30, -5], [38, -5],
  [15, -10], [22, -10], [30, -10], [38, -10],
  [15, -15], [22, -15], [30, -15], [38, -15],
  [18, -20], [25, -20], [32, -20],
  [20, -25], [27, -25], [32, -25],
  [22, -30], [28, -30],
  [25, -34],

  // MENA / Arabian peninsula
  [38, 30], [45, 30], [50, 30], [55, 30],
  [40, 25], [48, 25], [55, 25],
  [42, 20], [50, 20], [55, 20],
  [45, 15], [52, 15],

  // Asia (Russia, Central Asia, India, China, SE Asia)
  [60, 65], [75, 65], [90, 65], [110, 65], [130, 65], [150, 65], [165, 65],
  [60, 60], [75, 60], [90, 60], [105, 60], [120, 60], [135, 60], [155, 60],
  [55, 55], [70, 55], [85, 55], [100, 55], [115, 55], [130, 55], [145, 55],
  [55, 50], [70, 50], [85, 50], [100, 50], [115, 50], [130, 50], [142, 50],
  [55, 45], [70, 45], [85, 45], [100, 45], [115, 45], [128, 45], [140, 45],
  [60, 40], [70, 40], [80, 40], [95, 40], [110, 40], [125, 40], [138, 40],
  [60, 35], [72, 35], [85, 35], [100, 35], [115, 35], [128, 35],
  [62, 30], [75, 30], [88, 30], [100, 30], [115, 30],
  [70, 25], [82, 25], [92, 25], [105, 25],
  [72, 20], [82, 20], [95, 20], [105, 20],
  [78, 15], [92, 15], [102, 15], [110, 15], [122, 15],
  [80, 10], [98, 10], [108, 10], [118, 10],
  [102, 5], [110, 5], [120, 5],
  [100, 0], [110, 0], [120, 0],

  // Indonesia / Philippines
  [105, -5], [115, -5], [122, -5], [130, -5],
  [115, -10], [122, -10], [130, -10], [138, -10],

  // Australia / Oceania
  [115, -20], [125, -20], [135, -20], [145, -20], [152, -20],
  [115, -25], [125, -25], [135, -25], [145, -25],
  [115, -30], [125, -30], [135, -30], [145, -30],
  [120, -35], [130, -35], [140, -35], [148, -35],
  [145, -40], [170, -42],
];

type Pin = {
  code: string;
  city: string;
  country: string;
  lon: number;
  lat: number;
  tier: 'primary' | 'secondary' | 'sovereign';
  note: string;
};

const PINS: Pin[] = [
  // North America — USA presence (newly explicit in this map)
  { code: 'US-W', city: 'San Francisco', country: 'USA', lon: -122.4, lat: 37.78, tier: 'primary', note: 'Customer-cloud · West' },
  { code: 'US-E', city: 'Northern Virginia', country: 'USA', lon: -77.4, lat: 39.0, tier: 'primary', note: 'Customer-cloud · East' },
  { code: 'CA-E', city: 'Toronto', country: 'Canada', lon: -79.4, lat: 43.7, tier: 'secondary', note: 'Edge presence' },

  // South America
  { code: 'BR-SE', city: 'São Paulo', country: 'Brazil', lon: -46.6, lat: -23.55, tier: 'secondary', note: 'LatAm hub' },

  // Europe — Nordic primary + UK + DE
  { code: 'NO-OS', city: 'Oslo', country: 'Norway', lon: 10.75, lat: 59.91, tier: 'primary', note: 'HQ + primary EU' },
  { code: 'SE-ST', city: 'Stockholm', country: 'Sweden', lon: 18.07, lat: 59.33, tier: 'primary', note: 'Nordic ops' },
  { code: 'UK-LN', city: 'London', country: 'United Kingdom', lon: -0.13, lat: 51.51, tier: 'primary', note: 'UK + Commonwealth' },
  { code: 'DE-FR', city: 'Frankfurt', country: 'Germany', lon: 8.68, lat: 50.11, tier: 'primary', note: 'Mainland EU' },
  { code: 'NL-AM', city: 'Amsterdam', country: 'Netherlands', lon: 4.9, lat: 52.37, tier: 'secondary', note: 'EU edge' },

  // Africa
  { code: 'KE-NB', city: 'Nairobi', country: 'Kenya', lon: 36.82, lat: -1.29, tier: 'secondary', note: 'East Africa hub' },
  { code: 'ZA-JN', city: 'Johannesburg', country: 'South Africa', lon: 28.05, lat: -26.2, tier: 'sovereign', note: 'Sovereign · ZA' },
  { code: 'NG-LG', city: 'Lagos', country: 'Nigeria', lon: 3.38, lat: 6.52, tier: 'secondary', note: 'West Africa' },

  // MENA
  { code: 'AE-DX', city: 'Dubai', country: 'United Arab Emirates', lon: 55.27, lat: 25.2, tier: 'sovereign', note: 'Sovereign · GCC' },
  { code: 'SA-RD', city: 'Riyadh', country: 'Saudi Arabia', lon: 46.67, lat: 24.71, tier: 'sovereign', note: 'Sovereign · KSA' },
  { code: 'EG-CR', city: 'Cairo', country: 'Egypt', lon: 31.24, lat: 30.04, tier: 'secondary', note: 'North Africa' },

  // Asia
  { code: 'IN-MU', city: 'Mumbai', country: 'India', lon: 72.88, lat: 19.08, tier: 'secondary', note: 'South Asia' },
  { code: 'SG', city: 'Singapore', country: 'Singapore', lon: 103.82, lat: 1.35, tier: 'primary', note: 'APAC hub' },
  { code: 'JP-TY', city: 'Tokyo', country: 'Japan', lon: 139.69, lat: 35.69, tier: 'secondary', note: 'East Asia' },

  // Oceania
  { code: 'AU-SY', city: 'Sydney', country: 'Australia', lon: 151.21, lat: -33.87, tier: 'secondary', note: 'Oceania' },
];

const TIER_ACCENT: Record<Pin['tier'], string> = {
  primary: '#1E6FD9',
  secondary: '#0FB5A6',
  sovereign: '#7C5CE6',
};

// Cross-region arcs — only the most architecturally meaningful flows.
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
];

const PIN_INDEX = new Map(PINS.map((p) => [p.code, p]));

function arcPath(from: Pin, to: Pin): string {
  const a = project(from.lon, from.lat);
  const b = project(to.lon, to.lat);
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  // Lift the control point to fake a great-circle bow.
  const lift = Math.min(60, Math.abs(a.x - b.x) * 0.18 + 14);
  const cy = my - lift;
  return `M ${a.x.toFixed(1)} ${a.y.toFixed(1)} Q ${mx.toFixed(1)} ${cy.toFixed(1)} ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
}

const WorldDeploymentMap: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={className}>
      <svg
        viewBox={`0 0 ${VBOX_W} ${VBOX_H}`}
        className="w-full h-auto"
        role="img"
        aria-label="FlyttGo world deployment map — primary, secondary and sovereign presence across North America, South America, Europe, Africa, MENA, Asia and Oceania"
      >
        <defs>
          <linearGradient id="wm-arc" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#0A3A6B" stopOpacity="0" />
            <stop offset="50%" stopColor="#1E6FD9" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#0A3A6B" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="wm-pulse" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1E6FD9" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#1E6FD9" stopOpacity="0" />
          </radialGradient>

          {/* Per-tier glow gradients used by the pin halos */}
          <radialGradient id="wm-glow-primary" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1E6FD9" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#1E6FD9" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="wm-glow-secondary" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0FB5A6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#0FB5A6" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="wm-glow-sovereign" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#7C5CE6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#7C5CE6" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Latitude / longitude grid */}
        <g opacity="0.6">
          {Array.from({ length: 7 }).map((_, i) => {
            const lat = LAT_MIN + ((LAT_MAX - LAT_MIN) / 6) * i;
            const { y } = project(0, lat);
            return (
              <line
                key={`lat-${i}`}
                x1="0"
                x2={VBOX_W}
                y1={y}
                y2={y}
                stroke="#E2E8F0"
                strokeWidth="0.4"
                strokeDasharray="2 4"
              />
            );
          })}
          {Array.from({ length: 13 }).map((_, i) => {
            const lon = LON_MIN + ((LON_MAX - LON_MIN) / 12) * i;
            const { x } = project(lon, 0);
            return (
              <line
                key={`lon-${i}`}
                x1={x}
                x2={x}
                y1="0"
                y2={VBOX_H}
                stroke="#E2E8F0"
                strokeWidth="0.4"
                strokeDasharray="2 4"
              />
            );
          })}
        </g>

        {/* Continent dot field — the world silhouette */}
        <g>
          {LAND.map(([lon, lat], i) => {
            const { x, y } = project(lon, lat);
            return (
              <circle
                key={`land-${i}`}
                cx={x}
                cy={y}
                r={1.6}
                fill="#94A3B8"
                fillOpacity="0.55"
              />
            );
          })}
        </g>

        {/* Cross-region great-circle arcs */}
        <g>
          {ARCS.map(([fromCode, toCode], i) => {
            const from = PIN_INDEX.get(fromCode);
            const to = PIN_INDEX.get(toCode);
            if (!from || !to) return null;
            return (
              <path
                key={`arc-${i}`}
                d={arcPath(from, to)}
                fill="none"
                stroke="url(#wm-arc)"
                strokeWidth="1.1"
                strokeLinecap="round"
              />
            );
          })}
        </g>

        {/* Region pins */}
        <g>
          {PINS.map((p) => {
            const { x, y } = project(p.lon, p.lat);
            const accent = TIER_ACCENT[p.tier];
            const haloId = `wm-glow-${p.tier}`;
            return (
              <g key={p.code}>
                <circle cx={x} cy={y} r={22} fill={`url(#${haloId})`} />
                {/* Animated pulse — subtle, motion-safe via CSS class on parent */}
                <circle cx={x} cy={y} r={5} fill="url(#wm-pulse)">
                  <animate
                    attributeName="r"
                    values="5;14;5"
                    dur="3.6s"
                    repeatCount="indefinite"
                    begin={`${(p.lon + 180) / 200}s`}
                  />
                  <animate
                    attributeName="opacity"
                    values="0.65;0;0.65"
                    dur="3.6s"
                    repeatCount="indefinite"
                    begin={`${(p.lon + 180) / 200}s`}
                  />
                </circle>
                <circle
                  cx={x}
                  cy={y}
                  r={4.5}
                  fill="#FFFFFF"
                  stroke={accent}
                  strokeWidth="1.6"
                />
                <circle cx={x} cy={y} r={1.6} fill={accent} />
                <text
                  x={x + 8}
                  y={y - 6}
                  fontFamily="ui-monospace, JetBrains Mono, monospace"
                  fontSize="9"
                  fontWeight="600"
                  fill={accent}
                  style={{ letterSpacing: '0.18em' }}
                >
                  {p.code}
                </text>
                <text
                  x={x + 8}
                  y={y + 5}
                  fontFamily="ui-sans-serif, Inter, system-ui, sans-serif"
                  fontSize="9.5"
                  fill="#0F172A"
                  fontWeight="500"
                >
                  {p.city}
                </text>
              </g>
            );
          })}
        </g>

        {/* Legend */}
        <g transform="translate(20, 440)">
          <rect x="0" y="0" width="380" height="28" rx="4" fill="#FFFFFF" fillOpacity="0.85" stroke="#CBD5E1" strokeWidth="0.5" />
          <g transform="translate(12, 14)">
            <circle cx="0" cy="0" r="4" fill="#FFFFFF" stroke="#1E6FD9" strokeWidth="1.6" />
            <text x="10" y="3" fontSize="9" fontFamily="ui-monospace, monospace" fill="#475569" style={{ letterSpacing: '0.14em' }}>
              PRIMARY
            </text>
          </g>
          <g transform="translate(110, 14)">
            <circle cx="0" cy="0" r="4" fill="#FFFFFF" stroke="#0FB5A6" strokeWidth="1.6" />
            <text x="10" y="3" fontSize="9" fontFamily="ui-monospace, monospace" fill="#475569" style={{ letterSpacing: '0.14em' }}>
              SECONDARY
            </text>
          </g>
          <g transform="translate(225, 14)">
            <circle cx="0" cy="0" r="4" fill="#FFFFFF" stroke="#7C5CE6" strokeWidth="1.6" />
            <text x="10" y="3" fontSize="9" fontFamily="ui-monospace, monospace" fill="#475569" style={{ letterSpacing: '0.14em' }}>
              SOVEREIGN
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
};

export default WorldDeploymentMap;
