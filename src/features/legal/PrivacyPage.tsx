import { Panel } from '@/ui/primitives/Panel';

const REPO = 'https://github.com/Psantos2729/Estudio-Labs';

export function PrivacyPage() {
  return (
    <main className="legal">
      <Panel className="legal__card">
        <p className="muted small">$ cat privacidad.md · actualizado el 24 de noviembre de 2026</p>
        <h1 className="display">Política de privacidad</h1>
        <p>
          pylab es una plataforma educativa gratuita para aprender Python. Esta página explica qué
          datos guardamos y para qué.
        </p>

        <h2 className="legal__title">Qué datos guardamos</h2>
        <ul className="plain">
          <li>· Tu correo electrónico, para identificar tu cuenta.</li>
          <li>· Tu nombre, si entras con Google (o el que escribas), para mostrarlo en tu perfil y en el ranking, junto con tu XP, tu robot y el módulo donde vas. Tu correo nunca aparece en el ranking.</li>
          <li>· Tu progreso: módulos, intentos, puntajes y fechas de repaso.</li>
        </ul>

        <h2 className="legal__title">Para qué los usamos</h2>
        <p>
          Solo para que puedas entrar, guardar tu avance y desbloquear módulos. No vendemos ni
          compartimos tus datos, no mostramos publicidad y no usamos rastreadores.
        </p>

        <h2 className="legal__title">Dónde se guardan</h2>
        <p>
          En Supabase (base de datos e inicio de sesión). Si entras con Google, solo recibimos tu
          correo, tu nombre y tu foto pública; nunca tu contraseña. Cada usuario solo puede leer su
          propio progreso.
        </p>

        <h2 className="legal__title">Borrar tu cuenta</h2>
        <p>
          Puedes pedir que borremos tu cuenta y todos tus datos abriendo un aviso en{' '}
          <a href={`${REPO}/issues`}>{REPO.replace('https://', '')}/issues</a>. Lo hacemos en un
          plazo máximo de 30 días.
        </p>
      </Panel>
    </main>
  );
}
