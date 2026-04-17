-- Deployment leads captured by the marketing contact forms.
-- Apply via Supabase CLI or the Dashboard SQL editor.

create extension if not exists "pgcrypto";

create table if not exists public.deployment_leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  company text,
  country text,
  deployment_type text,
  message text,
  source text,
  created_at timestamptz not null default now(),
  constraint deployment_leads_email_format check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$')
);

create index if not exists deployment_leads_created_at_idx
  on public.deployment_leads (created_at desc);

create index if not exists deployment_leads_email_idx
  on public.deployment_leads (email);

-- Row-level security: reject anon writes. The server route inserts with the
-- service-role key, which bypasses RLS by design.
alter table public.deployment_leads enable row level security;

drop policy if exists "deployment_leads_no_anon" on public.deployment_leads;
create policy "deployment_leads_no_anon"
  on public.deployment_leads
  for all
  to anon, authenticated
  using (false)
  with check (false);
