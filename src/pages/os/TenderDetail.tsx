import {
  ArrowLeft,
  CalendarBlank,
  CaretLeft,
  CaretRight,
  EnvelopeSimple,
  FileText,
  PencilSimple,
  User,
  X,
} from '@phosphor-icons/react'
import { useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { NotFound } from '@/pages/os/NotFound'
import { useTenders } from '@/lib/store'
import {
  docProgress,
  SECTIONS,
  STAGES,
  STAGE_LABEL,
  STATUS_LABEL,
  type Stage,
} from '@/lib/tenders'
import { Folio } from '@/components/brand/Folio'
import { cn, formatMXN } from '@/lib/utils'

/**
 * Tinted chip per pipeline stage. No indigo here: this is the client's
 * board and indigo belongs to providers (docs/marca.md §2).
 */
const STAGE_CHIP: Record<Stage, string> = {
  received: 'bg-ink/5 text-ink-soft',
  analysis: 'bg-mint-wash text-mint-ink',
  negotiation: 'bg-amber-50 text-amber-700',
  // The deal moment: the only place both sides' colors meet (docs/marca.md §2).
  accepted:
    'bg-[linear-gradient(90deg,rgba(0,192,122,.12),rgba(45,76,200,.12))] text-navy',
  rejected: 'bg-red-50 text-red-600',
}

/** 3px top strip on accepted cards: mint meets indigo, stops 38/62. */
const DEAL_STRIP =
  'linear-gradient(90deg, #00C07A 0%, #00C07A 38%, #2D4CC8 62%, #2D4CC8 100%)'

export function TenderDetail() {
  const { id } = useParams()
  const { getTender, moveStage, setStage } = useTenders()
  const [tab, setTab] = useState<'apps' | 'doc'>('apps')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [dragOver, setDragOver] = useState<Stage | null>(null)
  const location = useLocation()
  const [justPublished, setJustPublished] = useState<boolean>(
    Boolean((location.state as { published?: boolean } | null)?.published),
  )
  const tender = id ? getTender(id) : undefined
  if (!tender) return <NotFound />

  const byStage = (stage: Stage) => tender.applications.filter((a) => a.stage === stage)
  const selected = tender.applications.find((a) => a.id === selectedId)

  return (
    <div className="flex h-screen flex-col">
      <header className="border-b border-hairline bg-white px-6 pt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/app"
              className="rounded-btn p-1.5 text-ink-mute transition-colors hover:bg-canvas-soft hover:text-ink"
              aria-label="Volver al dashboard"
            >
              <ArrowLeft size={18} />
            </Link>
            <div>
              <div className="flex items-center gap-3">
                <Folio size={30} progress={docProgress(tender)} tone="mint" className="shrink-0" />
                <h1 className="font-display text-xl font-bold tracking-headline">
                  {tender.doc.titulo}
                </h1>
                <span
                  className={cn(
                    'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium',
                    tender.status === 'published'
                      ? 'border-mint/30 bg-mint-wash text-mint-ink'
                      : 'border-hairline bg-canvas-soft text-ink-mute',
                  )}
                >
                  {tender.status === 'published' ? (
                    <span className="h-1.5 w-1.5 rounded-full bg-mint" />
                  ) : null}
                  {STATUS_LABEL[tender.status]}
                </span>
              </div>
              <p className="mt-0.5 text-xs text-ink-mute">
                {tender.applications.length}{' '}
                {tender.applications.length === 1 ? 'aplicación' : 'aplicaciones'} · Cierra el{' '}
                {tender.deadline}
              </p>
            </div>
          </div>
          <Link
            to={`/tenders/${tender.id}/edit`}
            className="inline-flex items-center gap-2 rounded-btn border border-hairline bg-white px-4 py-2 text-[0.85rem] font-medium text-ink-soft transition-colors hover:border-ink-mute hover:text-ink"
          >
            <PencilSimple size={16} />
            Editar
          </Link>
        </div>

        <div className="mt-3 flex gap-1">
          {(
            [
              { key: 'apps', label: `Aplicaciones (${tender.applications.length})` },
              { key: 'doc', label: 'Documento' },
            ] as const
          ).map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={cn(
                'inline-flex items-center gap-2 rounded-t-btn border-b-2 px-4 py-2.5 text-[0.88rem] font-medium transition-colors',
                tab === key
                  ? 'border-mint-ink bg-mint-wash/50 text-ink'
                  : 'border-transparent text-ink-mute hover:text-ink',
              )}
            >
              {key === 'doc' ? <FileText size={15} /> : null}
              {label}
            </button>
          ))}
        </div>
      </header>

      {justPublished ? (
        <div className="flex items-center justify-between gap-4 border-b border-mint/30 bg-mint-wash px-6 py-2.5 text-sm text-mint-ink">
          <p>Listo, tu licitación está publicada. Los proveedores ya pueden verla y aplicar.</p>
          <button
            onClick={() => setJustPublished(false)}
            aria-label="Cerrar aviso"
            className="rounded p-1 hover:bg-mint/20"
          >
            <X size={14} />
          </button>
        </div>
      ) : null}

      {tab === 'apps' ? (
        <div className="flex min-h-0 flex-1 gap-3 overflow-x-auto bg-canvas-soft p-5">
          {STAGES.map((stage) => {
            const apps = byStage(stage)
            const total = apps.reduce((n, a) => n + a.amountMxn, 0)
            return (
              <section
                key={stage}
                onDragOver={(e) => {
                  e.preventDefault()
                  setDragOver(stage)
                }}
                onDragLeave={() => setDragOver((s) => (s === stage ? null : s))}
                onDrop={(e) => {
                  e.preventDefault()
                  const appId = e.dataTransfer.getData('text/plain')
                  if (appId) setStage(tender.id, appId, stage)
                  setDragOver(null)
                }}
                className={cn(
                  'flex w-72 shrink-0 flex-col rounded-card p-1.5 transition-colors',
                  dragOver === stage && 'bg-mint-wash/40 ring-2 ring-mint/40',
                )}
              >
                <header className="flex items-center justify-between px-1.5 pb-3">
                  <span
                    className={cn(
                      'rounded-full px-2.5 py-1 text-xs font-semibold',
                      STAGE_CHIP[stage],
                    )}
                  >
                    {STAGE_LABEL[stage]}
                  </span>
                  <span className="text-xs font-medium text-ink-mute">
                    {apps.length}
                    {total > 0 ? ` · ${formatMXN(total)}` : ''}
                  </span>
                </header>

                <div className="flex flex-1 flex-col gap-2.5">
                  {apps.map((app) => {
                    const idx = STAGES.indexOf(stage)
                    return (
                      <article
                        key={app.id}
                        draggable
                        onDragStart={(e) => e.dataTransfer.setData('text/plain', app.id)}
                        onClick={() => setSelectedId(app.id)}
                        className="group relative cursor-pointer overflow-hidden rounded-card border border-hairline bg-white p-4 shadow-card transition-shadow hover:shadow-lift active:cursor-grabbing"
                      >
                        {stage === 'accepted' ? (
                          <span
                            aria-hidden
                            className="absolute inset-x-0 top-0 h-[3px]"
                            style={{ background: DEAL_STRIP }}
                          />
                        ) : null}
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-[0.95rem] font-semibold text-ink">{app.company}</h3>
                          <span className="flex shrink-0 gap-0.5 opacity-40 transition-opacity group-hover:opacity-100">
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                moveStage(tender.id, app.id, -1)
                              }}
                              disabled={idx === 0}
                              aria-label="Etapa anterior"
                              className="rounded p-1 text-ink-mute hover:bg-canvas-soft hover:text-ink disabled:opacity-30"
                            >
                              <CaretLeft size={13} weight="bold" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                moveStage(tender.id, app.id, 1)
                              }}
                              disabled={idx === STAGES.length - 1}
                              aria-label="Siguiente etapa"
                              className="rounded p-1 text-ink-mute hover:bg-canvas-soft hover:text-ink disabled:opacity-30"
                            >
                              <CaretRight size={13} weight="bold" />
                            </button>
                          </span>
                        </div>
                        <p className="mt-1 text-sm leading-snug text-ink-soft">{app.summary}</p>
                        <div className="mt-3 flex items-center justify-between">
                          <span className="font-semibold text-mint-ink">{formatMXN(app.amountMxn)}</span>
                          <span className="text-xs text-ink-mute">{app.date}</span>
                        </div>
                      </article>
                    )
                  })}
                  {apps.length === 0 ? (
                    <p className="rounded-card border border-dashed border-hairline px-4 py-6 text-center text-xs text-ink-mute/70">
                      {dragOver === stage
                        ? 'Suelta aquí'
                        : stage === 'negotiation'
                          ? 'Nada en negociación por ahora. Arrastra aquí las propuestas que avancen.'
                          : 'Sin propuestas'}
                    </p>
                  ) : null}
                </div>
              </section>
            )
          })}
        </div>
      ) : (
        <div className="min-h-0 flex-1 overflow-y-auto bg-canvas-soft px-8 py-8">
          <article className="mx-auto max-w-[640px] animate-fade-up rounded-card border border-hairline bg-white px-9 py-10 shadow-card">
            <h2 className="font-display text-[1.7rem] font-bold tracking-headline text-ink">
              {tender.doc.titulo}
            </h2>
            {SECTIONS.filter((s) => s.key !== 'titulo').map(({ key, label }) => (
              <div key={key} className="mt-7">
                <h3 className="text-[0.7rem] font-semibold uppercase tracking-eyebrow text-ink-mute">
                  {label}
                </h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-ink">
                  {tender.doc[key] || <span className="italic text-ink-mute/60">Sin definir</span>}
                </p>
              </div>
            ))}
          </article>
        </div>
      )}

      {/* Proposal drawer */}
      {selected ? (
        <>
          <div
            className="fixed inset-0 z-20 bg-navy/25"
            onClick={() => setSelectedId(null)}
            aria-hidden
          />
          <aside className="animate-slide-in fixed inset-y-0 right-0 z-30 flex w-full max-w-[400px] flex-col border-l border-hairline bg-white shadow-panel">
            <header className="flex items-start justify-between border-b border-hairline px-6 py-5">
              <div>
                <h2 className="font-display text-lg font-bold tracking-headline">
                  {selected.company}
                </h2>
                <p className="mt-0.5 text-sm text-ink-mute">{selected.summary}</p>
              </div>
              <button
                onClick={() => setSelectedId(null)}
                aria-label="Cerrar"
                className="rounded-btn p-1.5 text-ink-mute transition-colors hover:bg-canvas-soft hover:text-ink"
              >
                <X size={18} />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-6 py-5">
              <p className="text-[0.7rem] font-semibold uppercase tracking-eyebrow text-ink-mute">
                Propuesta económica
              </p>
              <p className="mt-1 font-display text-3xl font-bold tracking-headline text-mint-ink">
                {formatMXN(selected.amountMxn)}
              </p>

              <div className="mt-5 space-y-2.5 border-t border-hairline pt-5 text-sm">
                <p className="flex items-center gap-2.5 text-ink-soft">
                  <CalendarBlank size={15} className="text-ink-mute/70" />
                  Recibida el {selected.date}
                </p>
                {selected.contact ? (
                  <p className="flex items-center gap-2.5 text-ink-soft">
                    <User size={15} className="text-ink-mute/70" />
                    {selected.contact}
                  </p>
                ) : null}
                {selected.email ? (
                  <p className="flex items-center gap-2.5 text-ink-soft">
                    <EnvelopeSimple size={15} className="text-ink-mute/70" />
                    {selected.email}
                  </p>
                ) : null}
              </div>

              <div className="mt-5 border-t border-hairline pt-5">
                <p className="text-[0.7rem] font-semibold uppercase tracking-eyebrow text-ink-mute">
                  Etapa
                </p>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {STAGES.map((stage) => (
                    <button
                      key={stage}
                      onClick={() => setStage(tender.id, selected.id, stage)}
                      className={cn(
                        'rounded-full px-3 py-1.5 text-xs font-semibold transition-all',
                        // the deal gradient only marks a real accepted state
                        stage === 'accepted' && selected.stage !== 'accepted'
                          ? 'bg-canvas-soft text-ink-soft'
                          : STAGE_CHIP[stage],
                        selected.stage === stage
                          ? 'ring-2 ring-current'
                          : 'opacity-50 hover:opacity-100',
                      )}
                    >
                      {STAGE_LABEL[stage]}
                    </button>
                  ))}
                </div>
              </div>

              {selected.description ? (
                <div className="mt-5 border-t border-hairline pt-5">
                  <p className="text-[0.7rem] font-semibold uppercase tracking-eyebrow text-ink-mute">
                    Descripción de la propuesta
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ink">{selected.description}</p>
                </div>
              ) : null}
            </div>
          </aside>
        </>
      ) : null}
    </div>
  )
}
