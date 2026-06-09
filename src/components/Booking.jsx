import React, { useState, useEffect } from 'react'
import { CheckCircle2, XCircle, AlertTriangle, Bike, Car } from 'lucide-react'
// Sistema round-robin centralizado de asesores de WhatsApp
import { abrirWhatsApp } from '../utils/whatsapp'
// Precios dinámicos desde Supabase
import { usePrecios } from '../hooks/usePrecios'

// Objeto sedesData con direcciones y mensajes personalizados para cada sede.
// Es fácil de editar y añadir más sedes en el futuro.
const sedesData = {
  'CEA Diverplaza (Sede Principal)': {
    direccion: 'Cra. 100 #72-19, Bogotá',
    mensajePersonalizado: '🚗 Sede Principal — Acompañamiento total durante todo el proceso.',
  },
  'Conductores Bogotá': {
    direccion: 'Cl. 71 #14a-14, Bogotá',
    mensajePersonalizado: '⭐ Única sede que ofrece la categoría C2.',
  },
  'CEA Velari': {
    direccion: 'Ac 100 #60d-05, Bogotá',
    mensajePersonalizado: '💰 Acepta pagos con fondo de cesantías.',
  },
  'El Agente Guerrero': {
    direccion: 'Autopista Sur #54-55, Bogotá',
    mensajePersonalizado: '📍 Ubicado estratégicamente en la Autopista Sur.',
  },
  'CEA Auto Xua': {
    direccion: 'Cl. 12 #8A-01, Soacha',
    mensajePersonalizado: '⚠️ NO permite homologaciones — Curso completo obligatorio.',
  },
  'CEA Carvajal': {
    direccion: 'Carrera 71D #20 Sur Piso 4, Bogotá',
    mensajePersonalizado: '⭐ Maneja sistema pico y cédula.',
  },
  'CEA Al Timón': {
    direccion: 'Cl. 65d Sur, Bogotá',
    mensajePersonalizado: '📍 Sede en el Sur de Bogotá.',
  },
  'CEA Valuvial': {
    direccion: 'Carrera 19D Diagonal 63 Sur, Bogotá',
    mensajePersonalizado: '📍 Sede en la zona Centro-Sur de Bogotá.',
  },
  'CEA Centro Suba': {
    direccion: 'Calle 145 #91-19 Local 1001, Bogotá',
    mensajePersonalizado: '📍 Sede en la zona Norte de Bogotá (Suba).',
  },
}

const SEDES_OPTIONS = Object.keys(sedesData)

// ── Horarios de disponibilidad por sede ───────────────────────────────────
// Cada sede tiene sus propios slots de hora basados en su apertura y cierre.
// Para modificar, ajusta los valores de 'label' y 'value' de cada opción.
const HORARIOS_SEDE = {
  'CEA Diverplaza (Sede Principal)': [
    { value: 'Mañana (7am-12pm)', label: 'Mañana (7am – 12pm)' },
    { value: 'Tarde (12pm-6pm)',   label: 'Tarde (12pm – 6pm)'   },
    { value: 'Cualquier hora',     label: 'Cualquier hora'        },
  ],
  'Conductores Bogotá': [
    { value: 'Mañana (8am-12pm)', label: 'Mañana (8am – 12pm)' },
    { value: 'Tarde (12pm-5pm)',   label: 'Tarde (12pm – 5pm)'   },
    { value: 'Cualquier hora',     label: 'Cualquier hora'        },
  ],
  'CEA Velari': [
    { value: 'Mañana (7am-12pm)', label: 'Mañana (7am – 12pm)' },
    { value: 'Tarde (12pm-5pm)',   label: 'Tarde (12pm – 5pm)'   },
    { value: 'Cualquier hora',     label: 'Cualquier hora'        },
  ],
  'El Agente Guerrero': [
    { value: 'Mañana (8am-12pm)', label: 'Mañana (8am – 12pm)' },
    { value: 'Tarde (12pm-5pm)',   label: 'Tarde (12pm – 5pm)'   },
    { value: 'Cualquier hora',     label: 'Cualquier hora'        },
  ],
  'CEA Auto Xua': [
    { value: 'Mañana (8am-12pm)', label: 'Mañana (8am – 12pm)' },
    { value: 'Tarde (12pm-6pm)',   label: 'Tarde (12pm – 6pm)'   },
    { value: 'Cualquier hora',     label: 'Cualquier hora'        },
  ],
  'CEA Carvajal': [
    { value: 'Mañana (8am-12pm)', label: 'Mañana (8am – 12pm)' },
    { value: 'Tarde (12pm-5pm)',   label: 'Tarde (12pm – 5pm)'   },
    { value: 'Cualquier hora',     label: 'Cualquier hora'        },
  ],
  'CEA Al Timón': [
    { value: 'Mañana (7am-12pm)', label: 'Mañana (7am – 12pm)' },
    { value: 'Tarde (12pm-5pm)',   label: 'Tarde (12pm – 5pm)'   },
    { value: 'Cualquier hora',     label: 'Cualquier hora'        },
  ],
  'CEA Valuvial': [
    { value: 'Mañana (8am-12pm)', label: 'Mañana (8am – 12pm)' },
    { value: 'Tarde (12pm-6pm)',   label: 'Tarde (12pm – 6pm)'   },
    { value: 'Cualquier hora',     label: 'Cualquier hora'        },
  ],
  'CEA Centro Suba': [
    { value: 'Mañana (7am-12pm)', label: 'Mañana (7am – 12pm)' },
    { value: 'Tarde (12pm-5pm)',   label: 'Tarde (12pm – 5pm)'   },
    { value: 'Cualquier hora',     label: 'Cualquier hora'        },
  ],
}

// Mapeo: nombre de sede en el formulario → nombre exacto en Supabase
const SEDE_SUPABASE_NOMBRE = {
  'CEA Diverplaza (Sede Principal)': 'CEA Diverplaza',
  'Conductores Bogotá':  'Conductores Bogotá',
  'CEA Velari':          'CEA Velari',
  'El Agente Guerrero':  'El Agente Guerrero',
  'CEA Auto Xua':        'CEA Auto Xua',
  'CEA Carvajal':        'CEA Carvajal',
  'CEA Al Timón':        'CEA Al Timón',
  'CEA Valuvial':        'CEA Valuvial',
  'CEA Centro Suba':     'CEA Centro Suba',
}

