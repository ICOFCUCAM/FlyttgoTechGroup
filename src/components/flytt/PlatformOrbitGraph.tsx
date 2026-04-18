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
  description: string;
  icon: LucideIcon;
  angle: number;
  radius: number;
  accent: string;
};

const VIEWBOX = 480;
const CENTER = VIEWBOX / 2;
const INNER_RADIUS = 140;
const OUTER_RADIUS = 210;

const toXY = (angleDeg: number, radius: number) => {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: CENTER + radius * Math.cos(rad), y: CENTER + radius * Math.sin(rad) };
};

// Transify anchors 12 o'clock so FlyttGo (outer) sits directly above it,
// visually communicating "marketplace runs on mobility infrastructure".
const innerNodes: OrbitNode[] = [
  { slug: 'transify', name: 'Transify', description: 'Mobility coordination infrastructure', icon: Route, angle: 0, radius: INNER_RADIUS, accent: '#1E6FD9' },
  { slug: 'workverge', name: 'Workverge', description: 'Workforce systems and deployment', icon: UserCheck, angle: 360 / 7, radius: INNER_RADIUS, accent: '#0FB5A6' },
  { slug: 'civitas', name: 'Civitas', description: 'Government service delivery', icon: Landmark, angle: (360 / 7) * 2, radius: INNER_RADIUS, accent: '#7C5CE6' },
  { slug: 'edupro', name: 'EduPro', description: 'Education intelligence platform', icon: GraduationCap, angle: (360 / 7) * 3, radius: INNER_RADIUS, accent: '#E07A3B' },
  { slug: 'identra', name: 'Identra', description: 'Identity verification and authentication', icon: Fingerprint, angle: (360 / 7) * 4, radius: INNER_RADIUS, accent: '#C14965' },
  { slug: 'payvera', name: 'Payvera', description: 'Payment orchestration infrastructure', icon: CreditCard, angle: (360 / 7) * 5, radius: INNER_RADIUS, accent: '#2AA98B' },
  { slug: 'ledgera', name: 'Ledgera', description: 'Financial operations automation', icon: Calculator, angle: (360 / 7) * 6, radius: INNER_RADIUS, accent: '#0E7C66' },
];

const outerNode: OrbitNode = {
  slug: 'flyttgo',
  name: 'FlyttGo',
  description: 'Smart moving marketplace on Transify infrastructure',
  icon: Truck,
  angle: 0,
  radius: OUTER_RADIUS,
  accent: '#F0B429',
};

const transifyPos = toXY(0, INNER_RADIUS);
const flyttgoPos = toXY(0, OUTER_RADIUS);

const Node: React.FC<{ node: OrbitNode; size?: number }> = ({ node, size = 26 }) => {
  const { x, y } = toXY(node.angle, node.radius);
  const Icon = node.icon;
  return (
    <g className="group">
      <Link href={`/platforms/${node.slug}`} aria-label={`${node.name} — ${node.description}`}>
        <title>{`${node.name} — ${node.description}`}</title>
        {/* Counter-rotate each node group so icons and labels stay upright while
            the parent orbit rotates. */}
        <g
          className="motion-safe:animate-orbit-counter motion-safe:[transform-box:fill-box] motion-safe:[transform-origin:center]"
          transform={`translate(${x} ${y})`}
        >
          <circle
            r={size + 6}
            fill={node.accent}
            fillOpacity="0"
            className="motion-safe:transition-[fill-opacity,r] group-hover:[fill-opacity:0.18] group-focus-within:[fill-opacity:0.18]"
          />
          <circle
            r={size}
            fill="rgba(10,31,61,0.92)"
            stroke={node.accent}
            strokeOpacity="0.7"
            strokeWidth="1.25"
            className="motion-safe:transition-transform group-hover:scale-[1.08] group-focus-within:scale-[1.08] [transform-box:fill-box] [transform-origin:center]"
          />
          <foreignObject x={-size} y={-size} width={size * 2} height={size * 2}>
            <div className="w-full h-full flex items-center justify-center text-white">
              <Icon size={18} strokeWidth={1.75} style={{ color: node.accent }} aria-hidden="true" />
            </div>
          </foreignObject>
          <text
            y={size + 18}
            textAnchor="middle"
            className="fill-white/85 text-[11px] font-semibold tracking-tight"
            style={{ fontFamily: 'var(--font-sans), Inter, system-ui, sans-serif' }}
          >
            {node.name}
          </text>
        </g>
      </Link>
    </g>
  );
};

