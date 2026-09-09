import React, { useState } from 'react'
import { MapPin, Bike, Car, Bus, Truck } from 'lucide-react'

const categories = [
  {
    code: 'A2',
    title: 'Categoría A2',
    subtitle: 'Motocicletas',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="w-14 h-14">
        <circle cx="16" cy="48" r="10" stroke="#D4AF37" strokeWidth="2.5"/>
        <circle cx="48" cy="48" r="10" stroke="#D4AF37" strokeWidth="2.5"/>
        <path d="M26 48h12M32 48V28l8-8h8l4 16" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M32 28l-12 4" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx="40" cy="18" r="4" stroke="#D4AF37" strokeWidth="2"/>
      </svg>
    ),
    description: 'Motocicletas de más de 125 c.c. Ideal para movilidad, libertad y aventura urbana.',
    features: ['+125 c.c.', 'Urbana y carretera', 'Libertad total'],
    color: '#D4AF37',
  },
  {
    code: 'B1',
    title: 'Categoría B1',
    subtitle: 'Vehículos Particulares',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="w-14 h-14">
        <rect x="8" y="22" width="48" height="24" rx="4" stroke="#D4AF37" strokeWidth="2.5"/>
        <path d="M14 22l6-12h24l6 12" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx="18" cy="46" r="7" stroke="#D4AF37" strokeWidth="2.5"/>
        <circle cx="46" cy="46" r="7" stroke="#D4AF37" strokeWidth="2.5"/>
        <rect x="22" y="26" width="20" height="10" rx="2" stroke="#D4AF37" strokeWidth="1.5"/>
      </svg>
    ),
    description: 'Carros, camionetas y camperos. La licencia más popular para uso cotidiano.',
    features: ['Carros', 'Camionetas', 'Camperos / SUV'],
    color: '#D4AF37',
  },
  {
    code: 'C1',
    title: 'Categoría C1',
    subtitle: 'Servicio Público',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="w-14 h-14">
        <rect x="4" y="16" width="56" height="32" rx="4" stroke="#D4AF37" strokeWidth="2.5"/>
        <path d="M4 26h56" stroke="#D4AF37" strokeWidth="2"/>
        <circle cx="14" cy="48" r="6" stroke="#D4AF37" strokeWidth="2.5"/>
        <circle cx="50" cy="48" r="6" stroke="#D4AF37" strokeWidth="2.5"/>
        <path d="M20 48h24" stroke="#D4AF37" strokeWidth="2"/>
        <rect x="12" y="30" width="10" height="8" rx="1" stroke="#D4AF37" strokeWidth="1.5"/>
        <rect x="27" y="30" width="10" height="8" rx="1" stroke="#D4AF37" strokeWidth="1.5"/>
        <rect x="42" y="30" width="10" height="8" rx="1" stroke="#D4AF37" strokeWidth="1.5"/>
      </svg>
    ),
    description: 'Taxis, vans y microbuses. Habilítate para el transporte público y genera ingresos.',
    features: ['Taxis', 'Vans', 'Microbuses'],
    color: '#D4AF37',
  },
  {
    code: 'C2',
    title: 'Categoría C2',
    subtitle: 'Vehículo Especial',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="w-14 h-14">
        <rect x="4" y="24" width="56" height="24" rx="3" stroke="#D4AF37" strokeWidth="2.5"/>
        <rect x="44" y="24" width="16" height="24" rx="1" stroke="#D4AF37" strokeWidth="2.5"/>
        <path d="M44 34h16" stroke="#D4AF37" strokeWidth="2"/>
        <circle cx="14" cy="48" r="6" stroke="#D4AF37" strokeWidth="2.5"/>
        <circle cx="28" cy="48" r="6" stroke="#D4AF37" strokeWidth="2.5"/>
        <circle cx="50" cy="48" r="6" stroke="#D4AF37" strokeWidth="2.5"/>
        <path d="M6 24l4-10h16l4 10" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    ),
    description: 'Camiones rígidos, busetas y buses. Para trabajar como conductor profesional en vehículos grandes.',
    features: ['Camiones', 'Busetas', 'Buses'],
    color: '#D4AF37',
  },
]

