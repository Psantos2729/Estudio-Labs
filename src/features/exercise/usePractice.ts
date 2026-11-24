import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/features/auth/AuthProvider';

export interface Attempt {
  code: string;
  notes: Record<string, string>;
  tests_passed: number;
  tests_total: number;
}

/** Último intento guardado del ejercicio (null si no hay sesión o nunca lo intentó). */
export function useLastAttempt(exerciseId: string) {
  const userId = useAuth().session?.user.id;
  const query = useQuery({
    queryKey: ['practice', userId, exerciseId],
    enabled: Boolean(supabase && userId),
    queryFn: async (): Promise<Attempt | null> => {
      const { data, error } = await supabase!
        .from('practice_attempts')
        .select('code, notes, tests_passed, tests_total')
        .eq('exercise_id', exerciseId)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      if (error) throw error;
      return data as Attempt | null;
    },
  });
  return { attempt: query.data ?? null, isLoading: Boolean(userId) && query.isLoading, canSave: Boolean(supabase && userId) };
}

/** Guarda un intento por RPC (la tabla no acepta escrituras del navegador). */
export function useSavePractice(exerciseId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (a: Attempt) => {
      const { error } = await supabase!.rpc('record_practice', {
        p_exercise_id: exerciseId,
        p_code: a.code,
        p_notes: a.notes,
        p_tests_passed: a.tests_passed,
        p_tests_total: a.tests_total,
      });
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['practice'] }),
  });
}
