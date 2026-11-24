import { useQuery } from '@tanstack/react-query';
import { MODULES } from '@/content/modules';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/features/auth/AuthProvider';
import { buildModuleViews, guestMastery, type MasteryRow } from './masteryView';

/** Progreso por módulo: de Supabase si hay sesión; si no, modo invitado. */
export function useModuleViews() {
  const { session } = useAuth();
  const userId = session?.user.id;

  const query = useQuery({
    queryKey: ['module_mastery', userId],
    enabled: Boolean(supabase && userId),
    queryFn: async (): Promise<MasteryRow[]> => {
      const { data, error } = await supabase!
        .from('module_mastery')
        .select('module_id, status, best_score');
      if (error) throw error;
      return data as MasteryRow[];
    },
  });

  const rows = userId ? (query.data ?? []) : guestMastery(MODULES);
  return {
    views: buildModuleViews(MODULES, rows),
    isGuest: !userId,
    isLoading: Boolean(userId) && query.isLoading,
    error: query.error,
  };
}
