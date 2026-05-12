import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const SIGNATURE_PATH = path.join(process.cwd(), 'src/lib/owner-signature.json');

export async function GET() {
  try {
    if (fs.existsSync(SIGNATURE_PATH)) {
      const data = fs.readFileSync(SIGNATURE_PATH, 'utf8');
      return NextResponse.json(JSON.parse(data));
    }
    return NextResponse.json({ signature: null });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read signature' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { signature } = await request.json();
    
    if (!signature) {
      return NextResponse.json({ error: 'Signature is required' }, { status: 400 });
    }

    const dir = path.dirname(SIGNATURE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(SIGNATURE_PATH, JSON.stringify({ 
      signature,
      updatedAt: new Date().toISOString(),
      ownerName: 'Idolfredo'
    }), 'utf8');

    return NextResponse.json({ message: 'Signature updated successfully' });
  } catch (error) {
    console.error('Save signature error:', error);
    return NextResponse.json({ error: 'Failed to save signature' }, { status: 500 });
  }
}
