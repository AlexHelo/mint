import { forwardRef, useId } from 'react'
import { cn } from '@/lib/utils'

/**
 * Labeled input. Label ABOVE the field, never placeholder-as-label (taste rule).
 * Focus ring tone is set by the audience accent via the `accent` prop.
 */
interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  hint?: string
  accent?: 'mint' | 'supplier'
}

export const Field = forwardRef<HTMLInputElement, FieldProps>(
  ({ label, hint, accent = 'mint', className, ...props }, ref) => {
    const id = useId()
    const ring =
      accent === 'mint' ? 'focus:border-mint' : 'focus:border-supplier'
    return (
      <div className="flex flex-col gap-2">
        <label htmlFor={id} className="text-sm font-medium text-white/90">
          {label}
        </label>
        <input
          id={id}
          ref={ref}
          className={cn(
            'w-full rounded-btn border border-hairline bg-navy-mid px-3.5 py-2.5 text-[0.95rem] text-white',
            'placeholder:text-faint transition-colors focus:outline-none',
            ring,
            className,
          )}
          {...props}
        />
        {hint ? <p className="text-xs text-faint">{hint}</p> : null}
      </div>
    )
  },
)
Field.displayName = 'Field'
