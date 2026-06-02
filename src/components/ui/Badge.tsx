import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

/**
 * Pill badges / tags. Client = mint-tinted, supplier = indigo-tinted.
 * `onDark` variants are for use inside the dark gradient hero card.
 */
const badge = cva(
  'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.08em]',
  {
    variants: {
      tone: {
        client: 'border-mint/30 bg-mint-wash text-mint-ink',
        supplier: 'border-supplier/25 bg-supplier-wash text-supplier',
        neutral: 'border-hairline bg-canvas-soft text-ink-mute',
        clientOnDark: 'border-mint/30 bg-mint/15 text-mint-light',
      },
    },
    defaultVariants: { tone: 'client' },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badge> {}

export function Badge({ className, tone, ...props }: BadgeProps) {
  return <span className={cn(badge({ tone }), className)} {...props} />
}
