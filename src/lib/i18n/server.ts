import { headers } from 'next/headers';
import { DEFAULT_LOCALE, LOCALES, type LocaleCode } from './locales';

/**
 * Reads the middleware-set x-flyttgo-locale header and returns a typed
 * LocaleCode. Safe to call in any server component; falls back to the
 * default locale when the header is absent (build-time prerender,
 * direct invocation).
 */
export function serverLocale(): LocaleCode {
  try {
    const raw = headers().get('x-flyttgo-locale') ?? DEFAULT_LOCALE.toLowerCase();
    const upper = raw.toUpperCase() as LocaleCode;
    return LOCALES.some((l) => l.code === upper) ? upper : DEFAULT_LOCALE;
  } catch {
    return DEFAULT_LOCALE;
  }
}
