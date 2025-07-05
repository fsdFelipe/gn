'use client'
import React from 'react'
import { FaFacebookF, FaInstagram, FaMapLocationDot, FaXTwitter, FaYoutube } from 'react-icons/fa6'
import Image from 'next/image'
import { useLocation } from '@/hooks/useLocation'
import { useWeather } from '@/hooks/useWeather'

const Topbar = () => {
  const { city, region } = useLocation()
  const weather = useWeather(city)

  const getFormattedDate = () => {
    const now = new Date()
    return new Intl.DateTimeFormat('pt-BR', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
    }).format(now)
  }

  return (
    <div className='bg-white w-full h-8 flex items-center justify-between border-b px-4 text-sm shadow-sm shadow-b'>
      {/* Local + Data + Clima */}
      <div className='flex items-center gap-4'>
        {/* Local */}
        <div className='flex items-center gap-1'>
          <FaMapLocationDot />
          <p>{city}{region && ` - ${region}`}</p>
        </div>

        {/* Data */}
        <div>{getFormattedDate()}</div>

        {/* Clima */}
        {!weather ? (
          <span>Clima não disponível</span>
        ) : (
          <div className='flex items-center gap-1'>
            <Image src={weather.icon} alt="Clima" width={20} height={20} />
            <span>{weather.temp}°C</span>
          </div>
        )}

      </div>

      {/* Logo */}
      <div>
        <h1>Logo</h1>
      </div>

      {/* Redes sociais */}
      <div className='flex items-center gap-2'>
        <FaXTwitter />
        <FaFacebookF />
        <FaInstagram />
        <FaYoutube />
      </div>
    </div>
  )
}

export default Topbar
