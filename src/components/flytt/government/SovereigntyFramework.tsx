import React from 'react';
import { ShieldCheck, KeyRound, Globe2, FileSearch, type LucideIcon } from 'lucide-react';

/**
 * GV.05 — Sovereignty framework.
 *
 * The dark editorial anchor of the page. Four sub-rows declare the
 * sovereignty posture that every contract instrument carries:
 * Cloud-Act exposure, encryption-key custody, data residency, and
 * the right-to-audit framework. This is the page's anchor moment —
 * the section a regulator or procurement officer screenshots.
 */

type Row = {
  code: string;
  icon: LucideIcon;
  title: string;
  posture: string;
  detail: string;
};

const ROWS: Row[] = [
  {
    code: 'SV.01',
    icon: Globe2,
    title: 'Data residency',
    posture: 'Per-mode jurisdiction declaration',
    detail:
      'Managed SaaS keeps personal data in EU primary regions with optional regional uplift. Customer-cloud deployments inherit the recipient\'s tenancy region. Sovereign deployments operate 100% in-jurisdiction with explicit non-replication clauses across borders.',
  },
  {
    code: 'SV.02',
    icon: KeyRound,
    title: 'Encryption-key custody',
    posture: 'FlyttGo KMS · BYOK / HYOK · National HSM',
    detail:
      'Managed deployments use FlyttGo KMS with per-tenant data encryption keys. Customer-cloud deployments support BYOK and HYOK with the recipient\'s KMS as root. Sovereign deployments operate against a national HSM under regulator-supervised key ceremony.',
  },
  {
    code: 'SV.03',
    icon: ShieldCheck,
    title: 'Cloud-Act exposure',
    posture: 'Declared per deployment mode',
    detail:
      'Managed SaaS is potentially exposed to extraterritorial subpoena in line with the host hyperscaler\'s legal posture. Customer-cloud follows the recipient\'s tenancy. Sovereign deployments inside certified national datacenters are Cloud-Act-exempt by construction.',
  },
  {
    code: 'SV.04',
    icon: FileSearch,
    title: 'Right-to-audit framework',
    posture: '30-day notice · regulator-bounded',
    detail:
      'Every contract instrument carries a standard right-to-audit clause. The recipient or its national audit office may audit on 30-day notice. FlyttGo furnishes SOC 2 Type II report, ISO 27001 certificate, penetration-test executive summary, GDPR DPIA and configuration baseline on request.',
  },
];

export default function SovereigntyFramework() {
  return (
    <section
      id="gv-05"
      aria-labelledby="gv-05-heading"
      className="relative bg-[#070D1A] text-white py-24 lg:py-28 scroll-mt-24"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(800px 500px at 18% 12%, rgba(214,181,117,0.08), transparent 60%),' +
            'radial-gradient(900px 500px at 84% 88%, rgba(30,111,217,0.10), transparent 60%)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.6) 1px, transparent 1px),' +
            'linear-gradient(to bottom, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-white/55">
          <span className="text-[#D6B575] font-semibold">GV.05</span>
          <span aria-hidden="true" className="flex-1 h-px bg-white/15 max-w-[200px]" />
          <span>Sovereignty framework</span>
        </div>

        <div className="mt-8 grid lg:grid-cols-12 gap-10 lg:gap-12 items-end">
          <div className="lg:col-span-7">
            <h2
              id="gv-05-heading"
              className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-white leading-[1.05]"
            >
              Sovereignty as a{' '}
              <em className="not-italic font-serif italic font-normal text-[#D6B575]">
                contractual instrument.
              </em>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-base text-white/80 leading-[1.65]">
              The four declarations below are not marketing posture.
              Each is a clause carried in every contract instrument
              FlyttGo executes for a public-sector deployment, with
              a corresponding artefact furnished on procurement
              request.
            </p>
          </div>
        </div>

        <ul className="mt-12 grid md:grid-cols-2 gap-4">
          {ROWS.map((r) => {
            const Icon = r.icon;
            return (
              <li
                key={r.code}
                className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-white/20 motion-safe:transition-colors"
              >
                <div className="flex items-start gap-3">
                  <span
                    className="w-10 h-10 rounded-xl bg-[#D6B575]/15 text-[#D6B575] flex items-center justify-center flex-shrink-0"
                    aria-hidden="true"
                  >
                    <Icon size={16} strokeWidth={1.75} />
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="font-mono text-[10px] uppercase tracking-[0.22em] font-semibold text-[#D6B575]">
                      {r.code}
                    </div>
                    <div className="mt-1 text-[15px] font-semibold tracking-tight text-white">
                      {r.title}
                    </div>
                    <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-white/55">
                      {r.posture}
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-[13px] leading-relaxed text-white/75">
                  {r.detail}
                </p>
              </li>
            );
          })}
        </ul>

        <p className="mt-10 max-w-3xl font-mono text-[10px] uppercase tracking-[0.18em] text-white/55">
          Full sovereignty posture detailed under NDA in the Government
          Capability Brief (GCB.00) · §4 of the Pilot Deployment
          Partnership Proposal (PP.00) · per-deployment addenda.
        </p>
      </div>
    </section>
  );
}
