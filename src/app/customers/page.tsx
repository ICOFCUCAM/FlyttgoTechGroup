import type { Metadata } from 'next';
import Link from '@/components/flytt/LocaleLink';
import Navbar from '@/components/flytt/Navbar';
import PageHero from '@/components/flytt/PageHero';
import SiteFooter from '@/components/flytt/SiteFooter';
import { Reveal } from '@/components/flytt/Reveal';
import NextStepsGrid from '@/components/flytt/NextStepsGrid';
import { breadcrumbListLd, jsonLdScript } from '@/lib/seo/jsonld';
import { caseStudies } from '@/data/case-studies';
import {
  Landmark,
  Truck,
  GraduationCap,
  Network,
  Briefcase,
  Building2,
  ArrowUpRight,
  Compass,
  Layers3,
  Globe2,
  Workflow,
  type LucideIcon,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Customer reference programmes · CS.00 — FlyttGo Technologies Group',
  description:
    'Reference programmes — government identity, regional mobility, education networks, municipal modernisation, regulated marketplaces, enterprise fleet operations. Modules used, deployment substrate, delivered metrics.',
  alternates: { canonical: '/customers' },
};

const SECTOR_ICON: Record<string, LucideIcon> = {
  Government: Landmark,
  Education:  GraduationCap,
  Mobility:   Truck,
  Marketplace: Network,
  Enterprise: Briefcase,
  Financial:  Building2,
};

const DEPLOY_LABEL: Record<string, string> = {
  'DM.01': 'Managed SaaS',
  'DM.02': 'Customer cloud',
  'DM.03': 'Sovereign DC',
};

export default function CustomersPage() {
  const ld = breadcrumbListLd([
    { name: 'Home', href: '/' },
    { name: 'Customers', href: '/customers' },
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
          code="CS.00"
          eyebrow="Reference programmes"
          title={
            <>
              Six programmes,{' '}
              <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                one substrate underneath.
              </em>
            </>
          }
          description="Anonymised reference programmes spanning government, mobility, education, municipal modernisation, marketplace operations and enterprise fleet. Modules selected, deployment substrate, delivery duration and the metrics that landed."
          crumbs={[{ label: 'Home', href: '/' }, { label: 'Customers' }]}
        />

        {/* CS.IDX — programme grid */}
        <Reveal>
          <section
            id="cs-idx"
            aria-labelledby="cs-idx-heading"
            className="bg-gradient-to-b from-white to-[#F5F8FC] dark:from-slate-950 dark:to-slate-900 py-20 lg:py-24 border-y border-slate-200/60 dark:border-slate-800/60"
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
                <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">CS.IDX</span>
                <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
                <span>Six reference programmes</span>
              </div>
              <h2
                id="cs-idx-heading"
                className="mt-6 max-w-3xl font-serif text-3xl md:text-4xl font-medium tracking-tight text-slate-900 dark:text-white leading-[1.05]"
              >
                Programmes anonymised{' '}
                <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                  to the procurement style.
                </em>
              </h2>
              <p className="mt-4 max-w-3xl text-base text-slate-600 dark:text-slate-400 leading-[1.65]">
                Named-customer references are released under a separate
                consent-controlled wall after written agreement. The
                programme shape, module selection and delivered metrics
                below are accurate to the engagements they describe.
              </p>

              <ul className="mt-12 grid lg:grid-cols-2 gap-4">
                {caseStudies.map((c) => {
                  const Icon = SECTOR_ICON[c.sector] ?? Building2;
                  return (
                    <li key={c.slug}>
                      <Link
                        href={`/customers/${c.slug}`}
                        className="group flex flex-col h-full p-7 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9]/40 focus-visible:ring-offset-[3px]"
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
                              {c.code}
                            </span>
                            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400">
                              {c.sector} · {c.region}
                            </span>
                          </div>
                        </div>
                        <h3 className="mt-5 font-serif text-xl font-medium tracking-tight text-slate-900 dark:text-white leading-snug">
                          {c.customer}
                        </h3>
                        <div className="mt-1 text-[13px] font-medium text-slate-600 dark:text-slate-400">
                          {c.programme}
                        </div>
                        <p className="mt-3 text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed flex-1">
                          {c.summary}
                        </p>

                        <ul className="mt-5 grid grid-cols-2 gap-3">
                          {c.metrics.slice(0, 4).map((m) => (
                            <li key={m.label} className="rounded-lg p-3 bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60">
                              <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-slate-400">
                                {m.label}
                              </div>
                              <div className="mt-1 font-serif text-base font-medium text-slate-900 dark:text-white tabular-nums">
                                {m.value}
                              </div>
                            </li>
                          ))}
                        </ul>

                        <div className="mt-5 pt-4 border-t border-slate-200/70 dark:border-slate-800/60 flex items-center justify-between gap-3">
                          <div className="flex flex-wrap items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-slate-500">
                            <span className="px-2 py-0.5 rounded-md bg-[#0A3A6B]/8 dark:bg-[#9ED0F9]/12 text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">
                              {c.tier}
                            </span>
                            <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                              {c.deployment} · {DEPLOY_LABEL[c.deployment]}
                            </span>
                            <span className="text-slate-400">{c.duration}</span>
                          </div>
                          <ArrowUpRight
                            size={13}
                            className="text-slate-400 group-hover:text-[#0A3A6B] dark:group-hover:text-[#9ED0F9] motion-safe:transition-colors flex-shrink-0"
                            aria-hidden="true"
                          />
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <NextStepsGrid
            code="CS.NX"
            eyebrow="Where these programmes go next"
            titleLead="Each programme starts with"
            titleEmphasis="a structured intake."
            intro="Reference programmes follow the same intake the consultation desk routes today. Pick the surface closest to the programme shape you're scoping."
            steps={[
              { href: '/platforms',     code: 'PL.00', icon: Layers3,  title: 'Modules these programmes use', body: 'Eight platform modules — Transify, Workverge, Civitas, EduPro, Identra, Payvera, Ledgera, FlyttGo Marketplace.', meta: 'PL.00 · 8 modules' },
              { href: '/deployment',    code: 'DM.00', icon: Globe2,   title: 'Substrates these programmes ran on', body: 'Managed SaaS, customer cloud and sovereign datacenter — picked per programme.',                       meta: 'DM.01 · DM.02 · DM.03' },
              { href: '/engineering',   code: 'SE.00', icon: Workflow, title: 'Tier ladder for new programmes', body: 'L.01 → L.06 with audience, delivery and deployment matrix on the page.',                                  meta: 'L.01 → L.06' },
              { href: '/consultation',  code: 'CB.00', icon: Compass,  title: 'Open a programme intake',        body: 'Five-step booking routed to a solution architect within one business day.',                              meta: 'CT.01 → CT.04' },
            ]}
          />
        </Reveal>
      </main>
      <SiteFooter />
    </>
  );
}
