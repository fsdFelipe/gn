// hooks/useWeather.ts
'use client'
import { useEffect, useState } from 'react'

interface WeatherData {
  temp: number
  icon: string
}

export const useWeather = (city: string) => {
  const [weather, setWeather] = useState<WeatherData | null>(null)

  useEffect(() => {
    const fetchWeather = async () => {
      if (!city || city === 'Local desconhecido') return

      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city},BR&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_KEY}&units=metric&lang=pt_br`
        )
        const data = await res.json()

        // ⚠️ Verifica se a resposta é válida
        if (res.ok && data.main && data.weather) {
          setWeather({
            temp: Math.round(data.main.temp),
            icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
          })
        } else {
          console.warn('Resposta inesperada da API de clima:', data)
        }
      } catch (error) {
        console.error('Erro ao buscar clima:', error)
      }
    }

    fetchWeather()
  }, [city])

  return weather
}
