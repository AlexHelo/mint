import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Logo } from '@/components/site/Logo'

/**
 * Minimal authenticated-app shell. Dark, same as the rest of the product
 * (page theme lock). A thin accent strip on top signals which world you're in:
 * mint for clients, indigo for suppliers.
 */
export function AppShell({
  audience,
  children,
}: {
  audience: 'client' | 'supplier'
  children: ReactNode
}) {
  const isClient = audience === 'client'
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <div
        className={isClient ? 'h-1 bg-mint' : 'h-1 bg-supplier'}
        aria-hidden
      />
      <header className="border-b border-hairline bg-navy/70 backdrop-blur-xl">
        <div className="container-content flex items-center justify-between py-4">
          <Link to="/" aria-label="Mint, inicio">
            <Logo />
          </Link>
          <span
            className={`text-sm font-medium ${isClient ? 'text-mint-light' : 'text-supplier-light'}`}
          >
            {isClient ? 'Cliente' : 'Proveedor'}
          </span>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  )
}
