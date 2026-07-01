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

/** Opção de preço (ex: Argentina Opción A/B). */
export interface PriceOption {
  name: string;
  lines: { label: string; text: string }[];
  value: string;
  note?: string;
}

export type GBlock =
  | { t: "p"; text: string; strong?: boolean }
  | { t: "h"; text: string } // subtítulo pequeno (numerado, ex: "1. Obtención de...")
  | { t: "h2"; text: string } // título grande, mesmo peso do heading da seção (2 títulos na mesma página)
  | { t: "ul"; items: string[] }
  | { t: "options"; intro?: string; options: PriceOption[] };

export interface GSection {
  heading: string;
  blocks: GBlock[];
  /** Imagem opcional (layout 2 colunas, texto + foto ao lado, como o overview). */
  image?: string;
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
  /** Valor único; se vazio E sem priceIncludes, o slide de preço padrão não é renderizado. */
  priceValue: string;
  /** Imagem do slide de preço (opcional). Default: /images/price.png */
  priceImage?: string;
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
  { id: "argentina", label: "Argentina" },
  { id: "usa", label: "Estados Unidos" },
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
// ARGENTINA · Soft Landing (template atual Kivi/Kuljobs) · ES
// Reescrito à mão (estrutura com Opción A/B + CDI) — sobrescreve o parser.
// O "S.A.S." antigo (Arias) é removido logo abaixo.
// ---------------------------------------------------------------------------
all["argentina|soft-landing|default|es"] = {
  coverTitle: "Soft landing en Argentina",
  modality: "",
  city: "Buenos Aires, Argentina",
  overviewHeading: "Soft landing en Argentina",
  intro: [
    "Acompañamos a los emprendedores a iniciar o expandir sus operaciones en Argentina.",
    "En especial, colaboramos con:",
  ],
  introBullets: [
    "Incorporación societaria de socios extranjeros",
    "Inscripciones tributarias",
    "Redacción de contrato social y acuerdos de socios",
    "Representación legal",
    "Domicilio social/fiscal y book-keeping",
    "Relatorios sobre asuntos regulatorios",
    "Obtención de licencias regulatorias",
  ],
  sections: [
    {
      heading: "Objetivo",
      blocks: [
        { t: "p", text: "Nuestros servicios abarcarán:" },
        { t: "p", strong: true, text: "1. La inscripción de una Sociedad por Acciones Simplificada (S.A.S.) en la República Argentina (la “Sociedad Argentina”)." },
        { t: "p", text: "La inscripción de la Sociedad Argentina se realizará ante la Inspección General de Justicia (IGJ), que es el registro público de la Ciudad Autónoma de Buenos Aires." },
        { t: "p", strong: true, text: "2. Obtención de la CDI (Clave de Identificación)." },
        { t: "p", text: "Si el socio de la Sociedad Argentina es una persona física extranjera no residente en Argentina, se gestionará la obtención de la Clave de Identificación (CDI), que es necesaria para poder participar como único socio de la Sociedad Argentina." },
      ],
    },
    {
      heading: "1. Inscripción de S.A.S.",
      blocks: [
        { t: "p", text: "Para realizar la inscripción de la S.A.S., el Cliente deberá informarnos:" },
        { t: "ul", items: [
          "Nombre de la empresa (informar 3 opciones posibles).",
          "Sede social de la empresa: deberá ser un domicilio en la Ciudad Autónoma de Buenos Aires. En caso de no contar con un domicilio, podemos ofrecer el servicio de Oficina Virtual por USD 200,00 al año.",
          "Datos completos de persona (residente argentina) a ser designada como Administrador Titular de la sociedad. Esta persona deberá dar su alta en impuesto “Autónomos” ante la ARCA antes de comenzar el trámite. En caso de no contar con una persona residente argentina, podemos ofrecer el servicio de representación legal por un valor de USD 750,00 al mes.",
          "Datos completos de persona a ser designada como Administrador Suplente de la sociedad.",
        ] },
        { t: "p", text: "El trámite requerirá de la firma del estatuto certificada —ya sea de manera presencial o virtual— ante Escribano Público (costo no incluido en nuestra propuesta)." },
      ],
    },
    {
      heading: "Propuesta inscripción de S.A.S.",
      blocks: [
        { t: "p", text: "Nuestros honorarios incluyen los siguientes servicios:" },
        { t: "ul", items: [
          "Confección de Estatuto S.A.S.",
          "Inscripción de sociedad ante el Registro de Comercio",
          "Redacción DDJJ",
          "Publicación de avisos en Boletín Oficial",
          "Dictamen precalificación",
          "Coordinación de firmas en escribanía",
          "Presentación y seguimiento de trámite",
          "Diligencias referentes a actos societarios",
          "Obtención de CUIT",
        ] },
      ],
    },
    {
      heading: "", // slide próprio das opções A/B
      blocks: [
        { t: "options", intro: "Ofrecemos dos modalidades de constitución según la necesidad del negocio:", options: [
          {
            name: "Opción A: S.A.S. Modelo",
            lines: [
              { label: "Estrategia", text: "Se utiliza el Estatuto Modelo aprobado por la IGJ, sin modificaciones." },
              { label: "Ideal para", text: "Quienes priorizan la velocidad y bajos costos iniciales." },
              { label: "Plazo de inscripción", text: "48 a 72 hs hábiles (aprox)." },
            ],
            value: "US$ 750,00",
            note: "(con todas las tasas de apertura incluidas)",
          },
          {
            name: "Opción B: S.A.S. Personalizada",
            lines: [
              { label: "Estrategia", text: "Redacción de estatuto a medida. Permite crear clases de acciones (A, B, C), cláusulas de vesting, y mecanismos de salida específicos." },
              { label: "Adicionales incluidos", text: "Confección y firma de Dictamen de Precalificación Profesional (Abogado/Escribano) requerido por normativa para estatutos no modelo." },
              { label: "Plazo de inscripción", text: "3 a 4 semanas (sujeto a revisión de IGJ)." },
            ],
            value: "US$ 1.050,00",
            note: "(con todas las tasas de apertura incluidas)",
          },
        ] },
      ],
    },
    {
      heading: "Servicios Adicionales (optativos)",
      blocks: [
        { t: "p", text: "Para facilitar el cumplimiento de los requisitos normativos vigentes en la Ciudad Autónoma de Buenos Aires, Lawi pone a su disposición los siguientes servicios adicionales:" },
        { t: "p", strong: true, text: "Sede Social de la Empresa. La Sociedad Argentina debe fijar un domicilio en la Ciudad Autónoma de Buenos Aires. En caso de no contar con uno, ofrecemos el servicio de Oficina Virtual por un abono de USD 200,00 por año." },
        { t: "p", strong: true, text: "Representación Legal. La normativa exige que la mayoría de los administradores/gerentes residan en Argentina y posean alta vigente en Autónomos ante ARCA. Si su estructura no cuenta con estos requisitos, ofrecemos el servicio de Representación Legal por un valor de USD 750,00 por mes." },
      ],
    },
    {
      heading: "2. Obtención del CDI — Requisitos",
      blocks: [
        { t: "p", text: "Para obtener el CDI del accionista extranjero no residente, el Cliente deberá enviarnos:" },
        { t: "ul", items: [
          "Información del solicitante (nombre y apellido, fecha de nacimiento, sexo, nacionalidad y domicilio real).",
          "Fotocopia de pasaporte, apostillada.",
          "Poder para representación en Argentina, apostillado.",
        ] },
        { t: "p", text: "Los documentos originales apostillados tendrán que ser enviados en su copia original a nuestras oficinas en Buenos Aires." },
      ],
    },
    {
      heading: "Propuesta Obtención del CDI",
      blocks: [
        { t: "p", text: "Nuestros honorarios para la obtención del CDI incluyen los siguientes servicios:" },
        { t: "ul", items: [
          "Redacción de texto de poder",
          "Realización del formulario de solicitud",
          "Presentación del formulario ante el ARCA (agencia de fiscalización tributaria en Argentina)",
        ] },
        { t: "p", strong: true, text: "Valor único (por socio): US$ 300,00." },
        { t: "h", text: "Tiempo Estimado del Trabajo" },
        { t: "p", text: "Nuestra experiencia indica que el tiempo promedio para constituir la S.A.S. es de una semana a partir de que se proporciona toda la información necesaria y los accionistas firman la documentación correspondiente." },
        { t: "p", text: "En cuanto a la obtención del CDI, puede demorar entre 72 horas hábiles y 15 días, dependiendo del tipo de solicitante. Para personas humanas con domicilio en el país puede resolverse en 72 horas hábiles; para no residentes o entidades del exterior, el plazo puede extenderse hasta 15 días." },
      ],
    },
  ],
  priceTitle: "",
  priceIncludes: [],
  priceValue: "", // sem slide de preço único (o preço está nas opções A/B)
  conditions: [
    "Los valores indicados en la presente propuesta están expresados en dólares americanos y se tributarán en reales brasileños al tipo de cambio oficial al día de su facturación. El cliente podrá pagar en dólares americanos, euros, pesos argentinos o reales brasileños al tipo de cambio del día de pago. También podrá pagar en USDT o USDC.",
    "Los gastos necesarios para la ejecución de los trabajos, tales como: copias, transportes, impuestos, tasas, traducciones, legalizaciones, etc., no están incluidos en el valor de los honorarios propuestos, debiendo ser reembolsados o rendidos mediante presentación de Rendición de Gastos.",
    "La presente propuesta no incluye el asesoramiento jurídico en materia laboral, impositiva, contractual, de propiedad intelectual o de cualquier otra materia no incluida específicamente en esta Propuesta.",
    "Los honorarios serán cobrados: (a) un 50% del total al momento de comenzar los trabajos; y (b) un 50% al concluir con todos los trabajos que sean de responsabilidad de nuestra empresa.",
    "La presente propuesta tiene un plazo de vigencia de treinta (30) días.",
  ],
};

// Argentina tem DOIS serviços distintos:
//  - "Soft Landing" (Kivi/Kuljobs): incorporação completa, com Opción A/B + CDI
//  - "Incorporación S.A.S." (Arias): o modelo específico, mais enxuto (mantido do parser)

all["argentina|soft-landing|default|en"] = {
  coverTitle: "Soft landing in Argentina",
  modality: "",
  city: "Buenos Aires, Argentina",
  overviewHeading: "Soft landing in Argentina",
  intro: [
    "We accompany entrepreneurs to start or expand their operations in Argentina.",
    "In particular, we collaborate with:",
  ],
  introBullets: [
    "Corporate incorporation of foreign partners",
    "Tax registrations",
    "Drafting of corporate agreements and shareholder agreements",
    "Legal representation",
    "Registered address/fiscal address and book-keeping",
    "Reports on regulatory matters",
    "Obtaining regulatory licenses",
  ],
  sections: [
    {
      heading: "Objective",
      blocks: [
        { t: "p", text: "Our services will cover:" },
        { t: "p", strong: true, text: "1. The registration of a Sociedad por Acciones Simplificada (S.A.S.) in the Argentine Republic (the “Argentine Company”)." },
        { t: "p", text: "The registration of the Argentine Company will be carried out before the Inspección General de Justicia (IGJ), the public registry of the Autonomous City of Buenos Aires." },
        { t: "p", strong: true, text: "2. Obtaining the CDI (Identification Key)." },
        { t: "p", text: "If the partner of the Argentine Company is a foreign natural person not residing in Argentina, we will manage obtaining the Identification Key (CDI), which is necessary to participate as the sole partner of the Argentine Company." },
      ],
    },
    {
      heading: "1. S.A.S. Registration",
      blocks: [
        { t: "p", text: "To carry out the S.A.S. registration, the Client must provide us with:" },
        { t: "ul", items: [
          "Company name (provide 3 possible options).",
          "Company registered address: must be an address in the Autonomous City of Buenos Aires. If no address is available, we can offer the Virtual Office service for USD 200.00 per year.",
          "Full details of the person (Argentine resident) to be designated as Principal Administrator of the company. This person must register for the “Autónomos” tax with ARCA before starting the process. If no Argentine resident is available, we can offer the legal representation service for USD 750.00 per month.",
          "Full details of the person to be designated as Alternate Administrator of the company.",
        ] },
        { t: "p", text: "The process will require the certified signature of the bylaws — either in person or virtually — before a Public Notary (cost not included in our proposal)." },
      ],
    },
    {
      heading: "S.A.S. Registration Proposal",
      blocks: [
        { t: "p", text: "Our fees include the following services:" },
        { t: "ul", items: [
          "Preparation of S.A.S. Bylaws",
          "Company registration with the Commercial Registry",
          "Drafting of sworn statement (DDJJ)",
          "Publication of notices in the Official Gazette",
          "Pre-qualification opinion",
          "Coordination of signatures at the notary",
          "Filing and tracking of the process",
          "Procedures related to corporate acts",
          "Obtaining CUIT (tax ID)",
        ] },
      ],
    },
    {
      heading: "",
      blocks: [
        { t: "options", intro: "We offer two incorporation modalities depending on your business needs:", options: [
          {
            name: "Option A: Standard S.A.S.",
            lines: [
              { label: "Strategy", text: "Uses the Standard Bylaws approved by the IGJ, without modifications." },
              { label: "Ideal for", text: "Those who prioritize speed and lower upfront costs." },
              { label: "Registration timeline", text: "48 to 72 business hours (approx)." },
            ],
            value: "US$ 750.00",
            note: "(all opening fees included)",
          },
          {
            name: "Option B: Customized S.A.S.",
            lines: [
              { label: "Strategy", text: "Tailor-made bylaws drafting. Allows creating share classes (A, B, C), vesting clauses, and specific exit mechanisms." },
              { label: "Additionals included", text: "Preparation and signature of the Professional Pre-Qualification Opinion (Lawyer/Notary) required by regulation for non-standard bylaws." },
              { label: "Registration timeline", text: "3 to 4 weeks (subject to IGJ review)." },
            ],
            value: "US$ 1,050.00",
            note: "(all opening fees included)",
          },
        ] },
      ],
    },
    {
      heading: "Additional Services (optional)",
      blocks: [
        { t: "p", text: "To facilitate compliance with the regulatory requirements currently in force in the Autonomous City of Buenos Aires, Lawi offers the following additional services:" },
        { t: "p", strong: true, text: "Company Registered Address. The Argentine Company must have an address in the Autonomous City of Buenos Aires. If you don't have one, we offer the Virtual Office service for a fee of USD 200.00 per year." },
        { t: "p", strong: true, text: "Legal Representation. Regulations require that most administrators/managers reside in Argentina and hold an active “Autónomos” registration with ARCA before starting the process. If your structure doesn't meet these requirements, we offer the Legal Representation service for USD 750.00 per month." },
      ],
    },
    {
      heading: "2. Obtaining the CDI — Requirements",
      blocks: [
        { t: "p", text: "To obtain the CDI for the non-resident foreign shareholder, the Client must send us:" },
        { t: "ul", items: [
          "Applicant information (full name, date of birth, sex, nationality, and actual address).",
          "Apostilled copy of passport.",
          "Apostilled power of attorney for representation in Argentina.",
        ] },
        { t: "p", text: "The original apostilled documents must be sent in their original copy to our offices in Buenos Aires." },
      ],
    },
    {
      heading: "CDI Application Proposal",
      blocks: [
        { t: "p", text: "Our fees for obtaining the CDI include the following services:" },
        { t: "ul", items: [
          "Drafting of the power of attorney",
          "Completion of the application form",
          "Filing of the form with ARCA (Argentina's tax oversight agency)",
        ] },
        { t: "p", strong: true, text: "One-time fee (per partner): US$ 300.00." },
        { t: "h", text: "Estimated Timeline" },
        { t: "p", text: "Our experience indicates that the average time to incorporate the S.A.S. is one week from the moment all necessary information is provided and shareholders sign the corresponding documentation." },
        { t: "p", text: "As for obtaining the CDI, it can take between 72 business hours and 15 days, depending on the type of applicant. For individuals domiciled in the country, it can be resolved in 72 business hours; for non-residents or entities incorporated abroad, the timeline may extend up to 15 days." },
      ],
    },
  ],
  priceTitle: "",
  priceIncludes: [],
  priceValue: "",
  conditions: [
    "The values indicated in this proposal are expressed in US dollars and will be invoiced in Brazilian reais at the official exchange rate on the day of invoicing. The client may pay in US dollars, euros, Argentine pesos, or Brazilian reais at the exchange rate on the day of payment. Payment in USDT or USDC is also accepted.",
    "Expenses necessary for the execution of the work, such as: copies, transport, taxes, fees, translations, legalizations, etc., are not included in the proposed fees and must be reimbursed or settled by presenting an Expense Report.",
    "This proposal does not include legal advice on labor, tax, contractual, intellectual property, or any other matters not specifically included in this Proposal.",
    "Fees will be charged: (a) 50% of the total at the time work begins; and (b) 50% upon completion of all work under our company's responsibility.",
    "This proposal is valid for thirty (30) days.",
  ],
};

all["argentina|soft-landing|default|pt"] = {
  coverTitle: "Soft landing na Argentina",
  modality: "",
  city: "Buenos Aires, Argentina",
  overviewHeading: "Soft landing na Argentina",
  intro: [
    "Acompanhamos os empreendedores a iniciar ou expandir suas operações na Argentina.",
    "Em especial, colaboramos com:",
  ],
  introBullets: [
    "Incorporação societária de sócios estrangeiros",
    "Inscrições tributárias",
    "Redação de contrato social e acordos de sócios",
    "Representação legal",
    "Domicílio social/fiscal e book-keeping",
    "Relatórios sobre assuntos regulatórios",
    "Obtenção de licenças regulatórias",
  ],
  sections: [
    {
      heading: "Objetivo",
      blocks: [
        { t: "p", text: "Nossos serviços abrangerão:" },
        { t: "p", strong: true, text: "1. A inscrição de uma Sociedad por Acciones Simplificada (S.A.S.) na República Argentina (a “Sociedade Argentina”)." },
        { t: "p", text: "A inscrição da Sociedade Argentina será realizada perante a Inspección General de Justicia (IGJ), registro público da Cidade Autônoma de Buenos Aires." },
        { t: "p", strong: true, text: "2. Obtenção do CDI (Clave de Identificación)." },
        { t: "p", text: "Se o sócio da Sociedade Argentina for uma pessoa física estrangeira não residente na Argentina, será gerenciada a obtenção da Clave de Identificación (CDI), necessária para participar como único sócio da Sociedade Argentina." },
      ],
    },
    {
      heading: "1. Inscrição de S.A.S.",
      blocks: [
        { t: "p", text: "Para realizar a inscrição da S.A.S., o Cliente deverá nos informar:" },
        { t: "ul", items: [
          "Nome da empresa (informar 3 opções possíveis).",
          "Sede social da empresa: deverá ser um endereço na Cidade Autônoma de Buenos Aires. Caso não disponha de um endereço, podemos oferecer o serviço de Escritório Virtual por USD 200,00 ao ano.",
          "Dados completos da pessoa (residente argentina) a ser designada como Administrador Titular da sociedade. Esta pessoa deverá se cadastrar no imposto “Autónomos” perante a ARCA antes de iniciar o trâmite. Caso não haja um residente argentino disponível, podemos oferecer o serviço de representação legal por USD 750,00 ao mês.",
          "Dados completos da pessoa a ser designada como Administrador Suplente da sociedade.",
        ] },
        { t: "p", text: "O trâmite exigirá a assinatura do estatuto certificada — de forma presencial ou virtual — perante Escrivão Público (custo não incluído em nossa proposta)." },
      ],
    },
    {
      heading: "Proposta de inscrição de S.A.S.",
      blocks: [
        { t: "p", text: "Nossos honorários incluem os seguintes serviços:" },
        { t: "ul", items: [
          "Elaboração do Estatuto S.A.S.",
          "Inscrição da sociedade no Registro de Comércio",
          "Redação de DDJJ (declaração jurada)",
          "Publicação de avisos no Diário Oficial",
          "Parecer de pré-qualificação",
          "Coordenação de assinaturas em cartório",
          "Apresentação e acompanhamento do trâmite",
          "Diligências referentes a atos societários",
          "Obtenção de CUIT",
        ] },
      ],
    },
    {
      heading: "",
      blocks: [
        { t: "options", intro: "Oferecemos duas modalidades de constituição de acordo com a necessidade do negócio:", options: [
          {
            name: "Opção A: S.A.S. Modelo",
            lines: [
              { label: "Estratégia", text: "Utiliza-se o Estatuto Modelo aprovado pela IGJ, sem modificações." },
              { label: "Ideal para", text: "Quem prioriza velocidade e baixos custos iniciais." },
              { label: "Prazo de inscrição", text: "48 a 72 horas úteis (aprox)." },
            ],
            value: "US$ 750,00",
            note: "(com todas as taxas de abertura incluídas)",
          },
          {
            name: "Opção B: S.A.S. Personalizada",
            lines: [
              { label: "Estratégia", text: "Redação de estatuto sob medida. Permite criar classes de ações (A, B, C), cláusulas de vesting e mecanismos de saída específicos." },
              { label: "Adicionais incluídos", text: "Elaboração e assinatura do Parecer de Pré-Qualificação Profissional (Advogado/Escrivão) exigido pela norma para estatutos não modelo." },
              { label: "Prazo de inscrição", text: "3 a 4 semanas (sujeito a revisão da IGJ)." },
            ],
            value: "US$ 1.050,00",
            note: "(com todas as taxas de abertura incluídas)",
          },
        ] },
      ],
    },
    {
      heading: "Serviços Adicionais (opcionais)",
      blocks: [
        { t: "p", text: "Para facilitar o cumprimento dos requisitos normativos vigentes na Cidade Autônoma de Buenos Aires, a Lawi disponibiliza os seguintes serviços adicionais:" },
        { t: "p", strong: true, text: "Sede Social da Empresa. A Sociedade Argentina deve fixar um endereço na Cidade Autônoma de Buenos Aires. Caso não disponha de um, oferecemos o serviço de Escritório Virtual por um valor de USD 200,00 ao ano." },
        { t: "p", strong: true, text: "Representação Legal. A normativa exige que a maioria dos administradores/gerentes resida na Argentina e possua cadastro ativo em Autónomos perante a ARCA. Caso sua estrutura não cumpra esses requisitos, oferecemos o serviço de Representação Legal por um valor de USD 750,00 ao mês." },
      ],
    },
    {
      heading: "2. Obtenção do CDI — Requisitos",
      blocks: [
        { t: "p", text: "Para obter o CDI do acionista estrangeiro não residente, o Cliente deverá nos enviar:" },
        { t: "ul", items: [
          "Informações do solicitante (nome completo, data de nascimento, sexo, nacionalidade e endereço real).",
          "Cópia do passaporte, apostilada.",
          "Procuração para representação na Argentina, apostilada.",
        ] },
        { t: "p", text: "Os documentos originais apostilados deverão ser enviados em cópia original às nossas oficinas em Buenos Aires." },
      ],
    },
    {
      heading: "Proposta de Obtenção do CDI",
      blocks: [
        { t: "p", text: "Nossos honorários para a obtenção do CDI incluem os seguintes serviços:" },
        { t: "ul", items: [
          "Redação do texto de procuração",
          "Preenchimento do formulário de solicitação",
          "Apresentação do formulário perante a ARCA (agência de fiscalização tributária na Argentina)",
        ] },
        { t: "p", strong: true, text: "Valor único (por sócio): US$ 300,00." },
        { t: "h", text: "Tempo Estimado do Trabalho" },
        { t: "p", text: "Nossa experiência indica que o prazo médio para constituir a S.A.S. é de uma semana a partir do momento em que todas as informações necessárias são fornecidas e os acionistas assinam a documentação correspondente." },
        { t: "p", text: "Quanto à obtenção do CDI, pode demorar entre 72 horas úteis e 15 dias, dependendo do tipo de solicitante. Para pessoas físicas com domicílio no país, o trâmite pode ser resolvido em 72 horas úteis; para não residentes ou entidades constituídas no exterior, o prazo pode se estender até 15 dias." },
      ],
    },
  ],
  priceTitle: "",
  priceIncludes: [],
  priceValue: "",
  conditions: [
    "Os valores indicados na presente proposta estão expressos em dólares americanos e serão faturados em reais brasileiros à taxa de câmbio oficial no dia do faturamento. O cliente poderá pagar em dólares americanos, euros, pesos argentinos ou reais brasileiros à taxa de câmbio do dia do pagamento. Também poderá pagar em USDT ou USDC.",
    "As despesas necessárias para a execução dos trabalhos, tais como: cópias, transportes, impostos, taxas, traduções, legalizações, etc., não estão incluídas no valor dos honorários propostos, devendo ser reembolsadas ou prestadas mediante apresentação de Relatório de Despesas.",
    "A presente proposta não inclui assessoria jurídica em matéria trabalhista, tributária, contratual, de propriedade intelectual ou qualquer outra matéria não incluída especificamente nesta Proposta.",
    "Os honorários serão cobrados: (a) 50% do total no momento de início dos trabalhos; e (b) 50% ao concluir todos os trabalhos que sejam de responsabilidade de nossa empresa.",
    "A presente proposta tem um prazo de vigência de trinta (30) dias.",
  ],
};

// ---------------------------------------------------------------------------
// ESTADOS UNIDOS · LLC (Delaware) · PT / ES / EN
// Sobrescreve o parser: junta "Objetivo" + "Prazos" numa única página
// (como no template original) e adiciona a versão EN (não existe no Word).
// ---------------------------------------------------------------------------
all["usa|llc|default|pt"] = {
  coverTitle: "Incorporação de LLC",
  modality: "",
  city: "São Paulo, Brasil",
  overviewHeading: "Incorporação de LLC em Delaware",
  intro: [
    "Auxiliamos empreendedores e empresas a se estabelecerem nos Estados Unidos da América (EUA).",
    "Em especial, colaboramos com:",
  ],
  introBullets: [
    "Incorporação de LLC em Delaware (ou outro estado)",
    "Obtenção de documentos de constituição",
    "Redação de Operating Agreement (Contrato Social)",
    "Obtenção de EIN (Employer Identification Number)",
    "Relatório de Beneficial Ownership Information (BOI), se aplicável",
    "Apoio na abertura de conta bancária",
    "Escritório Virtual nos EUA",
  ],
  sections: [
    {
      heading: "Objetivo",
      blocks: [
        { t: "p", text: "A presente proposta refere-se à incorporação de uma sociedade LLC no Estado de Delaware, incluindo os documentos de constituição, contrato social (Operating Agreement), Registered Agent por 24 meses, BOI report (se aplicável), obtenção de número de EIN e assistência na abertura de conta bancária. Nossa proposta inclui as taxas oficiais do Estado de Delaware." },
        { t: "p", text: "A proposta não inclui o endereço postal nos EUA (recomendado), que pode ser contratado por um custo anual de USD 150,00." },
        { t: "h", text: "Prazos" },
        { t: "p", text: "O processo de incorporação tem duração aproximada de 6 dias úteis." },
        { t: "p", text: "Para a obtenção do EIN (número de identificação fiscal), o prazo é de 7 a 45 dias úteis a partir da emissão dos documentos de incorporação da LLC. Este número é importante para a abertura da conta bancária." },
      ],
    },
  ],
  priceTitle: "Incorporação de Delaware LLC",
  priceIncludes: [
    "Documento de constituição",
    "Operating Agreement (Contrato Social)",
    "Agente Registrado por 24 meses",
    "Número de EIN",
    "BOI Report (se aplicável)",
    "Assistência na abertura de conta bancária",
  ],
  priceValue: "Valor único: US$ 800,00 (com todas as taxas de abertura incluídas)",
  conditions: [
    "Os valores indicados na presente proposta estão expressos em dólares americanos e serão convertidos à taxa de câmbio oficial divulgada pelo BACEN na República Federativa do Brasil, ou à taxa de câmbio oficial divulgada pelo Banco de la Nación Argentina, acrescido de IVA, caso faturados na República Argentina, a critério do cliente.",
    "As despesas necessárias para a execução dos trabalhos que não estejam especificamente incluídas nesta proposta, tais como: cópias, transportes, impostos, traduções, legalizações, apostilas, etc., não estão incluídas no valor dos honorários propostos, devendo ser reembolsadas ou prestadas mediante apresentação de Relatório de Despesas. Esta proposta inclui o valor das taxas a serem pagas ao Estado de Delaware para o registro da LLC.",
    "Os honorários serão cobrados 100% no início do processo de registro.",
    "A presente proposta tem um prazo de vigência de trinta (30) dias.",
  ],
};

all["usa|llc|default|es"] = {
  coverTitle: "Incorporación de LLC",
  modality: "",
  city: "São Paulo, Brasil",
  overviewHeading: "Incorporación de LLC en Delaware",
  intro: [
    "Asistimos a emprendedores y empresas a establecerse en los Estados Unidos de América (EUA).",
    "En especial, colaboramos con:",
  ],
  introBullets: [
    "Incorporación de LLC en Delaware (u otro estado)",
    "Obtención de documentos de formación",
    "Redacción de Operating Agreement (Estatuto)",
    "Obtención de EIN (Employer Identification Number)",
    "Reporte de Beneficial Ownership Information (BOI), si aplica",
    "Apoyo en apertura de cuenta bancaria",
    "Oficina Virtual en EUA",
  ],
  sections: [
    {
      heading: "Objetivo",
      blocks: [
        { t: "p", text: "La presente propuesta se refiere a la incorporación de una sociedad LLC en el Estado de Delaware, incluyendo los documentos de constitución, estatuto social (Operating Agreement), Registered Agent por 24 meses, BOI report (si aplica), obtención de número de EIN y asistencia en la apertura de cuenta bancaria. Nuestra propuesta incluye las tasas oficiales del Estado de Delaware." },
        { t: "p", text: "La propuesta no incluye el domicilio postal en EUA (recomendado), que puede ser contratado por un costo anual de USD 150,00." },
        { t: "h", text: "Plazos" },
        { t: "p", text: "El trámite de la incorporación es de aproximadamente 6 días hábiles." },
        { t: "p", text: "Para la obtención del EIN (número de identificación fiscal) los tiempos son de 7 a 45 días hábiles a partir de la emisión de los documentos de incorporación de la LLC. Este número es importante para la apertura de la cuenta bancaria." },
      ],
    },
  ],
  priceTitle: "Incorporación de Delaware LLC",
  priceIncludes: [
    "Documento de formación",
    "Operating Agreement (Estatuto)",
    "Agente Registrado por 24 meses",
    "Número de EIN",
    "BOI Report (si aplica)",
    "Asistencia en apertura de cuenta bancaria",
  ],
  priceValue: "Valor único: US$ 800,00 (con todas las tasas de apertura incluidas)",
  conditions: [
    "Los valores indicados en la presente propuesta están expresados en dólares americanos y serán convertidos al tipo de cambio oficial informado por el BACEN en la República Federativa del Brasil, o al tipo de cambio oficial informado por el Banco de la Nación Argentina, más IVA, en caso de facturarse en la República Argentina, a criterio del cliente.",
    "Los gastos necesarios para la ejecución de los trabajos que no estén específicamente incluidos en esta propuesta, tales como: copias, transportes, impuestos, traducciones, legalizaciones, apostillas, etc., no están incluidos en el valor de los honorarios propuestos, debiendo ser reembolsados o rendidos mediante presentación de Rendición de Gastos. Esta propuesta incluye el valor de las tasas a pagar al Estado de Delaware para el registro de la LLC.",
    "Los honorarios serán cobrados 100% al inicio del proceso de registro.",
    "La presente propuesta tiene un plazo de vigencia de treinta (30) días.",
  ],
};

all["usa|llc|default|en"] = {
  coverTitle: "LLC Incorporation",
  modality: "",
  city: "São Paulo, Brazil",
  overviewHeading: "LLC Incorporation in Delaware",
  intro: [
    "We help entrepreneurs and companies establish themselves in the United States of America (USA).",
    "In particular, we collaborate with:",
  ],
  introBullets: [
    "LLC incorporation in Delaware (or another state)",
    "Obtaining formation documents",
    "Drafting of the Operating Agreement",
    "Obtaining an EIN (Employer Identification Number)",
    "Beneficial Ownership Information (BOI) report, if applicable",
    "Support in opening a bank account",
    "Virtual Office in the USA",
  ],
  sections: [
    {
      heading: "Objective",
      blocks: [
        { t: "p", text: "This proposal refers to the incorporation of an LLC in the State of Delaware, including the formation documents, Operating Agreement, Registered Agent for 24 months, BOI report (if applicable), obtaining an EIN number, and assistance opening a bank account. Our proposal includes the official fees of the State of Delaware." },
        { t: "p", text: "This proposal does not include a US mailing address (recommended), which can be contracted for an annual cost of USD 150.00." },
        { t: "h", text: "Timeline" },
        { t: "p", text: "The incorporation process takes approximately 6 business days." },
        { t: "p", text: "For obtaining the EIN (tax identification number), the timeline is 7 to 45 business days from the issuance of the LLC's incorporation documents. This number is important for opening the bank account." },
      ],
    },
  ],
  priceTitle: "Delaware LLC Incorporation",
  priceIncludes: [
    "Formation document",
    "Operating Agreement",
    "Registered Agent for 24 months",
    "EIN number",
    "BOI Report (if applicable)",
    "Assistance opening a bank account",
  ],
  priceValue: "One-time fee: US$ 800.00 (all opening fees included)",
  conditions: [
    "The values indicated in this proposal are expressed in US dollars and will be converted at the official exchange rate published by BACEN in the Federative Republic of Brazil, or at the official exchange rate published by Banco de la Nación Argentina, plus VAT, if invoiced in the Argentine Republic, at the client's discretion.",
    "Expenses necessary for the execution of the work not specifically included in this proposal, such as: copies, transport, taxes, translations, legalizations, apostilles, etc., are not included in the proposed fees and must be reimbursed or settled by presenting an Expense Report. This proposal includes the fees payable to the State of Delaware for the LLC registration.",
    "Fees will be charged 100% at the start of the registration process.",
    "This proposal is valid for thirty (30) days.",
  ],
};

// USA · LLC: usa a imagem própria (imag4) no slide de preço.
for (const lang of ["es", "pt", "en"] as const) {
  const p = all[`usa|llc|default|${lang}`];
  if (p) p.priceImage = "/images/price-usa.png";
}

// ---------------------------------------------------------------------------
// ARGENTINA · S.A.S. (Arias, via parser): ajustes pontuais —
// usa a imagem própria (imag3) no slide de preço; e no template original
// "Objetivo" + "Tiempos del trabajo" ficam juntos no MESMO slide.
for (const lang of ["es", "pt", "en"] as const) {
  const key = `argentina|sas|default|${lang}`;
  const p = all[key];
  if (!p) continue;
  p.priceImage = "/images/price-sas.png";

  // Objetivo + Tiempos/Prazos/Timeline no MESMO slide (2 títulos de mesmo tamanho).
  // A seção seguinte (Requisitos) permanece SEPARADA. Merge idempotente (guard).
  const TIEMPOS = ["Tiempos del trabajo", "Prazos do trabalho", "Timeline"];
  const oi = p.sections.findIndex((s) => /^(Objetivo|Objective)/.test(s.heading));
  const ti = p.sections.findIndex((s) => TIEMPOS.includes(s.heading));
  if (oi !== -1 && ti === oi + 1) {
    const obj = p.sections[oi];
    const tie = p.sections[ti];
    p.sections = [
      ...p.sections.slice(0, oi),
      { heading: obj.heading, blocks: [...obj.blocks, { t: "h2", text: tie.heading }, ...tie.blocks] },
      ...p.sections.slice(ti + 1),
    ];
  }
}

// ARGENTINA · Soft Landing: imagem (imag5) na página 5 — "Propuesta inscripción de S.A.S."
for (const lang of ["es", "pt", "en"] as const) {
  const p = all[`argentina|soft-landing|default|${lang}`];
  if (!p) continue;
  const sec = p.sections.find((s) => /(Propuesta inscripción de S\.A\.S\.|S\.A\.S\. Registration Proposal|Proposta de inscrição de S\.A\.S\.)/.test(s.heading));
  if (sec) sec.image = "/images/overview-ar-softlanding.png";
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
