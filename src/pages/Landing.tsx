import { ArrowRight, Asterisk, Bank, ChatCircleText, Files, Kanban, Scales, SealCheck, Sparkle, Storefront, UsersThree } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import { Folio } from '@/components/brand/Folio'
import { Reveal } from '@/components/landing/Reveal'
import { buttonStyles } from '@/components/ui/Button'
import { cn, formatMXN } from '@/lib/utils'

/**
 * Landing (docs/landing-brief.md + marca.md), designed with layout rhythm
 * instead of stacked strips: asymmetric hero -> zigzag product showcase ->
 * borderless capability strip -> ONE split panel for the two sides (the
 * brand moment) -> trust -> navy close. Mint = empresas, indigo =
 * proveedores; the deal gradient appears exactly once (the panel seam).
 */

const DEAL_GRADIENT =
  'linear-gradient(180deg, #00C07A 0%, #00C07A 38%, #2D4CC8 62%, #2D4CC8 100%)'

/* ---------- shared frame for product recreations ---------- */

function Frame({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('overflow-hidden rounded-[12px] border border-hairline bg-white shadow-card', className)}>
      <div className="flex h-7 items-center gap-1.5 border-b border-hairline bg-canvas-soft/60 px-3">
        <span className="h-2 w-2 rounded-full bg-hairline" />
        <span className="h-2 w-2 rounded-full bg-hairline" />
        <span className="h-2 w-2 rounded-full bg-hairline" />
        <span className="ml-1.5 truncate text-[0.65rem] text-ink-mute">{title}</span>
      </div>
      {children}
    </div>
  )
}

/* ---------- mini app views (real screens, MXN demo data) ---------- */

function MiniCard({ name, blurb, amount, date }: { name: string; blurb: string; amount: number; date: string }) {
  return (
    <div className="rounded-lg border border-hairline bg-white p-3">
      <p className="text-[0.78rem] font-semibold text-ink">{name}</p>
      <p className="mt-0.5 text-[0.68rem] leading-snug text-ink-soft">{blurb}</p>
      <div className="mt-2 flex items-center justify-between">
        <span className="text-[0.72rem] font-semibold text-mint-ink">{formatMXN(amount)}</span>
        <span className="text-[0.62rem] text-ink-mute">{date}</span>
      </div>
    </div>
  )
}

function MiniKanban() {
  return (
    <Frame title="App móvil para fuerza de ventas en ruta · Propuestas">
      <div className="flex gap-3 bg-canvas-soft p-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between px-1 pb-2">
            <span className="rounded-full bg-ink/5 px-2 py-0.5 text-[0.62rem] font-semibold text-ink-soft">
              Recibida
            </span>
            <span className="text-[0.62rem] font-medium text-ink-mute">2 · $1.47M</span>
          </div>
          <div className="flex flex-col gap-2">
            <MiniCard name="Nube Roja Studio" blurb="6 apps de ruta similares. MVP en 10 semanas." amount={790_000} date="20 may" />
            <MiniCard name="Talleres Digitales MX" blurb="Diseñador de producto dedicado." amount={680_000} date="21 may" />
          </div>
        </div>
        <div className="hidden min-w-0 flex-1 sm:block">
          <div className="flex items-center justify-between px-1 pb-2">
            <span className="rounded-full bg-mint-wash px-2 py-0.5 text-[0.62rem] font-semibold text-mint-ink">
              Análisis
            </span>
            <span className="text-[0.62rem] font-medium text-ink-mute">1</span>
          </div>
          <MiniCard name="Cardinal Labs" blurb="React Native + integración al ERP." amount={910_000} date="12 may" />
        </div>
      </div>
    </Frame>
  )
}

function MiniAsistente() {
  return (
    <Frame title="Nueva licitación · Asistente Mint">
      <div className="flex flex-col gap-2 p-4">
        <p className="max-w-[85%] rounded-lg bg-canvas-soft px-3 py-2 text-[0.72rem] leading-snug text-ink">
          ¿Cuál es el objetivo principal del proyecto?
        </p>
        <p className="ml-auto max-w-[85%] rounded-lg bg-mint-ink px-3 py-2 text-[0.72rem] leading-snug text-white">
          Que 40 vendedores levanten pedidos en ruta, sin señal.
        </p>
        <div className="mt-1 rounded-lg border border-mint/40 bg-mint-wash/40 px-3 py-2">
          <p className="text-[0.6rem] font-semibold uppercase tracking-eyebrow text-mint-ink">
            Objetivo del proyecto
          </p>
          <p className="mt-0.5 text-[0.7rem] leading-snug text-ink">
            Habilitar el levantamiento de pedidos en ruta para 40 vendedores, con operación sin
            conexión y sincronización al ERP...
          </p>
        </div>
        <p className="max-w-[85%] rounded-lg bg-canvas-soft px-3 py-2 text-[0.72rem] leading-snug text-ink">
          Va quedando. ¿Qué presupuesto estimado tienes?
        </p>
      </div>
    </Frame>
  )
}

