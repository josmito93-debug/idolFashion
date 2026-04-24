"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { 
  Globe2, 
  ShieldCheck, 
  Zap, 
  BarChart3, 
  Search, 
  Target, 
  Mail, 
  Upload, 
  ArrowRight,
  Monitor,
  Smartphone,
  CheckCircle2
} from 'lucide-react'
import Link from 'next/link'
import { CameraHUD } from '@/components/hero/CameraHUD'
import { EliteProducts } from '@/components/products/EliteProducts'
import { StadiumWaveGrid } from '@/components/ui/StadiumWaveGrid'

const FEATURES = [
  {
    icon: Globe2,
    title: "Professional Domain",
    description: "Move from a shared link to yourname.com. A dedicated domain that establishes you as a business entity, not just talent."
  },
  {
    icon: Mail,
    title: "Elite Communications",
    description: "Stop using gmail. Get your professional email (contact@yourname.com) that fits the standard of high-end agencies."
  },
  {
    icon: Upload,
    title: "Self-Managed Portal",
    description: "No developers needed. Our dashboard allows you to upload your latest sessions, update measurements, and sync your portfolio in real-time."
  },
  {
    icon: Target,
    title: "Meta Pixel Integration",
    description: "We embed tracking tech in your page. Show brands exactly how much traffic you drive, proving your value with hard data."
  },
  {
    icon: Search,
    title: "SEO Indexing",
    description: "We optimize your site so when agencies search for you, your professional landing page is the first thing they see."
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Track where your visitors come from. Understand your global reach and target markets with surgical precision."
  }
]

