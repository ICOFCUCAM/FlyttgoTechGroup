import {
  KeyRound,
  CreditCard,
  LayoutDashboard,
  Smartphone,
  ShoppingBag,
  Workflow,
  ShieldCheck,
  Cpu,
  type LucideIcon,
} from 'lucide-react';

/**
 * SE.SK — Architecture stack diagram for the eight modular add-ons.
 *
 * Renders the add-ons as composable bricks stacking onto a capability
 * tier (L.01 → L.06) which itself sits on the FlyttGoTech Core
 * substrate. Communicates orthogonal composition: any add-on attaches
 * to any tier; the substrate is invariant.
 *
 * Pure-server SVG. No client JS. Companion to AddOnPricing (SE.03)
 * which carries the per-module price bands.
 */

type AddOn = {
  code: string;
  name: string;
  icon: LucideIcon;
  accent: string;
};

const ADDONS: AddOn[] = [
  { code: 'AO.01', name: 'Authentication',         icon: KeyRound,        accent: '#1E6FD9' },
  { code: 'AO.02', name: 'Payments',               icon: CreditCard,      accent: '#10B981' },
  { code: 'AO.03', name: 'Admin console',          icon: LayoutDashboard, accent: '#0FB5A6' },
  { code: 'AO.04', name: 'Mobile apps',            icon: Smartphone,      accent: '#A78BFA' },
  { code: 'AO.05', name: 'Marketplace engine',     icon: ShoppingBag,     accent: '#F5B547' },
  { code: 'AO.06', name: 'Workflow engine',        icon: Workflow,        accent: '#7C5CE6' },
  { code: 'AO.07', name: 'Government compliance',  icon: ShieldCheck,     accent: '#0A3A6B' },
  { code: 'AO.08', name: 'AI routing engine',      icon: Cpu,             accent: '#D6B575' },
];

const TIERS = ['L.01', 'L.02', 'L.03', 'L.04', 'L.05', 'L.06'];

