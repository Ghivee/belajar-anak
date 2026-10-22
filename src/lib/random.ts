export function randInt(min: number, max: number) {
  return min + Math.floor(Math.random() * (max - min + 1))
}

export function shuffle<T>(arr: readonly T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

/** Pilihan jawaban: jawaban benar + pengecoh unik, diacak. */
export function choicesAround(answer: number, count: number, min: number, max: number) {
  const set = new Set([answer])
  const offsets = shuffle([-2, -1, 1, 2, 3, -3])
  for (const o of offsets) {
    if (set.size >= count) break
    const v = answer + o
    if (v >= min && v <= max) set.add(v)
  }
  return shuffle([...set])
}
