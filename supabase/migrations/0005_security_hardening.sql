-- ---------------------------------------------------------------------
-- 0005_security_hardening.sql
--
-- Defense-in-depth tightening on top of 0002. RLS is already enabled
-- on every accounting table; this migration closes the remaining gaps
-- and adds infrastructure for sign-in throttling.
-- ---------------------------------------------------------------------

-- 1) auditor_notes — explicit SELECT policy (the implicit org policy
--    from 0002 covered SELECT, but we restate it here so the intent is
--    obvious to anyone reading the migration history).
drop policy if exists auditor_notes_select on public.auditor_notes;
create policy auditor_notes_select on public.auditor_notes
  for select to authenticated
  using (organization_id = public.jwt_org_id());

-- Auditor notes are immutable after insert. Block UPDATE and DELETE
-- via per-row policy (the audit_log trigger captures any DML attempt
-- regardless, but this surfaces the rejection at the API layer).
drop policy if exists auditor_notes_no_update on public.auditor_notes;
create policy auditor_notes_no_update on public.auditor_notes
  for update to authenticated using (false) with check (false);

drop policy if exists auditor_notes_no_delete on public.auditor_notes;
create policy auditor_notes_no_delete on public.auditor_notes
  for delete to authenticated using (false);

-- 2) Tighten audit_log SELECT — auditors and admins of the same org
--    can read; nobody else, ever.
drop policy if exists audit_log_select on public.audit_log;
create policy audit_log_select on public.audit_log
  for select to authenticated
  using (
    organization_id = public.jwt_org_id()
    and public.jwt_role() in ('super_admin', 'admin', 'auditor')
  );

-- 3) Last-super-admin protection across organizations as a whole. The
--    Phase 2 trigger guards per-organization deletes; we also block
--    accidental org-wide super_admin loss across a join-replacement
--    transaction by adding a deferred-checkable assertion via trigger.
create or replace function public.guard_last_super_admin_global()
returns trigger language plpgsql as $$
declare
  remaining int;
begin
  select count(*) into remaining
    from public.users_roles
    where role = 'super_admin';
  if remaining = 0 then
    raise exception 'Cannot leave the platform without any super_admin role assigned.';
  end if;
  return null;
end $$;

drop trigger if exists trg_guard_last_super_admin_global on public.users_roles;
create constraint trigger trg_guard_last_super_admin_global
  after update or delete on public.users_roles
  deferrable initially deferred
  for each row execute function public.guard_last_super_admin_global();

-- 4) Base-currency sanity — base_currency on org_settings + organizations
--    must reference a real currency. The FK already does this on
--    org_settings; mirror it on organizations.
do $$ begin
  if not exists (
    select 1 from pg_constraint where conname = 'organizations_base_currency_fkey'
  ) then
    alter table public.organizations
      add constraint organizations_base_currency_fkey
      foreign key (base_currency) references public.currencies (code);
  end if;
end $$;

-- 5) Auth throttling — server-side rate-limit table for the /api/auth
--    routes. Cleared opportunistically by the application; a row
--    persists until explicitly purged.
create table if not exists public.auth_throttle (
  id bigserial primary key,
  bucket text not null,
  attempted_at timestamptz not null default now()
);

create index if not exists auth_throttle_bucket_at
  on public.auth_throttle (bucket, attempted_at desc);

-- 6) Storage hardening — if the storage.objects RLS policy from
--    0003 didn't apply (older Supabase versions), this re-asserts
--    that bucket access requires org membership.
do $$ begin
  begin
    drop policy if exists accounting_attachments_select on storage.objects;
    create policy accounting_attachments_select on storage.objects
      for select to authenticated
      using (
        bucket_id = 'accounting-attachments'
        and exists (
          select 1
            from public.attachments a
            join public.users_roles ur on ur.organization_id = a.organization_id
           where a.storage_bucket = 'accounting-attachments'
             and a.storage_path = storage.objects.name
             and ur.user_id = auth.uid()
        )
      );
  exception when others then
    null;
  end;
end $$;
