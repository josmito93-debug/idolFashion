import { NextResponse } from 'next/server';
import { tables } from '@/lib/airtable';

export async function GET() {
  try {
    // In a real app, we would get the userId from the session/JWT
    // For now, let's assume a mock user ID for testing
    const userId = 'IDOL_USER_01'; 

    // Fetch deliveries/purchased items for this user
    // We filter Deliveries table by User ID
    const records = await tables.deliveries.select({
      filterByFormula: `{User} = '${userId}'`,
    }).all();

    const assets = records.map(record => ({
      id: record.id,
      name: (record.fields['Photo Name'] as any)?.[0] || 'PURCHASED_ASSET',
      image: record.fields['Secure URL'] || 'https://images.unsplash.com/photo-1550000000000?auto=format&fit=crop&q=80&w=800',
      purchaseDate: record.fields['Delivery Date'] || 'Recently',
      status: record.fields['Status'] || 'Delivered',
      downloadUrl: record.fields['Secure URL'] || '#',
    }));

    return NextResponse.json(assets);
  } catch (error: any) {
    console.error('Error fetching purchased assets:', error);
    return NextResponse.json({ error: 'Failed to fetch assets' }, { status: 500 });
  }
}
