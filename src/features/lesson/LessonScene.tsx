import { useEffect, useRef, useState } from 'react';
import { Robot } from '@/ui/primitives/Robot';
import { PixelSprite } from '@/ui/primitives/PixelSprite';
import { MINI_BOSSES } from '@/features/game/minibosses';
import { islandOf } from '@/features/game/islands';
import { useLeaderboard } from '@/features/game/useGame';

/** Tu robot (con su ropa y mascota) frente al jefe del módulo; al final de la lección festeja. */
export function LessonScene({ moduleId, end = false }: { moduleId: string; end?: boolean }) {
  const { me } = useLeaderboard();
  const index = Number(moduleId.slice(1));
  const mini = MINI_BOSSES[index];
  const island = islandOf(index);
  // El jefe de isla es el examen del último módulo de la isla: solo aparece en ese módulo.
  const bosses = [mini, ...(island.last === index ? [island.boss] : [])].filter(Boolean);
  const ref = useRef<HTMLDivElement>(null);
  const [cheer, setCheer] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!end || !el) return;
    // Llegar al final de la lección es terminarla: el robot lo celebra.
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setCheer(true), { threshold: 0.6 });
    io.observe(el);
    return () => io.disconnect();
  }, [end]);

  return (
    <div ref={ref} className={`scene ${end ? 'scene--end' : ''} ${cheer ? 'scene--cheer' : ''}`}>
      <div className="scene__me">
        {cheer && <span className="scene__bubble" role="status">¡Ohhh sí!</span>}
        <Robot color={me?.color ?? '#19d3ff'} gear={me?.gear} size={end ? 64 : 48} title="Tu robot" className="scene__robot" />
      </div>
      <p className="scene__text small muted">
        {end
          ? cheer ? 'lección terminada' : 'llega al final para terminar la lección'
          : <>jefe del módulo: <span className="warn">{bosses.map((b) => b.name).join(' y ')}</span></>}
      </p>
      <div className="scene__bosses">
        {bosses.map((b) => <PixelSprite key={b.name} name={b.sprite} size={end ? 52 : 40} title={b.name} className="scene__boss" />)}
      </div>
    </div>
  );
}
