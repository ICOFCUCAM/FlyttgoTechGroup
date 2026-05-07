import type { Metadata } from 'next';
import Link from '@/components/flytt/LocaleLink';
import Navbar from '@/components/flytt/Navbar';
import PageHero from '@/components/flytt/PageHero';
import SiteFooter from '@/components/flytt/SiteFooter';
import { Reveal } from '@/components/flytt/Reveal';
import NextStepsGrid from '@/components/flytt/NextStepsGrid';
import { breadcrumbListLd, jsonLdScript } from '@/lib/seo/jsonld';
import {
  Brain,
  ShieldCheck,
  ScrollText,
  AlertTriangle,
  FileWarning,
  Compass,
  ArrowUpRight,
  Cpu,
  Activity,
  CheckCircle2,
  type LucideIcon,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'AI governance · AG.00 — FlyttGo Technologies Group',
  description:
    'AI Bill of Materials (AIBOM), per-module model cards, EU AI Act risk-tier classification, red-team summaries, C2PA content provenance. The transparency posture institutional buyers need before 2026 enforcement.',
  alternates: { canonical: '/governance/ai' },
};

type AiSurface = {
  code: string;
  module: string;
  surface: string;
  model: string;
  weights: string;
  purpose: string;
  euActTier: 'minimal' | 'limited' | 'high' | 'unacceptable';
  hitl: boolean;
};

const AI_SURFACES: AiSurface[] = [
  {
    code: 'AG.S.01', module: 'Transify', surface: 'Provider routing optimiser',
    model: 'Custom multi-objective optimiser + tabular regression', weights: 'In-house · weekly retrained',
    purpose: 'Routes orders across providers optimising cost × time × coverage under regulatory constraints (cabotage, hazmat).',
    euActTier: 'limited', hitl: false,
  },
  {
    code: 'AG.S.02', module: 'Workverge', surface: 'Shift dispatch optimiser',
    model: 'Constraint solver + heuristic warm-start', weights: 'In-house · daily retrained',
    purpose: 'Suggests shift coverage and dispatch order under labour-law constraints. Operator approves the slate.',
    euActTier: 'limited', hitl: true,
  },
  {
    code: 'AG.S.03', module: 'Civitas', surface: 'Application triage classifier',
    model: 'Fine-tuned multilingual transformer', weights: 'In-house · monthly retrained',
    purpose: 'Triages incoming citizen applications into the responsible agency. Civil servant validates before action.',
    euActTier: 'high', hitl: true,
  },
  {
    code: 'AG.S.04', module: 'Identra', surface: 'Liveness + spoofing detection',
    model: 'Vision transformer · liveness ensemble', weights: 'Hybrid · vendor-licensed core',
    purpose: 'Liveness detection during identity verification. Adversarial-tested against PA-DSS 4 attack vectors.',
    euActTier: 'high', hitl: true,
  },
  {
    code: 'AG.S.05', module: 'Payvera', surface: 'Anomaly + fraud scoring',
    model: 'Gradient-boosted ensemble + behavioural sequence model', weights: 'In-house · streaming-updated',
    purpose: 'Real-time anomaly scoring on payment intents. Falls back to rule engine if model uncertainty exceeds threshold.',
    euActTier: 'high', hitl: true,
  },
  {
    code: 'AG.S.06', module: 'EduPro', surface: 'Cohort analytics aggregator',
    model: 'Differential-privacy-aggregated tabular model', weights: 'In-house · DP-SGD trained',
    purpose: 'Privacy-preserving cohort analytics — no per-student inferences ever leave the boundary.',
    euActTier: 'limited', hitl: false,
  },
  {
    code: 'AG.S.07', module: 'AskFlyttGo', surface: 'Procurement assistant (planned)',
    model: 'Anthropic Claude · Sonnet tier · grounded retrieval', weights: 'Vendor · context-only',
    purpose: 'Drafts CAIQ responses, RFP responses, custom proposals. Every artefact carries a signed provenance manifest.',
    euActTier: 'limited', hitl: true,
  },
  {
    code: 'AG.S.08', module: 'FlyttGo Marketplace', surface: 'Pricing intelligence',
    model: 'Per-corridor reference price + anomaly detection', weights: 'In-house · daily refreshed',
    purpose: 'Per-region reference pricing surfaced to buyers; anomaly flags on under/over-priced supply for the operator.',
    euActTier: 'limited', hitl: false,
  },
];

