import { z } from 'zod';

export const DEPLOYMENT_TYPES = [
  'White-Label Deployment',
  'Government / Municipal Platform',
  'Enterprise Fleet Intelligence',
  'Education Analytics Platform',
  'Marketplace Deployment Engine',
  'Investor / Partnership',
  'General Inquiry',
] as const;

export type DeploymentType = (typeof DEPLOYMENT_TYPES)[number];

export const INSTITUTION_TYPES = [
  'Ministry',
  'Municipality',
  'University',
  'Transport authority',
  'Enterprise operator',
  'Marketplace operator',
] as const;
export type InstitutionType = (typeof INSTITUTION_TYPES)[number];

export const DEPLOYMENT_OBJECTIVES = [
  'Mobility coordination',
  'Payments infrastructure',
  'Government services',
  'Education platforms',
  'Workforce coordination',
  'Identity infrastructure',
  'Multi-platform rollout',
] as const;
export type DeploymentObjective = (typeof DEPLOYMENT_OBJECTIVES)[number];

export const DEPLOYMENT_SCALES = [
  'Pilot',
  'City rollout',
  'Regional rollout',
  'National rollout',
  'Cross-border rollout',
] as const;
export type DeploymentScale = (typeof DEPLOYMENT_SCALES)[number];

export const DEPLOYMENT_TIMELINES = [
  '0–3 months',
  '3–6 months',
  '6–12 months',
  '12+ months',
] as const;
export type DeploymentTimeline = (typeof DEPLOYMENT_TIMELINES)[number];

/**
 * Canonical contact payload shared by the marketing contact form and the
 * platform-specific deployment forms. Mirrors the `deployment_leads`
 * table columns.
 */
export const contactInputSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your full name.').max(120),
  email: z.string().trim().email('Please enter a valid work email.').max(200),
  company: z.string().trim().max(160).optional().or(z.literal('').transform(() => undefined)),
  country: z.string().trim().max(80).optional().or(z.literal('').transform(() => undefined)),
  deployment_type: z.enum(DEPLOYMENT_TYPES).optional(),
  message: z.string().trim().max(4000).optional().or(z.literal('').transform(() => undefined)),
  // Honeypot: submitted only by bots. Must be empty.
  website: z.string().max(0).optional(),
  // Cloudflare Turnstile token. Only verified server-side when
  // TURNSTILE_SECRET_KEY is set; omitted in development.
  turnstile_token: z.string().max(2048).optional(),
  // Multi-step deployment intake fields. The intake wizard collapses
  // these into the message body before submit, so the legacy
  // deployment_leads schema doesn't need to change — but the API can
  // still surface them in the notification email when present.
  institution: z.enum(INSTITUTION_TYPES).optional(),
  objective: z.enum(DEPLOYMENT_OBJECTIVES).optional(),
  scale: z.enum(DEPLOYMENT_SCALES).optional(),
  timeline: z.enum(DEPLOYMENT_TIMELINES).optional(),
});

export type ContactInput = z.infer<typeof contactInputSchema>;
