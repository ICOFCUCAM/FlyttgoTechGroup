import type { Metadata } from 'next';
import Link from '@/components/flytt/LocaleLink';
import Navbar from '@/components/flytt/Navbar';
import SiteFooter from '@/components/flytt/SiteFooter';
import {
  Network,
  Code2,
  Database,
  Container,
  Globe2,
  Fingerprint,
  CreditCard,
  GitBranch,
  ArrowUpRight,
  Layers,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Infrastructure architecture — FlyttGo platform stack',
  description:
    'Multi-tenant SaaS architecture, API-first interoperability, Kubernetes orchestration, multi-region deployment model, identity federation compatibility, payment infrastructure compatibility, data pipeline structure.',
  alternates: { canonical: '/infrastructure-architecture' },
};

const PILLARS = [
  {
    code: 'IA.01',
    icon: Layers,
    title: 'Multi-tenant SaaS architecture',
    body: 'Per-tenant schema isolation, tenant-scoped encryption keys, row-level security policies. Compute and storage logically partitioned per organization with optional dedicated-pool deployment.',
    accent: '#1E6FD9',
  },
  {
    code: 'IA.02',
    icon: Code2,
    title: 'API-first interoperability',
    body: 'Every platform capability addressable via versioned REST endpoints. OpenAPI 3.1 specifications generated per release; GraphQL gateway federates across modules where joins span planes.',
    accent: '#0FB5A6',
  },
  {
    code: 'IA.03',
    icon: Container,
    title: 'Kubernetes orchestration',
    body: 'Workloads scheduled on Kubernetes — managed (GKE / EKS / AKS) or sovereign-cluster equivalents. Helm-charted releases, GitOps-driven rollout via Argo CD, pinned via Sigstore-signed images.',
    accent: '#7C5CE6',
  },
  {
    code: 'IA.04',
    icon: Globe2,
    title: 'Multi-region deployment model',
    body: 'Primary regions, secondary regions, sovereign environments selectable per tenant. Region-aware DNS routing, asynchronous cross-region replication, residency tags enforced at the data layer.',
    accent: '#F5B547',
  },
  {
    code: 'IA.05',
    icon: Fingerprint,
    title: 'Identity federation compatibility',
    body: 'OIDC and SAML 2.0 federation as first-class. eIDAS LoA mapping, qualified-signature flows, cross-border attribute exchange via Identra. Workspace SSO into the entire module surface in one hop.',
    accent: '#A78BFA',
  },
  {
    code: 'IA.06',
    icon: CreditCard,
    title: 'Payment infrastructure compatibility',
    body: 'PSD2-ready strong customer authentication, open-banking endpoints, ISO 20022 messaging, transaction-monitoring hooks. Settles into the same audit envelope as identity and operations events.',
    accent: '#10B981',
  },
  {
    code: 'IA.07',
    icon: Database,
    title: 'Data pipeline structure',
    body: 'PostgreSQL primaries with logical replication; Kafka-style stream backbone for cross-module events; columnar warehouse for analytics. Append-only audit_log captures every mutation as JSONB before/after.',
    accent: '#60A5FA',
  },
];

const STACK_LAYERS = [
  { layer: 'Edge',           items: 'CDN · WAF · region-aware DNS · TLS 1.3' },
  { layer: 'Identity',       items: 'Identra · OIDC · SAML 2.0 · eIDAS · MFA · qualified signatures' },
  { layer: 'API gateway',    items: 'Versioned REST · GraphQL federation · per-tenant rate limits' },
  { layer: 'Orchestration',  items: 'Kubernetes · Helm · Argo CD · Sigstore-signed images' },
  { layer: 'Modules',        items: 'Transify · Workverge · Civitas · EduPro · Identra · Payvera · Ledgera · FlyttGo' },
  { layer: 'Data',           items: 'PostgreSQL primaries · logical replication · Kafka stream · columnar warehouse' },
  { layer: 'Observability',  items: 'Centralised logging · OpenTelemetry traces · tamper-evident audit_log' },
];

