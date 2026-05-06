import type { Metadata } from 'next';
import Link from '@/components/flytt/LocaleLink';
import Navbar from '@/components/flytt/Navbar';
import PageHero from '@/components/flytt/PageHero';
import SiteFooter from '@/components/flytt/SiteFooter';
import { Reveal } from '@/components/flytt/Reveal';
import NextStepsGrid from '@/components/flytt/NextStepsGrid';
import { breadcrumbListLd, jsonLdScript } from '@/lib/seo/jsonld';
import {
  Package,
  Download,
  ShieldCheck,
  GitBranch,
  Workflow,
  ArrowUpRight,
  CheckCircle2,
  Compass,
  type LucideIcon,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Software Bill of Materials · SB.00 — FlyttGo Technologies Group',
  description:
    'Live SBOM registry for every FlyttGo platform module. CycloneDX 1.6, Sigstore-signed, SLSA L3 build provenance, CVE-cross-referenced. Updated per release alongside the changelog.',
  alternates: { canonical: '/sbom' },
};

type SBOMEntry = {
  code: string;
  module: string;
  version: string;
  released: string;
  components: number;
  topDependencies: string[];
  cves: { critical: number; high: number; medium: number; low: number };
  attestations: string[];
};

const ENTRIES: SBOMEntry[] = [
  {
    code: 'SB.TR', module: 'Transify',          version: 'v1.14.7',  released: '2026-04-30', components: 384, topDependencies: ['next@14.2', 'postgres@16.2', 'redis@7.2', 'opentelemetry@1.26'], cves: { critical: 0, high: 0, medium: 0, low: 2 }, attestations: ['SLSA L3', 'Sigstore', 'CycloneDX 1.6'] },
    {
    code: 'SB.WK', module: 'Workverge',         version: 'v1.09.3',  released: '2026-04-22', components: 312, topDependencies: ['next@14.2', 'postgres@16.2', 'opentelemetry@1.26', 'pg-boss@9.0'],   cves: { critical: 0, high: 0, medium: 1, low: 4 }, attestations: ['SLSA L3', 'Sigstore', 'CycloneDX 1.6'] },
  {
    code: 'SB.CV', module: 'Civitas',           version: 'v1.18.0',  released: '2026-04-14', components: 421, topDependencies: ['next@14.2', 'postgres@16.2', 'redis@7.2', 'opentelemetry@1.26'], cves: { critical: 0, high: 0, medium: 0, low: 3 }, attestations: ['SLSA L3', 'Sigstore', 'CycloneDX 1.6'] },
  {
    code: 'SB.ED', module: 'EduPro',            version: 'v1.11.5',  released: '2026-04-07', components: 298, topDependencies: ['next@14.2', 'postgres@16.2', 'opentelemetry@1.26', 'kafka@3.7'],   cves: { critical: 0, high: 0, medium: 0, low: 1 }, attestations: ['SLSA L3', 'Sigstore', 'CycloneDX 1.6'] },
  {
    code: 'SB.ID', module: 'Identra',           version: 'v1.22.1',  released: '2026-03-18', components: 256, topDependencies: ['next@14.2', 'postgres@16.2', 'jose@5.9', 'opentelemetry@1.26'],    cves: { critical: 0, high: 0, medium: 0, low: 0 }, attestations: ['SLSA L3', 'Sigstore', 'CycloneDX 1.6', 'eIDAS-aligned'] },
  {
    code: 'SB.PV', module: 'Payvera',           version: 'v1.19.4',  released: '2026-04-30', components: 412, topDependencies: ['next@14.2', 'postgres@16.2', 'redis@7.2', 'iso20022-tools@2.4'],  cves: { critical: 0, high: 0, medium: 1, low: 2 }, attestations: ['SLSA L3', 'Sigstore', 'CycloneDX 1.6', 'PSD2-aligned'] },
  {
    code: 'SB.LD', module: 'Ledgera',           version: 'v1.06.2',  released: '2026-04-04', components: 219, topDependencies: ['next@14.2', 'postgres@16.2', 'opentelemetry@1.26', 'kafka@3.7'],  cves: { critical: 0, high: 0, medium: 0, low: 1 }, attestations: ['SLSA L3', 'Sigstore', 'CycloneDX 1.6'] },
  {
    code: 'SB.MP', module: 'FlyttGo Marketplace', version: 'v1.07.8', released: '2026-04-22', components: 367, topDependencies: ['next@14.2', 'postgres@16.2', 'redis@7.2', 'transify-sdk@1.14'],  cves: { critical: 0, high: 0, medium: 0, low: 3 }, attestations: ['SLSA L3', 'Sigstore', 'CycloneDX 1.6'] },
];

