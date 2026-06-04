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
    title: 'Una experiencia única',
    desc: 'Disfruta un proceso cómodo y cercano, diseñado para que aprender a conducir sea una experiencia memorable.',
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
    <section id="nosotros" className="py-24 relative overflow-hidden" style={{background:'rgba(13,13,13,0.7)'}}>
      {/* Decorative */}
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />

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
              En <strong className="text-white">Don Juanito Drivers</strong> hacemos que obtener tu licencia de conducción sea un proceso <strong className="text-yellow-400">sencillo, rápido y acompañado de principio a fin</strong>.
            </p>
            <p className="text-gray-400 text-base leading-relaxed mb-4">
              Conectamos a los estudiantes con las mejores opciones de formación, brindando <strong className="text-white">asesoría personalizada</strong> durante todo el proceso: desde la matrícula y los exámenes médicos hasta la programación de clases, exámenes y la expedición de la licencia.
            </p>
            <p className="text-gray-400 text-base leading-relaxed mb-4">
              Nuestro objetivo es ayudarte a encontrar la alternativa que mejor se adapte a tus necesidades, presupuesto y disponibilidad de tiempo, garantizando siempre un servicio <strong className="text-white">transparente, confiable y profesional</strong>.
            </p>
            <p className="text-gray-400 text-base leading-relaxed mb-4">
              Contamos con opciones para licencias de <strong className="text-white">moto, carro y categorías de servicio público</strong>, además de procesos de refrendación, recategorización y orientación en trámites relacionados con el RUNT y la movilidad.
            </p>
            <p className="text-gray-400 text-base leading-relaxed mb-2">
              Montones de conductores han confiado en nosotros para dar el primer paso hacia nuevas oportunidades laborales, mayor independencia y una mejor calidad de vida.
            </p>
            <p className="text-yellow-400/80 text-sm italic font-medium mb-8">
              Tu licencia, tu libertad, tu próximo destino.
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
