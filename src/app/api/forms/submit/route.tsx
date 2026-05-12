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
    let logoBase64 = undefined

    try {
      // 1. Get Owner Signature
      const SIGNATURE_PATH = path.join(process.cwd(), 'src/lib/owner-signature.json')
      if (fs.existsSync(SIGNATURE_PATH)) {
        const sigFile = fs.readFileSync(SIGNATURE_PATH, 'utf8')
        ownerSignature = JSON.parse(sigFile).signature
      }

      // 2. Get Logo as Base64 for the PDF
      const logoPath = path.join(process.cwd(), 'public/assets/logo.png')
      if (fs.existsSync(logoPath)) {
        logoBase64 = `data:image/png;base64,${fs.readFileSync(logoPath).toString('base64')}`
      }
    } catch (e) {
      console.warn('PDF asset preparation failed:', e)
    }

    const pdfBuffer = await renderToBuffer(<ApplicationPDF data={data} ownerSignature={ownerSignature} logoBase64={logoBase64} />)

    // Send Email via Resend
    if (!resend) {
      console.error('Resend API Key is missing')
      return NextResponse.json({ message: 'Email service unconfigured' }, { status: 500 })
    }

    // Define role-specific email content
    const roleContent: Record<string, { subject: string, title: string, message: string }> = {
      model: {
        subject: `Talent Application: ${data.fullName} [Model Division]`,
        title: 'Talent Application Received',
        message: 'Your application for the Model Division has been successfully filed. Our team will review your profile and measurements shortly.'
      },
      designer: {
        subject: `Designer Collaboration: ${data.fullName}`,
        title: 'Designer Submission Received',
        message: 'Thank you for submitting your portfolio. We look forward to reviewing your creative vision and potential collaboration with Idol Fashion.'
      },
      media: {
        subject: `Media Accreditation: ${data.fullName}`,
        title: 'Accreditation Request Filed',
        message: 'Your request for media/press accreditation has been recorded. Our press team will contact you regarding your credentials.'
      },
      staff: {
        subject: `Staff/Production Inquiry: ${data.fullName}`,
        title: 'Production Team Application',
        message: 'Your application for our production and backstage team has been received. Thank you for your interest in joining Idol Fashion.'
      }
    }

    const content = roleContent[data.role] || {
      subject: `New Application: ${data.fullName}`,
      title: 'Application Received',
      message: 'Your professional application has been received and is now under review by our executive team.'
    }

    const { data: emailData, error } = await resend.emails.send({
      from: 'Idol Fashion HQ <registrations@idolfashiontheelitelab.com>',
      to: [data.email, 'jose@idolfashiontheelitelab.com'],
      subject: content.subject,
      html: `
        <div style="font-family: 'Helvetica', sans-serif; background-color: #ffffff; color: #000000; padding: 40px; border: 1px solid #eeeeee;">
          <h1 style="color: #000000; text-transform: uppercase; letter-spacing: 2px; font-size: 20px;">${content.title}</h1>
          <p style="color: #666666; font-size: 11px; letter-spacing: 1px; text-transform: uppercase;">IDOL FASHION // THE ELITE LAB</p>
          <hr style="border: 0; border-top: 1px solid #eeeeee; margin: 20px 0;" />
          <p style="font-size: 14px; line-height: 1.6;">Dear <strong>${data.fullName}</strong>,</p>
          <p style="font-size: 14px; line-height: 1.6;">${content.message}</p>
          <p style="font-size: 14px; line-height: 1.6; margin-top: 20px;">Please find your signed agreement attached to this email for your professional records.</p>
          <div style="margin-top: 50px; font-size: 10px; color: #999999; border-top: 1px solid #f5f5f5; padding-top: 20px;">
            <p>IDOL JOSE GROUP LLC</p>
            <p>MIAMI DESIGN DISTRICT // DORAL, FL</p>
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
