import React from 'react';
import {
  Workflow,
  Fingerprint,
  CreditCard,
  Route,
  UserCheck,
  GraduationCap,
  Calculator,
} from 'lucide-react';

/**
 * FlyttGoTech Core orchestration explainer.
 *
 * Sits between the platform-ecosystem overview and the deployment
 * strip on the homepage. Reads as the architectural answer to "what
 * actually ties the eight modules together?" — explicitly names the
 * Core orchestration layer, then lists the six interoperability
 * planes (identity, payments, mobility, workforce, education,
 * financial operations) that compose at runtime.
 *
 * Editorial tone — not a product banner. Designed to read as the
 * paragraph an enterprise-architect would expect on Page 1 of an
 * RFI response.
 */

const PLANES = [
  {
    code: 'OR.IDN',
    icon: Fingerprint,
    title: 'Identity layer',
    body: 'Identra anchors every cross-module call — SSO, MFA, eIDAS-LoA, qualified-signature flows. Every audited action carries the same identity envelope.',
    accent: '#0FB5A6',
  },
  {
    code: 'OR.PAY',
    icon: CreditCard,
    title: 'Payments layer',
    body: 'Payvera handles SCA, open-banking endpoints, and transaction monitoring. Settles into Ledgera with VAT-coded line detail in the same orchestration step.',
    accent: '#F5B547',
  },
  {
    code: 'OR.MOB',
    icon: Route,
    title: 'Mobility layer',
    body: 'Transify dispatches fleet, telematics and corridor coordination. Acts as the runtime under the FlyttGo marketplace and any third-party transport authority.',
    accent: '#60A5FA',
  },
  {
    code: 'OR.WRK',
    icon: UserCheck,
    title: 'Workforce layer',
    body: 'Workverge plans rosters, qualification states, and field-team assignments. Identra-bound; logs into the same audit trail as financial events.',
    accent: '#5EEAD4',
  },
  {
    code: 'OR.EDU',
    icon: GraduationCap,
    title: 'Education layer',
    body: 'EduPro routes admissions, scholarships and ministry-grade reporting. Federates identity with Identra and emits payments via Payvera for fees and stipends.',
    accent: '#A78BFA',
  },
  {
    code: 'OR.FIN',
    icon: Calculator,
    title: 'Financial operations layer',
    body: 'Ledgera receives every monetary event from the planes above, posts double-entry, and emits SAF-T XML / VAT-100 / GAAP bundle / IFRS package on demand.',
    accent: '#2DD4BF',
  },
];

