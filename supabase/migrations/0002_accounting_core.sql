-- =====================================================================
-- 0002_accounting_core.sql
-- Multi-jurisdiction accounting subsystem core schema.
--
-- Apply in order via the Supabase CLI or the SQL editor. Idempotent —
-- can be re-run during development.
--
-- Scope notes:
--  * Append-only audit_log enforced via per-table triggers; revoking
--    UPDATE/DELETE on audit_log to all roles is the second guard.
--  * RLS is enabled on every accounting table with default-deny policies.
--    Service-role bypasses RLS by design and is the only writer for
--    settings/template seeding from server actions.
--  * Multi-currency is captured per journal_line; amount_base_currency
--    is a generated column derived from amount * exchange_rate.
-- =====================================================================

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------
-- 1) Tenancy + people
-- ---------------------------------------------------------------------

create table if not exists public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  default_country text not null default 'NO' check (char_length(default_country) = 2),
  base_currency text not null default 'NOK' check (char_length(base_currency) = 3),
  fiscal_year_start_month smallint not null default 1 check (fiscal_year_start_month between 1 and 12),
  vat_period text not null default 'bimonthly'
    check (vat_period in ('monthly', 'bimonthly', 'quarterly', 'yearly')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

do $$ begin
  if not exists (select 1 from pg_type where typname = 'platform_role') then
    create type public.platform_role as enum (
      'super_admin', 'admin', 'accountant', 'auditor', 'finance_viewer'
    );
  end if;
end $$;

create table if not exists public.users_roles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  organization_id uuid not null references public.organizations (id) on delete restrict,
  role public.platform_role not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists users_roles_org_idx on public.users_roles (organization_id);

-- Prevent revoking the last super_admin in any single organization.
create or replace function public.guard_last_super_admin()
returns trigger language plpgsql as $$
declare
  remaining int;
  target_org uuid;
begin
  if (tg_op = 'DELETE') then
    if old.role = 'super_admin' then
      target_org := old.organization_id;
      select count(*) into remaining
        from public.users_roles
        where organization_id = target_org
          and role = 'super_admin'
          and user_id <> old.user_id;
      if remaining = 0 then
        raise exception 'Cannot remove the last super_admin for organization %', target_org;
      end if;
    end if;
    return old;
  elsif (tg_op = 'UPDATE') then
    if old.role = 'super_admin' and new.role <> 'super_admin' then
      target_org := old.organization_id;
      select count(*) into remaining
        from public.users_roles
        where organization_id = target_org
          and role = 'super_admin'
          and user_id <> old.user_id;
      if remaining = 0 then
        raise exception 'Cannot demote the last super_admin for organization %', target_org;
      end if;
    end if;
    return new;
  end if;
  return null;
end $$;

drop trigger if exists trg_guard_last_super_admin on public.users_roles;
create trigger trg_guard_last_super_admin
  before update or delete on public.users_roles
  for each row execute function public.guard_last_super_admin();

-- ---------------------------------------------------------------------
-- 2) Currency reference data
-- ---------------------------------------------------------------------

create table if not exists public.currencies (
  code text primary key check (char_length(code) = 3),
  name text not null,
  numeric_minor_unit smallint not null default 2,
  created_at timestamptz not null default now()
);

insert into public.currencies (code, name, numeric_minor_unit) values
  ('NOK', 'Norwegian krone', 2),
  ('EUR', 'Euro', 2),
  ('GBP', 'Pound sterling', 2),
  ('USD', 'United States dollar', 2),
  ('SEK', 'Swedish krona', 2),
  ('DKK', 'Danish krone', 2)
on conflict (code) do nothing;

create table if not exists public.exchange_rates (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations (id) on delete cascade,
  rate_date date not null,
  base_currency text not null references public.currencies (code),
  quote_currency text not null references public.currencies (code),
  rate numeric(20, 10) not null check (rate > 0),
  source text,
  created_at timestamptz not null default now(),
  unique (organization_id, rate_date, base_currency, quote_currency)
);

create index if not exists exchange_rates_org_date_idx
  on public.exchange_rates (organization_id, rate_date desc);

