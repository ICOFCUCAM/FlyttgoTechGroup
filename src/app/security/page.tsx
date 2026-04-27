import type { Metadata } from 'next';
import Link from '@/components/flytt/LocaleLink';
import Navbar from '@/components/flytt/Navbar';
import SiteFooter from '@/components/flytt/SiteFooter';
import PageHero from '@/components/flytt/PageHero';
import { T } from '@/components/flytt/T';
import {
  Activity,
  Eye,
  KeyRound,
  Lock,
  ShieldCheck,
  Siren,
  FileBadge,
  GitBranch,
  PackageCheck,
  ScrollText,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Security',
  description:
    'How FlyttGo Technologies Group secures its platform infrastructure — tenant isolation, region-scoped keys, continuous monitoring, coordinated disclosure program.',
  alternates: { canonical: '/security' },
};

const pillars = [
  {
    icon: Lock,
    title: 'Tenant isolation',
    body:
      'Every deployment runs in a dedicated schema with tenant-scoped encryption keys, row-level security policies and API-gateway-enforced RBAC. Sovereign deployments can be fully air-gapped from public networks.',
  },
  {
    icon: KeyRound,
    title: 'Cryptography',
    body:
      'TLS 1.3 in transit, AES-256 at rest, envelope encryption with customer-held master keys on supported deployment modes. HSM-backed key storage for payment and identity modules.',
  },
  {
    icon: Eye,
    title: 'Continuous monitoring',
    body:
      'Centralized logging, real-time anomaly detection, tamper-evident audit trails. 24/7 SOC coverage on managed deployments; runbook handover to customer SOC for customer-cloud and sovereign tenants.',
  },
  {
    icon: ShieldCheck,
    title: 'Compliance posture',
    body:
      'Engineered against SOC 2 Type II, ISO 27001, GDPR and WCAG 2.1 AA. Regulated modules add PSD2, eIDAS and PCI-DSS controls as required per jurisdiction.',
  },
  {
    icon: Activity,
    title: 'Supply chain',
    body:
      'Signed builds, SBOM attestation, dependency pinning and automated vulnerability scanning on every merge. Third-party libraries reviewed on security advisories within one business day for critical severity.',
  },
  {
    icon: Siren,
    title: 'Incident response',
    body:
      'Severity classification, 24/7 on-call rotation, customer notification within contractual windows. Post-mortems are shared with enterprise customers through the deployment portal.',
  },
];

