import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Categories from './components/Categories'
import Sedes from './components/Sedes'
import About from './components/About'
import Testimonials from './components/Testimonials'
import CRC from './components/CRC'
import Booking from './components/Booking'
import Legal from './components/Legal'
import Footer from './components/Footer'
import WhatsAppFloat from './components/WhatsAppFloat'
import Chatbot from './components/Chatbot'
import SectionDivider from './components/SectionDivider'

export default function App() {
  const [activeWidget, setActiveWidget] = useState(null) // 'whatsapp' | 'chatbot' | null

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-gray-900 relative overflow-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Main Background Image */}
        <div className="w-full h-full relative">
          <img src="/hero-background.webp" alt="Fondo Don Juanito" width="1920" height="1080" loading="eager" className="w-full h-full object-cover object-[60%_top] md:object-center opacity-45" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/65 to-[#f8f9fa]" />
        
        {/* Minimalist Driving Details */}
        {/* Vertical Road Dashed Line */}
        <div className="absolute top-0 bottom-0 left-8 md:left-24 w-0.5 border-l-2 border-dashed border-amber-500/25" />
      </div>
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Categories />
        <SectionDivider />
        <Sedes />
        <SectionDivider />
        <About />
        <SectionDivider />
        <Testimonials />
        <SectionDivider />
        <CRC />
        <SectionDivider />
        <Booking />
        <SectionDivider />
        <Legal />
        <Footer />
        <WhatsAppFloat 
          isOpen={activeWidget === 'whatsapp'} 
          setIsOpen={(open) => setActiveWidget(open ? 'whatsapp' : null)} 
        />
        <Chatbot 
          isOpen={activeWidget === 'chatbot'} 
          setIsOpen={(open) => setActiveWidget(open ? 'chatbot' : null)} 
        />
      </div>
    </div>
  )
}
