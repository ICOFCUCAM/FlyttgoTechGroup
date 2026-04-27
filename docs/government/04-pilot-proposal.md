# Pilot Deployment Partnership Proposal — Outline

Master template for the formal proposal document FlyttGo issues to a
public-sector partner after the capability deep-dive and pilot-
scoping conversation. The proposal is the artefact the partner's
procurement office uses to award (or decline) a pilot engagement.

Document classification: **Confidential · Issued to recipient under
NDA**
Document code: **PP.00** (with sequence: PP.01, PP.02, …)
Length target: 18–24 pages, A4 portrait, 11pt body
Distribution: PDF only, watermarked with recipient identifier and
issue version

---

## Front matter

- Cover page
  - "Pilot Deployment Partnership Proposal"
  - Recipient organisation name
  - Programme name
  - Proposal version + issue date
  - Confidentiality classification
  - Issuer block
- NDA reference page (cites the executed NDA between parties; if
  none is in force, the proposal opens with a parallel NDA that
  must be executed before the proposal is read in full)
- Document control matrix (version history, distribution list,
  classification level, retention policy)
- Table of contents

---

## Section 1 — Executive summary (1 page)

Single page summary suitable for the recipient's executive
sponsor. Six paragraphs, each one short:

1. **Programme context** — restatement of the recipient's stated
   programme objective, drawn from the public materials and the
   scoping conversation. One paragraph.
2. **Proposed pilot scope** — single-line declaration of what is
   to be deployed (which module(s), at what scale, in which
   jurisdiction, in which deployment mode).
3. **Term & timeline** — pilot duration, key milestones, transition
   point (pilot to production decision moment).
4. **Commercial shape** — fixed-fee vs T&M vs subsidised pilot,
   currency, indicative envelope (range, not point estimate).
5. **Sovereignty posture** — single-line declaration of data
   residency, key custody, identity boundary applicable to this
   pilot.
6. **Decision request** — what FlyttGo asks of the recipient: sign
   the pilot order form by [date], assign a programme lead, hold
   weekly steering during pilot.

---

## Section 2 — Programme context (2 pages)

**2.1 Recipient's stated objectives**

Quoted (with citation) from the recipient's public materials —
ministerial digital strategy, programme charter, public consultation
documents. FlyttGo does not characterise the recipient's objectives;
it cites them.

**2.2 Constraints inferred from public record**

Bulleted constraints derived from public materials and the scoping
conversation: data residency requirement, regulatory framework, user
population scale, integration anchors (existing eID, payment rails,
identity providers).

**2.3 Pilot success criteria**

Three to five concrete success criteria the pilot will be measured
against. Each criterion is a measurable outcome the recipient can
verify independently. Criteria are negotiated jointly during scoping
and locked in this document before pilot kick-off.

Examples:

- "End-to-end identity-broker latency under 400ms p95 across the
  pilot population (~500 staff users) over a 30-day rolling window"
- "Data-residency audit confirms 100% of personal data resident in
  [jurisdiction] over the pilot term"
- "Weekly statutory reporting export operates without manual
  intervention for the final four weeks of the pilot"

---

## Section 3 — Proposed scope (3 pages)

**3.1 Modules in scope**

Each module to be deployed gets a sub-section:
- Module name + slug + section code
- Function in the pilot (what it actually does for the recipient)
- Boundary (what the module does NOT do — the explicit
  out-of-scope statement)
- Integration anchors (which of the recipient's existing systems
  the module integrates against)
- Reference dataset (which population, what records, what scale)

**3.2 Modules explicitly not in scope**

Same eight-module index from the capability brief, with each
out-of-scope module ticked. No ambiguity about what the pilot does
not include. This section exists specifically to prevent scope
creep during the pilot.

**3.3 Deployment mode declaration**

One of:
- DM.01 Managed SaaS — FlyttGo operates the platform; recipient
  consumes operational services
- DM.02 Customer cloud — Platform installed inside the recipient's
  AWS, Azure or GCP tenancy
- DM.03 Sovereign datacenter — Platform installed inside a
  certified national datacenter, national HSM, national-eID
  integration

The chosen mode is locked at pilot kick-off. Migration between
modes is a separate engagement and explicitly out of pilot scope.

**3.4 Architecture diagram**

Two-page spread: a system-level architecture diagram showing the
modules in scope, the FlyttGoTech Core orchestration layer, the
integration anchors, the deployment-mode boundary (where FlyttGo
operates vs where the recipient operates), and the data-flow
classification.

---

## Section 4 — Sovereignty & compliance framework (3 pages)

**4.1 Data-residency declaration**

Per data class, where it lives during the pilot. Personal data,
operational telemetry, audit logs, backups — all classified
explicitly with their residency jurisdiction.

**4.2 Encryption-key custody**

Per the deployment mode, which party holds the master keys, who has
access, what the rotation cadence is, and what happens to keys at
pilot termination (zeroisation policy).

**4.3 Identity boundary**

Where authentication happens, which IdP federates against which,
which trust list applies. For sovereign-eID integrations, the
identity-boundary section is the most heavily documented part of
the proposal.

**4.4 Right-to-audit framework**

The recipient's audit office can audit on 30-day notice. The
proposal cites the audit clause in the contract instrument and
declares the artefacts FlyttGo will furnish on request: SOC 2 Type
II report, ISO 27001 certificate, penetration-test executive
summary, GDPR DPIA, configuration baseline.

