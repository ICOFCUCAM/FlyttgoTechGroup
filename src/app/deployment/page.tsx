import type { Metadata } from 'next';
import Navbar from '@/components/flytt/Navbar';
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
        <DeploymentArchitecture />
        <Reveal>
          <DeploymentSpeed />
        </Reveal>
      </main>
      <SiteFooter />
    </>
  );
}
