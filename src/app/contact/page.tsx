import type { Metadata } from 'next';
import Navbar from '@/components/flytt/Navbar';
import ContactFooter from '@/components/flytt/ContactFooter';
import SiteFooter from '@/components/flytt/SiteFooter';

export const metadata: Metadata = {
  title: 'Contact — Talk to FlyttGo Deployment Engineering',
  description:
    'Contact FlyttGo Technologies Group to scope a logistics, analytics, municipal or white-label platform deployment.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact FlyttGo Deployment Engineering',
    description:
      'Scope your enterprise, government or white-label platform deployment with FlyttGo.',
    url: '/contact',
    type: 'website',
  },
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="min-h-screen bg-white text-slate-900 antialiased">
        <ContactFooter />
      </main>
      <SiteFooter />
    </>
  );
}
