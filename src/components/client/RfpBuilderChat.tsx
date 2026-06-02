import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PaperPlaneRight, Sparkle } from '@phosphor-icons/react'
import { Button } from '@/components/ui/Button'

/**
 * The RFP-builder chat. In production this streams from the `rfp-builder`
 * Edge Function (Claude Sonnet 4.6) and ends by calling the publishRfp tool.
 * Here it's a scripted mock so the flow is clickable. Light surface.
 */
interface Msg {
  from: 'agent' | 'user'
  text: string
}

const AGENT_SCRIPT = [
  'Hola, soy el asistente de Mint. Cuéntame qué proyecto de tecnología necesitas, como si me lo explicaras a un amigo.',
  'Perfecto. ¿Más o menos para cuántas personas o en qué parte de tu operación se usaría?',
  '¿Tienes una idea del presupuesto y para cuándo lo necesitas? No te preocupes si es aproximado.',
  'Listo. Ya tengo lo que necesito para armar tu licitación profesional. Vamos a registrar tu empresa y la publicamos.',
]

const SUGGESTIONS = [
  'Necesito una app para mi fuerza de ventas',
  'Quiero un modelo de IA para predecir demanda',
  'Busco migrar mi sistema a la nube',
]

export function RfpBuilderChat() {
  const navigate = useNavigate()
  const [messages, setMessages] = useState<Msg[]>([
    { from: 'agent', text: AGENT_SCRIPT[0] },
  ])
  const [turn, setTurn] = useState(0)
  const [input, setInput] = useState('')
  const [thinking, setThinking] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const done = turn >= AGENT_SCRIPT.length - 1

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    })
  }, [messages, thinking])

  function send(text: string) {
    const value = text.trim()
    if (!value || thinking || done) return
    setInput('')
    setMessages((m) => [...m, { from: 'user', text: value }])
    setThinking(true)

    const nextAgent = AGENT_SCRIPT[turn + 1]
    window.setTimeout(() => {
      setThinking(false)
      setTurn((t) => t + 1)
      if (nextAgent) setMessages((m) => [...m, { from: 'agent', text: nextAgent }])
    }, 900)
  }

  return (
    <div className="mx-auto flex h-[min(70vh,640px)] w-full max-w-2xl flex-col overflow-hidden rounded-card border border-hairline bg-white shadow-card">
      <div className="flex items-center gap-2 border-b border-hairline px-5 py-3.5">
        <Sparkle weight="fill" className="text-mint-ink" size={18} />
        <span className="font-display text-sm font-semibold text-ink">
          Asistente de licitación
        </span>
      </div>

      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-5">
        {messages.map((m, i) => (
          <Bubble key={i} from={m.from}>
            {m.text}
          </Bubble>
        ))}
        {thinking && (
          <Bubble from="agent">
            <span className="inline-flex gap-1">
              <Dot /> <Dot /> <Dot />
            </span>
          </Bubble>
        )}

        {turn === 0 && !thinking && (
          <div className="flex flex-wrap gap-2 pt-1">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="rounded-full border border-hairline px-3 py-1.5 text-xs text-ink-soft transition-colors hover:border-mint-ink hover:text-mint-ink"
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="border-t border-hairline p-4">
        {done ? (
          <Button
            variant="client"
            size="lg"
            className="w-full"
            onClick={() => navigate('/cliente/registro')}
          >
            Registrar mi empresa y publicar
          </Button>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              send(input)
            }}
            className="flex items-center gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu respuesta..."
              className="flex-1 rounded-btn border border-hairline bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-mute/70 focus:border-mint-ink focus:outline-none focus:ring-4 focus:ring-mint/20"
            />
            <Button
              type="submit"
              variant="client"
              aria-label="Enviar"
              disabled={!input.trim() || thinking}
            >
              <PaperPlaneRight weight="fill" size={18} />
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}

function Bubble({
  from,
  children,
}: {
  from: 'agent' | 'user'
  children: React.ReactNode
}) {
  const isAgent = from === 'agent'
  return (
    <div className={isAgent ? 'flex justify-start' : 'flex justify-end'}>
      <div
        className={
          isAgent
            ? 'max-w-[85%] rounded-card rounded-tl-sm border border-hairline bg-canvas-soft px-4 py-2.5 text-sm leading-relaxed text-ink'
            : 'max-w-[85%] rounded-card rounded-tr-sm bg-mint px-4 py-2.5 text-sm leading-relaxed text-[#001F0F]'
        }
      >
        {children}
      </div>
    </div>
  )
}

function Dot() {
  return (
    <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-ink-mute/50" />
  )
}
