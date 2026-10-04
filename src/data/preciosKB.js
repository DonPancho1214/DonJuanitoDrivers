// ============================================================
// preciosKB.js — Base de Conocimientos Comercial v2.3 (Septiembre 2026)
// Don Juanito Drivers — Tarifas Oficiales Contado y Financiado
// ============================================================

export const PRECIOS_KB = {
  'CEA Diverplaza': {
    nombre: 'CEA Diverplaza',
    esPrincipal: true,
    descuentoContadoMax: 50000,
    aceptaAddiSistecredito: true,
    sinHomologaciones: false,
    referido: 'JUAN ANDRES JULIO',
    precios: {
      'A2': {
        conPracticas: 940000,
        sinPracticas: 790000,
        contadoCon: 890000,
        contadoSin: 740000,
        horasPractica: '10 horas de práctica',
      },
      'B1': {
        conPracticas: 1200000,
        sinPracticas: 950000,
        contadoCon: 1150000,
        contadoSin: 900000,
        horasPractica: '15 horas de práctica',
      },
      'C1': {
        conPracticas: 1270000,
        sinPracticas: 1030000,
        contadoCon: 1220000,
        contadoSin: 980000,
        horasPractica: '15 horas de práctica',
      },
      'A2/B1': {
        conPracticas: 1995000,
        sinPracticas: 1570000,
        contadoCon: 1945000,
        contadoSin: 1520000,
        horasPractica: 'Combo Moto + Carro',
      },
      'A2/C1': {
        conPracticas: 2000000,
        sinPracticas: 1620000,
        contadoCon: 1950000,
        contadoSin: 1570000,
        horasPractica: 'Combo Moto + Público',
      },
    },
  },

  'Conductores Bogotá': {
    nombre: 'Conductores Bogotá',
    esPrincipal: false,
    descuentoContadoMax: 0,
    aceptaAddiSistecredito: false,
    sinHomologaciones: false,
    referido: 'CAMILO VELANDIA',
    habilitadaC2: true,
    precios: {
      'A2': {
        conPracticas: 1000000,
        sinPracticas: 910000,
        contadoCon: 900000,
        contadoSin: 810000,
      },
      'B1': {
        conPracticas: 1200000,
        sinPracticas: 1000000,
        contadoCon: 1100000,
        contadoSin: 900000,
      },
      'C1': {
        conPracticas: 1350000,
        sinPracticas: 1020000,
        contadoCon: 1250000,
        contadoSin: 920000,
      },
      'C2': {
        conPracticas: 1370000,
        sinPracticas: 1080000,
        contadoCon: 1270000,
        contadoSin: 980000,
        nota: 'Camión sencillo (máx. 4h diarias)',
      },
      'A2/B1': {
        conPracticas: 2200000,
        sinPracticas: 1910000,
        contadoCon: 2000000,
        contadoSin: 1710000,
      },
      'A2/C1': {
        conPracticas: 2350000,
        sinPracticas: 1930000,
        contadoCon: 2150000,
        contadoSin: 1730000,
      },
    },
  },

  'CEA Velari': {
    nombre: 'CEA Velari',
    esPrincipal: false,
    descuentoContadoMax: 0,
    aceptaAddiSistecredito: false,
    sinHomologaciones: false,
    referido: 'CAMILO VELANDIA',
    aceptaCesantias: true,
    precios: {
      'A2': {
        conPracticas: 1000000,
        sinPracticas: 810000,
        contadoCon: 900000,
        contadoSin: 710000,
      },
      'B1': {
        conPracticas: 1180000,
        sinPracticas: 930000,
        contadoCon: 1080000,
        contadoSin: 830000,
      },
      'C1': {
        conPracticas: 1310000,
        sinPracticas: 1030000,
        contadoCon: 1210000,
        contadoSin: 930000,
      },
      'A2/B1': {
        conPracticas: 2180000,
        sinPracticas: 1740000,
        contadoCon: 1980000,
        contadoSin: 1540000,
      },
      'A2/C1': {
        conPracticas: 2310000,
        sinPracticas: 1840000,
        contadoCon: 2110000,
        contadoSin: 1640000,
      },
    },
  },

  'El Agente Guerrero': {
    nombre: 'El Agente Guerrero',
    esPrincipal: false,
    descuentoContadoMax: 0,
    aceptaAddiSistecredito: false,
    sinHomologaciones: false,
    referido: 'CAMILO VELANDIA',
    precios: {
      'A2': {
        conPracticas: 1010000,
        sinPracticas: 930000,
        contadoCon: 910000,
        contadoSin: 830000,
      },
      'B1': {
        conPracticas: 1290000,
        sinPracticas: 1070000,
        contadoCon: 1190000,
        contadoSin: 970000,
      },
      'C1': {
        conPracticas: 1490000,
        sinPracticas: 1030000,
        contadoCon: 1390000,
        contadoSin: 930000,
      },
      'A2/B1': {
        conPracticas: 2300000,
        sinPracticas: 2000000,
        contadoCon: 2100000,
        contadoSin: 1800000,
      },
      'A2/C1': {
        conPracticas: 2500000,
        sinPracticas: 1960000,
        contadoCon: 2300000,
        contadoSin: 1760000,
      },
    },
  },

  'CEA Auto Xua': {
    nombre: 'CEA Auto Xua',
    esPrincipal: false,
    descuentoContadoMax: 0,
    aceptaAddiSistecredito: false,
    sinHomologaciones: true, // Cero homologaciones: curso completo obligatorio
    referido: 'CAMILO VELANDIA',
    precios: {
      'A2': {
        conPracticas: 1090000,
        contadoCon: 990000,
      },
      'B1': {
        conPracticas: 1350000,
        contadoCon: 1250000,
      },
      'C1': {
        conPracticas: 1490000,
        contadoCon: 1390000,
      },
      'A2/B1': {
        conPracticas: 2440000,
        contadoCon: 2240000,
      },
      'A2/C1': {
        conPracticas: 2580000,
        contadoCon: 2380000,
      },
    },
  },

  'CEA Carvajal': {
    nombre: 'CEA Carvajal',
    esPrincipal: false,
    descuentoContadoMax: 0,
    aceptaAddiSistecredito: false,
    sinHomologaciones: false,
    referido: 'CAMILO VELANDIA',
    picoYCedula: true,
    precios: {
      'A2': {
        conPracticas: 1200000,
        sinPracticas: 1000000,
        contadoCon: 1200000,
        contadoSin: 990000,
      },
      'B1': {
        conPracticas: 1350000,
        sinPracticas: 1180000,
        contadoCon: 1320000,
        contadoSin: 1100000,
      },
      'C1': {
        conPracticas: 1480000,
        sinPracticas: 1270000,
        contadoCon: 1450000,
        contadoSin: 1200000,
      },
      'A2/B1': {
        conPracticas: 2450000,
        sinPracticas: 2180000,
        contadoCon: 2520000,
        contadoSin: 2090000,
      },
      'A2/C1': {
        conPracticas: 2650000,
        sinPracticas: 2270000,
        contadoCon: 2650000,
        contadoSin: 2190000,
      },
    },
  },

  'CEA Al Timón': {
    nombre: 'CEA Al Timón',
    esPrincipal: false,
    descuentoContadoMax: 0,
    aceptaAddiSistecredito: false,
    sinHomologaciones: false,
    referido: 'CAMILO VELANDIA',
    precios: {
      'A2': {
        conPracticas: 1000000,
        sinPracticas: 830000,
        contadoCon: 900000,
        contadoSin: 730000,
      },
      'B1': {
        conPracticas: 1200000,
        sinPracticas: 900000,
        contadoCon: 1100000,
        contadoSin: 800000,
      },
      'C1': {
        conPracticas: 1390000,
        sinPracticas: 1040000,
        contadoCon: 1290000,
        contadoSin: 940000,
      },
      'A2/B1': {
        conPracticas: 2200000,
        sinPracticas: 1730000,
        contadoCon: 2000000,
        contadoSin: 1530000,
      },
      'A2/C1': {
        conPracticas: 2390000,
        sinPracticas: 1870000,
        contadoCon: 2190000,
        contadoSin: 1670000,
      },
    },
  },

  'CEA Valuvial': {
    nombre: 'CEA Valuvial',
    esPrincipal: false,
    descuentoContadoMax: 0,
    aceptaAddiSistecredito: false,
    sinHomologaciones: false,
    referido: 'CAMILO VELANDIA',
    aforoMax4h: true,
    precios: {
      'A2': {
        conPracticas: 1000000,
        sinPracticas: 810000,
        contadoCon: 900000,
        contadoSin: 710000,
      },
      'B1': {
        conPracticas: 1220000,
        sinPracticas: 930000,
        contadoCon: 1120000,
        contadoSin: 830000,
      },
      'C1': {
        conPracticas: 1380000,
        sinPracticas: 1030000,
        contadoCon: 1280000,
        contadoSin: 930000,
      },
      'A2/B1': {
        conPracticas: 2220000,
        sinPracticas: 1740000,
        contadoCon: 2020000,
        contadoSin: 1540000,
      },
      'A2/C1': {
        conPracticas: 2380000,
        sinPracticas: 1840000,
        contadoCon: 2180000,
        contadoSin: 1640000,
      },
    },
  },

  'CEA Centro Suba': {
    nombre: 'CEA Centro Suba',
    esPrincipal: false,
    descuentoContadoMax: 0,
    aceptaAddiSistecredito: false,
    sinHomologaciones: false,
    referido: 'CAMILO VELANDIA',
    precios: {
      'A2': {
        conPracticas: 1030000,
        sinPracticas: 950000,
        contadoCon: 930000,
        contadoSin: 850000,
      },
      'B1': {
        conPracticas: 1340000,
        sinPracticas: 1030000,
        contadoCon: 1240000,
        contadoSin: 930000,
      },
      'C1': {
        conPracticas: 1420000,
        sinPracticas: 1060000,
        contadoCon: 1320000,
        contadoSin: 960000,
      },
      'A2/B1': {
        conPracticas: 2370000,
        sinPracticas: 1980000,
        contadoCon: 2170000,
        contadoSin: 1780000,
      },
      'A2/C1': {
        conPracticas: 2450000,
        sinPracticas: 2010000,
        contadoCon: 2250000,
        contadoSin: 1810000,
      },
    },
  },
}

