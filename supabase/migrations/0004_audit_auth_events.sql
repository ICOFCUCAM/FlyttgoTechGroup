-- ---------------------------------------------------------------------
-- 0004_audit_auth_events.sql
-- Authentication-attempt logging — augments the table-level audit_log
-- with sign-in / sign-out / failed-login events. The Phase 2 audit_log
-- captures DML; this captures who-came-in-when. Same append-only
-- guarantees apply (the trigger from 0002 already blocks UPDATE/DELETE
-- on audit_log).
-- ---------------------------------------------------------------------

-- Helper: write a single audit_log row from server code without going
-- through a table mutation. Service-role only by convention; we don't
-- expose this via PostgREST.
create or replace function public.audit_log_event(
  p_organization_id uuid,
  p_action text,
  p_subject text,
  p_user_id uuid,
  p_details jsonb
) returns void language plpgsql security definer as $$
begin
  if p_action not in ('insert', 'update', 'delete') then
    -- Repurpose the action enum for auth events: store as 'insert' with
    -- the human-readable action inside after_state so we don't need an
    -- ALTER TYPE on the action check constraint (which would require
    -- recreating audit_log).
    insert into public.audit_log (
      organization_id, table_name, row_pk, action,
      user_id, before_state, after_state
    ) values (
      p_organization_id,
      coalesce(p_subject, 'auth'),
      coalesce(p_user_id::text, 'anonymous'),
      'insert',
      p_user_id,
      null,
      jsonb_build_object('event', p_action, 'details', p_details, 'at', now())
    );
  else
    insert into public.audit_log (
      organization_id, table_name, row_pk, action,
      user_id, before_state, after_state
    ) values (
      p_organization_id,
      coalesce(p_subject, 'auth'),
      coalesce(p_user_id::text, 'anonymous'),
      p_action,
      p_user_id,
      null,
      p_details
    );
  end if;
end $$;

revoke all on function public.audit_log_event(uuid, text, text, uuid, jsonb) from public;
grant execute on function public.audit_log_event(uuid, text, text, uuid, jsonb) to service_role;

-- Convenience view for the auditor workspace — flattens the auth events
-- from audit_log so the AU.02 page can join them with a simple filter.
create or replace view public.auth_event_log as
select
  id,
  occurred_at,
  organization_id,
  user_id,
  table_name as subject,
  (after_state->>'event') as event,
  after_state as details
from public.audit_log
where table_name in ('auth')
   or (after_state ? 'event' and after_state->>'event' in (
     'sign_in_succeeded', 'sign_in_failed', 'sign_out', 'session_refreshed'
   ));
