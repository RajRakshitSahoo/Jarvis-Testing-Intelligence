import { memo } from 'react'
import { Activity, Cpu, HardDrive, Thermometer, Wifi, Zap, Brain, BarChart2 } from 'lucide-react'
import { useStore } from '../../store/useStore'
import Panel from '../UI/Panel'

interface MetricRowProps {
  label: string
  value: number
  unit?: string
  icon: React.ReactNode
  max?: number
  color?: string
  invert?: boolean
}

const MetricRow = memo(function MetricRow({ label, value, unit = '%', icon, max = 100, color, invert = false }: MetricRowProps) {
  const pct = Math.min((value / max) * 100, 100)
  const c = color || (
    invert
      ? pct < 50 ? '#ff3333' : pct < 70 ? '#ffaa00' : '#00ff88'
      : pct > 80 ? '#ff3333' : pct > 60 ? '#ffaa00' : '#00ff88'
  )

  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ color: c, opacity: 0.8 }}>{icon}</span>
          <span style={{ fontFamily: 'Share Tech Mono', fontSize: 9, letterSpacing: 2, color: 'rgba(0,255,136,0.5)', textTransform: 'uppercase' }}>
            {label}
          </span>
        </div>
        <span style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: c, textShadow: `0 0 5px ${c}` }}>
          {value}{unit}
        </span>
      </div>
      <div style={{ height: 2, background: 'rgba(0,255,136,0.08)', borderRadius: 1, overflow: 'hidden' }}>
        <div
          style={{
            height: '100%',
            width: `${pct}%`,
            background: `linear-gradient(90deg, ${c}88, ${c})`,
            boxShadow: `0 0 6px ${c}`,
            borderRadius: 1,
            transition: 'width 0.5s ease, background 0.5s ease',
          }}
        />
      </div>
    </div>
  )
})

const SystemMonitor = memo(function SystemMonitor() {
  const metrics = useStore((s) => s.metrics)

  const statusDot = (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#00ff88', boxShadow: '0 0 5px #00ff88', animation: 'blink 2s ease-in-out infinite' }} />
      <span style={{ fontFamily: 'Share Tech Mono', fontSize: 9, color: 'rgba(0,255,136,0.4)', letterSpacing: 1 }}>LIVE</span>
    </div>
  )

  return (
    <Panel
      title="System Monitor"
      icon={<Activity size={12} />}
      badge="NOMINAL"
      headerRight={statusDot}
    >
      <MetricRow label="CPU Usage" value={metrics.cpu} icon={<Cpu size={10} />} />
      <MetricRow label="GPU Usage" value={metrics.gpu} icon={<Zap size={10} />} />
      <MetricRow label="RAM" value={metrics.ram} icon={<HardDrive size={10} />} />
      <MetricRow label="Temperature" value={metrics.temp} unit="°C" icon={<Thermometer size={10} />} max={100} />
      <MetricRow label="Network" value={metrics.network} unit=" Mb/s" icon={<Wifi size={10} />} max={100} color="#00ffff" />
      <MetricRow label="AI Core" value={metrics.aiLoad} icon={<Brain size={10} />} color="#aa88ff" />
      <MetricRow label="Neural Eff." value={metrics.neuralEff} icon={<BarChart2 size={10} />} max={100} invert />

      {/* FPS indicator */}
      <div style={{ marginTop: 8, paddingTop: 8, borderTop: '1px solid rgba(0,255,136,0.06)', display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: 'Share Tech Mono', fontSize: 9, color: 'rgba(0,255,136,0.4)', letterSpacing: 2 }}>FRAME RATE</span>
        <span style={{
          fontFamily: 'Orbitron',
          fontSize: 14,
          fontWeight: 700,
          color: metrics.fps >= 55 ? '#00ff88' : metrics.fps >= 30 ? '#ffaa00' : '#ff3333',
          textShadow: `0 0 8px currentColor`,
        }}>
          {metrics.fps} <span style={{ fontSize: 9, opacity: 0.6 }}>FPS</span>
        </span>
      </div>
    </Panel>
  )
})

export default SystemMonitor
