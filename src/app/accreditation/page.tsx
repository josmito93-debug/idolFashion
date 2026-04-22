"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Camera, ShieldCheck, ArrowRight, FileText, Lock, Globe, CheckCircle2 } from 'lucide-react'
import { CameraHUD } from '@/components/hero/CameraHUD'

export default function AccreditationPage() {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1500)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-brand-secondary flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full glass-card p-12 rounded-3xl border-accent/20 text-center space-y-6"
        >
          <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-accent/40">
            <CheckCircle2 className="w-10 h-10 text-accent" />
          </div>
          <h2 className="brand-text text-4xl uppercase">Solicitud Recibida</h2>
          <p className="detail-text text-xs opacity-50 uppercase tracking-widest leading-relaxed">
            Tu protocolo de acreditación ha sido iniciado. Recibirás una confirmación oficial en tu correo electrónico con los detalles logísticos.
          </p>
          <div className="pt-8">
            <button 
              onClick={() => window.location.href = '/'}
              className="camera-hud-text text-[10px] tracking-[0.3em] uppercase text-accent hover:underline"
            >
              Back to Command Center
            </button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-brand-secondary text-white relative overflow-hidden">
      <CameraHUD />
      
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/10 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-12 pt-40 pb-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          
          {/* Left: Content & Form */}
          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-accent/20 bg-accent/5 mb-8">
                <Camera className="w-4 h-4 text-accent" />
                <span className="camera-hud-text text-[10px] tracking-[0.3em] uppercase text-accent">Media Accreditation Protocol</span>
              </div>
              <h1 className="text-6xl md:text-8xl brand-text leading-[0.9] mb-8">Registro de <br/><span className="text-accent">Fotógrafos</span></h1>
              <p className="detail-text text-sm opacity-40 uppercase tracking-[0.2em] leading-relaxed max-w-xl">
                Acreditación oficial para la cobertura visual de alta fidelidad. Acceso exclusivo a áreas restringidas, backstage y pasarela principal.
              </p>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="camera-hud-text text-[8px] opacity-40 uppercase tracking-widest ml-1">Nombre Completo</label>
                  <input 
                    type="text" 
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 camera-hud-text text-[10px] tracking-widest focus:border-accent/40 focus:outline-none transition-all"
                    placeholder="NAME // IDENTITY"
                  />
                </div>
                <div className="space-y-2">
                  <label className="camera-hud-text text-[8px] opacity-40 uppercase tracking-widest ml-1">Email Profesional</label>
                  <input 
                    type="email" 
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 camera-hud-text text-[10px] tracking-widest focus:border-accent/40 focus:outline-none transition-all"
                    placeholder="EMAIL@PROTOCOL.COM"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="camera-hud-text text-[8px] opacity-40 uppercase tracking-widest ml-1">Link Portfolio / Social Media</label>
                <div className="relative group">
                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-hover:text-accent transition-colors" />
                  <input 
                    type="url" 
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-6 camera-hud-text text-[10px] tracking-widest focus:border-accent/40 focus:outline-none transition-all"
                    placeholder="WWW.PORTFOLIO.COM / @USERNAME"
                  />
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center mt-0.5">
                    <input 
                      type="checkbox" 
                      required
                      className="peer h-5 w-5 appearance-none rounded border border-white/20 bg-white/5 checked:bg-accent checked:border-accent transition-all cursor-pointer" 
                    />
                    <CheckCircle2 className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
                  </div>
                  <span className="detail-text text-[10px] opacity-40 group-hover:opacity-60 transition-opacity uppercase tracking-widest leading-relaxed">
                    Confirmo mi asistencia y acepto los términos de confidencialidad y uso de imagen detallados en el protocolo oficial.
                  </span>
                </label>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-5 bg-white text-black camera-hud-text text-[8px] tracking-[0.4em] uppercase hover:bg-accent hover:text-white transition-all font-bold flex items-center justify-center gap-3 relative overflow-hidden group"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span className="relative z-10">Initialize Accreditation</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform relative z-10" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right: Terms & Conditions Document */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card rounded-3xl border-white/5 overflow-hidden flex flex-col h-[700px] sticky top-32"
          >
            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/5">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-accent" />
                <span className="camera-hud-text text-[10px] tracking-[0.2em] uppercase">Protocol Document // 04-2026</span>
              </div>
              <Lock className="w-4 h-4 opacity-20" />
            </div>
            
            <div className="flex-1 overflow-y-auto p-12 space-y-12 custom-scrollbar">
              <div className="space-y-6">
                <h3 className="brand-text text-2xl uppercase">Asunto: Acreditación Oficial y Acuerdo de Confidencialidad</h3>
                <div className="glow-line" />
                <p className="detail-text text-xs opacity-50 uppercase tracking-widest leading-loose">
                  Es un placer confirmarle que su solicitud de registro para la cobertura fotográfica de <span className="text-white opacity-100">IDOL FASHION 2026</span> ha sido aprobada con éxito. Valoramos su interés en documentar nuestra próxima edición y formar parte de esta experiencia visual.
                </p>
              </div>

              <div className="space-y-8">
                <div className="space-y-4">
                  <h4 className="camera-hud-text text-xs text-accent uppercase tracking-[0.3em]">1. Detalles de Acreditación</h4>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                      <p className="camera-hud-text text-[9px] opacity-30 uppercase mb-1">Lugar</p>
                      <p className="detail-text text-[11px] uppercase tracking-widest">Miami Design District // The Lab</p>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                      <p className="camera-hud-text text-[9px] opacity-30 uppercase mb-1">Horario Acceso Prensa</p>
                      <p className="detail-text text-[11px] uppercase tracking-widest">16:00 HRS [EST]</p>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                      <p className="camera-hud-text text-[9px] opacity-30 uppercase mb-1">Código de Vestimenta</p>
                      <p className="detail-text text-[11px] uppercase tracking-widest text-accent">Riguroso Negro / All-Black Protocol</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="camera-hud-text text-xs text-accent uppercase tracking-[0.3em]">2. Acuerdo de Confidencialidad y Uso de Imagen</h4>
                  <div className="p-6 rounded-xl bg-accent/5 border border-accent/10 space-y-6">
                    <div className="space-y-2">
                      <p className="camera-hud-text text-[9px] uppercase tracking-widest text-white underline">Cláusula de Confidencialidad:</p>
                      <p className="detail-text text-[10px] opacity-60 uppercase tracking-wider leading-relaxed">
                        El fotógrafo se compromete a mantener estricta confidencialidad sobre cualquier información, diseño, colección o material visual obtenido en áreas restringidas (como el Backstage o ensayos) antes de la hora oficial del desfile. Queda prohibida la publicación de material en tiempo real que revele detalles exclusivos de las colecciones sin autorización previa de la organización.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="camera-hud-text text-[9px] uppercase tracking-widest text-white underline">Propiedad Intelectual y Uso:</p>
                      <p className="detail-text text-[10px] opacity-60 uppercase tracking-wider leading-relaxed">
                        El material capturado deberá respetar los derechos de imagen de los modelos y diseñadores. Cualquier uso comercial de las fotografías fuera del ámbito editorial pactado deberá ser consultado previamente con el comité organizador.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="camera-hud-text text-xs text-accent uppercase tracking-[0.3em]">3. Instrucciones de Entrega</h4>
                  <p className="detail-text text-[10px] opacity-50 uppercase tracking-widest leading-relaxed">
                    Le recordamos que el tiempo estimado para la entrega del material seleccionado es de <span className="text-white opacity-80">48-72 horas</span>. Por favor, asegúrese de etiquetar las cuentas oficiales y utilizar los hashtags del evento: <span className="text-accent">#IDOLFASHION #THEELITELAB</span>.
                  </p>
                </div>
              </div>

              <div className="pt-8 border-t border-white/5 flex justify-between items-end">
                <div className="space-y-1">
                  <p className="camera-hud-text text-[9px] opacity-30 uppercase tracking-widest">Authorized By</p>
                  <p className="brand-text text-lg uppercase">Idol Fashion HQ</p>
                  <p className="camera-hud-text text-[8px] opacity-50 uppercase tracking-widest">CEO / Communications Director</p>
                </div>
                <ShieldCheck className="w-12 h-12 opacity-10" />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
      
      {/* Footer Info HUD */}
      <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 opacity-30 pointer-events-none">
        <div className="h-[1px] w-12 bg-white" />
        <span className="camera-hud-text text-[10px] tracking-widest uppercase">Protocol Status: Authorization Required</span>
        <div className="h-[1px] w-12 bg-white" />
      </div>
    </main>
  )
}