// Labels amigables para cada categoría (las categorías llegan como 'A2/B1' desde Supabase)
const CATEGORIA_LABEL = {
  'A2':    'A2 – Motocicletas +125cc',
  'B1':    'B1 – Vehículos particulares',
  'C1':    'C1 – Servicio público',
  'C2':    'C2 – Vehículo especial',
  'A2/B1': 'Combo A2 + B1',
  'A2/C1': 'Combo A2 + C1',
}

/**
 * Calcula el precio final a partir de los datos de Supabase.
 * @param {Array} preciosData  - rows de Supabase para la sede
 * @param {string} categoria   - ej. 'A2', 'B1', 'A2/B1'
 * @param {string} sabeManejar - 'Si' | 'No' | 'moto_si_carro_no' | 'carro_si_moto_no'
 * @param {string} metodoPago  - valor del select del formulario
 * @param {boolean} esAutoXua  - true cuando la sede es CEA Auto Xua
 */
function calcularPrecio(preciosData, categoria, sabeManejar, metodoPago, esAutoXua) {
  if (!preciosData || !categoria) return null

  const modalidad = esAutoXua
    ? 'CURSO COMPLETO'
    : sabeManejar === 'Si' ? 'SIN PRACTICAS' : 'CON PRACTICAS'

  const row = preciosData.find(p =>
    p.categoria === categoria &&
    (p.modalidad === modalidad || p.modalidad === 'CURSO COMPLETO')
  )
  if (!row) return null
  const base = row.precio

  let inicial = null
  let total = base
  let isCredito = false
  let isMatricula = false

  if (metodoPago === 'De Contado') {
    total = base - 50000
  } else if (metodoPago === 'Addi (+7%)') {
    inicial = Math.round((base / 2) * 1.07)
    total = Math.round(base * 1.07)
    isCredito = true
  } else if (metodoPago === 'Sistecrédito (+5%)') {
    inicial = Math.round((base / 2) * 1.05)
    total = Math.round(base * 1.05)
    isCredito = true
  } else if (metodoPago === 'Me matriculo con el 50%') {
    inicial = Math.round(base / 2)
    total = base
    isMatricula = true
  } else if (metodoPago === 'Me matriculo con 400 Mil') {
    inicial = 400000
    total = base
    isMatricula = true
  } else if (metodoPago === 'Me matriculo con 800 Mil') {
    inicial = 800000
    total = base
    isMatricula = true
  }

  return { inicial, total, base, isCredito, isMatricula }
}

/** Label descriptivo bajo el precio según el método elegido */
function getPrecioLabel(metodoPago) {
  if (metodoPago === 'De Contado') return 'Pagando de contado'
  if (metodoPago === 'Addi (+7%)') return 'Matrícula con Addi'
  if (metodoPago === 'Sistecrédito (+5%)') return 'Matrícula con Sistecrédito'
  if (
    metodoPago === 'Me matriculo con el 50%' ||
    metodoPago === 'Me matriculo con 400 Mil' ||
    metodoPago === 'Me matriculo con 800 Mil'
  ) return 'Valor matrícula (50%)'
  return 'Valor del curso'
}

function formatPrice(num) {
  if (!num) return ''
  return `$${num.toLocaleString('es-CO')}`
}

// ← PRECIOS_DB eliminado: los precios ahora vienen de Supabase (tabla 'Precios')




const initialForm = {
  nombre: '', cedula: '', celular: '', categoria: '', sede: '',
  fecha: '', hora: '', metodoPago: '', sabeManejar: '',
}

// Tiempo de bloqueo anti doble envío (24 horas en milisegundos)
const COOLDOWN_MS = 24 * 60 * 60 * 1000

/**
 * Verifica si una cédula tiene un envío reciente dentro del período de cooldown.
 * Limpia entradas expiradas automáticamente.
 */
function getRecentSubmission(cedula) {
  if (!cedula || !cedula.trim()) return null
  try {
    const key = `lastSubmit_cedula_${cedula.trim()}`
    const stored = localStorage.getItem(key)
    if (!stored) return null
    const data = JSON.parse(stored)
    if (Date.now() - data.timestamp < COOLDOWN_MS) return data
    // Expirado: limpiar
    localStorage.removeItem(key)
    return null
  } catch {
    return null
  }
}

function saveSubmission(cedula) {
  if (!cedula || !cedula.trim()) return
  try {
    const data = { cedula: cedula.trim(), timestamp: Date.now() }
    localStorage.setItem(`lastSubmit_cedula_${cedula.trim()}`, JSON.stringify(data))
    localStorage.setItem('lastBookingSubmit', JSON.stringify(data))
  } catch {
    // localStorage no disponible, continuar sin bloqueo
  }
}

function clearSubmissionLock() {
  try {
    const stored = localStorage.getItem('lastBookingSubmit')
    if (stored) {
      const { cedula } = JSON.parse(stored)
      localStorage.removeItem(`lastSubmit_cedula_${cedula}`)
    }
    localStorage.removeItem('lastBookingSubmit')
  } catch {
    // Ignorar errores de localStorage
  }
}

