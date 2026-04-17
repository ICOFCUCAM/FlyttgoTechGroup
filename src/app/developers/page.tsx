import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/flytt/Navbar';
import SiteFooter from '@/components/flytt/SiteFooter';
import {
  ArrowRight,
  ArrowUpRight,
  Code2,
  Terminal,
  GitBranch,
  BookOpen,
  Webhook,
  Shield,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Developers — Platform APIs, SDKs & Developer Resources',
  description:
    'FlyttGo developer resources — REST APIs, SDKs for TypeScript, Python and Go, webhook events and deployment guides for building on the FlyttGo infrastructure layer.',
  alternates: { canonical: '/developers' },
  openGraph: {
    title: 'FlyttGo Developer Platform',
    description:
      'APIs, SDKs and deployment resources for building on FlyttGo infrastructure.',
    url: '/developers',
    type: 'website',
  },
};

const surfaces = [
  {
    icon: Code2,
    title: 'REST API',
    description:
      'Tenant-scoped endpoints for every module — dispatch, analytics, identity, payments and marketplace orchestration.',
  },
  {
    icon: Terminal,
    title: 'SDKs',
    description:
      'Official SDKs for TypeScript, Python and Go — typed clients with full tenant and region awareness.',
  },
  {
    icon: Webhook,
    title: 'Webhook events',
    description:
      'Subscribe to platform events — tenant lifecycle, marketplace orders, dispatch transitions and compliance triggers.',
  },
  {
    icon: GitBranch,
    title: 'Deployment pipelines',
    description:
      'Infrastructure-as-code deployment templates for Kubernetes, Docker Compose and managed Vercel/Nomad runners.',
  },
  {
    icon: Shield,
    title: 'OAuth & RBAC',
    description:
      'Standards-based authentication with tenant-scoped roles, API scopes and audit-ready access logs.',
  },
  {
    icon: BookOpen,
    title: 'Deployment guides',
    description:
      'Technical references covering tenant provisioning, regional data residency, module activation and release workflows.',
  },
];

export default function DevelopersPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="min-h-screen bg-white text-slate-900 antialiased">
        <section
          aria-labelledby="developers-heading"
          className="relative py-24 lg:py-32 bg-gradient-to-b from-[#F7FAFD] via-white to-white"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="max-w-3xl motion-safe:animate-fade-up">
              <p className="inline-flex items-center gap-2 px-3 py-1 bg-[#0A3A6B]/5 rounded-full text-xs font-semibold text-[#0A3A6B] uppercase tracking-wider">
                <Code2 size={12} aria-hidden="true" />
                Developers
              </p>
              <h1
                id="developers-heading"
                className="mt-5 text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-slate-900 leading-[1.05]"
              >
                Build on the FlyttGo{' '}
                <span className="text-[#0A3A6B]">infrastructure layer.</span>
              </h1>
              <p className="mt-6 text-lg lg:text-xl text-slate-600 leading-relaxed max-w-2xl">
                REST APIs, typed SDKs, webhook events and deployment pipelines — every FlyttGo
                module is exposed through the same developer surface area.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/contact?intent=developer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#0A3A6B] text-white font-semibold rounded-lg hover:bg-[#0a2f57] motion-safe:transition-colors shadow-lg shadow-blue-900/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9] focus-visible:ring-offset-2"
                >
                  Request Developer Access
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
                <Link
                  href="/technology"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-slate-900 font-semibold rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9] focus-visible:ring-offset-2"
                >
                  Review Architecture
                  <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {surfaces.map((s) => {
                const Icon = s.icon;
                return (
                  <article
                    key={s.title}
                    className="group p-7 lg:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-0.5 motion-safe:transition-all"
                  >
                    <div
                      className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#EEF4FA] to-[#E0EBF7] flex items-center justify-center text-[#0A3A6B]"
                      aria-hidden="true"
                    >
                      <Icon size={22} strokeWidth={1.75} />
                    </div>
                    <h2 className="mt-6 text-xl lg:text-2xl font-semibold tracking-tight text-slate-900">
                      {s.title}
                    </h2>
                    <p className="mt-3 text-sm lg:text-base text-slate-600 leading-relaxed">
                      {s.description}
                    </p>
                  </article>
                );
              })}
            </div>

            <div className="mt-10 p-8 lg:p-10 rounded-3xl bg-gradient-to-br from-[#0A1F3D] to-[#0A3A6B] text-white shadow-xl shadow-slate-900/10">
              <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.22em] font-semibold text-white/60">
                <Terminal size={14} aria-hidden="true" />
                Coming Soon
              </div>
              <h2 className="mt-4 text-2xl lg:text-3xl font-semibold tracking-tight">
                Full API reference, SDK docs and sandbox tenants
              </h2>
              <p className="mt-4 text-white/80 leading-relaxed max-w-2xl">
                The public developer portal and hosted sandbox environments are rolling out with
                the next major release. Request developer access now to receive early endpoints,
                SDK previews and deployment templates.
              </p>
              <div className="mt-8">
                <Link
                  href="/contact?intent=developer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-[#0A3A6B] font-semibold rounded-lg hover:bg-slate-100 motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A3A6B]"
                >
                  Request Early Access
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
