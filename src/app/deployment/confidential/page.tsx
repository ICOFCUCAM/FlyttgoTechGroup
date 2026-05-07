import type { Metadata } from 'next';
import Link from '@/components/flytt/LocaleLink';
import Navbar from '@/components/flytt/Navbar';
import PageHero from '@/components/flytt/PageHero';
import SiteFooter from '@/components/flytt/SiteFooter';
import { Reveal } from '@/components/flytt/Reveal';
import NextStepsGrid from '@/components/flytt/NextStepsGrid';
import { breadcrumbListLd, jsonLdScript } from '@/lib/seo/jsonld';
import {
  Lock,
  ShieldCheck,
  Cpu,
  Eye,
  Workflow,
  Compass,
  ArrowUpRight,
  CheckCircle2,
  Layers3,
  type LucideIcon,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Confidential compute · DM.04 — FlyttGo Technologies Group',
  description:
    'Fourth deployment substrate — TEE-isolated workloads on AWS Nitro Enclaves, Intel SGX or AMD SEV-SNP. Attestation-verifiable, key never leaves the enclave, optional homomorphic encryption for analytics.',
  alternates: { canonical: '/deployment/confidential' },
};

type Pillar = {
  code: string;
  icon: LucideIcon;
  title: string;
  body: string;
};

const PILLARS: Pillar[] = [
  {
    code: 'CC.PR.01', icon: Lock,
    title: 'TEE-isolated workloads',
    body: 'Workloads run inside hardware-enforced trusted execution environments. AWS Nitro Enclaves on AWS, Intel SGX on customer-cloud, AMD SEV-SNP on sovereign datacenter. The vendor (FlyttGo) cannot read tenant memory, ever, even from a privileged operator account.',
  },
  {
    code: 'CC.PR.02', icon: ShieldCheck,
    title: 'Attestation on every spin-up',
    body: 'Every TEE instance produces a hardware-signed attestation report on boot — measuring the kernel, the runtime, and the workload code. Tenants verify the attestation against a published manifest before releasing any tenant-managed key.',
  },
  {
    code: 'CC.PR.03', icon: Eye,
    title: 'Optional homomorphic analytics',
    body: 'For programmes where even the trusted enclave cannot see plaintext (defence, intelligence), Civitas + EduPro analytics can run under partially-homomorphic encryption. Throughput is lower; cryptographic guarantees are absolute.',
  },
  {
    code: 'CC.PR.04', icon: Cpu,
    title: 'BYOK · keys never leave',
    body: 'Tenant-managed keys live in a tenant-controlled HSM and are released only to an attested enclave for a bounded session. FlyttGo never holds key material; rotation is initiated tenant-side.',
  },
];

type Mode = {
  code: string;
  hardware: string;
  cloud: string;
  attestation: string;
  status: 'live' | 'preview' | 'planned';
  caveat?: string;
};

const MODES: Mode[] = [
  { code: 'DM.04.NE', hardware: 'AWS Nitro Enclaves',  cloud: 'AWS · regions per tenant', attestation: 'Nitro-signed attestation document',         status: 'preview' },
  { code: 'DM.04.SG', hardware: 'Intel SGX',           cloud: 'Customer-cloud · Azure / GCP confidential VMs', attestation: 'Intel DCAP / Azure Attestation', status: 'preview' },
  { code: 'DM.04.SP', hardware: 'AMD SEV-SNP',         cloud: 'Customer-cloud + sovereign datacenter',         attestation: 'SEV-SNP guest attestation report',  status: 'preview' },
  { code: 'DM.04.NV', hardware: 'NVIDIA Confidential Computing (H100)', cloud: 'Customer-cloud · GPU-accelerated workloads', attestation: 'NVIDIA local + remote attestation', status: 'planned',
    caveat: 'For AI inference under TEE — landing alongside the AI procurement assistant in Q3 2026.' },
];

