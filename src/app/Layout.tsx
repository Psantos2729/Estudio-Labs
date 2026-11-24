import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '@/features/auth/AuthProvider';
import { Button } from '@/ui/primitives/Button';

export function Layout() {
  const { session, signOut } = useAuth();
  const email = session?.user.email;

  return (
    <div className="shell">
      <header className="topbar">
        <NavLink to="/" className="brand">
          pylab<span className="ok">_</span>
        </NavLink>
        <nav className="topbar__nav" aria-label="Principal">
          <NavLink to="/">mapa</NavLink>
          <span className="muted" title="Disponible en la fase 4">repaso</span>
          <span className="muted" title="Disponible en la fase 4">historial</span>
        </nav>
        <div className="topbar__user">
          {email ? (
            <>
              <span className="muted small">{email}</span>
              <Button variant="ghost" onClick={() => void signOut()}>salir</Button>
            </>
          ) : (
            <>
              <span className="muted small">invitado</span>
              <NavLink to="/login" className="btn btn--primary">entrar</NavLink>
            </>
          )}
        </div>
      </header>
      <Outlet />
    </div>
  );
}
