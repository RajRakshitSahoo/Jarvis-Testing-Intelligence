import { useRef, useCallback } from 'react'
import { useStore } from '../store/useStore'

function createBeep(ctx: AudioContext, freq: number, duration: number, vol = 0.1, type: OscillatorType = 'square') {
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.frequency.setValueAtTime(freq, ctx.currentTime)
  osc.type = type
  gain.gain.setValueAtTime(vol, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)
  osc.start(ctx.currentTime)
  osc.stop(ctx.currentTime + duration)
}

export function useSound() {
  const isMuted = useStore((s) => s.isMuted)
  const ctxRef = useRef<AudioContext | null>(null)

  const getCtx = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
    return ctxRef.current
  }, [])

  const playClick = useCallback(() => {
    if (isMuted) return
    try {
      const ctx = getCtx()
      createBeep(ctx, 800, 0.05, 0.08, 'square')
    } catch {}
  }, [isMuted, getCtx])

  const playTyping = useCallback(() => {
    if (isMuted) return
    try {
      const ctx = getCtx()
      createBeep(ctx, 400 + Math.random() * 200, 0.04, 0.03, 'square')
    } catch {}
  }, [isMuted, getCtx])

  const playNotification = useCallback((type: 'info' | 'warning' | 'danger' | 'success') => {
    if (isMuted) return
    try {
      const ctx = getCtx()
      const freqs = { info: [600, 800], warning: [400, 300], danger: [200, 150], success: [600, 900] }
      const [f1, f2] = freqs[type]
      createBeep(ctx, f1, 0.1, 0.08, 'sine')
      setTimeout(() => createBeep(ctx, f2, 0.1, 0.08, 'sine'), 120)
    } catch {}
  }, [isMuted, getCtx])

  const playBoot = useCallback((step: number) => {
    if (isMuted) return
    try {
      const ctx = getCtx()
      const freqs = [100, 200, 300, 400, 600, 800, 1000, 1200]
      const f = freqs[step % freqs.length]
      createBeep(ctx, f, 0.15, 0.06, 'sawtooth')
    } catch {}
  }, [isMuted, getCtx])

  const playActivate = useCallback(() => {
    if (isMuted) return
    try {
      const ctx = getCtx()
      ;[200, 400, 600, 800, 1000, 1200].forEach((f, i) => {
        setTimeout(() => createBeep(ctx, f, 0.2, 0.05, 'sine'), i * 80)
      })
    } catch {}
  }, [isMuted, getCtx])

  return { playClick, playTyping, playNotification, playBoot, playActivate }
}
