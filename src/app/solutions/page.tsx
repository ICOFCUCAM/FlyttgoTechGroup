import type { Metadata } from 'next';
import Navbar from '@/components/flytt/Navbar';
import PageHero from '@/components/flytt/PageHero';
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
        <PageHero
          code="SO.00"
          eyebrow="Deployment Solutions"
          title={
            <>
              Programme-shaped engagements{' '}
              <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                for operators and institutions.
              </em>
            </>
          }
          description="Enterprise logistics, government services, education analytics and regulated-transport oversight. Each programme is composed from the same modular surface — picked, configured and deployed against the procurement tier the buyer's operating reality calls for."
          crumbs={[{ label: 'Home', href: '/' }, { label: 'Solutions' }]}
        />
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
