"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Zap, ShieldCheck, Target } from 'lucide-react'
import Link from 'next/link'

const TEASER_VIDEOS = [
  '/assets/DFW%209TH%20PROMO%201304%20b.mp4',
  '/assets/DFW%209TH%20PROMO%201304%20c.mp4',
  '/assets/lv_0_20251013183505.mp4'
]

export const ModelSalesTeaser = () => {
  return (
    <section className="py-32 bg-black relative overflow-hidden border-t border-white/5">
      {/* HUD Background Grid */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      
      <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          
          {/* Left: Persuasive Copy */}
          <div className="space-y-12">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-accent/20 bg-accent/5"
            >
              <Zap className="w-4 h-4 text-accent" />
              <span className="camera-hud-text text-[10px] tracking-[0.3em] uppercase text-accent">Infrastructure Upgrade</span>
            </motion.div>

            <div className="space-y-6">
              <h2 className="text-6xl md:text-8xl brand-text leading-[0.9]">
                THE NEXT <br/><span className="text-accent">EVOLUTION.</span>
              </h2>
              <p className="detail-text text-sm md:text-lg opacity-40 uppercase tracking-[0.2em] leading-relaxed max-w-xl">
                Go beyond the static profile. Own your domain, your data, and your professional future. Precision-engineered portfolios for models who demand more than a link in bio.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8 border-t border-white/5">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Target className="w-5 h-5 text-accent" />
                  <h4 className="camera-hud-text text-xs uppercase tracking-widest">Brand ROI</h4>
                </div>
                <p className="detail-text text-[10px] opacity-40 uppercase leading-relaxed">
                  Demonstrate your market value with integrated tracking and verified reach data.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-accent" />
                  <h4 className="camera-hud-text text-xs uppercase tracking-widest">Global Status</h4>
                </div>
                <p className="detail-text text-[10px] opacity-40 uppercase leading-relaxed">
                  Establish a professional business entity that agences and luxury brands respect.
                </p>
              </div>
            </div>

            <Link 
              href="/model-portfolios" 
              className="inline-flex items-center gap-4 px-12 py-5 bg-accent text-white font-mono text-sm uppercase tracking-widest hover:brightness-110 transition-all font-bold group"
            >
              Explore Digital Kits
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Right: The 3 Cool Videos */}
          <div className="relative h-[600px] grid grid-cols-3 gap-3 overflow-hidden rounded-3xl border border-white/5 shadow-2xl">
            {TEASER_VIDEOS.map((video, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 1.1 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: idx * 0.2 }}
                className="relative h-full overflow-hidden"
              >
                <video 
                  autoPlay 
                  muted 
                  loop 
                  playsInline 
                  className="absolute inset-0 w-full h-full object-cover grayscale brightness-50 hover:grayscale-0 transition-all duration-700 hover:scale-110"
                >
                  <source src={video} type="video/mp4" />
                </video>
                <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black to-transparent" />
              </motion.div>
            ))}
            
            {/* HUD Overlay */}
            <div className="absolute inset-0 pointer-events-none border-[1px] border-white/5 m-4 flex flex-col justify-between p-4">
              <div className="flex justify-between items-start opacity-30">
                <div className="camera-hud-text text-[8px]">[ REC ]</div>
                <div className="camera-hud-text text-[8px]">ACTIVE_MONITOR</div>
              </div>
              <div className="flex justify-between items-end opacity-30">
                <div className="camera-hud-text text-[8px]">PRO_MODEL_ENV</div>
                <div className="camera-hud-text text-[8px]">8K_RAW</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
