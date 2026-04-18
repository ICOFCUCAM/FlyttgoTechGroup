'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Mail, MapPin, ArrowRight, Linkedin, Twitter, Github, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { DEPLOYMENT_TYPES, type DeploymentType } from '@/lib/contact-schema';

type Intent = 'partnership' | 'procurement' | 'demo' | 'careers' | 'press' | 'developer';

const INTENT_COPY: Record<
  Intent,
  { eyebrow: string; title: string; description: string }
> = {
  partnership: {
    eyebrow: 'Partnership',
    title: 'Scope a partnership with FlyttGo.',
    description:
      'Tell us about your programme, region and preferred deployment mode. Our partnership team responds within one business day with a scoping outline and reference architecture.',
  },
  procurement: {
    eyebrow: 'Procurement & RFPs',
    title: 'Request procurement documentation.',
    description:
      'Share your procurement context — sovereign vs. cloud, compliance frameworks, timelines — and receive SOC 2 / ISO 27001 reports, DPIA templates and draft MSAs under NDA.',
  },
  demo: {
    eyebrow: 'Platform demo',
    title: 'Schedule a platform deployment demo.',
    description:
      'Pick a platform and we will walk you through a live tenant, the deployment architecture and the module roadmap relevant to your programme.',
  },
  careers: {
    eyebrow: 'Careers',
    title: 'Work with us.',
    description:
      'Tell us what role interests you, where you are based and a short note about the work you have shipped. We read every message and reply within one week.',
  },
  press: {
    eyebrow: 'Press & media',
    title: 'Press and media enquiries.',
    description:
      'Interview requests, press kits, speaker availability — share your publication and timeline and the communications team will respond within two business days.',
  },
  developer: {
    eyebrow: 'Developer access',
    title: 'Request developer access.',
    description:
      'Share your deployment context and we will get you API keys, sandbox credentials, SDK previews and developer-portal access as it rolls out.',
  },
};

type FormState = {
  name: string;
  email: string;
  company: string;
  country: string;
  deployment_type: DeploymentType;
  message: string;
  website: string; // honeypot
};

const initialState: FormState = {
  name: '',
  email: '',
  company: '',
  country: '',
  deployment_type: 'White-Label Deployment',
  message: '',
  website: '',
};

