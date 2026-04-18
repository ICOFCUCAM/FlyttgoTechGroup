import type { LocaleCode } from '@/lib/i18n/locales';
import type { DeploymentMode } from './deployment-modes';

type Override = Partial<
  Pick<
    DeploymentMode,
    | 'name'
    | 'eyebrow'
    | 'headline'
    | 'description'
    | 'characteristics'
    | 'bestFor'
    | 'timeline'
    | 'regions'
  >
>;

type Overlay = Partial<Record<LocaleCode, Override>>;

export const DEPLOYMENT_MODE_I18N: Record<string, Overlay> = {
  managed: {
    NO: {
      name: 'FlyttGo-forvaltet',
      eyebrow: 'Forvaltet SaaS',
      headline: 'Fullt forvaltet plattform­infrastruktur, regionsbevisst.',
      description:
        'Produksjonsklare tenants på FlyttGo-infrastruktur. Vi drifter plattformlaget ende til ende — skalering, patching, overvåkning, hendelses­respons — så teamet ditt kan fokusere på programmet.',
      characteristics: [
        { label: 'Hosting', value: 'FlyttGo-driftet sky (primært EU; regionale utvidelser)' },
        { label: 'Drift', value: 'FlyttGo 24/7 SOC + plattform-SRE' },
        { label: 'Datalokalisering', value: 'Per-region tenants med garantert datalokasjon' },
        { label: 'Tilpasning', value: 'Konfigurasjon + tenant-branding; kode-utvidelser på veikartet' },
        { label: 'Tid til produksjon', value: '60–90 dager' },
      ],
      bestFor: [
        'Operatører som vil validere raskt og skalere senere',
        'Bedrifter uten et dedikert plattform-SRE-team',
        'Markedsplass-byggere i lanserings- og vekstfasen',
      ],
      timeline:
        '60–90 dager · Oppdagelse → tenant-klargjøring → integrasjon → go-live',
      regions: ['EU (primær)', 'MENA (dedikert)', 'AF (på forespørsel)'],
    },
    FR: {
      name: 'Géré par FlyttGo',
      eyebrow: 'SaaS géré',
      headline: 'Infrastructure de plateforme entièrement gérée, consciente de la région.',
      description:
        'Tenants prêts pour la production sur infrastructure FlyttGo. Nous opérons la couche de plateforme de bout en bout — scaling, patching, monitoring, réponse aux incidents — pour que vos équipes se concentrent sur l’exécution du programme.',
      characteristics: [
        { label: 'Hébergement', value: 'Cloud opéré par FlyttGo (UE principal ; extensions régionales)' },
        { label: 'Opérations', value: 'SOC 24/7 FlyttGo + SRE plateforme' },
        { label: 'Résidence des données', value: 'Tenants par région avec garanties de localisation' },
        { label: 'Personnalisation', value: 'Configuration + marquage tenant ; extensions code sur la roadmap' },
        { label: 'Délai de production', value: '60–90 jours' },
      ],
      bestFor: [
        'Opérateurs qui veulent valider rapidement et passer à l’échelle ensuite',
        'Entreprises sans équipe SRE plateforme dédiée',
        'Créateurs de places de marché en phase de lancement et croissance',
      ],
      timeline:
        '60–90 jours · Découverte → provisioning tenant → intégration → mise en production',
      regions: ['UE (principal)', 'MENA (dédié)', 'AF (sur demande)'],
    },
  },
  'customer-cloud': {
    NO: {
      name: 'Kunde­sky',
      eyebrow: 'BYO-sky',
      headline: 'Kjør FlyttGo i din egen AWS-, Azure- eller GCP-tenant.',
      description:
        'Ideelt for bedrifter med eksisterende skyforpliktelser og interne sikkerhetsteam. FlyttGo-plattformer rulles ut som infrastruktur-som-kode-moduler i kontoen din, integrert med ditt IAM, SIEM og nøkkel­håndtering.',
      characteristics: [
        { label: 'Hosting', value: 'Din AWS- / Azure- / GCP-konto' },
        { label: 'Drift', value: 'Delt — FlyttGo plattform-team + din SRE' },
        { label: 'Datalokalisering', value: 'Følger kontoens / regionens konfigurasjon' },
        { label: 'Tilpasning', value: 'Full IaC + utvidelses­punkter' },
        { label: 'Tid til produksjon', value: '75–120 dager' },
      ],
      bestFor: [
        'Bedrifter med aktive skyforpliktelser (EDP-er, MACC-er)',
        'Regulerte operatører med sterke interne sikkerhetsteam',
        'Kunder som migrerer fra egenutviklede løsninger',
      ],
      timeline:
        '75–120 dager · Sikkerhets­gjennomgang → IaC-utrulling → IAM/SIEM-integrasjon → go-live',
      regions: ['Alle regioner støttet av skyleverandøren din'],
    },
    FR: {
      name: 'Cloud client',
      eyebrow: 'BYO cloud',
      headline: 'Exécutez FlyttGo dans votre tenant AWS, Azure ou GCP.',
      description:
        'Idéal pour les entreprises disposant d’engagements cloud existants et d’équipes sécurité internes. Les plateformes FlyttGo sont déployées sous forme de modules infrastructure-as-code dans votre compte, intégrées à vos IAM, SIEM et gestion de clés.',
      characteristics: [
        { label: 'Hébergement', value: 'Votre compte AWS / Azure / GCP' },
        { label: 'Opérations', value: 'Partagées — équipe plateforme FlyttGo + votre SRE' },
        { label: 'Résidence des données', value: 'Suit la configuration de votre compte / région' },
        { label: 'Personnalisation', value: 'IaC complet + points d’extension' },
        { label: 'Délai de production', value: '75–120 jours' },
      ],
      bestFor: [
        'Entreprises avec engagements cloud actifs (EDP, MACC)',
        'Opérateurs régulés avec équipes sécurité internes solides',
        'Clients migrant depuis des développements internes sur mesure',
      ],
      timeline:
        '75–120 jours · Revue sécurité → déploiement IaC → intégration IAM/SIEM → mise en production',
      regions: ['Toutes régions supportées par votre fournisseur cloud'],
    },
  },
  sovereign: {
    NO: {
      name: 'Suverent datasenter',
      eyebrow: 'Suveren',
      headline:
        'Selvhostet i nasjonale datasentre for offentlige anskaffelser.',
      description:
        'For departementer, direktorater og regulerte bransjer som krever suveren hosting. FlyttGo-plattformer rulles ut i sertifiserte nasjonale datasentre med full air-gap og nasjonal nøkkel­håndtering.',
      characteristics: [
        { label: 'Hosting', value: 'Nasjonalt datasenter (kundevalgt)' },
        { label: 'Drift', value: 'Kundens SRE med FlyttGo fjernstøtte (valgfritt)' },
        { label: 'Datalokalisering', value: 'I landet, i jurisdiksjonen, eventuelt air-gapped' },
        { label: 'Tilpasning', value: 'Full kildekode + utvidelses­punkter under lisens' },
        { label: 'Tid til produksjon', value: '120–180 dager' },
      ],
      bestFor: [
        'Departementer og nasjonale direktorater',
        'Regulerte bransjer med strenge krav til datalokalisering / suverenitet',
        'Grenseoverskridende gods- og identitets­programmer',
      ],
      timeline:
        '120–180 dager · Anskaffelse → datasenter-aktivering → herding → go-live',
      regions: ['EU-medlemsstater', 'Storbritannia', 'GCC', 'Utvalgte afrikanske nasjonale datasentre'],
    },
    FR: {
      name: 'Datacenter souverain',
      eyebrow: 'Souverain',
      headline:
        'Auto-hébergé dans des datacenters nationaux pour les achats publics.',
      description:
        'Pour ministères, agences et industries régulées exigeant un hébergement souverain. Les plateformes FlyttGo sont déployées dans des datacenters nationaux certifiés avec options air-gap complètes et gestion de clés nationale.',
      characteristics: [
        { label: 'Hébergement', value: 'Datacenter national (choisi par le client)' },
        { label: 'Opérations', value: 'SRE client avec support distant FlyttGo (option)' },
        { label: 'Résidence des données', value: 'Dans le pays, dans la juridiction, optionnellement air-gapped' },
        { label: 'Personnalisation', value: 'Code source complet + points d’extension sous licence' },
        { label: 'Délai de production', value: '120–180 jours' },
      ],
      bestFor: [
        'Ministères et agences nationales',
        'Industries régulées avec contraintes strictes de résidence / souveraineté',
        'Programmes transfrontaliers de fret et d’identité',
      ],
      timeline:
        '120–180 jours · Achat → activation datacenter → durcissement → mise en production',
      regions: ['États membres de l’UE', 'Royaume-Uni', 'CCG', 'Datacenters nationaux africains sélectionnés'],
    },
  },
};

export function localizeDeploymentMode(
  mode: DeploymentMode,
  locale: LocaleCode,
): DeploymentMode {
  const override = DEPLOYMENT_MODE_I18N[mode.slug]?.[locale];
  return override ? { ...mode, ...override } : mode;
}
