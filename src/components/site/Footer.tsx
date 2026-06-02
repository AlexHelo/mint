import { Link } from 'react-router-dom'
import { Logo } from '@/components/site/Logo'

/** Dark footer, anchors the light page and echoes the brand navy. */
export function Footer() {
  const trust = [
    'Proveedores verificados',
    'Proceso 100% digital',
    'Sin intermediarios',
  ]
  return (
    <footer className="bg-navy text-white">
      <div className="container-content flex flex-col gap-8 py-12 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-3">
          <Logo onDark />
          <p className="max-w-xs text-sm text-white/55">
            La plataforma para licitar proyectos de tecnología en México. Sin
            riesgo, 100% digital.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-12 gap-y-2 text-sm">
          <Link to="/cliente" className="text-white/70 hover:text-mint-light">
            Para clientes
          </Link>
          <Link to="/proveedor" className="text-white/70 hover:text-supplier-light">
            Para proveedores
          </Link>
        </div>
      </div>

      <div className="container-content flex flex-col gap-3 border-t border-white/10 py-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[0.68rem] text-white/30">
          Mint, {new Date().getFullYear()}. Hecho en México.
        </p>
        <div className="flex flex-wrap gap-x-5 gap-y-1">
          {trust.map((t) => (
            <span
              key={t}
              className="inline-flex items-center gap-1.5 text-[0.68rem] text-white/40"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-mint" />
              {t}
            </span>
          ))}
        </div>
      </div>
    </footer>
  )
}
