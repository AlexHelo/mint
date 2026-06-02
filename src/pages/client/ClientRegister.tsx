import { AppShell } from '@/components/site/AppShell'
import { CompanyOnboarding } from '@/components/CompanyOnboarding'

/** Client company onboarding (step 2): captured after the chat. */
export function ClientRegister() {
  return (
    <AppShell audience="client">
      <div className="container-content py-12">
        <div className="mx-auto max-w-lg">
          <div className="mb-8">
            <span className="eyebrow">Paso 2 de 3</span>
            <h1 className="headline mt-2 text-[clamp(1.6rem,3.5vw,2.2rem)] text-white">
              Registra tu empresa
            </h1>
            <p className="mt-3 text-muted">
              Esta información queda vinculada a tu perfil. La usamos una sola
              vez.
            </p>
          </div>
          <CompanyOnboarding audience="client" />
        </div>
      </div>
    </AppShell>
  )
}