const PlatformOrbitGraph: React.FC = () => {
  return (
    <div className="relative w-full max-w-[520px] mx-auto">
      {/* Desktop / tablet — full SVG orbit graph */}
      <div
        className="hidden sm:block relative aspect-square"
        role="img"
        aria-label="FlyttGo Technologies Group platform ecosystem — FlyttGoTech infrastructure core connected to Transify, Workverge, Civitas, EduPro, Identra, Payvera and Ledgera, with the FlyttGo marketplace connected through Transify"
      >
        <svg
          viewBox={`0 0 ${VIEWBOX} ${VIEWBOX}`}
          className="w-full h-full"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="core-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#9ED0F9" stopOpacity="0.55" />
              <stop offset="60%" stopColor="#1E6FD9" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#0A1F3D" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="core-fill" cx="50%" cy="35%" r="70%">
              <stop offset="0%" stopColor="#1E6FD9" />
              <stop offset="100%" stopColor="#0A3A6B" />
            </radialGradient>
            <linearGradient id="link-gradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#9ED0F9" stopOpacity="0.05" />
              <stop offset="50%" stopColor="#9ED0F9" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#9ED0F9" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          {/* Faint decorative rings — static */}
          <circle cx={CENTER} cy={CENTER} r={INNER_RADIUS} fill="none" stroke="rgba(255,255,255,0.06)" strokeDasharray="2 4" />
          <circle cx={CENTER} cy={CENTER} r={OUTER_RADIUS} fill="none" stroke="rgba(255,255,255,0.04)" strokeDasharray="2 6" />

          {/* Core glow — static */}
          <circle cx={CENTER} cy={CENTER} r={90} fill="url(#core-glow)" />

          {/* Rotating orbit — contains connection lines and node groups.
              Counter-rotation on each inner group keeps text upright. */}
          <g
            className="motion-safe:animate-orbit motion-safe:[transform-box:fill-box] motion-safe:[transform-origin:center]"
          >
            {/* Inner ring connection lines from core to each platform */}
            {innerNodes.map((n) => {
              const { x, y } = toXY(n.angle, n.radius);
              return (
                <line
                  key={`line-${n.slug}`}
                  x1={CENTER}
                  y1={CENTER}
                  x2={x}
                  y2={y}
                  stroke="url(#link-gradient)"
                  strokeWidth="1"
                />
              );
            })}

            {/* Transify → FlyttGo connection (marketplace runs on mobility infra) */}
            <line
              x1={transifyPos.x}
              y1={transifyPos.y}
              x2={flyttgoPos.x}
              y2={flyttgoPos.y}
              stroke="url(#link-gradient)"
              strokeWidth="1"
            />

            {/* Inner platform nodes */}
            {innerNodes.map((n) => (
              <Node key={n.slug} node={n} />
            ))}

            {/* Outer marketplace node */}
            <Node node={outerNode} size={22} />
          </g>

          {/* Center infrastructure core — static, non-clickable identity anchor */}
          <g>
            <circle cx={CENTER} cy={CENTER} r={44} fill="url(#core-fill)" stroke="rgba(158,208,249,0.55)" strokeWidth="1.25" />
            <text
              x={CENTER}
              y={CENTER - 2}
              textAnchor="middle"
              className="fill-white text-[11px] font-semibold tracking-tight"
              style={{ fontFamily: 'var(--font-sans), Inter, system-ui, sans-serif' }}
            >
              FlyttGoTech
            </text>
            <text
              x={CENTER}
              y={CENTER + 12}
              textAnchor="middle"
              className="fill-[#9ED0F9] text-[8px] uppercase tracking-[0.16em]"
              style={{ fontFamily: 'var(--font-sans), Inter, system-ui, sans-serif' }}
            >
              Infrastructure core
            </text>
          </g>
        </svg>
      </div>

      {/* Mobile fallback — stacked platform badges */}
      <ul className="sm:hidden grid grid-cols-2 gap-2" aria-label="FlyttGo platforms">
        <li className="col-span-2">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/10 border border-white/20 backdrop-blur">
            <span className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#1E6FD9] to-[#0A3A6B] flex items-center justify-center text-white text-[10px] font-semibold">
              Core
            </span>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-semibold text-white">FlyttGoTech</span>
              <span className="text-[11px] text-white/60">Infrastructure core</span>
            </div>
          </div>
        </li>
        {[...innerNodes, outerNode].map((n) => {
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
                <span className="text-xs font-semibold text-white truncate">{n.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PlatformOrbitGraph;
