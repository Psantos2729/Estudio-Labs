import { useEffect, useRef, useState } from 'react';
import { DOCK, ROUTE, ROUTE_LEN, pointAt } from './seaChart';

const SEEN = 'mapa-barco';
const ease = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2;

function readSeen(): number | null {
  try { const v = localStorage.getItem(SEEN); return v === null ? null : Number(v); } catch { return null; }
}

/**
 * Barco del alumno: atracado en el muelle del módulo `at`. Si la última vez que abrió el mapa estaba más atrás,
 * navega isla por isla hasta aquí y la cámara lo sigue.
 * shortcut: lo visto se guarda por navegador, no por cuenta; pasarlo a la cuenta si alguien usa varios.
 */
export function useSail(at: number) {
  const viewRef = useRef<HTMLDivElement>(null);
  const [boat, setBoat] = useState({ x: ROUTE[DOCK[at]][0], y: ROUTE[DOCK[at]][1], a: 0, moving: false });

  useEffect(() => {
    const L = ROUTE_LEN;
    const put = (l: number, moving: boolean) => {
      const [x, y] = pointAt(l), [rx, ry] = pointAt(l + 3);
      const a = Math.max(-12, Math.min(12, (Math.atan2(ry - y, rx - x) * 180) / Math.PI * 0.4));
      setBoat({ x, y, a: moving ? a : 0, moving });
      const view = viewRef.current;
      if (view) view.scrollLeft = x - view.clientWidth * 0.3;
    };
    const seen = readSeen();
    const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const from = seen !== null && seen >= 0 && seen < at && !still ? seen : at;
    // Se guarda al terminar de navegar: si sale a mitad del viaje, la próxima vez lo vuelve a ver.
    const save = () => { try { localStorage.setItem(SEEN, String(at)); } catch { /* sin almacenamiento: no se anima */ } };
    put(L[DOCK[from]], false);
    if (from === at) return save();

    // Un tramo por isla: rodea la isla, atraca en la siguiente y ahí frena.
    const stops = DOCK.slice(from + 1, at + 1).map((k) => L[k]);
    let raf = 0, leg = 0, start = L[DOCK[from]], t0 = performance.now();
    const step = (now: number) => {
      const end = stops[leg], dur = Math.max(2400, Math.min(4200, (end - start) * 6));
      const t = Math.min(1, (now - t0) / dur);
      put(start + (end - start) * ease(t), true);
      if (t === 1) {
        if (++leg === stops.length) { put(end, false); return save(); }
        start = end; t0 = now;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [at]);

  return { boat, viewRef };
}
