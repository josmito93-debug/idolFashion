"use client"

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export const LoadingCalibration = () => {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(() => setLoading(false), 800)
          return 100
        }
        return prev + (Math.random() * 15)
      })
    }, 150)
    return () => clearInterval(timer)
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div 
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black flex items-center justify-center p-12"
        >
          <div className="max-w-md w-full">
            <div className="flex justify-between items-end mb-4">
              <div className="flex flex-col">
                <span className="camera-hud-text text-accent">Calibration</span>
                <span className="big-text text-3xl">Elite Lab OS</span>
              </div>
              <span className="font-mono text-xl tabular-nums">{Math.floor(progress)}%</span>
            </div>
            
            <div className="w-full h-[2px] bg-white/5 relative overflow-hidden">
               <motion.div 
                 className="absolute top-0 left-0 h-full bg-white"
                 animate={{ width: `${progress}%` }}
               />
            </div>

            <div className="mt-8 grid grid-cols-2 gap-8 h-20">
               <div className="flex flex-col opacity-30">
                  <span className="camera-hud-text text-[8px]">Bios Version</span>
                  <span className="font-mono text-[10px]">20.26.04.A</span>
               </div>
               <div className="flex flex-col opacity-30">
                  <span className="camera-hud-text text-[8px]">Security Protocol</span>
                  <span className="font-mono text-[10px]">Encrypted // Elite-RSA</span>
               </div>
            </div>

            <motion.div 
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="mt-12 text-center"
            >
              <span className="camera-hud-text text-[10px] tracking-[0.5em]">Establishing Neural Connection...</span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
