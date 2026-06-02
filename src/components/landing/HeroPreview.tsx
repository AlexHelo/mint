import { Check, Star } from '@phosphor-icons/react'
import { formatMXN } from '@/lib/utils'

/**
 * Hero product preview: a sharp-cornered panel showing the real thing a
 * client gets, supplier proposals on one RFP, ranked and comparable. This is
 * the Stripe move (show the product, not an illustration). Static, precise.
 */
const ROWS = [
  { name: 'Nube Roja Studio', rating: 4.8, quote: 790_000, best: true },
  { name: 'Cardinal Labs', rating: 4.6, quote: 910_000, best: false },
  { name: 'Talleres Digitales MX', rating: 4.3, quote: 680_000, best: false },
]

export function HeroPreview() {
  return (
    <div className="w-full max-w-md rounded-hero border border-white/10 bg-white shadow-panel">
      {/* window chrome */}
      <div className="flex items-center gap-2 border-b border-hairline px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-hairline" />
        <span className="h-2.5 w-2.5 rounded-full bg-hairline" />
        <span className="h-2.5 w-2.5 rounded-full bg-hairline" />
        <span className="ml-2 font-sans text-xs text-ink-mute">
          App móvil para fuerza de ventas
        </span>
      </div>

      <div className="flex flex-col gap-3 p-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-eyebrow text-mint-ink">
            3 propuestas
          </span>
          <span className="rounded-sm bg-mint-wash px-2 py-0.5 text-[0.7rem] font-semibold text-mint-ink">
            Publicada
          </span>
        </div>

        {ROWS.map((r) => (
          <div
            key={r.name}
            className={`flex items-center justify-between rounded-md border p-3 ${
              r.best ? 'border-mint/40 bg-mint-wash/50' : 'border-hairline'
            }`}
          >
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-semibold text-ink">{r.name}</span>
                {r.best && (
                  <span className="inline-flex items-center gap-0.5 rounded-sm bg-mint px-1.5 py-0.5 text-[0.6rem] font-bold text-[#001F0F]">
                    <Check weight="bold" size={9} />
                    MEJOR
                  </span>
                )}
              </div>
              <span className="inline-flex items-center gap-1 text-xs text-ink-mute">
                <Star weight="fill" size={11} className="text-mint-ink" />
                {r.rating.toFixed(1)}
              </span>
            </div>
            <span className="font-display text-sm font-bold tabular-nums text-ink">
              {formatMXN(r.quote)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
