"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { CameraHUD } from './CameraHUD'
import { StadiumWaveGrid } from '../ui/StadiumWaveGrid'
import Link from 'next/link'

export const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-brand-secondary">
      {/* Background Video - Fixed Path */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/assets/20250913_154417.jpg"
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
           className="flex flex-col items-center -translate-y-10 md:translate-y-0"
        >
          <motion.img 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            src="/assets/logo.png" 
            alt="Idol Fashion Logo" 
            className="h-10 md:h-24 mb-4 md:mb-8 object-contain"
          />
          <h1 className="text-7xl md:text-[10rem] lg:text-[14rem] big-text brand-text leading-[0.85] md:leading-[0.8]">
            Idol<br />Fashion
          </h1>
          <h2 className="brand-text mt-3 md:mt-4 tracking-[0.5em] opacity-80 text-[8px] md:text-base uppercase">
            THE ELITE LAB
          </h2>
          
          <div className="flex flex-col items-center gap-6 md:gap-8 mt-10 md:mt-12">
            <p className="max-w-[260px] md:max-w-md text-[8px] md:text-base opacity-40 leading-relaxed tracking-wider detail-text uppercase text-center font-medium">
              Where technical precision meets high-fashion evolution. The industry&apos;s premier development incubator.
            </p>
            
            <div className="flex flex-col md:flex-row gap-3 md:gap-8 items-center relative z-50 pointer-events-auto">
              <button
                onClick={() => document.getElementById('apply-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-6 py-2.5 md:px-10 md:py-5 bg-white text-black text-[9px] md:text-sm tracking-widest uppercase border border-transparent hover:border-accent/30 transition-all duration-300 detail-text relative overflow-hidden group shadow-sm flex items-center justify-center min-w-[220px] md:min-w-[280px]"
              >
                <span className="relative z-10">Join the Industry</span>
                <StadiumWaveGrid />
              </button>

              <Link
                href="/model-portfolios"
                className="px-6 py-2.5 md:px-10 md:py-5 border border-white/20 text-white text-[9px] md:text-sm tracking-widest uppercase hover:bg-white/5 transition-all duration-300 detail-text min-w-[220px] md:min-w-[280px] text-center"
              >
                Scale your model career
              </Link>
            </div>

            {/* Mobile Download Button - Moved Up */}
            <Link
              href="/login"
              className="md:hidden -mt-2 flex flex-col items-center group relative z-50 pointer-events-auto"
            >
              <span className="camera-hud-text text-[6px] opacity-40 mb-0.5 tracking-[0.2em]">CLIENT_ACCESS</span>
              <span className="text-[9px] font-mono tracking-[0.3em] animate-shimmer-gradient border-b border-white/10 group-hover:border-accent transition-all font-bold">
                DOWNLOAD MY PHOTOS
              </span>
            </Link>
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
