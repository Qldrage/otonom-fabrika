import { NextResponse } from 'next/server';
import { db, events } from '@otonom-fabrika/database';

export async function POST(request: Request) {
  try {
    // 1. JWT validation should happen here via middleware or standard library
    // For Phase 1 scaffold, we assume the token is validated and tenantId extracted
    
    // Placeholder tenant ID validation
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    // In a real implementation we decode the JWT here
    const tenantId = '00000000-0000-0000-0000-000000000000'; // mock uuid

    const body = await request.json();
    const { type, payload, source } = body;

    if (!type || !payload || !source) {
      return NextResponse.json({ success: false, error: 'Missing required event fields' }, { status: 400 });
    }

    // 2. Insert into event log
    const newEvent = await db.insert(events).values({
      tenantId,
      type,
      payload,
      source,
      processed: false
    }).returning();

    // 3. Optional: publish to BullMQ/Redis for async processing
    // await queue.add('process-event', { eventId: newEvent[0].id });

    return NextResponse.json({ success: true, data: newEvent[0] }, { status: 201 });
  } catch (error) {
    console.error('Error processing webhook event:', error);
    return NextResponse.json({ success: false, error: 'Failed to process event' }, { status: 500 });
  }
}
