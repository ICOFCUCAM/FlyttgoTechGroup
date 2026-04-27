import React from 'react';
import Link from '@/components/flytt/LocaleLink';
import {
  CloudCog,
  ServerCog,
  ShieldCheck,
  Building2,
  Workflow,
  Lock,
  Globe2,
  ArrowUpRight,
} from 'lucide-react';

/**
 * Module-level authority panel rendered at the bottom of every
 * /platforms/[slug] page. Implements the six brief-specified
 * sections from Section A · Phase 9:
 *
 *   MA.01  Deployment modes
 *   MA.02  Industries served
 *   MA.03  Architecture overview
 *   MA.04  Interoperability role (which other modules + protocols)
 *   MA.05  Security compatibility
 *   MA.06  Regional deployment readiness
 *
 * Per-module content is curated below in MODULE_PROFILE so each
 * panel reads as a tailored architecture brief, not a templated
 * marketing slab.
 */

type ModuleSlug =
  | 'transify'
  | 'workverge'
  | 'civitas'
  | 'edupro'
  | 'identra'
  | 'payvera'
  | 'ledgera'
  | 'flyttgo';

type ModuleProfile = {
  /** One-line identity summary used in the panel intro. */
  identity: string;
  /** Industries the module is explicitly built for. */
  industries: string[];
  /** Architecture pillars the module relies on most heavily. */
  architecture: string[];
  /** Interoperability — which other modules + standards bind into this one. */
  interoperability: string[];
  /** Security alignment hooks specific to this module. */
  security: string[];
  /** Regional deployment readiness rail. */
  regions: string[];
};

