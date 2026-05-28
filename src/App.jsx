import React from 'react'
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

import { Car, MapPin, Compass } from 'lucide-react'

export default function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Main Background Image */}
        <img src="/hero-background.png" alt="Fondo Don Juanito" className="w-full h-full object-cover opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/30 via-[#0a0a0a]/50 to-[#0a0a0a]/70" />
        
        {/* Minimalist Driving Details */}
        {/* Vertical Road Dashed Line */}
        <div className="absolute top-0 bottom-0 left-8 md:left-24 w-0.5 border-l-2 border-dashed border-yellow-400/20" />
        
        {/* Floating faint icons */}
        <div className="absolute top-[20%] right-[10%] text-white/5 animate-float" style={{ animationDelay: '0s' }}>
          <Car size={120} strokeWidth={1} />
        </div>
        <div className="absolute top-[60%] left-[5%] text-yellow-400/5 animate-float" style={{ animationDelay: '2s' }}>
          <MapPin size={80} strokeWidth={1.5} />
        </div>
        <div className="absolute top-[85%] right-[15%] text-white/5 animate-float" style={{ animationDelay: '1s' }}>
          <Compass size={100} strokeWidth={1} />
        </div>
      </div>
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Categories />
        <Sedes />
        <About />
        <Testimonials />
        <CRC />
        <Booking />
        <Legal />
        <Footer />
        <WhatsAppFloat />
        <Chatbot />
      </div>
    </div>
  )
}
