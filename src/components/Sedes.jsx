import React, { useState } from 'react'
import { motion } from 'framer-motion'
import SedeDetalle from './SedeDetalle'
import { Star, MapPin, Wallet, AlertTriangle, CreditCard, Clock } from 'lucide-react'
// Sistema round-robin centralizado — distribye clicks entre asesores
import { abrirWhatsApp } from '../utils/whatsapp'

export const sedes = [
  {
    id: 'diverplaza',
    nombre: 'CEA Diverplaza',
    bookingKey: 'CEA Diverplaza (Sede Principal)',
    subtitulo: 'Calle 80 • Álamos',
    direccion: 'Cra. 100 #72-19, Bogotá',
    horarios: 'Lun–Sáb: 7am – 6pm',
    categorias: ['A2', 'B1', 'C1'],
    destacada: true,
    mapsUrl: 'https://maps.app.goo.gl/5z8N3A2kvNCTtgmp9',
    alertas: [
      <span key="p" className="flex items-center gap-1"><Star size={12} className="fill-[#D4AF37] text-[#D4AF37]" /> Sede Principal — Acompañamiento Integral</span>,
      <span key="c" className="flex items-center gap-1"><CreditCard size={12} /> Financiación con Addi, Sistecrédito y Plan Turbo</span>
    ],
    descripcion: 'Sede principal de Don Juanito Drivers. Brinda acompañamiento integral y asesoría personalizada a lo largo de todo el proceso de formación y certificación ante el RUNT. Dispone de beneficios exclusivos como financiación mediante Addi y Sistecrédito, modalidad Plan Turbo y un descuento preferencial de hasta $50.000 COP en pago de contado.',
  },
  {
    id: 'conductores',
    nombre: 'Conductores Bogotá',
    subtitulo: 'Chapinero',
    direccion: 'Cl. 71 #14a-14, Bogotá',
    horarios: 'Lun–Vie: 8am – 5pm',
    categorias: ['A2', 'B1', 'C1', 'C2'],
    destacada: false,
    mapsUrl: 'https://maps.app.goo.gl/RKB3fmzkve582yny5',
    alertas: [<span key="c2" className="flex items-center gap-1"><Star size={12} className="fill-yellow-400" /> Única sede que ofrece categoría C2 (Camión)</span>],
    descripcion: 'Conductores Bogotá en Chapinero es la única sede de la red con habilitación para categoría C2 (camiones de pacha sencilla, máx. 4h prácticas diarias). Cita previa obligatoria de matrícula bajo Camilo Velandia.',
    horas: { A2: '13 clases teoría (26h) + 4h taller', B1: '13 clases teoría (26h) + 6h taller', C1: '15 clases teoría (30h) + 6h taller', C2: '10 clases teoría (20h) + 10h taller' },
  },
  {
    id: 'velari',
    nombre: 'CEA Velari',
    subtitulo: 'Calle 100',
    direccion: 'Av. Calle 100 #60d-05 / 65, Barrio Rincón de los Andes, Bogotá',
    horarios: 'Lun–Sáb: 7am – 5pm',
    categorias: ['A2', 'B1', 'C1'],
    destacada: false,
    mapsUrl: 'https://maps.app.goo.gl/zKNmvj8DbRLrHryg8',
    alertas: [<span key="ces" className="flex items-center gap-1"><Star size={12} className="fill-yellow-400" /> Única que acepta Fondo de Cesantías</span>],
    descripcion: 'CEA Velari es la única escuela de la red autorizada para recibir pagos con Fondos de Cesantías. Cita previa obligatoria de matrícula bajo Camilo Velandia.',
  },
  {
    id: 'guerrero',
    nombre: 'El Agente Guerrero',
    subtitulo: 'Kennedy / Venecia',
    direccion: 'Autopista Sur #54-55 / Cl. 45A Sur #54A-55 Piso 2, Bogotá',
    horarios: 'Lun–Sáb: 8am – 5pm',
    categorias: ['A2', 'B1', 'C1'],
    destacada: false,
    mapsUrl: 'https://maps.app.goo.gl/MKqU6SqW65Nzav3G7',
    alertas: [],
    descripcion: 'CEA El Agente Guerrero, ubicado estratégicamente en el sector de Kennedy y Venecia sobre la Autopista Sur. Cita previa obligatoria de matrícula bajo Camilo Velandia.',
  },
  {
    id: 'autoxua',
    nombre: 'CEA Auto Xua',
    subtitulo: 'Soacha Parque',
    direccion: 'Cl. 12 #8A-01, Soacha Parque',
    horarios: 'Lun–Sáb: 8am – 6pm',
    categorias: ['A2', 'B1', 'C1'],
    destacada: false,
    mapsUrl: 'https://maps.app.goo.gl/wbUXngZHbEX5voTB9',
    alertas: [<span key="hom" className="flex items-center gap-1"><AlertTriangle size={12} className="text-amber-500" /> Política Estricta: Cero Homologaciones</span>],
    descripcion: 'CEA Auto Xua en Soacha Parque. Política estricta: NO se permiten homologaciones. Todos los estudiantes deben realizar el curso completo obligatorio (teoría, talleres y prácticas). Cita previa obligatoria bajo Camilo Velandia.',
  },
  {
    id: 'carvajal',
    nombre: 'CEA Carvajal',
    subtitulo: 'Primera de Mayo',
    direccion: 'Carrera 71D, Cl. 20 Sur #8 Piso 4, Bogotá',
    horarios: 'Lun–Sáb: 8am – 5pm',
    categorias: ['A2', 'B1', 'C1'],
    destacada: false,
    mapsUrl: 'https://maps.app.goo.gl/nz5h39ry5xrn19Rm8',
    alertas: [<span key="pyc" className="flex items-center gap-1"><AlertTriangle size={12} className="text-amber-500" /> Modalidad Pico y Cédula en clases teóricas</span>],
    descripcion: 'CEA Carvajal en la Primera de Mayo. El ingreso a clases teóricas es alternado por último dígito de cédula (pares e impares). Cita previa obligatoria de matrícula bajo Camilo Velandia.',
  },
  {
    id: 'altimon',
    nombre: 'CEA Al Timón',
    subtitulo: 'Bosa',
    direccion: 'Calle 65D Sur #79C-24/26, Barrio Bosa, Bogotá',
    horarios: 'Lun–Vie: 7am – 5pm',
    categorias: ['A2', 'B1', 'C1'],
    destacada: false,
    mapsUrl: 'https://maps.app.goo.gl/uUb3xfnHDMy3GVf27',
    alertas: [],
    descripcion: 'CEA Al Timón en el sector de Bosa. Cuenta con excelentes instalaciones y fácil acceso. Cita previa obligatoria de matrícula bajo Camilo Velandia.',
  },
  {
    id: 'valuvial',
    nombre: 'CEA Valuvial',
    subtitulo: 'Ciudad Bolívar',
    direccion: 'Carrera 19D #63-18 Sur Piso 2, Barrio San Francisco, Bogotá',
    horarios: 'Lun–Sáb: 8am – 6pm',
    categorias: ['A2', 'B1', 'C1'],
    destacada: false,
    mapsUrl: 'https://maps.app.goo.gl/w4wC9dHfGGedq3ha7',
    alertas: [<span key="afo" className="flex items-center gap-1"><AlertTriangle size={12} className="text-amber-500" /> Aforo: Máximo 4h de teoría al día</span>],
    descripcion: 'CEA Valuvial en Ciudad Bolívar. Maneja un límite de aforo de máximo 4 horas de clase teórica al día por estudiante. Cita previa obligatoria de matrícula bajo Camilo Velandia.',
  },
  {
    id: 'centrosuba',
    nombre: 'CEA Centro Suba',
    subtitulo: 'Suba',
    direccion: 'Calle 145 #91-19 Local 110, Bogotá',
    horarios: 'Lun–Sáb: 7am – 5pm',
    categorias: ['A2', 'B1', 'C1'],
    destacada: false,
    mapsUrl: 'https://maps.app.goo.gl/w47g6RkKX2ERxFvL9',
    alertas: [],
    descripcion: 'CEA Centro Suba en la zona norte de Bogotá, moderna y con excelente ubicación. Cita previa obligatoria de matrícula bajo Camilo Velandia.',
  },
]

