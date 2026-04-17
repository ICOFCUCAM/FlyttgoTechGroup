import 'server-only';

import { Resend } from 'resend';

type Cached = { client: Resend | null };
const cached: Cached = { client: null };

export function getResendClient(): Resend {
  if (cached.client) return cached.client;
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error('Missing env: RESEND_API_KEY');
  cached.client = new Resend(apiKey);
  return cached.client;
}

export function getNotificationAddresses(): { from: string; to: string } {
  const from = process.env.CONTACT_NOTIFICATION_FROM;
  const to = process.env.CONTACT_NOTIFICATION_TO;
  if (!from) throw new Error('Missing env: CONTACT_NOTIFICATION_FROM');
  if (!to) throw new Error('Missing env: CONTACT_NOTIFICATION_TO');
  return { from, to };
}