type Pillar = {
  code: string;
  icon: LucideIcon;
  title: string;
  body: string;
};

const PILLARS: Pillar[] = [
  {
    code: 'SB.PR.01', icon: Package,
    title: 'CycloneDX 1.6 per release',
    body: 'Every release of every module emits a CycloneDX 1.6 SBOM at build time. Spec-conformant, machine-readable, ingestible by Dependency-Track, GitHub Dependabot, OWASP Defectdojo and any compliant scanner.',
  },
  {
    code: 'SB.PR.02', icon: ShieldCheck,
    title: 'Sigstore-signed artefacts',
    body: 'Container images, release archives and the SBOM itself are Cosign-signed. Tenants can require signature verification at admission via the platform-policy API; the signing key chain is published alongside the SBOM.',
  },
  {
    code: 'SB.PR.03', icon: Workflow,
    title: 'SLSA Build Level 3 provenance',
    body: 'Hosted-builder SLSA L3 — provenance attestation states which source revision, which builder, which build steps produced the artefact. Stops a compromised dev laptop from producing a published artefact.',
  },
  {
    code: 'SB.PR.04', icon: GitBranch,
    title: 'CVE cross-reference + auto-revoke',
    body: 'SBOMs are cross-referenced against the OSV.dev and NVD vulnerability databases on every release and every 6 hours thereafter. New high or critical CVE on a published artefact triggers an automated revocation channel + customer notification.',
  },
];

