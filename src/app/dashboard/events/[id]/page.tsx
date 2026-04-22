"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Sparkles, Camera, Check, Plus, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import { FloatingCart } from '@/components/dashboard/FloatingCart'

// MOCK DATA for photos
const MOCK_PHOTOS = Array.from({ length: 24 }).map((_, i) => ({
  id: `p-${i}`,
  name: `IDOL_SHOT_${i + 100}`,
  image: `https://images.unsplash.com/photo-${1500000000000 + i * 12345}?auto=format&fit=crop&q=80&w=800`,
  price: 10,
  photographer: ['Juanito', 'Pedrito', 'Sofi'][i % 3],
  width: [1, 2][i % 2], // For masonry feel
  height: [1, 1.5, 2][i % 3]
}))

export default function EventDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params)
  const [event, setEvent] = useState<any>(null)
  const [photos, setPhotos] = useState<any[]>([])
  const [selectedItems, setSelectedItems] = useState<any[]>([])
  const [isCartOpen, setIsCartOpen] = useState(true)
  const [loading, setLoading] = useState(true)

  React.useEffect(() => {
    fetch(`/api/events/${id}`)
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          setEvent(data.event)
          setPhotos(data.photos)
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [id])

  const togglePhoto = (photo: any) => {
    if (selectedItems.find(item => item.id === photo.id)) {
      setSelectedItems(selectedItems.filter(item => item.id !== photo.id))
    } else {
      setSelectedItems([...selectedItems, photo])
      setIsCartOpen(true)
    }
  }

  const handleCheckout = async () => {
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: selectedItems,
          userId: 'IDOL_USER_01', // Should come from session
          email: 'customer@example.com' 
        })
      })
      
      const data = await response.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        alert('Error creating checkout session')
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Failed to initiate checkout')
    }
  }

  if (loading) return <div className="h-screen flex items-center justify-center camera-hud-text">INITIALIZING_PROTOCOL...</div>

  return (
    <div className="relative pb-32">
      {/* Back & Breadcrumb */}
      <div className="mb-8 flex items-center gap-6">
        <Link 
          href="/dashboard/events"
          className="p-3 rounded-xl bg-white/5 border border-white/5 hover:border-accent/40 transition-all text-white/40 hover:text-white"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <div className="flex items-center gap-2 mb-1">
             <span className="camera-hud-text text-[8px] opacity-30 uppercase tracking-widest">Events</span>
             <span className="camera-hud-text text-[8px] opacity-30">/</span>
             <span className="camera-hud-text text-[8px] text-accent uppercase tracking-widest">{event?.name || 'Loading...'}</span>
          </div>
          <h2 className="brand-text text-2xl uppercase tracking-widest">Gallery Archive</h2>
        </div>
      </div>

      {/* Gallery Header */}
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
         <div className="space-y-4">
            <h1 className="text-6xl brand-text">{event?.name || 'Event'}<br/><span className="text-accent">Edition</span></h1>
            <div className="flex items-center gap-6">
               <div className="flex items-center gap-2">
                  <Camera className="w-4 h-4 text-accent opacity-60" />
                  <span className="camera-hud-text text-[9px] opacity-60 tracking-widest">{event?.photographers || 0} PHOTOGRAPHERS ACTIVE</span>
               </div>
               <div className="w-[1px] h-4 bg-white/10" />
               <div className="camera-hud-text text-[9px] opacity-60 tracking-widest">{event?.totalPhotos || 0} TOTAL ASSETS</div>
            </div>
         </div>

         {/* Selection Stats */}
         {selectedItems.length > 0 && (
           <motion.div 
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             className="p-4 rounded-2xl bg-accent/10 border border-accent/20 flex items-center gap-6"
           >
              <div>
                 <p className="camera-hud-text text-[8px] opacity-40 uppercase tracking-widest">Current Selection</p>
                 <p className="detail-text text-lg text-white font-bold">{selectedItems.length} ITEMS</p>
              </div>
              <div className="w-[1px] h-8 bg-accent/20" />
              <div className="text-right">
                 <p className="camera-hud-text text-[8px] opacity-40 uppercase tracking-widest">Total Price</p>
                 <p className="detail-text text-lg text-accent font-bold">${selectedItems.reduce((acc, item) => acc + item.price, 0)}</p>
              </div>
           </motion.div>
         )}
      </div>

      {/* Masonry Gallery */}
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
        {photos.map((photo, idx) => {
          const isSelected = selectedItems.find(item => item.id === photo.id)
          return (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: (idx % 10) * 0.05 }}
              className="relative group cursor-pointer break-inside-avoid"
              onClick={() => togglePhoto(photo)}
            >
              <div className={`
                rounded-2xl overflow-hidden border-2 transition-all duration-500
                ${isSelected ? 'border-accent shadow-[0_0_30px_rgba(255,59,48,0.2)]' : 'border-white/5 hover:border-white/20'}
              `}>
                <img 
                  src={photo.image} 
                  alt={photo.name} 
                  className={`
                    w-full h-full object-cover transition-all duration-700
                    ${isSelected ? 'grayscale-0 scale-105' : 'grayscale group-hover:grayscale-0 group-hover:scale-110'}
                  `}
                />
                
                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Photo Data HUD */}
                <div className="absolute bottom-4 left-4 right-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex justify-between items-end">
                   <div className="space-y-1">
                      <p className="camera-hud-text text-[8px] text-white opacity-60 uppercase">{photo.name}</p>
                      <p className="camera-hud-text text-[7px] text-accent uppercase tracking-widest">By {photo.photographer}</p>
                   </div>
                   <div className="text-right">
                      <p className="detail-text text-lg font-bold text-white">$10</p>
                   </div>
                </div>

                {/* Selection Indicator */}
                <div className={`
                  absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300
                  ${isSelected ? 'bg-accent text-white scale-110' : 'bg-black/40 text-white/40 scale-0 group-hover:scale-100'}
                `}>
                  {isSelected ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Floating Cart Integration */}
      <FloatingCart 
        items={selectedItems}
        onRemove={(id) => setSelectedItems(selectedItems.filter(i => i.id !== id))}
        onCheckout={handleCheckout}
        isOpen={isCartOpen}
      />

      {/* Mobile Toggle for Cart */}
      {selectedItems.length > 0 && (
        <button 
          onClick={() => setIsCartOpen(!isCartOpen)}
          className="fixed bottom-8 right-8 w-16 h-16 bg-accent text-white rounded-full shadow-2xl z-[60] flex items-center justify-center hover:scale-110 active:scale-95 transition-all lg:hidden"
        >
          <ShoppingBag className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 bg-white text-accent text-[10px] font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-accent">
            {selectedItems.length}
          </span>
        </button>
      )}
    </div>
  )
}
