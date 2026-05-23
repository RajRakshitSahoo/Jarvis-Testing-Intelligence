import { memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Activity } from 'lucide-react'
import { useStore } from '../../store/useStore'
import Panel from '../UI/Panel'

const ActivityFeed = memo(function ActivityFeed() {
  const log = useStore((s) => s.activityLog)

  return (
    <Panel
      title="Activity Log"
      icon={<Activity size={12} />}
      badge={`${log.length} EVENTS`}
    >
      <div
        style={{
          height: 160,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(0,255,136,0.15) transparent',
        }}
      >
        {log.length === 0 && (
          <div style={{ fontFamily: 'Share Tech Mono', fontSize: 9, color: 'rgba(0,255,136,0.25)', textAlign: 'center', marginTop: 40, letterSpacing: 2 }}>
            NO ACTIVITY YET
          </div>
        )}
        <AnimatePresence>
          {log.slice(0, 30).map((entry, i) => (
            <motion.div
              key={`${entry}-${i}`}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              style={{
                fontFamily: 'JetBrains Mono',
                fontSize: 9,
                color: i === 0 ? 'rgba(0,255,136,0.8)' : `rgba(0,255,136,${Math.max(0.2, 0.6 - i * 0.02)})`,
                padding: '2px 4px',
                borderLeft: i === 0 ? '1px solid rgba(0,255,136,0.4)' : '1px solid rgba(0,255,136,0.06)',
                lineHeight: 1.5,
              }}
            >
              {i === 0 && <span style={{ color: '#00ffff', marginRight: 4 }}>›</span>}
              {entry}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </Panel>
  )
})

export default ActivityFeed
