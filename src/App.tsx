import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { Shell } from '@/components/os/Shell'
import { TendersProvider } from '@/lib/store'
import { Landing } from '@/pages/Landing'
import { Apply } from '@/pages/os/Apply'
import { Dashboard } from '@/pages/os/Dashboard'
import { NotFound } from '@/pages/os/NotFound'
import { Portal } from '@/pages/os/Portal'
import { TenderBuilder } from '@/pages/os/TenderBuilder'
import { TenderDetail } from '@/pages/os/TenderDetail'

/** react-router keeps scroll across navigations; the landing is long. */
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    // braced body on purpose: Arc patches scrollTo to return a value, and
    // React would treat that return as an effect cleanup and crash
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

/**
 * `/` is the marketing landing; the OS lives under the Shell:
 * /app (dashboard), /tenders/* (client side), /suppliers/* (provider side).
 */
export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <TendersProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route element={<Shell />}>
            <Route path="/app" element={<Dashboard />} />
            <Route path="/tenders/new" element={<TenderBuilder />} />
            <Route path="/tenders/:id" element={<TenderDetail />} />
            <Route path="/tenders/:id/edit" element={<TenderBuilder />} />
            <Route path="/suppliers" element={<Portal />} />
            <Route path="/suppliers/:id" element={<Apply />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </TendersProvider>
    </BrowserRouter>
  )
}
