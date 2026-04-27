import type { Metadata } from 'next';
import Link from '@/components/flytt/LocaleLink';
import Navbar from '@/components/flytt/Navbar';
import SiteFooter from '@/components/flytt/SiteFooter';
import { Code2, Network, Lock, Workflow, Terminal, ArrowUpRight, GitBranch, ShieldCheck } from 'lucide-react';
import ApiCodeRibbon from '@/components/flytt/ApiCodeRibbon';

export const metadata: Metadata = {
  title: 'API architecture — FlyttGo platform',
  description:
    'API-first interoperability across the FlyttGo platform. Versioned REST endpoints, OpenAPI 3.1 specs per release, GraphQL gateway federation, MCP discovery surface for agentic clients.',
  alternates: { canonical: '/api-architecture' },
};

const PILLARS = [
  {
    code: 'AP.01',
    icon: Code2,
    title: 'Versioned REST endpoints',
    body: 'Every platform capability addressable via /api/v{n}/<resource>. Major-version changes are additive within a deprecation window; breaking changes ship behind a new vN. OpenAPI 3.1 spec generated per release.',
  },
  {
    code: 'AP.02',
    icon: Network,
    title: 'GraphQL federation',
    body: 'Federated GraphQL gateway composes per-module subgraphs (Identra · Payvera · Transify · Workverge · Civitas · EduPro · Ledgera). Cross-module joins resolved at the gateway; per-module governance preserved.',
  },
  {
    code: 'AP.03',
    icon: Lock,
    title: 'Tenant + identity scope',
    body: 'Every request authenticates through Identra. Tenant scope is enforced at the gateway (X-Org-ID header signed into the JWT) plus at the database layer via row-level security. No cross-tenant query path.',
  },
  {
    code: 'AP.04',
    icon: Workflow,
    title: 'Event + webhook surface',
    body: 'Outbound webhooks for every domain event (journal.posted, identity.signed_in, payment.settled). HMAC-signed payloads + replay protection via event_id. Inbound webhook ingestion endpoints for upstream integrations.',
  },
  {
    code: 'AP.05',
    icon: Terminal,
    title: 'MCP discovery surface',
    body: 'Model Context Protocol manifest at /.well-known/mcp.json so AI agents (Claude · ChatGPT · Cursor · Copilot) auto-discover the FlyttGo capability surface. Six tools + three resources declared.',
  },
  {
    code: 'AP.06',
    icon: GitBranch,
    title: 'SDK + sample clients',
    body: 'First-party SDKs (TypeScript · Python) plus reference clients in Go and Rust. Generated from the OpenAPI spec; pinned to API version. Released alongside the platform on the same Sigstore-signed cadence.',
  },
];

const RATE_LIMITS = [
  { surface: 'Public read endpoints',          tier: 'Tier 1', limit: '1,000 req/min/IP',         note: 'Status, MCP, sitemap, public docs' },
  { surface: 'Authenticated tenant endpoints', tier: 'Tier 2', limit: '10,000 req/min/tenant',    note: 'CRUD on org-scoped resources' },
  { surface: 'Bulk + reporting endpoints',     tier: 'Tier 3', limit: '60 req/min/tenant',        note: 'Statutory exports, large datasets' },
  { surface: 'Webhook delivery',               tier: 'OUT',    limit: '500 req/min/destination', note: 'Outbound; backoff + retry on 5xx' },
];

