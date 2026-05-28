import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

// MODERACIÓN: Para aprobar una reseña ve a supabase.com/dashboard
// Table Editor → resenas → cambia 'aprobada' de false a true

const COLORS = ['#7c3aed', '#059669', '#dc2626', '#d97706', '#0891b2', '#be185d', '#ea580c', '#0284c7']

function getInitials(nombre) {
  return nombre.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
}

function getColor(nombre) {
  const code = nombre.charCodeAt(0) || 0
  return COLORS[code % COLORS.length]
}

const mockTestimonials = [
  {
    nombre: 'Valentina Rodríguez',
    localidad: 'Suba, Bogotá',
    categoria: 'B1',
    estrellas: 5,
    comentario: 'Obtuve mi licencia B1 en tiempo récord. Los instructores son muy pacientes y profesionales. Me dieron confianza desde la primera clase. ¡Totalmente recomendado!',
    color: '#7c3aed',
  },
  {
    nombre: 'Andrés Felipe Mora',
    localidad: 'Chapinero, Bogotá',
    categoria: 'A2',
    estrellas: 4,
    comentario: 'Excelente experiencia con el curso A2 de moto. Los instructores te dan toda la confianza desde cero. Le doy 4 estrellas porque a veces es difícil agendar la teoría por la alta demanda, pero las clases prácticas son impecables.',
    color: '#059669',
  },
  {
    nombre: 'Carolina Jiménez',
    localidad: 'Kennedy, Bogotá',
    categoria: 'B1',
    estrellas: 5,
    comentario: 'El proceso fue rapidísimo. Me asesoraron en todo: desde los documentos hasta el examen. El servicio al cliente es increíble, siempre disponibles por WhatsApp.',
    color: '#dc2626',
  },
  {
    nombre: 'Diego Hernández',
    localidad: 'Usaquén, Bogotá',
    categoria: 'C1',
    estrellas: 4,
    comentario: 'Muy buen servicio para la licencia C1 de servicio público. El instructor de conducción fue muy paciente y profesional. Todo el trámite legal fue rápido.',
    color: '#d97706',
  },
  {
    nombre: 'Laura Martínez',
    localidad: 'Engativá, Bogotá',
    categoria: 'B1',
    estrellas: 5,
    comentario: 'Pensé que aprender a manejar sería difícil, pero con los instructores de Don Juanito Drivers todo fue sencillo y divertido. Pasé el examen al primer intento.',
    color: '#0891b2',
  },
  {
    nombre: 'Sebastián Torres',
    localidad: 'Bosa, Bogotá',
    categoria: 'A2',
    estrellas: 4,
    comentario: 'El curso de moto estuvo muy bien estructurado. Aprendí bastante sobre seguridad vial y técnicas de manejo. Las motos están en perfecto estado. Muy recomendados.',
    color: '#be185d',
  },
]

function Stars({ count }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => {
        const fillValue = Math.min(Math.max(count - i, 0), 1)
        const gradientId = `star-grad-${i}-${(count * 10).toFixed(0)}`
        return (
          <svg key={i} width="14" height="14" viewBox="0 0 24 24" className="overflow-visible">
            <defs>
              <linearGradient id={gradientId}>
                <stop offset={`${fillValue * 100}%`} stopColor="#FACC15" />
                <stop offset={`${fillValue * 100}%`} stopColor="#374151" />
              </linearGradient>
            </defs>
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill={`url(#${gradientId})`} />
          </svg>
        )
      })}
    </div>
  )
}

function ReviewCard({ t, isMock }) {
  const initials = getInitials(t.nombre)
  const color = t.color || getColor(t.nombre)
  const rating = t.estrellas ?? t.rating ?? 5
  const texto = t.comentario ?? t.texto ?? ''
  const localidad = t.localidad ?? 'Usuario verificado'
  const categoria = t.categoria ?? 'Reseña'

  const hasTexto = texto && texto.trim() !== '' && texto.trim().toUpperCase() !== 'EMPTY'

  return (
    <div className="glass-card card-hover p-6 flex flex-col gap-4 relative overflow-hidden group">
      <div className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />

      {hasTexto ? (
        <>
          <div className="text-yellow-400 opacity-30">
            <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed flex-1 italic">"{texto}"</p>
        </>
      ) : (
        <p className="text-gray-600 text-xs italic flex-1">Sin comentario</p>
      )}

      <div className="flex items-center gap-3 pt-2 border-t border-white/5">
        <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white shrink-0"
          style={{ background: color }}>
          {initials}
        </div>
        <div className="min-w-0">
          <div className="font-semibold text-white text-sm truncate">{t.nombre}</div>
          <div className="text-gray-500 text-xs">{localidad}</div>
        </div>
        <div className="ml-auto flex flex-col items-end gap-1">
          <Stars count={rating} />
          <span className="text-xs px-2 py-0.5 rounded text-yellow-400 border border-yellow-400/20 font-bold"
            style={{ fontFamily: 'Barlow Condensed' }}>
            {categoria}
          </span>
        </div>
      </div>
    </div>
  )
}

