import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

/**
 * Hook que carga los precios de una sede desde Supabase (tabla 'Precios').
 * Retorna { precios, loading, error }.
 * El descuento de contado se calcula en el frontend: precio - 50000.
 */
export function usePrecios(nombreSede) {
  const [precios, setPrecios] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!nombreSede) return
    let cancelled = false

    const fetchPrecios = async () => {
      setLoading(true)
      setError(null)

      const { data, error: sbError } = await supabase
        .from('Precios')
        .select('*')
        .eq('sede', nombreSede)
        .eq('activo', true)
        .order('categoria')

      if (cancelled) return

      if (sbError) {
        setError(sbError)
        setPrecios(null)
      } else {
        setPrecios(data)
      }
      setLoading(false)
    }

    fetchPrecios()
    return () => { cancelled = true }
  }, [nombreSede])

  return { precios, loading, error }
}
