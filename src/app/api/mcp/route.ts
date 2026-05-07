import type { NextRequest } from 'next/server';
import { KNOWLEDGE_BASE, scoreKb } from '@/lib/ai/knowledge-base';
import { platformList } from '@/data/platforms';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

/**
 * POST /api/mcp — Model Context Protocol server endpoint.
 *
 * Implements the JSON-RPC 2.0 transport that the manifest at
 * /.well-known/mcp.json declares. Every MCP-compatible client (Claude
 * Desktop, OpenAI Agents SDK, Cursor, Continue, Cody, custom HTTP)
 * speaks this dialect:
 *
 *   { jsonrpc: '2.0', id, method, params }   →   { jsonrpc: '2.0', id, result | error }
 *
 * Methods supported (matching the public manifest):
 *
 *   initialize           — capability handshake
 *   tools/list           — return the tool registry
 *   tools/call           — execute a tool against the supplied input
 *   resources/list       — return the resource registry
 *   resources/read       — return the body of a flyttgo:// resource
 *   prompts/list         — minimal stub; we don't ship prompt templates yet
 *
 * Auth: a sandbox-shaped `Authorization: Bearer sk_sbx_...` token is
 * accepted for tools that touch tenant scope. Public-data tools are
 * callable without auth so any visitor's discovery client just works.
 *
 * GET request returns the same manifest as /.well-known/mcp.json so
 * clients that discover via path probing (a common fallback) succeed.
 */

const PROTOCOL_VERSION = '2025-03-26';
const SERVER_INFO = {
  name:    'flyttgo-platform',
  version: '1.0.0',
};

const TOOLS = [
  {
    name: 'platform.list',
    description:
      'List the eight FlyttGo platforms with category, status and module-level compliance flags.',
    inputSchema: { type: 'object', properties: {}, additionalProperties: false },
  },
  {
    name: 'platform.describe',
    description: 'Return the long-form description of a single platform module by slug.',
    inputSchema: {
      type: 'object',
      required: ['slug'],
      properties: {
        slug: {
          type: 'string',
          enum: ['transify', 'workverge', 'civitas', 'edupro', 'identra', 'payvera', 'ledgera', 'flyttgo'],
        },
      },
    },
  },
  {
    name: 'deployment.modes',
    description:
      'Return the four deployment modes (DM.01 managed SaaS, DM.02 customer cloud, DM.03 sovereign datacenter, DM.04 confidential compute) with timeline, sovereignty stamp, and procurement compatibility.',
    inputSchema: { type: 'object', properties: {}, additionalProperties: false },
  },
  {
    name: 'compliance.alignment',
    description: 'Return the platform-level + module-level compliance alignment registry.',
    inputSchema: { type: 'object', properties: {}, additionalProperties: false },
  },
  {
    name: 'docs.search',
    description: 'Search the public knowledge base by free-text query and return top-N matches.',
    inputSchema: {
      type: 'object',
      required: ['query'],
      properties: {
        query: { type: 'string', minLength: 2, maxLength: 200 },
        top:   { type: 'integer', minimum: 1, maximum: 10, default: 3 },
      },
    },
  },
  {
    name: 'regions.list',
    description: 'Return all FlyttGo deployment regions with tier, city anchors and sovereignty status.',
    inputSchema: { type: 'object', properties: {}, additionalProperties: false },
  },
] as const;

const RESOURCES = [
  { uri: 'flyttgo://docs/platforms',   name: 'Platform overview',          description: 'Source markdown for the eight-platform overview.' },
  { uri: 'flyttgo://docs/deployment',  name: 'Deployment architecture',    description: 'Four deployment modes + procurement frameworks.' },
  { uri: 'flyttgo://docs/compliance',  name: 'Compliance + trust signals', description: 'Alignment registry, certification pathways, supply-chain provenance.' },
] as const;

/* ---------- tool implementations ---------- */

const TOOL_AUTH_REQUIRED: Record<string, boolean> = {
  // All current tools expose public data; no scope gate needed.
  // When tenant tools land (e.g. transify.routeOrder), set them true here.
  'platform.list':         false,
  'platform.describe':     false,
  'deployment.modes':      false,
  'compliance.alignment':  false,
  'docs.search':           false,
  'regions.list':          false,
};

const DEPLOYMENT_MODES = [
  { code: 'DM.01', name: 'Managed SaaS',      sovereignty: 'FlyttGo-managed regional tenants',          timelineDays: '60-90',   procurement: 'Direct framework or DPS · DM.01 cards' },
  { code: 'DM.02', name: 'Customer Cloud',    sovereignty: 'Customer AWS / Azure / GCP tenancy',         timelineDays: '75-120',  procurement: 'BYO cloud commit · DM.02 cards' },
  { code: 'DM.03', name: 'Sovereign Datacenter', sovereignty: 'In-jurisdiction national datacenter',     timelineDays: '120-180', procurement: 'Sovereign substrate · DM.03 cards' },
  { code: 'DM.04', name: 'Confidential Compute', sovereignty: 'TEE-isolated · vendor cannot read memory', timelineDays: '90-150',  procurement: 'Defence / regulated finance / healthcare' },
];

