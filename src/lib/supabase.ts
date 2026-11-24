import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { normalizeSupabaseUrl } from './supabaseUrl';

const url = normalizeSupabaseUrl(import.meta.env.VITE_SUPABASE_URL as string | undefined);
const anonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined)?.trim();

/**
 * Cliente de Supabase, o null si no hay variables de entorno.
 * Sin Supabase la app funciona en modo invitado (solo M0, ADR-006).
 */
export const supabase: SupabaseClient | null =
  url && anonKey
    ? createClient(url, anonKey, {
        auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
      })
    : null;

export const isSupabaseConfigured = supabase !== null;
