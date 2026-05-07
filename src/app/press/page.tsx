import type { Metadata } from 'next';
import Link from '@/components/flytt/LocaleLink';
import Navbar from '@/components/flytt/Navbar';
import PageHero from '@/components/flytt/PageHero';
import SiteFooter from '@/components/flytt/SiteFooter';
import { Reveal } from '@/components/flytt/Reveal';
import NextStepsGrid from '@/components/flytt/NextStepsGrid';
import { breadcrumbListLd, jsonLdScript } from '@/lib/seo/jsonld';
import {
  Newspaper,
  Download,
  Mic,
  Calendar,
  Mail,
  ShieldCheck,
  ArrowUpRight,
  Compass,
  Layers3,
  type LucideIcon,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Press & media kit · PR.MK — FlyttGo Technologies Group',
  description:
    'Brand assets, press release archive, analyst-relations contact, embargo policy, executive bios, speaking-engagement availability. The single entry point for journalists, analysts and event programme committees.',
  alternates: { canonical: '/press' },
};

type Asset = {
  code: string;
  name: string;
  formats: string[];
  size: string;
  href: string;
  body: string;
};

const ASSETS: Asset[] = [
  { code: 'PR.MK.01', name: 'F-mark · primary logo',         formats: ['SVG', 'PNG @1x', 'PNG @2x', 'PDF'],       size: '1.4 MB ZIP', href: '/press/assets/f-mark.zip',           body: 'Primary brand mark in light + dark variants. Includes safe-area guidelines and minimum-size rules.' },
  { code: 'PR.MK.02', name: 'Wordmark + lockup',             formats: ['SVG', 'PNG @1x', 'PNG @2x', 'PDF'],       size: '1.2 MB ZIP', href: '/press/assets/wordmark.zip',         body: 'Full wordmark FlyttGo Technologies Group plus the F-mark + wordmark lockup in horizontal and stacked compositions.' },
  { code: 'PR.MK.03', name: 'Brand colour palette',          formats: ['ASE', 'JSON', 'PDF guide'],                size: '0.6 MB ZIP', href: '/press/assets/colour-palette.zip',   body: 'Navy 0A3A6B, light blue 9ED0F9, warm brass D6B575, teal 0FB5A6, violet 7C5CE6 — with hex / RGB / CMYK / Pantone equivalents.' },
  { code: 'PR.MK.04', name: 'Product screenshots',           formats: ['PNG @2x', 'PNG @3x'],                      size: '8.4 MB ZIP', href: '/press/assets/screenshots.zip',      body: 'Console (OC.00), agent surface (AI.00), sandbox flow (SB.SP), pricing configurator (PR.00) — light + dark.' },
  { code: 'PR.MK.05', name: 'Executive headshots',            formats: ['JPG @1x', 'JPG @2x'],                      size: '3.2 MB ZIP', href: '/press/assets/headshots.zip',         body: 'Platform Council leadership; landscape + portrait crops at 1080 / 2160 / 3240 resolution. Photo credits in the bundle.' },
  { code: 'PR.MK.06', name: 'Architecture diagrams',          formats: ['SVG', 'PNG @2x', 'PDF'],                  size: '4.8 MB ZIP', href: '/press/assets/diagrams.zip',         body: 'Eight platform modules + FlyttGoTech Core orchestration diagram, four deployment substrates (DM.01-04), regional footprint map.' },
];

type Release = {
  code: string;
  date: string;
  title: string;
  href: string;
  category: 'Product' | 'Programme' | 'Funding' | 'Compliance' | 'Partnership';
};

const RELEASES: Release[] = [
  { code: 'PR.RL.06', date: '2026-04-22', title: 'FlyttGo Technologies Group ships first public Software Bill of Materials registry across all eight modules', href: '/press/releases/2026-04-22-sbom-registry', category: 'Compliance' },
  { code: 'PR.RL.05', date: '2026-03-18', title: 'Identra issues first eIDAS-substantial qualified-signature flows ahead of EU Wallet rollout', href: '/press/releases/2026-03-18-identra-qes', category: 'Product' },
  { code: 'PR.RL.04', date: '2026-02-08', title: 'GCC Transport Authority programme reaches 12,400 daily routed orders on Transify substrate', href: '/press/releases/2026-02-08-gcc-transport-milestone', category: 'Programme' },
  { code: 'PR.RL.03', date: '2026-01-14', title: 'FlyttGo Technologies Group joins Open Source Programme Office; sponsors Sigstore + OPA + CycloneDX', href: '/press/releases/2026-01-14-ospo-launch', category: 'Partnership' },
  { code: 'PR.RL.02', date: '2025-12-04', title: 'CSRD scope-3 attribution shipped to platform tenants ahead of FY2026 reporting deadline', href: '/press/releases/2025-12-04-csrd-scope3', category: 'Compliance' },
  { code: 'PR.RL.01', date: '2025-11-18', title: 'FlyttGo Technologies Group publishes Model Context Protocol manifest; eight platforms become AI-agent discoverable', href: '/press/releases/2025-11-18-mcp-launch', category: 'Product' },
];

