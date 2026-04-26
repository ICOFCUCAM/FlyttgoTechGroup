import type { ReactNode } from 'react';

export type FaqEntry = {
  /** Engineering identifier — used to anchor / index the entry. */
  code: string;
  q: string;
  /** Renderer takes the parent route as a hint so links can adapt. */
  a: () => ReactNode;
};

/**
 * Procurement-FAQ source. Lives in src/data so the homepage and any
 * future per-deployment-mode FAQ surface can render the same set
 * without copy drift, and so the JSON-LD FAQPage emitter has a
 * single source of truth.
 */
export const PROCUREMENT_FAQ: FaqEntry[] = [
  {
    code: 'FQ.01',
    q: 'How long does a platform deployment typically take?',
    a: () =>
      'A standard FlyttGo deployment goes from procurement sign-off to a production-ready tenant in 60–120 days, depending on deployment mode. Sovereign datacenter installations add 30–60 days for network and hardware provisioning.',
  },
  {
    code: 'FQ.02',
    q: 'Can we host FlyttGo platforms inside our own cloud tenancy?',
    a: () =>
      'Yes. Every platform supports three deployment modes: FlyttGo-managed SaaS, customer cloud (AWS, Azure or GCP under your account), and sovereign national datacenters for public-sector procurement. Data residency is enforced per deployment.',
  },
  {
    code: 'FQ.03',
    q: 'Which certifications and compliance frameworks do you support?',
    a: () =>
      'Platforms are engineered against SOC 2 Type II, ISO 27001, GDPR and WCAG 2.1 AA. Regulated verticals (payments, identity, government) layer additional controls — PSD2, eIDAS, PCI-DSS — as needed per jurisdiction.',
  },
  {
    code: 'FQ.04',
    q: 'Can we deploy only one module, or do we have to take the full suite?',
    a: () =>
      'Modules are independent. Most operators start with one or two (e.g. Transify for mobility + Identra for auth) and add the rest as program requirements grow. Each module is licensed per deployment, per region.',
  },
  {
    code: 'FQ.05',
    q: 'How is multi-tenancy isolated between customer deployments?',
    a: () =>
      'Every tenant runs on a dedicated schema with region-scoped encryption keys, tenant-level audit trails and RBAC boundaries enforced at the API gateway. Sovereign deployments can be fully air-gapped.',
  },
  {
    code: 'FQ.06',
    q: 'Do you integrate with our existing identity and payment providers?',
    a: () =>
      'Yes — SAML 2.0, OIDC, LDAP and national eID schemes are supported through Identra. Payvera supports Stripe, Adyen, PayPal, SEPA and national payment rails. Integration scoping is part of the initial deployment workshop.',
  },
];

/**
 * Plain-string view of each entry — used for JSON-LD FAQPage payload
 * and any non-React surface (RSS, search index, AI agents).
 */
export const PROCUREMENT_FAQ_PLAIN: { code: string; q: string; a: string }[] =
  PROCUREMENT_FAQ.map((e) => ({
    code: e.code,
    q: e.q,
    a: typeof e.a() === 'string' ? (e.a() as string) : '',
  }));
