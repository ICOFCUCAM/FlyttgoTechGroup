# Government Capability Brief

Structure for the four-page institutional document distributed to
ministries, central government bodies, transport authorities,
universities and municipal modernisation programmes. Designed to be
laid out at A4 (or US Letter) and circulated as PDF — print-fit,
mono-printable, NDA-shareable, no marketing chrome.

Document classification: **Public · Capability Brief**
Document code: **GCB.00**
Versioning: each circulated copy bears a version number, issue date,
and the recipient organisation's name.

---

## Front matter

- Document title: **FlyttGo Technologies Group — Government
  Capability Brief**
- Subtitle: *Modular platform infrastructure for sovereign-ready
  public-sector deployment*
- Issued by: FlyttGo Technologies Group AB · Oslo, Norway
- Issue date and version
- Recipient organisation (filled per copy)
- Classification mark
- Three-line executive standfirst (positioning):

  > FlyttGo Technologies Group designs and operates modular cloud
  > platform infrastructure deployed across European, African and
  > Middle Eastern public-sector programmes. Eight independently
  > licensed modules — identity, payments, mobility, workforce,
  > education, government services, financial operations and
  > marketplace — orchestrated through the FlyttGoTech Core. Three
  > deployment modes: managed SaaS, customer cloud, sovereign
  > national datacenter.

---

## Page 1 — Programme positioning

**Section 1.1 · Why this brief**

One paragraph naming the recipient's policy or programme context
(e.g. national digital identity rollout, transport data backbone,
education-data ministry consolidation, municipal services
unification), the constraints that programme is solving for, and the
slice of FlyttGo's platform that addresses it.

**Section 1.2 · Capability summary at a glance**

Three-column infrastructure-grade table:

| Capability | What FlyttGo provides | Reference deployment shape |
|---|---|---|
| Identity & access | National-eID-compatible identity broker, federated SSO, eIDAS-aligned trust services | Multi-tenant, sovereign HSM, regional residency |
| Payments & disbursement | Public-payment orchestration, PSD2-aligned, SEPA + national-rail integrations | In-jurisdiction processor, audited reconciliation |
| Workforce coordination | Public-sector workforce scheduling, certification tracking, mission-critical operations | Regional or national workforce population |
| Education intelligence | Admissions, scholarships, institutional analytics | Multi-institution, ministry-of-education tier |
| Mobility infrastructure | Dispatch, telematics, regional mobility coordination | Transport authority or ministry of transport |
| Municipal services | Citizen services, residents portals, council operations | Metro to national-municipal scale |
| Financial operations | Statutory bookkeeping, VAT/SAF-T export, audit-grade journal | Ministry-of-finance or central-audit tier |
| Marketplace | Regulated multi-sided platform infrastructure | National or regional exchange |

**Section 1.3 · Service-model declaration**

Single short paragraph naming the four service postures FlyttGo
operates against:

- **SaaS capability** — operational platform tenants delivered
  managed, region-bound.
- **PaaS orchestration architecture** — the FlyttGoTech Core
  exposes an orchestration substrate that customers can extend with
  internal services.
- **IaaS-compatible deployment environments** — the platform
  installs into the customer's existing AWS, Azure, GCP or
  bare-metal sovereign environment.
- **Sovereign national infrastructure readiness** — installations
  inside certified national datacenters with national HSM, national
  eID integration, and regulator-bounded operations.

---

## Page 2 — Platform capability matrix

Eight-row matrix, one per module. Each row contains:

| Field | Content |
|---|---|
| Module | Name + slug + section code |
| Function | One-sentence operating definition |
| Primary regulatory anchor | EU/national framework the module is shaped around (eIDAS · PSD2 · GDPR · NIS2 · sectoral law) |
| Deployment posture | Which of the three modes the module is most commonly delivered in |
| Reference dataset | Anonymised programme shape (e.g. "regional transport authority · 5 cities · 2.4M passenger records / year") |

Rows:

1. **Identra** (`PL.05` · identity infrastructure) — eIDAS-aligned;
   SaaS or sovereign; national-eID broker reference.
2. **Payvera** (`PL.06` · payment orchestration) — PSD2 + national
   rail integrations; SaaS or customer cloud; public-disbursement
   reference.
3. **Civitas** (`PL.03` · municipal & government services) — GDPR
   + sectoral municipal law; sovereign-leaning; metro-to-national
   reference.
4. **EduPro** (`PL.04` · education intelligence) — sectoral
   education-data law; SaaS or customer cloud; multi-institution
   ministry reference.
5. **Workverge** (`PL.02` · workforce coordination) — labour-law
   per jurisdiction; SaaS or customer cloud; regional workforce
   reference.
6. **Transify** (`PL.01` · mobility infrastructure) — sectoral
   transport regulation; SaaS or customer cloud; transport-authority
   reference.