const ContactFooter: React.FC = () => {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const intentRaw = searchParams?.get('intent') ?? '';
  const intent: Intent | null =
    (['partnership', 'procurement', 'demo', 'careers', 'press', 'developer'] as Intent[]).includes(
      intentRaw as Intent,
    )
      ? (intentRaw as Intent)
      : null;
  const copy = intent
    ? INTENT_COPY[intent]
    : {
        eyebrow: 'Start Deployment',
        title: 'Deploy your platform with FlyttGo infrastructure',
        description:
          'Share your deployment context — logistics, education, government or marketplace — and our platform deployment team will respond within one business day.',
      };

  useEffect(() => {
    // When arriving with ?intent=demo | partnership | procurement, preselect
    // a sensible deployment_type so the form captures the right scope.
    if (intent === 'procurement') {
      setForm((f) => ({ ...f, deployment_type: 'Government / Municipal Platform' }));
    } else if (intent === 'developer') {
      setForm((f) => ({ ...f, deployment_type: 'White-Label Deployment' }));
    }
  }, [intent]);

  const handleSubmit = async (e: React.FormEvent) => {
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
          'x-flyttgo-source': 'home/contact-footer',
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error ?? 'Submission failed. Please try again.');
      }
      setStatus('success');
      setForm(initialState);
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Submission failed. Please try again.');
    }
  };

  return (
    <>
      {/* Contact section */}
      <section id="contact" className="py-24 lg:py-32 bg-gradient-to-b from-[#F5F8FC] to-white dark:from-slate-900 dark:to-slate-950 dark:from-slate-900 dark:to-slate-950">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0A3A6B]/5 rounded-full text-xs font-semibold text-[#0A3A6B] uppercase tracking-wider">
                {copy.eyebrow}
              </div>
              <h2 className="mt-5 text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900 dark:text-white leading-tight">
                {copy.title}
              </h2>
              <p className="mt-5 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                {copy.description}
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 flex items-center justify-center text-[#0A3A6B]">
                    <Mail size={18} />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Deployments</div>
                    <div className="text-sm font-semibold text-slate-900 dark:text-white mt-0.5">platforms@flyttgo.tech</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 flex items-center justify-center text-[#0A3A6B]">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Headquarters</div>
                    <div className="text-sm font-semibold text-slate-900 dark:text-white mt-0.5">Stockholm · Nordic EU</div>
                  </div>
                </div>
              </div>

              <div className="mt-10 p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60">
                <div className="text-xs uppercase tracking-[0.15em] text-slate-500 font-semibold">
                  Expected Response
                </div>
                <div className="mt-2 flex items-center gap-2 text-sm font-medium text-slate-900 dark:text-white">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  1 business day · Platform Deployment Team
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <form
                onSubmit={handleSubmit}
                className="p-8 lg:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 shadow-xl shadow-slate-900/5"
                aria-describedby="contact-form-status"
                noValidate
              >
                {status === 'success' ? (
                  <div className="py-16 text-center" role="status" aria-live="polite">
                    <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center mx-auto">
                      <CheckCircle2 size={28} className="text-emerald-600" aria-hidden="true" />
                    </div>
                    <h3 className="mt-5 text-xl font-semibold text-slate-900 dark:text-white">Inquiry received</h3>
                    <p className="mt-2 text-slate-600 dark:text-slate-400">
                      Our platform deployment team will contact you within one business day.
                    </p>
                    <button
                      type="button"
                      onClick={() => setStatus('idle')}
                      className="mt-6 text-sm font-semibold text-[#0A3A6B] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9] focus-visible:ring-offset-2 rounded-sm"
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
                      <label htmlFor="cf-website">Website (leave blank)</label>
                      <input
                        id="cf-website"
                        tabIndex={-1}
                        autoComplete="off"
                        value={form.website}
                        onChange={(e) => setForm({ ...form, website: e.target.value })}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="cf-name" className="text-xs uppercase tracking-wider text-slate-500 font-semibold">
                          Full name
                        </label>
                        <input
                          id="cf-name"
                          required
                          autoComplete="name"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="mt-2 w-full px-4 py-3 bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/60 rounded-lg text-sm focus:outline-none focus:border-[#1E6FD9] focus:bg-white"
                          placeholder="Anna Lindqvist"
                        />
                      </div>
                      <div>
                        <label htmlFor="cf-email" className="text-xs uppercase tracking-wider text-slate-500 font-semibold">
                          Work email
                        </label>
                        <input
                          id="cf-email"
                          required
                          type="email"
                          autoComplete="email"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="mt-2 w-full px-4 py-3 bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/60 rounded-lg text-sm focus:outline-none focus:border-[#1E6FD9] focus:bg-white"
                          placeholder="anna@organization.eu"
                        />
                      </div>
                    </div>

                    <div className="mt-4 grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="cf-company" className="text-xs uppercase tracking-wider text-slate-500 font-semibold">
                          Organization
                        </label>
                        <input
                          id="cf-company"
                          autoComplete="organization"
                          value={form.company}
                          onChange={(e) => setForm({ ...form, company: e.target.value })}
                          className="mt-2 w-full px-4 py-3 bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/60 rounded-lg text-sm focus:outline-none focus:border-[#1E6FD9] focus:bg-white"
                          placeholder="Ministry, municipality or company"
                        />
                      </div>
                      <div>
                        <label htmlFor="cf-country" className="text-xs uppercase tracking-wider text-slate-500 font-semibold">
                          Country
                        </label>
                        <input
                          id="cf-country"
                          autoComplete="country-name"
                          value={form.country}
                          onChange={(e) => setForm({ ...form, country: e.target.value })}
                          className="mt-2 w-full px-4 py-3 bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/60 rounded-lg text-sm focus:outline-none focus:border-[#1E6FD9] focus:bg-white"
                          placeholder="Norway"
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <label htmlFor="cf-deployment-type" className="text-xs uppercase tracking-wider text-slate-500 font-semibold">
                        Deployment interest
                      </label>
                      <select
                        id="cf-deployment-type"
                        value={form.deployment_type}
                        onChange={(e) => setForm({ ...form, deployment_type: e.target.value as DeploymentType })}
                        className="mt-2 w-full px-4 py-3 bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/60 rounded-lg text-sm focus:outline-none focus:border-[#1E6FD9] focus:bg-white"
                      >
                        {DEPLOYMENT_TYPES.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="mt-4">
                      <label htmlFor="cf-message" className="text-xs uppercase tracking-wider text-slate-500 font-semibold">
                        Deployment context
                      </label>
                      <textarea
                        id="cf-message"
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        rows={4}
                        className="mt-2 w-full px-4 py-3 bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/60 rounded-lg text-sm focus:outline-none focus:border-[#1E6FD9] focus:bg-white resize-none"
                        placeholder="Briefly describe your deployment objective, target region, and timeline."
                      />
                    </div>

                    {status === 'error' && errorMessage ? (
                      <div
                        id="contact-form-status"
                        role="alert"
                        className="mt-4 flex items-start gap-2 px-4 py-3 rounded-lg bg-red-50 text-red-800 border border-red-200 text-sm"
                      >
                        <AlertCircle size={16} className="mt-0.5 flex-shrink-0" aria-hidden="true" />
                        <span>{errorMessage}</span>
                      </div>
                    ) : null}

                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="mt-6 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#0A3A6B] text-white font-semibold rounded-lg hover:bg-[#0a2f57] transition-colors disabled:opacity-70 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9] focus-visible:ring-offset-2"
                    >
                      {status === 'submitting' ? (
                        <>
                          <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                          Submitting…
                        </>
                      ) : (
                        <>
                          Request Deployment Consultation
                          <ArrowRight size={16} aria-hidden="true" />
                        </>
                      )}
                    </button>
                    <p className="mt-3 text-xs text-slate-500 text-center">
                      By submitting, you agree to FlyttGo&rsquo;s privacy policy and platform deployment terms.
                    </p>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-[#F5F8FC] to-[#EAF0F7] border-t border-slate-200/80 dark:border-slate-800/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#0A3A6B] to-[#1E6FD9] flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M4 12L10 6L14 10L20 4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M4 18L10 12L14 16L20 10" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white tracking-tight text-[15px]">FlyttGo</div>
                  <div className="text-[10px] uppercase tracking-[0.15em] text-slate-500 font-medium">Technologies Group</div>
                </div>
              </div>
              <p className="mt-5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm">
                Smart digital infrastructure for logistics, education, government and enterprise systems —
                deployed across Europe, Africa and the Middle East.
              </p>

              <div className="mt-6 flex items-center gap-2">
                {[Linkedin, Twitter, Github].map((Icon, i) => (
                  <button
                    key={i}
                    className="w-9 h-9 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 flex items-center justify-center text-slate-600 hover:text-slate-900 dark:text-white hover:border-slate-300 transition-colors"
                  >
                    <Icon size={16} />
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <div className="text-xs uppercase tracking-[0.15em] text-slate-500 font-semibold">Platforms</div>
                <ul className="mt-4 space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
                  <li><a className="hover:text-slate-900 dark:text-white transition-colors cursor-pointer">FlyttGo Logistics</a></li>
                  <li><a className="hover:text-slate-900 dark:text-white transition-colors cursor-pointer">EduPro AI</a></li>
                  <li><a className="hover:text-slate-900 dark:text-white transition-colors cursor-pointer">GovStack</a></li>
                  <li><a className="hover:text-slate-900 dark:text-white transition-colors cursor-pointer">MarketStack</a></li>
                  <li><a className="hover:text-slate-900 dark:text-white transition-colors cursor-pointer">FleetStack</a></li>
                </ul>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.15em] text-slate-500 font-semibold">Solutions</div>
                <ul className="mt-4 space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
                  <li><a className="hover:text-slate-900 dark:text-white transition-colors cursor-pointer">White-Label Deployment</a></li>
                  <li><a className="hover:text-slate-900 dark:text-white transition-colors cursor-pointer">Government Platforms</a></li>
                  <li><a className="hover:text-slate-900 dark:text-white transition-colors cursor-pointer">Enterprise Fleet</a></li>
                  <li><a className="hover:text-slate-900 dark:text-white transition-colors cursor-pointer">Education Analytics</a></li>
                  <li><a className="hover:text-slate-900 dark:text-white transition-colors cursor-pointer">Marketplace Engine</a></li>
                </ul>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.15em] text-slate-500 font-semibold">Regions</div>
                <ul className="mt-4 space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
                  <li>Europe</li>
                  <li>Middle East</li>
                  <li>Africa</li>
                  <li>Nordic HQ</li>
                </ul>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.15em] text-slate-500 font-semibold">Company</div>
                <ul className="mt-4 space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
                  <li><a className="hover:text-slate-900 dark:text-white transition-colors cursor-pointer">About</a></li>
                  <li><a className="hover:text-slate-900 dark:text-white transition-colors cursor-pointer">Technology</a></li>
                  <li><a className="hover:text-slate-900 dark:text-white transition-colors cursor-pointer">Partners</a></li>
                  <li><a className="hover:text-slate-900 dark:text-white transition-colors cursor-pointer">Careers</a></li>
                  <li><a className="hover:text-slate-900 dark:text-white transition-colors cursor-pointer">Press</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-14 pt-8 border-t border-slate-200/80 dark:border-slate-800/60 flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs text-slate-500">
              © {new Date().getFullYear()} FlyttGo Technologies Group AB · Platform Infrastructure Provider
            </div>
            <div className="flex items-center gap-6 text-xs text-slate-500">
              <a className="hover:text-slate-900 dark:text-white cursor-pointer">Privacy</a>
              <a className="hover:text-slate-900 dark:text-white cursor-pointer">Terms</a>
              <a className="hover:text-slate-900 dark:text-white cursor-pointer">Security</a>
              <a className="hover:text-slate-900 dark:text-white cursor-pointer">Compliance</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default ContactFooter;