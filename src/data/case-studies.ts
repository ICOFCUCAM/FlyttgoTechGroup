export type CaseStudy = {
  slug: string;
  code: string;
  customer: string;
  sector: 'Government' | 'Education' | 'Mobility' | 'Marketplace' | 'Enterprise' | 'Financial';
  region: string;
  programme: string;
  summary: string;
  modules: string[];
  deployment: 'DM.01' | 'DM.02' | 'DM.03';
  tier: string;
  duration: string;
  metrics: { label: string; value: string }[];
  outcome: string;
};

/**
 * Reference programmes anonymised to the procurement style most
 * institutional buyers expect. Real customer logos appear on a
 * separate consent-controlled wall once written agreements land.
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: 'nordic-ministry-identity',
    code: 'CS.01',
    customer: 'Nordic Ministry of Digital Affairs',
    sector: 'Government',
    region: 'Nordic EU',
    programme: 'National identity federation backbone',
    summary:
      'A Nordic ministry consolidated three legacy identity systems onto Identra-led federation with eIDAS LoA-mapped issuance, qualified-signature flow and per-agency RBAC envelopes.',
    modules: ['Identra', 'Civitas', 'Payvera'],
    deployment: 'DM.03',
    tier: 'L.05',
    duration: '11 months',
    metrics: [
      { label: 'Verifications · monthly',  value: '380k+' },
      { label: 'Agencies onboarded',       value: '14' },
      { label: 'Qualified-signature rate', value: '99.97%' },
      { label: 'Audit findings · go-live', value: '0 critical' },
    ],
    outcome:
      'National-scale identity rail operational across 14 agencies under sovereign-deployment posture; downstream service teams ship integration in days rather than quarters.',
  },
  {
    slug: 'mena-mobility-authority',
    code: 'CS.02',
    customer: 'GCC Transport Authority',
    sector: 'Mobility',
    region: 'GCC / MENA',
    programme: 'Cross-emirate freight corridor coordination',
    summary:
      'A GCC-region authority deployed Transify with a regulated marketplace overlay to coordinate cross-emirate freight, cabotage permits and provider routing under a single audit envelope.',
    modules: ['Transify', 'Identra', 'FlyttGo Marketplace'],
    deployment: 'DM.03',
    tier: 'L.06',
    duration: '14 months',
    metrics: [
      { label: 'Routes orchestrated · daily', value: '12.4k' },
      { label: 'Verified providers',           value: '2,800+' },
      { label: 'Permit dispute rate',          value: '−71%' },
      { label: 'P95 routing latency',          value: '184 ms' },
    ],
    outcome:
      'Permit disputes dropped 71 % year-over-year; provider verification cycle compressed from 6 weeks to 4 days; sovereign-region telemetry feeds ministry oversight in near-real-time.',
  },
  {
    slug: 'european-university-network',
    code: 'CS.03',
    customer: 'European University Network',
    sector: 'Education',
    region: 'Western EU',
    programme: 'Cross-border learning analytics',
    summary:
      'A 9-institution European university network deployed EduPro on customer-cloud (Azure) with GDPR-aligned learning-analytics, cross-border credential portability and Identra federation.',
    modules: ['EduPro', 'Identra', 'Workverge'],
    deployment: 'DM.02',
    tier: 'L.04',
    duration: '7 months',
    metrics: [
      { label: 'Students onboarded',         value: '218k' },
      { label: 'Cross-border transfers',     value: '4,100+ / yr' },
      { label: 'Credential issuance latency', value: '< 90 s' },
      { label: 'Faculty NPS',                value: '+58' },
    ],
    outcome:
      'Students transfer credentials across the network without re-credentialling overhead; faculty reporting time per cohort fell from 6 hours to under 40 minutes.',
  },
  {
    slug: 'african-municipal-modernisation',
    code: 'CS.04',
    customer: 'East African Municipal Programme',
    sector: 'Government',
    region: 'East Africa',
    programme: 'Municipal services modernisation',
    summary:
      'A municipal modernisation programme covering three East African capital cities deployed Civitas with Payvera-settled fee collection, Identra-backed citizen accounts and Workverge field-team coordination.',
    modules: ['Civitas', 'Payvera', 'Identra', 'Workverge'],
    deployment: 'DM.01',
    tier: 'L.04',
    duration: '5 months',
    metrics: [
      { label: 'Citizen accounts',         value: '1.2M' },
      { label: 'Fees settled · annually',  value: 'USD 18M' },
      { label: 'Service request SLA',     value: '−63%' },
      { label: 'Field-team utilisation',   value: '+34%' },
    ],
    outcome:
      'Three capital cities live in 5 months on managed SaaS with a clean upgrade path to customer-cloud once the regional datacenter completes; programme budget came in 12 % under estimate.',
  },
  {
    slug: 'global-marketplace-operator',
    code: 'CS.05',
    customer: 'European Relocation Marketplace',
    sector: 'Marketplace',
    region: 'Western + Nordic EU',
    programme: 'Regulated cross-border relocation marketplace',
    summary:
      'A pan-European relocation marketplace operator launched on the FlyttGo Marketplace with Transify routing, Identra-verified providers, Payvera escrow and Ledgera audit settlement.',
    modules: ['FlyttGo Marketplace', 'Transify', 'Identra', 'Payvera', 'Ledgera'],
    deployment: 'DM.02',
    tier: 'L.05',
    duration: '9 months',
    metrics: [
      { label: 'Provider verification rate', value: '94%' },
      { label: 'Order GMV · annualised',     value: 'EUR 41M' },
      { label: 'Dispute auto-resolution',    value: '78%' },
      { label: 'Settlement cycle',           value: 'T+1' },
    ],
    outcome:
      'Operator runs a 5-country marketplace under a single audit log; 78 % of disputes auto-resolve through MP.DR before reaching the desk; T+1 settlement across SEPA + national rails.',
  },
  {
    slug: 'enterprise-fleet-operator',
    code: 'CS.06',
    customer: 'European Logistics Operator',
    sector: 'Enterprise',
    region: 'Mainland EU',
    programme: 'Fleet operations modernisation',
    summary:
      'A 4,200-vehicle European logistics operator deployed Transify + Workverge for fleet routing, driver coordination and fuel-card / payment orchestration via Payvera, on customer-cloud (AWS).',
    modules: ['Transify', 'Workverge', 'Payvera'],
    deployment: 'DM.02',
    tier: 'L.04',
    duration: '6 months',
    metrics: [
      { label: 'Vehicles managed',     value: '4,200' },
      { label: 'Empty-mileage drop',   value: '−18%' },
      { label: 'Driver onboarding',    value: '4.2 days avg' },
      { label: 'Operator dashboard adoption', value: '94%' },
    ],
    outcome:
      'Empty-mileage down 18 %; driver onboarding compressed from 3 weeks to 4 days; operator dashboard adoption above 90 % within the first quarter live.',
  },
];
