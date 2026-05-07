import type { Metadata } from 'next';
import Link from '@/components/flytt/LocaleLink';
import Navbar from '@/components/flytt/Navbar';
import PageHero from '@/components/flytt/PageHero';
import SiteFooter from '@/components/flytt/SiteFooter';
import { Reveal } from '@/components/flytt/Reveal';
import NextStepsGrid from '@/components/flytt/NextStepsGrid';
import { breadcrumbListLd, jsonLdScript } from '@/lib/seo/jsonld';
import {
  Bot,
  ShieldCheck,
  KeyRound,
  Activity,
  Code2,
  AlertTriangle,
  GitBranch,
  Workflow,
  ArrowUpRight,
  Compass,
  ServerCog,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'AI agent surface · AI.00 — FlyttGo Technologies Group',
  description:
    'Model Context Protocol (MCP) manifest, agent-callable tools, scoped tokens, signed audit envelope. The surface AI agents (Claude, ChatGPT, Gemini, Cursor) use to drive FlyttGo platforms safely.',
  alternates: { canonical: '/agents' },
};

type Tool = {
  code: string;
  name: string;
  module: string;
  description: string;
  scope: string;
  example: string;
};

const TOOLS: Tool[] = [
  {
    code: 'AI.T01', name: 'platform.list', module: 'Platform',
    description: 'List the eight platforms (Transify, Workverge, Civitas, EduPro, Identra, Payvera, Ledgera, FlyttGo) with category and status.',
    scope: 'public:read',
    example: '{ "tool": "platform.list" }',
  },
  {
    code: 'AI.T02', name: 'transify.routeOrder', module: 'Transify',
    description: 'Submit a routed order to the mobility platform. Constraints, capacity envelope and SLA target follow the workspace policy.',
    scope: 'transify:write · workspace-scoped',
    example: '{ "tool": "transify.routeOrder", "input": { "origin": "...", "destination": "..." } }',
  },
  {
    code: 'AI.T03', name: 'identra.verifyIdentity', module: 'Identra',
    description: 'Trigger an identity verification (LoA-substantial). Returns a session URL the citizen completes; webhook delivers the result.',
    scope: 'identra:write · workspace-scoped',
    example: '{ "tool": "identra.verifyIdentity", "input": { "subject": "...", "loa": "substantial" } }',
  },
  {
    code: 'AI.T04', name: 'payvera.createPaymentIntent', module: 'Payvera',
    description: 'Create a payment intent across SEPA, SEPA Instant, national rails or Stripe. PSD2 SCA flows applied per regulator.',
    scope: 'payvera:write · workspace-scoped',
    example: '{ "tool": "payvera.createPaymentIntent", "input": { "amount": 12000, "currency": "EUR" } }',
  },
  {
    code: 'AI.T05', name: 'civitas.submitApplication', module: 'Civitas',
    description: 'Submit a citizen application against a Civitas service template. Routed to the responsible agency under audit envelope.',
    scope: 'civitas:write · workspace-scoped',
    example: '{ "tool": "civitas.submitApplication", "input": { "templateId": "...", "fields": { ... } } }',
  },
  {
    code: 'AI.T06', name: 'docs.search', module: 'Platform',
    description: 'Search public documentation by free-text query. Returns top-N matching entries with source URLs.',
    scope: 'public:read',
    example: '{ "tool": "docs.search", "input": { "query": "sovereign deployment KSA", "top": 5 } }',
  },
];

type Pillar = {
  code: string;
  icon: LucideIcon;
  title: string;
  body: string;
};

const PILLARS: Pillar[] = [
  {
    code: 'AI.PR.01', icon: KeyRound,
    title: 'Workspace-scoped agent tokens',
    body: 'Every agent operates under a workspace token bound to a specific tenant. Tokens carry an explicit tool allowlist; calls outside the allowlist are rejected at the gateway, before the platform module sees them.',
  },
  {
    code: 'AI.PR.02', icon: Activity,
    title: 'Same audit envelope as humans',
    body: 'Agent calls land in the same append-only JSONB before/after audit_log every human mutation does. The actor is recorded as the workspace token + agent ID, never as anonymous. Auditors can replay any agent run end-to-end.',
  },
  {
    code: 'AI.PR.03', icon: AlertTriangle,
    title: 'Per-tool rate + abuse detection',
    body: 'Per-tool QPS caps, per-tenant daily ceilings, anomaly detection on call patterns. Suspicious sessions throttle then suspend automatically; the security desk reviews suspended sessions within one business day.',
  },
  {
    code: 'AI.PR.04', icon: ShieldCheck,
    title: 'Human-in-the-loop tier',
    body: 'High-impact tools (payment writes, identity issuance, government submissions) carry a HITL flag. The agent calls; the platform queues a confirmation request for a designated human; only on approval does the call execute.',
  },
];

