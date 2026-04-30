-- Consultation requests captured by the /consultation booking engine
-- (CB.00). Each row is one structured consultation booking — replaces
-- the generic-meeting flow with a procurement-grade intake that can
-- be retrieved, audited and converted into a scoping engagement.
--
-- Apply via Supabase CLI or the Dashboard SQL editor.

create extension if not exists "pgcrypto";

create table if not exists public.consultation_requests (
  id uuid primary key default gen_random_uuid(),

  -- Step 1: organization context
  organization_type    text not null,      -- 'ORG.01' .. 'ORG.07'
  organization_name    text,               -- nullable: optional

  -- Step 2: consultation purpose + derived category
  consultation_purpose text not null,      -- 'CP.01' .. 'CP.05'
  consultation_type    text not null,      -- 'CT.01' .. 'CT.04' (derived)

  -- Step 3: deployment context
  deployment_region    text not null,      -- 'RG.US','RG.EU','RG.UK','RG.NO','RG.CA','RG.AF','RG.GL'
  deployment_model     text not null,      -- 'DM.01','DM.02','DM.OR','DM.03'

  -- Step 4: architecture tier (suggested or chosen)
  architecture_level   text not null,      -- 'L.01' .. 'L.06'

  -- Step 5: preferred consultation time
  requested_time       timestamptz not null,
  requested_timezone   text not null,      -- IANA tz, e.g. 'Europe/Oslo'

  -- Contact + notes
  contact_name         text not null,
  contact_email        text not null,
  contact_role         text,
  notes                text,

  -- Bookkeeping
  status               text not null default 'requested',  -- 'requested' | 'confirmed' | 'completed' | 'cancelled'
  source               text default 'consultation_engine',
  client_ip            inet,
  user_agent           text,
  created_at           timestamptz not null default now(),
  updated_at           timestamptz not null default now(),

  constraint cr_org_type_format    check (organization_type ~ '^ORG\.0[1-7]$'),
  constraint cr_purpose_format     check (consultation_purpose ~ '^CP\.0[1-5]$'),
  constraint cr_type_format        check (consultation_type ~ '^CT\.0[1-4]$'),
  constraint cr_region_format      check (deployment_region ~ '^RG\.(US|EU|UK|NO|CA|AF|GL)$'),
  constraint cr_deployment_format  check (deployment_model ~ '^DM\.(0[1-3]|OR)$'),
  constraint cr_level_format       check (architecture_level ~ '^L\.0[1-6]$'),
  constraint cr_status_value       check (status in ('requested','confirmed','completed','cancelled')),
  constraint cr_email_format       check (contact_email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  constraint cr_time_future        check (requested_time >= created_at - interval '1 hour')
);

create index if not exists consultation_requests_created_at_idx
  on public.consultation_requests (created_at desc);

create index if not exists consultation_requests_requested_time_idx
  on public.consultation_requests (requested_time);

create index if not exists consultation_requests_email_idx
  on public.consultation_requests (contact_email);

create index if not exists consultation_requests_type_idx
  on public.consultation_requests (consultation_type);

create index if not exists consultation_requests_status_idx
  on public.consultation_requests (status);

-- updated_at trigger so admin retrieval surfaces stay accurate when
-- desk operators move bookings through the lifecycle.
create or replace function public.consultation_requests_touch_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists consultation_requests_updated_at on public.consultation_requests;
create trigger consultation_requests_updated_at
  before update on public.consultation_requests
  for each row execute function public.consultation_requests_touch_updated_at();

-- Row-level security: deny anon writes. The /api/consultations route
-- inserts with the service-role key, which bypasses RLS by design.
alter table public.consultation_requests enable row level security;

drop policy if exists "consultation_requests_no_anon" on public.consultation_requests;
create policy "consultation_requests_no_anon"
  on public.consultation_requests
  for all
  to anon, authenticated
  using (false)
  with check (false);
