import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import papers from '@/assets/rfp-papers.avif'

/**
 * Hero: a rounded green->navy gradient card floating on the white page.
 * Copy + CTAs on the left, the RFP-papers illustration flying up on the right.
 * The papers are white-on-transparent, so they only read on the dark card.
 */
export function Hero() {
  const reduce = useReducedMotion()
  const rise = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
      }

  return (
    <section className="container-content pt-10 lg:pt-14">
      <div className="relative overflow-hidden rounded-hero bg-mint-hero shadow-hero">
        {/* grain + glow for depth, no hard split */}
        <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-mint/20 blur-[120px]" />

        <div className="grid items-center gap-8 p-8 sm:p-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-4 lg:p-16">
          <motion.div {...rise} className="flex flex-col items-start gap-6">
            <Badge tone="clientOnDark">
              Plataforma de licitación B2B · México
            </Badge>

            <h1 className="font-display text-[clamp(2.1rem,4.5vw,3.2rem)] font-bold leading-[1.1] tracking-headline text-white">
              Convierte tu idea en una{' '}
              <span className="text-mint-light">licitación profesional</span> en
              menos de 10 minutos
            </h1>

            <p className="max-w-md text-[1.02rem] leading-relaxed text-white/65">
              No te arriesgues con proveedores informales. Nuestra IA redacta tu
              RFP y lo publica en una red exclusiva de más de 1,000 proveedores
              validados.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link to="/cliente">
                <Button variant="client" size="lg">
                  Comenzar mi licitación gratis
                </Button>
              </Link>
              <Link to="/proveedor">
                <Button variant="ghostDark" size="lg">
                  Soy proveedor
                </Button>
              </Link>
            </div>

            <dl className="mt-2 flex flex-wrap gap-x-10 gap-y-3 border-t border-white/10 pt-5">
              <Stat value="+1,000" label="proveedores validados" />
              <Stat value="<10 min" label="para crear tu RFP" />
              <Stat value="100%" label="digital y gratis" />
            </dl>
          </motion.div>

          {/* The papers illustration, flying up. */}
          <motion.div
            {...(reduce
              ? {}
              : {
                  initial: { opacity: 0, scale: 0.96 },
                  animate: { opacity: 1, scale: 1 },
                  transition: {
                    duration: 0.8,
                    delay: 0.15,
                    ease: [0.16, 1, 0.3, 1] as const,
                  },
                })}
            className="relative flex justify-center"
          >
            <img
              src={papers}
              alt="Documentos de licitación elevándose"
              className={
                reduce
                  ? 'w-[260px] lg:w-[320px]'
                  : 'w-[260px] animate-float lg:w-[320px]'
              }
              width={480}
              height={718}
              loading="eager"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col">
      <dt className="font-display text-xl font-bold tracking-headline text-mint-light">
        {value}
      </dt>
      <dd className="text-sm text-white/50">{label}</dd>
    </div>
  )
}
