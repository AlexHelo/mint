import { Link } from 'react-router-dom'
import {
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

/** Two columns, mint world vs indigo world. The duality, literal. Light cards. */
export function TwoAudiences() {
  return (
    <section id="como-funciona" className="py-20 lg:py-28">
      <div className="container-content">
        <Reveal className="mb-14 max-w-2xl">
          <h2 className="headline text-[clamp(1.7rem,3.5vw,2.4rem)]">
            Dos lados, una plataforma.
          </h2>
          <p className="mt-4 text-lg text-ink-soft">
            Verde para quien licita, azul para quien aplica. Cada quien ve solo
            lo suyo.
          </p>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-2">
          <AudienceColumn
            tone="client"
            label="Para clientes"
            heading="Empresas que licitan"
            steps={CLIENT_STEPS}
            cta={
              <Link to="/cliente">
                <Button variant="client">Comenzar mi licitación gratis</Button>
              </Link>
            }
          />
          <AudienceColumn
            tone="supplier"
            label="Para proveedores"
            heading="Empresas que aplican"
            steps={SUPPLIER_STEPS}
            cta={
              <Link to="/proveedor">
                <Button variant="supplier">Unirme como proveedor</Button>
              </Link>
            }
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
}: {
  tone: 'client' | 'supplier'
  label: string
  heading: string
  steps: Step[]
  cta: React.ReactNode
}) {
  const isClient = tone === 'client'
  const accentText = isClient ? 'text-mint-ink' : 'text-supplier'
  const iconBox = isClient
    ? 'border-mint/30 bg-mint-wash text-mint-ink'
    : 'border-supplier/25 bg-supplier-wash text-supplier'
  const surface = isClient
    ? 'border-mint/25 bg-mint-wash/40'
    : 'border-supplier/20 bg-supplier-wash/50'

  return (
    <Reveal
      delay={isClient ? 0 : 0.1}
      className={`flex flex-col gap-7 rounded-card border ${surface} p-8`}
    >
      <div className="flex flex-col gap-1">
        <span className={`eyebrow ${accentText}`}>{label}</span>
        <h3 className="font-display text-xl font-semibold text-ink">
          {heading}
        </h3>
      </div>

      <ul className="flex flex-col gap-5">
        {steps.map((step) => (
          <li key={step.title} className="flex items-start gap-3.5">
            <span
              className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${iconBox}`}
            >
              <step.icon size={18} weight="duotone" />
            </span>
            <div className="flex flex-col gap-0.5">
              <p className="font-medium text-ink">{step.title}</p>
              <p className="text-sm leading-relaxed text-ink-soft">
                {step.desc}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-auto">{cta}</div>
    </Reveal>
  )
}
