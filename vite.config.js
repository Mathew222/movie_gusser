import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
/**
 * Vite Configuration
 * Configures build settings, dev server, and path aliases
 */
export default defineConfig({
  plugins: [react()],
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: true,
    headers: {
      'X-Frame-Options': 'ALLOWALL'
    }
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})