'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Code2,
  Layers,
  Loader2,
  Copy,
  Check,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';
import Navbar from '@/components/flytt/Navbar';
import { platforms, platformList } from '@/data/platforms';
import type { DeploymentType } from '@/lib/contact-schema';

const PLATFORM_DEPLOYMENT_TYPE: Record<string, DeploymentType> = {
  transify: 'Enterprise Fleet Intelligence',
  workverge: 'White-Label Deployment',
  civitas: 'Government / Municipal Platform',
  edupro: 'Education Analytics Platform',
  identra: 'White-Label Deployment',
  payvera: 'White-Label Deployment',
  flyttgo: 'Marketplace Deployment Engine',
};

const methodColors: Record<string, string> = {
  GET: 'text-emerald-600 bg-emerald-50',
  POST: 'text-blue-600 bg-blue-50',
  PUT: 'text-amber-600 bg-amber-50',
  DELETE: 'text-red-600 bg-red-50',
};

interface PlatformViewProps {
  slug: string;
}

const PlatformView: React.FC<PlatformViewProps> = ({ slug }) => {
  const data = platforms[slug];
  const [activeEndpoint, setActiveEndpoint] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setActiveEndpoint(0);
  }, [slug]);

  if (!data) return null;

  const Icon = data.icon;
  const others = platformList.filter((p) => p.slug !== data.slug);

  const copySample = () => {
    const ep = data.apiEndpoints[activeEndpoint];
    const snippet = `curl -X ${ep.method} https://api.flyttgo.tech${ep.path} \\\n  -H "Authorization: Bearer $FLYTTGO_KEY"`;
    navigator.clipboard?.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  const scrollToForm = () => {
    document.getElementById('platform-contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 dark:text-white antialiased">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F5F8FC] via-white to-[#F0F5FA] border-b border-slate-200/70 dark:border-slate-800/60">
        <div
          className="absolute inset-0 opacity-[0.35] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)',
            backgroundSize: '56px 56px',
            maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 85%)',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-10 pb-20 lg:pt-14 lg:pb-28">
          <Link
            href="/#platforms"
            className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 dark:text-white font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9] focus-visible:ring-offset-2 rounded-sm"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            Back to Platform Ecosystem
          </Link>

          <div className="mt-10 grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6">
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider"
                style={{ backgroundColor: '#ffffff', color: data.color, border: `1px solid ${data.color}22` }}
              >
                <Icon size={14} />
                {data.subtitle}
              </div>

              <h1 className="mt-6 text-4xl md:text-5xl lg:text-[56px] leading-[1.05] font-semibold tracking-tight text-slate-900 dark:text-white">
                {data.name}
              </h1>
              <p className="mt-4 text-xl md:text-2xl text-slate-800 font-medium leading-snug max-w-xl">
                {data.tagline}
              </p>
              <p className="mt-5 text-base lg:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl">
                {data.description}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button
                  onClick={scrollToForm}
                  className="group inline-flex items-center gap-2 px-6 py-3.5 text-white font-semibold rounded-lg transition-all shadow-lg shadow-blue-900/10"
                  style={{ backgroundColor: data.color }}
                >
                  Start Deployment
                  <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
                <a
                  href="#modules"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-slate-900 dark:text-white font-semibold rounded-lg border border-slate-200/80 dark:border-slate-800/60 hover:border-slate-300 hover:bg-slate-50 dark:bg-slate-900/60 transition-colors"
                >
                  Explore Modules
                </a>
              </div>

              <div className="mt-10 pt-8 border-t border-slate-200/70 dark:border-slate-800/60 grid grid-cols-2 sm:grid-cols-4 gap-6">
                {data.keyMetrics.map((m) => (
                  <div key={m.label}>
                    <div className="text-2xl font-semibold text-slate-900 dark:text-white tracking-tight">{m.value}</div>
                    <div className="text-xs text-slate-500 mt-1 leading-snug">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative aspect-[5/4] rounded-2xl overflow-hidden shadow-2xl shadow-slate-900/10 border border-white">
                <Image
                  src={data.heroImage}
                  alt={`${data.name} platform deployment scene`}
                  fill
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                <div className="absolute top-5 left-5 bg-white dark:bg-slate-900/95 backdrop-blur rounded-xl px-4 py-3 shadow-lg flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${data.color}15`, color: data.color }}>
                    <Icon size={16} />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-wider font-medium">Platform</div>
                    <div className="text-sm font-semibold text-slate-900 dark:text-white">{data.name}</div>
                  </div>
                </div>
                <div className="absolute bottom-5 right-5 bg-white dark:bg-slate-900/95 backdrop-blur rounded-xl px-4 py-3 shadow-lg flex items-center gap-3">
                  <Sparkles size={16} style={{ color: data.color }} />
                  <div className="text-sm font-semibold text-slate-900 dark:text-white">Production-ready</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MODULES */}
      <section id="modules" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-slate-800/60 rounded-full text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Platform Modules
            </div>
            <h2 className="mt-5 text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900 dark:text-white leading-tight">
              Modular infrastructure you can activate independently.
            </h2>
            <p className="mt-5 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              Every {data.name} deployment includes six foundational modules — activate them together or
              independently based on your deployment roadmap.
            </p>
          </div>

          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {data.modules.map((m, i) => (
              <div
                key={m.title}
                className="group p-7 rounded-2xl bg-gradient-to-br from-white to-slate-50/50 border border-slate-200/80 dark:border-slate-800/60 hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center font-mono font-bold text-sm"
                    style={{ backgroundColor: `${data.color}15`, color: data.color }}
                  >
                    M{i + 1}
                  </div>
                  <ArrowUpRight size={16} className="text-slate-300 group-hover:text-slate-900 dark:text-white transition-colors" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-slate-900 dark:text-white tracking-tight">{m.title}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WORKFLOW */}
      <section className="py-24 bg-gradient-to-b from-[#F7FAFD] to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-slate-800/60 rounded-full text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Deployment Workflow
            </div>
            <h2 className="mt-5 text-3xl md:text-4xl font-semibold tracking-tight text-slate-900 dark:text-white leading-tight">
              From kickoff to production in four structured steps.
            </h2>
          </div>

          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-5 relative">
            {data.workflow.map((w, i) => (
              <div
                key={w.title}
                className="relative p-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/60 shadow-sm hover:shadow-lg transition-all"
              >
                <div className="text-xs font-mono text-slate-400 font-semibold">STEP 0{i + 1}</div>
                <div
                  className="mt-4 w-12 h-12 rounded-xl flex items-center justify-center text-white font-semibold"
                  style={{ background: `linear-gradient(135deg, ${data.color}, ${data.color}dd)` }}
                >
                  {i + 1}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white tracking-tight">{w.title}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{w.desc}</p>
                {i < data.workflow.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-3 -translate-y-1/2 w-6 h-6 rounded-full bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 items-center justify-center z-10 shadow-sm">
                    <ArrowRight size={12} className="text-slate-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ARCHITECTURE */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-slate-800/60 rounded-full text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Technical Architecture
              </div>
              <h2 className="mt-5 text-3xl md:text-4xl font-semibold tracking-tight text-slate-900 dark:text-white leading-tight">
                {data.name} runs on the FlyttGo cloud-native stack.
              </h2>
              <p className="mt-5 text-slate-600 dark:text-slate-400 leading-relaxed">
                Every layer is designed for scalability, multi-tenant isolation and regional deployment
                portability across Europe, Africa and the Middle East.
              </p>

              <div className="mt-8 rounded-xl overflow-hidden border border-slate-200/80 dark:border-slate-800/60 shadow-lg">
                <div className="flex items-center gap-1.5 px-4 py-3 border-b border-slate-200/80 dark:border-slate-800/60 bg-slate-50 dark:bg-slate-900/60">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <div className="ml-3 text-xs text-slate-500 font-mono">
                    {data.slug}.flyttgo.platform
                  </div>
                </div>
                <div className="relative aspect-[16/10] w-full bg-slate-100 dark:bg-slate-800/60">
                  <Image
                    src={data.dashboardImage}
                    alt={`${data.name} dashboard interface`}
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="p-8 rounded-3xl bg-[#0A1F3D] text-white relative overflow-hidden">
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage:
                      'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
                    backgroundSize: '32px 32px',
                  }}
                />
                <div className="relative">
                  <div className="text-xs uppercase tracking-[0.2em] text-white/60 font-semibold">
                    Architecture Layers
                  </div>
                  <h3 className="mt-2 text-2xl font-semibold tracking-tight">{data.name} Stack</h3>

                  <div className="mt-8 space-y-2.5">
                    {data.architecture.map((a, i) => (
                      <div
                        key={a.layer}
                        className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10"
                      >
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center text-xs font-mono font-bold flex-shrink-0"
                          style={{ background: `linear-gradient(135deg, ${data.color}, ${data.color}99)` }}
                        >
                          L{i + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-semibold">{a.layer}</div>
                          <div className="text-xs text-white/60 mt-0.5 font-mono truncate">{a.stack}</div>
                          <div className="text-xs text-white/50 mt-1.5 leading-relaxed">{a.desc}</div>
                        </div>
                        <Layers size={14} className="text-white/40 mt-1" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* API DOCS */}
      <section className="py-24 bg-gradient-to-b from-white to-[#F5F8FC]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-slate-800/60 rounded-full text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              <Code2 size={12} />
              API Preview
            </div>
            <h2 className="mt-5 text-3xl md:text-4xl font-semibold tracking-tight text-slate-900 dark:text-white leading-tight">
              Build and integrate with the {data.name} API.
            </h2>
            <p className="mt-5 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              A REST API with tenant-scoped authentication, webhook events and SDKs in TypeScript, Python and
              Go.
            </p>
          </div>

          <div className="mt-12 grid lg:grid-cols-12 gap-5">
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/60 bg-white overflow-hidden">
                {data.apiEndpoints.map((ep, i) => (
                  <button
                    key={ep.path}
                    onClick={() => setActiveEndpoint(i)}
                    className={`w-full text-left px-5 py-4 border-b border-slate-100 dark:border-slate-800 last:border-b-0 transition-colors ${
                      i === activeEndpoint ? 'bg-slate-50 dark:bg-slate-900/60' : 'hover:bg-slate-50 dark:bg-slate-900/60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-0.5 text-[10px] font-bold font-mono rounded ${methodColors[ep.method]}`}>
                        {ep.method}
                      </span>
                      <span className="font-mono text-sm text-slate-900 dark:text-white">{ep.path}</span>
                    </div>
                    <div className="mt-1.5 text-xs text-slate-500 leading-relaxed">{ep.description}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-2xl overflow-hidden bg-[#0A1F3D] border border-slate-800">
                <div className="flex items-center justify-between px-5 py-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 text-[10px] font-bold font-mono rounded ${methodColors[data.apiEndpoints[activeEndpoint].method]}`}>
                      {data.apiEndpoints[activeEndpoint].method}
                    </span>
                    <span className="font-mono text-sm text-white">
                      api.flyttgo.tech{data.apiEndpoints[activeEndpoint].path}
                    </span>
                  </div>
                  <button
                    onClick={copySample}
                    className="inline-flex items-center gap-1.5 text-xs text-white/60 hover:text-white transition-colors font-medium"
                  >
                    {copied ? <Check size={12} /> : <Copy size={12} />}
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <pre className="p-6 text-sm text-white/90 font-mono overflow-x-auto leading-relaxed">
{`$ curl -X ${data.apiEndpoints[activeEndpoint].method} \\
    https://api.flyttgo.tech${data.apiEndpoints[activeEndpoint].path} \\
    -H "Authorization: Bearer $FLYTTGO_KEY" \\
    -H "X-Tenant-Id: $TENANT_ID" \\
    -H "Content-Type: application/json"

{
  "status": "ok",
  "platform": "${data.slug}",
  "tenant": "your-organization",
  "region": "eu-north-1",
  "timestamp": "${new Date().toISOString()}"
}`}
                </pre>
              </div>

              <div className="mt-4 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                  <CheckCircle2 size={16} className="text-emerald-600" />
                </div>
                <div className="text-sm text-slate-700 dark:text-slate-300">
                  SDKs available for <span className="font-mono font-semibold">TypeScript</span>,{' '}
                  <span className="font-mono font-semibold">Python</span> and{' '}
                  <span className="font-mono font-semibold">Go</span>.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-slate-800/60 rounded-full text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Case Studies
            </div>
            <h2 className="mt-5 text-3xl md:text-4xl font-semibold tracking-tight text-slate-900 dark:text-white leading-tight">
              Organizations already deploying {data.name}.
            </h2>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-5">
            {data.caseStudies.map((c) => (
              <div
                key={c.client}
                className="p-7 rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-slate-200/80 dark:border-slate-800/60 hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold">{c.region}</div>
                <div className="mt-2 text-lg font-semibold text-slate-900 dark:text-white tracking-tight">{c.client}</div>
                <div className="mt-6 pt-6 border-t border-slate-200/80 dark:border-slate-800/60">
                  <div className="text-3xl font-semibold tracking-tight" style={{ color: data.color }}>
                    {c.metric}
                  </div>
                  <div className="text-xs text-slate-500 mt-1 font-medium">{c.metricLabel}</div>
                </div>
                <p className="mt-5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{c.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-24 bg-gradient-to-b from-[#F5F8FC] to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-slate-800/60 rounded-full text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Deployment Tiers
            </div>
            <h2 className="mt-5 text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900 dark:text-white leading-tight">
              Scale from pilot to national infrastructure.
            </h2>
            <p className="mt-5 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              Every tier includes multi-tenant architecture, white-label branding and regional deployment
              compatibility.
            </p>
          </div>

          <div className="mt-14 grid md:grid-cols-3 gap-5">
            {data.pricing.map((tier) => (
              <div
                key={tier.name}
                className={`p-8 rounded-2xl border transition-all ${
                  tier.highlighted
                    ? 'bg-gradient-to-br from-[#0A1F3D] to-[#0A3A6B] text-white border-transparent shadow-xl -translate-y-2'
                    : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800/60 hover:shadow-lg'
                }`}
              >
                {tier.highlighted && (
                  <div className="inline-block px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-white dark:bg-slate-900/15 rounded-md mb-4">
                    Most Popular
                  </div>
                )}
                <h3 className={`text-xl font-semibold tracking-tight ${tier.highlighted ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                  {tier.name}
                </h3>
                <p className={`mt-2 text-sm ${tier.highlighted ? 'text-white/70' : 'text-slate-600 dark:text-slate-400'}`}>
                  {tier.description}
                </p>

                <div className="mt-6 flex items-baseline gap-1">
                  <span className={`text-4xl font-semibold tracking-tight ${tier.highlighted ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                    {tier.price}
                  </span>
                  <span className={`text-sm ${tier.highlighted ? 'text-white/60' : 'text-slate-500'}`}>
                    {tier.cadence}
                  </span>
                </div>

                <button
                  onClick={scrollToForm}
                  className={`mt-6 w-full inline-flex items-center justify-center gap-2 px-5 py-3 font-semibold rounded-lg transition-colors ${
                    tier.highlighted
                      ? 'bg-white text-[#0A3A6B] hover:bg-slate-100 dark:bg-slate-800/60'
                      : 'bg-slate-900 text-white hover:bg-slate-800'
                  }`}
                >
                  {tier.price === 'Custom' ? 'Contact Sales' : 'Start Deployment'}
                  <ArrowRight size={14} />
                </button>

                <div className={`mt-7 pt-7 border-t space-y-3 ${tier.highlighted ? 'border-white/15' : 'border-slate-200/80 dark:border-slate-800/60'}`}>
                  {tier.features.map((f) => (
                    <div
                      key={f}
                      className={`flex items-start gap-2.5 text-sm ${tier.highlighted ? 'text-white/90' : 'text-slate-700 dark:text-slate-300'}`}
                    >
                      <CheckCircle2
                        size={16}
                        className="flex-shrink-0 mt-0.5"
                        style={{ color: tier.highlighted ? '#6EE7B7' : data.color }}
                      />
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="platform-contact" className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div
            className="rounded-3xl p-10 lg:p-14 text-white relative overflow-hidden"
            style={{ background: `linear-gradient(135deg, #0A1F3D, ${data.color})` }}
          >
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 20% 30%, white 1px, transparent 1px), radial-gradient(circle at 70% 70%, white 1px, transparent 1px)',
                backgroundSize: '40px 40px, 60px 60px',
              }}
            />
            <div className="relative grid lg:grid-cols-5 gap-10">
              <div className="lg:col-span-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white dark:bg-slate-900/10 rounded-full text-xs font-semibold uppercase tracking-wider">
                  Start Deployment
                </div>
                <h2 className="mt-5 text-3xl lg:text-4xl font-semibold tracking-tight leading-tight">
                  Deploy {data.name} with our platform team.
                </h2>
                <p className="mt-4 text-white/80 leading-relaxed">
                  Share your deployment context and we&rsquo;ll schedule a technical walkthrough within one business
                  day.
                </p>
                <div className="mt-8 space-y-2 text-sm text-white/80">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-300" /> Dedicated deployment engineer
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-300" /> Multi-tenant architecture
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-300" /> SLA 99.95%
                  </div>
                </div>
              </div>

              <PlatformContactForm
                platform={data.name}
                color={data.color}
                deploymentType={PLATFORM_DEPLOYMENT_TYPE[data.slug] ?? 'White-Label Deployment'}
              />
            </div>
          </div>
        </div>
      </section>

      {/* EXPLORE OTHER PLATFORMS */}
      <section className="py-24 bg-gradient-to-b from-white to-[#F5F8FC]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
              Explore other platforms in the ecosystem
            </h2>
            <Link
              href="/#platforms"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white hover:gap-3 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9] focus-visible:ring-offset-2 rounded-sm"
            >
              View full ecosystem <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {others.map((p) => {
              const OtherIcon = p.icon;
              return (
                <Link
                  key={p.slug}
                  href={`/platforms/${p.slug}`}
                  className="group p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 hover:border-slate-300 hover:shadow-lg hover:-translate-y-0.5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9] focus-visible:ring-offset-2"
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${p.color}15`, color: p.color }}
                  >
                    <OtherIcon size={20} strokeWidth={1.75} />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white tracking-tight">{p.name}</h3>
                  <p className="mt-1 text-xs text-slate-500">{p.subtitle}</p>
                  <div className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-slate-900 dark:text-white group-hover:gap-2 transition-all">
                    Explore <ArrowRight size={13} />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Simple footer */}
      <footer className="bg-[#F5F8FC] border-t border-slate-200/80 dark:border-slate-800/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-slate-500">
            © {new Date().getFullYear()} FlyttGo Technologies Group AB · Platform Infrastructure Provider
          </div>
          <Link
            href="/"
            className="text-xs font-semibold text-slate-700 hover:text-slate-900 dark:text-white inline-flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9] focus-visible:ring-offset-2 rounded-sm"
          >
            <ArrowLeft size={12} aria-hidden="true" /> Back to ecosystem home
          </Link>
        </div>
      </footer>
    </div>
  );
};

const PlatformContactForm: React.FC<{ platform: string; color: string; deploymentType: DeploymentType }> = ({
  platform,
  color,
  deploymentType,
}) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    country: '',
    message: '',
    website: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'submitting') return;
    if (!form.email || !form.name) return;
    setStatus('submitting');
    setErrorMessage(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-flyttgo-source': `platform/${platform.toLowerCase()}`,
        },
        body: JSON.stringify({
          ...form,
          deployment_type: deploymentType,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error ?? 'Submission failed. Please try again.');
      }
      setStatus('success');
      setForm({ name: '', email: '', company: '', country: '', message: '', website: '' });
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Submission failed. Please try again.');
    }
  };

  return (
    <form
      onSubmit={submit}
      noValidate
      className="lg:col-span-3 p-6 lg:p-8 bg-white dark:bg-slate-900/10 backdrop-blur rounded-2xl border border-white/15"
      aria-live="polite"
    >
      {status === 'success' ? (
        <div className="py-10 text-center" role="status">
          <div className="w-14 h-14 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto">
            <CheckCircle2 size={28} className="text-emerald-300" aria-hidden="true" />
          </div>
          <h3 className="mt-4 text-lg font-semibold">Request received</h3>
          <p className="mt-1 text-sm text-white/80">Our {platform} deployment team will respond shortly.</p>
          <button
            type="button"
            onClick={() => setStatus('idle')}
            className="mt-5 text-sm font-semibold text-white/90 hover:text-white underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-sm"
          >
            Submit another inquiry
          </button>
        </div>
      ) : (
        <>
          <div
            aria-hidden="true"
            style={{ position: 'absolute', left: '-10000px', width: 1, height: 1, overflow: 'hidden' }}
          >
            <label htmlFor={`pf-website-${platform}`}>Website (leave blank)</label>
            <input
              id={`pf-website-${platform}`}
              tabIndex={-1}
              autoComplete="off"
              value={form.website}
              onChange={(e) => setForm({ ...form, website: e.target.value })}
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <input
              required
              autoComplete="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Full name"
              aria-label="Full name"
              className="px-4 py-3 bg-white dark:bg-slate-900/10 border border-white/20 rounded-lg text-sm text-white placeholder-white/50 focus:outline-none focus:border-white/50"
            />
            <input
              required
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Work email"
              aria-label="Work email"
              className="px-4 py-3 bg-white dark:bg-slate-900/10 border border-white/20 rounded-lg text-sm text-white placeholder-white/50 focus:outline-none focus:border-white/50"
            />
          </div>
          <div className="mt-3 grid sm:grid-cols-2 gap-3">
            <input
              autoComplete="organization"
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              placeholder="Organization"
              aria-label="Organization"
              className="px-4 py-3 bg-white dark:bg-slate-900/10 border border-white/20 rounded-lg text-sm text-white placeholder-white/50 focus:outline-none focus:border-white/50"
            />
            <input
              autoComplete="country-name"
              value={form.country}
              onChange={(e) => setForm({ ...form, country: e.target.value })}
              placeholder="Country"
              aria-label="Country"
              className="px-4 py-3 bg-white dark:bg-slate-900/10 border border-white/20 rounded-lg text-sm text-white placeholder-white/50 focus:outline-none focus:border-white/50"
            />
          </div>
          <textarea
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            rows={4}
            placeholder={`Tell us about your ${platform} deployment context...`}
            aria-label={`${platform} deployment context`}
            className="mt-3 w-full px-4 py-3 bg-white dark:bg-slate-900/10 border border-white/20 rounded-lg text-sm text-white placeholder-white/50 focus:outline-none focus:border-white/50 resize-none"
          />
          {status === 'error' && errorMessage ? (
            <div
              role="alert"
              className="mt-3 flex items-start gap-2 px-3 py-2 rounded-lg bg-red-500/15 text-red-100 border border-red-400/40 text-xs"
            >
              <AlertCircle size={14} className="mt-0.5 flex-shrink-0" aria-hidden="true" />
              <span>{errorMessage}</span>
            </div>
          ) : null}
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="mt-4 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white font-semibold rounded-lg hover:bg-slate-100 dark:bg-slate-800/60 transition-colors disabled:opacity-70 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            style={{ color }}
          >
            {status === 'submitting' ? (
              <>
                <Loader2 size={14} className="animate-spin" aria-hidden="true" />
                Submitting…
              </>
            ) : (
              <>
                Request {platform} Deployment
                <ArrowRight size={14} aria-hidden="true" />
              </>
            )}
          </button>
        </>
      )}
    </form>
  );
};

export default PlatformView;
