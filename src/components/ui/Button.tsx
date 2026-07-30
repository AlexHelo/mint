import { cva, type VariantProps } from 'class-variance-authority'
import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

/**
 * Button variants. The duality is enforced here: `client` is mint,
 * `supplier` is indigo. Pick by audience, never mix.
 * Brand posture (docs/marca.md §5): no decorative resting shadows; hover
 * darkens. Mint surfaces carry white text on the AA-safe mint-ink shade.
 * `ghost` is for light surfaces; `ghostDark` for dark navy surfaces.
 */
export const buttonStyles = cva(
  'inline-flex items-center justify-center gap-2 rounded-btn font-sans font-medium ' +
    'transition-colors duration-150 disabled:pointer-events-none disabled:opacity-50 ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        // Client / primary action: white on mint-ink (AA on white canvas).
        client:
          'bg-mint-ink text-white hover:bg-mint-deep focus-visible:ring-mint-ink focus-visible:ring-offset-canvas',
        // Client CTA on dark navy surfaces: the bright brand mint pops.
        clientDark:
          'bg-mint text-[#04291C] hover:bg-mint-light focus-visible:ring-mint focus-visible:ring-offset-navy',
        // Supplier action: indigo.
        supplier:
          'bg-supplier text-white hover:bg-[#243da0] focus-visible:ring-supplier focus-visible:ring-offset-canvas',
        // Ghost on a light surface.
        ghost:
          'border border-hairline bg-white text-ink-soft hover:border-ink-mute hover:text-ink focus-visible:ring-ink-mute focus-visible:ring-offset-canvas',
        // Ghost on dark navy surfaces (landing CTA final).
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
    VariantProps<typeof buttonStyles> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonStyles({ variant, size }), className)}
      {...props}
    />
  ),
)
Button.displayName = 'Button'
