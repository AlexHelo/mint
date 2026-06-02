import { cn } from '@/lib/utils'

/**
 * Mint wordmark. A simple mint-green dot + "Mint" in display type.
 * Single geometric mark, which the taste skill allows for an invented brand.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 font-display text-lg font-700 font-semibold tracking-headline text-white',
        className,
      )}
    >
      <span className="h-2.5 w-2.5 rounded-full bg-mint shadow-[0_0_12px_rgba(0,224,144,0.6)]" />
      Mint
    </span>
  )
}
