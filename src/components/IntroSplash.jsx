import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SLIDES = [
  {
    title: 'Saca Tu Licencia',
    highlight: 'Licencia',
    desc: 'Trámite oficial, rápido y 100% confiable',
    tag: 'Paso 01',
  },
  {
    title: 'Aprende A Conducir',
    highlight: 'Conducir',
    desc: 'Acompañamiento personalizado desde el primer día',
    tag: 'Paso 02',
  },
  {
    title: 'Renovación',
    highlight: 'Renovación',
    desc: 'Exámenes médicos CRC y gestión sin filas',
    tag: 'Paso 03',
  },
  {
    title: 'Recategorización',
    highlight: 'Recategorización',
    desc: 'Avanza hacia nuevas oportunidades y categorías',
    tag: 'Paso 04',
  },
]

export default function IntroSplash({ onFinish }) {
  const [currentStep, setCurrentStep] = useState(0) // 0 to 4 (4 is brand reveal)

  useEffect(() => {
    // Bloquear scroll mientras el intro esté activo
    document.body.style.overflow = 'hidden'

    const intervals = [900, 900, 900, 900, 1100] // Duración en ms de cada fase

    const timer = setTimeout(() => {
      if (currentStep < 4) {
        setCurrentStep((prev) => prev + 1)
      } else {
        handleComplete()
      }
    }, intervals[currentStep])

    return () => clearTimeout(timer)
  }, [currentStep])

  const handleComplete = () => {
    document.body.style.overflow = ''
    try {
      sessionStorage.setItem('donjuanito_intro_seen', 'true')
    } catch (e) {
      // Ignorar si el almacenamiento de sesión está deshabilitado
    }
    onFinish()
  }

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }}
      className="fixed inset-0 z-[99999] bg-[#070707] text-white flex flex-col items-center justify-center select-none overflow-hidden"
    >
      {/* Luz ambiental dorada sutil */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.12) 0%, rgba(7, 7, 7, 0.95) 70%)',
        }}
      />

      {/* Líneas sutiles de fondo (estilo pista de conducción) */}
      <div className="absolute inset-x-0 bottom-12 flex justify-center pointer-events-none opacity-25">
        <div className="w-48 h-0.5 border-b-2 border-dashed border-[#D4AF37]" />
      </div>

      {/* Botón discreto para omitir */}
      <button
        type="button"
        onClick={handleComplete}
        className="absolute top-6 right-6 z-20 text-xs font-semibold tracking-widest uppercase text-gray-400 hover:text-white px-3.5 py-1.5 rounded-full border border-white/10 hover:border-[#D4AF37]/50 bg-black/40 backdrop-blur-md transition-all cursor-pointer flex items-center gap-1.5 group"
      >
        <span>Saltar</span>
        <span className="text-[#D4AF37] group-hover:translate-x-0.5 transition-transform">✕</span>
      </button>

      {/* Contenido central de las fases */}
      <div className="relative z-10 w-full max-w-xl px-6 text-center">
        <AnimatePresence mode="wait">
          {currentStep < 4 ? (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -25, filter: 'blur(6px)' }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center"
            >
              {/* Etiqueta de paso */}
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#D4AF37] mb-3 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30">
                {SLIDES[currentStep].tag}
              </span>

              {/* Título principal con tipografía de alto impacto */}
              <h1
                className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none mb-4 uppercase text-white"
                style={{ fontFamily: 'Barlow Condensed, sans-serif' }}
              >
                {SLIDES[currentStep].title}
              </h1>

              {/* Línea dorada de acento */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '48px' }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="h-0.5 bg-[#D4AF37] rounded-full mb-3"
              />

              {/* Subtítulo / Propuesta de valor */}
              <p className="text-gray-400 text-sm sm:text-base font-normal max-w-md">
                {SLIDES[currentStep].desc}
              </p>
            </motion.div>
          ) : (
            /* Fase final: Cierre de marca Don Juanito */
            <motion.div
              key="brand"
              initial={{ opacity: 0, scale: 0.92, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.05, filter: 'blur(8px)' }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center"
            >
              <img
                src="/nuevo-logo.webp"
                alt="Don Juanito Drivers"
                className="h-16 sm:h-20 w-auto object-contain mb-4 drop-shadow-[0_0_25px_rgba(212,175,55,0.45)]"
              />
              <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.3em] mb-1">
                Tu Conducción Segura
              </span>
              <p className="text-gray-300 text-sm font-light">
                Bienvenido a Don Juanito Drivers
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Indicador de progreso de 4 puntos dorados */}
      <div className="absolute bottom-8 z-10 flex items-center gap-2">
        {[0, 1, 2, 3].map((step) => (
          <div
            key={step}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              currentStep === step
                ? 'w-8 bg-[#D4AF37] shadow-[0_0_10px_#D4AF37]'
                : currentStep > step
                ? 'w-3 bg-[#D4AF37]/50'
                : 'w-1.5 bg-white/20'
            }`}
          />
        ))}
      </div>
    </motion.div>
  )
}