export default function AgentsPage() {
  const ld = breadcrumbListLd([
    { name: 'Home', href: '/' },
    { name: 'AI agent surface', href: '/agents' },
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
          code="AI.00"
          eyebrow="AI agent surface"
          title={
            <>
              The substrate{' '}
              <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                LLM agents drive safely.
              </em>
            </>
          }
          description="Model Context Protocol (MCP) manifest plus a workspace-scoped tool surface. Claude, ChatGPT, Gemini, Cursor and any future MCP-compatible agent can discover FlyttGo capabilities and drive platform actions under the same audit envelope a human operator would."
          crumbs={[{ label: 'Home', href: '/' }, { label: 'AI agent surface' }]}
        />

        {/* AI.MAN — discovery manifest */}
        <Reveal>
          <section
            id="ai-man"
            aria-labelledby="ai-man-heading"
            className="bg-gradient-to-b from-white to-[#F5F8FC] dark:from-slate-950 dark:to-slate-900 py-20 lg:py-24 border-y border-slate-200/60 dark:border-slate-800/60"
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-5">
                <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
                  <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">AI.MAN</span>
                  <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[180px]" />
                  <span id="ai-man-heading">Discovery manifest</span>
                </div>
                <h2 className="mt-6 font-serif text-2xl md:text-3xl font-medium tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                  Auto-discoverable{' '}
                  <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                    by every MCP-compatible agent.
                  </em>
                </h2>
                <p className="mt-4 text-[14px] text-slate-600 dark:text-slate-400 leading-[1.65]">
                  FlyttGo publishes a Model Context Protocol manifest at the
                  IETF-conventional <code className="font-mono text-[12px] bg-slate-100 dark:bg-slate-800 px-1 rounded">/.well-known/mcp.json</code> endpoint. Any MCP-aware client &mdash;
                  Claude Desktop, OpenAI Agents SDK, Cursor, Continue, Cody &mdash;
                  picks up FlyttGo automatically once the workspace operator
                  enables it.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Link
                    href="/.well-known/mcp.json"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#0A3A6B] text-white text-sm font-semibold hover:bg-[#0A3A6B]/90 motion-safe:transition-colors"
                  >
                    <Bot size={14} aria-hidden="true" />
                    View live MCP manifest
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </Link>
                  <Link
                    href="https://modelcontextprotocol.io"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 text-slate-900 dark:text-white text-sm font-semibold hover:border-slate-300 motion-safe:transition-colors"
                  >
                    MCP spec ↗
                  </Link>
                </div>
              </div>
              <div className="lg:col-span-7">
                <div className="rounded-2xl bg-[#0A1F3D] border border-white/10 overflow-hidden">
                  <div className="flex items-center justify-between gap-3 px-4 py-2.5 border-b border-white/10">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-red-400/80" />
                      <span className="w-2 h-2 rounded-full bg-amber-400/80" />
                      <span className="w-2 h-2 rounded-full bg-emerald-400/80" />
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/55">
                      curl · /.well-known/mcp.json
                    </span>
                  </div>
                  <pre className="p-5 text-[12px] leading-relaxed text-white/90 font-mono overflow-x-auto">
{`# Any MCP client auto-discovers FlyttGo by hitting:
curl https://flyttgotech.com/.well-known/mcp.json

# Sample fragment of the response:
{
  "name": "flyttgo-platform",
  "version": "1.0.0",
  "endpoint": {
    "transport": "http",
    "url": "/api/mcp",
    "auth": "OAuth 2.1 + workspace token"
  },
  "tools": [
    { "name": "transify.routeOrder", ... },
    { "name": "identra.verifyIdentity", ... },
    { "name": "payvera.createPaymentIntent", ... },
    { "name": "civitas.submitApplication", ... }
  ],
  "resources": [
    { "uri": "flyttgo://docs/platforms" },
    { "uri": "flyttgo://docs/deployment" },
    { "uri": "flyttgo://docs/compliance" }
  ]
}`}
                  </pre>
                </div>
              </div>
            </div>
          </section>
        </Reveal>

        {/* AI.PR — safety pillars */}
        <Reveal>
          <section
            id="ai-pr"
            aria-labelledby="ai-pr-heading"
            className="py-20 lg:py-24 bg-white dark:bg-slate-950 border-b border-slate-200/60 dark:border-slate-800/60"
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
                <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">AI.PR</span>
                <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
                <span id="ai-pr-heading">Agent safety pillars</span>
              </div>
              <h2 className="mt-6 max-w-3xl font-serif text-3xl md:text-4xl font-medium tracking-tight text-slate-900 dark:text-white leading-[1.05]">
                Agents drive the platform{' '}
                <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                  under the same rails as humans.
                </em>
              </h2>
              <p className="mt-4 max-w-3xl text-base text-slate-600 dark:text-slate-400 leading-[1.65]">
                Four guarantees that make institutional buyers comfortable
                handing the keys to an LLM. Each is enforced at the gateway,
                not in the prompt.
              </p>
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

        {/* AI.TL — agent-callable tool registry */}
        <Reveal>
          <section
            id="ai-tl"
            aria-labelledby="ai-tl-heading"
            className="py-20 lg:py-24 bg-slate-50 dark:bg-slate-900/40 border-b border-slate-200/60 dark:border-slate-800/60"
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
                <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">AI.TL</span>
                <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
                <span id="ai-tl-heading">Agent-callable tool registry</span>
              </div>
              <h2 className="mt-6 max-w-3xl font-serif text-3xl md:text-4xl font-medium tracking-tight text-slate-900 dark:text-white leading-[1.05]">
                Six tools at preview,{' '}
                <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                  full surface in flight.
                </em>
              </h2>
              <ul className="mt-10 grid md:grid-cols-2 gap-3">
                {TOOLS.map((t) => (
                  <li
                    key={t.code}
                    className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="font-mono text-[11px] uppercase tracking-[0.16em] font-semibold text-[#0A3A6B] dark:text-[#9ED0F9]">
                          {t.code}
                        </span>
                        <div className="mt-1 font-mono text-[14px] font-semibold text-slate-900 dark:text-white">
                          {t.name}
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 font-mono text-[10px] uppercase tracking-[0.14em] text-slate-600 dark:text-slate-400">
                        {t.module}
                      </span>
                    </div>
                    <p className="mt-3 text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed">
                      {t.description}
                    </p>
                    <div className="mt-4 pt-3 border-t border-slate-200/70 dark:border-slate-800/60">
                      <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400">
                        Scope
                      </div>
                      <div className="mt-1 font-mono text-[11px] text-slate-700 dark:text-slate-300">
                        {t.scope}
                      </div>
                    </div>
                    <pre className="mt-3 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/60 font-mono text-[10px] text-slate-600 dark:text-slate-400 overflow-x-auto">
{t.example}
                    </pre>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </Reveal>

        {/* AI.IN — integration code samples */}
        <Reveal>
          <section
            id="ai-in"
            aria-labelledby="ai-in-heading"
            className="py-20 lg:py-24 bg-white dark:bg-slate-950 border-b border-slate-200/60 dark:border-slate-800/60"
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-5">
                <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
                  <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">AI.IN</span>
                  <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[180px]" />
                  <span id="ai-in-heading">Integration patterns</span>
                </div>
                <h2 className="mt-6 font-serif text-2xl md:text-3xl font-medium tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                  Wire FlyttGo into any{' '}
                  <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                    agent runtime.
                  </em>
                </h2>
                <p className="mt-4 text-[14px] text-slate-600 dark:text-slate-400 leading-[1.65]">
                  The MCP transport works the same way across runtimes. Claude
                  Desktop and Cursor pick it up declaratively; the OpenAI
                  Agents SDK and Anthropic SDK wire it through one constructor
                  argument.
                </p>
                <ul className="mt-6 space-y-2 text-[13px] text-slate-600 dark:text-slate-400">
                  <li className="flex items-center gap-2">
                    <Sparkles size={12} className="text-[#D6B575]" aria-hidden="true" />
                    Anthropic Claude · MCP-native
                  </li>
                  <li className="flex items-center gap-2">
                    <Sparkles size={12} className="text-[#D6B575]" aria-hidden="true" />
                    OpenAI Agents SDK · MCP adapter
                  </li>
                  <li className="flex items-center gap-2">
                    <Sparkles size={12} className="text-[#D6B575]" aria-hidden="true" />
                    Cursor + Continue + Cody · MCP client built-in
                  </li>
                  <li className="flex items-center gap-2">
                    <Sparkles size={12} className="text-[#D6B575]" aria-hidden="true" />
                    Custom runtime · HTTP transport · OAuth 2.1 token
                  </li>
                </ul>
              </div>
              <div className="lg:col-span-7">
                <div className="rounded-2xl bg-[#0A1F3D] border border-white/10 overflow-hidden">
                  <div className="flex items-center justify-between gap-3 px-4 py-2.5 border-b border-white/10">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-red-400/80" />
                      <span className="w-2 h-2 rounded-full bg-amber-400/80" />
                      <span className="w-2 h-2 rounded-full bg-emerald-400/80" />
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/55">
                      typescript · @anthropic-ai/sdk + flyttgo MCP
                    </span>
                  </div>
                  <pre className="p-5 text-[12px] leading-relaxed text-white/90 font-mono overflow-x-auto">
{`import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic();

// Add the FlyttGo MCP server alongside any other agent tools
const message = await client.messages.create({
  model: 'claude-sonnet-4-6',
  max_tokens: 1024,
  mcp_servers: [
    {
      type: 'url',
      url: 'https://flyttgotech.com/api/mcp',
      name: 'flyttgo',
      authorization_token: process.env.FLYTTGO_WORKSPACE_TOKEN,
    },
  ],
  messages: [
    {
      role: 'user',
      content:
        'Route a same-day order from Oslo to Stockholm for ' +
        'a 2-pallet load and report back the assigned provider.',
    },
  ],
});

console.log(message.content);
// → Agent picks transify.routeOrder, applies workspace policy,
//   posts the order, and returns the routed provider summary.`}
                  </pre>
                </div>
              </div>
            </div>
          </section>
        </Reveal>

        {/* AI.RM — agent surface roadmap */}
        <Reveal>
          <section
            id="ai-rm"
            aria-labelledby="ai-rm-heading"
            className="py-20 lg:py-24 bg-slate-50 dark:bg-slate-900/40 border-b border-slate-200/60 dark:border-slate-800/60"
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
                <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">AI.RM</span>
                <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
                <span id="ai-rm-heading">Agent surface roadmap</span>
              </div>
              <ul className="mt-10 grid md:grid-cols-3 gap-3">
                {[
                  { code: 'AI.RM.Q2', title: 'Public preview · Q2 2026',     body: 'Six tools live on the MCP transport. Workspace token issuance via the trust desk; sandbox tenants seeded with synthetic data.' },
                  { code: 'AI.RM.Q3', title: 'Full surface · Q3 2026',        body: 'All eight platform modules expose their public-facing tool set. HITL queue available for high-impact tools. Per-tool rate caps + abuse detection in production.' },
                  { code: 'AI.RM.Q4', title: 'Agent governance · Q4 2026',    body: 'AIBOM (AI Bill of Materials) per workspace, signed agent identity (verifiable agent attestation), EU AI Act risk-tier classification per tool.' },
                ].map((q) => (
                  <li
                    key={q.code}
                    className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60"
                  >
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] font-semibold text-[#0A3A6B] dark:text-[#9ED0F9]">
                      {q.code}
                    </span>
                    <h3 className="mt-3 text-[15px] font-semibold tracking-tight text-slate-900 dark:text-white">
                      {q.title}
                    </h3>
                    <p className="mt-2 text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed">
                      {q.body}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <NextStepsGrid
            code="AI.NX"
            eyebrow="Where the agent surface plugs in"
            titleLead="Agent access is one shape of"
            titleEmphasis="programmatic platform access."
            intro="Agents land in the same audit envelope as the API; the same trust artefacts apply; the same procurement framework still gates production. The four pathways below take an interested team from MCP discovery to a signed deployment."
            steps={[
              { href: '/developers/api', code: 'AP.RF', icon: Code2,       title: 'API reference',     body: 'OpenAPI 3.1 across eight modules. Every tool the agent calls has an underlying versioned REST endpoint.', meta: 'AP.RF · 634+ endpoints' },
              { href: '/trust',          code: 'TC.00', icon: ShieldCheck, title: 'Trust artefacts',   body: 'SOC 2, ISO 27001, DPA, subprocessors — including the AI subprocessors any agent run touches.',                meta: 'TC.00 · 8 artefacts' },
              { href: '/roadmap',        code: 'RM.00', icon: GitBranch,    title: 'Public roadmap',    body: 'AI agent surface tracked in the public roadmap with quarterly milestones and slip explanations.',             meta: 'RM.00 · quarterly' },
              { href: '/consultation',   code: 'CB.00', icon: Compass,     title: 'Open agent intake', body: 'Workspace token issuance + sandbox tenant routed under CT.01 platform architecture session.',                  meta: 'CT.01 · CB.00' },
            ]}
          />
        </Reveal>
      </main>
      <SiteFooter />
    </>
  );
}
