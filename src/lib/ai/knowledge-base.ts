/**
 * Curated knowledge base for the Ask FlyttGo (⌘J) assistant.
 *
 * Each entry is a question/answer pair plus the source page link. The
 * client-side scorer ranks entries by token-overlap against the user's
 * query and renders the top match in the assistant panel. When the
 * /api/ai/ask endpoint ships (LLM-backed, retrieval-augmented from this
 * same corpus), the panel can swap to a streaming response without UI
 * changes — the answer surface is already shaped for it.
 *
 * Keep entries tight: the corpus is shipped to the client and grows
 * the bundle. ~30-50 entries is the right ceiling.
 */

export type KbEntry = {
  id: string;
  question: string;
  /** Lower-case keyword bag the scorer matches against. */
  keywords: string[];
  answer: string;
  source: { label: string; href: string };
  category: 'platform' | 'deployment' | 'compliance' | 'pricing' | 'integration' | 'support';
};

export const KNOWLEDGE_BASE: KbEntry[] = [
  // -------------------------------------------------------------------
  // Platform — what each module does
  // -------------------------------------------------------------------
  {
    id: 'transify',
    question: 'What is Transify?',
    keywords: ['transify', 'mobility', 'transport', 'dispatch', 'fleet', 'logistics'],
    answer:
      'Transify is the mobility infrastructure platform — dispatch, telematics, and regional mobility coordination. It is the runtime under the FlyttGo marketplace and is licensed independently for transport authorities, fleet operators, and freight networks.',
    source: { label: 'Transify · platform page', href: '/platforms/transify' },
    category: 'platform',
  },
  {
    id: 'workverge',
    question: 'What is Workverge?',
    keywords: ['workverge', 'workforce', 'staffing', 'roster', 'shift', 'people'],
    answer:
      'Workverge is the workforce coordination infrastructure — roster, shift assignment, qualification tracking, and field-team deployment. Used by public-sector workforce programmes and enterprise field-service operators.',
    source: { label: 'Workverge · platform page', href: '/platforms/workverge' },
    category: 'platform',
  },
  {
    id: 'civitas',
    question: 'What is Civitas?',
    keywords: ['civitas', 'government', 'municipal', 'citizen', 'case', 'permit'],
    answer:
      'Civitas is the digital government services platform — case management, permit workflows, citizen-facing portals, and inter-agency routing. Deployed by ministries and municipalities.',
    source: { label: 'Civitas · platform page', href: '/platforms/civitas' },
    category: 'platform',
  },
  {
    id: 'edupro',
    question: 'What is EduPro?',
    keywords: ['edupro', 'education', 'university', 'admissions', 'scholarship', 'school'],
    answer:
      'EduPro is the education intelligence infrastructure — admissions, scholarship management, institutional analytics, and ministry-level reporting.',
    source: { label: 'EduPro · platform page', href: '/platforms/edupro' },
    category: 'platform',
  },
  {
    id: 'identra',
    question: 'What is Identra?',
    keywords: ['identra', 'identity', 'auth', 'sso', 'eidas', 'mfa', 'oauth'],
    answer:
      'Identra is the identity infrastructure platform — SSO, MFA, qualified-signature flows, eIDAS LoA mapping, cross-border attribute exchange. Cross-cuts every other module.',
    source: { label: 'Identra · platform page', href: '/platforms/identra' },
    category: 'platform',
  },
  {
    id: 'payvera',
    question: 'What is Payvera?',
    keywords: ['payvera', 'payments', 'psd2', 'open banking', 'invoicing', 'card'],
    answer:
      'Payvera is the public-service payment infrastructure — PSD2-ready strong customer authentication, open-banking endpoints, transaction-monitoring hooks, and government-grade payments orchestration.',
    source: { label: 'Payvera · platform page', href: '/platforms/payvera' },
    category: 'platform',
  },
  {
    id: 'ledgera',
    question: 'What is Ledgera?',
    keywords: ['ledgera', 'accounting', 'finance', 'bookkeeping', 'saf-t', 'vat', 'gaap'],
    answer:
      'Ledgera is the financial operations and bookkeeping infrastructure — multi-jurisdiction accounting (NO Kontoplan, UK FRS-102, US GAAP, IFRS), append-only audit log, statutory exports (SAF-T XML, VAT-100, GAAP bundle, IFRS package), and a regulator-ready print stylesheet.',
    source: { label: 'Ledgera · platform page', href: '/platforms/ledgera' },
    category: 'platform',
  },

  // -------------------------------------------------------------------
  // Deployment
  // -------------------------------------------------------------------
  {
    id: 'deployment-modes',
    question: 'What deployment modes does FlyttGo support?',
    keywords: ['deployment', 'modes', 'managed', 'sovereign', 'customer cloud', 'hosting'],
    answer:
      'Three modes: DM.01 FlyttGo-managed (fully managed SaaS, region-aware, fastest path to production), DM.02 customer cloud (runs inside your AWS, Azure or GCP tenancy under your account), DM.03 sovereign datacenter (self-hosted in certified national datacenters with optional air-gap and national HSM).',
    source: { label: 'Deployment architecture', href: '/deployment' },
    category: 'deployment',
  },
  {
    id: 'deployment-time',
    question: 'How long does a deployment take?',
    keywords: ['deployment', 'time', 'long', 'how long', 'timeline', 'duration', 'how many days'],
    answer:
      'A standard FlyttGo deployment goes from procurement sign-off to a production-ready tenant in 60–120 days, depending on deployment mode. Sovereign datacenter installations add 30–60 days for network and hardware provisioning.',
    source: { label: 'Deployment FAQ', href: '/deployment' },
    category: 'deployment',
  },
  {
    id: 'regions',
    question: 'Which regions do you operate in?',
    keywords: ['regions', 'where', 'countries', 'global', 'usa', 'eu', 'mena', 'asia', 'africa'],
    answer:
      'Primary regions are EU-Nordic (Oslo, Stockholm), EU-West (London, Frankfurt, Amsterdam), and APAC (Singapore). Secondary presence covers North America (San Francisco, Northern Virginia, Toronto), South America (São Paulo), Africa (Nairobi, Lagos, Cairo), MENA (Dubai, Riyadh sovereign), and Oceania (Sydney). See WM.00 on the home page for the full map.',
    source: { label: 'Global deployment map · home', href: '/' },
    category: 'deployment',
  },
  {
    id: 'modules-vs-suite',
    question: 'Can I deploy just one module?',
    keywords: ['module', 'modules', 'single', 'one', 'suite', 'all', 'separately', 'à la carte'],
    answer:
      'Yes. Modules are independent and licensed per deployment, per region. Most operators start with one or two and add the rest as program requirements grow.',
    source: { label: 'Platform ecosystem', href: '/platforms' },
    category: 'platform',
  },

  // -------------------------------------------------------------------
  // Compliance
  // -------------------------------------------------------------------
  {
    id: 'compliance',
    question: 'What compliance frameworks are you aligned to?',
    keywords: ['compliance', 'soc 2', 'iso 27001', 'gdpr', 'wcag', 'psd2', 'eidas', 'certification'],
    answer:
      'Platform-level: SOC 2-aligned infrastructure controls (CR.01), ISO 27001-aligned security architecture (CR.02), GDPR-compliant data handling architecture (CR.03), WCAG 2.1 AA accessibility targets (CR.04). Module-level: PSD2-ready payments via Payvera (CR.05), eIDAS-compatible identity via Identra (CR.06). Formal third-party attestation pathways are tracked on the security architecture page.',
    source: { label: 'Trust center · /security', href: '/security' },
    category: 'compliance',
  },
  {
    id: 'audit-log',
    question: 'How does the audit log work?',
    keywords: ['audit', 'log', 'append-only', 'trail', 'immutable', 'history'],
    answer:
      'Every mutation on every accounting table writes a row to public.audit_log capturing the action, the user, and the full before/after JSONB snapshot. UPDATE and DELETE on audit_log itself are blocked at the trigger level — the table is append-only by construction. Auth events (sign-in/sign-out/failed-login) feed the same log via the audit_log_event RPC.',
    source: { label: 'Security architecture', href: '/security' },
    category: 'compliance',
  },
  {
    id: 'saf-t',
    question: 'Do you support SAF-T export?',
    keywords: ['saf-t', 'safT', 'norway', 'skatteetaten', 'altinn', 'xml export'],
    answer:
      'Yes. Ledgera emits SAF-T Financial XML targeting the Skatteetaten v1.30 / OECD SAF-T 2.0 schema. Header + MasterFiles (GL accounts + TaxTable) + GeneralLedgerEntries with per-transaction debit/credit lines and foreign-currency rate snapshots. Available to accountants, auditors and admins on Norway-jurisdiction organisations via /accounting/exports.',
    source: { label: 'Statutory exports', href: '/accounting/exports' },
    category: 'compliance',
  },

  // -------------------------------------------------------------------
  // Integration / API
  // -------------------------------------------------------------------
  {
    id: 'auth-flow',
    question: 'How does sign-in work?',
    keywords: ['sign in', 'login', 'auth', 'cookie', 'session', 'rbac'],
    answer:
      'Each role-specific URL is its own entrance: /admin for admin/super_admin, /accounting for accountants, /audit for auditors. Visit the URL while signed out and an inline form appears. Visit while signed in with the right role and the workspace renders. There is no separate /sign-in page. Sessions are cookie-bound via @supabase/ssr and a short-lived role-hint cookie drives middleware routing.',
    source: { label: 'Roles & access', href: '/security' },
    category: 'integration',
  },
  {
    id: 'api',
    question: 'Is there an API?',
    keywords: ['api', 'sdk', 'rest', 'graphql', 'developer', 'integration'],
    answer:
      'Tenant-scoped REST endpoints are exposed via PostgREST on the Supabase layer plus first-party Next.js route handlers under /api. SDK + sample clients ship with the developer portal. Live API playground lands in a future release.',
    source: { label: 'Developer portal', href: '/developers' },
    category: 'integration',
  },

  // -------------------------------------------------------------------
  // Pricing & support
  // -------------------------------------------------------------------
  {
    id: 'pricing',
    question: 'What does it cost?',
    keywords: ['pricing', 'cost', 'how much', 'price', 'license', 'fee'],
    answer:
      'FlyttGo licenses per deployment, per region. Pricing depends on jurisdiction, deployment mode (managed / customer cloud / sovereign), modules selected, and expected scale. Submit a deployment intake at /contact and a solution architect routes within one business day.',
    source: { label: 'Deployment intake · /contact', href: '/contact' },
    category: 'pricing',
  },
  {
    id: 'contact',
    question: 'How do I get in touch?',
    keywords: ['contact', 'reach', 'talk', 'sales', 'email', 'demo'],
    answer:
      "Submit the 5-step deployment intake at /contact. Routed to a solution architect — not a sales representative — within one business day. Engineering escalations go directly to platforms@flyttgo.tech.",
    source: { label: 'Deployment intake', href: '/contact' },
    category: 'support',
  },
];

