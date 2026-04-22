"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Sparkles, User, Package, Clock, ShoppingBag } from 'lucide-react'

export default function DashboardHome() {
  return (
    <div className="space-y-12">
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
  )
}
