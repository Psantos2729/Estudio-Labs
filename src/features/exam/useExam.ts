import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import type { Exam, ExamOutcome } from './types';

/** Empieza o retoma el examen (RPC start_exam). Los errores traen el mensaje del servidor. */
export function useStartExam(moduleId: string) {
  return useMutation({
    mutationFn: async (): Promise<Exam> => {
      const { data, error } = await supabase!.rpc('start_exam', { p_module_id: moduleId });
      if (error) throw new Error(error.hint ? `Podrás repetir el examen a las ${localTime(error.hint)}.` : error.message);
      return data as Exam;
    },
  });
}

/** Empieza o retoma el repaso (RPC start_review). `expired`: se venció el anterior y el módulo se reabrió. */
export function useStartReview(moduleId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (): Promise<Exam | { expired: true }> => {
      const { data, error } = await supabase!.rpc('start_review', { p_module_id: moduleId });
      if (error) throw new Error(error.message);
      return data as Exam | { expired: true };
    },
    onSuccess: (d) => { if ('expired' in d) void qc.invalidateQueries({ queryKey: ['module_mastery'] }); },
  });
}

/** Entrega el examen o el repaso; el servidor califica y actualiza el dominio del módulo. */
export function useSubmitExam() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ attemptId, answers, code }: { attemptId: number; answers: Record<string, string>; code: Record<string, string> }) => {
      // El código se guarda para revisar el intento después (migración 014).
      const { data, error } = await supabase!.rpc('submit_exam', { p_attempt_id: attemptId, p_answers: answers, p_code: code });
      if (error) throw new Error(error.message);
      return data as ExamOutcome;
    },
    onSuccess: () => Promise.all([qc.invalidateQueries({ queryKey: ['module_mastery'] }), qc.invalidateQueries({ queryKey: ['exam_attempts'] }), qc.invalidateQueries({ queryKey: ['leaderboard'] }), qc.invalidateQueries({ queryKey: ['my-gear'] })]),
  });
}

// El servidor manda en `hint` la hora en que termina la espera; se muestra en la hora local.
const localTime = (iso: string) => new Date(iso).toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' });
