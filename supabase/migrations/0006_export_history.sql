-- ---------------------------------------------------------------------
-- 0006_export_history.sql
-- Statutory-export audit trail. Every SAF-T / VAT-return / GAAP
-- export emission writes a row here so auditors can answer the
-- "who exported what, when?" question without grepping logs.
-- ---------------------------------------------------------------------

create table if not exists public.export_history (
  id bigserial primary key,
  organization_id uuid not null references public.organizations (id) on delete cascade,
  user_id uuid references auth.users (id),
  export_type text not null check (export_type in (
    'saf-t', 'mva', 'vat-100', 'gaap-trial-balance', 'gaap-general-ledger',
    'gaap-income-statement', 'gaap-balance-sheet', 'ifrs-package',
    'csv', 'doc', 'pdf'
  )),
  jurisdiction text check (jurisdiction in ('NO', 'UK', 'US', 'IFRS') or jurisdiction is null),
  period_from date,
  period_to date,
  file_name text,
  file_location text,
  byte_size bigint,
  emitted_at timestamptz not null default now()
);

create index if not exists export_history_org_emitted_idx
  on public.export_history (organization_id, emitted_at desc);
create index if not exists export_history_type_idx
  on public.export_history (export_type);

alter table public.export_history enable row level security;

drop policy if exists export_history_select on public.export_history;
create policy export_history_select on public.export_history
  for select to authenticated
  using (
    organization_id = public.jwt_org_id()
    and public.jwt_role() in ('super_admin', 'admin', 'accountant', 'auditor')
  );

drop policy if exists export_history_insert on public.export_history;
create policy export_history_insert on public.export_history
  for insert to authenticated
  with check (
    organization_id = public.jwt_org_id()
    and public.jwt_role() in ('super_admin', 'admin', 'accountant', 'auditor')
  );

-- Append-only — once an export is logged, it stays.
drop policy if exists export_history_no_update on public.export_history;
create policy export_history_no_update on public.export_history
  for update to authenticated using (false) with check (false);
drop policy if exists export_history_no_delete on public.export_history;
create policy export_history_no_delete on public.export_history
  for delete to authenticated using (false);

-- Mirror the Phase-2 audit_log trigger onto this table too so every
-- export-history insert is double-tracked.
drop trigger if exists trg_audit_export_history on public.export_history;
create trigger trg_audit_export_history
  after insert on public.export_history
  for each row execute function public.write_audit_log();

-- ---------------------------------------------------------------------
-- Organization profile fields (Phase 32 prep): registration_number,
-- vat_number. These show up in statutory exports' Header sections
-- (SAF-T Company / Customer record, VAT-100 declarant block).
-- ---------------------------------------------------------------------

do $$ begin
  alter table public.organizations
    add column if not exists registration_number text,
    add column if not exists vat_number text;
exception when duplicate_column then
  null;
end $$;
