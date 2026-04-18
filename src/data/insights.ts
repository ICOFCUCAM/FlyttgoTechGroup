import type { LucideIcon } from 'lucide-react';
import { Building2, Globe2, Layers, ShieldCheck } from 'lucide-react';

export type Insight = {
  slug: string;
  title: string;
  dek: string;
  eyebrow: string;
  icon: LucideIcon;
  accent: string;
  author: string;
  authorRole: string;
  publishedOn: string; // ISO date
  readMinutes: number;
  tags: string[];
  /** Ordered content blocks — keep the format minimal so the renderer
   *  stays a pure server component without MDX. */
  content: InsightBlock[];
};

export type InsightBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'quote'; text: string; cite?: string }
  | { type: 'callout'; title: string; text: string };

export const insights: Insight[] = [
  {
    slug: 'multi-region-data-residency',
    title:
      'Running FlyttGo across EU, AF and MENA — a data residency playbook',
    dek: 'How platform deployments hold data-residency guarantees across three continents without sacrificing operational velocity.',
    eyebrow: 'Operations',
    icon: Globe2,
    accent: '#0FB5A6',
    author: 'FlyttGo Platform Engineering',
    publishedOn: '2026-04-02',
    authorRole: 'Platform SRE',
    readMinutes: 8,
    tags: ['Operations', 'Compliance', 'Architecture'],
    content: [
      {
        type: 'p',
        text:
          'Operators deploying across multiple jurisdictions ask the same early question: where does our data live, and can we prove it? This is the pattern we ship for customers running simultaneously in the EU, Africa and MENA.',
      },
      {
        type: 'h2',
        text: 'The three-tier residency model',
      },
      {
        type: 'p',
        text:
          'Every FlyttGo tenant runs under one of three residency tiers: managed EU, customer cloud, or sovereign datacenter. A single operator can run different tiers for different regions — EU managed for efficiency, GCC sovereign for national compliance, customer-cloud in South Africa to satisfy POPIA.',
      },
      {
        type: 'ul',
        items: [
          'Managed EU — region-locked tenants under GDPR, Data Processing Agreement with the FlyttGo-managed infrastructure entity.',
          'Customer cloud — your AWS / Azure / GCP tenancy, your contractual terms, your residency posture.',
          'Sovereign — national datacenter, national key management, optional air-gap.',
        ],
      },
      {
        type: 'h2',
        text: 'How data stays in-region',
      },
      {
        type: 'p',
        text:
          'Each tenant declares a primary region at provisioning. Database, object storage and queue clusters are all pinned. Cross-region reads only happen through explicit federation (e.g., a regulator dashboard) and go through an access layer that records every cross-border access in a tamper-evident log.',
      },
      {
        type: 'callout',
        title: 'What we never do',
        text: 'We never replicate tenant data across regions for operational convenience. Cross-region access happens only through explicit, audited federation — and only when the customer has enabled it in the deployment portal.',
      },
      {
        type: 'h2',
        text: 'Keys and secrets',
      },
      {
        type: 'p',
        text:
          'Encryption keys live with the tenant. Managed deployments use FlyttGo-operated HSMs region-locked to the primary region. Customer-cloud deployments integrate with the customer\'s KMS (AWS KMS, Azure Key Vault, GCP KMS). Sovereign deployments use national HSMs, with quarterly key rotation under the customer SOC\'s control.',
      },
      {
        type: 'h2',
        text: 'Cross-border programmes',
      },
      {
        type: 'p',
        text:
          'Programmes that span regions — freight corridors, regional student ID federations, cross-border payments — run as federations of independent per-region tenants that exchange only the specific message types required for the corridor. The default is no sharing; sharing is a per-data-class decision documented in the DPA.',
      },
      {
        type: 'quote',
        text:
          'The point of data residency is not where the bytes sit. It is whether you can prove, to an auditor, that every access respects the jurisdictional constraint.',
        cite: 'FlyttGo Residency Playbook',
      },
    ],
  },
  {
    slug: 'choosing-your-deployment-mode',
    title:
      'Managed, customer cloud, or sovereign — choosing your FlyttGo deployment mode',
    dek: 'A procurement-ready comparison of the three deployment modes, the trade-offs buyers actually negotiate, and when each pattern wins.',
    eyebrow: 'Deployment guide',
    icon: Layers,
    accent: '#1E6FD9',
    author: 'FlyttGo Deployment Engineering',
    authorRole: 'Platform architects',
    publishedOn: '2026-03-14',
    readMinutes: 9,
    tags: ['Deployment', 'Procurement', 'Architecture'],
    content: [
      {
        type: 'p',
        text:
          'Every serious platform conversation opens with the same question: where does this actually run? For FlyttGo customers we recognize three credible answers, each with its own cost, control, and compliance profile. Here is how to pick.',
      },
      {
        type: 'h2',
        text: 'FlyttGo-managed — the fastest path to production',
      },
      {
        type: 'p',
        text:
          'Managed SaaS on FlyttGo infrastructure. We operate the platform layer end-to-end — patching, scaling, incident response — and you work against tenant-scoped APIs. Typical time to production is 60–90 days. Teams without a dedicated platform SRE benefit most.',
      },
      {
        type: 'ul',
        items: [
          'Region-aware hosting in the EU by default; MENA and AF regions on request.',
          'FlyttGo 24/7 SOC coverage; incidents flow into your deployment portal.',
          'Configuration-level customisation; deeper extension points on the managed roadmap.',
        ],
      },
      {
        type: 'h2',
        text: 'Customer cloud — BYO AWS, Azure, or GCP',
      },
      {
        type: 'p',
        text:
          'For enterprises with existing cloud commitments and internal security teams. FlyttGo modules deploy as infrastructure-as-code inside your tenancy, integrated with your IAM, SIEM, and key-management systems. Time to production is 75–120 days and most of that is security review + IAM integration.',
      },
      {
        type: 'callout',
        title: 'When customer cloud wins',
        text: 'Active cloud committed-spend agreements (EDPs, MACCs), strong internal SRE, regulated industry posture where the customer owns the compliance boundary.',
      },
      {
        type: 'h2',
        text: 'Sovereign datacenter — public-sector procurement',
      },
      {
        type: 'p',
        text:
          'For ministries, national agencies, and regulated operators requiring sovereign hosting. FlyttGo installs inside certified national datacenters with full air-gap options and national key management. Expect 120–180 days — procurement and datacenter enablement dominate the critical path, not the platform itself.',
      },
      {
        type: 'h2',
        text: 'Decision matrix',
      },
      {
        type: 'p',
        text:
          'If your primary constraints are speed and operational capacity, start managed. If you have an existing cloud tenancy and strong security team, customer cloud keeps control where it already is. If jurisdiction or sovereignty makes hosting location non-negotiable, sovereign is the only option — and we design the programme around that constraint, not despite it.',
      },
      {
        type: 'quote',
        text:
          'The deployment mode rarely changes what a platform does — but it completely changes how your organisation buys, operates, and audits it.',
        cite: 'FlyttGo Deployment Playbook',
      },
    ],
  },
  {
    slug: 'platform-vs-build-from-scratch',
    title:
      'Platform vs. build-from-scratch: the honest cost of in-house infrastructure',
    dek: 'A numbers-first look at what actually drives the multi-year build, and where a modular platform compresses the timeline.',
    eyebrow: 'Strategy',
    icon: Building2,
    accent: '#0FB5A6',
    author: 'FlyttGo Commercial',
    authorRole: 'Commercial operations',
    publishedOn: '2026-02-27',
    readMinutes: 7,
    tags: ['Strategy', 'Commercial', 'Architecture'],
    content: [
      {
        type: 'p',
        text:
          'Every operator we meet has modelled the build-it-in-house scenario. Engineering teams quote 12 to 18 months and a headcount. The actual lived experience is 24 to 36 months and a second headcount — plus the features that never got built because the team was busy keeping the platform up.',
      },
      {
        type: 'h2',
        text: 'Where the time actually goes',
      },
      {
        type: 'ul',
        items: [
          'Identity and auth: 3–6 months to get OIDC, SSO, RBAC and audit trails right — before any business logic.',
          'Multi-tenancy: 2–4 months of schema design, migration tooling, and tenant-scoped queries.',
          'Payments and financial reporting: 3–9 months including vendor integration, reconciliation, and regional tax models.',
          'Compliance: 6–12 months for SOC 2 / ISO 27001 readiness if done alongside the build.',
          'Ops tooling: 2–4 months for observability, release process, and support runbooks.',
        ],
      },
      {
        type: 'p',
        text:
          'None of that produces differentiating product value. It produces the table stakes that let the differentiating product exist.',
      },
      {
        type: 'h2',
        text: 'What a modular platform compresses',
      },
      {
        type: 'p',
        text:
          'FlyttGo ships all of the above as independent modules — Identra for auth, Payvera for payments, Ledgera for financial ops, Civitas / EduPro / Transify / Workverge for domain logic. Operators pay for the modules they use and focus their teams on the 20% that is actually unique to their programme.',
      },
      {
        type: 'callout',
        title: 'Typical recovered timeline',
        text: 'Managed deployments reach production in 60–120 days. Customer cloud adds 30–60 days for security review. Sovereign adds 60–90 days for procurement + datacenter enablement.',
      },
      {
        type: 'h2',
        text: 'When to still build it yourself',
      },
      {
        type: 'p',
        text:
          'If your differentiation genuinely lives at the infrastructure layer — novel clearing rails, new identity protocols, or core algorithms that need to ship from first principles — build. For the 95% of programmes where the differentiation lives in product, policy, or go-to-market, the modular platform wins.',
      },
    ],
  },
  {
    slug: 'security-posture-for-public-sector-procurement',
    title:
      'Security posture for public-sector procurement: a field guide for FlyttGo buyers',
    dek: 'What security and compliance documentation actually moves an RFP forward — and what we share under NDA to shorten the cycle.',
    eyebrow: 'Security',
    icon: ShieldCheck,
    accent: '#7C5CE6',
    author: 'FlyttGo Security & Compliance',
    authorRole: 'Security team',
    publishedOn: '2026-01-22',
    readMinutes: 6,
    tags: ['Security', 'Compliance', 'Procurement'],
    content: [
      {
        type: 'p',
        text:
          'Public-sector procurement teams are used to receiving 200-page vendor questionnaires that say everything and prove nothing. We have found three pieces of documentation consistently move the process forward.',
      },
      {
        type: 'h2',
        text: '1. A current SOC 2 Type II report',
      },
      {
        type: 'p',
        text:
          'Shared under NDA. Procurement teams read the scope, the auditor’s opinion, and the management response to findings — in that order. We share the full report rather than a summary because the summary never answers the follow-up questions.',
      },
      {
        type: 'h2',
        text: '2. An architecture diagram with the boundary drawn',
      },
      {
        type: 'p',
        text:
          'Where tenants live, where keys live, where logs live, and where the audit boundary ends. For sovereign deployments we supplement this with a national-datacenter network topology review.',
      },
      {
        type: 'h2',
        text: '3. Pen-test executive summaries',
      },
      {
        type: 'p',
        text:
          'Dated within the last 12 months. We share the external-perimeter report and the application-logic report. Raw findings are available on request for customers with internal security teams.',
      },
      {
        type: 'callout',
        title: 'What we do not share publicly',
        text: 'Raw audit artefacts, SOC 2 reports, pen-test findings, and internal runbooks are shared only under NDA with qualified enterprise and public-sector buyers.',
      },
      {
        type: 'h3',
        text: 'Regional frameworks we support',
      },
      {
        type: 'ul',
        items: [
          'EU: GDPR, eIDAS, PSD2 (Payvera), PCI-DSS (Payvera, FlyttGo).',
          'UK: PSN, Cyber Essentials Plus.',
          'Gulf: Saudi NCA ECC, UAE IA.',
          'Africa: POPIA (ZA), Kenya Data Protection Act.',
        ],
      },
      {
        type: 'p',
        text:
          'If a framework you require is not listed, it is almost certainly supported — but we need the specific jurisdictional scope to scope the deployment. The enterprise team answers jurisdiction questions within one business day.',
      },
    ],
  },
];

export const insightBySlug: Record<string, Insight> = Object.fromEntries(
  insights.map((i) => [i.slug, i]),
);

export const insightDateFormat = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
