/**
 * Domain types, mirrors the schema in "Mint - System Design.md".
 * These are the shapes the UI works with. When Supabase tables land,
 * the generated DB types feed these through the services layer.
 */

export type CompanyType = 'client' | 'supplier' | 'both'
export type ProfileRole = 'client' | 'supplier'
export type ValidationStatus = 'pending' | 'validated' | 'rejected'
export type RfpStatus = 'draft' | 'published' | 'awarded' | 'closed' | 'cancelled'
export type ProposalStatus = 'submitted' | 'shortlisted' | 'accepted' | 'rejected'

/** The controlled vocabulary shared by rfp.sector and supplier specialties. */
export const SECTORS = [
  'Desarrollo de software',
  'IA y datos',
  'Ciberseguridad',
  'CRM',
  'Infraestructura cloud',
] as const
export type Sector = (typeof SECTORS)[number]

export interface Company {
  id: string
  legalName: string
  displayName: string
  type: CompanyType
  industry: string
  employeeCount: number
  validationStatus?: ValidationStatus
  specialties?: Sector[]
}

export interface Rfp {
  id: string
  title: string
  sector: Sector
  scope: string
  budgetEstimate: number
  deadline: string
  status: RfpStatus
  companyName: string
}

export interface Proposal {
  id: string
  rfpId: string
  supplierName: string
  specialty: Sector
  rating: number
  message: string
  quote: number
  status: ProposalStatus
}
