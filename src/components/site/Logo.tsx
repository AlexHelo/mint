import { Cube } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

/**
 * Mint wordmark: a mint-green rounded square with a glyph, plus "Mint".
 * `onDark` flips the text to white for use on the gradient hero card.
 */
export function Logo({
  className,
  onDark,
}: {
  className?: string
  onDark?: boolean
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 font-display text-lg font-bold tracking-headline',
        onDark ? 'text-white' : 'text-ink',
        className,
      )}
    >
      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-mint">
        <Cube weight="bold" size={16} className="text-[#001F0F]" />
      </span>
      Mint
    </span>
  )
}
