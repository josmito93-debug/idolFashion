"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Camera, User, PenTool, Scissors, CameraIcon, Briefcase, Paintbrush, Newspaper } from 'lucide-react'
import { SignatureSection } from './SignatureSection'

const ROLES = [
  { id: 'model', label: 'Model', icon: User, description: 'High-fashion model applicant' },
  { id: 'designer', label: 'Designer', icon: PenTool, description: 'Creative director & fashion architect' },
  { id: 'photographer', label: 'Photographer', icon: Camera, description: 'Visual storyteller & lighting expert' },
  { id: 'makeup', label: 'Make-Up', icon: Paintbrush, description: 'Elite beauty & transformation specialist' },
  { id: 'media', label: 'Media-Press', icon: Newspaper, description: 'Industry coverage & high-fashion news' },
  { id: 'staff', label: 'Staff/Backstage', icon: Scissors, description: 'Backstage elite support' },
  { id: 'sponsor', label: 'Sponsor', icon: Briefcase, description: 'Strategic industry partner' },
]

export const ApplicationPortal = () => {
  const [role, setRole] = useState<string | null>(null)
  const [step, setStep] = useState(0) // 0: Select Role, 1: Details, 2: Signature, 3: Success

  const handleNext = () => setStep(prev => prev + 1)
  const handleBack = () => setStep(prev => Math.max(0, prev - 1))
  const handleReset = () => {
    setRole(null)
    setStep(0)
  }

  return (
    <section id="apply-section" className="min-h-screen w-full bg-brand-secondary py-24 flex flex-col items-center overflow-x-hidden">
      {/* Header & Progress (Stay Centered) */}
      <div className="max-w-4xl w-full px-4 mb-16 relative">
        {step > 0 && step < 3 && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={handleBack}
            className="absolute -top-12 left-4 camera-hud-text text-accent hover:text-white transition-colors flex items-center gap-2 group"
          >
            <span className="text-lg group-hover:-translate-x-1 transition-transform">{"<"}</span>
            BACK // RE-CALIBRATE
          </motion.button>
        )}
        
        <div className="text-center mb-6 md:mb-16 flex flex-col items-center">
          <motion.img 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            src="/assets/logo.png" 
            alt="Idol Fashion Logo" 
            className="h-12 md:h-32 mb-3 md:mb-8 object-contain"
          />
          <h2 className="camera-hud-text mb-1 md:mb-2 tracking-[0.2em] opacity-50 text-[8px] md:text-xs">Where technical precision meets high-fashion evolution.</h2>
          <h3 className="big-text brand-text text-lg md:text-5xl lg:text-7xl px-4">The industry&apos;s premier development incubator.</h3>
        </div>

        <div className="w-full h-1 bg-white/5 mb-4 md:mb-12 relative">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-accent"
            animate={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div 
            key="step0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full flex flex-col"
          >
            {ROLES.map((r) => (
              <div
                key={r.id}
                className="group w-full flex flex-col md:flex-row md:items-end justify-between gap-4 py-8 md:py-12 px-6 md:px-12 relative overflow-hidden border-b border-white/10 hover:bg-white/[0.02] transition-colors"
              >
                  <div className="flex-1 text-left items-start flex flex-col">
                    <motion.h4 
                      initial={{ x: -50, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      className="big-text brand-text text-6xl md:text-[10rem] lg:text-[13rem] transition-all duration-500 group-hover:text-accent tracking-tighter leading-[0.7] text-left"
                    >
                      {r.label}
                    </motion.h4>
                    <p className="detail-text mt-4 opacity-40 group-hover:opacity-100 transition-opacity flex items-center gap-2 text-[8px] md:text-sm text-left uppercase tracking-widest">
                       <span className="w-1.5 h-1.5 rounded-full bg-accent opacity-0 group-hover:opacity-100" />
                       {r.description}
                    </p>
                  </div>

                  <div className="flex flex-col items-start md:items-end h-full mt-6 md:mt-0">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => { setRole(r.id); handleNext(); }}
                      className="detail-text px-6 py-3 bg-white text-black tracking-[0.2em] uppercase hover:bg-accent hover:text-white transition-all z-10 text-[7px] md:text-xs font-bold"
                    >
                      Initialize Application {">"}
                    </motion.button>
                    <span className="camera-hud-text mt-2 opacity-20 hidden md:block tracking-[0.5em] text-[10px]">
                      0{ROLES.indexOf(r) + 1} // IDL-PROTOCOL
                    </span>
                  </div>

                {/* Full Width Animated Line under the role */}
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/20">
                   <motion.div 
                     initial={{ width: 0 }}
                     whileInView={{ width: "100%" }}
                     transition={{ duration: 0.8 }}
                     className="h-full bg-accent"
                   />
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Step 1 & 2 (Keep Centered) */}
        {(step === 1 || step === 2 || step === 3) && (
          <div className="max-w-4xl w-full px-4">
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-12 overflow-hidden relative"
              >
                <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
                  <span className="big-text brand-text text-8xl">02</span>
                </div>

                <h4 className="text-2xl brand-text uppercase mb-8 underline underline-offset-8">Step 02: Candidate Data</h4>
                <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col">
                      <label className="camera-hud-text mb-2">Full Name / Nombre Completo</label>
                      <input type="text" required className="bg-white/5 border border-white/10 p-4 font-mono text-sm focus:border-accent outline-none" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                       <div className="flex flex-col">
                         <label className="camera-hud-text mb-2">DOB / Nacimiento</label>
                         <input type="date" required className="bg-white/5 border border-white/10 p-4 font-mono text-xs focus:border-accent outline-none" />
                       </div>
                       <div className="flex flex-col">
                         <label className="camera-hud-text mb-2">Age / Edad</label>
                         <input type="number" required className="bg-white/5 border border-white/10 p-4 font-mono text-sm focus:border-accent outline-none" />
                       </div>
                    </div>
                    
                    <div className="flex flex-col">
                      <label className="camera-hud-text mb-2">Professional Email</label>
                      <input type="email" required className="bg-white/5 border border-white/10 p-4 font-mono text-sm focus:border-accent outline-none" />
                    </div>
                    <div className="flex flex-col">
                      <label className="camera-hud-text mb-2">Mobile Contact</label>
                      <input type="tel" required className="bg-white/5 border border-white/10 p-4 font-mono text-sm focus:border-accent outline-none" />
                    </div>
                    
                    <div className="flex flex-col md:col-span-2">
                       <label className="camera-hud-text mb-2">Instagram / LinkedIn / Portfolio</label>
                       <input type="text" required placeholder="@handle or url" className="bg-white/5 border border-white/10 p-4 font-mono text-sm focus:border-accent outline-none" />
                    </div>

                    {['staff', 'makeup', 'media'].includes(role || '') && (
                      <>
                        <div className="flex flex-col md:col-span-2">
                          <label className="camera-hud-text mb-2">Home Address / Dirección de Habitación</label>
                          <input type="text" required className="bg-white/5 border border-white/10 p-4 font-mono text-sm focus:border-accent outline-none" />
                        </div>
                        <div className="grid grid-cols-2 gap-4 md:col-span-2">
                           <div className="flex flex-col">
                             <label className="camera-hud-text mb-2">City/State</label>
                             <input type="text" required className="bg-white/5 border border-white/10 p-4 font-mono text-sm focus:border-accent outline-none" />
                           </div>
                           <div className="flex flex-col">
                             <label className="camera-hud-text mb-2">Zip Code</label>
                             <input type="text" required className="bg-white/5 border border-white/10 p-4 font-mono text-sm focus:border-accent outline-none" />
                           </div>
                        </div>
                      </>
                    )}
                  </div>
                  
                  {role === 'model' && (
                    <div className="space-y-6 pt-6 border-t border-white/10">
                      <h5 className="brand-text text-2xl text-accent">Measurements & Profile</h5>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                          { l: 'Estatura', n: 'height' },
                          { l: 'Calzado (Shoe)', n: 'shoe' },
                          { l: 'Talla (Dress/Suit)', n: 'size' },
                          { l: 'Ojos (Eyes)', n: 'eyes' },
                          { l: 'Busto/Chest', n: 'bust' },
                          { l: 'Cintura (Waist)', n: 'waist' },
                          { l: 'Cadera (Hips)', n: 'hips' },
                          { l: 'Cabello (Hair)', n: 'hair' },
                        ].map((f) => (
                          <div key={f.n} className="flex flex-col">
                            <label className="camera-hud-text mb-2 text-[10px]">{f.l}</label>
                            <input type="text" className="bg-white/5 border border-white/10 p-2 font-mono text-xs focus:border-accent outline-none" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col pt-6 border-t border-white/10">
                     <label className="camera-hud-text mb-4">Past Experience? / Experiencia Previa?</label>
                     <div className="flex gap-8">
                        <label className="flex items-center gap-2 cursor-pointer group">
                           <input type="radio" name="experience" className="hidden" />
                           <div className="w-5 h-5 border border-white/20 rounded-full flex items-center justify-center group-hover:border-accent">
                              <div className="w-2.5 h-2.5 bg-accent rounded-full opacity-0" />
                           </div>
                           <span className="font-mono text-xs uppercase">Yes / Si</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer group">
                           <input type="radio" name="experience" className="hidden" />
                           <div className="w-5 h-5 border border-white/20 rounded-full flex items-center justify-center group-hover:border-accent">
                              <div className="w-2.5 h-2.5 bg-accent rounded-full opacity-0" />
                           </div>
                           <span className="font-mono text-xs uppercase">No</span>
                        </label>
                     </div>
                     <textarea 
                        placeholder="Highlight previous projects... / Proyectos anteriores destacados..." 
                        className="mt-4 bg-white/5 border border-white/10 p-4 font-mono text-sm focus:border-accent outline-none h-24"
                     />
                  </div>

                  {['staff', 'makeup', 'media'].includes(role || '') && (
                    <div className="flex flex-col pt-6 border-t border-white/10">
                      <label className="camera-hud-text mb-4">Fiscal Status / Estatus Legal-Fiscal</label>
                      <select className="bg-white/5 border border-white/10 p-4 font-mono text-sm focus:border-accent outline-none w-full">
                        <option value="contractor">Option A: Contractor (W-9 required)</option>
                        <option value="volunteer">Option B: Voluntario (Learning/Networking)</option>
                      </select>
                    </div>
                  )}
                  
                  <button type="submit" className="w-full py-5 mt-8 bg-white text-black font-mono uppercase tracking-widest hover:bg-accent hover:text-white transition-all font-bold">
                    Validate & Generate Contract
                  </button>
                </form>
              </motion.div>
            )}

            {step === 2 && (
               <motion.div 
                 key="step2"
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
               >
                 <SignatureSection role={role || ''} onComplete={handleNext} />
               </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card p-12 text-center"
              >
                <div className="w-20 h-20 border-2 border-accent rounded-full flex items-center justify-center mx-auto mb-8">
                  <div className="w-4 h-4 rounded-full bg-accent animate-pulse" />
                </div>
                <h4 className="big-text brand-text text-5xl mb-4 text-accent">Protocol Complete</h4>
                <p className="font-mono opacity-50 uppercase tracking-widest max-w-sm mx-auto">
                  Candidate data has been encrypted and sent to HQ. You will receive the signed contract shortly in your inbox.
                </p>
                <button 
                  onClick={handleReset}
                  className="mt-12 px-8 py-3 border border-white/10 font-mono text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all"
                >
                  New Application
                </button>
              </motion.div>
            )}
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
