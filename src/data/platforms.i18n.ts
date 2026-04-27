import type { LocaleCode } from '@/lib/i18n/locales';
import type { PlatformData } from './platforms';

// Scope: the short, identity-carrying strings on each platform page —
// subtitle (capability category) + tagline + description. Deep content
// (modules, workflow, pricing, architecture) stays English for now, to
// be translated together with the product team's voice guide.
type Override = Partial<
  Pick<PlatformData, 'subtitle' | 'tagline' | 'description'>
>;

type Overlay = Partial<Record<LocaleCode, Override>>;

export const PLATFORM_I18N: Record<string, Overlay> = {
  transify: {
    NO: {
      subtitle: 'Mobilitets­infrastruktur',
      tagline: 'Koordiner flåter, dispatch og regional bevegelse i byskala.',
      description:
        'Transify gir dispatch, ruting og telematikk for bedriftsflåter, transport­myndigheter og markedsplasser bygget på FlyttGo-infrastruktur.',
    },
    FR: {
      subtitle: 'Infrastructure de mobilité',
      tagline: 'Coordonnez flottes, dispatch et mouvement régional à l’échelle de la ville.',
      description:
        'Transify fournit dispatch, routage et télématique pour les flottes d’entreprise, les autorités de transport et les places de marché construites sur l’infrastructure FlyttGo.',
    },
    DE: {
      subtitle: 'Mobilitäts­infrastruktur',
      tagline: 'Koordinieren Sie Flotten, Dispatch und regionale Bewegung im Stadtmaßstab.',
      description:
        'Transify liefert Dispatch, Routing und Telematik für Unternehmensflotten, Verkehrs­behörden und Marktplätze auf der FlyttGo-Infrastruktur.',
    },
    ES: {
      subtitle: 'Infraestructura de movilidad',
      tagline: 'Coordina flotas, despacho y movilidad regional a escala de ciudad.',
      description:
        'Transify ofrece despacho, enrutamiento y telemática para flotas empresariales, autoridades de transporte y marketplaces construidos sobre la infraestructura FlyttGo.',
    },
    AR: {
      subtitle: 'بنية تحتية للتنقل',
      tagline: 'نسّق الأساطيل والإرسال والحركة الإقليمية على مستوى المدينة.',
      description:
        'يوفّر Transify الإرسال والتوجيه والتلمترية لأساطيل الشركات وهيئات النقل والأسواق المبنية على بنية FlyttGo التحتية.',
    },
  },
  workverge: {
    NO: {
      subtitle: 'Infrastruktur for arbeidsstyrke',
      tagline: 'Verifiser, onboard og rull ut arbeidsstyrke­programmer på tvers av regioner.',
      description:
        'Workverge håndterer onboarding, sertifisering, skift­planlegging og feltarbeider­koordinering for operatører som ruller ut arbeidsstyrke i skala.',
    },
    FR: {
      subtitle: 'Infrastructure de main-d’œuvre',
      tagline: 'Vérifiez, intégrez et déployez des programmes de main-d’œuvre à travers les régions.',
      description:
        'Workverge gère l’intégration, la certification, les plannings d’équipes et la coordination terrain pour les opérateurs déployant des effectifs à grande échelle.',
    },
    DE: {
      subtitle: 'Personal­infrastruktur',
      tagline: 'Verifizieren, onboarden und regionale Personal­programme ausrollen.',
      description:
        'Workverge übernimmt Onboarding, Zertifizierung, Schichtplanung und Einsatz­koordination für Betreiber, die Personal im großen Maßstab bereitstellen.',
    },
    ES: {
      subtitle: 'Infraestructura de fuerza laboral',
      tagline: 'Verifica, integra y despliega programas de fuerza laboral en todas las regiones.',
      description:
        'Workverge gestiona incorporación, certificación, planificación de turnos y coordinación de personal en campo para operadores que despliegan fuerza laboral a escala.',
    },
    AR: {
      subtitle: 'بنية تحتية للقوى العاملة',
      tagline: 'تحقّق من القوى العاملة وهيّئها وانشر برامجها عبر المناطق.',
      description:
        'يدير Workverge الإعداد والاعتماد وجدولة المناوبات وتنسيق العمالة الميدانية للمشغلين الذين ينشرون قوى عاملة على نطاق واسع.',
    },
  },
  civitas: {
    NO: {
      subtitle: 'Offentlige tjenester',
      tagline: 'Rull ut tillatelses­flyter, dashbord og innbyggertjenester som modulær infrastruktur.',
      description:
        'Civitas er plattformen for digitale offentlige tjenester — tillatelser, innbygger­tjenester og dashbord på tvers av etater — klar for suveren utrulling.',
    },
    FR: {
      subtitle: 'Services publics',
      tagline: 'Déployez workflows de permis, tableaux de bord et services aux citoyens comme infrastructure modulaire.',
      description:
        'Civitas est la plateforme pour les services publics numériques — permis, services aux citoyens et tableaux de bord inter-agences — prête pour un déploiement souverain.',
    },
    DE: {
      subtitle: 'Öffentliche Dienstleistungen',
      tagline: 'Rollen Sie Genehmigungs­workflows, Dashboards und Bürger­dienste als modulare Infrastruktur aus.',
      description:
        'Civitas ist die Plattform für digitale Verwaltungs­dienstleistungen — Genehmigungen, Bürger­services und ressort­übergreifende Dashboards — bereit für souveräne Bereitstellung.',
    },
    ES: {
      subtitle: 'Servicios públicos',
      tagline: 'Despliega workflows de permisos, paneles y servicios al ciudadano como infraestructura modular.',
      description:
        'Civitas es la plataforma para servicios públicos digitales — permisos, servicios al ciudadano y paneles interagenciales — lista para despliegue soberano.',
    },
    AR: {
      subtitle: 'الخدمات العامة',
      tagline: 'انشر مسارات التصاريح ولوحات المعلومات وخدمات المواطنين كبنية تحتية معيارية.',
      description:
        'Civitas هي منصة الخدمات الحكومية الرقمية — التصاريح وخدمات المواطنين ولوحات المعلومات بين الجهات — جاهزة للنشر السيادي.',
    },
  },
  edupro: {
    NO: {
      subtitle: 'Utdannings­intelligens',
      tagline: 'Drift opptak, stipender og institusjonell analyse for departementer og universiteter.',
      description:
        'EduPro er utdannings­intelligens­plattformen — opptak, stipender, institusjonell analyse — driftet med tenant-isolasjon per ministerium eller universitet.',
    },
    FR: {
      subtitle: 'Intelligence éducative',
      tagline: 'Opérez admissions, bourses et analyses institutionnelles pour ministères et universités.',
      description:
        'EduPro est la plateforme d’intelligence éducative — admissions, bourses, analyses institutionnelles — opérée avec isolation par tenant pour chaque ministère ou université.',
    },
    DE: { subtitle: 'Bildungsintelligenz' },
    ES: { subtitle: 'Inteligencia educativa' },
    AR: { subtitle: 'ذكاء تعليمي' },
  },
  identra: {
    NO: {
      subtitle: 'Identitets­infrastruktur',
      tagline: 'Sikker autentisering og verifikasjon for innbyggere, leverandører og bedriftsbrukere.',
      description:
        'Identra leverer identitet — OIDC/SAML-føderasjon, KYC/KYB-flyter, nasjonal eID-integrasjon — som en uavhengig modul på FlyttGo-infrastruktur.',
    },
    FR: {
      subtitle: 'Infrastructure d’identité',
      tagline: 'Authentification et vérification sécurisées pour citoyens, fournisseurs et utilisateurs entreprise.',
      description:
        'Identra fournit l’identité — fédération OIDC/SAML, workflows KYC/KYB, intégration eID nationale — comme module indépendant sur l’infrastructure FlyttGo.',
    },
    DE: { subtitle: 'Identitäts­infrastruktur' },
    ES: { subtitle: 'Infraestructura de identidad' },
    AR: { subtitle: 'بنية تحتية للهوية' },
  },
  payvera: {
    NO: {
      subtitle: 'Betalings­infrastruktur',
      tagline: 'Offentlig-klare betalings­skinner for tillatelser, utbetalinger og abonnements­fakturering.',
      description:
        'Payvera orkestrerer betalinger — kortskinner, SEPA, nasjonale rails, PSD2-samsvar, avstemming — for bedrifter og offentlige operatører.',
    },
    FR: {
      subtitle: 'Infrastructure de paiement',
      tagline: 'Rails de paiement adaptés au secteur public — permis, versements, facturation récurrente.',
      description:
        'Payvera orchestre les paiements — rails cartes, SEPA, rails nationaux, conformité PSD2, réconciliation — pour entreprises et opérateurs publics.',
    },
    DE: { subtitle: 'Zahlungs­infrastruktur' },
    ES: { subtitle: 'Infraestructura de pagos' },
    AR: { subtitle: 'بنية تحتية للمدفوعات' },
  },
  ledgera: {
    NO: {
      subtitle: 'Økonomi­operasjoner',
      tagline: 'Automatisert bokføring, skatte­klar rapportering og AI-drevet økonomisk intelligens.',
      description:
        'Ledgera automatiserer økonomi­operasjoner — kontoplan, avstemminger, skatte­klare rapporter og AI-assistanse — integrert med Payvera og de andre FlyttGo-modulene.',
    },
    FR: {
      subtitle: 'Opérations financières',
      tagline: 'Comptabilité automatisée, reporting fiscal et intelligence financière pilotée par l’IA.',
      description:
        'Ledgera automatise les opérations financières — plan comptable, réconciliations, reporting fiscal, assistance IA — intégré à Payvera et aux autres modules FlyttGo.',
    },
    DE: { subtitle: 'Finanz­operationen' },
    ES: { subtitle: 'Operaciones financieras' },
    AR: { subtitle: 'العمليات المالية' },
  },
  flyttgo: {
    NO: {
      subtitle: 'Markedsplass for flytting',
      tagline: 'FlyttGo-markedsplassen kobler kunder med verifiserte sjåfører på Transify-infrastruktur.',
      description:
        'FlyttGo er markedsplass­motoren — forbruker-app, sjåfør­app, dispatch, betalinger — som kjører på Transify-infrastruktur. Opprett din egen markedsplass på samme stack.',
    },
    FR: {
      subtitle: 'Marché de déménagement',
      tagline: 'La place de marché FlyttGo connecte clients et conducteurs vérifiés sur l’infrastructure Transify.',
      description:
        'FlyttGo est le moteur de place de marché — app client, app conducteur, dispatch, paiements — qui tourne sur l’infrastructure Transify. Lancez votre propre place de marché sur la même stack.',
    },
    DE: { subtitle: 'Umzugs­marktplatz' },
    ES: { subtitle: 'Marketplace de mudanzas' },
    AR: { subtitle: 'سوق الانتقال' },
  },
};

export function localizePlatform(
  p: PlatformData,
  locale: LocaleCode,
): PlatformData {
  const override = PLATFORM_I18N[p.slug]?.[locale];
  return override ? { ...p, ...override } : p;
}
