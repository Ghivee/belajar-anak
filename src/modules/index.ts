import CountFish from './angka/CountFish'
import MoreLess from './angka/MoreLess'
import Pattern from './angka/Pattern'
import BuildName from './huruf/BuildName'
import InitialSound from './huruf/InitialSound'
import KnowLetter from './huruf/KnowLetter'
import type { ModuleDef } from './types'

export const MODULES: ModuleDef[] = [
  {
    id: 'angka',
    titleKey: 'islandAngka',
    activities: [
      { id: 'hitung-ikan', icon: '🐟', parentName: 'Menghitung ikan (8–20) dan memilih angkanya', component: CountFish },
      { id: 'lebih-banyak', icon: '🐚', parentName: 'Membandingkan mana yang lebih banyak', component: MoreLess },
      { id: 'pola', icon: '⭐', parentName: 'Melanjutkan pola (AB, AAB, ABC)', component: Pattern },
    ],
    offline: [
      'Hitung anak tangga bersama saat naik atau turun, sampai 20.',
      'Bandingkan dua genggam kacang atau kancing: mana yang lebih banyak? Lalu hitung untuk membuktikan.',
      'Susun pola dengan sendok dan garpu (sendok, garpu, sendok, garpu…), lalu minta anak melanjutkan.',
    ],
  },
  {
    id: 'huruf',
    titleKey: 'islandHuruf',
    activities: [
      { id: 'susun-nama', icon: '🏷️', parentName: 'Menyusun huruf nama sendiri secara berurutan', component: BuildName },
      { id: 'bunyi-awal', icon: '👂', parentName: 'Menebak huruf awal dari kata bergambar', component: InitialSound },
      { id: 'kenal-huruf', icon: '🔤', parentName: 'Mencocokkan huruf dengan gambar', component: KnowLetter },
    ],
    offline: [
      'Cari huruf pertama nama anak di bungkus makanan, papan nama toko, atau buku.',
      'Main tebak bunyi: "Aku melihat sesuatu yang dimulai dengan bunyi P…" (piring, pintu, paus).',
      'Tulis nama anak besar-besar di kertas, lalu biarkan ia menjiplak dengan jari atau krayon.',
    ],
  },
]

export function findActivity(moduleId: string, activityId: string) {
  return MODULES.find((m) => m.id === moduleId)?.activities.find((a) => a.id === activityId)
}
