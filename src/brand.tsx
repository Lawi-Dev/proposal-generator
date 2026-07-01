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
      {/* Versão simplificada: um círculo no canto superior direito,
          um meio-triângulo no canto inferior esquerdo. Sem sobreposições. */}
      <circle cx="1280" cy="90" r="160" fill="#2fb9af" />
      <path d="M0 720 L0 480 L240 720 Z" fill="#0c3a4d" />
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
      {/* Mesma versão simplificada da capa: círculo em cima, meio-triângulo embaixo. */}
      <circle cx="1280" cy="90" r="160" fill="#2fb9af" />
      <path d="M0 720 L0 480 L240 720 Z" fill="#ffffff" opacity="0.95" />
    </svg>
  );
}
