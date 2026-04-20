"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const FONTS = [
  { id: 'default', name: 'Original', variable: 'var(--font-mono)', scale: '1' },
  { id: 'aestica', name: 'Aestica', variable: 'var(--font-aestica)', scale: '1.5' },
  { id: 'vongks', name: 'Vongks', variable: 'var(--font-vongks)', scale: '1.4' },
  { id: 'domica', name: 'Domica Sauvage', variable: 'var(--font-domica)', scale: '1.3' },
]

export const FontSwitcher = () => {
  const [selectedFont, setSelectedFont] = useState(FONTS[0])

  useEffect(() => {
    // Apply for both root and body to ensure all downstream components pick it up
    const root = document.documentElement
    root.style.setProperty('--font-detail-active', selectedFont.variable)
    root.style.setProperty('--detail-scale', selectedFont.scale)
    
    // Fallback/Force update if needed for specific browser engines
    document.body.style.setProperty('--font-detail-active', selectedFont.variable)
    document.body.style.setProperty('--detail-scale', selectedFont.scale)
  }, [selectedFont])

  return (
    <div className="fixed bottom-8 left-8 z-[100] flex flex-col gap-2 pointer-events-auto">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
        <p className="camera-hud-text text-[10px] opacity-100 bg-black/40 px-2 py-0.5">DETAIL CALIBRATION // ACTIVE: {selectedFont.name}</p>
      </div>
      <div className="flex gap-2">
        {FONTS.map((f) => (
          <button
            key={f.id}
            onClick={() => setSelectedFont(f)}
            className={`px-3 py-1.5 border font-mono text-[9px] uppercase tracking-widest transition-all duration-300 ${
              selectedFont.id === f.id 
                ? 'bg-accent border-accent text-white scale-110' 
                : 'bg-black/80 border-white/10 text-white/50 hover:border-white/30'
            }`}
          >
            {f.name}
          </button>
        ))}
      </div>
    </div>
  )
}
