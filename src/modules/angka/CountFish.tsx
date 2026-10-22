import { useEffect, useMemo, useState } from 'react'
import { Fish } from '../../components/Characters'
import { Choice, useChoiceFeedback } from '../../components/ui'
import { useApp } from '../../lib/app-context'
import { numberWord } from '../../lib/i18n'
import { choicesAround, pick, randInt } from '../../lib/random'
import { chimeSound, softBump } from '../../lib/sound'
import { praise } from '../../lib/i18n'
import type { ActivityProps } from '../types'

const ROUNDS = 2
const COLORS = ['#f2a65a', '#8cc7a1', '#f4b6b6', '#a8c5e6', '#e8d27c']

// Anak sudah lancar 1–10, jadi jumlah ikan 8–20.
function newRound(round: number) {
  return { count: round === 0 ? randInt(8, 14) : randInt(11, 20), color: pick(COLORS) }
}

export default function CountFish({ onDone }: ActivityProps) {
  const { say, sayRaw, settings } = useApp()
  const [round, setRound] = useState(0)
  const [spec, setSpec] = useState(() => newRound(0))
  const [tapped, setTapped] = useState<number[]>([])
  const fb = useChoiceFeedback<number>()
  const allCounted = tapped.length === spec.count
  const choices = useMemo(() => choicesAround(spec.count, 3, 1, 20), [spec])

  useEffect(() => {
    if (round === 0) say('countIntro')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (allCounted) setTimeout(() => say('countPick'), 900)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allCounted])

  const tapFish = (i: number) => {
    if (tapped.includes(i)) return
    const n = tapped.length + 1
    setTapped([...tapped, i])
    sayRaw(numberWord(n, settings.lang))
  }

  const answer = (n: number) => {
    if (n === spec.count) {
      fb.mark(n, 'right')
      chimeSound()
      sayRaw(`${praise(settings.lang)} ${numberWord(n, settings.lang)}!`)
      setTimeout(() => {
        if (round + 1 >= ROUNDS) return onDone(fb.misses, `sampai ${spec.count}`)
        setRound(round + 1)
        setSpec(newRound(round + 1))
        setTapped([])
        fb.reset()
      }, 1800)
    } else {
      fb.mark(n, 'wrong')
      softBump()
      say('tryAgain')
    }
  }

  return (
    <div className="activity">
      <div className="fish-pond">
        {Array.from({ length: spec.count }, (_, i) => {
          const order = tapped.indexOf(i)
          return (
            <button
              key={`${round}-${i}`}
              type="button"
              className={`fish ${order >= 0 ? 'fish-counted' : ''}`}
              onClick={() => tapFish(i)}
              aria-label={`ikan ${i + 1}`}
            >
              <Fish color={spec.color} size={76} />
              {order >= 0 && <span className="fish-badge">{order + 1}</span>}
            </button>
          )
        })}
      </div>
      {allCounted && (
        <div className="choices">
          {choices.map((n) => (
            <Choice key={n} onTap={() => answer(n)} state={fb.stateOf(n)} label={String(n)} className="choice-number">
              {n}
            </Choice>
          ))}
        </div>
      )}
    </div>
  )
}
