// Emblema de pylab: hexágono HUD con el prompt ">" y el cursor "_" de la terminal.
// Se dibuja en línea (no es una imagen) para heredar el brillo del tema.
export function LogoMark({ size = 30 }: { size?: number }) {
  return (
    <svg className="logo-mark" width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <linearGradient id="logo-edge" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7ce9ff" />
          <stop offset="1" stopColor="#3ef0a0" />
        </linearGradient>
      </defs>
      <polygon points="32,4 56,18 56,46 32,60 8,46 8,18" fill="rgba(25,211,255,0.08)"
        stroke="url(#logo-edge)" strokeWidth="3" strokeLinejoin="round" />
      <polygon points="32,12 49,22 49,42 32,52 15,42 15,22" fill="none"
        stroke="rgba(25,211,255,0.35)" strokeWidth="1" strokeDasharray="3 4" />
      <path d="M21 23 L32 32 L21 41" fill="none" stroke="#19d3ff" strokeWidth="5"
        strokeLinecap="round" strokeLinejoin="round" />
      <rect className="logo-mark__cursor" x="35" y="38" width="10" height="4.5" rx="1.5" fill="#3ef0a0" />
    </svg>
  );
}

export function Logo() {
  return (
    <span className="logo">
      <LogoMark />
      <span>py<span className="logo__lab">lab</span></span>
    </span>
  );
}
