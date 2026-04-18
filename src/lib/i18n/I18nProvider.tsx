'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  DEFAULT_LOCALE,
  LOCALES,
  STORAGE_KEY,
  type LocaleCode,
  type LocaleMeta,
} from './locales';
import { DICTIONARIES } from './dictionaries';

type I18nContextShape = {
  locale: LocaleCode;
  meta: LocaleMeta;
  setLocale: (code: LocaleCode) => void;
  t: (key: string) => string;
};

const I18nContext = createContext<I18nContextShape | null>(null);

const resolveMeta = (code: LocaleCode): LocaleMeta =>
  LOCALES.find((l) => l.code === code) ?? LOCALES[0];

const readCookieLocale = (): LocaleCode | null => {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(/(?:^|;\s*)NEXT_LOCALE=([^;]+)/);
  if (!match) return null;
  const raw = decodeURIComponent(match[1]).toUpperCase() as LocaleCode;
  return LOCALES.some((l) => l.code === raw) ? raw : null;
};

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<LocaleCode>(DEFAULT_LOCALE);

  useEffect(() => {
    // Priority: middleware-set cookie (authoritative — matches the URL
    // prefix users and crawlers actually see) > localStorage > default.
    const fromCookie = readCookieLocale();
    if (fromCookie) {
      setLocaleState(fromCookie);
      return;
    }
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY) as LocaleCode | null;
      if (saved && LOCALES.some((l) => l.code === saved)) {
        setLocaleState(saved);
      }
    } catch {
      /* noop */
    }
  }, []);

  useEffect(() => {
    const meta = resolveMeta(locale);
    if (typeof document === 'undefined') return;
    document.documentElement.setAttribute('lang', locale.toLowerCase());
    document.documentElement.setAttribute('dir', meta.rtl ? 'rtl' : 'ltr');
  }, [locale]);

  const setLocale = useCallback((code: LocaleCode) => {
    setLocaleState(code);
    try {
      window.localStorage.setItem(STORAGE_KEY, code);
      // Mirror to cookie so the middleware sees the change on the next
      // request — keeps hreflang + canonical URL in sync.
      document.cookie = `NEXT_LOCALE=${code.toLowerCase()}; Path=/; Max-Age=${
        60 * 60 * 24 * 365
      }; SameSite=Lax`;
    } catch {
      /* noop */
    }
  }, []);

  const t = useCallback(
    (key: string) => {
      const dict = DICTIONARIES[locale];
      return dict?.[key] ?? DICTIONARIES.EN[key] ?? key;
    },
    [locale],
  );

  const value = useMemo<I18nContextShape>(
    () => ({ locale, meta: resolveMeta(locale), setLocale, t }),
    [locale, setLocale, t],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    // Graceful fallback — allow using `t` at build-time or outside the provider
    // (e.g. RSC rendered without the provider wrapping) by returning English.
    return {
      locale: DEFAULT_LOCALE,
      meta: LOCALES[0],
      setLocale: () => {
        /* noop */
      },
      t: (key: string) => DICTIONARIES.EN[key] ?? key,
    } as I18nContextShape;
  }
  return ctx;
}
