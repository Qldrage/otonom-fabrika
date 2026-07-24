import { NextResponse } from 'next/server';
import { db, users } from '@otonom-fabrika/database';
import { eq, and } from 'drizzle-orm';
import * as bcrypt from 'bcrypt';

// Note: In a real app we'd use better-auth or next-auth.
// This is a placeholder for the tenant-aware login logic.
export async function POST(request: Request) {
  try {
    const { email, password, tenantId } = await request.json();

    if (!email || !password || !tenantId) {
      return NextResponse.json({ success: false, error: 'Missing credentials' }, { status: 400 });
    }

    const userResult = await db.select().from(users).where(
      and(eq(users.email, email), eq(users.tenantId, tenantId))
    ).limit(1);

    if (userResult.length === 0) {
      return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
    }

    const user = userResult[0];
    const passwordMatch = await bcrypt.compare(password, user.passwordHash);

    if (!passwordMatch) {
      return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
    }

    // TODO: Issue JWT or session cookie here
    
    return NextResponse.json({ 
      success: true, 
      data: { 
        id: user.id, 
        email: user.email, 
        role: user.role,
        tenantId: user.tenantId
      } 
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