function CategoriaDetalle({ cat, onClose }) {
  if (!cat) return null
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(10px)' }}
      onClick={onClose}>
      <div className="relative w-full max-w-xl rounded-2xl overflow-hidden animate-fade-in-up"
        style={{
          background: '#ffffff',
          border: '1.5px solid rgba(217, 119, 6, 0.35)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        }}
        onClick={e => e.stopPropagation()}>
        
        <div className="h-1.5 w-full" style={{ background: 'linear-gradient(90deg, #D4AF37, #B48222, #D4AF37)' }} />

        <button onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-all z-10 hover:bg-gray-200"
          style={{ background: '#f3f4f6', border: '1px solid #e5e7eb', color: '#374151' }}>
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="p-7">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 text-xs font-bold tracking-widest uppercase"
            style={{ background: '#0a0a0a', border: '1px solid #D4AF37', color: '#D4AF37', fontFamily: 'Barlow Condensed' }}>
            {cat.code} — {cat.subtitle}
          </div>
          
          <h2 className="font-black text-gray-900 mb-2" style={{ fontFamily: 'Barlow Condensed', fontSize: '2.2rem' }}>
            {cat.title}
          </h2>
          
          <p className="text-gray-600 text-sm leading-relaxed mb-5">
            {cat.description}
          </p>

          <div className="mb-6">
            <div className="text-gray-500 text-xs uppercase tracking-wider mb-3 font-semibold">Vehículos permitidos</div>
            <div className="flex flex-wrap gap-2">
              {cat.features.map((f, i) => (
                <div key={i} className="px-3 py-1.5 rounded-lg text-sm font-semibold text-gray-900 bg-amber-50/40 border border-[#D4AF37]/30">
                  <span className="text-[#B38728] font-bold mr-1">✓</span> {f}
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl mb-6 text-sm flex items-start gap-3" style={{ background: '#f9fafb', border: '1px solid #e5e7eb' }}>
            <MapPin size={24} className="text-[#D4AF37] shrink-0" />
            <div>
              <span className="text-gray-900 font-bold block mb-1">¿Cómo conocer los precios?</span>
              <span className="text-gray-600 leading-relaxed">Los precios varían dependiendo de la sede. Dirígete a la sección de sedes para ver los precios exactos y agendar tu cita. {cat.code === 'C2' && <span className="text-[#B38728] font-bold">Nota: La categoría C2 solo está disponible en Conductores Bogotá.</span>}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <a href="#sedes" onClick={onClose} className="btn-yellow flex-1 justify-center text-sm rounded-xl py-3">
              Ver Sedes y Precios →
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Categories() {
  const [catSeleccionada, setCatSeleccionada] = useState(null)

  return (
    <>
      <section id="categorias" className="py-24 relative" style={{background:'rgba(255,255,255,0.7)'}}>
        <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none" />

        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="section-label mb-3">Nuestras categorías</div>
            <h2 className="font-black text-gray-900 mb-4" style={{fontFamily:'Barlow Condensed', fontSize:'clamp(2.5rem,5vw,4rem)'}}>
              ¿QUÉ LICENCIA <span className="font-black text-gold-outline">NECESITAS?</span>
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto text-base">
              Ofrecemos formación completa para cuatro categorías de licencia. Cada programa está diseñado con los más altos estándares de seguridad vial.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, i) => (
              <div
                key={cat.code}
                className="glass-card card-hover p-8 flex flex-col relative overflow-hidden group"
                style={{animationDelay:`${i*0.1}s`}}
              >
                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                  <div className="absolute top-0 right-0 w-0 h-0"
                    style={{borderLeft:'48px solid transparent', borderTop:'48px solid rgba(212,175,55,0.25)'}} />
                </div>
                <div className="absolute -top-px left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />

                {/* Badge */}
                <div className="inline-flex items-center gap-2.5 mb-5 px-4 py-1.5 rounded-full border border-[#D4AF37] bg-black text-white self-start shadow-sm">
                  <span className="text-[#D4AF37]">
                    {cat.code === 'A2' && <Bike size={20} />}
                    {cat.code === 'B1' && <Car size={20} />}
                    {cat.code === 'C1' && <Bus size={20} />}
                    {cat.code === 'C2' && <Truck size={20} />}
                  </span>
                  <span className="text-white font-black text-lg" style={{fontFamily:'Barlow Condensed', letterSpacing:'0.1em'}}>{cat.code}</span>
                </div>

                {/* Icon Removed per user request */}

                <h3 className="font-black text-gray-900 text-2xl mb-1" style={{fontFamily:'Barlow Condensed'}}>{cat.title}</h3>
                <p className="text-[#B38728] font-bold text-sm mb-3 tracking-wider uppercase">{cat.subtitle}</p>
                <p className="text-gray-600 text-sm mb-5 leading-relaxed flex-1">{cat.description}</p>

                {/* Feature pills */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {cat.features.map(f => (
                    <span key={f} className="px-2.5 py-1 rounded-md text-xs font-semibold text-gray-900 border border-[#D4AF37]/40 bg-amber-50/30">
                      {f}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => setCatSeleccionada(cat)}
                  className="btn-outline w-full justify-center text-center text-sm py-2.5 shadow-sm"
                >
                  Más información →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal / Popup */}
      <CategoriaDetalle cat={catSeleccionada} onClose={() => setCatSeleccionada(null)} />
    </>
  )
}
