export type RoadmapItem = {
  code: string;
  title: string;
  module: string;
  body: string;
  quarter: string;
};

export const SHIPPED: RoadmapItem[] = [
  { code: 'RM.S01', title: 'Marketplace dispute resolution v2',     module: 'FlyttGo Marketplace', quarter: 'Q1 2026', body: 'Tiered adjudication (auto / desk / ombuds) with structured evidence chain. 78% of disputes auto-resolve before reaching the desk.' },
  { code: 'RM.S02', title: 'Identra qualified-signature flow',       module: 'Identra',             quarter: 'Q1 2026', body: 'eIDAS LoA-mapped qualified-signature issuance with cross-border attribute exchange. SOC 2 + ETSI EN 319 411-2 attested.' },
  { code: 'RM.S03', title: 'Payvera SEPA Instant',                   module: 'Payvera',             quarter: 'Q4 2025', body: 'Sub-10-second euro-rail settlement across 36 SEPA Instant participating institutions. Falls back to standard SEPA on capacity exhaustion.' },
  { code: 'RM.S04', title: 'Civitas multi-jurisdiction templates',   module: 'Civitas',             quarter: 'Q4 2025', body: 'Pre-configured service-application templates for 12 jurisdictions across EU, UK and MENA. Reduces ministry onboarding from weeks to days.' },
  { code: 'RM.S05', title: 'Sovereign deployment substrate',         module: 'Platform',            quarter: 'Q3 2025', body: 'In-jurisdiction sovereign datacenter deployment posture (DM.03) certified for ZA, AE, KSA. National-DC tenants now in production.' },
  { code: 'RM.S06', title: 'OpenAPI 3.1 generated per release',      module: 'Developer experience', quarter: 'Q3 2025', body: 'Every module emits its OpenAPI 3.1 spec at release time, alongside the runtime that implements it. No drift between docs and code.' },
];

export const IN_FLIGHT: RoadmapItem[] = [
  { code: 'RM.F01', title: 'Provider routing — multi-objective v2',  module: 'Transify',            quarter: 'Q2 2026', body: 'Demand-aware routing optimising cost × time × coverage simultaneously. Targets sub-200 ms P95 across MENA + EU.' },
  { code: 'RM.F02', title: 'Workverge presence + dispatch overhaul', module: 'Workverge',           quarter: 'Q2 2026', body: 'Real-time presence channel with 5-second granularity, geo-aware dispatch optimiser, and pluggable rule engine for sector-specific dispatch logic.' },
  { code: 'RM.F03', title: 'Pricing intelligence — anomaly v3',      module: 'FlyttGo Marketplace', quarter: 'Q2 2026', body: 'Per-corridor reference pricing with anomaly detection on under- and over-priced supply. Dashboards for operators + regulators.' },
  { code: 'RM.F04', title: 'Ledgera per-currency posting tree',      module: 'Ledgera',             quarter: 'Q2 2026', body: 'Multi-currency posting trees with FX-rate provenance. Auditor-friendly bridge tables for cross-currency reconciliation.' },
];

export const PLANNED: RoadmapItem[] = [
  { code: 'RM.P01', title: 'AI proposal customisation',              module: 'Engineering',         quarter: 'Q3 2026', body: 'AI-tailored procurement proposals (SE.PG) — reads tier + add-ons + region and produces a buyer-specific draft instead of a templated one.' },
  { code: 'RM.P02', title: 'Identra · qualified-seal issuance',      module: 'Identra',             quarter: 'Q3 2026', body: 'Qualified electronic seal issuance for organisational identities. Pairs with the existing qualified-signature flow for natural persons.' },
  { code: 'RM.P03', title: 'EduPro · cohort analytics dashboard',    module: 'EduPro',              quarter: 'Q3 2026', body: 'Cross-institution cohort analytics with privacy-preserving aggregation. GDPR-aligned and education-regulator-friendly.' },
  { code: 'RM.P04', title: 'Payvera · open-banking PSP federation',  module: 'Payvera',             quarter: 'Q4 2026', body: 'Single connector across 90+ open-banking PSPs in EU + UK with auto-failover. PSD3 ready when finalised.' },
  { code: 'RM.P05', title: 'Civitas · cross-agency service bus',     module: 'Civitas',             quarter: 'Q4 2026', body: 'Inter-agency service bus replacing point-to-point integrations between ministries. Single audit envelope across all routed messages.' },
];

