import { NextResponse } from 'next/server';
import { tables } from '@/lib/airtable';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 1. Check if user already exists
    // The field in Airtable is 'email' (lowercase)
    const existingRecords = await tables.users
      .select({
        filterByFormula: `{email} = '${email}'`,
        maxRecords: 1,
      })
      .firstPage();

    if (existingRecords && existingRecords.length > 0) {
      return NextResponse.json({ error: 'Identity already registered' }, { status: 409 });
    }

    // 2. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Create user in Airtable using the EXACT field names provided
    // Minimal set to ensure success
    let newRecord;
    try {
      newRecord = await tables.users.create([
        {
          fields: {
            'user_id': email, 
            'name': name,
            'email': email,
            'password_hash': hashedPassword,
            'role': 'talent',
          },
        },
      ]);
    } catch (airtableError: any) {
      console.error('Airtable Create Error:', airtableError);
      return NextResponse.json({ 
        error: 'Airtable Protocol Failure', 
        details: airtableError.message || JSON.stringify(airtableError),
        errorType: airtableError.constructor.name
      }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Protocol initialized. Identity created.',
      userId: newRecord[0].id 
    });

  } catch (error: any) {
    console.error('Registration API Error:', error);
    return NextResponse.json({ 
      error: 'Protocol Error', 
      details: error.message,
      stack: error.stack
    }, { status: 500 });
  }
}
