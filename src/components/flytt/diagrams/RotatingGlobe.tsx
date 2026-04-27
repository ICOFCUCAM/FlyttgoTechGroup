'use client';

import React from 'react';

/**
 * Rotating 3D globe — pure CSS/SVG, no WebGL.
 *
 * A perspective-rotated sphere with FlyttGo region pulses arranged
 * around its surface. Achieves the "commanding 3D presence" the
 * brief asks for without pulling three.js or react-globe.gl into
 * the bundle (~300 KB saved). Honours prefers-reduced-motion: the
 * spin pauses, the glow stays, the pulses still fire.
 *
 * Decorative — the canonical deployment topology lives in the
 * WorldDeploymentMap SVG below this on /global-coverage.
 */

const REGIONS = [
  { code: 'EU-N', city: 'Oslo',     lon: 10.75, lat: 59.91, accent: '#1E6FD9' },
  { code: 'EU-W', city: 'London',   lon: -0.13, lat: 51.51, accent: '#1E6FD9' },
  { code: 'NA-W', city: 'SF',       lon: -122.4, lat: 37.78, accent: '#0FB5A6' },
  { code: 'NA-E', city: 'NoVA',     lon: -77.4,  lat: 39.0,  accent: '#0FB5A6' },
  { code: 'AF-W', city: 'Lagos',    lon: 3.38,   lat: 6.52,  accent: '#F5B547' },
  { code: 'AF-C', city: 'Yaoundé',  lon: 11.52,  lat: 3.85,  accent: '#F5B547' },
  { code: 'AF-E', city: 'Nairobi',  lon: 36.82,  lat: -1.29, accent: '#F5B547' },
  { code: 'AF-H', city: 'Addis',    lon: 38.74,  lat: 9.03,  accent: '#F5B547' },
  { code: 'MENA', city: 'Dubai',    lon: 55.27,  lat: 25.2,  accent: '#7C5CE6' },
  { code: 'APAC', city: 'Singapore', lon: 103.82, lat: 1.35, accent: '#0FB5A6' },
  { code: 'OCE',  city: 'Sydney',   lon: 151.21, lat: -33.87, accent: '#0FB5A6' },
];

/**
 * Project (lon, lat) onto a 2D position on the front-facing hemisphere.
 * Returns scale 0–1 used to fade markers as they rotate to the back.
 */
function project(lon: number, lat: number, rotation: number) {
  const phi = ((lon + rotation + 540) % 360 - 180) * (Math.PI / 180);
  const theta = lat * (Math.PI / 180);
  const x = Math.cos(theta) * Math.sin(phi);
  const y = -Math.sin(theta);
  const z = Math.cos(theta) * Math.cos(phi);
  return { x, y, z, visible: z > -0.05 };
}

export default function RotatingGlobe({ size = 360 }: { size?: number }) {
  const [rotation, setRotation] = React.useState(0);
  const reduced = useReducedMotion();

  React.useEffect(() => {
    if (reduced) return;
    let raf = 0;
    let last = performance.now();
    function tick(now: number) {
      const dt = now - last;
      last = now;
      // ~36° per second — full revolution every 10s.
      setRotation((r) => (r + (dt / 1000) * 14) % 360);
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  const radius = size / 2;
  const coreRadius = radius * 0.92;

  return (
    <div
      className="relative"
      style={{ width: size, height: size }}
      role="img"
      aria-label="FlyttGo global deployment topology — rotating 3D globe with regional presence pulses"
    >
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full">
        <defs>
          <radialGradient id="globe-surface" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#1E6FD9" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#0A3A6B" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#050F22" stopOpacity="1" />
          </radialGradient>
          <radialGradient id="globe-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1E6FD9" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#1E6FD9" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="globe-spec" cx="30%" cy="25%" r="40%">
            <stop offset="0%" stopColor="#9ED0F9" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#9ED0F9" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Outer glow halo */}
        <circle cx={radius} cy={radius} r={radius} fill="url(#globe-glow)" />

        {/* Globe core */}
        <circle cx={radius} cy={radius} r={coreRadius} fill="url(#globe-surface)" />

        {/* Latitude lines — 7 horizontal ellipses */}
        {Array.from({ length: 7 }).map((_, i) => {
          const lat = -75 + i * 25;
          const ry = coreRadius * Math.cos((lat * Math.PI) / 180);
          const cy = radius - coreRadius * Math.sin((lat * Math.PI) / 180);
          return (
            <ellipse
              key={`lat-${i}`}
              cx={radius}
              cy={cy}
              rx={coreRadius}
              ry={ry < 0 ? -ry : ry}
              fill="none"
              stroke="#1E6FD9"
              strokeWidth="0.4"
              strokeOpacity="0.18"
            />
          );
        })}

        {/* Longitude meridians — rotated ellipses */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i / 12) * 180 + rotation;
          // Project meridian as ellipse with width depending on angle.
          const cosA = Math.abs(Math.cos((angle * Math.PI) / 180));
          const rx = coreRadius * cosA;
          if (rx < 1) return null;
          return (
            <ellipse
              key={`lon-${i}`}
              cx={radius}
              cy={radius}
              rx={rx}
              ry={coreRadius}
              fill="none"
              stroke="#1E6FD9"
              strokeWidth="0.4"
              strokeOpacity={0.1 + cosA * 0.18}
            />
          );
        })}

        {/* Specular highlight */}
        <circle cx={radius} cy={radius} r={coreRadius} fill="url(#globe-spec)" />

        {/* Region markers */}
        {REGIONS.map((r) => {
          const p = project(r.lon, r.lat, rotation);
          if (!p.visible) return null;
          const cx = radius + p.x * coreRadius * 0.96;
          const cy = radius + p.y * coreRadius * 0.96;
          const opacity = Math.max(0.25, p.z); // Fades as marker rotates to limb.
          const markerR = 2.5 + p.z * 1.5;
          return (
            <g key={r.code}>
              <circle
                cx={cx}
                cy={cy}
                r={markerR + 6}
                fill={r.accent}
                opacity={opacity * 0.18}
              >
                {!reduced && (
                  <animate
                    attributeName="r"
                    values={`${markerR + 4};${markerR + 12};${markerR + 4}`}
                    dur="2.4s"
                    repeatCount="indefinite"
                    begin={`${(r.lon + 180) / 60}s`}
                  />
                )}
              </circle>
              <circle
                cx={cx}
                cy={cy}
                r={markerR}
                fill={r.accent}
                opacity={opacity}
              />
            </g>
          );
        })}

        {/* Outer ring pulse */}
        <circle
          cx={radius}
          cy={radius}
          r={radius - 1}
          fill="none"
          stroke="#1E6FD9"
          strokeWidth="0.5"
          strokeOpacity="0.3"
        />
      </svg>

      {/* Mono caption underneath, tied to rotation so it reads "live" */}
      <div className="absolute inset-x-0 bottom-0 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500">
        <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">GC.3D</span>
        <span className="mx-2 text-slate-300 dark:text-slate-700">·</span>
        <span className="tabular-nums">{Math.round(rotation).toString().padStart(3, '0')}°</span>
      </div>
    </div>
  );
}

function useReducedMotion(): boolean {
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
}
