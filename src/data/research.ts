export type ResearchPaper = {
  slug: string;
  code: string;
  title: string;
  category: 'Architecture' | 'Regulatory' | 'Sector' | 'Deployment' | 'Security' | 'Sustainability';
  authors: string[];
  publishedOn: string;
  pages: number;
  readingMinutes: number;
  abstract: string;
  keyTakeaways: string[];
};

export const papers: ResearchPaper[] = [
  {
    slug: 'sovereign-platform-substrate-economics',
    code: 'RS.01',
    title: 'The economics of sovereign platform substrate · 2026 outlook',
    category: 'Architecture',
    authors: ['Platform Council · FlyttGo Technologies Group'],
    publishedOn: '2026-04-08',
    pages: 28,
    readingMinutes: 38,
    abstract:
      'Sovereign datacenter deployment carries a specific cost geometry — capital up front, marginal-cost flat, recovery ahead of horizon-3 — that breaks the SaaS-only TCO model most public-sector procurement teams use. We model the break-even surface across L.04 / L.05 / L.06 programmes in EU, GCC, and East Africa.',
    keyTakeaways: [
      'L.05 sovereign break-even lands at 28-34 months in EU, 22-30 months in GCC',
      'Sovereign-region hardware refresh cycle moved from 4 years to 5.5 years (2022 → 2025)',
      'Multi-tenant amortisation reduces sovereign cost gap to managed SaaS by 41% above 6 tenants',
      'Public-sector procurement frameworks now reward bring-your-own-key + sovereign in 11 of 18 EU member states',
    ],
  },
  {
    slug: 'eidas-2-readiness-checklist',
    code: 'RS.02',
    title: 'eIDAS 2.0 readiness · what relying parties need before 2026',
    category: 'Regulatory',
    authors: ['Identra Trust Council', 'External counsel · pseudonymised'],
    publishedOn: '2026-03-22',
    pages: 22,
    readingMinutes: 30,
    abstract:
      'EU Regulation 2024/1183 mandates Member-State Digital Identity Wallets in production by 2026. We translate the Architecture Reference Framework into a relying-party readiness checklist with an issuer / verifier / wallet matrix, OID4VP integration patterns, and a per-jurisdiction trust list anchoring guide.',
    keyTakeaways: [
      'OID4VCI / OID4VP final 1.0 spec landing in 2025; relying parties should target draft conformance now',
      'Trust list anchoring is the single highest-effort migration line item; budget 6-12 weeks',
      'SD-JWT is winning over JSON-LD VC across EU member-state pilots; default to SD-JWT proofs',
      'eIDAS LoA-substantial flows are the realistic 2026 baseline; QES rollout follows in 2027',
    ],
  },
  {
    slug: 'mp-routing-architecture',
    code: 'RS.03',
    title: 'Multi-objective provider routing under regulatory constraints',
    category: 'Architecture',
    authors: ['Transify Engineering Council'],
    publishedOn: '2026-02-18',
    pages: 34,
    readingMinutes: 46,
    abstract:
      'Provider routing in regulated mobility marketplaces optimises cost × time × coverage simultaneously while satisfying constraints that change per jurisdiction (cabotage, hazmat, weight-class, driver hours). We document the constraint solver architecture, the heuristic warm-start strategy, and the production telemetry that gets P99 routing latency to 184 ms across EU + MENA.',
    keyTakeaways: [
      'Constraint-solver-first beats heuristic-first by 14% on routing quality at the cost of 1.8x latency',
      'Heuristic warm-start recovers most of the latency without sacrificing solver quality',
      'Per-corridor cache drops P99 by 23% on warm corridors; cold corridors fall back to live solve',
      'Multi-region cabotage is the single most expensive constraint; 41% of compute on EU + MENA cross-border',
    ],
  },
  {
    slug: 'gcc-mena-public-sector-deployment',
    code: 'RS.04',
    title: 'GCC + MENA public-sector deployment patterns',
    category: 'Sector',
    authors: ['MENA Platform Group', 'GCC Transport Authority (anonymised)'],
    publishedOn: '2026-01-30',
    pages: 26,
    readingMinutes: 35,
    abstract:
      'GCC + MENA public-sector procurement diverges meaningfully from EU norms in three places: data residency posture, arabic-first UX expectations, and SAMA-style payment-rail orchestration. We synthesise patterns observed across 7 GCC + MENA programmes, including the regulator hand-off protocol, the in-Kingdom sovereign substrate, and the Arabic localisation surface depth required.',
    keyTakeaways: [
      'In-jurisdiction data residency is non-negotiable in KSA; DM.03 sovereign deployment is the only viable mode',
      'Arabic-first UX must include hijri calendar, RTL layout, and per-emirate jurisdiction routing',
      'CBUAE retail payment-services regulation alignment requires 6-9 months lead time on Payvera',
      'TDRA cybersecurity policy alignment shares ~70% control overlap with NCA ECC + CCC',
    ],
  },
  {
    slug: 'post-quantum-migration-runbook',
    code: 'RS.05',
    title: 'Post-quantum migration runbook for institutional platforms',
    category: 'Security',
    authors: ['Platform Security Council'],
    publishedOn: '2026-01-12',
    pages: 31,
    readingMinutes: 42,
    abstract:
      'NIST FIPS 203/204/205 finalised in 2024; NSA CNSA 2.0 requires full PQ migration by 2030 (signing) / 2035 (everything). We document the FlyttGo migration runbook: hybrid-first sequencing, per-surface algorithm map, crypto-agility gateway architecture, and the test harness covering 8 cryptographic surfaces across the platform.',
    keyTakeaways: [
      'Hybrid classical+PQ first is the only safe path; pure-PQ rollouts have 3 known interop failures industry-wide',
      'TLS X25519MLKEM768 hybrid is the Q3 2026 target across all inbound and inter-service traffic',
      'Code-signing migration to ML-DSA + ECDSA hybrid lands first; the supply-chain-attack delta is largest',
      'Symmetric primitives (AES-256-GCM, SHA-2/3) remain PQ-resistant; only public-key surfaces need migration',
    ],
  },
  {
    slug: 'csrd-scope-3-platform-attribution',
    code: 'RS.06',
    title: 'CSRD scope-3 attribution for platform-infrastructure tenants',
    category: 'Sustainability',
    authors: ['Sustainability Council'],
    publishedOn: '2025-12-04',
    pages: 18,
    readingMinutes: 24,
    abstract:
      'EU CSRD requires scope-3 emissions tracking from software vendors starting FY2026. Most platform vendors ship a single-figure annual disclosure; that does not meet auditor expectations at scale. We document the per-tenant per-region carbon attribution model, the SCI emission factors per workload type, and the auditor-friendly export pack.',
    keyTakeaways: [
      'Software Carbon Intensity (SCI) is the right unit; per-tenant attribution is the right granularity',
      'Region-aware grid intensity dominates the carbon model; a sovereign Riyadh deployment is 4.2x EU baseline',
      'Auditor-friendly exports include per-month per-tenant CSV + a reconciliation manifest',
      'Carbon-budget-per-deployment becomes a first-class procurement constraint by FY2027',
    ],
  },
  {
    slug: 'agent-driven-platform-architecture',
    code: 'RS.07',
    title: 'Agent-driven platform architecture · MCP + audit envelope',
    category: 'Architecture',
    authors: ['Platform Engineering Council'],
    publishedOn: '2025-11-15',
    pages: 24,
    readingMinutes: 32,
    abstract:
      'AI agents (Claude, ChatGPT, Cursor) are moving from observation to operation against platform APIs. We document the architecture FlyttGo built to make agent-driven operations safe: workspace-scoped tokens, the same audit envelope humans use, per-tool rate caps, and the human-in-the-loop tier on high-impact surfaces.',
    keyTakeaways: [
      'MCP discovery via /.well-known/mcp.json is the de-facto standard; OpenAI, Anthropic, Cursor align here',
      'Workspace-scoped tokens with explicit tool allowlists block 100% of out-of-scope agent calls at the gateway',
      'HITL on high-impact tools (payment writes, identity issuance) is the only viable safety posture for institutional buyers',
      'Audit envelope must be invariant to agent vs human actor — auditors replay the same way regardless',
    ],
  },
  {
    slug: 'deployment-substrate-selection',
    code: 'RS.08',
    title: 'Deployment substrate selection · DM.01 / 02 / 03 / 04 decision framework',
    category: 'Deployment',
    authors: ['Platform Council'],
    publishedOn: '2025-10-22',
    pages: 20,
    readingMinutes: 26,
    abstract:
      'Buyers regularly pick the wrong deployment substrate for their programme. We document the four-substrate decision framework — managed SaaS (DM.01), customer cloud (DM.02), sovereign datacenter (DM.03), and confidential compute (DM.04, planned) — with a 9-criterion scoring matrix that surfaces the right answer in under an hour.',
    keyTakeaways: [
      'Most L.03 / L.04 programmes are over-provisioned at DM.03 sovereign — DM.02 customer-cloud is the right call',
      'Regulator-bounded flows force DM.03; nothing else gets the data-residency posture right',
      'Confidential compute (DM.04) opens a fourth shape for ultra-sensitive workloads — defence, intelligence, regulated finance',
      'The decision matrix changes meaningfully between FY2025 and FY2027 as PQ + Wallet land',
    ],
  },
];

export const CATEGORIES: ResearchPaper['category'][] = [
  'Architecture',
  'Regulatory',
  'Sector',
  'Deployment',
  'Security',
  'Sustainability',
];
