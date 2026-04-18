import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { platforms } from '@/data/platforms';
import PlatformView from '@/components/flytt/PlatformView';
import { canonicalFor, languageAlternates } from '@/lib/seo/canonical';

interface PageProps {
  params: { slug: string };
}

// SSR per request so the layout's server-detected locale produces
// properly-translated HTML for every /<locale>/platforms/<slug> URL.
// (Slug enumeration for crawlers lives in sitemap.xml; dropping
// generateStaticParams lets Next honour force-dynamic correctly.)
export const dynamic = 'force-dynamic';

export function generateMetadata({ params }: PageProps): Metadata {
  const data = platforms[params.slug];
  if (!data) {
    return { title: 'Platform not found', robots: { index: false, follow: false } };
  }

  const title = `${data.name} — ${data.subtitle}`;
  const description = data.description;
  const path = `/platforms/${data.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalFor(path),
      languages: languageAlternates(path),
    },
    openGraph: {
      title,
      description,
      url: canonicalFor(path),
      type: 'website',
      images: data.heroImage ? [{ url: data.heroImage, alt: data.name }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: data.heroImage ? [data.heroImage] : undefined,
    },
  };
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://flyttgo.tech';

export default function PlatformSlugPage({ params }: PageProps) {
  const data = platforms[params.slug];
  if (!data) notFound();

  const url = `${siteUrl}/platforms/${data.slug}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: data.name,
    alternateName: `${data.name} — ${data.subtitle}`,
    description: data.description,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web, Cloud, On-premise, Sovereign datacenter',
    url,
    image: data.heroImage ? `${siteUrl}${data.heroImage.startsWith('http') ? '' : data.heroImage}` : undefined,
    provider: {
      '@type': 'Organization',
      name: 'FlyttGo Technologies Group',
      url: siteUrl,
    },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'EUR',
      url: `${siteUrl}/contact?intent=partnership`,
      priceSpecification: {
        '@type': 'PriceSpecification',
        description: 'Enterprise and public-sector licensing — contact sales for pricing.',
      },
    },
    areaServed: ['EU', 'AF', 'MENA'],
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Platforms', item: `${siteUrl}/platforms` },
      { '@type': 'ListItem', position: 3, name: data.name, item: url },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <PlatformView slug={params.slug} />
    </>
  );
}
