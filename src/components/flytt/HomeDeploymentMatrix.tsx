import React from 'react';
import Link from '@/components/flytt/LocaleLink';
import { ArrowUpRight, CloudCog, ServerCog, ShieldCheck, type LucideIcon } from 'lucide-react';
import SectionIndex from '@/components/flytt/SectionIndex';

/**
 * Deployment-mode comparison matrix (DM.MX). A single procurement-grade
 * surface that names each of the three deployment modes (managed SaaS,
 * customer cloud, sovereign datacenter) and, for each one, fills out the
 * dimensions a buyer's procurement / security / data-protection team
 * actually compares: data residency, key custody, identity boundary,
 * regulatory posture, patch cadence, SLA target, audit retention.
 *
 * Sits below HomeDeploymentStrip so the high-level mode cards stay as
 * the lead-in, and the matrix gives the buyer the tabulated view they
 * need to decide before they request a brief.
 */

type Mode = {
  code: string;
  title: string;
  href: string;
  icon: LucideIcon;
  accent: string;
  audience: string;
};

type Row = {
  dimension: string;
  values: [string, string, string]; // managed · customer-cloud · sovereign
  highlight?: 0 | 1 | 2; // optional column to render with the accent fill
};

const MODES: Mode[] = [
  {
    code: 'DM.01',
    title: 'FlyttGo-managed SaaS',
    href: '/deployment/managed',
    icon: CloudCog,
    accent: '#1E6FD9',
    audience: 'Fastest path · region-aware',
  },
  {
    code: 'DM.02',
    title: 'Customer cloud',
    href: '/deployment/customer-cloud',
    icon: ServerCog,
    accent: '#0FB5A6',
    audience: 'BYO AWS · Azure · GCP',
  },
  {
    code: 'DM.03',
    title: 'Sovereign datacenter',
    href: '/deployment/sovereign',
    icon: ShieldCheck,
    accent: '#7C5CE6',
    audience: 'In-jurisdiction · air-gap option',
  },
];

const ROWS: Row[] = [
  {
    dimension: 'Data residency',
    values: [
      'In-region (EU primary, opt. AF/MENA/APAC)',
      'In customer tenancy region',
      '100% in-jurisdiction · national datacenter',
    ],
  },
  {
    dimension: 'Encryption-key custody',
    values: [
      'FlyttGo KMS · per-tenant DEK',
      'Customer KMS · BYOK / HYOK',
      'National HSM · sovereign key root',
    ],
  },
  {
    dimension: 'Identity boundary',
    values: [
      'FlyttGo IdP · SSO federated',
      'Customer IdP · OIDC/SAML in tenant',
      'Sovereign eID · national trust list',
    ],
  },
  {
    dimension: 'Regulatory posture',
    values: [
      'GDPR · SOC 2 II · ISO 27001',
      '+ customer FedRAMP / DORA / NIS2 perimeter',
      '+ jurisdictional (NSM · SDAIA · NCA · Cloud Act exempt)',
    ],
  },
  {
    dimension: 'Patch cadence',
    values: [
      '14-day rolling · region-windowed',
      '14-day rolling · customer change window',
      '30-day staged · sovereign ops window',
    ],
  },
  {
    dimension: 'Uptime SLA',
    values: ['99.95% per region', '99.95% per region', '99.9% per facility · DR pair'],
  },
  {
    dimension: 'Audit retention',
    values: [
      'Append-only · 7-year default',
      'Append-only · customer retention policy',
      'Append-only · regulator-defined (often 10y+)',
    ],
  },
  {
    dimension: 'Pilot-to-production',
    values: ['60–90 days', '75–120 days', '120–180 days'],
  },
];

