-- Al registrarse: crea el perfil y deja M00 disponible y el resto bloqueado.

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', ''));

  insert into public.module_mastery (user_id, module_id, status)
  select new.id, m.id,
         case when m.position = 0 then 'available'::public.mastery_status
              else 'locked'::public.mastery_status end
  from public.modules m;

  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
