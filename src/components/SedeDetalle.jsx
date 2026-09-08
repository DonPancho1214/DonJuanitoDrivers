import React from 'react'
import { Navigation, Clock, Bike, Car, Bus, Truck, Wallet, Lightbulb, MapPin, CalendarDays, Star, ClipboardList, CheckCircle2 } from 'lucide-react'
// Sistema round-robin centralizado
import { abrirWhatsApp } from '../utils/whatsapp'
// Precios dinámicos desde Supabase
import { usePrecios } from '../hooks/usePrecios'

// PriceRow: label izquierda, valor derecha
function PriceRow({ label, value, highlight, indent }) {
  return (
    <div className="flex justify-between items-center py-1.5 border-b border-gray-100 last:border-0">
      <span className={`text-sm ${indent ? 'pl-4 text-gray-500 text-xs font-medium' : 'text-gray-700'}`}>{label}</span>
      <span className={`font-black text-sm ${highlight ? 'text-[#B38728] font-bold' : 'text-gray-900'}`}
        style={{ fontFamily: "'Outfit', sans-serif" }}>{value}</span>
    </div>
  )
}

function PreciosBlock({ precios, combos, nota }) {
  if (!precios) return null
  const cats = Object.keys(precios)

  return (
    <div className="space-y-3">
      {cats.map(cat => {
        const p = precios[cat]
        return (
          <div key={cat} className="rounded-xl overflow-hidden"
            style={{ background: '#f9fafb', border: '1px solid #e5e7eb' }}>
            <div className="px-4 py-2 flex items-center gap-2"
              style={{ background: '#0a0a0a', borderBottom: '1px solid #D4AF37' }}>
              <span className="text-[#F5C518] font-black text-sm" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Categoría {cat}
              </span>
            </div>
            <div className="px-4 py-1">
              {Object.entries(p).map(([key, val]) => (
                <PriceRow 
                  key={key} 
                  label={key.startsWith('↳') ? key : key} 
                  value={val} 
                  highlight={key.includes('CONTADO')} 
                  indent={key.includes('CONTADO')} 
                />
              ))}
            </div>
          </div>
        )
      })}

      {/* Combos */}
      {combos?.length > 0 && (
        <div className="rounded-xl overflow-hidden"
          style={{ background: '#f9fafb', border: '1px solid #e5e7eb' }}>
          <div className="px-4 py-2"
            style={{ background: '#0a0a0a', borderBottom: '1px solid #D4AF37' }}>
            <span className="text-[#F5C518] font-black text-sm flex items-center gap-1.5" style={{ fontFamily: "'Outfit', sans-serif" }}>
              <Lightbulb size={14} className="text-[#F5C518]" /> Combos
            </span>
          </div>
          <div className="px-4 py-1">
            {combos.map((c, i) => (
              <div key={i} className="mb-2 last:mb-0 border-b border-gray-100 pb-2 last:border-0 last:pb-0">
                <div className="text-gray-900 font-bold text-sm pt-1 pb-1">{c.nombre}</div>
                {c.precios && Object.entries(c.precios).map(([key, val]) => (
                  <PriceRow 
                    key={key} 
                    label={key.startsWith('↳') ? key : key} 
                    value={val} 
                    highlight={key.includes('CONTADO')} 
                    indent={key.includes('CONTADO')} 
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {nota && (
        <div className="text-xs text-yellow-400/70 text-center pt-1 px-2">{nota}</div>
      )}
    </div>
  )
}

export default function SedeDetalle({ sede, onClose }) {
  if (!sede) return null

  // Carga precios dinámicos desde Supabase
  const { precios: preciosRaw, loading: preciosLoading, error: preciosError } = usePrecios(sede.nombre)

  // Transforma los datos de Supabase al formato que usa PreciosBlock
  const preciosFormateados = {}
  const combosFormateados = []

  if (preciosRaw) {
    preciosRaw.forEach(row => {
      // Ocultar visualmente la modalidad SIN PRACTICAS en el modal
      if (row.modalidad.toUpperCase().includes('SIN PRACTICA')) return

      const isCombo = row.categoria.includes('/')
      const precioStr = `$${row.precio.toLocaleString('es-CO')}`
      const contadoStr = `$${(row.precio - 50000).toLocaleString('es-CO')}`

      // Cambiar visualmente 'CON PRACTICAS' a 'CURSO COMPLETO'
      let displayModalidad = row.modalidad
      if (displayModalidad.toUpperCase() === 'CON PRACTICAS') {
        displayModalidad = 'CURSO COMPLETO'
      }

      if (isCombo) {
        const nombreCombo = row.categoria.replace('/', ' + ')
        let combo = combosFormateados.find(c => c.nombre === nombreCombo)
        if (!combo) {
          combo = { nombre: nombreCombo, precios: {} }
          combosFormateados.push(combo)
        }
        combo.precios[displayModalidad] = precioStr
        combo.precios[displayModalidad + ' DE CONTADO'] = contadoStr
      } else {
        if (!preciosFormateados[row.categoria]) preciosFormateados[row.categoria] = {}
        preciosFormateados[row.categoria][displayModalidad] = precioStr
        preciosFormateados[row.categoria][displayModalidad + ' DE CONTADO'] = contadoStr
      }
    })
  }

  // Mensaje prellenado con el nombre de la sede específica
  const waMsg = `Hola quiero información sobre la sede ${sede.nombre}`

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(10px)' }}
      onClick={onClose}>
      <div className="relative w-full max-w-2xl rounded-2xl overflow-hidden animate-fade-in-up"
        style={{
          background: '#ffffff',
          border: '1.5px solid rgba(217, 119, 6, 0.35)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          maxHeight: '90vh', overflowY: 'auto',
        }}
        onClick={e => e.stopPropagation()}>

        <div className="h-1.5 w-full" style={{ background: 'linear-gradient(90deg, #FACC15, #f59e0b, #FACC15)' }} />

        <div className="sticky top-4 z-50 w-full flex justify-end px-4 pointer-events-none h-0">
          <button onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all pointer-events-auto hover:bg-gray-200"
            style={{ background: '#f3f4f6', border: '1px solid #e5e7eb', color: '#374151' }}
            aria-label="Cerrar">
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="p-7">
          {sede.destacada && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 text-xs font-bold tracking-widest uppercase"
              style={{ background: '#0a0a0a', border: '1px solid #D4AF37', color: '#F5C518', fontFamily: 'Barlow Condensed' }}>
              <Star size={14} className="inline mr-1 fill-[#F5C518] text-[#F5C518]" /> SEDE PRINCIPAL — ACOMPAÑAMIENTO TOTAL
            </div>
          )}

          {sede.alertas?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {sede.alertas.map((a, i) => (
                <div key={i} className="px-3 py-1.5 rounded-lg text-xs font-bold"
                  style={{ background: '#0a0a0a', border: '1px solid #D4AF37', color: '#F5C518' }}>
                  {a}
                </div>
              ))}
            </div>
          )}

          <h2 className="font-black text-gray-900 mb-0.5" style={{ fontFamily: 'Barlow Condensed', fontSize: '2.2rem' }}>
            {sede.nombre}
          </h2>
          <p className="text-[#B38728] text-sm font-bold uppercase tracking-widest mb-5">{sede.subtitulo}</p>

          {/* Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            <div className="flex-1 p-4 rounded-xl flex items-start gap-3" style={{ background: '#f9fafb', border: '1px solid #e5e7eb' }}>
              <MapPin className="text-[#D4AF37] shrink-0 mt-0.5" size={18} />
              <div>
                <div className="text-gray-500 text-xs uppercase tracking-wider mb-1 font-semibold">Dirección</div>
                <div className="text-gray-900 font-semibold text-sm">{sede.direccion}</div>
              </div>
            </div>
            <div className="flex-1 p-4 rounded-xl flex items-start gap-3" style={{ background: '#f9fafb', border: '1px solid #e5e7eb' }}>
              <CalendarDays className="text-[#D4AF37] shrink-0 mt-0.5" size={18} />
              <div>
                <div className="text-gray-500 text-xs uppercase tracking-wider mb-1 font-semibold">Horarios</div>
                {sede.horariosUrl
                  ? <a href={sede.horariosUrl} target="_blank" rel="noopener noreferrer" className="text-[#B38728] font-bold text-sm hover:underline">Ver horarios →</a>
                  : <div className="text-gray-900 font-semibold text-sm">{sede.horarios}</div>
                }
              </div>
            </div>
          </div>

          {/* Descripción */}
          <div className="p-4 rounded-xl mb-5" style={{ background: '#fefce8', border: '1px solid rgba(212,175,55,0.4)' }}>
            <div className="text-gray-900 font-bold text-xs uppercase tracking-wider mb-2">Sobre esta sede</div>
            <p className="text-gray-700 text-sm leading-relaxed">{sede.descripcion}</p>
          </div>

          {/* Horas intensidad */}
          {sede.horas && (
            <div className="mb-5">
              <div className="text-gray-500 text-xs uppercase tracking-wider mb-3 font-semibold">Intensidad por categoría</div>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(sede.horas).map(([cat, h]) => (
                  <div key={cat} className="p-3 rounded-lg"
                    style={{ background: '#f9fafb', border: '1px solid #e5e7eb' }}>
                    <span className="text-[#B38728] font-black text-sm" style={{ fontFamily: 'Barlow Condensed' }}>{cat}</span>
                    <p className="text-gray-600 text-xs mt-0.5 font-medium">{h}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Categorías */}
          <div className="mb-5">
            <div className="text-gray-500 text-xs uppercase tracking-wider mb-3 font-semibold">Categorías disponibles</div>
            <div className="flex flex-wrap gap-2">
              {sede.categorias.map(c => {
                const info = {
                  A2: { label: 'Motocicletas +125cc', icon: <Bike size={16} /> },
                  B1: { label: 'Vehículos part.', icon: <Car size={16} /> },
                  C1: { label: 'Serv. público', icon: <Bus size={16} /> },
                  C2: { label: 'Vehículo especial', icon: <Truck size={16} /> },
                }[c] || {}
                return (
                  <div key={c} className="flex items-center gap-2 px-3 py-2 rounded-lg"
                    style={{ background: '#f9fafb', border: '1px solid rgba(212,175,55,0.35)' }}>
                    <span className="text-[#B38728]">{info.icon}</span>
                    <span className="text-gray-900 font-black text-sm" style={{ fontFamily: 'Barlow Condensed' }}>{c}</span>
                    <span className="text-gray-700 text-xs font-medium">{info.label}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Mensaje de Pago */}
          <div className="p-4 rounded-xl mb-5 flex items-center gap-3" 
            style={{ background: '#fefce8', border: '1.5px dashed #D4AF37' }}>
            <div className="shrink-0 bg-amber-100 p-2 rounded-full">
              <Lightbulb className="text-[#B38728]" size={24} />
            </div>
            <p className="text-gray-900 text-sm font-semibold leading-relaxed">
              Puedes iniciar con el <span className="text-[#B38728] font-bold">50% del valor total</span> del curso o <span className="text-[#B38728] font-bold">pagar de contado</span> te saldrá más barato.
            </p>
          </div>

          {/* Precios */}
          <div className="mb-6">
            <div className="text-gray-500 text-xs uppercase tracking-wider mb-3 flex items-center gap-2 font-semibold">
              <Wallet size={14} className="text-gray-500" /> Precios
            </div>

            <div className="py-2 px-3 mb-4 rounded-xl text-xs font-bold text-center"
              style={{ background: '#fef3c7', border: '1px solid #fde68a', color: '#92400e' }}>
              ★ Todos los precios incluyen exámenes médicos.
            </div>

            {/* Estado: cargando */}
            {preciosLoading && (
              <div className="space-y-3 animate-pulse">
                {[1, 2, 3].map(i => (
                  <div key={i} className="rounded-xl overflow-hidden"
                    style={{ background: '#f9fafb', border: '1px solid #e5e7eb' }}>
                    <div className="h-8 bg-amber-100 px-4" />
                    <div className="px-4 py-3 flex flex-col gap-2">
                      <div className="h-3 bg-gray-200 rounded w-3/4" />
                      <div className="h-3 bg-gray-100 rounded w-1/2" />
                      <div className="h-3 bg-gray-200 rounded w-2/3" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Estado: error */}
            {!preciosLoading && (preciosError || !preciosRaw || preciosRaw.length === 0) && (
              <div className="p-4 rounded-xl text-sm font-medium"
                style={{ background: '#fef3c7', border: '1px solid #fde68a', color: '#92400e' }}>
                No se pudieron cargar los precios. Contáctanos por WhatsApp para más información.
              </div>
            )}

            {/* Estado: datos OK */}
            {!preciosLoading && !preciosError && preciosRaw && preciosRaw.length > 0 && (
              <PreciosBlock
                precios={preciosFormateados}
                combos={combosFormateados}
              />
            )}
          </div>

          {/* Documentos */}
          <div className="p-4 rounded-xl mb-6 text-xs"
            style={{ background: '#f9fafb', border: '1px solid #e5e7eb' }}>
            <div className="text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-1.5 font-bold"><ClipboardList size={14} /> Documentos para matrícula</div>
            <ul className="text-gray-600 flex flex-col gap-1 font-medium">
              <li>• Cédula o contraseña en físico</li>
              <li>• Formato de inscripción diligenciado</li>
              <li>• 2 fotos 3×4 fondo blanco</li>
              <li>• Fotocopia de la cédula ampliada al 150%</li>
            </ul>
            <a href="https://www.runt.gov.co/directorio-de-actores" target="_blank" rel="noopener noreferrer"
              className="inline-block mt-2 text-amber-700 font-bold hover:underline">
              <CheckCircle2 size={14} className="inline mr-1" /> Verificar academia en RUNT →
            </a>
          </div>

          {/* Mapa interactivo */}
          <div className="mb-6">
            <div className="text-gray-500 text-xs uppercase tracking-wider mb-3 flex items-center gap-2 font-semibold">
              <MapPin size={14} className="text-gray-500" /> Ubicación
            </div>
            <div className="relative w-full rounded-xl overflow-hidden shadow-sm" style={{ border: '1px solid #e5e7eb' }}>
              <iframe
                title={`Mapa de ${sede.nombre}`}
                src={`https://www.google.com/maps?q=${encodeURIComponent(sede.direccion)}&output=embed`}
                width="100%"
                className="h-[200px] md:h-[260px]"
                style={{ border: 0, borderRadius: '12px' }}
                allowFullScreen=""
                loading="lazy"
              />
            </div>
            {sede.mapsUrl && (
              <div className="mt-2 text-left">
                <a href={sede.mapsUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-amber-700 font-bold hover:underline inline-flex items-center gap-1">
                  ↗ Abrir en Google Maps
                </a>
              </div>
            )}
          </div>

          {/* Botones */}
          <div className="flex flex-wrap gap-3">
            {/* Botón que usa round-robin para distribuir el contacto entre asesores */}
            <button
              type="button"
              onClick={() => abrirWhatsApp(waMsg)}
              className="btn-yellow flex-1 justify-center text-sm rounded-xl shadow-md"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              Contactar por WhatsApp
            </button>
            <a
              href="#agendar"
              onClick={() => {
                const sedeKey = sede.bookingKey || sede.nombre
                sessionStorage.setItem('preselectedSede', sedeKey)
                window.dispatchEvent(new CustomEvent('preselect-sede', { detail: { sede: sedeKey } }))
                onClose()
              }}
              className="btn-outline text-sm rounded-xl px-5 shadow-sm"
            >Agendar cita →</a>
          </div>
        </div>
      </div>
    </div>
  )
}
