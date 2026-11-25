import { useState, type FormEvent } from 'react';
import { Navigate } from 'react-router-dom';
import { isSupabaseConfigured } from '@/lib/supabase';
import { Button } from '@/ui/primitives/Button';
import { Panel } from '@/ui/primitives/Panel';
import { useAuth } from './AuthProvider';
import { LogoMark } from '@/ui/primitives/Logo';

export function LoginPage() {
  const { session, signInWithGoogle, signInWithEmail } = useAuth();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  if (session) return <Navigate to="/" replace />;

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const error = await signInWithEmail(email.trim());
    setMessage(error ?? 'Revisa tu correo: te enviamos un enlace para entrar.');
  }

  return (
    <main className="login">
      <Panel className="login__card">
        <LogoMark size={56} />
        <p className="muted small">$ pylab login</p>
        <h1 className="display">Entra para guardar tu progreso</h1>
        {!isSupabaseConfigured && (
          <p className="warn small">
            Supabase no está configurado: copia .env.example como .env.local. Mientras tanto puedes
            practicar M0 como invitado.
          </p>
        )}
        <Button onClick={signInWithGoogle} disabled={!isSupabaseConfigured}>
          continuar con Google
        </Button>
        <form className="login__form" onSubmit={onSubmit}>
          <label htmlFor="email" className="muted small">o recibe un enlace mágico</label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@correo.com"
            className="input"
          />
          <Button type="submit" variant="ghost" disabled={!isSupabaseConfigured}>
            enviar enlace
          </Button>
        </form>
        {message && <p className="small" role="status">{message}</p>}
      </Panel>
    </main>
  );
}
