import React, { Suspense } from 'react'
import { ApplicationPortal } from '@/components/forms/ApplicationPortal'
import { Metadata } from 'next'

// Generate metadata dynamically for SEO and premium feel
export async function generateMetadata({ params }: { params: Promise<{ role: string }> }): Promise<Metadata> {
  const { role } = await params
  const capitalizedRole = role.charAt(0).toUpperCase() + role.slice(1)
  return {
    title: `${capitalizedRole} Application | Idol Fashion Elite Lab`,
    description: `Official ${role} application protocol for Idol Fashion. Join the elite development incubator.`,
  }
}

export default async function ApplyPage({ params }: { params: Promise<{ role: string }> }) {
  const { role } = await params
  const roleLower = role.toLowerCase()
  
  return (
    <main className="bg-brand-secondary min-h-screen relative overflow-hidden">
      {/* Role-Specific Background Glow */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
         <div className={`absolute top-0 right-0 w-[800px] h-[800px] rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2 ${
           roleLower === 'model' ? 'bg-accent/20' : 
           roleLower === 'designer' ? 'bg-blue-500/10' : 
           roleLower === 'media' ? 'bg-purple-500/10' : 'bg-white/10'
         }`} />
      </div>

      <Suspense fallback={
        <div className="h-screen w-full flex items-center justify-center bg-brand-secondary">
          <div className="camera-hud-text animate-pulse">INITIALIZING_{roleLower.toUpperCase()}_PROTOCOL...</div>
        </div>
      }>
        <ApplicationPortal defaultRole={roleLower} />
      </Suspense>
    </main>
  )
}
