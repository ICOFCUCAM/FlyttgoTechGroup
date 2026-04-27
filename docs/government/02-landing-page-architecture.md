# /government — Landing Page Architecture

Build specification for the dedicated public-sector outreach surface
at `/government`. Distinct from the broader `/industries/government`
sector page (which addresses ministries and municipalities as one of
nine industry profiles); `/government` is the outreach destination
linked from the ministry email template, the capability brief and
direct procurement-team navigation.

Page code: **`GV.00`**
Audience: ministry technical leads, municipal IT directors,
transport-authority CIOs, university CTOs, central digitalisation
agencies.
Tone: institutional infrastructure-vendor — Nordic-grade. No
startup language; no time-bound claims; no aspirational positioning.

---

## Section map

| # | Code | Section | Component | Notes |
|---|---|---|---|---|
| 0 | `ER.00` | Establishment rail | `EstablishmentRail` | Site-wide; already in layout |
| 1 | `NV.00` | Navigation | `Navbar` | Site-wide |
| 2 | `GV.00` | Page banner | `PageHero` (with `code="GV.00"`) | Eyebrow + serif headline + description + breadcrumbs |
| 3 | `GV.01` | Programme positioning | New: `GovernmentPositioning` | Statement of who the page is for, in two paragraphs |
| 4 | `GV.02` | Service-model declaration | New: `GovernmentServiceModels` | Four-card row: SaaS · PaaS · IaaS-compatible · Sovereign |
| 5 | `GV.03` | Platform capability matrix | Reuse: `HomeOrchestrationCore` (re-themed) | Eight modules grid, government framing |
| 6 | `GV.04` | Deployment posture | Reuse: `HomeDeploymentMatrix` (`DM.MX`) | Three-mode comparison, 8 dimensions |
| 7 | `GV.05` | Sovereignty framework | New: `SovereigntyFramework` | Cloud-Act exposure · key custody · residency · audit rights |
| 8 | `GV.06` | Compliance posture | Reuse: `ComplianceBand` | Six certifications + audit cadence |
| 9 | `GV.07` | Procurement compatibility | Reuse: `HomeProcurementEntry` (`PR.00`) | Five-tier ladder |
| 10 | `GV.08` | Reference programme shapes | New: `GovernmentReferences` | Anonymised programme outlines (2–3) |
| 11 | `GV.09` | Engagement intake | New: `GovernmentEngagement` | Three-step engagement model + intake CTA |
| 12 | `FT.07` | Footer | `SiteFooter` | Site-wide |

---

## Section 2 · Page banner (`GV.00`)

```tsx
<PageHero
  code="GV.00"
  eyebrow="Government & Public Sector"
  title={
    <>
      Modular platform infrastructure for{' '}
      <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
        sovereign-ready public-sector deployment.
      </em>
    </>
  }
  description="Identity, payments, mobility, workforce, education, municipal services and financial operations — orchestrated through the FlyttGoTech Core. Three deployment modes: managed SaaS, customer cloud, sovereign national datacenter."
  crumbs={[{ label: 'Home', href: '/' }, { label: 'Government' }]}
/>
```

## Section 3 · Programme positioning (`GV.01`)

Two-column layout:

- **Left (60%)** — body paragraph naming the programme contexts
  FlyttGo serves: ministerial digital-transformation initiatives,
  national digital-identity rollouts, transport-data backbones,
  education-data consolidations, municipal services unifications.
- **Right (40%)** — context rail: a list of six bullet items, each a
  type of buyer (Ministry of Digital Affairs · Ministry of
  Transport · Ministry of Education · Central Digitalisation Agency
  · Municipal Modernisation Programme · Public-Sector Procurement
  Office). Each bullet anchors to the relevant capability matrix
  row.

## Section 4 · Service-model declaration (`GV.02`)

Four-card row matching the `/` home page service-model surface
(`SM.00`), but framed for public-sector tone:

| Card | Body |
|---|---|
| **SaaS capability** | Managed regional tenants. FlyttGo operates the platform; recipient consumes operational services with statutory residency. |
| **PaaS orchestration architecture** | The FlyttGoTech Core exposes an orchestration substrate that the recipient extends with internal services or in-house modules. |
| **IaaS-compatible deployment environments** | Platform installs into the recipient's existing AWS, Azure, GCP or bare-metal sovereign environment under their tenancy. |
| **Sovereign national infrastructure readiness** | Installation inside certified national datacenters, national HSM, national-eID integration, regulator-bounded operations. |

