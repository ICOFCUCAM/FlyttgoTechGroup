import React from 'react';

/**
 * GV.04b — Platform orchestration diagram.
 *
 * Inline SVG companion to docs/government/platform-orchestration.svg.
 * Sits between the deployment-mode comparison matrix (GV.04) and
 * the sovereignty framework (GV.05); makes the four-band
 * architecture (service-delivery surface · FlyttGoTech Core ·
 * deployment substrate · sovereignty band) visible without leaving
 * the page.
 *
 * Renders as a horizontally-scrollable SVG on small viewports.
 */

const MODULES: Array<{
  code: string;
  name: string;
  line1: string;
  line2: string;
  meta: string;
  fill: string;
}> = [
  { code: 'PL.05', name: 'Identra',     line1: 'Identity',      line2: 'infrastructure', meta: 'eIDAS · SAML · OIDC',  fill: 'url(#gv-d-identra)' },
  { code: 'PL.06', name: 'Payvera',     line1: 'Payment',       line2: 'orchestration',  meta: 'PSD2 · SEPA',          fill: 'url(#gv-d-payvera)' },
  { code: 'PL.04', name: 'EduPro',      line1: 'Education',     line2: 'intelligence',   meta: 'Sectoral law',         fill: 'url(#gv-d-edupro)' },
  { code: 'PL.02', name: 'Workverge',   line1: 'Workforce',     line2: 'coordination',   meta: 'Labour-law aware',     fill: 'url(#gv-d-workverge)' },
  { code: 'PL.01', name: 'Transify',    line1: 'Mobility',      line2: 'infrastructure', meta: 'Transport-reg',        fill: 'url(#gv-d-transify)' },
  { code: 'PL.03', name: 'Civitas',     line1: 'Municipal &',   line2: 'government',     meta: 'GDPR · sectoral',      fill: 'url(#gv-d-civitas)' },
  { code: 'PL.07', name: 'Ledgera',     line1: 'Financial',     line2: 'operations',     meta: 'IFRS · SAF-T',         fill: 'url(#gv-d-ledgera)' },
  { code: 'PL.08', name: 'Marketplace', line1: 'Regulated',     line2: 'multi-sided',    meta: 'Sectoral law',         fill: 'url(#gv-d-marketplace)' },
];

