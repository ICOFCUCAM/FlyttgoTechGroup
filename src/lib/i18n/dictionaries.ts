import type { LocaleCode } from './locales';

/**
 * Translation dictionaries. Keys are flat — grouped only by convention
 * with dot notation (e.g. 'nav.platforms'). English is the source of
 * truth; missing keys in other locales fall back to the English string.
 *
 * Scope focus (high-visibility surfaces first):
 *  - utility bar
 *  - primary navigation
 *  - hero
 *  - footer headings + legal + enterprise strip
 *  - common CTAs used across the site
 */

export type Dictionary = Record<string, string>;

const en: Dictionary = {
  // Utility bar
  'utility.tagline': 'Platform Infrastructure · Enterprise & Public Sector',
  'utility.language': 'Language',

  // Primary nav
  'nav.home': 'Home',
  'nav.platforms': 'Platforms',
  'nav.industries': 'Industries',
  'nav.deployment': 'Deployment',
  'nav.technology': 'Technology',
  'nav.insights': 'Insights',
  'nav.company': 'Company',
  'nav.contact': 'Contact',
  'nav.search': 'Search',
  'nav.signin': 'Sign in',
  'nav.cta.primary': 'Deploy Your Platform',
  'nav.feature.title': 'Platform Ecosystem',
  'nav.feature.description':
    'Modular infrastructure platforms plus the FlyttGo marketplace — licensed independently, deployed together.',
  'nav.feature.cta': 'Explore the ecosystem',
  'nav.group.infra': 'Infrastructure Platforms',
  'nav.group.marketplace': 'Marketplace Platform',

  // Hero
  'hero.eyebrow': 'Platform infrastructure · IaaS · SaaS · PaaS · Sovereign',
  'hero.title.part1': 'Cloud platform infrastructure for enterprises',
  'hero.title.part2': 'and public-sector deployments.',
  'hero.subtitle':
    'IaaS · SaaS · PaaS · sovereign environments — the same eight modules deployed your way across the Americas, Europe, Africa, MENA and APAC. Mobility, workforce, identity, payments, government services, education and financial operations on one orchestration layer.',
  'hero.cta.primary': 'Explore Platform Ecosystem',
  'hero.cta.secondary': 'Request Partnership Discussion',

  // Footer
  'footer.tagline':
    'Modular platform infrastructure for logistics, education, government and enterprise operators — deployed across Europe, Africa and the Middle East.',
  'footer.group.platforms': 'Platforms',
  'footer.group.industries': 'Industries',
  'footer.group.company': 'Company',
  'footer.group.resources': 'Resources',
  'footer.group.enterprise': 'Enterprise navigation',
  'footer.group.deployment': 'Deployment readiness',
  'footer.group.compliance': 'Compliance readiness',
  'footer.group.support': 'Support channels',
  'footer.enterprise': 'Enterprise',
  'footer.certifications': 'Certifications & compliance',
  'footer.regions': 'Deployment regions',
  'footer.status': 'All systems operational',
  'footer.deploy': 'Deploy your platform',
  'footer.regulatory.company': 'Company',
  'footer.regulatory.vat': 'VAT',
  'footer.regulatory.security': 'Security',
  'footer.regulatory.support': 'Support',
  'footer.legal.privacy': 'Privacy',
  'footer.legal.terms': 'Terms',
  'footer.legal.security': 'Security',
  'footer.legal.compliance': 'Compliance',
  'footer.legal.contact': 'Contact',
  'footer.social': 'Social channels',

  // Home sections
  'home.trust.heading': 'Deployed for',
  'home.platform.eyebrow': 'Platform Ecosystem',
  'home.platform.title.part1': 'One infrastructure ecosystem.',
  'home.platform.title.part2': 'Modular deployment platforms.',
  'home.platform.description':
    'Governments, universities, transport operators and marketplace builders deploy FlyttGo platforms as modules.',
  'home.platform.cta': 'See the full ecosystem',
  'home.deployment.eyebrow': 'Deployment Architecture',
  'home.deployment.title': 'Deploy on your terms.',
  'home.deployment.description': 'Three deployment modes to match any procurement or sovereignty posture.',
  'home.deployment.cta': 'Deployment details',
  'home.industries.eyebrow': 'Industries Served',
  'home.industries.title': 'Built for institutions and operators.',
  'home.industries.title.part1': 'Built for the institutions that ',
  'home.industries.title.part2': 'actually run cities and regions.',
  'home.industries.description':
    'Ministries, municipalities, universities and transport operators deploy FlyttGo platforms at pilot, metro or national scale.',
  'home.industries.cta': 'Industries overview',
  'home.tech.eyebrow': 'Technology Infrastructure',
  'home.tech.title': 'Cloud-native platform stack.',
  'home.tech.title.part1': 'A six-layer stack ',
  'home.tech.title.part2': 'engineered to be deployed.',
  'home.tech.description': 'Multi-tenant, region-aware, standards-based.',
  'home.tech.cta': 'Architecture overview',
  'home.faq.eyebrow': 'Procurement & Deployment FAQ',
  'home.faq.title': 'Common questions from deployment partners.',
  'home.cta.eyebrow': 'Ready When You Are',
  'home.cta.title.part1': 'Start Deploying Your Platform',
  'home.cta.title.part2': 'Infrastructure Today',
  'home.cta.primary': 'Deploy your platform infrastructure',
  'home.cta.secondary': 'Schedule infrastructure architecture discussion',

  // Government & public-sector surface (GV.00)
  'government.hero.eyebrow': 'Government & Public Sector',
  'government.hero.title.part1': 'Modular platform infrastructure for ',
  'government.hero.title.part2': 'sovereign-ready public-sector deployment.',
  'government.hero.description':
    'Identity, payments, mobility, workforce, education, government services and financial operations — orchestrated through the FlyttGoTech Core. Three deployment modes: managed SaaS, customer cloud, sovereign national datacenter.',

  // GV.01 Programme positioning
  'government.gv01.eyebrow': 'Programme positioning',
  'government.gv01.title.part1': 'Public-sector platform infrastructure, ',
  'government.gv01.title.part2': 'deployed under your jurisdiction.',
  'government.gv01.body1':
    'FlyttGo Technologies Group AB designs and operates modular cloud platform infrastructure deployed across European, African and Middle Eastern public-sector programmes. The capability surface this page describes is in production today; the deployment posture is the same one our regulator-bounded installations operate under.',
  'government.gv01.body2':
    'Eight independently licensed modules — identity, payments, mobility, workforce, education, government services, financial operations and a regulated marketplace — are orchestrated through the FlyttGoTech Core. Three deployment modes accommodate every sovereignty posture from managed SaaS in EU primary regions through to sovereign national datacenters under national HSM and national-eID integration.',
  'government.gv01.recipients.heading': 'Recipients of this surface',
  'government.gv01.br01.label': 'Ministry of Digital Affairs',
  'government.gv01.br01.context': 'National digital-strategy programmes · cross-ministry data infrastructure',
  'government.gv01.br02.label': 'Ministry of Transport',
  'government.gv01.br02.context': 'Transport-data backbones · regional dispatch · statutory mobility reporting',
  'government.gv01.br03.label': 'Ministry of Education',
  'government.gv01.br03.context': 'Admissions consolidation · scholarship orchestration · institutional analytics',
  'government.gv01.br04.label': 'Central Digitalisation Agency',
  'government.gv01.br04.context': 'National-eID rollouts · government-services portals · sovereign cloud programmes',
  'government.gv01.br05.label': 'Municipal Modernisation Programme',
  'government.gv01.br05.context': 'Citizen services unification · council operations · residents portals',
  'government.gv01.br06.label': 'Public-Sector Procurement Office',
  'government.gv01.br06.context': 'Framework agreements · pilot procurement · multi-tier deployment commitments',

  // GV.02 Service-model declaration
  'government.gv02.eyebrow': 'Service-model declaration',
  'government.gv02.title.part1': 'Four service postures. ',
  'government.gv02.title.part2': 'Pick the one your jurisdiction operates under.',
  'government.gv02.description':
    'Every public-sector deployment lands against one of these postures. Each is a contractual frame, not a marketing category — the sovereignty, key custody and regulator-hand-off framework all derive from the chosen posture.',
  'government.gv02.sm01.title': 'SaaS capability',
  'government.gv02.sm01.service': 'Managed regional tenants',
  'government.gv02.sm01.body': 'FlyttGo operates the platform; the recipient consumes operational services with statutory residency. Region-aware tenants in EU primary regions, with optional regional uplift to AF, MENA or APAC.',
  'government.gv02.sm01.cta': 'Managed deployment posture',
  'government.gv02.sm02.title': 'PaaS orchestration architecture',
  'government.gv02.sm02.service': 'FlyttGoTech Core substrate',
  'government.gv02.sm02.body': 'The FlyttGoTech Core exposes an orchestration substrate — identity broker, audit log, event bus, policy engine, workflow runner — that the recipient extends with internal services or in-house modules.',
  'government.gv02.sm02.cta': 'Orchestration architecture',
  'government.gv02.sm03.title': 'IaaS-compatible deployment environments',
  'government.gv02.sm03.service': 'Customer cloud or sovereign substrate',
  'government.gv02.sm03.body': "Platform installs into the recipient's existing AWS, Azure, GCP or bare-metal sovereign environment under their tenancy. BYOK / HYOK key custody. Audit and patch cadence honour the recipient's change control.",
  'government.gv02.sm03.cta': 'Customer-cloud posture',
  'government.gv02.sm04.title': 'Sovereign national infrastructure readiness',
  'government.gv02.sm04.service': 'Certified national datacenter',
  'government.gv02.sm04.body': 'Installation inside certified national datacenters under national HSM, national-eID integration, regulator-bounded change windows, and Cloud-Act-exempt operations. Full data residency in jurisdiction.',
  'government.gv02.sm04.cta': 'Sovereign deployment posture',

  // GV.04b Orchestration architecture
  'government.gv04b.eyebrow': 'Orchestration architecture',
  'government.gv04b.title.part1': 'Eight modules. ',
  'government.gv04b.title.part2': 'One orchestration core.',
  'government.gv04b.description':
    'Service-delivery surface · FlyttGoTech Core (PaaS) · deployment substrate (IaaS-compatible) · sovereignty posture. The same architecture every public-sector deployment lands against, regardless of which module mix the programme licenses.',

  // GV.05 Sovereignty framework
  'government.gv05.eyebrow': 'Sovereignty framework',
  'government.gv05.title.part1': 'Sovereignty as a ',
  'government.gv05.title.part2': 'contractual instrument.',
  'government.gv05.description':
    'The four declarations below are not marketing posture. Each is a clause carried in every contract instrument FlyttGo executes for a public-sector deployment, with a corresponding artefact furnished on procurement request.',
  'government.gv05.sv01.title': 'Data residency',
  'government.gv05.sv01.posture': 'Per-mode jurisdiction declaration',
  'government.gv05.sv01.detail': "Managed SaaS keeps personal data in EU primary regions with optional regional uplift. Customer-cloud deployments inherit the recipient's tenancy region. Sovereign deployments operate 100% in-jurisdiction with explicit non-replication clauses across borders.",
  'government.gv05.sv02.title': 'Encryption-key custody',
  'government.gv05.sv02.posture': 'FlyttGo KMS · BYOK / HYOK · National HSM',
  'government.gv05.sv02.detail': "Managed deployments use FlyttGo KMS with per-tenant data encryption keys. Customer-cloud deployments support BYOK and HYOK with the recipient's KMS as root. Sovereign deployments operate against a national HSM under regulator-supervised key ceremony.",
  'government.gv05.sv03.title': 'Cloud-Act exposure',
  'government.gv05.sv03.posture': 'Declared per deployment mode',
  'government.gv05.sv03.detail': "Managed SaaS is potentially exposed to extraterritorial subpoena in line with the host hyperscaler's legal posture. Customer-cloud follows the recipient's tenancy. Sovereign deployments inside certified national datacenters are Cloud-Act-exempt by construction.",
  'government.gv05.sv04.title': 'Right-to-audit framework',
  'government.gv05.sv04.posture': '30-day notice · regulator-bounded',
  'government.gv05.sv04.detail': "Every contract instrument carries a standard right-to-audit clause. The recipient or its national audit office may audit on 30-day notice. FlyttGo furnishes SOC 2 Type II report, ISO 27001 certificate, penetration-test executive summary, GDPR DPIA and configuration baseline on request.",
  'government.gv05.cta.orchestration': 'Open orchestration architecture',
  'government.gv05.cta.brief': 'Capability brief · GCB.00',
  'government.gv05.footer': 'Full sovereignty posture detailed under NDA in the Government Capability Brief (GCB.00) · §4 of the Pilot Deployment Partnership Proposal (PP.00) · per-deployment addenda.',

  // GV.08 Reference programme shapes
  'government.gv08.eyebrow': 'Reference programme shapes',
  'government.gv08.title.part1': 'Three programme shapes, ',
  'government.gv08.title.part2': 'anonymised for public circulation.',
  'government.gv08.description': "Full reference details — recipient, contract instrument, statutory metrics, audit outcomes — are released only under NDA. Request the reference dossier via the engagement intake below.",
  'government.gv08.scale': 'Scale',
  'government.gv08.modules': 'Modules',
  'government.gv08.mode': 'Deployment mode',
  'government.gv08.classification': 'Confidential · reference shape · full details under NDA',

  // GV.09 Engagement intake
  'government.gv09.eyebrow': 'Engagement intake',
  'government.gv09.title.part1': 'Three steps from capability brief ',
  'government.gv09.title.part2': 'to signed contract instrument.',
  'government.gv09.description':
    'The engagement model is a documented sequence — each step has a named output and a defined duration. No step is skipped; no step is shortened to accommodate quarterly targets. Public-sector procurement runs on evidence, not on momentum.',
  'government.gv09.eg01.title': 'Capability deep-dive',
  'government.gv09.eg01.duration': '60 minutes',
  'government.gv09.eg01.body': "A working session between the recipient's technical lead and the FlyttGo platform team. Walks the capability brief against the recipient's stated programme, names the constraints, and tests the deployment posture against the recipient's regulatory frame.",
  'government.gv09.eg01.artefact': 'Output: working notes · capability scoring',
  'government.gv09.eg02.title': 'Pilot scoping',
  'government.gv09.eg02.duration': '2–4 weeks · NDA-bound',
  'government.gv09.eg02.body': "A formal scoping engagement under NDA. Defines the pilot scope, success criteria, sovereignty posture, integration anchors, and the commercial envelope. Output is a written pilot brief and a price-shape proposal — both reviewable by the recipient's procurement and legal offices.",
  'government.gv09.eg02.artefact': 'Output: written pilot brief · price-shape proposal',
  'government.gv09.eg03.title': 'Procurement engagement',
  'government.gv09.eg03.duration': 'Per tier · 60 days – 18 months',
  'government.gv09.eg03.body': 'Moves to one of the five procurement tiers — pilot, city, regional, national, or white-label — with the corresponding contract instrument. The pilot proposal (PP.00) becomes the master scope reference; the contract instrument anchors data residency, key custody, audit rights and sovereignty posture.',
  'government.gv09.eg03.artefact': 'Output: signed order form · contract instrument',
  'government.gv09.cta.primary': 'Open public-sector engagement intake',
  'government.gv09.cta.procurement': 'Procurement compatibility surface',
  'government.gv09.cta.brief': 'Capability brief · GCB.00',
  'government.gv09.cta.response': 'Engineering response within one business day',
  'government.gv09.footer': 'Public-sector engagement desk · platform@flyttgotech.com · audit log retains every authentication and engagement event',

  // Industry sector page template
  'sector.challenges': 'Typical challenges',
  'sector.outcomes': 'FlyttGo outcomes',
  'sector.platforms.heading': 'Platforms deployed for this sector',
  'sector.platforms.subheading': 'Modular platforms, sector-sized.',
  'sector.deployment.heading': 'Deployment pattern',
  'sector.cta.description':
    'Share your program context and our deployment engineering team will respond within one business day with a scoping outline and reference architecture.',
  'sector.cta.button': 'Start a deployment conversation',
  'sector.cta.review': 'Review deployment architecture',

  // Deployment mode page template
  'mode.characteristics': 'Characteristics',
  'mode.timeline': 'Timeline',
  'mode.regions': 'Region coverage',
  'mode.scope': 'Scope a deployment',
  'mode.bestFit': 'Best fit',

  // Status page
  'status.eyebrow': 'Platform status',
  'status.title': 'All systems operational.',
  'status.description':
    'Real-time status for FlyttGo Technologies Group platform infrastructure. Incidents, maintenance windows and regional degradations are published here before they reach customer dashboards.',
  'status.components': 'Component health',
  'status.updated': 'Updated',
  'status.operational': 'Operational',
  'status.incidents.title': 'Incident history & enterprise SLAs',
  'status.incidents.description':
    'Post-mortems, uptime dashboards and per-region SLA reports are available to enterprise customers inside the deployment portal.',
  'status.incidents.cta': 'Request SLA documentation',

  // Legal pages — shared
  'legal.effective': 'Effective',
  'legal.privacy.eyebrow': 'Legal · Privacy',
  'legal.privacy.title': 'How FlyttGo handles your data — transparently.',
  'legal.terms.eyebrow': 'Legal · Terms',
  'legal.terms.title': 'Terms of service for flyttgotech.com.',
  'legal.security.eyebrow': 'Trust · Security',
  'legal.security.title': 'Security engineered for national-scale deployments.',
  'legal.compliance.eyebrow': 'Trust · Compliance',
  'legal.compliance.title': 'Compliance across EU, AF and MENA jurisdictions.',

  // Company sub-pages
  'company.leadership.eyebrow': 'Company · Leadership',
  'company.leadership.title': 'Operating the platform layer that other organisations deploy on.',
  'company.careers.eyebrow': 'Company · Careers',
  'company.careers.title': 'Help operators deploy national-scale platforms — without the years-long build.',
  'company.careers.openings': 'Current openings',
  'company.press.eyebrow': 'Company · Press',
  'company.press.title': 'Press & media resources.',
  'company.press.boilerplate': 'Company boilerplate',

  // Sitemap page
  'sitemap.eyebrow': 'Navigation',
  'sitemap.title': 'Every page on flyttgotech.com, in one view.',
  'sitemap.description':
    'This is the human-readable companion to our XML sitemap. Use it to orient yourself across the FlyttGo Technologies Group platform ecosystem, industries, deployment modes, company and trust documentation.',
  'sitemap.machineReadable': 'Looking for the machine-readable version?',

  // Platform detail pages (chrome — product copy stays in data/platforms.ts)
  'platform.back': 'Back to Platform Ecosystem',
  'platform.hero.platform': 'Platform',
  'platform.hero.production': 'Production-ready',
  'platform.cta.start': 'Start Deployment',
  'platform.cta.modules': 'Explore Modules',
  'platform.modules.eyebrow': 'Platform Modules',
  'platform.modules.title': 'Modular infrastructure you can activate independently.',
  'platform.workflow.eyebrow': 'Deployment Workflow',
  'platform.workflow.title': 'From kickoff to production in four structured steps.',
  'platform.workflow.step': 'Step',
  'platform.tech.eyebrow': 'Technical Architecture',
  'platform.tech.title': '{name} runs on the FlyttGo cloud-native stack.',
  'platform.tech.description':
    'Every layer is designed for scalability, multi-tenant isolation and regional deployment portability across Europe, Africa and the Middle East.',
  'platform.arch.layers': 'Architecture Layers',
  'platform.case.eyebrow': 'Case Studies',
  'platform.case.title': 'Organizations already deploying {name}.',
  'platform.pricing.eyebrow': 'Deployment Tiers',
  'platform.pricing.title': 'Scale from pilot to national infrastructure.',
  'platform.pricing.description':
    'Every tier includes multi-tenant architecture, white-label branding and regional deployment compatibility.',
  'platform.pricing.popular': 'Most Popular',
  'platform.related.title': 'Explore other platforms in the ecosystem',
  'platform.form.received': 'Request received',
  'platform.form.respond': 'Our {platform} deployment team will respond shortly.',
  'platform.form.another': 'Submit another inquiry',

  // Common CTAs
  'cta.learnMore': 'Learn more',
  'cta.contact': 'Contact us',
  'cta.back': 'Back',
};

