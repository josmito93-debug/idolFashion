"use client"

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, X, CreditCard, Trash2, Camera } from 'lucide-react'

interface CartItem {
  id: string
  name: string
  image: string
  price: number
  photographer: string
}

interface FloatingCartProps {
  items: CartItem[]
  onRemove: (id: string) => void
  onCheckout: () => void
  isOpen: boolean
}

export const FloatingCart = ({ items, onRemove, onCheckout, isOpen }: FloatingCartProps) => {
  const total = items.reduce((acc, item) => acc + item.price, 0)

  return (
    <AnimatePresence>
      {isOpen && items.length > 0 && (
        <motion.div
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          className="fixed right-8 top-24 bottom-8 w-80 bg-brand-secondary/95 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 border-b border-white/5 bg-accent/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5 text-accent" />
              <span className="detail-text text-xs tracking-[0.2em] uppercase">Selection Cart</span>
            </div>
            <div className="camera-hud-text text-[9px] opacity-40 uppercase">Assets: {items.length}</div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
            {items.map((item) => (
              <motion.div 
                key={item.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex gap-4 p-3 rounded-xl bg-white/5 border border-white/5 group hover:border-accent/30 transition-all"
              >
                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border border-white/10">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale brightness-75" />
                </div>
                <div className="flex-1 min-w-0">
                   <p className="camera-hud-text text-[9px] text-white truncate uppercase mb-1">{item.name}</p>
                   <div className="flex items-center gap-2 opacity-40 mb-2">
                      <Camera className="w-3 h-3" />
                      <span className="camera-hud-text text-[7px] truncate uppercase">{item.photographer}</span>
                   </div>
                   <p className="detail-text text-[10px] text-accent font-bold">${item.price}</p>
                </div>
                <button 
                  onClick={() => onRemove(item.id)}
                  className="p-2 text-white/20 hover:text-accent transition-colors self-center"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-white/5 space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center text-white/40">
                <span className="camera-hud-text text-[9px] uppercase tracking-widest">Subtotal</span>
                <span className="detail-text text-[11px] uppercase">${total}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="camera-hud-text text-[10px] uppercase tracking-[0.2em]">Total Amount</span>
                <span className="text-2xl brand-text text-white">${total}</span>
              </div>
            </div>

            <button 
              onClick={onCheckout}
              className="w-full group relative overflow-hidden bg-white hover:bg-accent text-black hover:text-white transition-all py-4 rounded-xl flex items-center justify-center gap-3"
            >
              <CreditCard className="w-4 h-4" />
              <span className="camera-hud-text text-[10px] tracking-[0.3em] uppercase font-bold">Initiate Checkout</span>
              <motion.div 
                className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
              />
            </button>
            
            <p className="camera-hud-text text-[7px] opacity-20 text-center uppercase tracking-widest leading-relaxed">
              Secure checkout by Stripe. <br/>
              Instant digital delivery after verification.
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
