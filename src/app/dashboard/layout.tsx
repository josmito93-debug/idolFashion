import React from 'react'
import { Sidebar } from '@/components/dashboard/Sidebar'
import { AppShell } from '@/components/dashboard/AppShell'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* Desktop Layout */}
      <div className="hidden lg:flex min-h-screen bg-brand-secondary text-white">
        <Sidebar />
        <main className="flex-1 ml-64 min-h-screen relative">
          <header className="h-20 border-b border-white/5 flex items-center justify-between px-12 sticky top-0 bg-brand-secondary/80 backdrop-blur-md z-40">
            <div className="flex items-center gap-6">
              <div className="camera-hud-text text-[9px] opacity-30 uppercase tracking-[0.4em]">Current Location</div>
              <div className="w-[1px] h-4 bg-white/10" />
              <div className="detail-text text-xs tracking-widest uppercase">System Status: <span className="text-accent">Calibrated</span></div>
            </div>
            <div className="flex items-center gap-8">
              <div className="camera-hud-text text-[9px] opacity-30 uppercase tracking-[0.4em]">UTC-05:00</div>
              <div className="camera-hud-text text-[9px] text-accent animate-pulse tracking-[0.2em]">[ LIVE DATA ]</div>
            </div>
          </header>
          <div className="p-12">
            {children}
          </div>
          <div className="fixed bottom-8 right-8 pointer-events-none select-none opacity-20">
            <div className="camera-hud-text text-[10px] text-right mb-1">LAT: 25.8102° N</div>
            <div className="camera-hud-text text-[10px] text-right">LNG: 80.1751° W</div>
          </div>
        </main>
      </div>

      {/* Mobile App Layout */}
      <div className="lg:hidden">
        <AppShell>{children}</AppShell>
      </div>
    </>
  )
}
