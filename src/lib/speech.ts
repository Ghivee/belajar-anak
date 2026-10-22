// Narasi memakai suara TTS bawaan perangkat (Web Speech API).
// Di iPad suara bahasa Indonesia tersedia tanpa internet.

import type { Lang } from './i18n'

const LOCALE: Record<Lang, string> = { id: 'id-ID', en: 'en-US' }

let lastText = ''
let lastLang: Lang = 'id'

function pickVoice(lang: Lang): SpeechSynthesisVoice | undefined {
  const voices = window.speechSynthesis?.getVoices() ?? []
  const prefix = LOCALE[lang].slice(0, 2)
  return (
    voices.find((v) => v.lang === LOCALE[lang]) ??
    voices.find((v) => v.lang.replace('_', '-').startsWith(prefix))
  )
}

export function speak(text: string, lang: Lang = 'id') {
  lastText = text
  lastLang = lang
  const synth = window.speechSynthesis
  if (!synth) return
  synth.cancel()
  const u = new SpeechSynthesisUtterance(text)
  u.lang = LOCALE[lang]
  const voice = pickVoice(lang)
  if (voice) u.voice = voice
  // sedikit lebih lambat dan tinggi supaya ramah untuk anak
  u.rate = 0.85
  u.pitch = 1.1
  synth.speak(u)
}

export function repeatLast() {
  if (lastText) speak(lastText, lastLang)
}

export function stopSpeaking() {
  window.speechSynthesis?.cancel()
}

// iOS baru mengizinkan suara setelah ada sentuhan pertama dari pengguna
export function unlockSpeech() {
  const synth = window.speechSynthesis
  if (!synth) return
  const u = new SpeechSynthesisUtterance(' ')
  u.volume = 0
  synth.speak(u)
}
