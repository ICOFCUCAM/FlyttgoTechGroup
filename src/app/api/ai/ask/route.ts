import type { NextRequest } from 'next/server';
import { KNOWLEDGE_BASE, scoreKb } from '@/lib/ai/knowledge-base';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

/**
 * POST /api/ai/ask — streaming AI procurement assistant.
 *
 * Two modes:
 *
 *   { mode: 'ask',      query: string }                           → conversational Q&A grounded in KNOWLEDGE_BASE
 *   { mode: 'artefact', artefact: 'caiq'|'rfp'|'proposal',
 *     context: {...} }                                            → structured artefact generation
 *
 * Streams Server-Sent Events with `data: {chunk}` lines. Closes with
 * `data: [DONE]`. Both modes emit the same wire format so the client
 * doesn't branch.
 *
 * Real LLM path runs against Anthropic's Messages API (Claude Sonnet
 * 4.6 by default) when ANTHROPIC_API_KEY is set. Without the key the
 * route degrades to a deterministic synthetic stream — same wire
 * format, same artefact shape, just procedurally composed from the
 * knowledge base + the supplied context. This keeps the entire
 * surface usable in preview / sandbox without a key.
 */

type AskBody =
  | { mode: 'ask'; query: string }
  | {
      mode: 'artefact';
      artefact: 'caiq' | 'rfp' | 'proposal';
      context: ArtefactContext;
    };

type ArtefactContext = {
  organisation?: string;
  jurisdiction?: string;
  tier?: string;
  modules?: string[];
  programme?: string;
  intent?: string;
};

const MODEL_DEFAULT = 'claude-sonnet-4-6';
const MAX_TOKENS = 2400;

const SYSTEM_PROMPT = `You are the FlyttGo procurement assistant. You answer security, deployment and procurement questions about the FlyttGo Technologies Group platform.

You speak in clear procurement-grade prose. You cite section codes (TC.00, AP.RF, DM.04, etc.) when relevant. You never invent capabilities — if the knowledge base does not support a claim, you say so and route the user to /consultation (CB.00).

Knowledge base (authoritative):

${KNOWLEDGE_BASE.map((e, i) => `KB.${String(i + 1).padStart(2, '0')} · Q: ${e.question}\n  A: ${e.answer.replace(/\n/g, ' ')}`).join('\n\n')}`;

function artefactPrompt(artefact: 'caiq' | 'rfp' | 'proposal', ctx: ArtefactContext): string {
  const org = ctx.organisation ?? 'the buyer';
  const jur = ctx.jurisdiction ?? 'EU';
  const tier = ctx.tier ?? 'L.04';
  const modules = (ctx.modules ?? ['identra']).join(', ');
  const programme = ctx.programme ?? 'platform deployment';
  const intent = ctx.intent ?? 'evaluate';

  if (artefact === 'caiq') {
    return `Generate a CAIQ-style security questionnaire response for ${org} (jurisdiction: ${jur}). Cover the 16 standard CAIQ control families. For each family:
- Control family name + brief intent
- FlyttGo's posture in plain language, citing TC.00 / SB.00 / OS.00 / AG.00 where relevant
- Evidence available (live download, on-request under MNDA, etc.)

Close with a procurement-friendly summary paragraph and a routing line into /consultation.`;
  }

  if (artefact === 'rfp') {
    return `Draft an RFP-response covering letter and 6-section technical response for ${org} under the ${jur} procurement framework. Programme: ${programme}. Tier: ${tier}. Modules requested: ${modules}.

Sections:
1. Executive summary
2. Solution architecture (modules + deployment substrate)
3. Compliance posture (cite jurisdiction-specific frameworks)
4. Delivery plan (cite tier delivery cadence)
5. Pricing posture (indicative band, refer to /pricing for live)
6. Risk register

Close with a routing line to /consultation under the right CT category.`;
  }

  return `Draft a custom procurement proposal for ${org} (jurisdiction: ${jur}). Programme: ${programme}. Tier: ${tier}. Modules: ${modules}. Intent: ${intent}.

Sections:
1. Programme summary
2. FlyttGo capability fit (cite SE.00, PL.00, DM.00)
3. Deployment substrate recommendation (DM.01-04 with rationale)
4. Engagement cadence (SE.D1 → SE.D3)
5. Indicative pricing band + ROI signal (cite RO.00)
6. Next steps + scoping intake routing

Sign off with the FlyttGo Technologies Group standard signature line.`;
}

