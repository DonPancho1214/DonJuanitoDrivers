import React, { useState } from 'react'
import { ClipboardList, Lock, BarChart, Scale } from 'lucide-react'

const sections = [
  {
    title: 'Términos y Condiciones',
    icon: <ClipboardList size={24} className="text-yellow-400" />,
    content: [
      'Al utilizar los servicios de Don Juanito Drivers, el usuario acepta los presentes Términos y Condiciones de forma íntegra y sin reservas.',
      'Don Juanito Drivers se reserva el derecho de modificar estos términos en cualquier momento, notificando los cambios a través de sus canales oficiales.',
      'Los servicios de formación vial ofrecidos están sujetos a disponibilidad y al cumplimiento de los requisitos legales establecidos por el Ministerio de Transporte de Colombia.',
      'El pago por los servicios debe realizarse conforme a los acuerdos establecidos entre las partes. No se realizarán devoluciones una vez iniciado el proceso de formación, salvo casos de fuerza mayor debidamente sustentados.',
      'El usuario se compromete a asistir puntualmente a sus clases programadas y a mantener un comportamiento respetuoso con instructores y demás estudiantes.',
    ]
  },
  {
    title: 'Política de Privacidad',
    icon: <Lock size={24} className="text-yellow-400" />,
    content: [
      'Don Juanito Drivers recopila datos personales únicamente con fines de prestación del servicio de formación vial y comunicación con el usuario.',
      'Los datos recolectados incluyen: nombre completo, número de teléfono, correo electrónico, número de documento de identidad y localidad de residencia.',
      'La información personal no será vendida, cedida ni compartida con terceros sin el consentimiento expreso del titular, salvo obligación legal.',
      'El titular de los datos tiene derecho a conocer, actualizar, rectificar y suprimir su información personal en cualquier momento, contactando a nuestro equipo en los canales disponibles.',
      'Don Juanito Drivers adopta medidas técnicas y organizativas para proteger los datos personales contra pérdida, acceso no autorizado o divulgación indebida.',
    ]
  },
  {
    title: 'Tratamiento de Datos',
    icon: <BarChart size={24} className="text-yellow-400" />,
    content: [
      'De conformidad con la Ley 1581 de 2012 y el Decreto 1377 de 2013, Don Juanito Drivers informa que es responsable del tratamiento de los datos personales recolectados.',
      'Los datos personales suministrados por el usuario serán tratados con las siguientes finalidades: gestión de agendamiento, envío de información sobre servicios, seguimiento del proceso de formación y comunicaciones comerciales (previa autorización).',
      'El usuario puede revocar su autorización para el tratamiento de datos en cualquier momento, sin que ello afecte la legalidad del tratamiento realizado antes de la revocación.',
      'Para ejercer sus derechos como titular de datos, puede contactarnos a través de nuestros canales de atención: WhatsApp o correo electrónico indicados en el sitio web.',
      'Las peticiones, consultas y reclamos relacionadas con el tratamiento de datos serán atendidas en un plazo máximo de quince (15) días hábiles.',
    ]
  },
  {
    title: 'Aviso Legal',
    icon: <Scale size={24} className="text-yellow-400" />,
    content: [
      'Don Juanito Drivers es una red de franquicias de escuelas de conducción legalmente constituida bajo las leyes de la República de Colombia.',
      'Cada sede afiliada opera bajo su propia razón social y es responsable de cumplir con la normativa vigente del Ministerio de Transporte y el Código Nacional de Tránsito.',
      'La información contenida en este sitio web tiene carácter meramente informativo y no constituye una oferta contractual vinculante, salvo que así se indique expresamente.',
      'Don Juanito Drivers no será responsable por daños y perjuicios derivados del uso incorrecto de la información publicada en este sitio web.',
      'Cualquier controversia derivada del uso de los servicios de Don Juanito Drivers se resolverá conforme a las leyes colombianas vigentes, con jurisdicción en la ciudad de Bogotá D.C.',
    ]
  },
]

export default function Legal() {
  const [open, setOpen] = useState(null)

  return (
    <section id="legal" className="py-20" style={{background:'rgba(13,13,13,0.7)'}}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="section-label mb-3">Legal</div>
          <h2 className="font-black text-white mb-3" style={{fontFamily:'Barlow Condensed', fontSize:'clamp(2rem,4vw,3rem)'}}>
            INFORMACIÓN <span className="text-yellow-400">LEGAL</span>
          </h2>
          <p className="text-gray-500 text-sm">Transparencia y confianza en cada servicio que ofrecemos.</p>
        </div>

        <div className="flex flex-col gap-3">
          {sections.map((s, i) => (
            <div key={s.title} className="glass-card overflow-hidden" style={{border:'1px solid rgba(250,204,21,0.1)'}}>
              <button
                className="w-full flex items-center justify-between p-5 text-left hover:bg-white/2 transition-colors"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{s.icon}</span>
                  <span className="font-bold text-white" style={{fontFamily:'Barlow Condensed', fontSize:'1.1rem'}}>{s.title}</span>
                </div>
                <svg
                  width="20" height="20" fill="none" stroke="#FACC15" strokeWidth="2" viewBox="0 0 24 24"
                  style={{transform: open === i ? 'rotate(180deg)' : 'rotate(0)', transition:'transform 0.3s'}}
                >
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </button>

              {open === i && (
                <div className="px-5 pb-5 border-t border-white/5">
                  <ol className="flex flex-col gap-3 mt-4">
                    {s.content.map((c, j) => (
                      <li key={j} className="flex gap-3 text-gray-400 text-sm leading-relaxed">
                        <span className="text-yellow-400 font-bold shrink-0 mt-0.5">{j+1}.</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