/**
 * Lightweight token-overlap scorer. Lower-cases + word-boundary
 * tokenises the query, computes intersection size with each entry's
 * keyword bag (plus a small bonus for matches in the question text),
 * and returns the top N entries with score > 0.
 *
 * Not a real LLM; not a vector search. Honest about what it is. Good
 * enough as a 24-hour stand-in for an actual retrieval-augmented
 * answer panel.
 */
export function scoreKb(query: string, top = 3): Array<{ entry: KbEntry; score: number }> {
  const q = query.toLowerCase().trim();
  if (q.length < 2) return [];
  const tokens = q.split(/[\s,.?!;:]+/).filter((t) => t.length >= 2);
  if (tokens.length === 0) return [];

  const scored = KNOWLEDGE_BASE.map((entry) => {
    let score = 0;
    const haystack = (entry.question + ' ' + entry.keywords.join(' ')).toLowerCase();
    for (const t of tokens) {
      if (haystack.includes(t)) score += 1;
      if (entry.keywords.includes(t)) score += 1;
      if (entry.id === t) score += 2;
    }
    // Boost when several tokens hit the same entry — penalises matches
    // that share only a common word like "the" or "what".
    if (score > 0 && tokens.length > 1) {
      const distinctHits = tokens.filter((t) => haystack.includes(t)).length;
      score += distinctHits * 0.5;
    }
    return { entry, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, top);
}