const TIER_META: Record<AiSurface['euActTier'], { label: string; cls: string }> = {
  minimal:      { label: 'Minimal',      cls: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300' },
  limited:      { label: 'Limited',      cls: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' },
  high:         { label: 'High',         cls: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300' },
  unacceptable: { label: 'Unacceptable', cls: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' },
};

type Pillar = {
  code: string;
  icon: LucideIcon;
  title: string;
  body: string;
};

const PILLARS: Pillar[] = [
  {
    code: 'AG.PR.01', icon: ScrollText,
    title: 'AIBOM · AI Bill of Materials',
    body: 'Per-module declaration of every model in production: weights origin, training data class, retraining cadence, drift telemetry. Refreshed in the changelog every release.',
  },
  {
    code: 'AG.PR.02', icon: Brain,
    title: 'Model cards on every surface',
    body: 'Each model surface ships a model card declaring intended use, out-of-scope use, performance bounds, fairness evaluation, demographic and geographic coverage, known failure modes.',
  },
  {
    code: 'AG.PR.03', icon: AlertTriangle,
    title: 'EU AI Act risk-tier classification',
    body: 'Pre-emptive classification of every AI surface against the EU AI Act risk taxonomy (minimal / limited / high / unacceptable). Public registry, refreshed when a surface changes risk-tier.',
  },
  {
    code: 'AG.PR.04', icon: FileWarning,
    title: 'Red-team summary archive',
    body: 'Annual external red-team exercises against every high-risk surface (Identra liveness, Payvera fraud, Civitas triage). Executive summaries published; technical reports available under MNDA.',
  },
];

const TIMELINE = [
  { code: 'AG.RM.Q3.25', date: 'Q3 2025', title: 'Initial AIBOM published',         body: 'First public AIBOM listing every AI surface across the platform. Voluntary; not yet a regulatory requirement.' },
  { code: 'AG.RM.Q4.25', date: 'Q4 2025', title: 'Model cards for high-risk surfaces', body: 'Identra liveness, Payvera fraud and Civitas triage shipped first model cards.' },
  { code: 'AG.RM.Q1.26', date: 'Q1 2026', title: 'Risk-tier classifications complete', body: 'Every AI surface tagged against the EU AI Act risk taxonomy. Registry refreshed monthly.' },
  { code: 'AG.RM.Q2.26', date: 'Q2 2026', title: 'External red-team baseline',          body: 'First external red-team exercise across all high-risk surfaces. Executive summary published.' },
  { code: 'AG.RM.Q3.26', date: 'Q3 2026', title: 'EU AI Act enforcement begins',         body: 'High-risk obligations enforceable from August 2026. FlyttGo positions ahead of the line, not at it.' },
  { code: 'AG.RM.Q4.26', date: 'Q4 2026', title: 'C2PA content provenance · GA',         body: 'Every AI-generated artefact (proposals, summaries, CAIQ responses) signed with a C2PA provenance manifest.' },
];

export default function AiGovernancePage() {
  const ld = breadcrumbListLd([
    { name: 'Home', href: '/' },
    { name: 'AI governance', href: '/governance/ai' },
  ]);

  const totalSurfaces = AI_SURFACES.length;
  const highRisk = AI_SURFACES.filter((s) => s.euActTier === 'high').length;
  const hitl = AI_SURFACES.filter((s) => s.hitl).length;

  return (
    <>
      <script {...jsonLdScript(ld)} />
      <Navbar />
      <main
        id="main"
        className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased"
      >
        <PageHero
          code="AG.00"
          eyebrow="AI governance"
          title={
            <>
              Public AIBOM,{' '}
              <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                ahead of EU AI Act enforcement.
              </em>
            </>
          }
          description="AI Bill of Materials per module, model cards per surface, EU AI Act risk-tier classification, red-team summaries, C2PA content provenance. Most platform vendors will get to this in 2026 because they have to. FlyttGo is here in 2025 because procurement asks."
          crumbs={[{ label: 'Home', href: '/' }, { label: 'AI governance' }]}
        />

        {/* AG.SUM — KPI strip */}
        <Reveal>
          <section className="bg-gradient-to-b from-white to-[#F5F8FC] dark:from-slate-950 dark:to-slate-900 py-16 lg:py-20 border-y border-slate-200/60 dark:border-slate-800/60">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <ul className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <Stat label="AI surfaces · live"            value={String(totalSurfaces)} accent="brand" />
                <Stat label="High-risk · EU AI Act"          value={String(highRisk)}     accent="amber" />
                <Stat label="Surfaces with HITL"             value={String(hitl)}          accent="brand" />
                <Stat label="Unacceptable-risk surfaces"     value="0"                      accent="emerald" />
              </ul>
            </div>
          </section>
        </Reveal>

        {/* AG.PR — pillars */}
        <Reveal>
          <section className="py-20 lg:py-24 bg-white dark:bg-slate-950 border-b border-slate-200/60 dark:border-slate-800/60">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
                <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">AG.PR</span>
                <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
                <span>Governance pillars</span>
              </div>
              <h2 className="mt-6 max-w-3xl font-serif text-3xl md:text-4xl font-medium tracking-tight text-slate-900 dark:text-white leading-[1.05]">
                Four anchors{' '}
                <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                  for AI transparency.
                </em>
              </h2>
              <ul className="mt-12 grid md:grid-cols-2 gap-3">
                {PILLARS.map((p) => {
                  const Icon = p.icon;
                  return (
                    <li
                      key={p.code}
                      className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span
                          className="w-11 h-11 rounded-xl bg-[#0A3A6B]/8 dark:bg-[#9ED0F9]/12 text-[#0A3A6B] dark:text-[#9ED0F9] flex items-center justify-center"
                          aria-hidden="true"
                        >
                          <Icon size={20} strokeWidth={1.75} />
                        </span>
                        <span className="font-mono text-[10px] tracking-[0.22em] font-semibold text-[#0A3A6B] dark:text-[#9ED0F9]">
                          {p.code}
                        </span>
                      </div>
                      <h3 className="mt-4 text-[15px] font-semibold tracking-tight text-slate-900 dark:text-white leading-snug">
                        {p.title}
                      </h3>
                      <p className="mt-2 text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed">
                        {p.body}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        </Reveal>

        {/* AG.AB — AIBOM registry */}
        <Reveal>
          <section
            id="ag-ab"
            aria-labelledby="ag-ab-heading"
            className="py-20 lg:py-24 bg-slate-50 dark:bg-slate-900/40 border-b border-slate-200/60 dark:border-slate-800/60"
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
                <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">AG.AB</span>
                <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
                <span id="ag-ab-heading">AIBOM · live registry</span>
              </div>
              <h2 className="mt-6 max-w-3xl font-serif text-3xl md:text-4xl font-medium tracking-tight text-slate-900 dark:text-white leading-[1.05]">
                Eight surfaces.{' '}
                <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                  Every model accounted for.
                </em>
              </h2>
              <div className="mt-10 rounded-2xl border border-slate-200/80 dark:border-slate-800/60 overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200/80 dark:border-slate-800/60">
                    <tr className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
                      <th className="px-4 py-3 font-semibold w-24">Code</th>
                      <th className="px-4 py-3 font-semibold w-28">Module</th>
                      <th className="px-4 py-3 font-semibold">Surface · model · weights</th>
                      <th className="px-4 py-3 font-semibold w-32">Risk-tier</th>
                      <th className="px-4 py-3 font-semibold w-20">HITL</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200/60 dark:divide-slate-800/60">
                    {AI_SURFACES.map((s) => {
                      const tier = TIER_META[s.euActTier];
                      return (
                        <tr key={s.code} className="motion-safe:transition-colors hover:bg-slate-50/60 dark:hover:bg-slate-900/40 align-top">
                          <td className="px-4 py-4">
                            <span className="font-mono text-[11px] font-semibold text-[#0A3A6B] dark:text-[#9ED0F9]">{s.code}</span>
                          </td>
                          <td className="px-4 py-4 text-[13px] font-semibold text-slate-900 dark:text-white">
                            {s.module}
                          </td>
                          <td className="px-4 py-4">
                            <div className="text-[13px] font-medium text-slate-900 dark:text-white">{s.surface}</div>
                            <div className="mt-0.5 text-[12px] text-slate-600 dark:text-slate-400">{s.purpose}</div>
                            <div className="mt-2 flex flex-wrap gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em]">
                              <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">model: {s.model}</span>
                              <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">weights: {s.weights}</span>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-[0.14em] font-semibold ${tier.cls}`}>
                              {tier.label}
                            </span>
                          </td>
                          <td className="px-4 py-4">
                            {s.hitl ? (
                              <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 dark:text-emerald-400">
                                <CheckCircle2 size={11} aria-hidden="true" />
                                Yes
                              </span>
                            ) : (
                              <span className="text-[11px] text-slate-400">No</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <p className="mt-6 max-w-3xl font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400 leading-relaxed">
                Risk-tier follows the EU AI Act taxonomy.
                Surfaces categorised &lsquo;high&rsquo; carry mandatory HITL,
                full model card, fairness evaluation and quarterly drift report.
              </p>
            </div>
          </section>
        </Reveal>

        {/* AG.RM — roadmap */}
        <Reveal>
          <section className="py-20 lg:py-24 bg-white dark:bg-slate-950 border-b border-slate-200/60 dark:border-slate-800/60">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
                <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">AG.RM</span>
                <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
                <span>Compliance timeline</span>
              </div>
              <h2 className="mt-6 max-w-3xl font-serif text-3xl md:text-4xl font-medium tracking-tight text-slate-900 dark:text-white leading-[1.05]">
                Six quarters tracked publicly,{' '}
                <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                  ahead of enforcement.
                </em>
              </h2>
              <ol className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {TIMELINE.map((t) => (
                  <li
                    key={t.code}
                    className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="font-mono text-[10px] tracking-[0.22em] font-semibold text-[#0A3A6B] dark:text-[#9ED0F9]">
                        {t.code}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-slate-400">
                        {t.date}
                      </span>
                    </div>
                    <h3 className="mt-3 text-[14px] font-semibold tracking-tight text-slate-900 dark:text-white leading-snug">
                      {t.title}
                    </h3>
                    <p className="mt-2 text-[12px] text-slate-600 dark:text-slate-400 leading-relaxed">
                      {t.body}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <NextStepsGrid
            code="AG.NX"
            eyebrow="Where AI governance plugs in"
            titleLead="AI transparency is one"
            titleEmphasis="layer of the trust framework."
            intro="The AIBOM doesn&apos;t stand alone — it sits inside the broader trust posture and the agent surface. The four pathways below take a programme from this manifest into a signed engagement."
            steps={[
              { href: '/agents',   code: 'AI.00', icon: Cpu,         title: 'AI agent surface',  body: 'How LLM agents discover and drive FlyttGo safely. The procurement assistant lives here.', meta: 'AI.00 · MCP · scopes · HITL' },
              { href: '/trust',    code: 'TC.00', icon: ShieldCheck, title: 'Trust artefacts',   body: 'SOC 2, ISO 27001, DPA, subprocessors. Full red-team reports under MNDA.',                  meta: 'TC.00 · 8 artefacts' },
              { href: '/sbom',     code: 'SB.00', icon: Activity,    title: 'SBOM registry',     body: 'Software Bill of Materials per release — the engineering supply-chain side of the manifest.', meta: 'SB.00 · CycloneDX 1.6' },
              { href: '/consultation', code: 'CB.00', icon: Compass, title: 'Open AI scoping',   body: 'Routed under CT.01 platform architecture session — AI-led security review track.',          meta: 'CT.01 · CB.00' },
            ]}
          />
        </Reveal>
      </main>
      <SiteFooter />
    </>
  );
}

const Stat: React.FC<{ label: string; value: string; accent: 'brand' | 'amber' | 'emerald' }> = ({ label, value, accent }) => {
  const tone =
    accent === 'brand'   ? 'text-[#0A3A6B] dark:text-[#9ED0F9]' :
    accent === 'amber'   ? 'text-amber-700 dark:text-amber-400'  :
                            'text-emerald-700 dark:text-emerald-400';
  return (
    <li className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60">
      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">{label}</div>
      <div className={`mt-2 font-serif text-3xl font-medium tabular-nums ${tone}`}>{value}</div>
    </li>
  );
};