-- ---------------------------------------------------------------------
-- 3) Chart of accounts
-- ---------------------------------------------------------------------

create table if not exists public.accounts (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations (id) on delete cascade,
  framework text not null check (framework in ('NO', 'UK', 'US', 'IFRS')),
  code text not null,
  name text not null,
  account_type text not null check (account_type in ('asset', 'liability', 'equity', 'revenue', 'expense', 'contra')),
  parent_id uuid references public.accounts (id) on delete set null,
  is_statutory boolean not null default false,
  is_active boolean not null default true,
  vat_default_code text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (organization_id, framework, code)
);

create index if not exists accounts_org_framework_idx
  on public.accounts (organization_id, framework);

-- Statutory accounts are protected from deletion. They may be deactivated
-- but the row must remain for audit traceability.
create or replace function public.guard_statutory_account_delete()
returns trigger language plpgsql as $$
begin
  if old.is_statutory then
    raise exception 'Statutory account % cannot be deleted (deactivate instead).', old.code;
  end if;
  return old;
end $$;

drop trigger if exists trg_guard_statutory_account on public.accounts;
create trigger trg_guard_statutory_account
  before delete on public.accounts
  for each row execute function public.guard_statutory_account_delete();

-- ---------------------------------------------------------------------
-- 4) Tax codes + VAT rates
-- ---------------------------------------------------------------------

create table if not exists public.tax_codes (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations (id) on delete cascade,
  framework text not null check (framework in ('NO', 'UK', 'US', 'IFRS')),
  code text not null,
  name text not null,
  description text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  unique (organization_id, framework, code)
);

create table if not exists public.vat_rates (
  id uuid primary key default gen_random_uuid(),
  tax_code_id uuid not null references public.tax_codes (id) on delete cascade,
  rate_percent numeric(7, 4) not null check (rate_percent >= 0 and rate_percent <= 100),
  effective_from date not null,
  effective_to date,
  reverse_charge boolean not null default false,
  created_at timestamptz not null default now(),
  check (effective_to is null or effective_to >= effective_from)
);

create index if not exists vat_rates_tax_code_idx on public.vat_rates (tax_code_id);

-- ---------------------------------------------------------------------
-- 5) Journal entries (header + lines)
-- ---------------------------------------------------------------------

