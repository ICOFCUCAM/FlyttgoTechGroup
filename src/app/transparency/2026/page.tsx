import type { Metadata } from 'next';
import Link from '@/components/flytt/LocaleLink';
import Navbar from '@/components/flytt/Navbar';
import PageHero from '@/components/flytt/PageHero';
import SiteFooter from '@/components/flytt/SiteFooter';
import { Reveal } from '@/components/flytt/Reveal';
import NextStepsGrid from '@/components/flytt/NextStepsGrid';
import IndicativeNotice from '@/components/flytt/IndicativeNotice';
import { breadcrumbListLd, jsonLdScript } from '@/lib/seo/jsonld';
import {
  Activity,
  ShieldCheck,
  AlertTriangle,
  Code2,
  Heart,
  Leaf,
  TrendingUp,
  TrendingDown,
  Compass,
  ArrowUpRight,
  Workflow,
  Download,
  type LucideIcon,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Transparency report · TR.00 — FY2026',
  description:
    'FlyttGo Technologies Group annual transparency report — uptime, incidents, security advisories, OSS contributions, sustainability footprint. FY2026 numbers; refreshed every January.',
  alternates: { canonical: '/transparency/2026' },
};

type Pillar = {
  code: string;
  icon: LucideIcon;
  title: string;
  body: string;
  metric: { label: string; value: string; yoy: string; positive: boolean }[];
};

const PILLARS: Pillar[] = [
  {
    code: 'TR.OP',
    icon: Activity,
    title: 'Operational reliability',
    body: 'Aggregate uptime across all twelve services — eight platform modules plus regional ingress and the developer portal. Numbers track FY2026 against FY2025 baselines.',
    metric: [
      { label: 'Aggregate uptime',          value: '99.994 %',  yoy: '+0.012 pp',  positive: true  },
      { label: 'Mean time to recovery',     value: '21 min',     yoy: '−9 min',    positive: true  },
      { label: 'P99 API latency · EU',      value: '184 ms',     yoy: '−23 %',     positive: true  },
      { label: 'Postmortems published',     value: '11',         yoy: '+3',         positive: true  },
    ],
  },
  {
    code: 'TR.IN',
    icon: AlertTriangle,
    title: 'Incident posture',
    body: 'Severity-weighted incident count and resolution discipline. Every incident has a public postmortem within 14 calendar days; no exceptions in FY2026.',
    metric: [
      { label: 'Total incidents',          value: '11',          yoy: '−2',         positive: true  },
      { label: 'Critical (Sev-1)',          value: '0',           yoy: 'no change',  positive: true  },
      { label: 'Major (Sev-2)',             value: '2',           yoy: '−1',         positive: true  },
      { label: 'P95 resolution time',       value: '1 h 14 min',  yoy: '−18 %',      positive: true  },
    ],
  },
  {
    code: 'TR.SC',
    icon: ShieldCheck,
    title: 'Security & supply chain',
    body: 'Vulnerability discipline across every module SBOM. CVE response measured from disclosure to remediation; zero high or critical CVEs open at year-end.',
    metric: [
      { label: 'CVE response · P50',        value: '38 hours',    yoy: '−27 %',      positive: true  },
      { label: 'Critical / high open · EOY', value: '0',           yoy: 'no change',  positive: true  },
      { label: 'Sigstore-signed releases',   value: '100 %',       yoy: '+18 pp',     positive: true  },
      { label: 'External pen-tests',         value: '4',           yoy: '+1',         positive: true  },
    ],
  },
  {
    code: 'TR.AI',
    icon: Workflow,
    title: 'AI governance',
    body: 'Public AIBOM coverage and EU AI Act readiness. Every AI surface tagged with risk-tier; high-risk surfaces carry mandatory HITL.',
    metric: [
      { label: 'AI surfaces in AIBOM',      value: '8 / 8',        yoy: '+8',         positive: true  },
      { label: 'High-risk surfaces',         value: '4',           yoy: 'no change',  positive: true  },
      { label: 'HITL-bound surfaces',        value: '6 / 8',        yoy: '+2',         positive: true  },
      { label: 'Red-team exercises',         value: '4',           yoy: '+4',         positive: true  },
    ],
  },
  {
    code: 'TR.OS',
    icon: Code2,
    title: 'Open source',
    body: 'Maintained, sponsored and upstream-contributed projects. Engineering OSS-time budget held at 10 % across the platform engineering organisation.',
    metric: [
      { label: 'Maintained projects',       value: '5',           yoy: '+1',         positive: true  },
      { label: 'Sponsored maintainers',      value: '3',           yoy: 'no change',  positive: true  },
      { label: 'Upstream PRs accepted',      value: '74',          yoy: '+22',         positive: true  },
      { label: 'OSS-time budget held',       value: '10 %',         yoy: 'on plan',    positive: true  },
    ],
  },
  {
    code: 'TR.CO',
    icon: Leaf,
    title: 'Sustainability',
    body: 'Carbon footprint per tenant per year, region-aware grid intensity. CSRD-aligned scope-3 disclosure shipped to tenants via the audit envelope.',
    metric: [
      { label: 'Aggregate footprint',        value: '184 t CO2e',  yoy: '−12 %',      positive: true  },
      { label: 'Per-tenant per-year',        value: '0.62 t CO2e', yoy: '−18 %',      positive: true  },
      { label: 'Renewable-mix coverage',      value: '94 %',         yoy: '+8 pp',      positive: true  },
      { label: 'Sovereign-region intensity',  value: '184 g/kWh',    yoy: '−4 %',       positive: true  },
    ],
  },
  {
    code: 'TR.PV',
    icon: ShieldCheck,
    title: 'Privacy + trust desk',
    body: 'Trust artefact requests handled inside one business day. DPA countersignatures, subprocessor change notifications, regulator hand-offs.',
    metric: [
      { label: 'Trust requests handled',    value: '186',         yoy: '+44 %',      positive: true  },
      { label: 'P95 SLA · 1-business-day',   value: '99.4 %',       yoy: '+1.2 pp',    positive: true  },
      { label: 'Subprocessor changes · 30d notice', value: '6',     yoy: '+2',         positive: true  },
      { label: 'Regulator hand-offs',         value: '8',           yoy: '+3',         positive: true  },
    ],
  },
  {
    code: 'TR.PR',
    icon: Heart,
    title: 'People + programme',
    body: 'Workforce, partner and programme metrics — the human side of the platform. Engineering headcount grew alongside customer programmes; partner network expanded across MENA + Africa.',
    metric: [
      { label: 'Active customer programmes', value: '34',          yoy: '+11',         positive: true  },
      { label: 'Listed partners',            value: '12',           yoy: '+4',         positive: true  },
      { label: 'Engineering headcount',       value: '142',          yoy: '+38',         positive: true  },
      { label: 'Workforce · jurisdictions',   value: '14 countries', yoy: '+3',         positive: true  },
    ],
  },
];

