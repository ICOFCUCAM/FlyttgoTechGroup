import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, ArrowUpRight, CheckCircle2, AlertCircle, Server } from 'lucide-react';
import Navbar from '@/components/flytt/Navbar';
import SiteFooter from '@/components/flytt/SiteFooter';
import PageHero from '@/components/flytt/PageHero';
import { Reveal } from '@/components/flytt/Reveal';
import { industrySectors, industryBySlug } from '@/data/industries';
import { platforms } from '@/data/platforms';

interface PageProps {
  params: { sector: string };
}

export function generateStaticParams() {
  return industrySectors.map((s) => ({ sector: s.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const data = industryBySlug[params.sector];
  if (!data) return { title: 'Industry not found', robots: { index: false, follow: false } };
  const canonical = `/industries/${data.slug}`;
  return {
    title: `${data.name} — Platform Infrastructure`,
    description: data.description,
    alternates: { canonical },
    openGraph: {
      title: `${data.name} · FlyttGo Technologies Group`,
      description: data.description,
      url: canonical,
      type: 'website',
    },
  };
}

export default function IndustrySectorPage({ params }: PageProps) {
  const data = industryBySlug[params.sector];
  if (!data) notFound();

  return (
    <>
      <Navbar />
      <main id="main" className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased">
        <PageHero
          eyebrow={data.eyebrow}
          title={data.headline}
          description={data.description}
          accent={data.accent}
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'Industries', href: '/industries' },
            { label: data.name },
          ]}
        />

        <Reveal>
          <section className="py-14 lg:py-20 bg-white dark:bg-slate-950">
            <div className="max-w-6xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-10">
              <div>
                <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-slate-500 font-semibold">
                  <AlertCircle size={13} className="text-rose-500" aria-hidden="true" />
                  Typical challenges
                </div>
                <ul className="mt-5 space-y-3">
                  {data.challenges.map((c) => (
                    <li key={c} className="flex items-start gap-3 text-[15px] text-slate-700 dark:text-slate-300 leading-relaxed">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-rose-400 flex-shrink-0" aria-hidden="true" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-slate-500 font-semibold">
                  <CheckCircle2 size={13} className="text-emerald-500" aria-hidden="true" />
                  FlyttGo outcomes
                </div>
                <ul className="mt-5 space-y-3">
                  {data.outcomes.map((o) => (
                    <li key={o} className="flex items-start gap-3 text-[15px] text-slate-700 dark:text-slate-300 leading-relaxed">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" aria-hidden="true" />
                      {o}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="py-14 lg:py-20 bg-[#F7FAFD] dark:bg-slate-900/60 border-y border-slate-200/70 dark:border-slate-800/60">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                Platforms deployed for this sector
              </p>
              <h2 className="mt-3 text-2xl md:text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
                Modular platforms, sector-sized.
              </h2>
              <ul className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.platforms.map((slug) => {
                  const p = platforms[slug];
                  if (!p) return null;
                  return (
                    <li key={slug}>
                      <Link
                        href={`/platforms/${slug}`}
                        className="group flex items-start gap-3 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 hover:border-slate-300 hover:shadow-md motion-safe:transition-all"
                      >
                        <span
                          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${p.color}14`, color: p.color }}
                          aria-hidden="true"
                        />
                        <span className="flex flex-col">
                          <span className="flex items-center gap-2">
                            <span className="text-base font-semibold text-slate-900 dark:text-white tracking-tight">
                              {p.name}
                            </span>
                            <ArrowUpRight size={14} className="text-slate-400 group-hover:text-slate-700 dark:group-hover:text-white" aria-hidden="true" />
                          </span>
                          <span className="text-xs text-slate-500 mt-0.5">{p.subtitle}</span>
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="py-14 lg:py-20 bg-white dark:bg-slate-950">
            <div className="max-w-6xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-10">
              <div>
                <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-slate-500 font-semibold">
                  <Server size={13} className="text-[#1E6FD9]" aria-hidden="true" />
                  Deployment pattern
                </div>
                <h2 className="mt-4 text-2xl md:text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
                  How {data.name.toLowerCase()} deployments typically ship.
                </h2>
                <p className="mt-4 text-[15px] text-slate-600 dark:text-slate-400 leading-relaxed">
                  {data.deploymentNote}
                </p>
                <Link
                  href="/deployment"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#0A3A6B] dark:text-[#9ED0F9] hover:gap-3 motion-safe:transition-all"
                >
                  Review deployment architecture
                  <ArrowUpRight size={14} aria-hidden="true" />
                </Link>
              </div>
              <div className="p-8 rounded-3xl bg-gradient-to-br from-[#0A1F3D] to-[#0A3A6B] text-white">
                <h3 className="text-xl font-semibold tracking-tight">
                  Scope a {data.name.toLowerCase()} deployment.
                </h3>
                <p className="mt-3 text-white/80 leading-relaxed">
                  Share your program context and our deployment engineering team will respond within
                  one business day with a scoping outline and reference architecture.
                </p>
                <Link
                  href="/contact?intent=partnership"
                  className="mt-6 inline-flex items-center gap-2 px-5 py-3 bg-white text-[#0A3A6B] text-sm font-semibold rounded-lg hover:bg-slate-100 motion-safe:transition-colors"
                >
                  Start a deployment conversation
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </section>
        </Reveal>
      </main>
      <SiteFooter />
    </>
  );
}
