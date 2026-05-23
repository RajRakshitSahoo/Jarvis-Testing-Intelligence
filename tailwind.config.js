/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon': '#00ff88',
        'neon-dim': '#00cc6a',
        'neon-dark': '#005533',
        'cyber': '#00ffff',
        'cyber-dim': '#00cccc',
        'danger': '#ff3333',
        'warning': '#ffaa00',
        'bg-primary': '#050505',
        'bg-secondary': '#0a0a0a',
        'bg-panel': '#0d1a0d',
        'glass': 'rgba(0, 255, 136, 0.05)',
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'Fira Code', 'Cascadia Code', 'monospace'],
        'display': ['Orbitron', 'monospace'],
        'ui': ['Share Tech Mono', 'monospace'],
      },
      animation: {
        'matrix-rain': 'matrixRain 2s linear infinite',
        'pulse-neon': 'pulseNeon 2s ease-in-out infinite',
        'scanline': 'scanline 8s linear infinite',
        'glitch': 'glitch 0.3s ease-in-out',
        'typing': 'typing 1s steps(20) infinite',
        'flicker': 'flicker 0.15s infinite',
        'spin-slow': 'spin 8s linear infinite',
        'ping-slow': 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      keyframes: {
        pulseNeon: {
          '0%, 100%': { textShadow: '0 0 7px #00ff88, 0 0 10px #00ff88, 0 0 21px #00ff88' },
          '50%': { textShadow: '0 0 14px #00ff88, 0 0 20px #00ff88, 0 0 42px #00ff88' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '25%': { transform: 'translate(-2px, 2px)' },
          '50%': { transform: 'translate(2px, -2px)' },
          '75%': { transform: 'translate(-1px, 1px)' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
      boxShadow: {
        'neon': '0 0 5px #00ff88, 0 0 20px #00ff88, 0 0 40px rgba(0, 255, 136, 0.3)',
        'neon-sm': '0 0 3px #00ff88, 0 0 10px rgba(0, 255, 136, 0.5)',
        'neon-lg': '0 0 10px #00ff88, 0 0 30px #00ff88, 0 0 60px rgba(0, 255, 136, 0.3)',
        'panel': '0 0 20px rgba(0, 255, 136, 0.1), inset 0 0 20px rgba(0, 255, 136, 0.03)',
        'danger': '0 0 5px #ff3333, 0 0 20px rgba(255, 51, 51, 0.3)',
      },
    },
  },
  plugins: [],
}
