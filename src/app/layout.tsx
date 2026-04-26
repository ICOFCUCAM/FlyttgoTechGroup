import type { Metadata, Viewport } from 'next';
import { headers } from 'next/headers';
import { Inter, JetBrains_Mono, IBM_Plex_Serif } from 'next/font/google';
import { Providers } from './providers';
import Analytics from '@/components/flytt/Analytics';
import { DEFAULT_LOCALE, LOCALES, type LocaleCode } from '@/lib/i18n/locales';
import './globals.css';

const inter = Inter({
  // Variable font with optical sizing: omit `weight` so Google serves the
  // full variable font; CSS `font-optical-sizing: auto` (set in globals.css)
  // then lets large display sizes render with tighter Display letterforms
  // while body text stays optically balanced.
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

// Editorial serif — used for display headlines + italic emphasis tokens.
// Targets institutional infrastructure authority (Palantir / Stripe /
// OpenAI use serif emphasis to signal engineering depth, not marketing).
const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://flyttgo.tech';

const LOCALES_META = ['en', 'no', 'fr', 'de', 'es', 'sv', 'da', 'nl', 'pt', 'ar'] as const;

// Root-level hreflang alternates. Pages that define their own
// `alternates.canonical` keep their canonical URL; this sets the default
// per-language alternate mapping for the homepage and pages that don't
// override it.
const languageAlternates = Object.fromEntries(
  LOCALES_META.map((l) => [l, l === 'en' ? '/' : `/${l}`]),
);

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'FlyttGo Technologies Group — Smart Digital Infrastructure for Logistics, Education, Government & Enterprise',
    template: '%s · FlyttGo Technologies Group',
  },
  alternates: {
    canonical: '/',
    languages: { ...languageAlternates, 'x-default': '/' },
  },
  description:
    'FlyttGo Technologies Group builds modular AI-powered platform infrastructure — logistics marketplaces, education analytics, municipal dashboards, fleet intelligence and white-label digital platforms — deployable across Europe, Africa and the Middle East.',
  applicationName: 'FlyttGo Technologies Group',
  keywords: [
    'FlyttGo',
    'platform infrastructure',
    'mobility infrastructure',
    'workforce coordination',
    'government services platform',
    'education intelligence',
    'identity infrastructure',
    'payment orchestration',
    'financial operations',
    'marketplace infrastructure',
    'Transify',
    'Workverge',
    'Civitas',
    'EduPro',
    'Identra',
    'Payvera',
    'Ledgera',
  ],
  authors: [{ name: 'FlyttGo Technologies Group' }],
  creator: 'FlyttGo Technologies Group',
  publisher: 'FlyttGo Technologies Group',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'FlyttGo Technologies Group',
    title: 'Smart Digital Infrastructure for Logistics, Education, Government & Enterprise',
    description:
      'Modular AI-powered platform infrastructure. Deploy logistics marketplaces, education analytics, municipal dashboards and white-label systems at regional or national scale.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FlyttGo Technologies Group',
    description:
      'Platform infrastructure for logistics, education, government and enterprise operators.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0A1F3D' },
  ],
  width: 'device-width',
  initialScale: 1,
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'FlyttGo Technologies Group',
  alternateName: 'FlyttGo Tech Group',
  url: siteUrl,
  logo: `${siteUrl}/icon`,
  description:
    'Modular platform infrastructure for mobility, workforce, government, education, identity, payments, financial operations and marketplaces — deployed across Europe, Africa and the Middle East.',
  foundingLocation: {
    '@type': 'Place',
    name: 'Oslo, Norway',
  },
  areaServed: [
    { '@type': 'Place', name: 'European Union' },
    { '@type': 'Place', name: 'Africa' },
    { '@type': 'Place', name: 'Middle East and North Africa' },
  ],
  sameAs: [
    'https://www.linkedin.com/',
    'https://x.com/',
    'https://github.com/',
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: 'platform@flyttgotech.com',
      availableLanguage: ['English', 'Norwegian', 'French', 'German', 'Arabic'],
      areaServed: ['EU', 'AF', 'MENA'],
    },
    {
      '@type': 'ContactPoint',
      contactType: 'technical support',
      email: 'security@flyttgotech.com',
      availableLanguage: ['English'],
    },
  ],
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'FlyttGo Technologies Group',
  url: siteUrl,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${siteUrl}/platforms?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

// Reads the middleware-set `x-flyttgo-locale` header so server-rendered
// HTML carries the right <html lang/dir> and the I18nProvider boots with
// the correct dictionary on first paint — no English FOUC for non-EN
// visitors, and crawlers get properly-translated HTML.
function resolveServerLocale(): LocaleCode {
  try {
    const raw = headers().get('x-flyttgo-locale') ?? DEFAULT_LOCALE.toLowerCase();
    const upper = raw.toUpperCase() as LocaleCode;
    return LOCALES.some((l) => l.code === upper) ? upper : DEFAULT_LOCALE;
  } catch {
    return DEFAULT_LOCALE;
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = resolveServerLocale();
  const meta = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];
  return (
    <html
      lang={locale.toLowerCase()}
      dir={meta.rtl ? 'rtl' : 'ltr'}
      className={`${inter.variable} ${ibmPlexSerif.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-3 focus:left-3 focus:px-4 focus:py-2 focus:bg-white focus:text-slate-900 dark:text-white focus:rounded-md focus:shadow-lg focus:ring-2 focus:ring-[#1E6FD9]"
        >
          Skip to content
        </a>
        <Providers initialLocale={locale}>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
