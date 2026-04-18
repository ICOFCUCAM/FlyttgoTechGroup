import type { Metadata } from 'next';
import Navbar from '@/components/flytt/Navbar';
import TargetUsers from '@/components/flytt/TargetUsers';
import IndustryGrid from '@/components/flytt/IndustryGrid';
import DeploymentMap from '@/components/flytt/DeploymentMap';
import SiteFooter from '@/components/flytt/SiteFooter';
import { Reveal } from '@/components/flytt/Reveal';

export const metadata: Metadata = {
  title: 'Industries — Transport, Education, Government, Marketplaces & Enterprise Operations',
  description:
    'FlyttGo platform infrastructure is deployed across transport networks, education systems, municipal services, service marketplaces and enterprise operations — powered by a single cloud-native architecture.',
  alternates: { canonical: '/industries' },
  openGraph: {
    title: 'Industries Served by FlyttGo Infrastructure',
    description:
      'One platform layer. Every industry deployment — logistics, education, government, marketplaces and enterprise operations.',
    url: '/industries',
    type: 'website',
  },
};

export default function IndustriesPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased">
        <TargetUsers />
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
