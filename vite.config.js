import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Le SDK Firebase pèse ~560 kB : seuil relevé pour éviter un avertissement inutile.
  build: { chunkSizeWarningLimit: 700 },
})
