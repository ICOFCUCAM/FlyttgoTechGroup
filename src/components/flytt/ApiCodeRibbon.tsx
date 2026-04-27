'use client';

import React from 'react';
import { Copy, Check, Play } from 'lucide-react';
import Link from '@/components/flytt/LocaleLink';

/**
 * API code-preview ribbon — Stripe / Twilio / Vercel-style.
 *
 * Five language tabs (curl · TypeScript · Python · Go · MCP), one
 * example request per tab, and a real response panel beneath.
 * Auto-cycles every 6.5 s; hover or manual click on a tab pauses the
 * auto-cycle for the visit. Copy-to-clipboard per snippet, plus a
 * link straight to the live API playground.
 *
 * Snippets are static strings — no fetch in this component. The live
 * playground at /developers/playground is the place to actually run
 * the request; this ribbon is the editorial tease.
 */

type Sample = {
  language: 'curl' | 'typescript' | 'python' | 'go' | 'mcp';
  label: string;
  code: string;
  response: string;
};

const SAMPLES: Sample[] = [
  {
    language: 'curl',
    label: 'curl',
    code: `curl https://api.flyttgo.tech/v1/journal-entries \\
  -H "Authorization: Bearer $FLYTTGO_TOKEN" \\
  -H "X-Org-ID: org_2dd5f768" \\
  -G --data-urlencode "from=2026-01-01" \\
     --data-urlencode "to=2026-03-31"`,
    response: `{
  "ok": true,
  "count": 1284,
  "entries": [
    {
      "id": "je_01HV...",
      "entry_number": 1042,
      "entry_date": "2026-03-30",
      "status": "posted",
      "total_amount_base": "12500.00"
    }
  ]
}`,
  },
  {
    language: 'typescript',
    label: 'TypeScript',
    code: `import { FlyttGo } from '@flyttgo/sdk';

const flyttgo = new FlyttGo({
  apiKey: process.env.FLYTTGO_TOKEN!,
  organizationId: 'org_2dd5f768',
});

const entries = await flyttgo.ledgera.journalEntries.list({
  from: '2026-01-01',
  to:   '2026-03-31',
  status: 'posted',
});

console.log(entries.count, entries.data[0].entryNumber);`,
    response: `// 1284
// 1042
// First 10 entries returned. Use entries.next() for cursor-based pagination.
// Tenant scope enforced — never returns rows outside org_2dd5f768.`,
  },
  {
    language: 'python',
    label: 'Python',
    code: `from flyttgo import FlyttGo

flyttgo = FlyttGo(
    api_key=os.environ["FLYTTGO_TOKEN"],
    organization_id="org_2dd5f768",
)

entries = flyttgo.ledgera.journal_entries.list(
    **{"from": "2026-01-01", "to": "2026-03-31", "status": "posted"}
)

print(entries.count, entries.data[0].entry_number)`,
    response: `# 1284
# 1042
# Iterate with for entry in entries: ... — auto-pagination through
# 100-entry pages. Rate-limited to Tier 2 (10,000 req/min/tenant).`,
  },
  {
    language: 'go',
    label: 'Go',
    code: `import flyttgo "github.com/flyttgo/sdk-go"

client := flyttgo.New(flyttgo.Config{
    APIKey:         os.Getenv("FLYTTGO_TOKEN"),
    OrganizationID: "org_2dd5f768",
})

entries, err := client.Ledgera.JournalEntries.List(ctx, &flyttgo.JournalEntryListParams{
    From: "2026-01-01", To: "2026-03-31", Status: "posted",
})
if err != nil { return err }`,
    response: `// entries.Count == 1284
// entries.Data[0].EntryNumber == 1042
// SDK retries 5xx with exponential backoff per AP.RL guidance.
// X-RateLimit-Remaining surfaced on entries.Headers.`,
  },
  {
    language: 'mcp',
    label: 'MCP',
    code: `// /.well-known/mcp.json — agent auto-discovery surface
{
  "name": "flyttgo-platform",
  "tools": [
    { "name": "platform.list",       "input_schema": {...} },
    { "name": "deployment.modes",    "input_schema": {...} },
    { "name": "compliance.alignment","input_schema": {...} },
    { "name": "docs.search",         "input_schema": { "query": "string" } }
  ]
}`,
    response: `// Pointed at your MCP-aware client (Claude · ChatGPT · Cursor):
// the agent auto-discovers FlyttGo capabilities and can answer
// platform questions inline. /api/mcp transport endpoint ships
// with agent-client auth — manifest is the discovery contract.`,
  },
];

