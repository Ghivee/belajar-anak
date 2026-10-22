import { shuffle } from '../../lib/random'
import type { Word } from './words'

/** Utamakan huruf yang belum dikenal anak (diatur orang tua), lalu isi dengan huruf lain. */
export function pickTargets(words: Word[], known: string[], count: number): Word[] {
  const unknown = shuffle(words.filter((w) => !known.includes(w.letter)))
  const rest = shuffle(words.filter((w) => known.includes(w.letter)))
  return [...unknown, ...rest].slice(0, count)
}

/** Dua pengecoh dengan huruf awal berbeda dari target. */
export function distractors(words: Word[], target: Word, count = 2): Word[] {
  return shuffle(words.filter((w) => w.letter !== target.letter)).slice(0, count)
}
