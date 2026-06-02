import { cva, type VariantProps } from 'class-variance-authority'
import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

/**
 * Button variants from the design doc. The duality is enforced here:
 * `client` is mint green, `supplier` is indigo. Pick by audience, never mix.
 */
const button = cva(
  'inline-flex items-center justify-center gap-2 rounded-btn font-sans font-medium ' +
    'transition-all duration-150 active:translate-y-px disabled:pointer-events-none disabled:opacity-50 ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-navy',
  {
    variants: {
      variant: {
        // Client / primary action. Dark green text on mint, per spec.
        client:
          'bg-mint text-[#001F0F] hover:opacity-90 focus-visible:ring-mint',
        // Supplier action.
        supplier:
          'bg-supplier-btn text-white hover:bg-supplier-btn-hover focus-visible:ring-supplier',
        // Ghost / secondary on dark.
        ghost:
          'border border-hairline-strong bg-transparent text-white/70 hover:border-white/50 hover:text-white focus-visible:ring-white/40',
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
