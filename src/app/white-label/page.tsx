import type { Metadata } from 'next';
import Navbar from '@/components/flytt/Navbar';
import WhiteLabelStrategy from '@/components/flytt/WhiteLabelStrategy';
import WhiteLabelSection from '@/components/flytt/WhiteLabelSection';
import SiteFooter from '@/components/flytt/SiteFooter';
import { Reveal } from '@/components/flytt/Reveal';

export const metadata: Metadata = {
  title: 'White-Label Deployment — Launch Your Own Platform',
  description:
    'Launch a branded logistics marketplace, analytics environment or municipal coordination system on FlyttGo infrastructure — tenant-isolated, brandable and deployable in weeks.',
  alternates: { canonical: '/white-label' },
  openGraph: {
    title: 'Launch Your Platform — FlyttGo White-Label Deployment',
    description:
      'Deploy branded logistics, analytics and municipal platforms on modular, multi-tenant infrastructure.',
    url: '/white-label',
    type: 'website',
  },
};

export default function WhiteLabelPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased">
        <WhiteLabelStrategy />
        <Reveal>
          <WhiteLabelSection />
        </Reveal>
      </main>
      <SiteFooter />
    </>
  );
}
