import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, ArrowUpRight, Clock, Globe2 } from 'lucide-react';
import Navbar from '@/components/flytt/Navbar';
import SiteFooter from '@/components/flytt/SiteFooter';
import PageHero from '@/components/flytt/PageHero';
import { Reveal } from '@/components/flytt/Reveal';
import { deploymentModes, deploymentModeBySlug } from '@/data/deployment-modes';
import { localizeDeploymentMode } from '@/data/deployment-modes.i18n';
import { T } from '@/components/flytt/T';
import { serverLocale } from '@/lib/i18n/server';
import { canonicalFor, languageAlternates } from '@/lib/seo/canonical';

interface PageProps {
  params: { mode: string };
}

// SSR per request so the layout's server-detected locale produces
// properly-translated HTML for every /<locale>/deployment/<mode> URL.
// (Slug enumeration for crawlers lives in sitemap.xml.)
export const dynamic = 'force-dynamic';

export function generateMetadata({ params }: PageProps): Metadata {
  const data = deploymentModeBySlug[params.mode];
  if (!data) return { title: 'Deployment mode not found', robots: { index: false, follow: false } };
  const path = `/deployment/${data.slug}`;
  return {
    title: `${data.name} — Deployment Mode`,
    description: data.description,
    alternates: {
      canonical: canonicalFor(path),
      languages: languageAlternates(path),
    },
    openGraph: {
      title: `${data.name} · FlyttGo Technologies Group`,
      description: data.description,
      url: canonicalFor(path),
      type: 'website',
    },
  };
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://flyttgo.tech';

export default function DeploymentModePage({ params }: PageProps) {
  const raw = deploymentModeBySlug[params.mode];
  if (!raw) notFound();
  const data = localizeDeploymentMode(raw, serverLocale());
  const Icon = data.icon;

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Deployment', item: `${siteUrl}/deployment` },
      {
        '@type': 'ListItem',
        position: 3,
        name: data.name,
        item: `${siteUrl}/deployment/${data.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <Navbar />
      <main id="main" className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased">
        <PageHero
          eyebrow={data.eyebrow}
          title={data.headline}
          description={data.description}
          accent={data.accent}
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'Deployment', href: '/deployment' },
            { label: data.name },
          ]}
        />

        <Reveal>
          <section className="py-14 lg:py-20">
            <div className="max-w-6xl mx-auto px-6 lg:px-8 grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${data.accent}14`, color: data.accent }}
                  aria-hidden="true"
                >
                  <Icon size={20} strokeWidth={1.75} />
                </div>
                <h2 className="mt-5 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
                  <T k="mode.characteristics" />
                </h2>
                <dl className="mt-6 divide-y divide-slate-200/80 dark:divide-slate-800/60">
                  {data.characteristics.map((c) => (
                    <div key={c.label} className="grid md:grid-cols-3 gap-2 py-3">
                      <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                        {c.label}
                      </dt>
                      <dd className="md:col-span-2 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                        {c.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="p-8 rounded-3xl bg-[#0A1F3D] text-white">
                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/60">
                  <Clock size={13} aria-hidden="true" />
                  <T k="mode.timeline" />
                </div>
                <p className="mt-3 text-base leading-relaxed">{data.timeline}</p>

                <div className="mt-6 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/60">
                  <Globe2 size={13} aria-hidden="true" />
                  <T k="mode.regions" />
                </div>
                <ul className="mt-3 space-y-1.5">
                  {data.regions.map((r) => (
                    <li key={r} className="text-sm text-white/80 leading-relaxed">
                      · {r}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact?intent=partnership"
                  className="mt-8 inline-flex items-center gap-2 px-5 py-2.5 bg-white text-[#0A3A6B] text-sm font-semibold rounded-md hover:bg-slate-100 motion-safe:transition-colors"
                >
                  <T k="mode.scope" />
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="py-14 lg:py-20 bg-[#F7FAFD] dark:bg-slate-900/60 border-t border-slate-200/70 dark:border-slate-800/60">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                <T k="mode.bestFit" />
              </p>
              <h2 className="mt-3 text-2xl md:text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
                Where {data.name.toLowerCase()} shines.
              </h2>
              <ul className="mt-8 grid md:grid-cols-3 gap-5">
                {data.bestFor.map((b) => (
                  <li
                    key={b}
                    className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 text-[15px] text-slate-700 dark:text-slate-300 leading-relaxed"
                  >
                    {b}
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex flex-wrap gap-3">
                {deploymentModes
                  .filter((m) => m.slug !== data.slug)
                  .map((m) => (
                    <Link
                      key={m.slug}
                      href={`/deployment/${m.slug}`}
                      className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 text-sm font-semibold text-slate-800 dark:text-slate-200 hover:border-slate-300 motion-safe:transition-colors"
                    >
                      Compare with {m.name}
                      <ArrowUpRight size={13} className="text-slate-400 group-hover:text-slate-700 dark:group-hover:text-white" aria-hidden="true" />
                    </Link>
                  ))}
              </div>
            </div>
          </section>
        </Reveal>
      </main>
      <SiteFooter />
    </>
  );
}