const no: Dictionary = {
  'utility.tagline': 'Plattforminfrastruktur · Bedrift og offentlig sektor',
  'utility.language': 'Språk',

  'nav.platforms': 'Plattformer',
  'nav.industries': 'Bransjer',
  'nav.deployment': 'Utrulling',
  'nav.technology': 'Teknologi',
  'nav.company': 'Selskap',
  'nav.contact': 'Kontakt',
  'nav.search': 'Søk',
  'nav.signin': 'Logg inn',
  'nav.cta.primary': 'Rull ut din plattform',
  'nav.feature.title': 'Plattformøkosystem',
  'nav.feature.description':
    'Modulære infrastrukturplattformer pluss FlyttGo-markedsplassen — lisensiert uavhengig, rullet ut sammen.',
  'nav.feature.cta': 'Utforsk økosystemet',
  'nav.group.infra': 'Infrastrukturplattformer',
  'nav.group.marketplace': 'Markedsplassplattform',

  'hero.eyebrow': 'Plattforminfrastruktur · EU · AF · MENA',
  'hero.title.part1': 'Rull ut digitale infrastrukturplattformer i nasjonal skala',
  'hero.title.part2': 'Uten å bygge systemer fra bunnen av',
  'hero.subtitle':
    'FlyttGo Technologies Group utvikler modulære plattformer for mobilitetskoordinering, arbeidsstyrke-systemer, utdanningsintelligens, økonomi­automatisering, identitetsverifisering og offentlig tjenesteyting på tvers av byer og regioner.',
  'hero.cta.primary': 'Utforsk plattformøkosystemet',
  'hero.cta.secondary': 'Be om partnerskapssamtale',

  'footer.tagline':
    'Modulær plattforminfrastruktur for logistikk, utdanning, offentlig sektor og bedrifter — rullet ut i Europa, Afrika og Midtøsten.',
  'footer.group.platforms': 'Plattformer',
  'footer.group.industries': 'Bransjer',
  'footer.group.company': 'Selskap',
  'footer.group.resources': 'Ressurser',
  'footer.group.enterprise': 'Bedriftsnavigasjon',
  'footer.group.deployment': 'Utrullings­beredskap',
  'footer.group.compliance': 'Samsvars­beredskap',
  'footer.group.support': 'Støtte­kanaler',
  'footer.enterprise': 'Bedrift',
  'footer.certifications': 'Sertifiseringer og samsvar',
  'footer.regions': 'Utrullingsregioner',
  'footer.status': 'Alle systemer i drift',
  'footer.deploy': 'Rull ut din plattform',
  'footer.regulatory.company': 'Selskap',
  'footer.regulatory.vat': 'MVA',
  'footer.regulatory.security': 'Sikkerhet',
  'footer.regulatory.support': 'Brukerstøtte',
  'footer.legal.privacy': 'Personvern',
  'footer.legal.terms': 'Vilkår',
  'footer.legal.security': 'Sikkerhet',
  'footer.legal.compliance': 'Samsvar',
  'footer.legal.contact': 'Kontakt',
  'footer.social': 'Sosiale kanaler',

  'cta.learnMore': 'Les mer',
  'cta.contact': 'Kontakt oss',
  'cta.back': 'Tilbake',

  'home.trust.heading': 'Rullet ut for',
  'home.platform.eyebrow': 'Plattformøkosystem',
  'home.platform.title.part1': 'Ett infrastrukturøkosystem.',
  'home.platform.title.part2': 'Modulære utrullings­plattformer.',
  'home.platform.description':
    'Myndigheter, universiteter, transportoperatører og markedsplass­byggere ruller ut FlyttGo-plattformer som moduler.',
  'home.platform.cta': 'Se hele økosystemet',
  'home.deployment.eyebrow': 'Utrullingsarkitektur',
  'home.deployment.title': 'Rull ut på dine vilkår.',
  'home.deployment.description':
    'Tre utrullingsmoduser tilpasset enhver anskaffelse eller suverenitetsposisjon.',
  'home.deployment.cta': 'Utrullings­detaljer',
  'home.industries.eyebrow': 'Bransjer vi betjener',
  'home.industries.title': 'Bygget for institusjoner og operatører.',
  'home.industries.title.part1': 'Bygget for institusjonene som ',
  'home.industries.title.part2': 'faktisk driver byer og regioner.',
  'home.industries.description':
    'Departementer, kommuner, universiteter og transportoperatører ruller ut FlyttGo-plattformer i pilot-, metro- eller nasjonal skala.',
  'home.industries.cta': 'Bransje­oversikt',
  'home.tech.eyebrow': 'Teknologi­infrastruktur',
  'home.tech.title': 'Skybasert plattform-stack.',
  'home.tech.title.part1': 'En seks-lags stack ',
  'home.tech.title.part2': 'utviklet for å rulles ut.',
  'home.tech.description': 'Flerleietaker, regionsbevisst, standardbasert.',
  'home.tech.cta': 'Arkitektur­oversikt',
  'home.faq.eyebrow': 'Anskaffelse og utrullings-FAQ',
  'home.faq.title': 'Vanlige spørsmål fra utrullingspartnere.',
  'home.cta.eyebrow': 'Klar når du er det',
  'home.cta.title.part1': 'Start utrullingen av din',
  'home.cta.title.part2': 'plattform­infrastruktur i dag',
  'home.cta.primary': 'Rull ut din plattforminfrastruktur',
  'home.cta.secondary': 'Planlegg infrastrukturarkitektur-samtale',

  // Government & public-sector surface (GV.00) — Norsk bokmål
  'government.hero.eyebrow': 'Offentlig sektor',
  'government.hero.title.part1': 'Modulær plattforminfrastruktur for ',
  'government.hero.title.part2': 'suverenitetsklar offentlig utrulling.',
  'government.hero.description':
    'Identitet, betalinger, mobilitet, arbeidsstyrke, utdanning, offentlige tjenester og finansoperasjoner — orkestrert gjennom FlyttGoTech Core. Tre utrullings­modeller: forvaltet SaaS, kundens sky, suverent nasjonalt datasenter.',

  // GV.01 Programme positioning
  'government.gv01.eyebrow': 'Programposisjonering',
  'government.gv01.title.part1': 'Plattforminfrastruktur for offentlig sektor, ',
  'government.gv01.title.part2': 'utrullet under din jurisdiksjon.',
  'government.gv01.body1':
    'FlyttGo Technologies Group AB designer og drifter modulær sky-plattforminfrastruktur som er rullet ut i offentlige programmer i Europa, Afrika og Midtøsten. Kapabilitets­flaten denne siden beskriver er i drift i dag; utrullings­profilen er den samme som våre regulator­bundne installasjoner opererer under.',
  'government.gv01.body2':
    'Åtte uavhengig lisensierte moduler — identitet, betalinger, mobilitet, arbeidsstyrke, utdanning, offentlige tjenester, finansoperasjoner og en regulert markedsplass — orkestreres gjennom FlyttGoTech Core. Tre utrullings­modeller dekker enhver suverenitets­profil, fra forvaltet SaaS i EUs primær­regioner til suverene nasjonale datasentre under nasjonal HSM og nasjonal eID-integrasjon.',
  'government.gv01.recipients.heading': 'Mottakere av denne flaten',
  'government.gv01.br01.label': 'Digitaliserings­departementet',
  'government.gv01.br01.context': 'Nasjonale digital­strategi­programmer · tverr­departemental data­infrastruktur',
  'government.gv01.br02.label': 'Samferdsels­departementet',
  'government.gv01.br02.context': 'Transport­data-rygglinjer · regional disponering · lovpålagt mobilitets­rapportering',
  'government.gv01.br03.label': 'Kunnskaps­departementet',
  'government.gv01.br03.context': 'Opptaks­konsolidering · stipend­orkestrering · institusjons­analyse',
  'government.gv01.br04.label': 'Sentral digitaliserings­etat',
  'government.gv01.br04.context': 'Nasjonal eID-utrulling · portaler for offentlige tjenester · suverene sky-programmer',
  'government.gv01.br05.label': 'Kommunal moderniserings­program',
  'government.gv01.br05.context': 'Samling av innbyggertjenester · rådhusdrift · innbygger­portaler',
  'government.gv01.br06.label': 'Anskaffelses­kontor for offentlig sektor',
  'government.gv01.br06.context': 'Rammeavtaler · pilot­anskaffelser · fler­trinns utrullings­forpliktelser',

  // GV.02 Service-model declaration
  'government.gv02.eyebrow': 'Tjeneste­modell­erklæring',
  'government.gv02.title.part1': 'Fire tjeneste­profiler. ',
  'government.gv02.title.part2': 'Velg den jurisdiksjonen din opererer under.',
  'government.gv02.description':
    'Hver utrulling i offentlig sektor lander mot en av disse profilene. Hver er en kontraktsramme, ikke en markedsførings­kategori — suverenitet, nøkkel­forvaring og regulator­overlevering følger av valgt profil.',
  'government.gv02.sm01.title': 'SaaS-kapabilitet',
  'government.gv02.sm01.service': 'Forvaltede regionale tenanter',
  'government.gv02.sm01.body': 'FlyttGo drifter plattformen; mottakeren konsumerer drifts­tjenester med lovpålagt residens. Region­bevisste tenanter i EUs primær­regioner, med valgfri regional opp­løft til AF, MENA eller APAC.',
  'government.gv02.sm01.cta': 'Forvaltet utrullings­profil',
  'government.gv02.sm02.title': 'PaaS-orkestrerings­arkitektur',
  'government.gv02.sm02.service': 'FlyttGoTech Core-substrat',
  'government.gv02.sm02.body': 'FlyttGoTech Core eksponerer et orkestrerings­substrat — identitets­megler, revisjons­logg, hendelses­buss, policy­motor, arbeids­flyt­kjører — som mottakeren utvider med interne tjenester eller egne moduler.',
  'government.gv02.sm02.cta': 'Orkestrerings­arkitektur',
  'government.gv02.sm03.title': 'IaaS-kompatible utrullings­miljøer',
  'government.gv02.sm03.service': 'Kundens sky eller suverent substrat',
  'government.gv02.sm03.body': 'Plattformen installeres i mottakerens eksisterende AWS-, Azure-, GCP- eller bare-metal suverene miljø under deres tenancy. BYOK / HYOK nøkkel­forvaring. Revisjon og patche­kadens følger mottakerens endrings­kontroll.',
  'government.gv02.sm03.cta': 'Kunde­sky-profil',
  'government.gv02.sm04.title': 'Suveren nasjonal infrastruktur­beredskap',
  'government.gv02.sm04.service': 'Sertifisert nasjonalt datasenter',
  'government.gv02.sm04.body': 'Installasjon i sertifiserte nasjonale datasentre under nasjonal HSM, nasjonal eID-integrasjon, regulator­bundne endrings­vinduer, og Cloud-Act-fritatt drift. Full data­residens i jurisdiksjonen.',
  'government.gv02.sm04.cta': 'Suveren utrullings­profil',

  // GV.04b Orchestration architecture
  'government.gv04b.eyebrow': 'Orkestrerings­arkitektur',
  'government.gv04b.title.part1': 'Åtte moduler. ',
  'government.gv04b.title.part2': 'Én orkestrerings­kjerne.',
  'government.gv04b.description':
    'Tjeneste­leverings­flate · FlyttGoTech Core (PaaS) · utrullings­substrat (IaaS-kompatibelt) · suverenitets­profil. Samme arkitektur som hver offentlig utrulling lander mot, uavhengig av hvilken modul­miks programmet lisensierer.',

  // GV.05 Sovereignty framework
  'government.gv05.eyebrow': 'Suverenitets­rammeverk',
  'government.gv05.title.part1': 'Suverenitet som ',
  'government.gv05.title.part2': 'kontrakts­instrument.',
  'government.gv05.description':
    'De fire erklæringene under er ikke markedsførings­profiler. Hver er en klausul som inngår i hvert kontrakts­instrument FlyttGo signerer for en offentlig utrulling, med tilhørende artefakt levert ved anskaffelses­forespørsel.',
  'government.gv05.sv01.title': 'Data­residens',
  'government.gv05.sv01.posture': 'Erklært per modus · jurisdiksjon',
  'government.gv05.sv01.detail': 'Forvaltet SaaS holder personopplysninger i EUs primær­regioner med valgfri regional opp­løft. Kunde­sky-utrullinger arver mottakerens tenancy-region. Suverene utrullinger opererer 100 % i jurisdiksjonen, med eksplisitte ikke-replikerings­klausuler over landegrenser.',
  'government.gv05.sv02.title': 'Krypterings­nøkkel-forvaring',
  'government.gv05.sv02.posture': 'FlyttGo KMS · BYOK / HYOK · Nasjonal HSM',
  'government.gv05.sv02.detail': 'Forvaltede utrullinger bruker FlyttGo KMS med per-tenant data­krypterings­nøkler. Kunde­sky-utrullinger støtter BYOK og HYOK med mottakerens KMS som rot. Suverene utrullinger opererer mot nasjonal HSM under regulator­overvåket nøkkel­seremoni.',
  'government.gv05.sv03.title': 'Cloud-Act-eksponering',
  'government.gv05.sv03.posture': 'Erklært per utrullings­modus',
  'government.gv05.sv03.detail': 'Forvaltet SaaS er potensielt eksponert for ekstra­territoriell stevning i tråd med vert­hyperskaleren sin juridiske profil. Kunde­sky følger mottakerens tenancy. Suverene utrullinger inne i sertifiserte nasjonale datasentre er Cloud-Act-fritatt ved konstruksjon.',
  'government.gv05.sv04.title': 'Rett til revisjon',
  'government.gv05.sv04.posture': '30 dagers varsel · regulator­bundet',
  'government.gv05.sv04.detail': 'Hvert kontrakts­instrument bærer en standard rett-til-revisjon-klausul. Mottakeren eller dens nasjonale revisjons­kontor kan revidere på 30 dagers varsel. FlyttGo leverer SOC 2 Type II-rapport, ISO 27001-sertifikat, penetrasjons­test sammendrag, GDPR DPIA og konfigurasjons­basislinje på forespørsel.',
  'government.gv05.cta.orchestration': 'Åpne orkestrerings­arkitektur',
  'government.gv05.cta.brief': 'Kapabilitets­brief · GCB.00',
  'government.gv05.footer': 'Full suverenitets­profil dokumentert under NDA i Government Capability Brief (GCB.00) · §4 av Pilot Deployment Partnership Proposal (PP.00) · per-utrullings tilleggsdokument.',

  // GV.08 Reference programme shapes
  'government.gv08.eyebrow': 'Referanse­program-profiler',
  'government.gv08.title.part1': 'Tre program­profiler, ',
  'government.gv08.title.part2': 'anonymisert for offentlig sirkulasjon.',
  'government.gv08.description': 'Fulle referanse­detaljer — mottaker, kontrakts­instrument, lovpålagte måltall, revisjons­utfall — gjøres kun tilgjengelig under NDA. Be om referanse­dossier via inntaks­skjemaet under.',
  'government.gv08.scale': 'Skala',
  'government.gv08.modules': 'Moduler',
  'government.gv08.mode': 'Utrullings­modus',
  'government.gv08.classification': 'Konfidensielt · referanse­profil · fulle detaljer under NDA',

  // GV.09 Engagement intake
  'government.gv09.eyebrow': 'Engasjements­inntak',
  'government.gv09.title.part1': 'Tre trinn fra kapabilitets­brief ',
  'government.gv09.title.part2': 'til signert kontrakts­instrument.',
  'government.gv09.description':
    'Engasjements­modellen er en dokumentert sekvens — hvert trinn har et navngitt resultat og en definert varighet. Ingen trinn hoppes over; ingen trinn forkortes for å imøtekomme kvartals­mål. Anskaffelser i offentlig sektor drives av bevis, ikke momentum.',
  'government.gv09.eg01.title': 'Kapabilitets-dypdykk',
  'government.gv09.eg01.duration': '60 minutter',
  'government.gv09.eg01.body': 'Arbeids­møte mellom mottakerens tekniske lead og FlyttGo-plattform­teamet. Går gjennom kapabilitets­briefen mot mottakerens stedfestede program, navngir begrensningene, og tester utrullings­profilen mot mottakerens regulatoriske ramme.',
  'government.gv09.eg01.artefact': 'Resultat: arbeids­notater · kapabilitets­scoring',
  'government.gv09.eg02.title': 'Pilot­omfang',
  'government.gv09.eg02.duration': '2–4 uker · NDA-bundet',
  'government.gv09.eg02.body': 'Et formelt omfangs­engasjement under NDA. Definerer pilot­omfang, suksess­kriterier, suverenitets­profil, integrasjons­ankere og kommersiell konvolutt. Resultat er en skriftlig pilot­brief og et pris­profil-tilbud — begge gjennom­gåelige av mottakerens anskaffelses- og juridiske kontorer.',
  'government.gv09.eg02.artefact': 'Resultat: skriftlig pilot­brief · pris­profil-tilbud',
  'government.gv09.eg03.title': 'Anskaffelses­engasjement',
  'government.gv09.eg03.duration': 'Per nivå · 60 dager – 18 måneder',
  'government.gv09.eg03.body': 'Beveger seg til et av de fem anskaffelses­nivåene — pilot, by, regionalt, nasjonalt, eller white-label — med tilhørende kontrakts­instrument. Pilot­tilbudet (PP.00) blir master­omfangs­referansen; kontrakts­instrumentet forankrer data­residens, nøkkel­forvaring, revisjons­rettigheter og suverenitets­profil.',
  'government.gv09.eg03.artefact': 'Resultat: signert ordre­skjema · kontrakts­instrument',
  'government.gv09.cta.primary': 'Åpne inntaks­skjema for offentlig sektor',
  'government.gv09.cta.procurement': 'Anskaffelses­kompatibilitets­flate',
  'government.gv09.cta.brief': 'Kapabilitets­brief · GCB.00',
  'government.gv09.cta.response': 'Ingeniør­respons innen én virkedag',
  'government.gv09.footer': 'Engasjements­desk for offentlig sektor · platform@flyttgotech.com · revisjons­logg lagrer hver autentiserings- og engasjements­hendelse',

  'sector.challenges': 'Typiske utfordringer',
  'sector.outcomes': 'FlyttGo-resultater',
  'sector.platforms.heading': 'Plattformer rullet ut for denne sektoren',
  'sector.platforms.subheading': 'Modulære plattformer, tilpasset sektoren.',
  'sector.deployment.heading': 'Utrullingsmønster',
  'sector.cta.description':
    'Del konteksten for programmet ditt, så svarer vårt utrullingsteam innen én virkedag med en omfangsskisse og referansearkitektur.',
  'sector.cta.button': 'Start en utrullingssamtale',
  'sector.cta.review': 'Se utrullingsarkitekturen',

  'mode.characteristics': 'Egenskaper',
  'mode.timeline': 'Tidslinje',
  'mode.regions': 'Regionsdekning',
  'mode.scope': 'Avklar utrulling',
  'mode.bestFit': 'Best egnet',

  'status.eyebrow': 'Plattformstatus',
  'status.title': 'Alle systemer i drift.',
  'status.description':
    'Sanntidsstatus for FlyttGo Technologies Groups plattforminfrastruktur. Hendelser, vedlikeholdsvinduer og regionale nedganger publiseres her før de når kundedashbord.',
  'status.components': 'Komponenthelse',
  'status.updated': 'Oppdatert',
  'status.operational': 'I drift',
  'status.incidents.title': 'Hendelseshistorikk og bedrifts-SLA',
  'status.incidents.description':
    'Post mortems, oppetidsdashbord og regionale SLA-rapporter er tilgjengelige for bedriftskunder i utrullingsportalen.',
  'status.incidents.cta': 'Be om SLA-dokumentasjon',

  'legal.effective': 'Gjelder fra',
  'legal.privacy.eyebrow': 'Juridisk · Personvern',
  'legal.privacy.title': 'Slik håndterer FlyttGo dataene dine — åpent.',
  'legal.terms.eyebrow': 'Juridisk · Vilkår',
  'legal.terms.title': 'Vilkår for bruk av flyttgotech.com.',
  'legal.security.eyebrow': 'Tillit · Sikkerhet',
  'legal.security.title': 'Sikkerhet bygget for utrullinger i nasjonal skala.',
  'legal.compliance.eyebrow': 'Tillit · Samsvar',
  'legal.compliance.title': 'Samsvar i EU-, AF- og MENA-jurisdiksjoner.',

  'company.leadership.eyebrow': 'Selskap · Ledelse',
  'company.leadership.title': 'Vi driver plattformlaget som andre organisasjoner ruller ut på.',
  'company.careers.eyebrow': 'Selskap · Karriere',
  'company.careers.title':
    'Hjelp operatører med å rulle ut plattformer i nasjonal skala — uten årelange byggeprosjekter.',
  'company.careers.openings': 'Ledige stillinger',
  'company.press.eyebrow': 'Selskap · Presse',
  'company.press.title': 'Presse- og medieressurser.',
  'company.press.boilerplate': 'Selskapsbeskrivelse',

  'sitemap.eyebrow': 'Navigasjon',
  'sitemap.title': 'Hver side på flyttgotech.com, i én oversikt.',
  'sitemap.description':
    'Dette er det menneskelesbare motstykket til XML-områdekartet vårt. Bruk det til å orientere deg i FlyttGo Technologies Groups plattformøkosystem, bransjer, utrullingsmoduser, selskap og tillitsdokumentasjon.',
  'sitemap.machineReadable': 'Leter du etter den maskinlesbare versjonen?',

  'platform.back': 'Tilbake til plattformøkosystemet',
  'platform.hero.platform': 'Plattform',
  'platform.hero.production': 'Produksjonsklar',
  'platform.cta.start': 'Start utrulling',
  'platform.cta.modules': 'Utforsk moduler',
  'platform.modules.eyebrow': 'Plattformmoduler',
  'platform.modules.title': 'Modulær infrastruktur du kan aktivere uavhengig.',
  'platform.workflow.eyebrow': 'Utrullings­arbeidsflyt',
  'platform.workflow.title': 'Fra kickoff til produksjon i fire strukturerte trinn.',
  'platform.workflow.step': 'Trinn',
  'platform.tech.eyebrow': 'Teknisk arkitektur',
  'platform.tech.title': '{name} kjører på FlyttGos skybaserte stack.',
  'platform.tech.description':
    'Hvert lag er designet for skalerbarhet, flerleietaker-isolasjon og regional utrullings­portabilitet på tvers av Europa, Afrika og Midtøsten.',
  'platform.arch.layers': 'Arkitekturlag',
  'platform.case.eyebrow': 'Kundecase',
  'platform.case.title': 'Organisasjoner som allerede ruller ut {name}.',
  'platform.pricing.eyebrow': 'Utrullingsnivåer',
  'platform.pricing.title': 'Skalér fra pilot til nasjonal infrastruktur.',
  'platform.pricing.description':
    'Hvert nivå inkluderer flerleietaker-arkitektur, white-label-branding og regional utrullings­kompatibilitet.',
  'platform.pricing.popular': 'Mest populær',
  'platform.related.title': 'Utforsk andre plattformer i økosystemet',
  'platform.form.received': 'Forespørsel mottatt',
  'platform.form.respond': 'Vårt {platform}-utrullings­team svarer snart.',
  'platform.form.another': 'Send en ny forespørsel',
};

