import React from 'react';
import Navbar from './flytt/Navbar';
import HeroSlider from './flytt/HeroSlider';
import PlatformEcosystem from './flytt/PlatformEcosystem';
import MetricsStrip from './flytt/MetricsStrip';
import WhiteLabelSection from './flytt/WhiteLabelSection';
import InvestorSection from './flytt/InvestorSection';
import SolutionsSection from './flytt/SolutionsSection';
import IndustryGrid from './flytt/IndustryGrid';
import TechnologySection from './flytt/TechnologySection';
import DeploymentMap from './flytt/DeploymentMap';
import ContactFooter from './flytt/ContactFooter';

const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased">
      <Navbar />
      <main>
        <HeroSlider />
        <PlatformEcosystem />
        <MetricsStrip />
        <WhiteLabelSection />
        <InvestorSection />
        <SolutionsSection />
        <IndustryGrid />
        <TechnologySection />
        <DeploymentMap />
        <ContactFooter />
      </main>
    </div>
  );
};

export default AppLayout;
