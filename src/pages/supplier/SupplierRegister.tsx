import { AppShell } from '@/components/site/AppShell'
import { CompanyOnboarding } from '@/components/CompanyOnboarding'

/** Supplier onboarding: company profile + specialties. Validation comes after. */
export function SupplierRegister() {
  return (
    <AppShell audience="supplier">
      <div className="container-content py-12">
        <div className="mx-auto max-w-lg">
          <div className="mb-8">
            <span className="eyebrow text-supplier">Únete a la red</span>
            <h1 className="headline mt-2 text-[clamp(1.6rem,3.5vw,2.2rem)]">
              Crea tu perfil de proveedor
            </h1>
            <p className="mt-3 text-ink-soft">
              Completa los datos de tu empresa y tus especialidades. Validamos
              tu empresa antes de darte acceso a las licitaciones.
            </p>
          </div>
          <CompanyOnboarding audience="supplier" />
        </div>
      </div>
    </AppShell>
  )
}
