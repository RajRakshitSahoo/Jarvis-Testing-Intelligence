import { useEffect, useRef, memo, useCallback } from 'react'
import Panel from '../UI/Panel'
import { Terminal as TerminalIcon } from 'lucide-react'
import { useStore } from '../../store/useStore'

const COMMANDS: Record<string, string[]> = {
  help: [
    '\x1b[32mAvailable commands:\x1b[0m',
    '  \x1b[36mscan-network\x1b[0m    — Scan all network nodes for vulnerabilities',
    '  \x1b[36mactivate-core\x1b[0m   — Bring AI subsystem online',
    '  \x1b[36mtrace-route\x1b[0m     — Trace packet route to target host',
    '  \x1b[36manalyze-system\x1b[0m  — Full system diagnostic scan',
    '  \x1b[36mneural-status\x1b[0m   — Check neural network integrity',
    '  \x1b[36mdecrypt-node\x1b[0m    — Decrypt encrypted node data',
    '  \x1b[36mps\x1b[0m              — List active AI processes',
    '  \x1b[36mclear\x1b[0m           — Clear terminal',
    '  \x1b[36mstatus\x1b[0m          — System overview',
  ],
  'scan-network': [
    '\x1b[33m[SCANNING]\x1b[0m Initializing network perimeter scan...',
    '\x1b[32m✓\x1b[0m Node 192.168.1.1 — \x1b[32mSECURE\x1b[0m (latency: 1ms)',
    '\x1b[32m✓\x1b[0m Node 10.0.0.47 — \x1b[32mSECURE\x1b[0m (latency: 3ms)',
    '\x1b[33m⚠\x1b[0m Node 172.16.0.23 — \x1b[33mANOMALY\x1b[0m (latency: 47ms)',
    '\x1b[32m✓\x1b[0m Node 192.168.1.105 — \x1b[32mSECURE\x1b[0m (latency: 2ms)',
    '\x1b[31m✗\x1b[0m Node 10.0.0.99 — \x1b[31mBLOCKED\x1b[0m (unauthorized)',
    '\x1b[32m[DONE]\x1b[0m Scan complete: 4 secure, 1 anomaly, 1 blocked',
  ],
  'activate-core': [
    '\x1b[36m[INIT]\x1b[0m Activating AI core subsystem...',
    '\x1b[32m✓\x1b[0m Neural processor: \x1b[32mONLINE\x1b[0m',
    '\x1b[32m✓\x1b[0m Memory banks: \x1b[32mACTIVE\x1b[0m [13.7GB allocated]',
    '\x1b[32m✓\x1b[0m Quantum engine: \x1b[32mSYNCED\x1b[0m',
    '\x1b[32m✓\x1b[0m Language model: \x1b[32mLOADED\x1b[0m [1.3T params]',
    '\x1b[32m[COMPLETE]\x1b[0m \x1b[1mAI CORE FULLY OPERATIONAL\x1b[0m',
  ],
  'trace-route': [
    '\x1b[33m[TRACE]\x1b[0m Initiating route trace to 8.8.8.8...',
    '  1  192.168.1.1   1.2ms   \x1b[32m●\x1b[0m',
    '  2  10.14.0.1     8.3ms   \x1b[32m●\x1b[0m',
    '  3  172.217.0.1   11.7ms  \x1b[32m●\x1b[0m',
    '  4  108.170.0.1   14.2ms  \x1b[32m●\x1b[0m',
    '  5  8.8.8.8       15.1ms  \x1b[32m●\x1b[0m',
    '\x1b[32m[DONE]\x1b[0m Route traced: 5 hops, 15.1ms avg',
  ],
  'analyze-system': [
    '\x1b[36m[DIAG]\x1b[0m Running full system diagnostic...',
    '\x1b[32m✓\x1b[0m CPU thermal management: \x1b[32mNOMINAL\x1b[0m',
    '\x1b[32m✓\x1b[0m GPU memory integrity: \x1b[32mPASSED\x1b[0m',
    '\x1b[32m✓\x1b[0m Neural pathway coherence: \x1b[32m99.94%\x1b[0m',
    '\x1b[32m✓\x1b[0m Encryption modules: \x1b[32mACTIVE\x1b[0m',
    '\x1b[33m⚠\x1b[0m Sector 7G anomaly log: \x1b[33m1 entry\x1b[0m',
    '\x1b[32m[OK]\x1b[0m Diagnostic complete. System health: \x1b[32m98.2%\x1b[0m',
  ],
  'neural-status': [
    '\x1b[35m[NEURAL]\x1b[0m Querying neural network integrity...',
    '  Layers active:    \x1b[32m247 / 247\x1b[0m',
    '  Synaptic weight:  \x1b[32m1.337T params\x1b[0m',
    '  Accuracy (bench): \x1b[32m99.94%\x1b[0m',
    '  Inference speed:  \x1b[32m47ms avg\x1b[0m',
    '  Training epoch:   \x1b[36m∞ (continuous)\x1b[0m',
    '\x1b[32m[OK]\x1b[0m Neural subsystem integrity: \x1b[32mPERFECT\x1b[0m',
  ],
  'decrypt-node': [
    '\x1b[31m[DECRYPT]\x1b[0m Accessing encrypted node archive...',
    '\x1b[33m⚙\x1b[0m Applying AES-256 cipher...',
    '\x1b[33m⚙\x1b[0m Breaking RSA-4096 outer shell...',
    '\x1b[33m⚙\x1b[0m Quantum key derivation in progress...',
    '\x1b[32m✓\x1b[0m Decryption successful',
    '\x1b[36mDATA:\x1b[0m NODE_ID=7G | TIMESTAMP=2024-01-15T03:47:22Z',
    '\x1b[36mDATA:\x1b[0m PAYLOAD=\x1b[31m[CLASSIFIED — CLEARANCE LEVEL 5 REQUIRED]\x1b[0m',
  ],
  ps: [
    '\x1b[32mPID    PROCESS                CPU    MEM\x1b[0m',
    '1001   jarvis-core.ai          12.3%  4.2GB',
    '1002   neural-engine.gpu        8.7%  2.1GB',
    '1003   threat-detector.ai       2.1%  512MB',
    '1004   memory-archive.db        1.4%  1.8GB',
    '1005   quantum-sync.daemon      0.8%  256MB',
    '1006   voice-processor.ai       1.2%  384MB',
    '1007   network-monitor.bg       0.4%  128MB',
  ],
  status: [
    '\x1b[32m╔══════════════════════════════════╗\x1b[0m',
    '\x1b[32m║     JARVIS OS v9.1.0 — STATUS    ║\x1b[0m',
    '\x1b[32m╚══════════════════════════════════╝\x1b[0m',
    '  AI Core:       \x1b[32mONLINE\x1b[0m',
    '  Threat Level:  \x1b[32mLOW\x1b[0m',
    '  Uptime:        \x1b[36m99.99%\x1b[0m',
    '  Nodes Active:  \x1b[32m247/247\x1b[0m',
    '  Last Incident: \x1b[33m14d 6h ago\x1b[0m',
  ],
}

