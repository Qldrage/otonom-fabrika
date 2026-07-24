import { describe, it, expect, vi } from 'vitest';
import { updatePageBlocksAction } from './pages';

// Mock drizzle db queries for unit test verification
vi.mock('@otonom-fabrika/database', () => {
  return {
    db: {
      select: () => ({
        from: () => ({
          where: () => ({
            limit: async () => [{ id: 'mock-tenant-id', slug: 'elit-perde' }],
          }),
        }),
      }),
      update: () => ({
        set: () => ({
          where: async () => true,
        }),
      }),
    },
    tenants: { id: 'id', slug: 'slug' },
    pages: { tenantId: 'tenant_id', slug: 'slug' },
  };
});

vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}));

describe('updatePageBlocksAction Server Action', () => {
  it('updates page blocks successfully for valid tenant', async () => {
    const newBlocks = [
      {
        type: 'HeroBlock',
        props: { headline: 'Test Headline' },
      },
    ];

    const result = await updatePageBlocksAction('elit-perde', newBlocks);
    expect(result).toEqual({ success: true });
  });

  it('returns error if tenant is missing', async () => {
    const { db } = await import('@otonom-fabrika/database');
    vi.spyOn(db, 'select').mockImplementationOnce(() => ({
      from: () => ({
        where: () => ({
          limit: async () => [],
        }),
      }),
    }) as any);

    const result = await updatePageBlocksAction('non-existing', []);
    expect(result).toEqual({ error: 'İşletme bulunamadı.' });
  });
});