const WA_ICON = <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>

const ZONAS = {
  conductores: { nombre: 'Norte', clase: 'bg-sky-500/10 text-sky-400 border-sky-500/20' },
  velari: { nombre: 'Norte', clase: 'bg-sky-500/10 text-sky-400 border-sky-500/20' },
  guerrero: { nombre: 'Sur', clase: 'bg-orange-500/10 text-orange-400 border-orange-500/20' },
  autoxua: { nombre: 'Soacha', clase: 'bg-gray-500/10 text-gray-400 border-gray-500/20' },
  carvajal: { nombre: 'Occidente', clase: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
  altimon: { nombre: 'Sur', clase: 'bg-orange-500/10 text-orange-400 border-orange-500/20' },
  valuvial: { nombre: 'Sur', clase: 'bg-orange-500/10 text-orange-400 border-orange-500/20' },
  centrosuba: { nombre: 'Norte', clase: 'bg-sky-500/10 text-sky-400 border-sky-500/20' },
}

function getColombiaTime() {
  const now = new Date()
  const options = {
    timeZone: 'America/Bogota',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false
  }
  const formatter = new Intl.DateTimeFormat('en-US', options)
  const parts = formatter.formatToParts(now)
  const getPart = (type) => parseInt(parts.find(p => p.type === type).value, 10)
  
  const weekdayOptions = { timeZone: 'America/Bogota', weekday: 'short' }
  const weekdayFormatter = new Intl.DateTimeFormat('en-US', weekdayOptions)
  const weekday = weekdayFormatter.format(now)

  return {
    hour: getPart('hour'),
    minute: getPart('minute'),
    day: weekday
  }
}

function isSedeOpen(horariosStr) {
  try {
    const colTime = getColombiaTime()
    const day = colTime.day
    const hour = colTime.hour
    const minute = colTime.minute

    const dayMap = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }
    const currentDayNum = dayMap[day]

    if (currentDayNum === 0 || currentDayNum === undefined) {
      return false
    }

    const cleanStr = horariosStr.replace(/–/g, '-').replace(/\s+/g, '')
    const [daysPart, hoursPart] = cleanStr.split(':')
    
    let maxDayNum = 5 // Default: Vie
    if (daysPart.includes('Sáb') || daysPart.includes('Sab')) {
      maxDayNum = 6
    }

    if (currentDayNum > maxDayNum) {
      return false
    }

    const [startPart, endPart] = hoursPart.split('-')
    
    const parseHour = (part) => {
      const match = part.match(/^(\d+)(am|pm)$/i)
      if (!match) return 0
      let h = parseInt(match[1], 10)
      const ampm = match[2].toLowerCase()
      if (ampm === 'pm' && h < 12) h += 12
      if (ampm === 'am' && h === 12) h = 0
      return h
    }

    const startHour = parseHour(startPart)
    const endHour = parseHour(endPart)

    const currentFractionalHour = hour + (minute / 60)

    return currentFractionalHour >= startHour && currentFractionalHour < endHour
  } catch (e) {
    console.error('Error parsing schedules:', e)
    return false
  }
}

