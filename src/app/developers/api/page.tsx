import type { Metadata } from 'next';
import Link from '@/components/flytt/LocaleLink';
import Navbar from '@/components/flytt/Navbar';
import PageHero from '@/components/flytt/PageHero';
import SiteFooter from '@/components/flytt/SiteFooter';
import { Reveal } from '@/components/flytt/Reveal';
import { breadcrumbListLd, jsonLdScript } from '@/lib/seo/jsonld';
import {
  Route,
  UserCheck,
  Landmark,
  GraduationCap,
  Fingerprint,
  CreditCard,
  Calculator,
  Truck,
  Code2,
  Shield,
  Webhook,
  KeyRound,
  ArrowUpRight,
  type LucideIcon,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'API reference · AP.00 — FlyttGo developer portal',
  description:
    'OpenAPI 3.1 reference across the FlyttGo platform — Transify, Workverge, Civitas, EduPro, Identra, Payvera, Ledgera and FlyttGo Marketplace. Versioned REST, GraphQL gateway, idempotency keys, webhooks.',
  alternates: { canonical: '/developers/api' },
};

type ApiSurface = {
  code: string;
  module: string;
  description: string;
  icon: LucideIcon;
  baseUrl: string;
  endpoints: number;
  version: string;
  /** Sample endpoint shown on the card. */
  sample: { method: string; path: string; summary: string };
  href: string;
};

const APIS: ApiSurface[] = [
  {
    code: 'AP.TR', module: 'Transify', icon: Route,
    description: 'Mobility infrastructure — orders, providers, routing, capacity, audit log.',
    baseUrl: 'https://api.flyttgo.tech/v1/transify',
    endpoints: 86,  version: 'v1.14',
    sample: { method: 'POST', path: '/orders', summary: 'Create a routed order' },
    href: '/platforms/transify',
  },
  {
    code: 'AP.WK', module: 'Workverge', icon: UserCheck,
    description: 'Workforce coordination — shifts, tasks, dispatch, presence, payroll hooks.',
    baseUrl: 'https://api.flyttgo.tech/v1/workverge',
    endpoints: 64,  version: 'v1.09',
    sample: { method: 'POST', path: '/shifts', summary: 'Schedule a shift' },
    href: '/platforms/workverge',
  },
  {
    code: 'AP.CV', module: 'Civitas', icon: Landmark,
    description: 'Government services — citizen accounts, applications, fee collection, audit.',
    baseUrl: 'https://api.flyttgo.tech/v1/civitas',
    endpoints: 112, version: 'v1.18',
    sample: { method: 'POST', path: '/applications', summary: 'Submit a service application' },
    href: '/platforms/civitas',
  },
  {
    code: 'AP.ED', module: 'EduPro', icon: GraduationCap,
    description: 'Education intelligence — students, cohorts, credentials, learning analytics.',
    baseUrl: 'https://api.flyttgo.tech/v1/edupro',
    endpoints: 71,  version: 'v1.11',
    sample: { method: 'GET',  path: '/credentials/{id}', summary: 'Fetch a verifiable credential' },
    href: '/platforms/edupro',
  },
  {
    code: 'AP.ID', module: 'Identra', icon: Fingerprint,
    description: 'Identity & auth — OIDC, SAML 2.0, eIDAS LoA, MFA, qualified signature.',
    baseUrl: 'https://api.flyttgo.tech/v1/identra',
    endpoints: 58,  version: 'v1.22',
    sample: { method: 'POST', path: '/auth/qualified-signature', summary: 'Request a qualified signature' },
    href: '/platforms/identra',
  },
  {
    code: 'AP.PV', module: 'Payvera', icon: CreditCard,
    description: 'Payment orchestration — PSD2 SCA, SEPA, national rails, escrow, settlement.',
    baseUrl: 'https://api.flyttgo.tech/v1/payvera',
    endpoints: 94,  version: 'v1.19',
    sample: { method: 'POST', path: '/payments/intents', summary: 'Create a payment intent' },
    href: '/platforms/payvera',
  },
  {
    code: 'AP.LD', module: 'Ledgera', icon: Calculator,
    description: 'Financial operations — ledger postings, reconciliation, audit trail, exports.',
    baseUrl: 'https://api.flyttgo.tech/v1/ledgera',
    endpoints: 47,  version: 'v1.06',
    sample: { method: 'POST', path: '/ledger/postings', summary: 'Post a double-entry transaction' },
    href: '/platforms/ledgera',
  },
  {
    code: 'AP.MP', module: 'FlyttGo Marketplace', icon: Truck,
    description: 'Marketplace OS — provider routing, trust, pricing intelligence, dispute resolution.',
    baseUrl: 'https://api.flyttgo.tech/v1/marketplace',
    endpoints: 102, version: 'v1.07',
    sample: { method: 'POST', path: '/disputes', summary: 'Open a dispute case file' },
    href: '/marketplace',
  },
];