const REGIONS = [
  { code: 'EU-N',   name: 'Nordic EU',         tier: 'Primary',   city: 'Oslo · Stockholm',                         sovereign: true  },
  { code: 'EU-W',   name: 'Western EU',        tier: 'Primary',   city: 'London · Frankfurt · Amsterdam',           sovereign: true  },
  { code: 'NA',     name: 'North America',     tier: 'SaaS',      city: 'San Francisco · Northern Virginia',        sovereign: false },
  { code: 'AF-E',   name: 'East Africa',       tier: 'Secondary', city: 'Nairobi · Kampala · Addis Ababa',          sovereign: false },
  { code: 'AF-W',   name: 'West Africa',       tier: 'Secondary', city: 'Lagos · Yaoundé',                          sovereign: false },
  { code: 'AF-S',   name: 'Southern Africa',   tier: 'Sovereign', city: 'Johannesburg',                              sovereign: true  },
  { code: 'MENA',   name: 'GCC / MENA',        tier: 'Sovereign', city: 'Dubai · Riyadh · Cairo',                    sovereign: true  },
  { code: 'APAC-S', name: 'South Asia',        tier: 'Secondary', city: 'Mumbai',                                    sovereign: false },
  { code: 'APAC-E', name: 'East Asia',         tier: 'Primary',   city: 'Tokyo · Singapore',                         sovereign: false },
];

const COMPLIANCE_REGISTRY = {
  platform: [
    { code: 'CR.01', name: 'SOC 2 Type II',          status: 'Active',   notes: 'Annual attestation; full report under MNDA.' },
    { code: 'CR.02', name: 'ISO 27001',              status: 'Active',   notes: 'ISMS certified; surveillance audits years 2 + 3.' },
    { code: 'CR.03', name: 'GDPR · Article 28',      status: 'Active',   notes: 'Pre-signed DPA; EU SCCs (2021/914) annexed.' },
    { code: 'CR.04', name: 'WCAG 2.1 AA',            status: 'Active',   notes: 'Accessibility baseline across every public surface.' },
    { code: 'CR.05', name: 'NIST FIPS 203/204/205',  status: 'In flight', notes: 'Post-quantum hybrid migration; see PQ.00.' },
    { code: 'CR.06', name: 'EU AI Act',              status: 'In flight', notes: 'Risk-tier classification per AI surface; see AG.00.' },
  ],
  module: [
    { module: 'Identra', frameworks: ['eIDAS 2.0', 'OIDC', 'SAML 2.0', 'FIDO2 / WebAuthn', 'W3C VC 2.0', 'OID4VP'] },
    { module: 'Payvera', frameworks: ['PSD2 SCA', 'ISO 20022', 'SCT-Inst', 'PCI DSS L1'] },
    { module: 'Civitas', frameworks: ['NHS DSP Toolkit', 'eIDAS LoA mapping', 'Multi-jurisdiction templates'] },
    { module: 'Ledgera', frameworks: ['SAF-T (NO)', 'FRS-102 (UK)', 'GAAP', 'IFRS'] },
  ],
};

function listPlatforms() {
  return platformList.map((p) => ({
    slug:        p.slug,
    name:        p.name,
    subtitle:    p.subtitle,
    category:    p.category,
    description: p.description,
  }));
}

function platformDescribe(slug: string) {
  const p = platformList.find((x) => x.slug === slug);
  if (!p) {
    return { error: `Unknown slug "${slug}". Valid: ${platformList.map((x) => x.slug).join(', ')}` };
  }
  return {
    slug:         p.slug,
    name:         p.name,
    subtitle:     p.subtitle,
    category:     p.category,
    description:  p.description,
    capabilities: p.capabilities,
    dependsOn:    p.dependsOn ?? null,
  };
}

function docsSearch(query: string, top = 3) {
  const results = scoreKb(query, top);
  if (results.length === 0) {
    return {
      query,
      results: [],
      note: 'No knowledge-base hits. Open a consultation at /consultation for a tailored answer.',
    };
  }
  return {
    query,
    results: results.map((r) => ({
      score:    r.score,
      question: r.entry.question,
      answer:   r.entry.answer,
      source:   r.entry.source ?? null,
    })),
  };
}

function readResource(uri: string) {
  switch (uri) {
    case 'flyttgo://docs/platforms':
      return JSON.stringify({
        modules: platformList.map((p) => ({ slug: p.slug, name: p.name, subtitle: p.subtitle })),
        knowledgeBase: KNOWLEDGE_BASE.filter((kb) => kb.keywords.some((k) => /platform|module|transify|workverge|civitas|edupro|identra|payvera|ledgera|flyttgo/.test(k))).slice(0, 8),
      }, null, 2);
    case 'flyttgo://docs/deployment':
      return JSON.stringify({ modes: DEPLOYMENT_MODES, regions: REGIONS }, null, 2);
    case 'flyttgo://docs/compliance':
      return JSON.stringify(COMPLIANCE_REGISTRY, null, 2);
    default:
      return null;
  }
}

