import React from 'react';

const VBOX_W = 920;
const VBOX_H = 320;

const REGIONS = [
  {
    code: 'EU',
    name: 'Europe',
    cx: 220,
    cy: 130,
    r: 70,
    accent: '#1E6FD9',
    note: 'Primary managed region',
    countries: ['NO', 'SE', 'DK', 'FI', 'DE', 'FR', 'NL', 'UK'],
  },
  {
    code: 'AF',
    name: 'Africa',
    cx: 470,
    cy: 200,
    r: 60,
    accent: '#0FB5A6',
    note: 'Customer-cloud + sovereign',
    countries: ['ZA', 'KE', 'NG', 'EG', 'MA', 'TZ'],
  },
  {
    code: 'MENA',
    name: 'Middle East',
    cx: 700,
    cy: 145,
    r: 65,
    accent: '#7C5CE6',
    note: 'Sovereign deployment',
    countries: ['SA', 'AE', 'QA', 'KW', 'OM', 'BH'],
  },
];

/**
 * Regional rollout map — three capability clusters connected by data
 * exchange paths. Not a literal geography map; a topology of regions that
 * mirrors the deployment / sovereignty story.
 */
const RegionalRollout: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={className}>
      <svg
        viewBox={`0 0 ${VBOX_W} ${VBOX_H}`}
        className="w-full h-auto"
        role="img"
        aria-label="FlyttGo regional rollout — three capability clusters across Europe, Africa, and the Middle East with cross-region data exchange paths"
      >
        <defs>
          <radialGradient id="region-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1E6FD9" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#1E6FD9" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="region-link" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#0A3A6B" stopOpacity="0.05" />
            <stop offset="50%" stopColor="#0A3A6B" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#0A3A6B" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* Faint grid backdrop */}
        <g opacity="0.4">
          {Array.from({ length: 12 }).map((_, i) => (
            <line
              key={`v${i}`}
              x1={(i + 1) * (VBOX_W / 13)}
              y1="0"
              x2={(i + 1) * (VBOX_W / 13)}
              y2={VBOX_H}
              stroke="#E2E8F0"
              strokeWidth="0.5"
              strokeDasharray="2 4"
            />
          ))}
          {Array.from({ length: 6 }).map((_, i) => (
            <line
              key={`h${i}`}
              x1="0"
              y1={(i + 1) * (VBOX_H / 7)}
              x2={VBOX_W}
              y2={(i + 1) * (VBOX_H / 7)}
              stroke="#E2E8F0"
              strokeWidth="0.5"
              strokeDasharray="2 4"
            />
          ))}
        </g>

        {/* Cross-region links (curved) */}
        <path
          d={`M ${REGIONS[0].cx + 40} ${REGIONS[0].cy + 30}
              Q ${(REGIONS[0].cx + REGIONS[1].cx) / 2} ${VBOX_H - 30}
              ${REGIONS[1].cx - 40} ${REGIONS[1].cy - 10}`}
          stroke="url(#region-link)"
          strokeWidth="1.25"
          fill="none"
        />
        <path
          d={`M ${REGIONS[1].cx + 40} ${REGIONS[1].cy - 30}
              Q ${(REGIONS[1].cx + REGIONS[2].cx) / 2} ${VBOX_H / 2}
              ${REGIONS[2].cx - 40} ${REGIONS[2].cy + 10}`}
          stroke="url(#region-link)"
          strokeWidth="1.25"
          fill="none"
        />
        <path
          d={`M ${REGIONS[0].cx + 60} ${REGIONS[0].cy - 20}
              Q ${(REGIONS[0].cx + REGIONS[2].cx) / 2} ${REGIONS[2].cy - 80}
              ${REGIONS[2].cx - 50} ${REGIONS[2].cy - 20}`}
          stroke="url(#region-link)"
          strokeWidth="1.25"
          fill="none"
          strokeDasharray="3 3"
        />

        {/* Region nodes */}
        {REGIONS.map((r) => (
          <g key={r.code}>
            <circle cx={r.cx} cy={r.cy} r={r.r} fill="url(#region-glow)" />
            <circle
              cx={r.cx}
              cy={r.cy}
              r={r.r * 0.55}
              fill="#FFFFFF"
              stroke={r.accent}
              strokeWidth="1.5"
            />
            <text
              x={r.cx}
              y={r.cy - 4}
              textAnchor="middle"
              fontFamily="ui-monospace, JetBrains Mono, monospace"
              fontSize="11"
              fontWeight="700"
              fill={r.accent}
              style={{ letterSpacing: '0.2em' }}
            >
              {r.code}
            </text>
            <text
              x={r.cx}
              y={r.cy + 14}
              textAnchor="middle"
              fontFamily="ui-sans-serif, Inter, system-ui, sans-serif"
              fontSize="11"
              fill="#0F172A"
              fontWeight="600"
            >
              {r.name}
            </text>

            {/* Country tokens orbiting the region */}
            {r.countries.map((c, i) => {
              const angle =
                (i / r.countries.length) * Math.PI * 2 - Math.PI / 2;
              const cx = r.cx + Math.cos(angle) * (r.r + 18);
              const cy = r.cy + Math.sin(angle) * (r.r + 18);
              return (
                <text
                  key={`${r.code}-${c}`}
                  x={cx}
                  y={cy}
                  textAnchor="middle"
                  fontFamily="ui-monospace, JetBrains Mono, monospace"
                  fontSize="9"
                  fill="#64748B"
                  style={{ letterSpacing: '0.18em' }}
                  dominantBaseline="middle"
                >
                  {c}
                </text>
              );
            })}

            {/* Note line below */}
            <text
              x={r.cx}
              y={r.cy + r.r + 38}
              textAnchor="middle"
              fontFamily="ui-monospace, JetBrains Mono, monospace"
              fontSize="9"
              fill={r.accent}
              style={{ letterSpacing: '0.14em' }}
            >
              {r.note.toUpperCase()}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

export default RegionalRollout;
