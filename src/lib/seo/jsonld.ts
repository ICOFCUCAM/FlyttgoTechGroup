const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://flyttgo.tech';

type Crumb = { name: string; href?: string };

/**
 * Build a schema.org BreadcrumbList JSON-LD payload. The last item is
 * treated as the current page — Google accepts either a URL or a
 * positional-only terminal item.
 */
export function breadcrumbListLd(crumbs: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      ...(c.href ? { item: `${siteUrl}${c.href}` } : {}),
    })),
  };
}

/** Small helper to render a JSON-LD payload as an inline script element. */
export function jsonLdScript(payload: unknown) {
  return {
    type: 'application/ld+json' as const,
    dangerouslySetInnerHTML: { __html: JSON.stringify(payload) },
  };
}
