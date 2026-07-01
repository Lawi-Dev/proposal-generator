import type { GBlock, GSection, GenericProposal, Lang } from "./content";
import { i18n, offices, testimonials, SIGNATORY } from "./content";
import { CoverShapes, ClosingShapes, LawiLogo, LogoImg } from "./brand";
import { Flag } from "./flags";

export interface ClientInfo {
  name: string;
  company: string;
  date: string;
  logo?: string;
}

function Blocks({ blocks }: { blocks: GBlock[] }) {
  return (
    <>
      {blocks.map((b, i) =>
        b.t === "ul" ? (
          <ul key={i} className="s-ul">
            {b.items.map((it, j) => <li key={j}>{it}</li>)}
          </ul>
        ) : b.t === "h" ? (
          <p key={i} className="s-subtitle">{b.text}</p>
        ) : b.t === "h2" ? (
          <h2 key={i} className="s-title" style={{ marginTop: 28 }}>{b.text}</h2>
        ) : b.t === "options" ? (
          <div key={i}>
            {b.intro && <p className="s-p" style={{ marginBottom: 16 }}>{b.intro}</p>}
            <div className="opt-grid">
              {b.options.map((o, j) => (
                <div className="opt-card" key={j}>
                  <div className="opt-name">{o.name}</div>
                  <div className="opt-lines">
                    {o.lines.map((l, k) => (
                      <p key={k} className="opt-line"><strong>{l.label}:</strong> {l.text}</p>
                    ))}
                  </div>
                  <div className="opt-value">{o.value}</div>
                  {o.note && <div className="opt-note">{o.note}</div>}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p key={i} className={`s-p${b.strong ? " strong" : ""}`}>{b.text}</p>
        ),
      )}
    </>
  );
}

function Slide({ children, plain }: { children: React.ReactNode; plain?: boolean }) {
  return (
    <div className={`slide${plain ? " plain" : ""}`}>
      {!plain && <div className="bar-top" />}
      {children}
      {!plain && <div className="bar-bottom" />}
    </div>
  );
}

function splitPrice(value: string): { label: string; amount: string; note: string } {
  const idx = value.indexOf(":");
  let label = "";
  let amount = value;
  if (idx !== -1) {
    label = value.slice(0, idx).trim();
    amount = value.slice(idx + 1).trim();
  }
  // separa a observação entre parênteses (ex.: "(con todas las tasas incluidas)")
  let note = "";
  const m = amount.match(/^(.*?)\s*(\(.*\))[\s.]*$/);
  if (m) {
    amount = m[1].trim();
    note = m[2].trim();
  }
  return { label, amount, note };
}

export function Deck({ t, client, lang }: { t: GenericProposal; client: ClientInfo; lang: Lang }) {
  const tx = i18n[lang];
  const price = splitPrice(t.priceValue);
  const includesAsParagraph = t.priceIncludes.length === 1 && t.priceIncludes[0].length > 120;

  return (
    <div className="deck" id="deck">
      {/* 1. Capa */}
      <div className="slide cover">
        <CoverShapes />
        <div className="pad" style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div className="title">Lawi | {t.coverTitle}</div>
          {t.modality && <div className="modality">{t.modality}</div>}
          <div className="meta">
            Para: {client.name}{client.company ? ` (${client.company})` : ""}
            <br />
            {client.date} | {t.city}
          </div>
        </div>
        <div className="logos">
          {client.logo && (
            <>
              <img src={client.logo} alt="" className="client-logo" />
              <span className="logo-divider" />
            </>
          )}
          <LogoImg src="/logos/lawi.png" alt="Lawi" style={{ height: 96, width: 96, objectFit: "contain" }} fallback={<LawiLogo size={88} />} />
        </div>
      </div>

      {/* 2. Visão geral do serviço */}
      <Slide>
        <div className="pad">
          <div className="two-col">
            <div>
              <h2 className="s-title teal">{t.overviewHeading}</h2>
              {t.intro.map((p, i) => <p key={i} className="s-p">{p}</p>)}
              {t.introBullets.length > 0 && (
                <ul className="s-ul">{t.introBullets.map((b, i) => <li key={i}>{b}</li>)}</ul>
              )}
            </div>
            <LogoImg src="/images/overview.png" alt="" style={{ width: "100%", height: 360, objectFit: "cover", borderRadius: 12 }} fallback={<div className="photo-ph" />} />
          </div>
        </div>
      </Slide>

      {/* 3..n. Seções do corpo */}
      {t.sections.map((s: GSection, i) => (
        <Slide key={i}>
          <div className="pad">
            {s.image ? (
              <div className="two-col">
                <div>
                  {s.heading && <h2 className="s-title">{s.heading}</h2>}
                  <Blocks blocks={s.blocks} />
                </div>
                <LogoImg src={s.image} alt="" style={{ width: "100%", height: 360, objectFit: "cover", borderRadius: 12 }} fallback={<div className="photo-ph" />} />
              </div>
            ) : (
              <>
                {s.heading && <h2 className="s-title">{s.heading}</h2>}
                <Blocks blocks={s.blocks} />
              </>
            )}
          </div>
        </Slide>
      ))}

      {/* Preço (valor único) — só renderiza se houver valor/itens */}
      {(t.priceValue || t.priceIncludes.length > 0) && (
        <Slide>
          <div className="pad">
            <div className="two-col">
              <div className="price-panel">
                <h3>{t.priceTitle}</h3>
                {includesAsParagraph ? (
                  <p className="s-p" style={{ fontSize: 18 }}>{t.priceIncludes[0]}</p>
                ) : (
                  <ul className="s-ul">{t.priceIncludes.map((p, i) => <li key={i}>{p}</li>)}</ul>
                )}
                {price.label && <div className="price-label">{price.label}</div>}
                <div className="price-value">{price.amount}</div>
                {price.note && <div className="price-note">{price.note}</div>}
              </div>
              <LogoImg src={t.priceImage ?? "/images/price.png"} alt="" style={{ width: "100%", height: 480, objectFit: "cover", borderRadius: 16 }} fallback={<div className="photo-ph" style={{ height: 460 }} />} />
            </div>
          </div>
        </Slide>
      )}

      {/* Condições gerais */}
      <Slide>
        <div className="pad">
          <h2 className="s-title teal" style={{ textAlign: "center" }}>{tx.conditions}</h2>
          <ul className="s-ul" style={{ marginTop: 16 }}>
            {t.conditions.map((b, i) => <li key={i}>{b}</li>)}
          </ul>
        </div>
      </Slide>

      {/* Depoimentos */}
      <Slide>
        <div className="pad">
          <h2 className="center-title">{tx.teams}</h2>
          <div className="t-grid">
            {testimonials.map((c, i) => (
              <div className="t-card" key={i}>
                <div className="t-brand">
                  <LogoImg src={`/logos/${c.id}.png`} alt={c.brand} style={{ height: 72, maxWidth: 260, objectFit: "contain" }} fallback={<span>{c.brand}</span>} />
                </div>
                <div className="t-quote">"{c.quote}"</div>
                <div className="t-name">{c.name}</div>
                <div className="t-role">{c.role}</div>
              </div>
            ))}
          </div>
        </div>
      </Slide>

      {/* Escritórios */}
      <Slide>
        <div className="pad">
          <h2 className="center-title">{tx.offices}</h2>
          <div className="o-grid">
            {offices.map((o, i) => (
              <div className="o-item" key={i}>
                <div className="flag"><Flag id={o.flag} /></div>
                <div>
                  <div className="o-lines">{o.lines.map((l, j) => <div key={j}>{l}</div>)}</div>
                  <div className="o-name">{o.name}</div>
                  <div className="o-team">{o.team}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Slide>

      {/* Fechamento */}
      <div className="slide closing">
        <ClosingShapes />
        <div className="pad" style={{ display: "flex", alignItems: "center" }}>
          <div className="c-text">
            {tx.closing1}
            <span className="light">{tx.closing2}</span>
          </div>
        </div>
        <div className="c-sign">{SIGNATORY.toUpperCase()}</div>
      </div>
    </div>
  );
}