export default function HomeDeploymentMatrix() {
  return (
    <section
      id="dm-mx"
      aria-labelledby="deployment-matrix-heading"
      className="relative bg-white dark:bg-slate-950 py-24 lg:py-28 border-t border-slate-200/60 dark:border-slate-800/60 scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionIndex
          code="DM.MX"
          title="Deployment-Mode Comparison"
          meta="3 modes · 8 procurement dimensions · choose-by-row"
          className="max-w-2xl"
        />

        <div className="mt-8 grid lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7">
            <h2
              id="deployment-matrix-heading"
              className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-slate-900 dark:text-white leading-[1.05]"
            >
              The dimensions your procurement team{' '}
              <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                actually compares.
              </em>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-base text-slate-600 dark:text-slate-400 leading-[1.65]">
              Pre-shaped per deployment mode. Data residency, key custody,
              identity boundary, regulator posture, SLA and audit retention —
              tabulated so security, legal and ops can sign off in one
              review cycle.
            </p>
          </div>
        </div>

        {/* Desktop / tablet — true table */}
        <div className="mt-10 hidden md:block overflow-x-auto rounded-2xl border border-slate-200/70 dark:border-slate-800/60 bg-white dark:bg-slate-900">
          <table className="w-full text-left border-collapse">
            <caption className="sr-only">
              Deployment mode comparison: managed SaaS, customer cloud,
              sovereign datacenter — across 8 procurement dimensions.
            </caption>
            <thead>
              <tr className="border-b border-slate-200/70 dark:border-slate-800/60 bg-slate-50/60 dark:bg-slate-900/40">
                <th
                  scope="col"
                  className="px-5 py-4 font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500 font-semibold align-bottom"
                >
                  Dimension
                </th>
                {MODES.map((m) => {
                  const Icon = m.icon;
                  return (
                    <th
                      scope="col"
                      key={m.code}
                      className="px-5 py-4 align-bottom"
                    >
                      <Link
                        href={m.href}
                        className="group inline-flex flex-col gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9]/40 focus-visible:ring-offset-[3px] rounded-md"
                      >
                        <span
                          className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] font-semibold"
                          style={{ color: m.accent }}
                        >
                          <Icon size={12} strokeWidth={2} aria-hidden="true" />
                          {m.code}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-[14px] font-semibold tracking-tight text-slate-900 dark:text-white">
                          {m.title}
                          <ArrowUpRight
                            size={12}
                            className="text-slate-300 group-hover:text-slate-700 dark:group-hover:text-white motion-safe:transition-colors"
                            aria-hidden="true"
                          />
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400">
                          {m.audience}
                        </span>
                      </Link>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr
                  key={r.dimension}
                  className="border-b border-slate-100 dark:border-slate-900/60 last:border-b-0"
                >
                  <th
                    scope="row"
                    className="px-5 py-4 align-top text-[12px] font-semibold uppercase tracking-[0.16em] text-slate-700 dark:text-slate-300 font-mono whitespace-nowrap"
                  >
                    {r.dimension}
                  </th>
                  {r.values.map((v, i) => (
                    <td
                      key={i}
                      className="px-5 py-4 align-top text-[13px] leading-snug text-slate-600 dark:text-slate-300"
                    >
                      {v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile — 3 stacked mode cards, each with its own row list */}
        <div className="mt-10 md:hidden grid gap-4">
          {MODES.map((m, mi) => {
            const Icon = m.icon;
            return (
              <Link
                key={m.code}
                href={m.href}
                className="block rounded-2xl border border-slate-200/70 dark:border-slate-800/60 bg-white dark:bg-slate-900 p-5"
              >
                <div className="flex items-start justify-between">
                  <span
                    className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] font-semibold"
                    style={{ color: m.accent }}
                  >
                    <Icon size={12} strokeWidth={2} aria-hidden="true" />
                    {m.code}
                  </span>
                  <ArrowUpRight
                    size={14}
                    className="text-slate-300"
                    aria-hidden="true"
                  />
                </div>
                <div className="mt-1.5 text-base font-semibold tracking-tight text-slate-900 dark:text-white">
                  {m.title}
                </div>
                <div className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400">
                  {m.audience}
                </div>
                <dl className="mt-4 pt-4 border-t border-slate-200/70 dark:border-slate-800/60 space-y-3">
                  {ROWS.map((r) => (
                    <div key={r.dimension}>
                      <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">
                        {r.dimension}
                      </dt>
                      <dd className="mt-0.5 text-[13px] text-slate-600 dark:text-slate-300 leading-snug">
                        {r.values[mi]}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Link>
            );
          })}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            href="/deployment"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-[#0A3A6B] text-white text-sm font-semibold hover:bg-[#0A3A6B]/90 motion-safe:transition-colors"
          >
            Full deployment architecture
            <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
          <Link
            href="/contact?intent=procurement"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 motion-safe:transition-colors"
          >
            Procurement & RFP intake
            <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400">
            Numbers reflect default contractual baselines · per-deployment uplift available
          </span>
        </div>
      </div>
    </section>
  );
}
