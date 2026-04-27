import React from 'react';
import Link from '@/components/flytt/LocaleLink';
import {
  ServerCog,
  CloudCog,
  Cpu,
  ShieldCheck,
  Building2,
  Landmark,
  ArrowUpRight,
} from 'lucide-react';

/**
 * Service-models surface — IaaS · SaaS · PaaS · Sovereign.
 *
 * Sits high on the home page (between the regions strip and the
 * orchestration core) so the four service-model surfaces FlyttGo
 * delivers are explicit, not buried inside deployment-mode language.
 * Mirrors the audience split — every model serves both enterprises
 * and the public sector, with audience tags per row.
 *
 * This section closes the "site reads as government-only" gap the
 * earlier audit surfaced.
 */

type ServiceModel = {
  code: string;
  abbr: 'IaaS' | 'SaaS' | 'PaaS' | 'Sovereign';
  icon: typeof ServerCog;
  accent: string;
  title: string;
  body: string;
  audiences: Array<{ icon: typeof Building2; label: string }>;
  examples: string[];
  cta: { label: string; href: string };
};

const MODELS: ServiceModel[] = [
  {
    code: 'SM.01',
    abbr: 'IaaS',
    icon: ServerCog,
    accent: '#1E6FD9',
    title: 'Infrastructure as a Service',
    body: 'Tenant-isolated compute, storage and network primitives running inside your AWS · Azure · GCP account. You own the substrate; FlyttGo orchestrates the workloads on top.',
    audiences: [
      { icon: Building2, label: 'Enterprises' },
      { icon: Landmark, label: 'Public sector' },
    ],
    examples: [
      'Customer-cloud deployment (DM.02)',
      'Per-tenant VPC + IAM',
      'Region-aware data residency',
      'BYO key management (HSM-backed)',
    ],
    cta: { label: 'Customer-cloud deployment', href: '/deployment/customer-cloud' },
  },
  {
    code: 'SM.02',
    abbr: 'SaaS',
    icon: CloudCog,
    accent: '#0FB5A6',
    title: 'Software as a Service',
    body: 'FlyttGo-managed multi-tenant platforms across primary regions. Fastest path to production — sign in, configure, deploy. Mostly chosen by SaaS-native enterprises and rapid-pilot programmes.',
    audiences: [
      { icon: Building2, label: 'Enterprises' },
      { icon: Landmark, label: 'Municipalities + agencies' },
    ],
    examples: [
      'FlyttGo-managed deployment (DM.01)',
      'NA · EU · APAC primary regions',
      'Per-tenant schema isolation',
      '60–90 day go-live',
    ],
    cta: { label: 'Managed SaaS deployment', href: '/deployment/managed' },
  },
  {
    code: 'SM.03',
    abbr: 'PaaS',
    icon: Cpu,
    accent: '#7C5CE6',
    title: 'Platform as a Service',
    body: 'API-first developer surface — versioned REST + federated GraphQL + signed webhooks + MCP discovery. Build your own products on top of the FlyttGo orchestration core.',
    audiences: [
      { icon: Building2, label: 'B2B SaaS builders' },
      { icon: Building2, label: 'System integrators' },
      { icon: Landmark, label: 'Government IT teams' },
    ],
    examples: [
      'TypeScript · Python · Go SDKs',
      'OpenAPI 3.1 specs per release',
      'OAuth 2.1 + organization-scoped tokens',
      'Sandbox tenants in 5 minutes',
    ],
    cta: { label: 'API architecture', href: '/api-architecture' },
  },
  {
    code: 'SM.04',
    abbr: 'Sovereign',
    icon: ShieldCheck,
    accent: '#F5B547',
    title: 'Sovereign infrastructure',
    body: 'Self-hosted in certified national datacenters. Full operational handover to in-jurisdiction staff, optional air-gap, national HSM. Used where data residency is non-negotiable.',
    audiences: [
      { icon: Landmark, label: 'Ministries' },
      { icon: Building2, label: 'Regulated enterprises' },
      { icon: ShieldCheck, label: 'Defence + intelligence' },
    ],
    examples: [
      'Sovereign datacenter (DM.03)',
      'In-jurisdiction data + key custody',
      'Air-gap option per environment',
      'Public-sector procurement frameworks',
    ],
    cta: { label: 'Sovereign deployment', href: '/sovereign' },
  },
];