export default function InfrastructureArchitecturePage() {
  return (
    <>
      <Navbar />
      <main id="main" className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased">
        <section className="relative pt-14 lg:pt-20 pb-10 bg-gradient-to-b from-[#F7FAFD] to-white dark:from-slate-900 dark:to-slate-950 border-b border-slate-200/60 dark:border-slate-800/60">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
              <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">IA.00</span>
              <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
              <span>Infrastructure architecture</span>
            </div>
            <h1 className="mt-6 font-serif text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight leading-[1.05] max-w-3xl">
              The platform stack,{' '}
              <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                end to end.
              </em>
            </h1>
            <p className="mt-5 max-w-2xl text-base md:text-lg text-slate-600 dark:text-slate-400 leading-[1.65]">
              Seven architecture pillars compose the FlyttGo platform —
              multi-tenant SaaS, API-first interoperability, Kubernetes
              orchestration, multi-region deployment, identity federation,
              payment infrastructure, append-only data pipeline. Same
              contract under every deployment substrate.
            </p>
          </div>
        </section>

        {/* IA.0X — Architecture pillars */}
        <section className="py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500 mb-3">
              <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">IA.0X</span>
              <span className="mx-2 text-slate-300 dark:text-slate-700">·</span>
              Architecture pillars
            </div>
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {PILLARS.map((p) => {
                const Icon = p.icon;
                return (
                  <li key={p.code} className="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800/60 bg-white dark:bg-slate-900 flex flex-col">
                    <div className="flex items-start justify-between">
                      <span
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${p.accent}14`, color: p.accent }}
                        aria-hidden="true"
                      >
                        <Icon size={18} strokeWidth={1.75} />
                      </span>
                      <span
                        className="font-mono text-[10px] uppercase tracking-[0.22em] font-semibold"
                        style={{ color: p.accent }}
                      >
                        {p.code}
                      </span>
                    </div>
                    <h3 className="mt-3 text-[14px] font-semibold tracking-tight">{p.title}</h3>
                    <p className="mt-1 text-[12px] text-slate-600 dark:text-slate-400 leading-snug flex-1">{p.body}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* IA.SK — Stack diagram */}
        <section className="py-16 lg:py-20 bg-slate-50 dark:bg-slate-900/60 border-y border-slate-200/60 dark:border-slate-800/60">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500 mb-3">
              <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">IA.SK</span>
              <span className="mx-2 text-slate-300 dark:text-slate-700">·</span>
              Layered stack
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-medium tracking-tight">
              Seven layers,{' '}
              <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                one orchestration contract.
              </em>
            </h2>
            <div className="mt-8 rounded-2xl border border-slate-200/80 dark:border-slate-800/60 overflow-hidden bg-white dark:bg-slate-900">
              <ul className="divide-y divide-slate-200/60 dark:divide-slate-800/60">
                {STACK_LAYERS.map((l, i) => (
                  <li
                    key={l.layer}
                    className="px-5 py-4 flex items-start gap-4 hover:bg-slate-50 dark:hover:bg-slate-900/40"
                  >
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-400 font-semibold w-12 flex-shrink-0">
                      L.{String(STACK_LAYERS.length - i).padStart(2, '0')}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="text-[14px] font-semibold tracking-tight text-slate-900 dark:text-white">
                        {l.layer}
                      </div>
                      <div className="mt-0.5 font-mono text-[11px] text-slate-500 dark:text-slate-500 tracking-tight">
                        {l.items}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-6 max-w-3xl font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500 leading-relaxed">
              Same orchestration contract under every deployment substrate
              — FlyttGo-managed, customer cloud, sovereign datacenter.
            </p>
          </div>
        </section>

        {/* Cross-links */}
        <section className="py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 grid sm:grid-cols-3 gap-4">
            <Link href="/security" className="block p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/60 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md motion-safe:transition-all">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">CR.00 / TS.00</div>
              <h3 className="mt-3 text-base font-semibold tracking-tight">Security & trust signals</h3>
              <p className="mt-1 text-sm text-slate-500 leading-snug">SOC 2 / ISO 27001 alignment, SBOM, Sigstore-signed releases.</p>
              <span className="mt-3 inline-flex items-center gap-1 text-[12px] font-semibold text-[#0A3A6B] dark:text-[#9ED0F9]">Open <ArrowUpRight size={11} /></span>
            </Link>
            <Link href="/sovereign" className="block p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/60 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md motion-safe:transition-all">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">SV.00</div>
              <h3 className="mt-3 text-base font-semibold tracking-tight">Sovereign deployment</h3>
              <p className="mt-1 text-sm text-slate-500 leading-snug">National hosting + data-residency posture.</p>
              <span className="mt-3 inline-flex items-center gap-1 text-[12px] font-semibold text-[#0A3A6B] dark:text-[#9ED0F9]">Open <ArrowUpRight size={11} /></span>
            </Link>
            <Link href="/developers/playground" className="block p-6 rounded-2xl bg-[#0A1F3D] text-white border border-white/10 hover:border-white/20 motion-safe:transition-all">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9ED0F9] font-semibold inline-flex items-center gap-1">
                <Network size={11} aria-hidden="true" /> API.PG
              </div>
              <h3 className="mt-3 text-base font-semibold tracking-tight">Live API playground</h3>
              <p className="mt-1 text-sm text-white/70 leading-snug">Pick an endpoint, hit Send, see the real response.</p>
              <span className="mt-3 inline-flex items-center gap-1 text-[12px] font-semibold text-[#9ED0F9]">
                <GitBranch size={11} aria-hidden="true" />
                Open playground
                <ArrowUpRight size={11} aria-hidden="true" />
              </span>
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
