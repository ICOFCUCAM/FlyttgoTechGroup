import type { MetadataRoute } from 'next';
import { platformList } from '@/data/platforms';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://flyttgo.tech';

const staticRoutes: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { path: '/', priority: 1, freq: 'weekly' },
  { path: '/platforms', priority: 0.9, freq: 'weekly' },
  { path: '/deployment', priority: 0.9, freq: 'weekly' },
  { path: '/industries', priority: 0.7, freq: 'monthly' },
  { path: '/technology', priority: 0.7, freq: 'monthly' },
  { path: '/infrastructure', priority: 0.8, freq: 'weekly' },
  { path: '/solutions', priority: 0.7, freq: 'monthly' },
  { path: '/white-label', priority: 0.7, freq: 'monthly' },
  { path: '/developers', priority: 0.6, freq: 'monthly' },
  { path: '/company', priority: 0.5, freq: 'monthly' },
  { path: '/contact', priority: 0.5, freq: 'yearly' },
  { path: '/status', priority: 0.6, freq: 'daily' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((r) => ({
    url: `${siteUrl}${r.path}`,
    lastModified: now,
    changeFrequency: r.freq,
    priority: r.priority,
  }));

  const platformEntries: MetadataRoute.Sitemap = platformList.map((p) => ({
    url: `${siteUrl}/platforms/${p.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticEntries, ...platformEntries];
}