const fr: Dictionary = {
  'utility.tagline': 'Infrastructure de plateforme · Entreprise et secteur public',
  'utility.language': 'Langue',

  'nav.platforms': 'Plateformes',
  'nav.industries': 'Secteurs',
  'nav.deployment': 'Déploiement',
  'nav.technology': 'Technologie',
  'nav.company': 'Entreprise',
  'nav.contact': 'Contact',
  'nav.search': 'Rechercher',
  'nav.signin': 'Connexion',
  'nav.cta.primary': 'Déployer votre plateforme',
  'nav.feature.title': 'Écosystème de plateformes',
  'nav.feature.description':
    'Plateformes d’infrastructure modulaires plus la place de marché FlyttGo — licenciées séparément, déployées ensemble.',
  'nav.feature.cta': 'Explorer l’écosystème',
  'nav.group.infra': 'Plateformes d’infrastructure',
  'nav.group.marketplace': 'Plateforme de marché',

  'hero.eyebrow': 'Infrastructure de plateforme · UE · AF · MENA',
  'hero.title.part1': 'Déployez des plateformes d’infrastructure numérique à l’échelle nationale',
  'hero.title.part2': 'Sans construire les systèmes de zéro',
  'hero.subtitle':
    'FlyttGo Technologies Group conçoit des plateformes modulaires pour la coordination de la mobilité, les systèmes de main-d’œuvre, l’intelligence éducative, l’automatisation des opérations financières, la vérification d’identité et la prestation de services publics à travers villes et régions.',
  'hero.cta.primary': 'Explorer l’écosystème de plateformes',
  'hero.cta.secondary': 'Demander un entretien de partenariat',

  'footer.tagline':
    'Infrastructure de plateforme modulaire pour la logistique, l’éducation, le gouvernement et les entreprises — déployée en Europe, Afrique et Moyen-Orient.',
  'footer.group.platforms': 'Plateformes',
  'footer.group.industries': 'Secteurs',
  'footer.group.company': 'Entreprise',
  'footer.group.resources': 'Ressources',
  'footer.enterprise': 'Entreprise',
  'footer.certifications': 'Certifications et conformité',
  'footer.regions': 'Régions de déploiement',
  'footer.status': 'Tous les systèmes opérationnels',
  'footer.deploy': 'Déployer votre plateforme',
  'footer.regulatory.company': 'Société',
  'footer.regulatory.vat': 'TVA',
  'footer.regulatory.security': 'Sécurité',
  'footer.regulatory.support': 'Support',
  'footer.legal.privacy': 'Confidentialité',
  'footer.legal.terms': 'Conditions',
  'footer.legal.security': 'Sécurité',
  'footer.legal.compliance': 'Conformité',
  'footer.legal.contact': 'Contact',
  'footer.social': 'Réseaux sociaux',

  'cta.learnMore': 'En savoir plus',
  'cta.contact': 'Nous contacter',
  'cta.back': 'Retour',

  'home.trust.heading': 'Déployé pour',
  'home.platform.eyebrow': 'Écosystème de plateformes',
  'home.platform.title.part1': 'Un écosystème d’infrastructure.',
  'home.platform.title.part2': 'Plateformes de déploiement modulaires.',
  'home.platform.description':
    'Gouvernements, universités, opérateurs de transport et bâtisseurs de places de marché déploient les plateformes FlyttGo en modules.',
  'home.platform.cta': 'Voir l’écosystème complet',
  'home.deployment.eyebrow': 'Architecture de déploiement',
  'home.deployment.title': 'Déployez selon vos règles.',
  'home.deployment.description':
    'Trois modes de déploiement pour toute posture d’achat ou de souveraineté.',
  'home.deployment.cta': 'Détails du déploiement',
  'home.industries.eyebrow': 'Secteurs desservis',
  'home.industries.title': 'Conçu pour les institutions et les opérateurs.',
  'home.industries.description':
    'Ministères, municipalités, universités et opérateurs de transport déploient les plateformes FlyttGo à l’échelle pilote, métropolitaine ou nationale.',
  'home.industries.cta': 'Vue d’ensemble des secteurs',
  'home.tech.eyebrow': 'Infrastructure technologique',
  'home.tech.title': 'Stack de plateforme cloud-native.',
  'home.tech.description': 'Multi-tenant, conscient de la région, basé sur les standards.',
  'home.tech.cta': 'Vue d’ensemble de l’architecture',
  'home.faq.eyebrow': 'FAQ Achats & Déploiement',
  'home.faq.title': 'Questions fréquentes des partenaires de déploiement.',
  'home.cta.eyebrow': 'Prêts quand vous l’êtes',
  'home.cta.title.part1': 'Commencez à déployer votre',
  'home.cta.title.part2': 'infrastructure de plateforme dès aujourd’hui',
  'home.cta.primary': 'Déployer votre plateforme',
  'home.cta.secondary': 'Planifier une démo d’infrastructure',

  'sector.challenges': 'Défis courants',
  'sector.outcomes': 'Résultats FlyttGo',
  'sector.platforms.heading': 'Plateformes déployées pour ce secteur',
  'sector.platforms.subheading': 'Plateformes modulaires, à l’échelle du secteur.',
  'sector.deployment.heading': 'Schéma de déploiement',
  'sector.cta.description':
    'Partagez le contexte de votre programme et notre équipe d’ingénierie de déploiement répondra sous un jour ouvré avec un cadrage et une architecture de référence.',
  'sector.cta.button': 'Démarrer une conversation de déploiement',
  'sector.cta.review': 'Voir l’architecture de déploiement',

  'mode.characteristics': 'Caractéristiques',
  'mode.timeline': 'Calendrier',
  'mode.regions': 'Couverture régionale',
  'mode.scope': 'Cadrer un déploiement',
  'mode.bestFit': 'Cas idéaux',

  'status.eyebrow': 'État de la plateforme',
  'status.title': 'Tous les systèmes opérationnels.',
  'status.description':
    'État en temps réel de l’infrastructure de plateforme FlyttGo Technologies Group. Incidents, fenêtres de maintenance et dégradations régionales sont publiés ici avant d’atteindre les tableaux de bord clients.',
  'status.components': 'Santé des composants',
  'status.updated': 'Mis à jour',
  'status.operational': 'Opérationnel',
  'status.incidents.title': 'Historique des incidents & SLA entreprise',
  'status.incidents.description':
    'Post-mortems, tableaux de bord de disponibilité et rapports de SLA par région sont disponibles pour les clients entreprise dans le portail de déploiement.',
  'status.incidents.cta': 'Demander la documentation SLA',

  'legal.effective': 'En vigueur',
  'legal.privacy.eyebrow': 'Juridique · Confidentialité',
  'legal.privacy.title': 'Comment FlyttGo traite vos données — en toute transparence.',
  'legal.terms.eyebrow': 'Juridique · Conditions',
  'legal.terms.title': 'Conditions d’utilisation de flyttgotech.com.',
  'legal.security.eyebrow': 'Confiance · Sécurité',
  'legal.security.title': 'Une sécurité conçue pour les déploiements à l’échelle nationale.',
  'legal.compliance.eyebrow': 'Confiance · Conformité',
  'legal.compliance.title': 'Conformité dans les juridictions UE, AF et MENA.',

  'company.leadership.eyebrow': 'Entreprise · Direction',
  'company.leadership.title':
    'Nous opérons la couche de plateformes sur laquelle d’autres organisations se déploient.',
  'company.careers.eyebrow': 'Entreprise · Carrières',
  'company.careers.title':
    'Aidez les opérateurs à déployer des plateformes à l’échelle nationale — sans la construction pluriannuelle.',
  'company.careers.openings': 'Postes ouverts',
  'company.press.eyebrow': 'Entreprise · Presse',
  'company.press.title': 'Ressources presse et médias.',
  'company.press.boilerplate': 'Texte institutionnel',

  'sitemap.eyebrow': 'Navigation',
  'sitemap.title': 'Toutes les pages de flyttgotech.com, en une vue.',
  'sitemap.description':
    'Ceci est la version lisible par un humain de notre sitemap XML. Utilisez-la pour vous repérer dans l’écosystème de plateformes FlyttGo Technologies Group, les secteurs, les modes de déploiement, l’entreprise et la documentation de confiance.',
  'sitemap.machineReadable': 'Vous cherchez la version lisible par machine ?',

  'platform.back': 'Retour à l’écosystème de plateformes',
  'platform.hero.platform': 'Plateforme',
  'platform.hero.production': 'Prêt pour la production',
  'platform.cta.start': 'Démarrer le déploiement',
  'platform.cta.modules': 'Explorer les modules',
  'platform.modules.eyebrow': 'Modules de plateforme',
  'platform.modules.title': 'Infrastructure modulaire activable indépendamment.',
  'platform.workflow.eyebrow': 'Flux de déploiement',
  'platform.workflow.title': 'Du lancement à la production en quatre étapes structurées.',
  'platform.workflow.step': 'Étape',
  'platform.tech.eyebrow': 'Architecture technique',
  'platform.tech.title': '{name} s’exécute sur le stack cloud-native FlyttGo.',
  'platform.tech.description':
    'Chaque couche est conçue pour l’évolutivité, l’isolation multi-tenant et la portabilité régionale à travers l’Europe, l’Afrique et le Moyen-Orient.',
  'platform.arch.layers': 'Couches d’architecture',
  'platform.case.eyebrow': 'Études de cas',
  'platform.case.title': 'Organisations qui déploient déjà {name}.',
  'platform.pricing.eyebrow': 'Niveaux de déploiement',
  'platform.pricing.title': 'Du pilote à l’infrastructure nationale.',
  'platform.pricing.description':
    'Chaque niveau inclut l’architecture multi-tenant, le marquage white-label et la compatibilité de déploiement régional.',
  'platform.pricing.popular': 'Le plus populaire',
  'platform.related.title': 'Explorer d’autres plateformes de l’écosystème',
  'platform.form.received': 'Demande reçue',
  'platform.form.respond': 'Notre équipe de déploiement {platform} répondra sous peu.',
  'platform.form.another': 'Envoyer une autre demande',
};

