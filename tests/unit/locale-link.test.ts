import { describe, it, expect } from 'vitest';
import { localizeHref } from '@/components/flytt/LocaleLink';

describe('localizeHref', () => {
  it('returns href unchanged for English (default locale)', () => {
    expect(localizeHref('/platforms', 'EN')).toBe('/platforms');
    expect(localizeHref('/', 'EN')).toBe('/');
    expect(localizeHref('/insights/foo', 'EN')).toBe('/insights/foo');
  });

  it('prepends the locale prefix for non-EN locales', () => {
    expect(localizeHref('/platforms', 'NO')).toBe('/no/platforms');
    expect(localizeHref('/platforms/transify', 'FR')).toBe('/fr/platforms/transify');
    expect(localizeHref('/industries/government', 'DE')).toBe('/de/industries/government');
    expect(localizeHref('/', 'AR')).toBe('/ar');
  });

  it('does not double-prefix already locale-prefixed hrefs', () => {
    expect(localizeHref('/no/platforms', 'NO')).toBe('/no/platforms');
    expect(localizeHref('/fr/', 'FR')).toBe('/fr/');
    expect(localizeHref('/en/insights', 'NO')).toBe('/en/insights');
    // Matches any supported prefix case-insensitively
    expect(localizeHref('/NO/platforms', 'NO')).toBe('/NO/platforms');
  });

  it('passes external absolute URLs through unchanged', () => {
    expect(localizeHref('https://flyttgo.tech/platforms', 'NO')).toBe(
      'https://flyttgo.tech/platforms',
    );
    expect(localizeHref('http://example.com', 'FR')).toBe('http://example.com');
    expect(localizeHref('//cdn.example.com/x.js', 'FR')).toBe('//cdn.example.com/x.js');
  });

  it('passes mailto / tel / fragment / query-only hrefs through unchanged', () => {
    expect(localizeHref('mailto:hello@flyttgotech.com', 'NO')).toBe(
      'mailto:hello@flyttgotech.com',
    );
    expect(localizeHref('tel:+4420', 'FR')).toBe('tel:+4420');
    expect(localizeHref('#top', 'FR')).toBe('#top');
    expect(localizeHref('?q=foo', 'FR')).toBe('?q=foo');
  });

  it('preserves query strings and fragments on internal paths', () => {
    expect(localizeHref('/contact?intent=partnership', 'NO')).toBe(
      '/no/contact?intent=partnership',
    );
    expect(localizeHref('/platforms#top', 'FR')).toBe('/fr/platforms#top');
  });
});
