import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from '@phosphor-icons/react'
import { motion, useReducedMotion } from 'motion/react'
import { Navbar } from '@/components/site/Navbar'
import { Button } from '@/components/ui/Button'
import { HeroPreview } from '@/components/landing/HeroPreview'

/**
 * Hero: a controlled green->navy gradient band with a fine grid texture
 * (structure, not noise), nav transparent over it, value-first copy, and a
 * real product preview on the right. Sharp corners, finance-precise.
 * No fake stats, no jargon eyebrow.
 */
export function Hero() {
  const reduce = useReducedMotion()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')

  const rise = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
      }

  return (
    <div className="relative overflow-hidden bg-mint-hero">
      {/* fine grid texture for structure */}
      <div className="pointer-events-none absolute inset-0 bg-grid bg-[length:48px_48px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]" />
      {/* crisp hairline at the bottom where the band meets the white page */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-white/10" />

      <Navbar onDark />

      <section className="container-content relative z-10 grid items-center gap-12 pb-20 pt-12 lg:grid-cols-[1fr_1fr] lg:gap-10 lg:pb-28 lg:pt-20">
        <motion.div {...rise} className="flex flex-col items-start gap-6">
          <h1 className="font-display text-[clamp(2.6rem,5.2vw,4rem)] font-bold leading-[1.04] tracking-headline text-white">
            Contrata tecnología,{' '}
            <span className="text-mint-light">sin adivinar</span>.
          </h1>

          <p className="max-w-md text-[1.05rem] leading-relaxed text-white/70">
            Describe tu proyecto y nuestra IA arma la licitación. Recíbela ante
            más de 1,000 proveedores verificados y compara precio, experiencia y
            reputación en un solo lugar.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              navigate('/cliente')
            }}
            className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@empresa.com"
              aria-label="Correo de tu empresa"
              className="min-w-0 flex-1 rounded-btn border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/50 backdrop-blur-md focus:border-white/60 focus:outline-none focus:ring-4 focus:ring-white/10"
            />
            <Button type="submit" variant="client" size="xl" className="shrink-0">
              Empezar gratis
              <ArrowRight weight="bold" size={18} />
            </Button>
          </form>

          <p className="text-sm text-white/45">
            Gratis para publicar. Sin tarjeta. Tu primera licitación en minutos.
          </p>
        </motion.div>

        {/* Real product preview */}
        <motion.div
          {...(reduce
            ? {}
            : {
                initial: { opacity: 0, y: 24 },
                animate: { opacity: 1, y: 0 },
                transition: {
                  duration: 0.6,
                  delay: 0.12,
                  ease: [0.16, 1, 0.3, 1] as const,
                },
              })}
          className="flex justify-center lg:justify-end"
        >
          <HeroPreview />
        </motion.div>
      </section>
    </div>
  )
}
