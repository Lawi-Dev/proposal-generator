// ============================================================================
// Modelo de conteúdo (genérico) do gerador de propostas Lawi
// ----------------------------------------------------------------------------
// As propostas têm estrutura comum mas seções variáveis. Cada proposta é um
// "documento" com: capa, visão geral, N seções de corpo, preço e condições.
// Os dados vêm de proposals.json (gerado a partir do Word consolidado).
// Depoimentos / escritórios / fechamento são fixos (abaixo).
// ============================================================================
import proposalsData from "./proposals.json";

export type Lang = "es" | "pt" | "en";

export type GBlock =
  | { t: "p"; text: string; strong?: boolean }
  | { t: "h"; text: string }
  | { t: "ul"; items: string[] };

export interface GSection {
  heading: string;
  blocks: GBlock[];
}

export interface GenericProposal {
  coverTitle: string;
  modality: string;
  city: string;
  overviewHeading: string;
  intro: string[];
  introBullets: string[];
  sections: GSection[];
  priceTitle: string;
  priceIncludes: string[];
  priceValue: string;
  conditions: string[];
}

// ---------------------------------------------------------------------------
// Brasil · Soft Landing · Sócio Pessoa Física · ES (não está no Word — vem do
// template original em PDF; mantido aqui como entrada extra)
// ---------------------------------------------------------------------------
const brasilPFes: GenericProposal = {
  coverTitle: "Soft landing en Brasil",
  modality: "Socio Persona Física",
  city: "São Paulo, Brasil",
  overviewHeading: "Soft landing en Brasil",
  intro: [
    "Acompañamos a los emprendedores y a las empresas a iniciar o expandir sus operaciones en el Brasil.",
    "En especial, colaboramos con:",
  ],
  introBullets: [
    "Incorporación societaria de socios extranjeros",
    "Inscripciones tributarias",
    "Asesoramiento migratorio de directivos extranjeros",
    "Redacción de contrato social y acuerdos de socios",
    "Declaración de Inversiones Extranjeras (Bacen)",
    "Representación legal",
    "Domicilio social/fiscal y book-keeping",
    "Relatorios sobre asuntos regulatorios",
    "Obtención de licencias regulatorias",
  ],
  sections: [
    {
      heading: "Objetivo",
      blocks: [
        { t: "p", text: "Nuestros servicios abarcarán la inscripción de una sociedad y sus socios en la República Federativa del Brasil (la “Sociedad Brasilera”) y la obtención de su CNPJ (identificación fiscal) ante la Receita Federal." },
        { t: "p", text: "Como aclaración preliminar, se hace saber al Cliente que la sociedad local podría estar organizada como una sociedad de responsabilidad limitada (Sociedade Limitada - LTDA) o como una corporación (Sociedade por Ações - S.A.), que son los dos tipos societarios más utilizados en Brasil. A los efectos de esta propuesta, asumimos que la empresa se organizará como una sociedad limitada, que tiende a ser el tipo de empresa más simple de operar, y que debido a los cambios recientes en la legislación brasilera, se puede incorporar con un sólo socio." },
        { t: "p", text: "Sin embargo, debe tenerse en cuenta que en determinadas situaciones puede ser más conveniente u obligatorio organizar la empresa como una sociedad por acciones, especialmente si la empresa planea emitir títulos de deuda en un futuro próximo, o en el caso de estructuras de capital más complejas que involucren a diferentes grupos de accionistas. Sin perjuicio de ello, podrá modificarse la estructura social, de Limitada a Anónima, cuando así sea necesario." },
      ],
    },
    {
      heading: "Soft Landing en Brasil con socios Personas Físicas",
      blocks: [
        { t: "h", text: "1. Obtención de CPF para socios extranjeros" },
        { t: "p", text: "Si el/los socio/s de la sociedad son personas físicas extranjeras, deberán tramitar su inscripción ante el Registro de Personas Físicas (“CPF”) ante la Receita Federal do Brasil (organismo público - fisco brasileño)." },
        { t: "p", text: "A estos efectos, el cliente deberá proporcionarnos:" },
        { t: "ul", items: [
          "Una fotografía de su pasaporte",
          "Una copia digitalizada de su certificado de nacimiento (no necesita apostilla)",
          "Un poder simple de actuación frente a la Receita Federal do Brasil",
          "Una fotografía de su rostro (en modo “selfie”) sosteniendo su pasaporte",
          "Una declaración jurada de su residencia fiscal",
        ] },
      ],
    },
    {
      heading: "2. Inscripción de sociedad local brasileña",
      blocks: [
        { t: "p", text: "Se requiere la confección y firma del estatuto de la Sociedad Brasilera para su constitución y registro ante el Registro Mercantil correspondiente (Junta Comercial) y otras autoridades competentes en Brasil. Al redactar los estatutos de la Sociedad Brasilera, se deberá proporcionar la siguiente información:" },
        { t: "p", text: "(i) la razón social de la Compañía, que debe incluir su objeto social principal;" },
        { t: "p", text: "(ii) la identificación del (los) accionista(s) de la Compañía, que puede ser una (1) o más personas brasileñas o extranjeras;" },
        { t: "p", strong: true, text: "(iii) la dirección de la sede de la Sociedad Brasilera en el Brasil. En caso de que la compañía no cuente con una dirección comercial para ubicar su sede, podemos proporcionarles el servicio de domicilio virtual en las ciudades de São Paulo y Rio de Janeiro (tarifa anual: USD 200,00). Esta opción solo está disponible para actividades relacionadas con la prestación de servicios;" },
      ],
    },
    {
      heading: "2. Inscripción de sociedad local brasileña (cont.)",
      blocks: [
        { t: "p", text: "(iv) el objeto social de la compañía;" },
        { t: "p", strong: true, text: "(v) los datos del administrador de la compañía. En caso de que el director sea no residente en el Brasil, deberá designar un representante apoderado con residencia en el país. Podemos proporcionar ese servicio por un valor de USD 300,00 mensuales." },
        { t: "p", strong: true, text: "También podemos asistirlos en la obtención de una residencia temporaria (Visa de Mercosur), por un valor de USD 500,00, por visa. Requiere de un viaje a Brasil (Rio de Janeiro) para asistir a la Policía Federal para la obtención del documento." },
        { t: "p", text: "A estos efectos, el cliente deberá obtener previamente:" },
        { t: "ul", items: [
          "Un certificado de nacimiento, apostillado",
          "Un certificado de antecedentes penales, apostillado",
        ] },
      ],
    },
  ],
  priceTitle: "Soft Landing en Brasil",
  priceIncludes: [
    "Obtención de CPF de socios (personas físicas)",
    "Redacción de Contrato Social de sociedad brasileña",
    "Inscripción de sociedad brasileña en la Junta Comercial",
    "Obtención de CNPJ de sociedad brasileña",
  ],
  priceValue: "Valor único: US$ 1.200,00",
  conditions: [
    "Los valores indicados en la presente propuesta están expresados en dólares estadounidenses y serán tributados al tipo de cambio oficial informado por el BACEN en la República Federativa del Brasil.",
    "Los gastos necesarios para la ejecución de los trabajos, tales como: copias, transportes, impuestos, traducciones, legalizaciones, apostillas, etc., no están incluidos en el valor de los honorarios propuestos, debiendo ser reembolsados o rendidos mediante presentación de Rendición de Gastos. Esta propuesta sí incluye el valor de tasas a ser abonadas a la Junta Comercial de São Paulo (JUCESP).",
    "Los honorarios serán cobrados: (a) un 50% del total al momento de comenzar los trabajos; y (b) un 50% al concluir con todos los trabajos indicados en el punto 2°, que sean de responsabilidad de nuestro estudio. En caso de ser servicios recurrentes (representación legal) serán cobrados a cada mes entrante, entre los días 1 y 5 de cada mes.",
    "La presente propuesta tiene un plazo de vigencia de treinta (30) días.",
  ],
};

