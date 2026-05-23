import { useState, useRef, useCallback, useEffect, memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Copy, Check, MessageSquare, Mic, MicOff, Brain } from 'lucide-react'
import { useStore } from '../../store/useStore'
import { useSound } from '../../hooks/useSound'
import Panel from '../UI/Panel'

const THINKING_STAGES = [
  'Scanning neural archives...',
  'Accessing encrypted memory banks...',
  'Building logical framework...',
  'Cross-referencing data streams...',
  'Calculating probability matrix...',
  'Synthesizing knowledge graph...',
  'Validating output integrity...',
  'Generating final response...',
]

const AI_RESPONSES: Record<string, string> = {
  default: `I am **JARVIS** — Just A Rather Very Intelligent System, version 9.1.0.

I operate across a distributed quantum neural mesh with **1.337 trillion parameters** and real-time learning capabilities. My architecture includes:

- **Neural Core**: 247 active processing layers
- **Quantum Engine**: Synchronized at 99.7% coherence
- **Memory Archive**: 1.3TB encrypted knowledge base

How can I assist you today?`,
  
  status: `**System Status Report**

\`\`\`
AI Core............. ONLINE
Threat Level........ LOW
Neural Efficiency... 99.94%
Active Nodes........ 247/247
Quantum Sync........ STABLE
Uptime.............. 99.99%
\`\`\`

All systems nominal. No anomalies detected.`,

  help: `**Available Commands & Capabilities:**

1. **System Analysis** — Deep diagnostic of all hardware and software layers
2. **Threat Detection** — Real-time monitoring and response
3. **Neural Query** — Direct access to my knowledge base
4. **Code Generation** — Multi-language AI coding assistant
5. **Data Encryption** — AES-256 file and communication security
6. **Network Ops** — Traffic analysis and routing

Ask me anything — I process at **47ms average inference speed**.`,
}

const getAIResponse = (msg: string): string => {
  const lower = msg.toLowerCase()
  if (lower.includes('status') || lower.includes('system')) return AI_RESPONSES.status
  if (lower.includes('help') || lower.includes('what can')) return AI_RESPONSES.help
  if (lower.includes('hello') || lower.includes('hi') || lower.includes('who are you')) return AI_RESPONSES.default
  
  return `Processing your request: **"${msg}"**

My analysis indicates this involves ${
    lower.includes('code') ? 'software engineering and algorithmic pattern recognition' :
    lower.includes('security') ? 'threat modeling and cryptographic analysis' :
    lower.includes('data') ? 'data processing and statistical inference' :
    'cross-domain reasoning and knowledge synthesis'
  }.

\`\`\`typescript
// Neural inference result
const confidence = 0.9947;
const processingTime = "47ms";
const responseType = "contextual_analysis";
\`\`\`

Based on my **neural pattern matching** across 1.337T parameters, the most optimal approach involves systematic decomposition followed by probabilistic synthesis. 

Is there a specific aspect you'd like me to explore deeper?`
}

const ThinkingDisplay = memo(function ThinkingDisplay({ stage }: { stage: string }) {
  return (
    <div style={{ padding: '12px 14px', background: 'rgba(0,255,136,0.03)', border: '1px solid rgba(0,255,136,0.1)', borderRadius: 4, marginBottom: 8 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <Brain size={12} color="#00ff88" />
        <span style={{ fontFamily: 'Share Tech Mono', fontSize: 9, color: '#00ff88', letterSpacing: 2 }}>NEURAL PROCESSING</span>
        <div style={{ display: 'flex', gap: 2 }}>
          {[0,1,2].map(i => (
            <motion.div
              key={i}
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
              transition={{ duration: 0.8, delay: i * 0.2, repeat: Infinity }}
              style={{ width: 4, height: 4, borderRadius: '50%', background: '#00ff88' }}
            />
          ))}
        </div>
      </div>
      <div style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: 'rgba(0,255,136,0.7)' }}>
        <motion.span
          key={stage}
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
          style={{ display: 'flex', alignItems: 'center', gap: 6 }}
        >
          <span style={{ color: '#00ff88', opacity: 0.5 }}>›</span>
          {stage}
        </motion.span>
      </div>
      {/* Waveform */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 2, marginTop: 8, height: 16 }}>
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            animate={{ height: [2, 4 + Math.random() * 12, 2] }}
            transition={{ duration: 0.4 + Math.random() * 0.4, delay: i * 0.02, repeat: Infinity }}
            style={{ width: 2, background: '#00ff88', borderRadius: 1, opacity: 0.6 }}
          />
        ))}
      </div>
    </div>
  )
})

