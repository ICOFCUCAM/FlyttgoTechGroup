import type { Metadata } from 'next';
import Navbar from '@/components/flytt/Navbar';
import PageHero from '@/components/flytt/PageHero';
import SectorsOverview from '@/components/flytt/SectorsOverview';
import TargetUsers from '@/components/flytt/TargetUsers';
import IndustryGrid from '@/components/flytt/IndustryGrid';
import DeploymentMap from '@/components/flytt/DeploymentMap';
import SiteFooter from '@/components/flytt/SiteFooter';
import { Reveal } from '@/components/flytt/Reveal';
import { breadcrumbListLd, jsonLdScript } from '@/lib/seo/jsonld';

// SSR so the layout's server-detected locale drives the sector card copy.
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Industries — Government, Education, Transport, Enterprise, Marketplaces & Logistics',
  description:
    'FlyttGo platform infrastructure is deployed across government and municipal services, education systems, transport networks, enterprise operations, regulated marketplaces and freight corridors — one cloud-native architecture per sector deployment.',
  alternates: { canonical: '/industries' },
  openGraph: {
    title: 'Industries Served by FlyttGo Infrastructure',
    description:
      'One platform layer. Six sector deployments — government, education, transport, enterprise, marketplaces and freight networks.',
    url: '/industries',
    type: 'website',
  },
};

export default function IndustriesPage() {
  const ld = breadcrumbListLd([
    { name: 'Home', href: '/' },
    { name: 'Industries', href: '/industries' },
  ]);
  return (
    <>
      <script {...jsonLdScript(ld)} />
      <Navbar />
      <main
        id="main"
        className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased"
      >
        <PageHero
          code="IN.00"
          eyebrow="Industries Served"
          title={
            <>
              One platform layer.{' '}
              <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                Every sector deployment.
              </em>
            </>
          }
          description="Ministries, universities, transport authorities, enterprise fleets, marketplace operators and freight networks deploy FlyttGo platforms as modules — with the configuration, compliance posture and deployment pattern that each sector actually needs."
          crumbs={[{ label: 'Home', href: '/' }, { label: 'Industries' }]}
        />
        <SectorsOverview />
        <Reveal>
          <TargetUsers />
        </Reveal>
        <Reveal>
          <IndustryGrid />
        </Reveal>
        <Reveal>
          <DeploymentMap />
        </Reveal>
      </main>
      <SiteFooter />
    </>
  );
}
