import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-8 text-center">
      <p className="font-display text-7xl font-bold tracking-headline text-ink">404</p>
      <h1 className="mt-4 font-display text-xl font-bold tracking-headline">
        Página no encontrada
      </h1>
      <p className="mt-2 text-[0.95rem] text-ink-mute">
        La página que buscas no existe o fue movida.
      </p>
      <Link
        to="/app"
        className="mt-7 rounded-btn bg-mint-ink px-5 py-2.5 text-[0.88rem] font-medium text-white transition-colors hover:bg-mint-deep"
      >
        Volver al dashboard
      </Link>
    </div>
  )
}
