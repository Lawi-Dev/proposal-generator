// Bandeiras em SVG (renderizam de forma confiável no PDF, ao contrário dos emojis).
// Fixas — usadas no slide de escritórios.

const W = 46;
const H = 32;

export function Flag({ id }: { id: string }) {
  switch (id) {
    case "ar":
      return (
        <svg width={W} height={H} viewBox="0 0 46 32" style={{ borderRadius: 4 }}>
          <rect width="46" height="32" fill="#fff" />
          <rect width="46" height="10.7" fill="#74acdf" />
          <rect y="21.3" width="46" height="10.7" fill="#74acdf" />
          <circle cx="23" cy="16" r="3.2" fill="#f6b40e" stroke="#85340a" strokeWidth="0.5" />
        </svg>
      );
    case "br":
      return (
        <svg width={W} height={H} viewBox="0 0 46 32" style={{ borderRadius: 4 }}>
          <rect width="46" height="32" fill="#009b3a" />
          <polygon points="23,4 43,16 23,28 3,16" fill="#fedf00" />
          <circle cx="23" cy="16" r="6.5" fill="#002776" />
        </svg>
      );
    case "us":
      return (
        <svg width={W} height={H} viewBox="0 0 46 32" style={{ borderRadius: 4 }}>
          <rect width="46" height="32" fill="#fff" />
          {[0, 2, 4, 6, 8, 10, 12].map((i) => (
            <rect key={i} y={(i * 32) / 13} width="46" height={32 / 13} fill="#b22234" />
          ))}
          <rect width="20" height={(32 / 13) * 7} fill="#3c3b6e" />
        </svg>
      );
    case "es":
      return (
        <svg width={W} height={H} viewBox="0 0 46 32" style={{ borderRadius: 4 }}>
          <rect width="46" height="32" fill="#c60b1e" />
          <rect y="8" width="46" height="16" fill="#ffc400" />
        </svg>
      );
    default:
      return <span style={{ fontSize: 32 }}>🏳️</span>;
  }
}
