import React from 'react';
import Link from 'next/link';
import {
  Route,
  UserCheck,
  Landmark,
  GraduationCap,
  Fingerprint,
  CreditCard,
  Calculator,
  Truck,
  type LucideIcon,
} from 'lucide-react';

type OrbitNode = {
  slug: string;
  name: string;
  subtitle: string;
  icon: LucideIcon;
  angle: number;
  radius: number;
  accent: string;
};

const VIEWBOX = 600;
const CENTER = VIEWBOX / 2;
const RING_RADIUS = 215;
const PILL_W = 132;
const PILL_H = 46;

const toXY = (angleDeg: number, radius: number) => {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: CENTER + radius * Math.cos(rad), y: CENTER + radius * Math.sin(rad) };
};

// 3-tone enterprise palette grouped by capability domain:
//   Blue  — core infrastructure (mobility, identity)
//   Teal  — public / human services (workforce, gov, education)
//   Amber — financial & commerce (payments, finops, marketplace)
const BLUE = '#60A5FA';
const TEAL = '#5EEAD4';
const AMBER = '#F5B547';

// All 8 platforms sit on one ring at 45° spacing around the FlyttGoTech core.
const STEP = 360 / 8;
const nodes: OrbitNode[] = [
  { slug: 'transify', name: 'Transify', subtitle: 'Mobility', icon: Route, angle: 0, radius: RING_RADIUS, accent: BLUE },
  { slug: 'workverge', name: 'Workverge', subtitle: 'Workforce', icon: UserCheck, angle: STEP, radius: RING_RADIUS, accent: TEAL },
  { slug: 'civitas', name: 'Civitas', subtitle: 'Gov Services', icon: Landmark, angle: STEP * 2, radius: RING_RADIUS, accent: TEAL },
  { slug: 'edupro', name: 'EduPro', subtitle: 'Education', icon: GraduationCap, angle: STEP * 3, radius: RING_RADIUS, accent: TEAL },
  { slug: 'identra', name: 'Identra', subtitle: 'Identity', icon: Fingerprint, angle: STEP * 4, radius: RING_RADIUS, accent: BLUE },
  { slug: 'payvera', name: 'Payvera', subtitle: 'Payments', icon: CreditCard, angle: STEP * 5, radius: RING_RADIUS, accent: AMBER },
  { slug: 'ledgera', name: 'Ledgera', subtitle: 'Financial Ops', icon: Calculator, angle: STEP * 6, radius: RING_RADIUS, accent: AMBER },
  { slug: 'flyttgo', name: 'FlyttGo', subtitle: 'Marketplace', icon: Truck, angle: STEP * 7, radius: RING_RADIUS, accent: AMBER },
];

// Deterministic pseudo-random starfield so the component stays a pure server
// component (no hydration mismatch).
const STARS: { x: number; y: number; r: number; o: number }[] = Array.from({ length: 60 }).map((_, i) => {
  const seed = (i * 9301 + 49297) % 233280;
  const s2 = ((i + 7) * 1103515245 + 12345) % 233280;
  const s3 = ((i + 13) * 22695477 + 1) % 233280;
  return {
    x: (seed / 233280) * VIEWBOX,
    y: (s2 / 233280) * VIEWBOX,
    r: 0.4 + (s3 / 233280) * 1.1,
    o: 0.2 + (seed / 233280) * 0.6,
  };
});

// Quadratic Bezier arc from A to B that bulges outward past the orbit ring,
// producing the "spider web" feel between adjacent platform pills.
const arcPath = (a: OrbitNode, b: OrbitNode, bulge = 28) => {
  const p1 = toXY(a.angle, a.radius);
  const p2 = toXY(b.angle, b.radius);
  const midAngle = (a.angle + b.angle) / 2;
  const ctrl = toXY(midAngle, a.radius + bulge);
  return `M ${p1.x} ${p1.y} Q ${ctrl.x} ${ctrl.y} ${p2.x} ${p2.y}`;
};

