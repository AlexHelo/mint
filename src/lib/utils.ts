import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Merge Tailwind classes with conflict resolution. The house cn(). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Format a MXN budget the way the dashboards show it. */
export function formatMXN(amount: number): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    maximumFractionDigits: 0,
  }).format(amount)
}

/** "hace 3 días" style relative label from an ISO date, Spanish. */
export function relativeDays(iso: string, today = '2026-06-01'): string {
  const ms = new Date(iso).getTime() - new Date(today).getTime()
  const days = Math.round(ms / 86_400_000)
  if (days === 0) return 'hoy'
  if (days > 0) return `en ${days} ${days === 1 ? 'día' : 'días'}`
  const past = Math.abs(days)
  return `hace ${past} ${past === 1 ? 'día' : 'días'}`
}
