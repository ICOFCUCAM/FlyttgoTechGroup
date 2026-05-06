import type { Metadata } from 'next';
import Link from '@/components/flytt/LocaleLink';
import Navbar from '@/components/flytt/Navbar';
import PageHero from '@/components/flytt/PageHero';
import SiteFooter from '@/components/flytt/SiteFooter';
import { Reveal } from '@/components/flytt/Reveal';
import NextStepsGrid from '@/components/flytt/NextStepsGrid';
import { breadcrumbListLd, jsonLdScript } from '@/lib/seo/jsonld';
import {
  Network,
  Code2,
  ShieldCheck,
  Cpu,
  Compass,
  ArrowUpRight,
  Workflow,
  Activity,
  type LucideIcon,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Open standards registry · OS.00 — FlyttGo Technologies Group',
  description:
    'Public list of every open standard the FlyttGo platform implements — protocols, schemas, identity, cryptography, observability, AI agent. Updated alongside the changelog.',
  alternates: { canonical: '/standards' },
};

type Category = {
  code: string;
  icon: LucideIcon;
  title: string;
  body: string;
  standards: { code: string; name: string; body: string; status: 'live' | 'preview' | 'planned' }[];
};

const CATEGORIES: Category[] = [
  {
    code: 'OS.AP',
    icon: Code2,
    title: 'API + integration',
    body: 'Protocols and schemas every FlyttGo module exposes consistently.',
    standards: [
      { code: 'OS.AP.01', name: 'OpenAPI 3.1',          status: 'live',    body: 'Full machine-readable API spec generated per release alongside the runtime.' },
      { code: 'OS.AP.02', name: 'AsyncAPI 3.0',         status: 'preview', body: 'Event surface description for webhooks, streaming events, MCP tool calls.' },
      { code: 'OS.AP.03', name: 'GraphQL Federation',    status: 'live',    body: 'Cross-module GraphQL federation gateway for joins that span planes.' },
      { code: 'OS.AP.04', name: 'JSON Schema 2020-12',   status: 'live',    body: 'Request / response schemas, webhook payloads, configuration files.' },
      { code: 'OS.AP.05', name: 'CloudEvents 1.0',       status: 'live',    body: 'Event envelope format for cross-module event streams.' },
    ],
  },
  {
    code: 'OS.AG',
    icon: Cpu,
    title: 'AI + agent',
    body: 'Standards that let AI agents discover and drive FlyttGo safely.',
    standards: [
      { code: 'OS.AG.01', name: 'Model Context Protocol (MCP)', status: 'live',    body: 'Discovery manifest at /.well-known/mcp.json. Tools, resources, transport, auth declared per the MCP spec.' },
      { code: 'OS.AG.02', name: 'AIBOM (AI Bill of Materials)',  status: 'planned', body: 'Per-workspace AI BOM — which models, which weights, which provenance. Coming Q4 2026.' },
      { code: 'OS.AG.03', name: 'C2PA · content provenance',     status: 'planned', body: 'C2PA-signed provenance manifests for AI-generated artefacts (proposals, summaries).' },
    ],
  },
  {
    code: 'OS.ID',
    icon: ShieldCheck,
    title: 'Identity + trust',
    body: 'How identity, signatures and credentials interoperate.',
    standards: [
      { code: 'OS.ID.01', name: 'OAuth 2.1 + PKCE',                status: 'live',    body: 'All workspace tokens issued under OAuth 2.1; PKCE mandatory for public clients.' },
      { code: 'OS.ID.02', name: 'OIDC 1.0',                          status: 'live',    body: 'OpenID Connect 1.0 for human auth flows.' },
      { code: 'OS.ID.03', name: 'SAML 2.0',                          status: 'live',    body: 'Enterprise SSO federation alongside OIDC.' },
      { code: 'OS.ID.04', name: 'eIDAS 2.0',                         status: 'live',    body: 'EU eIDAS 2.0 trust framework — qualified signatures, qualified seals, LoA mapping.' },
      { code: 'OS.ID.05', name: 'W3C Verifiable Credentials 2.0',    status: 'preview', body: 'VC issuance + verification via Identra; SD-JWT proofs supported.' },
      { code: 'OS.ID.06', name: 'OID4VCI / OID4VP',                  status: 'preview', body: 'OpenID for Verifiable Credentials issuance and presentation — EUDI Wallet alignment.' },
      { code: 'OS.ID.07', name: 'W3C Decentralized Identifiers (DIDs)', status: 'preview', body: 'did:web and did:key supported across subject and issuer roles.' },
      { code: 'OS.ID.08', name: 'FIDO2 / WebAuthn',                  status: 'live',    body: 'Phishing-resistant authentication for human operators and admin surfaces.' },
    ],
  },
  {
    code: 'OS.CR',
    icon: ShieldCheck,
    title: 'Cryptography',
    body: 'Primitives, certificate ecosystems, supply-chain provenance.',
    standards: [
      { code: 'OS.CR.01', name: 'TLS 1.3',                           status: 'live',    body: 'All inbound and inter-service traffic on TLS 1.3 minimum.' },
      { code: 'OS.CR.02', name: 'NIST FIPS 203/204/205 (PQC)',        status: 'preview', body: 'ML-KEM, ML-DSA, SLH-DSA migration in flight. See /post-quantum.' },
      { code: 'OS.CR.03', name: 'Sigstore · keyless signing',         status: 'live',    body: 'All container images and release artefacts Cosign-signed at release.' },
      { code: 'OS.CR.04', name: 'SLSA Build Level 3',                 status: 'live',    body: 'Supply-chain provenance attestations meet SLSA L3 for hosted-builder integrity.' },
      { code: 'OS.CR.05', name: 'CycloneDX SBOM 1.6',                 status: 'live',    body: 'Software Bill of Materials per release in CycloneDX 1.6 format.' },
    ],
  },
  {
    code: 'OS.OB',
    icon: Activity,
    title: 'Observability + ops',
    body: 'How telemetry leaves FlyttGo for tenant dashboards and SOC tools.',
    standards: [
      { code: 'OS.OB.01', name: 'OpenTelemetry',                     status: 'live',    body: 'Traces, metrics, logs all emitted in OTel format. Vendor-neutral export to any OTLP collector.' },
      { code: 'OS.OB.02', name: 'Prometheus exposition format',       status: 'live',    body: 'Per-tenant Prometheus metrics endpoint for scrape-based observability stacks.' },
      { code: 'OS.OB.03', name: 'OCSF (Open Cybersecurity Schema)',   status: 'preview', body: 'OCSF-formatted security event stream for SOC-side ingestion (Splunk, Sentinel, Chronicle).' },
      { code: 'OS.OB.04', name: 'Software Carbon Intensity (SCI)',    status: 'preview', body: 'Green Software Foundation SCI metric exposed per workload + deployment.' },
    ],
  },
  {
    code: 'OS.PY',
    icon: Workflow,
    title: 'Payments + financial',
    body: 'Payment-rail and financial-data interoperability.',
    standards: [
      { code: 'OS.PY.01', name: 'PSD2 SCA + Open Banking',          status: 'live',    body: 'Strong customer authentication flows for EU + UK rails via Payvera.' },
      { code: 'OS.PY.02', name: 'ISO 20022',                         status: 'live',    body: 'ISO 20022 messaging across SEPA, SEPA Instant and national rails.' },
      { code: 'OS.PY.03', name: 'SCT-Inst (SEPA Instant)',           status: 'live',    body: 'Sub-10-second euro-rail settlement on participating institutions.' },
      { code: 'OS.PY.04', name: 'PSD3 / PSR (in flight)',             status: 'planned', body: 'Tracking PSD3 + Payment Services Regulation finalisation; ready when published.' },
    ],
  },
];

