"use client"

import React, { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { calya, glamour, modal } from '@/app/fonts'
import { Instagram, Mail, Globe, ShieldCheck, Zap, ArrowRight, ChevronDown, X, BarChart3, Users, Target, MessageSquare } from 'lucide-react'

const VALERIA_DATA = {
  name: "Valeria Cannavo",
  title: "Miss Venezuela World 2024",
  subtitle: "Creative Director // Model // Designer",
  stats: {
    height: "178cm",
    bust: "85cm",
    waist: "61cm",
    hips: "90cm",
    eyes: "Hazelnut",
    hair: "Brunette"
  },
  metrics: [
    { label: "Monthly Reach", value: "1.2M", icon: Target, detail: "Global Engagement" },
    { label: "Engagement Rate", value: "5.8%", icon: MessageSquare, detail: "Active Audience" },
    { label: "Core Demographic", value: "18-34", icon: Users, detail: "Premium Segment" },
    { label: "Conversion Index", value: "+24%", icon: BarChart3, detail: "ROI Performance" }
  ],
  social: {
    instagram: "valeriacannavo",
    website: "valeriacannavo.com",
    email: "management@valeriacannavo.com"
  },
  photos: {
    hero: "/assets/models/valeria-cannavo/hero.jpg",
    gallery: [
      "/assets/models/valeria-cannavo/gallery-1.jpg",
      "/assets/models/valeria-cannavo/gallery-2.jpg",
      "/assets/models/valeria-cannavo/gallery-3.jpg",
      "/assets/models/valeria-cannavo/gallery-4.jpg",
      "/assets/models/valeria-cannavo/gallery-5.jpg",
      "/assets/models/valeria-cannavo/gallery-6.jpg",
      "/assets/models/valeria-cannavo/gallery-7.jpg",
      "/assets/models/valeria-cannavo/gallery-8.jpg",
    ]
  },
  story: "La trayectoria de Valeria Cannavo se define por una armonía poco común entre la fascinación temprana por las pasarelas y el rigor académico del diseño de modas. A sus 25 años, ha logrado trascender la imagen tradicional de una reina de belleza para posicionarse como una figura con una visión técnica y conceptual de la industria.",
}

// Lightbox Component
const Lightbox = ({ src, onClose }: { src: string, onClose: () => void }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
    onClick={onClose}
  >
    <button className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors">
       <X className="w-8 h-8" />
    </button>
    <motion.img 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      src={src} 
      className="max-w-full max-h-full object-contain shadow-2xl"
      alt="Gallery Preview"
    />
  </motion.div>
)

// Reusable Gallery Image with Scroll Reveal
const GalleryImage = ({ src, className, idx, onClick }: { src: string, className: string, idx: number, onClick: () => void }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const grayscale = useTransform(scrollYProgress, [0, 0.45, 0.55, 1], ["grayscale(100%)", "grayscale(0%)", "grayscale(0%)", "grayscale(100%)"])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.5, 1, 1, 0.5])

  return (
    <motion.div 
      ref={ref}
      style={{ filter: grayscale, scale, opacity }}
      className={`relative overflow-hidden rounded-sm bg-zinc-100 cursor-zoom-in group ${className}`}
      onClick={onClick}
    >
      <img 
        src={src} 
        alt={`Gallery asset ${idx}`} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      {/* Small Corner CTA */}
      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
         <div className="flex items-center gap-2 px-3 py-1.5 bg-white/90 backdrop-blur-md border border-black/5 rounded-full">
            <span className="font-modal text-[8px] tracking-[0.2em] uppercase text-black">Expand Asset</span>
            <Zap className="w-2.5 h-2.5 text-black" />
         </div>
      </div>
    </motion.div>
  )
}

