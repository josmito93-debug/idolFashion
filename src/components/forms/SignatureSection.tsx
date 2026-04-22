"use client"

import React, { useRef, useState } from 'react'
import SignatureCanvas from 'react-signature-canvas'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'

interface SignatureSectionProps {
  role: string
  onComplete: () => void
}

export const SignatureSection = ({ role, onComplete }: SignatureSectionProps) => {
  const sigCanvas = useRef<SignatureCanvas | null>(null)
  const [signed, setSigned] = useState(false)

  const clear = () => {
    sigCanvas.current?.clear()
    setSigned(false)
  }

  const save = () => {
    if (sigCanvas.current?.isEmpty()) return
    setSigned(true)
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ffffff', '#e831e3', '#000000']
    })
    setTimeout(onComplete, 1500)
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

      <div className="bg-white/[0.02] border border-white/5 p-8 mb-8 max-h-80 overflow-y-auto font-mono text-[10px] space-y-4 opacity-70 leading-relaxed uppercase tracking-tighter">
        {role === 'model' ? (
          <>
            <p className="brand-text text-lg text-accent mb-4">IDOL JOSE GROUP LLC (IDOL FASHION / DORAL FASHION WEEK)</p>
            <p><span className="text-white/80">A. Consentimiento de Menores de Edad:</span> En cumplimiento con las leyes del Estado de Florida, si el modelo es menor de 18 años, este contrato debe ser firmado por su padre, madre o tutor legal. Idol Jose Group LLC no se hace responsable de las acciones o seguridad del menor fuera de las actividades coordinadas.</p>
            <p><span className="text-white/80">B. Cesión de Derechos de Imagen:</span> El Modelo cede de manera irrevocable y gratuita a Idol Jose Group LLC el derecho de utilizar su imagen, voz y nombre obtenidos durante las actividades de la empresa en publicidad, redes sociales y revistas (Doral Fashion Week Magazine/Doral Business City).</p>
            <p><span className="text-white/80">C. Confidencialidad (Non-Disclosure):</span> El Modelo se compromete a no divulgar información interna o procesos de producción. Comentarios difamatorios podrán acarrear acciones legales por daños a la reputación corporativa.</p>
            <p><span className="text-white/80">D. Política de "No-Show" y Cancelaciones:</span> El compromiso es vinculante. Inasistencia sin causa de fuerza mayor (No-Show) aceptará una penalidad económica de $100 USD por concepto de gastos administrativos.</p>
            <p><span className="text-white/80">E. Relación Independiente:</span> Este registro no constituye una relación de empleo directo bajo las leyes laborales de Florida, sino una relación de contratista independiente.</p>
          </>
        ) : (
          <>
            <p className="brand-text text-lg text-accent mb-4">REGISTRO Y ACUERDO DE COLABORACIÓN PROFESIONAL - IDOL JOSE GROUP LLC</p>
            <p><span className="text-white/80">A. Confidencialidad y Lealtad:</span> El colaborador se compromete a mantener estricta confidencialidad sobre logística, bases de datos de clientes y diseños. Queda prohibida la divulgación de material interno sin autorización.</p>
            <p><span className="text-white/80">B. Responsabilidades y Tareas:</span> El colaborador se compromete a cumplir con las tareas asignadas de manera responsable y puntual. El incumplimiento causará la baja inmediata.</p>
            <p><span className="text-white/80">C. Código de Vestimenta (Dress Code):</span> El colaborador debe proyectar excelencia. Se compromete a seguir el Dress Code establecido (ej. Total Black, Uniforme de Staff o Editorial).</p>
            <p><span className="text-white/80">D. Uso de Imagen:</span> Autorizo a la entidad a utilizar fotografías o videos de mi persona desempeñando mis funciones para fines promocionales o memorias del evento.</p>
            <p><span className="text-white/80">E. Carácter Personal de la Relación:</span> Este registro es estrictamente personal. El colaborador actúa bajo su propia responsabilidad civil.</p>
          </>
        )}
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
            className="flex-1 py-3 border border-white/10 font-mono text-xs uppercase tracking-widest hover:bg-white/10 transition-all"
          >
            Clear
          </button>
          <button 
            onClick={save}
            className="flex-1 py-3 bg-white text-black font-mono text-xs uppercase tracking-widest hover:bg-accent hover:text-white transition-all font-bold"
          >
            Authorize & Submit
          </button>
        </div>
      </div>
    </div>
  )
}
