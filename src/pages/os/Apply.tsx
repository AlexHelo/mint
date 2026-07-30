import { ArrowLeft, CheckCircle, Paperclip } from '@phosphor-icons/react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Field } from '@/components/ui/Field'
import { NotFound } from '@/pages/os/NotFound'
import { useTenders } from '@/lib/store'
import { SECTIONS } from '@/lib/tenders'

function todayShort(): string {
  return new Date()
    .toLocaleDateString('es-MX', { day: '2-digit', month: 'short' })
    .replace('.', '')
}

/** Supplier view of one tender: the full RFP plus the proposal form. */
export function Apply() {
  const { id } = useParams()
  const { getTender, addApplication } = useTenders()
  const tender = id ? getTender(id) : undefined

  const [form, setForm] = useState({
    empresa: '',
    contacto: '',
    correo: '',
    monto: '',
    resumen: '',
    descripcion: '',
  })
  const [sent, setSent] = useState(false)
  if (!tender) return <NotFound />

  const valid =
    form.empresa.trim() && form.correo.trim() && form.monto.trim() && form.descripcion.trim()

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!valid || !tender) return
    addApplication(tender.id, {
      id: crypto.randomUUID(),
      company: form.empresa.trim(),
      summary: form.resumen.trim() || form.descripcion.trim().slice(0, 80),
      amountMxn: Number(form.monto) || 0,
      date: todayShort(),
      stage: 'received',
      contact: form.contacto.trim(),
      email: form.correo.trim(),
      description: form.descripcion.trim(),
    })
    setSent(true)
  }

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }))

  return (
    <div className="mx-auto max-w-[1100px] animate-fade-up px-8 py-8">
      <Link
        to="/suppliers"
        className="inline-flex items-center gap-2 text-sm font-medium text-ink-mute transition-colors hover:text-ink"
      >
        <ArrowLeft size={16} />
        Volver al portal
      </Link>

      <div className="mt-5 grid grid-cols-1 items-start gap-6 lg:grid-cols-[1fr_360px]">
        <article className="rounded-card border border-hairline bg-white px-9 py-10 shadow-card">
          <h1 className="font-display text-[1.8rem] font-bold tracking-headline text-ink">
            {tender.doc.titulo}
          </h1>
          {SECTIONS.filter((s) => s.key !== 'titulo').map(({ key, label }) =>
            tender.doc[key] ? (
              <div key={key} className="mt-7">
                <h2 className="text-[0.7rem] font-semibold uppercase tracking-eyebrow text-ink-mute">
                  {label}
                </h2>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-ink">{tender.doc[key]}</p>
              </div>
            ) : null,
          )}
        </article>

        <aside className="rounded-card border border-hairline bg-white p-6 shadow-card lg:sticky lg:top-8 lg:max-h-[calc(100vh-4rem)] lg:overflow-y-auto">
          {sent ? (
            <div className="py-6 text-center">
              <CheckCircle size={44} weight="fill" className="mx-auto text-supplier" />
              <h2 className="mt-4 font-display text-lg font-bold tracking-headline">
                Propuesta enviada
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-mute">
                La empresa la recibió y te contactará al correo que registraste.
              </p>
              <Link
                to="/suppliers"
                className="mt-6 inline-flex rounded-btn border border-hairline px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:border-ink-mute hover:text-ink"
              >
                Volver al portal
              </Link>
            </div>
          ) : (
            <form onSubmit={submit} className="flex flex-col gap-4">
              <h2 className="font-display text-lg font-bold tracking-headline">Enviar propuesta</h2>
              <Field accent="supplier" label="Empresa" value={form.empresa} onChange={set('empresa')} required />
              <Field accent="supplier" label="Contacto" value={form.contacto} onChange={set('contacto')} />
              <Field
                accent="supplier"
                label="Correo"
                type="email"
                value={form.correo}
                onChange={set('correo')}
                required
              />
              <Field
                accent="supplier"
                label="Propuesta económica (MXN)"
                type="number"
                min="0"
                value={form.monto}
                onChange={set('monto')}
                required
              />
              <Field accent="supplier" label="Resumen breve" value={form.resumen} onChange={set('resumen')} />
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-ink">Descripción de la propuesta</label>
                <textarea
                  value={form.descripcion}
                  onChange={set('descripcion')}
                  rows={5}
                  required
                  className="w-full resize-none rounded-btn border border-hairline bg-white px-3.5 py-2.5 text-[0.95rem] text-ink transition-colors placeholder:text-ink-mute/70 focus:border-supplier focus:outline-none focus:ring-4 focus:ring-supplier/20"
                />
              </div>
              <button
                type="button"
                disabled
                className="inline-flex items-center justify-center gap-2 rounded-btn border border-dashed border-hairline px-4 py-2.5 text-sm font-medium text-ink-mute opacity-70"
              >
                <Paperclip size={16} />
                Agregar archivo
                <span className="rounded-full bg-canvas-soft px-2 py-0.5 text-[0.65rem] font-medium text-ink-mute">
                  En camino
                </span>
              </button>
              <button
                type="submit"
                disabled={!valid}
                className="rounded-btn bg-supplier px-4 py-2.5 text-[0.88rem] font-medium text-white transition-colors hover:bg-[#243da0] disabled:pointer-events-none disabled:opacity-50"
              >
                Enviar propuesta
              </button>
            </form>
          )}
        </aside>
      </div>
    </div>
  )
}
