import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { Providers } from './providers';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://flyttgo.tech';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'FlyttGo Technologies Group — Smart Digital Infrastructure for Logistics, Education, Government & Enterprise',
    template: '%s · FlyttGo Technologies Group',
  },
  description:
    'FlyttGo Technologies Group builds modular AI-powered platform infrastructure — logistics marketplaces, education analytics, municipal dashboards, fleet intelligence and white-label digital platforms — deployable across Europe, Africa and the Middle East.',
  applicationName: 'FlyttGo Technologies Group',
  keywords: [
    'FlyttGo',
    'platform infrastructure',
    'logistics marketplace',
    'education analytics',
    'municipal dashboards',
    'fleet intelligence',
    'white-label platform',
    'GovStack',
    'EduPro AI',
    'FleetStack',
    'MarketStack',
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-3 focus:left-3 focus:px-4 focus:py-2 focus:bg-white focus:text-slate-900 focus:rounded-md focus:shadow-lg focus:ring-2 focus:ring-[#1E6FD9]"
        >
          Skip to content
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
