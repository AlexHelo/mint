import type { Proposal, Rfp } from '@/lib/types'

/**
 * Mock fixtures for the clickable prototype. Realistic Mexican company names
 * and tech projects, not Acme/Jane Doe placeholders. Replaced by real
 * Supabase queries through the services layer once tables land.
 */

/** Open RFPs a supplier could apply to (supplier dashboard). */
export const OPEN_RFPS: Rfp[] = [
  {
    id: 'rfp-1',
    title: 'App móvil para pedidos de distribución',
    sector: 'Desarrollo de software',
    scope:
      'App iOS y Android para que nuestra fuerza de ventas levante pedidos en ruta, con catálogo offline y sincronización al ERP.',
    budgetEstimate: 850_000,
    deadline: '2026-06-20',
    status: 'published',
    companyName: 'Distribuidora del Bajío',
  },
  {
    id: 'rfp-2',
    title: 'Modelo de predicción de demanda',
    sector: 'IA y datos',
    scope:
      'Queremos anticipar la demanda por SKU y por tienda para reducir merma. Tenemos 3 años de historial de ventas en BigQuery.',
    budgetEstimate: 1_200_000,
    deadline: '2026-07-05',
    status: 'published',
    companyName: 'Grupo Alimentos Norte',
  },
  {
    id: 'rfp-3',
    title: 'Auditoría de seguridad y pentest',
    sector: 'Ciberseguridad',
    scope:
      'Pentest externo e interno de nuestra plataforma de pagos antes de la certificación PCI. Reporte con remediación priorizada.',
    budgetEstimate: 420_000,
    deadline: '2026-06-14',
    status: 'published',
    companyName: 'PagaFácil',
  },
  {
    id: 'rfp-4',
    title: 'Implementación de CRM para ventas B2B',
    sector: 'CRM',
    scope:
      'Migrar de hojas de cálculo a un CRM con embudo de ventas, cotizaciones y reportes para un equipo de 18 vendedores.',
    budgetEstimate: 360_000,
    deadline: '2026-06-28',
    status: 'published',
    companyName: 'Aceros Peninsulares',
  },
  {
    id: 'rfp-5',
    title: 'Migración a infraestructura cloud',
    sector: 'Infraestructura cloud',
    scope:
      'Mover nuestro monolito on-premise a AWS con alta disponibilidad. Buscamos también dejar IaC y CI/CD montados.',
    budgetEstimate: 980_000,
    deadline: '2026-07-12',
    status: 'published',
    companyName: 'Logística Tapatía',
  },
]

/** Suppliers interested in the client's published RFP (client dashboard). */
export const INTERESTED_PROPOSALS: Proposal[] = [
  {
    id: 'prop-1',
    rfpId: 'rfp-own',
    supplierName: 'Nube Roja Studio',
    specialty: 'Desarrollo de software',
    rating: 4.8,
    message:
      'Hemos hecho 6 apps de ruta similares. Proponemos un MVP en 10 semanas con catálogo offline desde el día uno.',
    quote: 790_000,
    status: 'submitted',
  },
  {
    id: 'prop-2',
    rfpId: 'rfp-own',
    supplierName: 'Cardinal Labs',
    specialty: 'Desarrollo de software',
    rating: 4.6,
    message:
      'Equipo de 12, especializado en React Native. Incluimos integración al ERP y 3 meses de soporte post-lanzamiento.',
    quote: 910_000,
    status: 'shortlisted',
  },
  {
    id: 'prop-3',
    rfpId: 'rfp-own',
    supplierName: 'Talleres Digitales MX',
    specialty: 'Desarrollo de software',
    rating: 4.3,
    message:
      'Podemos arrancar la próxima semana. Precio competitivo y un diseñador de producto dedicado durante todo el proyecto.',
    quote: 680_000,
    status: 'submitted',
  },
]

/** The client's own published RFP, shown at the top of their dashboard. */
export const MY_RFP: Rfp = {
  id: 'rfp-own',
  title: 'App móvil para fuerza de ventas en ruta',
  sector: 'Desarrollo de software',
  scope:
    'Necesitamos una app para que 40 vendedores levanten pedidos en ruta, funcione sin señal y sincronice con nuestro ERP.',
  budgetEstimate: 800_000,
  deadline: '2026-06-25',
  status: 'published',
  companyName: 'Mi Empresa',
}
