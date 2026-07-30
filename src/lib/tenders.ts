/**
 * Domain model for Mint: tenders (licitaciones) with an 11-section RFP
 * document and a pipeline of supplier applications. All money is MXN
 * (docs/estrategia-mexico.md: "todo en MXN"), demo data uses believable
 * Mexican companies (docs/landing-brief.md).
 */

export type TenderStatus = 'draft' | 'published' | 'closed'
export type Stage = 'received' | 'analysis' | 'negotiation' | 'accepted' | 'rejected'

export const STATUS_LABEL: Record<TenderStatus, string> = {
  draft: 'Borrador',
  published: 'Publicada',
  closed: 'Cerrada',
}

export const STAGES: Stage[] = ['received', 'analysis', 'negotiation', 'accepted', 'rejected']

export const STAGE_LABEL: Record<Stage, string> = {
  received: 'Recibida',
  analysis: 'Análisis',
  negotiation: 'Negociación',
  accepted: 'Aceptada',
  rejected: 'Rechazada',
}

/** Ordered RFP sections. `titulo` renders as the document title, not a block. */
export const SECTIONS = [
  { key: 'titulo', label: 'Título de la licitación' },
  { key: 'antecedentes', label: 'Antecedentes / Contexto' },
  { key: 'objetivo', label: 'Objetivo del proyecto' },
  { key: 'alcance', label: 'Alcance del trabajo' },
  { key: 'entregables', label: 'Entregables' },
  { key: 'requisitos', label: 'Requisitos del proveedor' },
  { key: 'criterios', label: 'Criterios de evaluación' },
  { key: 'presupuesto', label: 'Presupuesto estimado' },
  { key: 'cronograma', label: 'Cronograma' },
  { key: 'instrucciones', label: 'Instrucciones para aplicar' },
  { key: 'terminos', label: 'Términos y condiciones' },
] as const

export type SectionKey = (typeof SECTIONS)[number]['key']
export type TenderDoc = Record<SectionKey, string>

export interface Application {
  id: string
  company: string
  summary: string
  amountMxn: number
  date: string
  stage: Stage
  contact?: string
  email?: string
  description?: string
}

export interface Tender {
  id: string
  doc: TenderDoc
  status: TenderStatus
  createdAt: string
  deadline: string
  applications: Application[]
}

/**
 * The assistant's script: 10 questions, each filling one field verbatim.
 * ponytail: verbatim fill is a prototype limitation; the real assistant
 * (Claude API, docs/producto-roadmap.md P0) reformulates into formal prose.
 */
export const QUESTIONS: { question: string; target: SectionKey | 'deadline' }[] = [
  { question: 'Hola, soy el Asistente Mint. Te hago las preguntas correctas y convierto tus respuestas en una licitación completa. Para empezar: ¿cuál es el nombre del proyecto?', target: 'titulo' },
  { question: 'Cuéntame el contexto: ¿por qué surge esta necesidad? Esto va en la sección de antecedentes.', target: 'antecedentes' },
  { question: '¿Cuál es el objetivo principal del proyecto?', target: 'objetivo' },
  { question: '¿Qué incluye el alcance del trabajo?', target: 'alcance' },
  { question: '¿Qué entregables esperas recibir?', target: 'entregables' },
  { question: '¿Qué requisitos debe cumplir el proveedor?', target: 'requisitos' },
  { question: '¿Con qué criterios evaluarás las propuestas? Por ejemplo: experiencia 30%, precio 25%.', target: 'criterios' },
  { question: '¿Cuál es el presupuesto estimado en MXN? Si aún no lo defines, ponemos un rango.', target: 'presupuesto' },
  { question: '¿Cuál es el cronograma tentativo? Inicio y entrega.', target: 'cronograma' },
  { question: 'Última: ¿hasta qué fecha recibes propuestas?', target: 'deadline' },
]

/** Fraction of the 11 sections with content: fills the folio's ticks. */
export function docProgress(t: Tender): number {
  return SECTIONS.filter((s) => t.doc[s.key].trim()).length / SECTIONS.length
}

export const DONE_MESSAGE =
  'Listo, tu licitación está completa. Revisa el documento, ajusta lo que quieras directamente y cuando estés conforme pulsa Publicar.'

const BOILERPLATE_INSTRUCCIONES =
  'Los proveedores interesados deben aplicar a través del portal de Mint adjuntando propuesta económica, descripción detallada y documentación de soporte.'
