import { memo } from 'react'
import { motion } from 'framer-motion'
import { Database } from 'lucide-react'
import Panel from '../UI/Panel'

const MEMORIES = [
  { id: 'M-001', type: 'CORE', label: 'System Architecture', size: '128GB', access: '0ms', status: 'hot' },
  { id: 'M-002', type: 'NEURAL', label: 'Language Model Weights', size: '892GB', access: '3ms', status: 'hot' },
  { id: 'M-003', type: 'CACHE', label: 'Inference Cache', size: '64GB', access: '0ms', status: 'hot' },
  { id: 'M-004', type: 'ARCH', label: 'Historical Data Archive', size: '2.1TB', access: '12ms', status: 'cold' },
  { id: 'M-005', type: 'SECURE', label: 'Encrypted Vault', size: '512GB', access: '8ms', status: 'locked' },
  { id: 'M-006', type: 'EPHM', label: 'Session Memory', size: '32GB', access: '0ms', status: 'hot' },
]

const statusColors = { hot: '#00ff88', cold: '#00ffff', locked: '#ffaa00' }

const AIMemory = memo(function AIMemory() {
  const totalUsed = 74
  
  return (
    <Panel
      title="AI Memory"
      icon={<Database size={12} />}
      badge={`${totalUsed}% USED`}
    >
      {/* Memory bar */}
      <div style={{ marginBottom: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
          <span style={{ fontFamily: 'Share Tech Mono', fontSize: 8, color: 'rgba(0,255,136,0.4)', letterSpacing: 1 }}>TOTAL MEMORY USAGE</span>
          <span style={{ fontFamily: 'JetBrains Mono', fontSize: 9, color: '#00ff88' }}>3.73TB / 5TB</span>
        </div>
        <div style={{ height: 3, background: 'rgba(0,255,136,0.08)', borderRadius: 1 }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${totalUsed}%` }}
            transition={{ duration: 1, delay: 0.5 }}
            style={{ height: '100%', background: 'linear-gradient(90deg, #00cc6a, #00ff88)', boxShadow: '0 0 6px #00ff88', borderRadius: 1 }}
          />
        </div>
      </div>

      {/* Memory segments */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {MEMORIES.map((m, i) => {
          const c = statusColors[m.status as keyof typeof statusColors]
          return (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '4px 6px',
                background: 'rgba(0,0,0,0.3)',
                border: `1px solid ${c}15`,
                borderRadius: 2,
                gap: 8,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, flex: 1, minWidth: 0 }}>
                <div style={{ width: 4, height: 4, borderRadius: '50%', background: c, boxShadow: `0 0 4px ${c}`, flexShrink: 0 }} />
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontFamily: 'JetBrains Mono', fontSize: 9, color: 'rgba(200,220,210,0.7)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {m.label}
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexShrink: 0 }}>
                <span style={{ fontFamily: 'JetBrains Mono', fontSize: 8, color: 'rgba(0,255,136,0.4)' }}>{m.size}</span>
                <span style={{ fontFamily: 'Share Tech Mono', fontSize: 7, color: c, letterSpacing: 1, background: `${c}15`, padding: '1px 4px', borderRadius: 1 }}>
                  {m.status.toUpperCase()}
                </span>
              </div>
            </motion.div>
          )
        })}
      </div>
    </Panel>
  )
})

export default AIMemory
