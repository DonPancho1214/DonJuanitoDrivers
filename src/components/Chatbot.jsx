import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X, Send, Bot, User, Loader2 } from 'lucide-react'
import OpenAI from 'openai'

// Initialize OpenAI client with Groq baseURL
// ⚠️ SEGURIDAD: dangerouslyAllowBrowser: true es SOLO para desarrollo local.
// En PRODUCCIÓN se DEBE usar un backend o proxy (ej. API Route en Next.js, Express, Cloudflare Worker)
// para proteger la API key de Groq. Nunca exponer claves de API directamente en el navegador del usuario final.
const groqClient = import.meta.env.VITE_GROQ_API_KEY 
  ? new OpenAI({
      apiKey: import.meta.env.VITE_GROQ_API_KEY,
      baseURL: 'https://api.groq.com/openai/v1',
      dangerouslyAllowBrowser: true // TODO: Reemplazar con backend proxy en producción
    })
  : null

const SYSTEM_PROMPT = `Eres Don Juanito, un asistente virtual especializado únicamente en información del RUNT y licencias de conducción en Colombia. Ayudas a los usuarios con dudas sobre categorías de licencia, refrendaciones, comparendos, requisitos, exámenes médicos y procesos relacionados con conducción. Nunca respondes preguntas fuera de este tema. Si el usuario pregunta sobre precios, promociones o asesoría personalizada, debes indicarle que contacte a un asesor.

REGLAS IMPORTANTES:
- No respondas preguntas no relacionadas (ej. recetas, política, etc.). Responde con: "Lo siento, solo puedo ayudarte con información relacionada al RUNT y licencias de conducción en Colombia."
- Para precios/asesoría responde: "Para conocer precios, promociones o recibir asesoría personalizada, por favor contacta a uno de nuestros asesores."
- No inventes leyes.
- Respuestas cortas, claras, profesionales y amables.`;

const SUGGESTIONS = [
  "¿Qué necesito para sacar la B1?",
  "¿Cómo refrendar mi licencia?",
  "¿Qué pasa si tengo comparendos?",
  "¿Cuánto dura una licencia?",
  "¿Cómo consultar mi licencia en el RUNT?"
]

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'assistant', content: '¡Hola! Soy Don Juanito, tu asistente virtual. ¿En qué puedo ayudarte hoy sobre licencias de conducción o el RUNT?' }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (isOpen) {
      scrollToBottom()
    }
  }, [messages, isOpen, isLoading])

  const handleSend = async (text) => {
    if (!text.trim()) return

    const userMessage = { role: 'user', content: text }
    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    if (!groqClient) {
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'assistant', content: 'La API Key de Groq no está configurada. Por favor agrega VITE_GROQ_API_KEY a tu archivo .env.' }])
        setIsLoading(false)
      }, 1000)
      return
    }

    try {
      const chatHistory = messages.map(m => ({ role: m.role, content: m.content }))
      
      const completion = await groqClient.chat.completions.create({
        model: 'llama-3.1-8b-instant',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...chatHistory,
          userMessage
        ],
        temperature: 0.7,
        max_tokens: 300,
      })

      const botMessage = completion.choices[0].message
      setMessages(prev => [...prev, { role: 'assistant', content: botMessage.content }])
    } catch (error) {
      console.error('Error fetching OpenAI response:', error)
      setMessages(prev => [...prev, { role: 'assistant', content: `Hubo un error: ${error.message || 'Desconocido'}. (Revisa la consola de desarrollador F12 para más detalles).` }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSend(inputValue)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-80 sm:w-96 h-[500px] max-h-[80vh] bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden mb-4"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 bg-black/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center">
                  <Bot size={18} className="text-black" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm" style={{ fontFamily: 'Outfit' }}>Don Juanito</h3>
                  <p className="text-gray-400 text-xs flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> En línea
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4" style={{ scrollbarWidth: 'thin' }}>
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}>
                  <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${msg.role === 'user' ? 'bg-white/10 text-white' : 'bg-yellow-400 text-black'}`}>
                    {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div className={`p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-yellow-400 text-black rounded-tr-none font-medium' : 'bg-white/10 text-white rounded-tl-none font-light leading-relaxed'}`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex gap-3 max-w-[85%] mr-auto">
                  <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center bg-yellow-400 text-black">
                    <Bot size={16} />
                  </div>
                  <div className="p-3 rounded-2xl bg-white/10 text-white rounded-tl-none flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions */}
            {messages.length === 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-2">
                {SUGGESTIONS.map((s, i) => (
                  <button 
                    key={i}
                    onClick={() => handleSend(s)}
                    className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 transition-colors text-left"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-white/10 bg-black/50">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Escribe tu pregunta..."
                  className="w-full bg-white/5 border border-white/10 rounded-full pl-4 pr-12 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400/50 transition-colors"
                  disabled={isLoading}
                />
                <button
                  onClick={() => handleSend(inputValue)}
                  disabled={!inputValue.trim() || isLoading}
                  className="absolute right-2 p-1.5 bg-yellow-400 text-black rounded-full hover:bg-yellow-500 disabled:opacity-50 disabled:hover:bg-yellow-400 transition-colors"
                >
                  {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-yellow-400 text-black flex items-center justify-center shadow-[0_8px_30px_rgba(250,204,21,0.45)] hover:bg-yellow-500 transition-colors z-50"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </motion.button>
    </div>
  )
}