create table if not exists public.journal_entries (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations (id) on delete cascade,
  entry_number bigserial,
  entry_date date not null,
  description text,
  status text not null default 'draft' check (status in ('draft', 'posted', 'reversed')),
  posted_at timestamptz,
  posted_by uuid references auth.users (id),
  reverses_entry_id uuid references public.journal_entries (id) on delete set null,
  created_by uuid references auth.users (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists journal_entries_org_date_idx
  on public.journal_entries (organization_id, entry_date desc);
create index if not exists journal_entries_status_idx
  on public.journal_entries (status);

create table if not exists public.journal_lines (
  id uuid primary key default gen_random_uuid(),
  entry_id uuid not null references public.journal_entries (id) on delete cascade,
  organization_id uuid not null references public.organizations (id) on delete cascade,
  line_number smallint not null,
  account_id uuid not null references public.accounts (id) on delete restrict,
  side text not null check (side in ('debit', 'credit')),
  amount numeric(20, 4) not null check (amount > 0),
  currency text not null references public.currencies (code),
  exchange_rate numeric(20, 10) not null default 1 check (exchange_rate > 0),
  amount_base_currency numeric(20, 4) generated always as (amount * exchange_rate) stored,
  vat_code_id uuid references public.tax_codes (id) on delete restrict,
  vat_amount numeric(20, 4),
  description text,
  created_at timestamptz not null default now(),
  unique (entry_id, line_number)
);

create index if not exists journal_lines_account_idx
  on public.journal_lines (account_id);
create index if not exists journal_lines_org_idx
  on public.journal_lines (organization_id);

-- Reject posted entries that don't balance. Drafts may be unbalanced
-- while the accountant builds them; posting flips the gate.
create or replace function public.guard_balanced_journal_entry()
returns trigger language plpgsql as $$
declare
  total_debits numeric(20, 4);
  total_credits numeric(20, 4);
begin
  if new.status = 'posted' and (old.status is distinct from 'posted') then
    select
      coalesce(sum(case when side = 'debit'  then amount_base_currency end), 0),
      coalesce(sum(case when side = 'credit' then amount_base_currency end), 0)
      into total_debits, total_credits
      from public.journal_lines
      where entry_id = new.id;
    if total_debits is null or total_debits = 0 then
      raise exception 'Journal entry % cannot be posted with no lines.', new.id;
    end if;
    if total_debits <> total_credits then
      raise exception
        'Journal entry % unbalanced (debits=%, credits=%).',
        new.id, total_debits, total_credits;
    end if;
    new.posted_at := coalesce(new.posted_at, now());
  end if;
  return new;
end $$;

drop trigger if exists trg_guard_balanced_journal_entry on public.journal_entries;
create trigger trg_guard_balanced_journal_entry
  before update on public.journal_entries
  for each row execute function public.guard_balanced_journal_entry();

-- Posted entries are append-only — only reversal-via-new-entry is permitted.
create or replace function public.guard_posted_journal_entry()
returns trigger language plpgsql as $$
begin
  if (tg_op = 'UPDATE') then
    if old.status = 'posted' and new.status = 'posted' then
      raise exception 'Posted journal entry % cannot be modified — issue a reversing entry instead.', old.id;
    end if;
    if old.status = 'posted' and new.status = 'draft' then
      raise exception 'Posted journal entry % cannot be reverted to draft.', old.id;
    end if;
  elsif (tg_op = 'DELETE') then
    if old.status = 'posted' then
      raise exception 'Posted journal entry % cannot be deleted.', old.id;
    end if;
  end if;
  return coalesce(new, old);
end $$;

drop trigger if exists trg_guard_posted_je on public.journal_entries;
create trigger trg_guard_posted_je
  before update or delete on public.journal_entries
  for each row execute function public.guard_posted_journal_entry();

create or replace function public.guard_posted_journal_lines()
returns trigger language plpgsql as $$
declare
  parent_status text;
begin
  select status into parent_status
    from public.journal_entries
    where id = coalesce(new.entry_id, old.entry_id);
  if parent_status = 'posted' then
    raise exception 'Cannot mutate lines on posted journal entry.';
  end if;
  return coalesce(new, old);
end $$;

drop trigger if exists trg_guard_posted_jl on public.journal_lines;
create trigger trg_guard_posted_jl
  before update or delete on public.journal_lines
  for each row execute function public.guard_posted_journal_lines();

-- ---------------------------------------------------------------------
-- 6) Attachments (metadata only — files live in Supabase Storage)
-- ---------------------------------------------------------------------

create table if not exists public.attachments (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations (id) on delete cascade,
  entry_id uuid references public.journal_entries (id) on delete cascade,
  storage_bucket text not null default 'accounting-attachments',
  storage_path text not null,
  file_name text not null,
  content_type text,
  byte_size bigint check (byte_size is null or byte_size >= 0),
  document_type text check (document_type in ('receipt', 'invoice', 'contract', 'other') or document_type is null),
  uploaded_by uuid references auth.users (id),
  created_at timestamptz not null default now(),
  unique (storage_bucket, storage_path)
);

create index if not exists attachments_entry_idx on public.attachments (entry_id);
create index if not exists attachments_org_idx on public.attachments (organization_id);

-- ---------------------------------------------------------------------
-- 7) Auditor annotations
-- ---------------------------------------------------------------------

create table if not exists public.auditor_notes (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations (id) on delete cascade,
  entry_id uuid not null references public.journal_entries (id) on delete cascade,
  author_id uuid not null references auth.users (id),
  body text not null check (char_length(body) between 1 and 4000),
  created_at timestamptz not null default now()
);

create index if not exists auditor_notes_entry_idx on public.auditor_notes (entry_id);

-- ---------------------------------------------------------------------
-- 8) Append-only audit log
-- ---------------------------------------------------------------------

