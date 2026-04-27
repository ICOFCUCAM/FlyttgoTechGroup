import { CloudCog, ServerCog, ShieldCheck, type LucideIcon } from 'lucide-react';

export type DeploymentMode = {
  slug: string;
  name: string;
  eyebrow: string;
  headline: string;
  description: string;
  icon: LucideIcon;
  accent: string;
  characteristics: { label: string; value: string }[];
  bestFor: string[];
  timeline: string;
  regions: string[];
};

export const deploymentModes: DeploymentMode[] = [
  {
    slug: 'managed',
    name: 'FlyttGo-managed',
    eyebrow: 'Managed SaaS',
    headline: 'Fully managed platform infrastructure, region-aware.',
    description:
      'Production-ready tenants on FlyttGo infrastructure. We operate the platform layer end to end — scaling, patching, monitoring, incident response — so your team focuses on program execution.',
    icon: CloudCog,
    accent: '#1E6FD9',
    characteristics: [
      { label: 'Hosting', value: 'FlyttGo-operated cloud (EU primary; regional extensions)' },
      { label: 'Operations', value: 'FlyttGo 24/7 SOC + platform SRE' },
      { label: 'Data residency', value: 'Per-region tenants with data-locality guarantees' },
      { label: 'Customisation', value: 'Configuration + tenant branding; code extensions on roadmap' },
      { label: 'Time to production', value: '60–90 days' },
    ],
    bestFor: [
      'Operators who want to validate quickly and scale later',
      'Enterprises without a dedicated platform SRE team',
      'Marketplace builders in launch and growth phases',
    ],
    timeline: '60–90 days · Discovery → tenant provisioning → integration → go-live',
    regions: ['EU (primary)', 'MENA (dedicated)', 'AF (on request)'],
  },
  {
    slug: 'customer-cloud',
    name: 'Customer cloud',
    eyebrow: 'Cloud BYO',
    headline: 'Run FlyttGo inside your AWS, Azure or GCP tenancy.',
    description:
      'Ideal for enterprises with existing cloud commitments and security teams. FlyttGo platforms are deployed as infrastructure-as-code modules inside your account, integrated with your IAM, SIEM and key management.',
    icon: ServerCog,
    accent: '#0FB5A6',
    characteristics: [
      { label: 'Hosting', value: 'Your AWS / Azure / GCP account' },
      { label: 'Operations', value: 'Shared — FlyttGo platform team + your SRE' },
      { label: 'Data residency', value: 'Follows your account / region config' },
      { label: 'Customisation', value: 'Full IaC + extension points' },
      { label: 'Time to production', value: '75–120 days' },
    ],
    bestFor: [
      'Enterprises with active cloud commitments (EDPs, MACCs)',
      'Regulated operators with strong internal security teams',
      'Customers migrating off bespoke in-house builds',
    ],
    timeline: '75–120 days · Security review → IaC deployment → IAM/SIEM integration → go-live',
    regions: ['Any region supported by your cloud provider'],
  },
  {
    slug: 'sovereign',
    name: 'Sovereign datacenter',
    eyebrow: 'Sovereign',
    headline: 'Self-hosted in national datacenters for public-sector procurement.',
    description:
      'For ministries, agencies and regulated industries that require sovereign hosting. FlyttGo platforms deploy inside certified national datacenters with full air-gap and national key management.',
    icon: ShieldCheck,
    accent: '#7C5CE6',
    characteristics: [
      { label: 'Hosting', value: 'National datacenter (customer-selected)' },
      { label: 'Operations', value: 'Customer SRE with FlyttGo remote support (option)' },
      { label: 'Data residency', value: 'In-country, in-jurisdiction, optionally air-gapped' },
      { label: 'Customisation', value: 'Full source + extension points under licence' },
      { label: 'Time to production', value: '120–180 days' },
    ],
    bestFor: [
      'Ministries and national agencies',
      'Regulated industries with strict residency / sovereignty posture',
      'Cross-border freight & identity programmes',
    ],
    timeline: '120–180 days · Procurement → datacenter enablement → hardening → go-live',
    regions: ['EU member states', 'UK', 'GCC', 'Select African national datacenters'],
  },
];

export const deploymentModeBySlug: Record<string, DeploymentMode> = Object.fromEntries(
  deploymentModes.map((m) => [m.slug, m]),
);
