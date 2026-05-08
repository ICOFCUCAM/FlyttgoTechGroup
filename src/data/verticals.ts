export type Vertical = {
  slug: string;
  code: string;
  name: string;
  audience: string;
  emoji: string;
  positioning: string;
  /** One-paragraph statement of why FlyttGo fits this vertical specifically. */
  fit: string;
  /** Recommended deployment substrate for the typical programme. */
  recommendedSubstrate: 'DM.02' | 'DM.03' | 'DM.04';
  /** Tier-ladder anchor (typical programme size). */
  typicalTier: 'L.04' | 'L.05' | 'L.06';
  /** Per-vertical regulatory frameworks. */
  regulatory: { code: string; framework: string; jurisdiction: string; body: string }[];
  /** Modules of highest relevance to this vertical (slugs). */
  modules: { slug: string; name: string; rationale: string }[];
  /** Sector-specific risk considerations the buyer wants surfaced. */
  risks: { code: string; title: string; body: string }[];
  /** Programme references — case-study slugs that touch this vertical. */
  caseRefs: string[];
  /** Procurement framework alignment specific to this vertical. */
  procurementRoutes: string[];
};

export const VERTICALS: Vertical[] = [
  // --------------------------------------------------------------------
  // VT.DF · Defense + intelligence
  // --------------------------------------------------------------------
  {
    slug: 'defense',
    code: 'VT.DF',
    name: 'Defense + intelligence',
    audience: 'Ministries of defence, intelligence agencies, NATO-aligned procurement bodies',
    emoji: '🛡️',
    positioning:
      'In-jurisdiction sovereign substrate (DM.03) by default, with confidential-compute uplift (DM.04) for ultra-sensitive workloads. ITAR / EAR-aware export-control posture, NATO STANAG-compatible interop primitives, and crypto-agility ahead of NSA CNSA 2.0 deadlines.',
    fit:
      'Defence procurement signs against three things in 2026: data sovereignty, supply-chain provenance, and post-quantum readiness. FlyttGo ships DM.03 sovereign deployment as table-stakes, SLSA L3 + Sigstore on every release artefact, and a public NIST FIPS 203/204/205 migration plan — three baseline asks already met before the engagement begins.',
    recommendedSubstrate: 'DM.04',
    typicalTier: 'L.06',
    regulatory: [
      { code: 'VT.DF.RG.01', framework: 'NATO STANAG 4774 / 4778',  jurisdiction: 'NATO',    body: 'Confidentiality labels + binding metadata for cross-domain information sharing. FlyttGo audit envelope carries STANAG-compatible classification labels.' },
      { code: 'VT.DF.RG.02', framework: 'ITAR / EAR (US)',           jurisdiction: 'United States', body: 'Export-control awareness for defence-trade items. Identra LoA-substantial flow includes export-control attribute exchange where the buyer holds a licensed jurisdiction list.' },
      { code: 'VT.DF.RG.03', framework: 'NSA CNSA 2.0',              jurisdiction: 'United States · NSA', body: 'Post-quantum mandate: full transition by 2030 (signing) / 2035 (everything). FlyttGo PQ.00 migration plan tracks this; hybrid classical+ML-DSA / ML-KEM in flight.' },
      { code: 'VT.DF.RG.04', framework: 'NCSC Cyber Essentials Plus + Secure by Design', jurisdiction: 'United Kingdom', body: 'UK MoD baseline; FlyttGo CE+ certified annually. Secure-by-Design assessment on file.' },
      { code: 'VT.DF.RG.05', framework: 'BSI IT-Grundschutz',         jurisdiction: 'Germany · BSI', body: 'Federal information security baseline. Module-level baselines mapped through Identra + audit envelope.' },
      { code: 'VT.DF.RG.06', framework: 'ANSSI · classified-network', jurisdiction: 'France · ANSSI', body: 'Restricted-network compatibility for sovereign deployments; sovereign substrate on French national datacenter under separate engagement.' },
    ],
    modules: [
      { slug: 'identra',  name: 'Identra · Identity',          rationale: 'Federation across NATO trust lists; eIDAS LoA-substantial + qualified signatures; export-control attribute exchange.' },
      { slug: 'civitas',  name: 'Civitas · Government Services', rationale: 'Inter-agency service bus with classification-label-aware routing under sovereign deployment.' },
      { slug: 'workverge', name: 'Workverge · Workforce',       rationale: 'Cleared-personnel rostering with role-based access to classification-bound shifts.' },
      { slug: 'ledgera',  name: 'Ledgera · Financial Ops',      rationale: 'Programme-level financial audit trail with multi-jurisdiction posting trees.' },
    ],
    risks: [
      { code: 'VT.DF.RK.01', title: 'Vendor-readable memory',            body: 'Standard-substrate deployments allow privileged operator access to tenant memory. DM.04 confidential-compute substrate eliminates this exposure entirely (TEE-isolated workloads, attestation-verifiable boot).' },
      { code: 'VT.DF.RK.02', title: 'Cryptographically-relevant quantum', body: 'Harvest-now-decrypt-later attacks already target high-confidentiality flows. PQ.00 migration prioritises long-confidentiality data first; TLS X25519MLKEM768 hybrid Q3 2026, full hybrid signing Q4 2026.' },
      { code: 'VT.DF.RK.03', title: 'Supply-chain compromise',           body: 'CycloneDX 1.6 SBOM published per release; Sigstore-signed images; SLSA L3 build provenance; OSV.dev + NVD cross-reference every six hours with auto-revocation.' },
      { code: 'VT.DF.RK.04', title: 'Cross-domain information flow',     body: 'STANAG 4774-compatible labels carried through the audit envelope; cross-domain solution integration available as a tier-bounded engagement add-on.' },
    ],
    caseRefs: [],
    procurementRoutes: [
      'NCSC Secure by Design assessment',
      'Crown Commercial Service (UK) defence-route contract vehicles',
      'BWI / BAAINBw (Germany) cooperation framework',
      'NATO Communications and Information (NCI) Agency framework participation',
    ],
  },

  // --------------------------------------------------------------------
  // VT.HC · Healthcare + life sciences
  // --------------------------------------------------------------------
  {
    slug: 'healthcare',
    code: 'VT.HC',
    name: 'Healthcare + life sciences',
    audience: 'Ministries of health, hospital networks, university health systems, clinical research consortia',
    emoji: '⚕️',
    positioning:
      'GDPR Article 9 (special-category data) baseline with HIPAA-equivalent controls for cross-Atlantic programmes. NHS DSP Toolkit Standards Met submission, FDA 21 CFR Part 11 audit trail, EU MDR 2017/745 compatibility for medical-device adjacent flows. Customer-cloud (DM.02) for most engagements; DM.04 confidential compute for multi-party clinical research.',
    fit:
      'Health-data deployments fail more often on data-residency and regulator hand-off than on technology. FlyttGo ships per-region data residency at the audit-envelope level, GDPR Article 28 DPA pre-signed with Article 9 addendum, and a regulator-friendly export pack — so the integrator can focus on clinical workflow, not procurement plumbing.',
    recommendedSubstrate: 'DM.02',
    typicalTier: 'L.05',
    regulatory: [
      { code: 'VT.HC.RG.01', framework: 'GDPR Article 9 + Article 28',  jurisdiction: 'European Union', body: 'Special-category personal-data processing terms; pre-signed DPA with Article 9 addendum and EU SCCs (2021/914) for any restricted transfer.' },
      { code: 'VT.HC.RG.02', framework: 'HIPAA + HITECH',                 jurisdiction: 'United States', body: 'Business Associate Agreement (BAA) available; HIPAA Security Rule baseline mapped through audit envelope + Identra access controls.' },
      { code: 'VT.HC.RG.03', framework: 'NHS DSP Toolkit',                jurisdiction: 'United Kingdom · NHS', body: 'Standards Met submission for the Civitas + EduPro surfaces deployed into NHS-adjacent programmes.' },
      { code: 'VT.HC.RG.04', framework: 'FDA 21 CFR Part 11',             jurisdiction: 'United States · FDA', body: 'Electronic records + electronic signatures. Append-only audit_log + Identra qualified signatures land Part 11 compatibility for clinical trial workflow.' },
      { code: 'VT.HC.RG.05', framework: 'EU MDR 2017/745',                jurisdiction: 'European Union', body: 'Medical Device Regulation interoperability for device-adjacent flows. FlyttGo platform itself is not a medical device; integrators using it for software-as-medical-device need a separate notified-body assessment.' },
      { code: 'VT.HC.RG.06', framework: 'ISO 27799 (health informatics)', jurisdiction: 'International', body: 'Information security management for health informatics. Aligned via the platform-level ISO 27001 ISMS.' },
    ],
    modules: [
      { slug: 'identra',  name: 'Identra · Identity',           rationale: 'Patient + clinician identity with eIDAS LoA-substantial; FIDO2 / WebAuthn for clinician auth on regulated workstations.' },
      { slug: 'civitas',  name: 'Civitas · Government Services', rationale: 'Citizen-health-services applications with NHS DSP Toolkit-aligned deployment.' },
      { slug: 'edupro',   name: 'EduPro · Education',           rationale: 'Continuing medical education + clinical training cohort analytics with differential-privacy aggregation.' },
      { slug: 'workverge', name: 'Workverge · Workforce',       rationale: 'Clinician shift coordination with EWTD + sector-specific labour-law constraints.' },
      { slug: 'payvera',  name: 'Payvera · Payments',           rationale: 'Regulated patient-pay flows; HIPAA-aware tokenisation for card-on-file workflows.' },
    ],
    risks: [
      { code: 'VT.HC.RK.01', title: 'Cross-border patient data',     body: 'EU patients + US-resident infrastructure is a non-starter under GDPR. FlyttGo enforces region-pinned data residency at the audit envelope; cross-border transfers gated by DPA + SCCs.' },
      { code: 'VT.HC.RK.02', title: 'Clinical research multi-party',  body: 'Multi-hospital data unions need to compute without any party seeing the others. DM.04 confidential compute + optional homomorphic-encryption analytics enable this without changing the clinical workflow.' },
      { code: 'VT.HC.RK.03', title: 'Regulator hand-off',             body: 'Health regulator audit windows compress timelines. FlyttGo audit envelope exports a regulator-friendly archive (signed manifest + chain-of-custody) on demand; integrators add the clinical-evidence layer.' },
      { code: 'VT.HC.RK.04', title: 'Software-as-medical-device boundary', body: 'FlyttGo is not a medical device. Integrators building SaMD on top need a separate notified-body assessment; FlyttGo provides the audit envelope and identity stack the SaMD assembly needs.' },
    ],
    caseRefs: [],
    procurementRoutes: [
      'NHS Shared Business Services framework',
      'EU Health Data Space (EHDS) compatible procurement',
      'CCS G-Cloud 14 Cloud Software lot',
      'Hospital Trust direct engagement with NHS DSP Toolkit Standards Met evidence',
    ],
  },

  // --------------------------------------------------------------------
  // VT.FN · Financial services
  // --------------------------------------------------------------------
  {
    slug: 'financial',
    code: 'VT.FN',
    name: 'Financial services',
    audience: 'Banks, insurers, payment institutions, fintech operators, treasury offices',
    emoji: '🏛️',
    positioning:
      'PCI DSS Level 1 controls baseline, PSD2 SCA / open-banking flows live via Payvera, ISO 20022 across SEPA + national rails, SOX-aligned audit envelope. Customer-cloud (DM.02) for tier-2 banks; DM.03 sovereign for systemic operators; DM.04 confidential compute for treasury + AML flows where even the operator must not see plaintext.',
    fit:
      'Regulated finance signs against three things in 2026: PSD2 / PSD3 readiness, FFIEC / EBA-aligned operational resilience, and audit reproducibility. Payvera ships SCA + ISO 20022 + SCT-Inst; DORA-aligned operational resilience controls are tabletop-tested quarterly; the append-only audit envelope replays end-to-end for any regulator.',
    recommendedSubstrate: 'DM.03',
    typicalTier: 'L.05',
    regulatory: [
      { code: 'VT.FN.RG.01', framework: 'PCI DSS v4.0 Level 1',          jurisdiction: 'International · PCI SSC', body: 'Cardholder-data processing baseline. Payvera deployments achieve PCI DSS L1 with the platform substrate within scope; tokenisation removes most tenant-side scope.' },
      { code: 'VT.FN.RG.02', framework: 'PSD2 + RTS-SCA',                 jurisdiction: 'European Union', body: 'Strong customer authentication for online payments; transaction risk analysis (TRA) exemption flows tightened in CL.035.' },
      { code: 'VT.FN.RG.03', framework: 'PSD3 + Payment Services Regulation', jurisdiction: 'European Union', body: 'Tracking finalisation; ready when published. Open-banking PSP federation in the platform roadmap (RM.P04).' },
      { code: 'VT.FN.RG.04', framework: 'DORA (Digital Operational Resilience Act)', jurisdiction: 'European Union', body: 'Operational-resilience controls aligned; quarterly tabletop exercise log; ICT-third-party register published in the trust desk.' },
      { code: 'VT.FN.RG.05', framework: 'FFIEC IT Handbook',              jurisdiction: 'United States · FFIEC', body: 'IT examination handbook alignment for US-regulated financial institutions; SOC 2 Type II + ISO 27001 cover the platform-level scope.' },
      { code: 'VT.FN.RG.06', framework: 'Basel III ICAAP / BCBS 239',    jurisdiction: 'International · BCBS', body: 'Capital adequacy + risk-data aggregation. Ledgera produces auditor-friendly export packs aligned with BCBS 239 risk-data aggregation principles.' },
      { code: 'VT.FN.RG.07', framework: 'MAS-TRMG',                        jurisdiction: 'Singapore · MAS', body: 'Technology Risk Management Guidelines for MAS-licensed institutions; sovereign-region deployment in Singapore on customer engagement.' },
      { code: 'VT.FN.RG.08', framework: 'SOX Section 404',                 jurisdiction: 'United States · SEC', body: 'Internal-controls audit trail. Append-only audit_log + segregation-of-duties via Identra roles satisfy 404 IT-controls requirements.' },
    ],
    modules: [
      { slug: 'payvera',  name: 'Payvera · Payments',          rationale: 'PSD2 SCA, SEPA + SCT-Inst + national rails, anomaly + fraud scoring (AG.S.05) with HITL on high-risk transactions.' },
      { slug: 'ledgera',  name: 'Ledgera · Financial Ops',     rationale: 'Multi-jurisdiction accounting (NO Kontoplan, UK FRS-102, US GAAP, IFRS), SAF-T / VAT-100 statutory exports, BCBS 239 risk-data aggregation pack.' },
      { slug: 'identra',  name: 'Identra · Identity',          rationale: 'KYC + qualified signature for high-value transactions; FIDO2 step-up on admin paths; OIDC federation with bank workforce IdPs.' },
      { slug: 'civitas',  name: 'Civitas · Government Services', rationale: 'Treasury + tax-authority integration where banks operate as collection agents.' },
    ],
    risks: [
      { code: 'VT.FN.RK.01', title: 'Privileged-insider attack vector',  body: 'Treasury + AML flows expose card-holder + investigation data to platform operators by default. DM.04 confidential compute removes this vector — workloads run inside hardware-enforced TEEs the vendor cannot read.' },
      { code: 'VT.FN.RK.02', title: 'Regulator examination cycle',       body: 'FFIEC + EBA examinations compress timelines. The append-only audit envelope replays any transaction end-to-end with chain-of-custody preserved; signed export pack ships within one business day.' },
      { code: 'VT.FN.RK.03', title: 'PSD3 transition exposure',          body: 'PSD2 → PSD3 migration is a cliff for hand-rolled SCA implementations. Payvera abstracts the SCA flow; PSD3 lands as a platform release, not a tenant-side rebuild.' },
      { code: 'VT.FN.RK.04', title: 'BCBS 239 risk-data aggregation',     body: 'Risk-data aggregation completeness + accuracy is the single most-cited examination finding. Ledgera produces the BCBS 239 export pack with provenance manifest baked in.' },
    ],
    caseRefs: [],
    procurementRoutes: [
      'EBA Outsourcing Register documentation pack',
      'FCA Operational Resilience submission alignment',
      'MAS-TRMG due-diligence questionnaire pre-fill via /ask-flyttgo',
      'Crown Commercial Service Treasury route for UK government banking adjacencies',
    ],
  },
];
