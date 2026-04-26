-- ---------------------------------------------------------------------
-- 0003_accounting_storage.sql
-- Storage bucket for accounting attachments (receipts, invoices,
-- contracts) referenced from public.attachments. The bucket is
-- private — files are accessed via signed URLs minted by server
-- routes after RLS-equivalent role checks pass.
-- ---------------------------------------------------------------------

insert into storage.buckets (id, name, public)
values ('accounting-attachments', 'accounting-attachments', false)
on conflict (id) do nothing;

-- RLS on storage.objects for this bucket: members of the org can SELECT
-- their own attachments. Writes go through the server route which uses
-- the service-role key.
do $$
begin
  -- Read: any authenticated member of the same org as the row in
  -- public.attachments that points at this storage object.
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
