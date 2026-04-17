import {
  Truck,
  GraduationCap,
  Building2,
  Store,
  Radar,
  type LucideIcon,
} from 'lucide-react';

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
  heroImage: string;
  dashboardImage: string;
  modules: { title: string; desc: string }[];
  workflow: { title: string; desc: string }[];
  architecture: { layer: string; stack: string; desc: string }[];
  pricing: PricingTier[];
  caseStudies: CaseStudy[];
  apiEndpoints: ApiEndpoint[];
  keyMetrics: { value: string; label: string }[];
};

export const platforms: Record<string, PlatformData> = {
  flyttgo: {
    slug: 'flyttgo',
    name: 'FlyttGo',
    subtitle: 'Logistics Infrastructure Platform',
    tagline: 'Deploy city-scale logistics coordination systems in weeks, not years.',
    description:
      'FlyttGo is the core logistics infrastructure platform powering dispatch intelligence, multi-zone delivery orchestration, moving services and commercial transport coordination across cities and regions.',
    icon: Truck,
    color: '#1E6FD9',
    accentBg: 'bg-blue-50',
    gradient: 'from-[#0A3A6B] to-[#1E6FD9]',
    heroImage: 'https://d64gsuwffb70l.cloudfront.net/69e11d90fabede744a45a3ba_1776360965901_956dd2fd.png',
    dashboardImage: 'https://d64gsuwffb70l.cloudfront.net/69e11d90fabede744a45a3ba_1776361106438_daf08b2d.png',
    modules: [
      { title: 'Dispatch Intelligence Engine', desc: 'Real-time driver assignment with territory balancing and workload distribution analytics.' },
      { title: 'Multi-Zone Routing', desc: 'AI-powered route optimization across delivery zones, cities and regional corridors.' },
      { title: 'Driver Coordination App', desc: 'White-label mobile interface for drivers with live dispatch, navigation and status.' },
      { title: 'Customer Booking Portal', desc: 'Branded customer-facing booking flow supporting scheduling, quotes and tracking.' },
      { title: 'Fleet Activity Monitor', desc: 'Live fleet heatmap, coverage zone visualization and service territory analytics.' },
      { title: 'Same-Day Service Engine', desc: 'Express delivery orchestration with capacity balancing and SLA guarantees.' },
    ],
    workflow: [
      { title: 'Configure Service Zones', desc: 'Define delivery territories, coverage boundaries and pricing rules.' },
      { title: 'Onboard Driver Network', desc: 'Import drivers, configure routing profiles and enable the dispatch mobile app.' },
      { title: 'Activate Dispatch Engine', desc: 'Enable AI routing, territory balancing and real-time coordination logic.' },
      { title: 'Launch Customer Platform', desc: 'Deploy branded booking portal with custom domain and payment provider.' },
    ],
    architecture: [
      { layer: 'Frontend', stack: 'Next.js · React · Tenant theming', desc: 'White-label driver, customer and operator interfaces.' },
      { layer: 'Dispatch Service', stack: 'NestJS · Event streams · Redis', desc: 'Real-time driver-to-order matching and assignment.' },
      { layer: 'Routing Engine', stack: 'OSRM · Custom ML models', desc: 'Multi-stop optimization and ETA prediction.' },
      { layer: 'Geospatial Layer', stack: 'PostGIS · Turf.js', desc: 'Zone mapping, heatmaps and territory analytics.' },
      { layer: 'Data Layer', stack: 'PostgreSQL · TimescaleDB', desc: 'Order history, telemetry and analytics store.' },
    ],
    pricing: [
      {
        name: 'City Starter',
        price: '€2,400',
        cadence: '/month',
        description: 'Single-city deployment for emerging operators.',
        features: ['Up to 50 drivers', '1 city / zone', 'Customer + driver apps', 'Basic dispatch AI', 'Email support'],
      },
      {
        name: 'Regional Operator',
        price: '€7,900',
        cadence: '/month',
        description: 'Multi-city operators scaling across regions.',
        features: ['Up to 500 drivers', 'Unlimited zones', 'Advanced routing engine', 'White-label branding', 'Priority support', 'API access'],
        highlighted: true,
      },
      {
        name: 'National Infrastructure',
        price: 'Custom',
        cadence: '',
        description: 'National-scale deployments and regulators.',
        features: ['Unlimited drivers', 'Multi-tenant architecture', 'Dedicated deployment team', 'SLA 99.95%', '24/7 operations support', 'On-prem option'],
      },
    ],
    caseStudies: [
      { client: 'Nordic Moving Co.', region: 'Stockholm, Sweden', metric: '+312%', metricLabel: 'Booking throughput', summary: 'Deployed FlyttGo infrastructure across 6 Nordic cities in 9 weeks.' },
      { client: 'Atlas Logistics', region: 'Casablanca, Morocco', metric: '−42%', metricLabel: 'Empty miles', summary: 'Route optimization reduced fuel cost by 38% across a 240-vehicle fleet.' },
      { client: 'LevantExpress', region: 'Amman, Jordan', metric: '99.2%', metricLabel: 'On-time delivery', summary: 'Launched branded same-day service in 5 cities within one quarter.' },
    ],
    apiEndpoints: [
      { method: 'POST', path: '/v1/orders', description: 'Create a new dispatch order with pickup and drop-off coordinates.' },
      { method: 'GET', path: '/v1/drivers/available', description: 'List drivers currently active in a given zone.' },
      { method: 'POST', path: '/v1/routing/optimize', description: 'Return optimized multi-stop route for a set of waypoints.' },
      { method: 'GET', path: '/v1/zones/:id/heatmap', description: 'Retrieve real-time demand heatmap for a service zone.' },
      { method: 'PUT', path: '/v1/orders/:id/assign', description: 'Manually assign an order to a specific driver.' },
    ],
    keyMetrics: [
      { value: '99.95%', label: 'Infrastructure uptime' },
      { value: '< 9 wks', label: 'Average deployment time' },
      { value: '500+', label: 'Drivers per tenant supported' },
      { value: '18', label: 'Cities live in production' },
    ],
  },

  edupro: {
    slug: 'edupro',
    name: 'EduPro AI',
    subtitle: 'Education Intelligence Platform',
    tagline: 'National-scale education analytics for ministries, districts and universities.',
    description:
      'EduPro AI powers education analytics platforms supporting attendance monitoring, institutional performance visibility, curriculum tracking and national-scale education intelligence dashboards.',
    icon: GraduationCap,
    color: '#0FB5A6',
    accentBg: 'bg-teal-50',
    gradient: 'from-[#0FB5A6] to-[#1E6FD9]',
    heroImage: 'https://d64gsuwffb70l.cloudfront.net/69e11d90fabede744a45a3ba_1776361007461_c29963f8.png',
    dashboardImage: 'https://d64gsuwffb70l.cloudfront.net/69e11d90fabede744a45a3ba_1776361128732_1ea86120.png',
    modules: [
      { title: 'Attendance Intelligence', desc: 'Real-time attendance tracking with anomaly detection across schools and districts.' },
      { title: 'Institutional Performance', desc: 'Cross-school performance comparison with benchmark visualization.' },
      { title: 'Curriculum Analytics', desc: 'Subject progression analytics and learning outcome monitoring.' },
      { title: 'Ministry Dashboards', desc: 'National-level rollup dashboards with regional drill-down.' },
      { title: 'Predictive Risk Scoring', desc: 'AI models identifying at-risk students and institutions early.' },
      { title: 'Parent & Student Portal', desc: 'Branded engagement portal with grades, feedback and communication.' },
    ],
    workflow: [
      { title: 'Import Institution Data', desc: 'Connect student, teacher and school records via API or batch import.' },
      { title: 'Configure Analytics Models', desc: 'Select performance indicators, attendance thresholds and risk rules.' },
      { title: 'Deploy Role Dashboards', desc: 'Activate dashboards for teachers, principals, districts and ministry.' },
      { title: 'Enable Predictive Intelligence', desc: 'Turn on AI risk scoring and outcome prediction models.' },
    ],
    architecture: [
      { layer: 'Portal Interface', stack: 'Next.js · Role-based UI', desc: 'Teacher, principal, district and ministry dashboards.' },
      { layer: 'Analytics Service', stack: 'NestJS · Apache Kafka', desc: 'Event-driven attendance and performance pipelines.' },
      { layer: 'ML Intelligence', stack: 'Python · scikit-learn · XGBoost', desc: 'Risk scoring and outcome prediction models.' },
      { layer: 'Data Warehouse', stack: 'PostgreSQL · dbt · ClickHouse', desc: 'Long-term institutional analytics storage.' },
      { layer: 'Identity Layer', stack: 'OAuth · SAML · RBAC', desc: 'Ministry-grade access control per institution.' },
    ],
    pricing: [
      {
        name: 'District',
        price: '€1,800',
        cadence: '/month',
        description: 'Single-district deployments for regional education offices.',
        features: ['Up to 50 schools', 'Attendance + performance', 'Role dashboards', 'Standard reports', 'Email support'],
      },
      {
        name: 'Regional Authority',
        price: '€6,500',
        cadence: '/month',
        description: 'Multi-district authorities and large university systems.',
        features: ['Up to 500 institutions', 'Predictive risk scoring', 'Custom KPIs', 'Parent portal', 'API access', 'Priority support'],
        highlighted: true,
      },
      {
        name: 'Ministry Scale',
        price: 'Custom',
        cadence: '',
        description: 'National ministries and cross-border systems.',
        features: ['Unlimited institutions', 'Custom ML models', 'On-prem deployment', 'SLA 99.95%', '24/7 support', 'Data sovereignty options'],
      },
    ],
    caseStudies: [
      { client: 'Nordic Education Authority', region: 'Helsinki Region', metric: '+24%', metricLabel: 'Attendance accuracy', summary: 'Unified 180 schools under a single analytics platform in under 12 weeks.' },
      { client: 'SAEN Universities', region: 'West Africa', metric: '−18%', metricLabel: 'Dropout rate', summary: 'Predictive risk scoring reduced early-semester dropouts across 24 campuses.' },
      { client: 'Gulf Education Ministry', region: 'GCC Region', metric: '1.2M', metricLabel: 'Students tracked', summary: 'Ministry-scale dashboard deployed across 4,000 institutions in 6 months.' },
    ],
    apiEndpoints: [
      { method: 'POST', path: '/v1/institutions', description: 'Register a new school or university into the tenant.' },
      { method: 'GET', path: '/v1/attendance/:schoolId', description: 'Retrieve attendance analytics for a specific school.' },
      { method: 'POST', path: '/v1/analytics/risk-score', description: 'Request AI risk score for a student cohort.' },
      { method: 'GET', path: '/v1/ministry/rollup', description: 'Retrieve national-level performance rollup data.' },
      { method: 'PUT', path: '/v1/curriculum/:id/progress', description: 'Update curriculum progression for a class.' },
    ],
    keyMetrics: [
      { value: '99.9%', label: 'Data accuracy' },
      { value: '< 12 wks', label: 'Ministry deployment time' },
      { value: '4,000+', label: 'Institutions supported' },
      { value: '1.2M', label: 'Students under platform' },
    ],
  },

  govstack: {
    slug: 'govstack',
    name: 'GovStack',
    subtitle: 'Municipal Infrastructure Platform',
    tagline: 'Digital government service infrastructure for cities and regions.',
    description:
      'GovStack powers municipal service coordination platforms supporting permit workflows, transport analytics dashboards, service coverage monitoring and citizen service orchestration.',
    icon: Building2,
    color: '#7C5CE6',
    accentBg: 'bg-violet-50',
    gradient: 'from-[#7C5CE6] to-[#1E6FD9]',
    heroImage: 'https://d64gsuwffb70l.cloudfront.net/69e11d90fabede744a45a3ba_1776361047212_157a0e34.jpg',
    dashboardImage: 'https://d64gsuwffb70l.cloudfront.net/69e11d90fabede744a45a3ba_1776361148730_52effefc.png',
    modules: [
      { title: 'Permit Workflow Engine', desc: 'End-to-end digital permit applications with multi-stage approval chains.' },
      { title: 'Transport Oversight Dashboard', desc: 'Fleet visibility, route monitoring and regulatory compliance analytics.' },
      { title: 'Citizen Service Portal', desc: 'Unified branded portal for citizen requests, status and communication.' },
      { title: 'Service Coverage Analytics', desc: 'Urban service coverage mapping with underserved-zone detection.' },
      { title: 'Multi-Agency Coordination', desc: 'Cross-department task routing, SLAs and accountability dashboards.' },
      { title: 'Smart-City Data Layer', desc: 'IoT integration, sensor telemetry and urban intelligence overlays.' },
    ],
    workflow: [
      { title: 'Configure Service Catalog', desc: 'Define permits, requests and services available to citizens.' },
      { title: 'Map Administrative Structure', desc: 'Configure departments, roles, approval chains and SLAs.' },
      { title: 'Deploy Citizen Portal', desc: 'Launch the branded citizen-facing portal with custom domain.' },
      { title: 'Activate Analytics Layer', desc: 'Enable cross-agency analytics, coverage maps and oversight dashboards.' },
    ],
    architecture: [
      { layer: 'Citizen Portal', stack: 'Next.js · Accessible UI · WCAG AA', desc: 'Branded multi-language citizen interface.' },
      { layer: 'Workflow Engine', stack: 'Camunda · NestJS', desc: 'BPMN-based approval workflows and SLA engine.' },
      { layer: 'Identity Layer', stack: 'OAuth · eIDAS · National ID', desc: 'Government-grade identity and authentication.' },
      { layer: 'Geospatial Engine', stack: 'PostGIS · OpenStreetMap', desc: 'Urban coverage and service zone visualization.' },
      { layer: 'Data Sovereignty', stack: 'On-prem · EU · GCC regions', desc: 'Region-locked deployment options.' },
    ],
    pricing: [
      {
        name: 'Municipal',
        price: '€3,200',
        cadence: '/month',
        description: 'Single city or municipality deployments.',
        features: ['Up to 100k citizens', 'Core permit workflows', 'Citizen portal', 'Basic analytics', 'Standard support'],
      },
      {
        name: 'Metropolitan',
        price: '€9,800',
        cadence: '/month',
        description: 'Large cities and regional authorities.',
        features: ['Up to 2M citizens', 'Multi-agency coordination', 'Transport oversight', 'Smart-city integrations', 'API access', 'Priority support'],
        highlighted: true,
      },
      {
        name: 'National',
        price: 'Custom',
        cadence: '',
        description: 'National-level digital government infrastructure.',
        features: ['Unlimited citizens', 'On-prem deployment', 'Data sovereignty', 'eIDAS / National ID', '24/7 dedicated support', 'Dedicated deployment team'],
      },
    ],
    caseStudies: [
      { client: 'City of Uppsala', region: 'Sweden', metric: '−67%', metricLabel: 'Permit processing time', summary: 'Digitalized 38 permit categories and reduced average processing to 3 days.' },
      { client: 'Dubai Smart Municipality', region: 'UAE', metric: '+94%', metricLabel: 'Citizen satisfaction', summary: 'Launched unified citizen portal handling 2.1M annual service requests.' },
      { client: 'City of Tangier', region: 'Morocco', metric: '−54%', metricLabel: 'Cross-agency delay', summary: 'Cross-department coordination reduced service resolution time.' },
    ],
    apiEndpoints: [
      { method: 'POST', path: '/v1/permits', description: 'Submit a new permit application with attachments.' },
      { method: 'GET', path: '/v1/permits/:id/status', description: 'Track permit approval progress and current stage.' },
      { method: 'POST', path: '/v1/citizens/requests', description: 'File a new citizen service request.' },
      { method: 'GET', path: '/v1/coverage/map', description: 'Retrieve urban service coverage heatmap data.' },
      { method: 'GET', path: '/v1/agencies/:id/sla', description: 'Return SLA performance for a given department.' },
    ],
    keyMetrics: [
      { value: '99.99%', label: 'Platform availability' },
      { value: '< 14 wks', label: 'Municipal deployment' },
      { value: '2M+', label: 'Citizens served per tenant' },
      { value: 'eIDAS', label: 'Identity compliant' },
    ],
  },

  marketstack: {
    slug: 'marketstack',
    name: 'MarketStack',
    subtitle: 'Marketplace Deployment Engine',
    tagline: 'Launch branded multi-vendor marketplaces without engineering teams.',
    description:
      'MarketStack enables deployment of branded service marketplaces supporting vendor coordination, order routing infrastructure, workforce platforms and logistics-enabled digital service ecosystems.',
    icon: Store,
    color: '#E67E1E',
    accentBg: 'bg-orange-50',
    gradient: 'from-[#E67E1E] to-[#0FB5A6]',
    heroImage: 'https://d64gsuwffb70l.cloudfront.net/69e11d90fabede744a45a3ba_1776361027671_eebffd68.jpg',
    dashboardImage: 'https://d64gsuwffb70l.cloudfront.net/69e11d90fabede744a45a3ba_1776361106438_daf08b2d.png',
    modules: [
      { title: 'Multi-Vendor Engine', desc: 'Complete vendor onboarding, product catalogs and tenant isolation.' },
      { title: 'Order Routing Infrastructure', desc: 'Intelligent order splitting, assignment and fulfillment coordination.' },
      { title: 'Payment Orchestration', desc: 'Multi-provider payment routing with splits, escrow and payouts.' },
      { title: 'Workforce Platform', desc: 'Gig-worker coordination with assignments, ratings and earnings.' },
      { title: 'Vendor Analytics', desc: 'Per-vendor performance dashboards with leaderboards and KPIs.' },
      { title: 'White-Label Mobile', desc: 'Branded customer and vendor mobile apps on iOS and Android.' },
    ],
    workflow: [
      { title: 'Choose Marketplace Template', desc: 'Select delivery, services, workforce or multi-category template.' },
      { title: 'Configure Branding & Domain', desc: 'Apply your brand, logo, domain and payment providers.' },
      { title: 'Onboard Vendors', desc: 'Invite vendors and configure commissions, splits and categories.' },
      { title: 'Launch Apps & Portal', desc: 'Deploy branded web, customer app and vendor app in one week.' },
    ],
    architecture: [
      { layer: 'Storefronts', stack: 'Next.js · React Native · Tenant UI', desc: 'Web portal and native mobile apps with white-label theming.' },
      { layer: 'Marketplace Core', stack: 'NestJS · Event sourcing', desc: 'Orders, inventory, vendor and commission engine.' },
      { layer: 'Payment Layer', stack: 'Stripe Connect · Adyen · MangoPay', desc: 'Multi-provider payment routing and escrow.' },
      { layer: 'Logistics Layer', stack: 'FlyttGo Dispatch API', desc: 'Optional integration with FlyttGo dispatch engine.' },
      { layer: 'Data & Analytics', stack: 'PostgreSQL · ClickHouse', desc: 'Vendor, customer and transaction analytics.' },
    ],
    pricing: [
      {
        name: 'Launch',
        price: '€1,200',
        cadence: '/month',
        description: 'Early-stage marketplace founders.',
        features: ['Up to 50 vendors', 'Web + customer app', 'Standard payments', 'Basic analytics', 'Community support'],
      },
      {
        name: 'Scale',
        price: '€4,900',
        cadence: '/month',
        description: 'Growing marketplaces scaling vendors and regions.',
        features: ['Up to 1,000 vendors', 'Vendor + customer apps', 'Multi-payment routing', 'Workforce module', 'API access', 'Priority support'],
        highlighted: true,
      },
      {
        name: 'Ecosystem',
        price: 'Custom',
        cadence: '',
        description: 'Enterprise marketplaces and multi-region operators.',
        features: ['Unlimited vendors', 'Multi-region deployment', 'Custom integrations', 'SLA 99.95%', 'Dedicated CSM', 'On-prem option'],
      },
    ],
    caseStudies: [
      { client: 'HaulPro Marketplace', region: 'Berlin', metric: '4 weeks', metricLabel: 'To launch', summary: 'Full branded moving-service marketplace launched in under one month.' },
      { client: 'ServiGo', region: 'Lisbon', metric: '+220%', metricLabel: 'Vendor onboarding', summary: 'Scaled from 40 to 900 service vendors in a single quarter.' },
      { client: 'LaborConnect', region: 'Nairobi', metric: '12k', metricLabel: 'Active workers', summary: 'Workforce platform connecting verified workers with employers.' },
    ],
    apiEndpoints: [
      { method: 'POST', path: '/v1/vendors', description: 'Onboard a new vendor into the marketplace.' },
      { method: 'POST', path: '/v1/orders', description: 'Create a customer order across one or many vendors.' },
      { method: 'POST', path: '/v1/payments/split', description: 'Execute a commission-split payment transaction.' },
      { method: 'GET', path: '/v1/vendors/:id/analytics', description: 'Retrieve performance analytics for a vendor.' },
      { method: 'PUT', path: '/v1/catalog/:id', description: 'Update a product or service listing.' },
    ],
    keyMetrics: [
      { value: '4 wks', label: 'Fastest launch recorded' },
      { value: '99.95%', label: 'Payment uptime' },
      { value: '1,000+', label: 'Vendors per tenant' },
      { value: '6', label: 'Payment providers supported' },
    ],
  },

  fleetstack: {
    slug: 'fleetstack',
    name: 'FleetStack',
    subtitle: 'Fleet Intelligence Platform',
    tagline: 'Enterprise fleet analytics, telemetry and operations intelligence.',
    description:
      'FleetStack enables enterprise fleet analytics environments supporting vehicle telemetry tracking, route optimization intelligence, operations performance monitoring and logistics analytics dashboards.',
    icon: Radar,
    color: '#0A3A6B',
    accentBg: 'bg-slate-100',
    gradient: 'from-[#0A1F3D] to-[#0A3A6B]',
    heroImage: 'https://d64gsuwffb70l.cloudfront.net/69e11d90fabede744a45a3ba_1776361070291_5b36825e.png',
    dashboardImage: 'https://d64gsuwffb70l.cloudfront.net/69e11d90fabede744a45a3ba_1776361106438_daf08b2d.png',
    modules: [
      { title: 'Vehicle Telemetry', desc: 'Real-time GPS, fuel, engine and driver behavior data ingestion.' },
      { title: 'Route Optimization', desc: 'Multi-vehicle route planning with traffic and SLA awareness.' },
      { title: 'Fleet Heatmaps', desc: 'Visual fleet distribution, utilization and coverage analytics.' },
      { title: 'Operations KPIs', desc: 'Completion rates, utilization, dwell time and efficiency indicators.' },
      { title: 'Maintenance Intelligence', desc: 'Predictive maintenance scheduling based on telemetry and mileage.' },
      { title: 'Driver Performance', desc: 'Safety scoring, training flags and rewards leaderboards.' },
    ],
    workflow: [
      { title: 'Connect Telemetry Devices', desc: 'Integrate GPS, OBD-II or OEM APIs from your fleet hardware.' },
      { title: 'Configure Territories', desc: 'Define regions, routes and operational performance goals.' },
      { title: 'Activate Dashboards', desc: 'Enable fleet manager, operator and executive dashboards.' },
      { title: 'Enable Predictive Engine', desc: 'Turn on ML-based maintenance and driver-scoring models.' },
    ],
    architecture: [
      { layer: 'Fleet Dashboards', stack: 'Next.js · Realtime charts', desc: 'Operator, manager and executive dashboards.' },
      { layer: 'Telemetry Ingest', stack: 'MQTT · Kafka · NestJS', desc: 'High-throughput vehicle event ingestion.' },
      { layer: 'Routing Service', stack: 'Valhalla · Custom optimizer', desc: 'Multi-vehicle route optimization engine.' },
      { layer: 'Time-Series Store', stack: 'TimescaleDB · ClickHouse', desc: 'Historical telemetry and analytics.' },
      { layer: 'ML Pipeline', stack: 'Python · PyTorch', desc: 'Maintenance prediction and driver scoring.' },
    ],
    pricing: [
      {
        name: 'Operator',
        price: '€14',
        cadence: '/vehicle/month',
        description: 'Small and mid-size fleet operators.',
        features: ['Up to 100 vehicles', 'Real-time tracking', 'Basic KPIs', 'Manager dashboard', 'Email support'],
      },
      {
        name: 'Enterprise',
        price: '€9',
        cadence: '/vehicle/month',
        description: 'Large enterprise fleets and logistics corporations.',
        features: ['100–2,000 vehicles', 'Route optimization', 'Predictive maintenance', 'Driver scoring', 'API access', 'Priority support'],
        highlighted: true,
      },
      {
        name: 'Infrastructure',
        price: 'Custom',
        cadence: '',
        description: 'National fleets, regulators and multi-region enterprises.',
        features: ['2,000+ vehicles', 'Multi-tenant architecture', 'Custom ML models', 'SLA 99.95%', 'On-prem option', 'Dedicated CSM'],
      },
    ],
    caseStudies: [
      { client: 'Volvo Logistics EU', region: 'Gothenburg', metric: '−19%', metricLabel: 'Fuel cost', summary: 'Predictive routing and driver scoring across 1,200 vehicles.' },
      { client: 'PanAfrica Freight', region: 'Lagos–Accra corridor', metric: '+34%', metricLabel: 'Fleet utilization', summary: 'Multi-country dispatch for 480 long-haul vehicles.' },
      { client: 'Gulf Logistics Authority', region: 'UAE', metric: '99.2%', metricLabel: 'Compliance visibility', summary: 'Regulator-scale oversight platform monitoring commercial transport.' },
    ],
    apiEndpoints: [
      { method: 'POST', path: '/v1/vehicles', description: 'Register a vehicle with telemetry device ID.' },
      { method: 'POST', path: '/v1/telemetry/ingest', description: 'Ingest real-time telemetry events (MQTT alternative).' },
      { method: 'GET', path: '/v1/fleet/kpis', description: 'Return fleet-wide operational KPIs for a period.' },
      { method: 'POST', path: '/v1/routing/plan', description: 'Generate optimized routes for a set of vehicles.' },
      { method: 'GET', path: '/v1/drivers/:id/score', description: 'Retrieve driver performance and safety score.' },
    ],
    keyMetrics: [
      { value: '99.95%', label: 'Telemetry uptime' },
      { value: '2,000+', label: 'Vehicles per tenant' },
      { value: '−19%', label: 'Avg fuel cost reduction' },
      { value: '< 6 wks', label: 'Enterprise onboarding' },
    ],
  },
};

export const platformList = Object.values(platforms);
