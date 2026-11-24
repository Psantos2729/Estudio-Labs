-- Pruebas de la fase 1: trigger de registro y reglas RLS. Falla con error si algo no cumple.
\set ON_ERROR_STOP on
insert into auth.users (id, raw_user_meta_data) values
  ('00000000-0000-0000-0000-00000000000a', '{"full_name":"Ana"}'),
  ('00000000-0000-0000-0000-00000000000b', '{}');

do $$ begin
  assert (select count(*) from public.module_mastery
          where user_id = '00000000-0000-0000-0000-00000000000a') = 13, '13 filas de dominio';
  assert (select status from public.module_mastery
          where user_id = '00000000-0000-0000-0000-00000000000a' and module_id = 'M00') = 'available';
  assert (select count(*) from public.module_mastery
          where user_id = '00000000-0000-0000-0000-00000000000a' and status = 'locked') = 12;
  assert (select display_name from public.profiles
          where id = '00000000-0000-0000-0000-00000000000a') = 'Ana';
end $$;

set role authenticated;
set request.jwt.claim.sub = '00000000-0000-0000-0000-00000000000a';

do $$ begin
  assert (select count(*) from public.modules) = 13, 'catálogo público';
  assert (select count(*) from public.profiles) = 1, 'solo ve su perfil';
  assert (select count(*) from public.module_mastery) = 13, 'solo ve su progreso';
end $$;

update public.profiles set display_name = 'Ana S.';

do $$ begin
  begin
    update public.module_mastery set status = 'mastered';
    raise exception 'FALLO: el navegador pudo escribir module_mastery';
  exception when insufficient_privilege then null;
  end;
  begin
    update public.profiles set xp = 99999;
    raise exception 'FALLO: el navegador pudo cambiar su XP';
  exception when insufficient_privilege then null;
  end;
  begin
    insert into public.modules (id, position, slug, title, summary) values ('M99', 99, 'x', 'x', 'x');
    raise exception 'FALLO: el navegador pudo escribir el catálogo';
  exception when insufficient_privilege then null;
  end;
end $$;

reset role;
select 'OK: todas las pruebas de la fase 1 pasaron' as resultado;
