"use client"

import React, { useRef, useState, useEffect } from 'react'
import SignatureCanvas from 'react-signature-canvas'
import { motion } from 'framer-motion'
import { ShieldCheck, ArrowLeft, Save, RefreshCcw, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import { CameraHUD } from '@/components/hero/CameraHUD'

export default function AdminSignaturePage() {
  const sigCanvas = useRef<SignatureCanvas | null>(null)
  const [signed, setSigned] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentSignature, setCurrentSignature] = useState<string | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    fetch('/api/admin/signature')
      .then(res => res.json())
      .then(data => {
        if (data.signature) setCurrentSignature(data.signature)
      })
  }, [])

  const clear = () => {
    sigCanvas.current?.clear()
    setSigned(false)
  }

  const save = async () => {
    if (sigCanvas.current?.isEmpty()) {
      alert('Please provide a signature.')
      return
    }
    
    setIsSubmitting(true)
    const signatureData = sigCanvas.current?.getTrimmedCanvas().toDataURL('image/png')
    
    try {
      const response = await fetch('/api/admin/signature', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ signature: signatureData }),
      })

      if (response.ok) {
        setCurrentSignature(signatureData || null)
        setShowSuccess(true)
        setTimeout(() => setShowSuccess(false), 3000)
      } else {
        alert('Failed to save signature.')
      }
    } catch (error) {
      console.error('Save error:', error)
      alert('Error saving signature.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-brand-secondary text-white relative overflow-hidden flex flex-col items-center py-20 px-6">
      <CameraHUD />
      
      <div className="w-full max-w-2xl space-y-12 z-10">
        {/* Header */}
        <div className="flex justify-between items-end">
          <div className="space-y-4">
            <div className="inline-flex p-3 rounded-2xl bg-accent/10 border border-accent/20">
              <ShieldCheck className="w-6 h-6 text-accent" />
            </div>
            <h1 className="brand-text text-4xl uppercase tracking-tighter">Owner Authorization</h1>
            <p className="camera-hud-text text-[9px] tracking-[0.5em] opacity-40 uppercase">Idolfredo // Master Signature Protocol</p>
          </div>
          <Link href="/links" className="camera-hud-text text-[9px] text-accent hover:underline flex items-center gap-2">
            <ArrowLeft className="w-3 h-3" /> Back
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Current Signature Display */}
          <div className="glass-card p-8 space-y-6">
            <h2 className="camera-hud-text text-[10px] opacity-40 uppercase tracking-widest">Active Signature</h2>
            <div className="aspect-video bg-white/5 border border-white/10 rounded-xl flex items-center justify-center p-4">
              {currentSignature ? (
                <img src={currentSignature} alt="Current Owner Signature" className="max-h-full invert brightness-0" />
              ) : (
                <p className="camera-hud-text text-[8px] opacity-20">NO_SIGNATURE_FOUND</p>
              )}
            </div>
            <p className="detail-text text-[10px] opacity-30 leading-relaxed uppercase">
              Esta es la firma que se incluirá automáticamente en todos los contratos y acreditaciones generados por el sistema.
            </p>
          </div>

          {/* New Signature Input */}
          <div className="glass-card p-8 space-y-6 border-accent/20">
            <h2 className="camera-hud-text text-[10px] text-accent uppercase tracking-widest">Update Signature</h2>
            
            <div className="w-full aspect-video bg-white/10 border-2 border-dashed border-accent/20 relative cursor-crosshair rounded-xl overflow-hidden">
              <SignatureCanvas
                ref={sigCanvas}
                penColor="white"
                canvasProps={{ className: 'w-full h-full' }}
                onBegin={() => setSigned(true)}
              />
              {!signed && (
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-20">
                  <RefreshCcw className="w-6 h-6 mb-2 animate-spin-slow" />
                  <span className="font-mono text-[8px] uppercase tracking-[0.2em]">Sign Here</span>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <button 
                onClick={clear}
                className="flex-1 py-3 border border-white/10 rounded-xl camera-hud-text text-[9px] uppercase tracking-widest hover:bg-white/5 transition-all"
              >
                Clear
              </button>
              <button 
                onClick={save}
                disabled={isSubmitting}
                className="flex-[2] py-3 bg-accent text-white rounded-xl camera-hud-text text-[9px] uppercase tracking-widest hover:bg-accent/80 transition-all flex items-center justify-center gap-2 font-bold"
              >
                {isSubmitting ? 'Saving...' : (
                  <>
                    <Save className="w-3 h-3" /> Update Protocol
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Status Notification */}
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 p-4 bg-accent/20 border border-accent/40 rounded-xl justify-center"
          >
            <CheckCircle2 className="w-4 h-4 text-accent" />
            <span className="camera-hud-text text-[10px] text-accent tracking-widest uppercase">System Updated: Owner Identity Confirmed</span>
          </motion.div>
        )}
      </div>

      <div className="fixed bottom-8 flex gap-8 opacity-10">
        <div className="camera-hud-text text-[7px]">AUTH_MODE: MASTER</div>
        <div className="camera-hud-text text-[7px]">IDENTITY: IDOLFREDO</div>
        <div className="camera-hud-text text-[7px]">ENCRYPTION: AES-256</div>
      </div>
    </main>
  )
}
