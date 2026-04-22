"use client"

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  LayoutDashboard, 
  Image as ImageIcon, 
  Download, 
  User, 
  Settings, 
  Bell,
  Search,
  Battery,
  Wifi,
  Signal
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// --- Components ---

// --- Components ---

const BottomTabs = () => {
  const pathname = usePathname()
  
  const tabs = [
    { name: 'Home', icon: LayoutDashboard, href: '/dashboard' },
    { name: 'Events', icon: ImageIcon, href: '/dashboard/events' },
    { name: 'Assets', icon: Download, href: '/dashboard/purchased' },
    { name: 'Profile', icon: User, href: '/dashboard/profile' },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-8 pt-2">
      <div className="max-w-md mx-auto bg-black/40 backdrop-blur-2xl border border-white/5 rounded-full px-2 py-2 flex items-center justify-around shadow-2xl">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href
          return (
            <Link 
              key={tab.name}
              href={tab.href}
              className={cn(
                "relative flex flex-col items-center py-2 px-4 rounded-full transition-all duration-300",
                isActive ? "text-accent" : "text-white/40 hover:text-white/60"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="active-tab-pill"
                  className="absolute inset-0 bg-accent/10 rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <tab.icon className={cn("w-5 h-5 mb-1", isActive && "fill-accent/20")} />
              <span className="text-[9px] font-medium uppercase tracking-widest">{tab.name}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

const AppHeader = ({ user }: { user: any }) => {
  return (
    <header className="px-6 py-4 flex items-center justify-between sticky top-0 z-50 bg-brand-secondary/80 backdrop-blur-lg border-b border-white/5">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-accent/20 border border-accent/20 overflow-hidden">
          {user?.image ? (
            <img src={user.image} alt="User" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-accent">
              <User className="w-5 h-5" />
            </div>
          )}
        </div>
        <div>
          <p className="camera-hud-text text-[10px] text-white/40 leading-none mb-1 tracking-tighter">IDOL_MEMBER</p>
          <p className="text-sm font-bold tracking-tight uppercase">{user?.name || 'Felix R.'}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-white transition-colors">
          <Search className="w-5 h-5" />
        </button>
        <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-white transition-colors relative">
          <Bell className="w-5 h-5" />
          <div className="absolute top-3 right-3 w-2 h-2 bg-accent rounded-full border-2 border-brand-secondary" />
        </button>
      </div>
    </header>
  )
}

export const AppShell = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState<any>(null)

  React.useEffect(() => {
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => {
        if (!data.error) setUser(data)
      })
  }, [])

  return (
    <div className="min-h-[100dvh] bg-brand-secondary text-white selection:bg-accent/30 overflow-x-hidden">
      {/* App Container - Takes full width on mobile view */}
      <div className="w-full min-h-screen relative">
        <AppHeader user={user} />
        
        {/* Main Content Viewport */}
        <main className="pb-32 pt-4 px-6 overflow-y-auto overflow-x-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>

        <BottomTabs />
      </div>
    </div>
  )
}