export default function ModelPortfoliosSales() {
  return (
    <main className="min-h-screen bg-brand-secondary text-white selection:bg-accent selection:text-white overflow-x-hidden">
      <CameraHUD />
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video 
            autoPlay 
            muted 
            loop 
            playsInline 
            className="w-full h-full object-cover opacity-40"
          >
            <source src="/videos/hero-model-portfolios.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-brand-secondary/60 backdrop-blur-[2px]" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10 flex flex-col items-center translate-y-[10px] md:translate-y-0">
          <motion.img 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            src="/assets/logo.png" 
            alt="Idol Fashion Logo" 
            className="h-10 md:h-24 mb-5 md:mb-8 object-contain mt-[-90px] md:mt-0"
          />

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-none border border-accent/20 bg-accent/5 mb-4"
          >
            <Zap className="w-3 h-3 text-accent" />
            <span className="camera-hud-text text-[10px] tracking-[0.2em] uppercase text-accent">Professional Infrastructure</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            className="text-[64px] md:text-[100px] brand-text leading-[0.8] mb-8 uppercase tracking-tighter pt-2 pb-1"
          >
            OWN YOUR IDENTITY. <br/><span className="text-accent">SCALE YOUR CAREER.</span>
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
            className="flex flex-col items-center mt-2 mb-4"
          >
            <p className="detail-text text-[16px] md:text-base opacity-40 uppercase tracking-[0.3em] text-center scale-[0.65] md:scale-100 origin-center leading-relaxed">
              TECHNICAL INFRASTRUCTURE FOR THE ELITE MODEL.<br className="md:hidden" /> 
              SCALE YOUR BRAND WITH SURGICAL PRECISION.<br className="md:hidden" /> 
              OWN YOUR DATA, OWN YOUR FUTURE.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col md:flex-row gap-4 md:gap-8 justify-center items-center mt-4"
          >
            <Link 
              href="/register" 
              className="px-10 py-5 bg-white text-black font-modal text-xs tracking-[0.3em] uppercase hover:border-accent/30 transition-all duration-300 detail-text relative overflow-hidden group shadow-sm flex items-center justify-center min-w-[280px]"
            >
              <span className="relative z-10">Launch Your Elite Identity</span>
              <StadiumWaveGrid />
            </Link>
            
            <Link 
              href="/models/valeria-cannavo" 
              className="px-10 py-5 bg-white/5 backdrop-blur-md border border-white/20 text-white font-modal text-xs tracking-[0.3em] uppercase hover:bg-white/10 transition-all group flex items-center gap-3 min-w-[280px] justify-center"
            >
              <span>View Live Case Study</span>
              <Globe2 className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Visual Teaser */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-12">
          <div className="relative aspect-video rounded-none border border-white/10 bg-black overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
            <div className="absolute bottom-12 left-12 z-20 space-y-4">
              <div className="flex gap-4">
                <div className="p-3 rounded-none bg-white/10 backdrop-blur-md border border-white/10">
                  <Monitor className="w-5 h-5" />
                </div>
                <div className="p-3 rounded-none bg-white/10 backdrop-blur-md border border-white/10">
                  <Smartphone className="w-5 h-5" />
                </div>
              </div>
              <p className="camera-hud-text text-xs uppercase tracking-widest opacity-60">Cross-Platform Technical Architecture</p>
            </div>
            <video 
              autoPlay 
              muted 
              loop 
              playsInline 
              className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-1000"
            >
              <source src="/videos/los-angeles.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-32 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 md:px-12">
          <div className="mb-24 space-y-4">
            <h2 className="text-4xl md:text-6xl brand-text">THE ELITE <span className="text-accent">ADVANTAGE</span></h2>
            <p className="detail-text text-xs opacity-40 uppercase tracking-[0.2em]">Six layers of professional infrastructure</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {FEATURES.map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="space-y-6 p-8 rounded-none border border-white/5 bg-black/40 hover:border-accent/40 transition-colors group"
              >
                <div className="w-12 h-12 rounded-none bg-accent/10 flex items-center justify-center border border-accent/20 group-hover:bg-accent/20 transition-all">
                  <feature.icon className="w-6 h-6 text-accent" />
                </div>
                <div className="space-y-3">
                  <h3 className="camera-hud-text text-xl tracking-widest uppercase">{feature.title}</h3>
                  <p className="detail-text text-xs opacity-50 leading-relaxed uppercase tracking-wider">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Technical Edge - Visual Performance Section */}
      <section className="py-32 relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 opacity-5 pointer-events-none" 
             style={{ backgroundImage: 'linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        
        <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            
            <div className="space-y-12">
              <div>
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="inline-flex items-center gap-3 px-4 py-2 rounded-none border border-accent/20 bg-accent/5 mb-8"
                >
                  <Zap className="w-4 h-4 text-accent" />
                  <span className="camera-hud-text text-[10px] tracking-[0.3em] uppercase text-accent">The Conversion Edge</span>
                </motion.div>
                <h2 className="text-6xl md:text-8xl brand-text leading-[0.9] mb-8">Convert Views <br/><span className="text-accent">Into Contracts.</span></h2>
                <p className="detail-text text-sm md:text-base opacity-40 uppercase tracking-[0.2em] leading-relaxed max-w-xl">
                  Your portfolio is no longer just a gallery; it&apos;s your personal sales engine. With Meta Pixel integration, you prove your market value to brands with hard data, securing high-end bookings and consistent ROI.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {[
                  {
                    title: "Meta Pixel Optimization",
                    desc: "Your traffic converted into actionable data. Brands hire you because you prove reach and ROI.",
                    icon: Target
                  },
                  {
                    title: "SEO Visibility",
                    desc: "Appear on the radar of international agencies. Be the first result when they search for elite talent.",
                    icon: Search
                  },
                  {
                    title: "Brand Conversion",
                    desc: "Engineered to convert views into high-end bookings. Your digital identity working 24/7.",
                    icon: BarChart3
                  }
                ].map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex gap-6 p-6 rounded-none bg-white/5 border border-white/5 group hover:border-accent/30 transition-all"
                  >
                    <div className="p-3 rounded-none bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white transition-all">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="camera-hud-text text-sm uppercase tracking-widest">{item.title}</h4>
                      <p className="detail-text text-[11px] opacity-40 uppercase leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right: Visual Data HUD */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="relative"
            >
               <div className="aspect-square rounded-none border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-1">
                  <div className="h-full w-full rounded-none bg-brand-secondary overflow-hidden relative p-8 md:p-12 flex flex-col justify-between border border-white/5">
                     <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <div className="camera-hud-text text-[10px] opacity-30 uppercase">[ PROTOCOL_HUD ]</div>
                          <div className="text-3xl brand-text">Identity Performance</div>
                        </div>
                        <Globe2 className="w-8 h-8 opacity-20 text-accent" />
                     </div>

                     <div className="flex-1 flex flex-col justify-center gap-12">
                        <div className="relative h-40 w-full border border-white/5 rounded-none bg-black/40 flex items-center justify-center overflow-hidden">
                           <div className="absolute inset-0 bg-accent/5 animate-pulse" />
                           <div className="flex gap-1.5 items-end h-24 relative z-10">
                              {[40, 70, 45, 90, 65, 80, 55, 100, 30, 85, 45, 75].map((h, i) => (
                                <motion.div 
                                  key={i}
                                  initial={{ height: 0 }}
                                  whileInView={{ height: `${h}%` }}
                                  transition={{ duration: 1, delay: i * 0.05 }}
                                  className="w-2.5 bg-accent/40 rounded-none" 
                                />
                              ))}
                           </div>
                           <div className="absolute bottom-4 right-4 flex items-center gap-2">
                             <div className="w-2 h-2 rounded-none bg-accent animate-ping" />
                             <span className="camera-hud-text text-[8px] text-accent uppercase tracking-widest">Live ROI Tracking</span>
                           </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                           <div className="p-6 rounded-none bg-white/5 border border-white/5 hover:border-accent/20 transition-all">
                              <p className="camera-hud-text text-[10px] opacity-30 uppercase mb-2">Total Digital Reach</p>
                              <p className="detail-text text-3xl uppercase tracking-tighter">1.2M +</p>
                              <p className="text-[8px] text-accent camera-hud-text mt-2">↑ 24% THIS MONTH</p>
                           </div>
                           <div className="p-6 rounded-none bg-white/5 border border-white/5 hover:border-accent/20 transition-all">
                              <p className="camera-hud-text text-[10px] opacity-30 uppercase mb-2">Booking Conversion</p>
                              <p className="detail-text text-3xl uppercase tracking-tighter">+84.2%</p>
                              <p className="text-[8px] text-accent camera-hud-text mt-2">OPTIMIZED BY PIXEL</p>
                           </div>
                        </div>
                     </div>

                     <div className="pt-8 border-t border-white/5 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                           <ShieldCheck className="w-5 h-5 text-accent" />
                           <span className="camera-hud-text text-[10px] opacity-50 uppercase tracking-[0.2em]">Verified Elite Profile ID</span>
                        </div>
                        <div className="camera-hud-text text-[10px] opacity-20">MODEL_ID_9821_LAB</div>
                     </div>
                  </div>
               </div>

               <div className="absolute -top-6 -right-6 p-6 rounded-none bg-black border border-accent/30 backdrop-blur-xl shadow-2xl z-20">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-2 h-2 rounded-none bg-accent" />
                    <p className="camera-hud-text text-accent text-[10px] uppercase tracking-widest">Pixel Engine</p>
                  </div>
                  <p className="detail-text text-white text-xs uppercase font-bold tracking-widest">ACTIVE / COLLECTING ROI DATA</p>
               </div>
            </motion.div>

          </div>
        </div>
      </section>

      <EliteProducts />

      <footer className="py-12 border-t border-white/5 text-center">
         <p className="camera-hud-text text-[10px] opacity-20 uppercase tracking-[0.5em]">Idol Fashion © 2026 // The Elite Lab // Miami HQ</p>
      </footer>

      <style jsx global>{`
        .brand-text { font-family: var(--font-gc-vank); }
        .camera-hud-text { font-family: var(--font-mono); }
        .detail-text { font-family: var(--font-inter); }
        .font-modal { font-family: var(--font-modal); }
      `}</style>
    </main>
  )
}
