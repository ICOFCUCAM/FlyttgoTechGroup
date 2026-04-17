import type { MetadataRoute } from 'next';
import { platformList } from '@/data/platforms';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://flyttgo.tech';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticEntries: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
  ];

  const platformEntries: MetadataRoute.Sitemap = platformList.map((p) => ({
    url: `${siteUrl}/platforms/${p.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticEntries, ...platformEntries];
}
