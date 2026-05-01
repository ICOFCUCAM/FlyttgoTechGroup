import {
  FileText,
  Briefcase,
  LayoutDashboard,
  Building2,
  Landmark,
  Network,
  Cloud,
  Server,
  ShieldCheck,
  CheckCircle2,
  Circle,
  type LucideIcon,
} from 'lucide-react';

/**
 * SE.MX — Capability matrix.
 *
 * Side-by-side comparator across the six engagement levels — audience,
 * delivery, deployment compatibility (SaaS / customer-cloud /
 * sovereign) and indicative regional pricing band. Sits ABOVE the
 * expandable CapabilityLadder so visitors can scan the whole ladder
 * at once before drilling into any single level.
 *
 * Data is intentionally a compact summary (not the full feature lists
 * carried by CapabilityLadder) so the comparator stays scannable.
 */

type Deployment = 'saas' | 'cloud' | 'sovereign';

type LevelSummary = {
  code: string;
  name: string;
  short: string;
  icon: LucideIcon;
  audience: string;
  delivery: string;
  deployments: Deployment[];
  pricingEU: string;
  pricingAF: string;
};

const LEVELS: LevelSummary[] = [
  {
    code: 'L.01',
    name: 'Digital presence',
    short: 'Website',
    icon: FileText,
    audience: 'Small businesses · consultants',
    delivery: '5 – 10 days',
    deployments: ['saas'],
    pricingEU: '$0.9k – $2.5k',
    pricingAF: '$0.3k – $0.9k',
  },
  {
    code: 'L.02',
    name: 'Professional website',
    short: 'CMS',
    icon: Briefcase,
    audience: 'SMEs · schools · service firms',
    delivery: '2 – 4 weeks',
    deployments: ['saas'],
    pricingEU: '$3k – $7k',
    pricingAF: '$0.8k – $2.5k',
  },
  {
    code: 'L.03',
    name: 'Smart platform',
    short: 'SaaS',
    icon: LayoutDashboard,
    audience: 'Marketplaces · universities · NGOs',
    delivery: '1 – 3 months',
    deployments: ['saas', 'cloud'],
    pricingEU: '$8k – $35k',
    pricingAF: '$2.5k – $12k',
  },
  {
    code: 'L.04',
    name: 'Enterprise platform',
    short: 'Tenant',
    icon: Building2,
    audience: 'Corporations · transport · municipal',
    delivery: '3 – 6 months',
    deployments: ['saas', 'cloud'],
    pricingEU: '$40k – $120k',
    pricingAF: '$10k – $45k',
  },
  {
    code: 'L.05',
    name: 'National institutional',
    short: 'Sovereign',
    icon: Landmark,
    audience: 'Governments · ministries · DPI',
    delivery: '6 – 12 months',
    deployments: ['saas', 'cloud', 'sovereign'],
    pricingEU: '$150k – $800k',
    pricingAF: '$40k – $250k',
  },
  {
    code: 'L.06',
    name: 'Platform ecosystem',
    short: 'Ecosystem',
    icon: Network,
    audience: 'National DPI · cross-border networks',
    delivery: '6 – 18 months',
    deployments: ['saas', 'cloud', 'sovereign'],
    pricingEU: '$500k – $3M+',
    pricingAF: '$120k – $900k',
  },
];

const DEPLOY_META: Record<Deployment, { code: string; label: string; icon: LucideIcon }> = {
  saas:      { code: 'DM.01', label: 'Managed SaaS',     icon: Cloud },
  cloud:     { code: 'DM.02', label: 'Customer cloud',   icon: Server },
  sovereign: { code: 'DM.03', label: 'Sovereign DC',     icon: ShieldCheck },
};

const ALL_DEPLOY: Deployment[] = ['saas', 'cloud', 'sovereign'];

