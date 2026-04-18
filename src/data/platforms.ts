import {
  Route,
  UserCheck,
  Landmark,
  GraduationCap,
  Fingerprint,
  CreditCard,
  Calculator,
  Truck,
  type LucideIcon,
} from 'lucide-react';
import { imagery } from '@/lib/imagery';

export type PricingTier = {
  name: string;
  price: string;
  cadence: string;
  description: string;
  features: string[];
  highlighted?: boolean;
};

export type CaseStudy = {
  client: string;
  region: string;
  metric: string;
  metricLabel: string;
  summary: string;
};

export type ApiEndpoint = {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  description: string;
};

export type PlatformCategory = 'infrastructure' | 'marketplace';

export type PlatformData = {
  slug: string;
  name: string;
  subtitle: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  color: string;
  accentBg: string;
  gradient: string;
  category: PlatformCategory;
  /** When set, this platform runs on top of another platform in the ecosystem. */
  dependsOn?: string;
  heroImage: string;
  dashboardImage: string;
  capabilities: string[];
  modules: { title: string; desc: string }[];
  workflow: { title: string; desc: string }[];
  architecture: { layer: string; stack: string; desc: string }[];
  pricing: PricingTier[];
  caseStudies: CaseStudy[];
  apiEndpoints: ApiEndpoint[];
  keyMetrics: { value: string; label: string }[];
};

const commonWorkflow: PlatformData['workflow'] = [
  { title: 'Discovery', desc: 'Scoping workshop with the FlyttGo deployment team.' },
  { title: 'Template', desc: 'Select a deployment template matched to the operator profile.' },
  { title: 'Configure', desc: 'Branding, tenancy boundaries, regional data residency and module activation.' },
  { title: 'Deploy', desc: 'Go-live on FlyttGo-managed, customer-cloud, or sovereign datacenter.' },
];

const commonArchitecture: PlatformData['architecture'] = [
  { layer: 'Frontend Interface', stack: 'Next.js · React · SSR', desc: 'Tenant-themed surfaces with accessible components.' },
  { layer: 'Service Layer', stack: 'NestJS · REST · gRPC', desc: 'Microservices with event streams and webhooks.' },
  { layer: 'Identity Layer', stack: 'OAuth · RBAC · Identra', desc: 'Standards-based authentication with tenant-scoped roles.' },
  { layer: 'Data Layer', stack: 'Postgres · PostGIS · Redis', desc: 'Transactional, geospatial and real-time datastores.' },
  { layer: 'Deployment Layer', stack: 'Docker · Kubernetes', desc: 'Multi-tenant orchestration and region routing.' },
];

const commonPricing = (flagship: string): PlatformData['pricing'] => [
  {
    name: 'Pilot',
    price: 'Custom',
    cadence: 'per engagement',
    description: `Stand up a ${flagship} pilot environment with one tenant and scoped module activation.`,
    features: ['1 tenant', 'Core modules', 'Managed hosting', 'Implementation support'],
  },
  {
    name: 'Scale',
    price: 'Custom',
    cadence: 'annual',
    description: `Scale ${flagship} across multiple tenants, operators or regions.`,
    features: ['Multi-tenant', 'All modules', 'Multi-region', 'SLA-backed support', 'Audit logging'],
    highlighted: true,
  },
  {
    name: 'Sovereign',
    price: 'Custom',
    cadence: 'annual',
    description: `Deploy ${flagship} inside customer cloud or sovereign national datacenter environments.`,
    features: ['Self-hosted option', 'Regional data residency', 'Dedicated success engineering', 'Compliance attestations'],
  },
];

