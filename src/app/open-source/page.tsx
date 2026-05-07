import type { Metadata } from 'next';
import Link from '@/components/flytt/LocaleLink';
import Navbar from '@/components/flytt/Navbar';
import PageHero from '@/components/flytt/PageHero';
import SiteFooter from '@/components/flytt/SiteFooter';
import { Reveal } from '@/components/flytt/Reveal';
import NextStepsGrid from '@/components/flytt/NextStepsGrid';
import { breadcrumbListLd, jsonLdScript } from '@/lib/seo/jsonld';
import {
  Github,
  Code2,
  ShieldCheck,
  Heart,
  ArrowUpRight,
  GitBranch,
  Compass,
  CheckCircle2,
  type LucideIcon,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Open source · OS.MF — FlyttGo Technologies Group',
  description:
    'Open Source Programme Office (OSPO) policy, OSS contributions, sponsored projects, what is OSS vs proprietary in the FlyttGo stack, license attribution registry.',
  alternates: { canonical: '/open-source' },
};

type Project = {
  name: string;
  category: 'Maintained' | 'Sponsored' | 'Contributed';
  href: string;
  body: string;
  license: string;
  lang: string;
};

const PROJECTS: Project[] = [
  { name: 'flyttgo/sdk-typescript',      category: 'Maintained', href: 'https://github.com/flyttgo/sdk-typescript',      body: 'Official TypeScript SDK across the FlyttGo platform — auto-generated from OpenAPI 3.1 specs, ESM-first, tree-shakable.',         license: 'MIT',         lang: 'TypeScript' },
  { name: 'flyttgo/mcp-server',           category: 'Maintained', href: 'https://github.com/flyttgo/mcp-server',           body: 'Reference MCP server implementation exposing the platform tool registry. Used by Claude, Cursor, OpenAI Agents SDK.',           license: 'Apache-2.0', lang: 'TypeScript' },
  { name: 'flyttgo/policy-as-code',        category: 'Maintained', href: 'https://github.com/flyttgo/policy-as-code',       body: 'Open Policy Agent rego library covering the FlyttGo platform-policy API — admission controls, agent scopes, sovereign-region policies.', license: 'Apache-2.0', lang: 'Rego' },
  { name: 'flyttgo/cli',                    category: 'Maintained', href: 'https://github.com/flyttgo/cli',                  body: 'Command-line tool for workspace operations — workspace token issuance, deployment scaffolding, audit log export.',                license: 'MIT',         lang: 'Go' },
  { name: 'flyttgo/sigstore-helpers',       category: 'Maintained', href: 'https://github.com/flyttgo/sigstore-helpers',     body: 'Sigstore signing + verification helpers used internally on every release artefact; useful as a reference for SLSA L3 builds.',  license: 'Apache-2.0', lang: 'Go' },
  { name: 'sigstore/cosign',                category: 'Sponsored',  href: 'https://github.com/sigstore/cosign',              body: 'Container-signing tool used across the FlyttGo release pipeline. FlyttGo sponsors maintainer time on the project.',           license: 'Apache-2.0', lang: 'Go' },
  { name: 'open-policy-agent/opa',          category: 'Sponsored',  href: 'https://github.com/open-policy-agent/opa',        body: 'Open Policy Agent — used for admission policy across every FlyttGo deployment substrate. FlyttGo contributes upstream.',     license: 'Apache-2.0', lang: 'Go' },
  { name: 'CycloneDX/cyclonedx-cli',        category: 'Sponsored',  href: 'https://github.com/CycloneDX/cyclonedx-cli',      body: 'CycloneDX SBOM tooling — generates the per-release SBOMs published at /sbom. FlyttGo contributes upstream.',                license: 'Apache-2.0', lang: 'C#' },
  { name: 'modelcontextprotocol/specification', category: 'Contributed', href: 'https://github.com/modelcontextprotocol/specification', body: 'Model Context Protocol specification. FlyttGo contributes spec feedback + interop test coverage from production.',          license: 'MIT',         lang: 'Markdown' },
  { name: 'opentelemetry-io/oteps',          category: 'Contributed', href: 'https://github.com/open-telemetry/oteps',        body: 'OpenTelemetry Enhancement Proposals. FlyttGo contributes telemetry-schema feedback for cross-tenant observability.',         license: 'Apache-2.0', lang: 'Markdown' },
];

