import { NextResponse } from 'next/server';
import { tables } from '@/lib/airtable';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Fetch Event details
    const eventRecord = await tables.events.find(id);
    const eventData = {
      id: eventRecord.id,
      name: eventRecord.fields['Name'] || 'Untitled Event',
      date: eventRecord.fields['Date'] || 'TBA',
      photographers: eventRecord.fields['Photographer Count'] || 0,
      totalPhotos: eventRecord.fields['Photo Count'] || 0,
    };

    // Fetch photos linked to this event
    const records = await tables.photos.select({
      filterByFormula: `SEARCH('${id}', {Event})`,
    }).all();

    const photos = records.map(record => ({
      id: record.id,
      name: record.fields['Name'] || 'IDOL_ASSET_UNKNOWN',
      image: record.fields['Preview URL'] || 'https://images.unsplash.com/photo-1500000000000?auto=format&fit=crop&q=80&w=800',
      price: record.fields['Price'] || 10,
      photographer: record.fields['Photographer Name'] || 'ELITE_LENS',
      status: record.fields['Status'] || 'Available',
    }));

    return NextResponse.json({ event: eventData, photos });
  } catch (error: any) {
    console.error('Error fetching event photos:', error);
    return NextResponse.json({ error: 'Failed to fetch photos' }, { status: 500 });
  }
}
