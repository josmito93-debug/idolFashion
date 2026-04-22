"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Download, CheckCircle, Clock, Share2, Eye } from 'lucide-react'
import Link from 'next/link'

const MOCK_PURCHASED = [
  {
    id: 'o-1',
    name: 'IDOL_SHOT_104',
    image: 'https://images.unsplash.com/photo-1539109132382-381bb3f1c2b3?auto=format&fit=crop&q=80&w=400',
    event: 'Doral Fashion Week',
    date: 'OCT 21, 2025',
    status: 'Ready',
    size: '12.4 MB'
  },
  {
    id: 'o-2',
    name: 'IDOL_SHOT_105',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=400',
    event: 'Doral Fashion Week',
    date: 'OCT 21, 2025',
    status: 'Ready',
    size: '14.1 MB'
  }
]

export default function PurchasedPage() {
  const [assets, setAssets] = React.useState<any[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    fetch('/api/purchased')
      .then(res => res.json())
      .then(data => {
        if (!data.error) setAssets(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div className="space-y-12">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-accent" />
            <span className="camera-hud-text text-[10px] tracking-[0.3em] uppercase">COLLECTION // OWNED_ASSETS</span>
          </div>
          <h1 className="text-6xl brand-text">My <span className="text-accent">Collection</span></h1>
          <p className="detail-text opacity-40 text-sm uppercase tracking-widest max-w-lg">
            Your high-resolution assets are ready for download. Use them for your portfolio, social media, or agency submissions.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-80 rounded-2xl bg-white/5 animate-pulse" />
          ))
        ) : (
          assets.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card rounded-2xl overflow-hidden border-white/5 hover:border-accent/30 transition-all group"
            >
              <div className="relative h-48 overflow-hidden">
                 <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale brightness-75 group-hover:scale-110 group-hover:grayscale-0 transition-all duration-700" />
                 <div className="absolute top-4 right-4 p-2 bg-black/40 backdrop-blur-md rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Share2 className="w-4 h-4 text-white" />
                 </div>
              </div>

              <div className="p-6 space-y-4">
                 <div>
                    <h3 className="camera-hud-text text-[11px] text-white uppercase tracking-widest mb-1">{item.name}</h3>
                    <p className="camera-hud-text text-[8px] opacity-40 uppercase">{item.purchaseDate}</p>
                 </div>

                 <div className="flex justify-between items-center pt-4 border-t border-white/5">
                    <div className="space-y-1">
                       <p className="camera-hud-text text-[7px] opacity-30 uppercase tracking-widest">Format</p>
                       <p className="camera-hud-text text-[8px] uppercase">RAW / JPG</p>
                    </div>
                    <div className="space-y-1 text-right">
                       <p className="camera-hud-text text-[7px] opacity-30 uppercase tracking-widest">Status</p>
                       <p className="camera-hud-text text-[8px] uppercase text-accent">{item.status}</p>
                    </div>
                 </div>

                 <a 
                   href={item.downloadUrl}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="w-full py-3 bg-accent/10 border border-accent/20 hover:bg-accent text-accent hover:text-white rounded-xl transition-all flex items-center justify-center gap-3 group/btn"
                 >
                    <Download className="w-4 h-4 group-hover/btn:-translate-y-1 transition-transform" />
                    <span className="camera-hud-text text-[9px] tracking-[0.2em] uppercase font-bold">Download Asset</span>
                 </a>
              </div>
            </motion.div>
          ))
        )}
        
        {/* Empty State */}
        {!loading && assets.length === 0 && (
           <div className="col-span-full h-64 border-2 border-dashed border-white/5 rounded-3xl flex flex-col items-center justify-center space-y-4 opacity-40">
              <Clock className="w-8 h-8" />
              <p className="camera-hud-text text-[10px] tracking-widest uppercase">No assets acquired yet.</p>
              <Link href="/dashboard/events" className="text-accent underline camera-hud-text text-[9px] tracking-widest uppercase">Explore Events</Link>
           </div>
        )}
      </section>

      {/* Bulk Action Placeholder */}
      <div className="fixed bottom-12 left-1/2 -translate-x-1/2 p-4 px-8 bg-brand-secondary/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex items-center gap-8 z-40 opacity-0 hover:opacity-100 transition-opacity">
         <div className="flex items-center gap-4">
            <CheckCircle className="w-4 h-4 text-accent" />
            <span className="camera-hud-text text-[9px] tracking-widest uppercase">{MOCK_PURCHASED.length} Assets Selected</span>
         </div>
         <div className="w-[1px] h-4 bg-white/10" />
         <button className="camera-hud-text text-[9px] tracking-widest uppercase text-accent hover:underline flex items-center gap-2">
            <Download className="w-3 h-3" />
            Download all (.zip)
         </button>
      </div>
    </div>
  )
}
