const SUPPORTED = ['en', 'no', 'fr', 'de', 'es', 'sv', 'da', 'nl', 'pt', 'ar'] as const;
export type MiddlewareLocale = (typeof SUPPORTED)[number];
export const MIDDLEWARE_DEFAULT: MiddlewareLocale = 'en';

export const isSupportedLocale = (v: string): v is MiddlewareLocale =>
  (SUPPORTED as readonly string[]).includes(v);

/**
 * Parses a quality-sorted Accept-Language header and returns the best
 * matching supported locale. Handles Norwegian variants (nb, nn → no)
 * and falls back to the default locale when nothing matches.
 */
export function pickAcceptLanguage(header: string | null): MiddlewareLocale {
  if (!header) return MIDDLEWARE_DEFAULT;
  const parts = header
    .split(',')
    .map((p) => p.trim())
    .map((p) => {
      const [tag, qRaw] = p.split(';');
      const q = qRaw ? parseFloat(qRaw.split('=')[1] ?? '1') : 1;
      return { tag: tag.toLowerCase(), q: Number.isFinite(q) ? q : 0 };
    })
    .sort((a, b) => b.q - a.q);
  for (const { tag } of parts) {
    const primary = tag.split('-')[0];
    const normalized = primary === 'nb' || primary === 'nn' ? 'no' : primary;
    if (isSupportedLocale(normalized)) return normalized;
  }
  return MIDDLEWARE_DEFAULT;
}