const STATUS_LABEL: Record<Mode['status'], { label: string; cls: string }> = {
  live:    { label: 'Live',    cls: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300' },
  preview: { label: 'Preview', cls: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' },
  planned: { label: 'Planned', cls: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300' },
};

const USE_CASES = [
  { code: 'CC.UC.01', title: 'Defence + intelligence',     body: 'Workloads where even the cloud operator cannot see plaintext. Air-gapped sovereign deployments overlap with confidential compute for the strongest posture.' },
  { code: 'CC.UC.02', title: 'Regulated finance',          body: 'PCI DSS Level 1 workloads with cardholder data, treasury operations, AML investigation flows. Memory-isolation removes the privileged-insider attack vector.' },
  { code: 'CC.UC.03', title: 'Healthcare + research',      body: 'Multi-party computation across hospital networks where the data union must run without any party seeing the others. Civitas + EduPro analytics under confidential compute.' },
  { code: 'CC.UC.04', title: 'Sovereign cross-border',     body: 'EU member-state programmes that share telemetry across borders without violating data-residency law. Each enclave is regulator-attested in-country.' },
];

export default function ConfidentialComputePage() {
  const ld = breadcrumbListLd([
    { name: 'Home', href: '/' },
    { name: 'Deployment', href: '/deployment' },
    { name: 'Confidential compute · DM.04', href: '/deployment/confidential' },
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
          code="DM.04"
          eyebrow="Confidential compute"
          title={
            <>
              The fourth substrate,{' '}
              <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                even the vendor can&apos;t read.
              </em>
            </>
          }
          description="A fourth deployment substrate beyond DM.01 managed SaaS, DM.02 customer cloud and DM.03 sovereign datacenter. Workloads run inside hardware-enforced TEEs (Nitro Enclaves, Intel SGX, AMD SEV-SNP) — FlyttGo holds no tenant key material, ever, and cannot read memory even from privileged operator accounts."
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'Deployment', href: '/deployment' },
            { label: 'Confidential compute · DM.04' },
          ]}
        />

        {/* CC.PR — pillars */}
        <Reveal>
          <section className="bg-gradient-to-b from-white to-[#F5F8FC] dark:from-slate-950 dark:to-slate-900 py-20 lg:py-24 border-y border-slate-200/60 dark:border-slate-800/60">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
                <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">CC.PR</span>
                <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
                <span>Confidential-compute pillars</span>
              </div>
              <h2 className="mt-6 max-w-3xl font-serif text-3xl md:text-4xl font-medium tracking-tight text-slate-900 dark:text-white leading-[1.05]">
                Four anchors{' '}
                <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                  that move the trust boundary.
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

        {/* CC.MD — supported modes */}
        <Reveal>
          <section className="py-20 lg:py-24 bg-white dark:bg-slate-950 border-b border-slate-200/60 dark:border-slate-800/60">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
                <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">CC.MD</span>
                <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
                <span>Supported TEE modes</span>
              </div>
              <h2 className="mt-6 max-w-3xl font-serif text-3xl md:text-4xl font-medium tracking-tight text-slate-900 dark:text-white leading-[1.05]">
                Four hardware modes,{' '}
                <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                  one orchestration contract.
                </em>
              </h2>
              <div className="mt-10 rounded-2xl border border-slate-200/80 dark:border-slate-800/60 overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200/80 dark:border-slate-800/60">
                    <tr className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
                      <th className="px-5 py-4 font-semibold w-28">Code</th>
                      <th className="px-5 py-4 font-semibold w-56">Hardware</th>
                      <th className="px-5 py-4 font-semibold">Cloud / substrate</th>
                      <th className="px-5 py-4 font-semibold">Attestation</th>
                      <th className="px-5 py-4 font-semibold w-32">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200/60 dark:divide-slate-800/60">
                    {MODES.map((m) => {
                      const status = STATUS_LABEL[m.status];
                      return (
                        <tr key={m.code} className="motion-safe:transition-colors hover:bg-slate-50/60 dark:hover:bg-slate-900/40">
                          <td className="px-5 py-4 align-top">
                            <span className="font-mono text-[11px] font-semibold text-[#0A3A6B] dark:text-[#9ED0F9]">{m.code}</span>
                          </td>
                          <td className="px-5 py-4 align-top text-[13px] font-semibold text-slate-900 dark:text-white">
                            {m.hardware}
                          </td>
                          <td className="px-5 py-4 align-top text-[12px] text-slate-700 dark:text-slate-300">
                            {m.cloud}
                            {m.caveat && (
                              <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-500 italic">{m.caveat}</p>
                            )}
                          </td>
                          <td className="px-5 py-4 align-top text-[12px] font-mono text-slate-600 dark:text-slate-400">
                            {m.attestation}
                          </td>
                          <td className="px-5 py-4 align-top">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-[0.14em] font-semibold ${status.cls}`}>
                              {status.label}
                            </span>
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

        {/* CC.UC — use cases */}
        <Reveal>
          <section className="py-20 lg:py-24 bg-slate-50 dark:bg-slate-900/40 border-b border-slate-200/60 dark:border-slate-800/60">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
                <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">CC.UC</span>
                <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
                <span>Where confidential compute earns its complexity</span>
              </div>
              <ul className="mt-12 grid md:grid-cols-2 gap-3">
                {USE_CASES.map((u) => (
                  <li
                    key={u.code}
                    className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60"
                  >
                    <div className="flex items-start gap-3">
                      <CheckCircle2 size={16} className="text-emerald-600 dark:text-emerald-400 mt-1 flex-shrink-0" aria-hidden="true" />
                      <div>
                        <span className="font-mono text-[10px] tracking-[0.22em] font-semibold text-[#0A3A6B] dark:text-[#9ED0F9]">
                          {u.code}
                        </span>
                        <h3 className="mt-2 text-[15px] font-semibold tracking-tight text-slate-900 dark:text-white">
                          {u.title}
                        </h3>
                        <p className="mt-2 text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed">
                          {u.body}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-8 max-w-3xl font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400 leading-relaxed">
                Most programmes don&apos;t need DM.04. The 9-criterion deployment-substrate matrix in the
                research library (RS.08) shows when DM.02 customer cloud or DM.03 sovereign is the right
                call instead.
              </p>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <NextStepsGrid
            code="CC.NX"
            eyebrow="Where confidential compute plugs in"
            titleLead="DM.04 sits inside the broader"
            titleEmphasis="four-substrate framework."
            intro="Confidential compute is one shape among four. The four pathways below take a procurement team from this surface to a signed engagement."
            steps={[
              { href: '/deployment',  code: 'DM.00', icon: Layers3,    title: 'All four substrates',     body: 'DM.01 SaaS · DM.02 customer cloud · DM.03 sovereign · DM.04 confidential. Compatibility matrix on the page.', meta: 'DM.01 → DM.04' },
              { href: '/research/deployment-substrate-selection', code: 'RS.08', icon: Workflow, title: 'Substrate selection runbook', body: '9-criterion decision matrix that picks the right substrate per programme — surfaces the right answer in under an hour.', meta: 'RS.08 · 20 pages' },
              { href: '/post-quantum', code: 'PQ.00', icon: ShieldCheck, title: 'Post-quantum',            body: 'TEE attestation + KMS migrate alongside the platform PQ programme. BYOK with ML-KEM key wrap planned Q2 2027.',    meta: 'PQ.00 · 8 surfaces' },
              { href: '/consultation', code: 'CB.00', icon: Compass,    title: 'Open a confidential-compute scoping', body: 'Routed under CT.03 government pilot deployment session — TEE-led architecture review under MNDA.',          meta: 'CT.03 · CB.00' },
            ]}
          />
        </Reveal>
      </main>
      <SiteFooter />
    </>
  );
}
