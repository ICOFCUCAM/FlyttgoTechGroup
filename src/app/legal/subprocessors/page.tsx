import type { Metadata } from 'next';
import Link from '@/components/flytt/LocaleLink';
import Navbar from '@/components/flytt/Navbar';
import PageHero from '@/components/flytt/PageHero';
import SiteFooter from '@/components/flytt/SiteFooter';
import { Reveal } from '@/components/flytt/Reveal';
import { breadcrumbListLd, jsonLdScript } from '@/lib/seo/jsonld';
import { ArrowUpRight, Database, Bell } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Subprocessor list · TC.04 — FlyttGo Technologies Group',
  description:
    'Live registry of every subprocessor that touches customer data — name, function, region of processing, certification status. 30-day notification on changes.',
  alternates: { canonical: '/legal/subprocessors' },
};

type Subprocessor = {
  code: string;
  name: string;
  function: string;
  region: string;
  certs: string[];
};

const SUBPROCESSORS: Subprocessor[] = [
  { code: 'SP.001', name: 'AWS · EU regions',          function: 'Compute, storage, network for managed-SaaS deployments',         region: 'EU (eu-west-1, eu-central-1, eu-north-1)', certs: ['SOC 2', 'ISO 27001', 'ISO 27017', 'ISO 27018', 'C5'] },
  { code: 'SP.002', name: 'Microsoft Azure · EU',       function: 'Compute, storage for customer-cloud deployments (DM.02)',         region: 'EU (West Europe, North Europe)',           certs: ['SOC 2', 'ISO 27001', 'C5'] },
  { code: 'SP.003', name: 'Google Cloud · EU',          function: 'Compute, storage for customer-cloud deployments (DM.02)',         region: 'EU (europe-west1, europe-west4)',          certs: ['SOC 2', 'ISO 27001', 'C5'] },
  { code: 'SP.004', name: 'Cloudflare',                  function: 'Edge CDN, WAF, DDoS protection',                                 region: 'Global edge · EU PoPs prioritised',        certs: ['SOC 2', 'ISO 27001', 'PCI DSS'] },
  { code: 'SP.005', name: 'Fastly',                      function: 'Optional secondary edge for marketplace tenants',                region: 'Global · EU PoPs',                          certs: ['SOC 2', 'ISO 27001'] },
  { code: 'SP.006', name: 'Datadog',                     function: 'Application observability + log aggregation',                    region: 'EU region (Frankfurt)',                     certs: ['SOC 2', 'ISO 27001', 'HIPAA'] },
  { code: 'SP.007', name: 'PagerDuty',                   function: 'On-call alerting + incident response coordination',              region: 'EU region',                                 certs: ['SOC 2', 'ISO 27001'] },
  { code: 'SP.008', name: 'Sentry',                      function: 'Error tracking + performance monitoring',                        region: 'EU region',                                 certs: ['SOC 2', 'ISO 27001'] },
  { code: 'SP.009', name: 'Twilio (SendGrid)',           function: 'Transactional email delivery',                                   region: 'EU + US · per-tenant routing',              certs: ['SOC 2', 'ISO 27001'] },
  { code: 'SP.010', name: 'Stripe',                      function: 'One of multiple Payvera-orchestrated payment rails',             region: 'EU region',                                 certs: ['SOC 2', 'PCI DSS Level 1'] },
];