const MODULE_PROFILE: Record<ModuleSlug, ModuleProfile> = {
  transify: {
    identity: 'Mobility infrastructure platform — dispatch, telematics, regional mobility coordination.',
    industries: ['Transport authorities', 'Municipal mobility programmes', 'Fleet operators', 'Freight + logistics networks', 'Marketplace operators (running on Transify)'],
    architecture: ['Multi-tenant SaaS', 'Event-driven dispatch core', 'Real-time telematics pipeline', 'Map data backbone with regional providers'],
    interoperability: ['Identra for driver + dispatcher SSO', 'Payvera for fare + settlement flows', 'Ledgera for fleet financial ops', 'OpenStreetMap + national mapping providers'],
    security: ['Tenant-scoped data', 'Driver-PII residency by jurisdiction', 'Encrypted vehicle telemetry channels', 'Audit trail on every dispatch override'],
    regions: ['EU-N (Oslo · Stockholm primary)', 'EU-W (London · Frankfurt)', 'AF (Lagos · Yaoundé · Nairobi · Kampala)', 'MENA sovereign environments', 'NA SaaS (San Francisco · Northern Virginia)'],
  },
  workverge: {
    identity: 'Workforce coordination infrastructure — roster, shift, qualification, field-team deployment.',
    industries: ['Public-sector workforce programmes', 'Healthcare staffing', 'Field-service operators', 'Education staffing', 'National employment agencies'],
    architecture: ['Multi-tenant SaaS', 'Per-tenant qualification graph', 'Shift-state machine', 'Notification + workflow engine'],
    interoperability: ['Identra for employee SSO + qualification verification', 'Payvera for stipend / payroll triggers', 'Ledgera for workforce-cost posting', 'EduPro for qualification provenance'],
    security: ['Per-tenant qualification ledger', 'PII tagging on every roster row', 'Append-only audit on shift assignments', 'GDPR-aligned subject-access workflows'],
    regions: ['EU-N (primary)', 'EU-W', 'AF (Nairobi · Kampala · Addis · Lagos)', 'MENA sovereign on request', 'NA SaaS'],
  },
  civitas: {
    identity: 'Digital government services platform — case management, permit workflows, citizen-facing portals, inter-agency routing.',
    industries: ['Ministries', 'Municipalities', 'National-level digital service teams', 'Inter-agency coordination bodies'],
    architecture: ['Multi-tenant + sovereign options', 'Per-agency workflow engine', 'Form + document orchestration', 'Inter-agency event bus'],
    interoperability: ['Identra for citizen + officer identity (eIDAS LoA-mapped)', 'Payvera for fee collection', 'Ledgera for revenue posting', 'EduPro for credential checks where relevant'],
    security: ['Sovereign-environment first', 'Data-residency tags enforced at row level', 'eIDAS-compatible qualified-signature flows', 'Append-only case audit trail'],
    regions: ['EU-N sovereign primary', 'EU-W sovereign environments', 'AF sovereign (Nigeria · Kenya · South Africa)', 'MENA sovereign (UAE · Saudi Arabia)'],
  },
  edupro: {
    identity: 'Education intelligence infrastructure — admissions, scholarships, institutional analytics, ministry reporting.',
    industries: ['Universities', 'Ministries of education', 'School networks', 'Scholarship-administering bodies', 'National examination authorities'],
    architecture: ['Multi-tenant + dedicated-pool options', 'Admissions pipeline engine', 'Credential graph', 'Ministry-grade reporting warehouse'],
    interoperability: ['Identra for student + staff identity', 'Payvera for tuition + scholarship disbursement', 'Ledgera for institutional financial ops', 'Workverge for staffing'],
    security: ['Student-PII residency enforced per jurisdiction', 'Per-cohort data isolation', 'Append-only credential issuance audit', 'GDPR + national education-data directive aligned'],
    regions: ['EU-N (Norway · Sweden ministries)', 'EU-W', 'AF (Cameroon · Uganda · Ethiopia · Kenya · South Africa)', 'MENA sovereign'],
  },
  identra: {
    identity: 'Identity infrastructure platform — SSO, MFA, qualified-signature flows, eIDAS LoA mapping, cross-border attribute exchange.',
    industries: ['Cross-cutting — every platform module', 'Government identity programmes', 'Enterprise workforce identity', 'Education credential federation'],
    architecture: ['Multi-tenant SaaS + sovereign', 'OIDC + SAML 2.0 federation core', 'Qualified-signature module', 'Attribute exchange backbone'],
    interoperability: ['Anchors authentication for every other module', 'Federates with national eID schemes (BankID, MitID, FranceConnect, ID-porten)', 'eIDAS LoA mapping', 'OpenID Connect Federation 1.0'],
    security: ['eIDAS-compatible qualified signatures', 'HSM-backed key storage', 'Per-tenant identity isolation', 'Append-only authentication event log'],
    regions: ['EU-N sovereign + SaaS', 'EU-W sovereign + SaaS', 'AF (Nigeria · Kenya · South Africa)', 'MENA sovereign (GCC)', 'NA SaaS'],
  },
  payvera: {
    identity: 'Public service payment infrastructure — PSD2-ready SCA, open-banking endpoints, transaction-monitoring hooks, government-grade orchestration.',
    industries: ['Public-sector revenue collection', 'Education fee + scholarship disbursement', 'Transport fare settlement', 'Government benefit payments', 'Marketplace operator settlement'],
    architecture: ['Multi-tenant SaaS', 'PSP-agnostic adapter layer', 'ISO 20022 message backbone', 'Transaction monitoring + reconciliation engine'],
    interoperability: ['Settles into Ledgera with VAT-coded line detail', 'Authenticates via Identra (SCA flows)', 'Open-banking endpoints (PSD2-ready)', 'PSP adapters for major schemes'],
    security: ['PSD2-ready strong customer authentication', 'PCI-DSS-aligned segmentation for card flows', 'HSM-backed cryptographic operations', 'Real-time fraud + AML monitoring hooks'],
    regions: ['EU-N (PSD2 primary jurisdiction)', 'EU-W (UK FCA + EU PSD2)', 'AF (regional PSP corridors)', 'MENA on request'],
  },
  ledgera: {
    identity: 'Financial operations + bookkeeping infrastructure — multi-jurisdiction accounting, append-only audit, statutory exports.',
    industries: ['Cross-cutting — settles for every other module', 'Public-sector finance', 'Enterprise back-office', 'Education institutional finance', 'Marketplace settlement'],
    architecture: ['Multi-tenant SaaS', 'Per-org chart of accounts (NS 4102 / FRS-102 / GAAP / IFRS)', 'Generated amount_base_currency column', 'Append-only audit_log via Postgres triggers'],
    interoperability: ['Receives every monetary event from Payvera', 'Identra-bound for accountant + auditor RBAC', 'Statutory exports: SAF-T XML · VAT-100 · GAAP bundle · IFRS package', 'Browser-side sandbox at /try/ledgera'],
    security: ['SOC 2-aligned access governance', 'ISO 27001-aligned change management', 'Append-only audit_log (UPDATE/DELETE blocked at trigger)', 'Last-super_admin guard at DB layer'],
    regions: ['EU-N (Norway statutory primary)', 'EU-W (UK MTD)', 'NA (US GAAP / Form 1120/1065)', 'IFRS fallback for international jurisdictions'],
  },
  flyttgo: {
    identity: 'Smart moving + transport marketplace — runs on Transify infrastructure, exposes consumer + operator surfaces.',
    industries: ['Transport marketplace operators', 'Last-mile + relocation logistics', 'B2C moving platforms', 'Multi-sided regulated transport markets'],
    architecture: ['Runs on the Transify dispatch core', 'Multi-sided marketplace pricing engine', 'Operator-side dispatch console + driver app surfaces', 'Consumer-facing booking + payment flows'],
    interoperability: ['Transify (mobility runtime)', 'Identra (consumer + operator + driver identity)', 'Payvera (fare collection + operator settlement)', 'Ledgera (operator financial ops)'],
    security: ['Marketplace-isolation by tenant', 'Operator + driver identity verification via Identra', 'PSD2-aligned payment flows via Payvera', 'Audit trail on every settlement event'],
    regions: ['EU-N primary (Norway)', 'EU-W expansion', 'AF rollout (Nigeria · Kenya)', 'MENA pilot environments'],
  },
};

