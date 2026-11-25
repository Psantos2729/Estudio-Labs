import type { Island } from '@/features/game/islands';

const LOOK: Record<string, { top: string; rock: string }> = {
  bosque: { top: '#4bbf63', rock: '#7a5a46' },
  puerto: { top: '#e8c98a', rock: '#6d5a4c' },
  fortaleza: { top: '#5aa34a', rock: '#6e6258' },
  cielo: { top: '#9aa8e8', rock: '#4c4a66' },
};

/** Isla flotante con la decoración de su ambiente, centrada en (cx, cy) y de ancho w. */
export function IslandArt({ island, cx, cy, w }: { island: Island; cx: number; cy: number; w: number }) {
  const { top, rock } = LOOK[island.mood];
  const n = 9;
  let drip = `M${cx - w / 2} ${cy}`;
  for (let i = 1; i <= n; i++) {
    const x = cx - w / 2 + (w * i) / (n + 1);
    const d = (i % 2 ? 0.5 : 0.8) * w * (0.5 - Math.abs(i / (n + 1) - 0.5));
    drip += ` L${x - w / (n + 1) / 2} ${cy + d * 0.55} L${x} ${cy + d}`;
  }
  drip += ` L${cx + w / 2} ${cy} Z`;
  return (
    <g aria-hidden="true">
      <path d={drip} fill={rock} />
      <path d={drip} fill="url(#island-shade)" />
      <ellipse cx={cx} cy={cy} rx={w / 2} ry={w * 0.08} fill={top} />
      <ellipse cx={cx} cy={cy - 2} rx={w / 2 - 6} ry={w * 0.08 - 3} fill="#fff" opacity="0.08" />
      <Deco mood={island.mood} cx={cx} cy={cy} w={w} />
    </g>
  );
}

function Deco({ mood, cx, cy, w }: { mood: string; cx: number; cy: number; w: number }) {
  if (mood === 'bosque') return (
    <>
      {[[-0.32, 26], [-0.18, 34], [0.3, 30], [0.4, 22]].map(([f, s]) => (
        <g key={f}><circle cx={cx + f * w} cy={cy - s * 0.6} r={s * 0.5} fill="#2f8f45" /><circle cx={cx + f * w - 4} cy={cy - s * 0.7} r={s * 0.3} fill="#5bd46a" opacity="0.7" /></g>
      ))}
      <rect x={cx - 14} y={cy - 30} width="28" height="24" fill="#8d948a" />
      <path d={`M${cx - 18} ${cy - 30} L${cx} ${cy - 44} L${cx + 18} ${cy - 30}Z`} fill="#6f766c" />
      <rect x={cx - 5} y={cy - 20} width="10" height="14" fill="#14161f" />
    </>
  );
  if (mood === 'puerto') return (
    <>
      <ellipse cx={cx} cy={cy - 2} rx={w * 0.3} ry="5" fill="#3a6fd8" opacity="0.75" />
      <path d={`M${cx - w * 0.3} ${cy - 2} q6 -38 18 -46`} stroke="#8a5a3a" strokeWidth="3" fill="none" />
      <path d={`M${cx - w * 0.3 + 18} ${cy - 48} q-16 2 -26 12 M${cx - w * 0.3 + 18} ${cy - 48} q14 6 20 18`} stroke="#2f8f45" strokeWidth="5" fill="none" strokeLinecap="round" />
      {[0, 1, 2].map((i) => (
        <g key={i}><path d={`M${cx + 6 + i * 20} ${cy - 8} h14 l-3 5 h-8z`} fill="#e2453b" /><path d={`M${cx + 13 + i * 20} ${cy - 8} v-12 l7 9z`} fill="#f4f6ff" /></g>
      ))}
    </>
  );
  if (mood === 'fortaleza') return (
    <>
      <path d={`M${cx - w * 0.35} ${cy} L${cx - w * 0.05} ${cy - 70} L${cx + w * 0.25} ${cy}Z`} fill="#7d8aa8" />
      <path d={`M${cx - w * 0.12} ${cy - 52} L${cx - w * 0.05} ${cy - 70} L${cx + w * 0.03} ${cy - 54} l-6 4 -5 -5 -6 5z`} fill="#f4f6ff" />
      {[[-0.02, 30, 12], [0.1, 40, 14], [0.22, 26, 11]].map(([f, h, tw]) => (
        <g key={f}>
          <rect x={cx + f * w} y={cy - h} width={tw} height={h} fill="#d8b87a" />
          <path d={`M${cx + f * w - 2} ${cy - h} L${cx + f * w + tw / 2} ${cy - h - 12} L${cx + f * w + tw + 2} ${cy - h}Z`} fill="#b5532f" />
        </g>
      ))}
    </>
  );
  return (
    <>
      {[[-0.28, 10], [0.05, 20], [0.3, 6]].map(([f, d]) => (
        <g key={f} fill="#e8f2ff" opacity="0.85">
          <circle cx={cx + f * w} cy={cy - d - 10} r="11" /><circle cx={cx + f * w + 12} cy={cy - d - 14} r="14" /><circle cx={cx + f * w + 26} cy={cy - d - 9} r="10" />
        </g>
      ))}
      <path d={`M${cx + 0.12 * w} ${cy - 62} l-10 22 h9 l-6 18 18 -26 h-9 l6 -14z`} fill="#ffe14a" />
    </>
  );
}
