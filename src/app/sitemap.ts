import type { MetadataRoute } from 'next';
import { platformList } from '@/data/platforms';
import { industrySectors } from '@/data/industries';
import { deploymentModes } from '@/data/deployment-modes';
import { insights } from '@/data/insights';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://flyttgo.tech';

const LOCALES = ['en', 'no', 'fr', 'de', 'es', 'sv', 'da', 'nl', 'pt', 'ar'] as const;

const localeAlternates = (path: string): Record<string, string> => {
  const clean = path === '/' ? '' : path;
  const map: Record<string, string> = {};
  for (const l of LOCALES) {
    map[l] = l === 'en' ? `${siteUrl}${path}` : `${siteUrl}/${l}${clean}`;
  }
  map['x-default'] = `${siteUrl}${path}`;
  return map;
};

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
  { path: '/insights', priority: 0.7, freq: 'weekly' },
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
    alternates: { languages: localeAlternates(r.path) },
  }));

  const platformEntries: MetadataRoute.Sitemap = platformList.map((p) => {
    const path = `/platforms/${p.slug}`;
    return {
      url: `${siteUrl}${path}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: { languages: localeAlternates(path) },
    };
  });

  const industryEntries: MetadataRoute.Sitemap = industrySectors.map((s) => {
    const path = `/industries/${s.slug}`;
    return {
      url: `${siteUrl}${path}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
      alternates: { languages: localeAlternates(path) },
    };
  });

  const deploymentEntries: MetadataRoute.Sitemap = deploymentModes.map((m) => {
    const path = `/deployment/${m.slug}`;
    return {
      url: `${siteUrl}${path}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: { languages: localeAlternates(path) },
    };
  });

  const insightEntries: MetadataRoute.Sitemap = insights.map((i) => {
    const path = `/insights/${i.slug}`;
    return {
      url: `${siteUrl}${path}`,
      lastModified: new Date(i.publishedOn),
      changeFrequency: 'monthly',
      priority: 0.6,
      alternates: { languages: localeAlternates(path) },
    };
  });

  return [
    ...staticEntries,
    ...platformEntries,
    ...industryEntries,
    ...deploymentEntries,
    ...insightEntries,
  ];
}
