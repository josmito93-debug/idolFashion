"use client"

import React, { useRef, useState } from 'react'
import SignatureCanvas from 'react-signature-canvas'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'

interface SignatureSectionProps {
  role: string
  formData: any
  onComplete: () => void
}

export const SignatureSection = ({ role, formData, onComplete }: SignatureSectionProps) => {
  const sigCanvas = useRef<SignatureCanvas | null>(null)
  const [signed, setSigned] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

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
      const response = await fetch('/api/forms/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          role,
          signature: signatureData,
          contractId: `ELITE-LAB-2026-${Math.floor(Math.random() * 10000)}`
        }),
      })

      if (response.ok) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ffffff', '#e831e3', '#000000']
        })
        setTimeout(onComplete, 1500)
      } else {
        const err = await response.json()
        alert(`Error submitting application: ${err.message || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Submission error:', error)
      alert('Failed to submit application. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="glass-card p-12">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h4 className="text-2xl brand-text uppercase underline underline-offset-8">Step 03: Legal Binding</h4>
          <p className="camera-hud-text mt-4">Candidate Class: {role}</p>
        </div>
        <div className="text-right">
          <span className="camera-hud-text">Contract ID</span>
          <p className="font-mono text-xs opacity-40">ELITE-LAB-2026-{Math.floor(Math.random() * 10000)}</p>
        </div>
      </div>

      <div className="bg-white/[0.02] border border-white/5 p-8 mb-8 max-h-80 overflow-y-auto font-mono text-[9px] space-y-4 opacity-70 leading-relaxed uppercase tracking-tighter text-justify">
        <p className="brand-text text-lg text-accent mb-4">
          {role === 'designer' ? 'CONTRATO DE PARTICIPACIÓN PARA DISEÑADORES' : 
           role === 'model' ? 'CONTRATO INTEGRAL DE PARTICIPACIÓN (TALENT)' : 
           'ACUERDO DE COLABORACIÓN Y LIBERACIÓN DE RESPONSABILIDAD'}
        </p>
        
        <p><span className="text-white/80">I. DISPOSICIONES FINANCIERAS:</span> Todos los pagos y depósitos son estrictamente no reembolsables. No se emitirán créditos bajo ninguna circunstancia.</p>
        
        <p><span className="text-white/80">II. RESPONSABILIDAD:</span> LA COMPAÑÍA no responde por lesiones o pérdida de propiedad. {role !== 'designer' && role !== 'model' && 'No se asume responsabilidad por equipos profesionales (cámaras, lentes).'} EL PARTICIPANTE indemnizará a LA COMPAÑÍA.</p>
        
        <p><span className="text-white/80">III. CONFIDENCIALIDAD (NDA):</span> Se prohíbe divulgar secretos comerciales, diseños no publicados o logística a terceros o redes sociales.</p>
        
        {role === 'designer' ? (
          <>
            <p><span className="text-white/80">IV. PROPIEDAD INTELECTUAL:</span> El Diseñador garantiza originalidad y asume responsabilidad total ante reclamos por plagio.</p>
            <p><span className="text-white/80">V. LOGÍSTICA:</span> El seguro de las piezas es responsabilidad del Diseñador. El incumplimiento de horarios resultará en exclusión.</p>
          </>
        ) : (
          <>
            <p><span className="text-white/80">IV. DERECHOS DE IMAGEN:</span> Uso irrevocable y global de imagen/voz con fines comerciales. {role !== 'model' && 'Material capturado se considera "obra por encargo" (Work-for-Hire).'}</p>
            <p><span className="text-white/80">V. ESTATUS:</span> EL PARTICIPANTE actúa como agente independiente (voluntario/prensa/contratista) y no como empleado.</p>
          </>
        )}
        
        <p className="mt-4 border-t border-white/10 pt-4 italic">Al firmar digitalmente, usted confirma que ha leído y acepta todos los términos regidos por las leyes del Estado de Florida.</p>
      </div>

      <div className="flex flex-col items-center">
        <label className="camera-hud-text mb-4">Digital Signature Required</label>
        <div className="w-full h-64 bg-white/[0.05] border-2 border-dashed border-white/10 relative cursor-crosshair">
          <SignatureCanvas
            ref={sigCanvas}
            penColor="white"
            canvasProps={{ className: 'w-full h-full signature-canvas' }}
            onBegin={() => setSigned(true)}
          />
          {!signed && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
              <span className="font-mono text-sm uppercase tracking-[0.2em]">Sign Here</span>
            </div>
          )}
        </div>

        <div className="flex gap-4 w-full mt-6">
          <button 
            onClick={clear}
            disabled={isSubmitting}
            className="flex-1 py-3 border border-white/10 font-mono text-xs uppercase tracking-widest hover:bg-white/10 transition-all disabled:opacity-50"
          >
            Clear
          </button>
          <button 
            onClick={save}
            disabled={isSubmitting}
            className="flex-1 py-3 bg-white text-black font-mono text-xs uppercase tracking-widest hover:bg-accent hover:text-white transition-all font-bold disabled:opacity-50"
          >
            {isSubmitting ? 'Processing...' : 'Authorize & Submit'}
          </button>
        </div>
      </div>
    </div>
  )
}