const ROTATE_MS = 6500;

export default function ApiCodeRibbon() {
  const [active, setActive] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const [hover, setHover] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const sample = SAMPLES[active];

  React.useEffect(() => {
    if (paused || hover) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % SAMPLES.length);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, [paused, hover]);

  function pickTab(i: number) {
    setActive(i);
    setPaused(true);
  }

  function copy() {
    navigator.clipboard.writeText(sample.code).then(
      () => {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1400);
      },
      () => {},
    );
  }

  return (
    <section
      aria-labelledby="api-ribbon-heading"
      className="relative bg-[#0A1F3D] text-white border-y border-white/10 py-16 lg:py-20 overflow-hidden"
    >
      {/* Subtle scanline backdrop */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px),' +
            'linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-white/55">
          <span className="text-[#9ED0F9] font-semibold">API.RB</span>
          <span aria-hidden="true" className="flex-1 h-px bg-white/15 max-w-[200px]" />
          <span id="api-ribbon-heading">Code preview ribbon</span>
        </div>

        <div className="mt-6 grid lg:grid-cols-12 gap-8 items-end">
          <h2 className="lg:col-span-7 font-serif text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight leading-[1.1]">
            One request,{' '}
            <em className="not-italic font-serif italic font-normal text-[#9ED0F9]">
              five client surfaces.
            </em>
          </h2>
          <p className="lg:col-span-5 text-sm text-white/70 leading-[1.65]">
            Same endpoint, every SDK + the agent-discovery surface. Snippets
            are real shapes — run the equivalent live in the API playground.
          </p>
        </div>

        {/* Tab rail */}
        <div
          className="mt-8 flex flex-wrap items-center gap-1"
          role="tablist"
          aria-label="API client surfaces"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {SAMPLES.map((s, i) => {
            const isActive = i === active;
            return (
              <button
                key={s.language}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => pickTab(i)}
                className={`px-3 py-1.5 rounded-md font-mono text-[11px] uppercase tracking-[0.18em] motion-safe:transition-colors ${
                  isActive
                    ? 'bg-[#9ED0F9]/15 text-[#9ED0F9] border border-[#9ED0F9]/30'
                    : 'text-white/55 hover:text-white border border-transparent hover:border-white/20'
                }`}
              >
                {s.label}
              </button>
            );
          })}
          <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">
            {paused ? 'Manual · auto-cycle paused' : 'Auto-cycle 6.5s'}
          </span>
        </div>

        {/* Code panel + response */}
        <div
          className="mt-4 grid lg:grid-cols-2 gap-3"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <div className="rounded-2xl bg-[#050F22] border border-white/10 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-white/[0.03]">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/55">
                <span className="text-[#9ED0F9] font-semibold">REQUEST</span>
                <span className="mx-2 text-white/20">·</span>
                {sample.label}
              </span>
              <button
                type="button"
                onClick={copy}
                className="inline-flex items-center gap-1 px-2 py-1 rounded text-[10px] font-mono uppercase tracking-[0.18em] text-white/55 hover:text-white hover:bg-white/10 motion-safe:transition-colors"
                aria-label="Copy code"
              >
                {copied ? <Check size={11} /> : <Copy size={11} />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
            <pre className="px-4 py-4 text-[12px] leading-[1.55] font-mono whitespace-pre overflow-x-auto text-white/85 max-h-[280px]">
              <code>{sample.code}</code>
            </pre>
          </div>

          <div className="rounded-2xl bg-[#050F22] border border-white/10 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-white/[0.03]">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/55">
                <span className="text-emerald-400 font-semibold">RESPONSE</span>
                <span className="mx-2 text-white/20">·</span>
                200 OK
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
                application/json
              </span>
            </div>
            <pre className="px-4 py-4 text-[12px] leading-[1.55] font-mono whitespace-pre overflow-x-auto text-emerald-200/80 max-h-[280px]">
              <code>{sample.response}</code>
            </pre>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link
            href="/developers/playground"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white text-[#0A3A6B] text-sm font-semibold hover:bg-slate-100 motion-safe:transition-colors"
          >
            <Play size={12} aria-hidden="true" />
            Run it live in the playground
          </Link>
          <Link
            href="/.well-known/mcp.json"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-white/20 text-white text-sm font-semibold hover:bg-white/10 motion-safe:transition-colors"
          >
            MCP discovery manifest
          </Link>
          <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
            Tenant scope enforced server-side · API.RL rate limits apply
          </span>
        </div>
      </div>
    </section>
  );
}
