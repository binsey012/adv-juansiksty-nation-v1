import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // For GitHub Pages deployments under a repo path
  base: process.env.BASE_PATH || '/',
  plugins: [react()],
})
