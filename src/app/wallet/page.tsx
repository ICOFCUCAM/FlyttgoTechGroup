import type { Metadata } from 'next';
import Link from '@/components/flytt/LocaleLink';
import Navbar from '@/components/flytt/Navbar';
import PageHero from '@/components/flytt/PageHero';
import SiteFooter from '@/components/flytt/SiteFooter';
import { Reveal } from '@/components/flytt/Reveal';
import NextStepsGrid from '@/components/flytt/NextStepsGrid';
import { breadcrumbListLd, jsonLdScript } from '@/lib/seo/jsonld';
import {
  Wallet,
  ScrollText,
  Fingerprint,
  KeyRound,
  Globe2,
  ShieldCheck,
  Compass,
  ArrowUpRight,
  Layers3,
  CheckCircle2,
  type LucideIcon,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'EU Digital Identity Wallet · VC.00 — FlyttGo Technologies Group',
  description:
    'eIDAS 2.0 alignment, EU Digital Identity Wallet relying-party readiness, W3C Verifiable Credentials issuance via Identra, decentralised identifiers (DIDs), cross-border attribute exchange.',
  alternates: { canonical: '/wallet' },
};

type Capability = {
  code: string;
  icon: LucideIcon;
  title: string;
  body: string;
  status: 'live' | 'preview' | 'roadmap';
  quarter?: string;
};

const CAPABILITIES: Capability[] = [
  {
    code: 'VC.01', icon: ScrollText,
    title: 'W3C Verifiable Credentials issuance',
    body: 'Identra issues verifiable credentials in the W3C VC 2.0 data model with JWS / SD-JWT proofs. Subject DIDs, issuer DIDs, status-list 2021 revocation list — all spec-conformant.',
    status: 'preview',
    quarter: 'Q2 2026',
  },
  {
    code: 'VC.02', icon: Wallet,
    title: 'EUDI Wallet relying-party',
    body: 'Identra acts as a relying party against any conformant EU Digital Identity Wallet implementation. OID4VP presentation request flow, SD-JWT verification, trust-list anchored issuer validation.',
    status: 'roadmap',
    quarter: 'Q3 2026',
  },
  {
    code: 'VC.03', icon: Fingerprint,
    title: 'Decentralised Identifiers (DIDs)',
    body: 'did:web and did:key supported across Identra subject and issuer roles. Resolution via the conventional /.well-known/did.json endpoint plus universal resolver fallback.',
    status: 'preview',
    quarter: 'Q2 2026',
  },
  {
    code: 'VC.04', icon: KeyRound,
    title: 'Qualified electronic signatures',
    body: 'eIDAS LoA-substantial flows (live) extending to qualified electronic signatures (QES) for natural persons and qualified electronic seals (QESeal) for organisations.',
    status: 'live',
  },
  {
    code: 'VC.05', icon: Globe2,
    title: 'Cross-border attribute exchange',
    body: 'eIDAS-aligned cross-border attribute exchange via the eIDAS Network and via OID4VP presentations across EU member-state Wallet implementations.',
    status: 'roadmap',
    quarter: 'Q3 2026',
  },
  {
    code: 'VC.06', icon: ShieldCheck,
    title: 'Qualified Trust Service Provider',
    body: 'QTSP partnership lineage on file under MNDA. Identra qualified-flows execute under the partner QTSP’s trust-list anchoring; Identra’s own QTSP designation is in flight.',
    status: 'live',
  },
];

