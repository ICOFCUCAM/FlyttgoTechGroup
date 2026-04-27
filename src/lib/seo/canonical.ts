import { serverLocale } from '@/lib/i18n/server';
import { DEFAULT_LOCALE } from '@/lib/i18n/locales';

const LOCALES = ['en', 'no', 'fr', 'de', 'es', 'sv', 'da', 'nl', 'pt', 'ar'] as const;

/**
 * Returns the canonical path for a given logical path under the current
 * server-detected locale. EN stays at the root path; other locales get
 * a `/<locale>` prefix. Use inside `generateMetadata` so each locale
 * variant declares itself as its own canonical (not EN's) — otherwise
 * Google dedupes non-EN variants against the English URL.
 */
export function canonicalFor(path: string): string {
  const locale = serverLocale().toLowerCase();
  const clean = path === '' ? '/' : path;
  if (locale === DEFAULT_LOCALE.toLowerCase()) return clean;
  return `/${locale}${clean === '/' ? '' : clean}`;
}

/**
 * Build the full hreflang alternates map for a logical path. Every locale
 * plus `x-default` resolves to its own URL.
 */
export function languageAlternates(path: string): Record<string, string> {
  const clean = path === '' ? '/' : path;
  const out: Record<string, string> = {};
  for (const l of LOCALES) {
    out[l] = l === 'en' ? clean : `/${l}${clean === '/' ? '' : clean}`;
  }
  out['x-default'] = clean;
  return out;
}
