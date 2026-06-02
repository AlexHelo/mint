import { Navbar } from '@/components/site/Navbar'
import { Footer } from '@/components/site/Footer'
import { Hero } from '@/components/landing/Hero'
import { TwoAudiences } from '@/components/landing/TwoAudiences'
import { ClosingCta } from '@/components/landing/ClosingCta'

export function Landing() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <Navbar />
      <main>
        <Hero />
        <TwoAudiences />
        <ClosingCta />
      </main>
      <Footer />
    </div>
  )
}
