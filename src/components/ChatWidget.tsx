import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import guillaumeImg from '@/assets/guillaume.jpg'

const API = 'https://lightstudio.harari.ovh'

// --------------- Visitor ID ---------------
function getVisitorId(): string {
  let id = localStorage.getItem('ls_chat_visitor_id')
  if (!id) {
    id = 'web_' + crypto.randomUUID()
    localStorage.setItem('ls_chat_visitor_id', id)
  }
  return id
}

function getDeviceInfo(): string {
  return JSON.stringify({
    os: 'Web',
    browser: navigator.userAgent.split(' ').pop(),
    lang: navigator.language || 'unknown',
    source: 'website',
    page: window.location.pathname,
  })
}

// --------------- Types ---------------
interface Message {
  id: number
  sender: 'user' | 'admin'
  content: string
  created_at: string
}

// --------------- Component ---------------
export default function ChatWidget() {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const [unread, setUnread] = useState(0)

  const lastMsgId = useRef<number | null>(null)
  const renderedIds = useRef(new Set<number>())
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // --- helpers ---
  const headers = useCallback(() => ({
    'X-Device-Id': getVisitorId(),
    'Content-Type': 'application/json',
  }), [])

  const scrollToBottom = useCallback(() => {
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 50)
  }, [])

  const appendMessages = useCallback((msgs: Message[]) => {
    const fresh = msgs.filter((m) => !renderedIds.current.has(m.id))
    if (fresh.length === 0) return
    fresh.forEach((m) => renderedIds.current.add(m.id))
    setMessages((prev) => [...prev, ...fresh])
    if (fresh.length > 0) {
      lastMsgId.current = fresh[fresh.length - 1].id
    }
  }, [])

  // --- fetch all messages on open ---
  const fetchMessages = useCallback(async () => {
    try {
      const sinceParam = lastMsgId.current ? `?since_id=${lastMsgId.current}` : ''
      const res = await fetch(`${API}/api/chat/messages${sinceParam}`, {
        headers: { 'X-Device-Id': getVisitorId() },
      })
      const data = await res.json()
      if (data.messages?.length > 0) {
        appendMessages(data.messages)
        scrollToBottom()
      }
    } catch {
      // silent
    }
  }, [appendMessages, scrollToBottom])

  // --- send ---
  const sendMessage = useCallback(async () => {
    const content = input.trim()
    if (!content || sending) return
    setSending(true)
    setInput('')
    try {
      const res = await fetch(`${API}/api/chat/messages`, {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify({ content, deviceInfo: getDeviceInfo() }),
      })
      const data = await res.json()
      if (data.ok) {
        appendMessages([{
          id: data.messageId,
          sender: 'user',
          content,
          created_at: new Date().toISOString().replace('T', ' ').slice(0, 19),
        }])
        scrollToBottom()
      }
    } catch {
      // silent
    } finally {
      setSending(false)
      inputRef.current?.focus()
    }
  }, [input, sending, headers, appendMessages, scrollToBottom])

  // --- polling: messages every 3s when open ---
  useEffect(() => {
    if (!open) return
    fetchMessages()
    const timer = setInterval(fetchMessages, 3000)
    return () => clearInterval(timer)
  }, [open, fetchMessages])

  // --- polling: status every 15s when closed ---
  useEffect(() => {
    if (open) return
    const poll = async () => {
      try {
        const res = await fetch(`${API}/api/chat/status`, {
          headers: { 'X-Device-Id': getVisitorId() },
        })
        const data = await res.json()
        setUnread(data.unread || 0)
      } catch {
        // silent
      }
    }
    poll()
    const timer = setInterval(poll, 15000)
    return () => clearInterval(timer)
  }, [open])

  // --- scroll on new messages ---
  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  // --- open handler ---
  const handleOpen = () => {
    setOpen(true)
    setUnread(0)
  }

  // --- keyboard ---
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  // --- format time ---
  const formatTime = (raw: string) => {
    try {
      const d = new Date(raw + 'Z')
      return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    } catch {
      return ''
    }
  }

  return (
    <>
      {/* ===== Floating Bubble ===== */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            onClick={handleOpen}
            className="fixed bottom-5 right-5 z-[999] flex items-center gap-2.5 rounded-full bg-[#e94560] text-white pl-5 pr-4 py-3 shadow-lg shadow-[#e94560]/30 hover:shadow-[#e94560]/50 hover:scale-[1.03] transition-all duration-200"
            aria-label={t('chat.open')}
          >
            <span className="text-sm font-semibold whitespace-nowrap">{t('chat.cta')}</span>
            <MessageCircle size={22} />
            {unread > 0 && (
              <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[20px] h-5 px-1 rounded-full bg-white text-[#e94560] text-xs font-bold shadow">
                {unread}
              </span>
            )}
          </motion.button>
        )}
      </AnimatePresence>

      {/* ===== Chat Panel ===== */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed z-[999] bottom-0 right-0 sm:bottom-5 sm:right-5 w-full h-full sm:w-[380px] sm:h-[520px] max-w-full flex flex-col rounded-none sm:rounded-2xl overflow-hidden shadow-2xl border border-white/10"
          >
            {/* --- Header --- */}
            <div className="flex items-center gap-3 px-4 py-3 bg-[#e94560] text-white shrink-0">
              <img
                src={guillaumeImg}
                alt="Guillaume"
                className="w-9 h-9 rounded-full object-cover ring-2 ring-white/30"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold leading-tight">Guillaume</p>
                <p className="text-[11px] opacity-80 leading-tight">{t('chat.headerSub')}</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/20 transition-colors"
                aria-label={t('chat.close')}
              >
                <X size={20} />
              </button>
            </div>

            {/* --- Messages --- */}
            <div className="flex-1 overflow-y-auto bg-[#f7f7f8] px-4 py-4 space-y-3">
              {/* Welcome message when no messages */}
              {messages.length === 0 && (
                <div className="flex items-start gap-2.5">
                  <img
                    src={guillaumeImg}
                    alt="Guillaume"
                    className="w-7 h-7 rounded-full object-cover mt-0.5 shrink-0"
                  />
                  <div className="rounded-2xl rounded-tl-sm bg-white px-3.5 py-2.5 text-sm text-gray-800 shadow-sm max-w-[85%]">
                    {t('chat.welcome')}
                  </div>
                </div>
              )}

              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'admin' && (
                    <img
                      src={guillaumeImg}
                      alt="Guillaume"
                      className="w-7 h-7 rounded-full object-cover mt-0.5 mr-2 shrink-0"
                    />
                  )}
                  <div>
                    <div
                      className={`rounded-2xl px-3.5 py-2.5 text-sm max-w-[260px] shadow-sm whitespace-pre-wrap break-words ${
                        msg.sender === 'user'
                          ? 'bg-[#e94560] text-white rounded-tr-sm'
                          : 'bg-white text-gray-800 rounded-tl-sm'
                      }`}
                    >
                      {msg.content}
                    </div>
                    <p
                      className={`text-[10px] mt-1 text-gray-400 ${
                        msg.sender === 'user' ? 'text-right' : 'text-left'
                      }`}
                    >
                      {formatTime(msg.created_at)}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* --- Input --- */}
            <div className="shrink-0 bg-white border-t border-gray-200 px-3 py-2.5 flex items-end gap-2 overflow-hidden">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t('chat.placeholder')}
                maxLength={2000}
                rows={1}
                className="flex-1 min-w-0 resize-none rounded-xl bg-gray-100 px-3.5 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e94560]/30 max-h-[100px] overflow-y-auto"
                style={{ minHeight: '40px' }}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || sending}
                className="flex items-center justify-center w-9 h-9 rounded-full bg-[#e94560] text-white disabled:opacity-40 hover:bg-[#d63a54] transition-colors shrink-0"
                aria-label={t('chat.send')}
              >
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