// Todas as propostas: JSON gerado + extras
const all: Record<string, GenericProposal> = {
  ...(proposalsData as unknown as Record<string, GenericProposal>),
  "brasil|soft-landing|persona-fisica|es": brasilPFes,
};

// ---------------------------------------------------------------------------
// Rótulos do formulário
// ---------------------------------------------------------------------------
// NOTA: por ora só Brasil está habilitado (validação interna). As demais
// jurisdições estão prontas no proposals.json — basta reativar as linhas abaixo.
export const jurisdictions = [
  { id: "brasil", label: "Brasil" },
  // { id: "argentina", label: "Argentina" },
  // { id: "usa", label: "Estados Unidos" },
  // { id: "espana", label: "España" },
] as const;

export const languages: { id: Lang; label: string }[] = [
  { id: "es", label: "Español" },
  { id: "pt", label: "Português" },
  { id: "en", label: "English" },
];

const serviceLabels: Record<string, string> = {
  "soft-landing": "Soft Landing",
  sas: "Incorporación S.A.S.",
  llc: "LLC — Delaware",
};
const modalityLabels: Record<string, string> = {
  default: "Padrão",
  "persona-fisica": "Sócio Pessoa Física",
  "persona-juridica": "Sócio Pessoa Jurídica",
};

// ---------------------------------------------------------------------------
// Ajuste fino do PJ-es: paginação da seção 2.1 — título na pág.6, continuação
// SEM título na pág.7 (conforme revisão do cliente contra o template).
// ---------------------------------------------------------------------------
const pjEs = all["brasil|soft-landing|persona-juridica|es"];
if (pjEs) {
  pjEs.sections = [
    pjEs.sections[0], // Objetivo
    pjEs.sections[1], // Soft Landing ... 1. Obtención de CNPJ
    pjEs.sections[2], // 2. Inscripción de sociedad local brasileña
    {
      heading: "2.1. Servicio de Representación Legal (opcional)",
      blocks: [
        { t: "p", text: "En caso de contar con accionista extranjero no residente en el país, deberá designarse al menos una persona física residente en Brasil como su apoderado / representante legal. Además, deberá designarse un administrador de la sociedad brasileña, que puede ser una persona no residente, pero también otorgando poderes a un apoderado local." },
        { t: "p", text: "Si la Compañía no cuenta con una persona física residente en Brasil para ocupar estos cargos, podremos brindarles el servicio de representación legal. Las tarifas son mensuales y varían según el cargo a ser ocupado (la opción b excluye a la c, y viceversa):" },
        { t: "ul", items: [
          "(a) Representante de socia extranjera (holding): USD 250,00 -mensual-",
          "(b) Administrador de sociedad brasileña: USD 500,00 -mensual-",
          "(c) Apoderado de administrador extranjero de sociedad brasileña: USD 300 -mensual-",
        ] },
        { t: "p", strong: true, text: "Los valores correspondientes a los servicios (b) y (c) puede reducirse al 50% mientras la sociedad no tenga operaciones ni empleados. Estos valores puede variar en caso de que la actividad del objeto social sea de las consideradas altamente reguladas o incluya actividades consideradas de mayor riesgo." },
      ],
    },
    {
      heading: "", // pág.7 — continuação sem título
      blocks: [
        { t: "p", text: "Para llevar adelante los servicios de representación legal, serán necesarias dos condiciones:" },
        { t: "ul", items: [
          "(a) que la contabilidad sea llevada por una empresa colaboradora de nuestro estudio -contamos con aliados que ofrecen el servicio para startups y empresas de tecnología-;",
          "(b) que sea firmada una carta de indemnidad hacia el representante por parte del Cliente y/o de las personas físicas beneficiarias finales. Para mayor información, podremos enviarles una propuesta específica en relación a este servicio de representación.-",
        ] },
        { t: "p", text: "El servicio de representación incluye la gestión de apertura de cuenta bancaria y el servicio de book-keeping." },
        { t: "p", strong: true, text: "También podemos asistirlos en la obtención de una residencia temporaria (Visa de Mercosur), o residencia permanente (Acuerdo Brasil - Argentina), por un valor de USD 500,00, por visa. Requiere de un viaje a Brasil para asistir a la Policía Federal para la obtención del documento." },
      ],
    },
  ];
}

