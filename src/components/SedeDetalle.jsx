import React from 'react'
import { Navigation, Clock, Bike, Car, Bus, Truck, Wallet, Lightbulb, MapPin, CalendarDays, Star, ClipboardList, CheckCircle2 } from 'lucide-react'
// Sistema round-robin centralizado
import { abrirWhatsApp } from '../utils/whatsapp'
// Precios dinámicos desde Supabase
import { usePrecios } from '../hooks/usePrecios'

// PriceRow: label izquierda, valor derecha
function PriceRow({ label, value, highlight, indent }) {
  return (
    <div className="flex justify-between items-center py-1.5 border-b border-white/5 last:border-0">
      <span className={`text-sm ${indent ? 'pl-4 text-gray-500 text-xs' : 'text-gray-400'}`}>{label}</span>
      <span className={`font-black text-sm ${highlight ? 'text-yellow-400' : 'text-white'}`}
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
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="px-4 py-2 flex items-center gap-2"
              style={{ background: 'rgba(250,204,21,0.08)', borderBottom: '1px solid rgba(250,204,21,0.15)' }}>
              <span className="text-yellow-400 font-black text-sm" style={{ fontFamily: "'Outfit', sans-serif" }}>
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
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(250,204,21,0.15)' }}>
          <div className="px-4 py-2"
            style={{ background: 'rgba(250,204,21,0.08)', borderBottom: '1px solid rgba(250,204,21,0.15)' }}>
            <span className="text-yellow-400 font-black text-sm flex items-center gap-1.5" style={{ fontFamily: "'Outfit', sans-serif" }}>
              <Lightbulb size={14} className="text-orange-500" /> Combos
            </span>
          </div>
          <div className="px-4 py-1">
            {combos.map((c, i) => (
              <div key={i} className="mb-2 last:mb-0 border-b border-white/5 pb-2 last:border-0 last:pb-0">
                <div className="text-gray-300 font-black text-sm pt-1 pb-1">{c.nombre}</div>
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
      style={{ background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(10px)' }}
      onClick={onClose}>
      <div className="relative w-full max-w-2xl rounded-2xl overflow-hidden animate-fade-in-up"
        style={{
          background: 'linear-gradient(135deg, #111100 0%, #0d0d0d 100%)',
          border: '1.5px solid rgba(250,204,21,0.3)',
          boxShadow: '0 0 80px rgba(250,204,21,0.15)',
          maxHeight: '90vh', overflowY: 'auto',
        }}
        onClick={e => e.stopPropagation()}>

        <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #FACC15, #fde047, #FACC15)' }} />

        <div className="sticky top-4 z-50 w-full flex justify-end px-4 pointer-events-none h-0">
          <button onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all pointer-events-auto hover:bg-white/10"
            style={{ background: 'rgba(20,20,20,0.8)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff' }}
            aria-label="Cerrar">
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="p-7">
          {sede.destacada && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 text-xs font-bold tracking-widest uppercase"
              style={{ background: 'rgba(250,204,21,0.12)', border: '1px solid rgba(250,204,21,0.4)', color: '#FACC15', fontFamily: 'Barlow Condensed' }}>
              <Star size={14} className="inline mr-1 fill-yellow-400" /> SEDE PRINCIPAL — ACOMPAÑAMIENTO TOTAL
            </div>
          )}

          {sede.alertas?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {sede.alertas.map((a, i) => (
                <div key={i} className="px-3 py-1.5 rounded-lg text-xs font-semibold"
                  style={{ background: 'rgba(250,204,21,0.1)', border: '1px solid rgba(250,204,21,0.3)', color: '#FACC15' }}>
                  {a}
                </div>
              ))}
            </div>
          )}

          <h2 className="font-black text-white mb-0.5" style={{ fontFamily: 'Barlow Condensed', fontSize: '2.2rem' }}>
            {sede.nombre}
          </h2>
          <p className="text-yellow-400/80 text-sm font-semibold uppercase tracking-widest mb-5">{sede.subtitulo}</p>

          {/* Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            <div className="flex-1 p-4 rounded-xl flex items-start gap-3" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <MapPin className="text-yellow-400 shrink-0 mt-0.5" size={18} />
              <div>
                <div className="text-gray-500 text-xs uppercase tracking-wider mb-1">Dirección</div>
                <div className="text-white font-medium text-sm">{sede.direccion}</div>
              </div>
            </div>
            <div className="flex-1 p-4 rounded-xl flex items-start gap-3" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <CalendarDays className="text-yellow-400 shrink-0 mt-0.5" size={18} />
              <div>
                <div className="text-gray-500 text-xs uppercase tracking-wider mb-1">Horarios</div>
                {sede.horariosUrl
                  ? <a href={sede.horariosUrl} target="_blank" rel="noopener noreferrer" className="text-yellow-400 text-sm hover:underline">Ver horarios →</a>
                  : <div className="text-white font-medium text-sm">{sede.horarios}</div>
                }
              </div>
            </div>
          </div>

          {/* Descripción */}
          <div className="p-4 rounded-xl mb-5" style={{ background: 'rgba(250,204,21,0.04)', border: '1px solid rgba(250,204,21,0.12)' }}>
            <div className="text-gray-500 text-xs uppercase tracking-wider mb-2">Sobre esta sede</div>
            <p className="text-gray-300 text-sm leading-relaxed">{sede.descripcion}</p>
          </div>

          {/* Horas intensidad */}
          {sede.horas && (
            <div className="mb-5">
              <div className="text-gray-500 text-xs uppercase tracking-wider mb-3">Intensidad por categoría</div>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(sede.horas).map(([cat, h]) => (
                  <div key={cat} className="p-3 rounded-lg"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                    <span className="text-yellow-400 font-black text-sm" style={{ fontFamily: 'Barlow Condensed' }}>{cat}</span>
                    <p className="text-gray-400 text-xs mt-0.5">{h}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Categorías */}
          <div className="mb-5">
            <div className="text-gray-500 text-xs uppercase tracking-wider mb-3">Categorías disponibles</div>
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
                    style={{ background: 'rgba(250,204,21,0.1)', border: '1px solid rgba(250,204,21,0.3)' }}>
                    <span className="text-yellow-400">{info.icon}</span>
                    <span className="text-yellow-400 font-black text-sm" style={{ fontFamily: 'Barlow Condensed' }}>{c}</span>
                    <span className="text-gray-300 text-xs">{info.label}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Mensaje de Pago */}
          <div className="p-4 rounded-xl mb-5 flex items-center gap-3" 
            style={{ background: 'rgba(250,204,21,0.08)', border: '1px dashed rgba(250,204,21,0.3)' }}>
            <div className="shrink-0 bg-yellow-400/20 p-2 rounded-full">
              <Lightbulb className="text-yellow-400" size={24} />
            </div>
            <p className="text-yellow-400/90 text-sm font-semibold leading-relaxed">
              Puedes iniciar con el <span className="text-yellow-400 font-bold">50% del valor total</span> del curso o <span className="text-yellow-400 font-bold">pagar de contado</span> te saldrá más barato.
            </p>
          </div>

          {/* Precios */}
          <div className="mb-6">
            <div className="text-gray-500 text-xs uppercase tracking-wider mb-3 flex items-center gap-2">
              <Wallet size={14} className="text-gray-500" /> Precios
            </div>

            <div className="py-2 px-3 mb-4 rounded-xl text-xs font-semibold text-center"
              style={{ background: 'rgba(250,204,21,0.08)', border: '1px solid rgba(250,204,21,0.2)', color: '#FACC15' }}>
              ★ Todos los precios incluyen exámenes médicos.
            </div>

            {/* Estado: cargando */}
            {preciosLoading && (
              <div className="space-y-3 animate-pulse">
                {[1, 2, 3].map(i => (
                  <div key={i} className="rounded-xl overflow-hidden"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                    <div className="h-8 bg-yellow-400/10 px-4" />
                    <div className="px-4 py-3 flex flex-col gap-2">
                      <div className="h-3 bg-white/10 rounded w-3/4" />
                      <div className="h-3 bg-white/5 rounded w-1/2" />
                      <div className="h-3 bg-white/10 rounded w-2/3" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Estado: error */}
            {!preciosLoading && (preciosError || !preciosRaw || preciosRaw.length === 0) && (
              <div className="p-4 rounded-xl text-sm text-yellow-400/80"
                style={{ background: 'rgba(250,204,21,0.06)', border: '1px solid rgba(250,204,21,0.2)' }}>
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
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1.5"><ClipboardList size={14} /> Documentos para matrícula</div>
            <ul className="text-gray-400 flex flex-col gap-1">
              <li>• Cédula o contraseña en físico</li>
              <li>• Formato de inscripción diligenciado</li>
              <li>• 2 fotos 3×4 fondo blanco</li>
              <li>• Fotocopia de la cédula ampliada al 150%</li>
            </ul>
            <a href="https://www.runt.gov.co/directorio-de-actores" target="_blank" rel="noopener noreferrer"
              className="inline-block mt-2 text-yellow-400 hover:underline">
              <CheckCircle2 size={14} className="inline mr-1" /> Verificar academia en RUNT →
            </a>
          </div>

          {/* Mapa interactivo */}
          <div className="mb-6">
            <div className="text-gray-500 text-xs uppercase tracking-wider mb-3 flex items-center gap-2">
              <MapPin size={14} className="text-gray-500" /> Ubicación
            </div>
            <div className="relative w-full rounded-xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
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
                <a href={sede.mapsUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-yellow-400 hover:text-yellow-300 hover:underline inline-flex items-center gap-1">
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
              className="btn-yellow flex-1 justify-center text-sm rounded-xl animate-pulse-glow"
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
              className="btn-outline text-sm rounded-xl px-5"
            >Agendar cita →</a>
          </div>
        </div>
      </div>
    </div>
  )
}
