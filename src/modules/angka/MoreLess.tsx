import { useEffect, useState } from 'react'
import { Choice, useChoiceFeedback } from '../../components/ui'
import { useApp } from '../../lib/app-context'
import { praise } from '../../lib/i18n'
import { pick, randInt } from '../../lib/random'
import { chimeSound, softBump } from '../../lib/sound'
import type { ActivityProps } from '../types'

const ROUNDS = 3
const ITEMS = ['🐚', '⭐', '🦀', '🐠']

function newRound() {
  const a = randInt(3, 12)
  let b = randInt(3, 12)
  // selisih minimal 2 supaya bisa dibandingkan dengan melihat
  while (Math.abs(a - b) < 2) b = randInt(3, 12)
  return { counts: [a, b] as const, item: pick(ITEMS) }
}

export default function MoreLess({ onDone }: ActivityProps) {
  const { say, sayRaw, settings } = useApp()
  const [round, setRound] = useState(0)
  const [spec, setSpec] = useState(newRound)
  const fb = useChoiceFeedback<number>()

  useEffect(() => {
    say('moreIntro')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round])

  const more = spec.counts[0] > spec.counts[1] ? 0 : 1

  const answer = (side: number) => {
    if (side === more) {
      fb.mark(side, 'right')
      chimeSound()
      sayRaw(praise(settings.lang))
      setTimeout(() => {
        if (round + 1 >= ROUNDS) return onDone(fb.misses)
        setRound(round + 1)
        setSpec(newRound())
        fb.reset()
      }, 1500)
    } else {
      fb.mark(side, 'wrong')
      softBump()
      say('tryAgain')
    }
  }

  return (
    <div className="activity">
      <div className="groups">
        {spec.counts.map((c, side) => (
          <Choice key={`${round}-${side}`} onTap={() => answer(side)} state={fb.stateOf(side)} className="group-card">
            <div className="group-items">
              {Array.from({ length: c }, (_, i) => (
                <span key={i} className="group-item">
                  {spec.item}
                </span>
              ))}
            </div>
          </Choice>
        ))}
      </div>
    </div>
  )
}
