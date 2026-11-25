import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/features/auth/AuthProvider';

export type Period = 'week' | 'all';

export interface RankRow {
  rank: number;
  name: string;
  color: string;
  xp: number;
  mastered: number;
  station: string;
  is_me: boolean;
}

/** Top 10 del periodo más la fila propia, calculados en el servidor (RPC leaderboard). */
export function useLeaderboard(period: Period = 'all') {
  const userId = useAuth().session?.user.id;
  const query = useQuery({
    queryKey: ['leaderboard', userId, period],
    enabled: Boolean(supabase && userId),
    queryFn: async (): Promise<RankRow[]> => {
      const { data, error } = await supabase!.rpc('leaderboard', { p_period: period });
      if (error) throw error;
      return data as RankRow[];
    },
  });
  const rows = query.data ?? [];
  return {
    rows,
    me: rows.find((r) => r.is_me),
    isGuest: !userId,
    isLoading: Boolean(userId) && query.isLoading,
    error: query.error,
  };
}

/** Cambia nombre y color del robot (las únicas columnas del perfil que el navegador puede tocar). */
export function useUpdateCharacter() {
  const qc = useQueryClient();
  const userId = useAuth().session?.user.id;
  return useMutation({
    mutationFn: async (p: { display_name: string; avatar_color: string }) => {
      const { error } = await supabase!.from('profiles').update(p).eq('id', userId!);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['leaderboard'] }),
  });
}
