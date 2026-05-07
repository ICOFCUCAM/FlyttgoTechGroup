import type { Metadata } from 'next';
import Link from '@/components/flytt/LocaleLink';
import Navbar from '@/components/flytt/Navbar';
import PageHero from '@/components/flytt/PageHero';
import SiteFooter from '@/components/flytt/SiteFooter';
import { Reveal } from '@/components/flytt/Reveal';
import NextStepsGrid from '@/components/flytt/NextStepsGrid';
import { breadcrumbListLd, jsonLdScript } from '@/lib/seo/jsonld';
import {
  ShieldCheck,
  KeyRound,
  Lock,
  Cpu,
  RefreshCcw,
  Compass,
  ArrowUpRight,
  AlertTriangle,
  Workflow,
  type LucideIcon,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Post-quantum cryptography · PQ.00 — FlyttGo Technologies Group',
  description:
    'Crypto-agility statement, NIST FIPS 203/204/205 alignment, hybrid classical+PQC migration roadmap. The cryptographic posture FlyttGo is moving every module to ahead of the harvest-now-decrypt-later horizon.',
  alternates: { canonical: '/post-quantum' },
};

type Migration = {
  code: string;
  surface: string;
  current: string;
  target: string;
  hybridStage: string;
  status: 'live' | 'in-flight' | 'planned';
  quarter: string;
};

const MIGRATIONS: Migration[] = [
  { code: 'PQ.M01', surface: 'TLS · transport security',           current: 'TLS 1.3 · X25519 + secp256r1', target: 'TLS 1.3 + X25519MLKEM768 (hybrid)',           hybridStage: 'X25519MLKEM768 hybrid KEM',     status: 'in-flight', quarter: 'Q3 2026' },
  { code: 'PQ.M02', surface: 'mTLS · service-to-service',           current: 'TLS 1.3 + mutual auth',         target: 'TLS 1.3 + ML-KEM hybrid + ML-DSA certs',     hybridStage: 'Hybrid KEM + dual signatures',  status: 'in-flight', quarter: 'Q4 2026' },
  { code: 'PQ.M03', surface: 'Code-signing · Sigstore releases',    current: 'ECDSA P-256 + RSA-2048',        target: 'Hybrid ECDSA + ML-DSA (Dilithium)',          hybridStage: 'Dual-signature artefacts',      status: 'in-flight', quarter: 'Q3 2026' },
  { code: 'PQ.M04', surface: 'JWT / signed agent tokens',           current: 'EdDSA Ed25519',                  target: 'Ed25519 + ML-DSA (hybrid JWS)',              hybridStage: 'Dual-key JWS',                  status: 'planned',   quarter: 'Q4 2026' },
  { code: 'PQ.M05', surface: 'Webhook signatures',                  current: 'HMAC-SHA256',                    target: 'HMAC-SHA256 + ML-DSA optional layer',         hybridStage: 'Optional second signature',     status: 'planned',   quarter: 'Q1 2027' },
  { code: 'PQ.M06', surface: 'Identra · qualified signatures',      current: 'ECDSA P-256 / RSA-2048',         target: 'Hybrid ECDSA + ML-DSA (eIDAS-aligned)',      hybridStage: 'Awaits ETSI PQ profile',        status: 'planned',   quarter: 'Q2 2027' },
  { code: 'PQ.M07', surface: 'At-rest encryption (KMS keys)',       current: 'AES-256-GCM · KMS-managed',      target: 'AES-256-GCM (already PQ-resistant)',         hybridStage: 'No migration · symmetric secure', status: 'live',      quarter: 'n/a' },
  { code: 'PQ.M08', surface: 'BYOK · sovereign tenant keys',        current: 'KMIP / PKCS#11 RSA-2048',         target: 'KMIP / PKCS#11 with ML-KEM key wrap',         hybridStage: 'Tenant HSM-dependent',          status: 'planned',   quarter: 'Q2 2027' },
];

