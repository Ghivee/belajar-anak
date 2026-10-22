// Semua data disimpan di perangkat (IndexedDB). Tidak ada akun dan tidak ada server.

import Dexie, { type EntityTable } from 'dexie'
import type { Lang } from './i18n'

export interface Settings {
  id: 'main'
  nickname: string
  lang: Lang
  sessionMinutes: number
  sessionsPerDay: number
  calmMotion: boolean
  knownLetters: string[]
}

export interface Completion {
  id?: number
  module: 'angka' | 'huruf'
  activity: string
  at: number
  /** jumlah percobaan yang belum tepat sebelum berhasil */
  misses: number
  detail?: string
}

export interface SessionLog {
  id?: number
  day: string
  startedAt: number
}

export const DEFAULT_SETTINGS: Settings = {
  id: 'main',
  nickname: 'Adik',
  lang: 'id',
  sessionMinutes: 15,
  sessionsPerDay: 2,
  calmMotion: false,
  knownLetters: [],
}

export const db = new Dexie('laut-belajar') as Dexie & {
  settings: EntityTable<Settings, 'id'>
  completions: EntityTable<Completion, 'id'>
  sessions: EntityTable<SessionLog, 'id'>
}

db.version(1).stores({
  settings: 'id',
  completions: '++id, module, activity, at',
  sessions: '++id, day',
})

export function today() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export async function loadSettings(): Promise<Settings> {
  return (await db.settings.get('main')) ?? DEFAULT_SETTINGS
}

export async function saveSettings(s: Settings) {
  await db.settings.put(s)
}

export async function recordCompletion(c: Omit<Completion, 'id' | 'at'>) {
  await db.completions.add({ ...c, at: Date.now() })
}

export async function sessionsToday() {
  return db.sessions.where('day').equals(today()).count()
}

export async function startSession() {
  await db.sessions.add({ day: today(), startedAt: Date.now() })
}

// Minta browser agar data tidak dihapus otomatis saat ruang penyimpanan menipis.
export async function requestPersistence() {
  try {
    await navigator.storage?.persist?.()
  } catch {
    // tidak didukung: abaikan
  }
}