Each card has the section code, a one-line eyebrow, the title above,
the body, and a "Read posture" link. The four together establish
the service shape before any module-level capability is named.

## Section 5 · Platform capability matrix (`GV.03`)

Re-uses `HomeOrchestrationCore` — the same eight-module
orchestration display from the home page, re-themed for government
framing:

- Header: "Eight modules. One orchestration core."
- Government framing in the body copy
- Each module card retains its module gradient (per the §9 module-
  color inheritance documented in the brand spec)

If `HomeOrchestrationCore` doesn't exist as a re-usable component, a
new `GovernmentCapabilityMatrix` ships eight cards in two rows of
four, each card with module name, government-framed function,
primary regulatory anchor, and a "deep-dive" link to the module
page.

## Section 6 · Deployment posture (`GV.04`)

Re-uses `HomeDeploymentMatrix` (`DM.MX`) verbatim — already
procurement-grade, already lists the three modes against eight
dimensions. No re-theming required.

## Section 7 · Sovereignty framework (`GV.05`)

New component. Single full-width panel with four sub-rows:

| Sub-row | Body |
|---|---|
| **Cloud-Act exposure** | Per-mode declaration. SaaS = potentially exposed; sovereign = exempt. |
| **Encryption-key custody** | FlyttGo KMS / customer BYOK / national HSM, picked per deployment. |
| **Data residency** | Per-mode jurisdiction listing; explicit non-replication clause for sovereign. |
| **Right to audit** | Standard contract clause; recipient or recipient's audit office may audit on 30-day notice. |

Visual treatment: dark editorial panel (slate-950 background) with
mono caption rail. Each sub-row has a small `currentColor` mark and
a one-line declaration.

## Section 8 · Compliance posture (`GV.06`)

Re-use `ComplianceBand`. Six certifications + audit cadence, already
on the home page. Re-render with `code="CR.00"`.

## Section 9 · Procurement compatibility (`GV.07`)

Re-use `HomeProcurementEntry`. Five-tier ladder PR.01–05 with
cadence per tier, already procurement-grade.

## Section 10 · Reference programme shapes (`GV.08`)

New component. Two or three anonymised programme cards. Each card:

- Programme shape (sector, scale, geography)
- Module(s) deployed
- Deployment mode
- Reference outcomes (statutory metrics only, no marketing claims)

Until real references are clearable for circulation, this section
ships placeholder cards with a footnote: *"Reference details shared
under NDA. Request references via the engagement intake below."*

## Section 11 · Engagement intake (`GV.09`)

Three-step engagement model rendered as a stepper:

1. **Capability deep-dive** — 60-minute architecture session.
2. **Pilot scoping** — formal scoping engagement under NDA, output
   is a written pilot brief and a price-shape proposal.
3. **Procurement engagement** — moves to one of the five tiers
   above, with the corresponding contract instrument.

CTA: a primary button that goes to `/contact?intent=government` and
prefills the contact form. The form on `/contact` should branch on
the `intent` parameter to route public-sector enquiries to the
public-sector desk and surface the additional fields a ministry
contact form needs (jurisdiction, programme code, security level,
required deployment mode).

## Sections 0, 1, 12 — Site chrome

Already covered by the existing layout and components.

---

## Engineering notes

- File: `src/app/government/page.tsx`
- Metadata: title "Government & Public Sector — FlyttGo
  Technologies Group", description matches Section 3, robots
  noindex during pre-launch / index when launched
- `dynamic = 'force-dynamic'` so the layout's locale-detection drives
  copy in localised variants
- All re-used components keep their props as-is — no fork
- New components live under `src/components/flytt/government/`:
  - `GovernmentPositioning.tsx`
  - `GovernmentServiceModels.tsx`
  - `SovereigntyFramework.tsx`
  - `GovernmentReferences.tsx`
  - `GovernmentEngagement.tsx`
- Localisation: every new copy string goes through the i18n
  dictionary (EN at minimum, NO + FR + DE for primary jurisdictions)
- Schema.org: `Government` entity should appear in the JSON-LD
  graph; this page should be reachable from the existing
  `/industries/government` page (cross-link both ways)

## Visual treatment

- Hero on light surface with the established editorial chrome
  (warm-brass italic, navy headline)
- Service-model row with the same four-card editorial treatment as
  `/`'s SM.00
- Sovereignty framework on a dark editorial panel — the only dark
  surface on the page, used to mark the sovereignty section as
  the page's anchor moment
- Compliance + procurement re-use existing surfaces unchanged
- Engagement intake on a soft-cream panel matching the home's
  FinalCTA family