/* ---------- streaming helpers ---------- */

const encoder = new TextEncoder();

const sse = (chunk: string) => encoder.encode(`data: ${JSON.stringify({ chunk })}\n\n`);
const sseDone = () => encoder.encode(`data: [DONE]\n\n`);

async function streamFromClaude(
  systemPrompt: string,
  userPrompt: string,
  apiKey: string,
): Promise<ReadableStream> {
  const upstream = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type':       'application/json',
      'x-api-key':          apiKey,
      'anthropic-version':  '2023-06-01',
    },
    body: JSON.stringify({
      model: MODEL_DEFAULT,
      max_tokens: MAX_TOKENS,
      stream: true,
      system: systemPrompt,
      messages: [{ role: 'user', content: userPrompt }],
    }),
  });

  if (!upstream.ok || !upstream.body) {
    const body = await upstream.text().catch(() => '');
    throw new Error(`Anthropic upstream ${upstream.status} ${body.slice(0, 200)}`);
  }

  const reader = upstream.body.getReader();
  const decoder = new TextDecoder();

  return new ReadableStream({
    async pull(controller) {
      let buffer = '';
      try {
        for (;;) {
          const { value, done } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() ?? '';
          for (const line of lines) {
            if (!line.startsWith('data:')) continue;
            const payload = line.slice(5).trim();
            if (!payload) continue;
            try {
              const json = JSON.parse(payload);
              if (json.type === 'content_block_delta' && json.delta?.type === 'text_delta') {
                controller.enqueue(sse(json.delta.text ?? ''));
              }
              if (json.type === 'message_stop') {
                controller.enqueue(sseDone());
              }
            } catch {
              // Drop unparseable SSE payloads silently.
            }
          }
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'upstream stream error';
        controller.enqueue(sse(`\n\n[upstream stream interrupted: ${msg}]`));
        controller.enqueue(sseDone());
      }
      controller.close();
    },
  });
}

function syntheticStream(text: string): ReadableStream {
  // Stream the text out in word-shaped chunks so the UI behaves as if a real
  // LLM were emitting it. ~30-60 ms/word ≈ 1k-2k WPM, similar to Sonnet.
  const tokens = text.split(/(\s+)/);
  let i = 0;
  return new ReadableStream({
    pull(controller) {
      if (i >= tokens.length) {
        controller.enqueue(sseDone());
        controller.close();
        return;
      }
      const burst = tokens.slice(i, i + 3).join('');
      i += 3;
      controller.enqueue(sse(burst));
      return new Promise((resolve) => setTimeout(resolve, 30 + Math.random() * 30));
    },
  });
}

function syntheticAnswer(query: string): string {
  const top = scoreKb(query, 2);
  if (top.length === 0 || top[0].score === 0) {
    return `I don't have a grounded answer for that in the FlyttGo public knowledge base. Open a consultation under CT.01 platform architecture session and the desk will route within one business day: /consultation.`;
  }
  const lines: string[] = [];
  for (const t of top) {
    lines.push(t.entry.answer);
  }
  lines.push(`\n\nFor a tailored answer with workspace data, open a sandbox tenant (SB.SP) at /sandbox or scope a consultation at /consultation.`);
  return lines.join('\n\n');
}

