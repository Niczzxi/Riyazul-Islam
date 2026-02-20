import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Project from '@/models/Project';

export async function GET() {
  try {
    console.log("API: Fetching projects...");
    await dbConnect();
    console.log("API: DB Connected. Querying Projects...");
    const projects = await Project.find({}).sort({ createdAt: -1 });
    console.log(`API: Found ${projects.length} projects.`);
    return NextResponse.json({ success: true, data: projects });
  } catch (error) {
    console.error("API GET Projects Error:", error);
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  await dbConnect();

  try {
    const body = await request.json();
    const project = await Project.create(body);
    return NextResponse.json({ success: true, data: project }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 400 });
  }
}
