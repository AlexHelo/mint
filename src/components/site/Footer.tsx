import { Link } from 'react-router-dom'
import { Logo } from '@/components/site/Logo'

export function Footer() {
  return (
    <footer className="border-t border-hairline bg-navy">
      <div className="container-content flex flex-col gap-8 py-12 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-3">
          <Logo />
          <p className="max-w-xs text-sm text-muted">
            La plataforma para licitar proyectos de tecnología en México. Sin
            riesgo, 100% digital.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-12 gap-y-2 text-sm">
          <Link to="/cliente" className="text-white/70 hover:text-mint-light">
            Para clientes
          </Link>
          <Link
            to="/proveedor"
            className="text-white/70 hover:text-supplier-light"
          >
            Para proveedores
          </Link>
        </div>
      </div>

      <div className="container-content border-t border-hairline py-5">
        <p className="text-[0.68rem] text-faint">
          Mint, {new Date().getFullYear()}. Hecho en México.
        </p>
      </div>
    </footer>
  )
}
