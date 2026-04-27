import type { Metadata } from 'next';
import Link from '@/components/flytt/LocaleLink';
import { ArrowLeft, Printer, Lock } from 'lucide-react';

/**
 * GCB.00 — Government Capability Brief, print-ready HTML surface.
 *
 * Renders the four-page capability brief as a print-optimised HTML
 * document. Recipient prints to PDF from the browser; we don't
 * generate a PDF binary on the server. Print CSS strips chrome
 * and preserves the four-page structure.
 *
 * Recipient identifier and version are passed via search params
 * (?recipient=...&version=...) so each circulated copy is
 * traceable; defaults to placeholders when un-parameterised so
 * the page is also browsable without a recipient context.
 */

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Government Capability Brief — FlyttGo Technologies Group',
  description:
    'Four-page institutional capability brief covering platform capabilities, deployment modes, sovereignty framework and procurement compatibility for public-sector deployment.',
  alternates: { canonical: '/government/capability-brief' },
  robots: { index: false, follow: false },
};

interface PageProps {
  searchParams?: { recipient?: string; version?: string };
}

export default function CapabilityBriefPage({ searchParams }: PageProps) {
  const recipient = searchParams?.recipient ?? '[Recipient organisation]';
  const version = searchParams?.version ?? '1.0';
  const issueDate = new Date().toISOString().slice(0, 10);

  return (
    <>
      {/* On-screen chrome (hidden in print) */}
      <div className="bg-slate-50 dark:bg-slate-950 print:hidden border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 py-4 flex flex-wrap items-center gap-4">
          <Link
            href="/government"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            Back to /government
          </Link>
          <div className="ml-auto flex flex-wrap items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500">
              GCB.00 · v{version} · issued {issueDate}
            </span>
            <button
              type="button"
              onClick={() => {
                if (typeof window !== 'undefined') window.print();
              }}
              suppressHydrationWarning
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#0A3A6B] text-white text-xs font-semibold hover:bg-[#0A3A6B]/90 motion-safe:transition-colors print:hidden"
            >
              <Printer size={12} strokeWidth={2} aria-hidden="true" />
              Print to PDF
            </button>
          </div>
        </div>
      </div>

      <main
        id="main"
        className="bg-slate-100 dark:bg-slate-950 print:bg-white py-10 print:py-0"
      >
        {/* === PAGE 1 === */}
        <article className="brief-page">
          <header className="brief-header">
            <div className="brief-classification">
              Public · Capability Brief · GCB.00
            </div>
            <div className="brief-recipient">
              Issued to: <strong>{recipient}</strong>
            </div>
            <div className="brief-meta">
              Version {version} · {issueDate}
            </div>
          </header>

          <div className="brief-cover">
            <div className="brief-issuer">FlyttGo Technologies Group AB</div>
            <h1 className="brief-h1">Government Capability Brief</h1>
            <p className="brief-subtitle">
              Modular platform infrastructure for sovereign-ready public-sector deployment.
            </p>
            <p className="brief-standfirst">
              FlyttGo Technologies Group designs and operates modular cloud
              platform infrastructure deployed across European, African and
              Middle Eastern public-sector programmes. Eight independently
              licensed modules — identity, payments, mobility, workforce,
              education, government services, financial operations and
              marketplace — orchestrated through the FlyttGoTech Core. Three
              deployment modes: managed SaaS, customer cloud, sovereign
              national datacenter.
            </p>
          </div>

          <section className="brief-section">
            <h2 className="brief-h2">1.1 · Why this brief</h2>
            <p>
              This brief is issued to {recipient} in connection with the
              programme context disclosed in the engagement-desk record.
              It documents the capability surface FlyttGo brings to the
              programme, the deployment modes the programme can be
              delivered against, and the sovereignty framework that
              applies to every contract instrument.
            </p>
          </section>

          <section className="brief-section">
            <h2 className="brief-h2">1.2 · Capability summary at a glance</h2>
            <table className="brief-table">
              <thead>
                <tr>
                  <th>Capability</th>
                  <th>What FlyttGo provides</th>
                  <th>Reference shape</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Identity &amp; access</td><td>National-eID-compatible identity broker, federated SSO, eIDAS-aligned trust services</td><td>Multi-tenant, sovereign HSM, regional residency</td></tr>
                <tr><td>Payments &amp; disbursement</td><td>Public-payment orchestration, PSD2-aligned, SEPA + national-rail integrations</td><td>In-jurisdiction processor, audited reconciliation</td></tr>
                <tr><td>Workforce coordination</td><td>Public-sector workforce scheduling, certification tracking</td><td>Regional or national workforce population</td></tr>
                <tr><td>Education intelligence</td><td>Admissions, scholarships, institutional analytics</td><td>Multi-institution, ministry-of-education tier</td></tr>
                <tr><td>Mobility infrastructure</td><td>Dispatch, telematics, regional mobility coordination</td><td>Transport authority or ministry of transport</td></tr>
                <tr><td>Municipal services</td><td>Citizen services, residents portals, council operations</td><td>Metro to national-municipal scale</td></tr>
                <tr><td>Financial operations</td><td>Statutory bookkeeping, VAT/SAF-T export, audit-grade journal</td><td>Ministry-of-finance or central-audit tier</td></tr>
                <tr><td>Marketplace</td><td>Regulated multi-sided platform infrastructure</td><td>National or regional exchange</td></tr>
              </tbody>
            </table>
          </section>

          <section className="brief-section">
            <h2 className="brief-h2">1.3 · Service-model declaration</h2>
            <p>FlyttGo operates against four service postures, each with a corresponding contractual frame:</p>
            <ul className="brief-list">
              <li><strong>SaaS capability</strong> — operational platform tenants delivered managed, region-bound.</li>
              <li><strong>PaaS orchestration architecture</strong> — the FlyttGoTech Core exposes an orchestration substrate that customers extend with internal services.</li>
              <li><strong>IaaS-compatible deployment environments</strong> — the platform installs into the customer&apos;s existing AWS, Azure, GCP or bare-metal sovereign environment.</li>
              <li><strong>Sovereign national infrastructure readiness</strong> — installations inside certified national datacenters with national HSM, national-eID integration, regulator-bounded operations.</li>
            </ul>
          </section>

          <footer className="brief-footer">
            <span>Page 1 of 4</span>
            <span>FlyttGo Technologies Group AB · Confidential to {recipient}</span>
          </footer>
        </article>

        {/* === PAGE 2 === */}
        <article className="brief-page">
          <header className="brief-header">
            <div className="brief-classification">Public · Capability Brief · GCB.00</div>
            <div className="brief-recipient">{recipient}</div>
            <div className="brief-meta">v{version}</div>
          </header>

          <h2 className="brief-h2">2 · Platform capability matrix</h2>
          <p className="brief-intro">
            Eight modules, each independently licensed. Modules operate
            against the same shared identity, audit and orchestration
            substrate; selecting a second module does not require a
            second integration cycle.
          </p>

          <table className="brief-table brief-modules">
            <thead>
              <tr>
                <th>Module</th>
                <th>Function</th>
                <th>Regulatory anchor</th>
                <th>Posture</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Identra</strong> · PL.05</td>
                <td>Identity broker, eIDAS-aligned, national-eID compatible</td>
                <td>eIDAS · GDPR</td>
                <td>SaaS or sovereign</td>
              </tr>
              <tr>
                <td><strong>Payvera</strong> · PL.06</td>
                <td>Public-payment orchestration, SEPA + national-rail</td>
                <td>PSD2 · GDPR</td>
                <td>SaaS or customer cloud</td>
              </tr>
              <tr>
                <td><strong>Civitas</strong> · PL.03</td>
                <td>Municipal &amp; government services portal</td>
                <td>GDPR · sectoral municipal law</td>
                <td>Sovereign-leaning</td>
              </tr>
              <tr>
                <td><strong>EduPro</strong> · PL.04</td>
                <td>Admissions · scholarships · institutional analytics</td>
                <td>Sectoral education-data law</td>
                <td>SaaS or customer cloud</td>
              </tr>
              <tr>
                <td><strong>Workverge</strong> · PL.02</td>
                <td>Workforce scheduling and certification tracking</td>
                <td>National labour law</td>
                <td>SaaS or customer cloud</td>
              </tr>
              <tr>
                <td><strong>Transify</strong> · PL.01</td>
                <td>Mobility infrastructure, dispatch, telematics</td>
                <td>Sectoral transport regulation</td>
                <td>SaaS or customer cloud</td>
              </tr>
              <tr>
                <td><strong>Ledgera</strong> · PL.07</td>
                <td>Financial operations, statutory bookkeeping, SAF-T</td>
                <td>IFRS / GAAP · national accounting law</td>
                <td>SaaS or sovereign</td>
              </tr>
              <tr>
                <td><strong>FlyttGo Marketplace</strong> · PL.08</td>
                <td>Regulated multi-sided platform infrastructure</td>
                <td>Sectoral marketplace law</td>
                <td>Per programme</td>
              </tr>
            </tbody>
          </table>

          <footer className="brief-footer">
            <span>Page 2 of 4</span>
            <span>FlyttGo Technologies Group AB · Confidential to {recipient}</span>
          </footer>
        </article>

        {/* === PAGE 3 === */}
        <article className="brief-page">
          <header className="brief-header">
            <div className="brief-classification">Public · Capability Brief · GCB.00</div>
            <div className="brief-recipient">{recipient}</div>
            <div className="brief-meta">v{version}</div>
          </header>

          <h2 className="brief-h2">3 · Deployment posture &amp; sovereignty framework</h2>

          <h3 className="brief-h3">3.1 · Three deployment modes</h3>
          <table className="brief-table brief-modes">
            <thead>
              <tr>
                <th>Dimension</th>
                <th>DM.01 Managed SaaS</th>
                <th>DM.02 Customer cloud</th>
                <th>DM.03 Sovereign datacenter</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Data residency</td><td>EU primary regions</td><td>Customer tenancy region</td><td>100% in-jurisdiction</td></tr>
              <tr><td>Key custody</td><td>FlyttGo KMS</td><td>BYOK / HYOK</td><td>National HSM</td></tr>
              <tr><td>Identity boundary</td><td>FlyttGo IdP</td><td>Customer IdP · OIDC/SAML</td><td>Sovereign eID</td></tr>
              <tr><td>Regulatory posture</td><td>GDPR · SOC 2 · ISO 27001</td><td>+ FedRAMP / DORA / NIS2</td><td>+ NSM · SDAIA · NCA · Cloud-Act exempt</td></tr>
              <tr><td>Patch cadence</td><td>14-day rolling</td><td>14-day · customer change window</td><td>30-day staged · sovereign window</td></tr>
              <tr><td>Uptime SLA</td><td>99.95% per region</td><td>99.95% per region</td><td>99.9% per facility · DR pair</td></tr>
              <tr><td>Audit retention</td><td>7-year default</td><td>Customer policy</td><td>Regulator-defined (10y+)</td></tr>
              <tr><td>Pilot-to-production</td><td>60–90 days</td><td>75–120 days</td><td>120–180 days</td></tr>
            </tbody>
          </table>

          <h3 className="brief-h3">3.2 · Sovereignty framework</h3>
          <p>
            Cloud-Act exposure declared per deployment mode. Data residency
            enumerated per jurisdiction; key custody per the chosen mode;
            regulator-hand-off framework defined for sovereign installations;
            right-to-audit clause standard in every contract.
          </p>

          <h3 className="brief-h3">3.3 · Compliance certifications</h3>
          <ul className="brief-list">
            <li><strong>SOC 2 Type II</strong> — annual audit, NDA-shareable</li>
            <li><strong>ISO 27001</strong> — ISMS, Annex A coverage</li>
            <li><strong>GDPR-ready</strong> — DPA, in-region residency</li>
            <li><strong>WCAG 2.1 AA</strong> — accessibility</li>
            <li><strong>PSD2 (Payvera)</strong> — EU payments, SCA</li>
            <li><strong>eIDAS (Identra)</strong> — EU trust services</li>
          </ul>

          <footer className="brief-footer">
            <span>Page 3 of 4</span>
            <span>FlyttGo Technologies Group AB · Confidential to {recipient}</span>
          </footer>
        </article>

        {/* === PAGE 4 === */}
        <article className="brief-page">
          <header className="brief-header">
            <div className="brief-classification">Public · Capability Brief · GCB.00</div>
            <div className="brief-recipient">{recipient}</div>
            <div className="brief-meta">v{version}</div>
          </header>

          <h2 className="brief-h2">4 · Procurement &amp; engagement</h2>

          <h3 className="brief-h3">4.1 · Procurement compatibility</h3>
          <table className="brief-table">
            <thead>
              <tr><th>Tier</th><th>Programme shape</th><th>Cadence</th></tr>
            </thead>
            <tbody>
              <tr><td>PR.01</td><td>Pilot deployments</td><td>60–90 days</td></tr>
              <tr><td>PR.02</td><td>City rollouts</td><td>90–150 days</td></tr>
              <tr><td>PR.03</td><td>Regional deployments</td><td>4–9 months</td></tr>
              <tr><td>PR.04</td><td>National infrastructure programmes</td><td>6–18 months</td></tr>
              <tr><td>PR.05</td><td>White-label platform licensing</td><td>Per agreement</td></tr>
            </tbody>
          </table>

          <h3 className="brief-h3">4.2 · Reference programme shapes</h3>
          <p>
            Three anonymised reference programmes are documented in
            section GV.08 of the engagement surface
            (<em>flyttgo.tech/government</em>). Full reference details
            — recipient, contract instrument, statutory metrics, audit
            outcomes — released only under NDA.
          </p>

          <h3 className="brief-h3">4.3 · Engagement next steps</h3>
          <ol className="brief-list brief-ordered">
            <li><strong>Capability deep-dive</strong> — 60-minute architecture session with the FlyttGo platform team.</li>
            <li><strong>Pilot scoping</strong> — formal scoping engagement under NDA; output is a written pilot brief and a price-shape proposal.</li>
            <li><strong>Procurement engagement</strong> — moves to one of the five tiers above with the corresponding contract instrument.</li>
          </ol>

          <div className="brief-contact">
            <h3 className="brief-h3">Public-sector engagement desk</h3>
            <p>FlyttGo Technologies Group AB</p>
            <p>platform@flyttgotech.com · +44 20 1234 5678</p>
            <p>HQ Oslo · Regional London · Stockholm · Dubai</p>
          </div>

          <footer className="brief-footer">
            <span>Page 4 of 4</span>
            <span>FlyttGo Technologies Group AB · Confidential to {recipient}</span>
          </footer>
        </article>

        <div className="brief-confidentiality print:hidden">
          <Lock size={11} aria-hidden="true" />
          <span>
            Confidential · circulated under standard public-sector
            information-handling rules · do not redistribute outside
            the recipient organisation
          </span>
        </div>
      </main>

      <style>{`
        .brief-page {
          max-width: 794px;  /* A4 width @ 96 DPI */
          min-height: 1123px; /* A4 height @ 96 DPI */
          margin: 0 auto 24px auto;
          padding: 56px 64px;
          background: #ffffff;
          color: #0A1F3D;
          font-family: 'IBM Plex Serif', Georgia, serif;
          font-size: 11pt;
          line-height: 1.55;
          box-shadow: 0 4px 24px -8px rgba(10,31,61,0.18);
          page-break-after: always;
          break-after: page;
          display: flex;
          flex-direction: column;
        }
        @media print {
          .brief-page {
            box-shadow: none;
            margin: 0;
            min-height: auto;
          }
          @page {
            size: A4;
            margin: 0;
          }
        }
        .brief-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 16px;
          padding-bottom: 14px;
          border-bottom: 1px solid #CBD5E1;
          margin-bottom: 24px;
          font-family: ui-monospace, 'JetBrains Mono', monospace;
          font-size: 8pt;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #64748B;
        }
        .brief-classification { font-weight: 600; color: #0A3A6B; }
        .brief-recipient { color: #475569; }
        .brief-meta { color: #94A3B8; }
        .brief-cover { margin-bottom: 28px; }
        .brief-issuer {
          font-family: ui-monospace, 'JetBrains Mono', monospace;
          font-size: 9pt;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #0A3A6B;
          margin-bottom: 12px;
        }
        .brief-h1 {
          font-family: 'IBM Plex Serif', Georgia, serif;
          font-size: 28pt;
          font-weight: 500;
          margin: 0 0 8px;
          line-height: 1.1;
        }
        .brief-subtitle {
          font-style: italic;
          color: #1E6FD9;
          font-size: 13pt;
          margin: 0 0 18px;
        }
        .brief-standfirst {
          font-size: 11pt;
          line-height: 1.6;
          color: #334155;
          margin: 0;
        }
        .brief-section { margin: 0 0 22px; }
        .brief-h2 {
          font-family: 'IBM Plex Serif', Georgia, serif;
          font-size: 14pt;
          font-weight: 600;
          color: #0A3A6B;
          margin: 0 0 10px;
        }
        .brief-h3 {
          font-family: 'IBM Plex Serif', Georgia, serif;
          font-size: 12pt;
          font-weight: 600;
          color: #0A3A6B;
          margin: 18px 0 8px;
        }
        .brief-intro {
          font-size: 10.5pt;
          color: #475569;
          margin: 0 0 16px;
        }
        .brief-list { padding-left: 1.2em; margin: 0 0 12px; }
        .brief-ordered { padding-left: 1.5em; }
        .brief-list li { margin-bottom: 6px; }
        .brief-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 9.5pt;
          margin: 8px 0 16px;
        }
        .brief-table th,
        .brief-table td {
          padding: 6px 10px;
          border-bottom: 1px solid #E2E8F0;
          text-align: left;
          vertical-align: top;
        }
        .brief-table th {
          font-family: ui-monospace, 'JetBrains Mono', monospace;
          font-size: 8pt;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #64748B;
          border-bottom: 1px solid #94A3B8;
          background: #F8FAFC;
        }
        .brief-modules td:first-child,
        .brief-modes td:first-child {
          font-weight: 600;
          color: #0A3A6B;
        }
        .brief-contact {
          margin-top: 24px;
          padding: 16px 20px;
          background: #F7FAFD;
          border-left: 3px solid #0A3A6B;
        }
        .brief-contact p { margin: 2px 0; font-size: 10.5pt; }
        .brief-footer {
          margin-top: auto;
          padding-top: 14px;
          border-top: 1px solid #CBD5E1;
          display: flex;
          justify-content: space-between;
          font-family: ui-monospace, 'JetBrains Mono', monospace;
          font-size: 8pt;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #94A3B8;
        }
        .brief-confidentiality {
          max-width: 794px;
          margin: 8px auto 32px;
          padding: 12px 18px;
          background: #FFFFFF;
          border: 1px dashed #CBD5E1;
          border-radius: 8px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: ui-monospace, 'JetBrains Mono', monospace;
          font-size: 9pt;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #64748B;
        }
      `}</style>
    </>
  );
}
