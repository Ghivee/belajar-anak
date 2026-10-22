import { useEffect, useMemo, useState } from 'react'
import { randInt } from '../lib/random'
import { stopSpeaking } from '../lib/speech'

/** Gerbang orang tua: soal perkalian yang di luar kemampuan anak 5 tahun. */
export default function ParentGate({ onPass, onCancel }: { onPass: () => void; onCancel: () => void }) {
  const [seed, setSeed] = useState(0)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const [a, b] = useMemo(() => [randInt(6, 9), randInt(11, 15)], [seed])
  const [input, setInput] = useState('')
  const [wrong, setWrong] = useState(false)

  useEffect(() => stopSpeaking(), [])

  const press = (d: string) => {
    setWrong(false)
    setInput((v) => (v.length < 3 ? v + d : v))
  }

  const submit = () => {
    if (Number(input) === a * b) return onPass()
    setWrong(true)
    setInput('')
    setSeed((s) => s + 1)
  }

  return (
    <div className="screen gate">
      <div className="gate-card">
        <p className="gate-title">Khusus Ayah/Bunda</p>
        <p className="gate-question">
          Berapa {a} × {b}?
        </p>
        <div className={`gate-input ${wrong ? 'gate-wrong' : ''}`}>{input || ' '}</div>
        {wrong && <p className="gate-note">Belum tepat, ini soal baru.</p>}
        <div className="keypad">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((d) => (
            <button key={d} type="button" onClick={() => press(d)}>
              {d}
            </button>
          ))}
          <button type="button" onClick={() => setInput((v) => v.slice(0, -1))} aria-label="Hapus">
            ⌫
          </button>
          <button type="button" onClick={() => press('0')}>
            0
          </button>
          <button type="button" className="keypad-ok" onClick={submit}>
            OK
          </button>
        </div>
        <button type="button" className="gate-cancel" onClick={onCancel}>
          Batal
        </button>
      </div>
    </div>
  )
}
