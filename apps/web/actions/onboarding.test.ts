import { describe, it, expect, vi } from 'vitest';
import { registerBusinessAction } from './onboarding';

vi.mock('@otonom-fabrika/database', () => {
  return {
    db: {
      select: () => ({
        from: () => ({
          where: () => ({
            limit: async () => [],
          }),
        }),
      }),
      insert: () => ({
        values: () => ({
          returning: async () => [{ id: 'mock-tenant-id', slug: 'moda-tesisat' }],
        }),
      }),
    },
    tenants: { id: 'id', slug: 'slug' },
    users: { id: 'id' },
    pages: { id: 'id' },
  };
});

vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}));

vi.mock('next/headers', () => ({
  cookies: async () => ({
    set: vi.fn(),
    get: vi.fn(),
    delete: vi.fn(),
  }),
}));

describe('registerBusinessAction Server Action', () => {
  it('registers a business and triggers AI content pipeline successfully', async () => {
    const input = {
      businessName: 'Moda Tesisat',
      email: 'info@modatesisat.com',
      password: 'password123',
      city: 'İstanbul',
      district: 'Kadıköy',
      specialty: 'Su Kaçağı Tespiti',
      phone: '0532 999 88 77',
    };

    const result = await registerBusinessAction(input);
    expect(result.success).toBe(true);
    expect(result.slug).toBe('moda-tesisat');
    expect(result.tenantName).toBe('Moda Tesisat');
  });

  it('returns error when required fields are missing', async () => {
    const input = {
      businessName: '',
      email: 'invalid',
      password: '',
      city: '',
      district: '',
      specialty: '',
    };

    const result = await registerBusinessAction(input);
    expect(result.error).toBe('Lütfen tüm zorunlu alanları doldurunuz.');
  });

  it('returns error when email already exists', async () => {
    const { db } = await import('@otonom-fabrika/database');
    vi.spyOn(db, 'select').mockImplementationOnce(() => ({
      from: () => ({
        where: () => ({
          limit: async () => [{ id: 'existing-user-id', email: 'existing@test.com' }],
        }),
      }),
    }) as any);

    const input = {
      businessName: 'Yeni İşletme',
      email: 'existing@test.com',
      password: 'password123',
      city: 'İstanbul',
      district: 'Kadıköy',
      specialty: 'Perde Montajı',
    };

    const result = await registerBusinessAction(input);
    expect(result.error).toBe('Bu e-posta adresi zaten başka bir işletmeye kayıtlı.');
  });
});