const BOILERPLATE_TERMINOS =
  'La empresa se reserva el derecho de declarar desierto el proceso. Toda la información compartida será tratada con confidencialidad.'

export function emptyDoc(): TenderDoc {
  return {
    titulo: '',
    antecedentes: '',
    objetivo: '',
    alcance: '',
    entregables: '',
    requisitos: '',
    criterios: '',
    presupuesto: '',
    cronograma: '',
    instrucciones: BOILERPLATE_INSTRUCCIONES,
    terminos: BOILERPLATE_TERMINOS,
  }
}

/** Demo fixtures: one full pipeline, one draft, one closed. MXN throughout. */
export const SEED_TENDERS: Tender[] = [
  {
    id: 't1',
    status: 'published',
    createdAt: '04 may 2026',
    deadline: '25 jun 2026',
    doc: {
      titulo: 'App móvil para fuerza de ventas en ruta',
      antecedentes:
        '40 vendedores levantan pedidos en papel y los capturan por la tarde; hay errores de captura y pedidos que se pierden.',
      objetivo:
        'Que la fuerza de ventas levante pedidos en ruta desde el celular, sin señal, y sincronice con el ERP.',
      alcance:
        'App iOS y Android con catálogo offline, levantamiento de pedidos, sincronización al ERP y tablero de supervisión.',
      entregables:
        'App publicada en las tiendas, panel de supervisión, integración al ERP, manuales y capacitación.',
      requisitos:
        'Experiencia comprobable en apps de venta en ruta o distribución, equipo propio y soporte en horario de operación.',
      criterios:
        'Experiencia (30%), propuesta técnica (30%), precio (25%), tiempos de entrega (15%).',
      presupuesto: 'MXN 700,000 - 950,000',
      cronograma: 'Inicio: 1 julio · Piloto con 10 vendedores: septiembre · Despliegue completo: noviembre',
      instrucciones: BOILERPLATE_INSTRUCCIONES,
      terminos: BOILERPLATE_TERMINOS,
    },
    applications: [
      { id: 'a1', company: 'Nube Roja Studio', summary: '6 apps de ruta similares. MVP en 10 semanas.', amountMxn: 790_000, date: '20 may', stage: 'received' },
      { id: 'a2', company: 'Talleres Digitales MX', summary: 'Diseñador de producto dedicado todo el proyecto.', amountMxn: 680_000, date: '21 may', stage: 'received' },
      { id: 'a3', company: 'Cardinal Labs', summary: 'React Native e integración al ERP incluida.', amountMxn: 910_000, date: '12 may', stage: 'analysis' },
      { id: 'a4', company: 'Sierra Digital', summary: 'Propuesta premium con soporte 24/7 el primer año.', amountMxn: 1_050_000, date: '10 may', stage: 'negotiation' },
      { id: 'a5', company: 'Grupo Ferrer TI', summary: 'Excede el presupuesto publicado.', amountMxn: 1_180_000, date: '09 may', stage: 'rejected' },
    ],
  },
  {
    id: 't2',
    status: 'draft',
    createdAt: '22 may 2026',
    deadline: '01 jul 2026',
    doc: {
      ...emptyDoc(),
      titulo: 'Auditoría de seguridad y pentest',
      antecedentes:
        'Antes de la certificación PCI necesitamos una revisión externa completa de nuestra plataforma de pagos.',
      objetivo:
        'Identificar y priorizar vulnerabilidades en infraestructura y aplicación antes del cierre del año fiscal.',
      presupuesto: 'MXN 420,000',
    },
    applications: [],
  },
  {
    id: 't3',
    status: 'closed',
    createdAt: '10 mar 2026',
    deadline: '10 abr 2026',
    doc: {
      ...emptyDoc(),
      titulo: 'Suministro de mobiliario de oficinas',
      antecedentes: 'Apertura de la nueva oficina regional en Guadalajara para 60 personas.',
      objetivo: 'Equipar la oficina completa con mobiliario ergonómico antes de la mudanza.',
      alcance: 'Escritorios, sillas, salas de junta, recepción y áreas comunes. Entrega e instalación incluidas.',
      presupuesto: 'MXN 1,800,000 - 2,400,000',
      cronograma: 'Entrega e instalación: primera quincena de abril.',
    },
    applications: [],
  },
]
