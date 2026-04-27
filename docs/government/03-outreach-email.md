# Ministry outreach email — template

Cold-outreach template for a named contact at a ministry, central
digitalisation agency, transport authority, university or municipal
modernisation programme. Sent by a named member of the FlyttGo
public-sector engagement desk; addressed to a named contact (not
"to whom it may concern"); written in the voice of an
infrastructure vendor offering a capability brief, not a sales
pitch.

Tone calibration: Tietoevry, Telenor, Visma, EVRY/DNV. Avoid
"disrupt", "innovate", "transform", "next-generation", "10x",
"leverage". Prefer "operate", "deploy", "interoperate",
"compliant", "in-region".

Subject line: 60–80 characters, names the recipient programme,
states the document on offer, no time pressure.

Length target: 180–240 words. One paragraph context, one paragraph
capability framing, one paragraph next step. No bullets in the
opening outreach — bullets read as marketing. Bullets are reserved
for the capability brief itself.

---

## Variables

The template uses four variables. The sending workflow fills them
per recipient before send.

- `{{recipient_name}}` — full name of the addressed officer
- `{{recipient_title}}` — official title (e.g. "Director,
  Digital Services Department")
- `{{ministry}}` — full ministry / agency / authority name
- `{{programme}}` — the programme or initiative the recipient is
  named on (e.g. "the National Digital Identity Programme",
  "the Education Data Backbone consolidation")
- `{{module_anchor}}` — the FlyttGo module most relevant to the
  programme (e.g. "Identra", "EduPro", "Civitas")
- `{{capability_url}}` — `https://flyttgo.tech/government` or a
  signed link to the PDF of the Government Capability Brief

---

## Subject line — three permissible variants

Pick one per recipient based on the programme alignment:

1. *Capability brief: {{ministry}} — {{programme}} (FlyttGo
   Technologies Group)*
2. *FlyttGo Technologies — Government Capability Brief for
   {{ministry}}*
3. *{{module_anchor}} — capability brief for {{programme}}*

The first form is the default. The second is used when the
programme is implicit from the ministry name. The third is used
when the recipient's portfolio is bounded to a single capability.

---

## Body — primary template

```
Subject: Capability brief: {{ministry}} — {{programme}} (FlyttGo Technologies Group)

Dear {{recipient_name}},

I write from FlyttGo Technologies Group AB regarding the
{{programme}}. Following the public materials your office has
issued on the programme's deployment posture, I would like to share
our Government Capability Brief — a four-page institutional
document covering the platform capabilities, deployment modes and
sovereignty framework that match the programme's stated
requirements.

FlyttGo operates modular cloud platform infrastructure currently
deployed across European, African and Middle Eastern public-sector
programmes. The brief covers our identity, payments, mobility,
workforce, education, government-services and financial-operations
modules; the three deployment modes we offer (managed SaaS,
customer cloud, sovereign national datacenter); the corresponding
data-residency, key-custody and audit-rights frameworks; and the
five procurement tiers we contract under. It is suitable for
circulation inside your office under standard public-sector
information-handling rules.

If the {{programme}} would benefit from a 60-minute capability
deep-dive with our platform team, I would be glad to arrange one at
your office's convenience. Otherwise, the brief and a request line
for further documentation can be reached at {{capability_url}}.

I remain at your disposal.

Yours sincerely,

[Sender name]
Public-Sector Engagement Desk
FlyttGo Technologies Group AB
platform@flyttgotech.com  ·  +44 20 1234 5678
HQ Oslo · London · Stockholm · Dubai
```

---

## Body — capability-anchored variant (when one module is the lead)

Used when the recipient's portfolio is single-module. Replace the
second paragraph of the primary template with:

```
{{module_anchor}} is FlyttGo's [single-line definition of the
module]. The brief details the module's regulatory anchor (e.g.
eIDAS for Identra, PSD2 for Payvera, sectoral education-data law
for EduPro), the reference deployment shape we operate at the scale
of the {{programme}}, and the contract instruments under which we
engage.
```

Examples:

- *"Identra is FlyttGo's identity-broker module — eIDAS-aligned,
  national-eID compatible, sovereign-HSM-deployable."*
- *"Civitas is FlyttGo's municipal and government services module
  — citizen portals, council operations, statutory residency."*
- *"Ledgera is FlyttGo's financial-operations module — IFRS/GAAP-
  compliant statutory bookkeeping, SAF-T export, audit-grade
  journal."*

---

## Body — sovereignty-anchored variant (when sovereignty is the lead concern)

Used when the recipient's office has issued public materials
emphasising data residency, sovereign hosting, or Cloud-Act
exposure concerns. Replace the second paragraph with:

```
The brief explicitly addresses the sovereignty framework of every
deployment — data residency, encryption-key custody, identity
boundary, regulatory posture, patch cadence and right-to-audit —
across our three deployment modes. Our sovereign-datacenter
deployments operate inside certified national facilities under
national HSM with regulator-bounded change-windows; the brief
states the corresponding Cloud-Act exposure framework explicitly.
```

---

## Follow-up cadence

If no reply after the initial email, a single follow-up at
**day 14** is appropriate. No further outreach. The follow-up is a
two-sentence forward of the original with a soft framing:

```
Subject: re: Capability brief: {{ministry}} — {{programme}}

Dear {{recipient_name}},

Following my note of [DATE], I attach the Government Capability
Brief here for your reference. Should the {{programme}} have a
later moment when our capability is helpful, our public-sector
desk is available at platform@flyttgotech.com.

Yours sincerely,
[Sender name]
```

After the day-14 follow-up, the recipient is moved to the long
nurture stream — quarterly issue of the published Insights briefing,
no further direct outreach until an explicit signal (RFP issuance,
public consultation, programme update).

---

## Forbidden phrasings

The following phrasings break the institutional tone and must not
appear in any outbound:

- "We're excited to..."
- "...transform...", "...disrupt...", "...revolutionise..."
- "Quick call", "Jump on a call", "Hop on a call", "Touch base"
- "Game-changing", "best-in-class", "world-class", "cutting-edge"
- Any time pressure: "limited window", "pilot slots remaining",
  "deadline"
- Any first-person plural marketing: "we believe", "we've seen",
  "we're confident"
- Emoji of any kind
- Multiple exclamation marks; ideally none at all

## Permitted phrasings

- "We operate..."
- "FlyttGo is deployed across..."
- "The brief covers..."
- "I remain at your disposal"
- "Suitable for circulation under standard public-sector
  information-handling rules"
- "At your office's convenience"
- Direct first-person singular ("I write from...", "I would be
  glad to...") rather than corporate plural

## Send-list governance

- Every outbound email is logged in the engagement-desk register
  with timestamp, recipient, programme, variant used, and outcome.
- A recipient may request removal at any point; removal is
  immediate and recorded.
- No purchased lists; recipients are sourced only from public
  procurement notices, public ministry directories, and warm
  introductions.
- GDPR Article 6(1)(f) (legitimate interests) is the lawful basis;
  the legitimate-interests assessment for public-sector outreach
  lives at `docs/government/legal/lia-public-sector.md` (to be
  authored separately).
