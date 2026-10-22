import { useEffect } from 'react'
import { Coral, Ombak, Perak } from '../components/Characters'
import { Tap, TopBar } from '../components/ui'
import { useApp } from '../lib/app-context'

interface Island {
  id: string
  titleKey: string
  icon: string
  ready: boolean
}

const ISLANDS: Island[] = [
  { id: 'angka', titleKey: 'islandAngka', icon: '🔢', ready: true },
  { id: 'huruf', titleKey: 'islandHuruf', icon: '🔤', ready: true },
  { id: 'alam', titleKey: 'islandAlam', icon: '🌱', ready: false },
  { id: 'perasaan', titleKey: 'islandPerasaan', icon: '😊', ready: false },
  { id: 'kebaikan', titleKey: 'islandKebaikan', icon: '🤲', ready: false },
  { id: 'studio', titleKey: 'islandStudio', icon: '🎨', ready: false },
]

const CORAL_COLORS = ['#f4a6a6', '#f2c57c', '#b5d99c', '#c3b1e1', '#8fd3d0']

export default function Home({
  greet,
  reefCount,
  onIsland,
  onParent,
}: {
  greet: boolean
  reefCount: number
  onIsland: (id: 'angka' | 'huruf') => void
  onParent: () => void
}) {
  const { say, sayRaw, tr, settings } = useApp()

  useEffect(() => {
    if (greet) sayRaw(`${tr('welcome', { name: settings.nickname })} ${tr('homeHint')}`)
    else say('homeHint')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="screen home">
      <TopBar homeLabel={tr('back')} />
      <div className="home-guides">
        <Perak size={110} className="float-slow" />
        <Ombak size={130} className="float" />
      </div>
      <div className="islands">
        {ISLANDS.map((isl) => (
          <Tap
            key={isl.id}
            className={`island ${isl.ready ? '' : 'island-soon'}`}
            label={tr(isl.titleKey)}
            onTap={() => {
              if (!isl.ready) return say('islandSoon')
              onIsland(isl.id as 'angka' | 'huruf')
            }}
          >
            <span className="island-icon">{isl.icon}</span>
            <svg className="island-land" viewBox="0 0 120 40" aria-hidden="true">
              <ellipse cx="60" cy="26" rx="56" ry="14" fill="#f3e1b6" />
              <ellipse cx="60" cy="20" rx="40" ry="10" fill="#b5d99c" />
            </svg>
          </Tap>
        ))}
      </div>
      <Tap className="reef" label={tr('reef')} onTap={() => say('reefSay', { n: reefCount })}>
        {reefCount === 0 ? (
          <span className="reef-empty">🫧</span>
        ) : (
          Array.from({ length: Math.min(reefCount, 30) }, (_, i) => (
            <Coral key={i} color={CORAL_COLORS[i % CORAL_COLORS.length]} size={28 + ((i * 7) % 14)} />
          ))
        )}
      </Tap>
      <button type="button" className="parent-btn" onClick={onParent}>
        {tr('parentButton')}
      </button>
    </div>
  )
}
