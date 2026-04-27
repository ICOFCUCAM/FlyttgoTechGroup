import { describe, it, expect } from 'vitest';
import sitemap from '@/app/sitemap';
import { platformList } from '@/data/platforms';
import { industrySectors } from '@/data/industries';
import { deploymentModes } from '@/data/deployment-modes';
import { insights } from '@/data/insights';

const LOCALES = ['en', 'no', 'fr', 'de', 'es', 'sv', 'da', 'nl', 'pt', 'ar'];
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://flyttgo.tech';

describe('sitemap()', () => {
  const entries = sitemap();

  it('includes every dynamic surface route', () => {
    const urls = new Set(entries.map((e) => e.url));

    for (const p of platformList) {
      expect(
        urls.has(`${SITE_URL}/platforms/${p.slug}`),
        `sitemap missing /platforms/${p.slug}`,
      ).toBe(true);
    }
    for (const s of industrySectors) {
      expect(
        urls.has(`${SITE_URL}/industries/${s.slug}`),
        `sitemap missing /industries/${s.slug}`,
      ).toBe(true);
    }
    for (const m of deploymentModes) {
      expect(
        urls.has(`${SITE_URL}/deployment/${m.slug}`),
        `sitemap missing /deployment/${m.slug}`,
      ).toBe(true);
    }
    for (const i of insights) {
      expect(
        urls.has(`${SITE_URL}/insights/${i.slug}`),
        `sitemap missing /insights/${i.slug}`,
      ).toBe(true);
    }
  });

  it('includes key static surfaces', () => {
    const urls = new Set(entries.map((e) => e.url));
    for (const path of [
      '/',
      '/platforms',
      '/industries',
      '/deployment',
      '/insights',
      '/status',
      '/company',
      '/contact',
      '/privacy',
      '/terms',
      '/security',
      '/compliance',
    ]) {
      expect(urls.has(`${SITE_URL}${path}`), `sitemap missing ${path}`).toBe(true);
    }
  });

  it('every entry carries hreflang alternates for all 10 locales + x-default', () => {
    for (const entry of entries) {
      const languages = entry.alternates?.languages;
      expect(languages, `sitemap entry for ${entry.url} missing alternates`).toBeDefined();
      for (const l of LOCALES) {
        expect(
          languages?.[l],
          `sitemap entry for ${entry.url} missing ${l} alternate`,
        ).toBeTruthy();
      }
      expect(
        languages?.['x-default'],
        `sitemap entry for ${entry.url} missing x-default alternate`,
      ).toBeTruthy();
    }
  });

  it('non-EN alternates are prefixed with the locale segment', () => {
    const home = entries.find((e) => e.url === `${SITE_URL}/`);
    expect(home).toBeDefined();
    expect(home?.alternates?.languages?.en).toBe(`${SITE_URL}/`);
    expect(home?.alternates?.languages?.no).toBe(`${SITE_URL}/no`);
    expect(home?.alternates?.languages?.fr).toBe(`${SITE_URL}/fr`);
    expect(home?.alternates?.languages?.ar).toBe(`${SITE_URL}/ar`);

    const transify = entries.find(
      (e) => e.url === `${SITE_URL}/platforms/transify`,
    );
    expect(transify).toBeDefined();
    expect(transify?.alternates?.languages?.en).toBe(
      `${SITE_URL}/platforms/transify`,
    );
    expect(transify?.alternates?.languages?.no).toBe(
      `${SITE_URL}/no/platforms/transify`,
    );
    expect(transify?.alternates?.languages?.fr).toBe(
      `${SITE_URL}/fr/platforms/transify`,
    );
  });

  it('no duplicate URLs in the sitemap', () => {
    const urls = entries.map((e) => e.url);
    expect(new Set(urls).size).toBe(urls.length);
  });

  it('insight entries use the publishedOn date as lastModified', () => {
    for (const i of insights) {
      const entry = entries.find((e) => e.url === `${SITE_URL}/insights/${i.slug}`);
      expect(entry).toBeDefined();
      const lm = entry?.lastModified;
      expect(lm).toBeDefined();
      // lastModified can be Date | string — normalise and compare the day.
      const normalized =
        lm instanceof Date ? lm.toISOString() : String(lm);
      expect(normalized.slice(0, 10)).toBe(i.publishedOn.slice(0, 10));
    }
  });
});
