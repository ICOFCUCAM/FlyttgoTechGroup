# Government Digital Infrastructure Partnership — Outreach Package

Six artefacts supporting FlyttGo Technologies Group's public-sector
engagement with ministries, central digitalisation agencies,
transport authorities, universities and municipal modernisation
programmes.

Tone calibration: institutional infrastructure-vendor — Nordic-grade.
Tietoevry · Telenor · Visma · EVRY/DNV reference frame. Avoids
startup language; positions against four service postures
explicitly:

- **SaaS capability** — managed regional tenants
- **PaaS orchestration architecture** — FlyttGoTech Core substrate
- **IaaS-compatible deployment environments** — installs into
  customer cloud or bare-metal sovereign environments
- **Sovereign national infrastructure readiness** — certified
  national datacenter, national HSM, national eID

## Files

| File | Artefact | Audience |
|---|---|---|
| [`01-capability-brief.md`](./01-capability-brief.md) | Four-page Government Capability Brief structure (PDF-fit, NDA-shareable, mono-printable) | Ministry CIO / programme director — circulated office-internal |
| [`02-landing-page-architecture.md`](./02-landing-page-architecture.md) | `/government` landing page architecture — section map, content spec, engineering notes | Engineering team building the landing page |
| [`03-outreach-email.md`](./03-outreach-email.md) | Cold-outreach email template + capability-anchored / sovereignty-anchored variants + follow-up cadence + forbidden phrasings | Public-sector engagement desk |
| [`04-pilot-proposal.md`](./04-pilot-proposal.md) | Pilot Deployment Partnership Proposal master template — 9 sections, 18–24 pages, NDA-bound | Sales engineering + General Counsel — issued to pilot partners |
| [`05-country-targeting.md`](./05-country-targeting.md) | Country-targeting prioritisation framework — 6 scoring dimensions, 5 tiers, quarterly review cadence | Public-sector engagement desk lead — quarterly use |
| [`platform-orchestration.svg`](./platform-orchestration.svg) | Modular platform diagram showing FlyttGoTech Core orchestrating eight modules across three deployment modes and the sovereignty band | Capability brief (page 2) + `/government` landing page sovereignty section |

## Lifecycle

1. **Country-targeting framework** (`05-country-targeting.md`)
   ranks jurisdictions and assigns the engagement desk's quarterly
   capacity.
2. **Outreach emails** (`03-outreach-email.md`) go to named contacts
   in T1 and T2 jurisdictions, citing the capability brief.
3. **Capability brief** (`01-capability-brief.md`) is circulated
   inside the recipient's office under standard public-sector
   information-handling rules. Recipients arrive at the
   `/government` landing page from the brief.
4. **Landing page** (`02-landing-page-architecture.md`) acts as the
   destination and the engagement-intake surface.
5. **Pilot proposal** (`04-pilot-proposal.md`) is issued under NDA
   after the capability deep-dive, formalising scope, sovereignty
   posture and commercial frame.
6. **Platform-orchestration diagram**
   (`platform-orchestration.svg`) is embedded in the capability
   brief and on the landing page sovereignty section.

## Governance

- Materials in this directory are versioned alongside the codebase.
- The capability brief and the pilot proposal are regenerated per
  recipient — the markdown is the source, the PDF is the artefact.
- Translations into local languages are required for T1
  jurisdictions; the public-sector engagement desk owns the
  translation pipeline.
- Forbidden phrasings (`03-outreach-email.md` § Forbidden phrasings)
  apply across every artefact in this directory — not just the
  emails.
- Every issued artefact carries a recipient identifier,
  watermarked at distribution time.

## Out of scope for this package

- Reference programme details (anonymised in the brief; full
  details shared only under NDA)
- Pricing tables (envelope only in the brief; point pricing only
  in the order form)
- Country-by-country regulatory deep dives (covered in per-
  jurisdiction memos, not in this generic package)
- Press / marketing material (this package is procurement and
  technical; press lives elsewhere)
