"use client"

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  LayoutDashboard, 
  Image as ImageIcon, 
  Download, 
  Settings, 
  LogOut,
  Camera,
  Layers,
  Sparkles,
  Menu,
  User,
  X as CloseIcon
} from 'lucide-react'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const navItems = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
  { name: 'Events', icon: ImageIcon, href: '/dashboard/events' },
  { name: 'Purchased', icon: Download, href: '/dashboard/purchased' },
  { name: 'Photographers', icon: Camera, href: '/dashboard/photographers' },
  { name: 'Settings', icon: Settings, href: '/dashboard/settings' },
]

export const Sidebar = () => {
  const pathname = usePathname()
  const [user, setUser] = React.useState<any>(null)
  const [isOpen, setIsOpen] = React.useState(false)

  React.useEffect(() => {
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => {
        if (!data.error) setUser(data)
      })
  }, [])

  return (
    <>
      {/* Mobile Toggle */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 left-6 z-[60] p-3 bg-brand-secondary border border-white/10 rounded-xl lg:hidden text-white"
      >
        {isOpen ? <CloseIcon className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar Container */}
      <aside className={cn(
        "w-64 h-screen fixed left-0 top-0 bg-brand-secondary border-r border-white/5 flex flex-col z-50 transition-transform duration-500 lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Brand Section */}
        <div className="p-8 border-b border-white/5 pt-20 lg:pt-8">
          <Link href="/dashboard" className="flex items-center gap-3 group">
            <div className="w-8 h-8 bg-accent rounded-sm flex items-center justify-center group-hover:scale-110 transition-transform">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="brand-text text-lg leading-none">IDOL FASHION</h1>
              <p className="camera-hud-text text-[8px] opacity-40 tracking-[0.2em] mt-1">THE ELITE LAB</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-6 space-y-2 overflow-y-auto custom-scrollbar">
          <p className="camera-hud-text text-[9px] opacity-30 uppercase tracking-[0.3em] mb-4 ml-2">Navigation</p>
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link 
                key={item.name} 
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-4 px-4 py-3 rounded-lg transition-all group relative overflow-hidden",
                  isActive ? "bg-accent/10 text-accent" : "text-white/60 hover:text-white hover:bg-white/5"
                )}
              >
                {isActive && (
                  <motion.div 
                    layoutId="active-nav"
                    className="absolute left-0 w-1 h-1/2 bg-accent rounded-full"
                  />
                )}
                <item.icon className={cn("w-5 h-5", isActive ? "text-accent" : "text-white/40 group-hover:text-white")} />
                <span className="detail-text text-[11px] tracking-widest uppercase">{item.name}</span>
              </Link>
            )
          })}
        </nav>

        {/* Footer / User Info */}
        <div className="p-6 border-t border-white/5 space-y-4">
          <div className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5">
            <div className="w-10 h-10 rounded-full bg-accent/20 border border-accent/20 overflow-hidden flex items-center justify-center">
              {user?.image ? (
                <img src={user.image} alt="User" className="w-full h-full object-cover" />
              ) : (
                <User className="w-5 h-5 text-accent" />
              )}
            </div>
            <div className="overflow-hidden">
              <p className="camera-hud-text text-[10px] text-white truncate uppercase">{user?.name || 'GUEST_USER'}</p>
              <p className="camera-hud-text text-[8px] opacity-40 uppercase truncate">{user?.role || 'Pending Auth'}</p>
            </div>
          </div>
          
          <button 
            onClick={async () => {
              await fetch('/api/auth/logout', { method: 'POST' })
              window.location.href = '/login'
            }}
            className="w-full flex items-center gap-4 px-4 py-3 text-white/40 hover:text-accent hover:bg-accent/5 rounded-lg transition-all group"
          >
            <LogOut className="w-5 h-5" />
            <span className="detail-text text-[11px] tracking-widest uppercase">Logout</span>
          </button>
        </div>

        {/* HUD Detail Decor */}
        <div className="absolute bottom-4 left-4 pointer-events-none opacity-20 hidden lg:block">
          <div className="camera-hud-text text-[7px]">[ ID: 2e85bd5c ]</div>
          <div className="camera-hud-text text-[7px]">VERSION 1.0.4</div>
        </div>
      </aside>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
        />
      )}
    </>
  )
}
