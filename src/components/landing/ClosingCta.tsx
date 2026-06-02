import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/landing/Reveal'

/** Full-width closing CTA on the gradient. Different layout family: centered. */
export function ClosingCta() {
  return (
    <section className="bg-mint-hero">
      <div className="container-content py-24 text-center">
        <Reveal className="mx-auto flex max-w-2xl flex-col items-center gap-6">
          <h2 className="headline text-[clamp(1.8rem,4vw,2.8rem)] text-white">
            No te arriesgues con proveedores informales.
          </h2>
          <p className="max-w-lg text-lg text-white/60">
            Publica tu primera licitación gratis y recibe propuestas de una red
            exclusiva de proveedores validados.
          </p>
          <Link to="/cliente">
            <Button variant="client" size="lg">
              Empezar gratis
            </Button>
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
