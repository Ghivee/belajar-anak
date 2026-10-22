import { useEffect, useState } from 'react'
import { db, type Completion, type Settings } from '../lib/db'
import { MODULES } from '../modules'
import { ALPHABET } from '../modules/huruf/words'

const WEEK = 7 * 24 * 60 * 60 * 1000

export default function ParentRoom({
  settings,
  onSave,
  onClose,
  onExtraSession,
}: {
  settings: Settings
  onSave: (s: Settings) => void
  onClose: () => void
  onExtraSession: () => void
}) {
  const [draft, setDraft] = useState(settings)
  const [recent, setRecent] = useState<Completion[]>([])

  useEffect(() => {
    void db.completions.where('at').above(Date.now() - WEEK).toArray().then(setRecent)
  }, [])

  const update = <K extends keyof Settings>(k: K, v: Settings[K]) => {
    const next = { ...draft, [k]: v }
    setDraft(next)
    onSave(next)
  }

  const toggleLetter = (l: string) =>
    update('knownLetters', draft.knownLetters.includes(l) ? draft.knownLetters.filter((x) => x !== l) : [...draft.knownLetters, l])

  return (
    <div className="screen parent">
      <header className="parent-head">
        <h1>Ruang Ayah/Bunda</h1>
        <button type="button" className="parent-close" onClick={onClose}>
          Kembali ke anak
        </button>
      </header>

      <section className="parent-card">
        <h2>Perkembangan 7 hari terakhir</h2>
        {MODULES.map((m) => (
          <div key={m.id} className="parent-module">
            <h3>{m.id === 'angka' ? 'Pulau Angka' : 'Pulau Huruf'}</h3>
            <table>
              <thead>
                <tr>
                  <th>Kegiatan</th>
                  <th>Selesai</th>
                  <th>Rata-rata percobaan belum tepat</th>
                </tr>
              </thead>
              <tbody>
                {m.activities.map((a) => {
                  const rows = recent.filter((c) => c.module === m.id && c.activity === a.id)
                  const avg = rows.length ? (rows.reduce((s, c) => s + c.misses, 0) / rows.length).toFixed(1) : '–'
                  return (
                    <tr key={a.id}>
                      <td>
                        {a.icon} {a.parentName}
                      </td>
                      <td>{rows.length}×</td>
                      <td>{avg}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <details>
              <summary>Ide kegiatan tanpa layar</summary>
              <ul>
                {m.offline.map((o) => (
                  <li key={o}>{o}</li>
                ))}
              </ul>
            </details>
          </div>
        ))}
        <p className="parent-note">
          Angka kecil pada kolom terakhir berarti anak jarang perlu mencoba ulang. Angka yang terus tinggi bisa jadi tanda kegiatan itu perlu
          ditemani.
        </p>
      </section>

      <section className="parent-card">
        <h2>Pengaturan</h2>
        <label className="field">
          <span>Nama panggilan anak (dipakai di kegiatan menyusun nama)</span>
          <input value={draft.nickname} maxLength={12} onChange={(e) => update('nickname', e.target.value)} />
        </label>
        <div className="field">
          <span>Bahasa narasi</span>
          <div className="seg">
            {(
              [
                ['id', 'Indonesia'],
                ['en', 'English'],
              ] as const
            ).map(([v, label]) => (
              <button key={v} type="button" className={draft.lang === v ? 'on' : ''} onClick={() => update('lang', v)}>
                {label}
              </button>
            ))}
            <button type="button" disabled title="Menunggu pilihan bahasa daerah">
              Bahasa daerah (segera)
            </button>
          </div>
        </div>
        <div className="field">
          <span>Lama satu sesi</span>
          <div className="seg">
            {[10, 15, 20].map((m) => (
              <button key={m} type="button" className={draft.sessionMinutes === m ? 'on' : ''} onClick={() => update('sessionMinutes', m)}>
                {m} menit
              </button>
            ))}
          </div>
        </div>
        <div className="field">
          <span>Sesi per hari</span>
          <div className="seg">
            {[1, 2, 3].map((n) => (
              <button key={n} type="button" className={draft.sessionsPerDay === n ? 'on' : ''} onClick={() => update('sessionsPerDay', n)}>
                {n}
              </button>
            ))}
          </div>
        </div>
        <label className="field field-row">
          <input type="checkbox" checked={draft.calmMotion} onChange={(e) => update('calmMotion', e.target.checked)} />
          <span>Mode tenang (tanpa animasi bergerak)</span>
        </label>
        <div className="field">
          <span>Huruf yang sudah dikenal anak (huruf lain akan lebih sering muncul)</span>
          <div className="letter-grid">
            {ALPHABET.map((l) => (
              <button key={l} type="button" className={draft.knownLetters.includes(l) ? 'on' : ''} onClick={() => toggleLetter(l)}>
                {l}
              </button>
            ))}
          </div>
        </div>
        <button type="button" className="parent-extra" onClick={onExtraSession}>
          Mulai sesi baru sekarang
        </button>
        <p className="parent-note">
          Sesi berakhir dengan lembut setelah waktunya habis, tanpa hitung mundur. Saran WHO: waktu layar anak di bawah 5 tahun paling lama
          1 jam sehari, dan makin sedikit makin baik.
        </p>
      </section>

      <section className="parent-card">
        <h2>Cara memasang di iPad</h2>
        <ol>
          <li>Buka aplikasi ini di Safari.</li>
          <li>Ketuk tombol Bagikan (kotak dengan panah ke atas).</li>
          <li>Pilih "Tambahkan ke Layar Utama".</li>
          <li>Buka dari ikon di layar utama. Setelah itu aplikasi bisa dipakai tanpa internet.</li>
        </ol>
        <p className="parent-note">Semua data hanya tersimpan di iPad ini. Tidak ada akun, iklan, atau data yang dikirim ke internet.</p>
      </section>
    </div>
  )
}