const STATUS_LABEL: Record<'live' | 'preview' | 'planned', { label: string; cls: string }> = {
  live:    { label: 'Live',    cls: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300' },
  preview: { label: 'Preview', cls: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' },
  planned: { label: 'Planned', cls: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300' },
};

export default function StandardsPage() {
  const ld = breadcrumbListLd([
    { name: 'Home', href: '/' },
    { name: 'Open standards', href: '/standards' },
  ]);

  const total = CATEGORIES.reduce((sum, c) => sum + c.standards.length, 0);

  return (
    <>
      <script {...jsonLdScript(ld)} />
      <Navbar />
      <main
        id="main"
        className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased"
      >
        <PageHero
          code="OS.00"
          eyebrow="Open standards registry"
          title={
            <>
              {total} open standards,{' '}
              <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                six interop categories.
              </em>
            </>
          }
          description="Public registry of every open standard the FlyttGo platform implements — API protocols, AI agent surfaces, identity and credentials, cryptography, observability, payments. Updated alongside the changelog when adoption changes."
          crumbs={[{ label: 'Home', href: '/' }, { label: 'Open standards' }]}
        />

        {CATEGORIES.map((cat, i) => {
          const Icon = cat.icon;
          return (
            <Reveal key={cat.code}>
              <section
                id={cat.code.toLowerCase()}
                aria-labelledby={`${cat.code.toLowerCase()}-heading`}
                className={`py-16 lg:py-20 ${i % 2 === 0 ? 'bg-white dark:bg-slate-950' : 'bg-slate-50 dark:bg-slate-900/40'} border-b border-slate-200/60 dark:border-slate-800/60`}
              >
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                  <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
                    <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">{cat.code}</span>
                    <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[180px]" />
                    <span id={`${cat.code.toLowerCase()}-heading`} className="inline-flex items-center gap-1.5">
                      <Icon size={11} aria-hidden="true" />
                      {cat.title}
                    </span>
                  </div>
                  <p className="mt-4 max-w-3xl text-base text-slate-600 dark:text-slate-400 leading-[1.65]">
                    {cat.body}
                  </p>
                  <ul className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {cat.standards.map((s) => {
                      const status = STATUS_LABEL[s.status];
                      return (
                        <li
                          key={s.code}
                          className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <span className="font-mono text-[10px] tracking-[0.22em] font-semibold text-[#0A3A6B] dark:text-[#9ED0F9]">
                              {s.code}
                            </span>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-[0.14em] font-semibold ${status.cls}`}>
                              {status.label}
                            </span>
                          </div>
                          <h3 className="mt-3 text-[14px] font-semibold tracking-tight text-slate-900 dark:text-white leading-snug">
                            {s.name}
                          </h3>
                          <p className="mt-2 text-[12px] text-slate-600 dark:text-slate-400 leading-relaxed">
                            {s.body}
                          </p>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </section>
            </Reveal>
          );
        })}

        <Reveal>
          <NextStepsGrid
            code="OS.NX"
            eyebrow="Where standards adoption plugs in"
            titleLead="Open standards underpin"
            titleEmphasis="every other surface."
            intro="Standards aren't a deliverable — they're the floor. The four pathways below take a procurement team from this registry to a signed engagement under MNDA."
            steps={[
              { href: '/agents',        code: 'AI.00', icon: Cpu,         title: 'AI agent surface',  body: 'MCP discovery manifest, agent-callable tool registry, signed audit envelope.', meta: 'AI.00 · MCP-native' },
              { href: '/post-quantum',  code: 'PQ.00', icon: ShieldCheck, title: 'Post-quantum',      body: 'NIST FIPS 203/204/205-aligned migration. Per-surface migration matrix.',         meta: 'PQ.00 · 8 surfaces' },
              { href: '/wallet',        code: 'VC.00', icon: ShieldCheck, title: 'EU Digital ID Wallet', body: 'eIDAS 2.0, W3C VC 2.0, OID4VCI / OID4VP, DIDs, qualified signatures.',     meta: 'VC.00 · 6 capabilities' },
              { href: '/consultation',  code: 'CB.00', icon: Compass,     title: 'Open a standards engagement', body: 'Routed under CT.01 platform architecture session — interop-led scoping.',      meta: 'CT.01 · CB.00' },
            ]}
          />
        </Reveal>
      </main>
      <SiteFooter />
    </>
  );
}
