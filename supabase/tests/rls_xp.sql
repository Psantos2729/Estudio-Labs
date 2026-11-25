-- Pruebas de XP, color del personaje y ranking (migración 016).
\set ON_ERROR_STOP on
insert into auth.users (id, raw_user_meta_data) values
  ('00000000-0000-0000-0000-00000000f001', '{"full_name": "Ana Pérez"}'),
  ('00000000-0000-0000-0000-00000000f002', '{}');
-- Las otras pruebas dejan sus propias cuentas; aquí solo importan estas dos.
delete from public.profiles where id::text not like '00000000-0000-0000-0000-00000000f00%';

set role authenticated;

-- 1) Lección 10 + ejercicio resuelto 25 (repetirlo o fallar otro no suma).
set request.jwt.claim.sub = '00000000-0000-0000-0000-00000000f001';
do $$
declare r record;
begin
  perform public.mark_lesson_read('M00-L01');
  perform public.mark_lesson_read('M00-L01');
  perform public.record_practice('M00-E01', 'print(1)', '{}', 2, 2);
  perform public.record_practice('M00-E01', 'print(1)', '{}', 2, 2);
  perform public.record_practice('M00-E02', 'x', '{}', 1, 3);
  select * into r from public.leaderboard('all') where is_me;
  assert r.xp = 35 and r.rank = 1 and r.name = 'Ana Pérez' and r.station = 'M00', 'fila propia: ' || r::text;
  assert (select xp from public.leaderboard('week') where is_me) = 35, 'lo de hoy cuenta en la semana';

  update public.profiles set avatar_color = '#ff5470' where id = auth.uid();
  assert (select color from public.leaderboard('all') where is_me) = '#ff5470', 'cambia su color';
  begin
    update public.profiles set avatar_color = 'red' where id = auth.uid();
    raise exception 'FALLO: aceptó un color inválido';
  exception when check_violation then null;
  end;
  begin
    update public.profiles set xp = 9999 where id = auth.uid();
    raise exception 'FALLO: el navegador cambió su XP';
  exception when insufficient_privilege then null;
  end;
  begin
    perform public.xp_of(auth.uid());
    raise exception 'FALLO: el navegador llamó xp_of';
  exception when insufficient_privilege then null;
  end;
  begin
    perform public.leaderboard('mes');
    raise exception 'FALLO: aceptó un periodo inválido';
  exception when invalid_parameter_value then null;
  end;
end $$;

-- 2) Sin XP: se ve a sí misma (sin nombre → "Estudiante") y ve a la otra persona sin su correo ni id.
set request.jwt.claim.sub = '00000000-0000-0000-0000-00000000f002';
do $$ begin
  assert (select count(*) from public.leaderboard('all')) = 2, 'top + fila propia';
  assert (select name from public.leaderboard('all') where not is_me) = 'Ana Pérez', 've a la primera';
  assert (select name || xp from public.leaderboard('all') where is_me) = 'Estudiante0', 'fila propia sin nombre';
end $$;

-- 3) Un invitado no ve el ranking.
reset request.jwt.claim.sub;
set role anon;
do $$ begin
  perform public.leaderboard('all');
  raise exception 'FALLO: un invitado vio el ranking';
exception when insufficient_privilege then null;
end $$;
reset role;
select 'OK: pruebas de XP y ranking pasaron' as resultado;
