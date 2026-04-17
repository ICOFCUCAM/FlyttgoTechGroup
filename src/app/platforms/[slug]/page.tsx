import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { platforms, platformList } from '@/data/platforms';
import PlatformView from '@/components/flytt/PlatformView';

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return platformList.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const data = platforms[params.slug];
  if (!data) {
    return { title: 'Platform not found', robots: { index: false, follow: false } };
  }

  const title = `${data.name} — ${data.subtitle}`;
  const description = data.description;
  const canonical = `/platforms/${data.slug}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
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

export default function PlatformSlugPage({ params }: PageProps) {
  const data = platforms[params.slug];
  if (!data) notFound();
  return <PlatformView slug={params.slug} />;
}