create table if not exists public.audit_log (
  id bigserial primary key,
  organization_id uuid,
  table_name text not null,
  row_pk text not null,
  action text not null check (action in ('insert', 'update', 'delete')),
  user_id uuid,
  before_state jsonb,
  after_state jsonb,
  occurred_at timestamptz not null default now()
);

create index if not exists audit_log_table_pk_idx
  on public.audit_log (table_name, row_pk);
create index if not exists audit_log_occurred_idx
  on public.audit_log (occurred_at desc);

-- Block updates and deletes outright. Even the service role can't break
-- the append-only invariant via DML against this table.
create or replace function public.audit_log_append_only()
returns trigger language plpgsql as $$
begin
  raise exception 'audit_log is append-only — % is not permitted.', tg_op;
end $$;

drop trigger if exists trg_audit_log_no_update on public.audit_log;
create trigger trg_audit_log_no_update
  before update on public.audit_log
  for each row execute function public.audit_log_append_only();

drop trigger if exists trg_audit_log_no_delete on public.audit_log;
create trigger trg_audit_log_no_delete
  before delete on public.audit_log
  for each row execute function public.audit_log_append_only();

-- Generic write-trigger reused on every accounting table. Captures the
-- full before/after row as JSONB so we can replay the state without a
-- secondary store.
create or replace function public.write_audit_log()
returns trigger language plpgsql as $$
declare
  row_id text;
  org_id uuid;
  actor uuid;
begin
  -- pk extraction — every accounting table uses an `id` column.
  if (tg_op = 'DELETE') then
    row_id := (to_jsonb(old)->>'id');
    org_id := nullif(to_jsonb(old)->>'organization_id', '')::uuid;
  else
    row_id := (to_jsonb(new)->>'id');
    org_id := nullif(to_jsonb(new)->>'organization_id', '')::uuid;
  end if;

  begin
    actor := auth.uid();
  exception when others then
    actor := null;
  end;

  insert into public.audit_log (
    organization_id, table_name, row_pk, action, user_id,
    before_state, after_state
  ) values (
    org_id,
    tg_table_name,
    coalesce(row_id, ''),
    lower(tg_op),
    actor,
    case when tg_op in ('update', 'delete') then to_jsonb(old) end,
    case when tg_op in ('insert', 'update') then to_jsonb(new) end
  );

  return coalesce(new, old);
end $$;

-- Attach the audit trigger to every accounting-relevant table.
do $$
declare
  t text;
  audited_tables text[] := array[
    'organizations', 'users_roles', 'accounts', 'tax_codes', 'vat_rates',
    'currencies', 'exchange_rates', 'journal_entries', 'journal_lines',
    'attachments', 'auditor_notes'
  ];
begin
  foreach t in array audited_tables loop
    execute format('drop trigger if exists trg_audit_%I on public.%I;', t, t);
    execute format(
      'create trigger trg_audit_%I after insert or update or delete on public.%I
         for each row execute function public.write_audit_log();',
      t, t
    );
  end loop;
end $$;

-- ---------------------------------------------------------------------
-- 9) Settings (per-organization)
-- ---------------------------------------------------------------------

create table if not exists public.org_settings (
  organization_id uuid primary key references public.organizations (id) on delete cascade,
  default_country text not null default 'NO',
  base_currency text not null references public.currencies (code) default 'NOK',
  fiscal_year_start_month smallint not null default 1 check (fiscal_year_start_month between 1 and 12),
  vat_period text not null default 'bimonthly'
    check (vat_period in ('monthly', 'bimonthly', 'quarterly', 'yearly')),
  number_format text not null default 'space-comma',
  date_format text not null default 'YYYY-MM-DD',
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- 10) Row-level security
-- ---------------------------------------------------------------------

alter table public.organizations    enable row level security;
alter table public.users_roles      enable row level security;
alter table public.accounts         enable row level security;
alter table public.tax_codes        enable row level security;
alter table public.vat_rates        enable row level security;
alter table public.currencies       enable row level security;
alter table public.exchange_rates   enable row level security;
alter table public.journal_entries  enable row level security;
alter table public.journal_lines    enable row level security;
alter table public.attachments      enable row level security;
alter table public.auditor_notes    enable row level security;
alter table public.audit_log        enable row level security;
alter table public.org_settings     enable row level security;

