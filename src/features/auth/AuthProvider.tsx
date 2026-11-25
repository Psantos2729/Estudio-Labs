import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

interface AuthState {
  session: Session | null;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string) => Promise<string | null>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(supabase !== null);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    const { data } = supabase.auth.onAuthStateChange((_event, next) => setSession(next));
    return () => data.subscription.unsubscribe();
  }, []);

  const redirectTo = `${window.location.origin}${import.meta.env.BASE_URL}`;

  const value: AuthState = {
    session,
    async signInWithGoogle() {
      await supabase?.auth.signInWithOAuth({ provider: 'google', options: { redirectTo } });
    },
    async signInWithEmail(email) {
      if (!supabase) return 'Supabase no está configurado.';
      const { error } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: redirectTo } });
      return error ? error.message : null;
    },
    async signOut() {
      await supabase?.auth.signOut();
    },
  };

  // Sin esperar la sesión, al recargar se ve un momento "bloqueado" o "inicia sesión" (modo invitado).
  return <AuthContext.Provider value={value}>{loading ? <p className="center muted">cargando…</p> : children}</AuthContext.Provider>;
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>');
  return ctx;
}
