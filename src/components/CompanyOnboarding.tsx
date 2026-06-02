import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SECTORS, type Sector } from '@/lib/types'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Field } from '@/components/ui/Field'

/**
 * Company onboarding, shared by both audiences. Captures the fields from the
 * product doc: nombre, giro, tamaño, razón social. Suppliers also pick
 * specialties. On submit it routes to the dashboard (mock; will write to
 * Supabase `companies` once tables land).
 */
export function CompanyOnboarding({
  audience,
}: {
  audience: 'client' | 'supplier'
}) {
  const navigate = useNavigate()
  const isClient = audience === 'client'
  const accent = isClient ? 'mint' : 'supplier'
  const [specialties, setSpecialties] = useState<Sector[]>([])

  function toggleSpecialty(s: Sector) {
    setSpecialties((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s],
    )
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    navigate(isClient ? '/cliente/panel' : '/proveedor/panel')
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <Field
        label="Nombre de la empresa"
        placeholder="Ej. Distribuidora del Bajío"
        accent={accent}
        required
      />
      <Field
        label={isClient ? 'Giro / a qué se dedican' : 'A qué se dedican'}
        placeholder={
          isClient ? 'Ej. Distribución de alimentos' : 'Ej. Desarrollo de software a la medida'
        }
        accent={accent}
        required
      />
      <div className="grid grid-cols-2 gap-4">
        <Field
          label="Número de empleados"
          type="number"
          min={1}
          placeholder="40"
          accent={accent}
          required
        />
        <Field
          label="Razón social"
          placeholder="Empresa S.A. de C.V."
          accent={accent}
          required
        />
      </div>

      {!isClient && (
        <fieldset className="flex flex-col gap-2.5">
          <legend className="mb-1 text-sm font-medium text-white/90">
            Especialidades tech
          </legend>
          <div className="flex flex-wrap gap-2">
            {SECTORS.map((s) => {
              const on = specialties.includes(s)
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => toggleSpecialty(s)}
                  aria-pressed={on}
                  className={cn(
                    'rounded-full border px-3.5 py-1.5 text-sm transition-colors',
                    on
                      ? 'border-supplier bg-supplier/20 text-supplier-light'
                      : 'border-hairline text-muted hover:border-white/30 hover:text-white',
                  )}
                >
                  {s}
                </button>
              )
            })}
          </div>
        </fieldset>
      )}

      <Button
        type="submit"
        variant={isClient ? 'client' : 'supplier'}
        size="lg"
        className="mt-2"
      >
        {isClient ? 'Crear empresa y continuar' : 'Crear perfil de proveedor'}
      </Button>
    </form>
  )
}