7. **Ledgera** (`PL.07` · financial operations) — IFRS/GAAP +
   national accounting law; SaaS or sovereign; ministry-of-finance
   tier.
8. **FlyttGo Marketplace** (`PL.08` · regulated marketplace
   infrastructure) — sectoral marketplace law; runs on Transify;
   exchange-tier reference.

Closing paragraph:

> Modules are independently licensed. A typical public-sector
> engagement begins with one or two modules and expands as the
> programme matures. Each module operates against the same shared
> identity, audit and orchestration substrate; selecting a second
> module does not require a second integration cycle.

---

## Page 3 — Deployment posture & sovereignty framework

**Section 3.1 · Three deployment modes**

A clean three-column comparison reproducing the eight procurement
dimensions covered on `/` (`DM.MX`):

| Dimension | DM.01 Managed SaaS | DM.02 Customer cloud | DM.03 Sovereign datacenter |
|---|---|---|---|
| Data residency | In-region (EU primary, opt. AF/MENA/APAC) | In customer tenancy region | 100% in-jurisdiction · national datacenter |
| Encryption-key custody | FlyttGo KMS · per-tenant DEK | Customer KMS · BYOK / HYOK | National HSM · sovereign key root |
| Identity boundary | FlyttGo IdP · SSO federated | Customer IdP · OIDC/SAML | Sovereign eID · national trust list |
| Regulatory posture | GDPR · SOC 2 II · ISO 27001 | + customer FedRAMP / DORA / NIS2 | + jurisdictional (NSM · SDAIA · NCA) · Cloud-Act exempt |
| Patch cadence | 14-day rolling · region-windowed | 14-day rolling · customer change window | 30-day staged · sovereign ops window |
| Uptime SLA | 99.95% per region | 99.95% per region | 99.9% per facility · DR pair |
| Audit retention | Append-only · 7-year default | Append-only · customer policy | Append-only · regulator-defined (often 10y+) |
| Pilot-to-production | 60–90 days | 75–120 days | 120–180 days |

**Section 3.2 · Sovereignty framework**

Short paragraph declaring:

- Cloud-Act exposure: explicit per deployment mode
- Data-residency compliance: enumerated jurisdictions
- Key-custody model per mode
- Regulator-hand-off framework for sovereign installations
- Right-to-audit clauses standard in every contract

**Section 3.3 · Compliance certifications**

Six certifications listed (matching the footer's `CR.00` rail):
SOC 2 Type II · ISO 27001 · GDPR-ready · WCAG 2.1 AA · PSD2 (Payvera)
· eIDAS (Identra). Each certification includes its scope and the
relevant audit cadence.

---

## Page 4 — Procurement, references & engagement

**Section 4.1 · Procurement compatibility**

Five-tier ladder reproducing the `/procurement-compatibility`
surface:

- **PR.01** Pilot deployments — 60–90 days
- **PR.02** City rollouts — 90–150 days
- **PR.03** Regional deployments — 4–9 months
- **PR.04** National infrastructure programmes — 6–18 months
- **PR.05** White-label platform licensing — per agreement

Each tier maps to the contract instrument shape (DPA, framework,
joint-controller agreement, sovereign hosting addendum, etc.).

**Section 4.2 · Reference programme shapes**

Two or three anonymised programme outlines. Format per shape:

> *Mid-size Nordic transport authority — five cities, 2.4M
> passengers / year. Transify deployed in customer-cloud mode under
> the authority's Azure tenancy. Production date: month / year.
> Outcomes: dispatch latency reduced, statutory reporting
> consolidated.*

(Replace with real anonymised references at distribution time.)

**Section 4.3 · Engagement next steps**

Three-paragraph close:

1. Capability deep-dive — 60-minute architecture session with the
   FlyttGo platform team.
2. Pilot scoping — formal scoping engagement under NDA, output is
   a written pilot brief and a price-shape proposal.
3. Procurement engagement — moves to one of the five tiers above,
   with the corresponding contract instrument.

**Front-line contact block**

```
FlyttGo Technologies Group AB
Public-sector engagement desk
platform@flyttgotech.com
+44 20 1234 5678
HQ: Oslo · Regional: London · Stockholm · Dubai
```

---

## Production notes

- Format: A4 portrait, 4 pages, 12pt body, 8pt mono caption rail
- Typography: Inter (body), JetBrains Mono (captions, codes), IBM
  Plex Serif (display)
- Palette: navy (`#0A3A6B`) accent on white; mono-printable
- Cover bears document classification, recipient name and version
  number — every circulated copy is traceable
- Distributed only as PDF with watermarked recipient identifier; the
  source markdown lives in this repo and is regenerated per
  recipient
- Per spec §10, the F-symbol mark renders monochrome on this brief
  (regulator surfaces forbid gradients)
