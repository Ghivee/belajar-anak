// Bunyi umpan balik yang lembut, dibuat langsung dengan Web Audio (tanpa file).

let ctx: AudioContext | null = null

function audio(): AudioContext | null {
  if (!ctx) {
    const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!AC) return null
    ctx = new AC()
  }
  if (ctx.state === 'suspended') void ctx.resume()
  return ctx
}

function tone(freq: number, start: number, dur: number, vol = 0.12) {
  const a = audio()
  if (!a) return
  const osc = a.createOscillator()
  const gain = a.createGain()
  osc.type = 'sine'
  osc.frequency.value = freq
  const t = a.currentTime + start
  gain.gain.setValueAtTime(0, t)
  gain.gain.linearRampToValueAtTime(vol, t + 0.02)
  gain.gain.exponentialRampToValueAtTime(0.001, t + dur)
  osc.connect(gain).connect(a.destination)
  osc.start(t)
  osc.stop(t + dur + 0.05)
}

/** Bunyi "pop" kecil untuk setiap ketukan, supaya anak tahu ketukannya terdaftar. */
export function popSound() {
  tone(660, 0, 0.08, 0.08)
}

/** Dua nada naik yang tenang saat jawaban tepat. */
export function chimeSound() {
  tone(523, 0, 0.25)
  tone(784, 0.12, 0.35)
}

/** Nada rendah yang lembut saat belum tepat (bukan bunyi "salah"). */
export function softBump() {
  tone(330, 0, 0.18, 0.06)
}

export function unlockAudio() {
  audio()
}
