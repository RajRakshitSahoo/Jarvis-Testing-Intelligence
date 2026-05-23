import { memo, useEffect } from 'react'
import { motion } from 'framer-motion'
import TopBar from '../UI/TopBar'
import ChatPanel from '../Chat/ChatPanel'
import SystemMonitor from '../Monitor/SystemMonitor'
import TerminalPanel from '../Terminal/TerminalPanel'
import NeuralViz from '../Neural/NeuralViz'
import ThreatDetection from './ThreatDetection'
import ActivityFeed from './ActivityFeed'
import NodeMap from './NodeMap'
import AIMemory from './AIMemory'
import QuantumViz from './QuantumViz'
import NotificationCenter from '../UI/NotificationCenter'
import { useSystemMetrics } from '../../hooks/useSystemMetrics'
import { useNotifications } from '../../hooks/useNotifications'
import { useStore } from '../../store/useStore'

const Dashboard = memo(function Dashboard() {
  useSystemMetrics()
  useNotifications()
  const addActivity = useStore((s) => s.addActivity)

  useEffect(() => {
    addActivity(`[${new Date().toLocaleTimeString()}] JARVIS OS v9.1.0 — Dashboard initialized`)
    addActivity(`[${new Date().toLocaleTimeString()}] All systems nominal — 247 nodes online`)
    addActivity(`[${new Date().toLocaleTimeString()}] Neural network integrity: 99.94%`)
  }, [])

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        background: '#050505',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Background grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(0,255,136,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,136,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Ambient glow orbs */}
      <div style={{ position: 'absolute', top: '20%', left: '10%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,255,136,0.025) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: '20%', right: '10%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,150,255,0.02) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

      {/* Top bar */}
      <TopBar />

      {/* Main content */}
      <div
        style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: '260px 1fr 260px',
          gridTemplateRows: '1fr 1fr',
          gap: 6,
          padding: 6,
          overflow: 'hidden',
          position: 'relative',
          zIndex: 1,
          minHeight: 0,
        }}
      >
        {/* LEFT COLUMN */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minHeight: 0, gridRow: '1 / 3' }}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ flexShrink: 0 }}
          >
            <SystemMonitor />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ flex: 1, minHeight: 0 }}
          >
            <ThreatDetection />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{ flexShrink: 0 }}
          >
            <AIMemory />
          </motion.div>
        </div>

        {/* CENTER COLUMN - TOP */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}
        >
          <ChatPanel />
        </motion.div>

        {/* CENTER COLUMN - BOTTOM */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ display: 'flex', flexDirection: 'column', gap: 6, minHeight: 0 }}
        >
          <div style={{ flex: 1 }}>
            <TerminalPanel />
          </div>
          <QuantumViz />
        </motion.div>

        {/* RIGHT COLUMN */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minHeight: 0, gridRow: '1 / 3' }}>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <NeuralViz />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <NodeMap />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            style={{ flex: 1, minHeight: 0 }}
          >
            <ActivityFeed />
          </motion.div>
        </div>
      </div>

      {/* Notifications */}
      <NotificationCenter />

      {/* Bottom status bar */}
      <div
        style={{
          height: 22,
          background: 'rgba(0,8,4,0.95)',
          borderTop: '1px solid rgba(0,255,136,0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 16px',
          flexShrink: 0,
          zIndex: 10,
        }}
      >
        <div style={{ display: 'flex', gap: 16 }}>
          {['AI CORE: ONLINE', 'QUANTUM: SYNCED', 'FIREWALL: ACTIVE', 'UPLINK: 2.4Gbps'].map((s) => (
            <span key={s} style={{ fontFamily: 'Share Tech Mono', fontSize: 8, color: 'rgba(0,255,136,0.35)', letterSpacing: 1 }}>{s}</span>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 16 }}>
          <span style={{ fontFamily: 'Share Tech Mono', fontSize: 8, color: 'rgba(0,255,136,0.25)', letterSpacing: 1 }}>
            AES-256 ENCRYPTED
          </span>
          <span style={{ fontFamily: 'Share Tech Mono', fontSize: 8, color: 'rgba(0,255,136,0.25)', letterSpacing: 1 }}>
            JARVIS AI SYSTEMS © 2025
          </span>
        </div>
      </div>
    </div>
  )
})

export default Dashboard