const PRINCIPLES = [
  {
    code: 'AP.PR.01', icon: Code2, title: 'OpenAPI 3.1 across every module',
    body: 'Every endpoint is described in OpenAPI 3.1. Specs are generated per release and shipped alongside the code that implements them — no drift between docs and runtime.',
  },
  {
    code: 'AP.PR.02', icon: Shield, title: 'OAuth 2.1 + signed-key auth',
    body: 'Workspace-scoped access tokens via OAuth 2.1 (PKCE for public clients). Sigstore-signed long-lived API keys for server-to-server. mTLS available for sovereign tenants.',
  },
  {
    code: 'AP.PR.03', icon: Webhook, title: 'Webhooks signed with HMAC-SHA256',
    body: 'Every event signed with HMAC-SHA256 + timestamp; replays rejected outside a 5-minute window. Per-tenant signing keys, rotatable in one call. Receipts are idempotent.',
  },
  {
    code: 'AP.PR.04', icon: KeyRound, title: 'Idempotency keys + audit envelope',
    body: 'POST endpoints take an Idempotency-Key header — the same payload applied twice yields the same result. Every mutation enters the same JSONB before/after audit envelope.',
  },
];

const METHOD_CLS: Record<string, string> = {
  GET:    'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
  POST:   'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  PUT:    'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
  PATCH:  'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
  DELETE: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
};

