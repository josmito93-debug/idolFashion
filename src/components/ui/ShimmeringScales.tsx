"use client"

import React, { useMemo } from 'react'
import { motion } from 'framer-motion'

export const ShimmeringScales = () => {
  // Generate a set of tiny "scales" with random positions and animation properties
  const scales = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 5
    }))
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
      {scales.map((scale) => (
        <motion.div
          key={scale.id}
          className="absolute bg-white rounded-full"
          style={{
            left: `${scale.x}%`,
            top: `${scale.y}%`,
            width: scale.size,
            height: scale.size,
            filter: 'blur(0.5px)',
          }}
          animate={{
            x: [0, 50, 0, -50, 0],
            opacity: [0, 0.8, 0, 0.8, 0],
            scale: [1, 1.5, 1, 1.5, 1]
          }}
          transition={{
            duration: scale.duration,
            repeat: Infinity,
            delay: scale.delay,
            ease: "easeInOut"
          }}
        />
      ))}
      
      {/* Horizontal sweeping gloss */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent w-1/2 h-full"
        animate={{
          x: ['-100%', '200%']
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
          delay: 1
        }}
      />
    </div>
  )
}
