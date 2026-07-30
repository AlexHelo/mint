import { CalendarBlank, CaretRight } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import { useTenders } from '@/lib/store'

/** Supplier-facing list of open (published) tenders. */
export function Portal() {
  const { tenders } = useTenders()
  const open = tenders.filter((t) => t.status === 'published')

  return (
    <div className="mx-auto max-w-[1100px] animate-fade-up px-8 py-10">
      <span className="inline-flex items-center gap-2 rounded-full bg-supplier-wash px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-eyebrow text-supplier">
        Para proveedores
      </span>
      <h1 className="headline mt-3 text-3xl">Licitaciones abiertas</h1>
      <p className="mt-1.5 text-[0.95rem] text-ink-mute">
        Explora oportunidades publicadas y envía tu propuesta.
      </p>

      <div className="mt-8 flex flex-col gap-3.5">
        {open.map((t) => (
          <Link
            key={t.id}
            to={`/suppliers/${t.id}`}
            className="group flex items-center justify-between gap-6 rounded-card border border-hairline bg-white px-6 py-5 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-lift"
          >
            <div className="min-w-0">
              <h2 className="font-display text-lg font-bold tracking-headline text-ink">
                {t.doc.titulo}
              </h2>
              {t.doc.objetivo ? (
                <p className="mt-1 truncate text-[0.92rem] text-ink-soft">{t.doc.objetivo}</p>
              ) : null}
              <p className="mt-2.5 flex items-center gap-4 text-[0.82rem] text-ink-mute">
                <span className="inline-flex items-center gap-1.5">
                  <CalendarBlank size={14} />
                  Cierra {t.deadline}
                </span>
                {t.doc.presupuesto ? <span>Presupuesto: {t.doc.presupuesto}</span> : null}
              </p>
            </div>
            <CaretRight
              size={18}
              className="shrink-0 text-ink-mute/50 transition-transform group-hover:translate-x-0.5 group-hover:text-supplier"
            />
          </Link>
        ))}
        {open.length === 0 ? (
          <p className="rounded-card border border-dashed border-hairline px-6 py-14 text-center text-ink-mute">
            No hay licitaciones abiertas por el momento.
          </p>
        ) : null}
      </div>
    </div>
  )
}