function MiniDocumento() {
  return (
    <Frame title="App móvil para fuerza de ventas en ruta · Documento">
      <div className="p-4">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[0.85rem] font-bold text-ink">App móvil para fuerza de ventas en ruta</p>
          <span className="flex shrink-0 items-center gap-1 rounded-full bg-mint-wash px-2 py-0.5 text-[0.62rem] font-semibold text-mint-ink">
            <span className="h-1 w-1 rounded-full bg-mint" />
            Publicada
          </span>
        </div>
        {['Alcance del trabajo', 'Criterios de evaluación', 'Presupuesto estimado'].map((s, i) => (
          <div key={s} className="mt-3">
            <p className="text-[0.6rem] font-semibold uppercase tracking-eyebrow text-ink-mute">{s}</p>
            {i === 2 ? (
              <p className="mt-1 text-[0.72rem] font-medium text-ink">MXN 700,000 - 950,000</p>
            ) : (
              <div className="mt-1.5 space-y-1">
                <div className="h-1.5 rounded bg-canvas-soft" />
                <div className="h-1.5 w-3/4 rounded bg-canvas-soft" />
              </div>
            )}
          </div>
        ))}
        <div className="mt-4 flex items-center gap-2 border-t border-hairline pt-3">
          <span className="rounded-md bg-mint-ink px-2.5 py-1 text-[0.62rem] font-semibold text-white">
            Compartir link
          </span>
          <span className="text-[0.62rem] text-ink-mute">mint.app/l/fv-ruta-2026</span>
        </div>
      </div>
    </Frame>
  )
}

/* ---------- sections ---------- */

function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-navy/95 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2.5" aria-label="Mint, inicio">
          <Folio size={24} progress={0.6} tone="white" />
          <span className="font-display text-lg font-bold tracking-headline text-white">Mint</span>
        </Link>
        <div className="hidden items-center gap-8 text-sm font-medium text-white/70 md:flex">
          <a href="#como-funciona" className="transition-colors hover:text-white">Cómo funciona</a>
          <a href="#proveedores" className="transition-colors hover:text-white">Para proveedores</a>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/suppliers"
            className="hidden text-sm font-medium text-white/80 transition-colors hover:text-white sm:block"
          >
            Soy proveedor
          </Link>
          <Link to="/app" className={buttonStyles({ variant: 'clientDark', size: 'sm' })}>
            Crea tu primera licitación
          </Link>
        </div>
      </nav>
    </header>
  )
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy">
      {/* mint glow, top-left */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_12%_0%,rgba(0,192,122,0.25),transparent_70%)]"
      />
      <Folio
        size={340}
        progress={0.7}
        tone="mint"
        className="pointer-events-none absolute -bottom-24 -right-20 opacity-[0.12]"
      />
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-6 pb-24 pt-16 lg:grid-cols-[5fr_7fr] lg:gap-14 lg:pb-28 lg:pt-20">
        <Reveal className="flex flex-col items-start gap-6">
          <span className="flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-eyebrow text-mint-light">
            <Asterisk size={12} weight="bold" />
            Licitaciones B2B con IA
            <Asterisk size={12} weight="bold" />
          </span>
          <h1 className="font-display text-[clamp(2.4rem,4.5vw,3.1rem)] font-bold leading-[1.06] tracking-headline text-white">
            Licita en orden.
            <br />
            Decide con <span className="text-mint-light">datos</span>.
          </h1>
          <p className="max-w-md text-[1.05rem] leading-relaxed text-white/70">
            El Asistente Mint convierte lo que necesitas comprar en una licitación formal de 11
            secciones, lista en minutos. Tus proveedores aplican con un link y todas las propuestas
            caen en un solo tablero.
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <Link to="/app" className={buttonStyles({ variant: 'clientDark', size: 'lg' })}>
              Crea tu primera licitación
              <ArrowRight weight="bold" size={18} />
            </Link>
            <Link
              to="/suppliers"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-white/80 transition-colors hover:text-white"
            >
              Ver licitaciones abiertas
              <ArrowRight size={14} />
            </Link>
          </div>
          <p className="text-[0.82rem] text-white/50">Tus primeras 2 licitaciones son gratis.</p>
        </Reveal>

        <Reveal delay={0.12} className="relative">
          {/* scattered brand glyphs, Notion night-shift style */}
          <Sparkle size={22} weight="fill" className="absolute -left-6 -top-7 text-mint" aria-hidden />
          <Asterisk size={16} weight="bold" className="absolute -right-3 top-10 text-mint-light/70" aria-hidden />
          <Folio size={52} progress={0.75} tone="mint" className="absolute -right-7 -top-10 opacity-80" />
          <Sparkle size={14} weight="fill" className="absolute -bottom-6 left-10 text-mint-light/60" aria-hidden />
          <div className="relative mx-auto max-w-md">
            <MiniKanban />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

