import { Footer } from '@/components/site/Footer'
import { Hero } from '@/components/landing/Hero'
import { TwoAudiences } from '@/components/landing/TwoAudiences'
import { ClosingCta } from '@/components/landing/ClosingCta'

export function Landing() {
  // Hero renders its own transparent nav over the gradient (Stripe-style).
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <main>
        <Hero />
        <TwoAudiences />
        <ClosingCta />
      </main>
      <Footer />
    </div>
  )
}
