"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { 
  ArrowUpRight, 
  Sparkles, 
  ShoppingBag, 
  Clock, 
  Package, 
  Plus,
  Play,
  Heart
} from 'lucide-react'

export default function DashboardHome() {
  return (
    <>
      {/* --- DESKTOP VIEW (Original) --- */}
      <div className="hidden lg:block space-y-12">
        {/* Welcome Section */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="camera-hud-text text-[10px] tracking-[0.3em] uppercase">ACCESS GRANTED // SESSION ACTIVE</span>
            </div>
            <h1 className="text-5xl md:text-7xl brand-text">Welcome back, <br/><span className="text-accent">Felix</span></h1>
            <p className="detail-text opacity-40 text-sm uppercase tracking-widest max-w-xl">
              Your fashion ecosystem is synchronized. Explore new events, manage your portfolio, and scale your career.
            </p>
          </motion.div>
        </section>

        {/* Stats Summary */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: 'Photos Purchased', value: '24', icon: ShoppingBag },
            { label: 'Active Events', value: '12', icon: Clock },
            { label: 'Portfolio Growth', value: '+15%', icon: ArrowUpRight },
            { label: 'System Credits', value: '450', icon: Package },
          ].map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card p-6 rounded-2xl group hover:border-accent/30 transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <stat.icon className="w-5 h-5 text-accent opacity-60 group-hover:opacity-100 transition-opacity" />
                <div className="camera-hud-text text-[8px] opacity-20">00{idx + 1}</div>
              </div>
              <p className="camera-hud-text text-[9px] opacity-40 uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="text-3xl brand-text text-white">{stat.value}</p>
            </motion.div>
          ))}
        </section>

        {/* Promo Banners */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Model Promo */}
          <motion.div
            whileHover={{ y: -5 }}
            className="relative h-[400px] rounded-3xl overflow-hidden border border-white/5 group cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1000" 
              alt="Model" 
              className="absolute inset-0 w-full h-full object-cover grayscale brightness-50 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-1000"
            />
            <div className="absolute inset-0 border border-white/10 m-4 pointer-events-none z-20" />
            
            <div className="absolute bottom-8 left-8 right-8 z-20">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="camera-hud-text text-[9px] tracking-widest">CAREER_OPPORTUNITY_01</span>
              </div>
              <h3 className="text-4xl brand-text text-white mb-4">You wanna become <br/><span className="text-accent">a model?</span></h3>
              <p className="detail-text text-[10px] opacity-60 uppercase tracking-widest mb-6 max-w-xs">
                Access elite training, high-end production, and placement with global fashion brands.
              </p>
              <button className="px-6 py-3 bg-white text-black camera-hud-text text-[9px] tracking-[0.2em] uppercase hover:bg-accent hover:text-white transition-all">
                Apply to Elite Lab
              </button>
            </div>
          </motion.div>

          {/* Designer Promo */}
          <motion.div
            whileHover={{ y: -5 }}
            className="relative h-[400px] rounded-3xl overflow-hidden border border-white/5 group cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
            <img 
              src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=1000" 
              alt="Designer" 
              className="absolute inset-0 w-full h-full object-cover grayscale brightness-50 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-1000"
            />
            <div className="absolute inset-0 border border-white/10 m-4 pointer-events-none z-20" />
            
            <div className="absolute bottom-8 left-8 right-8 z-20">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="camera-hud-text text-[9px] tracking-widest">INDUSTRY_SCALE_02</span>
              </div>
              <h3 className="text-4xl brand-text text-white mb-4">You wanna become <br/><span className="text-accent">a designer?</span></h3>
              <p className="detail-text text-[10px] opacity-60 uppercase tracking-widest mb-6 max-w-xs">
                From pattern making to New York Fashion Week. Scale your brand with professional production.
              </p>
              <button className="px-6 py-3 bg-white text-black camera-hud-text text-[9px] tracking-[0.2em] uppercase hover:bg-accent hover:text-white transition-all">
                Launch Your Brand
              </button>
            </div>
          </motion.div>
        </section>

        {/* Activity Log Overlay */}
        <div className="fixed top-24 right-8 w-48 pointer-events-none space-y-4 opacity-40 hidden xl:block">
          <p className="camera-hud-text text-[8px] uppercase tracking-widest border-b border-white/10 pb-2">Activity Stream</p>
          {[
            'AUTH_SUCCESS_LOGIN',
            'PAYMENT_SYNC_COMPLETE',
            'ASSET_024_FETCHED',
            'CACHE_REFRESHED'
          ].map((log, i) => (
            <div key={i} className="camera-hud-text text-[7px] flex justify-between">
              <span>{log}</span>
              <span>OK</span>
            </div>
          ))}
        </div>
      </div>

      {/* --- MOBILE VIEW (App Style) --- */}
      <div className="lg:hidden space-y-8">
        {/* Quick Stories / Talent Bar */}
        <section className="-mx-6 overflow-x-auto custom-scrollbar flex gap-4 px-6 pb-2">
          <div className="flex flex-col items-center gap-1 shrink-0">
            <div className="w-16 h-16 rounded-full border-2 border-accent border-dashed flex items-center justify-center group cursor-pointer hover:border-solid transition-all">
              <Plus className="w-6 h-6 text-accent group-hover:scale-110 transition-transform" />
            </div>
            <span className="text-[9px] uppercase tracking-tighter opacity-40">Apply</span>
          </div>
          {[
            { name: 'Elena V.', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200' },
            { name: 'Marco S.', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200' },
            { name: 'Sarah L.', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200' },
            { name: 'David K.', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200' },
            { name: 'Mia J.', img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200' },
          ].map((talent, i) => (
            <div key={i} className="flex flex-col items-center gap-1 shrink-0">
              <div className="w-16 h-16 rounded-full p-0.5 border-2 border-accent overflow-hidden cursor-pointer active:scale-95 transition-transform">
                <img src={talent.img} alt={talent.name} className="w-full h-full object-cover rounded-full" />
              </div>
              <span className="text-[9px] uppercase tracking-tighter opacity-40">{talent.name}</span>
            </div>
          ))}
        </section>

        {/* Main Stats Widget */}
        <section className="bg-white/5 border border-white/10 rounded-[2rem] p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Sparkles className="w-20 h-20 text-accent" />
          </div>
          <div className="relative z-10">
            <p className="camera-hud-text text-[9px] text-accent tracking-[0.2em] mb-2">ACTIVE_SESSION</p>
            <h2 className="text-3xl font-bold tracking-tight mb-6 leading-tight">Your career is <br/><span className="text-accent italic">accelerating.</span></h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-2xl font-bold tracking-tighter">24</p>
                <p className="text-[9px] opacity-40 uppercase tracking-widest">Assets</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold tracking-tighter text-accent">+84%</p>
                <p className="text-[9px] opacity-40 uppercase tracking-widest">Growth</p>
              </div>
            </div>
          </div>
        </section>

        {/* Action Bento Grid */}
        <section className="grid grid-cols-2 gap-4">
          <motion.div 
            whileTap={{ scale: 0.98 }}
            className="bg-accent rounded-3xl p-5 flex flex-col justify-between h-40 group cursor-pointer shadow-lg shadow-accent/20"
          >
            <div className="flex justify-between items-start">
              <ShoppingBag className="w-6 h-6 text-white" />
              <ArrowUpRight className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
            </div>
            <div>
              <p className="text-white text-lg font-bold leading-tight">Download <br/>Photography</p>
              <p className="text-white/60 text-[9px] uppercase tracking-widest mt-2">2 New Sets</p>
            </div>
          </motion.div>

          <motion.div 
            whileTap={{ scale: 0.98 }}
            className="bg-zinc-800 rounded-3xl p-5 flex flex-col justify-between h-40 group cursor-pointer"
          >
            <div className="flex justify-between items-start">
              <Clock className="w-6 h-6 text-accent" />
              <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-accent transition-colors" />
            </div>
            <div>
              <p className="text-white text-lg font-bold leading-tight">Live <br/>Events</p>
              <p className="text-white/40 text-[9px] uppercase tracking-widest mt-2">12 Active</p>
            </div>
          </motion.div>

          <motion.div 
            whileTap={{ scale: 0.99 }}
            className="col-span-2 bg-zinc-900 border border-white/5 rounded-3xl p-6 relative overflow-hidden group cursor-pointer"
          >
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center text-accent">
                <Package className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <p className="text-white font-bold tracking-tight">Scale Your Identity</p>
                <p className="text-[10px] text-white/40 uppercase tracking-widest">Get your professional ID Card</p>
              </div>
              <ArrowUpRight className="w-5 h-5 text-white/20 group-hover:text-accent transition-colors" />
            </div>
            <div className="absolute top-0 right-0 w-32 h-full bg-accent/5 -skew-x-12 translate-x-10 group-hover:translate-x-5 transition-transform" />
          </motion.div>
        </section>

        {/* Featured Video / Promo */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-white/60">Recommended</h3>
            <span className="text-[10px] text-accent font-bold uppercase tracking-widest cursor-pointer">See All</span>
          </div>
          
          <div className="relative aspect-[16/10] rounded-[2.5rem] overflow-hidden group cursor-pointer">
            <img 
              src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800" 
              alt="Promotion" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                  <Play className="w-3 h-3 text-white fill-white" />
                </div>
                <span className="text-[9px] uppercase tracking-widest font-bold text-white/80">Masterclass 04</span>
              </div>
              <h4 className="text-xl font-bold text-white leading-tight">Runway Technique: <br/>The Milan Standard</h4>
            </div>
            
            <button className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white/60 hover:text-white transition-all">
              <Heart className="w-5 h-5" />
            </button>
          </div>
        </section>

        {/* Original Promos for Mobile */}
        <section className="space-y-6">
          <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-white/60">Opportunities</h3>
          
          <motion.div whileTap={{ scale: 0.98 }} className="relative h-[200px] rounded-3xl overflow-hidden border border-white/5">
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600" className="absolute inset-0 w-full h-full object-cover brightness-50" alt="" />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-center p-6">
              <h4 className="text-xl brand-text mb-2">Become <br/>a <span className="text-accent">Model</span></h4>
              <button className="w-fit px-4 py-2 bg-white text-black text-[9px] uppercase tracking-widest font-bold rounded-lg">Apply Now</button>
            </div>
          </motion.div>

          <motion.div whileTap={{ scale: 0.98 }} className="relative h-[200px] rounded-3xl overflow-hidden border border-white/5">
            <img src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600" className="absolute inset-0 w-full h-full object-cover brightness-50" alt="" />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-center p-6">
              <h4 className="text-xl brand-text mb-2">Become <br/>a <span className="text-accent">Designer</span></h4>
              <button className="w-fit px-4 py-2 bg-white text-black text-[9px] uppercase tracking-widest font-bold rounded-lg">Apply Now</button>
            </div>
          </motion.div>
        </section>

        {/* Floating System Log (Native Style) */}
        <div className="bg-zinc-950/80 backdrop-blur-md border border-white/5 rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[9px] uppercase tracking-widest opacity-60">System Synchronized</span>
          </div>
          <span className="text-[9px] opacity-20 font-mono">0x2E85BD5C</span>
        </div>
      </div>
    </>
  )
}
