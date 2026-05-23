import { useEffect } from 'react'
import { useStore } from '../store/useStore'

const NOTIFICATIONS = [
  { type: 'info' as const, title: 'NEURAL SYNC', message: 'AI core synchronization complete. All nodes active.' },
  { type: 'warning' as const, title: 'ANOMALY DETECTED', message: 'Unusual data pattern in sector 7-G. Monitoring...' },
  { type: 'success' as const, title: 'SCAN COMPLETE', message: 'Network perimeter scan: 0 threats detected.' },
  { type: 'info' as const, title: 'DATA STREAM', message: 'Encrypted packet transmission received from Node 12.' },
  { type: 'warning' as const, title: 'MEMORY ALERT', message: 'Neural archive approaching 87% capacity.' },
  { type: 'info' as const, title: 'QUANTUM SYNC', message: 'Quantum processor aligned. Efficiency at 99.7%.' },
  { type: 'danger' as const, title: 'INTRUSION ATTEMPT', message: 'Blocked unauthorized access from 192.168.x.x.' },
  { type: 'success' as const, title: 'AI UPDATE', message: 'Neural weights updated. New accuracy: 99.94%.' },
  { type: 'info' as const, title: 'SATELLITE LINK', message: 'Uplink established. Bandwidth: 2.4 Gbps.' },
  { type: 'warning' as const, title: 'THERMAL WARNING', message: 'GPU temperature elevated. Activating cooling protocol.' },
  { type: 'success' as const, title: 'TASK COMPLETE', message: 'Background analysis finished. Report generated.' },
  { type: 'info' as const, title: 'NODE ONLINE', message: 'Remote AI node #47 reconnected to mesh network.' },
]

let notifId = 0

export function useNotifications() {
  const addNotification = useStore((s) => s.addNotification)
  const removeNotification = useStore((s) => s.removeNotification)
  const addActivity = useStore((s) => s.addActivity)

  useEffect(() => {
    const push = () => {
      const n = NOTIFICATIONS[Math.floor(Math.random() * NOTIFICATIONS.length)]
      const id = `notif-${notifId++}`
      addNotification({ ...n, id, time: Date.now() })
      addActivity(`[${new Date().toLocaleTimeString()}] ${n.title}: ${n.message}`)
      setTimeout(() => removeNotification(id), 5000)
    }

    // Initial notification after 3s
    const init = setTimeout(push, 3000)
    // Then every 8-15s
    const interval = setInterval(() => {
      if (Math.random() > 0.3) push()
    }, 10000)

    return () => {
      clearTimeout(init)
      clearInterval(interval)
    }
  }, [addNotification, removeNotification, addActivity])
}