const de: Dictionary = {
  'utility.tagline': 'Plattforminfrastruktur · Unternehmen & öffentlicher Sektor',
  'utility.language': 'Sprache',
  'nav.platforms': 'Plattformen',
  'nav.industries': 'Branchen',
  'nav.deployment': 'Bereitstellung',
  'nav.technology': 'Technologie',
  'nav.company': 'Unternehmen',
  'nav.contact': 'Kontakt',
  'nav.search': 'Suchen',
  'nav.signin': 'Anmelden',
  'nav.cta.primary': 'Ihre Plattform bereitstellen',
  'nav.feature.title': 'Plattform-Ökosystem',
  'nav.feature.description':
    'Modulare Infrastrukturplattformen plus der FlyttGo-Marktplatz — einzeln lizenziert, gemeinsam bereitgestellt.',
  'nav.feature.cta': 'Ökosystem entdecken',
  'nav.group.infra': 'Infrastrukturplattformen',
  'nav.group.marketplace': 'Marktplatz-Plattform',
  'hero.eyebrow': 'Plattforminfrastruktur · EU · AF · MENA',
  'hero.title.part1': 'Digitale Infrastrukturplattformen im nationalen Maßstab bereitstellen',
  'hero.title.part2': 'Ohne Systeme von Grund auf zu bauen',
  'hero.subtitle':
    'Die FlyttGo Technologies Group entwickelt modulare Plattformen für Mobilitätskoordination, Personalmanagement, Bildungsintelligenz, Finanzoperationen, Identitätsprüfung und öffentliche Dienstleistungen in Städten und Regionen.',
  'hero.cta.primary': 'Plattform-Ökosystem erkunden',
  'hero.cta.secondary': 'Partnergespräch anfragen',
  'footer.tagline':
    'Modulare Plattforminfrastruktur für Logistik, Bildung, Verwaltung und Unternehmen — bereitgestellt in Europa, Afrika und dem Nahen Osten.',
  'footer.group.platforms': 'Plattformen',
  'footer.group.industries': 'Branchen',
  'footer.group.company': 'Unternehmen',
  'footer.group.resources': 'Ressourcen',
  'footer.enterprise': 'Enterprise',
  'footer.certifications': 'Zertifizierungen & Compliance',
  'footer.regions': 'Bereitstellungsregionen',
  'footer.status': 'Alle Systeme betriebsbereit',
  'footer.deploy': 'Ihre Plattform bereitstellen',
  'footer.regulatory.company': 'Unternehmen',
  'footer.regulatory.vat': 'USt.',
  'footer.regulatory.security': 'Sicherheit',
  'footer.regulatory.support': 'Support',
  'footer.legal.privacy': 'Datenschutz',
  'footer.legal.terms': 'Bedingungen',
  'footer.legal.security': 'Sicherheit',
  'footer.legal.compliance': 'Compliance',
  'footer.legal.contact': 'Kontakt',
  'cta.learnMore': 'Mehr erfahren',
  'cta.contact': 'Kontakt aufnehmen',
  'cta.back': 'Zurück',

  'home.trust.heading': 'Bereitgestellt für',
  'home.platform.eyebrow': 'Plattform-Ökosystem',
  'home.platform.title.part1': 'Ein Infrastruktur-Ökosystem.',
  'home.platform.title.part2': 'Modulare Bereitstellungs­plattformen.',
  'home.platform.description':
    'Regierungen, Universitäten, Transportunternehmen und Marktplatzbetreiber setzen FlyttGo-Plattformen als Module ein.',
  'home.platform.cta': 'Das Ökosystem erkunden',
  'home.deployment.eyebrow': 'Bereitstellungs­architektur',
  'home.deployment.title': 'Bereitstellen nach Ihren Regeln.',
  'home.deployment.description':
    'Drei Bereitstellungs­modi für jede Beschaffungs- oder Souveränitäts­anforderung.',
  'home.deployment.cta': 'Details zur Bereitstellung',
  'home.industries.eyebrow': 'Bediente Branchen',
  'home.industries.title': 'Gebaut für Institutionen und Betreiber.',
  'home.tech.eyebrow': 'Technologie­infrastruktur',
  'home.tech.title': 'Cloud-nativer Plattform-Stack.',
  'home.tech.description': 'Multi-Mandanten, regionsbewusst, standardbasiert.',
  'home.tech.cta': 'Architektur-Überblick',
  'home.faq.eyebrow': 'Beschaffungs- & Bereitstellungs-FAQ',
  'home.faq.title': 'Häufige Fragen von Bereitstellungs­partnern.',
  'home.cta.eyebrow': 'Bereit, wenn Sie es sind',
  'home.cta.title.part1': 'Starten Sie die Bereitstellung Ihrer',
  'home.cta.title.part2': 'Plattform-Infrastruktur heute',
  'home.cta.primary': 'Ihre Plattform bereitstellen',
  'home.cta.secondary': 'Infrastruktur-Demo planen',

  'sector.challenges': 'Typische Herausforderungen',
  'sector.outcomes': 'FlyttGo-Ergebnisse',
  'sector.platforms.heading': 'Für diese Branche bereitgestellte Plattformen',
  'sector.platforms.subheading': 'Modulare Plattformen, branchengerecht.',
  'sector.deployment.heading': 'Bereitstellungs­muster',
  'sector.cta.button': 'Bereitstellungs­gespräch starten',
  'sector.cta.review': 'Bereitstellungs­architektur ansehen',

  'mode.characteristics': 'Merkmale',
  'mode.timeline': 'Zeitplan',
  'mode.regions': 'Regionen­abdeckung',
  'mode.scope': 'Bereitstellung planen',
  'mode.bestFit': 'Am besten geeignet',

  'status.eyebrow': 'Plattform-Status',
  'status.title': 'Alle Systeme betriebsbereit.',
  'status.components': 'Komponenten­zustand',
  'status.updated': 'Aktualisiert',
  'status.operational': 'In Betrieb',
  'status.incidents.title': 'Vorfallverlauf & Enterprise-SLAs',
  'status.incidents.cta': 'SLA-Dokumentation anfordern',

  'legal.effective': 'Gültig ab',
  'legal.privacy.eyebrow': 'Rechtliches · Datenschutz',
  'legal.privacy.title': 'Wie FlyttGo mit Ihren Daten umgeht — transparent.',
  'legal.terms.eyebrow': 'Rechtliches · Nutzungs­bedingungen',
  'legal.terms.title': 'Nutzungs­bedingungen für flyttgotech.com.',
  'legal.security.eyebrow': 'Vertrauen · Sicherheit',
  'legal.security.title': 'Sicherheit, gebaut für nationale Bereitstellungen.',
  'legal.compliance.eyebrow': 'Vertrauen · Compliance',
  'legal.compliance.title': 'Compliance in EU-, AF- und MENA-Rechtsräumen.',

  'company.leadership.eyebrow': 'Unternehmen · Führung',
  'company.leadership.title':
    'Wir betreiben die Plattformschicht, auf der andere Organisationen bereitstellen.',
  'company.careers.eyebrow': 'Unternehmen · Karriere',
  'company.careers.title':
    'Helfen Sie Betreibern, nationale Plattformen bereitzustellen — ohne mehrjährigen Aufbau.',
  'company.careers.openings': 'Offene Stellen',
  'company.press.eyebrow': 'Unternehmen · Presse',
  'company.press.title': 'Presse- und Medienressourcen.',
  'company.press.boilerplate': 'Unternehmens­beschreibung',

  'sitemap.eyebrow': 'Navigation',
  'sitemap.title': 'Jede Seite auf flyttgotech.com in einer Übersicht.',
  'sitemap.machineReadable': 'Suchen Sie die maschinen­lesbare Version?',

  'platform.back': 'Zurück zum Plattform-Ökosystem',
  'platform.hero.platform': 'Plattform',
  'platform.hero.production': 'Produktionsbereit',
  'platform.cta.start': 'Bereitstellung starten',
  'platform.cta.modules': 'Module erkunden',
  'platform.modules.eyebrow': 'Plattform-Module',
  'platform.modules.title': 'Modulare Infrastruktur, unabhängig aktivierbar.',
  'platform.workflow.eyebrow': 'Bereitstellungs-Ablauf',
  'platform.workflow.title': 'Vom Kickoff zur Produktion in vier strukturierten Schritten.',
  'platform.workflow.step': 'Schritt',
  'platform.tech.eyebrow': 'Technische Architektur',
  'platform.tech.title': '{name} läuft auf dem cloud-nativen FlyttGo-Stack.',
  'platform.arch.layers': 'Architektur-Schichten',
  'platform.case.eyebrow': 'Fallstudien',
  'platform.case.title': 'Organisationen, die {name} bereits bereitstellen.',
  'platform.pricing.eyebrow': 'Bereitstellungs-Stufen',
  'platform.pricing.title': 'Vom Pilot zur nationalen Infrastruktur skalieren.',
  'platform.pricing.popular': 'Am beliebtesten',
  'platform.related.title': 'Weitere Plattformen des Ökosystems entdecken',
  'platform.form.received': 'Anfrage erhalten',
  'platform.form.respond': 'Unser {platform}-Bereitstellungs­team meldet sich in Kürze.',
  'platform.form.another': 'Weitere Anfrage senden',
};

