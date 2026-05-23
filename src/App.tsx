import { AnimatePresence, motion } from 'framer-motion'
import { useStore } from './store/useStore'
import BootSequence from './components/Boot/BootSequence'
import Dashboard from './components/Dashboard/Dashboard'
import MatrixRain from './components/Effects/MatrixRain'
import MouseGlow from './components/Effects/MouseGlow'
import ScanlineOverlay from './components/Effects/ScanlineOverlay'

export default function App() {
  const phase = useStore((s) => s.phase)

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#050505', overflow: 'hidden', position: 'relative' }}>
      <MatrixRain />
      <MouseGlow />
      <ScanlineOverlay />

      <AnimatePresence mode="wait">
        {phase === 'boot' && (
          <motion.div
            key="boot"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            style={{ position: 'absolute', inset: 0, zIndex: 1000 }}
          >
            <BootSequence />
          </motion.div>
        )}
        {phase === 'dashboard' && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, scale: 0.98, filter: 'blur(8px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{ position: 'absolute', inset: 0, zIndex: 500 }}
          >
            <Dashboard />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
