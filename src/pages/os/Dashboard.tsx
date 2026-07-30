import {
  ArrowRight,
  CalendarBlank,
  Files,
  FileText,
  MagnifyingGlass,
  Plus,
  Trash,
  Tray,
  Users,
} from '@phosphor-icons/react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Folio } from '@/components/brand/Folio'
import { useTenders } from '@/lib/store'
import { docProgress, STATUS_LABEL, type TenderStatus } from '@/lib/tenders'
import { cn } from '@/lib/utils'

const STATUS_PILL: Record<TenderStatus, string> = {
  published: 'border-mint/30 bg-mint-wash text-mint-ink',
  draft: 'border-hairline bg-canvas-soft text-ink-mute',
  closed: 'border-hairline bg-canvas-soft text-ink-soft',
}

function StatusPill({ status }: { status: TenderStatus }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium',
        STATUS_PILL[status],
      )}
    >
      <span
        className={cn(
          'h-1.5 w-1.5 rounded-full',
          status === 'published' ? 'bg-mint' : 'bg-ink-mute/50',
        )}
      />
      {STATUS_LABEL[status]}
    </span>
  )
}

const FILTERS: { key: 'all' | TenderStatus; label: string }[] = [
  { key: 'all', label: 'Todas' },
  { key: 'published', label: 'Publicadas' },
  { key: 'draft', label: 'Borradores' },
  { key: 'closed', label: 'Cerradas' },
]

