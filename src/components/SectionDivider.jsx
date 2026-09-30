import React from 'react'

export default function SectionDivider() {
  // Cantidad de repeticiones para asegurar cobertura completa en cualquier pantalla
  const repeatCount = 6

  return (
    <div
      className="relative w-full overflow-hidden py-3 pointer-events-none select-none"
      aria-hidden="true"
    >
      {/* Difuminado suave en los bordes para entrada y salida natural (sin bugs de maskImage) */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-[#f8f9fa] to-transparent pointer-events-none z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-[#f8f9fa] to-transparent pointer-events-none z-10" />

      {/* Riel animado en bucle continuo */}
      <div className="animate-drive-road flex w-max items-center">
        {/* Track 1 */}
        <div className="flex shrink-0 items-center animate-suspension">
          {Array.from({ length: repeatCount }).map((_, i) => (
            <img
              key={`t1-${i}`}
              src="/separador-loop.png"
              alt=""
              className="h-10 sm:h-12 md:h-14 w-auto object-contain shrink-0"
              loading="eager"
              decoding="async"
              draggable={false}
            />
          ))}
        </div>

        {/* Track 2 (Idéntico a Track 1 para bucle infinito perfecto) */}
        <div className="flex shrink-0 items-center animate-suspension">
          {Array.from({ length: repeatCount }).map((_, i) => (
            <img
              key={`t2-${i}`}
              src="/separador-loop.png"
              alt=""
              className="h-10 sm:h-12 md:h-14 w-auto object-contain shrink-0"
              loading="eager"
              decoding="async"
              draggable={false}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
