import { useEffect, useRef, memo } from 'react'
import { useStore } from '../../store/useStore'
import Panel from '../UI/Panel'
import { Network } from 'lucide-react'

interface Node {
  x: number; y: number; vx: number; vy: number; r: number; active: boolean; pulse: number
}

interface Edge {
  a: number; b: number; active: boolean; progress: number; speed: number
}

const NeuralViz = memo(function NeuralViz() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const frameRef = useRef<number>(0)
  const nodesRef = useRef<Node[]>([])
  const edgesRef = useRef<Edge[]>([])
  const isThinking = useStore((s) => s.isThinking)
  const isThinkingRef = useRef(isThinking)

  useEffect(() => { isThinkingRef.current = isThinking }, [isThinking])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const W = canvas.width = canvas.offsetWidth
    const H = canvas.height = canvas.offsetHeight

    // Create nodes
    const N = 28
    nodesRef.current = Array.from({ length: N }, (_, i) => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: 2 + Math.random() * 2,
      active: Math.random() > 0.6,
      pulse: Math.random() * Math.PI * 2,
    }))

    // Create edges (connect nearby nodes)
    edgesRef.current = []
    for (let i = 0; i < N; i++) {
      for (let j = i + 1; j < N; j++) {
        const dx = nodesRef.current[i].x - nodesRef.current[j].x
        const dy = nodesRef.current[i].y - nodesRef.current[j].y
        if (Math.hypot(dx, dy) < 80 && Math.random() > 0.5) {
          edgesRef.current.push({ a: i, b: j, active: false, progress: 0, speed: 0.01 + Math.random() * 0.02 })
        }
      }
    }

    let lastTime = 0
    const draw = (time: number) => {
      frameRef.current = requestAnimationFrame(draw)
      if (time - lastTime < 33) return // 30fps
      lastTime = time

      ctx.clearRect(0, 0, W, H)

      const thinking = isThinkingRef.current
      const speedMult = thinking ? 3 : 1

      // Update nodes
      nodesRef.current.forEach((n) => {
        n.x += n.vx * speedMult
        n.y += n.vy * speedMult
        n.pulse += 0.04 * speedMult
        if (n.x < 0 || n.x > W) n.vx *= -1
        if (n.y < 0 || n.y > H) n.vy *= -1
        if (Math.random() < 0.005) n.active = !n.active
      })

      // Activate edges randomly
      if (Math.random() < (thinking ? 0.3 : 0.05)) {
        const e = edgesRef.current[Math.floor(Math.random() * edgesRef.current.length)]
        e.active = true
        e.progress = 0
      }

      // Draw edges
      edgesRef.current.forEach((e) => {
        const na = nodesRef.current[e.a]
        const nb = nodesRef.current[e.b]
        const dx = nb.x - na.x
        const dy = nb.y - na.y
        const dist = Math.hypot(dx, dy)

        // Static edge
        ctx.beginPath()
        ctx.moveTo(na.x, na.y)
        ctx.lineTo(nb.x, nb.y)
        ctx.strokeStyle = 'rgba(0,255,136,0.06)'
        ctx.lineWidth = 0.5
        ctx.stroke()

        // Animated data packet
        if (e.active) {
          e.progress += e.speed * speedMult
          if (e.progress >= 1) { e.active = false; e.progress = 0 }
          else {
            const px = na.x + dx * e.progress
            const py = na.y + dy * e.progress
            ctx.beginPath()
            ctx.arc(px, py, 2, 0, Math.PI * 2)
            ctx.fillStyle = thinking ? 'rgba(170,136,255,0.9)' : 'rgba(0,255,136,0.9)'
            ctx.shadowBlur = 6
            ctx.shadowColor = thinking ? '#aa88ff' : '#00ff88'
            ctx.fill()
            ctx.shadowBlur = 0
          }
        }
      })

      // Draw nodes
      nodesRef.current.forEach((n) => {
        const pulse = Math.sin(n.pulse) * 0.5 + 0.5
        const r = n.r + pulse * 1.5
        const color = thinking ? 'rgba(170,136,255,' : (n.active ? 'rgba(0,255,136,' : 'rgba(0,180,80,')

        ctx.beginPath()
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2)
        ctx.fillStyle = color + (n.active ? '0.9)' : '0.4)')
        ctx.shadowBlur = n.active ? 8 : 3
        ctx.shadowColor = thinking ? '#aa88ff' : '#00ff88'
        ctx.fill()
        ctx.shadowBlur = 0
      })
    }

    frameRef.current = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(frameRef.current)
  }, [])

  return (
    <Panel
      title="Neural Network"
      icon={<Network size={12} />}
      badge={isThinking ? 'ACTIVE' : 'IDLE'}
      badgeColor={isThinking ? '#aa88ff' : undefined}
    >
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: 160, display: 'block' }}
        width={400}
        height={160}
      />
      <div style={{ marginTop: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: 'Share Tech Mono', fontSize: 9, color: 'rgba(0,255,136,0.4)', letterSpacing: 1 }}>
          247 NODES · 1.337T PARAMS
        </span>
        <span style={{ fontFamily: 'JetBrains Mono', fontSize: 9, color: isThinking ? '#aa88ff' : '#00ff88' }}>
          {isThinking ? '◉ PROCESSING' : '● READY'}
        </span>
      </div>
    </Panel>
  )
})

export default NeuralViz
