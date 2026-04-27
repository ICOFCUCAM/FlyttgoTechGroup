/**
 * Voice-nav command parser.
 *
 * Maps a free-form spoken phrase to either a destination route or a
 * recognised search-it intent. Used by the Ask FlyttGo modal when the
 * mic captures a query — if it parses as a nav command, we route;
 * otherwise we let the regular knowledge-base scorer handle it.
 *
 * Patterns are liberal: "go to security", "open the platforms page",
 * "take me to deployment", "show me Ledgera", "navigate to /audit",
 * "I want sustainability". All resolve to the same destination.
 */

export type VoiceCommand =
  | { kind: 'route'; href: string; label: string }
  | { kind: 'search'; query: string };

const NAV_VERBS = [
  'go to', 'open', 'show me', 'take me to', 'navigate to', 'i want',
  'show', 'visit', 'jump to', 'bring me to', 'load', 'pull up',
];

type Target = { keywords: string[]; href: string; label: string };

const TARGETS: Target[] = [
  { keywords: ['home', 'homepage', 'landing'], href: '/', label: 'Home' },
  { keywords: ['platforms', 'platform ecosystem', 'ecosystem', 'modules'], href: '/platforms', label: 'Platforms' },
  { keywords: ['transify', 'mobility', 'transport platform'], href: '/platforms/transify', label: 'Transify' },
  { keywords: ['workverge', 'workforce'], href: '/platforms/workverge', label: 'Workverge' },
  { keywords: ['civitas', 'government platform', 'gov'], href: '/platforms/civitas', label: 'Civitas' },
  { keywords: ['edupro', 'education platform'], href: '/platforms/edupro', label: 'EduPro' },
  { keywords: ['identra', 'identity'], href: '/platforms/identra', label: 'Identra' },
  { keywords: ['payvera', 'payments'], href: '/platforms/payvera', label: 'Payvera' },
  { keywords: ['ledgera', 'accounting', 'financial ops', 'finance', 'bookkeeping'], href: '/platforms/ledgera', label: 'Ledgera' },
  { keywords: ['flyttgo marketplace', 'marketplace'], href: '/platforms/flyttgo', label: 'FlyttGo Marketplace' },
  { keywords: ['industries', 'sectors'], href: '/industries', label: 'Industries' },
  { keywords: ['deployment', 'deploy', 'deployment architecture'], href: '/deployment', label: 'Deployment architecture' },
  { keywords: ['deployment lifecycle', 'lifecycle', 'engagement stages'], href: '/deployment-lifecycle', label: 'Deployment lifecycle' },
  { keywords: ['sovereign', 'sovereign deployment', 'national hosting'], href: '/sovereign', label: 'Sovereign deployment' },
  { keywords: ['global coverage', 'coverage', 'regions', 'where you operate'], href: '/global-coverage', label: 'Global coverage' },
  { keywords: ['procurement', 'procurement compatibility', 'frameworks'], href: '/procurement-compatibility', label: 'Procurement compatibility' },
  { keywords: ['infrastructure architecture', 'architecture', 'platform stack', 'tech stack'], href: '/infrastructure-architecture', label: 'Infrastructure architecture' },
  { keywords: ['api architecture', 'api', 'apis', 'developers'], href: '/api-architecture', label: 'API architecture' },
  { keywords: ['playground', 'api playground', 'live api'], href: '/developers/playground', label: 'API playground' },
  { keywords: ['security', 'trust signals', 'sbom'], href: '/security', label: 'Security' },
  { keywords: ['compliance'], href: '/compliance', label: 'Compliance' },
  { keywords: ['sustainability', 'carbon', 'emissions', 'co2'], href: '/sustainability', label: 'Sustainability' },
  { keywords: ['contact', 'deployment intake', 'intake', 'talk to sales'], href: '/contact', label: 'Deployment intake' },
  { keywords: ['try ledgera', 'sandbox', 'try it now'], href: '/try/ledgera', label: 'Try Ledgera sandbox' },
  { keywords: ['insights', 'blog', 'articles'], href: '/insights', label: 'Insights' },
  { keywords: ['company', 'about'], href: '/company', label: 'Company' },
  { keywords: ['admin', 'admin workspace'], href: '/admin', label: 'Admin workspace' },
  { keywords: ['accounting', 'workspace'], href: '/accounting', label: 'Accounting workspace' },
  { keywords: ['audit', 'audit workspace'], href: '/audit', label: 'Audit workspace' },
  { keywords: ['status', 'platform status'], href: '/status', label: 'Platform status' },
];

export function parseVoiceCommand(raw: string): VoiceCommand {
  const q = raw.toLowerCase().trim().replace(/[.!?,]/g, '');
  if (q.length === 0) return { kind: 'search', query: raw };

  // Strip leading nav verb if present.
  let stripped = q;
  for (const v of NAV_VERBS) {
    if (q.startsWith(v + ' ')) {
      stripped = q.slice(v.length).trim();
      break;
    }
  }

  // Direct path — "navigate to /audit", "go to /security".
  const pathMatch = stripped.match(/^(?:the\s+)?(\/[a-z0-9/-]+)/);
  if (pathMatch) {
    const href = pathMatch[1].replace(/\/$/, '') || '/';
    return { kind: 'route', href, label: href };
  }

  // Best-match keyword scan.
  let best: { target: Target; score: number } | null = null;
  for (const t of TARGETS) {
    for (const kw of t.keywords) {
      if (stripped.includes(kw)) {
        // Prefer longer keyword matches.
        const score = kw.length;
        if (!best || score > best.score) best = { target: t, score };
      }
    }
  }
  if (best) return { kind: 'route', href: best.target.href, label: best.target.label };

  return { kind: 'search', query: raw };
}
