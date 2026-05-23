import { memo, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Volume2, VolumeX, Maximize2, Power, Clock } from 'lucide-react'
import { useStore } from '../../store/useStore'
import { useSound } from '../../hooks/useSound'

const TopBar = memo(function TopBar() {
  const isMuted = useStore((s) => s.isMuted)
  const toggleMute = useStore((s) => s.toggleMute)
  const metrics = useStore((s) => s.metrics)
  const threatLevel = useStore((s) => s.threatLevel)
  const { playClick } = useSound()
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const threatColor = threatLevel === 'high' ? '#ff3333' : threatLevel === 'medium' ? '#ffaa00' : '#00ff88'

  return (
    <div
      style={{
        height: 44,
        background: 'rgba(0,8,4,0.95)',
        borderBottom: '1px solid rgba(0,255,136,0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px',
        position: 'relative',
        backdropFilter: 'blur(10px)',
        zIndex: 100,
        flexShrink: 0,
      }}
    >
      {/* Left: Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 20, height: 20, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ position: 'absolute', inset: 0, border: '1px solid #00ff88', transform: 'rotate(45deg)', opacity: 0.6 }} />
            <div style={{ width: 6, height: 6, background: '#00ff88', transform: 'rotate(45deg)', boxShadow: '0 0 6px #00ff88' }} />
          </div>
          <span style={{ fontFamily: 'Orbitron, monospace', fontSize: 13, fontWeight: 700, color: '#00ff88', letterSpacing: 4, textShadow: '0 0 10px #00ff88' }}>
            JARVIS
          </span>
          <span style={{ fontFamily: 'Share Tech Mono', fontSize: 8, color: 'rgba(0,255,136,0.4)', letterSpacing: 2 }}>OS v9.1.0</span>
        </div>

        {/* Separator */}
        <div style={{ width: 1, height: 20, background: 'rgba(0,255,136,0.1)' }} />

        {/* Threat level */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <motion.div
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{ width: 5, height: 5, borderRadius: '50%', background: threatColor, boxShadow: `0 0 6px ${threatColor}` }}
          />
          <span style={{ fontFamily: 'Share Tech Mono', fontSize: 9, color: threatColor, letterSpacing: 2 }}>
            THREAT: {threatLevel.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Center: metrics strip */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {[
          { label: 'CPU', value: metrics.cpu, unit: '%' },
          { label: 'GPU', value: metrics.gpu, unit: '%' },
          { label: 'RAM', value: metrics.ram, unit: '%' },
          { label: 'FPS', value: metrics.fps, unit: '' },
        ].map((m) => (
          <div key={m.label} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ fontFamily: 'Share Tech Mono', fontSize: 8, color: 'rgba(0,255,136,0.35)', letterSpacing: 1 }}>{m.label}</span>
            <span style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: m.value > 80 ? '#ff3333' : m.value > 60 ? '#ffaa00' : '#00ff88' }}>
              {m.value}{m.unit}
            </span>
          </div>
        ))}
      </div>

      {/* Right: controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {/* Time */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <Clock size={10} color="rgba(0,255,136,0.4)" />
          <span style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: 'rgba(0,255,136,0.7)' }}>
            {time.toLocaleTimeString()}
          </span>
        </div>

        {/* Separator */}
        <div style={{ width: 1, height: 16, background: 'rgba(0,255,136,0.1)' }} />

        {/* Controls */}
        {[
          { icon: isMuted ? <VolumeX size={12} /> : <Volume2 size={12} />, action: () => { toggleMute(); playClick() } },
          { icon: <Maximize2 size={12} />, action: () => { document.documentElement.requestFullscreen?.(); playClick() } },
        ].map((ctrl, i) => (
          <button
            key={i}
            onClick={ctrl.action}
            style={{
              width: 26,
              height: 26,
              background: 'rgba(0,255,136,0.04)',
              border: '1px solid rgba(0,255,136,0.12)',
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'rgba(0,255,136,0.6)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(0,255,136,0.1)'; (e.currentTarget as HTMLElement).style.color = '#00ff88' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(0,255,136,0.04)'; (e.currentTarget as HTMLElement).style.color = 'rgba(0,255,136,0.6)' }}
          >
            {ctrl.icon}
          </button>
        ))}

        {/* AI Status indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '4px 8px', background: 'rgba(0,255,136,0.05)', border: '1px solid rgba(0,255,136,0.15)', borderRadius: 2 }}>
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            style={{ width: 4, height: 4, borderRadius: '50%', background: '#00ff88', boxShadow: '0 0 5px #00ff88' }}
          />
          <span style={{ fontFamily: 'Share Tech Mono', fontSize: 8, color: '#00ff88', letterSpacing: 2 }}>AI ONLINE</span>
        </div>
      </div>
    </div>
  )
})

export default TopBar
