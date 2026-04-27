import type { Metadata } from 'next';
import Navbar from '@/components/flytt/Navbar';
import SiteFooter from '@/components/flytt/SiteFooter';
import ApiPlayground from './ApiPlayground';

export const metadata: Metadata = {
  title: 'API playground — FlyttGo developers',
  description:
    'Live API request builder. Choose an endpoint, edit the request, see the response inline. Real fetches against the public surface; tenant-scoped endpoints require a workspace token.',
  alternates: { canonical: '/developers/playground' },
};

export default function ApiPlaygroundPage() {
  return (
    <>
      <Navbar />
      <main
        id="main"
        className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased"
      >
        <section className="relative pt-14 lg:pt-20 pb-10 bg-gradient-to-b from-[#F7FAFD] to-white dark:from-slate-900 dark:to-slate-950 border-b border-slate-200/60 dark:border-slate-800/60">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
              <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">API.PG</span>
              <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
              <span>Live API playground</span>
            </div>
            <h1 className="mt-6 font-serif text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight leading-[1.05] max-w-3xl">
              Run a request{' '}
              <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                inside the docs.
              </em>
            </h1>
            <p className="mt-5 text-base md:text-lg text-slate-600 dark:text-slate-400 leading-[1.65] max-w-2xl">
              Pick an endpoint from the public-surface catalogue, hit
              Send, see the actual response. Tenant-scoped endpoints
              return 401 unless a workspace token is configured —
              public-surface endpoints work for everyone.
            </p>
          </div>
        </section>

        <section className="py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <ApiPlayground />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
