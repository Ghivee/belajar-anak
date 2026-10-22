import { useState, type ReactNode } from 'react'
import { popSound } from '../lib/sound'
import { repeatLast } from '../lib/speech'

interface TapProps {
  onTap: () => void
  children: ReactNode
  className?: string
  label?: string
  disabled?: boolean
}

/** Tombol yang langsung memberi bunyi "pop" dan efek tekan (< 0,1 detik). */
export function Tap({ onTap, children, className = '', label, disabled }: TapProps) {
  return (
    <button
      type="button"
      className={`tap ${className}`}
      aria-label={label}
      disabled={disabled}
      onPointerDown={() => !disabled && popSound()}
      onClick={() => !disabled && onTap()}
    >
      {children}
    </button>
  )
}

export type ChoiceState = 'idle' | 'right' | 'wrong'

/** Kartu pilihan jawaban: memantul pelan jika belum tepat, bercahaya jika tepat. */
export function Choice({
  onTap,
  children,
  state = 'idle',
  label,
  className = '',
}: {
  onTap: () => void
  children: ReactNode
  state?: ChoiceState
  label?: string
  className?: string
}) {
  return (
    <Tap onTap={onTap} label={label} className={`choice choice-${state} ${className}`}>
      {children}
    </Tap>
  )
}

/** Bar atas yang posisinya selalu sama: tombol pulang di kiri, "dengar lagi" di kanan. */
export function TopBar({ onHome, homeLabel }: { onHome?: () => void; homeLabel: string }) {
  return (
    <div className="topbar">
      {onHome ? (
        <Tap onTap={onHome} className="icon-btn" label={homeLabel}>
          <svg viewBox="0 0 48 48" width="40" height="40" aria-hidden="true">
            <path d="M8 24 L24 10 L40 24 M14 20 V38 H34 V20" stroke="#2f4858" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Tap>
      ) : (
        <span />
      )}
      <Tap onTap={repeatLast} className="icon-btn" label="Dengar lagi">
        <svg viewBox="0 0 48 48" width="40" height="40" aria-hidden="true">
          <path d="M10 18 H18 L28 10 V38 L18 30 H10 Z" fill="#2f4858" />
          <path d="M33 17 Q38 24 33 31 M37 13 Q45 24 37 35" stroke="#2f4858" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        </svg>
      </Tap>
    </div>
  )
}

/** Menghitung percobaan yang belum tepat dan state visual per pilihan. */
export function useChoiceFeedback<K extends string | number>() {
  const [states, setStates] = useState<Map<K, ChoiceState>>(new Map())
  const [misses, setMisses] = useState(0)
  const mark = (key: K, s: ChoiceState) => {
    setStates((prev) => new Map(prev).set(key, s))
    if (s === 'wrong') {
      setMisses((m) => m + 1)
      // kembali normal setelah animasi pantul selesai
      setTimeout(() => setStates((prev) => {
        const next = new Map(prev)
        if (next.get(key) === 'wrong') next.delete(key)
        return next
      }), 600)
    }
  }
  const reset = () => setStates(new Map())
  return { stateOf: (k: K) => states.get(k) ?? 'idle', mark, reset, misses }
}
