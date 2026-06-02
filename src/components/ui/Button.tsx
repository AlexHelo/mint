import { cva, type VariantProps } from 'class-variance-authority'
import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

/**
 * Button variants. The duality is enforced here: `client` is mint green,
 * `supplier` is indigo. Pick by audience, never mix.
 * `ghost` is for light surfaces; `ghostDark` for the dark gradient hero card.
 */
const button = cva(
  'inline-flex items-center justify-center gap-2 rounded-btn font-sans font-medium ' +
    'transition-all duration-150 active:translate-y-px disabled:pointer-events-none disabled:opacity-50 ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        // Client / primary action. Dark green text on mint, per spec.
        client:
          'bg-mint text-[#001F0F] hover:bg-mint-light focus-visible:ring-mint-ink focus-visible:ring-offset-canvas',
        // Supplier action.
        supplier:
          'bg-supplier text-white hover:bg-supplier-hover focus-visible:ring-supplier focus-visible:ring-offset-canvas',
        // Ghost on a light surface.
        ghost:
          'border border-hairline bg-white text-ink-soft hover:border-ink-mute hover:text-ink focus-visible:ring-ink-mute focus-visible:ring-offset-canvas',
        // Ghost on the dark gradient hero card.
        ghostDark:
          'border border-white/25 bg-transparent text-white/85 hover:border-white/60 hover:text-white focus-visible:ring-white/50 focus-visible:ring-offset-navy',
      },
      size: {
        md: 'px-[1.4rem] py-[0.7rem] text-[0.88rem]',
        lg: 'px-7 py-3.5 text-base',
        sm: 'px-3.5 py-2 text-[0.8rem]',
      },
    },
    defaultVariants: { variant: 'client', size: 'md' },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(button({ variant, size }), className)}
      {...props}
    />
  ),
)
Button.displayName = 'Button'
