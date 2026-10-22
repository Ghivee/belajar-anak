import { useEffect, useMemo, useState } from 'react'
import { Choice, useChoiceFeedback } from '../../components/ui'
import { useApp } from '../../lib/app-context'
import { praise } from '../../lib/i18n'
import { shuffle } from '../../lib/random'
import { chimeSound, softBump } from '../../lib/sound'
import type { ActivityProps } from '../types'
import { distractors, pickTargets } from './pickWords'
import { wordsFor } from './words'

const ROUNDS = 4

// Gambar + kata diucapkan, anak memilih huruf awalnya.
export default function InitialSound({ onDone }: ActivityProps) {
  const { say, sayRaw, settings } = useApp()
  const words = wordsFor(settings.lang)
  const targets = useMemo(() => pickTargets(words, settings.knownLetters, ROUNDS), [words, settings.knownLetters])
  const [round, setRound] = useState(0)
  const target = targets[round]
  const options = useMemo(() => shuffle([target, ...distractors(words, target)]).map((w) => w.letter), [target, words])
  const [solved, setSolved] = useState(false)
  const fb = useChoiceFeedback<string>()

  useEffect(() => {
    say('soundIntro', { word: target.word })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round])

  const answer = (letter: string) => {
    if (solved) return
    if (letter === target.letter) {
      fb.mark(letter, 'right')
      setSolved(true)
      chimeSound()
      sayRaw(`${praise(settings.lang)} ${target.word}, ${letter}.`)
      setTimeout(() => {
        if (round + 1 >= ROUNDS) return onDone(fb.misses, targets.map((w) => w.letter).join(''))
        setSolved(false)
        fb.reset()
        setRound(round + 1)
      }, 2000)
    } else {
      fb.mark(letter, 'wrong')
      softBump()
      sayRaw(`${target.word}...`)
    }
  }

  return (
    <div className="activity">
      <button type="button" className="big-picture" onClick={() => sayRaw(target.word)} aria-label={target.word}>
        {target.pic}
      </button>
      <div className="choices">
        {options.map((l) => (
          <Choice key={`${round}-${l}`} onTap={() => answer(l)} state={fb.stateOf(l)} className="choice-letter" label={l}>
            {l}
          </Choice>
        ))}
      </div>
    </div>
  )
}
