"use client"

import React from 'react'
import { motion } from 'framer-motion'

export const StadiumWaveGrid = () => {
  const columns = 25
  const rows = 12
  const totalDots = columns * rows

  return (
    <div className="absolute inset-0 grid gap-[3px] p-[2px] pointer-events-none opacity-30"
         style={{ 
           gridTemplateColumns: `repeat(${columns}, 1fr)`,
           gridTemplateRows: `repeat(${rows}, 1fr)` 
         }}>
      {Array.from({ length: totalDots }).map((_, i) => {
        const col = i % columns
        const row = Math.floor(i / columns)
        
        // Calculate distance from center to create a wave feel, or just horizontal
        const delay = col * 0.08 + row * 0.02

        return (
          <motion.div
            key={i}
            className="w-[1.5px] h-[1.5px] bg-black rounded-full mx-auto"
            animate={{
              opacity: [0.1, 0.8, 0.1],
              scale: [1, 2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: delay,
              ease: "easeInOut"
            }}
          />
        )
      })}
    </div>
  )
}
