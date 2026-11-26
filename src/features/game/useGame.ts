import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/features/auth/AuthProvider';
import type { Gear } from './game';

export type Period = 'week' | 'all';

export interface RankRow {
  rank: number;
  name: string;
  color: string;
  gear: Gear;
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

/** Piezas ganadas y puestas (las ganadas las calcula el servidor: RPC my_gear). */
export function useMyGear() {
  const userId = useAuth().session?.user.id;
  return useQuery({
    queryKey: ['my-gear', userId],
    enabled: Boolean(supabase && userId),
    queryFn: async (): Promise<{ unlocked: string[]; gear: Gear }> => {
      const { data, error } = await supabase!.rpc('my_gear');
      if (error) throw error;
      return data[0] ?? { unlocked: [], gear: {} };
    },
  });
}

/** Viste al robot; el servidor rechaza piezas no ganadas. */
export function useSetGear() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (gear: Gear) => {
      const { error } = await supabase!.rpc('set_avatar_gear', { p_gear: gear });
      if (error) throw error;
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['my-gear'] });
      void qc.invalidateQueries({ queryKey: ['leaderboard'] });
    },
  });
}

export interface Mission { id: string; label: string; goal: number; done: number; xp: number }
export interface Quests { streak: number; best: number; today: boolean; missions: Mission[] }

/** Racha y misiones de hoy (hora de Guatemala), calculadas en el servidor (RPC my_quests, migración 023). */
export function useQuests() {
  const userId = useAuth().session?.user.id;
  return useQuery({
    queryKey: ['my-quests', userId],
    enabled: Boolean(supabase && userId),
    queryFn: async (): Promise<Quests> => {
      const { data, error } = await supabase!.rpc('my_quests');
      if (error) throw error;
      return data as Quests;
    },
  });
}
