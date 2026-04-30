import { z } from 'zod';

/**
 * Single source of truth for the consultation-booking taxonomy.
 * Used by the wizard component (label rendering) and the API route
 * (validation). Codes are stable; adding a new entry is additive —
 * just add a row, no DB migration required.
 */

// --- Organization types (Step 1) ----------------------------------------

export const ORG_TYPES = [
  { code: 'ORG.01', label: 'Individual provider',     context: 'Driver · packing team · independent operator' },
  { code: 'ORG.02', label: 'Relocation company',      context: 'Moving company · packing service · storage partner' },
  { code: 'ORG.03', label: 'Enterprise client',       context: 'Corporation · multi-site operator' },
  { code: 'ORG.04', label: 'University',              context: 'Higher education · research institution' },
  { code: 'ORG.05', label: 'Municipality',            context: 'City · council · municipal modernisation programme' },
  { code: 'ORG.06', label: 'Government ministry',     context: 'Central digitalisation · sectoral ministry' },
  { code: 'ORG.07', label: 'Transport authority',     context: 'Public transport · rail · ports · regional mobility' },
] as const;

export type OrgCode = (typeof ORG_TYPES)[number]['code'];

// --- Consultation purposes (Step 2) -------------------------------------

export const PURPOSES = [
  { code: 'CP.01', label: 'Platform architecture planning',   context: 'System design · deployment posture · integration scope' },
  { code: 'CP.02', label: 'Marketplace onboarding',           context: 'Provider onboarding · compliance · service integration' },
  { code: 'CP.03', label: 'Pilot deployment discussion',      context: 'Pilot rollout · deployment-mode selection · data governance' },
  { code: 'CP.04', label: 'Enterprise rollout setup',         context: 'Tenant setup · workflow configuration · routing rules' },
  { code: 'CP.05', label: 'Integration consultation',         context: 'Existing-system integration · API anchors · identity federation' },
] as const;

export type PurposeCode = (typeof PURPOSES)[number]['code'];

// --- Consultation types (derived from purpose) --------------------------

export const CONSULTATION_TYPES = [
  { code: 'CT.01', label: 'Platform Architecture Session',           color: '#1E6FD9' },
  { code: 'CT.02', label: 'Marketplace Provider Onboarding Session', color: '#0FB5A6' },
  { code: 'CT.03', label: 'Government Pilot Deployment Session',     color: '#7C5CE6' },
  { code: 'CT.04', label: 'Enterprise Relocation Programme Setup',   color: '#D6B575' },
] as const;

export type ConsultationTypeCode = (typeof CONSULTATION_TYPES)[number]['code'];

// Purpose → consultation-type mapping. Stable per the spec.
export function consultationTypeForPurpose(purpose: PurposeCode): ConsultationTypeCode {
  switch (purpose) {
    case 'CP.02': return 'CT.02';
    case 'CP.03': return 'CT.03';
    case 'CP.04': return 'CT.04';
    case 'CP.01':
    case 'CP.05':
    default:      return 'CT.01';
  }
}

// --- Regions (Step 3) ---------------------------------------------------

export const REGIONS = [
  { code: 'RG.US', label: 'United States',     sub: 'Primary NA region' },
  { code: 'RG.EU', label: 'Europe',            sub: 'GDPR baseline · primary EU region' },
  { code: 'RG.UK', label: 'United Kingdom',    sub: 'GBP zone · UK GDPR' },
  { code: 'RG.NO', label: 'Norway / Nordics',  sub: 'NO · SE · DK · FI · IS' },
  { code: 'RG.CA', label: 'Canada',            sub: 'PIPEDA · provincial residency optional' },
  { code: 'RG.AF', label: 'Africa',            sub: 'East · West · Southern Africa' },
  { code: 'RG.GL', label: 'Global deployment', sub: 'Multi-region · cross-border programme' },
] as const;

export type RegionCode = (typeof REGIONS)[number]['code'];

// --- Deployment models (Step 4) -----------------------------------------

export const DEPLOYMENT_MODELS = [
  { code: 'DM.01', label: 'Managed SaaS',              sub: 'FlyttGo-managed regional tenants' },
  { code: 'DM.02', label: 'Dedicated Tenant SaaS',     sub: 'Isolated tenant · dedicated resources' },
  { code: 'DM.OR', label: 'Platform Integration',      sub: 'FlyttGoTech Core orchestration substrate' },
  { code: 'DM.03', label: 'Sovereign Deployment',      sub: 'National datacenter · national HSM · regulator-bounded' },
] as const;

export type DeploymentModelCode = (typeof DEPLOYMENT_MODELS)[number]['code'];