export default function PlatformOrchestrationDiagram() {
  return (
    <section
      id="gv-04b"
      aria-labelledby="gv-04b-heading"
      className="relative bg-white dark:bg-slate-950 py-20 lg:py-24 border-t border-slate-200/60 dark:border-slate-800/60 scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
          <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">GV.04b</span>
          <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
          <span>Orchestration architecture</span>
        </div>

        <h2
          id="gv-04b-heading"
          className="mt-6 font-serif text-3xl md:text-4xl font-medium tracking-tight text-slate-900 dark:text-white leading-[1.05] max-w-3xl"
        >
          Eight modules.{' '}
          <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
            One orchestration core.
          </em>
        </h2>
        <p className="mt-4 max-w-3xl text-base text-slate-600 dark:text-slate-400 leading-[1.65]">
          Service-delivery surface · FlyttGoTech Core (PaaS) ·
          deployment substrate (IaaS-compatible) · sovereignty
          posture. The same architecture every public-sector
          deployment lands against, regardless of which module
          mix the programme licenses.
        </p>

        <div className="mt-10 p-3 sm:p-5 rounded-2xl bg-[#FBFCFE] dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 overflow-x-auto">
          <svg
            viewBox="0 0 1200 720"
            className="block w-full h-auto min-w-[900px]"
            role="img"
            aria-label="FlyttGoTech Core orchestration across identity, payments, education, workforce, mobility, municipal services and financial operations"
          >
            <defs>
              <linearGradient id="gv-d-transify" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#0A3A6B"/><stop offset="100%" stopColor="#1E6FD9"/></linearGradient>
              <linearGradient id="gv-d-workverge" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#0A3A2A"/><stop offset="100%" stopColor="#0FB5A6"/></linearGradient>
              <linearGradient id="gv-d-civitas" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#2A1B47"/><stop offset="100%" stopColor="#7C5CE6"/></linearGradient>
              <linearGradient id="gv-d-edupro" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#5C4A24"/><stop offset="100%" stopColor="#D6B575"/></linearGradient>
              <linearGradient id="gv-d-identra" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#1B2D4D"/><stop offset="100%" stopColor="#5B7FBF"/></linearGradient>
              <linearGradient id="gv-d-payvera" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#143E2A"/><stop offset="100%" stopColor="#2BA876"/></linearGradient>
              <linearGradient id="gv-d-ledgera" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#4D2818"/><stop offset="100%" stopColor="#B85C3E"/></linearGradient>
              <linearGradient id="gv-d-marketplace" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#6B3D0A"/><stop offset="100%" stopColor="#D9A21E"/></linearGradient>
              <linearGradient id="gv-d-core" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#0A1F3D"/><stop offset="100%" stopColor="#0A3A6B"/></linearGradient>
              <linearGradient id="gv-d-sov" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#070D1A"/><stop offset="100%" stopColor="#0A1F3D"/></linearGradient>
            </defs>

            <rect x="0" y="0" width="1200" height="720" fill="#FBFCFE" />

            {/* Title */}
            <g transform="translate(40,28)">
              <text x="0" y="0" fontFamily="ui-monospace, 'JetBrains Mono', monospace" fontSize="11" fontWeight="600" letterSpacing="2.4" fill="#0A3A6B">FLYTTGOTECH.OR · ORCHESTRATION ARCHITECTURE</text>
              <text x="0" y="28" fontFamily="'IBM Plex Serif', Georgia, serif" fontSize="22" fontWeight="500" fill="#0A1F3D">FlyttGoTech Core orchestrating eight platform modules across three deployment modes.</text>
              <text x="0" y="50" fontFamily="Inter, system-ui, sans-serif" fontSize="13" fill="#475569">Service-delivery surface · orchestration substrate · deployment substrate · sovereignty posture</text>
            </g>

            {/* Band 1 — modules */}
            <g transform="translate(40,110)">
              <text x="0" y="-8" fontFamily="ui-monospace, 'JetBrains Mono', monospace" fontSize="10" fontWeight="600" letterSpacing="2.2" fill="#94A3B8">SD.00 · SERVICE-DELIVERY SURFACE · SAAS</text>
              {MODULES.map((m, i) => {
                const x = i * 140;
                const tx = x + 14;
                return (
                  <g key={m.code}>
                    <rect x={x} y="0" width="130" height="110" rx="8" fill={m.fill} />
                    <text x={tx} y="22" fontFamily="ui-monospace, 'JetBrains Mono', monospace" fontSize="9" fontWeight="600" letterSpacing="1.6" fill="#FFFFFF" opacity="0.85">{m.code}</text>
                    <text x={tx} y="48" fontFamily="Inter, system-ui, sans-serif" fontSize="14" fontWeight="600" fill="#FFFFFF">{m.name}</text>
                    <text x={tx} y="68" fontFamily="Inter, system-ui, sans-serif" fontSize="10" fill="#FFFFFF" opacity="0.85">{m.line1}</text>
                    <text x={tx} y="83" fontFamily="Inter, system-ui, sans-serif" fontSize="10" fill="#FFFFFF" opacity="0.85">{m.line2}</text>
                    <text x={tx} y="100" fontFamily="ui-monospace, 'JetBrains Mono', monospace" fontSize="8" letterSpacing="1.2" fill="#FFFFFF" opacity="0.65">{m.meta}</text>
                  </g>
                );
              })}
            </g>

            {/* Connectors module → core */}
            <g stroke="#94A3B8" strokeWidth="1.2" strokeDasharray="2 3" fill="none">
              {[105, 245, 385, 525, 665, 805, 945, 1085].map((x) => (
                <line key={x} x1={x} y1="220" x2={x} y2="260" />
              ))}
            </g>

            {/* Band 2 — core */}
            <g transform="translate(40,260)">
              <rect x="0" y="0" width="1110" height="120" rx="10" fill="url(#gv-d-core)" />
              <text x="20" y="26" fontFamily="ui-monospace, 'JetBrains Mono', monospace" fontSize="10" fontWeight="600" letterSpacing="2.2" fill="#9ED0F9">OR.00 · FLYTTGOTECH CORE · PAAS ORCHESTRATION</text>
              <text x="20" y="56" fontFamily="'IBM Plex Serif', Georgia, serif" fontSize="20" fontWeight="500" fill="#FFFFFF">FlyttGoTech Core</text>
              <text x="20" y="78" fontFamily="Inter, system-ui, sans-serif" fontSize="12" fill="#FFFFFF" opacity="0.78">Identity broker · audit log · event bus · policy engine · workflow runner · regional federation · observability fabric</text>
              <text x="20" y="100" fontFamily="ui-monospace, 'JetBrains Mono', monospace" fontSize="9" letterSpacing="1.6" fill="#9ED0F9" opacity="0.78">Single substrate · all modules orchestrated · append-only audit · regional residency aware</text>
              <g fontFamily="ui-monospace, 'JetBrains Mono', monospace" fontSize="9" fontWeight="600" letterSpacing="1.2" fill="#0A1F3D">
                <rect x="700" y="60" width="80" height="22" rx="3" fill="#9ED0F9" />
                <text x="740" y="75" textAnchor="middle">IDENTITY</text>
                <rect x="785" y="60" width="62" height="22" rx="3" fill="#9ED0F9" />
                <text x="816" y="75" textAnchor="middle">AUDIT</text>
                <rect x="852" y="60" width="74" height="22" rx="3" fill="#9ED0F9" />
                <text x="889" y="75" textAnchor="middle">EVENTS</text>
                <rect x="931" y="60" width="62" height="22" rx="3" fill="#9ED0F9" />
                <text x="962" y="75" textAnchor="middle">POLICY</text>
                <rect x="998" y="60" width="100" height="22" rx="3" fill="#9ED0F9" />
                <text x="1048" y="75" textAnchor="middle">FEDERATION</text>
              </g>
            </g>

            {/* Connectors core → deployment */}
            <g stroke="#94A3B8" strokeWidth="1.2" strokeDasharray="2 3" fill="none">
              <line x1="245" y1="380" x2="245" y2="420" />
              <line x1="595" y1="380" x2="595" y2="420" />
              <line x1="945" y1="380" x2="945" y2="420" />
            </g>

            {/* Band 3 — deployment substrate */}
            <g transform="translate(40,420)">
              <text x="0" y="-8" fontFamily="ui-monospace, 'JetBrains Mono', monospace" fontSize="10" fontWeight="600" letterSpacing="2.2" fill="#94A3B8">DM.00 · DEPLOYMENT SUBSTRATE · IAAS-COMPATIBLE</text>
              {/* DM.01 */}
              <rect x="0" y="0" width="360" height="120" rx="8" fill="#FFFFFF" stroke="#1E6FD9" strokeWidth="1.5"/>
              <text x="20" y="26" fontFamily="ui-monospace, 'JetBrains Mono', monospace" fontSize="10" fontWeight="700" letterSpacing="1.6" fill="#1E6FD9">DM.01 · MANAGED SAAS</text>
              <text x="20" y="50" fontFamily="'IBM Plex Serif', Georgia, serif" fontSize="16" fontWeight="500" fill="#0A1F3D">FlyttGo-managed</text>
              <text x="20" y="72" fontFamily="Inter, system-ui, sans-serif" fontSize="11" fill="#475569">Region-aware managed tenants in primary EU regions.</text>
              <text x="20" y="92" fontFamily="ui-monospace, 'JetBrains Mono', monospace" fontSize="9" letterSpacing="1.4" fill="#94A3B8">FLYTTGO KMS · 99.95% · 14-DAY ROLLING</text>
              <text x="20" y="108" fontFamily="ui-monospace, 'JetBrains Mono', monospace" fontSize="9" letterSpacing="1.4" fill="#94A3B8">PILOT-TO-PROD: 60–90 DAYS</text>
              {/* DM.02 */}
              <rect x="375" y="0" width="360" height="120" rx="8" fill="#FFFFFF" stroke="#0FB5A6" strokeWidth="1.5"/>
              <text x="395" y="26" fontFamily="ui-monospace, 'JetBrains Mono', monospace" fontSize="10" fontWeight="700" letterSpacing="1.6" fill="#0FB5A6">DM.02 · CUSTOMER CLOUD</text>
              <text x="395" y="50" fontFamily="'IBM Plex Serif', Georgia, serif" fontSize="16" fontWeight="500" fill="#0A1F3D">Customer cloud</text>
              <text x="395" y="72" fontFamily="Inter, system-ui, sans-serif" fontSize="11" fill="#475569">Inside customer AWS · Azure · GCP tenancy. BYO cloud.</text>
              <text x="395" y="92" fontFamily="ui-monospace, 'JetBrains Mono', monospace" fontSize="9" letterSpacing="1.4" fill="#94A3B8">CUSTOMER KMS · BYOK / HYOK · CUSTOMER SOC</text>
              <text x="395" y="108" fontFamily="ui-monospace, 'JetBrains Mono', monospace" fontSize="9" letterSpacing="1.4" fill="#94A3B8">PILOT-TO-PROD: 75–120 DAYS</text>
              {/* DM.03 */}
              <rect x="750" y="0" width="360" height="120" rx="8" fill="#FFFFFF" stroke="#7C5CE6" strokeWidth="1.5"/>
              <text x="770" y="26" fontFamily="ui-monospace, 'JetBrains Mono', monospace" fontSize="10" fontWeight="700" letterSpacing="1.6" fill="#7C5CE6">DM.03 · SOVEREIGN DATACENTER</text>
              <text x="770" y="50" fontFamily="'IBM Plex Serif', Georgia, serif" fontSize="16" fontWeight="500" fill="#0A1F3D">Sovereign national</text>
              <text x="770" y="72" fontFamily="Inter, system-ui, sans-serif" fontSize="11" fill="#475569">Certified national datacenter · national HSM · sovereign eID.</text>
              <text x="770" y="92" fontFamily="ui-monospace, 'JetBrains Mono', monospace" fontSize="9" letterSpacing="1.4" fill="#94A3B8">NATIONAL HSM · IN-JURISDICTION · CLOUD-ACT EXEMPT</text>
              <text x="770" y="108" fontFamily="ui-monospace, 'JetBrains Mono', monospace" fontSize="9" letterSpacing="1.4" fill="#94A3B8">PILOT-TO-PROD: 120–180 DAYS</text>
            </g>

            {/* Connectors deployment → sovereignty */}
            <g stroke="#94A3B8" strokeWidth="1.2" strokeDasharray="2 3" fill="none">
              <line x1="220" y1="540" x2="220" y2="580" />
              <line x1="595" y1="540" x2="595" y2="580" />
              <line x1="970" y1="540" x2="970" y2="580" />
            </g>

            {/* Band 4 — sovereignty posture */}
            <g transform="translate(40,580)">
              <rect x="0" y="0" width="1110" height="100" rx="10" fill="url(#gv-d-sov)" />
              <text x="20" y="26" fontFamily="ui-monospace, 'JetBrains Mono', monospace" fontSize="10" fontWeight="600" letterSpacing="2.2" fill="#D6B575">SV.00 · SOVEREIGNTY · NATIONAL INFRASTRUCTURE READINESS</text>
              <g fontFamily="Inter, system-ui, sans-serif" fontSize="11" fill="#FFFFFF">
                <g transform="translate(20,52)">
                  <text fontFamily="ui-monospace, 'JetBrains Mono', monospace" fontSize="9" letterSpacing="1.4" fill="#D6B575">DATA RESIDENCY</text>
                  <text y="18" opacity="0.85">In-region · in-tenancy · in-jurisdiction</text>
                </g>
                <g transform="translate(290,52)">
                  <text fontFamily="ui-monospace, 'JetBrains Mono', monospace" fontSize="9" letterSpacing="1.4" fill="#D6B575">KEY CUSTODY</text>
                  <text y="18" opacity="0.85">FlyttGo KMS · BYOK · National HSM</text>
                </g>
                <g transform="translate(560,52)">
                  <text fontFamily="ui-monospace, 'JetBrains Mono', monospace" fontSize="9" letterSpacing="1.4" fill="#D6B575">IDENTITY BOUNDARY</text>
                  <text y="18" opacity="0.85">FlyttGo IdP · Customer IdP · Sovereign eID</text>
                </g>
                <g transform="translate(870,52)">
                  <text fontFamily="ui-monospace, 'JetBrains Mono', monospace" fontSize="9" letterSpacing="1.4" fill="#D6B575">RIGHT TO AUDIT</text>
                  <text y="18" opacity="0.85">30-day notice · regulator-bounded</text>
                </g>
              </g>
            </g>

            {/* Footer */}
            <g transform="translate(40,700)">
              <text x="0" y="0" fontFamily="ui-monospace, 'JetBrains Mono', monospace" fontSize="9" letterSpacing="1.6" fill="#94A3B8">FLYTTGO TECHNOLOGIES GROUP AB · GOVERNMENT CAPABILITY DIAGRAM · GCB.00</text>
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}