export default function SBOMPage() {
  const ld = breadcrumbListLd([
    { name: 'Home', href: '/' },
    { name: 'Software Bill of Materials', href: '/sbom' },
  ]);

  const totalComponents = ENTRIES.reduce((sum, e) => sum + e.components, 0);
  const totalCritical = ENTRIES.reduce((sum, e) => sum + e.cves.critical, 0);
  const totalHigh = ENTRIES.reduce((sum, e) => sum + e.cves.high, 0);

  return (
    <>
      <script {...jsonLdScript(ld)} />
      <Navbar />
      <main
        id="main"
        className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased"
      >
        <PageHero
          code="SB.00"
          eyebrow="Software Bill of Materials"
          title={
            <>
              {totalComponents.toLocaleString()} components,{' '}
              <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                public, signed, audited.
              </em>
            </>
          }
          description="Every FlyttGo module ships a CycloneDX 1.6 SBOM at release. Sigstore-signed, SLSA L3 build provenance attached, CVE-cross-referenced every six hours. Most platform vendors keep this internal — making it public is the procurement floor."
          crumbs={[{ label: 'Home', href: '/' }, { label: 'Software Bill of Materials' }]}
        />

        {/* SB.SUM — summary KPIs */}
        <Reveal>
          <section className="bg-gradient-to-b from-white to-[#F5F8FC] dark:from-slate-950 dark:to-slate-900 py-16 lg:py-20 border-y border-slate-200/60 dark:border-slate-800/60">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
                <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">SB.SUM</span>
                <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
                <span>Cross-module summary</span>
              </div>
              <ul className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3">
                <li className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60">
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">Modules</div>
                  <div className="mt-2 font-serif text-3xl font-medium text-slate-900 dark:text-white tabular-nums">{ENTRIES.length}</div>
                </li>
                <li className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60">
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">Components total</div>
                  <div className="mt-2 font-serif text-3xl font-medium text-slate-900 dark:text-white tabular-nums">{totalComponents.toLocaleString()}</div>
                </li>
                <li className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60">
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">Critical CVEs · open</div>
                  <div className={`mt-2 font-serif text-3xl font-medium tabular-nums ${totalCritical === 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>{totalCritical}</div>
                </li>
                <li className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60">
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">High CVEs · open</div>
                  <div className={`mt-2 font-serif text-3xl font-medium tabular-nums ${totalHigh === 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>{totalHigh}</div>
                </li>
              </ul>
            </div>
          </section>
        </Reveal>

        {/* SB.PR — pillars */}
        <Reveal>
          <section className="py-20 lg:py-24 bg-white dark:bg-slate-950 border-b border-slate-200/60 dark:border-slate-800/60">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
                <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">SB.PR</span>
                <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
                <span>Supply-chain posture</span>
              </div>
              <h2 className="mt-6 max-w-3xl font-serif text-3xl md:text-4xl font-medium tracking-tight text-slate-900 dark:text-white leading-[1.05]">
                Four floors{' '}
                <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                  procurement teams expect.
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

        {/* SB.RG — per-module SBOM registry */}
        <Reveal>
          <section
            id="sb-rg"
            aria-labelledby="sb-rg-heading"
            className="py-20 lg:py-24 bg-slate-50 dark:bg-slate-900/40 border-b border-slate-200/60 dark:border-slate-800/60"
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
                <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">SB.RG</span>
                <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
                <span id="sb-rg-heading">Per-module SBOM registry</span>
              </div>
              <h2 className="mt-6 max-w-3xl font-serif text-3xl md:text-4xl font-medium tracking-tight text-slate-900 dark:text-white leading-[1.05]">
                Eight modules,{' '}
                <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                  current release per row.
                </em>
              </h2>
              <ul className="mt-10 space-y-3">
                {ENTRIES.map((e) => {
                  const totalCves = e.cves.critical + e.cves.high + e.cves.medium + e.cves.low;
                  const cleanState = e.cves.critical + e.cves.high === 0;
                  return (
                    <li
                      key={e.code}
                      className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60"
                    >
                      <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div className="flex items-center gap-3 flex-wrap">
                          <span className="font-mono text-[10px] tracking-[0.22em] font-semibold text-[#0A3A6B] dark:text-[#9ED0F9]">
                            {e.code}
                          </span>
                          <span className="font-serif text-lg font-medium text-slate-900 dark:text-white">{e.module}</span>
                          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-slate-500">{e.version}</span>
                          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-slate-400">released {e.released}</span>
                        </div>
                        <div className="flex items-center gap-3 font-mono text-[11px] tabular-nums">
                          <span className="text-slate-500">{e.components} components</span>
                          {cleanState ? (
                            <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                              <CheckCircle2 size={12} aria-hidden="true" />
                              No high/critical CVEs
                            </span>
                          ) : (
                            <span className="text-amber-600 dark:text-amber-400">
                              {e.cves.critical}c · {e.cves.high}h · {e.cves.medium}m
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="mt-4 grid md:grid-cols-12 gap-4">
                        <div className="md:col-span-5">
                          <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400 mb-1.5">Top dependencies</div>
                          <div className="flex flex-wrap gap-1">
                            {e.topDependencies.map((d) => (
                              <span key={d} className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-[10px] text-slate-600 dark:text-slate-400">
                                {d}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="md:col-span-4">
                          <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400 mb-1.5">Attestations</div>
                          <div className="flex flex-wrap gap-1">
                            {e.attestations.map((a) => (
                              <span key={a} className="px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/30 font-mono text-[10px] text-emerald-800 dark:text-emerald-300">
                                {a}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="md:col-span-3 flex md:justify-end items-end gap-2">
                          <Link
                            href={`/sbom/${e.code.split('.')[1].toLowerCase()}.cdx.json`}
                            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#0A3A6B] text-white text-[11px] font-semibold hover:bg-[#0A3A6B]/90 motion-safe:transition-colors"
                          >
                            <Download size={11} aria-hidden="true" />
                            Download SBOM
                          </Link>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <p className="mt-8 max-w-3xl font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400 leading-relaxed">
                CVE counts refresh every six hours. Each download link returns
                the current CycloneDX 1.6 JSON with attached signatures and
                provenance manifest. Older releases archived under
                /sbom/&#123;module&#125;/&#123;version&#125;.
              </p>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <NextStepsGrid
            code="SB.NX"
            eyebrow="Where SBOM transparency plugs in"
            titleLead="SBOM is the floor for"
            titleEmphasis="every other trust artefact."
            intro="A public SBOM is a procurement starting point — not the destination. The four pathways below take a security review from this registry to a signed engagement."
            steps={[
              { href: '/standards',      code: 'OS.00', icon: GitBranch,    title: 'Open standards',    body: 'CycloneDX 1.6, SLSA L3, Sigstore, OpenSSF Scorecard — every standard the supply-chain posture inherits.', meta: 'OS.00 · 33 standards' },
              { href: '/post-quantum',   code: 'PQ.00', icon: ShieldCheck,  title: 'Post-quantum',      body: 'Code-signing keys are migrating to ML-DSA hybrid; SBOM-signing follows.',                                meta: 'PQ.00 · 8 surfaces' },
              { href: '/trust',          code: 'TC.00', icon: ShieldCheck,  title: 'Trust artefacts',    body: 'SOC 2, ISO 27001, DPA, subprocessors, vulnerability disclosure.',                                          meta: 'TC.00 · 8 artefacts' },
              { href: '/consultation',   code: 'CB.00', icon: Compass,      title: 'Open security review', body: 'Routed under CT.01 platform architecture session — security-led scoping.',                              meta: 'CT.01 · CB.00' },
            ]}
          />
        </Reveal>
      </main>
      <SiteFooter />
    </>
  );
}
