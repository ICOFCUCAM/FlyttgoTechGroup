import React from 'react';

type Layer = {
  code: string;
  name: string;
  tokens: string[];
  accent: string;
};

const LAYERS: Layer[] = [
  {
    code: 'L5',
    name: 'Service delivery',
    tokens: ['Civitas', 'EduPro', 'FlyttGo Marketplace'],
    accent: '#7C5CE6',
  },
  {
    code: 'L4',
    name: 'Mobility orchestration',
    tokens: ['Transify', 'Workverge'],
    accent: '#60A5FA',
  },
  {
    code: 'L3',
    name: 'Payments + financial ops',
    tokens: ['Payvera', 'Ledgera'],
    accent: '#F5B547',
  },
  {
    code: 'L2',
    name: 'Identity + auth',
    tokens: ['Identra', 'OIDC', 'SAML', 'eIDAS'],
    accent: '#0FB5A6',
  },
  {
    code: 'L1',
    name: 'Data exchange',
    tokens: ['PostgreSQL', 'PostGIS', 'Redis', 'Kafka'],
    accent: '#94A3B8',
  },
  {
    code: 'L0',
    name: 'Cloud-native runtime',
    tokens: ['Next.js', 'NestJS', 'Docker', 'Kubernetes', 'AWS · Azure · GCP'],
    accent: '#475569',
  },
];

const VBOX_W = 920;
const VBOX_H = 360;
const LAYER_H = 48;
const LAYER_GAP = 6;
const PADDING_Y = 30;

/**
 * Layered infrastructure stack — six labelled layers stacked top-down,
 * each annotated with technology / platform tokens. Pure SVG primitives;
 * tokens render through foreignObject so they get system font metrics
 * without forcing the SVG to ship glyphs.
 */
const LayeredStack: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={className}>
      <svg
        viewBox={`0 0 ${VBOX_W} ${VBOX_H}`}
        className="w-full h-auto"
        role="img"
        aria-label="FlyttGo six-layer infrastructure stack — service delivery, mobility orchestration, payments, identity, data exchange, cloud-native runtime"
      >
        <defs>
          <linearGradient id="layer-rule" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#0A1F3D" stopOpacity="0" />
            <stop offset="50%" stopColor="#0A1F3D" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#0A1F3D" stopOpacity="0" />
          </linearGradient>
        </defs>

        {LAYERS.map((layer, i) => {
          const y = PADDING_Y + i * (LAYER_H + LAYER_GAP);
          return (
            <g key={layer.code}>
              {/* Layer band */}
              <rect
                x="0"
                y={y}
                width={VBOX_W}
                height={LAYER_H}
                fill={`${layer.accent}10`}
                stroke={`${layer.accent}33`}
                strokeWidth="1"
                rx="6"
              />
              {/* Accent rule on the left edge */}
              <rect
                x="0"
                y={y}
                width="3"
                height={LAYER_H}
                fill={layer.accent}
                rx="1"
              />
              {/* Layer code (mono) */}
              <text
                x="20"
                y={y + LAYER_H / 2 + 4}
                fontFamily="ui-monospace, JetBrains Mono, monospace"
                fontSize="11"
                fontWeight="600"
                fill={layer.accent}
                style={{ letterSpacing: '0.18em' }}
              >
                {layer.code}
              </text>
              {/* Layer name */}
              <text
                x="68"
                y={y + LAYER_H / 2 + 4}
                fontFamily="ui-sans-serif, Inter, system-ui, sans-serif"
                fontSize="13"
                fontWeight="600"
                fill="#0F172A"
              >
                {layer.name}
              </text>
              {/* Tokens (mono) — right-aligned via dx tricks */}
              <text
                x={VBOX_W - 20}
                y={y + LAYER_H / 2 + 4}
                fontFamily="ui-monospace, JetBrains Mono, monospace"
                fontSize="11"
                fill="#475569"
                textAnchor="end"
                style={{ letterSpacing: '0.04em' }}
              >
                {layer.tokens.join(' · ')}
              </text>
            </g>
          );
        })}

        {/* Bottom data-flow rule signalling the stack is bidirectional */}
        <rect
          x="0"
          y={PADDING_Y + LAYERS.length * (LAYER_H + LAYER_GAP)}
          width={VBOX_W}
          height="1"
          fill="url(#layer-rule)"
        />
      </svg>
    </div>
  );
};

export default LayeredStack;
