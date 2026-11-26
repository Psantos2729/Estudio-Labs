import { useEffect } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/features/auth/AuthProvider';
import { Button } from '@/ui/primitives/Button';
import { Logo } from '@/ui/primitives/Logo';
import { XpBadge } from '@/features/game/XpBadge';
import { AchievementPopup } from '@/features/game/AchievementPopup';

export function Layout() {
  const { session, signOut } = useAuth();
  const email = session?.user.email;
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // cada pantalla nueva empieza arriba
  }, [pathname]);

  return (
    <div className="shell">
      <header className="topbar">
        <NavLink to="/" className="brand" aria-label="pylab, ir al inicio">
          <Logo />
        </NavLink>
        <nav className="topbar__nav" aria-label="Principal">
          <NavLink to="/" end>inicio</NavLink>
          <NavLink to="/mapa">mapa</NavLink>
          <NavLink to="/pseudocodigo">pseudocódigo</NavLink>
          <NavLink to="/repaso">repaso</NavLink>
          <NavLink to="/historial">historial</NavLink>
          <NavLink to="/ranking">ranking</NavLink>
          <NavLink to="/taller">taller</NavLink>
          <NavLink to="/logros">logros</NavLink>
        </nav>
        <div className="topbar__user">
          {email ? (
            <>
              <XpBadge />
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
      {/* key: cada ruta monta su pantalla de cero (sin estado de la anterior) y entra animada */}
      <div className="page" key={pathname}>
        <Outlet />
      </div>
      {session && <AchievementPopup />}
      <footer className="footer muted small">
        <NavLink to="/privacidad">privacidad</NavLink>
      </footer>
    </div>
  );
}
