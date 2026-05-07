import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from '@/components/flytt/LocaleLink';
import Navbar from '@/components/flytt/Navbar';
import PageHero from '@/components/flytt/PageHero';
import SiteFooter from '@/components/flytt/SiteFooter';
import { Reveal } from '@/components/flytt/Reveal';
import { breadcrumbListLd, jsonLdScript } from '@/lib/seo/jsonld';
import { caseStudies } from '@/data/case-studies';
import {
  Layers3,
  Globe2,
  Calendar,
  CheckCircle2,
  ArrowUpRight,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

const DEPLOY_LABEL: Record<string, string> = {
  'DM.01': 'Managed SaaS',
  'DM.02': 'Customer cloud',
  'DM.03': 'Sovereign DC',
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const cs = caseStudies.find((c) => c.slug === params.slug);
  if (!cs) return {};
  return {
    title: `${cs.code} · ${cs.customer} — FlyttGo reference programme`,
    description: cs.summary,
    alternates: { canonical: `/customers/${cs.slug}` },
  };
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const cs = caseStudies.find((c) => c.slug === params.slug);
  if (!cs) notFound();

  const ld = breadcrumbListLd([
    { name: 'Home', href: '/' },
    { name: 'Customers', href: '/customers' },
    { name: cs.customer, href: `/customers/${cs.slug}` },
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
          code={cs.code}
          eyebrow={`${cs.sector} · ${cs.region}`}
          title={
            <>
              {cs.customer}{' '}
              <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                — {cs.programme}.
              </em>
            </>
          }
          description={cs.summary}
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'Customers', href: '/customers' },
            { label: cs.code },
          ]}
        />

        {/* CS.MX — programme metrics + shape */}
        <Reveal>
          <section className="bg-gradient-to-b from-white to-[#F5F8FC] dark:from-slate-950 dark:to-slate-900 py-20 lg:py-24 border-y border-slate-200/60 dark:border-slate-800/60">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-12 gap-10">
              <div className="lg:col-span-7">
                <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
                  <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">{cs.code}.MX</span>
                  <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
                  <span>Programme metrics</span>
                </div>
                <ul className="mt-8 grid sm:grid-cols-2 gap-3">
                  {cs.metrics.map((m) => (
                    <li
                      key={m.label}
                      className="rounded-2xl p-5 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60"
                    >
                      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">
                        {m.label}
                      </div>
                      <div className="mt-2 font-serif text-3xl font-medium text-slate-900 dark:text-white tabular-nums">
                        {m.value}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <aside className="lg:col-span-5">
                <div className="rounded-2xl p-6 bg-[#0A1F3D] text-white border border-white/10">
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9ED0F9] font-semibold">
                    {cs.code}.SHAPE
                  </div>
                  <h2 className="mt-3 font-serif text-2xl font-medium leading-tight">
                    Programme shape
                  </h2>
                  <dl className="mt-6 space-y-4">
                    <div className="flex items-baseline gap-3">
                      <dt className="w-28 font-mono text-[10px] uppercase tracking-[0.16em] text-white/55 flex-shrink-0">
                        Tier
                      </dt>
                      <dd className="flex items-center gap-2 text-[14px]">
                        <Layers3 size={14} className="text-[#9ED0F9]" aria-hidden="true" />
                        <span className="font-semibold">{cs.tier}</span>
                      </dd>
                    </div>
                    <div className="flex items-baseline gap-3">
                      <dt className="w-28 font-mono text-[10px] uppercase tracking-[0.16em] text-white/55 flex-shrink-0">
                        Deployment
                      </dt>
                      <dd className="flex items-center gap-2 text-[14px]">
                        <Globe2 size={14} className="text-[#9ED0F9]" aria-hidden="true" />
                        <span className="font-semibold">{cs.deployment}</span>
                        <span className="text-white/65">· {DEPLOY_LABEL[cs.deployment]}</span>
                      </dd>
                    </div>
                    <div className="flex items-baseline gap-3">
                      <dt className="w-28 font-mono text-[10px] uppercase tracking-[0.16em] text-white/55 flex-shrink-0">
                        Duration
                      </dt>
                      <dd className="flex items-center gap-2 text-[14px]">
                        <Calendar size={14} className="text-[#9ED0F9]" aria-hidden="true" />
                        <span>{cs.duration}</span>
                      </dd>
                    </div>
                    <div className="flex items-baseline gap-3">
                      <dt className="w-28 font-mono text-[10px] uppercase tracking-[0.16em] text-white/55 flex-shrink-0">
                        Modules
                      </dt>
                      <dd className="flex flex-wrap gap-1.5">
                        {cs.modules.map((m) => (
                          <span
                            key={m}
                            className="px-2 py-0.5 rounded-md bg-white/8 border border-white/10 text-[11px] font-mono"
                          >
                            {m}
                          </span>
                        ))}
                      </dd>
                    </div>
                  </dl>
                </div>
              </aside>
            </div>
          </section>
        </Reveal>

        {/* CS.OUT — outcome */}
        <Reveal>
          <section className="py-20 lg:py-24 bg-white dark:bg-slate-950 border-b border-slate-200/60 dark:border-slate-800/60">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
                <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">{cs.code}.OUT</span>
                <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
                <span>Programme outcome</span>
              </div>
              <p className="mt-6 max-w-3xl font-serif text-2xl md:text-3xl font-medium text-slate-900 dark:text-white leading-snug">
                <CheckCircle2 size={22} className="inline text-emerald-600 dark:text-emerald-400 mr-2 align-baseline" aria-hidden="true" />
                {cs.outcome}
              </p>
            </div>
          </section>
        </Reveal>

        {/* CS.NX — back to index + adjacent programmes */}
        <Reveal>
          <section className="py-20 lg:py-24 bg-slate-50 dark:bg-slate-900/40 border-b border-slate-200/60 dark:border-slate-800/60">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <Link
                href="/customers"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#0A3A6B] text-white text-sm font-semibold hover:bg-[#0A3A6B]/90 motion-safe:transition-colors"
              >
                Back to all reference programmes
                <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </section>
        </Reveal>
      </main>
      <SiteFooter />
    </>
  );
}
