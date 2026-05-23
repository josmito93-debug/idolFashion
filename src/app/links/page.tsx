"use client"

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  User, 
  PenTool, 
  Camera, 
  Scissors, 
  ArrowUpRight, 
  Instagram, 
  Globe, 
  ShieldCheck,
  Zap,
  Lock,
  Unlock,
  Check,
  Sparkles,
  RefreshCw,
  AlertCircle
} from 'lucide-react'
import Link from 'next/link'
import { CameraHUD } from '@/components/hero/CameraHUD'

const INSTAGRAM_ACCOUNTS = [
  {
    id: 'idol_jose',
    username: 'idol_jose',
    label: 'Creative Director & Founder',
    url: 'https://instagram.com/idol_jose'
  },
  {
    id: 'Doralfashionweekoficial',
    username: 'Doralfashionweekoficial',
    label: 'Doral Fashion Week Official',
    url: 'https://instagram.com/Doralfashionweekoficial'
  },
  {
    id: 'idolfashiontheelitelab',
    username: 'idolfashiontheelitelab',
    label: 'The Elite Fashion Lab',
    url: 'https://instagram.com/idolfashiontheelitelab'
  },
  {
    id: 'dr.juanfcoskincare',
    username: 'dr.juanfcoskincare',
    label: 'Official Skincare Protocol',
    url: 'https://instagram.com/dr.juanfcoskincare'
  }
]

const QUICK_LINKS = [
  {
    id: 'model',
    label: 'Apply as Model',
    icon: User,
    href: '/apply/model',
    detail: 'Elite Talent Intake Protocol',
    isApply: true
  },
  {
    id: 'designer',
    label: 'Apply as Designer',
    icon: PenTool,
    href: '/apply/designer',
    detail: 'Creative Director Admission',
    isApply: true
  },
  {
    id: 'photographer',
    label: 'Media Accreditation',
    icon: Camera,
    href: '/apply/media',
    detail: 'Visual Press Protocol',
    isApply: true
  },
  {
    id: 'staff',
    label: 'Staff & Backstage',
    icon: Scissors,
    href: '/apply/staff',
    detail: 'Operational Excellence',
    isApply: true
  },
  {
    id: 'portfolios',
    label: 'Model Portfolios',
    icon: Globe,
    href: '/model-portfolios',
    detail: 'View Active Identities',
    isApply: false
  },
  {
    id: 'instagram',
    label: 'Official Instagram',
    icon: Instagram,
    href: 'https://instagram.com/idolfashion.miami',
    detail: '@idolfashion.miami',
    isApply: false
  }
]

