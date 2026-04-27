import type { LocaleCode } from '@/lib/i18n/locales';
import type { IndustrySector } from './industries';

type Override = Partial<
  Pick<
    IndustrySector,
    | 'name'
    | 'eyebrow'
    | 'headline'
    | 'description'
    | 'challenges'
    | 'outcomes'
    | 'deploymentNote'
  >
>;

type Overlay = Partial<Record<LocaleCode, Override>>;

export const INDUSTRY_I18N: Record<string, Overlay> = {
  government: {
    NO: {
      name: 'Offentlig sektor og kommuner',
      eyebrow: 'Offentlig sektor',
      headline:
        'Rull ut innbyggertjenester og kommunal koordinering på suveren infrastruktur.',
      description:
        'Departementer, direktorater og kommuner bruker FlyttGo til å rulle ut tillatelses­arbeidsflyter, innbygger­dashbord, identitetsverifisering og kryssetats­koordinering — inne i nasjonale datasentre når det kreves.',
      challenges: [
        'Eldre systemer uten samhandlingslag mellom etatene',
        'Manuelle tillatelses­prosesser som lar innbyggere vente i ukevis',
        'Krav til datalokalisering og suverenitet',
        'Anskaffelses­sykluser målt i år, ikke måneder',
      ],
      outcomes: [
        'Modulær Civitas-tenant per etat, med delt Identra-identitetslag',
        'Fra søknad til utstedt tillatelse på dager i stedet for uker',
        'Suveren hosting i nasjonale datasentre med full revisjons­sporing',
        'Rammeavtaler via flerårige ordreskjemaer',
      ],
      deploymentNote:
        'Suverent nasjonalt datasenter eller kunde­sky med håndheving av datalokalisering.',
    },
    FR: {
      name: 'Gouvernement & Collectivités',
      eyebrow: 'Secteur public',
      headline:
        'Déployez les services aux citoyens et la coordination municipale sur une infrastructure souveraine.',
      description:
        'Ministères, agences et municipalités utilisent FlyttGo pour déployer des workflows de permis, des tableaux de bord citoyens, la vérification d’identité et la coordination inter-agences — au sein de datacenters nationaux souverains lorsque requis.',
      challenges: [
        'Systèmes hérités sans couche d’interopérabilité entre ministères',
        'Workflows de permis manuels qui font attendre les citoyens des semaines',
        'Contraintes de résidence et de souveraineté des données',
        'Cycles d’achat mesurés en années, pas en mois',
      ],
      outcomes: [
        'Tenant Civitas modulaire par agence, avec couche d’identité Identra partagée',
        'Cycle permis-à-émission en jours au lieu de semaines',
        'Hébergement souverain au sein des datacenters nationaux avec piste d’audit complète',
        'Achat compatible avec les accords-cadres via des bons de commande pluriannuels',
      ],
      deploymentNote:
        'Datacenter national souverain ou cloud client avec application de la résidence des données.',
    },
  },
  education: {
    NO: {
      name: 'Utdanning og departementer',
      eyebrow: 'Utdannings­systemer',
      headline:
        'Opptak, stipender og institusjonell analyse for universiteter og departementer.',
      description:
        'Utdannings­departementer og universiteter bruker FlyttGo til å drifte opptak, stipender, institusjonell analyse og studenttjenester — rullet ut som en tenant-isolert utdannings­intelligens­plattform.',
      challenges: [
        'Siloiserte opptaks-, studie- og økonomisystemer på tvers av institusjoner',
        'Papirintensive stipend­arbeidsflyter og kvalifiserings­vurderinger',
        'Manglende delt analyselag for departementalt tilsyn',
        'Student­autentisering spredt på titalls lokale IdP-er',
      ],
      outcomes: [
        'EduPro-opptak og stipend­flyter under departementets kontroll',
        'Institusjonell analyse rullet opp til departementets dashbord',
        'Identra nasjonal student-ID-føderasjon på tvers av universiteter',
        'Payvera håndterer studieavgifter, stipender og utbetalinger på én skinne',
      ],
      deploymentNote:
        'Kunde­sky eller forvaltet EU-utrulling med tenant på departementsnivå.',
    },
    FR: {
      name: 'Éducation & Ministères',
      eyebrow: 'Systèmes éducatifs',
      headline:
        'Admissions, bourses et analyses institutionnelles pour universités et ministères.',
      description:
        'Ministères de l’éducation et universités utilisent FlyttGo pour opérer admissions, bourses, analyses institutionnelles et services étudiants — déployés comme plateforme d’intelligence éducative isolée par tenant.',
      challenges: [
        'Systèmes d’admissions, scolarité et finances cloisonnés entre institutions',
        'Workflows de bourses papier et vérifications d’éligibilité manuelles',
        'Pas de couche analytique partagée pour la supervision ministérielle',
        'Authentification étudiante fragmentée sur des dizaines d’IdP locaux',
      ],
      outcomes: [
        'Admissions et bourses EduPro sous contrôle du ministère',
        'Analyses institutionnelles remontées au tableau de bord ministériel',
        'Fédération nationale d’identité étudiante Identra entre universités',
        'Payvera gère frais de scolarité, bourses et allocations sur un seul rail',
      ],
      deploymentNote:
        'Cloud client ou déploiement managé UE avec tenant au niveau du ministère.',
    },
  },
  transport: {
    NO: {
      name: 'Transport og logistikk',
      eyebrow: 'Mobilitet og gods',
      headline:
        'Flåteintelligens, dispatch og regional mobilitets­koordinering.',
      description:
        'Transport­myndigheter, bedriftsflåter og godsoperatører bruker FlyttGo til å koordinere dispatch, ruting, telematikk og sjåfør­operasjoner — i byer, havner og nasjonale nettverk.',
      challenges: [
        'Fragmentert flåte­telematikk på tvers av depoter og underleverandører',
        'Dårlig innsyn i aktive ruter og operatør­atferd',
        'Samsvars­rapportering som krever dager med manuelt arbeid',
        'Sertifiserings­sporing spredt over regneark',
      ],
      outcomes: [
        'Transify dispatch med live telemetri og rute­optimalisering',
        'Workverge håndterer sjåfør­onboarding, sertifisering og skift',
        'Enhetlig samsvars­visning for transport­myndigheter',
        'Ferdige integrasjoner mot nasjonale tillatelses- og skattesystemer',
      ],
      deploymentNote:
        'Forvaltet SaaS eller kunde­sky — regionsbevisst, lav latens.',
    },
    FR: {
      name: 'Transport & Logistique',
      eyebrow: 'Mobilité et fret',
      headline:
        'Intelligence de flotte, dispatch et coordination de mobilité régionale.',
      description:
        'Autorités de transport, flottes d’entreprise et opérateurs de fret utilisent FlyttGo pour coordonner dispatch, routage, télématique et opérations conducteurs — à l’échelle des villes, des ports et des réseaux nationaux.',
      challenges: [
        'Télématique de flotte fragmentée entre dépôts et sous-traitants',
        'Faible visibilité sur les itinéraires en temps réel',
        'Reporting de conformité qui consomme des jours de travail manuel',
        'Suivi des certifications dispersé dans des feuilles de calcul',
      ],
      outcomes: [
        'Dispatch Transify avec télémétrie en direct et optimisation d’itinéraires',
        'Workverge gère l’intégration, la certification et les shifts des conducteurs',
        'Vue de conformité unifiée pour les autorités de transport',
        'Intégrations prêtes aux systèmes nationaux de permis et de taxes',
      ],
      deploymentNote:
        'SaaS managé ou cloud client — conscient de la région, faible latence.',
    },
  },
  enterprise: {
    NO: {
      name: 'Bedrifts­operasjoner',
      eyebrow: 'Bedriftsflåter og -plattformer',
      headline:
        'Operative plattformer for bedriftsflåter, feltarbeidere og interne markedsplasser.',
      description:
        'Bedrifter bruker FlyttGo til å rulle ut interne plattformer — feltarbeider­koordinering, interne tjeneste­markedsplasser, flåteintelligens og betalings­orkestrering — på egen sky-tenant.',
      challenges: [
        'Hver ny operasjon krever en skreddersydd bygging',
        'Økonomi- og operasjons­data ligger i forskjellige systemer',
        'Leverandør­mangfold på tvers av logistikk, arbeidsstyrke og betaling',
        'Begrenset innsyn i operasjonelle kostnader på tvers av forretnings­enheter',
      ],
      outcomes: [
        'Transify + Workverge som operativ ryggrad på tvers av enheter',
        'Payvera + Ledgera gir økonomi sanntids P&L',
        'Kunde­sky-utrulling i eksisterende AWS/Azure/GCP-tenant',
        'Én leverandør, én SLA, én sikkerhets­gjennomgang',
      ],
      deploymentNote:
        'Kunde­sky i din AWS-, Azure- eller GCP-konto — integrert med eksisterende IAM.',
    },
    FR: {
      name: 'Opérations Entreprise',
      eyebrow: 'Flottes et plateformes d’entreprise',
      headline:
        'Plateformes opérationnelles pour flottes, équipes terrain et places de marché internes.',
      description:
        'Les entreprises utilisent FlyttGo pour déployer des plateformes internes — coordination d’équipes terrain, places de marché de services internes, intelligence de flotte et orchestration de paiements — sur leur propre tenant cloud.',
      challenges: [
        'Chaque nouvelle capacité opérationnelle exige un développement sur mesure',
        'Données finance et opérations dans des systèmes différents',
        'Prolifération de fournisseurs entre logistique, RH et paiement',
        'Visibilité limitée sur les dépenses opérationnelles inter-BU',
      ],
      outcomes: [
        'Transify + Workverge comme colonne opérationnelle inter-BU',
        'Payvera + Ledgera donnent à la finance un P&L opérationnel en temps réel',
        'Déploiement cloud client dans votre tenant AWS/Azure/GCP existant',
        'Un seul fournisseur, un seul SLA, une seule revue sécurité',
      ],
      deploymentNote:
        'Cloud client sous votre compte AWS, Azure ou GCP — intégré à votre IAM.',
    },
  },
  marketplaces: {
    NO: {
      name: 'Markedsplass­operatører',
      eyebrow: 'Regulerte markedsplasser',
      headline:
        'Lansér og drift regulerte, flersidige markedsplasser på utprøvd infrastruktur.',
      description:
        'Markedsplass­operatører — mobilitet, tjenester, logistikk — bruker FlyttGo til å lansere, skalere og regulere flersidige plattformer uten å bygge identitet, betalinger og dispatch fra bunnen.',
      challenges: [
        'Årelange byggeprosjekter for identitet, betalinger og dispatch',
        'Regulatorisk tilpasning på tvers av regioner og vertikaler',
        'KYC/KYB og sjåfør­samsvars­operasjoner',
        'Økonomisk avstemming av utbetalinger, skatter og provisjoner',
      ],
      outcomes: [
        'FlyttGo markedsplass­motor på Transify mobilitets­infrastruktur',
        'Identra håndterer KYC/KYB, Payvera håndterer orkestrering + utbetalinger',
        'Ledgera lukker sløyfen med samsvars­klare økonomi­operasjoner',
        'Lanser første region på måneder, ikke år',
      ],
      deploymentNote:
        'Forvaltet SaaS først; migrer til kunde­sky eller suveren når du skalerer.',
    },
    FR: {
      name: 'Opérateurs de places de marché',
      eyebrow: 'Marchés régulés',
      headline:
        'Lancez et opérez des places de marché multi-facettes régulées sur une infrastructure éprouvée.',
      description:
        'Les opérateurs de places de marché — mobilité, services, logistique — utilisent FlyttGo pour lancer, faire croître et réguler des plateformes multi-facettes sans construire identité, paiements et dispatch de zéro.',
      challenges: [
        'Plusieurs années de construction pour obtenir identité, paiements et dispatch corrects',
        'Alignement réglementaire entre régions et verticaux',
        'Opérations KYC/KYB et conformité conducteurs',
        'Réconciliation financière entre versements, taxes et commissions',
      ],
      outcomes: [
        'Moteur de marché FlyttGo sur l’infrastructure de mobilité Transify',
        'Identra gère KYC/KYB, Payvera gère orchestration + versements',
        'Ledgera ferme la boucle avec des opérations financières conformes',
        'Expédiez vers la première région en mois, pas en années',
      ],
      deploymentNote:
        'SaaS managé pour démarrer ; migrez vers cloud client ou souverain à mesure que vous grandissez.',
    },
  },
  logistics: {
    NO: {
      name: 'Gods- og logistikknettverk',
      eyebrow: 'Godskorridorer',
      headline:
        'Koordinering av godskorridorer gjennom havner, innlands­knutepunkt og grenseoverskridende nettverk.',
      description:
        'Gods- og logistikk­nettverks­operatører bruker FlyttGo til å koordinere bevegelser fra havn til innland, toll- og samsvars­hendelser og operatør­arbeidsstyrker på tvers av nasjonale og grenseoverskridende korridorer.',
      challenges: [
        'Begrenset innsyn fra havn til innlands­mottaker',
        'Manuelle toll- og samsvars­overleveringer',
        'Sjåførmangel som krever rask omfordeling av arbeidsstyrken',
        'Regulatoriske forskjeller på tvers av grenser',
      ],
      outcomes: [
        'Transify gods-modus med flertrinns, grenseoverskridende ruting',
        'Civitas eksponerer toll- og regulatoriske berørings­punkter som flyter',
        'Workverge håndterer operatør­rotasjon mellom korridorer',
        'Sanntids korridor-dashbord for myndighets­tilsyn',
      ],
      deploymentNote:
        'Typisk suveren eller kunde­sky for regulerte grenseoverskridende data.',
    },
    FR: {
      name: 'Réseaux de fret et logistique',
      eyebrow: 'Corridors de fret',
      headline:
        'Coordination de corridors de fret entre ports, hubs intérieurs et réseaux transfrontaliers.',
      description:
        'Les opérateurs de réseaux de fret et logistique utilisent FlyttGo pour coordonner les mouvements du port vers l’intérieur, les événements de douane et de conformité, et les effectifs opérateurs sur des corridors nationaux et transfrontaliers.',
      challenges: [
        'Visibilité limitée du port au destinataire intérieur',
        'Remises manuelles pour la douane et la conformité',
        'Pénuries de conducteurs exigeant une redistribution rapide',
        'Décalages réglementaires transfrontaliers',
      ],
      outcomes: [
        'Mode fret Transify avec routage multi-étapes transfrontalier',
        'Civitas expose les points de contact douaniers et réglementaires comme workflows',
        'Workverge gère la rotation des opérateurs entre corridors',
        'Tableaux de bord corridor en temps réel pour les autorités',
      ],
      deploymentNote:
        'Typiquement souverain ou cloud client pour les données transfrontalières régulées.',
    },
  },
};

export function localizeIndustry(
  sector: IndustrySector,
  locale: LocaleCode,
): IndustrySector {
  const override = INDUSTRY_I18N[sector.slug]?.[locale];
  return override ? { ...sector, ...override } : sector;
}
