import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Memory } from '@/models/Memory';

export async function GET() {
  try {
    await dbConnect();
    const memories = await Memory.find({}).sort({ date: -1 });
    return NextResponse.json(memories);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch memories' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const formData = await request.formData();
    // Here you would handle file upload to a service like AWS S3 or Cloudinary
    // For now, we'll just save the memory without the actual file
    const memory = await Memory.create({
      date: formData.get('date'),
      caption: formData.get('caption'),
      imageUrl: 'placeholder-url', // Replace with actual uploaded image URL
    });
    return NextResponse.json(memory);
  } catch {
    return NextResponse.json({ error: 'Failed to create memory' }, { status: 500 });
  }
} 