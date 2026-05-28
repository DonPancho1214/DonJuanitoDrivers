import React from 'react'
import { MapPin, IdCard } from 'lucide-react'
// Sistema round-robin centralizado
import { abrirWhatsApp } from '../utils/whatsapp'

// Mensaje específico para consultas de CRC/Renovación
const MSG_CRC = 'Hola quiero información sobre renovación de licencia / CRC en Medimetria.'

export default function CRC() {
  return (
    <section id="crc" className="py-24 relative overflow-hidden" style={{ background: 'rgba(13,13,13,0.65)' }}>
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(250,204,21,0.06) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-14">
          <div className="section-label mb-3">CRC & Renovaciones</div>
          <h2 className="font-black text-white mb-4" style={{ fontFamily: 'Barlow Condensed', fontSize: 'clamp(2.5rem,5vw,4rem)' }}>
            RENOVACIÓN DE <span className="text-yellow-400">LICENCIA</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Realizamos tu reconocimiento médico (CRC) en nuestro centro aliado para que renueves tu licencia de conducción de forma rápida y segura.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Info card */}
          <div className="glass-card p-8 relative overflow-hidden" style={{ border: '1px solid rgba(250,204,21,0.2)' }}>
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />

            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl border border-yellow-400/30 bg-yellow-400/5 flex items-center justify-center text-2xl">🏥</div>
              <div>
                <h3 className="font-black text-white text-xl" style={{ fontFamily: 'Barlow Condensed' }}>Medimetria Especializada Ltda.</h3>
                <p className="text-yellow-400/70 text-xs uppercase tracking-wider">Centro de reconocimiento de conductores</p>
              </div>
            </div>

            <div className="flex flex-col gap-4 mb-6">
              <div className="flex items-start gap-3 p-3.5 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <svg className="text-yellow-400 shrink-0 mt-0.5" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
                <div>
                  <div className="text-gray-500 text-xs uppercase tracking-wider mb-0.5">Dirección</div>
                  <div className="text-gray-200 text-sm">Calle 68 # 23-17, Bogotá</div>
                </div>
              </div>
              <a href="https://share.google/sUKKsdLbu2x9QwkTf" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-yellow-400 text-sm hover:underline px-3.5 py-2.5 rounded-xl transition-all"
                style={{ background: 'rgba(250,204,21,0.06)', border: '1px solid rgba(250,204,21,0.15)' }}>
                <MapPin size={16} className="inline mr-1" /> Ver en Google Maps
              </a>

              <div className="p-3.5 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="text-gray-500 text-xs uppercase tracking-wider mb-2">Horarios de atención</div>
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Lunes a Viernes</span>
                    <span className="text-yellow-400 font-semibold">8:00am – 4:30pm</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Sábados</span>
                    <span className="text-yellow-400 font-semibold">8:00am – 12:30pm</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Domingos</span>
                    <span className="text-gray-500">No abre</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Botón que usa round-robin para consultas de CRC */}
            <button
              type="button"
              onClick={() => abrirWhatsApp(MSG_CRC)}
              className="btn-yellow w-full justify-center rounded-lg"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              Consultar por WhatsApp
            </button>
          </div>

          {/* Prices */}
          <div className="flex flex-col gap-4">
            <h3 className="font-black text-white text-xl" style={{ fontFamily: 'Barlow Condensed' }}>Tarifas de Renovación</h3>

            {[
              { tipo: 'Licencia individual', precio: '$190.000', desc: 'Una sola categoría de licencia', icon: <IdCard size={28} className="text-yellow-400" /> },
              { tipo: 'Doble categoría', precio: '$290.000', desc: 'Dos categorías en un solo reconocimiento', icon: <div className="flex gap-1.5"><IdCard size={28} className="text-yellow-400" /><IdCard size={28} className="text-yellow-400" /></div> },
            ].map(item => (
              <div key={item.tipo} className="glass-card card-hover p-6 flex items-center gap-5"
                style={{ border: '1px solid rgba(250,204,21,0.15)' }}>
                <div className="text-3xl">{item.icon}</div>
                <div className="flex-1">
                  <div className="font-black text-white text-lg" style={{ fontFamily: 'Barlow Condensed' }}>{item.tipo}</div>
                  <div className="text-gray-400 text-sm">{item.desc}</div>
                </div>
                <div className="text-yellow-400 font-black text-2xl" style={{ fontFamily: 'Barlow Condensed' }}>{item.precio}</div>
              </div>
            ))}

            {/* Process steps */}
            <div className="glass-card p-6 mt-2" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
              <h4 className="font-bold text-white mb-4" style={{ fontFamily: 'Barlow Condensed', fontSize: '1.1rem' }}>
                ¿Cómo funciona?
              </h4>
              {[
                { n: '1', t: 'Contáctanos', d: 'Escríbenos por WhatsApp para coordinar tu cita.' },
                { n: '2', t: 'Visita Medimetria', d: 'Ve al centro CRC en Calle 68 # 23-17 en el horario indicado.' },
                { n: '3', t: 'Examen médico', d: 'El reconocimiento incluye exámenes visuales, auditivos y psicofísicos.' },
                { n: '4', t: 'Renueva tu licencia', d: 'Con el CRC aprobado, tramita tu renovación en el RUNT.' },
              ].map(step => (
                <div key={step.n} className="flex items-start gap-3 mb-3 last:mb-0">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-black"
                    style={{ background: 'rgba(250,204,21,0.15)', border: '1px solid rgba(250,204,21,0.4)', color: '#FACC15', fontFamily: 'Barlow Condensed' }}>
                    {step.n}
                  </div>
                  <div>
                    <div className="text-white text-sm font-semibold">{step.t}</div>
                    <div className="text-gray-500 text-xs">{step.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