const platformList: PlatformData[] = [
  {
    slug: 'transify',
    name: 'Transify',
    subtitle: 'Mobility Infrastructure Platform',
    tagline: 'The mobility coordination layer for cities, transport agencies and logistics operators.',
    description:
      'Transify enables municipalities, transport agencies and logistics operators to coordinate fleet infrastructure, relocation workflows, dispatch orchestration and regional movement analytics through a unified mobility coordination platform.',
    icon: Route,
    color: '#1E6FD9',
    accentBg: 'bg-blue-50',
    gradient: 'from-[#0A3A6B] to-[#1E6FD9]',
    category: 'infrastructure',
    heroImage: imagery.platforms.transify.hero,
    dashboardImage: imagery.platforms.transify.dashboard,
    capabilities: [
      'Dispatch orchestration',
      'Fleet coordination',
      'Regional movement analytics',
      'Relocation workflow engine',
    ],
    modules: [
      { title: 'Dispatch Orchestration', desc: 'Priority-aware driver and vehicle assignment across depots and zones.' },
      { title: 'Fleet Coordination', desc: 'Live telemetry, utilisation and availability across every tenant fleet.' },
      { title: 'Relocation Workflows', desc: 'End-to-end coordination for residential, student and office moves.' },
      { title: 'Regional Movement Analytics', desc: 'City and regional movement intelligence with geospatial reporting.' },
      { title: 'Routing Engine', desc: 'PostGIS-backed continuous route re-optimisation against live constraints.' },
      { title: 'Operator Cockpit', desc: 'Dispatcher, fleet and compliance consoles with role-scoped access.' },
    ],
    workflow: commonWorkflow,
    architecture: commonArchitecture,
    pricing: commonPricing('Transify'),
    caseStudies: [
      {
        client: 'Nordic Transport Authority',
        region: 'EU-North',
        metric: '4 weeks',
        metricLabel: 'to first production tenant',
        summary: 'Stood up a multi-operator dispatch environment covering 14 regional carriers in one quarter.',
      },
      {
        client: 'Metro Logistics Group',
        region: 'EU-Central',
        metric: '35%+',
        metricLabel: 'average dispatch efficiency uplift',
        summary: 'Consolidated three legacy dispatch systems onto a single Transify tenant with multi-depot coordination.',
      },
      {
        client: 'Gulf Transport Regulator',
        region: 'MENA',
        metric: '99.95%',
        metricLabel: 'operational uptime',
        summary: 'Deployed an oversight layer integrating operator credentialing, permits and real-time fleet visibility.',
      },
    ],
    apiEndpoints: [
      { method: 'POST', path: '/v1/dispatch/jobs', description: 'Create a dispatch job with zone and priority constraints.' },
      { method: 'GET', path: '/v1/fleet/vehicles', description: 'List vehicles with live telemetry and utilisation metadata.' },
      { method: 'POST', path: '/v1/routes/optimize', description: 'Request a constraint-aware route optimisation pass.' },
      { method: 'GET', path: '/v1/analytics/regions/{id}', description: 'Read regional movement analytics for a given zone.' },
    ],
    keyMetrics: [
      { value: '35%+', label: 'Dispatch efficiency uplift' },
      { value: '<120ms', label: 'Route re-optimisation cycle' },
      { value: '99.95%', label: 'Operational uptime target' },
      { value: '3', label: 'Continents deployed' },
    ],
  },
  {
    slug: 'workverge',
    name: 'Workverge',
    subtitle: 'Workforce Coordination Infrastructure Platform',
    tagline: 'The workforce coordination layer for verified operators, contractors and regional skills programmes.',
    description:
      'Workverge enables workforce verification, contractor onboarding, certification lifecycle tracking and cross-region skills deployment through secure workforce coordination infrastructure.',
    icon: UserCheck,
    color: '#0FB5A6',
    accentBg: 'bg-teal-50',
    gradient: 'from-[#0F766E] to-[#0FB5A6]',
    category: 'infrastructure',
    heroImage: imagery.platforms.workverge.hero,
    dashboardImage: imagery.platforms.workverge.dashboard,
    capabilities: [
      'Workforce verification',
      'Contractor onboarding',
      'Certification lifecycle',
      'Cross-region skills deployment',
    ],
    modules: [
      { title: 'Verification Engine', desc: 'Document, credential and identity verification against multiple authorities.' },
      { title: 'Contractor Onboarding', desc: 'Guided onboarding flows with tenant-specific compliance steps.' },
      { title: 'Certification Lifecycle', desc: 'Issue, renew and revoke certifications with audit-ready lineage.' },
      { title: 'Skills Registry', desc: 'Normalised skills, trades and role taxonomy across regions.' },
      { title: 'Assignment Engine', desc: 'Match verified workforce against multi-region programmes and operators.' },
      { title: 'Workforce Analytics', desc: 'Utilisation, retention and compliance dashboards for programme leads.' },
    ],
    workflow: commonWorkflow,
    architecture: commonArchitecture,
    pricing: commonPricing('Workverge'),
    caseStudies: [
      {
        client: 'Ministry of Labour (representative)',
        region: 'MENA',
        metric: '120k+',
        metricLabel: 'workers verified in year one',
        summary: 'National contractor verification programme rolled out across six governorates.',
      },
      {
        client: 'PanEU Fleet Alliance',
        region: 'EU',
        metric: '6 weeks',
        metricLabel: 'cross-region onboarding cycle',
        summary: 'Consolidated contractor verification across a multi-country operator network.',
      },
      {
        client: 'Regional Skills Authority',
        region: 'EU-North',
        metric: '99.2%',
        metricLabel: 'credential verification accuracy',
        summary: 'Moved manual credential checks into a real-time verification pipeline.',
      },
    ],
    apiEndpoints: [
      { method: 'POST', path: '/v1/workforce/verify', description: 'Submit an identity + credential verification request.' },
      { method: 'GET', path: '/v1/workforce/workers/{id}', description: 'Read a worker profile with certifications and assignments.' },
      { method: 'POST', path: '/v1/assignments', description: 'Assign verified workers to a programme or operator.' },
      { method: 'GET', path: '/v1/analytics/workforce', description: 'Workforce utilisation and compliance analytics.' },
    ],
    keyMetrics: [
      { value: '120k+', label: 'Workers verified' },
      { value: '99.2%', label: 'Verification accuracy' },
      { value: 'Multi', label: 'Country rollout ready' },
      { value: 'Real-time', label: 'Credential checks' },
    ],
  },
  {
    slug: 'civitas',
    name: 'Civitas',
    subtitle: 'Digital Government Services Platform',
    tagline: 'The digital service layer for ministries, municipalities and regional authorities.',
    description:
      'Civitas enables ministries and municipalities to deploy digital permit workflows, service dashboards, application processing systems and citizen interaction platforms on a single multi-tenant service layer.',
    icon: Landmark,
    color: '#7C5CE6',
    accentBg: 'bg-violet-50',
    gradient: 'from-[#5B3FD0] to-[#7C5CE6]',
    category: 'infrastructure',
    heroImage: imagery.platforms.civitas.hero,
    dashboardImage: imagery.platforms.civitas.dashboard,
    capabilities: [
      'Digital permit workflows',
      'Service dashboards',
      'Application processing',
      'Citizen interaction',
    ],
    modules: [
      { title: 'Permit Workflows', desc: 'Configurable multi-step permit pipelines with SLA tracking.' },
      { title: 'Service Dashboards', desc: 'Municipal and ministry leadership dashboards with live caseload metrics.' },
      { title: 'Application Processing', desc: 'Intake, triage, review and approval across agencies.' },
      { title: 'Citizen Portals', desc: 'Branded citizen-facing interaction, messaging and status visibility.' },
      { title: 'Cross-Agency Console', desc: 'Shared case workspace across departments with audit logging.' },
      { title: 'Reporting Engine', desc: 'Scheduled and on-demand reporting for regulators and auditors.' },
    ],
    workflow: commonWorkflow,
    architecture: commonArchitecture,
    pricing: commonPricing('Civitas'),
    caseStudies: [
      {
        client: 'Nordic Transport Authority',
        region: 'EU-North',
        metric: '4 weeks',
        metricLabel: 'pilot to first municipal cohort',
        summary: 'Permit coordination across 14 municipalities deployed on a single Civitas tenant.',
      },
      {
        client: 'Gulf Service Authority',
        region: 'MENA',
        metric: '3 ministries',
        metricLabel: 'onboarded in year one',
        summary: 'Shared service layer for permits, licences and citizen interaction across government agencies.',
      },
      {
        client: 'Metropolitan Services Office',
        region: 'EU-Central',
        metric: '58% faster',
        metricLabel: 'average permit processing',
        summary: 'Digital intake replaced paper-based workflows at metropolitan scale.',
      },
    ],
    apiEndpoints: [
      { method: 'POST', path: '/v1/civitas/applications', description: 'Create a permit or service application.' },
      { method: 'GET', path: '/v1/civitas/cases/{id}', description: 'Read a case with full audit trail.' },
      { method: 'PUT', path: '/v1/civitas/cases/{id}/decision', description: 'Record a decision or approval with reviewer metadata.' },
      { method: 'GET', path: '/v1/civitas/reporting', description: 'Generate regulator-ready reports for a date range.' },
    ],
    keyMetrics: [
      { value: '4 wks', label: 'Pilot-to-production' },
      { value: '58%', label: 'Processing time saved' },
      { value: 'Multi', label: 'Agency coordination' },
      { value: 'Audit', label: 'Ready by default' },
    ],
  },
  {
    slug: 'edupro',
    name: 'EduPro',
    subtitle: 'Education Intelligence Infrastructure Platform',
    tagline: 'The education intelligence layer for ministries, universities and graduate programmes.',
    description:
      'EduPro enables ministries and universities to coordinate admissions workflows, scholarship programmes, institutional analytics dashboards and graduate workforce transition pathways.',
    icon: GraduationCap,
    color: '#10B981',
    accentBg: 'bg-emerald-50',
    gradient: 'from-[#047857] to-[#10B981]',
    category: 'infrastructure',
    heroImage: imagery.platforms.edupro.hero,
    dashboardImage: imagery.platforms.edupro.dashboard,
    capabilities: [
      'Admissions workflows',
      'Scholarship programmes',
      'Institutional analytics',
      'Graduate workforce pathways',
    ],
    modules: [
      { title: 'Admissions Engine', desc: 'Multi-stage admissions with document intake and decision workflows.' },
      { title: 'Scholarship Programmes', desc: 'Programme, stipend and reporting management for ministries.' },
      { title: 'Institutional Analytics', desc: 'Attendance, performance and outcome dashboards at institution scale.' },
      { title: 'Graduate Pathways', desc: 'Workforce transition pipelines connecting graduates to verified programmes.' },
      { title: 'Ministry Reporting', desc: 'Regulator-ready reporting across districts and institutions.' },
      { title: 'Identity Binding', desc: 'Single-identity student profiles via Identra integration.' },
    ],
    workflow: commonWorkflow,
    architecture: commonArchitecture,
    pricing: commonPricing('EduPro'),
    caseStudies: [
      {
        client: 'Ministry of Education (representative)',
        region: 'MENA',
        metric: '1.2M',
        metricLabel: 'student profiles under analytics',
        summary: 'National admissions and scholarship coordination layered across universities.',
      },
      {
        client: 'University Consortium',
        region: 'EU-Central',
        metric: '8 institutions',
        metricLabel: 'onboarded in year one',
        summary: 'Shared admissions and graduate pathway tracking across a university consortium.',
      },
      {
        client: 'Regional Scholarship Office',
        region: 'EU-North',
        metric: '40%',
        metricLabel: 'reduction in processing time',
        summary: 'Digital scholarship pipeline replaced email-driven review workflows.',
      },
    ],
    apiEndpoints: [
      { method: 'POST', path: '/v1/edupro/admissions', description: 'Submit an admissions application with documents.' },
      { method: 'GET', path: '/v1/edupro/students/{id}', description: 'Read a student profile with outcomes and status.' },
      { method: 'GET', path: '/v1/edupro/analytics/institution/{id}', description: 'Institution-level analytics snapshot.' },
      { method: 'POST', path: '/v1/edupro/pathways', description: 'Register a graduate in a workforce transition programme.' },
    ],
    keyMetrics: [
      { value: '1.2M', label: 'Student profiles' },
      { value: '40%', label: 'Processing time saved' },
      { value: 'Ministry', label: 'Grade reporting' },
      { value: 'National', label: 'Deployment ready' },
    ],
  },
  {
    slug: 'identra',
    name: 'Identra',
    subtitle: 'Identity Infrastructure Platform',
    tagline: 'Secure authentication and identity verification for citizen, contractor and enterprise systems.',
    description:
      'Identra delivers secure authentication and identity verification infrastructure supporting citizen access, contractor onboarding and enterprise authorization systems. Other FlyttGo platforms integrate with Identra for identity primitives.',
    icon: Fingerprint,
    color: '#4338CA',
    accentBg: 'bg-indigo-50',
    gradient: 'from-[#312E81] to-[#4338CA]',
    category: 'infrastructure',
    heroImage: imagery.platforms.identra.hero,
    dashboardImage: imagery.platforms.identra.dashboard,
    capabilities: [
      'Citizen authentication',
      'Contractor verification',
      'Enterprise authorization',
      'Credential revocation',
    ],
    modules: [
      { title: 'Authentication', desc: 'Standards-based OAuth2/OIDC with SSO federation.' },
      { title: 'Identity Verification', desc: 'Document + biometric verification pipelines.' },
      { title: 'Role-Based Access', desc: 'Tenant-scoped RBAC with policy delegation.' },
      { title: 'Credential Registry', desc: 'Issuance, renewal and revocation with audit trail.' },
      { title: 'Session Management', desc: 'Device, geographic and behavioural signal awareness.' },
      { title: 'Audit Logging', desc: 'Tamper-evident logs for regulators and internal compliance.' },
    ],
    workflow: commonWorkflow,
    architecture: commonArchitecture,
    pricing: commonPricing('Identra'),
    caseStudies: [
      {
        client: 'National Identity Agency (representative)',
        region: 'MENA',
        metric: '3.4M',
        metricLabel: 'authenticated sessions / day',
        summary: 'Citizen authentication layer integrated across ministries and service portals.',
      },
      {
        client: 'PanEU Fleet Alliance',
        region: 'EU',
        metric: '6 countries',
        metricLabel: 'federated workforce identity',
        summary: 'Federated contractor identity across EU operators with policy delegation.',
      },
      {
        client: 'Enterprise Platform Group',
        region: 'EU-North',
        metric: 'SOC 2',
        metricLabel: 'alignment audit passed',
        summary: 'Enterprise SSO + audit logging deployed inside customer cloud environment.',
      },
    ],
    apiEndpoints: [
      { method: 'POST', path: '/v1/identra/sessions', description: 'Open an authenticated session with OIDC tokens.' },
      { method: 'POST', path: '/v1/identra/verify', description: 'Submit a document or biometric verification request.' },
      { method: 'POST', path: '/v1/identra/credentials', description: 'Issue or revoke a credential against a tenant policy.' },
      { method: 'GET', path: '/v1/identra/audit', description: 'Stream tamper-evident audit events.' },
    ],
    keyMetrics: [
      { value: '3.4M', label: 'Daily auth sessions' },
      { value: 'OIDC', label: 'Standards-based' },
      { value: 'RBAC', label: 'By default' },
      { value: 'Audit', label: 'Tamper-evident' },
    ],
  },
  {
    slug: 'payvera',
    name: 'Payvera',
    subtitle: 'Public Service Payment Infrastructure Platform',
    tagline: 'Government-ready payment infrastructure for permits, payouts and subscriptions.',
    description:
      'Payvera enables secure government-ready payment infrastructure supporting permits, contractor payouts, escrow workflows and subscription billing across public sector and enterprise operators.',
    icon: CreditCard,
    color: '#D97706',
    accentBg: 'bg-amber-50',
    gradient: 'from-[#B45309] to-[#F59E0B]',
    category: 'infrastructure',
    heroImage: imagery.platforms.payvera.hero,
    dashboardImage: imagery.platforms.payvera.dashboard,
    capabilities: [
      'Permit & licence payments',
      'Contractor payouts',
      'Escrow workflows',
      'Subscription billing',
    ],
    modules: [
      { title: 'Payments Gateway', desc: 'Multi-provider payments with regional acquirer routing.' },
      { title: 'Ledger & Reconciliation', desc: 'Tenant-scoped ledgers with reconciliation and export.' },
      { title: 'Payouts', desc: 'Scheduled and on-demand payouts to verified contractors.' },
      { title: 'Escrow Engine', desc: 'Conditional release escrow for marketplace and public programmes.' },
      { title: 'Subscription Billing', desc: 'Recurring billing for service programmes and tenants.' },
      { title: 'Compliance Exports', desc: 'Regulator-ready exports and attestations.' },
    ],
    workflow: commonWorkflow,
    architecture: commonArchitecture,
    pricing: commonPricing('Payvera'),
    caseStudies: [
      {
        client: 'Gulf Service Authority',
        region: 'MENA',
        metric: '€180M',
        metricLabel: 'processed in pilot year',
        summary: 'Permit and licence fees processed through a single Payvera tenant.',
      },
      {
        client: 'Ministry of Labour (representative)',
        region: 'MENA',
        metric: '6 weeks',
        metricLabel: 'contractor payout cycle compressed',
        summary: 'Contractor payouts moved onto a verified, ledger-backed payout pipeline.',
      },
      {
        client: 'Marketplace Founder Programme',
        region: 'EU',
        metric: 'Multi-PSP',
        metricLabel: 'resilience achieved',
        summary: 'Escrow and subscription billing deployed for a regional marketplace operator.',
      },
    ],
    apiEndpoints: [
      { method: 'POST', path: '/v1/payvera/charges', description: 'Create a payment charge against a tenant ledger.' },
      { method: 'POST', path: '/v1/payvera/payouts', description: 'Schedule a verified contractor payout.' },
      { method: 'POST', path: '/v1/payvera/escrow', description: 'Open an escrow agreement with release conditions.' },
      { method: 'GET', path: '/v1/payvera/reconcile', description: 'Reconcile a date window across acquirers.' },
    ],
    keyMetrics: [
      { value: '€180M', label: 'Pilot-year volume' },
      { value: 'Multi', label: 'Acquirer routing' },
      { value: 'Tenant', label: 'Scoped ledgers' },
      { value: 'PSD2', label: 'Aligned' },
    ],
  },
  {
    slug: 'ledgera',
    name: 'Ledgera',
    subtitle: 'Financial Operations Infrastructure Platform',
    tagline: 'Automated bookkeeping, tax-ready reporting and AI-powered financial intelligence.',
    description:
      'Ledgera provides automated bookkeeping, compliance-ready reporting, contractor earnings tracking and AI-powered financial intelligence supporting enterprises, municipalities and marketplace ecosystems. Ledgera integrates with Payvera for payment orchestration and supports compliance reporting across Transify, Workverge, Civitas and EduPro environments.',
    icon: Calculator,
    color: '#0E7C66',
    accentBg: 'bg-emerald-50',
    gradient: 'from-[#0E7C66] to-[#10B981]',
    category: 'infrastructure',
    heroImage: imagery.platforms.ledgera.hero,
    dashboardImage: imagery.platforms.ledgera.dashboard,
    capabilities: [
      'Automated bookkeeping',
      'Tax-ready reporting',
      'Contractor payout tracking',
      'Financial analytics dashboards',
    ],
    modules: [
      { title: 'Ledger Engine', desc: 'Double-entry ledger with tenant scoping, cost centres and inter-platform allocations.' },
      { title: 'Bookkeeping Automation', desc: 'Rule-driven classification, reconciliation and period-close automation.' },
      { title: 'Tax & Compliance', desc: 'Jurisdiction-aware tax handling and regulator-ready export packs.' },
      { title: 'Contractor Earnings', desc: 'Per-contractor earnings, payout reconciliation and 1099-equivalent generation.' },
      { title: 'Financial Intelligence', desc: 'AI-assisted variance, forecast and anomaly detection across tenants.' },
      { title: 'Integrations', desc: 'Out-of-the-box links to Payvera, Transify, Workverge, Civitas and EduPro.' },
    ],
    workflow: commonWorkflow,
    architecture: commonArchitecture,
    pricing: commonPricing('Ledgera'),
    caseStudies: [
      {
        client: 'Nordic Marketplace Operator',
        region: 'EU-North',
        metric: '9 days',
        metricLabel: 'period-close compressed from 23 days',
        summary: 'Bookkeeping automation and Payvera reconciliation cut month-end close by more than half.',
      },
      {
        client: 'Municipality of Helsingborg (representative)',
        region: 'EU',
        metric: 'Audit-ready',
        metricLabel: 'quarterly regulator exports',
        summary: 'Tax-aligned ledger feeds Civitas permit workflows with regulator-ready financial reporting.',
      },
      {
        client: 'AfriMove Contractor Network',
        region: 'AF',
        metric: '12k+',
        metricLabel: 'contractor earnings statements automated',
        summary: 'Contractor earnings tracking and payout reconciliation deployed through Ledgera + Payvera.',
      },
    ],
    apiEndpoints: [
      { method: 'POST', path: '/v1/ledgera/entries', description: 'Book a journal entry against a tenant ledger.' },
      { method: 'GET', path: '/v1/ledgera/reports/tax', description: 'Export a tax-aligned period report.' },
      { method: 'GET', path: '/v1/ledgera/contractors/:id/earnings', description: 'Fetch contractor earnings and payout reconciliation.' },
      { method: 'GET', path: '/v1/ledgera/analytics/variance', description: 'Query AI-assisted financial variance analytics.' },
    ],
    keyMetrics: [
      { value: '60%+', label: 'Close-cycle compression' },
      { value: 'Multi-GAAP', label: 'Reporting support' },
      { value: 'AI', label: 'Variance & anomaly' },
      { value: 'Payvera', label: 'Native integration' },
    ],
  },
  {
    slug: 'flyttgo',
    name: 'FlyttGo',
    subtitle: 'Smart Moving & Transport Marketplace Platform',
    tagline: 'A real-time marketplace connecting customers with verified drivers and relocation professionals.',
    description:
      'FlyttGo connects customers with verified drivers and relocation professionals through a real-time booking and dispatch marketplace operating on top of Transify infrastructure. FlyttGo demonstrates how FlyttGo Technologies Group deployment platforms support real-world logistics coordination environments.',
    icon: Truck,
    color: '#E67E1E',
    accentBg: 'bg-orange-50',
    gradient: 'from-[#C2410C] to-[#E67E1E]',
    category: 'marketplace',
    dependsOn: 'transify',
    heroImage: imagery.platforms.flyttgo.hero,
    dashboardImage: imagery.platforms.flyttgo.dashboard,
    capabilities: [
      'Customer booking flows',
      'Verified driver network',
      'Real-time dispatch',
      'Relocation services',
    ],
    modules: [
      { title: 'Booking Flow', desc: 'Customer-facing quote, schedule and confirmation flow.' },
      { title: 'Driver App', desc: 'Branded driver interface for live jobs and status updates.' },
      { title: 'Dispatch Bridge', desc: 'Integration with Transify dispatch and routing engines.' },
      { title: 'Ratings & Reviews', desc: 'Two-sided quality signals for customers and drivers.' },
      { title: 'Customer Support', desc: 'Operator support console with tenant-scoped escalation.' },
      { title: 'Payments', desc: 'End-to-end payments via Payvera.' },
    ],
    workflow: commonWorkflow,
    architecture: commonArchitecture,
    pricing: commonPricing('FlyttGo'),
    caseStudies: [
      {
        client: 'FlyttGo Stockholm',
        region: 'EU-North',
        metric: '40k+',
        metricLabel: 'relocations coordinated',
        summary: 'Flagship FlyttGo deployment running on Transify mobility infrastructure.',
      },
      {
        client: 'FlyttGo Partner (representative)',
        region: 'EU-Central',
        metric: '12 weeks',
        metricLabel: 'from kickoff to live market',
        summary: 'Regional FlyttGo expansion onto a partner-branded marketplace surface.',
      },
      {
        client: 'FlyttGo Student Moves',
        region: 'EU',
        metric: '18+',
        metricLabel: 'universities supported',
        summary: 'Student relocation network integrated with university housing cycles.',
      },
    ],
    apiEndpoints: [
      { method: 'POST', path: '/v1/flyttgo/bookings', description: 'Create a booking with quote and schedule.' },
      { method: 'GET', path: '/v1/flyttgo/drivers', description: 'List verified drivers available for a zone.' },
      { method: 'POST', path: '/v1/flyttgo/dispatch', description: 'Dispatch a booking against Transify.' },
      { method: 'POST', path: '/v1/flyttgo/payments', description: 'Settle a booking through Payvera.' },
    ],
    keyMetrics: [
      { value: '40k+', label: 'Relocations coordinated' },
      { value: '18+', label: 'Universities supported' },
      { value: 'Real-time', label: 'Booking + dispatch' },
      { value: 'Transify', label: 'Runs on top of' },
    ],
  },
];

export const platforms: Record<string, PlatformData> = Object.fromEntries(
  platformList.map((p) => [p.slug, p]),
);

export { platformList };

/** Legacy slugs that have been renamed. Kept for redirect config. */
export const legacyPlatformRedirects: Record<string, string> = {
  govstack: 'civitas',
  marketstack: 'flyttgo',
  fleetstack: 'transify',
};
