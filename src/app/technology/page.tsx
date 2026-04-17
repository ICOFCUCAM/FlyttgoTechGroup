import type { Metadata } from 'next';
import Navbar from '@/components/flytt/Navbar';
import TechnologySection from '@/components/flytt/TechnologySection';
import SiteFooter from '@/components/flytt/SiteFooter';

export const metadata: Metadata = {
  title: 'Technology — Cloud-Native Platform Architecture',
  description:
    'FlyttGo runs on a modular cloud-native stack — Next.js, React, NestJS, PostgreSQL, PostGIS, Redis, Docker and Kubernetes — engineered for multi-tenant platform deployment across regions.',
  alternates: { canonical: '/technology' },
  openGraph: {
    title: 'FlyttGo Technology Architecture',
    description:
      'Multi-tenant, cloud-native infrastructure architecture powering regional and national platform deployments.',
    url: '/technology',
    type: 'website',
  },
};

export default function TechnologyPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="min-h-screen bg-white text-slate-900 antialiased">
        <TechnologySection />
      </main>
      <SiteFooter />
    </>
  );
}
