import 'server-only';

import { createClient, type SupabaseClient } from '@supabase/supabase-js';

type Cached = { client: SupabaseClient | null };
const cached: Cached = { client: null };

/**
 * Server-side Supabase client bound to the service-role key. Only invoke
 * from route handlers, server actions or other server contexts — the
 * service-role key must never reach the browser.
 */
export function getSupabaseServerClient(): SupabaseClient {
  if (cached.client) return cached.client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url) {
    throw new Error('Missing env: NEXT_PUBLIC_SUPABASE_URL');
  }
  if (!serviceRoleKey) {
    throw new Error('Missing env: SUPABASE_SERVICE_ROLE_KEY');
  }

  cached.client = createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { headers: { 'x-flyttgo-source': 'web-marketing' } },
  });
  return cached.client;
}
