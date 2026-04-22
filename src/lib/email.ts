import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export interface PhotoDelivery {
  name: string;
  url: string;
  buffer?: Buffer; // For attachments
}

export async function sendDeliveryEmail(
  to: string,
  userName: string,
  photos: PhotoDelivery[],
  useLinks: boolean = true
) {
  const photoListHtml = photos
    .map(
      (p) => `
    <div style="margin-bottom: 20px; border: 1px solid #eee; padding: 15px; border-radius: 12px; background-color: #f9f9f9;">
      <p style="margin: 0 0 10px 0; font-weight: bold; color: #111;">${p.name}</p>
      ${useLinks ? `<a href="${p.url}" style="background-color: #e831e3; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px; display: inline-block; font-size: 13px; font-weight: bold;">Download High-Res</a>` : `<p style="font-size: 12px; color: #666;">(See attachment)</p>`}
    </div>
  `
    )
    .join('');

  const attachments = !useLinks 
    ? photos.map(p => ({
        filename: `${p.name}.jpg`,
        content: p.buffer
      }))
    : [];

  try {
    const data = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'Idol Fashion <lab@idolfashion.com>',
      to,
      subject: `Your Elite Lab Assets - Ready for Download`,
      attachments: attachments as any,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #111; line-height: 1.6;">
          <div style="background-color: #111; padding: 40px 20px; text-align: center; border-radius: 16px 16px 0 0;">
             <h1 style="color: white; margin: 0; font-size: 24px; letter-spacing: 4px;">IDOL FASHION</h1>
             <p style="color: #e831e3; margin: 5px 0 0 0; font-size: 10px; letter-spacing: 6px;">THE ELITE LAB</p>
          </div>
          
          <div style="padding: 40px 20px; border: 1px solid #eee; border-top: none; border-radius: 0 0 16px 16px;">
            <p>Hi <strong>${userName}</strong>,</p>
            <p>Your high-end production assets from our recent event have been processed and are now available for your professional use.</p>
            
            <div style="margin-top: 30px;">
              ${photoListHtml}
            </div>

            <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #888; text-align: center;">
              <p>These assets are licensed for your professional portfolio and agency submissions.</p>
              <p>© 2025 IDOL FASHION LAB. All rights reserved.</p>
            </div>
          </div>
        </div>
      `,
    });

    return { success: true, data };
  } catch (error) {
    console.error('Email Error:', error);
    return { success: false, error };
  }
}
