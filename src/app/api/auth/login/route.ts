import { NextResponse } from 'next/server';
import { tables } from '@/lib/airtable';
import { login } from '@/lib/auth';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Missing credentials' }, { status: 400 });
    }

    // 1. Fetch user from Airtable using lowercase 'email'
    const records = await tables.users
      .select({
        filterByFormula: `{email} = '${email}'`,
        maxRecords: 1,
      })
      .firstPage();

    if (!records || records.length === 0) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const userRecord = records[0];
    const userData = userRecord.fields;

    // 2. Verify password (field is 'password_hash')
    const storedPassword = userData['password_hash'] as string;
    
    if (!storedPassword) {
       return NextResponse.json({ error: 'Account not initialized properly' }, { status: 401 });
    }

    let isValid = false;

    if (storedPassword.startsWith('$2a$')) {
      isValid = await bcrypt.compare(password, storedPassword);
    } else {
      isValid = password === storedPassword;
    }

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // 3. Create Session
    const user = {
      id: userRecord.id,
      email: userData['email'],
      name: userData['name'] || userData['full_name'],
      role: userData['role'],
    };

    await login(user);

    return NextResponse.json({ success: true, user });
  } catch (error: any) {
    console.error('Login API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
