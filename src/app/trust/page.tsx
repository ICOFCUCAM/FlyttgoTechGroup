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
  FileText,
  Lock,
  ScrollText,
  AlertTriangle,
  Database,
  Activity,
  Server,
  Workflow,
  Compass,
  ArrowUpRight,
  Download,
  type LucideIcon,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Trust Center · TC.00 — FlyttGo Technologies Group',
  description:
    'Single procurement entry-point for FlyttGo trust artefacts — SOC 2 Type II, ISO 27001, GDPR DPA, subprocessor list, vulnerability disclosure, pen-test summary, BC/DR statement.',
  alternates: { canonical: '/trust' },
};

type Artefact = {
  code: string;
  icon: LucideIcon;
  title: string;
  body: string;
  meta: string;
  href?: string;
  status: 'live' | 'on-request' | 'scheduled';
};

const ARTEFACTS: Artefact[] = [
  {
    code: 'TC.01',
    icon: ShieldCheck,
    title: 'SOC 2 Type II report',
    body: 'Independent attestation of security, availability and confidentiality controls over a 12-month observation window. Issued by a Big-4 auditor; current report covers FY2026.',
    meta: 'Available under NDA · refreshed annually',
    status: 'on-request',
  },
  {
    code: 'TC.02',
    icon: ShieldCheck,
    title: 'ISO 27001 certificate',
    body: 'Information Security Management System (ISMS) certification across the FlyttGo platform infrastructure scope. Surveillance audits in years 2 and 3, recertification in year 3.',
    meta: 'Certificate PDF · public download',
    status: 'live',
  },
  {
    code: 'TC.03',
    icon: ScrollText,
    title: 'Data Processing Agreement (DPA)',
    body: 'Standard GDPR Article 28 controller-to-processor terms, EU SCCs (2021/914) annexed for restricted transfers, UK IDTA addendum for UK-bound data flows. Pre-signed by counsel.',
    meta: 'Word + PDF · countersign and return',
    href: '/legal/dpa',
    status: 'live',
  },
  {
    code: 'TC.04',
    icon: Database,
    title: 'Subprocessor list',
    body: 'Live registry of every subprocessor that touches customer data — name, function, region of processing, certification status. 30-day notification on any change.',
    meta: 'Live registry · subscribe to changes',
    href: '/legal/subprocessors',
    status: 'live',
  },
  {
    code: 'TC.05',
    icon: AlertTriangle,
    title: 'Vulnerability disclosure policy',
    body: 'Coordinated disclosure terms for security researchers. PGP-signed channel, 90-day disclosure window aligned with industry norm, safe-harbour for good-faith research.',
    meta: 'Public policy · security@flyttgotech.com',
    href: '/security#disclosure',
    status: 'live',
  },
  {
    code: 'TC.06',
    icon: FileText,
    title: 'Penetration-test summary',
    body: 'Executive summary of the most recent third-party penetration test. Full technical report (with remediation status) available under MNDA after a scoping session.',
    meta: 'Summary · public · full report under NDA',
    status: 'on-request',
  },
  {
    code: 'TC.07',
    icon: Activity,
    title: 'Business continuity & DR',
    body: 'Recovery objectives per deployment substrate — RPO ≤ 15 min, RTO ≤ 4 hours for SaaS; tighter envelopes available for sovereign tenants. Tabletop exercise log refreshed quarterly.',
    meta: 'BC/DR statement · annual tabletop summary',
    status: 'live',
  },
  {
    code: 'TC.08',
    icon: Lock,
    title: 'Information security policy pack',
    body: 'Master IS policy + 14 supporting policies (access control, cryptography, secure development, incident response, third-party risk, etc.) — board-approved, version-tracked.',
    meta: 'Policy pack · sharable under NDA',
    status: 'on-request',
  },
];

