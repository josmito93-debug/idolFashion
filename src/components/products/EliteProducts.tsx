"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Play, Check, ArrowRight, ShieldCheck, Zap, Sparkles, Music } from 'lucide-react'
import { StripeButton } from '../checkout/StripeButton'
import Link from 'next/link'

const MODEL_VIDEOS = [
  '/assets/DFW%209TH%20PROMO%201304%20b.mp4',
  '/assets/DFW%209TH%20PROMO%201304%20c.mp4',
  '/assets/lv_0_20251013183505.mp4'
]

export const EliteProducts = () => {
  return (
    <section className="bg-brand-secondary py-24 relative overflow-hidden" id="elite-products">
      {/* Background Decorative Blur */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
      
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Section Header */}
        <div className="mb-20 text-left">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 mb-6"
            >
                <Sparkles className="w-3 h-3 text-accent" />
                <span className="camera-hud-text text-[10px] tracking-[0.2em] uppercase">Elite Service Tier</span>
            </motion.div>
            <h2 className="text-6xl md:text-8xl brand-text mb-4">Elite Model <br/><span className="text-accent">Development</span></h2>
            <p className="max-w-3xl detail-text opacity-40 text-[10px] md:text-base leading-relaxed uppercase tracking-widest">
                Our ultra-premium development kits are engineered to scale your professional identity with precision assets and a global industry placement strategy.
            </p>
            <div className="glow-line mt-12" />
        </div>

        {/* 1. MODEL PROFESSIONAL KIT - VERTICAL VIDEO LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-32 items-start">
            
            {/* Left: Content Card */}
            <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-5 space-y-8 flex flex-col items-start text-left"
            >
                <div>
                    <h3 className="text-4xl md:text-5xl brand-text mb-2 text-left">Model Digital Kit</h3>
                    <div className="flex items-center gap-4 py-2">
                        <span className="text-3xl brand-text text-accent">$450</span>
                        <div className="h-[20px] w-[1px] bg-white/20" />
                        <span className="camera-hud-text text-[8px] opacity-40 uppercase tracking-widest">Two Installment Plan Available</span>
                    </div>
                </div>

                <div className="space-y-4 text-left items-start flex flex-col">
                    <p className="detail-text text-[9px] md:text-sm opacity-60 leading-relaxed uppercase tracking-widest text-left">
                        We provide the strategic infrastructure required to secure high-tier bookings and establish a permanent, verified presence in the global fashion ecosystem.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            "Elite Digitals (Head/Body)",
                            "Designer High-End Garments",
                            "Comp Card Professional Update",
                            "Advanced Posing Guidance",
                            "Elite Make-up Service",
                            "48h Fast Turnaround",
                            "Personal Portfolio Website",
                            "Media-Press Professional EPK"
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 group justify-start">
                                <div className="w-1.5 h-1.5 rounded-full bg-accent group-hover:scale-150 transition-transform" />
                                <span className="camera-hud-text text-[8px] md:text-[10px] opacity-70 group-hover:opacity-100 transition-opacity uppercase tracking-wider">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="pt-6 border-t border-white/5 flex flex-col gap-6 w-full items-start">
                    <div className="flex items-center gap-4 p-4 rounded-lg bg-accent/5 border border-accent/10 w-full justify-start">
                        <div className="p-2 rounded-full bg-accent/20">
                            <Music className="w-5 h-5 text-accent" />
                        </div>
                        <div className="text-left">
                            <p className="camera-hud-text text-[8px] text-accent tracking-widest uppercase">Bonus Inclusion</p>
                            <p className="detail-text text-[9px] opacity-80 uppercase tracking-[0.1em]">Complete "Become a Professional DJ" track included</p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 w-full">
                        <StripeButton productId="model-kit" amount={450} productName="Model Professional Kit" />
                        <Link href="/register" className="w-full py-5 border border-white/20 camera-hud-text text-[8px] tracking-[0.3em] uppercase hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2 group">
                            Initialize Application
                            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
                <div className="glow-line mt-12 lg:hidden" />
            </motion.div>

            {/* Right: 3 Vertical Videos Banner */}
            <div className="lg:col-span-7 relative h-[600px] grid grid-cols-3 gap-2 overflow-hidden rounded-2xl border border-white/5 shadow-2xl">
                {MODEL_VIDEOS.map((video, idx) => (
                    <motion.div 
                        key={idx}
                        initial={{ opacity: 0, scale: 1.1 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: idx * 0.2 }}
                        viewport={{ once: true }}
                        className="relative h-full overflow-hidden"
                    >
                        <video 
                            autoPlay 
                            muted 
                            loop 
                            playsInline 
                            className="absolute inset-0 w-full h-full object-cover grayscale brightness-75 hover:grayscale-0 transition-all duration-700 hover:scale-110"
                        >
                            <source src={video} type="video/mp4" />
                        </video>
                        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-brand-secondary to-transparent" />
                    </motion.div>
                ))}
                
                {/* HUD Overlay for the videos */}
                <div className="absolute inset-0 pointer-events-none border-[1px] border-white/5 m-4 flex flex-col justify-between p-4">
                    <div className="flex justify-between items-start opacity-30">
                        <div className="camera-hud-text text-[8px]">[ REC ]</div>
                        <div className="camera-hud-text text-[8px]">ISO 1600</div>
                    </div>
                    <div className="flex justify-between items-end opacity-30">
                        <div className="camera-hud-text text-[8px]">MODEL_KIT_0{MODEL_VIDEOS.length}</div>
                        <div className="camera-hud-text text-[8px]">60 FPS</div>
                    </div>
                </div>
            </div>

        </div>

        <div className="glow-line my-32 opacity-50" />

        {/* 2. DESIGNER LAUNCH & SCALE KIT */}
        <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative p-1 px-1 bg-gradient-to-br from-accent/20 via-white/5 to-transparent rounded-3xl"
        >
            <div className="bg-brand-secondary rounded-[1.4rem] overflow-hidden grid grid-cols-1 lg:grid-cols-2">
                
                <div className="relative h-[400px] lg:h-auto overflow-hidden group">
                    <video 
                        autoPlay 
                        muted 
                        loop 
                        playsInline 
                        className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-1000"
                    >
                        <source src="/assets/VID-20260413-WA0012.mp4" type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-brand-secondary/40" />
                    <div className="absolute bottom-12 left-12 text-left items-start flex flex-col">
                        <p className="big-text text-8xl md:text-9xl opacity-10 absolute -top-16 -left-8 pointer-events-none">DESIGN</p>
                        <h4 className="brand-text text-5xl mb-4 text-left">Couture Scale</h4>
                        <div className="flex items-center gap-3 justify-start">
                             <div className="h-[1px] w-8 bg-accent" />
                             <span className="camera-hud-text text-[9px] tracking-[0.3em] uppercase">International Placement</span>
                        </div>
                    </div>
                </div>

                <div className="p-8 md:p-16 flex flex-col justify-center items-start text-left">
                    <div className="mb-8 items-start flex flex-col">
                        <div className="flex items-baseline gap-4 mb-4">
                            <span className="text-4xl brand-text text-white text-left">Full Production Ecosystem</span>
                        </div>
                        <p className="detail-text text-[9px] md:text-sm opacity-40 uppercase tracking-widest leading-relaxed text-left">
                            We provide the manufacturing infrastructure and media placement required to launch and scale a globally recognized fashion house.
                        </p>
                    </div>

                    <div className="space-y-6 mb-12 w-full">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                            {[
                                "Garment Manufacturing (Maquilado)",
                                "Fabric & Pattern Development",
                                "VOGUE & Harper's BAZAAR Placement",
                                "NYFW & Denver Fashion Week Access",
                                "E-commerce Infrastructure Setup",
                                "Targeted High-Fashion Advertising",
                                "Strategic Social Media Management",
                                "Content Production Strategy"
                            ].map((feature, i) => (
                                <div key={i} className="flex items-start gap-4 justify-start">
                                    <div className="mt-1.5 p-0.5 rounded-full bg-accent/20 border border-accent/40">
                                        <Check className="w-2.5 h-2.5 text-accent" />
                                    </div>
                                    <span className="camera-hud-text text-[9px] md:text-[10px] opacity-70 uppercase tracking-wider text-left">{feature}</span>
                                </div>
                            ))}
                         </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6 items-center w-full">
                        <div className="flex-1 w-full">
                            <StripeButton productId="designer-kit" amount={450} productName="Designer Launch & Scale Kit" />
                        </div>
                        <div className="flex items-center gap-6 opacity-30">
                            <ShieldCheck className="w-5 h-5" />
                            <Zap className="w-5 h-5" />
                            <div className="camera-hud-text text-[8px] uppercase tracking-widest text-left">Certified <br/> Elite Program</div>
                        </div>
                    </div>
                </div>

            </div>
        </motion.div>

        {/* Closing Strategy Link */}
        <div className="mt-24 text-center">
            <p className="camera-hud-text text-[10px] opacity-30 uppercase tracking-[0.4em] mb-8">Precision Success Engineering</p>
            <h5 className="brand-text text-2xl md:text-3xl mb-8">Ready to revolutionize your status?</h5>
            <div className="h-[1px] w-24 bg-accent/30 mx-auto" />
        </div>

      </div>
    </section>
  )
}