function syntheticArtefact(artefact: 'caiq' | 'rfp' | 'proposal', ctx: ArtefactContext): string {
  const org = ctx.organisation ?? 'the buyer';
  const jur = ctx.jurisdiction ?? 'EU';
  const tier = ctx.tier ?? 'L.04';
  const modules = (ctx.modules ?? ['Identra']).join(', ');

  if (artefact === 'caiq') {
    return `# CAIQ response · ${org}\n\nJurisdiction: ${jur}\nIssued by: FlyttGo Technologies Group · Trust Desk\nReference: TC.00 (Trust Center), SB.00 (SBOM), AG.00 (AI governance)\n\n## Application & Interface Security (AIS)\nFlyttGo emits OpenAPI 3.1 per release; OWASP ASVS L2 baseline; SAST + DAST integrated in the SLSA L3 pipeline. Evidence: AP.RF + SB.00 (live downloads).\n\n## Audit Assurance & Compliance (AAC)\nSOC 2 Type II + ISO 27001 active; pen-test summary public, full report on-request under MNDA (TC.06). Evidence: TC.01-08 (Trust Center).\n\n## Business Continuity Management & Operational Resilience (BCR)\nRPO ≤ 15 min, RTO ≤ 4 hours for managed SaaS; tighter envelopes for sovereign tenants. Tabletop log refreshed quarterly. Evidence: TC.07.\n\n## Change Control & Configuration Management (CCC)\nRelease pipeline emits CycloneDX 1.6 SBOM, Sigstore-signed images, SLSA L3 provenance. Evidence: SB.00, OS.CR.03 / OS.CR.04.\n\n## Data Security & Information Lifecycle Management (DSI)\nAt-rest AES-256-GCM, in-transit TLS 1.3, audit_log JSONB before/after on every mutation. Per-region data residency enforced. Evidence: PQ.M07, OS.CR.01.\n\n## Datacenter Security (DCS)\nUnderlying providers (AWS, Azure, GCP) carry SOC 2 + ISO 27001 + C5; sovereign-region operators carry their national equivalents. Evidence: TC.04 (subprocessors).\n\n## Encryption & Key Management (EKM)\nKMS-managed envelope encryption; BYOK via KMIP / PKCS#11 for sovereign tenants. Post-quantum migration in flight (PQ.00). Evidence: PQ.MX matrix.\n\n## Governance & Risk Management (GRM)\nBoard-approved master IS policy + 14 supporting policies (TC.08). Quarterly risk-register review; AI-specific governance via AG.00.\n\n## Human Resources Security (HRS)\nBackground checks for all engineering + operations staff; mandatory annual security training; tabletop participation across IR, BC and incident-response runbooks.\n\n## Identity & Access Management (IAM)\nWorkforce SSO via OIDC + SAML 2.0; FIDO2 / WebAuthn enforced on admin paths; tenant identity via Identra (eIDAS LoA-substantial baseline). Evidence: VC.00, OS.ID.*.\n\n## Infrastructure & Virtualization Security (IVS)\nKubernetes orchestration; Sigstore admission policy; tenant isolation enforced at namespace + tenant-key boundary. Evidence: IA.00, IA.03.\n\n## Interoperability & Portability (IPY)\nOpen standards across the surface (OS.00, 33 standards). Data export under DPA in machine-readable form; no lock-in clauses on tenant data.\n\n## Mobile Security (MOS)\nNative SDK packages for iOS / Android. PKCE-mandatory OAuth 2.1 flows; jailbreak / root detection on identity flows.\n\n## Security Incident Management, E-Discovery & Cloud Forensics (SEF)\nPublic incident postmortem archive (ST.IN). Forensic packs available to tenants under DPA Article 28; chain-of-custody preserved via append-only audit envelope.\n\n## Supply Chain Management, Transparency & Accountability (STA)\nSubprocessor list public (TC.04); 30-day change notification; SBOM per release; OSPO contribution registry (OS.MF).\n\n## Threat & Vulnerability Management (TVM)\nVulnerability disclosure policy public (TC.05); OSV.dev + NVD cross-reference every six hours; auto-revocation channel on critical CVEs in published artefacts.\n\n---\n\nThis response is a procurement-grade first pass against CAIQ v4.0.4. Full evidence pack countersigned under MNDA on request. Routing: /consultation under CT.01 Platform Architecture Session.`;
  }

  if (artefact === 'rfp') {
    return `# RFP response · ${org}\n\nJurisdiction: ${jur} · Programme: ${ctx.programme ?? 'platform deployment'} · Tier: ${tier}\nIssued by: FlyttGo Technologies Group\n\n## 1. Executive summary\nFlyttGo Technologies Group ('FlyttGo') proposes a ${tier} engagement to deliver ${ctx.programme ?? 'the platform deployment'} for ${org} on the FlyttGo platform substrate. The proposal is anchored on ${modules}, runs on the ${jur === 'sa' || jur === 'ae' ? 'sovereign' : 'customer-cloud or sovereign'} substrate at the buyer's election, and aligns with the ${jur.toUpperCase()} procurement framework. Indicative delivery cadence per tier ${tier} is documented at /engineering/ladder.\n\n## 2. Solution architecture\nThe deployment composes the following modules on the FlyttGoTech orchestration core (IA.00):\n${(ctx.modules ?? ['Identra']).map((m, i) => `  - Module ${i + 1}: ${m}`).join('\n')}\nDeployment substrate election to be confirmed during scoping (SE.D2): DM.01 (managed SaaS), DM.02 (customer cloud), DM.03 (sovereign datacenter), or DM.04 (confidential compute) for ultra-sensitive workloads.\n\n## 3. Compliance posture\nUnder ${jur.toUpperCase()} jurisdiction:\n  - Data residency: enforced per /jurisdictions/${jur === 'eu' ? 'european-union' : jur}\n  - Procurement framework: aligned to local routes (G-Cloud / OJEU / NUPP / Doffin / Etimad / Treasury RT)\n  - Privacy framework: GDPR, UK GDPR, PDPL, POPIA as applicable\n  - Sectoral framework: NCA ECC + CCC, eIDAS 2.0, PSD2, NHS DSP Toolkit etc. confirmed during scoping\n\n## 4. Delivery plan\nThree-phase engagement cadence per SE.04:\n  - SE.D1 Capability Scope (1-2 weeks)\n  - SE.D2 Build Scoping under MNDA (3-6 weeks)\n  - SE.D3 Build & Deployment per tier ${tier} cadence\n\n## 5. Pricing posture\nIndicative pricing band published at /pricing for tier ${tier} in jurisdiction ${jur.toUpperCase()}. Final point pricing on the order form signed after the SE.D2 scoping engagement. ROI / TCO comparison against build-from-scratch and hybrid stacks available at /roi.\n\n## 6. Risk register\nKey risks tracked publicly across the engagement:\n  - Procurement framework alignment (mitigated: framework cited in section 3)\n  - Data-residency posture (mitigated: jurisdiction-pinned substrate)\n  - Regulatory hand-off (mitigated: regulator desk integration during SE.D3)\n  - Scope creep (mitigated: tier-bounded deliverables)\n\n---\n\nResponse routing: open scoping at /consultation under CT.01 Platform Architecture Session or CT.03 Government Pilot Deployment Session.`;
  }

  return `# Procurement proposal · ${org}\n\nJurisdiction: ${jur} · Programme: ${ctx.programme ?? 'platform deployment'} · Tier: ${tier}\nIntent: ${ctx.intent ?? 'evaluate'} · Modules: ${modules}\nIssued by: FlyttGo Technologies Group · Solution Architecture\n\n## 1. Programme summary\nThis proposal scopes a ${tier} engagement for ${org} to deliver ${ctx.programme ?? 'the institutional platform programme'} under the ${jur.toUpperCase()} procurement and compliance framework.\n\n## 2. FlyttGo capability fit\nThe FlyttGo platform composes eight institutional modules on a single orchestration substrate. For this programme the recommended composition is ${modules} — covering the operational surface ${ctx.programme ?? 'the programme'} requires while leaving headroom for tier escalation post-go-live.\n\nReference: SE.00 (engineering division), PL.00 (platform ecosystem), DM.00 (deployment architecture).\n\n## 3. Deployment substrate recommendation\nGiven the ${jur.toUpperCase()} jurisdiction and the modules listed, the recommended substrate is ${jur === 'sa' || jur === 'ae' ? 'DM.03 sovereign datacenter (in-jurisdiction)' : 'DM.02 customer cloud with optional DM.03 sovereign for regulated workloads'}. DM.04 confidential compute available as an upgrade path for ultra-sensitive flows.\n\nReference: /deployment/${jur === 'sa' || jur === 'ae' ? 'sovereign' : 'customer-cloud'}, /deployment/confidential.\n\n## 4. Engagement cadence\nThree-phase delivery per SE.04:\n  - SE.D1 Capability Scope (1-2 weeks): joint architecture scope, jurisdictional alignment, risk register baseline\n  - SE.D2 Build Scoping under MNDA (3-6 weeks): final architecture, order form, security review, kick-off readiness\n  - SE.D3 Build & Deployment (per ${tier} cadence): production go-live + handover\n\nReference: /engineering/delivery.\n\n## 5. Indicative pricing + ROI signal\nPricing band per tier ${tier} in ${jur.toUpperCase()} published at /pricing — indicative ±15 %, final on the order form post-SE.D2. ROI signal: a ${tier} programme typically lands 28-44 % below build-from-scratch TCO over 3 years and 18-31 % below hybrid-stack TCO. Reference: /roi.\n\n## 6. Next steps + scoping intake\nProposed next step: open the consultation booking surface (/consultation) under CT.01 Platform Architecture Session. The desk routes within one business day; SE.D1 scope confirmed within two business weeks of intake.\n\n---\n\nFlyttGo Technologies Group\nPlatform Infrastructure · Enterprise & Public Sector\nplatform@flyttgotech.com`;
}

