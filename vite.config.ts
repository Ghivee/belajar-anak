import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// base relatif supaya bisa di-hosting di subfolder (mis. GitHub Pages /belajar-anak/)
export default defineConfig({
  base: './',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/apple-touch-icon.png', 'icons/icon.svg'],
      manifest: {
        name: 'Laut Belajar',
        short_name: 'Laut Belajar',
        description: 'Aplikasi belajar bermain untuk anak usia 5 tahun',
        lang: 'id',
        display: 'standalone',
        orientation: 'any',
        background_color: '#eaf4f4',
        theme_color: '#5b8fa8',
        start_url: './',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
    }),
  ],
})
