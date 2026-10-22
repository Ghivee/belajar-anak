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

// Huruf besar ditampilkan, anak memilih gambar yang dimulai dengan huruf itu.
export default function KnowLetter({ onDone }: ActivityProps) {
  const { say, sayRaw, settings } = useApp()
  const words = wordsFor(settings.lang)
  const targets = useMemo(() => pickTargets(words, settings.knownLetters, ROUNDS), [words, settings.knownLetters])
  const [round, setRound] = useState(0)
  const target = targets[round]
  const options = useMemo(() => shuffle([target, ...distractors(words, target)]), [target, words])
  const [solved, setSolved] = useState(false)
  const fb = useChoiceFeedback<string>()

  useEffect(() => {
    say('letterIntro', { letter: target.letter, word: target.word })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round])

  const answer = (w: (typeof options)[number]) => {
    if (solved) return
    if (w.letter === target.letter) {
      fb.mark(w.word, 'right')
      setSolved(true)
      chimeSound()
      sayRaw(`${praise(settings.lang)} ${w.word}!`)
      setTimeout(() => {
        if (round + 1 >= ROUNDS) return onDone(fb.misses, targets.map((x) => x.letter).join(''))
        setSolved(false)
        fb.reset()
        setRound(round + 1)
      }, 2000)
    } else {
      fb.mark(w.word, 'wrong')
      softBump()
      sayRaw(w.word)
    }
  }

  return (
    <div className="activity">
      <button type="button" className="big-letter" onClick={() => sayRaw(target.letter)} aria-label={target.letter}>
        {target.letter}
        <span className="big-letter-lower">{target.letter.toLowerCase()}</span>
      </button>
      <div className="choices">
        {options.map((w) => (
          <Choice key={`${round}-${w.word}`} onTap={() => answer(w)} state={fb.stateOf(w.word)} className="choice-emoji" label={w.word}>
            {w.pic}
          </Choice>
        ))}
      </div>
    </div>
  )
}
