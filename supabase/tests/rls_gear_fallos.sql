-- Pruebas de vinito, Mjolnir y Claude feliz (migración 022).
\set ON_ERROR_STOP on
insert into auth.users (id, raw_user_meta_data) values
  ('00000000-0000-0000-0000-00000000b201', '{"full_name": "Nico"}');
-- Nico reprobó M00 dos veces y dejó vencer un tercer intento; resolvió un reto y un ejercicio normal.
insert into public.exam_attempts (user_id, module_id, item_ids, started_at, expires_at, submitted_at, score, passed, kind) values
  ('00000000-0000-0000-0000-00000000b201', 'M00', '{}', now() - interval '5 hours', now() - interval '4 hours', now() - interval '4 hours', 40, false, 'exam'),
  ('00000000-0000-0000-0000-00000000b201', 'M00', '{}', now() - interval '3 hours', now() - interval '2 hours', now() - interval '2 hours', 50, false, 'exam');
insert into public.practice_attempts (user_id, exercise_id, code, tests_passed, tests_total)
select '00000000-0000-0000-0000-00000000b201', id, 'print(1)', tests, tests from public.catalog_items
where challenge order by id limit 1;

set role authenticated;
set request.jwt.claim.sub = '00000000-0000-0000-0000-00000000b201';
do $$
declare u text[];
begin
  u := (select unlocked from public.my_gear());
  assert u @> array['vinito', 'mjolnir'], 'reprobó y resolvió un reto: ' || u::text;
  assert not u && array['claude_feliz'], 'con 2 reprobados todavía no: ' || u::text;
end $$;
reset role;
-- Un intento que vence sin enviarse cuenta como reprobado; uno en curso no.
insert into public.exam_attempts (user_id, module_id, item_ids, started_at, expires_at) values
  ('00000000-0000-0000-0000-00000000b201', 'M00', '{}', now() + interval '1 hour', now() + interval '2 hours');
set role authenticated;
do $$ begin
  assert not (select unlocked from public.my_gear()) && array['claude_feliz'], 'un intento en curso no cuenta';
end $$;
reset role;
update public.exam_attempts set started_at = now() - interval '1 hour', expires_at = now() - interval '15 minutes'
where user_id = '00000000-0000-0000-0000-00000000b201' and submitted_at is null;
set role authenticated;
do $$ begin
  assert (select unlocked from public.my_gear()) @> array['claude_feliz'], 'a los 3 reprobados llega Claude feliz';
  perform public.set_avatar_gear('{"mascota": "claude_feliz", "mano": "mjolnir"}');
end $$;
reset request.jwt.claim.sub;
reset role;
select 'OK: pruebas de vinito, Mjolnir y Claude feliz pasaron' as resultado;
