import { Link } from 'react-router-dom'
import {
  ArrowRight,
  ChatCircleDots,
  ClipboardText,
  ListChecks,
  PaperPlaneTilt,
  SealCheck,
  UsersThree,
} from '@phosphor-icons/react'
import type { Icon } from '@phosphor-icons/react'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/landing/Reveal'

interface Step {
  icon: Icon
  title: string
  desc: string
}

const CLIENT_STEPS: Step[] = [
  {
    icon: ChatCircleDots,
    title: 'Describe tu proyecto en un chat',
    desc: 'Cuéntale a la IA qué necesitas, como si se lo explicaras a alguien. Sin saber qué es un RFP.',
  },
  {
    icon: ClipboardText,
    title: 'La IA arma tu licitación',
    desc: 'En menos de 10 minutos tienes un RFP profesional: alcance, presupuesto, fecha.',
  },
  {
    icon: UsersThree,
    title: 'Elige al proveedor que más te convenga',
    desc: 'Recibe propuestas de proveedores validados y compáralas en igualdad de condiciones.',
  },
]

const SUPPLIER_STEPS: Step[] = [
  {
    icon: SealCheck,
    title: 'Valida tu empresa una vez',
    desc: 'Completa el perfil de tu empresa y tus especialidades. La validación es tu acceso a la red.',
  },
  {
    icon: ListChecks,
    title: 'Ve licitaciones que te quedan',
    desc: 'Tu dashboard te muestra las licitaciones que coinciden con tu perfil, no un mar de ruido.',
  },
  {
    icon: PaperPlaneTilt,
    title: 'Aplica con tu propuesta',
    desc: 'Presenta tu propuesta directo en la plataforma. Oportunidades reales con empresas verificadas.',
  },
]

/**
 * Two columns, mint world vs indigo world. Solid white cards with a colored
 * header band and real shadows, on a canvas-soft section so they stand out.
 */
export function TwoAudiences() {
  return (
    <section id="como-funciona" className="bg-canvas-soft py-20 lg:py-28">
      <div className="container-content">
        <Reveal className="mb-14 max-w-2xl">
          <h2 className="headline text-[clamp(1.8rem,3.5vw,2.6rem)]">
            Dos lados, una plataforma.
          </h2>
          <p className="mt-4 text-lg text-ink-soft">
            Verde para quien licita, azul para quien aplica. Cada quien ve solo
            lo suyo.
          </p>
        </Reveal>

        <div className="grid items-start gap-6 lg:grid-cols-2">
          <AudienceColumn
            tone="client"
            label="Para clientes"
            heading="Empresas que licitan"
            steps={CLIENT_STEPS}
            cta="Comenzar mi licitación gratis"
            href="/cliente"
          />
          <AudienceColumn
            tone="supplier"
            label="Para proveedores"
            heading="Empresas que aplican"
            steps={SUPPLIER_STEPS}
            cta="Unirme como proveedor"
            href="/proveedor"
          />
        </div>
      </div>
    </section>
  )
}

function AudienceColumn({
  tone,
  label,
  heading,
  steps,
  cta,
  href,
}: {
  tone: 'client' | 'supplier'
  label: string
  heading: string
  steps: Step[]
  cta: string
  href: string
}) {
  const isClient = tone === 'client'
  const band = isClient ? 'bg-mint-deep' : 'bg-supplier'
  const iconBox = isClient
    ? 'border-mint/30 bg-mint-wash text-mint-ink'
    : 'border-supplier/25 bg-supplier-wash text-supplier'

  return (
    <Reveal
      delay={isClient ? 0 : 0.12}
      className="group flex h-full flex-col overflow-hidden rounded-card border border-hairline bg-white shadow-card transition-shadow hover:shadow-lift"
    >
      {/* Colored header band: the audience's world, unmistakable */}
      <div className={`${band} px-8 pb-7 pt-8`}>
        <span className="text-[0.72rem] font-semibold uppercase tracking-eyebrow text-white/70">
          {label}
        </span>
        <h3 className="mt-1 font-display text-2xl font-bold tracking-headline text-white">
          {heading}
        </h3>
      </div>

      <div className="flex flex-1 flex-col gap-6 p-8">
        <ul className="flex flex-col gap-5">
          {steps.map((step, i) => (
            <li key={step.title} className="flex items-start gap-4">
              <span
                className={`relative mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${iconBox}`}
              >
                <step.icon size={20} weight="duotone" />
                <span
                  className={`absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full text-[0.65rem] font-bold ${isClient ? 'bg-mint text-[#001F0F]' : 'bg-supplier text-white'}`}
                >
                  {i + 1}
                </span>
              </span>
              <div className="flex flex-col gap-0.5">
                <p className="font-semibold text-ink">{step.title}</p>
                <p className="text-sm leading-relaxed text-ink-soft">
                  {step.desc}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <Link to={href} className="mt-auto">
          <Button
            variant={isClient ? 'client' : 'supplier'}
            size="lg"
            className="w-full"
          >
            {cta}
            <ArrowRight weight="bold" size={18} />
          </Button>
        </Link>
      </div>
    </Reveal>
  )
}
