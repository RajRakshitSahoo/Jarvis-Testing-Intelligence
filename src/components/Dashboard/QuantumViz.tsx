import { useEffect, useRef, memo } from 'react'
import { motion } from 'framer-motion'
import { Cpu } from 'lucide-react'
import { useStore } from '../../store/useStore'
import Panel from '../UI/Panel'

const QuantumViz = memo(function QuantumViz() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const frameRef = useRef<number>(0)
  const timeRef = useRef(0)
  const lastFrameRef = useRef(0)
  const metrics = useStore((s) => s.metrics)
  const metricsRef = useRef(metrics)

  useEffect(() => { metricsRef.current = metrics }, [metrics])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const W = canvas.width = canvas.offsetWidth
    const H = canvas.height = canvas.offsetHeight
    const cx = W / 2, cy = H / 2

    const draw = (now: number) => {
      frameRef.current = requestAnimationFrame(draw)
      if (now - lastFrameRef.current < 40) return
      lastFrameRef.current = now
      timeRef.current += 0.02

      ctx.clearRect(0, 0, W, H)

      const t = timeRef.current
      const load = metricsRef.current.aiLoad / 100
      const rings = 4

      // Draw concentric rings
      for (let r = 0; r < rings; r++) {
        const radius = 20 + r * 16
        const segments = 24 + r * 8
        const speed = (r % 2 === 0 ? 1 : -1) * (0.3 + load * 0.5)
        const angle = t * speed

        for (let s = 0; s < segments; s++) {
          const a = (s / segments) * Math.PI * 2 + angle
          const nextA = ((s + 0.7) / segments) * Math.PI * 2 + angle
          const active = (s % 3 === 0) || (Math.sin(t * 2 + r + s) > 0.6)
          const alpha = active ? 0.6 + load * 0.4 : 0.15

          ctx.beginPath()
          ctx.arc(cx, cy, radius, a, nextA)
          ctx.strokeStyle = r === 0 ? `rgba(170,136,255,${alpha})` : `rgba(0,255,136,${alpha})`
          ctx.lineWidth = r === 0 ? 2 : 1.5
          ctx.stroke()
        }
      }

      // Center core
      const coreR = 12 + Math.sin(t * 3) * 2
      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR)
      gradient.addColorStop(0, 'rgba(170,136,255,0.9)')
      gradient.addColorStop(0.5, 'rgba(0,255,136,0.5)')
      gradient.addColorStop(1, 'transparent')
      ctx.beginPath()
      ctx.arc(cx, cy, coreR, 0, Math.PI * 2)
      ctx.fillStyle = gradient
      ctx.fill()

      // Radar sweep
      const sweepA = t * 2
      ctx.beginPath()
      ctx.moveTo(cx, cy)
      ctx.arc(cx, cy, 80, sweepA, sweepA + 0.5)
      ctx.closePath()
      ctx.fillStyle = 'rgba(0,255,136,0.04)'
      ctx.fill()

      // Outer ring pulse
      ctx.beginPath()
      ctx.arc(cx, cy, 80 + Math.sin(t) * 3, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(0,255,136,${0.05 + load * 0.1})`
      ctx.lineWidth = 1
      ctx.stroke()
    }

    frameRef.current = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(frameRef.current)
  }, [])

  return (
    <Panel
      title="Quantum Processor"
      icon={<Cpu size={12} />}
      badge="Q-SYNC"
      badgeColor="#aa88ff"
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <canvas
          ref={canvasRef}
          style={{ width: 160, height: 100, flexShrink: 0 }}
          width={160}
          height={100}
        />
        <div style={{ flex: 1 }}>
          {[
            { label: 'Q-BITS', value: '512', color: '#aa88ff' },
            { label: 'COHERENCE', value: '99.7%', color: '#00ff88' },
            { label: 'GATE FIDELITY', value: '99.94%', color: '#00ffff' },
            { label: 'ERROR RATE', value: '0.003%', color: '#00ff88' },
          ].map((item) => (
            <div key={item.label} style={{ marginBottom: 6 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'Share Tech Mono', fontSize: 8, color: 'rgba(0,255,136,0.4)', letterSpacing: 1 }}>{item.label}</span>
                <span style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: item.color, textShadow: `0 0 5px ${item.color}` }}>{item.value}</span>
              </div>
              <div style={{ height: 1, background: 'rgba(0,255,136,0.06)', marginTop: 2 }} />
            </div>
          ))}
        </div>
      </div>
    </Panel>
  )
})

export default QuantumViz
