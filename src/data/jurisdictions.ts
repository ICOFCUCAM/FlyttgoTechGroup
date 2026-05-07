export type Jurisdiction = {
  slug: string;
  code: string;
  name: string;
  region: string;
  flag: string;
  positioning: string;
  highlights: string[];
  procurementFrameworks: { code: string; name: string; body: string }[];
  complianceFrameworks: { code: string; name: string; body: string }[];
  deploymentSubstrates: ('DM.01' | 'DM.02' | 'DM.03')[];
  caseRefs: string[];
};

export const JURISDICTIONS: Jurisdiction[] = [
  {
    slug: 'united-kingdom',
    code: 'JU.UK',
    name: 'United Kingdom',
    region: 'Western Europe',
    flag: '🇬🇧',
    positioning:
      'FlyttGo platform infrastructure deployable through the Crown Commercial Service framework set — DPS, G-Cloud 14 and CCS supplier routes — with UK data residency and ICO-aligned data-protection posture.',
    highlights: [
      'G-Cloud 14 supplier with public-sector schedule',
      'DPS direct-award routes for capability scope under threshold',
      'UK GDPR + DPA 2018 alignment, ICO registered',
      'Cyber Essentials Plus + ISO 27001 certified',
    ],
    procurementFrameworks: [
      { code: 'JU.UK.PR.01', name: 'G-Cloud 14',                body: 'Cloud Hosting + Cloud Software lots covering Transify, Civitas, Identra, Payvera, EduPro and Workverge.' },
      { code: 'JU.UK.PR.02', name: 'Dynamic Purchasing System', body: 'Direct-award routes via DPS for capability work under contract threshold; full mini-competition for above-threshold programmes.' },
      { code: 'JU.UK.PR.03', name: 'CCS Supplier · pending',     body: 'Crown Commercial Service supplier accreditation in flight for Q3 2026; broader cross-departmental procurement once landed.' },
    ],
    complianceFrameworks: [
      { code: 'JU.UK.CO.01', name: 'UK GDPR + DPA 2018',         body: 'ICO-registered controller / processor relationship. UK SCCs + International Data Transfer Addendum (IDTA) for any restricted transfer.' },
      { code: 'JU.UK.CO.02', name: 'Cyber Essentials Plus',     body: 'CE+ certified; refreshed annually. Required for HMG procurement and most NHS digital workstreams.' },
      { code: 'JU.UK.CO.03', name: 'NHS DSP Toolkit',            body: 'Standards Met submission for the EduPro + Civitas surfaces deployed into NHS-adjacent programmes.' },
    ],
    deploymentSubstrates: ['DM.01', 'DM.02', 'DM.03'],
    caseRefs: ['CS.05'],
  },
  {
    slug: 'european-union',
    code: 'JU.EU',
    name: 'European Union',
    region: 'Mainland Europe',
    flag: '🇪🇺',
    positioning:
      'EU-wide deployment posture with eIDAS LoA-mapped identity flows, GDPR-aligned data processing, OJEU procurement compatibility and EU-resident substrate. Mainland regions: Frankfurt + Amsterdam.',
    highlights: [
      'OJEU framework supplier across digital procurement notices',
      'eIDAS Trust List-aligned issuance via Identra',
      'GDPR Article 28 DPA pre-signed; EU SCCs (2021/914) annexed',
      'Workloads stay inside EU substrate by default',
    ],
    procurementFrameworks: [
      { code: 'JU.EU.PR.01', name: 'OJEU procurement notices',   body: 'Listed supplier across digital infrastructure procurement notices in DE, FR, NL, BE, IT, ES.' },
      { code: 'JU.EU.PR.02', name: 'EU Cloud Code of Conduct',   body: 'Adherent to EU Cloud Code of Conduct (verified Level 2). Provides standardised procurement compatibility checklist.' },
      { code: 'JU.EU.PR.03', name: 'GAIA-X compatibility',       body: 'GAIA-X Self-Description compatibility for sovereign data-space-aligned procurement.' },
    ],
    complianceFrameworks: [
      { code: 'JU.EU.CO.01', name: 'GDPR · Article 28',          body: 'Controller / processor terms pre-signed; EU SCCs (2021/914) annexed for any restricted transfer outside the EEA.' },
      { code: 'JU.EU.CO.02', name: 'eIDAS · Trust List',          body: 'Qualified-signature issuance via Identra; Qualified Trust Service Provider lineage on file under MNDA.' },
      { code: 'JU.EU.CO.03', name: 'NIS2 / DORA',                 body: 'NIS2 essential-entity classification + DORA-aligned operational resilience controls; tabletop exercise log refreshed quarterly.' },
    ],
    deploymentSubstrates: ['DM.01', 'DM.02', 'DM.03'],
    caseRefs: ['CS.03', 'CS.05', 'CS.06'],
  },
  {
    slug: 'norway',
    code: 'JU.NO',
    name: 'Norway',
    region: 'Nordic',
    flag: '🇳🇴',
    positioning:
      'Headquartered in Oslo. Norwegian-resident substrate available for sovereign-class deployments; alignment with Digitaliseringsdirektoratet (Digdir) reference architecture and Buypass-compatible identity flows.',
    highlights: [
      'Oslo HQ and primary Nordic operations',
      'Digdir reference-architecture alignment',
      'Buypass + Bank-ID compatible issuance via Identra',
      'Norwegian-resident sovereign substrate available',
    ],
    procurementFrameworks: [
      { code: 'JU.NO.PR.01', name: 'Doffin notices',             body: 'Listed supplier across central government and municipal Doffin procurement notices for digital infrastructure.' },
      { code: 'JU.NO.PR.02', name: 'Statens Innkjøpssenter',     body: 'Master agreement compatibility for cross-departmental cloud and platform infrastructure routes.' },
    ],
    complianceFrameworks: [
      { code: 'JU.NO.CO.01', name: 'Personvernforordningen',     body: 'GDPR as transposed into Norwegian law; Datatilsynet reporting channels established.' },
      { code: 'JU.NO.CO.02', name: 'Sikkerhetsloven',            body: 'Compatibility for security-classified workloads up to NEK-relevant level under the sovereign substrate.' },
    ],
    deploymentSubstrates: ['DM.01', 'DM.02', 'DM.03'],
    caseRefs: ['CS.01'],
  },
  {
    slug: 'saudi-arabia',
    code: 'JU.SA',
    name: 'Saudi Arabia',
    region: 'GCC',
    flag: '🇸🇦',
    positioning:
      'In-Kingdom sovereign substrate with workloads resident in KSA, NCA-aligned cybersecurity controls, SAMA-compatible payment orchestration via Payvera and Vision 2030 digital-government alignment.',
    highlights: [
      'In-Kingdom sovereign datacenter (Riyadh) deployment',
      'NCA cybersecurity controls (ECC + CCC) aligned',
      'SAMA-compatible payment orchestration via Payvera',
      'Arabic-language UX surface across every module',
    ],
    procurementFrameworks: [
      { code: 'JU.SA.PR.01', name: 'Etimad portal',              body: 'Listed supplier across digital infrastructure procurement notices on the Etimad portal.' },
      { code: 'JU.SA.PR.02', name: 'NUPP alignment',             body: 'National Unified Procurement Procedure compatibility for cross-ministry cloud + platform programmes.' },
    ],
    complianceFrameworks: [
      { code: 'JU.SA.CO.01', name: 'NCA · ECC + CCC',            body: 'Essential Cybersecurity Controls + Cloud Cybersecurity Controls aligned; assessor evidence pack available under MNDA.' },
      { code: 'JU.SA.CO.02', name: 'PDPL (Personal Data Protection Law)', body: 'In-Kingdom data residency enforced by default for personal data; Data Sharing Office reporting channels established.' },
      { code: 'JU.SA.CO.03', name: 'SAMA · Cyber Security Framework', body: 'CSF-aligned operational controls on Payvera deployments handling regulated payment flows.' },
    ],
    deploymentSubstrates: ['DM.03'],
    caseRefs: ['CS.02'],
  },
  {
    slug: 'united-arab-emirates',
    code: 'JU.AE',
    name: 'United Arab Emirates',
    region: 'GCC',
    flag: '🇦🇪',
    positioning:
      'Dubai sovereign substrate with TDRA-aligned operational controls, DIFC-compatible data-protection posture and CBUAE-aligned payment orchestration. Active across federal and emirate-level programmes.',
    highlights: [
      'In-UAE sovereign datacenter (Dubai) deployment',
      'TDRA cybersecurity policy alignment',
      'DIFC + ADGM data-protection compatibility',
      'CBUAE payment-service orchestration via Payvera',
    ],
    procurementFrameworks: [
      { code: 'JU.AE.PR.01', name: 'Federal procurement portal', body: 'Listed supplier across federal procurement notices for digital platform infrastructure.' },
      { code: 'JU.AE.PR.02', name: 'Emirate-level frameworks',   body: 'Compatibility for Dubai and Abu Dhabi emirate-level cloud and platform procurement frameworks.' },
    ],
    complianceFrameworks: [
      { code: 'JU.AE.CO.01', name: 'TDRA cybersecurity policy', body: 'Telecommunications and Digital Government Regulatory Authority policy alignment; assessor evidence pack on file.' },
      { code: 'JU.AE.CO.02', name: 'DIFC + ADGM data law',       body: 'DIFC Data Protection Law (DP Law 5/2020) and ADGM Data Protection Regulations 2021 alignment.' },
      { code: 'JU.AE.CO.03', name: 'CBUAE payment orchestration', body: 'Central Bank of the UAE retail payment-services regulation alignment for Payvera deployments.' },
    ],
    deploymentSubstrates: ['DM.03'],
    caseRefs: ['CS.02'],
  },
  {
    slug: 'south-africa',
    code: 'JU.ZA',
    name: 'South Africa',
    region: 'Africa',
    flag: '🇿🇦',
    positioning:
      'Sovereign-class deployment substrate in Johannesburg, POPIA-aligned data-protection posture, SARS-compatible financial-operations envelope and Treasury-friendly procurement routes.',
    highlights: [
      'Johannesburg sovereign datacenter deployment',
      'POPIA + Information Regulator alignment',
      'SARS-compatible financial-operations envelope',
      'BEE-supplier compatibility via local partner network',
    ],
    procurementFrameworks: [
      { code: 'JU.ZA.PR.01', name: 'National Treasury frameworks', body: 'RT contract compatibility for cross-departmental cloud and platform infrastructure procurement.' },
      { code: 'JU.ZA.PR.02', name: 'BEE supplier alignment',      body: 'Partner-network supplier alignment to support BEE compliance on bid responses.' },
    ],
    complianceFrameworks: [
      { code: 'JU.ZA.CO.01', name: 'POPIA',                       body: 'Information Regulator-aligned data-protection posture; in-jurisdiction data residency enforced for personal information.' },
      { code: 'JU.ZA.CO.02', name: 'SARS financial alignment',    body: 'Financial-operations envelope (Ledgera) aligned with SARS reporting expectations.' },
    ],
    deploymentSubstrates: ['DM.02', 'DM.03'],
    caseRefs: ['CS.04'],
  },
];
