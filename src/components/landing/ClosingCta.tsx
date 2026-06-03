import { Link } from 'react-router-dom'
import { ArrowRight } from '@phosphor-icons/react'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/landing/Reveal'

/**
 * Closing CTA: a green->navy gradient panel with the grid texture and sharp
 * corner accent brackets (precise, structural). The final push to convert,
 * so the CTA cluster is the focus: primary action + a quiet supplier path.
 */
export function ClosingCta() {
  return (
    <section className="container-content pb-20 lg:pb-28">
      <div className="relative overflow-hidden rounded-hero bg-mint-hero px-8 py-20 shadow-panel sm:px-16">
        {/* grid texture for structure */}
        <div
          className="pointer-events-none absolute inset-0 bg-grid bg-[length:48px_48px] opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]"
          aria-hidden
        />
        {/* sharp corner brackets, top-left and bottom-right */}
        <CornerBracket className="left-5 top-5 border-l-2 border-t-2" />
        <CornerBracket className="bottom-5 right-5 border-b-2 border-r-2" />

        <Reveal className="relative mx-auto flex max-w-2xl flex-col items-center gap-7 text-center">
          <span className="text-xs font-semibold uppercase tracking-eyebrow text-mint-light">
            Empieza hoy
          </span>

          <h2 className="font-display text-[clamp(1.9rem,4vw,3rem)] font-bold leading-[1.08] tracking-headline text-white">
            Deja de adivinar a quién contratar.
          </h2>

          <p className="max-w-lg text-lg text-white/70">
            La IA arma tu licitación y la publica ante más de 1,000 proveedores
            verificados. Decide con datos, no con referencias.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <Link to="/cliente">
              <Button variant="client" size="xl">
                Empezar gratis
                <ArrowRight weight="bold" size={18} />
              </Button>
            </Link>
            <Link
              to="/proveedor"
              className="text-sm font-medium text-white/70 underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              Soy proveedor
            </Link>
          </div>

          <p className="text-sm text-white/40">
            Gratis para publicar. Sin tarjeta.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

function CornerBracket({ className }: { className: string }) {
  return (
    <span
      className={`pointer-events-none absolute h-10 w-10 border-mint-light/40 ${className}`}
      aria-hidden
    />
  )
}
