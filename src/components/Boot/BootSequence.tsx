import { useState, useEffect, useCallback, memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '../../store/useStore'
import { useSound } from '../../hooks/useSound'

const BOOT_STAGES = [
  { text: 'INITIALIZING BIOS v4.2.1...', delay: 0, duration: 600 },
  { text: 'POST CHECK: CPU [i7-13650HX] ............... OK', delay: 600, duration: 500 },
  { text: 'POST CHECK: GPU [RTX 3050 6GB] ............. OK', delay: 1100, duration: 500 },
  { text: 'POST CHECK: RAM [16GB DDR5-4800] ........... OK', delay: 1600, duration: 400 },
  { text: 'POST CHECK: NVMe [1TB PCIe 4.0] ........... OK', delay: 2000, duration: 400 },
  { text: '', delay: 2400, duration: 100 },
  { text: 'LOADING JARVIS KERNEL v9.1.0...', delay: 2500, duration: 300 },
  { text: 'MOUNTING AI NEURAL FILESYSTEM...', delay: 2800, duration: 400 },
  { text: 'INITIALIZING QUANTUM PROCESSOR ENGINE...', delay: 3200, duration: 500 },
  { text: 'SCANNING GPU SHADER CACHE...', delay: 3700, duration: 400 },
  { text: 'LOADING NEURAL NETWORK WEIGHTS [1.3TB]...', delay: 4100, duration: 600 },
  { text: '████████████████████████ 100%', delay: 4700, duration: 400 },
  { text: '', delay: 5100, duration: 100 },
  { text: 'DECRYPTING MEMORY ARCHIVES...', delay: 5200, duration: 400 },
  { text: 'ACTIVATING THREAT DETECTION MODULE...', delay: 5600, duration: 400 },
  { text: 'SYNCHRONIZING GLOBAL AI NODES [247/247]...', delay: 6000, duration: 500 },
  { text: 'ESTABLISHING QUANTUM UPLINK...', delay: 6500, duration: 400 },
  { text: '', delay: 6900, duration: 100 },
  { text: '> ALL SYSTEMS NOMINAL', delay: 7000, duration: 300 },
  { text: '> JARVIS AI CORE: ONLINE', delay: 7300, duration: 300 },
]

const BootLine = memo(function BootLine({ text, index }: { text: string; index: number }) {
  const isOk = text.includes('OK')
  const isOnline = text.includes('ONLINE') || text.includes('NOMINAL')
  const isProgress = text.includes('████')

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.15 }}
      style={{
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: 11,
        lineHeight: '1.8',
        color: isOk ? '#00ff88' : isOnline ? '#00ffff' : isProgress ? '#00ff88' : 'rgba(0,255,136,0.6)',
        textShadow: isOk || isOnline ? '0 0 6px currentColor' : 'none',
        letterSpacing: 0.5,
      }}
    >
      {text}
    </motion.div>
  )
})

