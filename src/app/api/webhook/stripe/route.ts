import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { tables } from '@/lib/airtable';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get('Stripe-Signature') as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // Handle the event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as any;
    const { userId, photoIds } = session.metadata;
    const parsedPhotoIds = JSON.parse(photoIds);

    try {
      // 1. Create Order in Airtable
      const order = await tables.orders.create({
        'Order ID': session.id,
        'User': [userId], // Assuming userId is the Airtable Record ID
        'Total Amount': session.amount_total / 100,
        'Status': 'Paid',
        'Stripe Session ID': session.id,
        'Created At': new Date().toISOString(),
      });

      // 2. Create Order Items
      for (const photoId of parsedPhotoIds) {
        await tables.orderItems.create({
          'Order': [order.id],
          'Photo': [photoId],
          'Price': 10, // Or fetch from photo record
        });
      }

      // 3. Create Delivery Record
      await tables.deliveries.create({
        'Order': [order.id],
        'Delivery Status': 'Pending',
        'Download Link': 'Generating...', // This will be updated by the email worker
      });

      console.log(`Order ${order.id} created successfully for user ${userId}`);
      
      // TODO: Trigger email delivery (e.g., via background job or another API call)

    } catch (airtableError) {
      console.error('Airtable Sync Error:', airtableError);
      return new Response('Airtable Error', { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