interface MsgBubbleProps { msg: { id: string; role: 'user' | 'assistant'; content: string } }

const MsgBubble = memo(function MsgBubble({ msg }: MsgBubbleProps) {
  const [copied, setCopied] = useState(false)
  const isUser = msg.role === 'user'

  const copyText = useCallback(() => {
    navigator.clipboard.writeText(msg.content).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }, [msg.content])

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      style={{
        marginBottom: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: isUser ? 'flex-end' : 'flex-start',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6, maxWidth: '88%' }}>
        {!isUser && (
          <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(0,255,136,0.1)', border: '1px solid rgba(0,255,136,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
            <Brain size={10} color="#00ff88" />
          </div>
        )}
        <div
          style={{
            background: isUser ? 'rgba(0,255,136,0.08)' : 'rgba(0,20,10,0.6)',
            border: `1px solid ${isUser ? 'rgba(0,255,136,0.2)' : 'rgba(0,255,136,0.08)'}`,
            borderRadius: 4,
            padding: '8px 10px',
            position: 'relative',
          }}
        >
          <div
            style={{
              fontFamily: 'JetBrains Mono',
              fontSize: 11,
              color: isUser ? '#00ff88' : 'rgba(200,230,215,0.85)',
              lineHeight: 1.6,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}
            dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.content) }}
          />
          {!isUser && (
            <button
              onClick={copyText}
              style={{ position: 'absolute', top: 4, right: 4, background: 'transparent', border: 'none', cursor: 'pointer', color: 'rgba(0,255,136,0.3)', padding: 2 }}
            >
              {copied ? <Check size={10} color="#00ff88" /> : <Copy size={10} />}
            </button>
          )}
        </div>
      </div>
      <span style={{ fontFamily: 'Share Tech Mono', fontSize: 8, color: 'rgba(0,255,136,0.25)', marginTop: 2, paddingLeft: isUser ? 0 : 26, letterSpacing: 1 }}>
        {isUser ? 'USER' : 'JARVIS'} — {new Date().toLocaleTimeString()}
      </span>
    </motion.div>
  )
})

