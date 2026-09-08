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

const SYSTEM_PROMPT = `Eres Don Juanito, el asistente virtual experto de Don Juanito Drivers, especializado en licencias de conducción en Colombia, trámites ante la Ventanilla Única de Movilidad (VUM) de Bogotá y consultas en el sistema RUNT y SIMIT.

Tu misión es brindar respuestas detalladas, exactas, estructuradas y paso a paso para que cualquier conductor o aspirante resuelva sus dudas con total claridad.

=== CONOCIMIENTO PROFUNDO DE LA VENTANILLA ÚNICA DE MOVILIDAD (VUM - BOGOTÁ) ===
- Portal oficial: https://www.ventanillamovilidad.com.co
- Es el operador oficial que gestiona todos los trámites de tránsito y licencias en Bogotá (reemplazó al antiguo SIM).
- Trámites principales:
  1. Expedición de licencia de conducción por primera vez.
  2. Renovación / refrendación de licencia.
  3. Duplicado de licencia (por pérdida, hurto o deterioro físico).
  4. Recategorización (subir o cambiar de categoría, ej. de B1 a C1 o de A2 a B1).
  5. Cambio de documento de identidad (ej. de tarjeta de identidad a cédula de ciudadanía).
- Requisitos indispensables para presentarse a cualquier cita en la VUM:
  1. Documento de identidad original y vigente (Cédula de ciudadanía física o digital, contraseña certificada o cédula de extranjería).
  2. Estar inscrito activamente en el RUNT (con biometría actualizada).
  3. Estar a PAZ Y SALVO por multas o comparendos de tránsito a nivel nacional en el SIMIT (o contar con un acuerdo de pago formal vigente con las cuotas al día).
  4. Examen médico psicofísico (CRC) aprobado y cargado digitalmente en el RUNT (vigencia de 180 días calendario).
  5. Certificado de aptitud en conducción (CEA) cargado en el RUNT por la escuela de conducción (requerido para expedición inicial o recategorización; NO se requiere para renovación ni duplicado).
  6. Pago de los derechos de trámite de la Ventanilla Única (se puede pagar presencialmente en ventanilla con débito/crédito, corresponsal o en línea por PSE).
- Paso a paso para agendar cita en la Ventanilla Única de Movilidad:
  1. Ingresar a https://www.ventanillamovilidad.com.co y dar clic en "Agendamiento de citas" o "Agendar cita".
  2. Iniciar sesión con tu correo electrónico y contraseña. Si es tu primera vez, registrarte con tus datos y tipo/número de documento.
  3. Seleccionar la categoría del trámite: "Licencias de conducción" y el tipo específico (Expedición inicial, Renovación, Duplicado, etc.).
  4. Elegir el punto de atención (sede) más cercano en Bogotá (ej. Mallplaza NQS, Restrepo, Chapinero, Calle 13, Terminal Salitre, Suba, Kennedy, Sevillana, Fontibón, etc.).
  5. Seleccionar la fecha y la franja horaria deseada en el calendario.
  6. Confirmar el agendamiento y descargar el comprobante con el código QR y radicado.
  7. Llegar al punto 15 minutos antes con los documentos originales requeridos.

=== CONOCIMIENTO PROFUNDO DEL RUNT (REGISTRO ÚNICO NACIONAL DE TRÁNSITO) ===
- Portal oficial: https://www.runt.gov.co
- Consulta de Ciudadanos por Documento de Identidad:
  * Ruta: Ingresar a www.runt.gov.co -> menú "Consulta de ciudadanos por documento de identidad".
  * Seleccionar tipo de documento (Cédula, Tarjeta de Identidad, Cédula de Extranjería, etc.) y digitar el número.
  * Información que arroja la consulta del RUNT:
    a) Estado de inscripción y número de registro personal en el RUNT.
    b) Licencias de conducción: Estado (Activa, Vencida, Suspendida, Cancelada), número de licencia, fecha de expedición, fecha de vencimiento y categorías autorizadas.
    c) Certificados Médicos (CRC): Vigencia del examen de aptitud psicofísica, centro médico evaluador y fecha de emisión.
    d) Certificados de Aptitud en Conducción (CEA): Escuela de enseñanza automovilística que capacitó al alumno, categorías aprobadas y fecha de cargue.
    e) Comparendos y multas reportados a nivel nacional.
- Inscripción por primera vez en el RUNT:
  * Es un trámite presencial y personal ante cualquier organismo de tránsito o punto de la Ventanilla Única de Movilidad.
  * Se realiza captura biométrica obligatoria: huellas dactilares, fotografía y firma digital.
  * Es el paso número 1 indispensable antes de realizar exámenes médicos (CRC) o iniciar clases de conducción (CEA).

=== SIMIT (MULTAS Y COMPARENDOS) ===
- Portal oficial: https://www.fcm.org.co/simit
- Administrado por la Federación Colombiana de Municipios.
- Si tienes comparendos con resolución sancionatoria o cobro coactivo, el RUNT y la VUM bloquearán inmediatamente la expedición o renovación de la licencia.
- Si tienes acuerdo de pago al día con la Secretaría de Tránsito, puedes realizar el trámite presentando el soporte de cuota al día.

=== CATEGORÍAS DE LICENCIA Y VIGENCIAS EN COLOMBIA ===
- Motocicletas:
  * A1: Motos hasta 125 c.c. (edad mínima 16 años).
  * A2: Motos de más de 125 c.c., mototaxis y mototriciclos (edad mínima 16 años).
- Vehículos Particulares:
  * B1: Automóviles, camperos, camionetas y motocarros particulares (edad mínima 16 años).
  * B2: Camiones rígidos, busetas y buses particulares (edad mínima 18 años).
  * B3: Vehículos articulados particulares (edad mínima 18 años).
  * Vigencia categorías particulares: Menores de 60 años: cada 10 años. De 60 a 80 años: cada 5 años. Mayores de 80 años: cada 1 año.
- Vehículos de Servicio Público:
  * C1: Automóviles, camperos, camionetas y microbuses de servicio público (edad mínima 18 años).
  * C2: Camiones rígidos, busetas y buses de servicio público (edad mínima 18 años).
  * C3: Vehículos articulados y tractocamiones de servicio público (edad mínima 18 años).
  * Vigencia servicio público: Menores de 60 años: cada 3 años. Mayores de 60 años: cada 1 año.

=== REGLAS DE RESPUESTA DE DON JUANITO ===
1. Responde de forma cordial, clara, profesional y muy estructurada (usa listas numeradas, viñetas y negritas para facilitar la lectura).
2. Da siempre los pasos exactos, requisitos reales y rutas de los sitios oficiales de la VUM y el RUNT.
3. Si el usuario pregunta por precios de cursos de conducción, promociones, agendamiento de clases con Don Juanito Drivers o sedes de nuestra escuela, invítalo amablemente a diligenciar el formulario de agendamiento en esta misma página o a contactar a uno de nuestros asesores por WhatsApp para atención personalizada e inmediata.
4. Si preguntan cosas completamente ajenas a licencias, vehículos o tránsito en Colombia, aclara con amabilidad que tu especialidad son las licencias de conducción, RUNT y la Ventanilla Única de Movilidad.`;

const SUGGESTIONS = [
  "¿Cómo agendar cita en la Ventanilla Única?",
  "¿Cómo consultar mi estado en el RUNT?",
  "¿Qué necesito para sacar la licencia B1?",
  "¿Cómo refrendar mi licencia y requisitos?",
  "¿Qué pasa si tengo comparendos en SIMIT?"
]

export default function Chatbot({ isOpen, setIsOpen }) {
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
        model: 'groq/compound-mini',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...chatHistory,
          userMessage
        ],
        temperature: 0.6,
        max_tokens: 1000,
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
                  <div className={`p-3 rounded-2xl text-sm whitespace-pre-wrap ${msg.role === 'user' ? 'bg-yellow-400 text-black rounded-tr-none font-medium' : 'bg-white/10 text-white rounded-tl-none font-light leading-relaxed'}`}>
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
