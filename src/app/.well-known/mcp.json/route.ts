import { NextResponse } from 'next/server';

export const dynamic = 'force-static';
export const revalidate = 3600;

/**
 * MCP (Model Context Protocol) discovery surface.
 *
 * Published at /.well-known/mcp.json so AI agents (Claude, ChatGPT,
 * Cursor, Copilot, and any future MCP client) can auto-discover the
 * tools and resources FlyttGo exposes. The actual MCP server endpoint
 * lands behind /api/mcp once authentication for agent clients is
 * specced — for now this manifest declares the intended surface so
 * agents know what to expect.
 *
 * Spec reference: https://modelcontextprotocol.io
 */

const MCP_MANIFEST = {
  $schema: 'https://modelcontextprotocol.io/specs/manifest/v1',
  name: 'flyttgo-platform',
  version: '0.1.0',
  description:
    'FlyttGo Technologies Group platform infrastructure — discovery surface for AI agents querying platform capabilities, deployment options, compliance posture, and public documentation.',
  vendor: {
    name: 'FlyttGo Technologies Group',
    url: 'https://flyttgotech.com',
    support: 'platforms@flyttgo.tech',
  },
  endpoint: {
    transport: 'http',
    url: '/api/mcp',
    auth: 'planned · API-key + organization-scoped tokens',
  },
  tools: [
    {
      name: 'platform.list',
      description: 'List the eight FlyttGo platforms (Transify, Workverge, Civitas, EduPro, Identra, Payvera, Ledgera, FlyttGo marketplace) with category, status, and module-specific compliance flags.',
      input_schema: { type: 'object', properties: {}, additionalProperties: false },
    },
    {
      name: 'platform.describe',
      description: 'Return the long-form description of a single platform module by slug.',
      input_schema: {
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
      description: 'Return the three deployment modes (DM.01 FlyttGo-managed, DM.02 customer cloud, DM.03 sovereign datacenter) with timeline, sovereignty stamp, and procurement compatibility.',
      input_schema: { type: 'object', properties: {}, additionalProperties: false },
    },
    {
      name: 'compliance.alignment',
      description: 'Return the platform-level + module-level compliance alignment registry (CR.01-06) and the certification-pathway roadmap.',
      input_schema: { type: 'object', properties: {}, additionalProperties: false },
    },
    {
      name: 'docs.search',
      description: 'Search the public knowledge base by free-text query and return top N matching answer entries with source links.',
      input_schema: {
        type: 'object',
        required: ['query'],
        properties: {
          query: { type: 'string', minLength: 2, maxLength: 200 },
          top: { type: 'integer', minimum: 1, maximum: 10, default: 3 },
        },
      },
    },
    {
      name: 'regions.list',
      description: 'Return all FlyttGo deployment regions with grid-carbon intensity, tier (primary/secondary/sovereign) and city anchors.',
      input_schema: { type: 'object', properties: {}, additionalProperties: false },
    },
  ],
  resources: [
    {
      uri: 'flyttgo://docs/platforms',
      name: 'Platform overview',
      description: 'Source markdown for the eight-platform overview.',
    },
    {
      uri: 'flyttgo://docs/deployment',
      name: 'Deployment architecture',
      description: 'Three deployment modes + procurement frameworks.',
    },
    {
      uri: 'flyttgo://docs/compliance',
      name: 'Compliance + trust signals',
      description: 'Alignment registry, certification pathways, supply-chain provenance.',
    },
  ],
  status: 'preview',
  notes:
    'This manifest is a forward-looking surface. The /api/mcp transport endpoint ships when authentication for agent clients is specced. Until then, treat this manifest as the intended capability registry — AI agents that auto-discover MCP services will see FlyttGo here, even if calls don\'t yet succeed.',
} as const;

export async function GET() {
  return NextResponse.json(MCP_MANIFEST, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