/* ---------- handler ---------- */

export async function POST(req: NextRequest) {
  let body: AskBody;
  try {
    body = (await req.json()) as AskBody;
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Basic input validation — short-circuit clearly malformed requests.
  if (body.mode !== 'ask' && body.mode !== 'artefact') {
    return new Response(JSON.stringify({ error: 'mode must be "ask" or "artefact"' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;

  let userPrompt: string;
  let syntheticText: string;

  if (body.mode === 'ask') {
    if (typeof body.query !== 'string' || body.query.trim().length < 2) {
      return new Response(JSON.stringify({ error: 'query must be at least 2 characters' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    userPrompt = body.query.trim().slice(0, 1200);
    syntheticText = syntheticAnswer(userPrompt);
  } else {
    if (!['caiq', 'rfp', 'proposal'].includes(body.artefact)) {
      return new Response(JSON.stringify({ error: 'artefact must be caiq | rfp | proposal' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    userPrompt = artefactPrompt(body.artefact, body.context ?? {});
    syntheticText = syntheticArtefact(body.artefact, body.context ?? {});
  }

  // Real LLM path: Anthropic API. Synthetic fallback covers preview / sandbox.
  let stream: ReadableStream;
  if (apiKey) {
    try {
      stream = await streamFromClaude(SYSTEM_PROMPT, userPrompt, apiKey);
    } catch {
      // If the upstream call fails for any reason, gracefully degrade to
      // the synthetic stream rather than 500ing — better UX, same wire
      // format, no cliff-edge for end users.
      stream = syntheticStream(syntheticText);
    }
  } else {
    stream = syntheticStream(syntheticText);
  }

  return new Response(stream, {
    headers: {
      'Content-Type':       'text/event-stream; charset=utf-8',
      'Cache-Control':      'no-cache, no-transform',
      'Connection':         'keep-alive',
      'X-Accel-Buffering':  'no',
    },
  });
}