// ---------------------------------------------------------------------------
// Disponibilidade derivada das chaves "jur|svc|mod|lang"
// ---------------------------------------------------------------------------
const keys = Object.keys(all);

export function availableServices(jur: string) {
  const ids = [...new Set(keys.filter((k) => k.startsWith(jur + "|")).map((k) => k.split("|")[1]))];
  return ids.map((id) => ({ id, label: serviceLabels[id] ?? id }));
}
export function availableModalities(jur: string, svc: string) {
  const ids = [...new Set(keys.filter((k) => k.startsWith(`${jur}|${svc}|`)).map((k) => k.split("|")[2]))];
  return ids.map((id) => ({ id, label: modalityLabels[id] ?? id }));
}
export function availableLangs(jur: string, svc: string, mod: string): Lang[] {
  return keys.filter((k) => k.startsWith(`${jur}|${svc}|${mod}|`)).map((k) => k.split("|")[3] as Lang);
}

export function resolveTemplate(jur: string, svc: string, mod: string, lang: Lang): GenericProposal | undefined {
  return all[`${jur}|${svc}|${mod}|${lang}`];
}

// ---------------------------------------------------------------------------
// Conteúdo institucional fixo
// ---------------------------------------------------------------------------
export const testimonials = [
  { id: "cabify", brand: "Cabify", quote: "En Lawi encontramos un aliado capaz de adaptarse a nuestras necesidades legales, a través de la implementación de un sistema de trabajo en conjunto.", name: "Joaquín Odriozola", role: "Legal Head" },
  { id: "rappi", brand: "Rappi", quote: "Encontramos en Lawi un gran aliado que nos acompaña en los variados y volátiles desafíos, propios de las start ups de tecnología latinoamericanas.", name: "Estefania Devoto", role: "Legal & Global Compliance Manager" },
  { id: "nulinga", brand: "Nulinga", quote: "El equipo de Lawi fue realmente ágil y atento. Recomiendo Lawi a todas las startups que quieran expandir sus negocios a Brasil.", name: "Martín Perri", role: "Co-Founder & CEO" },
];

