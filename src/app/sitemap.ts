import type { MetadataRoute } from 'next';
import { platformList } from '@/data/platforms';
import { industrySectors } from '@/data/industries';
import { deploymentModes } from '@/data/deployment-modes';

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
  { path: '/company/leadership', priority: 0.4, freq: 'monthly' },
  { path: '/company/careers', priority: 0.6, freq: 'weekly' },
  { path: '/company/press', priority: 0.4, freq: 'monthly' },
  { path: '/contact', priority: 0.5, freq: 'yearly' },
  { path: '/status', priority: 0.6, freq: 'daily' },
  { path: '/privacy', priority: 0.3, freq: 'yearly' },
  { path: '/terms', priority: 0.3, freq: 'yearly' },
  { path: '/security', priority: 0.5, freq: 'monthly' },
  { path: '/compliance', priority: 0.5, freq: 'monthly' },
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

  const industryEntries: MetadataRoute.Sitemap = industrySectors.map((s) => ({
    url: `${siteUrl}/industries/${s.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const deploymentEntries: MetadataRoute.Sitemap = deploymentModes.map((m) => ({
    url: `${siteUrl}/deployment/${m.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [
    ...staticEntries,
    ...platformEntries,
    ...industryEntries,
    ...deploymentEntries,
  ];
}
