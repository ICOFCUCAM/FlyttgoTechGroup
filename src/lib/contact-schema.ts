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
});

export type ContactInput = z.infer<typeof contactInputSchema>;