-- Helper — does the JWT belong to a member of this organization?
create or replace function public.jwt_org_id()
returns uuid language sql stable as $$
  select organization_id from public.users_roles where user_id = auth.uid();
$$;

create or replace function public.jwt_role()
returns public.platform_role language sql stable as $$
  select role from public.users_roles where user_id = auth.uid();
$$;

-- Currencies are a global reference list — readable by any authed user.
drop policy if exists currencies_read on public.currencies;
create policy currencies_read on public.currencies
  for select to authenticated using (true);

-- Default deny + per-table policies. The service-role key bypasses RLS,
-- so server-side migrations / seeders work; client SDKs hit the same
-- policies. RLS is intentionally strict — the auth.uid() membership
-- check pins data to the caller's org.
do $$
declare
  t text;
  org_scoped text[] := array[
    'accounts', 'tax_codes', 'vat_rates', 'exchange_rates',
    'journal_entries', 'journal_lines', 'attachments',
    'auditor_notes', 'org_settings'
  ];
begin
  foreach t in array org_scoped loop
    execute format('drop policy if exists %I_select on public.%I;', t, t);
    execute format(
      'create policy %I_select on public.%I
         for select to authenticated
         using (organization_id = public.jwt_org_id());',
      t, t
    );
  end loop;

  -- Mutating policies: only accountants and above may write. Auditors
  -- and finance_viewers stay read-only at the row level.
  foreach t in array array['accounts', 'tax_codes', 'vat_rates',
                            'exchange_rates', 'attachments', 'org_settings'] loop
    execute format('drop policy if exists %I_write on public.%I;', t, t);
    execute format(
      'create policy %I_write on public.%I
         for all to authenticated
         using (
           organization_id = public.jwt_org_id()
           and public.jwt_role() in (''super_admin'', ''admin'', ''accountant'')
         )
         with check (
           organization_id = public.jwt_org_id()
           and public.jwt_role() in (''super_admin'', ''admin'', ''accountant'')
         );',
      t, t
    );
  end loop;

  -- Journal entries + lines mirror the accountant write rule.
  foreach t in array array['journal_entries', 'journal_lines'] loop
    execute format('drop policy if exists %I_write on public.%I;', t, t);
    execute format(
      'create policy %I_write on public.%I
         for all to authenticated
         using (
           organization_id = public.jwt_org_id()
           and public.jwt_role() in (''super_admin'', ''admin'', ''accountant'')
         )
         with check (
           organization_id = public.jwt_org_id()
           and public.jwt_role() in (''super_admin'', ''admin'', ''accountant'')
         );',
      t, t
    );
  end loop;
end $$;

-- Auditor notes — auditors and accountants can both create them, but
-- they're scoped to the caller's org and immutable after insert.
drop policy if exists auditor_notes_insert on public.auditor_notes;
create policy auditor_notes_insert on public.auditor_notes
  for insert to authenticated
  with check (
    organization_id = public.jwt_org_id()
    and public.jwt_role() in ('super_admin', 'admin', 'accountant', 'auditor')
  );

-- Organizations + users_roles — read your own row(s).
drop policy if exists organizations_self on public.organizations;
create policy organizations_self on public.organizations
  for select to authenticated using (id = public.jwt_org_id());

drop policy if exists users_roles_self on public.users_roles;
create policy users_roles_self on public.users_roles
  for select to authenticated
  using (organization_id = public.jwt_org_id());

-- Audit log — read-only for auditors and admins of the same org.
drop policy if exists audit_log_select on public.audit_log;
create policy audit_log_select on public.audit_log
  for select to authenticated
  using (
    organization_id = public.jwt_org_id()
    and public.jwt_role() in ('super_admin', 'admin', 'auditor')
  );
-- No insert/update/delete policy — only the trigger can write, via
-- service-role context.

-- Defensive REVOKE on audit_log: even if a future migration adds a
-- broad policy, direct DML still hits the append-only trigger.
revoke update, delete on public.audit_log from anon, authenticated;