const STATUS_LABEL: Record<Migration['status'], { label: string; cls: string }> = {
  live:        { label: 'Live',        cls: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300' },
  'in-flight': { label: 'In flight',   cls: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300' },
  planned:     { label: 'Planned',     cls: 'bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-300' },
};

type Pillar = {
  code: string;
  icon: LucideIcon;
  title: string;
  body: string;
};

const PILLARS: Pillar[] = [
  {
    code: 'PQ.PR.01', icon: KeyRound,
    title: 'NIST FIPS 203/204/205 alignment',
    body: 'Targeting NIST-finalised primitives — ML-KEM (Kyber, FIPS 203) for key establishment, ML-DSA (Dilithium, FIPS 204) for signatures, SLH-DSA (SPHINCS+, FIPS 205) as a hash-based fallback signature. ETSI / ENISA profile guidance tracked alongside.',
  },
  {
    code: 'PQ.PR.02', icon: RefreshCcw,
    title: 'Hybrid classical + PQ first',
    body: 'No primitive swap-and-pray. Every PQ-vulnerable surface migrates through a hybrid stage where the classical algorithm and the PQ algorithm are both in force. Withdrawal of the classical algorithm only after the PQ algorithm has matured in production.',
  },
  {
    code: 'PQ.PR.03', icon: Cpu,
    title: 'Crypto-agility by construction',
    body: 'Algorithm identifiers are first-class throughout the platform — TLS suite registry, JWS algorithm header, Sigstore signature manifest. Adding or retiring a primitive is a config change, not a redeploy. New NIST onramps are absorbed as they land.',
  },
  {
    code: 'PQ.PR.04', icon: AlertTriangle,
    title: 'Harvest-now-decrypt-later defence',
    body: 'Long-confidentiality data (audit logs, identity records, regulated payments) gets PQ-resistant transport priority. The window for an adversary to capture-and-store traffic against a future cryptographically-relevant quantum computer closes first on the highest-stakes flows.',
  },
];

export default function PostQuantumPage() {
  const ld = breadcrumbListLd([
    { name: 'Home', href: '/' },
    { name: 'Post-quantum cryptography', href: '/post-quantum' },
  ]);

  return (
    <>
      <script {...jsonLdScript(ld)} />
      <Navbar />
      <main
        id="main"
        className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased"
      >
        <PageHero
          code="PQ.00"
          eyebrow="Post-quantum cryptography"
          title={
            <>
              Crypto-agility now,{' '}
              <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                quantum-safe by 2027.
              </em>
            </>
          }
          description="NIST finalised the first PQC standards in 2024 (FIPS 203 ML-KEM, FIPS 204 ML-DSA, FIPS 205 SLH-DSA). FlyttGo runs a public crypto-agility programme migrating every public-key surface to hybrid classical + PQC ahead of the harvest-now-decrypt-later horizon."
          crumbs={[{ label: 'Home', href: '/' }, { label: 'Post-quantum cryptography' }]}
        />

        {/* PQ.PR — pillars */}
        <Reveal>
          <section
            id="pq-pr"
            aria-labelledby="pq-pr-heading"
            className="bg-gradient-to-b from-white to-[#F5F8FC] dark:from-slate-950 dark:to-slate-900 py-20 lg:py-24 border-y border-slate-200/60 dark:border-slate-800/60"
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
                <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">PQ.PR</span>
                <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
                <span id="pq-pr-heading">Cryptographic posture</span>
              </div>
              <h2 className="mt-6 max-w-3xl font-serif text-3xl md:text-4xl font-medium tracking-tight text-slate-900 dark:text-white leading-[1.05]">
                Four anchors{' '}
                <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                  for the post-quantum migration.
                </em>
              </h2>
              <ul className="mt-12 grid md:grid-cols-2 gap-3">
                {PILLARS.map((p) => {
                  const Icon = p.icon;
                  return (
                    <li
                      key={p.code}
                      className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span
                          className="w-11 h-11 rounded-xl bg-[#0A3A6B]/8 dark:bg-[#9ED0F9]/12 text-[#0A3A6B] dark:text-[#9ED0F9] flex items-center justify-center"
                          aria-hidden="true"
                        >
                          <Icon size={20} strokeWidth={1.75} />
                        </span>
                        <span className="font-mono text-[10px] tracking-[0.22em] font-semibold text-[#0A3A6B] dark:text-[#9ED0F9]">
                          {p.code}
                        </span>
                      </div>
                      <h3 className="mt-4 text-[15px] font-semibold tracking-tight text-slate-900 dark:text-white leading-snug">
                        {p.title}
                      </h3>
                      <p className="mt-2 text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed">
                        {p.body}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        </Reveal>

        {/* PQ.MX — migration matrix */}
        <Reveal>
          <section
            id="pq-mx"
            aria-labelledby="pq-mx-heading"
            className="py-20 lg:py-24 bg-white dark:bg-slate-950 border-b border-slate-200/60 dark:border-slate-800/60"
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
                <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">PQ.MX</span>
                <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
                <span id="pq-mx-heading">Per-surface migration matrix</span>
              </div>
              <h2 className="mt-6 max-w-3xl font-serif text-3xl md:text-4xl font-medium tracking-tight text-slate-900 dark:text-white leading-[1.05]">
                Eight cryptographic surfaces,{' '}
                <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                  one migration plan.
                </em>
              </h2>
              <p className="mt-4 max-w-3xl text-base text-slate-600 dark:text-slate-400 leading-[1.65]">
                Each row tracks where a primitive lives today, what it
                migrates to, and what stage it&apos;s at. Symmetric primitives
                (AES-256-GCM, SHA-2/3) are already PQ-resistant; only public-key
                surfaces need the migration.
              </p>
              <div className="mt-10 rounded-2xl border border-slate-200/80 dark:border-slate-800/60 overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200/80 dark:border-slate-800/60">
                    <tr className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
                      <th className="px-5 py-4 font-semibold w-24">Code</th>
                      <th className="px-5 py-4 font-semibold w-56">Surface</th>
                      <th className="px-5 py-4 font-semibold">Current</th>
                      <th className="px-5 py-4 font-semibold">Target (PQ-hybrid)</th>
                      <th className="px-5 py-4 font-semibold w-40">Status</th>
                      <th className="px-5 py-4 font-semibold w-32">Target</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200/60 dark:divide-slate-800/60">
                    {MIGRATIONS.map((m) => {
                      const status = STATUS_LABEL[m.status];
                      return (
                        <tr key={m.code} className="motion-safe:transition-colors hover:bg-slate-50/60 dark:hover:bg-slate-900/40">
                          <td className="px-5 py-4 align-top">
                            <span className="font-mono text-[11px] font-semibold text-[#0A3A6B] dark:text-[#9ED0F9]">{m.code}</span>
                          </td>
                          <td className="px-5 py-4 align-top text-[13px] font-semibold text-slate-900 dark:text-white">
                            {m.surface}
                          </td>
                          <td className="px-5 py-4 align-top text-[12px] text-slate-600 dark:text-slate-400 font-mono">
                            {m.current}
                          </td>
                          <td className="px-5 py-4 align-top text-[12px] text-slate-700 dark:text-slate-300 font-mono">
                            {m.target}
                          </td>
                          <td className="px-5 py-4 align-top">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-[0.14em] font-semibold ${status.cls}`}>
                              {status.label}
                            </span>
                          </td>
                          <td className="px-5 py-4 align-top font-mono text-[11px] uppercase tracking-[0.14em] text-slate-500">
                            {m.quarter}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </Reveal>

        {/* PQ.RG — regulatory anchor */}
        <Reveal>
          <section
            id="pq-rg"
            aria-labelledby="pq-rg-heading"
            className="py-20 lg:py-24 bg-slate-50 dark:bg-slate-900/40 border-b border-slate-200/60 dark:border-slate-800/60"
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
                <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">PQ.RG</span>
                <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
                <span id="pq-rg-heading">Regulatory deadlines</span>
              </div>
              <ul className="mt-10 grid md:grid-cols-3 gap-3">
                {[
                  { code: 'PQ.RG.01', name: 'NIST FIPS 203/204/205',           body: 'Final standards (2024) — ML-KEM, ML-DSA, SLH-DSA. Reference primitives for the migration.' },
                  { code: 'PQ.RG.02', name: 'NSA CNSA 2.0 · 2030 / 2035',       body: 'NSA Commercial National Security Algorithm Suite 2.0 — full transition by 2030 for software/firmware signing, by 2035 for everything else.' },
                  { code: 'PQ.RG.03', name: 'CNSSP 15 · classified networks',    body: 'Committee on National Security Systems Policy 15 — PQ migration mandate for US national-security workloads.' },
                  { code: 'PQ.RG.04', name: 'BSI · TR-02102 (Germany)',          body: 'German BSI cryptographic recommendations include PQC primitives; updated annually.' },
                  { code: 'PQ.RG.05', name: 'ENISA · PQ migration guidance',    body: 'EU-wide PQ migration recommendations; member-state regulators draw from this baseline.' },
                  { code: 'PQ.RG.06', name: 'ETSI PQC profiles (in flight)',    body: 'ETSI eIDAS-aligned PQC profile expected 2026; required for qualified-signature migration.' },
                ].map((r) => (
                  <li
                    key={r.code}
                    className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <Lock size={16} className="text-[#0A3A6B] dark:text-[#9ED0F9]" aria-hidden="true" />
                      <span className="font-mono text-[10px] tracking-[0.22em] font-semibold text-[#0A3A6B] dark:text-[#9ED0F9]">
                        {r.code}
                      </span>
                    </div>
                    <h3 className="mt-3 text-[14px] font-semibold tracking-tight text-slate-900 dark:text-white">
                      {r.name}
                    </h3>
                    <p className="mt-2 text-[12px] text-slate-600 dark:text-slate-400 leading-relaxed">
                      {r.body}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <NextStepsGrid
            code="PQ.NX"
            eyebrow="Where the PQ migration plugs in"
            titleLead="Cryptographic agility is one"
            titleEmphasis="layer of the trust posture."
            intro="Post-quantum migration sits inside the broader security and trust framework. The four pathways below take a programme from this statement to a signed engagement under MNDA."
            steps={[
              { href: '/security',    code: 'CR.00', icon: ShieldCheck, title: 'Security architecture', body: 'SOC 2 controls, ISO 27001 scope, the cryptography this PQ plan migrates from.', meta: 'CR.00 · TS.00' },
              { href: '/trust',       code: 'TC.00', icon: ShieldCheck, title: 'Trust artefacts',       body: 'SOC 2, ISO 27001, DPA, subprocessors. Full PQ technical brief available under MNDA.',          meta: 'TC.00 · 8 artefacts' },
              { href: '/roadmap',     code: 'RM.00', icon: Workflow,    title: 'Public roadmap',         body: 'PQ migration milestones tracked publicly with quarterly slip explanations.',                  meta: 'RM.00 · quarterly' },
              { href: '/consultation', code: 'CB.00', icon: Compass,    title: 'Open a PQ scoping',      body: 'Routed under CT.01 Platform Architecture Session — for buyers wanting tenant-specific timing.', meta: 'CT.01 · CB.00' },
            ]}
          />
        </Reveal>
      </main>
      <SiteFooter />
    </>
  );
}
