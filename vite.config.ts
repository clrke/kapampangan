/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages serves this project at https://clrke.github.io/kapampangan/
export default defineConfig({
  base: '/kapampangan/',
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/**/*.test.{ts,tsx}'],
    // Force test mode regardless of the invoking shell's NODE_ENV. Without this,
    // a shell with NODE_ENV=production (common on this machine) makes React resolve
    // its production build under jsdom, and react-dom's act() throws immediately —
    // "act(...) is not supported in production builds of React." `npm test` masks
    // this by prefixing NODE_ENV=test, but `npx vitest run` alone did not.
    env: { NODE_ENV: 'test' },
  },
})
