import { useEffect, useRef, memo } from 'react'

const MouseGlow = memo(function MouseGlow() {
  const glowRef = useRef<HTMLDivElement>(null)
  const posRef = useRef({ x: -300, y: -300 })
  const currentRef = useRef({ x: -300, y: -300 })
  const frameRef = useRef<number>(0)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', onMove, { passive: true })

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate)
      const el = glowRef.current
      if (!el) return
      // Smooth follow
      currentRef.current.x += (posRef.current.x - currentRef.current.x) * 0.1
      currentRef.current.y += (posRef.current.y - currentRef.current.y) * 0.1
      el.style.transform = `translate(${currentRef.current.x - 200}px, ${currentRef.current.y - 200}px)`
    }
    frameRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(frameRef.current)
    }
  }, [])

  return (
    <div
      ref={glowRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 400,
        height: 400,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,255,136,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 1,
        willChange: 'transform',
      }}
    />
  )
})

export default MouseGlow