export default function Booking() {
  const [form, setForm] = useState(initialForm)
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState({ type: '', message: '' })
  const [errors, setErrors] = useState({})
  const [duplicateWarning, setDuplicateWarning] = useState('')
  const [whatsappLink, setWhatsappLink] = useState('')

  const isAutoXua = form.sede === 'CEA Auto Xua'
  const isComboCategory = form.categoria === 'A2/B1' || form.categoria === 'A2/C1'
  const showFourOptions = form.sede === 'CEA Diverplaza (Sede Principal)' && isComboCategory

  // Precios dinámicos desde Supabase según la sede elegida
  const supabaseSedeName = SEDE_SUPABASE_NOMBRE[form.sede] || null
  const { precios: preciosRaw, loading: preciosLoading } = usePrecios(supabaseSedeName)

  // Categorías disponibles para el dropdown, según los datos de Supabase
  const orderedCategories = ['A2', 'B1', 'C1', 'A2/B1', 'A2/C1'];
  const categoriasDisponibles = [...new Set(preciosRaw?.map(p => p.categoria) || [])].sort((a, b) => {
    let indexA = orderedCategories.indexOf(a);
    let indexB = orderedCategories.indexOf(b);
    if (indexA === -1) indexA = 99;
    if (indexB === -1) indexB = 99;
    return indexA - indexB;
  })

  // Precio final calculado en tiempo real
  const precioFinal = calcularPrecio(preciosRaw, form.categoria, form.sabeManejar, form.metodoPago, isAutoXua)

  const { minDate, maxDate } = (() => {
    const today = new Date()
    const formatDate = (d) => {
      const year = d.getFullYear()
      const month = String(d.getMonth() + 1).padStart(2, '0')
      const day = String(d.getDate()).padStart(2, '0')
      return `${year}-${month}-${day}`
    }
    const min = formatDate(today)
    const max = new Date(today)
    max.setDate(today.getDate() + 7)
    return { minDate: min, maxDate: formatDate(max) }
  })()

  // Pre-rellenar sede cuando viene desde el botón "Agendar cita" de SedeDetalle
  useEffect(() => {
    // Fallback: si la página se recargó con sessionStorage ya guardado
    const preselected = sessionStorage.getItem('preselectedSede')
    if (preselected && SEDES_OPTIONS.includes(preselected)) {
      setForm(f => ({ ...f, sede: preselected }))
      sessionStorage.removeItem('preselectedSede')
    }

    // Escuchar el evento en tiempo real (flujo normal SPA)
    const handler = (e) => {
      const { sede } = e.detail
      if (SEDES_OPTIONS.includes(sede)) {
        setForm(f => ({ ...f, sede }))
        sessionStorage.removeItem('preselectedSede')
      }
    }
    window.addEventListener('preselect-sede', handler)
    return () => window.removeEventListener('preselect-sede', handler)
  }, [])

  const handleChange = e => {
    const { name, value } = e.target
    
    // Limpiar error específico del campo al empezar a escribir/cambiar
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }))
    }

    if (name === 'sede') {
      // Al cambiar sede, resetear categoría, metodoPago, sabeManejar Y hora
      // (cada sede tiene horarios distintos, la opción previa puede no ser válida)
      setForm(f => ({ ...f, sede: value, categoria: '', metodoPago: '', sabeManejar: '', hora: '' }))
    } else if (name === 'categoria') {
      // Al cambiar categoría, resetear sabeManejar si ya no aplica combo, y limpiar metodoPago para que se adapte
      const newIsCombo = value === 'A2/B1' || value === 'A2/C1'
      const shouldShowFour = form.sede === 'CEA Diverplaza (Sede Principal)' && newIsCombo
      const currentSabeVal = form.sabeManejar
      const comboOnlyVals = ['moto_si_carro_no', 'carro_si_moto_no']
      const shouldResetSabe = !shouldShowFour && comboOnlyVals.includes(currentSabeVal)
      setForm(f => ({ 
        ...f, 
        categoria: value, 
        metodoPago: '', 
        sabeManejar: shouldResetSabe ? '' : f.sabeManejar 
      }))
    } else {
      setForm(f => ({ ...f, [name]: value }))
    }
  }

  // Validaciones del formulario
  const validateForm = () => {
    const tempErrors = {}
    if (!form.nombre.trim()) {
      tempErrors.nombre = 'El nombre completo es requerido'
    }
    if (form.cedula.trim()) {
      if (!/^\d+$/.test(form.cedula.trim())) {
        tempErrors.cedula = 'La cédula debe contener solo números'
      }
    }
    if (!form.celular.trim()) {
      tempErrors.celular = 'El celular es requerido'
    } else if (!/^\d{10}$/.test(form.celular.trim().replace(/\s/g, ''))) {
      tempErrors.celular = 'El celular debe tener 10 dígitos'
    }
    if (!form.sede) {
      tempErrors.sede = 'Debes seleccionar una sede'
    }
    if (!form.categoria) {
      tempErrors.categoria = 'Debes seleccionar la categoría de licencia'
    }
    if (!form.metodoPago) {
      tempErrors.metodoPago = 'Debes seleccionar un método de pago'
    }
    if (!form.fecha) {
      tempErrors.fecha = 'Debes seleccionar una fecha'
    } else if (form.fecha < minDate || form.fecha > maxDate) {
      tempErrors.fecha = 'Las citas únicamente pueden agendarse dentro de los próximos 7 días.'
    }
    if (!form.hora) {
      tempErrors.hora = 'Debes seleccionar un horario'
    }
    if (form.sede !== 'CEA Auto Xua' && !form.sabeManejar) {
      tempErrors.sabeManejar = 'Debes indicar si sabes manejar'
    }
    
    setErrors(tempErrors)
    return Object.keys(tempErrors).length === 0
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setErrors({})
    setStatus({ type: '', message: '' })

    if (!validateForm()) {
      return
    }

    // Anti doble envío: verificar si esta cédula ya envió en las últimas 24 horas
    const trimmedCedula = form.cedula.trim()
    if (trimmedCedula) {
      const recentSubmit = getRecentSubmission(trimmedCedula)
      if (recentSubmit) {
        setDuplicateWarning(
          'Ya tienes una solicitud enviada hoy. Un asesor se contactará contigo pronto. Si necesitas ayuda urgente, escríbenos por WhatsApp.'
        )
        return
      }
    }
    setDuplicateWarning('')

    setLoading(true)

    try {
      const botToken = import.meta.env.VITE_TELEGRAM_TOKEN
      const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID

      if (!botToken || !chatId) {
        throw new Error('Variables de entorno de Telegram no configuradas.')
      }

      // Obtener dirección y mensaje de la sede seleccionada
      const sedeInfo = sedesData[form.sede] || { direccion: 'No especificada', mensajePersonalizado: '' }

      const nombreStr = form.nombre.toUpperCase()
      const cedulaStr = form.cedula
      const celularStr = form.celular
      const licenciaStr = form.categoria
      const pagoStr = form.metodoPago || ''
      const fechaStr = form.fecha || ''
      const horaStr = form.hora || ''
      const asesorStr = 'THOMAS JULIO'
      const referidoStr = form.sede === 'CEA Diverplaza (Sede Principal)' ? 'JUAN ANDRES JULIO' : 'CAMILO VELANDIA'

      let condicionesStr = '';
      if (form.sede === 'CEA Auto Xua') {
        condicionesStr = 'Con clases prácticas';
      } else {
        if (form.sabeManejar === 'Si') {
          condicionesStr = 'Homologa prácticas';
        } else if (form.sabeManejar === 'No') {
          condicionesStr = 'Con clases prácticas';
        } else if (form.sabeManejar === 'moto_si_carro_no') {
          condicionesStr = 'Homologa clases de moto, toma clases de carro';
        } else if (form.sabeManejar === 'carro_si_moto_no') {
          condicionesStr = 'Homologa clases de carro, toma clases de moto';
        }
      }

      const costStr = precioFinal ? formatPrice(precioFinal.total) : 'Por definir con asesor'

      let message = ''

      switch (form.sede) {
        case 'CEA Diverplaza (Sede Principal)':
          message = `🚗 NUEVO AGENDAMIENTO

📍 CITA: CALLE 80
🏫 CEA: DIVER PLAZA

👤 NOMBRE: ${nombreStr}
🪪 CÉDULA: ${cedulaStr}
📱 CELULAR: ${celularStr}
📋 LICENCIA: ${licenciaStr}
💰 COSTO:
📄 CONDICIONES: ${condicionesStr}
💳 FORMA DE PAGO: ${pagoStr}
🧑💼 ASESOR: ${asesorStr}
👥 REFERIDO: ${referidoStr}
📅 FECHA: ${fechaStr}
🕐 Hora Libre: ${horaStr}
🏫 CEA: Diver Plaza
📍 DIRECCIÓN: Carrera 100 #72-19

POR FAVOR PRESENTE LOS SIGUIENTES DOCUMENTOS PARA MATRÍCULA:
1) Cédula o contraseña en Físico
2) Formato de inscripción diligenciado
3) 2 fotos 3x4 fondo blanco
4) Fotocopia de la cédula ampliada al 150

Ingresa al siguiente link y comprueba la veracidad de nuestra academia.
https://www.runt.gov.co/directorio-de-actores`
          break

        case 'Conductores Bogotá':
          message = `🚗 NUEVO AGENDAMIENTO

📍 CITA: CHAPINERO
🏫 CEA: CONDUCTORES BOGOTÁ

👤 NOMBRE: ${nombreStr}
🪪 CÉDULA: ${cedulaStr}
📱 CELULAR: ${celularStr}
📋 LICENCIA: ${licenciaStr}
💰 COSTO:
📄 CONDICIONES: ${condicionesStr}
💳 FORMA DE PAGO: ${pagoStr}
👥 REFERIDO: ${referidoStr}
📅 FECHA: ${fechaStr}
🕐 Hora Libre: ${horaStr}
🏫 CEA: Conductores Bogotá
📍 DIRECCIÓN: Calle 71 #14a-14
🧑💼 ASESOR: ${asesorStr}

POR FAVOR PRESENTE LOS SIGUIENTES DOCUMENTOS PARA MATRÍCULA:
1) Cédula o contraseña en Físico
2) Formato de inscripción diligenciado
3) 2 fotos 3x4 fondo blanco
4) Fotocopia ampliada al 150 de la cédula

Ingresa al siguiente link y comprueba la veracidad de nuestra academia.
https://www.runt.gov.co/directorio-de-actores`
          break

        case 'CEA Velari':
          message = `🚗 NUEVO AGENDAMIENTO

📍 CITA: CALLE 100
🏫 CEA: VELARI

👤 NOMBRE: ${nombreStr}
🪪 CÉDULA: ${cedulaStr}
📱 CELULAR: ${celularStr}
📋 LICENCIA: ${licenciaStr}
💰 COSTO:
📄 CONDICIONES: ${condicionesStr}
💳 FORMA DE PAGO: ${pagoStr}
👥 REFERIDO: ${referidoStr}
📅 FECHA: ${fechaStr}
🕐 Hora Libre: ${horaStr}
🏫 CEA: Velari
📍 DIRECCIÓN: Av Calle 100 #60d-65, Barrio Rincón de los Andes
🧑💼 ASESOR: ${asesorStr}

POR FAVOR PRESENTE LOS SIGUIENTES DOCUMENTOS PARA MATRÍCULA:
1) Cédula o contraseña en Físico
2) Formato de inscripción diligenciado
3) 2 fotos 3x4 fondo blanco
4) Fotocopia de la cédula ampliada al 150

Ingresa al siguiente link y comprueba la veracidad de nuestra academia.
https://www.runt.gov.co/directorio-de-actores`
          break

        case 'El Agente Guerrero':
          message = `🚗 NUEVO AGENDAMIENTO

📍 CITA: VENECIA
🏫 CEA: AGENTE GUERRERO

👤 NOMBRE: ${nombreStr}
🪪 DOCUMENTO: ${cedulaStr}
📱 CELULAR: ${celularStr}
📋 LICENCIA: ${licenciaStr}
💰 COSTO:
📄 CONDICIONES: ${condicionesStr}
💳 FORMA DE PAGO: ${pagoStr}
👥 REFERIDO: ${referidoStr}
📅 FECHA: ${fechaStr}
🕐 Hora Libre: ${horaStr}
🏫 CEA: Agente Guerrero
📍 DIRECCIÓN: Calle 45a Sur #54a-55 Piso 2
🧑💼 ASESOR: ${asesorStr}

POR FAVOR PRESENTE LOS SIGUIENTES DOCUMENTOS PARA MATRÍCULA:
1) Cédula o contraseña en Físico
2) Formato de inscripción diligenciado
3) 2 fotos 3x4 fondo blanco
4) Fotocopia de la cédula ampliada al 150

Ingresa al siguiente link y comprueba la veracidad de nuestra academia.
https://www.runt.gov.co/directorio-de-actores`
          break

        case 'CEA Auto Xua':
          message = `🚗 NUEVO AGENDAMIENTO

📍 CITA: SOACHA
🏫 CEA: AUTO XUA

👤 NOMBRE: ${nombreStr}
🪪 CÉDULA: ${cedulaStr}
📱 CELULAR: ${celularStr}
📋 LICENCIA: ${licenciaStr}
💰 COSTO:
📄 CONDICIONES: ${condicionesStr}
💳 FORMA DE PAGO: ${pagoStr}
👥 REFERIDO: ${referidoStr}
📅 FECHA: ${fechaStr}
🕐 Hora Libre: ${horaStr}
🏫 CEA: Auto Xua
📍 DIRECCIÓN: Calle 12 #8a-01, Barrio Soacha Parque
🧑💼 ASESOR: ${asesorStr}

POR FAVOR PRESENTE LOS SIGUIENTES DOCUMENTOS PARA MATRÍCULA:
1) Cédula o contraseña en Físico
2) Formato de inscripción diligenciado
3) 2 fotos 3x4 fondo blanco
4) Fotocopia de la cédula ampliada al 150

Ingresa al siguiente link y comprueba la veracidad de nuestra academia.
https://www.runt.gov.co/directorio-de-actores`
          break

        case 'CEA Carvajal':
          message = `🚗 NUEVO AGENDAMIENTO

📍 CITA: KENNEDY
🏫 CEA: CARVAJAL

👤 NOMBRE: ${nombreStr}
🪪 CÉDULA: ${cedulaStr}
📱 CELULAR: ${celularStr}
📋 LICENCIA: ${licenciaStr}
💰 COSTO:
📄 CONDICIONES: ${condicionesStr}
💳 FORMA DE PAGO: ${pagoStr}
👥 REFERIDO: ${referidoStr}
📅 FECHA: ${fechaStr}
🕐 Hora Libre: ${horaStr}
🏫 CEA: Carvajal
📍 DIRECCIÓN: Calle 71d #8-20 Sur, Piso 4
🧑💼 ASESOR: ${asesorStr}

POR FAVOR PRESENTE LOS SIGUIENTES DOCUMENTOS PARA MATRÍCULA:
1) Cédula o contraseña en Físico
2) Formato de inscripción diligenciado
3) 2 fotos 3x4 fondo blanco
4) Fotocopia de la cédula ampliada al 150

Ingresa al siguiente link y comprueba la veracidad de nuestra academia.
https://www.runt.gov.co/directorio-de-actores`
          break

        case 'CEA Al Timón':
          message = `🚗 NUEVO AGENDAMIENTO

📍 CITA: BOSA
🏫 CEA: AL TIMÓN

👤 NOMBRE: ${nombreStr}
🪪 CÉDULA: ${cedulaStr}
📱 CELULAR: ${celularStr}
📋 LICENCIA: ${licenciaStr}
💰 COSTO:
📄 CONDICIONES: ${condicionesStr}
💳 FORMA DE PAGO: ${pagoStr}
👥 REFERIDO: ${referidoStr}
📅 FECHA: ${fechaStr}
🕐 Hora Libre: ${horaStr}
🏫 CEA: Al Timón
📍 DIRECCIÓN: Calle 65D Sur #79C-24/26, Barrio Bosa
🧑💼 ASESOR: ${asesorStr}

POR FAVOR PRESENTE LOS SIGUIENTES DOCUMENTOS PARA MATRÍCULA:
1) Cédula o contraseña en Físico
2) Formato de inscripción diligenciado
3) 2 fotos 3x4 fondo blanco
4) Fotocopia de la cédula ampliada al 150

Ingresa al siguiente link y comprueba la veracidad de nuestra academia.
https://www.runt.gov.co/directorio-de-actores`
          break

        case 'CEA Valuvial':
          message = `🚗 NUEVO AGENDAMIENTO

📍 CITA: CIUDAD BOLÍVAR
🏫 CEA: VALUVIAL

👤 NOMBRE: ${nombreStr}
🪪 CÉDULA: ${cedulaStr}
📱 CELULAR: ${celularStr}
📋 LICENCIA: ${licenciaStr}
💰 COSTO:
📄 CONDICIONES: ${condicionesStr}
💳 FORMA DE PAGO: ${pagoStr}
👥 REFERIDO: ${referidoStr}
📅 FECHA: ${fechaStr}
🕐 Hora Libre: ${horaStr}
🏫 CEA: Valuvial
📍 DIRECCIÓN: Carrera 19d #63-18 Sur, Piso 2, Barrio San Francisco
🧑💼 ASESOR: ${asesorStr}

POR FAVOR PRESENTE LOS SIGUIENTES DOCUMENTOS PARA MATRÍCULA:
1) Cédula o contraseña en Físico
2) Formato de inscripción diligenciado
3) 2 fotos 3x4 fondo blanco
4) Fotocopia de la cédula ampliada al 150

Ingresa al siguiente link y comprueba la veracidad de nuestra academia.
https://www.runt.gov.co/directorio-de-actores`
          break

        case 'CEA Centro Suba':
          message = `🚗 NUEVO AGENDAMIENTO

📍 CITA: CENTRO SUBA
🏫 CEA: CENTRO Suba

👤 NOMBRE: ${nombreStr}
🪪 CÉDULA: ${cedulaStr}
📱 CELULAR: ${celularStr}
📋 LICENCIA: ${licenciaStr}
💰 COSTO:
📄 CONDICIONES: ${condicionesStr}
💳 PAGO DE CONTADO: ${pagoStr}
👥 REFERIDO: ${referidoStr}
📅 FECHA: ${fechaStr}
🕐 Hora Libre: ${horaStr}
🏫 CEA: Centro Suba
📍 DIRECCIÓN: Calle 145 #91-19, Local 1001
🧑💼 ASESOR: ${asesorStr}

POR FAVOR PRESENTE LOS SIGUIENTES DOCUMENTOS PARA MATRÍCULA:
1) Cédula o contraseña en Físico
2) Formato de inscripción diligenciado
3) 2 fotos 3x4 fondo blanco
4) Fotocopia de la cédula ampliada al 150

Ingresa al siguiente link y comprueba la veracidad de nuestra academia.
https://www.runt.gov.co/directorio-de-actores`
          break

        default:
          message = `🚗 NUEVO AGENDAMIENTO
📍 SEDE: ${form.sede}
👤 NOMBRE: ${nombreStr}
🪪 CÉDULA: ${cedulaStr}
📱 CELULAR: ${celularStr}
📋 LICENCIA: ${licenciaStr}
📄 CONDICIONES: ${condicionesStr}
💳 FORMA DE PAGO: ${pagoStr}
👥 REFERIDO: ${referidoStr}
📅 FECHA: ${fechaStr}
🕐 Hora Libre: ${horaStr}
🧑💼 ASESOR: ${asesorStr}`
      }

      // Reemplazar costo en el mensaje de Telegram
      if (precioFinal && precioFinal.isCredito) {
        const provider = form.metodoPago.includes('Addi') ? 'Addi' : 'Sistecrédito'
        const multiLineCost = `💰 COSTO TOTAL con ${provider}: ${formatPrice(precioFinal.total)}\n⚠️ NOTA: Con ${provider} el pago debe ser completo desde el inicio.`
        message = message.replace(/💰 COSTO:/g, multiLineCost)
      } else {
        message = message.replace(/💰 COSTO:/g, `💰 COSTO: ${costStr}`)
      }

      // Petición silenciosa a Telegram Bot API usando fetch
      const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: message
        })
      })

      const data = await response.json()

      if (!response.ok || !data.ok) {
        throw new Error(data.description || 'Error de respuesta de Telegram')
      }

      // Guardar en localStorage antes de limpiar el formulario (anti doble envío + recarga)
      saveSubmission(trimmedCedula)

      // Éxito: limpiar formulario y mostrar mensaje de confirmación
      setForm(initialForm)
      setStatus({ type: 'success', message: '✅ Solicitud enviada correctamente.' })
    } catch (err) {
      console.error('Error al agendar:', err)
      setStatus({
        type: 'error',
        message: 'Ocurrió un error al enviar la solicitud. Por favor, intenta de nuevo.'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="agendar" className="py-24 relative" style={{ background: 'rgba(13,13,13,0.7)' }}>
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(250,204,21,0.06) 0%, transparent 70%)' }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <div className="section-label mb-3">Agenda tu cita</div>
          <h2 className="font-black text-white mb-4" style={{ fontFamily: 'Barlow Condensed', fontSize: 'clamp(2.5rem,5vw,4rem)' }}>
            ¡UN PASO MÁS CERCA<br />DE <span className="text-yellow-400">TU LICENCIA!</span>
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto">
            Diligencia el formulario y un asesor de <strong className="text-yellow-400">Don Juanito Drivers</strong> se comunicará contigo en menos de 24 horas.
          </p>
        </div>

        <div className="glass-card p-8 relative overflow-hidden" style={{ border: '1px solid rgba(250,204,21,0.2)' }}>
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />

          {status.type === 'success' ? (
            <div className="flex flex-col items-center justify-center py-12 text-center gap-4 animate-fade-in">
              <div className="w-20 h-20 rounded-full border-2 border-green-500 flex items-center justify-center animate-float" style={{ borderColor: '#22c55e' }}>
                <CheckCircle2 size={40} className="text-green-500" />
              </div>
              <h3 className="font-black text-white text-3xl" style={{ fontFamily: 'Barlow Condensed', letterSpacing: '0.05em' }}>¡SOLICITUD RECIBIDA!</h3>
              <p className="text-green-400 text-lg font-semibold max-w-md">✅ ¡Tu cita ha sido pre-agendada con éxito!</p>
              
              <div className="text-gray-300 text-sm max-w-sm mb-4 space-y-4">
                <p className="font-medium text-yellow-400/90">
                  Muchas gracias por confiar en Don Juanito Drivers. Que Dios te bendiga enormemente en este nuevo proceso. 🙏
                </p>
                <p>Un asesor se pondrá en contacto contigo lo más pronto posible.</p>
              </div>

              <a 
                href="/"
                className="btn-yellow px-8 py-4 rounded-lg text-sm font-bold flex items-center justify-center gap-2 w-full max-w-xs transition-transform hover:scale-105 active:scale-95 shadow-xl"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                Volver al menú principal
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Mensaje de Error */}
              {status.type === 'error' && (
                <div className="md:col-span-2 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-3 text-red-400 mb-2">
                  <XCircle size={20} className="shrink-0 text-red-400" />
                  <span className="font-semibold">{status.message}</span>
                </div>
              )}

              {/* Aviso de envío duplicado */}
              {duplicateWarning && (
                <div className="md:col-span-2 p-4 bg-yellow-500/10 border border-yellow-400/30 rounded-xl flex items-start gap-3 text-yellow-300 mb-2">
                  <AlertTriangle size={20} className="shrink-0 mt-0.5 text-yellow-400" />
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-sm">{duplicateWarning}</span>
                    <button
                      type="button"
                      onClick={() => abrirWhatsApp('Hola, quiero información sobre las licencias de conducción')}
                      className="text-yellow-400 hover:text-yellow-300 underline text-xs font-medium transition-colors inline-flex items-center gap-1 w-fit"
                    >
                      <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 01-4.243-1.212l-.258-.153-2.844.846.846-2.844-.153-.258A8 8 0 1112 20z"/></svg>
                      Ir a WhatsApp
                    </button>
                  </div>
                </div>
              )}

              {/* Nombre */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="nombre" className="text-gray-400 text-xs uppercase tracking-wider">Nombre completo <span className="text-[#FFD700] font-bold">*</span></label>
                <input 
                  id="nombre"
                  className={`form-input ${errors.nombre ? 'border-red-500 focus:border-red-500' : ''}`} 
                  name="nombre" 
                  placeholder="Tu nombre completo" 
                  value={form.nombre} 
                  onChange={handleChange} 
                  required 
                />
                {errors.nombre && <span className="text-red-500 text-xs font-medium">{errors.nombre}</span>}
              </div>

              {/* Cédula */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="cedula" className="text-gray-400 text-xs uppercase tracking-wider">Número de cédula</label>
                <input 
                  id="cedula"
                  className={`form-input ${errors.cedula ? 'border-red-500 focus:border-red-500' : ''}`} 
                  name="cedula" 
                  placeholder="Tu número de cédula" 
                  value={form.cedula} 
                  onChange={handleChange} 
                />
                {errors.cedula && <span className="text-red-500 text-xs font-medium">{errors.cedula}</span>}
              </div>

              {/* Celular */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="celular" className="text-gray-400 text-xs uppercase tracking-wider">Celular / WhatsApp <span className="text-[#FFD700] font-bold">*</span></label>
                <input 
                  id="celular"
                  className={`form-input ${errors.celular ? 'border-red-500 focus:border-red-500' : ''}`} 
                  name="celular" 
                  type="tel" 
                  placeholder="300 000 0000" 
                  value={form.celular} 
                  onChange={handleChange} 
                  required 
                />
                {errors.celular && <span className="text-red-500 text-xs font-medium">{errors.celular}</span>}
              </div>

              {/* Sede */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="sede" className="text-gray-400 text-xs uppercase tracking-wider">Sede de preferencia <span className="text-[#FFD700] font-bold">*</span></label>
                <select 
                  id="sede"
                  className={`form-input ${errors.sede ? 'border-red-500 focus:border-red-500' : ''}`} 
                  name="sede" 
                  value={form.sede} 
                  onChange={handleChange} 
                  required
                >
                  <option value="" disabled hidden>Selecciona una sede</option>
                  {SEDES_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                {errors.sede && <span className="text-red-500 text-xs font-medium">{errors.sede}</span>}
              </div>

              {/* Categoría */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="categoria" className="text-gray-400 text-xs uppercase tracking-wider">Categoría de licencia <span className="text-[#FFD700] font-bold">*</span></label>
                <select 
                  id="categoria"
                  className={`form-input ${!form.sede ? 'opacity-50 cursor-not-allowed' : ''} ${errors.categoria ? 'border-red-500 focus:border-red-500' : ''}`} 
                  name="categoria" 
                  value={form.categoria} 
                  onChange={handleChange} 
                  required 
                  disabled={!form.sede}
                >
                  <option value="" disabled hidden>
                    {!form.sede ? 'Primero selecciona sede' : preciosLoading ? 'Cargando categorías...' : 'Selecciona una categoría'}
                  </option>
                  {categoriasDisponibles.map(cat => (
                    <option key={cat} value={cat}>{CATEGORIA_LABEL[cat] || cat}</option>
                  ))}
                </select>
                {errors.categoria && <span className="text-red-500 text-xs font-medium">{errors.categoria}</span>}
              </div>

              {/* Método de pago */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="metodoPago" className="text-gray-400 text-xs uppercase tracking-wider">Método de pago <span className="text-[#FFD700] font-bold">*</span></label>
                <select 
                  id="metodoPago"
                  className={`form-input ${!(form.sede && form.categoria) ? 'opacity-50 cursor-not-allowed' : ''} ${errors.metodoPago ? 'border-red-500 focus:border-red-500' : ''}`} 
                  name="metodoPago" 
                  value={form.metodoPago} 
                  onChange={handleChange} 
                  disabled={!(form.sede && form.categoria)}
                  required
                >
                  <option value="" disabled hidden>{!form.sede ? 'Primero selecciona sede' : !form.categoria ? 'Primero selecciona categoría' : 'Selecciona método'}</option>
                  
                  {form.sede === 'CEA Diverplaza (Sede Principal)' ? (
                    <>
                      <option value="De Contado">De Contado</option>
                      <option value="Addi (+7%)">Addi (+7%) ⚠️ Solo matrícula</option>
                      <option value="Sistecrédito (+5%)">Sistecrédito (+5%) ⚠️ Solo matrícula</option>
                      <option value="Me matriculo con el 50%">Me matriculo con el 50%</option>
                    </>
                  ) : (
                    <>
                      <option value="De Contado">De Contado</option>
                      <option value={isComboCategory ? "Me matriculo con 800 Mil" : "Me matriculo con 400 Mil"}>
                        {isComboCategory ? "Me matriculo con 800 Mil" : "Me matriculo con 400 Mil"}
                      </option>
                    </>
                  )}
                </select>
                {errors.metodoPago && <span className="text-red-500 text-xs font-medium">{errors.metodoPago}</span>}
              </div>

              {/* Fecha */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="fecha" className="text-gray-400 text-xs uppercase tracking-wider">Fecha preferida <span className="text-[#FFD700] font-bold">*</span></label>
                <input 
                  id="fecha"
                  className={`form-input ${errors.fecha ? 'border-red-500 focus:border-red-500' : ''}`} 
                  name="fecha" 
                  type="date" 
                  value={form.fecha} 
                  onChange={handleChange} 
                  min={minDate}
                  max={maxDate}
                  required
                  onInvalid={e => e.target.setCustomValidity('Las citas únicamente pueden agendarse dentro de los próximos 7 días.')}
                  onInput={e => e.target.setCustomValidity('')}
                />
                {errors.fecha && <span className="text-red-500 text-xs font-medium">{errors.fecha}</span>}
              </div>

              {/* Hora — opciones dinámicas según la sede seleccionada */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="hora" className="text-gray-400 text-xs uppercase tracking-wider">Hora preferida <span className="text-[#FFD700] font-bold">*</span></label>
                <select 
                  id="hora"
                  className={`form-input ${
                    !form.fecha ? 'opacity-50 cursor-not-allowed' : ''
                  } ${errors.hora ? 'border-red-500 focus:border-red-500' : ''}`} 
                  name="hora" 
                  value={form.hora} 
                  onChange={handleChange}
                  disabled={!form.fecha}
                  required
                >
                  <option value="" disabled hidden>
                    {!form.fecha ? 'Primero selecciona fecha' : 'Selecciona un horario'}
                  </option>
                  {/* Renderizar solo los slots válidos de la sede elegida */}
                  {(HORARIOS_SEDE[form.sede] || []).map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                {errors.hora && <span className="text-red-500 text-xs font-medium">{errors.hora}</span>}
              </div>

              {/* ¿Sabe manejar? — Condicional según sede y categoría */}
              <div className={`flex flex-col gap-1.5 md:col-span-2 ${!(form.sede && form.categoria) ? 'opacity-50 pointer-events-none' : ''}`}>
                {isAutoXua ? (
                  /* Auto Xua: clases prácticas obligatorias, no se pregunta */
                  <>
                    <label className="text-gray-400 text-xs uppercase tracking-wider">Clases prácticas</label>
                    <div className="p-4 rounded-lg flex items-center gap-3" style={{ background: 'rgba(250,204,21,0.08)', border: '1px solid rgba(250,204,21,0.3)' }}>
                      <AlertTriangle size={20} className="text-yellow-400 shrink-0" />
                      <span className="text-sm text-yellow-300 font-medium">
                        En esta sede las clases prácticas son obligatorias. No se permite homologación de experiencia previa.
                      </span>
                    </div>
                  </>
                ) : (
                  /* Otras sedes: mostrar opciones de saber manejar */
                  <>
                    <label className="text-gray-400 text-xs uppercase tracking-wider">¿Ya sabe manejar? <span className="text-[#FFD700] font-bold">*</span></label>
                    <div className="flex flex-wrap gap-3">
                      {[
                        { val: 'Si', label: <><CheckCircle2 size={16} className="inline mr-1" /> {showFourOptions ? 'Sí, ya sé manejar (los dos)' : 'Sí, ya sé manejar'}</> },
                        { val: 'No', label: <><XCircle size={16} className="inline mr-1 text-red-500" /> No, soy principiante</> },
                        // Opciones extra solo para combos A2+B1 o A2+C1 en Diverplaza
                        ...(showFourOptions ? [
                          { val: 'moto_si_carro_no', label: <span className="flex items-center gap-1"><Bike size={16} className="inline mr-1 text-yellow-400" /> Sé manejar moto pero carro no</span> },
                          { val: 'carro_si_moto_no', label: <span className="flex items-center gap-1"><Car size={16} className="inline mr-1 text-yellow-400" /> Sé manejar carro pero moto no</span> },
                        ] : []),
                      ].map(op => (
                        <label key={op.val} className="flex items-center gap-2 cursor-pointer px-4 py-2.5 rounded-lg transition-all"
                          style={{
                            background: form.sabeManejar === op.val ? 'rgba(250,204,21,0.15)' : 'rgba(255,255,255,0.04)',
                            border: `1px solid ${form.sabeManejar === op.val ? 'rgba(250,204,21,0.5)' : 'rgba(255,255,255,0.1)'}`,
                          }}>
                          <input type="radio" name="sabeManejar" value={op.val} checked={form.sabeManejar === op.val} onChange={handleChange} className="sr-only" />
                          <span className="text-sm text-gray-300">{op.label}</span>
                        </label>
                      ))}
                    </div>
                    {errors.sabeManejar && <span className="text-red-500 text-xs font-medium mt-1 block">{errors.sabeManejar}</span>}
                  </>
                )}
              </div>

              {/* Total Price Display */}
              {form.sede && form.categoria && (
                <div className="md:col-span-2 p-4 rounded-xl flex items-center justify-between border animate-fade-in"
                  style={{
                    background: 'rgba(250,204,21,0.05)',
                    borderColor: 'rgba(250,204,21,0.2)',
                  }}>
                  <div>
                    <span className="text-gray-400 text-xs uppercase tracking-wider block font-semibold">Valor Total Licencia</span>
                    <span className="text-gray-500 text-xs mt-0.5 block">Sede: {form.sede} | Categoría: {CATEGORIA_LABEL[form.categoria] || form.categoria}</span>
                  </div>
                  <div className="text-right">
                    {preciosLoading ? (
                      <div className="h-8 w-32 bg-white/10 rounded animate-pulse" />
                    ) : (
                      <>
                        {precioFinal?.isCredito ? (
                          <div className="flex flex-col items-end gap-1">
                            <div className="flex flex-col items-end">
                              <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-0.5">
                                Valor total con {form.metodoPago.includes('Addi') ? 'Addi (+7%)' : 'Sistecrédito (+5%)'}:
                              </span>
                              <span className="text-yellow-400 text-3xl font-black block leading-none" style={{ fontFamily: 'Barlow Condensed' }}>
                                {formatPrice(precioFinal.total)}
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5 mt-2 pt-2 border-t border-yellow-400/20">
                              <span className="text-yellow-500 text-xs">⚠️</span>
                              <span className="text-yellow-500 text-xs font-semibold">
                                Con {form.metodoPago.includes('Addi') ? 'Addi' : 'Sistecrédito'} el pago debe ser completo desde el inicio.
                              </span>
                            </div>
                          </div>
                        ) : precioFinal?.isMatricula ? (
                          <div className="flex flex-col items-end gap-1">
                            <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-0.5">Valor matrícula inicial:</span>
                            <span className="text-yellow-400 text-3xl font-black block leading-none" style={{ fontFamily: 'Barlow Condensed' }}>
                              {formatPrice(precioFinal.inicial)}
                            </span>
                            <div className="flex items-center gap-1.5 mt-2 pt-2 border-t border-yellow-400/20">
                              <span className="text-gray-400 text-xs">Total licencia:</span>
                              <span className="text-white text-xs font-bold">{formatPrice(precioFinal.total)}</span>
                            </div>
                          </div>
                        ) : (
                          <>
                            <span className="text-yellow-400 text-3xl font-black block" style={{ fontFamily: 'Barlow Condensed' }}>
                              {precioFinal ? formatPrice(precioFinal.total) : 'Por definir con asesor'}
                            </span>
                            <span className="text-gray-400 text-xs">{getPrecioLabel(form.metodoPago)}</span>
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Nota Informativa */}
              <div className="md:col-span-2 text-xs text-[#FFD700] font-semibold flex items-center gap-1.5">
                <span>⭐ Los campos marcados con <span className="text-[#FFD700] font-bold">*</span> son obligatorios.</span>
              </div>

              {/* Legal */}
              <div className="md:col-span-2 text-xs text-gray-500">
                Al enviar aceptas nuestra{' '}
                <a href="#legal" className="text-yellow-400 hover:underline">política de privacidad</a>{' '}
                y el tratamiento de datos personales conforme a la Ley 1581 de 2012.
              </div>

              {/* Submit */}
              <div className="md:col-span-2">
                <button type="submit" className="btn-yellow w-full justify-center text-base py-4 rounded-lg" disabled={loading}>
                  {loading ? (
                    <>
                      <svg className="animate-spin" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" strokeOpacity="0.3" /><path d="M12 2a10 10 0 0110 10" /></svg>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                      Agendar mi cita ahora
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

