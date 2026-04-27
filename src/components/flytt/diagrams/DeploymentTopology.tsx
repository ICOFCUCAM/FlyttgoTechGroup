import React from 'react';

const VBOX_W = 920;
const VBOX_H = 360;

/**
 * Deployment topology — three-mode capability surface showing how a single
 * platform tenant flows into FlyttGo-managed, customer cloud, or sovereign
 * datacenter. SVG only; renders identically on light + dark via CSS vars.
 */
const DeploymentTopology: React.FC<{ className?: string }> = ({ className }) => {
  const cx = VBOX_W / 2;
  const tenantY = 40;
  const tenantW = 260;
  const tenantH = 56;

  const modes = [
    {
      x: 60,
      label: 'FlyttGo-managed',
      sub: 'Region-aware managed SaaS',
      tag: 'DM.01',
      stamp: 'EU primary',
      accent: '#1E6FD9',
    },
    {
      x: VBOX_W / 2 - 130,
      label: 'Customer cloud',
      sub: 'AWS · Azure · GCP tenancy',
      tag: 'DM.02',
      stamp: 'BYOC',
      accent: '#0FB5A6',
    },
    {
      x: VBOX_W - 320,
      label: 'Sovereign datacenter',
      sub: 'National DC, optional air-gap',
      tag: 'DM.03',
      stamp: 'In-jurisdiction',
      accent: '#7C5CE6',
    },
  ];

  return (
    <div className={className}>
      <svg
        viewBox={`0 0 ${VBOX_W} ${VBOX_H}`}
        className="w-full h-auto"
        role="img"
        aria-label="FlyttGo deployment topology — single tenant entry routes into three deployment modes: managed SaaS, customer cloud, or sovereign datacenter"
      >
        <defs>
          <linearGradient id="dt-spoke" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#0A3A6B" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#0A3A6B" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* Tenant entry */}
        <g>
          <rect
            x={cx - tenantW / 2}
            y={tenantY}
            width={tenantW}
            height={tenantH}
            rx="10"
            fill="#0A1F3D"
          />
          <text
            x={cx}
            y={tenantY + 22}
            textAnchor="middle"
            fontFamily="ui-monospace, JetBrains Mono, monospace"
            fontSize="10"
            fill="#9ED0F9"
            style={{ letterSpacing: '0.22em' }}
          >
            DT.00 · TENANT ENTRY
          </text>
          <text
            x={cx}
            y={tenantY + 42}
            textAnchor="middle"
            fontFamily="ui-sans-serif, Inter, system-ui, sans-serif"
            fontSize="14"
            fontWeight="600"
            fill="#FFFFFF"
          >
            FlyttGo platform tenant
          </text>
        </g>

        {/* Connector spokes — split + curve into each mode column */}
        {modes.map((m, i) => {
          const startX = cx;
          const startY = tenantY + tenantH;
          const endX = m.x + 130;
          const endY = 160;
          const cpY = (startY + endY) / 2;
          return (
            <path
              key={`spoke-${i}`}
              d={`M ${startX} ${startY} C ${startX} ${cpY}, ${endX} ${cpY}, ${endX} ${endY}`}
              stroke="url(#dt-spoke)"
              strokeWidth="1.25"
              fill="none"
            />
          );
        })}

        {/* Mode columns */}
        {modes.map((m) => (
          <g key={m.label}>
            <rect
              x={m.x}
              y="160"
              width="260"
              height="160"
              rx="12"
              fill="#FFFFFF"
              stroke={`${m.accent}33`}
              strokeWidth="1"
            />
            <rect x={m.x} y="160" width="3" height="160" fill={m.accent} rx="1" />
            <text
              x={m.x + 20}
              y="184"
              fontFamily="ui-monospace, JetBrains Mono, monospace"
              fontSize="10"
              fontWeight="600"
              fill={m.accent}
              style={{ letterSpacing: '0.22em' }}
            >
              {m.tag}
            </text>
            <text
              x={m.x + 20}
              y="212"
              fontFamily="ui-sans-serif, Inter, system-ui, sans-serif"
              fontSize="15"
              fontWeight="600"
              fill="#0F172A"
            >
              {m.label}
            </text>
            <text
              x={m.x + 20}
              y="232"
              fontFamily="ui-sans-serif, Inter, system-ui, sans-serif"
              fontSize="12"
              fill="#475569"
            >
              {m.sub}
            </text>
            {/* Status stamp — small mono pill */}
            <g>
              <rect
                x={m.x + 20}
                y="252"
                width="120"
                height="22"
                rx="4"
                fill={`${m.accent}14`}
                stroke={`${m.accent}55`}
                strokeWidth="0.75"
              />
              <text
                x={m.x + 30}
                y="267"
                fontFamily="ui-monospace, JetBrains Mono, monospace"
                fontSize="10"
                fill={m.accent}
                style={{ letterSpacing: '0.14em' }}
              >
                {m.stamp.toUpperCase()}
              </text>
            </g>
          </g>
        ))}
      </svg>
    </div>
  );
};

export default DeploymentTopology;