export default function ApiReferencePage() {
  const ld = breadcrumbListLd([
    { name: 'Home', href: '/' },
    { name: 'Developers', href: '/developers' },
    { name: 'API reference', href: '/developers/api' },
  ]);

  const totalEndpoints = APIS.reduce((sum, a) => sum + a.endpoints, 0);

  return (
    <>
      <script {...jsonLdScript(ld)} />
      <Navbar />
      <main
        id="main"
        className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased"
      >
        <PageHero
          code="AP.00"
          eyebrow="API reference"
          title={
            <>
              Eight modules,{' '}
              <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                {totalEndpoints}+ versioned endpoints.
              </em>
            </>
          }
          description="OpenAPI 3.1 reference across the FlyttGo platform. Every module addressable via versioned REST; the GraphQL gateway federates across modules where joins span planes. OAuth 2.1, signed webhooks, idempotency keys, full audit envelope."
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'Developers', href: '/developers' },
            { label: 'API reference' },
          ]}
        />

        {/* AP.IDX — module API grid */}
        <Reveal>
          <section
            id="ap-idx"
            aria-labelledby="ap-idx-heading"
            className="bg-gradient-to-b from-white to-[#F5F8FC] dark:from-slate-950 dark:to-slate-900 py-20 lg:py-24 border-y border-slate-200/60 dark:border-slate-800/60"
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
                <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">AP.IDX</span>
                <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
                <span id="ap-idx-heading">Module APIs · OpenAPI 3.1</span>
              </div>
              <ul className="mt-12 grid md:grid-cols-2 gap-4">
                {APIS.map((api) => {
                  const Icon = api.icon;
                  const methodCls = METHOD_CLS[api.sample.method] ?? METHOD_CLS.POST;
                  return (
                    <li key={api.code}>
                      <Link
                        href={api.href}
                        className="group flex flex-col h-full p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9]/40 focus-visible:ring-offset-[3px]"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <span
                            className="w-11 h-11 rounded-xl bg-[#0A3A6B]/8 dark:bg-[#9ED0F9]/12 text-[#0A3A6B] dark:text-[#9ED0F9] flex items-center justify-center"
                            aria-hidden="true"
                          >
                            <Icon size={20} strokeWidth={1.75} />
                          </span>
                          <div className="flex flex-col items-end gap-1">
                            <span className="font-mono text-[10px] tracking-[0.22em] font-semibold text-[#0A3A6B] dark:text-[#9ED0F9]">
                              {api.code}
                            </span>
                            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400">
                              {api.version} · {api.endpoints} endpoints
                            </span>
                          </div>
                        </div>
                        <h3 className="mt-5 font-serif text-xl font-medium tracking-tight text-slate-900 dark:text-white">
                          {api.module}
                        </h3>
                        <p className="mt-2 text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed flex-1">
                          {api.description}
                        </p>
                        <div className="mt-5 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60 p-3 font-mono text-[11px] overflow-hidden">
                          <div className="flex items-center gap-2">
                            <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold tracking-wide ${methodCls}`}>
                              {api.sample.method}
                            </span>
                            <span className="text-slate-700 dark:text-slate-300 truncate">
                              {api.sample.path}
                            </span>
                          </div>
                          <div className="mt-1 text-[10px] text-slate-500 truncate">
                            {api.sample.summary}
                          </div>
                        </div>
                        <div className="mt-4 flex items-center justify-between gap-2 font-mono text-[10px] uppercase tracking-[0.16em]">
                          <span className="text-slate-500 truncate">{api.baseUrl}</span>
                          <ArrowUpRight
                            size={13}
                            className="text-slate-400 group-hover:text-[#0A3A6B] dark:group-hover:text-[#9ED0F9] motion-safe:transition-colors flex-shrink-0"
                            aria-hidden="true"
                          />
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        </Reveal>

        {/* AP.PR — API design principles */}
        <Reveal>
          <section
            id="ap-pr"
            aria-labelledby="ap-pr-heading"
            className="py-20 lg:py-24 bg-white dark:bg-slate-950 border-b border-slate-200/60 dark:border-slate-800/60"
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
                <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">AP.PR</span>
                <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
                <span id="ap-pr-heading">API design principles</span>
              </div>
              <h2 className="mt-6 max-w-3xl font-serif text-3xl md:text-4xl font-medium tracking-tight text-slate-900 dark:text-white leading-[1.05]">
                Same contract{' '}
                <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                  on every endpoint.
                </em>
              </h2>
              <ul className="mt-10 grid md:grid-cols-2 gap-3">
                {PRINCIPLES.map((p) => {
                  const Icon = p.icon;
                  return (
                    <li
                      key={p.code}
                      className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span
                          className="w-10 h-10 rounded-lg bg-[#0A3A6B]/8 dark:bg-[#9ED0F9]/12 text-[#0A3A6B] dark:text-[#9ED0F9] flex items-center justify-center"
                          aria-hidden="true"
                        >
                          <Icon size={18} strokeWidth={1.75} />
                        </span>
                        <span className="font-mono text-[10px] tracking-[0.22em] font-semibold text-[#0A3A6B] dark:text-[#9ED0F9]">
                          {p.code}
                        </span>
                      </div>
                      <h3 className="mt-4 text-[15px] font-semibold tracking-tight text-slate-900 dark:text-white">
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

        {/* AP.QS — quickstart code block */}
        <Reveal>
          <section
            id="ap-qs"
            aria-labelledby="ap-qs-heading"
            className="py-20 lg:py-24 bg-slate-50 dark:bg-slate-900/40 border-b border-slate-200/60 dark:border-slate-800/60"
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-5">
                <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
                  <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">AP.QS</span>
                  <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[180px]" />
                  <span id="ap-qs-heading">Quickstart</span>
                </div>
                <h2 className="mt-6 font-serif text-2xl md:text-3xl font-medium tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                  Authenticate, post a payload,{' '}
                  <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                    audit the response.
                  </em>
                </h2>
                <p className="mt-4 text-[14px] text-slate-600 dark:text-slate-400 leading-[1.65]">
                  Three calls to wire a sandbox tenant. Replace <code className="font-mono text-[12px] bg-slate-100 dark:bg-slate-800 px-1 rounded">{'{TOKEN}'}</code> with a workspace token from the developer portal. Every call returns an <code className="font-mono text-[12px] bg-slate-100 dark:bg-slate-800 px-1 rounded">x-flyttgo-audit-id</code> header.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Link
                    href="/developers/playground"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#0A3A6B] text-white text-sm font-semibold hover:bg-[#0A3A6B]/90 motion-safe:transition-colors"
                  >
                    Open the live playground
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </Link>
                  <Link
                    href="/contact?intent=developer-key"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 text-slate-900 dark:text-white text-sm font-semibold hover:border-slate-300 motion-safe:transition-colors"
                  >
                    Request a sandbox token
                    <ArrowUpRight size={13} aria-hidden="true" />
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
                      curl · transify v1.14
                    </span>
                  </div>
                  <pre className="p-5 text-[12px] leading-relaxed text-white/90 font-mono overflow-x-auto">
{`# 1. Verify token + workspace
curl https://api.flyttgo.tech/v1/me \\
  -H "Authorization: Bearer {TOKEN}"

# 2. Create a routed order (idempotent)
curl https://api.flyttgo.tech/v1/transify/orders \\
  -H "Authorization: Bearer {TOKEN}" \\
  -H "Idempotency-Key: ord_$(uuidgen)" \\
  -H "Content-Type: application/json" \\
  -d '{
    "origin":      { "lat": 59.91, "lon": 10.75 },
    "destination": { "lat": 59.33, "lon": 18.07 },
    "service":     "express",
    "constraints": { "cabotage": false }
  }'

# 3. Subscribe to order events (HMAC-signed webhook)
curl https://api.flyttgo.tech/v1/webhooks \\
  -H "Authorization: Bearer {TOKEN}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "url":    "https://yourapp.example.com/hooks/transify",
    "events": ["order.created", "order.routed", "order.completed"]
  }'`}
                  </pre>
                </div>
              </div>
            </div>
          </section>
        </Reveal>
      </main>
      <SiteFooter />
    </>
  );
}