function SedeCard({ sede, onVerMas, index = 0 }) {
  // Mensaje prellenado con el nombre de cada sede
  const waMsg = `Hola quiero información sobre la sede ${sede.nombre}`
  const isOpen = isSedeOpen(sede.horarios)

  if (sede.destacada) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="md:col-span-2 lg:col-span-2 relative overflow-hidden rounded-2xl card-hover"
        style={{ background: 'linear-gradient(135deg, #1a1500 0%, #1f1800 50%, #0a0a00 100%)', border: '2px solid #D4AF37', boxShadow: '0 0 60px rgba(212,175,55,0.18)' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 30% 30%, rgba(212,175,55,0.08) 0%, transparent 70%)' }} />
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600" />
        <div className="p-7 sm:p-8 relative">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full mb-4 font-bold text-xs tracking-widest uppercase"
            style={{ background: 'rgba(212,175,55,0.15)', border: '1px solid rgba(212,175,55,0.5)', color: '#D4AF37', fontFamily: 'Barlow Condensed' }}>
            <Star size={13} className="inline mr-1 fill-yellow-400" /> SEDE PRINCIPAL
          </div>
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            <div className="flex-1">
              <h3 className="font-black text-white mb-1" style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.9rem' }}>{sede.nombre}</h3>
              <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-wider mb-4">{sede.subtitulo}</p>
              
              <div className="flex flex-col gap-2 mb-5">
                <div className="flex items-center gap-2 text-gray-300 text-sm">
                  <MapPin size={15} className="text-yellow-400 shrink-0" />
                  <span>{sede.direccion}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300 text-sm">
                  <Clock size={15} className="text-yellow-400 shrink-0" />
                  <span>{sede.horarios}</span>
                  <span className="inline-flex items-center gap-1.5 ml-2 text-xs font-semibold">
                    {isOpen ? (
                      <>
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <span className="text-emerald-400 font-bold">Abierta ahora</span>
                      </>
                    ) : (
                      <>
                        <span className="h-2 w-2 rounded-full bg-red-400"></span>
                        <span className="text-gray-400">Cerrada</span>
                      </>
                    )}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {sede.categorias.map(c => (
                  <span key={c} className="px-3 py-1 rounded font-black text-xs"
                    style={{ background: 'rgba(212,175,55,0.15)', border: '1px solid rgba(212,175,55,0.4)', color: '#D4AF37', fontFamily: 'Barlow Condensed' }}>{c}</span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <button onClick={() => onVerMas(sede)} className="btn-yellow text-sm font-extrabold flex items-center gap-2 cursor-pointer shadow-md hover:brightness-105 active:scale-[0.98]">
                  <span>Ver Precios y Cupos</span>
                  <span>→</span>
                </button>
                <button type="button" onClick={() => abrirWhatsApp(waMsg)} className="btn-outline text-sm flex items-center gap-1.5 text-white border-white/30 hover:border-yellow-400">
                  {WA_ICON} <span>WhatsApp</span>
                </button>
                <a href={sede.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-outline text-sm flex items-center gap-1.5 text-white border-white/30 hover:border-yellow-400">
                  <MapPin size={14} className="text-[#D4AF37]" /> <span>Cómo llegar</span>
                </a>
              </div>
            </div>
            <div className="hidden md:flex items-center justify-center w-32 h-32 rounded-full border-2 border-yellow-400/30 animate-float shrink-0">
              <svg width="56" height="56" viewBox="0 0 64 64" fill="none">
                <path d="M32 8l4 12h12l-10 7 4 12-10-7-10 7 4-12-10-7h12z" stroke="#D4AF37" strokeWidth="2" fill="rgba(212,175,55,0.1)" />
              </svg>
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  const zona = ZONAS[sede.id]

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-200/90 hover:border-[#D4AF37] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* Top Header: Lugar & Zona */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-1.5 text-[#B38728] text-xs font-bold uppercase tracking-wider">
            <MapPin size={13} className="text-[#B38728] shrink-0" />
            <span>{sede.subtitulo}</span>
          </div>
          {zona && (
            <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider border ${zona.clase}`}>
              {zona.nombre}
            </span>
          )}
        </div>

        {/* Nombre Sede */}
        <h3 className="font-extrabold text-gray-900 text-xl mb-3 tracking-tight group-hover:text-amber-900 transition-colors" style={{ fontFamily: "'Outfit', sans-serif" }}>
          {sede.nombre}
        </h3>

        {/* Dirección y Horarios */}
        <div className="flex flex-col gap-2 mb-4 pb-4 border-b border-gray-100 text-xs">
          <div className="flex items-start gap-2 text-gray-600 font-medium">
            <span className="text-gray-400 shrink-0 mt-0.5">•</span>
            <span className="line-clamp-1">{sede.direccion}</span>
          </div>
          <div className="flex items-center justify-between gap-2 text-gray-600 font-medium">
            <div className="flex items-center gap-1.5">
              <Clock size={13} className="text-gray-400 shrink-0" />
              <span>{sede.horarios}</span>
            </div>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold">
              {isOpen ? (
                <>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-emerald-700 font-bold">Abierta</span>
                </>
              ) : (
                <>
                  <span className="h-1.5 w-1.5 rounded-full bg-gray-400"></span>
                  <span className="text-gray-400">Cerrada</span>
                </>
              )}
            </span>
          </div>
        </div>

        {/* Categorías */}
        <div className="flex flex-wrap items-center gap-1.5 mb-5">
          <span className="text-[11px] text-gray-400 font-semibold mr-1">Cursos:</span>
          {sede.categorias.map(c => (
            <span key={c} className="px-2 py-0.5 rounded-md text-xs font-bold bg-amber-50 text-amber-900 border border-amber-200/70"
              style={{ fontFamily: 'Barlow Condensed' }}>
              {c}
            </span>
          ))}
        </div>
      </div>

      {/* Botones de Acción (Atractivos para la compra) */}
      <div className="flex flex-col gap-2 pt-2">
        <button
          onClick={() => onVerMas(sede)}
          className="w-full py-2.5 px-4 rounded-xl font-extrabold text-xs sm:text-sm text-gray-950 bg-gradient-to-r from-[#D4AF37] via-[#E8C252] to-[#B89020] hover:brightness-105 active:scale-[0.98] shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Ver Precios y Cupos</span>
          <span className="text-base font-bold leading-none">→</span>
        </button>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => abrirWhatsApp(waMsg)}
            className="flex-1 py-2 px-3 rounded-xl font-semibold text-xs text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 transition-colors flex items-center justify-center gap-1.5"
          >
            {WA_ICON}
            <span>WhatsApp</span>
          </button>
          <a
            href={sede.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2 px-3 rounded-xl font-semibold text-xs text-gray-600 bg-gray-50 hover:bg-gray-100 border border-gray-200 transition-colors flex items-center justify-center gap-1"
            title="Cómo llegar"
          >
            <MapPin size={13} className="text-[#B38728]" />
            <span>Ubicación</span>
          </a>
        </div>
      </div>
    </motion.div>
  )
}

export default function Sedes() {
  const [sedeSeleccionada, setSedeSeleccionada] = useState(null)
  const principal = sedes.filter(s => s.destacada)
  const otras = sedes.filter(s => !s.destacada)

  return (
    <>
      <section id="sedes" className="py-24 relative" style={{ background: 'rgba(255,255,255,0.7)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-16"
          >
            <div className="section-label mb-3">Nuestras sedes</div>
            <h2 className="font-black text-gray-900 mb-4" style={{ fontFamily: 'Barlow Condensed', fontSize: 'clamp(2.5rem,5vw,4rem)' }}>
              ENCUENTRA TU <span className="font-black text-gold-outline">SEDE MÁS CERCANA</span>
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto text-base">
              9 sedes activas en Bogotá y Soacha. Agendamiento previo requerido para todas las escuelas.
            </p>
          </motion.div>

          {/* Info banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8 p-3.5 sm:p-4 rounded-xl flex flex-wrap gap-2.5 sm:gap-3 items-center justify-center text-xs sm:text-sm bg-white border border-[#D4AF37]/50 shadow-sm text-center"
          >
            <span className="text-gray-900 font-bold flex items-center gap-1.5" style={{ fontFamily: 'Barlow Condensed' }}>
              <CreditCard size={16} className="text-[#B38728]" /> Métodos de pago:
            </span>
            <span className="text-gray-700 font-medium">
              Efectivo · Transferencia · Addi · Sistecrédito · Cesantías
            </span>
            <span className="hidden sm:inline text-gray-300">|</span>
            <span className="text-xs text-amber-900/90 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20 font-medium">
              * Los métodos de pago y financiación dependen de cada escuela
            </span>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {principal.map(s => <SedeCard key={s.id} sede={s} onVerMas={setSedeSeleccionada} />)}
            {/* Brand card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="hidden md:flex relative overflow-hidden rounded-2xl flex-col items-center justify-center text-center p-6 gap-2"
              style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #171717 100%)', border: '1.5px solid rgba(212,175,55,0.3)', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}
            >
              {/* Glow ambiental */}
              <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 35%, rgba(250,204,21,0.12) 0%, transparent 70%)' }} />
              <div className="relative z-10 flex flex-col items-center gap-2">
                <img
                  src="/nuevo-logo.webp"
                  alt="Don Juanito Drivers"
                  width="220" height="220" loading="lazy"
                  className="animate-float"
                  style={{ width: '220px', height: 'auto', filter: 'drop-shadow(0 0 22px rgba(250,204,21,0.50))' }}
                />
                <p className="text-gray-400 text-xs max-w-[160px] leading-relaxed" style={{ marginTop: '4px' }}>
                  Tu red de confianza para obtener la licencia de conducción
                </p>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {otras.map((s, i) => <SedeCard key={s.id} sede={s} index={i} onVerMas={setSedeSeleccionada} />)}
          </div>
        </div>
      </section>

      {sedeSeleccionada && <SedeDetalle sede={sedeSeleccionada} onClose={() => setSedeSeleccionada(null)} />}
    </>
  )
}