const STATUS_LABEL: Record<Artefact['status'], { text: string; cls: string }> = {
  live:         { text: 'Live download',  cls: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300' },
  'on-request': { text: 'On request',     cls: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300' },
  scheduled:    { text: 'Scheduled',      cls: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300' },
};

export default function TrustCenterPage() {
  const ld = breadcrumbListLd([
    { name: 'Home', href: '/' },
    { name: 'Trust Center', href: '/trust' },
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
          code="TC.00"
          eyebrow="Trust Center"
          title={
            <>
              One procurement entry-point{' '}
              <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                for every trust artefact.
              </em>
            </>
          }
          description="SOC 2 Type II, ISO 27001, GDPR DPA, subprocessor list, vulnerability disclosure policy, pen-test summary and BC/DR posture — consolidated on one page so security and procurement teams don't chase artefacts across the site."
          crumbs={[{ label: 'Home', href: '/' }, { label: 'Trust Center' }]}
        />

        {/* TC.IDX — artefact grid */}
        <Reveal>
          <section
            id="tc-idx"
            aria-labelledby="tc-idx-heading"
            className="bg-gradient-to-b from-white to-[#F5F8FC] dark:from-slate-950 dark:to-slate-900 py-20 lg:py-24 border-y border-slate-200/60 dark:border-slate-800/60"
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
                <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">TC.IDX</span>
                <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
                <span>Trust artefacts · eight surfaces</span>
              </div>
              <h2
                id="tc-idx-heading"
                className="mt-6 max-w-3xl font-serif text-3xl md:text-4xl font-medium tracking-tight text-slate-900 dark:text-white leading-[1.05]"
              >
                Pick the artefact{' '}
                <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                  procurement asks for first.
                </em>
              </h2>

              <ul className="mt-12 grid md:grid-cols-2 gap-4">
                {ARTEFACTS.map((a) => {
                  const Icon = a.icon;
                  const status = STATUS_LABEL[a.status];
                  const Wrapper = a.href ? Link : 'div';
                  const wrapperProps = a.href ? { href: a.href } : {};
                  return (
                    <li key={a.code}>
                      <Wrapper
                        {...(wrapperProps as Record<string, string>)}
                        className={`group flex flex-col h-full p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 ${a.href ? 'hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9]/40 focus-visible:ring-offset-[3px]' : ''}`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <span
                            className="w-11 h-11 rounded-xl bg-[#0A3A6B]/8 dark:bg-[#9ED0F9]/12 text-[#0A3A6B] dark:text-[#9ED0F9] flex items-center justify-center"
                            aria-hidden="true"
                          >
                            <Icon size={20} strokeWidth={1.75} />
                          </span>
                          <div className="flex flex-col items-end gap-1">
                            <span className="font-mono text-[10px] tracking-[0.22em] font-semibold text-[#0A3A6B] dark:text-[#9ED0F9]">
                              {a.code}
                            </span>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-[0.14em] font-semibold ${status.cls}`}>
                              {status.text}
                            </span>
                          </div>
                        </div>
                        <h3 className="mt-5 font-serif text-lg font-medium tracking-tight text-slate-900 dark:text-white leading-snug">
                          {a.title}
                        </h3>
                        <p className="mt-2 text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed flex-1">
                          {a.body}
                        </p>
                        <div className="mt-5 pt-4 border-t border-slate-200/70 dark:border-slate-800/60 flex items-center justify-between gap-2">
                          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">
                            {a.meta}
                          </span>
                          {a.href ? (
                            <ArrowUpRight
                              size={13}
                              className="text-slate-400 group-hover:text-[#0A3A6B] dark:group-hover:text-[#9ED0F9] motion-safe:transition-colors flex-shrink-0"
                              aria-hidden="true"
                            />
                          ) : (
                            <Download
                              size={12}
                              className="text-slate-400 flex-shrink-0"
                              aria-hidden="true"
                            />
                          )}
                        </div>
                      </Wrapper>
                    </li>
                  );
                })}
              </ul>

              <p className="mt-10 max-w-3xl font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400 leading-relaxed">
                Live downloads ship from the page. Items marked 'on request'
                are released after a brief MNDA — the consultation desk
                routes the request within one business day.
              </p>
            </div>
          </section>
        </Reveal>

        {/* TC.HOW — how to engage */}
        <Reveal>
          <section className="py-20 lg:py-24 bg-white dark:bg-slate-950 border-b border-slate-200/60 dark:border-slate-800/60">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
                <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">TC.HOW</span>
                <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
                <span>How to engage with the trust desk</span>
              </div>
              <h2 className="mt-6 max-w-3xl font-serif text-3xl md:text-4xl font-medium tracking-tight text-slate-900 dark:text-white leading-[1.05]">
                Procurement-grade routing,{' '}
                <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                  one business day SLA.
                </em>
              </h2>
              <ol className="mt-10 grid md:grid-cols-3 gap-4">
                {[
                  { code: 'TC.H1', title: 'Open a trust request', body: 'Email security@flyttgotech.com or open the consultation booking — pick the artefact list and your jurisdiction.' },
                  { code: 'TC.H2', title: 'MNDA + scoping',       body: 'Mutual NDA pre-signed and ready. Trust desk replies within one business day with an artefact bundle and any clarifying questions.' },
                  { code: 'TC.H3', title: 'Bundle delivery',       body: 'Bundle delivered via secure share. Audit log of every artefact requested and shared, retained for the customer record.' },
                ].map((s) => (
                  <li key={s.code} className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60">
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] font-semibold text-[#0A3A6B] dark:text-[#9ED0F9]">
                      {s.code}
                    </span>
                    <h3 className="mt-3 text-[15px] font-semibold tracking-tight text-slate-900 dark:text-white leading-snug">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed">
                      {s.body}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <NextStepsGrid
            code="TC.NX"
            eyebrow="Where the trust review goes next"
            titleLead="Trust artefacts plug into a"
            titleEmphasis="larger procurement narrative."
            intro="Once the trust review clears, the procurement conversation turns to deployment substrate, government framework alignment and engagement intake. The four pathways below route into the next surface."
            steps={[
              { href: '/security',                   code: 'CR.00', icon: ShieldCheck, title: 'Security posture detail',  body: 'SOC 2 controls, ISO 27001 scope, the supporting cryptography and identity stack.', meta: 'CR.00 · TS.00' },
              { href: '/sovereign',                  code: 'SV.00', icon: Server,      title: 'Sovereign deployment',     body: 'National hosting + data-residency posture across MENA, Africa and EU.',           meta: 'SV.00' },
              { href: '/procurement-compatibility',  code: 'PC.00', icon: Workflow,    title: 'Procurement frameworks',  body: 'DPS · G-Cloud · OJEU · national framework alignment per jurisdiction.',           meta: 'PC.00' },
              { href: '/consultation',               code: 'CB.00', icon: Compass,     title: 'Open the trust desk',     body: 'Five-step consultation intake — trust artefacts routed under CT.03 government pilot or CT.01 platform architecture.', meta: 'CT.01 · CT.03' },
            ]}
          />
        </Reveal>
      </main>
      <SiteFooter />
    </>
  );
}
