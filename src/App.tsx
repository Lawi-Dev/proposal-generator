import { useEffect, useMemo, useRef, useState } from "react";
import {
  jurisdictions,
  languages,
  availableServices,
  availableModalities,
  availableLangs,
  resolveTemplate,
  type Lang,
} from "./content";
import { Deck, type ClientInfo } from "./Deck";

function formatDate(iso: string): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return `${d}.${m}.${y}`;
}

export default function App() {
  const [jur, setJur] = useState("brasil");
  const [service, setService] = useState("soft-landing");
  const [modality, setModality] = useState("persona-fisica");
  const [lang, setLang] = useState<Lang>("es");
  const [name, setName] = useState("Javier Renna");
  const [company, setCompany] = useState("SUIG");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [logo, setLogo] = useState<string | undefined>(undefined);

  function onLogoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setLogo(reader.result as string);
    reader.readAsDataURL(file);
  }

  // Opções derivadas da disponibilidade real (chaves do proposals.json)
  const services = useMemo(() => availableServices(jur), [jur]);
  const modalities = useMemo(() => availableModalities(jur, service), [jur, service]);
  const langOptions = useMemo(() => {
    const avail = new Set(availableLangs(jur, service, modality));
    return languages.filter((l) => avail.has(l.id));
  }, [jur, service, modality]);

  // Mantém seleções válidas quando muda algo acima
  useEffect(() => {
    if (!services.find((s) => s.id === service)) setService(services[0]?.id ?? "");
  }, [services]); // eslint-disable-line
  useEffect(() => {
    if (!modalities.find((m) => m.id === modality)) setModality(modalities[0]?.id ?? "");
  }, [modalities]); // eslint-disable-line
  useEffect(() => {
    if (langOptions.length && !langOptions.find((l) => l.id === lang)) setLang(langOptions[0].id);
  }, [langOptions]); // eslint-disable-line

  const template = resolveTemplate(jur, service, modality, lang);
  const client: ClientInfo = { name, company: company.trim(), date: formatDate(date), logo };

  // Escala do preview para caber na coluna
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.6);
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const measure = () => {
      const w = el.clientWidth - 56;
      if (w > 100) setScale(Math.min(1, w / 1280));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => { ro.disconnect(); window.removeEventListener("resize", measure); };
  }, []);

  const showModality = modalities.length > 1 || (modalities[0]?.id !== "default");

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          lawi <span className="dot" /> <span style={{ color: "var(--gray)", fontWeight: 600 }}>Propostas</span>
        </div>

        <h2>Configuração</h2>

        <div className="field">
          <label>Jurisdição</label>
          <select value={jur} onChange={(e) => setJur(e.target.value)}>
            {jurisdictions.map((j) => <option key={j.id} value={j.id}>{j.label}</option>)}
          </select>
        </div>

        <div className="field">
          <label>Serviço</label>
          <select value={service} onChange={(e) => setService(e.target.value)}>
            {services.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
          </select>
        </div>

        {showModality && (
          <div className="field">
            <label>Modalidade</label>
            <select value={modality} onChange={(e) => setModality(e.target.value)}>
              {modalities.map((m) => <option key={m.id} value={m.id}>{m.label}</option>)}
            </select>
          </div>
        )}

        <div className="field">
          <label>Idioma</label>
          <select value={lang} onChange={(e) => setLang(e.target.value as Lang)}>
            {langOptions.map((l) => <option key={l.id} value={l.id}>{l.label}</option>)}
          </select>
        </div>

        <h2>Cliente</h2>
        <div className="field">
          <label>Nome do contato</label>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex: Javier Renna" />
        </div>
        <div className="field">
          <label>Empresa</label>
          <input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Ex: SUIG" />
        </div>
        <div className="field">
          <label>Data</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>

        <div className="field">
          <label>Logo do cliente <span style={{ color: "var(--gray)", fontWeight: 400 }}>(capa)</span></label>
          <div className="logo-frame">
            {logo ? (
              <img src={logo} alt="logo do cliente" />
            ) : (
              <span className="logo-frame-empty">Sem logo</span>
            )}
          </div>
          <div className="logo-actions">
            <label className="btn-file">
              {logo ? "Trocar logo" : "Enviar logo"}
              <input type="file" accept="image/*" onChange={onLogoChange} hidden />
            </label>
            {logo && (
              <button type="button" className="btn-clear" onClick={() => setLogo(undefined)}>
                Remover
              </button>
            )}
          </div>
        </div>
        <div className="field">
          <label>E-mail do cliente <span style={{ color: "var(--gray)", fontWeight: 400 }}>(envio — fase 2)</span></label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="cliente@empresa.com" />
        </div>

        <button className="btn" onClick={() => window.print()} disabled={!template} style={{ marginTop: 8 }}>
          Exportar PDF
        </button>
        <p className="hint">
          "Exportar PDF" abre a caixa de impressão — escolha <strong>Salvar como PDF</strong>.
          O resultado sai idêntico ao preview.
        </p>
      </aside>

      <main className="preview-wrap" ref={wrapRef}>
        {template ? (
          <div className="preview-scaler" style={{ zoom: String(scale) }}>
            <Deck t={template} client={client} lang={lang} />
          </div>
        ) : (
          <div className="warn" style={{ maxWidth: 640, margin: "40px auto" }}>
            <strong>Conteúdo ainda não cadastrado</strong> para esta combinação
            (<em>{jur} · {service} · {modality} · {lang}</em>).
            <br /><br />
            Já está pronto: <strong>Brasil · Soft Landing · Sócio Pessoa Física · Español</strong>.
            As demais combinações entram conforme cadastrarmos os textos.
          </div>
        )}
      </main>
    </div>
  );
}