const STEPS = [
  {
    progress: 0.35,
    n: '01',
    title: 'Describe con el asistente',
    body: 'Contesta 10 preguntas en el chat. El Asistente Mint redacta las 11 secciones del documento: objetivo, alcance, criterios, presupuesto, cronograma. Tú editas lo que quieras, siempre.',
    note: 'Si falta un dato, lo deja marcado como pendiente. Nunca inventa.',
    shot: <MiniAsistente />,
  },
  {
    progress: 1,
    n: '02',
    title: 'Publica e invita',
    body: 'Publica tu licitación y comparte el link con los proveedores que ya conoces. Aplican sin fricción, con su propuesta económica y sus archivos, sin crear cuentas pesadas.',
    note: 'Tus proveedores, tu red. Cada licitación arranca con gente que ya conoces.',
    shot: <MiniDocumento />,
  },
  {
    progress: 0.6,
    n: '03',
    title: 'Compara y decide',
    body: 'Cada propuesta cae en tu tablero con la misma estructura: monto, contacto, resumen y etapa. Arrastra, negocia y acepta la que gane. Todo queda registrado.',
    note: 'Compara peras con peras y cierra el proceso donde empezó.',
    shot: <MiniKanban />,
  },
]

function ComoFunciona() {
  return (
    <section id="como-funciona" className="bg-white py-20 lg:py-28">
      <div className="mx-auto w-full max-w-6xl px-6">
        <Reveal className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-mint-wash px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-eyebrow text-mint-ink">
            <Asterisk size={11} weight="bold" />
            Para empresas
          </span>
          <h2 className="mt-4 font-display text-[2rem] font-semibold leading-tight tracking-headline text-ink">
            Tu próxima compra, en tres pasos
          </h2>
          <p className="mt-3 text-[1.05rem] text-ink-soft">
            Del &quot;necesito cotizaciones&quot; a una decisión con datos, sin salir de un solo lugar.
          </p>
        </Reveal>

        <div className="mt-14 flex flex-col gap-16 lg:gap-20">
          {STEPS.map((s, i) => (
            <Reveal
              key={s.title}
              className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14"
            >
              <div className={cn('flex flex-col items-start', i % 2 === 1 && 'lg:order-2')}>
                <div className="flex items-center gap-4">
                  <Folio size={44} progress={s.progress} tone="mint" />
                  <span className="font-display text-sm font-bold tracking-[0.2em] text-mint-ink">
                    {s.n}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-2xl font-semibold tracking-headline text-ink">
                  {s.title}
                </h3>
                <p className="mt-3 max-w-md text-[0.98rem] leading-relaxed text-ink-soft">{s.body}</p>
                <p className="mt-4 border-l-2 border-mint pl-3 text-[0.88rem] italic text-ink-mute">
                  {s.note}
                </p>
              </div>
              <div
                className={cn(
                  'relative overflow-hidden rounded-hero p-5 sm:p-8',
                  i % 2 === 1
                    ? 'border border-white/10 bg-navy'
                    : 'border border-mint/15 bg-[#E8FBF3]/60',
                  i % 2 === 1 && 'lg:order-1',
                )}
              >
                {i % 2 === 1 ? (
                  <Folio
                    size={200}
                    progress={1}
                    tone="mint"
                    className="pointer-events-none absolute -bottom-14 -right-14 opacity-[0.15]"
                  />
                ) : null}
                <div className="relative mx-auto max-w-md">{s.shot}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

const CAPABILITIES = [
  { icon: ChatCircleText, title: 'Asistente Mint', body: 'Preguntas correctas, prosa de documento formal.' },
  { icon: Files, title: 'Documento de 11 secciones', body: 'Editable a mano, siempre. Tú mandas.' },
  { icon: Kanban, title: 'Pipeline de propuestas', body: 'Cinco etapas, drag and drop, totales por columna.' },
  { icon: Scales, title: 'Propuestas comparables', body: 'Misma estructura: monto, contacto, resumen.' },
]

function Capabilities() {
  return (
    <section className="bg-navy">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {CAPABILITIES.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.05} className="flex items-start gap-3.5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-mint/15">
              <c.icon size={20} className="text-mint-light" />
            </span>
            <span>
              <span className="block text-[0.92rem] font-semibold text-white">{c.title}</span>
              <span className="mt-0.5 block text-[0.82rem] leading-snug text-white/60">{c.body}</span>
            </span>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Dual() {
  return (
    <section id="proveedores" className="bg-white py-20 lg:py-28">
      <div className="mx-auto w-full max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-[2rem] font-semibold tracking-headline text-ink">
            Dos lados, un mismo trato
          </h2>
          <p className="mt-3 text-[1.05rem] text-ink-soft">
            Mint es neutral: le sirve igual al que compra y al que vende.
          </p>
        </Reveal>

        {/* One object, two faces. The seam is the ONLY deal gradient on the page. */}
        <Reveal className="relative mt-12 grid overflow-hidden rounded-hero border border-hairline shadow-lift lg:grid-cols-2">
          <span
            aria-hidden
            className="absolute inset-y-0 left-1/2 z-10 hidden w-[2px] -translate-x-1/2 lg:block"
            style={{ background: DEAL_GRADIENT }}
          />

          {/* Empresas: the light face */}
          <div className="flex flex-col items-start gap-4 bg-[#E8FBF3]/70 p-8 sm:p-12">
            <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-mint-ink text-white">
              <UsersThree size={24} />
            </span>
            <h3 className="font-display text-xl font-semibold tracking-headline text-ink">
              Para empresas que licitan
            </h3>
            <p className="max-w-sm text-[0.95rem] leading-relaxed text-ink-soft">
              Publica licitaciones formales, recibe propuestas comparables y decide con tu proceso
              en orden.
            </p>
            <ul className="flex flex-col gap-1.5 text-[0.88rem] text-ink-soft">
              {['El asistente redacta el documento', 'Invitas por link a tu propia red', 'Todo el proceso queda registrado'].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-mint" />
                  {t}
                </li>
              ))}
            </ul>
            <Link
              to="/app"
              className={cn('mt-auto', buttonStyles({ variant: 'client', size: 'md' }))}
            >
              Crea tu primera licitación
              <ArrowRight weight="bold" size={16} />
            </Link>
          </div>

          {/* Proveedores: the dark face */}
          <div className="flex flex-col items-start gap-4 bg-navy p-8 sm:p-12">
            <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-supplier text-white">
              <Storefront size={24} />
            </span>
            <h3 className="font-display text-xl font-semibold tracking-headline text-white">
              Para proveedores
            </h3>
            <p className="max-w-sm text-[0.95rem] leading-relaxed text-white/70">
              Recibe el link de tu cliente o explora las licitaciones abiertas. Lee el documento
              completo, presenta tu propuesta con tus archivos y da seguimiento por correo.
            </p>
            <ul className="flex flex-col gap-1.5 text-[0.88rem] text-white/70">
              {['Sin costo, siempre', 'Aplicas en minutos, sin fricción', 'Reglas claras y las mismas para todos'].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-supplier-light" />
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-auto flex flex-col gap-2.5">
              <Link to="/suppliers" className={buttonStyles({ variant: 'supplier', size: 'md' })}>
                Ver licitaciones abiertas
                <ArrowRight weight="bold" size={16} />
              </Link>
              <p className="text-[0.8rem] text-white/50">Los proveedores nunca pagan por usar Mint.</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

const TRUST = [
  {
    icon: UsersThree,
    title: 'Tus proveedores, tu red',
    body: 'En México nadie le compra a desconocidos. En Mint invitas a los proveedores que ya conoces; cada licitación arranca con tu propia red.',
    soon: false,
  },
  {
    icon: Bank,
    title: 'Mint no toca el dinero',
    body: 'El pago y la factura CFDI siguen siendo directos entre tu empresa y tu proveedor, con tus términos de crédito. Mint ordena el proceso, no se mete en tu flujo.',
    soon: false,
  },
  {
    icon: SealCheck,
    title: 'Verificación fiscal',
    body: 'Cada participante con su Constancia de Situación Fiscal: RFC y razón social verificados, con badge visible en cada propuesta.',
    soon: true,
  },
]

function Confianza() {
  return (
    <section className="relative overflow-hidden bg-canvas-soft py-20 lg:py-24">
      <Folio
        size={420}
        progress={1}
        tone="mint"
        className="absolute -right-32 -top-32 opacity-[0.07]"
      />
      <div className="relative mx-auto grid w-full max-w-6xl gap-12 px-6 lg:grid-cols-[5fr_7fr]">
        <Reveal>
          <span className="rounded-full bg-navy px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-eyebrow text-white">
            Confianza
          </span>
          <h2 className="mt-4 font-display text-[1.7rem] font-semibold leading-tight tracking-headline text-ink">
            Hecho para el B2B mexicano
          </h2>
          <p className="mt-4 max-w-sm text-[0.98rem] leading-relaxed text-ink-soft">
            Montos en MXN, lenguaje de compras real y las reglas del juego formal: facturación,
            referencias y contratos entre las partes.
          </p>
        </Reveal>
        <Reveal delay={0.1} className="divide-y divide-hairline">
          {TRUST.map((t) => (
            <div key={t.title} className="flex items-start gap-4 py-5 first:pt-0 last:pb-0">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-hairline bg-white">
                <t.icon size={20} className="text-ink" />
              </span>
              <div>
                <p className="flex items-center gap-2.5 font-medium text-ink">
                  {t.title}
                  {t.soon ? (
                    <span className="rounded-full border border-hairline bg-white px-2.5 py-0.5 text-[0.68rem] font-medium text-ink-mute">
                      En camino
                    </span>
                  ) : null}
                </p>
                <p className="mt-1 text-[0.92rem] leading-relaxed text-ink-soft">{t.body}</p>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

function CtaFinal() {
  return (
    <section className="relative overflow-hidden bg-navy py-20 lg:py-24">
      <Folio
        size={520}
        progress={0.7}
        tone="mint"
        className="absolute -right-32 top-1/2 -translate-y-1/2 opacity-[0.12]"
      />
      <Reveal className="relative mx-auto flex max-w-2xl flex-col items-center gap-5 px-6 text-center">
        <Asterisk size={24} weight="bold" className="text-mint" aria-hidden />
        <h2 className="font-display text-[2rem] font-semibold tracking-headline text-white">
          Tu siguiente compra merece un proceso serio
        </h2>
        <p className="max-w-lg text-[1.02rem] leading-relaxed text-white/70">
          Crea tu cuenta, contesta 10 preguntas y publica tu primera licitación hoy. Las primeras 2
          son gratis.
        </p>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
          <Link to="/app" className={buttonStyles({ variant: 'clientDark', size: 'lg' })}>
            Crea tu primera licitación
            <ArrowRight weight="bold" size={18} />
          </Link>
          <Link to="/suppliers" className={buttonStyles({ variant: 'ghostDark', size: 'lg' })}>
            Ver licitaciones abiertas
          </Link>
        </div>
      </Reveal>
    </section>
  )
}

function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-navy text-white">
      <Folio
        size={360}
        progress={1}
        tone="white"
        className="absolute -bottom-28 -right-24 opacity-[0.15]"
      />
      <div className="relative mx-auto grid w-full max-w-6xl gap-10 px-6 py-12 sm:grid-cols-3">
        <div>
          <span className="flex items-center gap-2.5">
            <Folio size={24} progress={0.6} tone="white" />
            <span className="font-display text-lg font-bold tracking-headline">Mint</span>
          </span>
          <p className="mt-3 max-w-[220px] text-sm text-white/60">
            Licitaciones B2B en orden, hechas en México.
          </p>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <span className="mb-1 text-[0.7rem] font-semibold uppercase tracking-eyebrow text-white/40">
            Producto
          </span>
          <a href="#como-funciona" className="text-white/70 transition-colors hover:text-white">Cómo funciona</a>
          <Link to="/app" className="text-white/70 transition-colors hover:text-white">Para empresas</Link>
          <Link to="/suppliers" className="text-white/70 transition-colors hover:text-white">Para proveedores</Link>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <span className="mb-1 text-[0.7rem] font-semibold uppercase tracking-eyebrow text-white/40">
            Legal y contacto
          </span>
          {/* pendientes reales antes del deploy (docs/landing-brief.md §8): los da Mike */}
          <span className="text-white/50">Aviso de privacidad (en camino)</span>
          <span className="text-white/50">Términos y condiciones (en camino)</span>
          <span className="text-white/50">[correo pendiente]</span>
          <span className="text-white/50">[Razón social pendiente]</span>
        </div>
      </div>
      <div className="relative border-t border-white/10">
        <p className="mx-auto w-full max-w-6xl px-6 py-5 text-[0.72rem] text-white/40">
          © 2026 Mint. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}

export function Landing() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <ComoFunciona />
        <Capabilities />
        <Dual />
        <Confianza />
        <CtaFinal />
      </main>
      <Footer />
    </div>
  )
}
