import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { RfpCard } from '@/components/RfpCard'
import { OPEN_RFPS } from '@/data/mock'

/**
 * Asymmetric split hero on the signature green->navy gradient.
 * Right side is a real RfpCard (the actual product), not a div mockup.
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
    <section className="relative overflow-hidden bg-mint-hero">
      {/* soft glow to add depth without a hard split */}
      <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-mint/20 blur-[120px]" />

      <div className="container-content grid items-center gap-12 py-20 lg:grid-cols-2 lg:py-28">
        <motion.div {...rise} className="flex flex-col items-start gap-6">
          <Badge tone="client">Plataforma de licitación B2B · México</Badge>

          <h1 className="headline text-[clamp(2.2rem,5vw,3.4rem)] text-white">
            Licita tu proyecto de tecnología{' '}
            <em className="not-italic text-mint-light">sin riesgo</em>.
          </h1>

          <p className="max-w-md text-[1.05rem] leading-relaxed text-white/60">
            Describe tu idea, deja que la IA arme tu licitación profesional, y
            recibe propuestas de proveedores validados en menos de 10 minutos.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Link to="/cliente">
              <Button variant="client" size="lg">
                Comenzar mi licitación gratis
              </Button>
            </Link>
            <Link to="/proveedor">
              <Button variant="ghost" size="lg">
                Soy proveedor
              </Button>
            </Link>
          </div>

          <dl className="mt-2 flex flex-wrap gap-x-10 gap-y-3">
            <Stat value="+1,000" label="proveedores validados" />
            <Stat value="<10 min" label="para publicar" />
            <Stat value="100%" label="digital" />
          </dl>
        </motion.div>

        {/* Real product preview: the supplier-facing RFP card, floating. */}
        <motion.div
          {...(reduce
            ? {}
            : {
                initial: { opacity: 0, y: 30 },
                animate: { opacity: 1, y: 0 },
                transition: {
                  duration: 0.7,
                  delay: 0.15,
                  ease: [0.16, 1, 0.3, 1] as const,
                },
              })}
          className="relative mx-auto w-full max-w-md"
        >
          <div className={reduce ? undefined : 'animate-float'}>
            <RfpCard rfp={OPEN_RFPS[0]} static />
          </div>
          <div className="absolute -right-4 -top-5 -z-10 h-full w-full rounded-card border border-hairline bg-navy-card/40" />
        </motion.div>
      </div>
    </section>
  )
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col">
      <dt className="font-display text-xl font-bold tracking-headline text-white">
        {value}
      </dt>
      <dd className="text-sm text-white/50">{label}</dd>
    </div>
  )
}