export default function HomeOrchestrationCore() {
  return (
    <section
      aria-labelledby="orchestration-core-heading"
      className="relative bg-white dark:bg-slate-950 py-20 lg:py-24 border-t border-slate-200/60 dark:border-slate-800/60"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
          <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">
            OR.00
          </span>
          <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
          <span>FlyttGoTech Core orchestration</span>
        </div>

        <div className="mt-6 grid lg:grid-cols-12 gap-8 items-end">
          <h2
            id="orchestration-core-heading"
            className="scroll-reveal-tighten lg:col-span-7 font-serif text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-slate-900 dark:text-white leading-[1.05]"
          >
            One orchestration layer.{' '}
            <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
              Six interoperability planes.
            </em>
          </h2>
          <p className="lg:col-span-5 text-base text-slate-600 dark:text-slate-400 leading-[1.65]">
            FlyttGoTech Core is the runtime that lets the modules behave as
            one platform. Identity authenticates, payments settle, mobility
            dispatches, workforce executes, education routes, financial
            operations close the books — every event traversing the same
            audit envelope. Deployable as SaaS, customer-cloud, or
            sovereign environments.
          </p>
        </div>

        {/* Core hub diagram + planes grid */}
        <div className="mt-12 grid lg:grid-cols-12 gap-8">
          {/* Diagram column */}
          <div className="lg:col-span-5">
            <div className="relative aspect-square max-w-md mx-auto">
              <svg
                viewBox="0 0 400 400"
                className="w-full h-full"
                aria-label="FlyttGoTech Core orchestration hub with six interoperability planes"
                role="img"
              >
                <defs>
                  <radialGradient id="or-core-glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#1E6FD9" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#1E6FD9" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Concentric outer rings */}
                <circle cx="200" cy="200" r="180" fill="none" stroke="#E2E8F0" strokeWidth="0.5" strokeDasharray="3 4" />
                <circle cx="200" cy="200" r="140" fill="none" stroke="#E2E8F0" strokeWidth="0.5" strokeDasharray="3 4" />

                {/* Plane spokes */}
                {PLANES.map((p, i) => {
                  const angle = (i / PLANES.length) * Math.PI * 2 - Math.PI / 2;
                  const x = 200 + Math.cos(angle) * 140;
                  const y = 200 + Math.sin(angle) * 140;
                  return (
                    <g key={p.code}>
                      <line
                        x1="200"
                        y1="200"
                        x2={x}
                        y2={y}
                        stroke={p.accent}
                        strokeOpacity="0.3"
                        strokeWidth="1"
                      />
                      <circle cx={x} cy={y} r="10" fill="#FFFFFF" stroke={p.accent} strokeWidth="1.5" />
                      <circle cx={x} cy={y} r="3" fill={p.accent} />
                      <text
                        x={x}
                        y={y + 26}
                        textAnchor="middle"
                        fontFamily="ui-monospace, JetBrains Mono, monospace"
                        fontSize="9"
                        fontWeight="600"
                        fill={p.accent}
                        style={{ letterSpacing: '0.18em' }}
                      >
                        {p.code}
                      </text>
                    </g>
                  );
                })}

                {/* Core hub */}
                <circle cx="200" cy="200" r="50" fill="url(#or-core-glow)" />
                <circle cx="200" cy="200" r="34" fill="#0A1F3D" stroke="#1E6FD9" strokeWidth="1.5" />
                <text
                  x="200"
                  y="195"
                  textAnchor="middle"
                  fontFamily="ui-monospace, JetBrains Mono, monospace"
                  fontSize="9"
                  fontWeight="700"
                  fill="#9ED0F9"
                  style={{ letterSpacing: '0.22em' }}
                >
                  OR.CORE
                </text>
                <text
                  x="200"
                  y="210"
                  textAnchor="middle"
                  fontFamily="ui-sans-serif, Inter, system-ui, sans-serif"
                  fontSize="10"
                  fontWeight="500"
                  fill="#FFFFFF"
                >
                  FlyttGoTech
                </text>
              </svg>
            </div>
          </div>

          {/* Planes list */}
          <ul className="lg:col-span-7 grid sm:grid-cols-2 gap-3">
            {PLANES.map((p) => {
              const Icon = p.icon;
              return (
                <li
                  key={p.code}
                  className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800/60 bg-white dark:bg-slate-900"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span
                      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${p.accent}14`, color: p.accent }}
                      aria-hidden="true"
                    >
                      <Icon size={16} strokeWidth={1.75} />
                    </span>
                    <span
                      className="font-mono text-[10px] uppercase tracking-[0.22em] font-semibold"
                      style={{ color: p.accent }}
                    >
                      {p.code}
                    </span>
                  </div>
                  <h3 className="mt-3 text-[14px] font-semibold tracking-tight text-slate-900 dark:text-white">
                    {p.title}
                  </h3>
                  <p className="mt-1 text-[12px] text-slate-600 dark:text-slate-400 leading-snug">
                    {p.body}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Deployability footnote */}
        <p className="mt-10 max-w-3xl font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500 leading-relaxed">
          <Workflow className="inline-block mr-2 -mt-0.5" size={11} aria-hidden="true" />
          Every plane composes the same way under each deployment mode —
          FlyttGo-managed SaaS, customer-controlled cloud, or sovereign
          national environment. The orchestration contract is identical;
          the substrate is the variable.
        </p>
      </div>
    </section>
  );
}