const SECTIONS = [
  { code: 'MA.01', icon: CloudCog,     key: 'industries',      title: 'Deployment modes',          subtitle: 'Same orchestration contract under managed SaaS · customer-cloud · sovereign substrates.' },
  { code: 'MA.02', icon: Building2,    key: 'industries',      title: 'Industries served',         subtitle: 'Sectors the module is explicitly built for, not a marketing list.' },
  { code: 'MA.03', icon: Workflow,     key: 'architecture',    title: 'Architecture overview',     subtitle: 'The structural pillars the module rests on at runtime.' },
  { code: 'MA.04', icon: ServerCog,    key: 'interoperability', title: 'Interoperability role',    subtitle: 'How the module composes with the rest of the FlyttGoTech Core.' },
  { code: 'MA.05', icon: Lock,         key: 'security',        title: 'Security compatibility',    subtitle: 'Module-specific security posture beyond the platform-level alignment.' },
  { code: 'MA.06', icon: Globe2,       key: 'regions',         title: 'Regional deployment readiness', subtitle: 'Where the module is operational, in rollout, or available on request.' },
] as const;

const DEPLOYMENT_MODES = [
  { code: 'DM.01', label: 'FlyttGo-managed SaaS', note: 'Region-aware managed cloud' },
  { code: 'DM.02', label: 'Customer-controlled cloud', note: 'Inside your AWS / Azure / GCP tenancy' },
  { code: 'DM.03', label: 'Sovereign datacenter', note: 'In-jurisdiction · national HSM · optional air-gap' },
];

