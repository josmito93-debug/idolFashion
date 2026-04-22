"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Target, Search, BarChart3, Globe2, ShieldCheck, Zap } from 'lucide-react'

const BENEFITS = [
  {
    icon: Target,
    title: "Meta Pixel Integration",
    description: "Every visit, interaction, and click is tracked. When brands look for talent, you provide them with the data they need to guarantee ROI."
  },
  {
    icon: Search,
    title: "Google Indexing (SEO)",
    description: "Your professional name becomes a clickable entity in search engines. Appear in top results when magazines and agencies search for you."
  },
  {
    icon: BarChart3,
    title: "Conversion Focused",
    description: "Your portfolio isn't just a gallery; it's a sales machine designed to turn profile views into high-paying bookings."
  }
]

export const ModelMarketing = () => {
  return (
    <section className="bg-black py-32 relative overflow-hidden border-t border-white/5">
      {/* Background HUD Decor */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          
          <div className="space-y-12">
            <div>
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-accent/20 bg-accent/5 mb-8"
              >
                <Zap className="w-4 h-4 text-accent" />
                <span className="camera-hud-text text-[10px] tracking-[0.3em] uppercase text-accent">The Technical Edge</span>
              </motion.div>
              <h2 className="text-6xl md:text-8xl brand-text leading-none mb-6">Beyond The <br/><span className="text-accent">Static Link</span></h2>
              <p className="detail-text text-sm md:text-base opacity-40 uppercase tracking-[0.2em] leading-relaxed max-w-xl">
                Traditional portfolios are dead. We build high-performance digital identities that integrate with the world&apos;s most powerful advertising ecosystems.
              </p>
            </div>

            <div className="space-y-8">
              {BENEFITS.map((benefit, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex gap-6 group"
                >
                  <div className="mt-1 p-3 rounded-xl bg-white/5 border border-white/10 group-hover:border-accent/40 transition-colors">
                    <benefit.icon className="w-5 h-5 text-accent" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="camera-hud-text text-lg tracking-widest uppercase">{benefit.title}</h3>
                    <p className="detail-text text-[11px] md:text-xs opacity-50 leading-relaxed uppercase tracking-wider">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="pt-8 flex items-center gap-8">
               <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-black bg-zinc-800" />
                  ))}
               </div>
               <p className="camera-hud-text text-[10px] opacity-40 uppercase tracking-widest">
                  Joined by 400+ Elite Models <br/> across Miami & Milan
               </p>
            </div>
          </div>

          {/* Right: Visual representation of the "Card" / Data */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative"
          >
             <div className="aspect-square rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-1">
                <div className="h-full w-full rounded-[1.4rem] bg-brand-secondary overflow-hidden relative p-8 md:p-12 flex flex-col justify-between border border-white/5">
                   <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <div className="camera-hud-text text-[10px] opacity-30 uppercase">[ PROTOCOL_HUD ]</div>
                        <div className="text-2xl brand-text">Identity Card</div>
                      </div>
                      <Globe2 className="w-6 h-6 opacity-20" />
                   </div>

                   {/* Central Data Viz */}
                   <div className="flex-1 flex flex-col justify-center gap-8">
                      <div className="h-32 w-full border border-white/5 rounded-xl bg-black/40 flex items-center justify-center overflow-hidden">
                         <div className="w-full h-[1px] bg-accent/20 absolute" />
                         <div className="flex gap-1 items-end h-16">
                            {[40, 70, 45, 90, 65, 80, 55, 100, 30].map((h, i) => (
                              <motion.div 
                                key={i}
                                initial={{ height: 0 }}
                                whileInView={{ height: `${h}%` }}
                                transition={{ duration: 1, delay: i * 0.1 }}
                                className="w-2 bg-accent/40 rounded-t-sm" 
                              />
                            ))}
                         </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                         <div className="p-4 rounded-lg bg-white/5 border border-white/5">
                            <p className="camera-hud-text text-[8px] opacity-30 uppercase">Reach / Month</p>
                            <p className="detail-text text-xl uppercase tracking-tighter">1.2M +</p>
                         </div>
                         <div className="p-4 rounded-lg bg-white/5 border border-white/5">
                            <p className="camera-hud-text text-[8px] opacity-30 uppercase">Booking Rate</p>
                            <p className="detail-text text-xl uppercase tracking-tighter">+84.2%</p>
                         </div>
                      </div>
                   </div>

                   <div className="pt-8 border-t border-white/5 flex justify-between items-center">
                      <div className="flex items-center gap-3">
                         <ShieldCheck className="w-4 h-4 text-accent" />
                         <span className="camera-hud-text text-[8px] opacity-50 uppercase tracking-[0.2em]">Verified Professional ID</span>
                      </div>
                      <div className="camera-hud-text text-[8px] opacity-20">IDOL_FASHION_SYSTEMS</div>
                   </div>
                </div>
             </div>

             {/* Floating HUD Labels */}
             <div className="absolute -top-12 -right-12 p-6 rounded-2xl bg-accent/10 border border-accent/20 backdrop-blur-xl hidden md:block">
                <p className="camera-hud-text text-accent text-[10px] uppercase tracking-widest mb-1">Pixel Status</p>
                <p className="detail-text text-white text-xs uppercase font-bold">ACTIVO / CAPTURING DATA</p>
             </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