const es: Dictionary = {
  'utility.tagline': 'Infraestructura de plataforma · Empresa y sector público',
  'utility.language': 'Idioma',
  'nav.platforms': 'Plataformas',
  'nav.industries': 'Sectores',
  'nav.deployment': 'Despliegue',
  'nav.technology': 'Tecnología',
  'nav.company': 'Empresa',
  'nav.contact': 'Contacto',
  'nav.search': 'Buscar',
  'nav.signin': 'Iniciar sesión',
  'nav.cta.primary': 'Despliega tu plataforma',
  'nav.feature.title': 'Ecosistema de plataformas',
  'nav.feature.description':
    'Plataformas de infraestructura modulares y el marketplace FlyttGo — licenciadas por separado, desplegadas juntas.',
  'nav.feature.cta': 'Explorar el ecosistema',
  'nav.group.infra': 'Plataformas de infraestructura',
  'nav.group.marketplace': 'Plataforma de marketplace',
  'hero.eyebrow': 'Infraestructura de plataforma · UE · AF · MENA',
  'hero.title.part1': 'Despliega plataformas de infraestructura digital a escala nacional',
  'hero.title.part2': 'Sin construir sistemas desde cero',
  'hero.subtitle':
    'FlyttGo Technologies Group diseña plataformas modulares para coordinación de movilidad, sistemas de fuerza laboral, inteligencia educativa, automatización de operaciones financieras, verificación de identidad y servicios públicos en ciudades y regiones.',
  'hero.cta.primary': 'Explorar ecosistema de plataformas',
  'hero.cta.secondary': 'Solicitar conversación de partnership',
  'footer.tagline':
    'Infraestructura de plataforma modular para logística, educación, gobierno y empresas — desplegada en Europa, África y Oriente Medio.',
  'footer.group.platforms': 'Plataformas',
  'footer.group.industries': 'Sectores',
  'footer.group.company': 'Empresa',
  'footer.group.resources': 'Recursos',
  'footer.enterprise': 'Enterprise',
  'footer.certifications': 'Certificaciones y cumplimiento',
  'footer.regions': 'Regiones de despliegue',
  'footer.status': 'Todos los sistemas operativos',
  'footer.deploy': 'Despliega tu plataforma',
  'footer.legal.privacy': 'Privacidad',
  'footer.legal.terms': 'Términos',
  'footer.legal.security': 'Seguridad',
  'footer.legal.compliance': 'Cumplimiento',
  'footer.legal.contact': 'Contacto',
  'cta.learnMore': 'Saber más',
  'cta.contact': 'Contáctanos',
  'cta.back': 'Atrás',

  'home.trust.heading': 'Desplegado para',
  'home.platform.eyebrow': 'Ecosistema de plataformas',
  'home.platform.title.part1': 'Un ecosistema de infraestructura.',
  'home.platform.title.part2': 'Plataformas de despliegue modulares.',
  'home.platform.description':
    'Gobiernos, universidades, operadores de transporte y creadores de marketplaces despliegan las plataformas FlyttGo como módulos.',
  'home.platform.cta': 'Ver el ecosistema completo',
  'home.deployment.eyebrow': 'Arquitectura de despliegue',
  'home.deployment.title': 'Despliega en tus términos.',
  'home.deployment.description':
    'Tres modos de despliegue para cualquier postura de compra o soberanía.',
  'home.deployment.cta': 'Detalles del despliegue',
  'home.industries.eyebrow': 'Sectores atendidos',
  'home.industries.title': 'Construido para instituciones y operadores.',
  'home.tech.eyebrow': 'Infraestructura tecnológica',
  'home.tech.title': 'Stack de plataforma cloud-native.',
  'home.faq.eyebrow': 'FAQ de compras y despliegue',
  'home.faq.title': 'Preguntas frecuentes de socios de despliegue.',
  'home.cta.eyebrow': 'Listos cuando tú lo estés',
  'home.cta.title.part1': 'Empieza a desplegar tu',
  'home.cta.title.part2': 'infraestructura de plataforma hoy',
  'home.cta.primary': 'Despliega tu plataforma',
  'home.cta.secondary': 'Agendar demo de infraestructura',

  'sector.challenges': 'Desafíos típicos',
  'sector.outcomes': 'Resultados con FlyttGo',
  'sector.platforms.heading': 'Plataformas desplegadas para este sector',
  'sector.platforms.subheading': 'Plataformas modulares, a la medida del sector.',
  'sector.deployment.heading': 'Patrón de despliegue',
  'sector.cta.button': 'Iniciar una conversación de despliegue',
  'sector.cta.review': 'Ver la arquitectura de despliegue',

  'mode.characteristics': 'Características',
  'mode.timeline': 'Cronograma',
  'mode.regions': 'Cobertura regional',
  'mode.scope': 'Planificar un despliegue',
  'mode.bestFit': 'Mejor encaje',

  'status.eyebrow': 'Estado de la plataforma',
  'status.title': 'Todos los sistemas operativos.',
  'status.components': 'Salud de componentes',
  'status.updated': 'Actualizado',
  'status.operational': 'Operativo',
  'status.incidents.title': 'Historial de incidentes y SLA enterprise',
  'status.incidents.cta': 'Solicitar documentación SLA',

  'legal.effective': 'Vigencia',
  'legal.privacy.eyebrow': 'Legal · Privacidad',
  'legal.privacy.title': 'Cómo FlyttGo gestiona tus datos — con transparencia.',
  'legal.terms.eyebrow': 'Legal · Términos',
  'legal.terms.title': 'Términos de servicio de flyttgotech.com.',
  'legal.security.eyebrow': 'Confianza · Seguridad',
  'legal.security.title': 'Seguridad diseñada para despliegues a escala nacional.',
  'legal.compliance.eyebrow': 'Confianza · Cumplimiento',
  'legal.compliance.title': 'Cumplimiento en jurisdicciones UE, AF y MENA.',

  'company.leadership.eyebrow': 'Empresa · Liderazgo',
  'company.leadership.title':
    'Operamos la capa de plataformas sobre la que otras organizaciones despliegan.',
  'company.careers.eyebrow': 'Empresa · Carreras',
  'company.careers.title':
    'Ayuda a operadores a desplegar plataformas a escala nacional — sin la construcción de años.',
  'company.careers.openings': 'Vacantes actuales',
  'company.press.eyebrow': 'Empresa · Prensa',
  'company.press.title': 'Recursos de prensa y medios.',
  'company.press.boilerplate': 'Descripción corporativa',

  'sitemap.eyebrow': 'Navegación',
  'sitemap.title': 'Cada página de flyttgotech.com, en una vista.',
  'sitemap.machineReadable': '¿Buscas la versión legible por máquina?',

  'platform.back': 'Volver al ecosistema de plataformas',
  'platform.hero.platform': 'Plataforma',
  'platform.hero.production': 'Listo para producción',
  'platform.cta.start': 'Iniciar despliegue',
  'platform.cta.modules': 'Explorar módulos',
  'platform.modules.eyebrow': 'Módulos de plataforma',
  'platform.modules.title': 'Infraestructura modular que puedes activar de forma independiente.',
  'platform.workflow.eyebrow': 'Flujo de despliegue',
  'platform.workflow.title': 'De kickoff a producción en cuatro pasos estructurados.',
  'platform.workflow.step': 'Paso',
  'platform.tech.eyebrow': 'Arquitectura técnica',
  'platform.tech.title': '{name} se ejecuta sobre el stack cloud-native de FlyttGo.',
  'platform.arch.layers': 'Capas de arquitectura',
  'platform.case.eyebrow': 'Casos de éxito',
  'platform.case.title': 'Organizaciones que ya despliegan {name}.',
  'platform.pricing.eyebrow': 'Niveles de despliegue',
  'platform.pricing.title': 'Escala de piloto a infraestructura nacional.',
  'platform.pricing.popular': 'Más popular',
  'platform.related.title': 'Explora otras plataformas del ecosistema',
  'platform.form.received': 'Solicitud recibida',
  'platform.form.respond': 'Nuestro equipo de despliegue de {platform} responderá en breve.',
  'platform.form.another': 'Enviar otra solicitud',
};