export default function HomeServiceModels() {
  return (
    <section
      aria-labelledby="service-models-heading"
      className="relative bg-white dark:bg-slate-950 py-20 lg:py-24 border-t border-slate-200/60 dark:border-slate-800/60"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
          <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">SM.00</span>
          <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
          <span>Service models</span>
        </div>

        <div className="mt-6 grid lg:grid-cols-12 gap-8 items-end">
          <h2
            id="service-models-heading"
            className="lg:col-span-7 font-serif text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-slate-900 dark:text-white leading-[1.05]"
          >
            Four service models.{' '}
            <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
              One orchestration core.
            </em>
          </h2>
          <p className="lg:col-span-5 text-base text-slate-600 dark:text-slate-400 leading-[1.65]">
            FlyttGo runs as IaaS inside your cloud, as managed SaaS in
            primary regions, as a PaaS API surface for builders, and as
            sovereign infrastructure for regulated jurisdictions. Same
            modules, four delivery shapes.
          </p>
        </div>

        <ul className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {MODELS.map((m) => {
            const Icon = m.icon;
            return (
              <li
                key={m.code}
                className="flex flex-col p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800/60 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 motion-safe:transition-colors"
              >
                <div className="flex items-start justify-between">
                  <span
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${m.accent}14`, color: m.accent }}
                    aria-hidden="true"
                  >
                    <Icon size={18} strokeWidth={1.75} />
                  </span>
                  <span
                    className="font-mono text-[10px] uppercase tracking-[0.22em] font-semibold"
                    style={{ color: m.accent }}
                  >
                    {m.code}
                  </span>
                </div>

                <div className="mt-4">
                  <span
                    className="font-mono text-[11px] uppercase tracking-[0.22em] font-semibold"
                    style={{ color: m.accent }}
                  >
                    {m.abbr}
                  </span>
                  <h3 className="mt-1 text-[15px] font-semibold tracking-tight text-slate-900 dark:text-white">
                    {m.title}
                  </h3>
                </div>

                <p className="mt-2 text-[13px] text-slate-600 dark:text-slate-400 leading-snug">
                  {m.body}
                </p>

                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {m.audiences.map((a) => {
                    const AIcon = a.icon;
                    return (
                      <li
                        key={a.label}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/60 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-600 dark:text-slate-300"
                      >
                        <AIcon size={9} aria-hidden="true" />
                        {a.label}
                      </li>
                    );
                  })}
                </ul>

                <ul className="mt-4 pt-4 border-t border-slate-200/70 dark:border-slate-800/60 space-y-1.5 flex-1">
                  {m.examples.map((e) => (
                    <li
                      key={e}
                      className="flex items-start gap-2 text-[12px] text-slate-600 dark:text-slate-400 leading-snug"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0"
                        style={{ backgroundColor: m.accent }}
                      />
                      <span>{e}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={m.cta.href}
                  className="mt-5 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.18em] font-semibold motion-safe:transition-colors"
                  style={{ color: m.accent }}
                >
                  {m.cta.label}
                  <ArrowUpRight size={11} aria-hidden="true" />
                </Link>
              </li>
            );
          })}
        </ul>

        <p className="mt-10 max-w-3xl font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500 leading-relaxed">
          The same eight platform modules — Transify · Workverge · Civitas ·
          EduPro · Identra · Payvera · Ledgera · FlyttGo Marketplace — run
          identically under each service model. The orchestration contract
          is constant; the substrate is the variable.
        </p>
      </div>
    </section>
  );
}
