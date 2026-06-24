import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['@xterm/xterm', '@xterm/addon-fit', '@xterm/addon-web-links'],
    include: ['react', 'react-dom', 'framer-motion', 'gsap', 'zustand', 'three']
  }, 
  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
          'animation-vendor': ['framer-motion', 'gsap'],
        }
      }
    }
  },
  server: {
    port: 5173,
    host: true
  }
})
