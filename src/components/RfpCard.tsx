import { CalendarBlank, CurrencyDollar, Tag } from '@phosphor-icons/react'
import type { Rfp } from '@/lib/types'
import { cn, formatMXN, relativeDays } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

/**
 * A single licitación, supplier-facing. This is a real product component,
 * reused as the hero visual (so the landing shows the actual product, not a
 * div mockup) and on the supplier dashboard. Supplier-world, so indigo accents.
 */
export function RfpCard({
  rfp,
  onApply,
  className,
  static: isStatic,
}: {
  rfp: Rfp
  onApply?: (rfp: Rfp) => void
  className?: string
  static?: boolean
}) {
  return (
    <article
      className={cn(
        'flex flex-col gap-4 rounded-card border border-hairline bg-navy-card p-5 transition-colors',
        !isStatic &&
          'hover:border-supplier/40 hover:bg-supplier/[0.06]',
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <Badge tone="supplier">
          <Tag weight="fill" size={11} />
          {rfp.sector}
        </Badge>
        <span className="shrink-0 text-xs text-faint">
          Cierra {relativeDays(rfp.deadline)}
        </span>
      </div>

      <div className="flex flex-col gap-1.5">
        <h3 className="font-display text-[1.05rem] font-semibold leading-snug text-white">
          {rfp.title}
        </h3>
        <p className="text-sm leading-relaxed text-muted line-clamp-2">
          {rfp.scope}
        </p>
      </div>

      <div className="mt-auto flex items-center gap-5 border-t border-hairline pt-4 text-sm">
        <span className="inline-flex items-center gap-1.5 text-white/80">
          <CurrencyDollar size={16} className="text-supplier-light" />
          {formatMXN(rfp.budgetEstimate)}
        </span>
        <span className="inline-flex items-center gap-1.5 text-white/60">
          <CalendarBlank size={16} className="text-supplier-light" />
          {new Date(rfp.deadline).toLocaleDateString('es-MX', {
            day: 'numeric',
            month: 'short',
          })}
        </span>
      </div>

      {onApply ? (
        <Button variant="supplier" size="sm" onClick={() => onApply(rfp)}>
          Aplicar con propuesta
        </Button>
      ) : null}
    </article>
  )
}