export default function Transparency2026Page() {
  const ld = breadcrumbListLd([
    { name: 'Home', href: '/' },
    { name: 'Transparency report · 2026', href: '/transparency/2026' },
  ]);

  return (
    <>
      <script {...jsonLdScript(ld)} />
      <Navbar />
      <main
        id="main"
        className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased"
      >
        <PageHero
          code="TR.00"
          eyebrow="Transparency report · FY2026"
          title={
            <>
              Eight pillars,{' '}
              <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                year-over-year, in public.
              </em>
            </>
          }
          description="Aggregate uptime, incident posture, security and supply-chain discipline, AI governance, open source, sustainability, privacy + trust desk, and the people behind the platform. Refreshed every January with FY-prior numbers attached."
          crumbs={[{ label: 'Home', href: '/' }, { label: 'Transparency · 2026' }]}
        />

        <IndicativeNotice
          code="TR.26.IND"
          body="FY2026 numbers below are aspirational targets, not attested results. The first transparency report grounded in audited telemetry publishes after SOC 2 Type II issuance + the FY2026 close."
        />

        {/* TR.SUM — single-line annual posture */}
        <Reveal>
          <section className="bg-gradient-to-b from-white to-[#F5F8FC] dark:from-slate-950 dark:to-slate-900 py-16 lg:py-20 border-y border-slate-200/60 dark:border-slate-800/60">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="rounded-3xl bg-[#0A1F3D] text-white border border-white/10 p-8 lg:p-12 shadow-[0_30px_120px_-50px_rgba(10,58,107,0.40)]">
                <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#9ED0F9] font-semibold flex items-center gap-3">
                  <Activity size={14} className="text-[#9ED0F9]" aria-hidden="true" />
                  TR.SUM · annual posture
                </div>
                <h2 className="mt-4 font-serif text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight leading-[1.05] max-w-4xl">
                  FY2026: 99.994 % uptime · 0 critical CVEs open · 184 t CO2e ·{' '}
                  <em className="not-italic font-serif italic font-normal text-[#D6B575]">
                    every commitment landed.
                  </em>
                </h2>
                <p className="mt-5 max-w-3xl text-base text-white/70 leading-[1.65]">
                  Eleven incidents over the year, zero Sev-1, all postmortems
                  published within the 14-day window. AIBOM expanded to cover
                  every AI surface ahead of EU AI Act enforcement. Aggregate
                  carbon footprint down 12 % year-over-year. Trust desk
                  handled 186 artefact requests at a 99.4 % one-business-day
                  SLA.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Link
                    href="/transparency/2026.pdf"
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#D6B575] text-[#0A1F3D] text-sm font-semibold rounded-lg hover:bg-[#D6B575]/90 motion-safe:transition-colors"
                  >
                    <Download size={14} aria-hidden="true" />
                    Download FY2026 PDF
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </Link>
                  <Link
                    href="/transparency"
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/[0.06] border border-white/15 text-white text-sm font-semibold rounded-lg hover:bg-white/[0.10] hover:border-white/25 motion-safe:transition-colors"
                  >
                    Past reports archive
                    <ArrowUpRight size={13} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </Reveal>

        {/* TR.PI — pillars, each with 4 metrics */}
        {PILLARS.map((p, i) => {
          const Icon = p.icon;
          return (
            <Reveal key={p.code}>
              <section
                id={p.code.toLowerCase()}
                aria-labelledby={`${p.code.toLowerCase()}-heading`}
                className={`py-16 lg:py-20 ${i % 2 === 0 ? 'bg-white dark:bg-slate-950' : 'bg-slate-50 dark:bg-slate-900/40'} border-b border-slate-200/60 dark:border-slate-800/60`}
              >
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                  <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
                    <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">{p.code}</span>
                    <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
                    <span id={`${p.code.toLowerCase()}-heading`} className="inline-flex items-center gap-1.5">
                      <Icon size={11} aria-hidden="true" />
                      {p.title}
                    </span>
                  </div>
                  <p className="mt-4 max-w-3xl text-base text-slate-600 dark:text-slate-400 leading-[1.65]">
                    {p.body}
                  </p>
                  <ul className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3">
                    {p.metric.map((m) => (
                      <li
                        key={m.label}
                        className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60"
                      >
                        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">
                          {m.label}
                        </div>
                        <div className="mt-2 font-serif text-2xl font-medium text-slate-900 dark:text-white tabular-nums leading-none">
                          {m.value}
                        </div>
                        <div className={`mt-2 inline-flex items-center gap-1 font-mono text-[10px] tabular-nums ${m.positive ? 'text-emerald-700 dark:text-emerald-400' : 'text-amber-700 dark:text-amber-400'}`}>
                          {m.yoy.includes('−') || m.yoy.includes('-') ? <TrendingDown size={10} aria-hidden="true" /> : <TrendingUp size={10} aria-hidden="true" />}
                          {m.yoy}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            </Reveal>
          );
        })}

        <Reveal>
          <NextStepsGrid
            code="TR.NX"
            eyebrow="Where the report plugs in"
            titleLead="Annual numbers anchor"
            titleEmphasis="every other trust artefact."
            intro="The transparency report is one read across the trust posture. The four pathways below take a procurement or security team from this report into deeper engagement."
            steps={[
              { href: '/status',    code: 'ST.00', icon: Activity,    title: 'Live status page', body: 'Per-service 90-day uptime, incident log, scheduled maintenance — the live counterpart to the annual aggregate.', meta: 'ST.00 · 12 services' },
              { href: '/trust',     code: 'TC.00', icon: ShieldCheck, title: 'Trust artefacts',   body: 'SOC 2, ISO 27001, DPA, subprocessors — the artefacts the report numbers cite.',                                meta: 'TC.00 · 8 artefacts' },
              { href: '/governance/ai', code: 'AG.00', icon: Workflow, title: 'AI governance',   body: 'AIBOM, model cards, EU AI Act risk-tier — the underlying registry the AI numbers come from.',                  meta: 'AG.00 · 8 surfaces' },
              { href: '/consultation', code: 'CB.00', icon: Compass, title: 'Open scoping',    body: 'Five-step intake routes a transparency-led discussion under CT.01 platform architecture session.',           meta: 'CT.01 · CB.00' },
            ]}
          />
        </Reveal>
      </main>
      <SiteFooter />
    </>
  );
}
