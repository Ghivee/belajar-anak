import { Ombak, Perak } from '../components/Characters'
import { useApp } from '../lib/app-context'

export default function Welcome({ onStart }: { onStart: () => void }) {
  const { tr } = useApp()
  return (
    <div className="screen welcome">
      <button type="button" className="welcome-btn" onClick={onStart} aria-label={tr('welcomeTap')}>
        <Perak size={150} className="float-slow" />
        <Ombak size={240} className="float" />
        <span className="welcome-hint">👆</span>
      </button>
    </div>
  )
}
