import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

/** Pill badges / eyebrows. Client = mint-tinted, supplier = indigo-tinted. */
const badge = cva(
  'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.08em]',
  {
    variants: {
      tone: {
        client: 'border-mint/30 bg-mint/15 text-mint-light',
        supplier: 'border-supplier/40 bg-supplier/20 text-supplier-light',
        neutral: 'border-hairline bg-white/5 text-muted',
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
