import type { Metadata } from 'next';
import Navbar from '@/components/flytt/Navbar';
import EnterpriseSection from '@/components/flytt/EnterpriseSection';
import GovernmentSection from '@/components/flytt/GovernmentSection';
import DeploymentSpeed from '@/components/flytt/DeploymentSpeed';
import SolutionsSection from '@/components/flytt/SolutionsSection';
import SiteFooter from '@/components/flytt/SiteFooter';
import { Reveal } from '@/components/flytt/Reveal';

export const metadata: Metadata = {
  title: 'Solutions — Enterprise Logistics & Government Deployment Infrastructure',
  description:
    'Deployment solutions for enterprise fleets, municipalities, education ministries and transport authorities — built on the FlyttGo modular infrastructure layer.',
  alternates: { canonical: '/solutions' },
  openGraph: {
    title: 'FlyttGo Deployment Solutions',
    description:
      'Enterprise logistics, government services, education analytics and regulated transport oversight — deployed as modular infrastructure.',
    url: '/solutions',
    type: 'website',
  },
};

export default function SolutionsPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased">
        <EnterpriseSection />
        <Reveal>
          <GovernmentSection />
        </Reveal>
        <Reveal>
          <DeploymentSpeed />
        </Reveal>
        <Reveal>
          <SolutionsSection />
        </Reveal>
      </main>
      <SiteFooter />
    </>
  );
}
