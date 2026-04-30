-- Project estimates produced by the /pricing live procurement
-- configurator (PR.00). Each row captures one configurator submission
-- so administrators can retrieve, review and convert estimates into
-- scoping engagements via the engagement-desk register.
--
-- Apply via the Supabase CLI or the Dashboard SQL editor.

create extension if not exists "pgcrypto";

create table if not exists public.project_estimates (
  id uuid primary key default gen_random_uuid(),

  -- Architecture & scope
  architecture_level text not null,        -- 'L.01' .. 'L.06'
  selected_modules  text[] not null default array[]::text[],  -- ['AO.01','AO.03',...]
  deployment_model  text not null,         -- 'DM.01' .. 'DM.03' / 'DM.OR'
  region            text not null,         -- 'RG.US','RG.EU',...
  pathway           text,                  -- nullable: 'PA.01'..'PA.05' for L5/L6

  -- Computed estimates (snapshotted at submission time)
  cost_estimate_low_usd  numeric(14, 2) not null,
  cost_estimate_high_usd numeric(14, 2) not null,
  timeline_weeks_low     integer not null,
  timeline_weeks_high    integer not null,
  timeline_bucket        text    not null, -- '2-4 weeks' | '1-3 months' | etc.

  -- Optional contact context (when an estimate is saved alongside an
  -- engagement intake). Nullable so the configurator can save
  -- anonymous / pre-contact estimates first.
  contact_email     text,
  contact_name      text,
  contact_org       text,

  -- Bookkeeping
  source            text default 'pricing_configurator',
  client_ip         inet,
  user_agent        text,
  created_at        timestamptz not null default now(),

  constraint project_estimates_level_format
    check (architecture_level ~ '^L\.0[1-6]$'),
  constraint project_estimates_costs_positive
    check (cost_estimate_low_usd >= 0 and cost_estimate_high_usd >= cost_estimate_low_usd),
  constraint project_estimates_weeks_positive
    check (timeline_weeks_low >= 0 and timeline_weeks_high >= timeline_weeks_low)
);

create index if not exists project_estimates_created_at_idx
  on public.project_estimates (created_at desc);

create index if not exists project_estimates_level_idx
  on public.project_estimates (architecture_level);

create index if not exists project_estimates_email_idx
  on public.project_estimates (contact_email)
  where contact_email is not null;

-- Row-level security: reject anon writes. The /api/estimates route
-- inserts with the service-role key, which bypasses RLS by design.
-- Admin retrieval reads via the same server-side path under role-
-- bounded access (handled in app code, not SQL — kept simple here).
alter table public.project_estimates enable row level security;

drop policy if exists "project_estimates_no_anon" on public.project_estimates;
create policy "project_estimates_no_anon"
  on public.project_estimates
  for all
  to anon, authenticated
  using (false)
  with check (false);
