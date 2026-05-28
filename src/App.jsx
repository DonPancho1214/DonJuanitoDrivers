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



export default function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Main Background Image */}
        <div className="w-full h-[65vh] md:h-full relative">
          <img src="/hero-background.webp" alt="Fondo Don Juanito" width="1920" height="1080" loading="eager" className="w-full h-full object-cover object-[60%_top] md:object-center opacity-45" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0a0a] md:hidden" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/30 via-[#0a0a0a]/50 to-[#0a0a0a]/70" />
        
        {/* Minimalist Driving Details */}
        {/* Vertical Road Dashed Line */}
        <div className="absolute top-0 bottom-0 left-8 md:left-24 w-0.5 border-l-2 border-dashed border-yellow-400/20" />
        

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