const PILLARS: { code: string; title: string; body: string; icon: LucideIcon }[] = [
  {
    code: 'OS.PR.01', icon: Code2,
    title: 'Maintained projects',
    body: 'FlyttGo maintains the SDK, the reference MCP server, the policy-as-code library, the CLI, and the sigstore helpers. Each released under MIT or Apache-2.0; CI in GitHub Actions; CodeQL + Sigstore on every release.',
  },
  {
    code: 'OS.PR.02', icon: Heart,
    title: 'Sponsored projects',
    body: 'FlyttGo sponsors paid maintainer time on Sigstore Cosign, Open Policy Agent and CycloneDX CLI — three projects in the platform&apos;s critical-supply-chain path. Sponsorship is public, audit-trail-attached, and signed via OpenSSF Funding.',
  },
  {
    code: 'OS.PR.03', icon: GitBranch,
    title: 'Upstream contributions',
    body: 'FlyttGo engineers contribute spec feedback to MCP, OpenTelemetry, AsyncAPI and W3C VC working groups. Time-budgeted, public, and reflected on individual engineers&apos; OSS-contribution profiles.',
  },
  {
    code: 'OS.PR.04', icon: ShieldCheck,
    title: 'OSPO policy',
    body: 'Open Source Programme Office policy: 10 % engineering time available for contributions; CLA-free upstream where the project allows; license-compatibility scan on every dependency; quarterly OSPO report.',
  },
];

const CATEGORY_CLS: Record<Project['category'], string> = {
  Maintained:   'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
  Sponsored:    'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
  Contributed:  'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
};

const STACK_TABLE = [
  { surface: 'Platform modules (Transify, Workverge, Civitas, EduPro, Identra, Payvera, Ledgera, Marketplace)', position: 'Proprietary' },
  { surface: 'TypeScript SDK + CLI',                  position: 'Open · MIT' },
  { surface: 'Reference MCP server',                  position: 'Open · Apache-2.0' },
  { surface: 'Policy-as-code (OPA rego library)',     position: 'Open · Apache-2.0' },
  { surface: 'OpenAPI 3.1 specifications',            position: 'Open · CC-BY 4.0' },
  { surface: 'Audit envelope schema (CloudEvents 1.0)', position: 'Open standard · adopted upstream' },
  { surface: 'Sigstore signing tooling',              position: 'Sponsored upstream' },
  { surface: 'OpenTelemetry exporters',               position: 'Open · upstream' },
  { surface: 'Sovereign-cluster bootstrapper',        position: 'Proprietary · partner-shared under MNDA' },
  { surface: 'AI weights + retraining pipelines',     position: 'Proprietary · disclosed in AIBOM' },
];

