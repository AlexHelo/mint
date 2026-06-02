import { forwardRef, useId } from 'react'
import { cn } from '@/lib/utils'

/**
 * Labeled input. Label ABOVE the field, never placeholder-as-label.
 * Focus ring tone is set by the audience accent. Light surface.
 */
interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  hint?: string
  accent?: 'mint' | 'supplier'
}

export const Field = forwardRef<HTMLInputElement, FieldProps>(
  ({ label, hint, accent = 'mint', className, ...props }, ref) => {
    const id = useId()
    const focus =
      accent === 'mint'
        ? 'focus:border-mint-ink focus:ring-mint/20'
        : 'focus:border-supplier focus:ring-supplier/20'
    return (
      <div className="flex flex-col gap-2">
        <label htmlFor={id} className="text-sm font-medium text-ink">
          {label}
        </label>
        <input
          id={id}
          ref={ref}
          className={cn(
            'w-full rounded-btn border border-hairline bg-white px-3.5 py-2.5 text-[0.95rem] text-ink',
            'placeholder:text-ink-mute/70 transition-colors focus:outline-none focus:ring-4',
            focus,
            className,
          )}
          {...props}
        />
        {hint ? <p className="text-xs text-ink-mute">{hint}</p> : null}
      </div>
    )
  },
)
Field.displayName = 'Field'
