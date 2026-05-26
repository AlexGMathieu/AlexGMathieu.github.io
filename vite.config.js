import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // User pages (username.github.io) → served at the root, base is '/'
  // Project pages (username.github.io/repo) would need base: '/repo/'
  base: '/',
})