const Pill: React.FC<{ node: OrbitNode }> = ({ node }) => {
  const { x, y } = toXY(node.angle, node.radius);
  const Icon = node.icon;
  return (
    <foreignObject
      x={x - PILL_W / 2}
      y={y - PILL_H / 2}
      width={PILL_W}
      height={PILL_H}
      className="motion-safe:animate-orbit-counter group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused] [transform-box:fill-box] [transform-origin:center] overflow-visible"
    >
      <Link
        href={`/platforms/${node.slug}`}
        aria-label={`${node.name} — ${node.subtitle}`}
        title={`${node.name} — ${node.subtitle}`}
        className="group flex items-center gap-2.5 h-full w-full pl-2 pr-3.5 rounded-full bg-[#0B2756]/80 backdrop-blur border border-[#9ED0F9]/25 shadow-[0_0_0_1px_rgba(158,208,249,0.08),0_6px_20px_-8px_rgba(0,0,0,0.5)] hover:border-[#9ED0F9]/60 hover:bg-[#10356F]/85 hover:shadow-[0_0_0_1px_rgba(158,208,249,0.25),0_0_24px_-4px_rgba(96,165,250,0.55)] motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-0"
      >
        <span
          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border border-white/15"
          style={{ backgroundColor: `${node.accent}20`, color: node.accent }}
          aria-hidden="true"
        >
          <Icon size={15} strokeWidth={1.9} />
        </span>
        <span className="flex flex-col leading-tight min-w-0">
          <span className="text-[12px] font-semibold text-white tracking-tight truncate">
            {node.name}
          </span>
          <span className="text-[9.5px] text-[#9ED0F9]/80 tracking-wide truncate">
            {node.subtitle}
          </span>
        </span>
      </Link>
    </foreignObject>
  );
};

