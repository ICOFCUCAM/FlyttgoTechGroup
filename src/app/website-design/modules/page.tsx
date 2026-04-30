import type { Metadata } from 'next';
import Link from '@/components/flytt/LocaleLink';
import Navbar from '@/components/flytt/Navbar';
import PageHero from '@/components/flytt/PageHero';
import AddOnPricing from '@/components/flytt/engineering/AddOnPricing';
import SiteFooter from '@/components/flytt/SiteFooter';
import { Reveal } from '@/components/flytt/Reveal';
import { breadcrumbListLd, jsonLdScript } from '@/lib/seo/jsonld';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Feature Modules — FlyttGo Web Studio',
  description:
    'The eight feature modules that bolt onto any Web Studio capability level — authentication, payments, marketplace engine, government compliance, AI routing and more.',
  alternates: { canonical: '/website-design/modules' },
};

export default function WebStudioModulesPage() {
  const ld = breadcrumbListLd([
    { name: 'Home', href: '/' },
    { name: 'Web Studio', href: '/website-design' },
    { name: 'Modules', href: '/website-design/modules' },
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
          code="WS.MD"
          eyebrow="Feature Modules"
          title={
            <>
              Modular extensions{' '}
              <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                that stack onto any level.
              </em>
            </>
          }
          description="Each module is licensed independently and stacks against any of the six capability levels. Final pricing depends on integration depth, identity boundary and regulatory perimeter — the bands here are indicative."
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'Web Studio', href: '/website-design' },
            { label: 'Modules' },
          ]}
        />

        <Reveal>
          <AddOnPricing />
        </Reveal>

        <Reveal>
          <section className="bg-[#F7FAFD] dark:bg-slate-900/60 py-12 lg:py-16 border-t border-slate-200/60 dark:border-slate-800/60">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-wrap items-center gap-4">
              <Link
                href="/website-design"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0A3A6B] dark:text-[#9ED0F9] hover:underline underline-offset-4"
              >
                <ArrowLeft size={14} aria-hidden="true" />
                Back to Web Studio
              </Link>
              <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
              <Link
                href="/website-design/levels"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              >
                Six capability levels
                <ArrowUpRight size={13} aria-hidden="true" />
              </Link>
              <Link
                href="/website-design/engagement"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              >
                Three-step engagement
                <ArrowUpRight size={13} aria-hidden="true" />
              </Link>
            </div>
          </section>
        </Reveal>
      </main>
      <SiteFooter />
    </>
  );
}