const sv: Dictionary = {
  'utility.tagline': 'Plattformsinfrastruktur · Företag och offentlig sektor',
  'utility.language': 'Språk',
  'nav.platforms': 'Plattformar',
  'nav.industries': 'Branscher',
  'nav.deployment': 'Driftsättning',
  'nav.technology': 'Teknologi',
  'nav.company': 'Företag',
  'nav.contact': 'Kontakt',
  'nav.search': 'Sök',
  'nav.signin': 'Logga in',
  'nav.cta.primary': 'Driftsätt din plattform',
  'nav.feature.title': 'Plattformsekosystem',
  'nav.feature.description':
    'Modulära infrastrukturplattformar plus FlyttGo-marknadsplatsen — licensierade separat, driftsatta tillsammans.',
  'nav.feature.cta': 'Utforska ekosystemet',
  'hero.eyebrow': 'Plattformsinfrastruktur · EU · AF · MENA',
  'hero.title.part1': 'Driftsätt digitala infrastrukturplattformar i nationell skala',
  'hero.title.part2': 'Utan att bygga system från grunden',
  'hero.cta.primary': 'Utforska plattformsekosystemet',
  'hero.cta.secondary': 'Begär partnerskapssamtal',
  'footer.tagline':
    'Modulär plattformsinfrastruktur för logistik, utbildning, förvaltning och företag — driftsatt i Europa, Afrika och Mellanöstern.',
  'footer.status': 'Alla system i drift',
  'footer.deploy': 'Driftsätt din plattform',
  'footer.legal.privacy': 'Integritet',
  'footer.legal.terms': 'Villkor',
  'footer.legal.security': 'Säkerhet',
  'footer.legal.compliance': 'Efterlevnad',
  'footer.legal.contact': 'Kontakt',
  'cta.learnMore': 'Läs mer',
  'cta.contact': 'Kontakta oss',
  'cta.back': 'Tillbaka',

  'home.trust.heading': 'Driftsatt för',
  'home.platform.eyebrow': 'Plattformsekosystem',
  'home.platform.title.part1': 'Ett infrastrukturekosystem.',
  'home.platform.title.part2': 'Modulära driftsättnings­plattformar.',
  'home.platform.cta': 'Se hela ekosystemet',
  'home.deployment.eyebrow': 'Driftsättnings­arkitektur',
  'home.deployment.title': 'Driftsätt på dina villkor.',
  'home.deployment.cta': 'Driftsättnings­detaljer',
  'home.industries.eyebrow': 'Branscher vi betjänar',
  'home.industries.title': 'Byggd för institutioner och operatörer.',
  'home.tech.eyebrow': 'Teknologiinfrastruktur',
  'home.tech.title': 'Molnbaserad plattforms-stack.',
  'home.faq.eyebrow': 'Upphandlings- och driftsättnings-FAQ',
  'home.faq.title': 'Vanliga frågor från driftsättnings­partners.',
  'home.cta.eyebrow': 'Redo när du är det',
  'home.cta.title.part1': 'Börja driftsätta din',
  'home.cta.title.part2': 'plattforms­infrastruktur idag',
  'home.cta.primary': 'Driftsätt din plattform',
  'home.cta.secondary': 'Boka infrastruktur­demo',
};