export default function BootSequence() {
  const setPhase = useStore((s) => s.setPhase)
  const { playBoot, playActivate } = useSound()
  const [visibleLines, setVisibleLines] = useState<number[]>([])
  const [progress, setProgress] = useState(0)
  const [showActivate, setShowActivate] = useState(false)
  const [activating, setActivating] = useState(false)
  const [glitchFrame, setGlitchFrame] = useState(false)

  useEffect(() => {
    BOOT_STAGES.forEach((stage, i) => {
      setTimeout(() => {
        setVisibleLines((prev) => [...prev, i])
        playBoot(i)
        setProgress(((i + 1) / BOOT_STAGES.length) * 100)
      }, stage.delay)
    })

    // Glitch effect
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setGlitchFrame(true)
        setTimeout(() => setGlitchFrame(false), 100)
      }
    }, 1500)

    // Show activate button
    const activateTimer = setTimeout(() => {
      setShowActivate(true)
    }, 7800)

    return () => {
      clearInterval(glitchInterval)
      clearTimeout(activateTimer)
    }
  }, [])

  const handleActivate = useCallback(() => {
    if (activating) return
    setActivating(true)
    playActivate()
    setTimeout(() => setPhase('dashboard'), 1500)
  }, [activating, playActivate, setPhase])

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: '#050505',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000,
        overflow: 'hidden',
      }}
    >
      {/* Background grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `linear-gradient(rgba(0,255,136,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.03) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          pointerEvents: 'none',
        }}
      />

      {/* Center content */}
      <motion.div
        animate={glitchFrame ? { x: [-2, 2, -1, 0], filter: ['hue-rotate(0deg)', 'hue-rotate(20deg)', 'hue-rotate(0deg)'] } : {}}
        transition={{ duration: 0.1 }}
        style={{ width: '100%', maxWidth: 700, padding: '0 24px' }}
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{ textAlign: 'center', marginBottom: 32 }}
        >
          <div
            style={{
              fontFamily: 'Orbitron, monospace',
              fontSize: 'clamp(28px, 5vw, 52px)',
              fontWeight: 900,
              color: '#00ff88',
              textShadow: '0 0 20px #00ff88, 0 0 40px rgba(0,255,136,0.4)',
              letterSpacing: 12,
              marginBottom: 6,
            }}
          >
            J.A.R.V.I.S
          </div>
          <div
            style={{
              fontFamily: 'Share Tech Mono',
              fontSize: 11,
              color: 'rgba(0,255,136,0.5)',
              letterSpacing: 6,
              textTransform: 'uppercase',
            }}
          >
            Just A Rather Very Intelligent System — v9.1.0
          </div>
        </motion.div>

        {/* Terminal box */}
        <div
          style={{
            background: 'rgba(0,10,5,0.9)',
            border: '1px solid rgba(0,255,136,0.2)',
            borderRadius: 4,
            padding: '16px 20px',
            minHeight: 280,
            boxShadow: '0 0 30px rgba(0,255,136,0.05)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Terminal header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid rgba(0,255,136,0.1)' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ff3b30' }} />
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ffcc00' }} />
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#00ff88' }} />
            <span style={{ fontFamily: 'Share Tech Mono', fontSize: 10, color: 'rgba(0,255,136,0.4)', marginLeft: 8, letterSpacing: 2 }}>
              JARVIS_BOOT_CONSOLE — SECURE CHANNEL
            </span>
          </div>

          {/* Boot lines */}
          <div>
            {BOOT_STAGES.map((stage, i) => (
              visibleLines.includes(i) && <BootLine key={i} text={stage.text} index={i} />
            ))}
            {/* Blinking cursor */}
            {!showActivate && (
              <span
                style={{
                  display: 'inline-block',
                  width: 8,
                  height: 14,
                  background: '#00ff88',
                  marginLeft: 2,
                  animation: 'blink 1s step-end infinite',
                  verticalAlign: 'middle',
                }}
              />
            )}
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ marginTop: 12, height: 2, background: 'rgba(0,255,136,0.1)', borderRadius: 1 }}>
          <motion.div
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
            style={{ height: '100%', background: '#00ff88', boxShadow: '0 0 8px #00ff88', borderRadius: 1 }}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
          <span style={{ fontFamily: 'Share Tech Mono', fontSize: 9, color: 'rgba(0,255,136,0.4)', letterSpacing: 2 }}>BOOT PROGRESS</span>
          <span style={{ fontFamily: 'JetBrains Mono', fontSize: 9, color: 'rgba(0,255,136,0.6)' }}>{Math.round(progress)}%</span>
        </div>

        {/* Activate button */}
        <AnimatePresence>
          {showActivate && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              style={{ marginTop: 24, display: 'flex', justifyContent: 'center' }}
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleActivate}
                disabled={activating}
                style={{
                  fontFamily: 'Orbitron, monospace',
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: 6,
                  textTransform: 'uppercase',
                  color: activating ? '#050505' : '#00ff88',
                  background: activating ? '#00ff88' : 'transparent',
                  border: '1px solid #00ff88',
                  padding: '12px 40px',
                  cursor: activating ? 'default' : 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: activating ? '0 0 30px #00ff88' : '0 0 10px rgba(0,255,136,0.3)',
                }}
              >
                {activating ? 'ACTIVATING...' : '[ ACTIVATE AI CORE ]'}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Bottom status */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1 }}
        style={{
          position: 'absolute',
          bottom: 20,
          fontFamily: 'Share Tech Mono',
          fontSize: 9,
          color: 'rgba(0,255,136,0.4)',
          letterSpacing: 4,
          textTransform: 'uppercase',
        }}
      >
        SECURE BOOT • AES-256 ENCRYPTION ACTIVE • NEURAL FIREWALL ENABLED
      </motion.div>
    </div>
  )
}
