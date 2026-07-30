import { ArrowLeft, FloppyDisk, PaperPlaneRight, UploadSimple } from '@phosphor-icons/react'
import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useTenders } from '@/lib/store'
import {
  DONE_MESSAGE,
  QUESTIONS,
  SECTIONS,
  emptyDoc,
  type SectionKey,
  type Tender,
  type TenderDoc,
} from '@/lib/tenders'
import { cn } from '@/lib/utils'
import { Folio } from '@/components/brand/Folio'

interface Message {
  from: 'assistant' | 'user'
  text: string
}

function todayLabel(): string {
  return new Date()
    .toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' })
    .replace('.', '')
}

/**
 * RFP builder: the document on the left, the Asistente Mint chat on the
 * right. The assistant runs a 10-question script and drops each answer into
 * its section verbatim; every section stays directly editable. The filled
 * section scrolls into view and flashes so the cause-effect reads instantly.
 */
export function TenderBuilder() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getTender, upsertTender } = useTenders()
  const existing = id ? getTender(id) : undefined

  const [tenderId] = useState(() => existing?.id ?? crypto.randomUUID())
  const [doc, setDoc] = useState<TenderDoc>(() => existing?.doc ?? emptyDoc())
  const [deadline, setDeadline] = useState(existing?.deadline ?? '')
  const [answered, setAnswered] = useState(0)
  const [messages, setMessages] = useState<Message[]>([
    { from: 'assistant', text: QUESTIONS[0].question },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [flashKey, setFlashKey] = useState<SectionKey | null>(null)
  const logRef = useRef<HTMLDivElement>(null)
  const sectionRefs = useRef<Partial<Record<SectionKey, HTMLTextAreaElement | null>>>({})

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, typing])

  useEffect(() => {
    if (!flashKey) return
    sectionRefs.current[flashKey]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    const t = setTimeout(() => setFlashKey(null), 1300)
    return () => clearTimeout(t)
  }, [flashKey])

  function setSection(key: keyof TenderDoc, value: string) {
    setDoc((d) => ({ ...d, [key]: value }))
  }

  function send() {
    const text = input.trim()
    if (!text || typing || answered >= QUESTIONS.length) return
    const { target } = QUESTIONS[answered]
    if (target === 'deadline') setDeadline(text)
    else {
      setSection(target, text)
      setFlashKey(target)
    }

    const next = answered + 1
    setAnswered(next)
    setInput('')
    setMessages((m) => [...m, { from: 'user', text }])
    setTyping(true)
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          from: 'assistant',
          text: next < QUESTIONS.length ? QUESTIONS[next].question : DONE_MESSAGE,
        },
      ])
      setTyping(false)
    }, 700)
  }

  function buildTender(status: Tender['status']): Tender {
    return {
      id: tenderId,
      doc,
      status,
      createdAt: existing?.createdAt ?? todayLabel(),
      deadline: deadline || 'Por definir',
      applications: existing?.applications ?? [],
    }
  }

  function saveDraft() {
    upsertTender(buildTender(existing?.status === 'published' ? 'published' : 'draft'))
    navigate('/app')
  }

  function publish() {
    upsertTender(buildTender('published'))
    navigate(`/tenders/${tenderId}`, { state: { published: true } })
  }

  return (
    <div className="flex h-screen flex-col">
      <header className="border-b border-hairline bg-white">
        <div className="flex items-center justify-between px-6 py-3.5">
          <div className="flex items-center gap-4">
            <Link
              to="/app"
              className="rounded-btn p-1.5 text-ink-mute transition-colors hover:bg-canvas-soft hover:text-ink"
              aria-label="Volver al dashboard"
            >
              <ArrowLeft size={18} />
            </Link>
            <div>
              <h1 className="font-display text-lg font-bold tracking-headline">
                {doc.titulo || 'Nueva licitación'}
              </h1>
              <p className="text-xs text-ink-mute">
                {existing?.status === 'published' ? 'Publicada' : 'Borrador'} · {answered}/
                {QUESTIONS.length} preguntas
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <button
              onClick={saveDraft}
              className="inline-flex items-center gap-2 rounded-btn border border-hairline bg-white px-4 py-2 text-[0.85rem] font-medium text-ink-soft transition-colors hover:border-ink-mute hover:text-ink"
            >
              <FloppyDisk size={16} />
              Guardar borrador
            </button>
            <button
              onClick={publish}
              disabled={!doc.titulo.trim()}
              className="inline-flex items-center gap-2 rounded-btn bg-mint-ink px-4 py-2 text-[0.85rem] font-medium text-white transition-colors hover:bg-mint-deep disabled:pointer-events-none disabled:opacity-50"
            >
              <UploadSimple size={16} weight="bold" />
              Publicar
            </button>
          </div>
        </div>
        {/* Question progress */}
        <div className="h-0.5 w-full bg-hairline/60">
          <div
            className="h-full bg-mint transition-all duration-500"
            style={{ width: `${(answered / QUESTIONS.length) * 100}%` }}
          />
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        {/* Document */}
        <div className="min-w-0 flex-1 overflow-y-auto bg-canvas-soft px-8 py-8">
          <div className="mx-auto max-w-[640px] rounded-card border border-hairline bg-white px-9 py-10 shadow-card">
            <label className="text-[0.7rem] font-semibold uppercase tracking-eyebrow text-ink-mute">
              Título de la licitación
            </label>
            <input
              value={doc.titulo}
              onChange={(e) => setSection('titulo', e.target.value)}
              placeholder="Sin definir"
              className="mt-1 w-full border-0 p-0 font-display text-[1.7rem] font-bold tracking-headline text-ink outline-none placeholder:text-ink-mute/40"
            />

            {SECTIONS.filter((s) => s.key !== 'titulo').map(({ key, label }) => (
              <div key={key} className="mt-7">
                <label className="text-[0.7rem] font-semibold uppercase tracking-eyebrow text-ink-mute">
                  {label}
                </label>
                <textarea
                  rows={2}
                  ref={(el) => (sectionRefs.current[key] = el)}
                  value={doc[key]}
                  onChange={(e) => setSection(key, e.target.value)}
                  placeholder="Pendiente - la IA completará esta sección"
                  className={cn(
                    'mt-2 w-full resize-none [field-sizing:content] rounded-btn border border-hairline bg-white px-3.5 py-2.5 text-[0.92rem] leading-relaxed text-ink outline-none transition-colors placeholder:italic placeholder:text-ink-mute/50 focus:border-mint-ink focus:ring-4 focus:ring-mint/15',
                    flashKey === key && 'section-flash',
                  )}
                />
              </div>
            ))}

            {deadline ? (
              <p className="mt-7 border-t border-hairline pt-4 text-sm text-ink-mute">
                Fecha límite para recibir propuestas:{' '}
                <span className="font-medium text-ink">{deadline}</span>
              </p>
            ) : null}
          </div>
        </div>

        {/* Assistant */}
        <div className="flex w-[420px] shrink-0 flex-col border-l border-hairline bg-white">
          <div className="flex items-center gap-3 border-b border-hairline px-5 py-4">
            <Folio size={36} progress={answered / QUESTIONS.length} tone="mint" />
            <div>
              <p className="text-sm font-semibold text-ink">Asistente Mint</p>
              <p className="text-xs text-ink-mute">Te ayudo a construir tu licitación</p>
            </div>
          </div>

          <div ref={logRef} className="flex-1 space-y-3 overflow-y-auto px-5 py-5">
            {messages.map((m, i) => (
              <div
                key={i}
                className={cn(
                  'max-w-[85%] animate-fade-up rounded-card px-4 py-2.5 text-[0.9rem] leading-relaxed',
                  m.from === 'assistant'
                    ? 'bg-canvas-soft text-ink'
                    : 'ml-auto bg-mint-ink text-white',
                )}
              >
                {m.text}
              </div>
            ))}
            {typing ? (
              <div className="flex w-fit items-center gap-1 rounded-card bg-canvas-soft px-4 py-3">
                <span className="typing-dot" />
                <span className="typing-dot" />
                <span className="typing-dot" />
              </div>
            ) : null}
          </div>

          <div className="border-t border-hairline p-4">
            <div className="flex items-end gap-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    send()
                  }
                }}
                rows={2}
                placeholder={
                  answered < QUESTIONS.length ? 'Escribe tu respuesta aquí...' : 'Cuestionario completo'
                }
                disabled={answered >= QUESTIONS.length}
                className="min-h-[52px] flex-1 resize-none rounded-btn border border-hairline bg-white px-3.5 py-2.5 text-[0.9rem] text-ink outline-none transition-colors placeholder:text-ink-mute/60 focus:border-mint-ink focus:ring-4 focus:ring-mint/15 disabled:bg-canvas-soft"
              />
              <button
                onClick={send}
                disabled={!input.trim() || typing || answered >= QUESTIONS.length}
                aria-label="Enviar respuesta"
                className="flex h-[52px] w-11 items-center justify-center rounded-btn bg-mint-ink text-white transition-colors hover:bg-mint-deep disabled:pointer-events-none disabled:opacity-40"
              >
                <PaperPlaneRight size={18} weight="fill" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