export type ChangelogEntry = {
  code: string;
  date: string;
  module: string;
  title: string;
  type: 'feature' | 'improvement' | 'fix' | 'security' | 'deprecation';
  body: string;
};

export const CHANGELOG: ChangelogEntry[] = [
  { code: 'CL.044', date: '2026-04-30', module: 'Payvera',      type: 'feature',     title: 'SEPA Instant available in 36 banks', body: 'Settlement under 10 seconds on supported banks. Falls back to standard SEPA when receiver bank is not on the SCT-Inst rail.' },
  { code: 'CL.043', date: '2026-04-22', module: 'Platform',     type: 'security',    title: 'Sigstore-signed images mandatory',   body: 'All container images are now Cosign-signed at release. Tenants can require signature verification at admission via the platform-policy API.' },
  { code: 'CL.042', date: '2026-04-14', module: 'FlyttGo Marketplace', type: 'feature', title: 'Dispute resolution v2 GA',         body: 'Tiered adjudication (auto / desk / ombuds), structured evidence chain, settlement routing through Payvera. Available on all marketplace tenants.' },
  { code: 'CL.041', date: '2026-04-04', module: 'Transify',     type: 'improvement', title: 'Routing P99 reduced 23%',             body: 'Per-corridor cache layer plus heuristic warm-start cut P99 routing latency from 240 ms to 184 ms across the EU + MENA fleet.' },
  { code: 'CL.040', date: '2026-03-26', module: 'Identra',      type: 'feature',     title: 'eIDAS LoA-substantial flows',         body: 'New endpoints for substantial-LoA cross-border verification, including qualified-signature issuance for natural persons.' },
  { code: 'CL.039', date: '2026-03-18', module: 'Civitas',      type: 'feature',     title: 'Multi-jurisdiction templates · 12',   body: 'Pre-configured service-application templates for 12 EU/UK/MENA jurisdictions. Reduces ministry onboarding from weeks to days.' },
  { code: 'CL.038', date: '2026-03-10', module: 'EduPro',       type: 'improvement', title: 'Credential issuance < 90s',           body: 'Pipeline rewrite cuts P95 verifiable-credential issuance latency from 4 minutes to 84 seconds.' },
  { code: 'CL.037', date: '2026-03-02', module: 'Workverge',    type: 'feature',     title: 'Field-team utilisation dashboards',   body: 'Per-team utilisation metrics, capacity heatmap, shift-coverage forecast. Exportable to CSV / PDF / Looker.' },
  { code: 'CL.036', date: '2026-02-22', module: 'Ledgera',      type: 'feature',     title: 'Auditor-friendly export pack',        body: 'Single-archive export with double-entry journal, FX-rate provenance, signed manifest. Designed for end-of-year audit hand-off.' },
  { code: 'CL.035', date: '2026-02-14', module: 'Payvera',      type: 'security',    title: 'PSD2 SCA exemption flows tightened',  body: 'Stricter risk-based step-up logic on low-value transaction-risk-analysis exemptions. Aligned with EBA Q&A 2025-7048.' },
  { code: 'CL.034', date: '2026-02-04', module: 'Platform',     type: 'feature',     title: 'BYOK for sovereign tenants',          body: 'Bring-your-own-key encryption for sovereign-deployment tenants. KMIP and PKCS#11 supported via tenant-managed HSMs.' },
  { code: 'CL.033', date: '2026-01-28', module: 'Identra',      type: 'deprecation', title: 'OIDC implicit flow EOL · 2026-07-01', body: 'OIDC implicit grant deprecated effective 2026-07-01. Migrate to authorization-code + PKCE. Migration guide on /developers/api.' },
];
