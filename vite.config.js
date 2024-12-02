import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: ['axios'], //optimize the dependencies for axios
  },
  plugins: [react()],
  base: "/board"
})
