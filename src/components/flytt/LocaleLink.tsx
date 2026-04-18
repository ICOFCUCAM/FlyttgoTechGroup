'use client';

import React from 'react';
import NextLink, { type LinkProps as NextLinkProps } from 'next/link';
import { useI18n } from '@/lib/i18n/I18nProvider';
import { DEFAULT_LOCALE, type LocaleCode } from '@/lib/i18n/locales';

// Mirror of supported locales from src/lib/i18n/locales.ts. Duplicated as
// a plain regex so the happy path stays dependency-free and tree-shakable.
const LOCALE_PREFIX_RE = /^\/(en|no|fr|de|es|sv|da|nl|pt|ar)(\/|$)/i;

/**
 * Pure helper — given an href and a locale, return the locale-prefixed
 * href (or the original if no prefix is needed). Extracted so it can be
 * unit-tested without React / Next context.
 */
export function localizeHref(href: string, locale: LocaleCode): string {
  const isInternalAbsolute =
    typeof href === 'string' &&
    href.startsWith('/') &&
    !href.startsWith('//') &&
    !LOCALE_PREFIX_RE.test(href);

  if (!isInternalAbsolute) return href;
  if (locale === DEFAULT_LOCALE) return href;

  const prefix = `/${locale.toLowerCase()}`;
  return href === '/' ? prefix : `${prefix}${href}`;
}

type Props = Omit<NextLinkProps, 'href'> &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof NextLinkProps | 'href'> & {
    href: string;
    children?: React.ReactNode;
  };

/**
 * Drop-in replacement for `next/link` that prepends the current i18n
 * locale to internal absolute paths, so client-side navigations preserve
 * the URL prefix. External links, anchors, mailto / tel, and already
 * locale-prefixed paths pass through unchanged.
 *
 * Drives the behaviour that middleware sets up on fresh requests — without
 * it a client nav from /no/platforms → /insights would land at /insights
 * (English URL) while the content still renders in Norwegian, breaking
 * share links and browser history consistency.
 */
const LocaleLink = React.forwardRef<HTMLAnchorElement, Props>(function LocaleLink(
  { href, children, ...rest },
  ref,
) {
  const { locale } = useI18n();
  const finalHref = localizeHref(href, locale);
  return (
    <NextLink href={finalHref} ref={ref} {...rest}>
      {children}
    </NextLink>
  );
});

export default LocaleLink;
