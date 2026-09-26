import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Bind to the harness-assigned port when provided (autoPort); otherwise pick a
  // random free port (0) so we never collide with another server on 5173.
  server: {
    port: process.env.PORT ? Number(process.env.PORT) : 0,
    strictPort: false,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
