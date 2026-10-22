export interface ActivityProps {
  /** Dipanggil sekali saat semua putaran selesai. */
  onDone: (misses: number, detail?: string) => void
}

export interface ActivityDef {
  id: string
  /** Gambar besar pada tombol aktivitas (tanpa teks, anak belum lancar membaca). */
  icon: string
  /** Nama untuk Ruang Ayah/Bunda. */
  parentName: string
  component: (props: ActivityProps) => React.ReactElement
}

export interface ModuleDef {
  id: 'angka' | 'huruf'
  titleKey: string
  activities: ActivityDef[]
  /** Ide kegiatan tanpa layar untuk orang tua. */
  offline: string[]
}
