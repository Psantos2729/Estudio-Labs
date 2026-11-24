-- Cuentas creadas antes de cargar los módulos (seed) quedaron sin filas en module_mastery,
-- y entonces hasta M00 aparecía bloqueado. Esta función completa las filas que falten
-- con la misma regla que handle_new_user(): M00 disponible y el resto bloqueado.
-- No toca filas existentes. La llama esta migración y también el final de seed.sql.

create or replace function public.fill_missing_mastery()
returns void
language sql
security definer
set search_path = public
as $$
  insert into public.module_mastery (user_id, module_id, status)
  select u.id, m.id,
         case when m.position = 0 then 'available'::public.mastery_status
              else 'locked'::public.mastery_status end
  from auth.users u cross join public.modules m
  on conflict do nothing;
$$;

revoke execute on function public.fill_missing_mastery from public, anon, authenticated;

select public.fill_missing_mastery();