export default function ModuleAuthorityPanel({ slug }: { slug: string }) {
  const profile = MODULE_PROFILE[slug as ModuleSlug];
  if (!profile) return null;

  return (
    <section
      aria-labelledby="module-authority-heading"
      className="relative bg-white dark:bg-slate-950 border-t border-slate-200/60 dark:border-slate-800/60 py-16 lg:py-20"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
          <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">MA.00</span>
          <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
          <span>Module authority brief</span>
        </div>

        <div className="mt-6 grid lg:grid-cols-12 gap-8 items-end">
          <h2
            id="module-authority-heading"
            className="lg:col-span-7 font-serif text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight text-slate-900 dark:text-white leading-[1.1]"
          >
            How this module{' '}
            <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
              actually deploys.
            </em>
          </h2>
          <p className="lg:col-span-5 text-base text-slate-600 dark:text-slate-400 leading-[1.65]">
            {profile.identity}
          </p>
        </div>

        {/* MA.01 — Deployment modes (fixed across all modules) */}
        <div className="mt-10">
          <SectionHeader code="MA.01" title="Deployment modes" subtitle="Same orchestration contract under all three substrates." />
          <ul className="mt-4 grid sm:grid-cols-3 gap-3">
            {DEPLOYMENT_MODES.map((m) => (
              <li
                key={m.code}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/60"
              >
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] font-semibold text-[#0A3A6B] dark:text-[#9ED0F9]">
                  {m.code}
                </div>
                <div className="mt-1 text-[14px] font-semibold tracking-tight text-slate-900 dark:text-white">
                  {m.label}
                </div>
                <div className="mt-0.5 text-[12px] text-slate-500">{m.note}</div>
              </li>
            ))}
          </ul>
        </div>

        {/* MA.02 – MA.06 — per-module list rails */}
        <div className="mt-10 grid lg:grid-cols-2 gap-6">
          {SECTIONS.slice(1).map((s) => {
            const Icon = s.icon;
            const items = profile[s.key as keyof ModuleProfile] as string[];
            return (
              <div key={s.code} className="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800/60 bg-white dark:bg-slate-900">
                <div className="flex items-start justify-between gap-2">
                  <span
                    className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800/60 text-[#0A3A6B] dark:text-[#9ED0F9] flex items-center justify-center flex-shrink-0"
                    aria-hidden="true"
                  >
                    <Icon size={18} strokeWidth={1.75} />
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] font-semibold text-[#0A3A6B] dark:text-[#9ED0F9]">
                    {s.code}
                  </span>
                </div>
                <h3 className="mt-3 text-base font-semibold tracking-tight text-slate-900 dark:text-white">
                  {s.title}
                </h3>
                <p className="mt-1 text-[12px] text-slate-500 leading-snug">{s.subtitle}</p>
                <ul className="mt-3 space-y-1.5">
                  {items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-[13px] text-slate-700 dark:text-slate-300 leading-snug"
                    >
                      <span aria-hidden="true" className="mt-2 w-1 h-1 rounded-full bg-[#0A3A6B] dark:bg-[#9ED0F9] flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Cross-link rail */}
        <div className="mt-10 grid sm:grid-cols-3 gap-3">
          <Link href="/deployment" className="group flex items-center justify-between gap-3 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800/60 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 motion-safe:transition-colors">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-600 dark:text-slate-300">
              Deployment architecture
            </span>
            <ArrowUpRight size={14} className="text-slate-400 group-hover:text-[#0A3A6B] dark:group-hover:text-[#9ED0F9]" aria-hidden="true" />
          </Link>
          <Link href="/sovereign" className="group flex items-center justify-between gap-3 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800/60 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 motion-safe:transition-colors">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-600 dark:text-slate-300">
              Sovereign deployment
            </span>
            <ArrowUpRight size={14} className="text-slate-400 group-hover:text-[#0A3A6B] dark:group-hover:text-[#9ED0F9]" aria-hidden="true" />
          </Link>
          <Link href="/security" className="group flex items-center justify-between gap-3 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800/60 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 motion-safe:transition-colors">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-600 dark:text-slate-300">
              Security architecture
            </span>
            <ArrowUpRight size={14} className="text-slate-400 group-hover:text-[#0A3A6B] dark:group-hover:text-[#9ED0F9]" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function SectionHeader({ code, title, subtitle }: { code: string; title: string; subtitle: string }) {
  return (
    <div>
      <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500">
        <ShieldCheck size={11} aria-hidden="true" className="text-[#0A3A6B] dark:text-[#9ED0F9]" />
        <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">{code}</span>
        <span className="text-slate-300 dark:text-slate-700">·</span>
        <span className="normal-case tracking-tight text-slate-700 dark:text-slate-300 text-[12px] font-normal">{title}</span>
      </div>
      <p className="mt-1 text-[12px] text-slate-500 leading-snug max-w-2xl">{subtitle}</p>
    </div>
  );
}
