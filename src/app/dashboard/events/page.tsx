"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Filter, Search } from 'lucide-react'
import { EventCard } from '@/components/dashboard/EventCard'

const MOCK_EVENTS = [
  {
    id: '1',
    name: 'Doral Fashion Week Ed. 17',
    date: 'OCT 12, 2025',
    image: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?auto=format&fit=crop&q=80&w=1000',
    photoCount: 1240,
    photographerCount: 4
  },
  {
    id: '2',
    name: 'NYFW Elite Showcase',
    date: 'SEP 08, 2025',
    image: 'https://images.unsplash.com/photo-1539109132382-381bb3f1c2b3?auto=format&fit=crop&q=80&w=1000',
    photoCount: 850,
    photographerCount: 3
  },
  {
    id: '3',
    name: 'Miami Swim Week 2025',
    date: 'JUL 15, 2025',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=1000',
    photoCount: 2100,
    photographerCount: 6
  },
  {
    id: '4',
    name: 'Denver Fashion Gala',
    date: 'JUN 22, 2025',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=1000',
    photoCount: 420,
    photographerCount: 2
  }
]

export default function EventsPage() {
  const [events, setEvents] = React.useState<any[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    fetch('/api/events')
      .then(res => res.json())
      .then(data => {
        if (!data.error) setEvents(data)
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
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="camera-hud-text text-[10px] tracking-[0.3em] uppercase">REPOSITORY // ARCHIVE_01</span>
          </div>
          <h1 className="text-6xl brand-text">Fashion <span className="text-accent">Events</span></h1>
          <p className="detail-text opacity-40 text-sm uppercase tracking-widest max-w-lg">
            Access the visual history of the world's most elite fashion shows. Browse by season, location, or photographer.
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-hover:text-accent transition-colors" />
            <input 
              type="text" 
              placeholder="SEARCH EVENTS..." 
              className="bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-6 camera-hud-text text-[9px] tracking-widest focus:border-accent/40 focus:outline-none transition-all w-64"
            />
          </div>
          <button className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-accent/40 transition-all text-white/40 hover:text-white">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Events Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-96 rounded-2xl bg-white/5 animate-pulse" />
          ))
        ) : (
          events.map((event, idx) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <EventCard {...event} />
            </motion.div>
          ))
        )}
      </section>

      {/* Pagination / HUD Decor */}
      <div className="pt-12 border-t border-white/5 flex justify-between items-center opacity-30">
        <div className="camera-hud-text text-[8px] uppercase tracking-[0.4em]">Page 01 of 04</div>
        <div className="flex gap-4">
          <button className="camera-hud-text text-[8px] uppercase tracking-[0.4em] hover:text-accent transition-colors">[ PREV ]</button>
          <button className="camera-hud-text text-[8px] uppercase tracking-[0.4em] hover:text-accent transition-colors">[ NEXT ]</button>
        </div>
      </div>
    </div>
  )
}
