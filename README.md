# Laut Belajar

Aplikasi web belajar sambil bermain untuk anak usia 5 tahun, dibuat untuk dipakai di iPad.
Acuannya adalah Capaian Pembelajaran PAUD Fase Fondasi (Kurikulum Merdeka) dan dokumen
"Referensi Aplikasi Homeschooling Anak". Rencana lengkapnya ada di dokumen
[Rencana Aplikasi Belajar Anak 5 Tahun](https://claude.ai/artifact/XdYvqptL3U84NCz4AAgwii).

## Yang sudah ada (tahap 1)

- **Peta laut** dengan 6 pulau. Pulau Angka dan Huruf sudah bisa dimainkan, empat lainnya menyusul.
- **Tokoh pemandu orisinal**: Ombak si paus kecil dan Perak si burung laut perak.
- **Pulau Angka**: menghitung ikan (8–20) lalu memilih angkanya, membandingkan mana yang lebih banyak, dan melanjutkan pola.
- **Pulau Huruf**: menyusun huruf nama sendiri, menebak huruf awal kata bergambar, dan mencocokkan huruf dengan gambar.
- **Narasi suara** memakai TTS bawaan perangkat, dalam bahasa Indonesia atau Inggris. Tombol "dengar lagi" selalu ada di kanan atas.
- **Karang Pengetahuan**: satu karang tumbuh setiap kali satu kegiatan selesai. Tidak ada koin, nyawa, timer, peringkat, atau streak.
- **Akhir sesi yang lembut**: setelah waktu sesi habis, sesi berakhir begitu kegiatan yang sedang berjalan selesai. Layar meredup dan tokohnya tertidur.
- **Ruang Ayah/Bunda** yang dijaga soal perkalian. Isinya catatan perkembangan 7 hari, ide kegiatan tanpa layar, dan pengaturan (nama panggilan, bahasa, lama dan jumlah sesi, mode tenang, huruf yang sudah dikenal).
- **PWA**: bisa dipasang di layar utama iPad dan dipakai tanpa internet. Data hanya disimpan di perangkat (IndexedDB).

## Menjalankan

```bash
npm install
npm run dev      # mode pengembangan
npm run build    # build produksi ke dist/
npm run preview  # coba hasil build
```

Setiap push ke `main` otomatis dipasang ke GitHub Pages lewat `.github/workflows/deploy.yml`.
Aktifkan sekali di **Settings → Pages → Source: GitHub Actions**.

## Memasang di iPad

1. Buka alamat GitHub Pages aplikasi ini di Safari.
2. Ketuk tombol Bagikan, lalu pilih **Tambahkan ke Layar Utama**.
3. Buka aplikasi dari ikon di layar utama.

## Struktur

```
src/
  lib/         narasi (speech), bunyi, penyimpanan (db), teks dua bahasa (i18n)
  components/  tokoh SVG dan tombol dasar
  modules/     isi pelajaran per pulau (angka/, huruf/)
  screens/     layar: sambutan, peta, pulau, kegiatan, istirahat, gerbang & ruang orang tua
```