// Infinite Scroll Strip
const InfiniteCarousel = ({ images, onImageClick }: { images: string[], onImageClick: (src: string) => void }) => {
  return (
    <div className="w-full overflow-hidden bg-black py-20 relative">
      <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-black to-transparent z-10" />
      <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-black to-transparent z-10" />
      
      <motion.div 
        animate={{ x: [0, -1920] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="flex gap-4 whitespace-nowrap"
      >
        {[...images, ...images, ...images].map((src, idx) => (
          <div 
            key={idx} 
            className="w-[300px] md:w-[450px] aspect-[3/4] flex-shrink-0 bg-zinc-900 overflow-hidden cursor-zoom-in group relative"
            onClick={() => onImageClick(src)}
          >
             <img 
               src={src} 
               className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 group-hover:scale-105" 
               alt="Carousel Asset"
             />
             <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all">
                <div className="p-2 bg-white rounded-full">
                  <Zap className="w-3 h-3 text-black" />
                </div>
             </div>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default function ValeriaPortfolio() {
  const { scrollY } = useScroll()
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  
  const grayscaleHero = useTransform(scrollY, [0, 600], ["grayscale(100%)", "grayscale(0%)"])
  const scaleHero = useTransform(scrollY, [0, 800], [1, 1.05])
  const opacityHero = useTransform(scrollY, [0, 400], [1, 0.7])

  return (
    <main className={`min-h-screen bg-white text-black selection:bg-black selection:text-white ${glamour.variable} ${calya.variable} ${modal.variable} font-glamour overflow-x-hidden`}>
      
      <AnimatePresence>
        {selectedImage && <Lightbox src={selectedImage} onClose={() => setSelectedImage(null)} />}
      </AnimatePresence>

      {/* 1. EDITORIAL HERO */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-white">
        <motion.div 
          style={{ filter: grayscaleHero, scale: scaleHero, opacity: opacityHero }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <img 
            src={VALERIA_DATA.photos.hero} 
            alt={VALERIA_DATA.name} 
            className="w-full h-full object-cover contrast-[1.05]"
          />
        </motion.div>

        {/* Corner Details */}
        <div className="absolute inset-0 p-8 md:p-12 pointer-events-none flex flex-col justify-between mix-blend-difference text-white">
           <div className="flex justify-between items-start">
              <div className="flex flex-col gap-1">
                 <span className="font-modal text-[8px] md:text-[10px] tracking-[0.4em] uppercase opacity-60">Status</span>
                 <span className="font-modal text-[10px] md:text-xs tracking-[0.2em] uppercase">Verified_Elite_Identity</span>
              </div>
              <div className="flex flex-col items-end gap-1 text-right">
                 <span className="font-modal text-[8px] md:text-[10px] tracking-[0.4em] uppercase opacity-60">Nodes</span>
                 <span className="font-modal text-[10px] md:text-xs tracking-[0.2em] uppercase">Milan // Miami // Caracas</span>
              </div>
           </div>
           <div className="flex justify-between items-end">
              <div className="flex flex-col gap-1">
                 <span className="font-modal text-[8px] md:text-[10px] tracking-[0.4em] uppercase opacity-60">Ref_Protocol</span>
                 <span className="font-modal text-[10px] md:text-xs tracking-[0.2em] uppercase">VAL_CAN_2024</span>
              </div>
              <div className="flex flex-col items-end gap-1 text-right">
                 <span className="font-modal text-[8px] md:text-[10px] tracking-[0.4em] uppercase opacity-60">Encryption</span>
                 <span className="font-modal text-[10px] md:text-xs tracking-[0.2em] uppercase">AES_256_ACTIVE</span>
              </div>
           </div>
        </div>

        {/* Center Title Group */}
        <div className="relative z-10 text-center space-y-2 md:space-y-0">
           <motion.p 
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.8 }}
             className="font-modal text-[10px] md:text-sm tracking-[0.6em] uppercase text-black mb-[-5px] md:mb-[-15px] mix-blend-difference text-white/80"
           >
             {VALERIA_DATA.title}
           </motion.p>
           
           <motion.h1 
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: 0.5, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
             className="font-calya text-[80px] md:text-[180px] lg:text-[240px] leading-none text-white mix-blend-difference"
           >
             Valeria Cannavo
           </motion.h1>

           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 1.2 }}
             className="flex items-center justify-center gap-6 mix-blend-difference text-white/40"
           >
              <div className="h-[1px] w-8 md:w-12 bg-white/40" />
              <p className="font-modal text-[8px] md:text-xs tracking-[0.4em] uppercase">
                {VALERIA_DATA.subtitle}
              </p>
              <div className="h-[1px] w-8 md:w-12 bg-white/40" />
           </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-12 flex flex-col items-center gap-4 opacity-30 mix-blend-difference text-white"
        >
           <ChevronDown className="w-5 h-5" />
        </motion.div>
      </section>

      {/* 2. REACH & PERFORMANCE (MINIMALIST METRICS) */}
      <section className="py-32 bg-white px-4 md:px-12 border-b border-zinc-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 items-center">
           <div className="lg:col-span-4 space-y-8">
              <div className="space-y-4">
                 <h2 className="font-modal text-sm tracking-[0.4em] uppercase opacity-40">Outreach Intelligence</h2>
                 <h3 className="font-calya text-5xl md:text-7xl leading-none">Global <br/> Impact</h3>
              </div>
              <p className="font-glamour text-sm leading-relaxed opacity-60 uppercase">
                Engineering high-conversion brand partnerships through surgical audience targeting and elite digital identity.
              </p>
              <div className="pt-4">
                 <button className="group relative px-10 py-5 bg-black text-white overflow-hidden rounded-full transition-all hover:scale-105 active:scale-95">
                    <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    <span className="relative z-10 font-modal text-[10px] tracking-[0.3em] uppercase">Initialize Connection // Contact</span>
                 </button>
              </div>
           </div>

           <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-100 border border-zinc-100 overflow-hidden rounded-2xl">
              {VALERIA_DATA.metrics.map((metric, idx) => (
                <div key={idx} className="bg-white p-12 space-y-8 group hover:bg-zinc-50 transition-colors">
                   <div className="flex justify-between items-start">
                      <div className="p-3 rounded-xl bg-zinc-50 text-zinc-400 group-hover:text-black transition-colors">
                         <metric.icon className="w-5 h-5" />
                      </div>
                      <span className="font-modal text-[8px] tracking-[0.4em] uppercase opacity-20 group-hover:opacity-100 transition-opacity">0{idx + 1} // DATA</span>
                   </div>
                   <div className="space-y-2">
                      <p className="font-modal text-[10px] opacity-30 uppercase tracking-[0.2em]">{metric.label}</p>
                      <p className="font-calya text-6xl md:text-8xl tracking-tighter">{metric.value}</p>
                      <p className="font-modal text-[9px] opacity-40 uppercase tracking-[0.3em]">{metric.detail}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>
        
        {/* Social Logos Strip */}
        <div className="max-w-7xl mx-auto mt-32 flex flex-wrap justify-center md:justify-start gap-12 md:gap-24 items-center opacity-10 grayscale hover:opacity-100 transition-all duration-1000">
           <Instagram className="w-8 h-8" />
           <div className="font-modal text-[10px] tracking-[0.5em] uppercase font-bold">TikTok</div>
           <div className="font-modal text-[10px] tracking-[0.5em] uppercase font-bold">YouTube</div>
           <div className="font-modal text-[10px] tracking-[0.5em] uppercase font-bold">Pinterest</div>
           <div className="font-modal text-[10px] tracking-[0.5em] uppercase font-bold">Behance</div>
        </div>
      </section>

      {/* 3. THE COMP CARD */}
      <section className="py-32 px-4 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            
            <div className="space-y-16">
               <div className="space-y-6">
                  <h2 className="font-modal text-sm tracking-[0.4em] uppercase opacity-40">Biometric Identity Card</h2>
                  <div className="h-[1px] w-full bg-black/10" />
               </div>

               <div className="grid grid-cols-2 md:grid-cols-3 gap-y-16 gap-x-12">
                  {Object.entries(VALERIA_DATA.stats).map(([label, value], idx) => (
                    <motion.div 
                      key={label}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="space-y-2 border-l border-black/5 pl-6"
                    >
                      <p className="font-modal text-[10px] opacity-30 uppercase tracking-[0.2em]">{label}</p>
                      <p className="text-2xl md:text-4xl uppercase tracking-tighter font-light">{value}</p>
                    </motion.div>
                  ))}
               </div>

               <div className="pt-12">
                  <button className="px-12 py-5 bg-black text-white font-modal text-xs tracking-[0.3em] uppercase hover:bg-zinc-800 transition-all flex items-center gap-4">
                     Book Representation <ArrowRight className="w-4 h-4" />
                  </button>
               </div>
            </div>

            <GalleryImage 
              src={VALERIA_DATA.photos.gallery[1]} 
              className="aspect-[4/5] shadow-2xl" 
              idx={1} 
              onClick={() => setSelectedImage(VALERIA_DATA.photos.gallery[1])}
            />
          </div>
        </div>
      </section>

      {/* 4. INFINITE SCROLL GALLERY STRIP */}
      <section className="py-32 bg-black">
         <div className="max-w-7xl mx-auto px-4 md:px-12 mb-16">
            <h2 className="font-calya text-5xl md:text-8xl text-white">Infinite Motion</h2>
            <p className="font-modal text-[10px] md:text-xs tracking-[0.6em] uppercase text-white/40">Continuous Digital Asset Stream</p>
         </div>
         <InfiniteCarousel images={VALERIA_DATA.photos.gallery} onImageClick={(src) => setSelectedImage(src)} />
      </section>

      {/* 5. EDITORIAL GRID GALLERY */}
      <section className="py-32 px-4 md:px-12 bg-[#F9F9F9]">
        <div className="max-w-7xl mx-auto space-y-32">
           
           <div className="text-center space-y-6">
              <h2 className="font-calya text-6xl md:text-9xl">The Collection</h2>
              <p className="font-modal text-[10px] md:text-xs tracking-[0.6em] uppercase opacity-40">Curated Editorial Selection // 2024</p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
              {/* Row 1 */}
              <div className="md:col-span-8">
                <GalleryImage src={VALERIA_DATA.photos.gallery[2]} className="aspect-[16/10]" idx={2} onClick={() => setSelectedImage(VALERIA_DATA.photos.gallery[2])} />
              </div>
              <div className="md:col-span-4 md:translate-y-24">
                <GalleryImage src={VALERIA_DATA.photos.gallery[3]} className="aspect-[3/4]" idx={3} onClick={() => setSelectedImage(VALERIA_DATA.photos.gallery[3])} />
              </div>

              {/* Row 2 */}
              <div className="md:col-span-4 md:translate-y-[-24px]">
                <GalleryImage src={VALERIA_DATA.photos.gallery[4]} className="aspect-[3/4]" idx={4} onClick={() => setSelectedImage(VALERIA_DATA.photos.gallery[4])} />
              </div>
              <div className="md:col-span-8">
                <GalleryImage src={VALERIA_DATA.photos.gallery[5]} className="aspect-[16/10]" idx={5} onClick={() => setSelectedImage(VALERIA_DATA.photos.gallery[5])} />
              </div>

              {/* Row 3 */}
              <div className="md:col-span-12 mt-12">
                <GalleryImage src={VALERIA_DATA.photos.gallery[6]} className="aspect-video" idx={6} onClick={() => setSelectedImage(VALERIA_DATA.photos.gallery[6])} />
              </div>
           </div>
        </div>
      </section>

      {/* 6. FOOTER */}
      <footer className="py-40 bg-white border-t border-zinc-100">
        <div className="max-w-7xl mx-auto px-4 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-24">
           <div className="space-y-12">
              <h2 className="font-calya text-6xl md:text-8xl leading-none">Valeria <br/> Cannavo</h2>
              <div className="flex flex-wrap gap-8 md:gap-12">
                 <a href={`https://instagram.com/${VALERIA_DATA.social.instagram}`} className="font-modal text-[10px] tracking-[0.3em] uppercase hover:text-accent transition-colors">Instagram</a>
                 <a href={`mailto:${VALERIA_DATA.social.email}`} className="font-modal text-[10px] tracking-[0.3em] uppercase hover:text-accent transition-colors">Email</a>
                 <a href="#" className="font-modal text-[10px] tracking-[0.3em] uppercase hover:text-accent transition-colors">Portfolio PDF</a>
              </div>
           </div>
           <div className="flex flex-col justify-end items-end space-y-4">
              <img src="/assets/logo.png" className="h-12 opacity-20 grayscale" alt="Idol Logo" />
              <p className="font-modal text-[8px] tracking-[0.4em] uppercase opacity-20 text-right">
                Infrastructure by Idol Fashion Lab <br/>
                All Rights Reserved 2026
              </p>
           </div>
        </div>
      </footer>

      <style jsx global>{`
        .font-calya { font-family: var(--font-calya); }
        .font-glamour { font-family: var(--font-glamour); }
        .font-modal { font-family: var(--font-modal); }
      `}</style>
    </main>
  )
}
