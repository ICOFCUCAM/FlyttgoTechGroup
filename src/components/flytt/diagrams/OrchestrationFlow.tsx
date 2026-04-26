import React from 'react';

const VBOX_W = 920;
const VBOX_H = 220;

type Stage = {
  code: string;
  name: string;
  module: string;
  accent: string;
};

const STAGES: Stage[] = [
  { code: 'OF.01', name: 'Identity', module: 'Identra', accent: '#0FB5A6' },
  { code: 'OF.02', name: 'Payments', module: 'Payvera', accent: '#F5B547' },
  { code: 'OF.03', name: 'Mobility', module: 'Transify', accent: '#60A5FA' },
  { code: 'OF.04', name: 'Workforce', module: 'Workverge', accent: '#5EEAD4' },
  { code: 'OF.05', name: 'Financial ops', module: 'Ledgera', accent: '#2DD4BF' },
];

/**
 * Orchestration flow — left-to-right pipeline showing how the modular
 * platforms compose at runtime. Each stage is a card with mono code,
 * stage name, and the platform module that owns it. Arrows between
 * cards signal data + control flow.
 */
const OrchestrationFlow: React.FC<{ className?: string }> = ({ className }) => {
  const cardW = 150;
  const cardH = 92;
  const gap =
    (VBOX_W - 80 - cardW * STAGES.length) / (STAGES.length - 1);

  return (
    <div className={className}>
      <svg
        viewBox={`0 0 ${VBOX_W} ${VBOX_H}`}
        className="w-full h-auto"
        role="img"
        aria-label="Identity → Payments → Mobility → Workforce → Financial ops orchestration flow"
      >
        <defs>
          <marker
            id="of-arrow"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M0,0 L10,5 L0,10 z" fill="#0A3A6B" opacity="0.5" />
          </marker>
        </defs>

        {STAGES.map((s, i) => {
          const x = 40 + i * (cardW + gap);
          const y = (VBOX_H - cardH) / 2;
          return (
            <g key={s.code}>
              {/* Connector to next stage */}
              {i < STAGES.length - 1 && (
                <line
                  x1={x + cardW + 4}
                  y1={y + cardH / 2}
                  x2={x + cardW + gap - 4}
                  y2={y + cardH / 2}
                  stroke="#0A3A6B"
                  strokeOpacity="0.35"
                  strokeWidth="1.25"
                  markerEnd="url(#of-arrow)"
                />
              )}

              {/* Card */}
              <rect
                x={x}
                y={y}
                width={cardW}
                height={cardH}
                rx="10"
                fill="#FFFFFF"
                stroke={`${s.accent}55`}
                strokeWidth="1"
              />
              <rect x={x} y={y} width="3" height={cardH} fill={s.accent} rx="1" />

              <text
                x={x + 16}
                y={y + 24}
                fontFamily="ui-monospace, JetBrains Mono, monospace"
                fontSize="10"
                fontWeight="600"
                fill={s.accent}
                style={{ letterSpacing: '0.22em' }}
              >
                {s.code}
              </text>
              <text
                x={x + 16}
                y={y + 50}
                fontFamily="ui-sans-serif, Inter, system-ui, sans-serif"
                fontSize="14"
                fontWeight="600"
                fill="#0F172A"
              >
                {s.name}
              </text>
              <text
                x={x + 16}
                y={y + 72}
                fontFamily="ui-monospace, JetBrains Mono, monospace"
                fontSize="11"
                fill="#475569"
                style={{ letterSpacing: '0.04em' }}
              >
                → {s.module}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default OrchestrationFlow;
