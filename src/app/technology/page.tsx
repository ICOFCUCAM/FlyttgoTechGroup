import type { Metadata } from 'next';
import Navbar from '@/components/flytt/Navbar';
import PageHero from '@/components/flytt/PageHero';
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
      <main id="main" className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased">
        <PageHero
          code="TX.00"
          eyebrow="Technology Architecture"
          title={
            <>
              A six-layer stack{' '}
              <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                engineered to be deployed.
              </em>
            </>
          }
          description="Multi-tenant. Region-aware. Standards-based. The runtime, data, identity, integration, orchestration and service-delivery layers that every FlyttGo platform module sits on — designed for repeatable rollout from pilot tenant to national programme."
          crumbs={[{ label: 'Home', href: '/' }, { label: 'Technology' }]}
        />
        <TechnologySection />
      </main>
      <SiteFooter />
    </>
  );
}