const da: Dictionary = {
  'utility.tagline': 'Platformsinfrastruktur · Erhverv og offentlig sektor',
  'utility.language': 'Sprog',
  'nav.platforms': 'Platforme',
  'nav.industries': 'Brancher',
  'nav.deployment': 'Udrulning',
  'nav.technology': 'Teknologi',
  'nav.company': 'Virksomhed',
  'nav.contact': 'Kontakt',
  'nav.search': 'Søg',
  'nav.signin': 'Log ind',
  'nav.cta.primary': 'Udrul din platform',
  'nav.feature.title': 'Platformsøkosystem',
  'nav.feature.description':
    'Modulære infrastrukturplatforme plus FlyttGo-markedspladsen — licenseret hver for sig, udrullet sammen.',
  'nav.feature.cta': 'Udforsk økosystemet',
  'hero.eyebrow': 'Platformsinfrastruktur · EU · AF · MENA',
  'hero.title.part1': 'Udrul digital infrastruktur i national skala',
  'hero.title.part2': 'Uden at bygge systemer fra bunden',
  'hero.cta.primary': 'Udforsk platformsøkosystemet',
  'hero.cta.secondary': 'Anmod om partnerskabssamtale',
  'footer.tagline':
    'Modulær platformsinfrastruktur til logistik, uddannelse, forvaltning og erhverv — udrullet i Europa, Afrika og Mellemøsten.',
  'footer.status': 'Alle systemer i drift',
  'footer.deploy': 'Udrul din platform',
  'footer.legal.privacy': 'Privatliv',
  'footer.legal.terms': 'Vilkår',
  'footer.legal.security': 'Sikkerhed',
  'footer.legal.compliance': 'Overholdelse',
  'footer.legal.contact': 'Kontakt',
  'cta.learnMore': 'Læs mere',
  'cta.contact': 'Kontakt os',
  'cta.back': 'Tilbage',

  'home.trust.heading': 'Udrullet til',
  'home.platform.eyebrow': 'Platformsøkosystem',
  'home.platform.title.part1': 'Ét infrastrukturøkosystem.',
  'home.platform.title.part2': 'Modulære udrulnings­platforme.',
  'home.platform.cta': 'Se hele økosystemet',
  'home.deployment.eyebrow': 'Udrulningsarkitektur',
  'home.deployment.title': 'Udrul på dine betingelser.',
  'home.deployment.cta': 'Udrulningsdetaljer',
  'home.industries.eyebrow': 'Betjente brancher',
  'home.industries.title': 'Bygget til institutioner og operatører.',
  'home.tech.eyebrow': 'Teknologi­infrastruktur',
  'home.tech.title': 'Cloud-native platform-stack.',
  'home.faq.eyebrow': 'FAQ om indkøb og udrulning',
  'home.faq.title': 'Hyppige spørgsmål fra udrulnings­partnere.',
  'home.cta.eyebrow': 'Klar når du er det',
  'home.cta.title.part1': 'Begynd at udrulle din',
  'home.cta.title.part2': 'platforms­infrastruktur i dag',
  'home.cta.primary': 'Udrul din platform',
  'home.cta.secondary': 'Book infrastruktur­demo',
};

const nl: Dictionary = {
  'utility.tagline': 'Platforminfrastructuur · Bedrijfsleven & publieke sector',
  'utility.language': 'Taal',
  'nav.platforms': 'Platformen',
  'nav.industries': 'Sectoren',
  'nav.deployment': 'Uitrol',
  'nav.technology': 'Technologie',
  'nav.company': 'Onderneming',
  'nav.contact': 'Contact',
  'nav.search': 'Zoeken',
  'nav.signin': 'Inloggen',
  'nav.cta.primary': 'Rol je platform uit',
  'nav.feature.title': 'Platform-ecosysteem',
  'nav.feature.description':
    'Modulaire infrastructuurplatformen plus de FlyttGo-marktplaats — afzonderlijk gelicenseerd, samen uitgerold.',
  'nav.feature.cta': 'Ontdek het ecosysteem',
  'hero.eyebrow': 'Platforminfrastructuur · EU · AF · MENA',
  'hero.title.part1': 'Rol digitale infrastructuurplatformen uit op nationale schaal',
  'hero.title.part2': 'Zonder systemen vanaf nul te bouwen',
  'hero.cta.primary': 'Ontdek het platform-ecosysteem',
  'hero.cta.secondary': 'Vraag een partnergesprek aan',
  'footer.tagline':
    'Modulaire platforminfrastructuur voor logistiek, onderwijs, overheid en bedrijven — uitgerold in Europa, Afrika en het Midden-Oosten.',
  'footer.status': 'Alle systemen operationeel',
  'footer.deploy': 'Rol je platform uit',
  'footer.legal.privacy': 'Privacy',
  'footer.legal.terms': 'Voorwaarden',
  'footer.legal.security': 'Beveiliging',
  'footer.legal.compliance': 'Naleving',
  'footer.legal.contact': 'Contact',
  'cta.learnMore': 'Meer weten',
  'cta.contact': 'Neem contact op',
  'cta.back': 'Terug',

  'home.trust.heading': 'Uitgerold voor',
  'home.platform.eyebrow': 'Platform-ecosysteem',
  'home.platform.title.part1': 'Eén infrastructuur-ecosysteem.',
  'home.platform.title.part2': 'Modulaire uitrol­platformen.',
  'home.platform.cta': 'Bekijk het hele ecosysteem',
  'home.deployment.eyebrow': 'Uitrolarchitectuur',
  'home.deployment.title': 'Uitrollen op jouw voorwaarden.',
  'home.deployment.cta': 'Uitrol­details',
  'home.industries.eyebrow': 'Bediende sectoren',
  'home.industries.title': 'Gebouwd voor instellingen en operators.',
  'home.tech.eyebrow': 'Technologie-infrastructuur',
  'home.tech.title': 'Cloud-native platform-stack.',
  'home.faq.eyebrow': 'FAQ inkoop & uitrol',
  'home.faq.title': 'Veelgestelde vragen van uitrol­partners.',
  'home.cta.eyebrow': 'Klaar wanneer jij dat bent',
  'home.cta.title.part1': 'Begin vandaag met het uitrollen van jouw',
  'home.cta.title.part2': 'platform­infrastructuur',
  'home.cta.primary': 'Rol je platform uit',
  'home.cta.secondary': 'Plan een infrastructuur­demo',
};

