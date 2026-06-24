# ⚡ JARVIS OS — AI Supercomputer Interface

<div align="center">

``` 
     ██╗ █████╗ ██████╗ ██╗   ██╗██╗███████╗     ██████╗ ███████╗
     ██║██╔══██╗██╔══██╗██║   ██║██║██╔════╝    ██╔═══██╗██╔════╝
     ██║███████║██████╔╝██║   ██║██║███████╗    ██║   ██║███████╗
██   ██║██╔══██║██╔══██╗╚██╗ ██╔╝██║╚════██║    ██║   ██║╚════██║
╚█████╔╝██║  ██║██║  ██║ ╚████╔╝ ██║███████║    ╚██████╔╝███████║
 ╚════╝ ╚═╝  ╚═╝╚═╝  ╚═╝  ╚═══╝  ╚═╝╚══════╝     ╚═════╝ ╚══════╝
         Just A Rather Very Intelligent System — v9.1.0
```

**A cinematic, production-grade AI Operating System interface**  
*Inspired by Iron Man JARVIS · Cyberpunk 2077 · TRON Legacy · The Matrix*

![Version](https://img.shields.io/badge/version-9.1.0-00ff88?style=flat-square&labelColor=050505)
![React](https://img.shields.io/badge/React-18.2-00ff88?style=flat-square&labelColor=050505)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-00ff88?style=flat-square&labelColor=050505)
![Vite](https://img.shields.io/badge/Vite-5.0-00ff88?style=flat-square&labelColor=050505)

</div>

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** v18+ (v20 LTS recommended)
- **npm** v9+
- Modern browser (Chrome 100+, Firefox 100+, Edge 100+)

### Installation & Run

```bash
# 1. Navigate into the project
cd jarvis-os

# 2. Install all dependencies (~483 packages)
npm install

# 3. Start the development server
npm run dev

# 4. Open in browser
# → http://localhost:5173
```

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🖥️ System Requirements

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| CPU | Any modern dual-core | Intel i7-13650HX ✓ |
| GPU | Integrated graphics | RTX 3050 6GB ✓ |
| RAM | 8GB | 16GB DDR5 ✓ |
| Browser | Chrome 100+ | Chrome 120+ |
| Node.js | v16 | v20 LTS |

---

## ✨ Features

### 🎬 Boot Sequence
- Cinematic BIOS/POST simulation (8–10 seconds)
- Animated typing terminal with staged initialization
- GPU/CPU/RAM diagnostic checks
- Neural network loading simulation
- Click `[ ACTIVATE AI CORE ]` to enter the dashboard
- Custom boot sounds (unmute to hear)

### 🤖 AI Chat Panel (JARVIS)
- Send messages and get contextual AI responses
- **Thinking simulation** (5–8 seconds) with animated stages:
  - Scanning neural archives...
  - Accessing encrypted memory banks...
  - Building logical framework...
  - Calculating probability matrix...
- Animated neural waveform during processing
- Markdown rendering with syntax highlighting
- Copy-to-clipboard on responses
- Command history

### 📊 System Monitor
- **Live metrics** (CPU, GPU, RAM, Temp, Network, FPS)
- Smooth animated progress bars
- Color-coded status (green/yellow/red)
- Real-time frame counter

### 🖥️ Hacker Terminal
- Built with **xterm.js** — full terminal emulation
- Fake commands: `scan-network`, `activate-core`, `trace-route`, `analyze-system`, `neural-status`, `decrypt-node`, `ps`, `status`
- Command history (↑↓ arrow keys)
- Blinking cursor, neon glow styling

### 🧠 Neural Network Visualizer
- Live animated neural nodes and connections
- Data packets flowing between nodes
- Speeds up dynamically when AI is "thinking"

### 🌐 Global AI Node Map
- Rotating 3D globe built with Canvas
- 12 global nodes (NY, London, Tokyo, Singapore, etc.)
- Live connection lines between active nodes
- Pulse rings on active nodes

### 🛡️ Threat Detection
- Real-time threat level indicator (LOW / MEDIUM / HIGH)
- Threat log with source IPs and protocols
- Animated perimeter scan progress bar
- Dynamic level changes over time

### ⚛️ Quantum Processor Visualization
- Animated concentric ring visualization
- Radar sweep effect
- Quantum metrics (Q-bits, Coherence, Gate Fidelity)

### 💾 AI Memory Panel
- Memory allocation visualization
- Hot/Cold/Locked memory segments
- Animated fill bar

### 📋 Activity Log
- Live feed of all system events
- Chat events, notifications, terminal commands
- Fading historical entries

### 🔔 Notification System
- Auto-generated AI system alerts
- Color-coded by severity (info/warning/danger/success)
- Slide-in/out animations with auto-dismiss
- Click to dismiss early

### 🎨 Background Effects
- **Matrix Rain** — animated falling characters
- **Mouse Glow** — cursor-following radial light
- **Scanlines** — CRT screen overlay
- **Corner decorations** — futuristic frame
- **Ambient grid** — subtle background grid

---

## 🗂️ Project Structure

```
jarvis-os/
├── src/
│   ├── components/
│   │   ├── Boot/
│   │   │   └── BootSequence.tsx       # Cinematic startup
│   │   ├── Chat/
│   │   │   └── ChatPanel.tsx          # AI chat + thinking sim
│   │   ├── Dashboard/
│   │   │   ├── Dashboard.tsx          # Main layout grid
│   │   │   ├── ThreatDetection.tsx    # Security panel
│   │   │   ├── ActivityFeed.tsx       # Live event log
│   │   │   ├── NodeMap.tsx            # Globe visualization
│   │   │   ├── AIMemory.tsx           # Memory panel
│   │   │   └── QuantumViz.tsx         # Quantum viz
│   │   ├── Effects/
│   │   │   ├── MatrixRain.tsx         # Canvas matrix rain
│   │   │   ├── MouseGlow.tsx          # Cursor glow
│   │   │   └── ScanlineOverlay.tsx    # CRT overlay
│   │   ├── Monitor/
│   │   │   └── SystemMonitor.tsx      # Metrics panel
│   │   ├── Neural/
│   │   │   └── NeuralViz.tsx          # Neural network canvas
│   │   ├── Terminal/
│   │   │   └── TerminalPanel.tsx      # xterm.js terminal
│   │   └── UI/
│   │       ├── Panel.tsx              # Reusable glass panel
│   │       ├── TopBar.tsx             # Header bar
│   │       └── NotificationCenter.tsx # Toast notifications
│   ├── hooks/
│   │   ├── useSystemMetrics.ts        # Live metrics simulation
│   │   ├── useNotifications.ts        # Auto notifications
│   │   └── useSound.ts                # Web Audio API sounds
│   ├── store/
│   │   └── useStore.ts                # Zustand global state
│   ├── styles/
│   │   └── globals.css                # Global CSS + animations
│   ├── App.tsx                        # Root with phase routing
│   └── main.tsx                       # Entry point
├── public/
│   └── favicon.svg
├── .vscode/
│   ├── settings.json                  # Optimized VS Code config
│   ├── extensions.json                # Recommended extensions
│   └── launch.json                    # Chrome debug config
├── index.html
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.2 | UI framework |
| TypeScript | 5.2 | Type safety |
| Vite | 5.0 | Build tool + dev server |
| Tailwind CSS | 3.4 | Utility styling |
| Framer Motion | 10.18 | Animations & transitions |
| Zustand | 4.4 | Global state management |
| xterm.js | 5.3 | Terminal emulator |
| Three.js | 0.160 | 3D (bundled, ready to use) |
| GSAP | 3.12 | Advanced animations |
| Lucide React | 0.309 | Icon system |

---

## ⚡ Performance Optimizations

- All canvas animations throttled to 20–30fps (matrix rain, globe)
- React.memo on every component to prevent re-renders
- Framer Motion `willChange: 'transform'` on animated elements
- Zustand for minimal re-render state management
- Vite code splitting: separate chunks for React, Three.js, animations
- `requestAnimationFrame` with time-delta throttling
- Lazy-loaded xterm.js (loaded only when terminal mounts)
- System metrics animate at 10fps via RAF throttling
- GPU-accelerated transforms via CSS `will-change`

---

## 🎮 Usage Guide

### Boot Screen
1. Watch the BIOS/POST simulation run through
2. Once fully loaded, click **`[ ACTIVATE AI CORE ]`**
3. The dashboard transitions in with a cinematic blur effect

### Dashboard
- **Top bar**: Real-time metrics, threat level, mute/fullscreen controls
- **Left column**: System Monitor → Threat Detection → AI Memory
- **Center**: Chat Panel (top) + Terminal + Quantum Viz (bottom)
- **Right column**: Neural Viz → Globe Map → Activity Feed

### Chat with JARVIS
1. Type in the chat input and press **Enter**
2. Watch the 5–8 second "thinking" animation
3. JARVIS responds with context-aware answers
4. Try: "status", "help", "who are you", or any question

### Terminal Commands
```
help            Show all commands
scan-network    Network vulnerability scan
activate-core   Boot AI subsystems
trace-route     Trace network path
analyze-system  Full diagnostic
neural-status   Check neural network
decrypt-node    Decrypt encrypted node
ps              List AI processes
status          System overview
clear           Clear screen
```

### Controls
- **Mute button** (top right): Toggle sound effects
- **Fullscreen button**: Expand to fullscreen (F11 also works)
- **Notifications**: Click any notification to dismiss

---

## 🔧 VS Code Setup

### Recommended Extensions
Install these for the best development experience:
- **Prettier** — `esbenp.prettier-vscode`
- **ESLint** — `dbaeumer.vscode-eslint`
- **Tailwind IntelliSense** — `bradlc.vscode-tailwindcss`
- **One Dark Pro** — `zhuangtongfa.material-theme`
- **Material Icons** — `pkief.material-icon-theme`

Or install all at once:
```bash
code --install-extension esbenp.prettier-vscode
code --install-extension dbaeumer.vscode-eslint
code --install-extension bradlc.vscode-tailwindcss
code --install-extension zhuangtongfa.material-theme
code --install-extension pkief.material-icon-theme
```

### Open in VS Code
```bash
code jarvis-os
```

### Debug in Chrome
1. Run `npm run dev` in the terminal
2. Press `F5` in VS Code (or Run → Start Debugging)
3. Chrome launches at `http://localhost:5173`

---

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel --prod
```

### Netlify
```bash
npm run build
# Drag & drop the `dist/` folder to netlify.com
```

### GitHub Pages
```bash
npm run build
# Push dist/ to gh-pages branch
```

### Self-hosted (Nginx)
```bash
npm run build
# Copy dist/ to your web server root
# Configure nginx to serve index.html for all routes
```

---

## 🔮 Future Upgrade Ideas

1. **Connect to real Claude/GPT API** — Replace simulated responses with actual AI
2. **Real system metrics** — Use Electron + Node.js native modules for actual CPU/GPU stats
3. **Three.js 3D Globe** — Replace canvas globe with full React Three Fiber implementation
4. **Voice recognition** — Web Speech API integration for voice commands
5. **Custom themes** — Red/Blue/White color scheme switcher
6. **Draggable windows** — Full window manager with react-rnd
7. **File system browser** — Simulated encrypted file tree
8. **Network packet visualizer** — Real WebSocket traffic visualization
9. **Plugin system** — Custom panel modules
10. **Mobile responsive** — Stacked layout for tablet/mobile

---

## 🐛 Troubleshooting

### Terminal not showing
The xterm.js CSS loads from CDN. Ensure internet connection on first load.

### Fonts not loading
The project uses Google Fonts. Ensure internet access, or download fonts locally.

### Performance issues
- Lower particle density in `MatrixRain.tsx` (increase the `50` frame throttle)
- Disable matrix rain in `App.tsx` by removing `<MatrixRain />`

### Port 5173 in use
```bash
npm run dev -- --port 3000
```

### Node version issues
```bash
nvm use 20
npm install
```

---

## 📄 License

MIT License — Free to use, modify, and distribute.

---

<div align="center">

**Built with ⚡ for the future**

```
JARVIS AI SYSTEMS © 2025 — AES-256 ENCRYPTED — ALL NODES SECURE
```

</div>