export function Dashboard() {
  const { tenders, removeTender } = useTenders()
  const navigate = useNavigate()
  const [filter, setFilter] = useState<'all' | TenderStatus>('all')
  const [query, setQuery] = useState('')

  const filtered = tenders.filter(
    (t) =>
      (filter === 'all' || t.status === filter) &&
      t.doc.titulo.toLowerCase().includes(query.trim().toLowerCase()),
  )
  const openTender = (t: (typeof tenders)[number]) =>
    navigate(t.status === 'draft' ? `/tenders/${t.id}/edit` : `/tenders/${t.id}`)

  const stats = [
    { label: 'Total', value: tenders.length, icon: Files, accent: false },
    {
      label: 'Publicadas',
      value: tenders.filter((t) => t.status === 'published').length,
      icon: CalendarBlank,
      accent: false,
    },
    {
      label: 'Borradores',
      value: tenders.filter((t) => t.status === 'draft').length,
      icon: FileText,
      accent: false,
    },
    {
      label: 'Propuestas',
      value: tenders.reduce((n, t) => n + t.applications.length, 0),
      icon: Tray,
      accent: true, // the number that matters most wears the brand navy
    },
  ]

  return (
    <div className="mx-auto max-w-[1100px] animate-fade-up px-8 py-10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="headline text-3xl">Licitaciones</h1>
          <p className="mt-1.5 text-[0.95rem] text-ink-mute">
            Gestiona y monitorea todos tus procesos de compra.
          </p>
        </div>
        <Link
          to="/tenders/new"
          className="inline-flex items-center gap-2 rounded-btn bg-mint-ink px-5 py-2.5 text-[0.88rem] font-medium text-white transition-colors hover:bg-mint-deep"
        >
          <Plus size={16} weight="bold" />
          Nueva licitación
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, accent }) => (
          <div
            key={label}
            className={cn(
              'rounded-card border p-5 shadow-card',
              accent ? 'border-navy bg-navy' : 'border-hairline bg-white',
            )}
          >
            <div className="flex items-center justify-between">
              <span
                className={cn(
                  'text-[0.72rem] font-semibold uppercase tracking-eyebrow',
                  accent ? 'text-white/60' : 'text-ink-mute',
                )}
              >
                {label}
              </span>
              <span
                className={cn(
                  'flex h-7 w-7 items-center justify-center rounded-md',
                  accent ? 'bg-mint/15' : 'bg-mint-wash',
                )}
              >
                <Icon size={15} className={accent ? 'text-mint-light' : 'text-mint-ink'} />
              </span>
            </div>
            <p
              className={cn(
                'mt-2 font-display text-4xl font-bold tracking-headline',
                accent && 'text-white',
              )}
            >
              {value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
        <div className="inline-flex rounded-btn border border-hairline bg-white p-0.5 shadow-card">
          {FILTERS.map(({ key, label }) => {
            const count =
              key === 'all'
                ? tenders.length
                : tenders.filter((t) => t.status === key).length
            return (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={cn(
                  'rounded-[5px] px-3.5 py-1.5 text-[0.82rem] font-medium transition-colors',
                  filter === key
                    ? 'bg-navy text-white'
                    : 'text-ink-mute hover:text-ink',
                )}
              >
                {label}
                <span className={cn('ml-1.5', filter === key ? 'text-white/60' : 'text-ink-mute/60')}>
                  {count}
                </span>
              </button>
            )
          })}
        </div>
        <label className="relative block w-full sm:w-64">
          <MagnifyingGlass
            size={15}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-mute/60"
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar licitación..."
            className="w-full rounded-btn border border-hairline bg-white py-2 pl-9 pr-3 text-[0.85rem] text-ink shadow-card transition-colors placeholder:text-ink-mute/60 focus:border-mint-ink focus:outline-none focus:ring-4 focus:ring-mint/15"
          />
        </label>
      </div>

      <div className="mt-4 overflow-x-auto rounded-card border border-hairline bg-white shadow-card">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-hairline bg-canvas-soft/60 text-[0.7rem] font-semibold uppercase tracking-eyebrow text-ink-mute">
              <th className="px-5 py-3">Nombre</th>
              <th className="px-5 py-3">Estado</th>
              <th className="px-5 py-3">Creada</th>
              <th className="px-5 py-3">Fecha límite</th>
              <th className="px-5 py-3">Apps</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {filtered.map((t) => (
              <tr
                key={t.id}
                onClick={() => openTender(t)}
                className="group cursor-pointer border-b border-hairline transition-colors last:border-0 hover:bg-canvas-soft/50"
              >
                <td className="px-5 py-4">
                  <Link
                    to={t.status === 'draft' ? `/tenders/${t.id}/edit` : `/tenders/${t.id}`}
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-3 font-medium text-ink hover:text-mint-deep"
                  >
                    <Folio size={24} progress={docProgress(t)} tone="mint" className="shrink-0" />
                    {t.doc.titulo || 'Sin título'}
                  </Link>
                </td>
                <td className="px-5 py-4">
                  <StatusPill status={t.status} />
                </td>
                <td className="px-5 py-4 text-ink-soft">{t.createdAt}</td>
                <td className="px-5 py-4 text-ink-soft">{t.deadline}</td>
                <td className="px-5 py-4">
                  <span className="inline-flex items-center gap-1.5 text-ink-soft">
                    <Users size={15} className="text-ink-mute/70" />
                    <span className="font-medium">{t.applications.length}</span>
                  </span>
                </td>
                <td className="px-5 py-4 text-right">
                  <span className="inline-flex items-center gap-2 transition-opacity md:opacity-0 md:group-focus-within:opacity-100 md:group-hover:opacity-100">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        if (confirm(`¿Eliminar "${t.doc.titulo || 'Sin título'}"?`)) removeTender(t.id)
                      }}
                      aria-label="Eliminar licitación"
                      className="rounded p-1 text-ink-mute transition-colors hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash size={15} />
                    </button>
                    <span className="inline-flex items-center gap-1 font-medium text-mint-ink">
                      Abrir
                      <ArrowRight size={14} weight="bold" />
                    </span>
                  </span>
                </td>
              </tr>
            ))}
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-5 py-14 text-center text-ink-mute">
                  {tenders.length === 0
                    ? 'Todavía no tienes licitaciones. Crea la primera y el asistente te ayuda a armar el documento.'
                    : 'Ninguna licitación coincide con el filtro.'}
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  )
}
