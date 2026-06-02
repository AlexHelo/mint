import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Logo } from '@/components/site/Logo'

/**
 * Top nav. Two modes:
 * - default: solid white, hairline base (used on app/inner pages)
 * - onDark: transparent, white text, sits OVER the gradient hero (landing)
 */
export function Navbar({ onDark }: { onDark?: boolean }) {
  if (onDark) {
    return (
      <nav className="container-content relative z-20 flex items-center justify-between py-5">
        <Link to="/" aria-label="Mint, inicio">
          <Logo onDark />
        </Link>

        <div className="hidden items-center gap-8 text-sm text-white/80 md:flex">
          <a href="#como-funciona" className="transition-colors hover:text-white">
            Cómo funciona
          </a>
          <Link to="/proveedor" className="transition-colors hover:text-white">
            Proveedores
          </Link>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link to="/proveedor">
            <Button variant="ghostDark" size="sm">
              Soy proveedor
            </Button>
          </Link>
          <Link to="/cliente">
            <Button variant="client" size="sm">
              Empezar gratis
            </Button>
          </Link>
        </div>
      </nav>
    )
  }

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-canvas/80 backdrop-blur-xl">
      <nav className="container-content flex items-center justify-between py-4">
        <Link to="/" aria-label="Mint, inicio">
          <Logo />
        </Link>

        <span className="hidden text-sm text-ink-mute lg:block">
          La plataforma #1 para licitar proyectos tech en México
        </span>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link to="/proveedor">
            <Button variant="ghost" size="sm">
              Soy proveedor
            </Button>
          </Link>
          <Link to="/cliente">
            <Button variant="client" size="sm">
              Empezar gratis
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  )
}
