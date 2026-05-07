import type { Metadata } from 'next';
import Link from '@/components/flytt/LocaleLink';
import Navbar from '@/components/flytt/Navbar';
import PageHero from '@/components/flytt/PageHero';
import SiteFooter from '@/components/flytt/SiteFooter';
import { Reveal } from '@/components/flytt/Reveal';
import NextStepsGrid from '@/components/flytt/NextStepsGrid';
import { papers, CATEGORIES } from '@/data/research';
import { breadcrumbListLd, jsonLdScript } from '@/lib/seo/jsonld';
import {
  BookOpen,
  ArrowUpRight,
  Clock,
  Calendar,
  Compass,
  type LucideIcon,
  Layers,
  Activity,
  ShieldCheck,
  Globe2,
  Brain,
  Leaf,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Research library · RS.00 — FlyttGo Technologies Group',
  description:
    'Long-form architecture, regulatory, sector and security papers from the FlyttGo platform councils. Per-paper abstracts, key takeaways, citation-ready PDFs.',
  alternates: { canonical: '/research' },
};

const CATEGORY_ICON: Record<string, LucideIcon> = {
  Architecture:    Layers,
  Regulatory:      ShieldCheck,
  Sector:          Globe2,
  Deployment:      Activity,
  Security:        ShieldCheck,
  Sustainability:  Leaf,
};

