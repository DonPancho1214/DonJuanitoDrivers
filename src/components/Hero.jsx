import React from 'react'
import { MapPin, IdCard, GraduationCap, CheckCircle, Bike, Car, Bus, Truck } from 'lucide-react'
// Sistema round-robin centralizado
import { abrirWhatsApp } from '../utils/whatsapp'

export default function Hero() {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center overflow-hidden pb-28">
      {/* Background */}
      <div className="absolute inset-0 z-0 bg-[#0a0a0a]">
        <img src="/hero-background.webp" alt="Familia feliz Don Juanito Drivers" width="1920" height="1080" loading="eager"
          className="w-full h-full object-cover object-[30%_center] md:object-center opacity-60"
        />
        {/* Gradients to darken the left side for text readability while revealing the right side */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#0a0a0a]/90" />
      </div>

      {/* Floating logo desktop removed for minimalist design */}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="max-w-2xl xl:max-w-3xl">
          <div className="inline-flex items-center gap-3 mb-6 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 animate-fade-in-up"
            style={{ animationDelay: '0.1s', opacity: 0 }}>
            <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />
            <span className="text-gray-300 text-xs font-medium uppercase tracking-wider">Red de escuelas certificadas</span>
          </div>

          <h1 className="font-semibold leading-tight mb-6 animate-fade-in-up tracking-tight"
            style={{ fontFamily: 'Outfit', fontSize: 'clamp(3rem,6vw,5.5rem)', animationDelay: '0.2s', opacity: 0 }}>
            <span className="text-white">Obtener tu licencia</span><br />
            <span className="text-gray-400">de conducción nunca fue</span><br />
            <span className="text-yellow-400 font-bold">tan fácil.</span>
          </h1>

          <div className="text-gray-400 text-lg md:text-xl mb-10 max-w-xl leading-relaxed font-light animate-fade-in-up"
            style={{ animationDelay: '0.3s', opacity: 0 }}>
            <p className="mb-4">
              La forma más simple y confiable de obtener tu licencia de conducción en Bogotá. 
            </p>
            <p className="mb-6 text-base md:text-lg">
              En Don Juanito Drivers conectamos a nuestros estudiantes con una red de escuelas aliadas y los acompañamos durante todo el proceso para licencias A2, B1, C1 y C2.
            </p>
            <ul className="text-base space-y-2 text-gray-300">
              <li className="flex items-center gap-2">
                <span className="text-yellow-400 font-bold">✔</span> Atención personalizada
              </li>
              <li className="flex items-center gap-2">
                <span className="text-yellow-400 font-bold">✔</span> Acompañamiento paso a paso
              </li>
              <li className="flex items-center gap-2">
                <span className="text-yellow-400 font-bold">✔</span> Escuelas aliadas en Bogotá y Soacha
              </li>
              <li className="flex items-center gap-2">
                <span className="text-yellow-400 font-bold">✔</span> Procesos seguros y confiables
              </li>
            </ul>
          </div>

          <div className="flex flex-wrap gap-4 mb-12 animate-fade-in-up" style={{ animationDelay: '0.4s', opacity: 0 }}>
            <a href="#agendar" className="bg-yellow-400 text-black px-6 py-3 font-bold text-base rounded-lg hover:bg-yellow-500 transition-colors flex items-center gap-2">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Agendar ahora
            </a>
            {/* Botón WhatsApp: usa round-robin para distribuir entre asesores */}
            <button
              type="button"
              onClick={() => abrirWhatsApp('Hola quiero información sobre las licencias disponibles.')}
              className="border border-white/20 text-white px-6 py-3 font-medium text-base rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              Hablar con un asesor
            </button>
          </div>

          <div className="flex flex-wrap gap-3 animate-fade-in-up" style={{ animationDelay: '0.5s', opacity: 0 }}>
            {[
              { code: 'A2', label: 'Motos', icon: <Bike size={16} /> },
              { code: 'B1', label: 'Particulares', icon: <Car size={16} /> },
              { code: 'C1', label: 'Público', icon: <Bus size={16} /> },
              { code: 'C2', label: 'Camiones', icon: <Truck size={16} /> },
            ].map(cat => (
              <div key={cat.code} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <span className="text-gray-400">{cat.icon}</span>
                <span className="text-white font-medium text-sm">{cat.code}</span>
                <span className="text-gray-400 text-xs hidden sm:inline">{cat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats bar minimalist */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-[#0a0a0a]/90 backdrop-blur-md border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap justify-center md:justify-between gap-8 text-center opacity-80">
            {[
              { value: '9+', label: 'Sedes activas' },
              { value: '4', label: 'Categorías' },
              { value: '2.000+', label: 'Conductores formados' },
              { value: '98%', label: 'Tasa de aprobación', hideOnMobile: true },
            ].map((s, idx) => (
              <div key={idx} className={`flex flex-col items-center gap-1 ${s.hideOnMobile ? 'hidden md:flex' : ''}`}>
                <span className="text-white font-medium text-3xl leading-none" style={{ fontFamily: 'Outfit' }}>{s.value}</span>
                <span className="text-gray-400 text-xs uppercase tracking-wider">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
