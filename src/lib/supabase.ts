import { createClient } from '@supabase/supabase-js'

/**
 * Supabase client, ready for when auth and tables land (System Design phases 0-1).
 * Today the UI runs on mock data in src/data, so a missing env just warns.
 * Per the playbook: anon key only on the client, service role never ships here.
 */
const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

if (!url || !anonKey) {
  // eslint-disable-next-line no-console
  console.warn(
    '[mint] Supabase env not set. Running on mock data. ' +
      'Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env.local to connect.',
  )
}

export const supabase =
  url && anonKey ? createClient(url, anonKey) : null
