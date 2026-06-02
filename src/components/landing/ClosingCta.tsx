import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/landing/Reveal'

/** Closing CTA: a solid green client card on white. Centered. */
export function ClosingCta() {
  return (
    <section className="container-content pb-20 lg:pb-28">
      <div className="relative overflow-hidden rounded-hero bg-mint-deep px-8 py-20 text-center shadow-hero">
        <Reveal className="mx-auto flex max-w-2xl flex-col items-center gap-6">
          <h2 className="font-display text-[clamp(1.8rem,4vw,2.8rem)] font-bold leading-[1.1] tracking-headline text-white">
            No te arriesgues con proveedores informales.
          </h2>
          <p className="max-w-lg text-lg text-white/65">
            Publica tu primera licitación gratis y recibe propuestas de una red
            exclusiva de proveedores validados.
          </p>
          <Link to="/cliente">
            <Button variant="client" size="xl">
              Empezar gratis
            </Button>
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
