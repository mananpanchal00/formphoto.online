import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Avoid issues with large libs like pdfjs
    chunkSizeWarningLimit: 1500,
  },
  // Ensure worker files are handled correctly
  optimizeDeps: {
    exclude: ['pdfjs-dist'],
  },
})
