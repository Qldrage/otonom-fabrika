import { NextResponse } from 'next/server';
import { db, tenants } from '@otonom-fabrika/database';
import { eq, or } from 'drizzle-orm';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const host = searchParams.get('host');

  if (!host) {
    return NextResponse.json({ error: 'Host parameter is required' }, { status: 400 });
  }

  // Remove www. if present
  const cleanHost = host.replace(/^www\./, '').split(':')[0];

  try {
    const res = await db
      .select({ slug: tenants.slug, customDomain: tenants.customDomain })
      .from(tenants)
      .where(or(eq(tenants.customDomain, cleanHost), eq(tenants.customDomain, `www.${cleanHost}`)))
      .limit(1);

    if (res.length === 0) {
      return NextResponse.json({ error: 'Tenant domain not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, slug: res[0].slug });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
