"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Lock, User, ArrowRight, ShieldCheck } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      
      if (res.ok) {
        router.push('/dashboard')
      } else {
        alert('Invalid credentials. Access denied.')
      }
    } catch (err) {
      console.error(err)
      alert('Security protocol failure. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-brand-secondary flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
         <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[120px]" />
         <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[100px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md space-y-8 z-10"
      >
        {/* Logo Section */}
        <div className="text-center space-y-4">
           <div className="inline-flex p-4 rounded-2xl bg-white/5 border border-white/10 mb-4">
              <ShieldCheck className="w-8 h-8 text-accent" />
           </div>
           <div className="space-y-1">
              <h1 className="brand-text text-4xl">ELITE ACCESS</h1>
              <p className="camera-hud-text text-[9px] tracking-[0.4em] opacity-40 uppercase">Secure Lab Portal // Session Init</p>
           </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="glass-card p-8 rounded-3xl border-white/5 space-y-6">
           <div className="space-y-4">
              <div className="space-y-2">
                 <label className="camera-hud-text text-[8px] opacity-40 uppercase tracking-widest ml-1">Identity (Email)</label>
                 <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-hover:text-accent transition-colors" />
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-6 camera-hud-text text-[10px] tracking-widest focus:border-accent/40 focus:outline-none transition-all"
                      placeholder="USER@IDOLFASHION.COM"
                    />
                 </div>
              </div>

              <div className="space-y-2">
                 <label className="camera-hud-text text-[8px] opacity-40 uppercase tracking-widest ml-1">Passkey</label>
                 <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-hover:text-accent transition-colors" />
                    <input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-6 camera-hud-text text-[10px] tracking-widest focus:border-accent/40 focus:outline-none transition-all"
                      placeholder="••••••••••••"
                    />
                 </div>
              </div>
           </div>

           <button 
             type="submit" 
             disabled={loading}
             className="w-full group relative overflow-hidden bg-white hover:bg-accent text-black hover:text-white transition-all py-4 rounded-xl flex items-center justify-center gap-3 disabled:opacity-50"
           >
              {loading ? (
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span className="camera-hud-text text-[10px] tracking-[0.3em] uppercase font-bold">Authorize Login</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
           </button>
        </form>

        {/* Footer Info */}
        <div className="text-center space-y-4">
           <p className="detail-text text-[10px] opacity-30 uppercase tracking-widest">
             Don't have lab access? <br/>
             <Link href="/register" className="text-accent hover:underline cursor-pointer">Register as Talent</Link>
           </p>
           
           <div className="flex justify-center gap-8 opacity-10">
              <div className="camera-hud-text text-[7px]">ENCRYPTION: AES-256</div>
              <div className="camera-hud-text text-[7px]">NODE: MIAMI_LAB_01</div>
              <div className="camera-hud-text text-[7px]">SSL: ACTIVE</div>
           </div>
        </div>
      </motion.div>

      {/* HUD Accents */}
      <div className="fixed top-8 left-8 pointer-events-none opacity-20">
         <div className="camera-hud-text text-[10px]">VER: 1.0.4</div>
         <div className="camera-hud-text text-[10px]">BOOT_SEC_PASS</div>
      </div>
      <div className="fixed bottom-8 right-8 pointer-events-none opacity-20 text-right">
         <div className="camera-hud-text text-[10px]">LAT: 25.8102° N</div>
         <div className="camera-hud-text text-[10px]">LNG: 80.1751° W</div>
      </div>
    </div>
  )
}
