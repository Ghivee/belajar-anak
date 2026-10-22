import type { Lang } from '../../lib/i18n'

export interface Word {
  letter: string
  word: string
  pic: string
}

// Satu kata bergambar per huruf. Q dan X dilewati karena sulit dicarikan kata yang dikenal anak.
const ID: Word[] = [
  { letter: 'A', word: 'Ayam', pic: '🐔' },
  { letter: 'B', word: 'Bola', pic: '⚽' },
  { letter: 'C', word: 'Ceri', pic: '🍒' },
  { letter: 'D', word: 'Domba', pic: '🐑' },
  { letter: 'E', word: 'Elang', pic: '🦅' },
  { letter: 'F', word: 'Foto', pic: '📷' },
  { letter: 'G', word: 'Gajah', pic: '🐘' },
  { letter: 'H', word: 'Harimau', pic: '🐅' },
  { letter: 'I', word: 'Ikan', pic: '🐟' },
  { letter: 'J', word: 'Jeruk', pic: '🍊' },
  { letter: 'K', word: 'Kucing', pic: '🐈' },
  { letter: 'L', word: 'Lebah', pic: '🐝' },
  { letter: 'M', word: 'Mobil', pic: '🚗' },
  { letter: 'N', word: 'Nanas', pic: '🍍' },
  { letter: 'O', word: 'Ombak', pic: '🌊' },
  { letter: 'P', word: 'Paus', pic: '🐋' },
  { letter: 'R', word: 'Roti', pic: '🍞' },
  { letter: 'S', word: 'Sapi', pic: '🐄' },
  { letter: 'T', word: 'Topi', pic: '🎩' },
  { letter: 'U', word: 'Ular', pic: '🐍' },
  { letter: 'V', word: 'Vas', pic: '🏺' },
  { letter: 'W', word: 'Wortel', pic: '🥕' },
  { letter: 'Y', word: 'Yoyo', pic: '🪀' },
  { letter: 'Z', word: 'Zebra', pic: '🦓' },
]

const EN: Word[] = [
  { letter: 'A', word: 'Apple', pic: '🍎' },
  { letter: 'B', word: 'Ball', pic: '⚽' },
  { letter: 'C', word: 'Cat', pic: '🐈' },
  { letter: 'D', word: 'Dog', pic: '🐕' },
  { letter: 'E', word: 'Egg', pic: '🥚' },
  { letter: 'F', word: 'Fish', pic: '🐟' },
  { letter: 'G', word: 'Grapes', pic: '🍇' },
  { letter: 'H', word: 'Hat', pic: '🎩' },
  { letter: 'I', word: 'Ice cream', pic: '🍦' },
  { letter: 'J', word: 'Jellyfish', pic: '🪼' },
  { letter: 'K', word: 'Kite', pic: '🪁' },
  { letter: 'L', word: 'Lion', pic: '🦁' },
  { letter: 'M', word: 'Moon', pic: '🌙' },
  { letter: 'N', word: 'Nest', pic: '🪺' },
  { letter: 'O', word: 'Octopus', pic: '🐙' },
  { letter: 'P', word: 'Penguin', pic: '🐧' },
  { letter: 'R', word: 'Rabbit', pic: '🐇' },
  { letter: 'S', word: 'Sun', pic: '☀️' },
  { letter: 'T', word: 'Turtle', pic: '🐢' },
  { letter: 'U', word: 'Umbrella', pic: '☂️' },
  { letter: 'V', word: 'Violin', pic: '🎻' },
  { letter: 'W', word: 'Whale', pic: '🐋' },
  { letter: 'Y', word: 'Yo-yo', pic: '🪀' },
  { letter: 'Z', word: 'Zebra', pic: '🦓' },
]

export function wordsFor(lang: Lang) {
  return lang === 'en' ? EN : ID
}

export const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
