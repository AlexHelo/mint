import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from '@phosphor-icons/react'
import { motion, useReducedMotion } from 'motion/react'
import { MeshGradient } from '@paper-design/shaders-react'
import { Navbar } from '@/components/site/Navbar'
import { Button } from '@/components/ui/Button'
import { HeroPapers } from '@/components/landing/HeroPapers'

/**
 * Hero on a live animated mesh gradient (paper-design shaders), in Mint's
 * palette: navy base woven with mint green and indigo. The mesh is the one
 * place both worlds coexist (the landing serves both); strict green/blue
 * duality resumes per-audience deeper in the app.
 *
 * Nav sits transparent over the mesh. Diagonal cut reveals the white page.
 * Reduced-motion freezes the shader (speed 0).
 */
export function Hero() {
  const reduce = useReducedMotion()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')

  const rise = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
      }

  // Mint palette mesh: navy base, mint green, deep green, indigo.
  const meshColors = ['#0A1628', '#006644', '#00C07A', '#0F2040', '#2D4CC8']

  return (
    <div className="relative">
      {/* Live mesh gradient, clipped to a diagonal bottom edge. */}
      <div
        className="absolute inset-0 overflow-hidden bg-navy"
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 92%, 0 100%)' }}
        aria-hidden
      >
        <MeshGradient
          className="absolute inset-0 h-full w-full"
          colors={meshColors}
          speed={reduce ? 0 : 0.3}
          distortion={0.8}
          swirl={0.6}
        />
        {/* second layer adds depth and the brighter accents */}
        <MeshGradient
          className="absolute inset-0 h-full w-full opacity-50"
          colors={['#0A1628', '#00E090', '#0A1628', '#4A70E0']}
          speed={reduce ? 0 : 0.2}
          distortion={1}
          swirl={0.3}
        />
        {/* darken the lower-left so the headline stays legible over the mesh */}
        <div className="absolute inset-0 bg-gradient-to-tr from-navy/85 via-navy/35 to-transparent" />
      </div>

      {/* Nav sits over the mesh */}
      <Navbar onDark />

      {/* Hero content. pb accounts for the diagonal reveal. */}
      <section className="container-content relative z-10 grid items-center gap-8 pb-32 pt-10 sm:pb-40 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6 lg:pb-44 lg:pt-16">
        <motion.div {...rise} className="flex flex-col items-start gap-6">
          <p className="eyebrow text-mint-light">
            Plataforma de licitación B2B · México
          </p>

          <h1 className="font-display text-[clamp(2.6rem,5.5vw,4rem)] font-bold leading-[1.05] tracking-headline text-white">
            Convierte tu idea en una{' '}
            <span className="text-mint-light">licitación profesional</span>
          </h1>

          <p className="max-w-md text-[1.05rem] leading-relaxed text-white/70">
            No te arriesgues con proveedores informales. Nuestra IA redacta tu
            RFP y lo publica en una red exclusiva de más de 1,000 proveedores
            validados, en menos de 10 minutos.
          </p>

          {/* Inline email capture */}
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

          <p className="text-sm text-white/50">
            Gratis para publicar. Sin tarjeta. Tu primera licitación en 10
            minutos.
          </p>

          <dl className="mt-2 flex flex-wrap gap-x-10 gap-y-3 border-t border-white/15 pt-5">
            <Stat value="+1,000" label="proveedores validados" />
            <Stat value="<10 min" label="para crear tu RFP" />
            <Stat value="100%" label="digital y gratis" />
          </dl>
        </motion.div>

        {/* Papers illustration, bleeding toward the right edge */}
        <HeroPapers />
      </section>
    </div>
  )
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col">
      <dt className="font-display text-xl font-bold tracking-headline text-mint-light">
        {value}
      </dt>
      <dd className="text-sm text-white/55">{label}</dd>
    </div>
  )
}
