import { useEffect, useMemo, useState } from 'react'
import { Choice, useChoiceFeedback } from '../../components/ui'
import { useApp } from '../../lib/app-context'
import { praise } from '../../lib/i18n'
import { pick, shuffle } from '../../lib/random'
import { chimeSound, softBump } from '../../lib/sound'
import type { ActivityProps } from '../types'

const ROUNDS = 3
const ITEMS = ['🐚', '🐟', '⭐', '🦀', '🐙', '🫧']
// pola dari yang paling mudah: AB, AAB, ABC
const UNITS = [[0, 1], [0, 0, 1], [0, 1, 2]]

function newRound(round: number) {
  const unit = UNITS[Math.min(round, UNITS.length - 1)]
  const kinds = shuffle(ITEMS).slice(0, 3)
  const shown = 6
  const seq = Array.from({ length: shown + 1 }, (_, i) => kinds[unit[i % unit.length]])
  const answer = seq[shown]
  const distractor = pick(ITEMS.filter((x) => x !== answer && !kinds.includes(x)))
  const options = shuffle([...new Set([...kinds.slice(0, Math.max(...unit) + 1), distractor])])
  return { visible: seq.slice(0, shown), answer, options }
}

export default function Pattern({ onDone }: ActivityProps) {
  const { say, sayRaw, settings } = useApp()
  const [round, setRound] = useState(0)
  const spec = useMemo(() => newRound(round), [round])
  const [solved, setSolved] = useState(false)
  const fb = useChoiceFeedback<string>()

  useEffect(() => {
    say('patternIntro')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round])

  const answer = (x: string) => {
    if (solved) return
    if (x === spec.answer) {
      fb.mark(x, 'right')
      setSolved(true)
      chimeSound()
      sayRaw(praise(settings.lang))
      setTimeout(() => {
        if (round + 1 >= ROUNDS) return onDone(fb.misses)
        setSolved(false)
        fb.reset()
        setRound(round + 1)
      }, 1600)
    } else {
      fb.mark(x, 'wrong')
      softBump()
      say('tryAgain')
    }
  }

  return (
    <div className="activity">
      <div className="pattern-row">
        {spec.visible.map((x, i) => (
          <span key={i} className="pattern-item">
            {x}
          </span>
        ))}
        <span className={`pattern-item pattern-slot ${solved ? 'pattern-filled' : ''}`}>{solved ? spec.answer : '?'}</span>
      </div>
      <div className="choices">
        {spec.options.map((x) => (
          <Choice key={`${round}-${x}`} onTap={() => answer(x)} state={fb.stateOf(x)} className="choice-emoji">
            {x}
          </Choice>
        ))}
      </div>
    </div>
  )
}