const PlatformOrbitGraph: React.FC = () => {
  return (
    <div className="relative w-full max-w-[580px] mx-auto">
      {/* Desktop / tablet — premium orbit graph */}
      <div
        className="group hidden sm:block relative aspect-square"
        role="img"
        aria-label="FlyttGo Technologies Group platform ecosystem — FlyttGoTech infrastructure core connected to Transify, Workverge, Civitas, EduPro, Identra, Payvera, Ledgera and FlyttGo. Hover to pause."
      >
        <svg viewBox={`0 0 ${VIEWBOX} ${VIEWBOX}`} className="w-full h-full overflow-visible" aria-hidden="true">
          <defs>
            <radialGradient id="bg-glow" cx="50%" cy="50%" r="55%">
              <stop offset="0%" stopColor="#1E6FD9" stopOpacity="0.55" />
              <stop offset="55%" stopColor="#0A3A6B" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#0A1F3D" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="core-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#9ED0F9" stopOpacity="0.95" />
              <stop offset="55%" stopColor="#1E6FD9" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#0A3A6B" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="core-fill" cx="50%" cy="35%" r="75%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="60%" stopColor="#1E6FD9" />
              <stop offset="100%" stopColor="#0A3A6B" />
            </radialGradient>
            <linearGradient id="spoke-gradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#9ED0F9" stopOpacity="0.08" />
              <stop offset="45%" stopColor="#9ED0F9" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#9ED0F9" stopOpacity="0.08" />
            </linearGradient>
            <linearGradient id="arc-gradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.08" />
              <stop offset="50%" stopColor="#9ED0F9" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.08" />
            </linearGradient>
          </defs>

          {/* Ambient background glow */}
          <circle cx={CENTER} cy={CENTER} r={VIEWBOX / 2} fill="url(#bg-glow)" />

          {/* Starfield — static, subtle */}
          <g aria-hidden="true">
            {STARS.map((s, i) => (
              <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#E6F2FF" opacity={s.o} />
            ))}
          </g>

          {/* Faint orbit ring */}
          <circle cx={CENTER} cy={CENTER} r={RING_RADIUS} fill="none" stroke="rgba(158,208,249,0.12)" strokeDasharray="2 5" />

          {/* Rotating layer — spokes, arcs, pills all rotate together.
              Pauses on hover/focus so the user can read a pill. */}
          <g className="motion-safe:animate-orbit group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused] [transform-box:fill-box] [transform-origin:center]">
            {/* Spokes from core to each node */}
            {nodes.map((n) => {
              const { x, y } = toXY(n.angle, n.radius);
              return (
                <line
                  key={`spoke-${n.slug}`}
                  x1={CENTER}
                  y1={CENTER}
                  x2={x}
                  y2={y}
                  stroke="url(#spoke-gradient)"
                  strokeWidth="1.1"
                />
              );
            })}

            {/* Outer arcs connecting adjacent nodes (spider-web feel) */}
            {nodes.map((n, i) => {
              const next = nodes[(i + 1) % nodes.length];
              return (
                <path
                  key={`arc-${n.slug}`}
                  d={arcPath(n, next)}
                  fill="none"
                  stroke="url(#arc-gradient)"
                  strokeWidth="0.9"
                  strokeOpacity="0.8"
                />
              );
            })}

            {/* Small glowing dot at each connection endpoint */}
            {nodes.map((n) => {
              const { x, y } = toXY(n.angle, n.radius);
              return (
                <g key={`dot-${n.slug}`}>
                  <circle cx={x} cy={y} r="5" fill={n.accent} fillOpacity="0.25" />
                  <circle cx={x} cy={y} r="1.6" fill="#E6F2FF" />
                </g>
              );
            })}

            {/* Data-flow pulses — each pulse travels from core outward along its
                spoke. Pre-rotated to the spoke angle; CSS animates translateY
                outward so the pulse tracks the line. Staggered start times
                keep the ring feeling asynchronous and alive. */}
            {nodes.map((n, i) => (
              <g
                key={`pulse-${n.slug}`}
                transform={`rotate(${n.angle} ${CENTER} ${CENTER})`}
              >
                <circle
                  cx={CENTER}
                  cy={CENTER}
                  r={2.5}
                  fill={n.accent}
                  className="motion-safe:animate-pulse-spoke group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]"
                  style={{ animationDelay: `${i * 0.75}s` }}
                />
              </g>
            ))}

            {/* Platform pills — positioned on orbit, counter-rotated to stay upright */}
            {nodes.map((n) => (
              <Pill key={n.slug} node={n} />
            ))}
          </g>

          {/* Center core — visually dominant. Halo breathes slowly. */}
          <circle
            cx={CENTER}
            cy={CENTER}
            r={120}
            fill="url(#core-glow)"
            className="motion-safe:animate-core-breathe group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused] [transform-box:fill-box] [transform-origin:center]"
          />
          <circle
            cx={CENTER}
            cy={CENTER}
            r={72}
            fill="url(#core-fill)"
            stroke="rgba(158,208,249,0.55)"
            strokeWidth="1.25"
          />
          <circle
            cx={CENTER}
            cy={CENTER}
            r={86}
            fill="none"
            stroke="rgba(158,208,249,0.18)"
            strokeWidth="1"
            strokeDasharray="1 4"
          />
          <text
            x={CENTER}
            y={CENTER - 2}
            textAnchor="middle"
            className="fill-white text-[17px] font-semibold tracking-tight"
            style={{ fontFamily: 'var(--font-sans), Inter, system-ui, sans-serif' }}
          >
            FlyttGoTech
          </text>
          <text
            x={CENTER}
            y={CENTER + 16}
            textAnchor="middle"
            className="fill-[#9ED0F9] text-[9px] uppercase tracking-[0.22em] font-medium"
            style={{ fontFamily: 'var(--font-sans), Inter, system-ui, sans-serif' }}
          >
            Infrastructure Core
          </text>
        </svg>
      </div>

      {/* Mobile fallback — stacked platform badges */}
      <ul className="sm:hidden grid grid-cols-2 gap-2" aria-label="FlyttGo platforms">
        <li className="col-span-2">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/10 border border-white/20 backdrop-blur">
            <span className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#3B82F6] to-[#0A3A6B] flex items-center justify-center text-white text-[10px] font-semibold">
              Core
            </span>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-semibold text-white">FlyttGoTech</span>
              <span className="text-[11px] text-white/60">Infrastructure core</span>
            </div>
          </div>
        </li>
        {nodes.map((n) => {
          const Icon = n.icon;
          return (
            <li key={n.slug}>
              <Link
                href={`/platforms/${n.slug}`}
                className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                <span
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${n.accent}22`, color: n.accent }}
                  aria-hidden="true"
                >
                  <Icon size={14} strokeWidth={1.75} />
                </span>
                <span className="flex flex-col leading-tight min-w-0">
                  <span className="text-xs font-semibold text-white truncate">{n.name}</span>
                  <span className="text-[10px] text-white/55 truncate">{n.subtitle}</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PlatformOrbitGraph;
