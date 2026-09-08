import React from 'react'

export default function SectionDivider() {
  return (
    <div
      className="relative w-full overflow-hidden py-3 pointer-events-none select-none"
      style={{
        background: 'transparent',
        lineHeight: 0,
        fontSize: 0,
        maskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
      }}
      aria-hidden="true"
    >
      <div className="animate-drive-road flex items-center">
        {/* Track 1 */}
        <div className="flex shrink-0 items-center animate-suspension">
          <img
            src="/separador-loop.png"
            alt="Vehículos avanzando"
            className="h-10 sm:h-12 md:h-14 w-auto object-contain"
            loading="lazy"
          />
          <img
            src="/separador-loop.png"
            alt="Vehículos avanzando"
            className="h-10 sm:h-12 md:h-14 w-auto object-contain"
            loading="lazy"
          />
        </div>

        {/* Track 2 (Idéntico para bucle infinito imperceptible) */}
        <div className="flex shrink-0 items-center animate-suspension">
          <img
            src="/separador-loop.png"
            alt="Vehículos avanzando"
            className="h-10 sm:h-12 md:h-14 w-auto object-contain"
            loading="lazy"
          />
          <img
            src="/separador-loop.png"
            alt="Vehículos avanzando"
            className="h-10 sm:h-12 md:h-14 w-auto object-contain"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  )
}
