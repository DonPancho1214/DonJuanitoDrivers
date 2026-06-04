import React from 'react'

export default function SectionDivider() {
  return (
    <div
      style={{
        background: 'rgba(13,13,13,0.7)',
        lineHeight: 0,
        fontSize: 0,
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <img
        src="/separador 2.png"
        alt="Separador de sección"
        style={{
          display: 'block',
          width: '100%',
          maxWidth: '900px',
          height: 'auto',
          margin: 0,
          padding: 0,
        }}
      />
    </div>
  )
}
