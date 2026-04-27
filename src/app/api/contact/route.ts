import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { contactInputSchema } from '@/lib/contact-schema';
import { getSupabaseServerClient } from '@/lib/supabase';
import { getResendClient, getNotificationAddresses } from '@/lib/resend';
import { clientIp, rateLimit } from '@/lib/rate-limit';
import { verifyTurnstile } from '@/lib/turnstile';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Reject request bodies larger than this before parsing. Contact forms
// don't need more than ~10 KB; anything larger is an attack surface.
const MAX_BODY_BYTES = 32 * 1024;
const RATE_LIMIT_MAX = 5; // requests per IP
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function siteOrigin(): string | null {
  const raw = process.env.NEXT_PUBLIC_SITE_URL;
  if (!raw) return null;
  try {
    return new URL(raw).origin;
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  // 1) Origin check — only enforce when configured AND the request sent
  //    an Origin header. Browsers always send Origin on cross-site POST;
  //    the absence of Origin on a same-origin POST is allowed.
  const expected = siteOrigin();
  const origin = request.headers.get('origin');
  if (expected && origin && origin !== expected) {
    return NextResponse.json({ error: 'Origin not allowed.' }, { status: 403 });
  }

  // 2) Rate limit — per-IP sliding window. Returns 429 with the standard
  //    rate-limit headers so clients can back off gracefully.
  const ip = clientIp(request.headers);
  const rl = rateLimit(
    `contact:${ip}`,
    RATE_LIMIT_MAX,
    RATE_LIMIT_WINDOW_MS,
  );
  if (!rl.ok) {
    const retryAfter = Math.max(1, Math.ceil((rl.resetAt - Date.now()) / 1000));
    return NextResponse.json(
      { error: 'Too many requests. Please wait a few minutes.' },
      {
        status: 429,
        headers: {
          'Retry-After': String(retryAfter),
          'X-RateLimit-Limit': String(RATE_LIMIT_MAX),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': String(Math.ceil(rl.resetAt / 1000)),
        },
      },
    );
  }

  // 3) Body size — cut oversized submissions at the edge, before Zod.
  const contentLength = request.headers.get('content-length');
  if (contentLength && Number(contentLength) > MAX_BODY_BYTES) {
    return NextResponse.json(
      { error: 'Request body too large.' },
      { status: 413 },
    );
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  let input;
  try {
    input = contactInputSchema.parse(json);
  } catch (err) {
    if (err instanceof ZodError) {
      return NextResponse.json(
        {
          error: 'Validation failed.',
          issues: err.issues.map((i) => ({ path: i.path.join('.'), message: i.message })),
        },
        { status: 422 },
      );
    }
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  // Honeypot: bots fill this field; silently succeed without side effects.
  if (input.website && input.website.length > 0) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  // Cloudflare Turnstile — verified only when TURNSTILE_SECRET_KEY is set.
  // Gracefully no-op in environments without captcha configured.
  const captcha = await verifyTurnstile(input.turnstile_token, ip);
  if (!captcha.ok) {
    return NextResponse.json(
      { error: 'Captcha verification failed. Please retry.' },
      { status: 400 },
    );
  }

  const source = (() => {
    const raw = request.headers.get('x-flyttgo-source');
    if (!raw) return undefined;
    return raw.slice(0, 120);
  })();

  const row = {
    name: input.name,
    email: input.email,
    company: input.company ?? null,
    country: input.country ?? null,
    deployment_type: input.deployment_type ?? null,
    message: input.message ?? null,
    source: source ?? null,
  };

  try {
    const supabase = getSupabaseServerClient();
    const { error: insertError } = await supabase.from('deployment_leads').insert(row);
    if (insertError) {
      console.error('[contact] Supabase insert failed', insertError);
      return NextResponse.json(
        { error: 'Unable to save your submission. Please try again shortly.' },
        { status: 502 },
      );
    }
  } catch (err) {
    console.error('[contact] Supabase init failed', err);
    return NextResponse.json(
      { error: 'Contact intake is temporarily unavailable.' },
      { status: 503 },
    );
  }

  // Send notification email. Failure here should not roll back the DB write —
  // the lead is captured; surface a non-fatal warning in the response.
  let emailDispatched = false;
  try {
    const { from, to } = getNotificationAddresses();
    const resend = getResendClient();

    // Detect a multi-step deployment intake submission. When at least one
    // structured intake field is present we shape the subject + body
    // around the institution + objective + scale signal so the
    // architect on triage rotation can route without opening the body.
    const isStructuredIntake = Boolean(
      input.institution || input.objective || input.scale || input.timeline,
    );

    const subject = isStructuredIntake
      ? `Deployment intake · ${input.institution ?? 'Institution TBD'} · ${input.objective ?? 'Objective TBD'} · ${input.scale ?? 'Scale TBD'} — ${input.name}`
      : `New deployment lead · ${input.deployment_type ?? 'General inquiry'} · ${input.name}`;

    const plain = [
      isStructuredIntake
        ? `New structured deployment intake submitted via flyttgo.tech/contact`
        : `New deployment lead submitted via flyttgo.tech`,
      ``,
      `Name:             ${input.name}`,
      `Email:            ${input.email}`,
      `Company:          ${input.company ?? '—'}`,
      `Country:          ${input.country ?? '—'}`,
      `Deployment type:  ${input.deployment_type ?? '—'}`,
      `Source:           ${source ?? '—'}`,
      ...(isStructuredIntake
        ? [
            ``,
            `— Intake (DP.01) ——————————————`,
            `Institution:      ${input.institution ?? '—'}`,
            `Objective:        ${input.objective ?? '—'}`,
            `Scale:            ${input.scale ?? '—'}`,
            `Timeline:         ${input.timeline ?? '—'}`,
          ]
        : []),
      ``,
      `Message:`,
      input.message ?? '—',
    ].join('\n');

    const intakeRows: Array<[string, string]> = isStructuredIntake
      ? [
          ['Institution', input.institution ?? '—'],
          ['Objective', input.objective ?? '—'],
          ['Scale', input.scale ?? '—'],
          ['Timeline', input.timeline ?? '—'],
        ]
      : [];

    const headerLabel = isStructuredIntake
      ? 'FlyttGo Deployment Intake · DP.01'
      : 'FlyttGo Deployment Lead';
    const headerTitle = isStructuredIntake
      ? `${input.institution ?? 'Institution'} — ${input.objective ?? 'Objective'}`
      : (input.deployment_type ?? 'General inquiry');

    const html = `
      <div style="font-family:Inter,system-ui,sans-serif;max-width:600px;margin:0 auto;color:#0F172A;">
        <div style="background:linear-gradient(135deg,#0A3A6B,#1E6FD9);color:#fff;padding:24px 28px;border-radius:12px 12px 0 0;">
          <div style="font-size:12px;letter-spacing:2px;text-transform:uppercase;opacity:0.75;">${escapeHtml(headerLabel)}</div>
          <div style="font-size:20px;font-weight:600;margin-top:4px;">${escapeHtml(headerTitle)}</div>
        </div>
        <div style="background:#fff;border:1px solid #E2E8F0;border-top:0;padding:24px 28px;border-radius:0 0 12px 12px;">
          <table style="width:100%;border-collapse:collapse;font-size:14px;">
            <tbody>
              ${[
                ['Name', escapeHtml(input.name)],
                ['Email', `<a href="mailto:${escapeHtml(input.email)}" style="color:#1E6FD9;text-decoration:none;">${escapeHtml(input.email)}</a>`],
                ['Company', escapeHtml(input.company ?? '—')],
                ['Country', escapeHtml(input.country ?? '—')],
                ['Source', escapeHtml(source ?? '—')],
              ]
                .map(
                  ([label, value]) =>
                    `<tr>
                      <td style="padding:8px 0;color:#64748B;width:140px;">${escapeHtml(String(label))}</td>
                      <td style="padding:8px 0;color:#0F172A;font-weight:500;">${String(value)}</td>
                    </tr>`,
                )
                .join('')}
            </tbody>
          </table>
          ${
            intakeRows.length > 0
              ? `<div style="margin-top:20px;padding-top:20px;border-top:1px solid #E2E8F0;">
                   <div style="font-size:11px;color:#0A3A6B;text-transform:uppercase;letter-spacing:2px;font-weight:600;font-family:ui-monospace,JetBrains Mono,monospace;">DP.01 · Structured intake</div>
                   <table style="width:100%;border-collapse:collapse;font-size:14px;margin-top:8px;">
                     <tbody>
                       ${intakeRows
                         .map(
                           ([label, value]) =>
                             `<tr>
                                <td style="padding:8px 0;color:#64748B;width:140px;">${escapeHtml(label)}</td>
                                <td style="padding:8px 0;color:#0F172A;font-weight:500;">${escapeHtml(value)}</td>
                              </tr>`,
                         )
                         .join('')}
                     </tbody>
                   </table>
                 </div>`
              : ''
          }
          <div style="margin-top:20px;padding-top:20px;border-top:1px solid #E2E8F0;">
            <div style="font-size:12px;color:#64748B;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Message</div>
            <div style="margin-top:8px;font-size:14px;white-space:pre-wrap;">${escapeHtml(input.message ?? '—')}</div>
          </div>
        </div>
      </div>
    `;

    const { error: sendError } = await resend.emails.send({
      from,
      to,
      replyTo: input.email,
      subject,
      html,
      text: plain,
    });
    if (sendError) {
      console.error('[contact] Resend send failed', sendError);
    } else {
      emailDispatched = true;
    }
  } catch (err) {
    console.error('[contact] Resend dispatch failed', err);
  }

  return NextResponse.json({ ok: true, emailDispatched }, { status: 201 });
}