export default function ResearchPage() {
  const ld = breadcrumbListLd([
    { name: 'Home', href: '/' },
    { name: 'Research library', href: '/research' },
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
          code="RS.00"
          eyebrow="Research library"
          title={
            <>
              Eight long-form papers,{' '}
              <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                from the platform councils.
              </em>
            </>
          }
          description="Architecture deep-dives, regulatory analyses, sector-specific patterns and security runbooks — written for procurement, security and architecture teams that need more than a marketing page. Citation-ready PDFs, refreshed quarterly."
          crumbs={[{ label: 'Home', href: '/' }, { label: 'Research library' }]}
        />

        {/* RS.CT — category strip */}
        <Reveal>
          <section className="bg-gradient-to-b from-white to-[#F5F8FC] dark:from-slate-950 dark:to-slate-900 py-12 lg:py-14 border-y border-slate-200/60 dark:border-slate-800/60">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400 mb-4">
                <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">RS.CT</span>
                <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
                <span>Categories</span>
              </div>
              <ul className="flex flex-wrap gap-2">
                {CATEGORIES.map((c) => {
                  const Icon = CATEGORY_ICON[c] ?? BookOpen;
                  const count = papers.filter((p) => p.category === c).length;
                  return (
                    <li key={c}>
                      <a
                        href={`#cat-${c.toLowerCase()}`}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 hover:border-slate-300 dark:hover:border-slate-700 motion-safe:transition-colors text-[12px]"
                      >
                        <Icon size={12} className="text-[#0A3A6B] dark:text-[#9ED0F9]" aria-hidden="true" />
                        <span className="font-semibold tracking-tight text-slate-700 dark:text-slate-300">{c}</span>
                        <span className="font-mono text-[10px] text-slate-400">{count}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        </Reveal>

        {/* RS.LB — paper library */}
        <Reveal>
          <section
            id="rs-lb"
            aria-labelledby="rs-lb-heading"
            className="py-20 lg:py-24 bg-white dark:bg-slate-950 border-b border-slate-200/60 dark:border-slate-800/60"
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
                <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">RS.LB</span>
                <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
                <span id="rs-lb-heading">Paper library</span>
              </div>

              <ul className="mt-12 space-y-4">
                {papers.map((p) => {
                  const Icon = CATEGORY_ICON[p.category] ?? BookOpen;
                  return (
                    <li
                      key={p.slug}
                      id={`cat-${p.category.toLowerCase()}`}
                      className="p-6 lg:p-7 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 hover:border-slate-300 dark:hover:border-slate-700 motion-safe:transition-colors"
                    >
                      <div className="grid lg:grid-cols-12 gap-6">
                        <div className="lg:col-span-8">
                          <div className="flex items-start justify-between gap-3 flex-wrap">
                            <div className="flex items-center gap-3">
                              <span
                                className="w-10 h-10 rounded-lg bg-[#0A3A6B]/8 dark:bg-[#9ED0F9]/12 text-[#0A3A6B] dark:text-[#9ED0F9] flex items-center justify-center"
                                aria-hidden="true"
                              >
                                <Icon size={16} strokeWidth={1.75} />
                              </span>
                              <span className="font-mono text-[10px] tracking-[0.22em] font-semibold text-[#0A3A6B] dark:text-[#9ED0F9]">
                                {p.code}
                              </span>
                              <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 font-mono text-[10px] uppercase tracking-[0.14em] text-slate-600 dark:text-slate-400">
                                {p.category}
                              </span>
                            </div>
                            <div className="flex items-center gap-3 font-mono text-[10px] tabular-nums text-slate-400 uppercase tracking-[0.14em]">
                              <span className="inline-flex items-center gap-1"><Calendar size={10} aria-hidden="true" />{p.publishedOn}</span>
                              <span>·</span>
                              <span>{p.pages}p</span>
                              <span>·</span>
                              <span className="inline-flex items-center gap-1"><Clock size={10} aria-hidden="true" />{p.readingMinutes}m</span>
                            </div>
                          </div>

                          <h3 className="mt-4 font-serif text-xl md:text-2xl font-medium tracking-tight text-slate-900 dark:text-white leading-snug">
                            {p.title}
                          </h3>

                          <p className="mt-3 text-[13px] text-slate-600 dark:text-slate-400 leading-[1.65]">
                            {p.abstract}
                          </p>

                          <div className="mt-4 flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-[0.14em] text-slate-500">
                            <span className="text-slate-400">Authors</span>
                            <span className="normal-case tracking-tight text-[12px] text-slate-700 dark:text-slate-300 font-sans">
                              {p.authors.join(' · ')}
                            </span>
                          </div>
                        </div>

                        <aside className="lg:col-span-4">
                          <div className="rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/60 p-4">
                            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400 mb-2">Key takeaways</div>
                            <ul className="space-y-1.5">
                              {p.keyTakeaways.slice(0, 3).map((k) => (
                                <li key={k} className="text-[12px] text-slate-700 dark:text-slate-300 leading-snug pl-3 relative">
                                  <span className="absolute left-0 top-1.5 w-1 h-1 rounded-full bg-[#D6B575]" aria-hidden="true" />
                                  {k}
                                </li>
                              ))}
                            </ul>
                            <div className="mt-4 flex flex-col gap-2">
                              <Link
                                href={`/research/${p.slug}`}
                                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-md bg-[#0A3A6B] text-white text-[11px] font-semibold hover:bg-[#0A3A6B]/90 motion-safe:transition-colors"
                              >
                                Read paper
                                <ArrowUpRight size={11} aria-hidden="true" />
                              </Link>
                              <Link
                                href={`/research/${p.slug}.pdf`}
                                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-md bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 text-slate-700 dark:text-slate-300 text-[11px] font-semibold hover:border-slate-300 motion-safe:transition-colors"
                              >
                                Download PDF
                                <ArrowUpRight size={11} aria-hidden="true" />
                              </Link>
                            </div>
                          </div>
                        </aside>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <NextStepsGrid
            code="RS.NX"
            eyebrow="Where the research goes next"
            titleLead="Long-form papers earn"
            titleEmphasis="trust the marketing site can&apos;t."
            intro="The research library is one input into procurement and security review. The four pathways below take a research-driven team into product surfaces."
            steps={[
              { href: '/insights',  code: 'IN.00', icon: BookOpen,  title: 'Short-form insights', body: 'Quarterly architecture notes and procurement playbooks — shorter cadence than papers.', meta: 'IN.00 · weekly' },
              { href: '/customers', code: 'CS.00', icon: Brain,     title: 'Reference programmes', body: 'Six anonymised programmes with delivered metrics — what the research looks like in production.', meta: 'CS.00 · 6 programmes' },
              { href: '/sandbox',   code: 'SB.SP', icon: Activity,  title: 'Sandbox tenant',       body: 'Spin up a workspace in 60 seconds and see the architecture documented in the papers.', meta: 'SB.SP · 7-day TTL' },
              { href: '/consultation', code: 'CB.00', icon: Compass, title: 'Open scoping',         body: 'Five-step intake routes a paper-led discussion under CT.01 platform architecture session.', meta: 'CT.01 · CB.00' },
            ]}
          />
        </Reveal>
      </main>
      <SiteFooter />
    </>
  );
}
