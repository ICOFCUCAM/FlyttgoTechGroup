export type CaseStudy = {
  slug: string;
  code: string;
  customer: string;
  sector: 'Marketplace' | 'Government' | 'Education' | 'Mobility' | 'Enterprise' | 'Financial';
  region: string;
  programme: string;
  summary: string;
  modules: string[];
  deployment: 'DM.01' | 'DM.02' | 'DM.03' | 'DM.04';
  tier: string;
  duration: string;
  /** Live deployment URL — visitors can verify the platform is in production. */
  liveUrl?: string;
  metrics: { label: string; value: string }[];
  outcome: string;
};

/**
 * Real deployments built on FlyttGo platform infrastructure.
 *
 * Each entry below points at a public, verifiable URL — the proof
 * lives at the live site, not in invented numbers. Performance
 * metrics shown are descriptive (architectural shape, jurisdiction,
 * module surface), not transactional volume claims; per-customer
 * volume figures are released only with written consent on a
 * separate consent-controlled wall.
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: 'flyttgo-global',
    code: 'CS.01',
    customer: 'FlyttGo · Global Marketplace',
    sector: 'Marketplace',
    region: 'Global · EU + Nordic',
    programme: 'Cross-border relocation marketplace',
    summary:
      'FlyttGo Technologies Group operates the FlyttGo flagship marketplace at flyttgo.com — a regulated multi-sided relocation platform composing the full module surface (Transify mobility, Identra identity, Payvera payments, Workverge workforce, Ledgera financial ops, FlyttGo marketplace engine) on the FlyttGoTech orchestration core.',
    modules: ['Transify', 'Workverge', 'Identra', 'Payvera', 'Ledgera', 'FlyttGo Marketplace'],
    deployment: 'DM.02',
    tier: 'L.06',
    duration: 'In production',
    liveUrl: 'https://flyttgo.com',
    metrics: [
      { label: 'Status',          value: 'Live' },
      { label: 'Module surface',  value: '6 / 8 modules' },
      { label: 'Substrate',       value: 'DM.02 · cloud' },
      { label: 'Coverage',        value: 'Multi-region' },
    ],
    outcome:
      'Flagship deployment of the platform substrate. Operates under the FlyttGoTech audit envelope; same platform layer the rest of the deployments inherit from.',
  },
  {
    slug: 'flyttgo-norway',
    code: 'CS.02',
    customer: 'FlyttGo · Norway',
    sector: 'Marketplace',
    region: 'Norway · Nordic EU',
    programme: 'Norwegian relocation marketplace',
    summary:
      'In-jurisdiction Norwegian deployment at flyttgo.no — composes the relocation marketplace surface against Norwegian-resident substrate, BankID-aligned identity and Ledgera-driven SAF-T statutory export readiness for the Skatteetaten reporting cadence.',
    modules: ['Transify', 'Identra', 'Payvera', 'Ledgera', 'FlyttGo Marketplace'],
    deployment: 'DM.02',
    tier: 'L.05',
    duration: 'In production',
    liveUrl: 'https://flyttgo.no',
    metrics: [
      { label: 'Status',           value: 'Live' },
      { label: 'Jurisdiction',     value: 'Norway' },
      { label: 'Statutory export', value: 'SAF-T 2.0 ready' },
      { label: 'Identity baseline', value: 'eIDAS · BankID-compatible' },
    ],
    outcome:
      'Norwegian-jurisdiction relocation marketplace operational against the Digdir-aligned reference architecture; SAF-T export pack ships from Ledgera as a single archive.',
  },
  {
    slug: 'golden-dimensions',
    code: 'CS.03',
    customer: 'Golden Dimensions',
    sector: 'Marketplace',
    region: 'United Kingdom',
    programme: 'UK relocation + lifestyle marketplace',
    summary:
      'Built for Golden Dimensions and live at goldendimensions.co.uk — UK-jurisdiction multi-sided marketplace running the FlyttGo platform substrate with UK GDPR + DPA-2018 alignment, OIDC + FIDO2 identity, and Payvera SCA-compliant payment flows.',
    modules: ['Transify', 'Identra', 'Payvera', 'FlyttGo Marketplace'],
    deployment: 'DM.02',
    tier: 'L.05',
    duration: 'In production',
    liveUrl: 'https://www.goldendimensions.co.uk',
    metrics: [
      { label: 'Status',          value: 'Live' },
      { label: 'Jurisdiction',    value: 'United Kingdom' },
      { label: 'Procurement',      value: 'CCS-route compatible' },
      { label: 'Auth baseline',   value: 'OIDC · FIDO2' },
    ],
    outcome:
      'UK marketplace operator running on the FlyttGo platform layer; deployed under UK GDPR posture with PSD2 SCA flows live through Payvera.',
  },
  {
    slug: 'fastandman',
    code: 'CS.04',
    customer: 'fastandman',
    sector: 'Marketplace',
    region: 'United Kingdom',
    programme: 'UK removals + relocation marketplace',
    summary:
      'Built for fastandman and live at ukremoval.net — UK removals marketplace deployed on the FlyttGo platform substrate with provider routing through Transify, workforce coordination via Workverge, identity verification under Identra and SCA-compliant settlement via Payvera.',
    modules: ['Transify', 'Workverge', 'Identra', 'Payvera', 'FlyttGo Marketplace'],
    deployment: 'DM.02',
    tier: 'L.04',
    duration: 'In production',
    liveUrl: 'https://www.ukremoval.net',
    metrics: [
      { label: 'Status',         value: 'Live' },
      { label: 'Jurisdiction',   value: 'United Kingdom' },
      { label: 'Service shape',  value: 'Relocation + removals' },
      { label: 'Substrate',      value: 'DM.02 · cloud' },
    ],
    outcome:
      'UK removals + relocation marketplace operating against the same FlyttGo substrate as the other deployments; UK GDPR-aligned and PSD2 SCA-compliant out of the box.',
  },
];
