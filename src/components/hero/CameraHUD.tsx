"use client"

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Battery, Zap, AlertCircle } from 'lucide-react'

export const CameraHUD = () => {
  const [time, setTime] = useState('00:00:00:00')
  const [iso, setIso] = useState(800)

  useEffect(() => {
    const start = Date.now()
    const interval = setInterval(() => {
      const elapsed = Date.now() - start
      const h = Math.floor(elapsed / 3600000).toString().padStart(2, '0')
      const m = Math.floor((elapsed % 3600000) / 60000).toString().padStart(2, '0')
      const s = Math.floor((elapsed % 60000) / 1000).toString().padStart(2, '0')
      const ms = Math.floor((elapsed % 1000) / 10).toString().padStart(2, '0')
      setTime(`${h}:${m}:${s}:${ms}`)
      
      // Subtle ISO oscillation for "realism"
      if (Math.random() > 0.95) setIso(prev => Math.max(100, Math.min(3200, prev + (Math.random() > 0.5 ? 100 : -100))))
    }, 10)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-40 p-6 md:p-12 flex flex-col justify-between overflow-hidden">
      {/* Top HUD */}
      <div className="flex justify-between items-start">
        <div className="flex gap-8">
          <div className="flex flex-col">
            <span className="camera-hud-text">REC</span>
            <div className="flex items-center gap-2">
              <motion.div 
                animate={{ opacity: [1, 0, 1] }} 
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-3 h-3 rounded-full bg-accent"
              />
              <span className="text-xl font-mono tabular-nums leading-none">{time}</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="camera-hud-text">STATUS</span>
            <span className="text-xl font-mono leading-none">STBY</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end">
            <span className="camera-hud-text">POWER</span>
            <div className="flex items-center gap-2">
              <span className="text-xl font-mono leading-none">98%</span>
              <Battery className="w-5 h-5 text-white/50" />
            </div>
          </div>
        </div>
      </div>

      {/* Middle: Focus Brackets */}
      <div className="absolute inset-0 flex items-center justify-center p-20">
        <div className="relative w-full h-full max-w-[800px] max-h-[500px]">
          {/* Top Left */}
          <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-white/40" />
          {/* Top Right */}
          <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-white/40" />
          {/* Bottom Left */}
          <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-white/40" />
          {/* Bottom Right */}
          <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-white/40" />

          {/* Central Crosshair */}
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-8 h-[2px] bg-white/20 absolute" />
             <div className="h-8 w-[2px] bg-white/20 absolute" />
          </div>
        </div>
      </div>

      {/* Bottom HUD */}
      <div className="flex justify-between items-end">
        <div className="flex gap-8">
          <div className="flex flex-col">
            <span className="camera-hud-text">ISO</span>
            <span className="text-xl font-mono tabular-nums leading-none tracking-tight">{iso}</span>
          </div>
          <div className="flex flex-col">
            <span className="camera-hud-text">APERTURE</span>
            <span className="text-xl font-mono leading-none tracking-tight">f/2.8</span>
          </div>
          <div className="flex flex-col">
            <span className="camera-hud-text">SHUTTER</span>
            <span className="text-xl font-mono leading-none tracking-tight">1/125</span>
          </div>
        </div>

        <div className="flex flex-col items-end">
          <div className="flex gap-4">
             <div className="flex flex-col items-end">
                <span className="camera-hud-text">FOCAL</span>
                <span className="text-xl font-mono leading-none tracking-tight">35mm</span>
             </div>
             <div className="flex flex-col items-end">
                <span className="camera-hud-text">WB</span>
                <span className="text-xl font-mono leading-none tracking-tight">5600K</span>
             </div>
          </div>
        </div>
      </div>

      {/* Rule of Thirds Grid (Subtle) */}
      <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 opacity-5 pointer-events-none">
        <div className="border-r border-b border-white" />
        <div className="border-r border-b border-white" />
        <div className="border-b border-white" />
        <div className="border-r border-b border-white" />
        <div className="border-r border-b border-white" />
        <div className="border-b border-white" />
        <div className="border-r border-white" />
        <div className="border-r border-white" />
        <div />
      </div>
    </div>
  )
}
