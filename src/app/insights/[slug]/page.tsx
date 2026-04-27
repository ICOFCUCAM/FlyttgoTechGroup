import type { Metadata } from 'next';
import Link from '@/components/flytt/LocaleLink';
import { notFound } from 'next/navigation';
import { ArrowRight, ArrowUpRight, Clock } from 'lucide-react';
import Navbar from '@/components/flytt/Navbar';
import SiteFooter from '@/components/flytt/SiteFooter';
import Breadcrumbs from '@/components/flytt/Breadcrumbs';
import InsightBlocks from '@/components/flytt/InsightBlocks';
import { insights, insightBySlug, insightDateFormat } from '@/data/insights';
import { canonicalFor, languageAlternates } from '@/lib/seo/canonical';

interface PageProps {
  params: { slug: string };
}

// SSR per request so the layout's server-detected locale produces
// properly-translated HTML for every /<locale>/insights/<slug> URL.
// (Slug enumeration for crawlers lives in sitemap.xml.)
export const dynamic = 'force-dynamic';

export function generateMetadata({ params }: PageProps): Metadata {
  const post = insightBySlug[params.slug];
  if (!post) {
    return { title: 'Insight not found', robots: { index: false, follow: false } };
  }
  const path = `/insights/${post.slug}`;
  return {
    title: post.title,
    description: post.dek,
    alternates: {
      canonical: canonicalFor(path),
      languages: languageAlternates(path),
    },
    openGraph: {
      title: post.title,
      description: post.dek,
      url: canonicalFor(path),
      type: 'article',
      publishedTime: post.publishedOn,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.dek,
    },
  };
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://flyttgo.tech';

export default function InsightDetailPage({ params }: PageProps) {
  const post = insightBySlug[params.slug];
  if (!post) notFound();

  const url = `${siteUrl}/insights/${post.slug}`;
  const blogPostingLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.dek,
    datePublished: post.publishedOn,
    dateModified: post.publishedOn,
    author: { '@type': 'Organization', name: post.author },
    publisher: {
      '@type': 'Organization',
      name: 'FlyttGo Technologies Group',
      logo: { '@type': 'ImageObject', url: `${siteUrl}/icon` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    keywords: post.tags.join(', '),
  };
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Insights', item: `${siteUrl}/insights` },
      { '@type': 'ListItem', position: 3, name: post.title, item: url },
    ],
  };

  const related = insights.filter((i) => i.slug !== post.slug).slice(0, 2);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <Navbar />
      <main
        id="main"
        className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased"
      >
        <article>
          <header className="relative py-14 lg:py-20 bg-gradient-to-b from-[#F7FAFD] to-white dark:from-slate-900 dark:to-slate-950 border-b border-slate-200/70 dark:border-slate-800/60">
            <div className="max-w-3xl mx-auto px-6 lg:px-8">
              <Breadcrumbs
                items={[
                  { label: 'Home', href: '/' },
                  { label: 'Insights', href: '/insights' },
                  { label: post.title },
                ]}
              />
              <p
                className="mt-6 inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-[0.22em]"
                style={{ backgroundColor: `${post.accent}12`, color: post.accent }}
              >
                {post.eyebrow}
              </p>
              <h1 className="mt-5 text-3xl md:text-4xl lg:text-[44px] font-semibold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                {post.title}
              </h1>
              <p className="mt-5 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                {post.dek}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-500">
                <span className="font-medium text-slate-700 dark:text-slate-300">
                  {post.author}
                </span>
                <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" aria-hidden="true" />
                <span>{post.authorRole}</span>
                <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" aria-hidden="true" />
                <time dateTime={post.publishedOn}>
                  {insightDateFormat(post.publishedOn)}
                </time>
                <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" aria-hidden="true" />
                <span className="inline-flex items-center gap-1">
                  <Clock size={12} aria-hidden="true" />
                  {post.readMinutes} min read
                </span>
              </div>
            </div>
          </header>

          <section className="py-14 lg:py-20">
            <div className="max-w-3xl mx-auto px-6 lg:px-8">
              <InsightBlocks blocks={post.content} />

              <ul className="mt-14 flex flex-wrap gap-2" aria-label="Tags">
                {post.tags.map((tag) => (
                  <li
                    key={tag}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/60"
                  >
                    {tag}
                  </li>
                ))}
              </ul>

              <div className="mt-12 p-8 rounded-3xl bg-gradient-to-br from-[#0A1F3D] to-[#0A3A6B] text-white">
                <h2 className="text-xl md:text-2xl font-semibold tracking-tight">
                  Want to talk through this for your programme?
                </h2>
                <p className="mt-3 text-white/80 leading-relaxed">
                  Share your deployment context and our platform team will respond within one business day.
                </p>
                <Link
                  href="/contact?intent=partnership"
                  className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-white text-[#0A3A6B] text-sm font-semibold rounded-md hover:bg-slate-100 motion-safe:transition-colors"
                >
                  Start a deployment conversation
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </section>

          {related.length > 0 && (
            <section className="py-14 lg:py-20 bg-[#F7FAFD] dark:bg-slate-900/60 border-t border-slate-200/70 dark:border-slate-800/60">
              <div className="max-w-5xl mx-auto px-6 lg:px-8">
                <h2 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                  Read next
                </h2>
                <ul className="mt-6 grid md:grid-cols-2 gap-5">
                  {related.map((r) => {
                    const Icon = r.icon;
                    return (
                      <li key={r.slug}>
                        <Link
                          href={`/insights/${r.slug}`}
                          className="group flex flex-col h-full p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md motion-safe:transition-all"
                        >
                          <div className="flex items-start justify-between">
                            <span
                              className="w-9 h-9 rounded-lg flex items-center justify-center"
                              style={{ backgroundColor: `${r.accent}14`, color: r.accent }}
                              aria-hidden="true"
                            >
                              <Icon size={16} strokeWidth={1.75} />
                            </span>
                            <ArrowUpRight
                              size={14}
                              className="text-slate-300 group-hover:text-slate-700 dark:group-hover:text-white motion-safe:transition-colors"
                              aria-hidden="true"
                            />
                          </div>
                          <p
                            className="mt-4 text-[11px] font-semibold uppercase tracking-[0.18em]"
                            style={{ color: r.accent }}
                          >
                            {r.eyebrow}
                          </p>
                          <h3 className="mt-2 text-base md:text-lg font-semibold tracking-tight text-slate-900 dark:text-white leading-snug group-hover:underline underline-offset-4">
                            {r.title}
                          </h3>
                          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            {r.dek}
                          </p>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </section>
          )}
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
