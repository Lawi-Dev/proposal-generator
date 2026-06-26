// Elementos visuais de marca da Lawi, em SVG (exportam fiel no PDF).
import { useState } from "react";

/**
 * Imagem (PNG) com fallback: tenta carregar `src`; se o arquivo não existir
 * (ainda não foi adicionado em public/logos), renderiza o `fallback`.
 */
export function LogoImg({
  src,
  alt,
  style,
  fallback,
}: {
  src: string;
  alt: string;
  style?: React.CSSProperties;
  fallback: React.ReactNode;
}) {
  const [err, setErr] = useState(false);
  if (err) return <>{fallback}</>;
  return <img src={src} alt={alt} style={style} onError={() => setErr(true)} />;
}

export function LawiLogo({ color = "#0c3a4d", size = 64 }: { color?: string; size?: number }) {
  // Marca "lawi" dentro de um círculo (aproximação do logo).
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-label="Lawi">
      <circle cx="50" cy="50" r="50" fill={color} />
      <text
        x="50"
        y="62"
        textAnchor="middle"
        fontFamily="Poppins, sans-serif"
        fontWeight="800"
        fontSize="34"
        fill="#fff"
        letterSpacing="-1"
      >
        lawi
      </text>
    </svg>
  );
}

export function LawiWordmark({ color = "#0c3a4d" }: { color?: string }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
      <span style={{ fontWeight: 800, fontSize: 30, color, letterSpacing: "-1px" }}>lawi</span>
      <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--teal)" }} />
    </span>
  );
}

/** Formas diagonais da capa (canto superior direito + inferior esquerdo). */
export function CoverShapes() {
  return (
    <svg
      width="1280"
      height="720"
      viewBox="0 0 1280 720"
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      aria-hidden="true"
    >
      {/* canto superior direito */}
      <path d="M880 0 L1280 0 L1280 250 Z" fill="#0c3a4d" />
      <path d="M980 0 L1280 0 L1280 150 Z" fill="#2fb9af" />
      <circle cx="1240" cy="210" r="90" fill="#0c3a4d" />
      {/* canto inferior esquerdo */}
      <path d="M0 470 L0 720 L250 720 Z" fill="#0c3a4d" />
      <circle cx="40" cy="700" r="120" fill="#2fb9af" opacity="0.9" />
    </svg>
  );
}

/** Formas do slide de fechamento (fundo navy). */
export function ClosingShapes() {
  return (
    <svg
      width="1280"
      height="720"
      viewBox="0 0 1280 720"
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      aria-hidden="true"
    >
      <path d="M900 0 L1280 0 L1280 230 Z" fill="#2fb9af" />
      <circle cx="1230" cy="120" r="80" fill="#ffffff" />
      <path d="M0 480 L0 720 L240 720 Z" fill="#ffffff" opacity="0.95" />
      <circle cx="60" cy="690" r="120" fill="#2fb9af" />
    </svg>
  );
}
