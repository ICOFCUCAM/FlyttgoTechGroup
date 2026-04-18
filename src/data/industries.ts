import {
  Bus,
  Building2,
  GraduationCap,
  Landmark,
  ShoppingBag,
  Truck,
  type LucideIcon,
} from 'lucide-react';

export type IndustrySector = {
  slug: string;
  name: string;
  eyebrow: string;
  headline: string;
  description: string;
  icon: LucideIcon;
  accent: string;
  platforms: string[]; // platform slugs most relevant to this sector
  challenges: string[];
  outcomes: string[];
  deploymentNote: string;
};

export const industrySectors: IndustrySector[] = [
  {
    slug: 'government',
    name: 'Government & Municipal',
    eyebrow: 'Public Sector',
    headline: 'Deploy citizen-facing services and municipal coordination on sovereign infrastructure.',
    description:
      'Ministries, agencies and municipalities use FlyttGo to deploy permit workflows, citizen dashboards, identity verification and cross-agency coordination — inside sovereign national datacenters when required.',
    icon: Landmark,
    accent: '#7C5CE6',
    platforms: ['civitas', 'identra', 'payvera'],
    challenges: [
      'Legacy systems with no interoperability layer between ministries',
      'Manual permit workflows that keep citizens waiting weeks',
      'Data residency and sovereignty constraints',
      'Procurement cycles measured in years, not months',
    ],
    outcomes: [
      'Modular Civitas tenant per agency, with shared Identra identity layer',
      'Permit-to-issue cycle measured in days instead of weeks',
      'Sovereign hosting inside national datacenters with full audit trail',
      'Framework-compatible procurement through multi-year Order Forms',
    ],
    deploymentNote: 'Sovereign national datacenter or customer-cloud with data residency enforcement.',
  },
  {
    slug: 'education',
    name: 'Education & Ministries',
    eyebrow: 'Education Systems',
    headline: 'Admissions, scholarships and institutional analytics for universities and ministries.',
    description:
      'Education ministries and universities use FlyttGo to run admissions, scholarships, institutional analytics and student services — deployed as a tenant-isolated education intelligence platform.',
    icon: GraduationCap,
    accent: '#5EEAD4',
    platforms: ['edupro', 'identra', 'payvera'],
    challenges: [
      'Siloed admissions, registrar and finance systems across institutions',
      'Paper-heavy scholarship workflows and eligibility reviews',
      'No shared analytics layer for ministry-level oversight',
      'Student authentication fragmented across dozens of local IdPs',
    ],
    outcomes: [
      'EduPro admissions and scholarship workflows under ministry control',
      'Institutional analytics rolled up to the ministry dashboard',
      'Identra national student ID federation across universities',
      'Payvera handles tuition, scholarships and stipends on one rail',
    ],
    deploymentNote: 'Customer cloud or managed EU deployment with ministry-level tenancy.',
  },
  {
    slug: 'transport',
    name: 'Transport & Logistics',
    eyebrow: 'Mobility & Freight',
    headline: 'Fleet intelligence, dispatch and regional mobility coordination.',
    description:
      'Transport authorities, enterprise fleets and freight operators use FlyttGo to coordinate dispatch, routing, telematics and driver operations — at the scale of cities, ports and national networks.',
    icon: Bus,
    accent: '#60A5FA',
    platforms: ['transify', 'workverge', 'identra'],
    challenges: [
      'Fragmented fleet telematics across depots and subcontractors',
      'Poor visibility into live routes and operator behaviour',
      'Compliance reporting that eats days of manual work',
      'Workforce certification tracking spread across spreadsheets',
    ],
    outcomes: [
      'Transify dispatch with live telemetry and routing optimisation',
      'Workverge handles driver onboarding, certification and shift ops',
      'Unified compliance view for transport authorities',
      'Ready integrations with national permit and tax systems',
    ],
    deploymentNote: 'Managed SaaS or customer cloud — region-aware, low-latency ingress.',
  },
  {
    slug: 'enterprise',
    name: 'Enterprise Operations',
    eyebrow: 'Enterprise Fleets & Platforms',
    headline: 'Operational platforms for enterprise fleets, field workforces and internal marketplaces.',
    description:
      'Enterprises use FlyttGo to deploy internal platforms — field workforce coordination, internal service marketplaces, fleet intelligence and payment orchestration — on their own cloud tenancy.',
    icon: Building2,
    accent: '#1E6FD9',
    platforms: ['transify', 'workverge', 'payvera', 'ledgera'],
    challenges: [
      'Every new operational capability requires a bespoke build',
      'Finance and operations data sit in different systems',
      'Vendor sprawl across logistics, workforce and payment tools',
      'Limited visibility into cross-BU operational spend',
    ],
    outcomes: [
      'Transify + Workverge as the operational backbone across BUs',
      'Payvera + Ledgera give finance real-time operational P&L',
      'Customer-cloud deployment inside existing AWS/Azure/GCP tenancy',
      'One vendor relationship, one SLA, one security review',
    ],
    deploymentNote: 'Customer cloud under your AWS, Azure or GCP account — integrated with your IAM.',
  },
  {
    slug: 'marketplaces',
    name: 'Marketplace Operators',
    eyebrow: 'Regulated Marketplaces',
    headline: 'Launch and run regulated, multi-sided marketplaces on proven infrastructure.',
    description:
      'Marketplace operators — mobility, services, logistics — use FlyttGo to launch, scale and regulate multi-sided platforms without building identity, payments and dispatch from scratch.',
    icon: ShoppingBag,
    accent: '#F5B547',
    platforms: ['flyttgo', 'transify', 'identra', 'payvera'],
    challenges: [
      'Years-long build to get identity, payments and dispatch right',
      'Regulator alignment across regions and verticals',
      'KYC/KYB and driver compliance operations',
      'Financial reconciliation across payouts, taxes and commissions',
    ],
    outcomes: [
      'FlyttGo marketplace engine on top of Transify mobility infrastructure',
      'Identra handles KYC/KYB, Payvera handles orchestration + payouts',
      'Ledgera closes the loop with compliance-ready financial operations',
      'Ship to the first region in months, not years',
    ],
    deploymentNote: 'Managed SaaS to start; migrate to customer cloud or sovereign as you scale.',
  },
  {
    slug: 'logistics',
    name: 'Freight & Logistics Networks',
    eyebrow: 'Freight Corridors',
    headline: 'Freight corridor coordination across ports, inland hubs and cross-border networks.',
    description:
      'Freight and logistics network operators use FlyttGo to coordinate port-to-inland movements, customs and compliance events, and operator workforces across national and cross-border corridors.',
    icon: Truck,
    accent: '#2DD4BF',
    platforms: ['transify', 'workverge', 'civitas'],
    challenges: [
      'Limited visibility from port to inland consignee',
      'Manual customs and compliance handovers',
      'Driver shortages that require rapid workforce redistribution',
      'Cross-border regulatory mismatches',
    ],
    outcomes: [
      'Transify freight mode with multi-stop, cross-border routing',
      'Civitas exposes customs and regulatory touchpoints as workflows',
      'Workverge handles operator rotation across corridors',
      'Real-time corridor dashboards for authority oversight',
    ],
    deploymentNote: 'Typically sovereign or customer cloud for regulated cross-border data.',
  },
];

export const industryBySlug: Record<string, IndustrySector> = Object.fromEntries(
  industrySectors.map((s) => [s.slug, s]),
);
