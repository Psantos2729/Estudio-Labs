-- Pruebas del perfil público y la semana del ranking (migración 024).
\set ON_ERROR_STOP on
insert into auth.users (id, raw_user_meta_data) values
  ('00000000-0000-0000-0000-00000000d401', '{"full_name": "Lía"}'),
  ('00000000-0000-0000-0000-00000000d402', '{"full_name": "Beto"}');
insert into public.lesson_progress (user_id, lesson_id)
select '00000000-0000-0000-0000-00000000d401', id from public.catalog_items where tests is null order by id limit 2;

set role authenticated;
set request.jwt.claim.sub = '00000000-0000-0000-0000-00000000d402';
do $$
declare
  h text := (select handle from public.leaderboard('all') where name = 'Lía');
  p jsonb;
begin
  assert h ~ '^[0-9a-f]{12}$', 'handle de 12 caracteres: ' || coalesce(h, 'null');
  assert h <> left(replace('00000000-0000-0000-0000-00000000d401', '-', ''), 12), 'el handle no es el id';
  p := public.public_profile(h);
  assert p ->> 'name' = 'Lía' and not (p ->> 'is_me')::boolean and (p ->> 'streak')::int = 1, 'perfil de Lía: ' || p::text;
  assert (p ->> 'xp')::int = (select xp from public.leaderboard('all') where name = 'Lía'), 'mismo XP que el ranking';
  assert jsonb_typeof(p -> 'unlocked') = 'array', 'logros como lista';
  assert not p ? 'id' and not p ? 'email', 'sin id ni correo';
  assert (public.public_profile((select handle from public.leaderboard('all') where is_me)) ->> 'is_me')::boolean, 'su propio perfil';
  begin
    perform public.public_profile('000000000000');
    raise exception 'FALLO: abrió un perfil que no existe';
  exception when no_data_found then null;
  end;
end $$;

-- La semana empieza el lunes 00:00 de Guatemala: una lección del domingo a las 19:00 (lunes 01:00 UTC) no cuenta.
reset role;
update public.lesson_progress set read_at =
  (date_trunc('week', now() at time zone 'America/Guatemala') - interval '5 hours') at time zone 'America/Guatemala'
where user_id = '00000000-0000-0000-0000-00000000d401';
set role authenticated;
do $$ begin
  assert coalesce((select xp from public.leaderboard('week') where name = 'Lía'), 0) = 0, 'el domingo no es de esta semana';
  assert (select xp from public.leaderboard('all') where name = 'Lía') > 0, 'pero sí del total';
end $$;

reset request.jwt.claim.sub;
set role anon;
do $$ begin
  perform public.public_profile('000000000000');
  raise exception 'FALLO: un invitado vio un perfil';
exception when insufficient_privilege then null;
end $$;
reset role;
select 'OK: pruebas del perfil público pasaron' as resultado;
