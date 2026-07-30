import { createContext, useContext, useEffect, useState } from 'react'
import { SEED_TENDERS, STAGES, type Application, type Stage, type Tender } from '@/lib/tenders'

/**
 * In-browser tender store: seed fixtures + localStorage persistence so a demo
 * survives a refresh. Replaced by Supabase through a services layer when
 * tables land, same action surface.
 */

// v2: amountUsd -> amountMxn, Mexican seed data. Old v1 blobs are ignored.
const KEY = 'mint-os-tenders-v2'

interface TenderStore {
  tenders: Tender[]
  getTender: (id: string) => Tender | undefined
  upsertTender: (tender: Tender) => void
  removeTender: (id: string) => void
  addApplication: (tenderId: string, app: Application) => void
  moveStage: (tenderId: string, appId: string, dir: 1 | -1) => void
  setStage: (tenderId: string, appId: string, stage: Stage) => void
}

const Ctx = createContext<TenderStore | null>(null)

function load(): Tender[] {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as unknown
      if (Array.isArray(parsed)) return parsed as Tender[]
    }
  } catch {
    // corrupt storage: fall through to seed
  }
  return SEED_TENDERS
}

export function TendersProvider({ children }: { children: React.ReactNode }) {
  const [tenders, setTenders] = useState<Tender[]>(load)

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(tenders))
    } catch {
      // storage full or blocked: the session just loses persistence
    }
  }, [tenders])

  const store: TenderStore = {
    tenders,
    getTender: (id) => tenders.find((t) => t.id === id),
    upsertTender: (tender) =>
      setTenders((prev) =>
        prev.some((t) => t.id === tender.id)
          ? prev.map((t) => (t.id === tender.id ? tender : t))
          : [tender, ...prev],
      ),
    removeTender: (id) => setTenders((prev) => prev.filter((t) => t.id !== id)),
    addApplication: (tenderId, app) =>
      setTenders((prev) =>
        prev.map((t) =>
          t.id === tenderId ? { ...t, applications: [...t.applications, app] } : t,
        ),
      ),
    moveStage: (tenderId, appId, dir) =>
      setTenders((prev) =>
        prev.map((t) => {
          if (t.id !== tenderId) return t
          return {
            ...t,
            applications: t.applications.map((a) => {
              if (a.id !== appId) return a
              const next = STAGES[STAGES.indexOf(a.stage) + dir] as Stage | undefined
              return next ? { ...a, stage: next } : a
            }),
          }
        }),
      ),
    setStage: (tenderId, appId, stage) =>
      setTenders((prev) =>
        prev.map((t) =>
          t.id === tenderId
            ? {
                ...t,
                applications: t.applications.map((a) =>
                  a.id === appId ? { ...a, stage } : a,
                ),
              }
            : t,
        ),
      ),
  }

  return <Ctx.Provider value={store}>{children}</Ctx.Provider>
}

export function useTenders(): TenderStore {
  const store = useContext(Ctx)
  if (!store) throw new Error('useTenders fuera de TendersProvider')
  return store
}
