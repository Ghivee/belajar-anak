import { useEffect, useMemo, useState } from 'react'
import { Choice, useChoiceFeedback } from '../../components/ui'
import { useApp } from '../../lib/app-context'
import { shuffle } from '../../lib/random'
import { chimeSound, softBump } from '../../lib/sound'
import type { ActivityProps } from '../types'
import { ALPHABET } from './words'

interface Tile {
  key: number
  letter: string
}

// Anak sudah bisa memilih huruf namanya: di sini ia menyusunnya berurutan (ketuk, bukan seret).
export default function BuildName({ onDone }: ActivityProps) {
  const { say, settings } = useApp()
  const name = settings.nickname.toUpperCase().replace(/[^A-Z]/g, '') || 'ADIK'
  const tiles = useMemo<Tile[]>(() => {
    const extra = shuffle(ALPHABET.filter((l) => !name.includes(l))).slice(0, 2)
    return shuffle([...name.split(''), ...extra].map((letter, key) => ({ key, letter })))
  }, [name])
  const [placed, setPlaced] = useState<number[]>([])
  const fb = useChoiceFeedback<number>()
  const nextLetter = name[placed.length]
  const done = placed.length === name.length

  useEffect(() => {
    say('nameIntro', { letter: name[0] })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const tap = (tile: Tile) => {
    if (done || placed.includes(tile.key)) return
    if (tile.letter === nextLetter) {
      const next = [...placed, tile.key]
      setPlaced(next)
      chimeSound()
      if (next.length === name.length) {
        const spoken = settings.nickname
        setTimeout(() => say('nameDone', { name: spoken }), 300)
        setTimeout(() => onDone(fb.misses, name), 3500)
      } else {
        say('nameNext', { letter: name[next.length] })
      }
    } else {
      fb.mark(tile.key, 'wrong')
      softBump()
      say('nameNext', { letter: nextLetter })
    }
  }

  return (
    <div className="activity">
      <div className="name-slots">
        {name.split('').map((l, i) => (
          <span key={i} className={`name-slot ${i < placed.length ? 'name-slot-filled' : ''} ${i === placed.length ? 'name-slot-next' : ''}`}>
            {i < placed.length ? l : ''}
          </span>
        ))}
      </div>
      <div className="choices choices-wrap">
        {tiles.map((tile) =>
          placed.includes(tile.key) ? (
            <span key={tile.key} className="choice choice-letter choice-ghost" />
          ) : (
            <Choice key={tile.key} onTap={() => tap(tile)} state={fb.stateOf(tile.key)} className="choice-letter" label={tile.letter}>
              {tile.letter}
            </Choice>
          ),
        )}
      </div>
      {done && <div className="sparkle">🐋</div>}
    </div>
  )
}