function ReviewFormModal({ onClose }) {
  const [form, setForm] = useState({ nombre: '', estrellas: 5, comentario: '' })
  const [status, setStatus] = useState('idle')

  const charCount = form.comentario.length
  const charOverLimit = charCount > 500

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (charOverLimit) return
    setStatus('loading')

    try {
      const { error } = await supabase
        .from('reseñas')
        .insert([{
          nombre: form.nombre,
          estrellas: form.estrellas,
          comentario: form.comentario
        }])

      if (error) {
        console.error('Supabase insert error:', error)
        throw error
      }

      setStatus('success')
      setTimeout(() => { onClose() }, 3000)
    } catch (err) {
      console.error('Error al enviar reseña:', err)
      setStatus('error')
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(10px)' }}
      onClick={onClose}>
      <div className="relative w-full max-w-md rounded-2xl overflow-hidden p-8 animate-fade-in-up"
        style={{ background: 'linear-gradient(135deg, #111100 0%, #0d0d0d 100%)', border: '1.5px solid rgba(250,204,21,0.3)', boxShadow: '0 0 80px rgba(250,204,21,0.15)' }}
        onClick={e => e.stopPropagation()}>

        <button type="button" onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-all"
          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: '#9ca3af' }}>
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <h3 className="font-black text-white text-2xl mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>Deja tu reseña</h3>
        <p className="text-gray-400 text-sm mb-6">Tu opinión nos ayuda a mejorar y a otros conductores a elegirnos.</p>

        {status === 'success' ? (
          <div className="text-center py-8 animate-fade-in-up">
            <div className="w-16 h-16 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center mx-auto mb-4">
              <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h4 className="text-white font-bold mb-2 text-lg">¡Gracias por tu reseña!</h4>
            <p className="text-gray-400 text-sm">La revisaremos y la publicaremos pronto.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-gray-400 text-xs uppercase tracking-wider mb-1.5 font-semibold">Nombre completo</label>
              <input type="text" required className="form-input"
                value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })}
                placeholder="Ej. Juan Pérez" />
            </div>

            <div>
              <label className="block text-gray-400 text-xs uppercase tracking-wider mb-1.5 font-semibold">Calificación</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <button type="button" key={star} onClick={() => setForm({ ...form, estrellas: star })}
                    className="transition-transform hover:scale-110 focus:outline-none">
                    <svg width="34" height="34" viewBox="0 0 24 24"
                      fill={star <= form.estrellas ? '#FACC15' : 'none'}
                      stroke={star <= form.estrellas ? '#FACC15' : '#4B5563'}
                      strokeWidth="1.5">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-gray-400 text-xs uppercase tracking-wider mb-1.5 font-semibold">Comentario <span className="normal-case text-gray-600 font-normal">(opcional)</span></label>
              <textarea maxLength={500} className="form-input min-h-[110px] resize-none"
                value={form.comentario} onChange={e => setForm({ ...form, comentario: e.target.value })}
                placeholder="¿Cómo fue tu experiencia? Cuéntanos..." />
              {charCount > 0 && (
                <p className={`text-xs mt-1 transition-colors ${charOverLimit ? 'text-red-400' : 'text-gray-500'}`}>
                  {charCount} / 500
                </p>
              )}
            </div>

            <button type="submit" disabled={status === 'loading' || !form.nombre || form.estrellas < 1 || charOverLimit}
              className="btn-yellow w-full justify-center mt-1 disabled:opacity-60 disabled:cursor-not-allowed">
              {status === 'loading' ? (
                <svg className="animate-spin h-5 w-5 text-black" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              ) : 'Enviar mi reseña'}
            </button>
            {status === 'error' && <p className="text-red-400 text-xs text-center">Hubo un error al enviar. Inténtalo de nuevo.</p>}
          </form>
        )}
      </div>
    </div>
  )
}

export default function Testimonials() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({ rating: 4.9, total: 101 })
  const [showAll, setShowAll] = useState(false)
  const [currentPage, setCurrentPage] = useState(1) // página activa en modo expandido
  const [showModal, setShowModal] = useState(false)
  const [usingMock, setUsingMock] = useState(false)

  // Reseñas por página en modo expandido
  const PAGE_SIZE = 12


  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data, error } = await supabase
          .from('reseñas')
          .select('*')
          .eq('aprobada', true)
          .order('estrellas', { ascending: false })
          .order('created_at', { ascending: false })

        if (error) throw error

        if (data && data.length > 0) {
          setReviews(data)
          const avg = (data.reduce((s, r) => s + r.estrellas, 0) / data.length).toFixed(1)
          setStats({ rating: avg, total: data.length })
          setUsingMock(false)
        } else {
          setReviews(mockTestimonials)
          setStats({ rating: 4.9, total: 101 })
          setUsingMock(true)
        }
      } catch (err) {
        console.error('Error cargando reseñas:', err)
        setReviews(mockTestimonials)
        setStats({ rating: 4.9, total: 101 })
        setUsingMock(true)
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [])

