import { memo } from 'react'

const ScanlineOverlay = memo(function ScanlineOverlay() {
  return (
    <>
      {/* Scanlines */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9998,
          pointerEvents: 'none',
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)',
        }}
      />
      {/* Vignette */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9997,
          pointerEvents: 'none',
          background: 'radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.4) 100%)',
        }}
      />
      {/* Corner decorations */}
      <CornerDeco pos="tl" />
      <CornerDeco pos="tr" />
      <CornerDeco pos="bl" />
      <CornerDeco pos="br" />
    </>
  )
})

function CornerDeco({ pos }: { pos: 'tl' | 'tr' | 'bl' | 'br' }) {
  const style: React.CSSProperties = {
    position: 'fixed',
    width: 40,
    height: 40,
    zIndex: 9999,
    pointerEvents: 'none',
    ...(pos === 'tl' ? { top: 16, left: 16 } : {}),
    ...(pos === 'tr' ? { top: 16, right: 16 } : {}),
    ...(pos === 'bl' ? { bottom: 16, left: 16 } : {}),
    ...(pos === 'br' ? { bottom: 16, right: 16 } : {}),
  }

  const neon = '#00ff88'
  const borders: React.CSSProperties = {
    borderTop: pos.startsWith('t') ? `1px solid ${neon}` : 'none',
    borderBottom: pos.startsWith('b') ? `1px solid ${neon}` : 'none',
    borderLeft: pos.endsWith('l') ? `1px solid ${neon}` : 'none',
    borderRight: pos.endsWith('r') ? `1px solid ${neon}` : 'none',
    boxShadow: `0 0 8px rgba(0,255,136,0.3)`,
  }

  return <div style={{ ...style, ...borders }} />
}

export default ScanlineOverlay
