import { NextResponse } from 'next/server';
import { tables } from '@/lib/airtable';

export async function GET() {
  try {
    const records = await tables.events.select({
      sort: [{ field: 'Date', direction: 'desc' }],
    }).all();

    const events = records.map(record => ({
      id: record.id,
      name: record.fields['Name'] || 'Untitled Event',
      date: record.fields['Date'] || 'Date TBA',
      image: record.fields['Cover Image URL'] || 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?auto=format&fit=crop&q=80&w=1000',
      photoCount: record.fields['Photo Count'] || 0,
      photographerCount: record.fields['Photographer Count'] || 0,
      status: record.fields['Status'] || 'Active',
    }));

    return NextResponse.json(events);
  } catch (error: any) {
    console.error('Error fetching events:', error);
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
  }
}
