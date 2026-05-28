import React from 'react'

const values = [
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="#FACC15" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
    title: 'Acompañamiento personalizado',
    desc: 'Cada estudiante recibe atención individual con instructores dedicados a su avance.',
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="#FACC15" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    title: 'Rapidez y eficiencia',
    desc: 'Programas intensivos diseñados para que obtengas tu licencia en el menor tiempo posible.',
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="#FACC15" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: 'Formación segura',
    desc: 'Instructores certificados, vehículos en perfecto estado y rutas especialmente diseñadas.',
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="#FACC15" strokeWidth="2" viewBox="0 0 24 24">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    title: 'Red de sedes en Bogotá',
    desc: 'Más de 8 sedes activas para que estudies cerca de tu hogar o trabajo.',
  },
]

export default function About() {
  return (
    <section id="nosotros" className="py-24 relative overflow-hidden" style={{background:'rgba(13,13,13,0.65)'}}>
      {/* Decorative */}
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{background:'radial-gradient(circle, rgba(250,204,21,0.06) 0%, transparent 70%)'}} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div>
            <div className="section-label mb-3">Quiénes somos</div>
            <h2 className="font-black text-white mb-6" style={{fontFamily:'Barlow Condensed', fontSize:'clamp(2.5rem,5vw,4rem)', lineHeight:1.05}}>
              LA RED DE ESCUELAS
              <br/>
              DE CONDUCCIÓN
              <br/>
              <span className="text-yellow-400">MÁS CONFIABLE</span>
            </h2>

            <p className="text-gray-300 text-base leading-relaxed mb-4">
              <strong className="text-white">Don Juanito Drivers</strong> opera bajo un modelo de <strong className="text-yellow-400">outsourcing</strong> con múltiples escuelas afiliadas en Bogotá y Soacha.
              En la sede principal <strong className="text-white">CEA Diverplaza</strong>, el asesor acompaña al estudiante durante <strong className="text-white">TODO el proceso</strong> con seguimiento personalizado y flexibilidad de precios.
            </p>
            <p className="text-gray-400 text-base leading-relaxed mb-8">
              En las demás sedes afiliadas gestionamos la matrícula y el agendamiento bajo el nombre <strong className="text-white">CAMILO VELANDIA</strong>. Nuestra prioridad es siempre la atención humana, cercana y efectiva para que cada estudiante llegue al examen con total confianza.
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="#agendar" className="btn-yellow">Empezar ahora</a>
              <a href="#sedes" className="btn-outline">Ver sedes</a>
            </div>
          </div>

          {/* Right: values grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {values.map((v, i) => (
              <div
                key={v.title}
                className="glass-card card-hover p-6 group"
                style={{animationDelay:`${i*0.1}s`}}
              >
                <div className="w-12 h-12 rounded-lg border border-yellow-400/20 bg-yellow-400/5 flex items-center justify-center mb-4 group-hover:bg-yellow-400/10 transition-colors">
                  {v.icon}
                </div>
                <h4 className="font-bold text-white text-base mb-2">{v.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
