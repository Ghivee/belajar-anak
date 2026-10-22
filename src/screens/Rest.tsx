import { useEffect } from 'react'
import { Ombak, Perak } from '../components/Characters'
import { useApp } from '../lib/app-context'

/**
 * Akhir sesi yang lembut: layar meredup perlahan dan tokoh tertidur.
 * Tidak ada tombol "main lagi"; hanya orang tua yang bisa membuka sesi baru.
 */
export default function Rest({ reason, onParent }: { reason: 'time' | 'limit'; onParent: () => void }) {
  const { say, tr, settings } = useApp()

  useEffect(() => {
    const id = setTimeout(() => say(reason === 'time' ? 'restSay' : 'doneToday', { name: settings.nickname }), 600)
    return () => clearTimeout(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reason])

  return (
    <div className="screen rest">
      <div className="rest-scene">
        <span className="rest-moon">🌙</span>
        <Perak size={120} sleeping />
        <Ombak size={200} sleeping />
        <span className="rest-z">z z z</span>
      </div>
      <button type="button" className="parent-btn" onClick={onParent}>
        {tr('parentButton')}
      </button>
    </div>
  )
}
