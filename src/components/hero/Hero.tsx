"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { CameraHUD } from './CameraHUD'

export const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-brand-secondary">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover brightness-50 opacity-60"
      >
        <source src="/videos/fashion-idol.mp4" type="video/mp4" />
      </video>

      {/* Aesthetic Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-secondary via-transparent to-brand-secondary/50 pointer-events-none" />
      
      {/* Camera HUD Overlay */}
      <CameraHUD />

      {/* Main Content */}
      <div className="relative z-30 h-full w-full flex flex-col items-center justify-center text-center px-4">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
           className="flex flex-col items-center"
        >
          <h1 className="text-9xl md:text-[10rem] lg:text-[14rem] big-text brand-text leading-tight md:leading-[0.8]">
            Idol<br />Fashion
          </h1>
          <h2 className="brand-text mt-4 tracking-[0.5em] opacity-80 text-sm md:text-base">
            The Elite Lab
          </h2>
          
          <div className="flex flex-col md:flex-row gap-4 md:gap-12 mt-8 md:mt-12 items-center">
             <p className="max-w-md text-sm md:text-base opacity-40 leading-relaxed tracking-wider detail-text">
                Where technical precision meets high-fashion evolution. The industry's premier development incubator.
             </p>
             
             <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 md:px-8 md:py-4 bg-white text-black text-[10px] md:text-sm tracking-widest uppercase hover:bg-accent hover:text-white transition-colors duration-300 pointer-events-auto mt-6 md:mt-0 detail-text"
                onClick={() => document.getElementById('apply-section')?.scrollIntoView({ behavior: 'smooth' })}
             >
                Initialize Application
             </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Bottom Coordinates */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 opacity-30">
        <div className="h-[1px] w-12 bg-white" />
        <span className="font-mono text-[10px] tracking-widest">25.7617° N, 80.1918° W | DORAL HQ</span>
        <div className="h-[1px] w-12 bg-white" />
      </div>
    </section>
  )
}
