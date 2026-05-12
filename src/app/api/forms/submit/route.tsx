import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import React from 'react'
import { renderToBuffer } from '@react-pdf/renderer'
import { ApplicationPDF } from '@/components/forms/ApplicationPDF'
import fs from 'fs'
import path from 'path'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()

    if (!data.email || !data.fullName) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 })
    }

    // Generate PDF Buffer
    let ownerSignature = undefined
    try {
      const SIGNATURE_PATH = path.join(process.cwd(), 'src/lib/owner-signature.json')
      if (fs.existsSync(SIGNATURE_PATH)) {
        const sigFile = fs.readFileSync(SIGNATURE_PATH, 'utf8')
        ownerSignature = JSON.parse(sigFile).signature
      }
    } catch (e) {
      console.warn('Owner signature read failed:', e)
    }

    const pdfBuffer = await renderToBuffer(<ApplicationPDF data={data} ownerSignature={ownerSignature} />)

    // Send Email via Resend
    if (!resend) {
      console.error('Resend API Key is missing')
      return NextResponse.json({ message: 'Email service unconfigured' }, { status: 500 })
    }

    const { data: emailData, error } = await resend.emails.send({
      from: 'Idol Fashion HQ <registrations@idolfashion.miami>', // This should be a verified domain in Resend
      to: [data.email, 'jose@idolfashion.miami'], // Send to candidate and HQ
      subject: `PROTOCOL INITIATED: ${data.fullName} [${data.role.toUpperCase()}]`,
      html: `
        <div style="font-family: monospace; background-color: #000; color: #fff; padding: 40px; border: 1px solid #e831e3;">
          <h1 style="color: #e831e3; text-transform: uppercase; letter-spacing: 4px;">Protocol Initialized</h1>
          <p style="opacity: 0.7; font-size: 12px; letter-spacing: 2px;">ELITE DEVELOPMENT INCUBATOR // IDOL FASHION</p>
          <hr style="border: 0; border-top: 1px solid #333; margin: 20px 0;" />
          <p>Candidate: <strong>${data.fullName}</strong></p>
          <p>Role: <strong>${data.role}</strong></p>
          <p>Status: <strong>ENCRYPTED & FILED</strong></p>
          <p style="margin-top: 30px;">Your signed application has been processed. Please find the attached document for your records.</p>
          <div style="margin-top: 50px; font-size: 10px; opacity: 0.4;">
            <p>LAT: 25.8102° N // LNG: 80.1751° W</p>
            <p>NODE: MIAMI_LAB_01</p>
          </div>
        </div>
      `,
      attachments: [
        {
          filename: `contract_${data.fullName.replace(/\s+/g, '_')}.pdf`,
          content: pdfBuffer,
        },
      ],
    })

    if (error) {
      console.error('Resend Error:', error)
      return NextResponse.json({ message: 'Email dispatch failed', error }, { status: 500 })
    }

    return NextResponse.json({ message: 'Application filed successfully', emailData }, { status: 200 })
  } catch (error) {
    console.error('Submission Error:', error)
    return NextResponse.json({ message: 'Internal Server Error', error: String(error) }, { status: 500 })
  }
}