export default function AddOnStackDiagram() {
  return (
    <section
      id="se-sk"
      aria-labelledby="se-sk-heading"
      className="relative bg-gradient-to-b from-white to-[#F5F8FC] dark:from-slate-950 dark:to-slate-900 py-24 lg:py-28 border-t border-slate-200/60 dark:border-slate-800/60 scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
          <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">SE.SK</span>
          <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
          <span>Add-on architecture stack</span>
        </div>

        <h2
          id="se-sk-heading"
          className="mt-6 max-w-3xl font-serif text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-slate-900 dark:text-white leading-[1.05]"
        >
          Add-ons stack{' '}
          <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
            orthogonally to the tier.
          </em>
        </h2>
        <p className="mt-4 max-w-3xl text-base text-slate-600 dark:text-slate-400 leading-[1.65]">
          Eight composable modules sit above any capability tier. The
          tier defines the engagement shape — feature inventory,
          delivery cadence, deployment scope. The add-ons are picked
          independently and bolt onto whichever tier the programme
          starts at. Both layers run on the same FlyttGoTech Core.
        </p>

        <div className="mt-12 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 p-6 lg:p-8 shadow-[0_30px_120px_-50px_rgba(10,58,107,0.20)]">
          <svg
            viewBox="0 0 1100 540"
            preserveAspectRatio="xMidYMid meet"
            role="img"
            aria-label="Architecture stack diagram showing eight add-on modules above the capability tier above the FlyttGoTech Core substrate"
            className="w-full h-auto"
          >
            <defs>
              <linearGradient id="se-sk-core" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#0A1F3D" />
                <stop offset="100%" stopColor="#0A3A6B" />
              </linearGradient>
              <linearGradient id="se-sk-tier" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#0A3A6B" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#9ED0F9" stopOpacity="0.18" />
              </linearGradient>
            </defs>

            {/* Top — eight add-on bricks */}
            <g>
              {ADDONS.map((a, i) => {
                const x = 30 + i * 132;
                const y = 30;
                const w = 122;
                const h = 110;
                return (
                  <g key={a.code}>
                    <rect
                      x={x}
                      y={y}
                      width={w}
                      height={h}
                      rx="14"
                      fill="white"
                      stroke={a.accent}
                      strokeOpacity="0.30"
                      strokeWidth="1"
                    />
                    <rect
                      x={x}
                      y={y}
                      width={w}
                      height={3}
                      rx="1.5"
                      fill={a.accent}
                    />
                    <text
                      x={x + 12}
                      y={y + 26}
                      fontSize="10"
                      fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                      fontWeight="600"
                      fill={a.accent}
                      letterSpacing="1.2"
                    >
                      {a.code}
                    </text>
                    <text
                      x={x + 12}
                      y={y + 60}
                      fontSize="13"
                      fontFamily="ui-sans-serif, system-ui, sans-serif"
                      fontWeight="600"
                      fill="#0F172A"
                    >
                      {a.name.split(' ')[0]}
                    </text>
                    {a.name.split(' ').length > 1 && (
                      <text
                        x={x + 12}
                        y={y + 76}
                        fontSize="13"
                        fontFamily="ui-sans-serif, system-ui, sans-serif"
                        fontWeight="600"
                        fill="#0F172A"
                      >
                        {a.name.split(' ').slice(1).join(' ')}
                      </text>
                    )}
                    {/* Connector down to tier band */}
                    <line
                      x1={x + w / 2}
                      y1={y + h}
                      x2={x + w / 2}
                      y2={y + h + 32}
                      stroke={a.accent}
                      strokeOpacity="0.30"
                      strokeWidth="1.2"
                      strokeDasharray="3 3"
                    />
                  </g>
                );
              })}
            </g>

            {/* Tier label rail */}
            <text
              x="30"
              y="190"
              fontSize="10"
              fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
              fontWeight="600"
              fill="#94A3B8"
              letterSpacing="1.4"
            >
              ANY ADD-ON · ANY TIER
            </text>

            {/* Capability tier band */}
            <g>
              <rect
                x="30"
                y="210"
                width="1040"
                height="100"
                rx="16"
                fill="url(#se-sk-tier)"
                stroke="#0A3A6B"
                strokeOpacity="0.20"
                strokeWidth="1"
              />
              <text
                x="50"
                y="240"
                fontSize="11"
                fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                fontWeight="600"
                fill="#0A3A6B"
                letterSpacing="1.4"
              >
                SE.LD · CAPABILITY TIER
              </text>
              <text
                x="50"
                y="278"
                fontSize="20"
                fontFamily="ui-serif, Georgia, serif"
                fontWeight="500"
                fill="#0F172A"
              >
                Pick any one of the six engagement levels
              </text>
              {/* Tier ladder L.01 → L.06 */}
              <g>
                {TIERS.map((t, i) => {
                  const x = 660 + i * 65;
                  return (
                    <g key={t}>
                      <rect
                        x={x}
                        y="240"
                        width="55"
                        height="50"
                        rx="8"
                        fill="white"
                        stroke="#0A3A6B"
                        strokeOpacity="0.30"
                        strokeWidth="1"
                      />
                      <text
                        x={x + 27.5}
                        y="270"
                        fontSize="11"
                        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                        fontWeight="600"
                        fill="#0A3A6B"
                        textAnchor="middle"
                      >
                        {t}
                      </text>
                    </g>
                  );
                })}
              </g>
            </g>

            {/* Connector down to core */}
            <line
              x1="550"
              y1="310"
              x2="550"
              y2="350"
              stroke="#0A3A6B"
              strokeOpacity="0.40"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />

            {/* Core substrate */}
            <g>
              <rect
                x="30"
                y="360"
                width="1040"
                height="140"
                rx="20"
                fill="url(#se-sk-core)"
              />
              <text
                x="50"
                y="392"
                fontSize="11"
                fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                fontWeight="600"
                fill="#9ED0F9"
                letterSpacing="1.4"
              >
                IA.00 · FLYTTGOTECH CORE
              </text>
              <text
                x="50"
                y="430"
                fontSize="22"
                fontFamily="ui-serif, Georgia, serif"
                fontWeight="500"
                fill="white"
              >
                Identity · audit · orchestration · data residency
              </text>
              <text
                x="50"
                y="460"
                fontSize="13"
                fontFamily="ui-sans-serif, system-ui, sans-serif"
                fill="rgba(255,255,255,0.65)"
              >
                Same substrate under every tier and every add-on.
              </text>
              <text
                x="50"
                y="482"
                fontSize="11"
                fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                fill="rgba(255,255,255,0.5)"
                letterSpacing="1.2"
              >
                DM.01 SAAS · DM.02 CUSTOMER CLOUD · DM.03 SOVEREIGN
              </text>
              {/* Three deployment substrate badges on the right */}
              <g transform="translate(720, 380)">
                <rect x="0" y="0" width="100" height="100" rx="12" fill="rgba(158,208,249,0.10)" stroke="rgba(158,208,249,0.25)" />
                <text x="50" y="38" textAnchor="middle" fontSize="10" fontFamily="ui-monospace, monospace" fontWeight="600" fill="#9ED0F9" letterSpacing="1.2">DM.01</text>
                <text x="50" y="62" textAnchor="middle" fontSize="13" fontFamily="ui-sans-serif, sans-serif" fontWeight="600" fill="white">SaaS</text>
                <text x="50" y="80" textAnchor="middle" fontSize="10" fontFamily="ui-sans-serif, sans-serif" fill="rgba(255,255,255,0.6)">FlyttGo-managed</text>
              </g>
              <g transform="translate(835, 380)">
                <rect x="0" y="0" width="100" height="100" rx="12" fill="rgba(15,181,166,0.10)" stroke="rgba(15,181,166,0.25)" />
                <text x="50" y="38" textAnchor="middle" fontSize="10" fontFamily="ui-monospace, monospace" fontWeight="600" fill="#0FB5A6" letterSpacing="1.2">DM.02</text>
                <text x="50" y="62" textAnchor="middle" fontSize="13" fontFamily="ui-sans-serif, sans-serif" fontWeight="600" fill="white">Cloud</text>
                <text x="50" y="80" textAnchor="middle" fontSize="10" fontFamily="ui-sans-serif, sans-serif" fill="rgba(255,255,255,0.6)">Customer tenancy</text>
              </g>
              <g transform="translate(950, 380)">
                <rect x="0" y="0" width="100" height="100" rx="12" fill="rgba(214,181,117,0.12)" stroke="rgba(214,181,117,0.30)" />
                <text x="50" y="38" textAnchor="middle" fontSize="10" fontFamily="ui-monospace, monospace" fontWeight="600" fill="#D6B575" letterSpacing="1.2">DM.03</text>
                <text x="50" y="62" textAnchor="middle" fontSize="13" fontFamily="ui-sans-serif, sans-serif" fontWeight="600" fill="white">Sovereign</text>
                <text x="50" y="80" textAnchor="middle" fontSize="10" fontFamily="ui-sans-serif, sans-serif" fill="rgba(255,255,255,0.6)">National DC</text>
              </g>
            </g>

            {/* Side annotation rail */}
            <text
              x="1090"
              y="86"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              fontWeight="600"
              fill="#94A3B8"
              letterSpacing="1.2"
              textAnchor="end"
              transform="rotate(-90, 1090, 86)"
            >
              ADD-ON LAYER · AO.01 → AO.08
            </text>
          </svg>
        </div>

        {/* Add-on legend chips below the diagram */}
        <ul className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2">
          {ADDONS.map((a) => {
            const Icon = a.icon;
            return (
              <li
                key={a.code}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/60"
              >
                <span
                  className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${a.accent}14`, color: a.accent }}
                  aria-hidden="true"
                >
                  <Icon size={13} strokeWidth={1.75} />
                </span>
                <div className="min-w-0">
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] font-semibold text-slate-500">
                    {a.code}
                  </div>
                  <div className="text-[12px] font-semibold tracking-tight text-slate-800 dark:text-slate-200 leading-tight truncate">
                    {a.name}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
