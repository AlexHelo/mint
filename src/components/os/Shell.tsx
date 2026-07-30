import { Gear, PlusSquare, SquaresFour, Storefront } from '@phosphor-icons/react'
import { NavLink, Outlet } from 'react-router-dom'
import { Logo } from '@/components/site/Logo'
import { cn } from '@/lib/utils'

/**
 * App shell for the Procurement OS: fixed dark-navy sidebar, light content
 * canvas. Mirrors the Lovable prototype's layout on the repo's own tokens.
 */

const NAV = [
  { to: '/app', label: 'Dashboard', icon: SquaresFour, end: true },
  { to: '/tenders/new', label: 'Nueva licitación', icon: PlusSquare, end: false },
  { to: '/suppliers', label: 'Portal proveedores', icon: Storefront, end: false },
]

export function Shell() {
  return (
    <div className="flex min-h-screen bg-canvas-soft">
      {/* sidebar hides under lg; a real mobile nav is P1 */}
      <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col bg-navy text-white lg:flex">
        <div className="border-b border-white/10 px-5 py-5">
          <Logo onDark />
          <p className="mt-1 pl-9 text-xs text-white/50">Licitaciones en orden</p>
        </div>

        <nav className="flex flex-col gap-1 p-3">
          {NAV.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                cn(
                  'relative flex items-center gap-3 rounded-btn px-3 py-2.5 text-[0.9rem] font-medium transition-colors',
                  isActive
                    ? "bg-white/10 text-white before:absolute before:left-0 before:top-1/2 before:h-5 before:w-[3px] before:-translate-y-1/2 before:rounded-full before:bg-mint before:content-['']"
                    : 'text-white/60 hover:bg-white/5 hover:text-white',
                )
              }
            >
              <Icon size={18} weight="regular" />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto border-t border-white/10 p-3">
          <button className="flex w-full items-center gap-3 rounded-btn px-3 py-2.5 text-[0.9rem] font-medium text-white/60 transition-colors hover:bg-white/5 hover:text-white">
            <Gear size={18} />
            Configuración
          </button>
          <div className="flex items-center gap-3 px-3 py-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-mint-deep text-xs font-semibold text-white">
              AM
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-medium">Andrea M.</span>
              <span className="block text-xs text-white/50">Distribuidora del Bajío</span>
            </span>
          </div>
        </div>
      </aside>

      <main className="min-h-screen min-w-0 flex-1 lg:ml-64">
        <Outlet />
      </main>
    </div>
  )
}
