import type { MetadataRoute } from 'next';
import { platformList } from '@/data/platforms';
import { industrySectors } from '@/data/industries';
import { deploymentModes } from '@/data/deployment-modes';
import { insights } from '@/data/insights';
import { caseStudies } from '@/data/case-studies';
import { JURISDICTIONS } from '@/data/jurisdictions';
import { COMPARISONS } from '@/data/comparisons';
import { VERTICALS } from '@/data/verticals';

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
  { path: '/government', priority: 0.9, freq: 'monthly' },
  { path: '/government/capability-brief', priority: 0.7, freq: 'monthly' },
  { path: '/government/orchestration', priority: 0.6, freq: 'monthly' },
  { path: '/marketplace', priority: 0.85, freq: 'monthly' },
  { path: '/engineering', priority: 0.9, freq: 'monthly' },
  { path: '/engineering/ladder', priority: 0.85, freq: 'monthly' },
  { path: '/engineering/modules', priority: 0.85, freq: 'monthly' },
  { path: '/engineering/delivery', priority: 0.8, freq: 'monthly' },
  { path: '/engineering/configurator', priority: 0.85, freq: 'monthly' },
  { path: '/engineering/scoping', priority: 0.8, freq: 'monthly' },
  { path: '/pricing', priority: 0.85, freq: 'monthly' },
  { path: '/consultation', priority: 0.85, freq: 'monthly' },
  { path: '/technology', priority: 0.7, freq: 'monthly' },
  { path: '/infrastructure', priority: 0.8, freq: 'weekly' },
  { path: '/infrastructure-architecture', priority: 0.8, freq: 'monthly' },
  { path: '/solutions', priority: 0.7, freq: 'monthly' },
  { path: '/white-label', priority: 0.7, freq: 'monthly' },
  { path: '/developers', priority: 0.6, freq: 'monthly' },
  { path: '/developers/api', priority: 0.7, freq: 'monthly' },
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
  { path: '/trust', priority: 0.85, freq: 'monthly' },
  { path: '/legal/dpa', priority: 0.5, freq: 'monthly' },
  { path: '/legal/subprocessors', priority: 0.5, freq: 'monthly' },
  { path: '/customers', priority: 0.8, freq: 'monthly' },
  { path: '/roadmap', priority: 0.7, freq: 'monthly' },
  { path: '/changelog', priority: 0.7, freq: 'weekly' },
  { path: '/jurisdictions', priority: 0.8, freq: 'monthly' },
  { path: '/partners', priority: 0.7, freq: 'monthly' },
  { path: '/console', priority: 0.7, freq: 'monthly' },
  { path: '/agents', priority: 0.85, freq: 'monthly' },
  { path: '/wallet', priority: 0.85, freq: 'monthly' },
  { path: '/post-quantum', priority: 0.8, freq: 'monthly' },
  { path: '/standards', priority: 0.75, freq: 'monthly' },
  { path: '/sbom', priority: 0.7, freq: 'weekly' },
  { path: '/sandbox', priority: 0.85, freq: 'monthly' },
  { path: '/roi', priority: 0.8, freq: 'monthly' },
  { path: '/governance/ai', priority: 0.8, freq: 'monthly' },
  { path: '/research', priority: 0.75, freq: 'monthly' },
  { path: '/deployment/confidential', priority: 0.8, freq: 'monthly' },
  { path: '/learn', priority: 0.7, freq: 'monthly' },
  { path: '/open-source', priority: 0.7, freq: 'monthly' },
  { path: '/ask-flyttgo', priority: 0.85, freq: 'monthly' },
  { path: '/transparency', priority: 0.7, freq: 'yearly' },
  { path: '/transparency/2026', priority: 0.75, freq: 'monthly' },
  { path: '/developers/webhooks', priority: 0.75, freq: 'monthly' },
  { path: '/press', priority: 0.65, freq: 'monthly' },
  { path: '/governance/ai/artefacts', priority: 0.7, freq: 'daily' },
  { path: '/verticals', priority: 0.85, freq: 'monthly' },
  { path: '/recommend', priority: 0.85, freq: 'monthly' },
  { path: '/compare', priority: 0.7, freq: 'monthly' },
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

  const caseStudyEntries: MetadataRoute.Sitemap = caseStudies.map((c) => {
    const path = `/customers/${c.slug}`;
    return {
      url: `${siteUrl}${path}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
      alternates: { languages: localeAlternates(path) },
    };
  });

  const jurisdictionEntries: MetadataRoute.Sitemap = JURISDICTIONS.map((j) => {
    const path = `/jurisdictions/${j.slug}`;
    return {
      url: `${siteUrl}${path}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: { languages: localeAlternates(path) },
    };
  });

  const comparisonEntries: MetadataRoute.Sitemap = COMPARISONS.map((c) => {
    const path = `/compare/${c.slug}`;
    return {
      url: `${siteUrl}${path}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
      alternates: { languages: localeAlternates(path) },
    };
  });

  const verticalEntries: MetadataRoute.Sitemap = VERTICALS.map((v) => {
    const path = `/verticals/${v.slug}`;
    return {
      url: `${siteUrl}${path}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.75,
      alternates: { languages: localeAlternates(path) },
    };
  });

  return [
    ...staticEntries,
    ...platformEntries,
    ...industryEntries,
    ...deploymentEntries,
    ...insightEntries,
    ...caseStudyEntries,
    ...jurisdictionEntries,
    ...comparisonEntries,
    ...verticalEntries,
  ];
}
