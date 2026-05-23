import { ReactNode, memo } from 'react'
import { motion } from 'framer-motion'

interface PanelProps {
  title: string
  icon?: ReactNode
  children: ReactNode
  className?: string
  style?: React.CSSProperties
  badge?: string
  badgeColor?: string
  headerRight?: ReactNode
  accent?: 'green' | 'cyan' | 'red' | 'yellow'
}

const accentColors = {
  green: { border: 'rgba(0,255,136,0.25)', borderHover: 'rgba(0,255,136,0.45)', title: '#00ff88', glow: '0 0 20px rgba(0,255,136,0.08)' },
  cyan: { border: 'rgba(0,255,255,0.2)', borderHover: 'rgba(0,255,255,0.4)', title: '#00ffff', glow: '0 0 20px rgba(0,255,255,0.08)' },
  red: { border: 'rgba(255,51,51,0.2)', borderHover: 'rgba(255,51,51,0.4)', title: '#ff3333', glow: '0 0 20px rgba(255,51,51,0.08)' },
  yellow: { border: 'rgba(255,170,0,0.2)', borderHover: 'rgba(255,170,0,0.4)', title: '#ffaa00', glow: '0 0 20px rgba(255,170,0,0.08)' },
}

const Panel = memo(function Panel({ title, icon, children, className, style, badge, badgeColor, headerRight, accent = 'green' }: PanelProps) {
  const c = accentColors[accent]

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ boxShadow: `${c.glow}, inset 0 0 30px rgba(0,255,136,0.03)` }}
      style={{
        background: 'rgba(0,12,6,0.88)',
        border: `1px solid ${c.border}`,
        borderRadius: 4,
        overflow: 'hidden',
        backdropFilter: 'blur(10px)',
        boxShadow: `${c.glow}, inset 0 0 20px rgba(0,0,0,0.3)`,
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
        position: 'relative',
        ...style,
      }}
      className={className}
    >
      {/* Corner accents */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: 10, height: 1, background: c.title, opacity: 0.8 }} />
      <div style={{ position: 'absolute', top: 0, left: 0, width: 1, height: 10, background: c.title, opacity: 0.8 }} />
      <div style={{ position: 'absolute', top: 0, right: 0, width: 10, height: 1, background: c.title, opacity: 0.8 }} />
      <div style={{ position: 'absolute', top: 0, right: 0, width: 1, height: 10, background: c.title, opacity: 0.8 }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: 10, height: 1, background: c.title, opacity: 0.4 }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: 1, height: 10, background: c.title, opacity: 0.4 }} />
      <div style={{ position: 'absolute', bottom: 0, right: 0, width: 10, height: 1, background: c.title, opacity: 0.4 }} />
      <div style={{ position: 'absolute', bottom: 0, right: 0, width: 1, height: 10, background: c.title, opacity: 0.4 }} />

      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 12px',
          borderBottom: `1px solid rgba(0,255,136,0.08)`,
          background: 'rgba(0,255,136,0.02)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {icon && <span style={{ color: c.title, display: 'flex', opacity: 0.9 }}>{icon}</span>}
          <span
            style={{
              fontFamily: 'Share Tech Mono, monospace',
              fontSize: 10,
              letterSpacing: 3,
              textTransform: 'uppercase',
              color: c.title,
              textShadow: `0 0 6px ${c.title}`,
            }}
          >
            {title}
          </span>
          {badge && (
            <span
              style={{
                fontFamily: 'JetBrains Mono',
                fontSize: 9,
                padding: '1px 6px',
                borderRadius: 2,
                background: `${badgeColor || c.title}22`,
                border: `1px solid ${badgeColor || c.title}44`,
                color: badgeColor || c.title,
                letterSpacing: 1,
              }}
            >
              {badge}
            </span>
          )}
        </div>
        {headerRight}
      </div>

      {/* Content */}
      <div style={{ padding: 12 }}>{children}</div>
    </motion.div>
  )
})

export default Panel
