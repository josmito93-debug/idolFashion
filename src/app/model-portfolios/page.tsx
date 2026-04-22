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
  ChevronRight,
  Monitor,
  Smartphone,
  CheckCircle2
} from 'lucide-react'
import Link from 'next/link'
import { CameraHUD } from '@/components/hero/CameraHUD'

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
    <main className="min-h-screen bg-brand-secondary text-white selection:bg-accent selection:text-white">
      <CameraHUD />
      
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #333 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        
        <div className="max-w-7xl mx-auto px-4 md:px-12 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5 mb-8"
          >
            <Zap className="w-3 h-3 text-accent" />
            <span className="camera-hud-text text-[10px] tracking-[0.2em] uppercase text-accent">Professional Infrastructure</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-7xl md:text-[120px] brand-text leading-[0.9] mb-8"
          >
            OWN YOUR <br/><span className="text-accent">DOMAIN.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="detail-text text-sm md:text-lg opacity-40 uppercase tracking-[0.3em] max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Stop relying on social media algorithms. Build a high-performance digital identity designed for the elite fashion industry.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col md:flex-row gap-6 justify-center items-center"
          >
            <Link href="/register" className="px-12 py-5 bg-white text-black font-mono text-sm uppercase tracking-widest hover:bg-accent hover:text-white transition-all font-bold group flex items-center gap-3">
              Apply for Model Kit
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/models/valentina-rossi" className="px-12 py-5 border border-white/10 font-mono text-sm uppercase tracking-widest hover:bg-white/5 transition-all">
              View Sample Portfolio
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Visual Teaser */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-12">
          <div className="relative aspect-video rounded-3xl border border-white/10 bg-black overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
            <div className="absolute bottom-12 left-12 z-20 space-y-4">
              <div className="flex gap-4">
                <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/10">
                  <Monitor className="w-5 h-5" />
                </div>
                <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/10">
                  <Smartphone className="w-5 h-5" />
                </div>
              </div>
              <p className="camera-hud-text text-xs uppercase tracking-widest opacity-60">Cross-Platform Technical Architecture</p>
            </div>
            {/* Mock Image Placeholder */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2000')] bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-1000" />
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
                className="space-y-6 p-8 rounded-2xl border border-white/5 bg-black/40 hover:border-accent/40 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center border border-accent/20 group-hover:bg-accent/20 transition-all">
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

      {/* Data Section */}
      <section className="py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-12">
              <h2 className="text-5xl md:text-7xl brand-text leading-tight">DATA IS THE <br/><span className="text-accent">NEW CURRENCY.</span></h2>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div className="space-y-2">
                    <p className="camera-hud-text text-lg uppercase tracking-widest">Verify Your Reach</p>
                    <p className="detail-text text-xs opacity-40 uppercase leading-relaxed">Show potential clients and agencies verified traffic data from your own domain.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div className="space-y-2">
                    <p className="camera-hud-text text-lg uppercase tracking-widest">Global Exposure</p>
                    <p className="detail-text text-xs opacity-40 uppercase leading-relaxed">Our SEO architecture ensures you are discoverable by international scouts 24/7.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="p-1 rounded-3xl bg-gradient-to-br from-accent/40 to-transparent border border-white/10">
                <div className="bg-black rounded-[1.4rem] p-8 md:p-12 space-y-8">
                   <div className="flex justify-between items-center">
                      <span className="camera-hud-text text-[10px] opacity-40 uppercase">[ PROTOCOL_HUD ]</span>
                      <span className="camera-hud-text text-accent text-[10px] animate-pulse uppercase">● Live Monitoring</span>
                   </div>
                   <div className="space-y-6">
                      <div className="space-y-2">
                         <div className="flex justify-between text-[10px] uppercase font-mono opacity-50">
                            <span>Search Visibility</span>
                            <span>98%</span>
                         </div>
                         <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              whileInView={{ width: '98%' }}
                              className="h-full bg-accent" 
                            />
                         </div>
                      </div>
                      <div className="space-y-2">
                         <div className="flex justify-between text-[10px] uppercase font-mono opacity-50">
                            <span>Booking Conversion</span>
                            <span>84%</span>
                         </div>
                         <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              whileInView={{ width: '84%' }}
                              className="h-full bg-accent" 
                            />
                         </div>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Model Kit (Pricing/Product) */}
      <section className="py-32 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 md:px-12 text-center space-y-12">
          <div className="space-y-4">
            <h2 className="text-6xl md:text-8xl brand-text">THE <span className="text-accent">MODEL KIT</span></h2>
            <p className="detail-text text-sm md:text-base opacity-40 uppercase tracking-[0.4em]">Everything you need to go professional.</p>
          </div>

          <div className="p-12 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl relative overflow-hidden text-left">
            <div className="absolute top-0 right-0 p-8">
              <ShieldCheck className="w-12 h-12 text-accent opacity-20" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <ul className="space-y-6">
                {[
                  "Personalized .com Domain",
                  "Professional Email Suite",
                  "High-Performance Landing Page",
                  "Self-Management Dashboard",
                  "Meta Pixel Integration",
                  "Advanced SEO Indexing"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 group">
                    <CheckCircle2 className="w-5 h-5 text-accent group-hover:scale-110 transition-transform" />
                    <span className="camera-hud-text text-sm uppercase tracking-widest">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col justify-center items-center md:items-end space-y-6">
                <div className="text-center md:text-right">
                  <p className="camera-hud-text text-xs opacity-40 uppercase mb-2">Investment</p>
                  <p className="text-6xl brand-text">$250<span className="text-2xl opacity-40">/kit</span></p>
                </div>
                <Link href="/register" className="w-full md:w-auto px-12 py-5 bg-accent text-white font-mono text-sm uppercase tracking-widest hover:brightness-110 transition-all font-bold text-center">
                  Order Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 text-center">
         <p className="camera-hud-text text-[10px] opacity-20 uppercase tracking-[0.5em]">Idol Fashion © 2026 // The Elite Lab // Miami HQ</p>
      </footer>
    </main>
  )
}