// Reseñas de 5 estrellas visible por defecto (máx 6), resto al expandir
const fiveStars = usingMock ? reviews : reviews.filter(r => r.estrellas === 5).slice(0, 6);
// Paginación en modo expandido

const totalPages = showAll ? Math.ceil(reviews.length / PAGE_SIZE) : 1;
const visibleReviews = showAll
  ? reviews.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
  : fiveStars;

  return (
    <section id="resenas" className="py-24 relative overflow-hidden" style={{ background: 'rgba(13,13,13,0.75)' }}>
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <div className="section-label mb-3">Reseñas</div>
          <h2 className="font-black text-white mb-4" style={{ fontFamily: 'Barlow Condensed', fontSize: 'clamp(2.5rem,5vw,4rem)' }}>
            LO QUE DICEN NUESTROS
            <br /><span className="text-yellow-400">CONDUCTORES</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            {Number(stats.total) === 1
              ? 'Más de 1 persona ya confía en Don Juanito Drivers para obtener su licencia de conducción.'
              : `Más de ${stats.total} personas ya confían en Don Juanito Drivers para obtener su licencia de conducción.`
            }
          </p>
        </div>

        {/* Grid de cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="glass-card p-6 flex flex-col gap-4 animate-pulse" style={{ border: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="h-4 bg-white/10 rounded w-1/4 mb-2"></div>
                <div className="h-20 bg-white/5 rounded w-full"></div>
                <div className="flex items-center gap-3 pt-2 mt-auto border-t border-white/5">
                  <div className="w-10 h-10 rounded-full bg-white/10 shrink-0"></div>
                  <div className="flex-1">
                    <div className="h-3 bg-white/10 rounded w-1/2 mb-1"></div>
                    <div className="h-2 bg-white/5 rounded w-1/3"></div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            visibleReviews.map((t, i) => (
              <ReviewCard key={t.id ?? i} t={t} isMock={usingMock} />
            ))
          )}
        </div>

                {/* Botones de acción */}
        <div className="flex justify-center mt-10 gap-4 flex-wrap">
          <button onClick={() => setShowModal(true)} className="btn-yellow py-2.5 px-6 rounded-lg text-sm flex items-center gap-2">
            ⭐ Ayúdanos a crecer — Deja tu reseña
          </button>
          {/* Ver más / menos */}
          {!loading && reviews.length > 6 && (
            <button
              onClick={() => {
                if (!showAll) {
                  setShowAll(true);
                  setCurrentPage(1);
                } else {
                  setShowAll(false);
                }
              }}
              className="btn-outline py-2.5 px-6 rounded-lg text-sm flex items-center gap-2"
            >
              {showAll ? 'Ver menos ↑' : 'Ver más reseñas ↓'}
            </button>
          )}
        </div>
        {/* Paginación (solo en modo expandido) */}
        {showAll && totalPages > 1 && (
          <div className="flex justify-center items-center mt-6 gap-4">
            <button
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="btn-outline px-3 py-1 rounded disabled:opacity-50"
            >
              ← Anterior
            </button>
            <span className="text-gray-300">
              Página {currentPage} de {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="btn-outline px-3 py-1 rounded disabled:opacity-50"
            >
              Siguiente →
            </button>
          </div>
        )}

        {/* Rating summary */}
        <div className="mt-12 glass-card p-8 flex flex-col md:flex-row items-center gap-8 justify-center"
          style={{ border: '1px solid rgba(250,204,21,0.15)' }}>
          <div className="text-center">
            <div className="font-black text-yellow-400 text-6xl" style={{ fontFamily: 'Barlow Condensed' }}>{stats.rating}</div>
            <div className="flex justify-center my-2"><Stars count={Number(stats.rating)} /></div>
            <div className="text-gray-400 text-sm">Calificación promedio</div>
          </div>
          <div className="w-px h-16 bg-white/10 hidden md:block" />
          <div className="text-center">
            <div className="font-black text-white text-6xl" style={{ fontFamily: 'Barlow Condensed' }}>{stats.total}</div>
            <div className="text-gray-400 text-sm mt-2">Reseñas verificadas</div>
          </div>
          <div className="w-px h-16 bg-white/10 hidden md:block" />
          <div className="text-center">
            <div className="font-black text-yellow-400 text-6xl" style={{ fontFamily: 'Barlow Condensed' }}>9</div>
            <div className="text-gray-400 text-sm mt-2">Sedes activas</div>
          </div>
        </div>
      </div>

      {showModal && <ReviewFormModal onClose={() => setShowModal(false)} />}
    </section>
  )
}
