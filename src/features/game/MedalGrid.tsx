import { Robot } from '@/ui/primitives/Robot';
import { PIECES, howOf, type Piece } from './cosmetics';

/** Grupos de la vitrina, por regla de content/cosmeticos.json. */
const GROUPS: { title: string; rules: string[] }[] = [
  { title: 'Jefes y módulos', rules: ['jefe', 'modulos', 'islas'] },
  { title: 'Constancia', rules: ['racha', 'lecciones', 'curso', 'noche', 'seguidas'] },
  { title: 'Práctica', rules: ['ejercicios', 'retos', 'repasos'] },
  { title: 'Exámenes', rules: ['perfectos', 'rapidos', 'reintentos', 'fallos'] },
  { title: 'Nivel y ranking', rules: ['nivel', 'xp', 'primero'] },
];

const groupOf = (p: Piece) => GROUPS.findIndex((g) => g.rules.includes(p.unlock[0]));

/** Medallas: cada pieza del taller es un logro. Las que faltan dicen cómo se ganan. */
export function MedalGrid({ unlocked, mine = true }: { unlocked: string[]; mine?: boolean }) {
  const owned = new Set(unlocked);
  return (
    <>
      {GROUPS.map((g, i) => {
        const pieces = PIECES.filter((p) => groupOf(p) === i || (i === GROUPS.length - 1 && groupOf(p) === -1));
        const got = pieces.filter((p) => owned.has(p.id)).length;
        return (
          <section key={g.title} className="panel" aria-label={g.title}>
            <p className="small accent">{g.title} <span className="muted">· {got} de {pieces.length}</span></p>
            <ul className="medals">
              {pieces.map((p) => {
                const has = owned.has(p.id);
                return (
                  <li key={p.id} className={`medal${has ? ' medal--got' : ''}`}>
                    <span className="medal__disc"><Robot color={has ? '#3d4a66' : '#2a3044'} gear={{ [p.slot]: p.id }} size={44} /></span>
                    <span className="strong small">{p.name}</span>
                    <span className="muted small">{howOf(p.unlock)}</span>
                    <span className={`small ${has ? 'ok' : 'muted'}`}>{has ? '✓ ganada' : mine ? '🔒 te falta' : '🔒'}</span>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
    </>
  );
}
