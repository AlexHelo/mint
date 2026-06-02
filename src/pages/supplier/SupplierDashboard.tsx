import { useState } from 'react'
import { CheckCircle, SealCheck } from '@phosphor-icons/react'
import { AppShell } from '@/components/site/AppShell'
import { RfpCard } from '@/components/RfpCard'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { OPEN_RFPS } from '@/data/mock'
import type { Rfp } from '@/lib/types'

/**
 * Supplier dashboard: licitaciones that match the supplier's profile.
 * (Matching is sector-overlap in v1, here we just show the open set.)
 * Applying opens a lightweight proposal panel; submit is mock.
 */
export function SupplierDashboard() {
  const [applyingTo, setApplyingTo] = useState<Rfp | null>(null)
  const [applied, setApplied] = useState<Set<string>>(new Set())

  function submitProposal() {
    if (!applyingTo) return
    setApplied((prev) => new Set(prev).add(applyingTo.id))
    setApplyingTo(null)
  }

  return (
    <AppShell audience="supplier">
      <div className="container-content py-12">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col items-start gap-2">
            <Badge tone="supplier">
              <SealCheck weight="fill" size={12} />
              Proveedor validado
            </Badge>
            <h1 className="headline text-[clamp(1.6rem,3.5vw,2.2rem)] text-white">
              Licitaciones para ti
            </h1>
            <p className="text-muted">
              Coinciden con tus especialidades. Aplica con tu propuesta.
            </p>
          </div>
          <span className="text-sm text-faint">
            {OPEN_RFPS.length} licitaciones abiertas
          </span>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {OPEN_RFPS.map((rfp) =>
            applied.has(rfp.id) ? (
              <AppliedCard key={rfp.id} rfp={rfp} />
            ) : (
              <RfpCard key={rfp.id} rfp={rfp} onApply={setApplyingTo} />
            ),
          )}
        </div>
      </div>

      {applyingTo && (
        <ApplyDialog
          rfp={applyingTo}
          onClose={() => setApplyingTo(null)}
          onSubmit={submitProposal}
        />
      )}
    </AppShell>
  )
}

function AppliedCard({ rfp }: { rfp: Rfp }) {
  return (
    <article className="flex flex-col items-center justify-center gap-3 rounded-card border border-supplier/30 bg-supplier/[0.08] p-5 text-center">
      <CheckCircle weight="fill" size={32} className="text-supplier-light" />
      <p className="font-medium text-white">Propuesta enviada</p>
      <p className="text-sm text-muted">{rfp.title}</p>
    </article>
  )
}

function ApplyDialog({
  rfp,
  onClose,
  onSubmit,
}: {
  rfp: Rfp
  onClose: () => void
  onSubmit: () => void
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-4 backdrop-blur-sm sm:items-center"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-card border border-hairline bg-navy-card p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="font-display text-lg font-semibold text-white">
          Aplicar a la licitación
        </h2>
        <p className="mt-1 text-sm text-muted">{rfp.title}</p>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            onSubmit()
          }}
          className="mt-5 flex flex-col gap-4"
        >
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-white/90">
              Tu propuesta
            </label>
            <textarea
              required
              rows={4}
              placeholder="Cuéntale al cliente por qué eres el indicado y qué incluye tu propuesta."
              className="w-full resize-none rounded-btn border border-hairline bg-navy-mid px-3.5 py-2.5 text-sm text-white placeholder:text-faint focus:border-supplier focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-white/90">
              Cotización (MXN)
            </label>
            <input
              required
              type="number"
              min={0}
              placeholder="790000"
              className="w-full rounded-btn border border-hairline bg-navy-mid px-3.5 py-2.5 text-sm text-white placeholder:text-faint focus:border-supplier focus:outline-none"
            />
          </div>
          <div className="flex justify-end gap-2 pt-1">
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" variant="supplier">
              Enviar propuesta
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