export const offices = [
  { country: "Argentina", flag: "ar", lines: ["Buenos Aires | Pte. Perón 315, 6° \"21\"", "benjamin@lawi.io"], name: "Benjamín Muñoz", team: "Lawi Argentina" },
  { country: "USA", flag: "us", lines: ["New York | 106 W 32nd St.", "lucia@lawi.io"], name: "Lucía Guardone", team: "Lawi USA" },
  { country: "Brasil", flag: "br", lines: ["São Paulo | Avenida Cidade Jardim, 377", "Rio de Janeiro | Rua Santa Cristina, 15", "gabriella@lawi.io"], name: "Gabriella Consoli", team: "Lawi Brasil" },
  { country: "España", flag: "es", lines: ["Madrid | Calle de Hermosilla 48", "eugenia@lawi.io"], name: "Eugenia Tripodi", team: "Lawi EMEA" },
];

export const SIGNATORY = "Benjamín Muñoz";

export const i18n: Record<Lang, { closing1: string; closing2: string; teams: string; offices: string; conditions: string }> = {
  es: { closing1: "Esperando poder acompañarlos en su proyecto, quedamos a total disposición.", closing2: "Muchas gracias desde ya por la confianza.", teams: "Equipos que ya acompañamos", offices: "Dónde encontrarnos", conditions: "Condiciones Generales" },
  pt: { closing1: "Na expectativa de poder acompanhá-los em seu projeto, ficamos à total disposição.", closing2: "Desde já, muito obrigado pela confiança.", teams: "Times que já acompanhamos", offices: "Onde nos encontrar", conditions: "Condições Gerais" },
  en: { closing1: "Looking forward to supporting your project, we remain at your full disposal.", closing2: "Thank you in advance for your trust.", teams: "Teams we already work with", offices: "Where to find us", conditions: "General Terms" },
};