// --- Architecture levels (auto-suggested from org type) -----------------

export const ARCH_LEVELS = [
  { code: 'L.01', label: 'Digital Presence Website' },
  { code: 'L.02', label: 'Professional Business Website' },
  { code: 'L.03', label: 'Smart Interactive Platform' },
  { code: 'L.04', label: 'Enterprise Operations Platform' },
  { code: 'L.05', label: 'National Institutional Platform' },
  { code: 'L.06', label: 'Platform Ecosystem Infrastructure' },
] as const;

export type ArchLevelCode = (typeof ARCH_LEVELS)[number]['code'];

// Suggested architecture tier per organisation type. Visitor can
// override; this is the default surfaced on the confirmation panel.
export function suggestedLevelFor(org: OrgCode): ArchLevelCode {
  switch (org) {
    case 'ORG.01': return 'L.02';  // Individual provider
    case 'ORG.02': return 'L.03';  // Relocation company
    case 'ORG.03': return 'L.04';  // Enterprise client
    case 'ORG.04': return 'L.04';  // University
    case 'ORG.05': return 'L.05';  // Municipality
    case 'ORG.06': return 'L.05';  // Government ministry
    case 'ORG.07': return 'L.05';  // Transport authority
  }
}

// --- Preparation brief (post-confirmation surface) ----------------------

export const PREP_BRIEF: Record<ConsultationTypeCode, { title: string; items: string[] }> = {
  'CT.01': {
    title: 'Platform architecture preparation',
    items: [
      'Programme objectives and target user populations',
      'Existing systems to integrate (identity, payments, data lakes)',
      'Deployment timeline expectations and procurement cadence',
      'Data-residency and regulatory constraints applicable to the programme',
      'Capacity expectations (active users, transactions per second, storage)',
    ],
  },
  'CT.02': {
    title: 'Marketplace onboarding preparation',
    items: [
      'Operating licences and registrations (per jurisdiction served)',
      'Vehicle / asset register (type, capacity, certifications)',
      'Service coverage areas and operating windows',
      'Capacity (drivers / packers / storage units) and seasonal variance',
      'Preferred payment-receipt method and bank-account routing',
    ],
  },
  'CT.03': {
    title: 'Government pilot preparation',
    items: [
      'Pilot scope and intended decision moment (go/no-go criteria)',
      'Regulatory anchors (eIDAS / GDPR / sectoral law) the pilot must honour',
      'Data-residency requirement and sovereignty posture',
      'Integration anchors (existing eID, payment rails, registries)',
      'Audit cadence expected by the recipient or its national audit office',
    ],
  },
  'CT.04': {
    title: 'Enterprise relocation programme preparation',
    items: [
      'Mobility / HR scope (annual relocations, regions served)',
      'Provider routing rules (preferred providers, exclusion lists)',
      'Workflow approval chain (initiator → HR → finance → vendor)',
      'Tenant scale and integration anchors (HRIS, finance ERP)',
      'Audit posture and exportable reporting requirements',
    ],
  },
};

// --- Zod schema (used by the API route) ---------------------------------

export const orgSchema = z.enum(ORG_TYPES.map((o) => o.code) as [OrgCode, ...OrgCode[]]);
export const purposeSchema = z.enum(PURPOSES.map((p) => p.code) as [PurposeCode, ...PurposeCode[]]);
export const regionSchema = z.enum(REGIONS.map((r) => r.code) as [RegionCode, ...RegionCode[]]);
export const deploymentSchema = z.enum(DEPLOYMENT_MODELS.map((d) => d.code) as [DeploymentModelCode, ...DeploymentModelCode[]]);
export const archLevelSchema = z.enum(ARCH_LEVELS.map((a) => a.code) as [ArchLevelCode, ...ArchLevelCode[]]);

export const consultationInputSchema = z.object({
  organization_type:    orgSchema,
  organization_name:    z.string().trim().max(200).optional(),
  consultation_purpose: purposeSchema,
  deployment_region:    regionSchema,
  deployment_model:     deploymentSchema,
  architecture_level:   archLevelSchema,
  requested_time:       z.string().datetime(),
  requested_timezone:   z.string().min(1).max(80),
  contact_name:         z.string().trim().min(2).max(120),
  contact_email:        z.string().trim().email().max(200),
  contact_role:         z.string().trim().max(120).optional(),
  notes:                z.string().trim().max(2000).optional(),
});

export type ConsultationInput = z.infer<typeof consultationInputSchema>;

// --- Display helpers ----------------------------------------------------

export function lookupLabel<
  T extends { code: string; label: string },
>(list: readonly T[], code: string): string {
  return list.find((x) => x.code === code)?.label ?? code;
}
