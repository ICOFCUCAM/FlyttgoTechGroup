-- 0010_artefact_kind_recommendation.sql
--
-- Extend ai_artefacts.artefact_kind to allow 'recommendation' for the
-- /recommend deployment-architecture engine. Original kinds were
-- caiq | rfp | proposal | answer (set in 0009).

alter table public.ai_artefacts
  drop constraint if exists ai_artefacts_artefact_kind_check;

alter table public.ai_artefacts
  add constraint ai_artefacts_artefact_kind_check
  check (artefact_kind in ('caiq','rfp','proposal','answer','recommendation'));

comment on column public.ai_artefacts.artefact_kind is
  'caiq | rfp | proposal | answer | recommendation. recommendation added in 0010 for /recommend deployment-architecture engine.';