export default function CapabilityMatrix() {
  return (
    <section
      id="ladder-matrix"
      aria-labelledby="se-mx-heading"
      className="relative bg-white dark:bg-slate-950 py-24 lg:py-28 border-t border-slate-200/60 dark:border-slate-800/60 scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
          <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">SE.MX</span>
          <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
          <span>Capability matrix · audience · delivery · deployment</span>
        </div>

        <h2
          id="se-mx-heading"
          className="mt-6 max-w-3xl font-serif text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-slate-900 dark:text-white leading-[1.05]"
        >
          Six levels,{' '}
          <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
            one comparison surface.
          </em>
        </h2>
        <p className="mt-4 max-w-3xl text-base text-slate-600 dark:text-slate-400 leading-[1.65]">
          Side-by-side across the six engagement levels — audience profile,
          delivery cadence, deployment-substrate compatibility and the
          indicative regional pricing band. The expandable ladder below
          carries the full feature inventory per level.
        </p>

        {/* Matrix — desktop table view */}
        <div className="hidden lg:block mt-12 rounded-2xl border border-slate-200/80 dark:border-slate-800/60 overflow-hidden bg-white dark:bg-slate-900/40">
          <table className="w-full text-left">
            <thead className="bg-slate-50/80 dark:bg-slate-900/60 border-b border-slate-200/80 dark:border-slate-800/60">
              <tr className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
                <th className="px-5 py-4 font-semibold w-[220px]">Level</th>
                <th className="px-5 py-4 font-semibold">Audience</th>
                <th className="px-5 py-4 font-semibold w-[150px]">Delivery</th>
                <th className="px-5 py-4 font-semibold w-[200px]">Deployment compatibility</th>
                <th className="px-5 py-4 font-semibold text-right w-[160px]">Band · EU</th>
                <th className="px-5 py-4 font-semibold text-right w-[160px]">Band · AF/MENA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/60 dark:divide-slate-800/60">
              {LEVELS.map((l) => {
                const Icon = l.icon;
                return (
                  <tr key={l.code} className="motion-safe:transition-colors hover:bg-slate-50/60 dark:hover:bg-slate-900/40">
                    <td className="px-5 py-5 align-top">
                      <div className="flex items-start gap-3">
                        <span
                          className="w-9 h-9 rounded-lg bg-[#0A3A6B]/8 dark:bg-[#9ED0F9]/12 text-[#0A3A6B] dark:text-[#9ED0F9] flex items-center justify-center flex-shrink-0"
                          aria-hidden="true"
                        >
                          <Icon size={16} strokeWidth={1.75} />
                        </span>
                        <div>
                          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">
                            {l.code}
                          </div>
                          <div className="mt-1 text-[14px] font-semibold tracking-tight text-slate-900 dark:text-white leading-snug">
                            {l.name}
                          </div>
                          <div className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400">
                            {l.short}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-5 align-top text-[13px] text-slate-700 dark:text-slate-300 leading-snug">
                      {l.audience}
                    </td>
                    <td className="px-5 py-5 align-top font-mono text-[11px] uppercase tracking-[0.14em] text-slate-600 dark:text-slate-400">
                      {l.delivery}
                    </td>
                    <td className="px-5 py-5 align-top">
                      <ul className="flex flex-col gap-1.5">
                        {ALL_DEPLOY.map((d) => {
                          const supported = l.deployments.includes(d);
                          const meta = DEPLOY_META[d];
                          const DeployIcon = meta.icon;
                          return (
                            <li
                              key={d}
                              className={`flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.12em] ${
                                supported
                                  ? 'text-slate-700 dark:text-slate-300'
                                  : 'text-slate-300 dark:text-slate-700'
                              }`}
                            >
                              {supported ? (
                                <CheckCircle2 size={11} className="text-[#0FB5A6]" aria-hidden="true" />
                              ) : (
                                <Circle size={11} className="text-slate-300 dark:text-slate-700" aria-hidden="true" />
                              )}
                              <DeployIcon size={11} strokeWidth={1.75} aria-hidden="true" />
                              <span>{meta.code}</span>
                              <span className="normal-case tracking-tight">· {meta.label}</span>
                            </li>
                          );
                        })}
                      </ul>
                    </td>
                    <td className="px-5 py-5 align-top text-right font-mono text-[12px] tracking-tight text-slate-900 dark:text-white">
                      {l.pricingEU}
                    </td>
                    <td className="px-5 py-5 align-top text-right font-mono text-[12px] tracking-tight text-slate-600 dark:text-slate-400">
                      {l.pricingAF}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Matrix — mobile card view */}
        <ul className="lg:hidden mt-10 grid sm:grid-cols-2 gap-3">
          {LEVELS.map((l) => {
            const Icon = l.icon;
            return (
              <li
                key={l.code}
                className="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800/60 bg-white dark:bg-slate-900"
              >
                <div className="flex items-start justify-between">
                  <span
                    className="w-10 h-10 rounded-lg bg-[#0A3A6B]/8 dark:bg-[#9ED0F9]/12 text-[#0A3A6B] dark:text-[#9ED0F9] flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <Icon size={16} strokeWidth={1.75} />
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">
                    {l.code}
                  </span>
                </div>
                <div className="mt-3 text-[14px] font-semibold tracking-tight text-slate-900 dark:text-white">
                  {l.name}
                </div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400">
                  {l.short}
                </div>
                <dl className="mt-4 pt-4 border-t border-slate-200/70 dark:border-slate-800/60 space-y-2 text-[12px]">
                  <div className="flex items-baseline gap-2">
                    <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400 w-20 flex-shrink-0">Audience</dt>
                    <dd className="text-slate-700 dark:text-slate-300 leading-snug">{l.audience}</dd>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400 w-20 flex-shrink-0">Delivery</dt>
                    <dd className="text-slate-700 dark:text-slate-300 leading-snug">{l.delivery}</dd>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400 w-20 flex-shrink-0">Deploy</dt>
                    <dd className="text-slate-700 dark:text-slate-300 leading-snug">
                      {l.deployments.map((d) => DEPLOY_META[d].code).join(' · ')}
                    </dd>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400 w-20 flex-shrink-0">EU band</dt>
                    <dd className="font-mono text-slate-900 dark:text-white">{l.pricingEU}</dd>
                  </div>
                </dl>
              </li>
            );
          })}
        </ul>

        <p className="mt-6 max-w-3xl font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400 leading-relaxed">
          Bands are indicative ±15 %. Final point pricing on the order
          form after the scoping engagement (SE.D2). Deployment
          compatibility expands at L.05 to include sovereign datacenter,
          and at L.06 to a full multi-substrate ecosystem rollout.
        </p>
      </div>
    </section>
  );
}
