import { useState } from 'react'
import { Coral, Ombak } from '../components/Characters'
import { TopBar } from '../components/ui'
import { useApp } from '../lib/app-context'
import type { ActivityDef } from '../modules/types'

/** Membungkus satu aktivitas: bar atas yang konsisten, lalu penutup "karang baru tumbuh". */
export default function ActivityScreen({
  activity,
  onExit,
  onFinished,
}: {
  activity: ActivityDef
  onExit: () => void
  onFinished: (misses: number, detail?: string) => void
}) {
  const { say, tr } = useApp()
  const [done, setDone] = useState(false)
  const Activity = activity.component

  const handleDone = (misses: number, detail?: string) => {
    setDone(true)
    say('activityDone')
    setTimeout(() => onFinished(misses, detail), 3200)
  }

  return (
    <div className="screen activity-screen">
      <TopBar onHome={done ? undefined : onExit} homeLabel={tr('back')} />
      {done ? (
        <div className="activity-finish">
          <Ombak size={200} className="float" />
          <div className="finish-coral">
            <Coral size={90} color="#f4a6a6" />
          </div>
        </div>
      ) : (
        <Activity onDone={handleDone} />
      )}
    </div>
  )
}
