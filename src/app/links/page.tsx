"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { 
  User, 
  PenTool, 
  Camera, 
  Scissors, 
  ArrowUpRight, 
  Instagram, 
  Globe, 
  ShieldCheck,
  Zap
} from 'lucide-react'
import Link from 'next/link'
import { CameraHUD } from '@/components/hero/CameraHUD'

const QUICK_LINKS = [
  {
    id: 'model',
    label: 'Apply as Model',
    icon: User,
    href: '/apply/model',
    detail: 'Elite Talent Intake Protocol'
  },
  {
    id: 'designer',
    label: 'Apply as Designer',
    icon: PenTool,
    href: '/apply/designer',
    detail: 'Creative Director Admission'
  },
  {
    id: 'photographer',
    label: 'Media Accreditation',
    icon: Camera,
    href: '/apply/media',
    detail: 'Visual Press Protocol'
  },
  {
    id: 'staff',
    label: 'Staff & Backstage',
    icon: Scissors,
    href: '/apply/staff',
    detail: 'Operational Excellence'
  },
  {
    id: 'portfolios',
    label: 'Model Portfolios',
    icon: Globe,
    href: '/model-portfolios',
    detail: 'View Active Identities'
  },
  {
    id: 'instagram',
    label: 'Official Instagram',
    icon: Instagram,
    href: 'https://instagram.com/idolfashion.miami',
    detail: '@idolfashion.miami'
  }
]

export default function QuickLinksPage() {
  return (
    <main className="min-h-screen bg-brand-secondary text-white relative overflow-hidden flex flex-col items-center py-20 px-6">
      <CameraHUD />
      
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
         <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="w-full max-w-md space-y-12 z-10">
        {/* Header */}
        <div className="text-center space-y-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex p-5 rounded-3xl bg-white/5 border border-white/10 mb-2"
          >
            <ShieldCheck className="w-10 h-10 text-accent" />
          </motion.div>
          <div className="space-y-2">
            <h1 className="brand-text text-5xl uppercase tracking-tighter leading-none">Quick Protocol</h1>
            <p className="camera-hud-text text-[9px] tracking-[0.5em] opacity-40 uppercase">Idol Fashion Hub // Elite Access</p>
          </div>
        </div>

        {/* Links Grid */}
        <div className="space-y-4">
          {QUICK_LINKS.map((link, idx) => (
            <motion.div
              key={link.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link 
                href={link.href}
                className="group relative flex items-center justify-between p-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-accent/40 transition-all overflow-hidden"
              >
                <div className="flex items-center gap-5 relative z-10">
                  <div className="p-3 rounded-xl bg-white/5 group-hover:bg-accent/20 group-hover:text-accent transition-colors">
                    <link.icon className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="camera-hud-text text-[11px] tracking-widest uppercase font-bold text-white group-hover:text-accent transition-colors">
                      {link.label}
                    </span>
                    <span className="camera-hud-text text-[7px] opacity-30 uppercase tracking-[0.2em] mt-1">
                      {link.detail}
                    </span>
                  </div>
                </div>
                
                <div className="relative z-10">
                  <ArrowUpRight className="w-4 h-4 opacity-20 group-hover:opacity-100 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>

                {/* Hover Glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 blur-[40px] -translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-8 text-center space-y-8">
          <Link href="/" className="inline-flex items-center gap-3 camera-hud-text text-[9px] tracking-[0.4em] uppercase opacity-40 hover:opacity-100 hover:text-accent transition-all group">
            <Zap className="w-3 h-3 group-hover:animate-pulse" />
            Back to Command Center
          </Link>

          <div className="flex justify-center gap-10 opacity-10">
            <div className="camera-hud-text text-[7px]">ENCRYPTION: AES-256</div>
            <div className="camera-hud-text text-[7px]">NODE: MIAMI_LAB_01</div>
            <div className="camera-hud-text text-[7px]">ACCESS: ELITE_PROTOCOL</div>
          </div>
        </div>
      </div>

      {/* Decorative Corners */}
      <div className="fixed top-8 left-8 pointer-events-none opacity-20 hidden md:block">
         <div className="camera-hud-text text-[10px]">VER: 1.0.4</div>
         <div className="camera-hud-text text-[10px]">QUICK_PROTOCOL_ENABLED</div>
      </div>
      <div className="fixed bottom-8 right-8 pointer-events-none opacity-20 text-right hidden md:block">
         <div className="camera-hud-text text-[10px]">IDOL FASHION LAB</div>
         <div className="camera-hud-text text-[10px]">INTERNAL_NETWORK</div>
      </div>
    </main>
  )
}
