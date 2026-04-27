import type { Metadata } from 'next';
import Navbar from '@/components/flytt/Navbar';
import PageHero from '@/components/flytt/PageHero';
import DeploymentArchitecture from '@/components/flytt/DeploymentArchitecture';
import DeploymentSpeed from '@/components/flytt/DeploymentSpeed';
import SiteFooter from '@/components/flytt/SiteFooter';
import { Reveal } from '@/components/flytt/Reveal';
import { breadcrumbListLd, jsonLdScript } from '@/lib/seo/jsonld';

export const metadata: Metadata = {
  title: 'Deployment — Flexible Deployment Architecture',
  description:
    'FlyttGo platforms support three deployment modes: FlyttGo-managed infrastructure, inside customer cloud environments, or within sovereign national data centers.',
  alternates: { canonical: '/deployment' },
  openGraph: {
    title: 'FlyttGo Deployment Architecture',
    description:
      'Managed, customer-cloud and sovereign national-datacenter deployment options.',
    url: '/deployment',
    type: 'website',
  },
};

export default function DeploymentPage() {
  const ld = breadcrumbListLd([
    { name: 'Home', href: '/' },
    { name: 'Deployment', href: '/deployment' },
  ]);
  return (
    <>
      <script {...jsonLdScript(ld)} />
      <Navbar />
      <main id="main" className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased">
        <PageHero
          code="DP.00"
          eyebrow="Deployment Architecture"
          title={
            <>
              Deploy on{' '}
              <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                your sovereignty terms.
              </em>
            </>
          }
          description="Three deployment modes — FlyttGo-managed SaaS, customer cloud and sovereign national datacenter — picked per programme. Each mode keeps the same module surface and the same audit posture; what changes is where the workload runs and who holds the keys."
          crumbs={[{ label: 'Home', href: '/' }, { label: 'Deployment' }]}
        />
        <DeploymentArchitecture />
        <Reveal>
          <DeploymentSpeed />
        </Reveal>
      </main>
      <SiteFooter />
    </>
  );
}
