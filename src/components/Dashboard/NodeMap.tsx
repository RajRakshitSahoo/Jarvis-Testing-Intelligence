import { useEffect, useRef, memo } from 'react'
import { useStore } from '../../store/useStore'
import Panel from '../UI/Panel'
import { Globe } from 'lucide-react'

interface GlobeNode {
  lat: number; lon: number; label: string; active: boolean
}

const NODES: GlobeNode[] = [
  { lat: 40.7, lon: -74.0, label: 'NY', active: true },
  { lat: 51.5, lon: -0.1, label: 'LN', active: true },
  { lat: 35.7, lon: 139.7, label: 'TK', active: true },
  { lat: 1.3, lon: 103.8, label: 'SG', active: true },
  { lat: 37.8, lon: -122.4, label: 'SF', active: false },
  { lat: 48.9, lon: 2.3, label: 'PR', active: true },
  { lat: -33.9, lon: 151.2, label: 'SY', active: false },
  { lat: 55.8, lon: 37.6, label: 'MS', active: true },
  { lat: 19.1, lon: 72.9, label: 'MB', active: true },
  { lat: -23.5, lon: -46.6, label: 'SP', active: false },
  { lat: 25.2, lon: 55.3, label: 'DB', active: true },
  { lat: 22.3, lon: 114.2, label: 'HK', active: true },
]

function project(lat: number, lon: number, cx: number, cy: number, r: number, rotX: number) {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lon + 180) * (Math.PI / 180) + rotX
  const x = -r * Math.sin(phi) * Math.cos(theta)
  const y = r * Math.cos(phi)
  const z = r * Math.sin(phi) * Math.sin(theta)
  return { x: cx + x, y: cy + y, z }
}

const NodeMap = memo(function NodeMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const frameRef = useRef<number>(0)
  const rotRef = useRef(0)
  const lastTimeRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const W = canvas.width = canvas.offsetWidth
    const H = canvas.height = canvas.offsetHeight
    const cx = W / 2, cy = H / 2
    const R = Math.min(W, H) * 0.38

    const draw = (time: number) => {
      frameRef.current = requestAnimationFrame(draw)
      if (time - lastTimeRef.current < 50) return // 20fps
      lastTimeRef.current = time

      ctx.clearRect(0, 0, W, H)

      // Globe outline
      ctx.beginPath()
      ctx.arc(cx, cy, R, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(0,255,136,0.1)'
      ctx.lineWidth = 1
      ctx.stroke()

      // Equator line
      ctx.beginPath()
      ctx.ellipse(cx, cy, R, R * 0.15, 0, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(0,255,136,0.05)'
      ctx.lineWidth = 0.5
      ctx.stroke()

      // Latitude lines
      for (let lat = -60; lat <= 60; lat += 30) {
        const phi = (90 - lat) * Math.PI / 180
        const yr = cy + R * Math.cos(phi)
        const xr = R * Math.sin(phi)
        ctx.beginPath()
        ctx.ellipse(cx, yr, xr, xr * 0.15, 0, 0, Math.PI * 2)
        ctx.strokeStyle = 'rgba(0,255,136,0.04)'
        ctx.lineWidth = 0.5
        ctx.stroke()
      }

      // Grid lines (longitude)
      for (let lon = 0; lon < 360; lon += 30) {
        const theta = (lon * Math.PI / 180) + rotRef.current
        ctx.beginPath()
        ctx.ellipse(cx, cy, R * Math.abs(Math.cos(theta)), R, Math.PI / 2, 0, Math.PI * 2)
        ctx.strokeStyle = 'rgba(0,255,136,0.03)'
        ctx.lineWidth = 0.5
        ctx.stroke()
      }

      // Nodes
      const visibleNodes: Array<{ p: ReturnType<typeof project>; n: GlobeNode }> = []
      NODES.forEach((n) => {
        const p = project(n.lat, n.lon, cx, cy, R, rotRef.current)
        if (p.z > 0) visibleNodes.push({ p, n })
      })

      // Draw connections between active nodes
      visibleNodes.forEach(({ p: p1, n: n1 }) => {
        if (!n1.active) return
        visibleNodes.forEach(({ p: p2, n: n2 }) => {
          if (!n2.active || n1 === n2) return
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y)
          if (dist < R * 0.9) {
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = 'rgba(0,255,136,0.06)'
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })

      // Draw nodes
      visibleNodes.forEach(({ p, n }) => {
        const alpha = Math.min(1, p.z / R)
        const color = n.active ? `rgba(0,255,136,${alpha})` : `rgba(0,150,80,${alpha * 0.4})`
        
        ctx.beginPath()
        ctx.arc(p.x, p.y, n.active ? 3 : 2, 0, Math.PI * 2)
        ctx.fillStyle = color
        ctx.shadowBlur = n.active ? 8 : 3
        ctx.shadowColor = '#00ff88'
        ctx.fill()
        ctx.shadowBlur = 0

        // Label
        if (n.active && p.z > R * 0.3) {
          ctx.fillStyle = `rgba(0,255,136,${alpha * 0.6})`
          ctx.font = '8px Share Tech Mono'
          ctx.fillText(n.label, p.x + 4, p.y - 4)
        }

        // Pulse ring for active
        if (n.active) {
          const pulse = (Date.now() % 2000) / 2000
          ctx.beginPath()
          ctx.arc(p.x, p.y, 3 + pulse * 8, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(0,255,136,${(1 - pulse) * alpha * 0.4})`
          ctx.lineWidth = 0.5
          ctx.stroke()
        }
      })

      rotRef.current += 0.003
    }

    frameRef.current = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(frameRef.current)
  }, [])

  return (
    <Panel
      title="Global AI Network"
      icon={<Globe size={12} />}
      badge="247 NODES"
      accent="cyan"
    >
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: 160, display: 'block' }}
        width={400}
        height={160}
      />
      <div style={{ marginTop: 6, display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: 'Share Tech Mono', fontSize: 9, color: 'rgba(0,255,136,0.4)', letterSpacing: 1 }}>
          {NODES.filter(n => n.active).length} ACTIVE · {NODES.filter(n => !n.active).length} OFFLINE
        </span>
        <span style={{ fontFamily: 'JetBrains Mono', fontSize: 9, color: '#00ffff' }}>↻ LIVE</span>
      </div>
    </Panel>
  )
})

export default NodeMap