export default function OpenSourcePage() {
  const ld = breadcrumbListLd([
    { name: 'Home', href: '/' },
    { name: 'Open source', href: '/open-source' },
  ]);

  const totals = {
    maintained:  PROJECTS.filter((p) => p.category === 'Maintained').length,
    sponsored:   PROJECTS.filter((p) => p.category === 'Sponsored').length,
    contributed: PROJECTS.filter((p) => p.category === 'Contributed').length,
  };

  return (
    <>
      <script {...jsonLdScript(ld)} />
      <Navbar />
      <main
        id="main"
        className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased"
      >
        <PageHero
          code="OS.MF"
          eyebrow="Open source manifest"
          title={
            <>
              Public OSPO,{' '}
              <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                ten projects in the open.
              </em>
            </>
          }
          description="What FlyttGo maintains, what FlyttGo sponsors, what FlyttGo contributes upstream — and the explicit boundary between OSS and proprietary in the platform stack. Open Source Programme Office policy public; quarterly contribution report shipped alongside the changelog."
          crumbs={[{ label: 'Home', href: '/' }, { label: 'Open source' }]}
        />

        {/* OS.SUM */}
        <Reveal>
          <section className="bg-gradient-to-b from-white to-[#F5F8FC] dark:from-slate-950 dark:to-slate-900 py-12 lg:py-14 border-y border-slate-200/60 dark:border-slate-800/60">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <ul className="grid grid-cols-3 gap-3">
                <Stat label="Maintained projects"        value={String(totals.maintained)}  accent="emerald" />
                <Stat label="Sponsored projects"          value={String(totals.sponsored)}    accent="amber" />
                <Stat label="Upstream contributions"      value={String(totals.contributed)} accent="brand" />
              </ul>
            </div>
          </section>
        </Reveal>

        {/* OS.PR — pillars */}
        <Reveal>
          <section className="py-20 lg:py-24 bg-white dark:bg-slate-950 border-b border-slate-200/60 dark:border-slate-800/60">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
                <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">OS.PR</span>
                <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
                <span>OSPO posture</span>
              </div>
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

        {/* OS.PJ — projects */}
        <Reveal>
          <section className="py-20 lg:py-24 bg-slate-50 dark:bg-slate-900/40 border-b border-slate-200/60 dark:border-slate-800/60">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
                <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">OS.PJ</span>
                <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
                <span>Project registry</span>
              </div>
              <h2 className="mt-6 max-w-3xl font-serif text-3xl md:text-4xl font-medium tracking-tight text-slate-900 dark:text-white leading-[1.05]">
                Ten projects,{' '}
                <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                  three contribution shapes.
                </em>
              </h2>
              <ul className="mt-10 grid md:grid-cols-2 gap-3">
                {PROJECTS.map((p) => (
                  <li
                    key={p.name}
                    className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60"
                  >
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <div className="flex items-center gap-2 min-w-0">
                        <Github size={14} className="text-slate-600 dark:text-slate-400 flex-shrink-0" aria-hidden="true" />
                        <span className="font-mono text-[12px] font-semibold text-slate-900 dark:text-white truncate">
                          {p.name}
                        </span>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-[0.14em] font-semibold ${CATEGORY_CLS[p.category]}`}>
                        {p.category}
                      </span>
                    </div>
                    <p className="mt-3 text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed">
                      {p.body}
                    </p>
                    <div className="mt-4 pt-3 border-t border-slate-200/70 dark:border-slate-800/60 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-slate-500">
                        <span>{p.lang}</span>
                        <span>·</span>
                        <span>{p.license}</span>
                      </div>
                      <Link
                        href={p.href}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#0A3A6B] dark:text-[#9ED0F9] hover:underline underline-offset-4"
                      >
                        Open on GitHub
                        <ArrowUpRight size={11} aria-hidden="true" />
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </Reveal>

        {/* OS.LN — OSS vs proprietary boundary */}
        <Reveal>
          <section className="py-20 lg:py-24 bg-white dark:bg-slate-950 border-b border-slate-200/60 dark:border-slate-800/60">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
                <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">OS.LN</span>
                <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
                <span>OSS vs. proprietary boundary</span>
              </div>
              <h2 className="mt-6 max-w-3xl font-serif text-3xl md:text-4xl font-medium tracking-tight text-slate-900 dark:text-white leading-[1.05]">
                Where the line sits,{' '}
                <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                  surface by surface.
                </em>
              </h2>
              <div className="mt-10 rounded-2xl border border-slate-200/80 dark:border-slate-800/60 overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200/80 dark:border-slate-800/60">
                    <tr className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
                      <th className="px-5 py-4 font-semibold">Surface</th>
                      <th className="px-5 py-4 font-semibold w-72">Position</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200/60 dark:divide-slate-800/60">
                    {STACK_TABLE.map((s) => (
                      <tr key={s.surface}>
                        <td className="px-5 py-4 text-[13px] text-slate-700 dark:text-slate-300">
                          {s.surface}
                        </td>
                        <td className="px-5 py-4 font-mono text-[11px] text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">
                          <CheckCircle2 size={11} className="inline mr-1.5 align-baseline" aria-hidden="true" />
                          {s.position}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <NextStepsGrid
            code="OS.NX"
            eyebrow="Where the OSS posture plugs in"
            titleLead="Open source touches every"
            titleEmphasis="other trust artefact."
            intro="OSS posture is a procurement signal. The four pathways below take a security or developer review from this manifest into deeper engagement."
            steps={[
              { href: '/standards', code: 'OS.00', icon: Code2,       title: 'Open standards',  body: '33 standards across 6 interop categories — what every OSS project here implements.', meta: 'OS.00 · 33 standards' },
              { href: '/sbom',      code: 'SB.00', icon: GitBranch,   title: 'SBOM registry',   body: 'Per-release CycloneDX 1.6 SBOM — exposes every OSS dependency in production.',         meta: 'SB.00 · 8 modules' },
              { href: '/trust',     code: 'TC.00', icon: ShieldCheck, title: 'Trust artefacts',  body: 'Vulnerability disclosure policy, supply-chain provenance, OSPO compliance posture.',  meta: 'TC.00 · 8 artefacts' },
              { href: '/consultation', code: 'CB.00', icon: Compass,  title: 'Open scoping',    body: 'Five-step intake routes an OSS-led discussion under CT.01 platform architecture session.', meta: 'CT.01 · CB.00' },
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
