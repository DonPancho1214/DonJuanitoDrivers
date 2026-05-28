import React from 'react'
import { Bike, Car, Bus, Truck } from 'lucide-react'
// Sistema round-robin centralizado
import { abrirWhatsApp } from '../utils/whatsapp'

// Mensaje genérico reutilizable en el footer
const MSG_DEFAULT = 'Hola quiero información sobre las licencias de conducción'

export default function Footer() {
  return (
    <footer className="border-t border-white/5 pt-8 pb-4" style={{ background: 'rgba(5,5,5,0.9)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <img
                src="/nuevo-logo.webp"
                alt="Don Juanito Drivers"
                width="80" height="80" loading="lazy"
                className="w-20 h-20 object-contain"
                style={{ filter: 'drop-shadow(0 0 8px rgba(250,204,21,0.4))' }}
              />
              <div>
                <div className="font-black text-white leading-none" style={{ fontFamily: 'Barlow Condensed', fontSize: '1.15rem', letterSpacing: '0.06em' }}>
                  DON JUANITO <span className="text-yellow-400">DRIVERS</span>
                </div>
                <div className="text-gray-500 text-xs tracking-widest uppercase mt-0.5">Red de conducción · Bogotá</div>
              </div>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-5">
              Red de outsourcing de escuelas de conducción en Bogotá y Soacha. Licencias A2, B1, C1 y C2.
            </p>
            {/* Social */}
            <div className="flex gap-3">
              {[
                { 
                  name: 'Facebook',
                  url: 'https://www.facebook.com/profile.php?id=61588449010940',
                  icon: (
                    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  )
                },
                { 
                  name: 'Instagram',
                  url: 'https://www.instagram.com/don_juanito_drivers/',
                  icon: (
                    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  )
                },
              ].map((s, i) => (
                <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={`Visítanos en ${s.name}`} className="w-9 h-9 rounded border border-white/10 flex items-center justify-center text-gray-500 hover:text-yellow-400 hover:border-yellow-400/40 transition-all">
                  {s.icon}
                </a>
              ))}
              {/* WhatsApp — round-robin al hacer clic */}
              <button
                type="button"
                onClick={() => abrirWhatsApp(MSG_DEFAULT)}
                className="w-9 h-9 rounded border border-white/10 flex items-center justify-center text-gray-500 hover:text-green-400 hover:border-green-400/40 transition-all"
                aria-label="Contactar por WhatsApp"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </button>
            </div>
          </div>

          {/* Links rápidos */}
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-4" style={{fontFamily:'Barlow Condensed'}}>
              Navegación
            </h4>
            <ul className="flex flex-col gap-2.5">
              {['Inicio', 'Categorías', 'Sedes', 'Quiénes somos', 'Reseñas', 'Agendar'].map(l => (
                <li key={l}>
                  <a href={`#${l.toLowerCase().replace(' ', '').replace('ñ', 'n')}`}
                    className="text-gray-500 hover:text-yellow-400 transition-colors text-sm">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categorías */}
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-4" style={{fontFamily:'Barlow Condensed'}}>
              Categorías
            </h4>
            <ul className="flex flex-col gap-3">
              {[
                { label: 'Categoría A2 (Motos)', icon: <Bike size={16} />, href: '#categorias' },
                { label: 'Categoría B1 (Carros)', icon: <Car size={16} />, href: '#categorias' },
                { label: 'Categoría C1 (Público)', icon: <Bus size={16} />, href: '#categorias' },
                { label: 'Categoría C2 (Camiones)', icon: <Truck size={16} />, href: '#categorias' },
              ].map((c, i) => (
                <li key={i}>
                  <a href={c.href} className="flex items-center gap-2 text-gray-500 hover:text-yellow-400 transition-colors text-sm">
                    <span className="text-yellow-400/70">{c.icon}</span>
                    {c.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-4" style={{fontFamily:'Barlow Condensed'}}>
              Sede principal
            </h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-2 text-gray-500 text-sm">
                <svg className="shrink-0 mt-0.5 text-yellow-400" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                CEA Diverplaza – Cra. 100 #72-19, Bogotá D.C.
              </div>
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <svg className="shrink-0 text-yellow-400" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                Lun–Sáb: 7am – 6pm
              </div>
              {/* Botón de contacto en la columna sede principal — round-robin */}
              <button
                type="button"
                onClick={() => abrirWhatsApp(MSG_DEFAULT)}
                className="btn-yellow text-xs py-2.5 mt-2 justify-center"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Contactar ahora
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs text-center sm:text-left">
            © {new Date().getFullYear()} Don Juanito Drivers. Todos los derechos reservados. Bogotá, Colombia.
          </p>
          <div className="flex gap-4">
            {['Términos', 'Privacidad', 'Datos'].map(l => (
              <a key={l} href="#legal" className="text-gray-600 hover:text-yellow-400 text-xs transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