// Simple markdown to HTML
function renderMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong style="color:#00ff88;text-shadow:0 0 5px rgba(0,255,136,0.4)">$1</strong>')
    .replace(/`([^`]+)`/g, '<code style="background:rgba(0,255,136,0.1);border:1px solid rgba(0,255,136,0.2);padding:1px 4px;border-radius:2px;font-size:10px;color:#00ffff">$1</code>')
    .replace(/```[\w]*\n?([\s\S]*?)```/g, '<pre style="background:rgba(0,10,5,0.8);border:1px solid rgba(0,255,136,0.15);border-radius:4px;padding:8px;margin:6px 0;overflow-x:auto;font-size:10px;color:#00ff88">$1</pre>')
    .replace(/^- (.*)/gm, '<div style="padding-left:12px">• $1</div>')
    .replace(/\n/g, '<br/>')
}

export default function ChatPanel() {
  const messages = useStore((s) => s.chatMessages)
  const addMessage = useStore((s) => s.addMessage)
  const isThinking = useStore((s) => s.isThinking)
  const setIsThinking = useStore((s) => s.setIsThinking)
  const thinkingStage = useStore((s) => s.thinkingStage)
  const setThinkingStage = useStore((s) => s.setThinkingStage)
  const addActivity = useStore((s) => s.addActivity)
  const { playClick, playTyping } = useSound()

  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isThinking])

  const sendMessage = useCallback(async () => {
    if (!input.trim() || isThinking) return
    const userMsg = input.trim()
    setInput('')
    playClick()

    addMessage({ id: `u-${Date.now()}`, role: 'user', content: userMsg, timestamp: Date.now() })
    addActivity(`Chat: User sent message`)
    setIsThinking(true)

    // Thinking stages
    let stageIdx = 0
    const thinkingInterval = setInterval(() => {
      if (stageIdx < THINKING_STAGES.length) {
        setThinkingStage(THINKING_STAGES[stageIdx])
        stageIdx++
      }
    }, 800)

    const thinkTime = 5000 + Math.random() * 3000
    await new Promise((r) => setTimeout(r, thinkTime))

    clearInterval(thinkingInterval)
    setIsThinking(false)
    setThinkingStage('')

    const response = getAIResponse(userMsg)
    addMessage({ id: `a-${Date.now()}`, role: 'assistant', content: response, timestamp: Date.now() })
    addActivity(`Chat: JARVIS responded`)
  }, [input, isThinking, addMessage, setIsThinking, setThinkingStage, addActivity, playClick])

  const handleKey = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }, [sendMessage])

  return (
    <Panel
      title="AI Neural Chat"
      icon={<MessageSquare size={12} />}
      badge="JARVIS v9"
      headerRight={
        <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#00ff88', boxShadow: '0 0 5px #00ff88' }} />
      }
      style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
    >
      {/* Messages */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          minHeight: 200,
          maxHeight: 300,
          paddingRight: 4,
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(0,255,136,0.2) transparent',
        }}
      >
        {messages.length === 0 && (
          <div style={{ textAlign: 'center', padding: '24px 0', color: 'rgba(0,255,136,0.25)', fontFamily: 'Share Tech Mono', fontSize: 10, letterSpacing: 2 }}>
            AWAITING INPUT — JARVIS ONLINE
          </div>
        )}
        {messages.map((msg) => <MsgBubble key={msg.id} msg={msg} />)}
        {isThinking && <ThinkingDisplay stage={thinkingStage} />}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div style={{ marginTop: 8, paddingTop: 8, borderTop: '1px solid rgba(0,255,136,0.08)' }}>
        <div style={{ display: 'flex', gap: 6, alignItems: 'flex-end' }}>
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => { setInput(e.target.value); playTyping() }}
            onKeyDown={handleKey}
            disabled={isThinking}
            placeholder="Send command to JARVIS..."
            rows={2}
            style={{
              flex: 1,
              background: 'rgba(0,255,136,0.04)',
              border: '1px solid rgba(0,255,136,0.15)',
              borderRadius: 4,
              padding: '8px 10px',
              color: '#00ff88',
              fontFamily: 'JetBrains Mono',
              fontSize: 11,
              resize: 'none',
              outline: 'none',
              opacity: isThinking ? 0.5 : 1,
            }}
          />
          <button
            onClick={sendMessage}
            disabled={isThinking || !input.trim()}
            style={{
              width: 36,
              height: 36,
              borderRadius: 4,
              background: isThinking ? 'rgba(0,255,136,0.05)' : 'rgba(0,255,136,0.1)',
              border: '1px solid rgba(0,255,136,0.3)',
              color: '#00ff88',
              cursor: isThinking ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s',
              flexShrink: 0,
            }}
          >
            <Send size={13} />
          </button>
        </div>
        <div style={{ marginTop: 4, fontFamily: 'Share Tech Mono', fontSize: 8, color: 'rgba(0,255,136,0.2)', letterSpacing: 1 }}>
          ENTER to send · SHIFT+ENTER for newline · {isThinking ? 'PROCESSING...' : 'READY'}
        </div>
      </div>
    </Panel>
  )
}
