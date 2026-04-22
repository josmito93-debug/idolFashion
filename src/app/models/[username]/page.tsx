"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Hero } from '@/components/hero/Hero' // Reusing some base logic or creating a new one
import { Camera, Instagram, Globe, Mail, MapPin, Ruler, User, ShieldCheck } from 'lucide-react'

// Dummy data for the prototype
const MODEL_DATA = {
  name: "Valentina Rossi",
  role: "Elite Editorial Model",
  location: "Miami / Milan",
  stats: {
    height: "178cm / 5'10\"",
    bust: "82cm / 32\"",
    waist: "60cm / 23\"",
    hips: "89cm / 35\"",
    eyes: "Emerald Green",
    hair: "Deep Brunette"
  },
  social: {
    instagram: "@valentinarossi",
    website: "valentinarossi.com",
    email: "booking@valentinarossi.com"
  },
  photos: [
    "/assets/20250913_154417.jpg",
    "/assets/20250913_154113.jpg",
    "/assets/20251016_195343.jpg",
    "/assets/20250910_163940.jpg",
  ]
}

export default function ModelPortfolio({ params }: { params: { username: string } }) {
  return (
    <main className="min-h-screen bg-brand-secondary text-white selection:bg-accent">
      {/* 1. CLOSE-UP HERO */}
      <section className="relative h-[80vh] md:h-screen w-full overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img 
            src={MODEL_DATA.photos[0]} 
            alt={MODEL_DATA.name} 
            className="w-full h-full object-cover object-top brightness-75"
          />
        </motion.div>
        
        {/* HUD Elements */}
        <div className="absolute inset-0 pointer-events-none p-6 md:p-12 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="camera-hud-text text-[10px] md:text-xs tracking-[0.3em] uppercase opacity-50">
              [ IDOL_PROTOCOL_V3 ]
            </div>
            <div className="camera-hud-text text-[10px] md:text-xs tracking-[0.3em] uppercase opacity-50 flex items-center gap-2">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              LIVE_PROFILE_INDEXED
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <motion.h1 
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-7xl md:text-[12rem] brand-text leading-[0.85] -mb-4"
            >
              {MODEL_DATA.name.split(' ')[0]}<br/>
              <span className="text-accent">{MODEL_DATA.name.split(' ')[1]}</span>
            </motion.h1>
            <p className="camera-hud-text text-sm md:text-xl tracking-[0.5em] opacity-40 uppercase ml-2">
              {MODEL_DATA.role}
            </p>
          </div>
        </div>
      </section>

      {/* 2. THE DIGITAL COMP CARD (HUD STYLE) */}
      <section className="py-24 px-4 md:px-12 bg-black/50 backdrop-blur-sm border-y border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-4">
              <h2 className="camera-hud-text text-xs tracking-[0.4em] text-accent uppercase">Technical Specifications</h2>
              <div className="h-[1px] w-24 bg-accent/30" />
            </div>

            <div className="grid grid-cols-2 gap-y-12 gap-x-8">
              {Object.entries(MODEL_DATA.stats).map(([label, value], idx) => (
                <div key={label} className="space-y-1">
                  <p className="camera-hud-text text-[10px] opacity-30 uppercase tracking-widest">{label}</p>
                  <p className="detail-text text-xl md:text-2xl uppercase tracking-tighter">{value}</p>
                </div>
              ))}
            </div>

            <div className="pt-8 border-t border-white/5 space-y-6">
               <div className="flex items-center gap-4 text-accent/80 hover:text-accent transition-colors cursor-pointer group">
                  <div className="p-2 rounded-full border border-accent/20 group-hover:bg-accent/10">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="camera-hud-text text-[10px] uppercase tracking-widest">Verified Status</p>
                    <p className="detail-text text-xs opacity-60 uppercase">Idol Fashion Certified Elite Portfolio</p>
                  </div>
               </div>
            </div>
          </div>

          {/* Right: The Profile Card Visual */}
          <div className="lg:col-span-7 relative group">
             <div className="aspect-[4/5] md:aspect-[16/9] bg-white/5 border border-white/10 rounded-2xl overflow-hidden relative p-8 md:p-12">
                {/* Decorative lines */}
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" 
                     style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
                
                <div className="relative z-10 h-full flex flex-col justify-between">
                   <div className="flex justify-between items-start">
                      <img src="/assets/logo.png" alt="Logo" className="h-8 md:h-12 opacity-50 grayscale" />
                      <div className="text-right">
                        <p className="camera-hud-text text-[8px] md:text-[10px] opacity-30">PIXEL_ID: FB_PX_77281</p>
                        <p className="camera-hud-text text-[8px] md:text-[10px] opacity-30">SEO_INDEX: TOP_0.1%</p>
                      </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
                      <div className="md:col-span-2 space-y-4">
                        <h3 className="text-4xl md:text-6xl brand-text tracking-tighter">Digital Identity</h3>
                        <p className="detail-text text-[10px] md:text-xs opacity-40 leading-relaxed uppercase tracking-widest">
                          Integrated with Meta Pixel for advanced brand tracking and conversion optimization. 
                          This portfolio captures 100% of engagement data to maximize booking potential.
                        </p>
                      </div>
                      <div className="flex flex-col gap-3">
                         <button className="w-full py-3 bg-white text-black camera-hud-text text-[10px] tracking-widest uppercase hover:bg-accent hover:text-white transition-all">
                           Book Model
                         </button>
                         <button className="w-full py-3 border border-white/10 text-white camera-hud-text text-[10px] tracking-widest uppercase hover:bg-white/5 transition-all">
                           Download PDF
                         </button>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 3. GALLERY (SELF-SERVICE STYLE) */}
      <section className="py-32 px-4 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
           <div className="space-y-4">
              <h2 className="text-5xl md:text-7xl brand-text uppercase">The<br/><span className="text-accent">Collection</span></h2>
              <p className="detail-text text-xs opacity-40 uppercase tracking-[0.3em]">Curated high-fashion captures</p>
           </div>
           <div className="flex gap-4">
              {["Runway", "Editorial", "Commercial", "Videos"].map((cat) => (
                <button key={cat} className="camera-hud-text text-[10px] px-4 py-2 border border-white/5 hover:border-accent/30 transition-all uppercase tracking-widest opacity-60 hover:opacity-100">
                  {cat}
                </button>
              ))}
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {MODEL_DATA.photos.map((img, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`relative overflow-hidden group cursor-crosshair rounded-lg ${idx === 0 ? 'md:col-span-2 md:row-span-2 h-[600px]' : 'h-[300px]'}`}
            >
              <img 
                src={img} 
                alt="Gallery" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                 <div className="camera-hud-text text-[10px] tracking-[0.5em] uppercase border border-white/20 px-6 py-3 bg-black/40 backdrop-blur-md">
                    View Asset
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FOOTER / CONTACT */}
      <footer className="py-24 border-t border-white/5 bg-brand-secondary">
        <div className="max-w-7xl mx-auto px-4 md:px-12 flex flex-col items-center text-center">
          <p className="camera-hud-text text-accent text-xs tracking-[0.5em] mb-8 uppercase">Direct Representation</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full max-w-4xl">
            <div className="space-y-4">
               <Mail className="w-6 h-6 mx-auto opacity-40" />
               <p className="detail-text text-sm uppercase tracking-widest">{MODEL_DATA.social.email}</p>
            </div>
            <div className="space-y-4">
               <Instagram className="w-6 h-6 mx-auto opacity-40" />
               <p className="detail-text text-sm uppercase tracking-widest">{MODEL_DATA.social.instagram}</p>
            </div>
            <div className="space-y-4">
               <Globe className="w-6 h-6 mx-auto opacity-40" />
               <p className="detail-text text-sm uppercase tracking-widest">{MODEL_DATA.social.website}</p>
            </div>
          </div>
          <div className="mt-24 flex flex-col items-center">
             <img src="/assets/logo.png" alt="Logo" className="h-10 opacity-20 grayscale mb-6" />
             <p className="font-mono text-[10px] opacity-20 tracking-[0.4em] uppercase">Part of the Idol Fashion Elite Network</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
