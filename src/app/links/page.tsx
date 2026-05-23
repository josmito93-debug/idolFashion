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
  const [followedAccounts, setFollowedAccounts] = useState<string[]>([])
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [hasTriggeredUnlockEffect, setHasTriggeredUnlockEffect] = useState(false)

  // Load from localStorage safely on mount
  useEffect(() => {
    const saved = localStorage.getItem('idol_fashion_followed_accounts')
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as string[]
        setFollowedAccounts(parsed)
        if (parsed.length === INSTAGRAM_ACCOUNTS.length) {
          setIsUnlocked(true)
          setHasTriggeredUnlockEffect(true)
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
        particleCount: 160,
        spread: 90,
        origin: { y: 0.55 },
        colors: ['#D4AF37', '#ffffff', '#0a0a0a', '#ff3b30']
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
        }, 400)
      }
      return updated
    })
  }

  const handleReset = () => {
    localStorage.removeItem('idol_fashion_followed_accounts')
    setFollowedAccounts([])
    setIsUnlocked(false)
    setHasTriggeredUnlockEffect(false)
  }

  // Custom cubic-bezier curve from our premium high-end-visual-design spec
  const easeTransition = { type: "spring" as const, stiffness: 100, damping: 22 }

  return (
    <main className="min-h-[100dvh] bg-brand-secondary text-white relative overflow-hidden flex flex-col items-center py-24 px-4 md:px-6">
      <CameraHUD />
      
      {/* Background Ambient Mesh Gradients */}
      <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
        <div className="absolute top-0 right-0 w-[55vw] h-[55vw] max-w-[650px] bg-accent/15 rounded-full blur-[130px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] max-w-[550px] bg-accent/8 rounded-full blur-[110px] translate-y-1/2 -translate-x-1/3" />
      </div>

      <div className="w-full max-w-md space-y-10 z-10 relative">
        
        {/* Header */}
        <div className="text-center space-y-5">
          <motion.div 
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={easeTransition}
            className="inline-flex p-4 rounded-[2rem] bg-black/40 backdrop-blur-xl border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)] relative"
          >
            {/* Elegant Gold Bezel Fading to Zero Opacity */}
            <div className="absolute inset-0 rounded-[2rem] border border-transparent [background:linear-gradient(to_bottom_right,#D4AF37,transparent)_border-box] [mask:linear-gradient(#fff_0_0)_padding-box,_linear-gradient(#fff_0_0)] [mask-composite:exclude] pointer-events-none opacity-40 animate-pulse-slow" />
            
            <AnimatePresence mode="wait">
              {isUnlocked ? (
                <motion.div
                  key="unlocked-icon"
                  initial={{ rotate: -15, scale: 0.85, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  exit={{ rotate: 15, scale: 0.85, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="relative"
                >
                  <motion.div
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 1.8, repeat: Infinity, repeatType: "reverse" }}
                    className="absolute inset-0 bg-accent/25 rounded-full blur-md"
                  />
                  <Unlock className="w-9 h-9 text-accent relative z-10 animate-pulse-slow" strokeWidth={1.5} />
                </motion.div>
              ) : (
                <motion.div
                  key="locked-icon"
                  initial={{ rotate: 15, scale: 0.85, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  exit={{ rotate: -15, scale: 0.85, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <ShieldCheck className="w-9 h-9 text-white/40" strokeWidth={1.5} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <div className="space-y-1.5 animate-fade-in">
            <h1 className="brand-text text-4xl md:text-5xl uppercase tracking-tighter leading-none font-bold">
              Protocol Hub
            </h1>
            <p className="camera-hud-text text-[8px] tracking-[0.45em] opacity-40 uppercase">
              Idol Fashion Group // Elite Intake
            </p>
          </div>
        </div>

        {/* Multi-State Core Container with AnimatePresence */}
        <div className="relative overflow-visible">
          <AnimatePresence mode="wait">
            {!isUnlocked ? (
              <motion.div
                key="locked-auth-flow"
                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.98 }}
                transition={easeTransition}
                className="space-y-6"
              >
                {/* LOCKED BANNER STATUS */}
                <div className="p-3.5 rounded-xl border border-white/5 bg-black/40 backdrop-blur-md flex items-start gap-3 relative overflow-hidden">
                  {/* Gold Bezel for Status Alert */}
                  <div className="absolute inset-0 rounded-xl border border-transparent [background:linear-gradient(to_bottom_right,#D4AF37,transparent)_border-box] [mask:linear-gradient(#fff_0_0)_padding-box,_linear-gradient(#fff_0_0)] [mask-composite:exclude] pointer-events-none opacity-20" />
                  
                  <AlertCircle className="w-4 h-4 text-white/30 shrink-0 mt-0.5 animate-pulse" />
                  <div className="space-y-0.5">
                    <p className="camera-hud-text text-[9px] text-white/40 tracking-widest font-bold">
                      ACCESS_STATUS: RESTRICTED
                    </p>
                    <p className="camera-hud-text text-[8px] text-white/60 leading-relaxed uppercase tracking-wider font-medium">
                      Authorization credential protocol offline. Connect and verify social identities below to decrypt application intake links.
                    </p>
                  </div>
                </div>

                {/* DOUBLE BEZEL INSTAGRAM AUTHS CHECKLIST CARD with Glassmorphism and Gold Border */}
                <div className="p-1.5 bg-white/5 border border-white/10 rounded-[2rem] shadow-[0_25px_50px_-20px_rgba(0,0,0,0.5)] relative">
                  
                  {/* Ultra-Premium Rounded Gold Border that Fades to Zero Opacity */}
                  <div className="absolute inset-0 rounded-[2rem] border border-transparent [background:linear-gradient(to_bottom_right,#D4AF37,transparent)_border-box] [mask:linear-gradient(#fff_0_0)_padding-box,_linear-gradient(#fff_0_0)] [mask-composite:exclude] pointer-events-none opacity-35" />
                  
                  <div className="bg-[#0b0b0b]/80 backdrop-blur-2xl rounded-[calc(2rem-4px)] p-6 space-y-5">
                    
                    {/* Authorization Card Header */}
                    <div className="flex justify-between items-start border-b border-white/5 pb-4">
                      <div className="space-y-1">
                        <span className="rounded-full px-2 py-0.5 text-[8px] uppercase tracking-[0.2em] font-medium bg-accent/10 border border-accent/20 text-accent">
                          INTAKE DECRYPTOR
                        </span>
                        <h3 className="camera-hud-text text-[11px] font-bold text-white tracking-widest uppercase">
                          Channel Access Nodes
                        </h3>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="camera-hud-text text-[9px] font-mono font-bold text-white">
                          {followedAccounts.length}/{INSTAGRAM_ACCOUNTS.length}
                        </span>
                        <span className="camera-hud-text text-[8px] opacity-30 uppercase tracking-widest">
                          OK
                        </span>
                      </div>
                    </div>

                    {/* Instagram nodes list */}
                    <div className="space-y-2">
                      {INSTAGRAM_ACCOUNTS.map((account, index) => {
                        const isFollowed = followedAccounts.includes(account.id)
                        
                        return (
                          <div 
                            key={account.id}
                            className="relative flex items-center justify-between p-3 bg-black/40 backdrop-blur-md rounded-xl hover:bg-black/50 transition-all duration-300 overflow-hidden"
                          >
                            {/* Gold fading border per Instagram node item */}
                            <div className="absolute inset-0 rounded-xl border border-transparent [background:linear-gradient(to_bottom_right,#D4AF37,transparent)_border-box] [mask:linear-gradient(#fff_0_0)_padding-box,_linear-gradient(#fff_0_0)] [mask-composite:exclude] pointer-events-none opacity-25" />
                            
                            <div className="flex items-center gap-3 relative z-10">
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
                              className={`h-7 px-3 rounded-lg camera-hud-text text-[8px] font-bold tracking-widest transition-all uppercase flex items-center gap-1.5 cursor-pointer active:scale-[0.97] duration-150 relative z-10 ${
                                isFollowed 
                                  ? 'bg-accent/10 border border-accent/30 text-accent hover:bg-accent/15'
                                  : 'bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20'
                              }`}
                            >
                              {isFollowed ? (
                                <>
                                  <Check className="w-3 h-3 text-accent animate-pulse-slow" strokeWidth={2.5} />
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

                    {/* Pending Status Row */}
                    <div className="pt-1">
                      <div className="p-3 bg-white/[0.01] border border-white/5 rounded-xl flex items-center gap-2.5">
                        <Lock className="w-3.5 h-3.5 text-white/20 animate-pulse" strokeWidth={1.5} />
                        <div>
                          <p className="camera-hud-text text-[9px] text-white/30 tracking-widest font-bold">
                            STATUS: ACCESS_RESTRICTED
                          </p>
                          <p className="camera-hud-text text-[7px] text-white/20 tracking-widest font-medium">
                            PENDING COMPLETED INSTAGRAM CHANNELS AUTHORIZATION
                          </p>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="unlocked-links-flow"
                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.98 }}
                transition={easeTransition}
                className="space-y-4"
              >
                {/* SUCCESS GRANTED BANNER */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1, duration: 0.4, type: "spring" }}
                  className="p-3.5 rounded-xl border border-accent/30 bg-black/40 backdrop-blur-md flex items-start gap-3 shadow-[0_4px_20px_rgba(232,49,227,0.15)] relative overflow-hidden"
                >
                  {/* Gold Bezel for Status Alert */}
                  <div className="absolute inset-0 rounded-xl border border-transparent [background:linear-gradient(to_bottom_right,#D4AF37,transparent)_border-box] [mask:linear-gradient(#fff_0_0)_padding-box,_linear-gradient(#fff_0_0)] [mask-composite:exclude] pointer-events-none opacity-30" />

                  <Sparkles className="w-4 h-4 text-accent shrink-0 mt-0.5 animate-spin-slow" />
                  <div className="space-y-0.5 relative z-10">
                    <p className="camera-hud-text text-[9px] text-accent tracking-widest font-bold">
                      PROTOCOL_AUTHORIZED // ACCESS_GRANTED
                    </p>
                    <p className="camera-hud-text text-[8px] text-white/80 leading-relaxed uppercase tracking-wider font-medium">
                      All security clearance matrices verified successfully. All application protocols are now decrypted and ready.
                    </p>
                  </div>
                </motion.div>

                {/* THE REVEALED LINKS GRID (with Glassmorphism and fading Gold Border) */}
                <div className="space-y-3">
                  {QUICK_LINKS.map((link, idx) => (
                    <motion.div
                      key={link.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        opacity: { delay: idx * 0.05, duration: 0.4 },
                        y: { delay: idx * 0.05, duration: 0.4, type: "spring", stiffness: 100, damping: 15 }
                      }}
                      className="w-full"
                    >
                      <Link 
                        href={link.href}
                        className="group relative flex items-center justify-between p-4 bg-black/40 backdrop-blur-md rounded-2xl hover:bg-black/50 active:scale-[0.98] transition-all overflow-hidden"
                      >
                        {/* Elite Rounded Gold Border that Fades to Zero Opacity */}
                        <div className="absolute inset-0 rounded-2xl border border-transparent [background:linear-gradient(to_bottom_right,#D4AF37,transparent)_border-box] [mask:linear-gradient(#fff_0_0)_padding-box,_linear-gradient(#fff_0_0)] [mask-composite:exclude] pointer-events-none opacity-30 group-hover:opacity-55 transition-opacity duration-300" />

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
                          <ArrowUpRight className="w-3.5 h-3.5 opacity-30 group-hover:opacity-100 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" strokeWidth={1.5} />
                        </div>

                        {/* Elite Hover Glow Track */}
                        <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 blur-[30px] -translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* VERIFIED SUMMARY AND RESET BUTTON (DOUBLE BEZEL DECOR CARD) */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="p-1 bg-white/5 border border-white/10 rounded-2xl relative"
                >
                  {/* Gold border decoration */}
                  <div className="absolute inset-0 rounded-2xl border border-transparent [background:linear-gradient(to_bottom_right,#D4AF37,transparent)_border-box] [mask:linear-gradient(#fff_0_0)_padding-box,_linear-gradient(#fff_0_0)] [mask-composite:exclude] pointer-events-none opacity-30" />

                  <div className="bg-[#0b0b0b]/90 rounded-[14px] p-3 flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-2.5">
                      <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                      <p className="camera-hud-text text-[8.5px] text-white/50 tracking-widest font-bold">
                        VERIFICATION MATRICES SECURED (4/4)
                      </p>
                    </div>
                    
                    <button 
                      onClick={handleReset}
                      className="p-1.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-white cursor-pointer transition-colors active:scale-[0.95]"
                      title="Lock protocols / Reset state"
                    >
                      <RefreshCw className="w-3 h-3 opacity-60 hover:opacity-100" />
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
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
