import { CalendarBlank, CurrencyDollar } from '@phosphor-icons/react'
import { AppShell } from '@/components/site/AppShell'
import { Badge } from '@/components/ui/Badge'
import { ProposalCard } from '@/components/client/ProposalCard'
import { INTERESTED_PROPOSALS, MY_RFP } from '@/data/mock'
import { formatMXN } from '@/lib/utils'

/** Client dashboard: my published RFP + suppliers interested in it. */
export function ClientDashboard() {
  return (
    <AppShell audience="client">
      <div className="container-content py-12">
        {/* The client's own published licitación */}
        <section className="mb-10 rounded-card border border-mint/20 bg-gradient-to-b from-mint/[0.06] to-transparent p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col items-start gap-2">
              <Badge tone="client">Publicada</Badge>
              <h1 className="headline text-[clamp(1.4rem,3vw,2rem)] text-white">
                {MY_RFP.title}
              </h1>
              <p className="max-w-2xl text-muted">{MY_RFP.scope}</p>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-6 border-t border-hairline pt-5 text-sm">
            <span className="inline-flex items-center gap-2 text-white/80">
              <CurrencyDollar size={17} className="text-mint-light" />
              {formatMXN(MY_RFP.budgetEstimate)}
            </span>
            <span className="inline-flex items-center gap-2 text-white/80">
              <CalendarBlank size={17} className="text-mint-light" />
              Cierra el{' '}
              {new Date(MY_RFP.deadline).toLocaleDateString('es-MX', {
                day: 'numeric',
                month: 'long',
              })}
            </span>
          </div>
        </section>

        {/* Interested suppliers */}
        <div className="mb-5 flex items-baseline justify-between">
          <h2 className="font-display text-xl font-semibold text-white">
            Proveedores interesados
          </h2>
          <span className="text-sm text-faint">
            {INTERESTED_PROPOSALS.length} propuestas
          </span>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {INTERESTED_PROPOSALS.map((p) => (
            <ProposalCard key={p.id} proposal={p} />
          ))}
        </div>
      </div>
    </AppShell>
  )
}
