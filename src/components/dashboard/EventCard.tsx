"use client"

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Calendar, Camera, ArrowRight, Layers } from 'lucide-react'

interface EventCardProps {
  id: string
  name: string
  date: string
  image: string
  photoCount: number
  photographerCount: number
}

export const EventCard = ({ id, name, date, image, photoCount, photographerCount }: EventCardProps) => {
  return (
    <Link href={`/dashboard/events/${id}`}>
      <motion.div
        whileHover={{ y: -10 }}
        className="glass-card rounded-2xl overflow-hidden group cursor-pointer border-white/5 hover:border-accent/40 transition-all duration-500"
      >
        {/* Image Container */}
        <div className="relative h-64 overflow-hidden">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-secondary via-transparent to-transparent opacity-60" />
          
          {/* HUD Overlay */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-start pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="camera-hud-text text-[8px] px-2 py-1 bg-accent/80 text-white rounded-sm">[ LIVE_VIEW ]</div>
            <div className="camera-hud-text text-[8px] px-2 py-1 bg-black/40 text-white rounded-sm">ISO 100</div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="flex justify-between items-start">
            <h3 className="brand-text text-xl group-hover:text-accent transition-colors">{name}</h3>
            <div className="p-2 rounded-full bg-white/5 border border-white/5 group-hover:bg-accent/10 group-hover:border-accent/20 transition-all">
              <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-accent" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 opacity-30">
                <Calendar className="w-3 h-3" />
                <span className="camera-hud-text text-[8px] uppercase tracking-widest">Date</span>
              </div>
              <p className="detail-text text-[10px] uppercase tracking-wider">{date}</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 opacity-30">
                <Camera className="w-3 h-3" />
                <span className="camera-hud-text text-[8px] uppercase tracking-widest">Assets</span>
              </div>
              <p className="detail-text text-[10px] uppercase tracking-wider">{photoCount} PHOTOS</p>
            </div>
          </div>

          {/* Progress / Status Bar */}
          <div className="pt-4 border-t border-white/5 flex items-center justify-between">
             <div className="flex items-center gap-2">
                <Layers className="w-3 h-3 text-accent opacity-40" />
                <span className="camera-hud-text text-[8px] opacity-40 uppercase tracking-[0.2em]">{photographerCount} Photographers</span>
             </div>
             <span className="camera-hud-text text-[8px] text-accent opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest">Explore Event</span>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}