/**
 * Normaliza el nombre de la sede al nombre de clave canónico en PRECIOS_KB
 */
export function normalizarNombreSede(nombre) {
  if (!nombre) return ''
  if (nombre.includes('Diverplaza')) return 'CEA Diverplaza'
  if (nombre.includes('Conductores')) return 'Conductores Bogotá'
  if (nombre.includes('Velari')) return 'CEA Velari'
  if (nombre.includes('Guerrero')) return 'El Agente Guerrero'
  if (nombre.includes('Auto Xua') || nombre.includes('AutoXua')) return 'CEA Auto Xua'
  if (nombre.includes('Carvajal')) return 'CEA Carvajal'
  if (nombre.includes('Al Timón') || nombre.includes('Al Timon')) return 'CEA Al Timón'
  if (nombre.includes('Valuvial')) return 'CEA Valuvial'
  if (nombre.includes('Centro Suba')) return 'CEA Centro Suba'
  return nombre
}

/**
 * Obtiene las tarifas de una sede según categoría y modalidad (con prácticas / sin prácticas)
 */
export function getTarifaSede(nombreSede, categoria, conPracticas = true) {
  const sedeKey = normalizarNombreSede(nombreSede)
  const sedeData = PRECIOS_KB[sedeKey]
  if (!sedeData || !sedeData.precios[categoria]) return null

  const catData = sedeData.precios[categoria]

  if (sedeData.sinHomologaciones) {
    return {
      financiado: catData.conPracticas,
      contado: catData.contadoCon,
      esSedePrincipal: !!sedeData.esPrincipal,
      aceptaAddiSistecredito: !!sedeData.aceptaAddiSistecredito,
      descuentoContadoMax: sedeData.descuentoContadoMax,
      referido: sedeData.referido,
    }
  }

  return {
    financiado: conPracticas ? catData.conPracticas : (catData.sinPracticas || catData.conPracticas),
    contado: conPracticas ? catData.contadoCon : (catData.contadoSin || catData.contadoCon),
    esSedePrincipal: !!sedeData.esPrincipal,
    aceptaAddiSistecredito: !!sedeData.aceptaAddiSistecredito,
    descuentoContadoMax: sedeData.descuentoContadoMax,
    referido: sedeData.referido,
  }
}
