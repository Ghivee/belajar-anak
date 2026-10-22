import { createContext, useContext } from 'react'
import type { Settings } from './db'

export interface AppCtx {
  settings: Settings
  /** Ucapkan teks narasi dengan kunci i18n, dalam bahasa yang dipilih orang tua. */
  say: (key: string, vars?: Record<string, string | number>) => void
  /** Ucapkan teks bebas (mis. angka atau nama huruf). */
  sayRaw: (text: string) => void
  tr: (key: string, vars?: Record<string, string | number>) => string
}

export const AppContext = createContext<AppCtx | null>(null)

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp dipakai di luar AppContext')
  return ctx
}
