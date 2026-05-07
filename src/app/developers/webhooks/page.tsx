import type { Metadata } from 'next';
import Navbar from '@/components/flytt/Navbar';
import PageHero from '@/components/flytt/PageHero';
import SiteFooter from '@/components/flytt/SiteFooter';
import { Reveal } from '@/components/flytt/Reveal';
import NextStepsGrid from '@/components/flytt/NextStepsGrid';
import WebhookInspector from '@/components/flytt/WebhookInspector';
import { breadcrumbListLd, jsonLdScript } from '@/lib/seo/jsonld';
import {
  Webhook,
  ShieldCheck,
  Activity,
  Compass,
  Code2,
  Workflow,
  type LucideIcon,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Webhook tester · WH.00 — FlyttGo Technologies Group',
  description:
    'Inspector URL captures live webhook deliveries; signature validator verifies HMAC-SHA256 against the 5-minute timestamp window. Both run entirely in the browser before you wire production receivers.',
  alternates: { canonical: '/developers/webhooks' },
};

type Beat = { code: string; icon: LucideIcon; title: string; body: string };

const BEATS: Beat[] = [
  {
    code: 'WH.B1', icon: Webhook,
    title: 'Inspector URL · seeded with sample events',
    body: 'Every visitor gets a unique inspector URL. POST anything; the timeline captures it. First-visit timeline pre-seeded with 5 sample events shaped exactly like real production webhooks across Transify / Identra / Payvera / Civitas / Workverge.',
  },
  {
    code: 'WH.B2', icon: ShieldCheck,
    title: 'Signature validator · HMAC-SHA256 in-browser',
    body: 'Paste signing secret + payload + timestamp + signature; we compute the HMAC against the same construction the platform uses (timestamp.body) and verify a 5-minute timestamp window. Web Crypto · nothing leaves the page.',
  },
  {
    code: 'WH.B3', icon: Activity,
    title: 'Replay any event',
    body: 'Hit replay on any captured event to push it back through the timeline at the current timestamp. Useful for debugging idempotency, retry policy and dead-letter handling without poking production.',
  },
];

export default function WebhookTesterPage() {
  const ld = breadcrumbListLd([
    { name: 'Home', href: '/' },
    { name: 'Developers', href: '/developers' },
    { name: 'Webhook tester', href: '/developers/webhooks' },
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
          code="WH.00"
          eyebrow="Webhook tester + signature validator"
          title={
            <>
              Test before you{' '}
              <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                wire production.
              </em>
            </>
          }
          description="Two surfaces every dev team needs: a request-bin-style inspector URL with a live timeline, and an HMAC-SHA256 signature validator that runs entirely in the browser via Web Crypto. Pattern-match against the real shapes our webhooks emit before you ship a receiver."
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'Developers', href: '/developers' },
            { label: 'Webhook tester' },
          ]}
        />

        {/* WH.SF — the surface */}
        <Reveal>
          <section
            id="wh-sf"
            aria-labelledby="wh-sf-heading"
            className="bg-gradient-to-b from-white to-[#F5F8FC] dark:from-slate-950 dark:to-slate-900 py-16 lg:py-20 border-y border-slate-200/60 dark:border-slate-800/60"
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400 mb-6">
                <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">WH.SF</span>
                <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
                <span id="wh-sf-heading">Live tester</span>
              </div>
              <WebhookInspector />
            </div>
          </section>
        </Reveal>

        {/* WH.BT — beats */}
        <Reveal>
          <section className="py-20 lg:py-24 bg-white dark:bg-slate-950 border-b border-slate-200/60 dark:border-slate-800/60">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
                <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">WH.BT</span>
                <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
                <span>Three guarantees</span>
              </div>
              <ul className="mt-12 grid md:grid-cols-3 gap-3">
                {BEATS.map((b) => {
                  const Icon = b.icon;
                  return (
                    <li
                      key={b.code}
                      className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span
                          className="w-10 h-10 rounded-lg bg-[#0A3A6B]/8 dark:bg-[#9ED0F9]/12 text-[#0A3A6B] dark:text-[#9ED0F9] flex items-center justify-center"
                          aria-hidden="true"
                        >
                          <Icon size={18} strokeWidth={1.75} />
                        </span>
                        <span className="font-mono text-[10px] tracking-[0.22em] font-semibold text-[#0A3A6B] dark:text-[#9ED0F9]">
                          {b.code}
                        </span>
                      </div>
                      <h3 className="mt-3 text-[14px] font-semibold tracking-tight text-slate-900 dark:text-white leading-snug">
                        {b.title}
                      </h3>
                      <p className="mt-2 text-[12px] text-slate-600 dark:text-slate-400 leading-relaxed">
                        {b.body}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <NextStepsGrid
            code="WH.NX"
            eyebrow="Where the webhook tester plugs in"
            titleLead="Webhooks are one shape of"
            titleEmphasis="programmatic platform integration."
            intro="Once your receiver passes the validator + replays a few events, it's ready for production. The four pathways below take a developer integration into deeper engagement."
            steps={[
              { href: '/developers/api',        code: 'AP.RF', icon: Code2,       title: 'API reference',   body: 'OpenAPI 3.1 across every module — the endpoints these webhooks emit from.', meta: 'AP.RF · 634+ endpoints' },
              { href: '/developers/playground', code: 'API.PG', icon: Activity,   title: 'Live playground',  body: 'Drive the API live with a sandbox token; trigger real events into your inspector URL.',    meta: 'API.PG · live' },
              { href: '/sandbox',               code: 'SB.SP',  icon: Workflow,   title: 'Spin up sandbox',  body: '60-second sandbox tenant; webhook deliveries fire into your inspector URL.',                meta: 'SB.SP · 7-day TTL' },
              { href: '/consultation',          code: 'CB.00',  icon: Compass,    title: 'Open scoping',     body: 'Five-step intake routes a webhook-led integration discussion under CT.01.',                  meta: 'CT.01 · CB.00' },
            ]}
          />
        </Reveal>
      </main>
      <SiteFooter />
    </>
  );
}
