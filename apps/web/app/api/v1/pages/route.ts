import { NextResponse } from 'next/server';
import { db, pages } from '@otonom-fabrika/database';
import { eq } from 'drizzle-orm';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const tenantId = searchParams.get('tenantId');

    if (!tenantId) {
      return NextResponse.json({ success: false, error: 'tenantId is required' }, { status: 400 });
    }

    const tenantPages = await db.select().from(pages).where(eq(pages.tenantId, tenantId));
    
    return NextResponse.json({ success: true, data: tenantPages });
  } catch (error) {
    console.error('Error fetching pages:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch pages' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { tenantId, slug, title, blocks = [], seo = {}, published = false } = body;

    if (!tenantId || !slug || !title) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    const newPage = await db.insert(pages).values({
      tenantId,
      slug,
      title,
      blocks,
      seo,
      published
    }).returning();

    return NextResponse.json({ success: true, data: newPage[0] }, { status: 201 });
  } catch (error) {
    console.error('Error creating page:', error);
    return NextResponse.json({ success: false, error: 'Failed to create page' }, { status: 500 });
  }
}