const STATUS_LABEL: Record<Capability['status'], { label: string; cls: string }> = {
  live:    { label: 'Live',     cls: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300' },
  preview: { label: 'Preview',  cls: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' },
  roadmap: { label: 'Roadmap',  cls: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300' },
};

const COMPLIANCE_REFS = [
  { code: 'VC.RG.01', framework: 'EU Regulation 2024/1183',          purpose: 'eIDAS 2.0 framework: EU Digital Identity Wallet mandate.',                                          deadline: 'Member-state Wallets in production by 2026' },
  { code: 'VC.RG.02', framework: 'EU Implementing Acts (ARF)',       purpose: 'Architecture Reference Framework for the EU Digital Identity Wallet — interoperability profiles.', deadline: 'Conformance baseline · 2025-2026' },
  { code: 'VC.RG.03', framework: 'OpenID for Verifiable Credentials', purpose: 'OID4VCI (issuance) + OID4VP (presentation) protocols underpinning EUDI Wallet.',                  deadline: 'Final 1.0 spec · 2025' },
  { code: 'VC.RG.04', framework: 'W3C VC Data Model 2.0',             purpose: 'Verifiable Credentials data model; underpins issuance and verification semantics.',               deadline: 'Recommendation · 2024' },
  { code: 'VC.RG.05', framework: 'ETSI EN 319 411-2',                 purpose: 'Policy and security requirements for QTSPs issuing qualified certificates.',                      deadline: 'Anchored via partner QTSP' },
];

export default function WalletPage() {
  const ld = breadcrumbListLd([
    { name: 'Home', href: '/' },
    { name: 'EU Digital Identity Wallet', href: '/wallet' },
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
          code="VC.00"
          eyebrow="EU Digital Identity Wallet"
          title={
            <>
              eIDAS 2.0 alignment,{' '}
              <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                Wallet-ready by mandate.
              </em>
            </>
          }
          description="EU Regulation 2024/1183 mandates Member-State Digital Identity Wallets in production by 2026. Identra is positioned as a conformant relying party + verifiable-credentials issuer, with W3C VC 2.0 data model, decentralised identifiers and the OID4VCI / OID4VP presentation protocols underpinning the rollout."
          crumbs={[{ label: 'Home', href: '/' }, { label: 'EU Digital Identity Wallet' }]}
        />

        {/* VC.CB — capability board */}
        <Reveal>
          <section
            id="vc-cb"
            aria-labelledby="vc-cb-heading"
            className="bg-gradient-to-b from-white to-[#F5F8FC] dark:from-slate-950 dark:to-slate-900 py-20 lg:py-24 border-y border-slate-200/60 dark:border-slate-800/60"
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
                <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">VC.CB</span>
                <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
                <span id="vc-cb-heading">Capability board · six surfaces</span>
              </div>
              <h2 className="mt-6 max-w-3xl font-serif text-3xl md:text-4xl font-medium tracking-tight text-slate-900 dark:text-white leading-[1.05]">
                Six capabilities,{' '}
                <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                  one trust framework.
                </em>
              </h2>
              <ul className="mt-12 grid md:grid-cols-2 gap-3">
                {CAPABILITIES.map((c) => {
                  const Icon = c.icon;
                  const status = STATUS_LABEL[c.status];
                  return (
                    <li
                      key={c.code}
                      className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span
                          className="w-11 h-11 rounded-xl bg-[#0A3A6B]/8 dark:bg-[#9ED0F9]/12 text-[#0A3A6B] dark:text-[#9ED0F9] flex items-center justify-center"
                          aria-hidden="true"
                        >
                          <Icon size={20} strokeWidth={1.75} />
                        </span>
                        <div className="flex flex-col items-end gap-1">
                          <span className="font-mono text-[10px] tracking-[0.22em] font-semibold text-[#0A3A6B] dark:text-[#9ED0F9]">
                            {c.code}
                          </span>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-[0.14em] font-semibold ${status.cls}`}>
                            {status.label}
                          </span>
                        </div>
                      </div>
                      <h3 className="mt-4 text-[15px] font-semibold tracking-tight text-slate-900 dark:text-white leading-snug">
                        {c.title}
                      </h3>
                      <p className="mt-2 text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed">
                        {c.body}
                      </p>
                      {c.quarter && (
                        <div className="mt-4 pt-3 border-t border-slate-200/70 dark:border-slate-800/60 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">
                          Target · {c.quarter}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        </Reveal>

        {/* VC.RG — regulatory anchor table */}
        <Reveal>
          <section
            id="vc-rg"
            aria-labelledby="vc-rg-heading"
            className="py-20 lg:py-24 bg-white dark:bg-slate-950 border-b border-slate-200/60 dark:border-slate-800/60"
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
                <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">VC.RG</span>
                <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
                <span id="vc-rg-heading">Regulatory anchor table</span>
              </div>
              <h2 className="mt-6 max-w-3xl font-serif text-2xl md:text-3xl font-medium tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                Tracked against{' '}
                <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                  every layer of the spec stack.
                </em>
              </h2>
              <div className="mt-10 rounded-2xl border border-slate-200/80 dark:border-slate-800/60 overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200/80 dark:border-slate-800/60">
                    <tr className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
                      <th className="px-5 py-4 font-semibold w-28">Code</th>
                      <th className="px-5 py-4 font-semibold w-72">Framework</th>
                      <th className="px-5 py-4 font-semibold">Purpose</th>
                      <th className="px-5 py-4 font-semibold w-56">Deadline / status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200/60 dark:divide-slate-800/60">
                    {COMPLIANCE_REFS.map((r) => (
                      <tr key={r.code} className="motion-safe:transition-colors hover:bg-slate-50/60 dark:hover:bg-slate-900/40">
                        <td className="px-5 py-4 align-top">
                          <span className="font-mono text-[11px] font-semibold text-[#0A3A6B] dark:text-[#9ED0F9]">{r.code}</span>
                        </td>
                        <td className="px-5 py-4 align-top text-[14px] font-semibold text-slate-900 dark:text-white">
                          {r.framework}
                        </td>
                        <td className="px-5 py-4 align-top text-[13px] text-slate-700 dark:text-slate-300 leading-snug">
                          {r.purpose}
                        </td>
                        <td className="px-5 py-4 align-top font-mono text-[11px] uppercase tracking-[0.14em] text-slate-500">
                          {r.deadline}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </Reveal>

        {/* VC.PT — presentation pattern */}
        <Reveal>
          <section
            id="vc-pt"
            aria-labelledby="vc-pt-heading"
            className="py-20 lg:py-24 bg-slate-50 dark:bg-slate-900/40 border-b border-slate-200/60 dark:border-slate-800/60"
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-5">
                <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
                  <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">VC.PT</span>
                  <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[180px]" />
                  <span id="vc-pt-heading">Presentation pattern</span>
                </div>
                <h2 className="mt-6 font-serif text-2xl md:text-3xl font-medium tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                  How a relying party{' '}
                  <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                    asks the citizen to prove something.
                  </em>
                </h2>
                <p className="mt-4 text-[14px] text-slate-600 dark:text-slate-400 leading-[1.65]">
                  Civitas service templates issue presentation requests through
                  Identra. The citizen receives the request inside their EU
                  Digital Identity Wallet, picks the credentials to present,
                  and the verifier returns a signed presentation under audit
                  envelope.
                </p>
                <ul className="mt-5 space-y-1.5 text-[13px] text-slate-600 dark:text-slate-400">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={12} className="text-emerald-600 dark:text-emerald-400 mt-1" aria-hidden="true" />
                    <span>OID4VP authorization request</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={12} className="text-emerald-600 dark:text-emerald-400 mt-1" aria-hidden="true" />
                    <span>Selective disclosure (SD-JWT)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={12} className="text-emerald-600 dark:text-emerald-400 mt-1" aria-hidden="true" />
                    <span>Trust-list anchored issuer validation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={12} className="text-emerald-600 dark:text-emerald-400 mt-1" aria-hidden="true" />
                    <span>Presentation receipt returned to the relying party</span>
                  </li>
                </ul>
              </div>
              <div className="lg:col-span-7">
                <div className="rounded-2xl bg-[#0A1F3D] border border-white/10 overflow-hidden">
                  <div className="flex items-center justify-between gap-3 px-4 py-2.5 border-b border-white/10">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-red-400/80" />
                      <span className="w-2 h-2 rounded-full bg-amber-400/80" />
                      <span className="w-2 h-2 rounded-full bg-emerald-400/80" />
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/55">
                      OID4VP · presentation request
                    </span>
                  </div>
                  <pre className="p-5 text-[12px] leading-relaxed text-white/90 font-mono overflow-x-auto">
{`# 1. Relying party (Civitas) opens an authorization request.
POST https://identra.flyttgo.tech/v1/oid4vp/request
{
  "presentation_definition": {
    "input_descriptors": [
      {
        "id": "qualified_id",
        "format": { "vc+sd-jwt": {} },
        "constraints": {
          "fields": [
            { "path": ["$.vct"],         "filter": { "const": "EuPidCredential" } },
            { "path": ["$.given_name"],  "intent_to_retain": false }
          ]
        }
      }
    ]
  }
}

# 2. Citizen Wallet returns a signed VP token.
{
  "vp_token": "eyJhbGc...",
  "presentation_submission": { ... },
  "state": "civitas_app_82..."
}

# 3. Identra verifies + writes the presentation receipt
#    into the audit envelope. Civitas template proceeds.`}
                  </pre>
                </div>
              </div>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <NextStepsGrid
            code="VC.NX"
            eyebrow="Where wallet readiness plugs in"
            titleLead="Wallet alignment is one"
            titleEmphasis="trust posture among several."
            intro="EU Digital Identity Wallet integration sits inside the broader Identra trust surface and the public-sector procurement narrative. The four pathways below take a programme from spec alignment to a signed pilot."
            steps={[
              { href: '/platforms/identra',  code: 'ID.00', icon: Fingerprint, title: 'Identra · identity infrastructure', body: 'The identity platform that issues qualified signatures, runs the relying-party flows and anchors the trust list.', meta: 'ID.00 · Identity' },
              { href: '/jurisdictions',      code: 'JU.00', icon: Globe2,      title: 'Jurisdiction posture',              body: 'Per-jurisdiction Wallet readiness — how UK, EU, KSA, UAE, Norway and ZA each map to the trust framework.',      meta: 'JU.UK / EU / NO' },
              { href: '/trust',              code: 'TC.00', icon: ShieldCheck, title: 'Trust artefacts',                   body: 'eIDAS, ETSI EN 319 411-2 alignment, SOC 2 + ISO 27001 attestations, the QTSP partner lineage on file.',          meta: 'TC.00 · 8 artefacts' },
              { href: '/consultation',       code: 'CB.00', icon: Compass,     title: 'Open a Wallet pilot',               body: 'Routed under CT.03 government pilot deployment session — relying-party scoping under MNDA.',                    meta: 'CT.03 · CB.00' },
            ]}
          />
        </Reveal>
      </main>
      <SiteFooter />
    </>
  );
}
