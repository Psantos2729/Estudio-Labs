-- Pruebas de fill_missing_mastery (migración 007).
\set ON_ERROR_STOP on
insert into auth.users (id) values ('00000000-0000-0000-0000-0000000000f1'), ('00000000-0000-0000-0000-0000000000f2');
-- Simula una cuenta creada antes de cargar los módulos.
delete from public.module_mastery where user_id = '00000000-0000-0000-0000-0000000000f1';
update public.module_mastery set status = 'mastered'
  where module_id = 'M00' and user_id = '00000000-0000-0000-0000-0000000000f2';

select public.fill_missing_mastery();

do $$ begin
  assert (select status from public.module_mastery
          where user_id = '00000000-0000-0000-0000-0000000000f1' and module_id = 'M00') = 'available',
         'M00 queda disponible';
  assert (select count(*) from public.module_mastery
          where user_id = '00000000-0000-0000-0000-0000000000f1' and status = 'locked')
         = (select count(*) - 1 from public.modules), 'el resto queda bloqueado';
  assert (select status from public.module_mastery
          where user_id = '00000000-0000-0000-0000-0000000000f2' and module_id = 'M00') = 'mastered',
         'no pisa filas existentes';
end $$;

set role authenticated;
set request.jwt.claim.sub = '00000000-0000-0000-0000-0000000000f1';
do $$ begin
  begin
    perform public.fill_missing_mastery();
    raise exception 'FALLO: el navegador pudo llamar fill_missing_mastery';
  exception when insufficient_privilege then null;
  end;
end $$;