export default function ApiArchitecturePage() {
  return (
    <>
      <Navbar />
      <main id="main" className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased">
        <section className="relative pt-14 lg:pt-20 pb-10 bg-gradient-to-b from-[#F7FAFD] to-white dark:from-slate-900 dark:to-slate-950 border-b border-slate-200/60 dark:border-slate-800/60">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
              <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">AP.00</span>
              <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
              <span>API architecture</span>
            </div>
            <h1 className="mt-6 font-serif text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight leading-[1.05] max-w-3xl">
              API-first by{' '}
              <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                construction.
              </em>
            </h1>
            <p className="mt-5 max-w-2xl text-base md:text-lg text-slate-600 dark:text-slate-400 leading-[1.65]">
              Every platform capability is reachable through versioned
              REST + federated GraphQL. Identity-scoped per request,
              tenant-scoped at the row, signed webhook delivery, MCP
              discovery surface for agentic clients.
            </p>
          </div>
        </section>

        {/* Pillars */}
        <section className="py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500 mb-3">
              <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">AP.0X</span>
              <span className="mx-2 text-slate-300 dark:text-slate-700">·</span>
              API surface pillars
            </div>
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {PILLARS.map((p) => {
                const Icon = p.icon;
                return (
                  <li key={p.code} className="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800/60 bg-white dark:bg-slate-900 flex flex-col">
                    <div className="flex items-start justify-between">
                      <span className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800/60 text-[#0A3A6B] dark:text-[#9ED0F9] flex items-center justify-center" aria-hidden="true">
                        <Icon size={18} strokeWidth={1.75} />
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.22em] font-semibold text-[#0A3A6B] dark:text-[#9ED0F9]">{p.code}</span>
                    </div>
                    <h3 className="mt-3 text-[14px] font-semibold tracking-tight">{p.title}</h3>
                    <p className="mt-1 text-[12px] text-slate-600 dark:text-slate-400 leading-snug flex-1">{p.body}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* API.RB — Code preview ribbon */}
        <ApiCodeRibbon />

        {/* Rate limit table */}
        <section className="py-16 lg:py-20 bg-slate-50 dark:bg-slate-900/60 border-y border-slate-200/60 dark:border-slate-800/60">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500 mb-3">
              <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">AP.RL</span>
              <span className="mx-2 text-slate-300 dark:text-slate-700">·</span>
              Rate-limit matrix
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-medium tracking-tight">Per-surface limits.</h2>
            <div className="mt-8 rounded-2xl border border-slate-200/80 dark:border-slate-800/60 overflow-hidden bg-white dark:bg-slate-900">
              <table className="w-full text-sm tabular-nums">
                <thead className="bg-slate-50 dark:bg-slate-900/80 text-left">
                  <tr className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
                    <th className="px-4 py-3">Surface</th>
                    <th className="px-4 py-3 w-24">Tier</th>
                    <th className="px-4 py-3 w-56">Limit</th>
                    <th className="px-4 py-3">Note</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/60 dark:divide-slate-800/60">
                  {RATE_LIMITS.map((r) => (
                    <tr key={r.surface}>
                      <td className="px-4 py-2.5 text-slate-800 dark:text-slate-200">{r.surface}</td>
                      <td className="px-4 py-2.5 font-mono font-semibold text-[#0A3A6B] dark:text-[#9ED0F9]">{r.tier}</td>
                      <td className="px-4 py-2.5 font-mono text-[12px]">{r.limit}</td>
                      <td className="px-4 py-2.5 text-[13px] text-slate-600 dark:text-slate-400">{r.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-6 max-w-3xl font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500 leading-relaxed">
              Limits return X-RateLimit-Limit + X-RateLimit-Remaining +
              Retry-After headers. Exceeding tier-2 returns 429 — backoff
              guidance built into the SDK clients.
            </p>
          </div>
        </section>

        {/* Cross-links */}
        <section className="py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 grid sm:grid-cols-3 gap-4">
            <Link href="/developers/playground" className="block p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/60 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md motion-safe:transition-all">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">API.PG</div>
              <h3 className="mt-3 text-base font-semibold tracking-tight">Live API playground</h3>
              <p className="mt-1 text-sm text-slate-500 leading-snug">Pick an endpoint, hit Send, see the real response inline.</p>
              <span className="mt-3 inline-flex items-center gap-1 text-[12px] font-semibold text-[#0A3A6B] dark:text-[#9ED0F9]">Open playground <ArrowUpRight size={11} /></span>
            </Link>
            <Link href="/.well-known/mcp.json" className="block p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/60 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md motion-safe:transition-all">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">MCP.00</div>
              <h3 className="mt-3 text-base font-semibold tracking-tight">MCP discovery manifest</h3>
              <p className="mt-1 text-sm text-slate-500 leading-snug">For AI agents auto-discovering the FlyttGo surface.</p>
              <span className="mt-3 inline-flex items-center gap-1 text-[12px] font-semibold text-[#0A3A6B] dark:text-[#9ED0F9]">View manifest <ArrowUpRight size={11} /></span>
            </Link>
            <Link href="/security" className="block p-6 rounded-2xl bg-[#0A1F3D] text-white border border-white/10 hover:border-white/20 motion-safe:transition-all">
              <ShieldCheck size={20} className="text-[#9ED0F9]" aria-hidden="true" />
              <h3 className="mt-3 text-base font-semibold tracking-tight">Security & trust signals</h3>
              <p className="mt-1 text-sm text-white/70 leading-snug">SBOM, Sigstore-signed releases, append-only audit trail.</p>
              <span className="mt-3 inline-flex items-center gap-1 text-[12px] font-semibold text-[#9ED0F9]">Open <ArrowUpRight size={11} /></span>
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
