
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Admin_Chef/',  // <-- هذا السطر مهم جداً
})