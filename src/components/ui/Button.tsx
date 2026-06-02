import { cva, type VariantProps } from 'class-variance-authority'
import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

/**
 * Button variants. The duality is enforced here: `client` is mint green,
 * `supplier` is indigo. Pick by audience, never mix.
 * `ghost` is for light surfaces; `ghostDark` for the dark gradient hero.
 * Filled CTAs lift on hover (tactile, makes the primary action feel primary).
 */
const button = cva(
  'inline-flex items-center justify-center gap-2 rounded-btn font-sans font-medium ' +
    'transition-all duration-150 active:translate-y-0 disabled:pointer-events-none disabled:opacity-50 ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        // Client / primary action. Dark green text on mint, with a green-tinted lift.
        client:
          'bg-mint text-[#001F0F] shadow-[0_4px_14px_rgba(0,135,90,0.30)] hover:bg-mint-light hover:-translate-y-0.5 hover:shadow-[0_8px_22px_rgba(0,135,90,0.38)] focus-visible:ring-mint-ink focus-visible:ring-offset-canvas',
        // Supplier action, with an indigo-tinted lift.
        supplier:
          'bg-supplier text-white shadow-[0_4px_14px_rgba(45,76,200,0.30)] hover:bg-supplier-hover hover:-translate-y-0.5 hover:shadow-[0_8px_22px_rgba(45,76,200,0.38)] focus-visible:ring-supplier focus-visible:ring-offset-canvas',
        // Ghost on a light surface.
        ghost:
          'border border-hairline bg-white text-ink-soft hover:border-ink-mute hover:text-ink focus-visible:ring-ink-mute focus-visible:ring-offset-canvas',
        // Ghost on the dark gradient hero.
        ghostDark:
          'border border-white/25 bg-transparent text-white/85 hover:border-white/60 hover:text-white focus-visible:ring-white/50 focus-visible:ring-offset-navy',
      },
      size: {
        sm: 'px-3.5 py-2 text-[0.8rem]',
        md: 'px-[1.4rem] py-[0.7rem] text-[0.88rem]',
        lg: 'px-7 py-3.5 text-base',
        xl: 'px-8 py-4 text-[1.05rem]',
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
