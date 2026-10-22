import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AppContext, type AppCtx } from './lib/app-context'
import {
  DEFAULT_SETTINGS,
  db,
  loadSettings,
  recordCompletion,
  requestPersistence,
  saveSettings,
  sessionsToday,
  startSession,
  type Settings,
} from './lib/db'
import { t } from './lib/i18n'
import { unlockAudio } from './lib/sound'
import { speak, unlockSpeech } from './lib/speech'
import { findActivity, MODULES } from './modules'
import ActivityScreen from './screens/ActivityScreen'
import Home from './screens/Home'
import IslandScreen from './screens/IslandScreen'
import ParentGate from './screens/ParentGate'
import ParentRoom from './screens/ParentRoom'
import Rest from './screens/Rest'
import Welcome from './screens/Welcome'

type ModuleId = 'angka' | 'huruf'

type Screen =
  | { name: 'welcome' }
  | { name: 'home' }
  | { name: 'island'; mod: ModuleId }
  | { name: 'activity'; mod: ModuleId; act: string }
  | { name: 'rest'; reason: 'time' | 'limit' }
  | { name: 'gate'; back: Screen }
  | { name: 'parent'; back: Screen }

export default function App() {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS)
  const [screen, setScreen] = useState<Screen>({ name: 'welcome' })
  const [reefCount, setReefCount] = useState(0)
  const [doneToday, setDoneToday] = useState<Set<string>>(new Set())
  const sessionStart = useRef(0)
  const greetNext = useRef(false)

  useEffect(() => {
    void loadSettings().then(setSettings)
    void db.completions.count().then(setReefCount)
    void requestPersistence()
  }, [])

  const ctx = useMemo<AppCtx>(
    () => ({
      settings,
      tr: (key, vars) => t(settings.lang, key, vars),
      say: (key, vars) => speak(t(settings.lang, key, vars), settings.lang),
      sayRaw: (text) => speak(text, settings.lang),
    }),
    [settings],
  )

  const beginSession = useCallback(async () => {
    await startSession()
    sessionStart.current = Date.now()
    setScreen({ name: 'home' })
  }, [])

  const handleStart = async () => {
    // suara di iPad baru bisa diputar setelah sentuhan pertama
    unlockSpeech()
    unlockAudio()
    if ((await sessionsToday()) >= settings.sessionsPerDay) return setScreen({ name: 'rest', reason: 'limit' })
    greetNext.current = true
    await beginSession()
  }

  const handleFinished = async (mod: ModuleId, act: string, misses: number, detail?: string) => {
    await recordCompletion({ module: mod, activity: act, misses, detail })
    setReefCount((n) => n + 1)
    setDoneToday((s) => new Set(s).add(`${mod}/${act}`))
    // sesi tidak diputus di tengah kegiatan: dicek hanya setelah kegiatan selesai
    const elapsedMin = (Date.now() - sessionStart.current) / 60000
    if (elapsedMin >= settings.sessionMinutes) setScreen({ name: 'rest', reason: 'time' })
    else setScreen({ name: 'island', mod })
  }

  const openParent = (back: Screen) => setScreen({ name: 'gate', back })

  const updateSettings = (s: Settings) => {
    setSettings(s)
    void saveSettings(s)
  }

  let body: React.ReactNode
  switch (screen.name) {
    case 'welcome':
      body = <Welcome onStart={handleStart} />
      break
    case 'home':
      body = <Home greet={greetNext.current} reefCount={reefCount} onIsland={(mod) => { greetNext.current = false; setScreen({ name: 'island', mod }) }} onParent={() => openParent(screen)} />
      break
    case 'island': {
      const mod = MODULES.find((m) => m.id === screen.mod)!
      const doneIds = new Set(mod.activities.filter((a) => doneToday.has(`${mod.id}/${a.id}`)).map((a) => a.id))
      body = (
        <IslandScreen
          mod={mod}
          doneIds={doneIds}
          onHome={() => setScreen({ name: 'home' })}
          onPick={(act) => setScreen({ name: 'activity', mod: screen.mod, act })}
        />
      )
      break
    }
    case 'activity': {
      const activity = findActivity(screen.mod, screen.act)!
      body = (
        <ActivityScreen
          key={`${screen.mod}/${screen.act}`}
          activity={activity}
          onExit={() => setScreen({ name: 'island', mod: screen.mod })}
          onFinished={(misses, detail) => void handleFinished(screen.mod, screen.act, misses, detail)}
        />
      )
      break
    }
    case 'rest':
      body = <Rest reason={screen.reason} onParent={() => openParent(screen)} />
      break
    case 'gate':
      body = <ParentGate onPass={() => setScreen({ name: 'parent', back: screen.back })} onCancel={() => setScreen(screen.back)} />
      break
    case 'parent':
      body = (
        <ParentRoom
          settings={settings}
          onSave={updateSettings}
          onClose={() => setScreen(screen.back.name === 'rest' ? { name: 'welcome' } : screen.back)}
          onExtraSession={() => void beginSession()}
        />
      )
      break
  }

  return (
    <AppContext.Provider value={ctx}>
      <div className={`app ${settings.calmMotion ? 'calm' : ''} ${screen.name === 'rest' ? 'dim' : ''}`}>{body}</div>
    </AppContext.Provider>
  )
}
