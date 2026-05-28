// ============================================================
// whatsapp.js — Sistema Round-Robin de asesores de WhatsApp
// Don Juanito Drivers
// ============================================================

// ── 1. Lista de asesores ──────────────────────────────────────
// Agrega o quita números aquí para escalar el sistema.
// El formato debe ser el código de país + número sin espacios ni "+".
export const ASESORES = [
  "573337293079",
  "573008984832",
]

// ── 2. Clave en localStorage ──────────────────────────────────
// Guarda el índice del último asesor asignado entre sesiones.
const STORAGE_KEY = "dj_wa_asesor_idx"

// ── 3. Obtener el próximo asesor (Round-Robin) ────────────────
// Lee el índice guardado, selecciona el asesor correspondiente,
// incrementa el índice y lo vuelve a guardar.
// Si el índice llega al final del arreglo, reinicia desde 0.
function getNextAsesor() {
  // Leer índice actual (default 0 si no existe)
  const raw = localStorage.getItem(STORAGE_KEY)
  const currentIdx = raw !== null ? parseInt(raw, 10) : 0

  // Seleccionar el número del asesor actual
  const numero = ASESORES[currentIdx % ASESORES.length]

  // Calcular el siguiente índice (con reinicio circular)
  const nextIdx = (currentIdx + 1) % ASESORES.length

  // Guardar el siguiente índice para la próxima llamada
  localStorage.setItem(STORAGE_KEY, nextIdx)

  return numero
}

// ── 4. Función principal — abrirWhatsApp() ────────────────────
// Llama a esta función desde cualquier botón o enlace de WA.
// Parámetros:
//   msg  (string) — Texto prellenado del mensaje. Opcional.
//                   Si se omite usa el mensaje genérico por defecto.
export function abrirWhatsApp(msg) {
  // Mensaje por defecto si no se pasa ninguno
  const mensaje = msg || "Hola, quiero información sobre las licencias de conducción"

  // Seleccionar el asesor según turno
  const numero = getNextAsesor()

  // Construir la URL de WhatsApp con el mensaje codificado
  const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`

  // Abrir en nueva pestaña sin exponer la referencia (seguridad)
  window.open(url, "_blank", "noopener,noreferrer")
}
