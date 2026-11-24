import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/features/auth/AuthProvider';

/** Ids de las lecciones que el usuario ya leyó (vacío en modo invitado). */
export function useReadLessons() {
  const userId = useAuth().session?.user.id;
  const query = useQuery({
    queryKey: ['lessons_read', userId],
    enabled: Boolean(supabase && userId),
    queryFn: async () => {
      const { data, error } = await supabase!.from('lesson_progress').select('lesson_id');
      if (error) throw error;
      return new Set((data as { lesson_id: string }[]).map((r) => r.lesson_id));
    },
  });
  return { read: query.data ?? new Set<string>(), isLoading: Boolean(userId) && query.isLoading };
}

/** Marca una lección como leída por RPC. Sin sesión no hace nada. */
export function useMarkLessonRead() {
  const userId = useAuth().session?.user.id;
  const qc = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (lessonId: string) => {
      const { error } = await supabase!.rpc('mark_lesson_read', { p_lesson_id: lessonId });
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['lessons_read'] }),
    // alert y no un aviso en la página: al guardar ya navegamos a la siguiente lección.
    onError: (e) => alert(`No se pudo guardar tu avance en esta lección: ${e.message}`),
  });
  return (lessonId: string) => {
    if (supabase && userId) mutation.mutate(lessonId);
  };
}
