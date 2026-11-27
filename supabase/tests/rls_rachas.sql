-- Pruebas de rachas, misiones y piezas por racha (migración 023).
\set ON_ERROR_STOP on
insert into auth.users (id, raw_user_meta_data) values
  ('00000000-0000-0000-0000-00000000c301', '{"full_name": "Rita"}');
-- Rita leyó una lección por día los últimos 7 días (hora de Guatemala) y una más hace 20 días.
insert into public.lesson_progress (user_id, lesson_id, read_at)
select '00000000-0000-0000-0000-00000000c301', id, now() - make_interval(days => (n - 1)::int)
from (select id, row_number() over (order by id) as n from public.catalog_items where tests is null) l
where n <= 7;
insert into public.lesson_progress (user_id, lesson_id, read_at)
select '00000000-0000-0000-0000-00000000c301', id, now() - interval '20 days'
from public.catalog_items where tests is null order by id desc limit 1;

set role authenticated;
set request.jwt.claim.sub = '00000000-0000-0000-0000-00000000c301';
do $$
declare q jsonb := public.my_quests();
begin
  assert (q ->> 'streak')::int = 7 and (q ->> 'best')::int = 7 and (q ->> 'today')::boolean, 'racha de 7: ' || q::text;
  assert jsonb_array_length(q -> 'missions') = 3, 'tres misiones: ' || q::text;
  assert q -> 'missions' -> 0 ->> 'id' = 'leer' and (q -> 'missions' -> 0 ->> 'done')::int = 1, 'leyó hoy: ' || q::text;
  assert (q -> 'missions' -> 1 ->> 'done')::int = 0, 'no resolvió ejercicios: ' || q::text;
  -- 8 lecciones (80) + misión leer en 8 días (120) + una racha de 7 (70).
  -- De viernes a domingo, 5 de esos 7 días caen en esta semana: suma la misión semanal (+80).
  assert (select xp from public.leaderboard('all') where is_me)
    = 270 + case when extract(isodow from (now() at time zone 'America/Guatemala')::date) >= 5 then 80 else 0 end,
    'XP con misiones y racha';
  assert (select unlocked from public.my_gear()) @> array['fueguito'], 'fueguito a los 7 días';
  assert not (select unlocked from public.my_gear()) && array['corona_llamas'], 'la corona pide 30';
  begin
    perform public.missions_of(auth.uid(), current_date);
    raise exception 'FALLO: el navegador llamó missions_of';
  exception when insufficient_privilege then null;
  end;
end $$;

-- Sin estudiar ayer ni hoy, la racha actual se pierde pero la mejor queda.
reset role;
update public.lesson_progress set read_at = read_at - interval '2 days'
where user_id = '00000000-0000-0000-0000-00000000c301';
set role authenticated;
do $$
declare q jsonb := public.my_quests();
begin
  assert (q ->> 'streak')::int = 0 and (q ->> 'best')::int = 7 and not (q ->> 'today')::boolean, 'racha rota: ' || q::text;
end $$;

-- Un invitado no ve misiones.
reset request.jwt.claim.sub;
set role anon;
do $$ begin
  perform public.my_quests();
  raise exception 'FALLO: un invitado vio misiones';
exception when insufficient_privilege then null;
end $$;
reset role;
select 'OK: pruebas de rachas y misiones pasaron' as resultado;

-- Misiones semanales, avance de medallas y nivel en la semana (migraciones 025 y 026).
set role authenticated;
set request.jwt.claim.sub = '00000000-0000-0000-0000-00000000c301';
do $$
declare
  q jsonb := public.my_quests();
  st jsonb := (select stats from public.my_gear());
  r record;
begin
  assert jsonb_array_length(q -> 'weekly') = 3 and q -> 'weekly' -> 0 ->> 'id' = 'dias', 'tres semanales: ' || q::text;
  assert (q -> 'weekly' -> 0 ->> 'done')::int between 0 and 5, 'días de esta semana: ' || q::text;
  assert (st ->> 'racha')::int = 7 and (st ->> 'lecciones')::int = 8 and st ? 'nivel' and not st ? 'beaten', 'cuentas: ' || st::text;
  select * into r from public.leaderboard('week') where is_me;
  assert r.total_xp = (select xp from public.leaderboard('all') where is_me) and r.total_xp >= r.xp, 'total en la semana: ' || r::text;
end $$;
reset request.jwt.claim.sub;
reset role;
select 'OK: misiones semanales y avance de medallas' as resultado;
