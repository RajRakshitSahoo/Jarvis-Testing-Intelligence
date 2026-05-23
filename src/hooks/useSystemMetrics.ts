import { useEffect, useRef } from 'react'
import { useStore } from '../store/useStore'

const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v))
const rand = (min: number, max: number) => Math.random() * (max - min) + min

export function useSystemMetrics() {
  const updateMetrics = useStore((s) => s.updateMetrics)
  const isThinking = useStore((s) => s.isThinking)
  const targetsRef = useRef({ cpu: 23, gpu: 18, ram: 42, temp: 45, fps: 60, network: 8, aiLoad: 12, neuralEff: 97 })
  const currentRef = useRef({ cpu: 23, gpu: 18, ram: 42, temp: 45, fps: 60, network: 8, aiLoad: 12, neuralEff: 97 })
  const frameRef = useRef<number>(0)
  const lastUpdateRef = useRef(0)

  useEffect(() => {
    // Update targets every 3 seconds
    const targetInterval = setInterval(() => {
      const t = targetsRef.current
      const thinking = isThinking
      t.cpu = clamp(t.cpu + rand(-8, 8) + (thinking ? 15 : 0), 5, 95)
      t.gpu = clamp(t.gpu + rand(-5, 5) + (thinking ? 20 : 0), 3, 90)
      t.ram = clamp(t.ram + rand(-3, 3), 30, 80)
      t.temp = clamp(t.temp + rand(-2, 2) + (thinking ? 3 : 0), 40, 85)
      t.fps = thinking ? clamp(t.fps + rand(-5, 0), 45, 60) : 60
      t.network = clamp(t.network + rand(-15, 20), 1, 100)
      t.aiLoad = clamp(t.aiLoad + rand(-5, 5) + (thinking ? 30 : 0), 5, 99)
      t.neuralEff = clamp(t.neuralEff + rand(-2, 2), 85, 99)
    }, 3000)

    // Smooth animation loop
    const animate = (now: number) => {
      frameRef.current = requestAnimationFrame(animate)
      if (now - lastUpdateRef.current < 100) return // 10fps for metrics
      lastUpdateRef.current = now

      const c = currentRef.current
      const t = targetsRef.current
      c.cpu = lerp(c.cpu, t.cpu, 0.1)
      c.gpu = lerp(c.gpu, t.gpu, 0.1)
      c.ram = lerp(c.ram, t.ram, 0.05)
      c.temp = lerp(c.temp, t.temp, 0.05)
      c.fps = lerp(c.fps, t.fps, 0.1)
      c.network = lerp(c.network, t.network, 0.15)
      c.aiLoad = lerp(c.aiLoad, t.aiLoad, 0.12)
      c.neuralEff = lerp(c.neuralEff, t.neuralEff, 0.05)

      updateMetrics({
        cpu: Math.round(c.cpu),
        gpu: Math.round(c.gpu),
        ram: Math.round(c.ram),
        temp: Math.round(c.temp),
        fps: Math.round(c.fps),
        network: Math.round(c.network),
        aiLoad: Math.round(c.aiLoad),
        neuralEff: Math.round(c.neuralEff),
      })
    }

    frameRef.current = requestAnimationFrame(animate)
    return () => {
      clearInterval(targetInterval)
      cancelAnimationFrame(frameRef.current)
    }
  }, [updateMetrics, isThinking])
}
