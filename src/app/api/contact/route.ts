import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { contactInputSchema } from '@/lib/contact-schema';
import { getSupabaseServerClient } from '@/lib/supabase';
import { getResendClient, getNotificationAddresses } from '@/lib/resend';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function POST(request: Request) {
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

    const subject = `New deployment lead · ${input.deployment_type ?? 'General inquiry'} · ${input.name}`;

    const plain = [
      `New deployment lead submitted via flyttgo.tech`,
      ``,
      `Name:             ${input.name}`,
      `Email:            ${input.email}`,
      `Company:          ${input.company ?? '—'}`,
      `Country:          ${input.country ?? '—'}`,
      `Deployment type:  ${input.deployment_type ?? '—'}`,
      `Source:           ${source ?? '—'}`,
      ``,
      `Message:`,
      input.message ?? '—',
    ].join('\n');

    const html = `
      <div style="font-family:Inter,system-ui,sans-serif;max-width:600px;margin:0 auto;color:#0F172A;">
        <div style="background:linear-gradient(135deg,#0A3A6B,#1E6FD9);color:#fff;padding:24px 28px;border-radius:12px 12px 0 0;">
          <div style="font-size:12px;letter-spacing:2px;text-transform:uppercase;opacity:0.75;">FlyttGo Deployment Lead</div>
          <div style="font-size:20px;font-weight:600;margin-top:4px;">${escapeHtml(input.deployment_type ?? 'General inquiry')}</div>
        </div>
        <div style="background:#fff;border:1px solid #E2E8F0;border-top:0;padding:24px 28px;border-radius:0 0 12px 12px;">
          <table style="width:100%;border-collapse:collapse;font-size:14px;">
            <tbody>
              ${[
                ['Name', input.name],
                ['Email', `<a href="mailto:${escapeHtml(input.email)}" style="color:#1E6FD9;text-decoration:none;">${escapeHtml(input.email)}</a>`],
                ['Company', input.company ?? '—'],
                ['Country', input.country ?? '—'],
                ['Source', source ?? '—'],
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
