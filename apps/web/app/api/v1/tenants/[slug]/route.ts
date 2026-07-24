import { NextResponse } from 'next/server';
import { db, tenants } from '@otonom-fabrika/database';
import { eq } from 'drizzle-orm';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const tenant = await db.select().from(tenants).where(eq(tenants.slug, slug)).limit(1);
    
    if (tenant.length === 0) {
      return NextResponse.json({ success: false, error: 'Tenant not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: tenant[0] });
  } catch (error) {
    console.error('Error fetching tenant:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch tenant' }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body = await request.json();
    
    const tenant = await db.update(tenants)
      .set({
        ...body,
        updatedAt: new Date()
      })
      .where(eq(tenants.slug, slug))
      .returning();

    if (tenant.length === 0) {
      return NextResponse.json({ success: false, error: 'Tenant not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: tenant[0] });
  } catch (error) {
    console.error('Error updating tenant:', error);
    return NextResponse.json({ success: false, error: 'Failed to update tenant' }, { status: 500 });
  }
}
