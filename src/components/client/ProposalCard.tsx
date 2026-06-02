import { useState } from 'react'
import { Star } from '@phosphor-icons/react'
import type { Proposal } from '@/lib/types'
import { cn, formatMXN } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

/**
 * A supplier's proposal, client-facing. Client world, so mint accents on the
 * primary action even though the proposal is from a supplier. Local select
 * state stands in for the shortlist/accept mutation.
 */
export function ProposalCard({ proposal }: { proposal: Proposal }) {
  const [chosen, setChosen] = useState(proposal.status === 'shortlisted')

  return (
    <article className="flex flex-col gap-4 rounded-card border border-hairline bg-navy-card p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <h3 className="font-display text-base font-semibold text-white">
            {proposal.supplierName}
          </h3>
          <Badge tone="supplier">{proposal.specialty}</Badge>
        </div>
        <span className="inline-flex items-center gap-1 text-sm text-white/80">
          <Star weight="fill" size={15} className="text-mint-light" />
          {proposal.rating.toFixed(1)}
        </span>
      </div>

      <p className="text-sm leading-relaxed text-muted">{proposal.message}</p>

      <div className="flex items-center justify-between border-t border-hairline pt-4">
        <div className="flex flex-col">
          <span className="text-xs text-faint">Propuesta</span>
          <span className="font-display text-lg font-semibold text-white">
            {formatMXN(proposal.quote)}
          </span>
        </div>
        <Button
          variant={chosen ? 'client' : 'ghost'}
          size="sm"
          onClick={() => setChosen((c) => !c)}
          className={cn(chosen && 'pointer-events-auto')}
        >
          {chosen ? 'Seleccionado' : 'Elegir proveedor'}
        </Button>
      </div>
    </article>
  )
}
