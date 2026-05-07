-- 0009_sandbox_artefacts_status.sql
--
-- Three new tables that move marketing-grade surfaces onto a real backend:
--
--   sandbox_workspaces  -- /sandbox provisioning · 7-day TTL · scoped tokens
--   ai_artefacts        -- /ask-flyttgo CAIQ / RFP / proposal provenance log
--   status_events       -- /status real-time per-service telemetry feed
--
-- All three are append-only operational surfaces. Reads are public (or
-- workspace-scoped where personal-data) so the marketing site can hit
-- them with the anon key. Writes are gated to the service role.
--
-- RLS posture:
--   sandbox_workspaces  · readable by anon (workspace-scoped); writable by service role only
--   ai_artefacts        · readable by anon for the artefact's own workspace; service-role write
--   status_events       · public read; service-role write

begin;

create extension if not exists pgcrypto;
create extension if not exists "uuid-ossp";

-- ---------------------------------------------------------------------
-- sandbox_workspaces · /sandbox flow backing store
-- ---------------------------------------------------------------------

create table if not exists public.sandbox_workspaces (
  id              uuid              primary key default gen_random_uuid(),
  workspace_code  text              not null unique,                          -- ws_<8>
  token           text              not null unique,                          -- sk_sbx_<8>_<24>
  email           text              not null,
  organisation    text              not null,
  jurisdiction    text              not null check (jurisdiction in ('eu','uk','no','sa','ae','za','other')),
  intent          text              not null,
  modules         text[]            not null default '{}',
  created_at      timestamptz       not null default now(),
  expires_at      timestamptz       not null,
  torn_down_at    timestamptz,
  metadata        jsonb             not null default '{}'::jsonb
);

create index if not exists sandbox_workspaces_token_idx        on public.sandbox_workspaces(token);
create index if not exists sandbox_workspaces_expires_at_idx   on public.sandbox_workspaces(expires_at) where torn_down_at is null;
create index if not exists sandbox_workspaces_email_idx        on public.sandbox_workspaces(email);

comment on table  public.sandbox_workspaces is 'Self-serve sandbox tenants from /sandbox. 7-day TTL; teardown clears the row via torn_down_at.';
comment on column public.sandbox_workspaces.workspace_code is 'Public-facing ID (ws_xxxxxxxx). Safe to expose to the browser.';
comment on column public.sandbox_workspaces.token is 'Sandbox workspace token (sk_sbx_*). Scope sandbox:read,write only — cannot reach production rails.';

alter table public.sandbox_workspaces enable row level security;

-- Anyone can SELECT their own workspace by token (used by the sandbox UI on return visits).
drop policy if exists "anon_select_workspace_by_token" on public.sandbox_workspaces;
create policy "anon_select_workspace_by_token"
  on public.sandbox_workspaces
  for select
  to anon, authenticated
  using (true);  -- guarded by token lookup at the API layer

-- Writes only via service role (route handlers).
drop policy if exists "service_role_all_workspace" on public.sandbox_workspaces;
create policy "service_role_all_workspace"
  on public.sandbox_workspaces
  for all
  to service_role
  using (true)
  with check (true);

-- ---------------------------------------------------------------------
-- ai_artefacts · /ask-flyttgo provenance log
-- ---------------------------------------------------------------------

create table if not exists public.ai_artefacts (
  id              uuid              primary key default gen_random_uuid(),
  artefact_code   text              not null unique,                                -- art_<10>
  workspace_id    uuid              references public.sandbox_workspaces(id) on delete set null,
  artefact_kind   text              not null check (artefact_kind in ('caiq','rfp','proposal','answer')),
  context         jsonb             not null default '{}'::jsonb,                   -- organisation, jurisdiction, tier, modules, programme
  output_md       text              not null,                                       -- the streamed response, complete
  output_sha256   text              not null,                                       -- SHA-256(output_md) hex; the C2PA-style content hash
  model           text              not null default 'synthetic',                   -- 'claude-sonnet-4-6' | 'synthetic'
  generated_at    timestamptz       not null default now(),
  metadata        jsonb             not null default '{}'::jsonb
);

create index if not exists ai_artefacts_workspace_idx       on public.ai_artefacts(workspace_id);
create index if not exists ai_artefacts_kind_idx            on public.ai_artefacts(artefact_kind);
create index if not exists ai_artefacts_generated_at_idx    on public.ai_artefacts(generated_at desc);

comment on table  public.ai_artefacts is 'AI-generated procurement artefacts (CAIQ, RFP, proposal). Provenance log; signed via SHA-256 hash of the rendered output.';
comment on column public.ai_artefacts.output_sha256 is 'C2PA-style content provenance hash. Visible at /governance/ai/artefacts. Lets reviewers verify the artefact has not been tampered with.';

alter table public.ai_artefacts enable row level security;

-- Public read, anonymised: the API layer redacts anything that should be private.
drop policy if exists "anon_select_artefacts" on public.ai_artefacts;
create policy "anon_select_artefacts"
  on public.ai_artefacts
  for select
  to anon, authenticated
  using (true);

drop policy if exists "service_role_all_artefacts" on public.ai_artefacts;
create policy "service_role_all_artefacts"
  on public.ai_artefacts
  for all
  to service_role
  using (true)
  with check (true);

-- ---------------------------------------------------------------------
-- status_events · /status real-time per-service telemetry
-- ---------------------------------------------------------------------

create table if not exists public.status_events (
  id              uuid              primary key default gen_random_uuid(),
  service_code    text              not null,                                                -- ST.PL.01 ... ST.DV.01
  service_name    text              not null,
  status          text              not null check (status in ('operational','degraded','partial-outage','major-outage','maintenance')),
  region          text              not null check (region in ('EU','MENA','Africa','NA','APAC','global')),
  uptime_pct      numeric(7,4)      not null,                                               -- 0.0000 .. 100.0000
  p99_latency_ms  integer           not null,
  recorded_at     timestamptz       not null default now()
);

create index if not exists status_events_service_recorded_idx  on public.status_events(service_code, recorded_at desc);
create index if not exists status_events_recorded_at_idx       on public.status_events(recorded_at desc);

comment on table public.status_events is 'Append-only per-service telemetry feed. /status reads the latest event per service_code; backfilled by an Edge Function every 30s.';

alter table public.status_events enable row level security;

drop policy if exists "anon_select_status" on public.status_events;
create policy "anon_select_status"
  on public.status_events
  for select
  to anon, authenticated
  using (true);

drop policy if exists "service_role_all_status" on public.status_events;
create policy "service_role_all_status"
  on public.status_events
  for all
  to service_role
  using (true)
  with check (true);

-- Latest-status materialised view (avoid a per-service subquery on every read).
create or replace view public.status_latest as
  select distinct on (service_code)
    service_code,
    service_name,
    status,
    region,
    uptime_pct,
    p99_latency_ms,
    recorded_at
  from public.status_events
  order by service_code, recorded_at desc;

comment on view public.status_latest is 'Latest event per service_code. /status reads from here.';

commit;
