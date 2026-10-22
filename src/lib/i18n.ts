// Teks narasi dan label. Bahasa daerah ditambahkan setelah Febrian memilih bahasanya.

export type Lang = 'id' | 'en'

const NUM_ID = [
  'nol', 'satu', 'dua', 'tiga', 'empat', 'lima', 'enam', 'tujuh', 'delapan', 'sembilan', 'sepuluh',
  'sebelas', 'dua belas', 'tiga belas', 'empat belas', 'lima belas', 'enam belas', 'tujuh belas',
  'delapan belas', 'sembilan belas', 'dua puluh',
]
const NUM_EN = [
  'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
  'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen',
  'nineteen', 'twenty',
]

export function numberWord(n: number, lang: Lang) {
  return (lang === 'id' ? NUM_ID : NUM_EN)[n] ?? String(n)
}

type Dict = Record<string, string>

const id: Dict = {
  welcome: 'Halo {name}! Aku Ombak si paus kecil. Ayo kita jelajahi laut!',
  welcomeTap: 'Ketuk Ombak untuk mulai',
  homeHint: 'Mau ke pulau mana hari ini? Ketuk salah satu pulau.',
  islandSoon: 'Pulau ini masih dibangun. Coba pulau Angka atau Huruf, ya.',
  islandAngka: 'Pulau Angka',
  islandHuruf: 'Pulau Huruf',
  islandAlam: 'Pulau Alam',
  islandPerasaan: 'Pulau Perasaan',
  islandKebaikan: 'Pulau Kebaikan',
  islandStudio: 'Pulau Studio',
  reef: 'Karang Pengetahuan',
  reefSay: 'Lihat karangmu! Sudah tumbuh {n} karang dari belajarmu.',
  great: 'Hebat!',
  praise1: 'Wah, tepat sekali!',
  praise2: 'Kamu teliti sekali!',
  praise3: 'Bagus! Kamu berhasil!',
  tryAgain: 'Hmm, coba lihat lagi pelan-pelan.',
  activityDone: 'Kegiatan selesai! Satu karang baru tumbuh.',
  // Angka
  countIntro: 'Perak menemukan banyak ikan. Bantu hitung ikannya! Ketuk setiap ikan satu per satu.',
  countPick: 'Ada berapa ikan? Ketuk angkanya.',
  moreIntro: 'Kelompok mana yang lebih banyak? Ketuk kelompok yang lebih banyak.',
  patternIntro: 'Lihat polanya. Apa yang datang berikutnya? Ketuk jawabannya.',
  // Huruf
  nameIntro: 'Ayo susun namamu! Ketuk huruf {letter}.',
  nameNext: 'Sekarang ketuk huruf {letter}.',
  nameDone: 'Itu namamu: {name}! Hebat!',
  soundIntro: 'Ini {word}. {word} dimulai dengan huruf apa? Ketuk hurufnya.',
  letterIntro: 'Ini huruf {letter}. {letter} untuk {word}. Ketuk gambar yang dimulai dengan huruf {letter}.',
  // Sesi
  restTitle: 'Waktunya istirahat',
  restSay: 'Ombak dan Perak mau istirahat dulu. Terima kasih sudah belajar hari ini, {name}! Ayo main di luar atau ceritakan ke Ayah dan Bunda apa yang kamu pelajari.',
  doneToday: 'Belajar hari ini sudah cukup. Sampai jumpa besok!',
  parentButton: 'Ayah/Bunda',
  back: 'Kembali',
  listenAgain: 'Dengar lagi',
}

const en: Dict = {
  welcome: "Hello {name}! I'm Ombak the little whale. Let's explore the sea!",
  welcomeTap: 'Tap Ombak to start',
  homeHint: 'Which island shall we visit today? Tap an island.',
  islandSoon: "This island is still being built. Let's try the Numbers or Letters island.",
  islandAngka: 'Numbers Island',
  islandHuruf: 'Letters Island',
  islandAlam: 'Nature Island',
  islandPerasaan: 'Feelings Island',
  islandKebaikan: 'Kindness Island',
  islandStudio: 'Studio Island',
  reef: 'Coral of Knowledge',
  reefSay: 'Look at your reef! {n} corals have grown from your learning.',
  great: 'Great!',
  praise1: "Wow, that's right!",
  praise2: 'You looked so carefully!',
  praise3: 'Well done! You did it!',
  tryAgain: "Hmm, let's look again slowly.",
  activityDone: 'All done! A new coral has grown.',
  countIntro: 'Perak found lots of fish. Help count them! Tap each fish one by one.',
  countPick: 'How many fish are there? Tap the number.',
  moreIntro: 'Which group has more? Tap the group with more.',
  patternIntro: 'Look at the pattern. What comes next? Tap the answer.',
  nameIntro: "Let's build your name! Tap the letter {letter}.",
  nameNext: 'Now tap the letter {letter}.',
  nameDone: "That's your name: {name}! Great job!",
  soundIntro: 'This is a {word}. What letter does {word} start with? Tap the letter.',
  letterIntro: 'This is the letter {letter}. {letter} is for {word}. Tap the picture that starts with {letter}.',
  restTitle: 'Time to rest',
  restSay: "Ombak and Perak need a rest now. Thank you for learning today, {name}! Go play outside or tell Mum and Dad what you learned.",
  doneToday: "That's enough learning for today. See you tomorrow!",
  parentButton: 'Parents',
  back: 'Back',
  listenAgain: 'Listen again',
}

const DICTS: Record<Lang, Dict> = { id, en }

export function t(lang: Lang, key: string, vars: Record<string, string | number> = {}) {
  let s = DICTS[lang][key] ?? DICTS.id[key] ?? key
  for (const [k, v] of Object.entries(vars)) s = s.split(`{${k}}`).join(String(v))
  return s
}

export function praise(lang: Lang) {
  const keys = ['praise1', 'praise2', 'praise3']
  return t(lang, keys[Math.floor(Math.random() * keys.length)])
}
