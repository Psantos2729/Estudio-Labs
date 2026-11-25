import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/features/auth/AuthProvider';
import type { AttemptRow } from './attempts';

/** Todos los exámenes y repasos de quien inició sesión, el más reciente primero. */
export function useAttempts() {
  const userId = useAuth().session?.user.id;
  const query = useQuery({
    queryKey: ['exam_attempts', userId],
    enabled: Boolean(supabase && userId),
    queryFn: async (): Promise<AttemptRow[]> => {
      const { data, error } = await supabase!
        .from('exam_attempts')
        .select('id, module_id, kind, started_at, submitted_at, expires_at, score, passed')
        .order('started_at', { ascending: false });
      if (error) throw error;
      return data as AttemptRow[];
    },
  });
  return { attempts: query.data ?? [], isLoading: Boolean(userId) && query.isLoading, error: query.error };
}