export default function QuickLinksPage() {
  const [followedAccounts, setFollowedAccounts] = useState<string[]>([])
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [shakeLinkId, setShakeLinkId] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // Load from localStorage safely on mount
  useEffect(() => {
    const saved = localStorage.getItem('idol_fashion_followed_accounts')
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as string[]
        setFollowedAccounts(parsed)
        if (parsed.length === INSTAGRAM_ACCOUNTS.length) {
          setIsUnlocked(true)
        }
      } catch (e) {
        console.error('Error loading followed accounts', e)
      }
    }
  }, [])

  const triggerConfetti = () => {
    import('canvas-confetti').then((m) => {
      const confettiFn = m.default || m
      confettiFn({
        particleCount: 150,
        spread: 85,
        origin: { y: 0.6 },
        colors: ['#e831e3', '#ffffff', '#0a0a0a', '#ff3b30']
      })
    })
  }

  const handleFollow = (id: string, url: string) => {
    // Open Instagram link in new tab
    window.open(url, '_blank', 'noopener,noreferrer')
    
    setFollowedAccounts((prev) => {
      if (prev.includes(id)) return prev
      const updated = [...prev, id]
      localStorage.setItem('idol_fashion_followed_accounts', JSON.stringify(updated))
      
      if (updated.length === INSTAGRAM_ACCOUNTS.length) {
        setIsUnlocked(true)
        setTimeout(() => {
          triggerConfetti()
        }, 300)
      }
      return updated
    })
  }

  const handleReset = () => {
    localStorage.removeItem('idol_fashion_followed_accounts')
    setFollowedAccounts([])
    setIsUnlocked(false)
    setErrorMessage(null)
  }

  const handleLockedClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault()
    setShakeLinkId(id)
    setErrorMessage('Elite application locks active. Follow all channels below to authorize credentials.')
    
    const authSection = document.getElementById('auth-section')
    if (authSection) {
      authSection.scrollIntoView({ behavior: 'smooth' })
    }

    setTimeout(() => {
      setShakeLinkId(null)
    }, 500)
  }

  return (
    <main className="min-h-[100dvh] bg-brand-secondary text-white relative overflow-hidden flex flex-col items-center py-24 px-4 md:px-6">
      <CameraHUD />
      
      {/* Background Ambient Mesh Gradients */}
      <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] max-w-[600px] bg-accent/15 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[45vw] h-[45vw] max-w-[500px] bg-accent/8 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3" />
      </div>

      <div className="w-full max-w-md space-y-10 z-10 relative">
        
        {/* Header */}
        <div className="text-center space-y-5">
          <motion.div 
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="inline-flex p-4 rounded-[2rem] bg-white/5 border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)] relative"
          >
            <AnimatePresence mode="wait">
              {isUnlocked ? (
                <motion.div
                  key="unlocked-icon"
                  initial={{ rotate: -10, scale: 0.9, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  exit={{ rotate: 10, scale: 0.9, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="relative"
                >
                  <motion.div
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                    className="absolute inset-0 bg-accent/20 rounded-full blur-md"
                  />
                  <Unlock className="w-9 h-9 text-accent relative z-10" strokeWidth={1.5} />
                </motion.div>
              ) : (
                <motion.div
                  key="locked-icon"
                  initial={{ rotate: 10, scale: 0.9, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  exit={{ rotate: -10, scale: 0.9, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ShieldCheck className="w-9 h-9 text-white/40" strokeWidth={1.5} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <div className="space-y-1.5">
            <h1 className="brand-text text-4xl md:text-5xl uppercase tracking-tighter leading-none font-bold">
              Protocol Hub
            </h1>
            <p className="camera-hud-text text-[8px] tracking-[0.45em] opacity-40 uppercase">
              Idol Fashion Group // Elite Intake
            </p>
          </div>
        </div>

        {/* Locked Status HUD Alert Banner */}
        <AnimatePresence>
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="p-3.5 rounded-xl border border-[#ff3b30]/30 bg-[#ff3b30]/5 flex items-start gap-3"
            >
              <AlertCircle className="w-4 h-4 text-[#ff3b30] shrink-0 mt-0.5 animate-pulse" />
              <div className="space-y-0.5">
                <p className="camera-hud-text text-[9px] text-[#ff3b30] tracking-widest font-bold">
                  CREDENTIALS_RESTRICTED
                </p>
                <p className="camera-hud-text text-[8px] text-white/70 leading-relaxed uppercase tracking-wider font-medium normal-case">
                  {errorMessage}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Links Grid */}
        <div className="space-y-3">
          {QUICK_LINKS.map((link, idx) => {
            const isLocked = link.isApply && !isUnlocked
            const isShaking = shakeLinkId === link.id

            return (
              <motion.div
                key={link.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  x: isShaking ? [0, -6, 6, -6, 6, 0] : 0
                }}
                transition={{ 
                  opacity: { delay: idx * 0.05, duration: 0.4 },
                  y: { delay: idx * 0.05, duration: 0.4, type: "spring", stiffness: 100, damping: 15 },
                  x: { duration: 0.4 }
                }}
                className="w-full"
              >
                {isLocked ? (
                  <button
                    onClick={(e) => handleLockedClick(e, link.id)}
                    className="w-full text-left group relative block p-4 bg-white/[0.02] border border-white/5 rounded-2xl transition-all cursor-pointer select-none"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 opacity-40 transition-opacity">
                        <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                          <link.icon className="w-4 h-4" strokeWidth={1.5} />
                        </div>
                        <div className="flex flex-col">
                          <span className="camera-hud-text text-[10px] tracking-wider uppercase font-bold text-white">
                            {link.label}
                          </span>
                          <span className="camera-hud-text text-[7px] opacity-40 uppercase tracking-[0.15em] mt-0.5">
                            {link.detail}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-1 rounded-full bg-white/5 border border-white/10 opacity-40 group-hover:opacity-100 group-hover:bg-white/10 transition-all">
                        <Lock className="w-3.5 h-3.5 text-white/50 group-hover:text-white" strokeWidth={1.5} />
                      </div>
                    </div>
                  </button>
                ) : (
                  <Link 
                    href={link.href}
                    className="group relative flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-accent/40 active:scale-[0.98] transition-all overflow-hidden"
                  >
                    <div className="flex items-center gap-4 relative z-10">
                      <div className="p-3 rounded-xl bg-white/5 border border-white/5 group-hover:bg-accent/15 group-hover:border-accent/30 group-hover:text-accent transition-all duration-300">
                        <link.icon className="w-4 h-4" strokeWidth={1.5} />
                      </div>
                      <div className="flex flex-col">
                        <span className="camera-hud-text text-[10px] tracking-wider uppercase font-bold text-white group-hover:text-accent transition-colors">
                          {link.label}
                        </span>
                        <span className="camera-hud-text text-[7px] opacity-40 uppercase tracking-[0.15em] mt-0.5 group-hover:text-accent/60 transition-colors">
                          {link.detail}
                        </span>
                      </div>
                    </div>
                    
                    <div className="relative z-10 flex items-center gap-2">
                      {link.isApply && (
                        <span className="camera-hud-text text-[7px] text-accent font-bold tracking-widest border border-accent/20 bg-accent/5 px-1.5 py-0.5 rounded uppercase">
                          UNLOCKED
                        </span>
                      )}
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-30 group-hover:opacity-100 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" strokeWidth={1.5} />
                    </div>

                    {/* Elite Hover Glow Track */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 blur-[30px] -translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  </Link>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Double Bezel Verification Dashboard Section */}
        <div id="auth-section" className="p-1 bg-white/5 border border-white/10 rounded-[2rem] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.4)] relative">
          
          {/* Internal Glow Effect */}
          <div className="absolute inset-[1px] rounded-[calc(2rem-1px)] border border-white/5 pointer-events-none" />
          
          <div className="bg-[#0b0b0b] rounded-[calc(2rem-4px)] p-6 space-y-5">
            
            {/* Verification Header */}
            <div className="flex justify-between items-start border-b border-white/5 pb-4">
              <div className="space-y-1">
                <span className="rounded-full px-2 py-0.5 text-[8px] uppercase tracking-[0.2em] font-medium bg-accent/10 border border-accent/20 text-accent">
                  INTAKE PROTOCOL
                </span>
                <h3 className="camera-hud-text text-[11px] font-bold text-white tracking-widest uppercase">
                  Authorization Protocol
                </h3>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="camera-hud-text text-[9px] font-mono font-bold text-white">
                  {followedAccounts.length}/{INSTAGRAM_ACCOUNTS.length}
                </span>
                <span className="camera-hud-text text-[8px] opacity-30 uppercase tracking-widest">
                  CHANNELS
                </span>
              </div>
            </div>

            <p className="camera-hud-text text-[8.5px] text-white/60 tracking-wider leading-relaxed uppercase font-medium">
              Elite authorization requires verifying visual identities. Follow all four official instagram nodes to decrypt and activate your application intake links.
            </p>

            {/* Verification Channels Checklist */}
            <div className="space-y-2">
              {INSTAGRAM_ACCOUNTS.map((account, index) => {
                const isFollowed = followedAccounts.includes(account.id)
                
                return (
                  <div 
                    key={account.id}
                    className="flex items-center justify-between p-2.5 bg-white/[0.02] border border-white/[0.03] rounded-xl hover:bg-white/[0.04] transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <span className="camera-hud-text text-[8px] opacity-30 font-mono">
                        {`0${index + 1}`}
                      </span>
                      <div className="flex flex-col">
                        <span className="camera-hud-text text-[9.5px] font-bold text-white tracking-widest lowercase flex items-center">
                          @{account.username}
                        </span>
                        <span className="camera-hud-text text-[7px] opacity-40 uppercase tracking-widest mt-0.5">
                          {account.label}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleFollow(account.id, account.url)}
                      className={`h-7 px-3 rounded-lg camera-hud-text text-[8px] font-bold tracking-widest transition-all uppercase flex items-center gap-1.5 cursor-pointer active:scale-[0.97] duration-150 ${
                        isFollowed 
                          ? 'bg-accent/10 border border-accent/30 text-accent hover:bg-accent/15'
                          : 'bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20'
                      }`}
                    >
                      {isFollowed ? (
                        <>
                          <Check className="w-3 h-3 text-accent" strokeWidth={2.5} />
                          VERIFIED
                        </>
                      ) : (
                        <>
                          <Instagram className="w-3 h-3 opacity-60" strokeWidth={1.5} />
                          FOLLOW
                        </>
                      )}
                    </button>
                  </div>
                )
              })}
            </div>

            {/* Unlock Status Indicators */}
            <div className="pt-2">
              <AnimatePresence mode="wait">
                {isUnlocked ? (
                  <motion.div 
                    key="status-active"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="p-3 bg-accent/5 border border-accent/20 rounded-xl flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-accent animate-spin-slow" />
                      <div>
                        <p className="camera-hud-text text-[9px] text-accent tracking-widest font-bold">
                          STATUS: ACTIVE_PROTOCOL
                        </p>
                        <p className="camera-hud-text text-[7px] text-accent/80 tracking-widest font-medium">
                          ALL SYSTEM INTEMPT REGISTERS AUTHORIZED
                        </p>
                      </div>
                    </div>
                    {followedAccounts.length > 0 && (
                      <button 
                        onClick={handleReset}
                        className="p-1 rounded bg-white/5 hover:bg-white/10 border border-white/10 cursor-pointer transition-colors active:scale-[0.95]"
                        title="Reset locks"
                      >
                        <RefreshCw className="w-3 h-3 opacity-50 hover:opacity-100" />
                      </button>
                    )}
                  </motion.div>
                ) : (
                  <motion.div 
                    key="status-pending"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="p-3 bg-white/[0.02] border border-white/5 rounded-xl flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <Lock className="w-3.5 h-3.5 text-white/30 animate-pulse" />
                      <div>
                        <p className="camera-hud-text text-[9px] text-white/40 tracking-widest font-bold">
                          STATUS: ACCESS_RESTRICTED
                        </p>
                        <p className="camera-hud-text text-[7px] text-white/30 tracking-widest font-medium">
                          PENDING OFFICIAL CHANNEL AUTHORIZATION
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>

        {/* Footer Navigation */}
        <div className="pt-4 text-center space-y-8">
          <Link href="/" className="inline-flex items-center gap-3 camera-hud-text text-[9px] tracking-[0.4em] uppercase opacity-40 hover:opacity-100 hover:text-accent transition-all duration-300 group">
            <Zap className="w-3 h-3 group-hover:animate-pulse" strokeWidth={1.5} />
            Back to Command Center
          </Link>

          <div className="flex justify-center gap-8 opacity-15">
            <div className="camera-hud-text text-[7px]">ENCRYPTION: AES-256</div>
            <div className="camera-hud-text text-[7px]">NODE: MIAMI_LAB_01</div>
            <div className="camera-hud-text text-[7px]">ACCESS: ELITE_PROTOCOL</div>
          </div>
        </div>
      </div>

      {/* Decorative Corners */}
      <div className="fixed top-8 left-8 pointer-events-none opacity-20 hidden md:block z-55">
         <div className="camera-hud-text text-[9px]">VER: 1.0.8</div>
         <div className="camera-hud-text text-[9px]">QUICK_PROTOCOL_ENABLED</div>
      </div>
      <div className="fixed bottom-8 right-8 pointer-events-none opacity-20 text-right hidden md:block z-55">
         <div className="camera-hud-text text-[9px]">IDOL FASHION LAB</div>
         <div className="camera-hud-text text-[9px]">INTERNAL_NETWORK</div>
      </div>
    </main>
  )
}
