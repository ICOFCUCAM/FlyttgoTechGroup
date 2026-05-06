export type CompareAxis = 'flyttgo' | 'comparator' | 'both' | 'neither';

export type ComparisonRow = {
  dimension: string;
  body: string;
  flyttgo: string;
  comparator: string;
};

export type Comparison = {
  slug: string;
  code: string;
  comparator: string;
  comparatorTagline: string;
  positioning: string;
  whenToPick: { flyttgo: string; comparator: string };
  rows: ComparisonRow[];
};

export const COMPARISONS: Comparison[] = [
  {
    slug: 'vs-stripe-atlas',
    code: 'CP.STR',
    comparator: 'Stripe Atlas',
    comparatorTagline: 'Incorporation + Stripe-native operations stack',
    positioning:
      'Stripe Atlas helps a founder incorporate, pay people and accept payments. FlyttGo Technologies Group sits a layer up — full institutional platform infrastructure for operators running on national and cross-border scale. Stripe is one of several payment rails Payvera orchestrates.',
    whenToPick: {
      flyttgo:
        'Pick FlyttGo when the programme spans identity federation, public-sector compliance, multi-rail payment orchestration, marketplace operations and sovereign-deployment posture across multiple regions.',
      comparator:
        'Pick Stripe Atlas when the programme is a single-entity startup that needs incorporation, US banking, and Stripe-native payment acceptance under a unified developer experience.',
    },
    rows: [
      { dimension: 'Scope',                   body: 'Programme breadth out of the box',                  flyttgo: 'Eight platform modules — identity, payments, mobility, workforce, government, education, financial ops, marketplace.', comparator: 'Stripe-native payment + tax + invoicing + minimal identity.' },
      { dimension: 'Deployment substrate',    body: 'Where workloads run',                              flyttgo: 'Managed SaaS, customer-cloud (AWS/Azure/GCP), sovereign in-jurisdiction datacenter (DM.01/02/03).',                       comparator: 'Stripe-managed SaaS only.' },
      { dimension: 'Public-sector frameworks',body: 'Procurement framework alignment',                  flyttgo: 'G-Cloud 14, OJEU, Doffin, Etimad, NUPP, RT contracts. JU.UK / JU.EU / JU.SA / JU.AE / JU.NO / JU.ZA.',                    comparator: 'Not aligned to public-sector procurement frameworks.' },
      { dimension: 'Identity federation',     body: 'Cross-border and qualified flows',                  flyttgo: 'eIDAS LoA-mapped issuance, qualified-signature, cross-border attribute exchange via Identra.',                          comparator: 'Stripe Identity for KYC; no qualified-signature or eIDAS LoA mapping.' },
      { dimension: 'Marketplace operations',  body: 'Provider routing, dispute, pricing',                flyttgo: 'Four-subsystem marketplace OS — routing, trust & verification, pricing intelligence, dispute resolution (MP.RT/TV/PI/DR).', comparator: 'Stripe Connect for split payments only.' },
      { dimension: 'Audit envelope',          body: 'Tamper-evident change log',                         flyttgo: 'Append-only JSONB before/after audit_log on every mutation. Sigstore-signed releases. SOC 2 Type II + ISO 27001.',     comparator: 'Stripe-side audit only; no in-tenant audit envelope.' },
    ],
  },
  {
    slug: 'vs-palantir-foundry',
    code: 'CP.PAL',
    comparator: 'Palantir Foundry',
    comparatorTagline: 'Operating-system-for-data, ontology-led integration',
    positioning:
      'Palantir Foundry models the world as an ontology and runs analytics + workflow on top. FlyttGo Technologies Group ships ready-made institutional platforms with their own operating logic — modules built for a specific job rather than ontology-first canvas.',
    whenToPick: {
      flyttgo:
        'Pick FlyttGo when the institution wants prebuilt platforms with their own operating logic — running mobility, identity, payments, government services as products rather than analytics on top of an ontology.',
      comparator:
        'Pick Palantir Foundry when the programme is fundamentally an analytics + ontology workstream pulling from heterogeneous sources, with workflow tooling built case-by-case.',
    },
    rows: [
      { dimension: 'Programme shape',          body: 'What the platform delivers',                       flyttgo: 'Productised platforms with their own operating logic — Transify orchestrates fleet, Civitas runs services, Identra issues identity.',     comparator: 'Ontology + workflow canvas. Operating logic is built per programme.' },
      { dimension: 'Time to first deployment',  body: 'Pilot to production',                              flyttgo: 'L.04 enterprise: 3-6 months · L.05 sovereign: 6-12 months · L.06 ecosystem: 6-18 months.',                                                  comparator: 'Variable — depends entirely on programme scope and ontology depth.' },
      { dimension: 'Deployment substrate',     body: 'Where workloads run',                              flyttgo: 'DM.01 Managed SaaS · DM.02 Customer cloud · DM.03 Sovereign datacenter.',                                                                 comparator: 'Foundry-managed cloud or customer cloud (AWS/Azure/GCP). Sovereign on case basis.' },
      { dimension: 'Module catalog',           body: 'Productised verticals',                            flyttgo: 'Eight modules · Transify, Workverge, Civitas, EduPro, Identra, Payvera, Ledgera, FlyttGo Marketplace.',                                     comparator: 'Foundry + AIP + Apollo. Verticals built per industry as ontology.' },
      { dimension: 'Pricing model',            body: 'Per-tier vs. per-platform',                         flyttgo: 'Tier ladder L.01 → L.06 with indicative bands; live procurement estimator (PR.00).',                                                       comparator: 'Enterprise contract; case-by-case scoping.' },
    ],
  },
  {
    slug: 'vs-databricks',
    code: 'CP.DBX',
    comparator: 'Databricks',
    comparatorTagline: 'Data + AI platform for analytics and ML',
    positioning:
      'Databricks is the data + AI substrate teams run analytics and ML on. FlyttGo Technologies Group runs the actual operating systems institutions need — identity, payments, mobility, government services. Databricks could power analytics on top of FlyttGo telemetry; the two solve different problems.',
    whenToPick: {
      flyttgo:
        'Pick FlyttGo when the institution needs working operational platforms — citizen accounts, fleet routing, identity issuance — out of the box.',
      comparator:
        'Pick Databricks when the institution needs a unified data + ML substrate to run analytics, train models and operate AI/ML pipelines.',
    },
    rows: [
      { dimension: 'Primary workload',         body: 'What the platform runs',                            flyttgo: 'Operational systems — orders, identities, payments, services, marketplace flow.',                                                          comparator: 'Analytics + ML — data lake, notebooks, model training, vector search.' },
      { dimension: 'End-user surface',         body: 'Who uses the system',                              flyttgo: 'Citizens, drivers, students, agency staff, marketplace operators — through productised UX.',                                            comparator: 'Data engineers, ML engineers, analysts — through notebooks and dashboards.' },
      { dimension: 'Compliance posture',       body: 'Sector certifications',                            flyttgo: 'eIDAS, GDPR, NCA ECC+CCC, POPIA, PSD2, SOC 2 Type II, ISO 27001 — across the operational surface.',                                       comparator: 'SOC 2, ISO 27001, HIPAA, FedRAMP — for the data platform itself.' },
      { dimension: 'Cross-product position',   body: 'How the two relate',                               flyttgo: 'Emits operational telemetry; downstream analytics-grade events stream into a Databricks lakehouse cleanly.',                              comparator: 'Could ingest FlyttGo telemetry to power analytics + ML on operational data.' },
    ],
  },
  {
    slug: 'vs-aws-marketplace',
    code: 'CP.AWS',
    comparator: 'AWS Marketplace',
    comparatorTagline: 'IaaS + ISV catalog, customer-cloud-native procurement',
    positioning:
      'AWS Marketplace is a procurement channel for ISVs distributing through AWS. FlyttGo Technologies Group is a platform operator — we run the institutional surfaces, optionally on AWS as one of three deployment substrates. Where AWS Marketplace ends (procurement of components), FlyttGo begins (operating the assembled programme).',
    whenToPick: {
      flyttgo:
        'Pick FlyttGo when the institution wants the assembled platform shipped as a programme, run by a vendor with operational accountability and certified deployment shapes.',
      comparator:
        'Pick AWS Marketplace when the institution has internal capability to assemble its own platform from ISV components, and wants AWS-native procurement contracts.',
    },
    rows: [
      { dimension: 'Procurement shape',        body: 'What is being bought',                              flyttgo: 'Programme delivery — modules + deployment + integration + operational accountability.',                                                  comparator: 'Component procurement — software licences from ISVs, billed through AWS.' },
      { dimension: 'Operational accountability',body: 'Who carries pager duty',                          flyttgo: 'FlyttGo + the customer; SLAs in MSA; incident postmortems published.',                                                                    comparator: 'ISV per component; no consolidated operational accountability.' },
      { dimension: 'Cross-cloud portability',  body: 'Where workloads run',                              flyttgo: 'AWS, Azure, GCP, sovereign datacenter — same orchestration core (DM.01/02/03).',                                                          comparator: 'AWS-native by design.' },
      { dimension: 'Public-sector framework',  body: 'Procurement compatibility',                        flyttgo: 'G-Cloud 14, OJEU, Doffin, Etimad, NUPP, Treasury RT — direct supplier listings.',                                                          comparator: 'AWS GovCloud + AWS public-sector framework alignment.' },
    ],
  },
];
