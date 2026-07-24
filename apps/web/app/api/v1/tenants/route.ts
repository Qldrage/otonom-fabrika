import { NextResponse } from 'next/server';
import { db, tenants } from '@otonom-fabrika/database';

export async function GET() {
  try {
    const allTenants = await db.select().from(tenants);
    return NextResponse.json({ success: true, data: allTenants });
  } catch (error) {
    console.error('Error fetching tenants:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch tenants' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { slug, name, sector, plan = 'free' } = body;

    if (!slug || !name || !sector) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    const newTenant = await db.insert(tenants).values({
      slug,
      name,
      sector,
      plan,
      config: {}
    }).returning();

    return NextResponse.json({ success: true, data: newTenant[0] }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating tenant:', error);
    if (error.code === '23505') { // Postgres unique violation code
       return NextResponse.json({ success: false, error: 'Slug already exists' }, { status: 409 });
    }
    return NextResponse.json({ success: false, error: 'Failed to create tenant' }, { status: 500 });
  }
}
