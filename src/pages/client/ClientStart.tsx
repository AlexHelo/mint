import { AppShell } from '@/components/site/AppShell'
import { RfpBuilderChat } from '@/components/client/RfpBuilderChat'

/** Client entry point: describe your project to the AI. */
export function ClientStart() {
  return (
    <AppShell audience="client">
      <div className="container-content py-12">
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <span className="eyebrow">Paso 1 de 3</span>
          <h1 className="headline mt-2 text-[clamp(1.6rem,3.5vw,2.2rem)]">
            Cuéntanos qué necesitas
          </h1>
          <p className="mt-3 text-ink-soft">
            Sin formularios técnicos. Describe tu idea y la IA arma la
            licitación por ti.
          </p>
        </div>
        <RfpBuilderChat />
      </div>
    </AppShell>
  )
}
