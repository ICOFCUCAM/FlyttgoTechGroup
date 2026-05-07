import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from '@/components/flytt/LocaleLink';
import Navbar from '@/components/flytt/Navbar';
import PageHero from '@/components/flytt/PageHero';
import SiteFooter from '@/components/flytt/SiteFooter';
import { Reveal } from '@/components/flytt/Reveal';
import { breadcrumbListLd, jsonLdScript } from '@/lib/seo/jsonld';
import { JURISDICTIONS } from '@/data/jurisdictions';
import { caseStudies } from '@/data/case-studies';
import { CheckCircle2, Briefcase, ShieldCheck, Globe2, ArrowUpRight, Compass } from 'lucide-react';

export const dynamic = 'force-dynamic';

const DEPLOY_LABEL: Record<string, string> = {
  'DM.01': 'Managed SaaS',
  'DM.02': 'Customer cloud',
  'DM.03': 'Sovereign DC',
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const j = JURISDICTIONS.find((x) => x.slug === params.slug);
  if (!j) return {};
  return {
    title: `${j.code} · ${j.name} — FlyttGo Technologies Group`,
    description: j.positioning,
    alternates: { canonical: `/jurisdictions/${j.slug}` },
  };
}

export default function JurisdictionPage({ params }: { params: { slug: string } }) {
  const j = JURISDICTIONS.find((x) => x.slug === params.slug);
  if (!j) notFound();

  const refs = caseStudies.filter((c) => j.caseRefs.includes(c.code));

  const ld = breadcrumbListLd([
    { name: 'Home', href: '/' },
    { name: 'Jurisdictions', href: '/jurisdictions' },
    { name: j.name, href: `/jurisdictions/${j.slug}` },
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
          code={j.code}
          eyebrow={
            <span className="inline-flex items-center gap-2">
              <span className="text-base" aria-hidden="true">{j.flag}</span>
              <span>{j.region}</span>
            </span>
          }
          title={
            <>
              {j.name}{' '}
              <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                — procurement-aligned posture.
              </em>
            </>
          }
          description={j.positioning}
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'Jurisdictions', href: '/jurisdictions' },
            { label: j.code },
          ]}
        />

        {/* Highlights */}
        <Reveal>
          <section className="bg-gradient-to-b from-white to-[#F5F8FC] dark:from-slate-950 dark:to-slate-900 py-16 lg:py-20 border-y border-slate-200/60 dark:border-slate-800/60">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
                <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">{j.code}.HL</span>
                <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
                <span>Local highlights</span>
              </div>
              <ul className="mt-8 grid md:grid-cols-2 gap-3">
                {j.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-start gap-3 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60"
                  >
                    <CheckCircle2 size={16} className="text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <span className="text-[14px] text-slate-700 dark:text-slate-300 leading-snug">
                      {h}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </Reveal>

        {/* Procurement frameworks */}
        <Reveal>
          <section className="py-20 lg:py-24 bg-white dark:bg-slate-950 border-b border-slate-200/60 dark:border-slate-800/60">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
                <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">{j.code}.PR</span>
                <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
                <span>Procurement frameworks</span>
              </div>
              <h2 className="mt-6 max-w-3xl font-serif text-3xl md:text-4xl font-medium tracking-tight text-slate-900 dark:text-white leading-[1.05]">
                Listed under the{' '}
                <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                  routes buyers already use.
                </em>
              </h2>
              <ul className="mt-10 grid md:grid-cols-3 gap-3">
                {j.procurementFrameworks.map((p) => (
                  <li
                    key={p.code}
                    className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <Briefcase size={18} className="text-[#0A3A6B] dark:text-[#9ED0F9]" aria-hidden="true" />
                      <span className="font-mono text-[10px] tracking-[0.22em] font-semibold text-[#0A3A6B] dark:text-[#9ED0F9]">
                        {p.code}
                      </span>
                    </div>
                    <h3 className="mt-3 text-[15px] font-semibold tracking-tight text-slate-900 dark:text-white">
                      {p.name}
                    </h3>
                    <p className="mt-2 text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed">
                      {p.body}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </Reveal>

        {/* Compliance frameworks */}
        <Reveal>
          <section className="py-20 lg:py-24 bg-slate-50 dark:bg-slate-900/40 border-b border-slate-200/60 dark:border-slate-800/60">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
                <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">{j.code}.CO</span>
                <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
                <span>Compliance posture</span>
              </div>
              <h2 className="mt-6 max-w-3xl font-serif text-3xl md:text-4xl font-medium tracking-tight text-slate-900 dark:text-white leading-[1.05]">
                Aligned to the{' '}
                <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                  regulator the buyer reports to.
                </em>
              </h2>
              <ul className="mt-10 grid md:grid-cols-3 gap-3">
                {j.complianceFrameworks.map((c) => (
                  <li
                    key={c.code}
                    className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <ShieldCheck size={18} className="text-[#0A3A6B] dark:text-[#9ED0F9]" aria-hidden="true" />
                      <span className="font-mono text-[10px] tracking-[0.22em] font-semibold text-[#0A3A6B] dark:text-[#9ED0F9]">
                        {c.code}
                      </span>
                    </div>
                    <h3 className="mt-3 text-[15px] font-semibold tracking-tight text-slate-900 dark:text-white">
                      {c.name}
                    </h3>
                    <p className="mt-2 text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed">
                      {c.body}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </Reveal>

        {/* Deployment substrates available */}
        <Reveal>
          <section className="py-20 lg:py-24 bg-white dark:bg-slate-950 border-b border-slate-200/60 dark:border-slate-800/60">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
                <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">{j.code}.DM</span>
                <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
                <span>Available deployment substrates</span>
              </div>
              <ul className="mt-8 flex flex-wrap gap-3">
                {(['DM.01', 'DM.02', 'DM.03'] as const).map((dm) => {
                  const enabled = j.deploymentSubstrates.includes(dm);
                  return (
                    <li
                      key={dm}
                      className={`px-5 py-3 rounded-xl border-2 ${
                        enabled
                          ? 'border-[#0A3A6B] dark:border-[#9ED0F9] bg-[#0A3A6B]/5 dark:bg-[#9ED0F9]/5 text-slate-900 dark:text-white'
                          : 'border-slate-200/80 dark:border-slate-800/60 bg-slate-50 dark:bg-slate-900/40 text-slate-400 dark:text-slate-600'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Globe2 size={14} aria-hidden="true" />
                        <span className="font-mono text-[10px] uppercase tracking-[0.18em] font-semibold">{dm}</span>
                      </div>
                      <div className="mt-1 text-[13px] font-semibold tracking-tight">{DEPLOY_LABEL[dm]}</div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        </Reveal>

        {/* Reference programmes in this jurisdiction */}
        {refs.length > 0 && (
          <Reveal>
            <section className="py-20 lg:py-24 bg-slate-50 dark:bg-slate-900/40 border-b border-slate-200/60 dark:border-slate-800/60">
              <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
                  <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">{j.code}.CS</span>
                  <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
                  <span>Reference programmes in this jurisdiction</span>
                </div>
                <ul className="mt-10 grid md:grid-cols-2 gap-3">
                  {refs.map((r) => (
                    <li key={r.slug}>
                      <Link
                        href={`/customers/${r.slug}`}
                        className="group flex flex-col h-full p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 hover:border-slate-300 dark:hover:border-slate-700 motion-safe:transition-colors"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <span className="font-mono text-[10px] tracking-[0.22em] font-semibold text-[#0A3A6B] dark:text-[#9ED0F9]">
                            {r.code}
                          </span>
                          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400">
                            {r.tier} · {r.deployment}
                          </span>
                        </div>
                        <h3 className="mt-3 font-serif text-lg font-medium tracking-tight text-slate-900 dark:text-white leading-snug">
                          {r.customer}
                        </h3>
                        <p className="mt-2 text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed flex-1">
                          {r.programme}
                        </p>
                        <div className="mt-4 inline-flex items-center gap-1 text-[12px] font-semibold text-[#0A3A6B] dark:text-[#9ED0F9]">
                          Open programme <ArrowUpRight size={11} aria-hidden="true" />
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </Reveal>
        )}

        {/* Engagement intake */}
        <Reveal>
          <section className="py-20 lg:py-24 bg-white dark:bg-slate-950">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="rounded-3xl p-10 lg:p-14 bg-[#0A1F3D] text-white border border-white/10">
                <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#9ED0F9] font-semibold">
                  {j.code}.NX · jurisdiction-aware engagement
                </div>
                <h2 className="mt-4 font-serif text-3xl md:text-4xl font-medium tracking-tight leading-[1.05] max-w-3xl">
                  Open a programme{' '}
                  <em className="not-italic font-serif italic font-normal text-[#D6B575]">
                    on this jurisdiction&apos;s terms.
                  </em>
                </h2>
                <p className="mt-4 max-w-2xl text-base text-white/70 leading-[1.65]">
                  Consultation routed to the desk handling {j.name}-resident
                  programmes. Local procurement framework alignment, local
                  language coverage, in-jurisdiction deployment options
                  presented at intake.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Link
                    href={`/consultation?jurisdiction=${j.slug}`}
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#D6B575] text-[#0A1F3D] text-sm font-semibold rounded-lg hover:bg-[#D6B575]/90 motion-safe:transition-colors"
                  >
                    <Compass size={14} aria-hidden="true" />
                    Open consultation · CB.00
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </Link>
                  <Link
                    href="/jurisdictions"
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/[0.06] border border-white/15 text-white text-sm font-semibold rounded-lg hover:bg-white/[0.10] hover:border-white/25 motion-safe:transition-colors"
                  >
                    All jurisdictions
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