/* ---------- JSON-RPC plumbing ---------- */

type RpcRequest = {
  jsonrpc?: '2.0';
  id?: number | string | null;
  method: string;
  params?: Record<string, unknown>;
};

type RpcResponse = {
  jsonrpc: '2.0';
  id: number | string | null;
  result?: unknown;
  error?: { code: number; message: string; data?: unknown };
};

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

const rpcError = (id: RpcResponse['id'], code: number, message: string, data?: unknown): RpcResponse => ({
  jsonrpc: '2.0',
  id,
  error: { code, message, ...(data !== undefined ? { data } : {}) },
});

const rpcOk = (id: RpcResponse['id'], result: unknown): RpcResponse => ({
  jsonrpc: '2.0',
  id,
  result,
});

function checkAuth(req: NextRequest, toolName: string): { ok: boolean; reason?: string } {
  if (!TOOL_AUTH_REQUIRED[toolName]) return { ok: true };
  const auth = req.headers.get('authorization') ?? '';
  if (!auth.startsWith('Bearer ')) {
    return { ok: false, reason: 'Bearer token required for this tool' };
  }
  const token = auth.slice('Bearer '.length).trim();
  if (!/^sk_(sbx|live)_[a-z0-9_]{16,}$/i.test(token)) {
    return { ok: false, reason: 'Token shape invalid' };
  }
  return { ok: true };
}

/* ---------- handlers ---------- */

export async function GET() {
  // Convenience GET — same manifest as /.well-known/mcp.json. Some
  // discovery clients probe the endpoint URL directly before parsing
  // the manifest; this keeps them happy.
  return json(200, {
    server:    SERVER_INFO,
    protocol:  PROTOCOL_VERSION,
    transport: 'http',
    tools:     TOOLS.map((t) => ({ name: t.name, description: t.description })),
    resources: RESOURCES,
    docs:      'https://flyttgotech.com/agents',
  });
}

export async function POST(req: NextRequest) {
  let body: RpcRequest;
  try {
    body = (await req.json()) as RpcRequest;
  } catch {
    return json(400, rpcError(null, -32700, 'Parse error: invalid JSON'));
  }

  if (typeof body.method !== 'string') {
    return json(400, rpcError(body.id ?? null, -32600, 'Invalid request: method must be a string'));
  }

  const { method, params = {}, id = null } = body;

  try {
    switch (method) {
      case 'initialize':
        return json(200, rpcOk(id, {
          protocolVersion: PROTOCOL_VERSION,
          serverInfo:      SERVER_INFO,
          capabilities: {
            tools:     { listChanged: false },
            resources: { listChanged: false, subscribe: false },
            prompts:   { listChanged: false },
            logging:   {},
          },
        }));

      case 'tools/list':
        return json(200, rpcOk(id, { tools: TOOLS }));

      case 'tools/call': {
        const name = String(params.name ?? '');
        const args = (params.arguments as Record<string, unknown>) ?? {};
        const auth = checkAuth(req, name);
        if (!auth.ok) {
          return json(401, rpcError(id, -32001, `Unauthorized: ${auth.reason}`));
        }

        let result: unknown;
        switch (name) {
          case 'platform.list':
            result = listPlatforms();
            break;
          case 'platform.describe':
            result = platformDescribe(String(args.slug ?? ''));
            break;
          case 'deployment.modes':
            result = { modes: DEPLOYMENT_MODES };
            break;
          case 'compliance.alignment':
            result = COMPLIANCE_REGISTRY;
            break;
          case 'docs.search':
            result = docsSearch(String(args.query ?? ''), Number(args.top ?? 3));
            break;
          case 'regions.list':
            result = { regions: REGIONS };
            break;
          default:
            return json(404, rpcError(id, -32601, `Tool not found: ${name}`));
        }

        return json(200, rpcOk(id, {
          content: [
            { type: 'text', text: JSON.stringify(result, null, 2) },
          ],
        }));
      }

      case 'resources/list':
        return json(200, rpcOk(id, { resources: RESOURCES }));

      case 'resources/read': {
        const uri = String(params.uri ?? '');
        const text = readResource(uri);
        if (text === null) {
          return json(404, rpcError(id, -32602, `Resource not found: ${uri}`));
        }
        return json(200, rpcOk(id, {
          contents: [
            { uri, mimeType: 'application/json', text },
          ],
        }));
      }

      case 'prompts/list':
        // No prompt templates at preview. Empty list keeps clients happy.
        return json(200, rpcOk(id, { prompts: [] }));

      default:
        return json(404, rpcError(id, -32601, `Method not found: ${method}`));
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'unknown error';
    return json(500, rpcError(id, -32603, `Internal error: ${msg}`));
  }
}
