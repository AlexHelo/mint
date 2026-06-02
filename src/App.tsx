import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Landing } from '@/pages/Landing'
import { ClientStart } from '@/pages/client/ClientStart'
import { ClientRegister } from '@/pages/client/ClientRegister'
import { ClientDashboard } from '@/pages/client/ClientDashboard'
import { SupplierRegister } from '@/pages/supplier/SupplierRegister'
import { SupplierDashboard } from '@/pages/supplier/SupplierDashboard'

/**
 * Routes mirror the two flows in the product doc.
 * Client:   /cliente (chat) -> /cliente/registro -> /cliente/panel
 * Supplier: /proveedor (onboarding) -> /proveedor/panel
 * Auth gating lands once Supabase Auth is wired (System Design phase 1).
 */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route path="/cliente" element={<ClientStart />} />
        <Route path="/cliente/registro" element={<ClientRegister />} />
        <Route path="/cliente/panel" element={<ClientDashboard />} />

        <Route path="/proveedor" element={<SupplierRegister />} />
        <Route path="/proveedor/panel" element={<SupplierDashboard />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
