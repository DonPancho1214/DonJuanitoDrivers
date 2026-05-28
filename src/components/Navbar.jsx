import React, { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('inicio')

  const links = [
    { label: 'Inicio', href: '#inicio', id: 'inicio' },
    { label: 'Categorías', href: '#categorias', id: 'categorias' },
    { label: 'Sedes', href: '#sedes', id: 'sedes' },
    { label: 'Nosotros', href: '#nosotros', id: 'nosotros' },
    { label: 'Reseñas', href: '#resenas', id: 'resenas' },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observers = []
    links.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { threshold: 0.2, rootMargin: '-60px 0px -40% 0px' }
      )
      observer.observe(el)
      observers.push(observer)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(8,8,8,0.97)' : 'linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, transparent 100%)',
        borderBottom: scrolled ? '1px solid rgba(250,204,21,0.15)' : 'none',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.5)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#inicio" className="flex items-center gap-4 group" onClick={() => setActiveSection('inicio')}>
            <div className="relative flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
              <img src="/nuevo-logo.png" alt="Don Juanito Drivers logo"
                className="w-auto h-12 md:h-14 object-contain"
                style={{ filter: 'drop-shadow(0 0 8px rgba(250,204,21,0.3))' }} />
            </div>
            <div>
              <div className="font-bold text-white leading-none tracking-tight" style={{ fontFamily: 'Outfit', fontSize: '1.25rem' }}>
                Don Juanito <span className="text-yellow-400">Drivers</span>
              </div>
              <div className="text-gray-400 text-xs tracking-wider uppercase mt-1" style={{ fontSize: '0.65rem' }}>Red de conducción · Bogotá</div>
            </div>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-7">
            {links.map(l => {
              const isActive = activeSection === l.id
              return (
                <a key={l.href} href={l.href} onClick={() => setActiveSection(l.id)}
                  className="relative text-sm font-semibold tracking-wider uppercase group transition-colors duration-200"
                  style={{ fontFamily: 'Barlow Condensed', letterSpacing: '0.1em', color: isActive ? '#FACC15' : '#d1d5db' }}>
                  {l.label}
                  <span className="absolute -bottom-1 left-0 h-0.5 rounded-full transition-all duration-300"
                    style={{ width: isActive ? '100%' : '0%', background: '#FACC15' }} />
                </a>
              )
            })}
            <a href="#agendar" onClick={() => setActiveSection('agendar')}
              className="btn-yellow text-sm py-2 px-6 rounded-lg animate-pulse-glow">
              Agendar ahora
            </a>
          </div>

          {/* Hamburger */}
          <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menú">
            <span className={`block w-6 h-0.5 bg-yellow-400 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-yellow-400 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-yellow-400 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden pb-5 border-t border-yellow-400/10 mt-1 pt-4 flex flex-col gap-1"
            style={{ background: 'rgba(8,8,8,0.97)', margin: '0 -16px', padding: '1rem 1rem 1.5rem' }}>
            {links.map(l => {
              const isActive = activeSection === l.id
              return (
                <a key={l.href} href={l.href} onClick={() => { setMenuOpen(false); setActiveSection(l.id) }}
                  className="transition-all font-semibold tracking-wider uppercase text-sm py-2.5 px-3 rounded-lg"
                  style={{ fontFamily: 'Barlow Condensed', letterSpacing: '0.1em', color: isActive ? '#FACC15' : '#d1d5db', background: isActive ? 'rgba(250,204,21,0.08)' : 'transparent' }}>
                  {l.label}
                </a>
              )
            })}
            <a href="#agendar" onClick={() => { setMenuOpen(false); setActiveSection('agendar') }}
              className="btn-yellow mt-3 text-center justify-center rounded-lg">
              Agendar ahora
            </a>
          </div>
        )}
      </div>
    </nav>
  )
}
