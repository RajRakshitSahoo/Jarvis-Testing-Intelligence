import { memo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, Info, CheckCircle, XCircle, X } from 'lucide-react'
import { useStore } from '../../store/useStore'
import { useSound } from '../../hooks/useSound'

const icons = {
  info: Info,
  warning: AlertTriangle,
  danger: XCircle,
  success: CheckCircle,
}

const colors = {
  info: { border: 'rgba(0,255,255,0.5)', bg: 'rgba(0,30,30,0.9)', text: '#00ffff', glow: '0 0 15px rgba(0,255,255,0.2)' },
  warning: { border: 'rgba(255,170,0,0.5)', bg: 'rgba(30,20,0,0.9)', text: '#ffaa00', glow: '0 0 15px rgba(255,170,0,0.2)' },
  danger: { border: 'rgba(255,51,51,0.5)', bg: 'rgba(30,0,0,0.9)', text: '#ff3333', glow: '0 0 15px rgba(255,51,51,0.2)' },
  success: { border: 'rgba(0,255,136,0.5)', bg: 'rgba(0,20,10,0.9)', text: '#00ff88', glow: '0 0 15px rgba(0,255,136,0.2)' },
}

const NotificationCenter = memo(function NotificationCenter() {
  const notifications = useStore((s) => s.notifications)
  const removeNotification = useStore((s) => s.removeNotification)
  const { playNotification } = useSound()

  useEffect(() => {
    if (notifications.length > 0) {
      playNotification(notifications[0].type)
    }
  }, [notifications.length])

  return (
    <div style={{ position: 'fixed', top: 80, right: 20, zIndex: 9000, display: 'flex', flexDirection: 'column', gap: 8, width: 300 }}>
      <AnimatePresence>
        {notifications.map((n) => {
          const Icon = icons[n.type]
          const c = colors[n.type]
          return (
            <motion.div
              key={n.id}
              initial={{ x: 320, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 320, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              style={{
                background: c.bg,
                border: `1px solid ${c.border}`,
                borderRadius: 4,
                padding: '10px 12px',
                backdropFilter: 'blur(12px)',
                boxShadow: c.glow,
                cursor: 'pointer',
              }}
              onClick={() => removeNotification(n.id)}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                <Icon size={14} color={c.text} style={{ flexShrink: 0, marginTop: 2 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: 'Share Tech Mono', fontSize: 10, letterSpacing: 2, color: c.text, textTransform: 'uppercase', marginBottom: 2 }}>
                    {n.title}
                  </div>
                  <div style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: 'rgba(200,220,210,0.7)', lineHeight: 1.4 }}>
                    {n.message}
                  </div>
                </div>
                <X size={10} color={c.text} style={{ flexShrink: 0, opacity: 0.6 }} />
              </div>
              {/* Progress bar */}
              <motion.div
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: 5, ease: 'linear' }}
                style={{ height: 1, background: c.text, marginTop: 8, opacity: 0.4, borderRadius: 1 }}
              />
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
})

export default NotificationCenter
