import { create } from 'zustand'

export type AppPhase = 'boot' | 'dashboard'

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
  thinking?: boolean
}

export interface SystemMetrics {
  cpu: number
  gpu: number
  ram: number
  temp: number
  fps: number
  network: number
  aiLoad: number
  neuralEff: number
}

export interface Notification {
  id: string
  type: 'info' | 'warning' | 'danger' | 'success'
  title: string
  message: string
  time: number
}

export interface AppState {
  phase: AppPhase
  setPhase: (phase: AppPhase) => void

  chatMessages: ChatMessage[]
  addMessage: (msg: ChatMessage) => void
  clearMessages: () => void
  isThinking: boolean
  setIsThinking: (v: boolean) => void
  thinkingStage: string
  setThinkingStage: (s: string) => void

  metrics: SystemMetrics
  updateMetrics: (m: Partial<SystemMetrics>) => void

  notifications: Notification[]
  addNotification: (n: Notification) => void
  removeNotification: (id: string) => void

  activePanel: string | null
  setActivePanel: (panel: string | null) => void

  isMuted: boolean
  toggleMute: () => void

  terminalOpen: boolean
  setTerminalOpen: (v: boolean) => void

  threatLevel: 'low' | 'medium' | 'high'
  setThreatLevel: (level: 'low' | 'medium' | 'high') => void

  activityLog: string[]
  addActivity: (entry: string) => void
}

export const useStore = create<AppState>((set) => ({
  phase: 'boot',
  setPhase: (phase) => set({ phase }),

  chatMessages: [],
  addMessage: (msg) => set((s) => ({ chatMessages: [...s.chatMessages, msg] })),
  clearMessages: () => set({ chatMessages: [] }),
  isThinking: false,
  setIsThinking: (v) => set({ isThinking: v }),
  thinkingStage: '',
  setThinkingStage: (s) => set({ thinkingStage: s }),

  metrics: {
    cpu: 23,
    gpu: 18,
    ram: 42,
    temp: 45,
    fps: 60,
    network: 8,
    aiLoad: 12,
    neuralEff: 97,
  },
  updateMetrics: (m) => set((s) => ({ metrics: { ...s.metrics, ...m } })),

  notifications: [],
  addNotification: (n) => set((s) => ({ notifications: [n, ...s.notifications].slice(0, 5) })),
  removeNotification: (id) => set((s) => ({ notifications: s.notifications.filter((n) => n.id !== id) })),

  activePanel: null,
  setActivePanel: (panel) => set({ activePanel: panel }),

  isMuted: false,
  toggleMute: () => set((s) => ({ isMuted: !s.isMuted })),

  terminalOpen: false,
  setTerminalOpen: (v) => set({ terminalOpen: v }),

  threatLevel: 'low',
  setThreatLevel: (level) => set({ threatLevel: level }),

  activityLog: [],
  addActivity: (entry) => set((s) => ({ activityLog: [entry, ...s.activityLog].slice(0, 100) })),
}))
