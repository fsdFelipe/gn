// hooks/useLocation.ts
'use client'
import { useEffect, useState } from 'react'

interface LocationData {
  city: string
  region: string
}

export const useLocation = () => {
  const [location, setLocation] = useState<LocationData>({ city: 'Carregando...', region: '' })

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const res = await fetch('https://ipapi.co/json/')
        const data = await res.json()
        setLocation({ city: data.city, region: data.region })
      } catch (error) {
        console.error('Erro ao buscar localização:', error)
        setLocation({ city: 'Local desconhecido', region: '' })
      }
    }

    fetchLocation()
  }, [])

  return location
}