const TerminalPanel = memo(function TerminalPanel() {
  const containerRef = useRef<HTMLDivElement>(null)
  const termRef = useRef<any>(null)
  const cmdRef = useRef('')
  const historyRef = useRef<string[]>([])
  const historyIdxRef = useRef(-1)
  const addActivity = useStore((s) => s.addActivity)

  const writePrompt = useCallback((term: any) => {
    term.write('\r\n\x1b[32mJARVIS\x1b[0m:\x1b[36m~\x1b[0m\x1b[32m$ \x1b[0m')
  }, [])

  const handleCommand = useCallback((term: any, cmd: string) => {
    const trimmed = cmd.trim().toLowerCase()
    if (!trimmed) { writePrompt(term); return }

    historyRef.current.unshift(trimmed)
    historyIdxRef.current = -1

    if (trimmed === 'clear') {
      term.clear()
      writePrompt(term)
      return
    }

    const output = COMMANDS[trimmed]
    if (output) {
      term.write('\r\n')
      output.forEach((line, i) => {
        setTimeout(() => {
          term.write(line + '\r\n')
          if (i === output.length - 1) {
            addActivity(`Terminal: ${trimmed}`)
            writePrompt(term)
          }
        }, i * 80)
      })
    } else {
      term.write(`\r\n\x1b[31mCommand not found: ${trimmed}\x1b[0m — type 'help' for commands`)
      writePrompt(term)
    }
  }, [writePrompt, addActivity])

  useEffect(() => {
    let term: any = null
    let fitAddon: any = null

    const init = async () => {
      try {
        const { Terminal } = await import('@xterm/xterm')
        const { FitAddon } = await import('@xterm/addon-fit')
        // Load xterm CSS dynamically
        if (!document.querySelector('#xterm-css')) {
          const link = document.createElement('link')
          link.id = 'xterm-css'
          link.rel = 'stylesheet'
          link.href = 'https://cdn.jsdelivr.net/npm/@xterm/xterm@5.3.0/css/xterm.min.css'
          document.head.appendChild(link)
        }

        if (!containerRef.current) return

        term = new Terminal({
          cursorBlink: true,
          theme: {
            background: 'transparent',
            foreground: '#00ff88',
            cursor: '#00ff88',
            selectionBackground: 'rgba(0,255,136,0.2)',
            black: '#050505',
            green: '#00ff88',
            cyan: '#00ffff',
            red: '#ff3333',
            yellow: '#ffaa00',
            magenta: '#aa88ff',
            white: '#cccccc',
          },
          fontSize: 11,
          fontFamily: 'JetBrains Mono, Fira Code, monospace',
          letterSpacing: 0.5,
          lineHeight: 1.4,
          scrollback: 500,
          convertEol: true,
        })

        fitAddon = new FitAddon()
        term.loadAddon(fitAddon)
        term.open(containerRef.current)
        fitAddon.fit()
        termRef.current = term

        // Welcome message
        const welcome = [
          '\x1b[32m╔══════════════════════════════════════════╗\x1b[0m',
          '\x1b[32m║   JARVIS SECURE TERMINAL v9.1.0          ║\x1b[0m',
          '\x1b[32m║   AES-256 Encrypted — Clearance Level 5  ║\x1b[0m',
          '\x1b[32m╚══════════════════════════════════════════╝\x1b[0m',
          "Type '\x1b[36mhelp\x1b[0m' for available commands.",
        ]
        welcome.forEach((l) => term.writeln(l))

        writePrompt(term)

        // Input handling
        term.onKey(({ key, domEvent }: { key: string; domEvent: KeyboardEvent }) => {
          const printable = !domEvent.altKey && !domEvent.ctrlKey && !domEvent.metaKey

          if (domEvent.keyCode === 13) {
            // Enter
            handleCommand(term, cmdRef.current)
            cmdRef.current = ''
          } else if (domEvent.keyCode === 8) {
            // Backspace
            if (cmdRef.current.length > 0) {
              cmdRef.current = cmdRef.current.slice(0, -1)
              term.write('\b \b')
            }
          } else if (domEvent.keyCode === 38) {
            // Up arrow - history
            const idx = historyIdxRef.current + 1
            if (idx < historyRef.current.length) {
              const h = historyRef.current[idx]
              // Clear current line
              term.write('\b \b'.repeat(cmdRef.current.length))
              term.write(h)
              cmdRef.current = h
              historyIdxRef.current = idx
            }
          } else if (domEvent.keyCode === 40) {
            // Down arrow
            const idx = historyIdxRef.current - 1
            if (idx >= 0) {
              const h = historyRef.current[idx]
              term.write('\b \b'.repeat(cmdRef.current.length))
              term.write(h)
              cmdRef.current = h
              historyIdxRef.current = idx
            } else {
              term.write('\b \b'.repeat(cmdRef.current.length))
              cmdRef.current = ''
              historyIdxRef.current = -1
            }
          } else if (printable) {
            cmdRef.current += key
            term.write(key)
          }
        })

        // Resize observer
        const ro = new ResizeObserver(() => fitAddon?.fit())
        if (containerRef.current) ro.observe(containerRef.current)

        return () => ro.disconnect()
      } catch (e) {
        console.error('Terminal init failed:', e)
        if (containerRef.current) {
          containerRef.current.innerHTML = '<div style="padding:16px;font-family:monospace;font-size:11px;color:#00ff88;">Terminal initialization failed. Run: npm install</div>'
        }
      }
    }

    init()
    return () => {
      termRef.current?.dispose()
    }
  }, [handleCommand, writePrompt])

  return (
    <Panel
      title="Secure Terminal"
      icon={<TerminalIcon size={12} />}
      badge="SHELL"
      badgeColor="#00ffff"
      style={{ height: '100%' }}
    >
      <div
        ref={containerRef}
        style={{
          height: 220,
          background: 'transparent',
          overflow: 'hidden',
        }}
        className="xterm-container"
      />
    </Panel>
  )
})

export default TerminalPanel