export default function SecurityPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased">
        <PageHero
          eyebrow={<T k="legal.security.eyebrow" />}
          title={<T k="legal.security.title" />}
          description="FlyttGo platforms are built for regulated enterprise and public-sector workloads — tenant-isolated, continuously monitored and independently audited. This page summarizes our program; full documentation is shared under NDA."
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'Trust' },
            { label: 'Security' },
          ]}
        />

        <section className="py-14 lg:py-20">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {pillars.map((p) => {
                const Icon = p.icon;
                return (
                  <li
                    key={p.title}
                    className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 hover:shadow-md motion-safe:transition-all"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#0A3A6B]/5 dark:bg-[#1E6FD9]/10 text-[#0A3A6B] dark:text-[#9ED0F9] flex items-center justify-center">
                      <Icon size={18} strokeWidth={1.75} aria-hidden="true" />
                    </div>
                    <h2 className="mt-4 text-base font-semibold tracking-tight text-slate-900 dark:text-white">
                      {p.title}
                    </h2>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {p.body}
                    </p>
                  </li>
                );
              })}
            </ul>

            {/* TS.00 — Verifiable trust signals (SBOM + signed attestations).
                Models the supply-chain provenance signals infosec buyers
                look for in 2026+: Sigstore-signed releases, SBOM
                published per release, reproducible builds, public audit
                trail of platform changes, signed page-content metadata
                hash. Each item carries the hash/identifier the buyer
                can independently verify against the public registry. */}
            <section className="mt-14" aria-labelledby="trust-signals-heading">
              <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
                <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">
                  TS.00
                </span>
                <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
                <span>Verifiable trust signals · supply-chain provenance</span>
              </div>
              <h2
                id="trust-signals-heading"
                className="mt-6 font-serif text-2xl md:text-3xl font-medium tracking-tight text-slate-900 dark:text-white leading-[1.1] max-w-3xl"
              >
                Trust that&apos;s{' '}
                <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                  independently verifiable.
                </em>
              </h2>
              <p className="mt-3 max-w-2xl text-sm text-slate-600 dark:text-slate-400 leading-[1.65]">
                Every claim on this page is anchored to a cryptographic artefact
                a third party can verify without contacting us. SBOMs ship per
                release, container images carry Sigstore signatures, and the
                public audit trail records every platform-level change.
              </p>

              <ul className="mt-8 grid sm:grid-cols-2 gap-3">
                {[
                  {
                    code: 'TS.01',
                    icon: PackageCheck,
                    title: 'Software Bill of Materials',
                    body: 'CycloneDX 1.5 SBOM published per release. Lists every direct and transitive dependency with version, license, hash, and vulnerability status. Diff against the previous release is included.',
                    artefact: 'sbom.cyclonedx.json · sha256:7e3f…',
                  },
                  {
                    code: 'TS.02',
                    icon: FileBadge,
                    title: 'Sigstore-signed release artefacts',
                    body: 'Container images and binary releases signed with Sigstore (cosign). Verification key chain rooted in the Sigstore Public Good transparency log; no FlyttGo-held private keys to compromise.',
                    artefact: 'cosign verify ghcr.io/flyttgo/...',
                  },
                  {
                    code: 'TS.03',
                    icon: GitBranch,
                    title: 'Reproducible builds',
                    body: 'Every published artefact rebuildable from a public source revision into a byte-identical output. Build environment pinned via Nix flake; build-info JSON shipped alongside each release.',
                    artefact: 'build-provenance · SLSA level 3 target',
                  },
                  {
                    code: 'TS.04',
                    icon: ScrollText,
                    title: 'Append-only platform audit trail',
                    body: 'Every platform-level change (deployment, schema migration, role grant) is captured to an append-only audit_log with full before/after JSONB snapshots. UPDATE and DELETE blocked at the trigger layer.',
                    artefact: 'public.audit_log · per-row hash chain (planned)',
                  },
                ].map((s) => {
                  const Icon = s.icon;
                  return (
                    <li
                      key={s.code}
                      className="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800/60 bg-white dark:bg-slate-900"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span
                          className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800/60 text-[#0A3A6B] dark:text-[#9ED0F9] flex items-center justify-center flex-shrink-0"
                          aria-hidden="true"
                        >
                          <Icon size={18} strokeWidth={1.75} />
                        </span>
                        <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">
                          {s.code}
                        </span>
                      </div>
                      <h3 className="mt-3 text-base font-semibold tracking-tight text-slate-900 dark:text-white">
                        {s.title}
                      </h3>
                      <p className="mt-1 text-[13px] text-slate-600 dark:text-slate-400 leading-snug">
                        {s.body}
                      </p>
                      <div className="mt-4 pt-3 border-t border-slate-200/70 dark:border-slate-800/60 font-mono text-[10px] tracking-[0.04em] text-slate-500 dark:text-slate-500 truncate">
                        {s.artefact}
                      </div>
                    </li>
                  );
                })}
              </ul>

              <p className="mt-6 max-w-3xl font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500 leading-relaxed">
                Verification commands and per-release SBOM links land on
                the developer portal. Customers under MSA receive direct
                links to the SBOM, SLSA provenance, and the cosign verify
                key chain alongside each release notification.
              </p>
            </section>

            <div className="mt-14 grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-[#0A1F3D] text-white">
                <h2 className="text-base font-semibold tracking-tight">Coordinated disclosure</h2>
                <p className="mt-2 text-sm text-white/75 leading-relaxed">
                  Report vulnerabilities to{' '}
                  <a
                    href="mailto:security@flyttgotech.com"
                    className="font-semibold text-[#9ED0F9] hover:underline underline-offset-4"
                  >
                    security@flyttgotech.com
                  </a>
                  . We acknowledge within one business day, target remediation within a
                  severity-based SLA and credit external researchers on request.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/60">
                <h2 className="text-base font-semibold tracking-tight">SOC 2 / ISO 27001 reports</h2>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Full audit reports, pen-test summaries and architecture diagrams are shared
                  with enterprise and public-sector customers under NDA.{' '}
                  <Link
                    href="/contact?intent=procurement"
                    className="font-semibold text-[#0A3A6B] dark:text-[#9ED0F9] hover:underline underline-offset-4"
                  >
                    Request documentation
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