**4.5 Regulator hand-off**

For programmes under direct regulator supervision (financial
authority, data-protection authority, national security authority),
the proposal names the regulator hand-off framework: who FlyttGo
notifies on what events, with what cadence, in what format. This
section is sometimes the longest in the proposal.

---

## Section 5 — Engagement model (2 pages)

**5.1 Term**

Pilot duration in calendar weeks. Standard pilot terms: 12, 16, 24
or 30 weeks. Mid-pilot review at the midpoint.

**5.2 Phasing**

Five-phase pilot lifecycle (matches the published `EP.00` deployment
lifecycle):

- EP.01 — Scoping (already complete by the time the proposal issues)
- EP.02 — Setup (environment provisioning, integration scaffolding)
- EP.03 — Configuration (module configuration, identity federation,
  data migration if applicable)
- EP.04 — Operation (the active pilot — recipient population uses
  the platform)
- EP.05 — Decision (transition decision point — promote to
  production, extend pilot, terminate)

**5.3 Roles & responsibilities**

RACI matrix covering: programme lead, technical lead, data-protection
officer, security lead, integration lead, audit lead. One column
per party (FlyttGo, Recipient), one column for shared
responsibilities.

**5.4 Steering cadence**

Weekly technical sync (60 min), bi-weekly steering (30 min),
monthly executive review (45 min). Cadence is fixed for the pilot
term.

**5.5 Communication channels**

Single shared channel for technical sync (Slack Connect or Teams),
single shared distribution list for asynchronous matters, signed
email for formal notifications. Recipient's internal channels
remain internal.

---

## Section 6 — Commercial framework (2 pages)

**6.1 Pricing shape**

One of:
- **Fixed-fee pilot** — single sum, payable on milestone schedule
- **Subsidised pilot** — partial fee, with the balance funded by
  FlyttGo against a production-conversion option
- **Time-and-materials pilot** — used only when scope cannot be
  fixed up-front (rare; requires written justification)

**6.2 Indicative envelope**

Range, not a point estimate. The point estimate appears only on the
order form once both parties have aligned on scope. The proposal
publishes the envelope so the recipient's procurement office can
budget.

**6.3 Inclusions**

What the pilot fee covers: platform licensing for the pilot term,
deployment engineering, integration engineering, training (named
hours), support during the pilot term, decision-package preparation.

**6.4 Exclusions**

What the pilot fee does not cover: recipient's internal team,
recipient's infrastructure costs in customer-cloud or sovereign
modes, third-party software licenses, hardware (HSM, edge devices),
data migration beyond the named anchor.

**6.5 Production transition pricing**

The price-shape under which the recipient promotes the pilot to
production. Two options usually offered:
- Annual subscription for managed SaaS deployment modes
- Per-deployment licensing fee for customer-cloud and sovereign
  deployment modes

The proposal commits to a price ceiling for the production
transition for 6 months from pilot decision; if transition decision
is later, the production price is open to renegotiation.

**6.6 Termination**

What happens if either party terminates the pilot before its
natural decision point. Data return, key zeroisation, environment
teardown, residual licensing (none — pilot licenses do not survive).

---

## Section 7 — Risk register (1 page)

Five-row table. Each row: risk, likelihood, impact, mitigation,
owner. Pre-populated with the standard pilot risk register:

1. **Integration anchor unavailability** — recipient's identity /
   payment / data anchor system goes offline during pilot
2. **Regulatory framework change** — applicable regulation shifts
   during pilot
3. **Data-residency compliance** — non-residency-compliant data
   flow detected during pilot
4. **Scope creep** — recipient requests expansion beyond declared
   scope
5. **Team continuity** — named lead on either side becomes
   unavailable

Each risk has a mitigation pre-agreed at proposal stage.

---

## Section 8 — Decision package (1 page)

Description of what FlyttGo delivers at EP.05 (the pilot's decision
moment): a written decision package the recipient's executive
sponsor uses to make the production-transition decision. Contents:

- Pilot results vs success criteria
- Operational metrics during pilot (uptime, latency, throughput)
- Issues raised, issues resolved, issues outstanding
- Data-residency audit summary
- Production transition plan (timeline, scope, price)
- Recommendations for transition or extension

---

## Section 9 — Annexes

- Annex A — Standard contract instruments (DPA, framework, joint-
  controller agreement, sovereign hosting addendum)
- Annex B — Compliance certifications package
- Annex C — Reference programme shapes (anonymised)
- Annex D — Glossary of section codes used in the proposal
- Annex E — FlyttGo standard SLA matrix
- Annex F — Penetration test executive summary (under separate NDA)

---

## Production notes

- Each proposal is generated from this outline, customised to the
  recipient and the pilot scope. Standard sections (sovereignty,
  compliance, decision package, annexes) are stable across
  recipients; programme-specific sections are written per
  engagement.
- Every issued proposal is signed by the sender (named) and
  countersigned by FlyttGo's General Counsel before circulation.
- Proposal versioning: PP.01, PP.02, PP.03... incremented for every
  material change. Every recipient receives the most recent version
  on each circulation.
- The proposal is **never** circulated as a slide deck. Slides
  read as marketing; the proposal document reads as institutional
  artefact.
- The proposal is written in the language of the recipient's
  jurisdiction by default; English versions ship as parallel
  translations, not as primary.