const CATEGORY_CLS: Record<Release['category'], string> = {
  Product:      'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  Programme:    'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
  Funding:      'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
  Compliance:   'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
  Partnership:  'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300',
};

type Pillar = { code: string; icon: LucideIcon; title: string; body: string };

const POLICY: Pillar[] = [
  { code: 'PR.MK.PL.01', icon: Mic,        title: 'Embargo policy',          body: 'Embargo requests honoured for journalists who cite FlyttGo as primary source. Standard embargo 48 hours; product-launch embargoes coordinated case-by-case via the comms desk.' },
  { code: 'PR.MK.PL.02', icon: Calendar,   title: 'Speaking availability',    body: 'Platform Council members available for keynotes, panels and analyst briefings across architecture, security, AI governance, sovereign deployment and EU regulatory topics. Booking through speaking@flyttgotech.com.' },
  { code: 'PR.MK.PL.03', icon: Mail,        title: 'Analyst relations',        body: 'Briefing book updated quarterly. Standing AR cadence with major analysts on request — Gartner, Forrester, IDC, GigaOm, MWD. Contact analysts@flyttgotech.com.' },
  { code: 'PR.MK.PL.04', icon: ShieldCheck, title: 'Brand integrity',         body: 'Use the F-mark and wordmark as supplied. Do not stretch, recolour or add visual effects. Always pair the F-mark with at least 16 px clearspace. Brand questions: brand@flyttgotech.com.' },
];