const pt: Dictionary = {
  'utility.tagline': 'Infraestrutura de plataforma · Empresa & sector público',
  'utility.language': 'Idioma',
  'nav.platforms': 'Plataformas',
  'nav.industries': 'Setores',
  'nav.deployment': 'Implantação',
  'nav.technology': 'Tecnologia',
  'nav.company': 'Empresa',
  'nav.contact': 'Contacto',
  'nav.search': 'Pesquisar',
  'nav.signin': 'Entrar',
  'nav.cta.primary': 'Implante a sua plataforma',
  'nav.feature.title': 'Ecossistema de plataformas',
  'nav.feature.description':
    'Plataformas de infraestrutura modulares e o marketplace FlyttGo — licenciados separadamente, implantados juntos.',
  'nav.feature.cta': 'Explorar o ecossistema',
  'hero.eyebrow': 'Infraestrutura de plataforma · UE · AF · MENA',
  'hero.title.part1': 'Implante plataformas de infraestrutura digital à escala nacional',
  'hero.title.part2': 'Sem construir sistemas do zero',
  'hero.cta.primary': 'Explorar o ecossistema de plataformas',
  'hero.cta.secondary': 'Solicitar reunião de parceria',
  'footer.tagline':
    'Infraestrutura de plataforma modular para logística, educação, administração pública e empresas — implantada na Europa, África e Médio Oriente.',
  'footer.status': 'Todos os sistemas operacionais',
  'footer.deploy': 'Implante a sua plataforma',
  'footer.legal.privacy': 'Privacidade',
  'footer.legal.terms': 'Termos',
  'footer.legal.security': 'Segurança',
  'footer.legal.compliance': 'Conformidade',
  'footer.legal.contact': 'Contacto',
  'cta.learnMore': 'Saber mais',
  'cta.contact': 'Fale connosco',
  'cta.back': 'Voltar',

  'home.trust.heading': 'Implantado para',
  'home.platform.eyebrow': 'Ecossistema de plataformas',
  'home.platform.title.part1': 'Um ecossistema de infraestrutura.',
  'home.platform.title.part2': 'Plataformas de implantação modulares.',
  'home.platform.cta': 'Ver o ecossistema completo',
  'home.deployment.eyebrow': 'Arquitetura de implantação',
  'home.deployment.title': 'Implante nos seus termos.',
  'home.deployment.cta': 'Detalhes da implantação',
  'home.industries.eyebrow': 'Setores atendidos',
  'home.industries.title': 'Construído para instituições e operadores.',
  'home.tech.eyebrow': 'Infraestrutura tecnológica',
  'home.tech.title': 'Stack de plataforma cloud-native.',
  'home.faq.eyebrow': 'FAQ de compras e implantação',
  'home.faq.title': 'Perguntas frequentes de parceiros de implantação.',
  'home.cta.eyebrow': 'Prontos quando estiver pronto',
  'home.cta.title.part1': 'Comece hoje a implantar a sua',
  'home.cta.title.part2': 'infraestrutura de plataforma',
  'home.cta.primary': 'Implante a sua plataforma',
  'home.cta.secondary': 'Agendar demo de infraestrutura',
};

const ar: Dictionary = {
  'utility.tagline': 'بنية تحتية للمنصات · للشركات والقطاع العام',
  'utility.language': 'اللغة',
  'nav.platforms': 'المنصات',
  'nav.industries': 'القطاعات',
  'nav.deployment': 'النشر',
  'nav.technology': 'التقنية',
  'nav.company': 'الشركة',
  'nav.contact': 'تواصل',
  'nav.search': 'بحث',
  'nav.signin': 'تسجيل الدخول',
  'nav.cta.primary': 'انشر منصتك',
  'nav.feature.title': 'منظومة المنصات',
  'nav.feature.description':
    'منصات بنية تحتية معيارية بالإضافة إلى سوق FlyttGo — مرخصة بشكل مستقل، وتُنشر معًا.',
  'nav.feature.cta': 'استكشاف المنظومة',
  'nav.group.infra': 'منصات البنية التحتية',
  'nav.group.marketplace': 'منصة السوق',
  'hero.eyebrow': 'بنية تحتية للمنصات · الاتحاد الأوروبي · إفريقيا · الشرق الأوسط',
  'hero.title.part1': 'انشر منصات بنية تحتية رقمية على نطاق وطني',
  'hero.title.part2': 'دون بناء الأنظمة من الصفر',
  'hero.subtitle':
    'تصمّم FlyttGo Technologies Group منصات معيارية لتنسيق التنقل، وأنظمة القوى العاملة، والذكاء التعليمي، وأتمتة العمليات المالية، والتحقق من الهوية، وتقديم الخدمات الحكومية في المدن والمناطق.',
  'hero.cta.primary': 'استكشاف منظومة المنصات',
  'hero.cta.secondary': 'طلب محادثة شراكة',
  'footer.tagline':
    'بنية تحتية معيارية للمنصات في اللوجستيات والتعليم والحكومة والمؤسسات — منتشرة في أوروبا وإفريقيا والشرق الأوسط.',
  'footer.group.platforms': 'المنصات',
  'footer.group.industries': 'القطاعات',
  'footer.group.company': 'الشركة',
  'footer.group.resources': 'المصادر',
  'footer.enterprise': 'المؤسسات',
  'footer.certifications': 'الشهادات والامتثال',
  'footer.regions': 'مناطق النشر',
  'footer.status': 'جميع الأنظمة تعمل',
  'footer.deploy': 'انشر منصتك',
  'footer.legal.privacy': 'الخصوصية',
  'footer.legal.terms': 'الشروط',
  'footer.legal.security': 'الأمن',
  'footer.legal.compliance': 'الامتثال',
  'footer.legal.contact': 'تواصل',
  'cta.learnMore': 'اعرف المزيد',
  'cta.contact': 'تواصل معنا',
  'cta.back': 'رجوع',

  'home.trust.heading': 'تم النشر لدى',
  'home.platform.eyebrow': 'منظومة المنصات',
  'home.platform.title.part1': 'منظومة بنية تحتية واحدة.',
  'home.platform.title.part2': 'منصات نشر معيارية.',
  'home.platform.description':
    'تنشر الحكومات والجامعات ومشغلو النقل وبناة الأسواق منصات FlyttGo كوحدات معيارية.',
  'home.platform.cta': 'استكشاف المنظومة كاملة',
  'home.deployment.eyebrow': 'هيكل النشر',
  'home.deployment.title': 'انشر وفق شروطك.',
  'home.deployment.description': 'ثلاثة أنماط للنشر تناسب أي شراء أو متطلبات سيادية.',
  'home.deployment.cta': 'تفاصيل النشر',
  'home.industries.eyebrow': 'القطاعات التي نخدمها',
  'home.industries.title': 'مصمَّم للمؤسسات والمشغلين.',
  'home.tech.eyebrow': 'البنية التقنية',
  'home.tech.title': 'حزمة منصة سحابية الأصل.',
  'home.faq.eyebrow': 'الأسئلة الشائعة للشراء والنشر',
  'home.faq.title': 'أسئلة شائعة من شركاء النشر.',
  'home.cta.eyebrow': 'جاهزون حين تكون جاهزاً',
  'home.cta.title.part1': 'ابدأ نشر',
  'home.cta.title.part2': 'بنيتك التحتية للمنصة اليوم',
  'home.cta.primary': 'انشر منصتك',
  'home.cta.secondary': 'حجز عرض توضيحي للبنية التحتية',

  'sector.challenges': 'تحديات شائعة',
  'sector.outcomes': 'نتائج FlyttGo',
  'sector.platforms.heading': 'المنصات المنشورة لهذا القطاع',
  'sector.platforms.subheading': 'منصات معيارية بحجم القطاع.',
  'sector.deployment.heading': 'نمط النشر',
  'sector.cta.button': 'ابدأ محادثة نشر',
  'sector.cta.review': 'استعراض هيكل النشر',

  'mode.characteristics': 'الخصائص',
  'mode.timeline': 'الجدول الزمني',
  'mode.regions': 'تغطية المناطق',
  'mode.scope': 'تحديد نطاق النشر',
  'mode.bestFit': 'الأنسب لـ',

  'status.eyebrow': 'حالة المنصة',
  'status.title': 'جميع الأنظمة تعمل.',
  'status.components': 'صحة المكونات',
  'status.updated': 'تم التحديث',
  'status.operational': 'قيد التشغيل',
  'status.incidents.title': 'سجل الحوادث واتفاقيات SLA للمؤسسات',
  'status.incidents.cta': 'طلب وثائق SLA',

  'legal.effective': 'سارٍ من',
  'legal.privacy.eyebrow': 'قانوني · الخصوصية',
  'legal.privacy.title': 'كيف تتعامل FlyttGo مع بياناتك — بشفافية.',
  'legal.terms.eyebrow': 'قانوني · الشروط',
  'legal.terms.title': 'شروط الخدمة لموقع flyttgotech.com.',
  'legal.security.eyebrow': 'الثقة · الأمن',
  'legal.security.title': 'أمن مصمَّم لعمليات النشر بالمقياس الوطني.',
  'legal.compliance.eyebrow': 'الثقة · الامتثال',
  'legal.compliance.title': 'الامتثال عبر الاتحاد الأوروبي وإفريقيا والشرق الأوسط.',

  'company.leadership.eyebrow': 'الشركة · القيادة',
  'company.leadership.title':
    'نُشغِّل طبقة المنصات التي تنتشر عليها المؤسسات الأخرى.',
  'company.careers.eyebrow': 'الشركة · الوظائف',
  'company.careers.title':
    'ساعد المشغلين في نشر منصات بمقياس وطني — دون سنوات من البناء.',
  'company.careers.openings': 'الوظائف المتاحة',
  'company.press.eyebrow': 'الشركة · الإعلام',
  'company.press.title': 'موارد الإعلام والصحافة.',
  'company.press.boilerplate': 'نبذة عن الشركة',

  'sitemap.eyebrow': 'التنقل',
  'sitemap.title': 'كل صفحة في flyttgotech.com في عرض واحد.',
  'sitemap.machineReadable': 'هل تبحث عن النسخة الخاصة بالآلة؟',

  'platform.back': 'العودة إلى منظومة المنصات',
  'platform.hero.platform': 'منصة',
  'platform.hero.production': 'جاهز للإنتاج',
  'platform.cta.start': 'ابدأ النشر',
  'platform.cta.modules': 'استكشاف الوحدات',
  'platform.modules.eyebrow': 'وحدات المنصة',
  'platform.modules.title': 'بنية تحتية معيارية يمكن تفعيلها باستقلالية.',
  'platform.workflow.eyebrow': 'سير عمل النشر',
  'platform.workflow.title': 'من البدء إلى الإنتاج في أربع خطوات منظمة.',
  'platform.workflow.step': 'خطوة',
  'platform.tech.eyebrow': 'البنية التقنية',
  'platform.tech.title': '{name} تعمل على حزمة FlyttGo السحابية الأصل.',
  'platform.arch.layers': 'طبقات البنية',
  'platform.case.eyebrow': 'دراسات حالة',
  'platform.case.title': 'مؤسسات تنشر {name} بالفعل.',
  'platform.pricing.eyebrow': 'مستويات النشر',
  'platform.pricing.title': 'من التجربة إلى البنية التحتية الوطنية.',
  'platform.pricing.popular': 'الأكثر شعبية',
  'platform.related.title': 'استكشاف منصات أخرى في المنظومة',
  'platform.form.received': 'تم استلام الطلب',
  'platform.form.respond': 'سيرد فريق نشر {platform} قريباً.',
  'platform.form.another': 'إرسال طلب آخر',
};

export const DICTIONARIES: Record<LocaleCode, Dictionary> = {
  EN: en,
  NO: no,
  FR: fr,
  DE: de,
  ES: es,
  SV: sv,
  DA: da,
  NL: nl,
  PT: pt,
  AR: ar,
};
