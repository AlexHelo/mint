import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Logo } from '@/components/site/Logo'

/** Top nav over the gradient hero. Single line, blurred navy, hairline base. */
export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-navy/70 backdrop-blur-xl">
      <nav className="container-content flex items-center justify-between py-4">
        <Link to="/" aria-label="Mint, inicio">
          <Logo />
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link to="/proveedor">
            <Button variant="ghost" size="sm">
              Soy proveedor
            </Button>
          </Link>
          <Link to="/cliente">
            <Button variant="client" size="sm">
              Comenzar gratis
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  )
}