export default function PressPage() {
  const ld = breadcrumbListLd([
    { name: 'Home', href: '/' },
    { name: 'Press & media kit', href: '/press' },
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
          code="PR.MK"
          eyebrow="Press & media kit"
          title={
            <>
              One entry point{' '}
              <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                for journalists and analysts.
              </em>
            </>
          }
          description="Brand assets, press release archive, analyst relations contact, embargo policy, executive bios, speaking availability. Everything a writer or programme committee needs in one place — refreshed alongside the changelog."
          crumbs={[{ label: 'Home', href: '/' }, { label: 'Press & media kit' }]}
        />

        {/* PR.MK.AS — brand assets */}
        <Reveal>
          <section className="bg-gradient-to-b from-white to-[#F5F8FC] dark:from-slate-950 dark:to-slate-900 py-20 lg:py-24 border-y border-slate-200/60 dark:border-slate-800/60">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
                <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">PR.MK.AS</span>
                <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
                <span>Brand assets</span>
              </div>
              <h2 className="mt-6 max-w-3xl font-serif text-3xl md:text-4xl font-medium tracking-tight text-slate-900 dark:text-white leading-[1.05]">
                Six bundles,{' '}
                <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                  every format you might need.
                </em>
              </h2>
              <ul className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {ASSETS.map((a) => (
                  <li
                    key={a.code}
                    className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span
                        className="w-11 h-11 rounded-xl bg-[#0A3A6B]/8 dark:bg-[#9ED0F9]/12 text-[#0A3A6B] dark:text-[#9ED0F9] flex items-center justify-center"
                        aria-hidden="true"
                      >
                        <Download size={20} strokeWidth={1.75} />
                      </span>
                      <span className="font-mono text-[10px] tracking-[0.22em] font-semibold text-[#0A3A6B] dark:text-[#9ED0F9]">
                        {a.code}
                      </span>
                    </div>
                    <h3 className="mt-4 text-[14px] font-semibold tracking-tight text-slate-900 dark:text-white">
                      {a.name}
                    </h3>
                    <p className="mt-2 text-[12px] text-slate-600 dark:text-slate-400 leading-relaxed">
                      {a.body}
                    </p>
                    <div className="mt-4 pt-3 border-t border-slate-200/70 dark:border-slate-800/60 flex items-center justify-between gap-2">
                      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">
                        {a.formats.join(' · ')}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-slate-400">
                        {a.size}
                      </span>
                    </div>
                    <Link
                      href={a.href}
                      className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#0A3A6B] dark:text-[#9ED0F9] hover:underline underline-offset-4"
                    >
                      <Download size={11} aria-hidden="true" />
                      Download bundle
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </Reveal>

        {/* PR.MK.RL — press release archive */}
        <Reveal>
          <section className="py-20 lg:py-24 bg-white dark:bg-slate-950 border-b border-slate-200/60 dark:border-slate-800/60">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
                <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">PR.MK.RL</span>
                <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
                <span>Press release archive</span>
              </div>
              <h2 className="mt-6 max-w-3xl font-serif text-3xl md:text-4xl font-medium tracking-tight text-slate-900 dark:text-white leading-[1.05]">
                Six recent releases,{' '}
                <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                  RSS-subscribable.
                </em>
              </h2>
              <ul className="mt-10 space-y-3">
                {RELEASES.map((r) => (
                  <li key={r.code}>
                    <Link
                      href={r.href}
                      className="group flex items-start gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 hover:border-slate-300 dark:hover:border-slate-700 motion-safe:transition-colors"
                    >
                      <div className="flex-shrink-0">
                        <Newspaper size={18} className="text-[#0A3A6B] dark:text-[#9ED0F9]" aria-hidden="true" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 flex-wrap mb-1.5">
                          <span className="font-mono text-[10px] tracking-[0.22em] font-semibold text-[#0A3A6B] dark:text-[#9ED0F9]">
                            {r.code}
                          </span>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-[0.14em] font-semibold ${CATEGORY_CLS[r.category]}`}>
                            {r.category}
                          </span>
                          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-slate-400">
                            {r.date}
                          </span>
                        </div>
                        <div className="font-serif text-[15px] font-medium tracking-tight text-slate-900 dark:text-white leading-snug">
                          {r.title}
                        </div>
                      </div>
                      <ArrowUpRight size={13} className="text-slate-400 group-hover:text-[#0A3A6B] dark:group-hover:text-[#9ED0F9] motion-safe:transition-colors flex-shrink-0 mt-1" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link
                  href="/rss.xml"
                  className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#0A3A6B] dark:text-[#9ED0F9] hover:underline underline-offset-4"
                >
                  Subscribe via RSS
                  <ArrowUpRight size={11} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </section>
        </Reveal>

        {/* PR.MK.PL — policy */}
        <Reveal>
          <section className="py-20 lg:py-24 bg-slate-50 dark:bg-slate-900/40 border-b border-slate-200/60 dark:border-slate-800/60">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
                <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">PR.MK.PL</span>
                <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
                <span>Press policy + contacts</span>
              </div>
              <ul className="mt-10 grid md:grid-cols-2 gap-3">
                {POLICY.map((p) => {
                  const Icon = p.icon;
                  return (
                    <li
                      key={p.code}
                      className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span
                          className="w-11 h-11 rounded-xl bg-[#0A3A6B]/8 dark:bg-[#9ED0F9]/12 text-[#0A3A6B] dark:text-[#9ED0F9] flex items-center justify-center"
                          aria-hidden="true"
                        >
                          <Icon size={20} strokeWidth={1.75} />
                        </span>
                        <span className="font-mono text-[10px] tracking-[0.22em] font-semibold text-[#0A3A6B] dark:text-[#9ED0F9]">
                          {p.code}
                        </span>
                      </div>
                      <h3 className="mt-4 text-[14px] font-semibold tracking-tight text-slate-900 dark:text-white">
                        {p.title}
                      </h3>
                      <p className="mt-2 text-[12px] text-slate-600 dark:text-slate-400 leading-relaxed">
                        {p.body}
                      </p>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-10 grid md:grid-cols-3 gap-3">
                <ContactCard
                  label="Press desk"
                  email="press@flyttgotech.com"
                  body="Story embargoes, interview booking, fact-check requests."
                />
                <ContactCard
                  label="Analyst relations"
                  email="analysts@flyttgotech.com"
                  body="Quarterly briefings, evaluation enrolment, MQ / Wave / Radar requests."
                />
                <ContactCard
                  label="Speaking + brand"
                  email="speaking@flyttgotech.com"
                  body="Keynote and panel booking, brand-asset usage questions."
                />
              </div>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <NextStepsGrid
            code="PR.MK.NX"
            eyebrow="Where the press kit plugs in"
            titleLead="Coverage feeds into"
            titleEmphasis="every other surface."
            intro="The press kit is one input into journalist + analyst engagement. The four pathways below take a story-led conversation to deeper coverage."
            steps={[
              { href: '/transparency/2026', code: 'TR.00', icon: Newspaper, title: 'Annual transparency',  body: 'FY2026 numbers across uptime, incidents, AI governance, sustainability — citable in coverage.', meta: 'TR.00 · 8 pillars' },
              { href: '/research',          code: 'RS.00', icon: Layers3,   title: 'Research library',     body: 'Long-form papers from the platform councils — pre-vetted source material for journalists.',     meta: 'RS.00 · 8 papers' },
              { href: '/customers',         code: 'CS.00', icon: Compass,   title: 'Reference programmes', body: 'Six anonymised programmes; named-customer wall under embargo on request.',                       meta: 'CS.00 · 6 programmes' },
              { href: '/contact?intent=press', code: 'CT', icon: Mail,      title: 'Open the press desk',  body: 'Direct routing to the comms team within one business day.',                                       meta: 'press@flyttgotech.com' },
            ]}
          />
        </Reveal>
      </main>
      <SiteFooter />
    </>
  );
}

const ContactCard: React.FC<{ label: string; email: string; body: string }> = ({ label, email, body }) => (
  <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60">
    <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">{label}</div>
    <a href={`mailto:${email}`} className="mt-2 block text-[14px] font-semibold tracking-tight text-[#0A3A6B] dark:text-[#9ED0F9] hover:underline underline-offset-4">
      {email}
    </a>
    <p className="mt-2 text-[12px] text-slate-600 dark:text-slate-400 leading-relaxed">
      {body}
    </p>
  </div>
);
