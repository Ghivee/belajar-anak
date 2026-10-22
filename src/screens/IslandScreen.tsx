import { useEffect } from 'react'
import { Ombak } from '../components/Characters'
import { Tap, TopBar } from '../components/ui'
import { useApp } from '../lib/app-context'
import type { ModuleDef } from '../modules/types'

/** Pilihan aktivitas di satu pulau: tombol besar bergambar, tanpa teks. */
export default function IslandScreen({
  mod,
  doneIds,
  onPick,
  onHome,
}: {
  mod: ModuleDef
  doneIds: Set<string>
  onPick: (activityId: string) => void
  onHome: () => void
}) {
  const { say, tr } = useApp()

  useEffect(() => {
    say(mod.titleKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mod.id])

  return (
    <div className="screen island-screen">
      <TopBar onHome={onHome} homeLabel={tr('back')} />
      <Ombak size={120} className="float" />
      <div className="activity-picker">
        {mod.activities.map((a) => (
          <Tap key={a.id} className="activity-btn" label={a.parentName} onTap={() => onPick(a.id)}>
            <span className="activity-icon">{a.icon}</span>
            {doneIds.has(a.id) && <span className="activity-done">🪸</span>}
          </Tap>
        ))}
      </div>
    </div>
  )
}