export default function SubprocessorsPage() {
  const ld = breadcrumbListLd([
    { name: 'Home', href: '/' },
    { name: 'Trust Center', href: '/trust' },
    { name: 'Subprocessors', href: '/legal/subprocessors' },
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
          code="TC.04"
          eyebrow="Subprocessor list"
          title={
            <>
              Live registry,{' '}
              <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                30-day change notification.
              </em>
            </>
          }
          description="Every subprocessor that touches customer data — name, function, region of processing, certification status. Subscribe to changes via the trust desk; new or changed subprocessors notified 30 days before activation under standard DPA terms."
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'Trust Center', href: '/trust' },
            { label: 'Subprocessors' },
          ]}
        />

        <Reveal>
          <section className="py-16 lg:py-20 bg-gradient-to-b from-white to-[#F5F8FC] dark:from-slate-950 dark:to-slate-900 border-y border-slate-200/60 dark:border-slate-800/60">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400 mb-8">
                <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">TC.04.LR</span>
                <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
                <span>Live registry · {SUBPROCESSORS.length} entries</span>
              </div>

              <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/60 overflow-hidden bg-white dark:bg-slate-900">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200/80 dark:border-slate-800/60">
                    <tr className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
                      <th className="px-5 py-4 font-semibold w-24">Code</th>
                      <th className="px-5 py-4 font-semibold w-56">Subprocessor</th>
                      <th className="px-5 py-4 font-semibold">Function</th>
                      <th className="px-5 py-4 font-semibold w-56">Region of processing</th>
                      <th className="px-5 py-4 font-semibold">Certifications</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200/60 dark:divide-slate-800/60">
                    {SUBPROCESSORS.map((s) => (
                      <tr key={s.code} className="motion-safe:transition-colors hover:bg-slate-50/60 dark:hover:bg-slate-900/40">
                        <td className="px-5 py-4 align-top">
                          <span className="inline-flex items-center gap-2">
                            <Database size={13} className="text-[#0A3A6B] dark:text-[#9ED0F9]" aria-hidden="true" />
                            <span className="font-mono text-[11px] font-semibold text-[#0A3A6B] dark:text-[#9ED0F9]">{s.code}</span>
                          </span>
                        </td>
                        <td className="px-5 py-4 align-top text-[14px] font-semibold text-slate-900 dark:text-white">
                          {s.name}
                        </td>
                        <td className="px-5 py-4 align-top text-[13px] text-slate-700 dark:text-slate-300 leading-snug">
                          {s.function}
                        </td>
                        <td className="px-5 py-4 align-top text-[12px] text-slate-600 dark:text-slate-400 font-mono">
                          {s.region}
                        </td>
                        <td className="px-5 py-4 align-top">
                          <div className="flex flex-wrap gap-1">
                            {s.certs.map((c) => (
                              <span
                                key={c}
                                className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-[10px] uppercase tracking-[0.12em] text-slate-600 dark:text-slate-400"
                              >
                                {c}
                              </span>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="py-20 lg:py-24 bg-white dark:bg-slate-950">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="rounded-3xl p-10 lg:p-14 bg-[#0A1F3D] text-white border border-white/10">
                <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#9ED0F9] font-semibold flex items-center gap-3">
                  <Bell size={14} className="text-[#D6B575]" aria-hidden="true" />
                  TC.04.NX · subscribe to changes
                </div>
                <h2 className="mt-4 font-serif text-3xl md:text-4xl font-medium tracking-tight leading-[1.05] max-w-3xl">
                  Get notified{' '}
                  <em className="not-italic font-serif italic font-normal text-[#D6B575]">
                    30 days before any change.
                  </em>
                </h2>
                <p className="mt-4 max-w-2xl text-base text-white/70 leading-[1.65]">
                  Subprocessor change notifications go to your trust desk
                  contact under standard DPA terms. Any addition, region change
                  or function change routes 30 days in advance with the
                  rationale and the data classes affected.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Link
                    href="/contact?intent=subprocessor-subscribe"
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#D6B575] text-[#0A1F3D] text-sm font-semibold rounded-lg hover:bg-[#D6B575]/90 motion-safe:transition-colors"
                  >
                    Subscribe to subprocessor updates
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </Link>
                  <Link
                    href="/trust"
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/[0.06] border border-white/15 text-white text-sm font-semibold rounded-lg hover:bg-white/[0.10] hover:border-white/25 motion-safe:transition-colors"
                  >
                    Back to Trust Center
                    <ArrowUpRight size={13} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </Reveal>
      </main>
      <SiteFooter />
    </>
  );
}
