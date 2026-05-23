import { useState, useEffect, memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, ShieldAlert, ShieldCheck, AlertTriangle } from 'lucide-react'
import { useStore } from '../../store/useStore'
import Panel from '../UI/Panel'

const THREATS = [
  { id: 't1', type: 'BLOCKED', source: '185.220.101.47', target: 'CORE-01', severity: 'high', protocol: 'SSH', info: 'Brute force attack blocked' },
  { id: 't2', type: 'MONITORED', source: '10.0.0.99', target: 'NET-GATE', severity: 'medium', protocol: 'HTTP', info: 'Unusual traffic pattern' },
  { id: 't3', type: 'RESOLVED', source: '172.16.0.23', target: 'CACHE', severity: 'low', protocol: 'DNS', info: 'DNS query anomaly' },
  { id: 't4', type: 'ACTIVE', source: '91.108.4.224', target: 'API-LAYER', severity: 'high', protocol: 'TLS', info: 'Cipher downgrade attempt' },
]

const severityColors = {
  high: '#ff3333',
  medium: '#ffaa00',
  low: '#00ffff',
}

const typeColors = {
  BLOCKED: '#00ff88',
  MONITORED: '#ffaa00',
  RESOLVED: 'rgba(0,255,136,0.4)',
  ACTIVE: '#ff3333',
}

const ThreatDetection = memo(function ThreatDetection() {
  const threatLevel = useStore((s) => s.threatLevel)
  const setThreatLevel = useStore((s) => s.setThreatLevel)
  const [scanProgress, setScanProgress] = useState(0)
  const [scanning, setScanning] = useState(false)

  // Periodic level changes
  useEffect(() => {
    const interval = setInterval(() => {
      const rand = Math.random()
      if (rand > 0.85) setThreatLevel('high')
      else if (rand > 0.5) setThreatLevel('medium')
      else setThreatLevel('low')
    }, 15000)
    return () => clearInterval(interval)
  }, [setThreatLevel])

  // Scan animation
  useEffect(() => {
    const scan = () => {
      setScanning(true)
      setScanProgress(0)
      let p = 0
      const interval = setInterval(() => {
        p += 2 + Math.random() * 5
        if (p >= 100) { p = 100; clearInterval(interval); setTimeout(() => setScanning(false), 500) }
        setScanProgress(p)
      }, 80)
    }
    const t = setTimeout(scan, 2000)
    const interval = setInterval(scan, 30000)
    return () => { clearTimeout(t); clearInterval(interval) }
  }, [])

  const levelColor = threatLevel === 'high' ? '#ff3333' : threatLevel === 'medium' ? '#ffaa00' : '#00ff88'
  const LevelIcon = threatLevel === 'high' ? ShieldAlert : threatLevel === 'medium' ? AlertTriangle : ShieldCheck

  return (
    <Panel
      title="Threat Detection"
      icon={<Shield size={12} />}
      badge={threatLevel.toUpperCase()}
      badgeColor={levelColor}
      accent={threatLevel === 'high' ? 'red' : threatLevel === 'medium' ? 'yellow' : 'green'}
    >
      {/* Status */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <LevelIcon size={24} color={levelColor} style={{ filter: `drop-shadow(0 0 6px ${levelColor})` }} />
        </motion.div>
        <div>
          <div style={{ fontFamily: 'Orbitron', fontSize: 12, fontWeight: 700, color: levelColor, textShadow: `0 0 8px ${levelColor}` }}>
            THREAT LEVEL: {threatLevel.toUpperCase()}
          </div>
          <div style={{ fontFamily: 'Share Tech Mono', fontSize: 9, color: 'rgba(0,255,136,0.4)', letterSpacing: 1, marginTop: 2 }}>
            {scanning ? 'SCANNING IN PROGRESS...' : 'PERIMETER SECURE'}
          </div>
        </div>
      </div>

      {/* Scan bar */}
      {scanning && (
        <div style={{ marginBottom: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
            <span style={{ fontFamily: 'Share Tech Mono', fontSize: 8, color: '#00ffff', letterSpacing: 1 }}>NETWORK SCAN</span>
            <span style={{ fontFamily: 'JetBrains Mono', fontSize: 8, color: '#00ffff' }}>{Math.round(scanProgress)}%</span>
          </div>
          <div style={{ height: 2, background: 'rgba(0,255,255,0.1)', borderRadius: 1 }}>
            <motion.div
              style={{ height: '100%', background: '#00ffff', boxShadow: '0 0 6px #00ffff', borderRadius: 1 }}
              animate={{ width: `${scanProgress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
        </div>
      )}

      {/* Threats list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {THREATS.map((t) => (
          <div
            key={t.id}
            style={{
              background: 'rgba(0,0,0,0.3)',
              border: `1px solid ${severityColors[t.severity as keyof typeof severityColors]}22`,
              borderLeft: `2px solid ${severityColors[t.severity as keyof typeof severityColors]}`,
              borderRadius: 2,
              padding: '5px 8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 6,
            }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: 'JetBrains Mono', fontSize: 9, color: 'rgba(200,220,210,0.7)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {t.source} → {t.target}
              </div>
              <div style={{ fontFamily: 'Share Tech Mono', fontSize: 8, color: 'rgba(0,255,136,0.35)', letterSpacing: 0.5, marginTop: 1 }}>
                {t.info}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 }}>
              <span style={{ fontFamily: 'Share Tech Mono', fontSize: 8, color: typeColors[t.type as keyof typeof typeColors], letterSpacing: 1 }}>
                {t.type}
              </span>
              <span style={{ fontFamily: 'JetBrains Mono', fontSize: 8, color: 'rgba(0,255,136,0.3)' }}>
                {t.protocol}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Panel>
  )
})

export default ThreatDetection
