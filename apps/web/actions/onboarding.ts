'use server';
import { db, tenants, users, pages } from '@otonom-fabrika/database';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { generateParametricBlocks } from '@/services/ai';
import { revalidatePath } from 'next/cache';

export interface OnboardingInput {
  businessName: string;
  email: string;
  password: string;
  city: string;
  district: string;
  specialty: string;
  phone?: string;
}

function slugify(text: string): string {
  const trMap: Record<string, string> = {
    ç: 'c', Ç: 'c', ğ: 'g', Ğ: 'g', ı: 'i', İ: 'i',
    ö: 'o', Ö: 'o', ş: 's', Ş: 's', ü: 'u', Ü: 'u',
  };
  let str = text;
  for (const key in trMap) {
    str = str.replace(new RegExp(key, 'g'), trMap[key]);
  }
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export async function registerBusinessAction(input: OnboardingInput) {
  try {
    const { businessName, email, password, city, district, specialty, phone } = input;

    if (!businessName || !email || !password || !city || !district || !specialty) {
      return { error: 'Lütfen tüm zorunlu alanları doldurunuz.' };
    }

    let slug = slugify(businessName);
    if (!slug) slug = `isletme-${Date.now()}`;

    // Check if slug already exists
    const existingTenant = await db.select().from(tenants).where(eq(tenants.slug, slug)).limit(1);
    if (existingTenant.length > 0) {
      slug = `${slug}-${Math.floor(1000 + Math.random() * 9000)}`;
    }

    // 1. Run AI Parametric Content Engine
    const { blocks, seo } = await generateParametricBlocks({
      businessName,
      city,
      district,
      specialty,
      phone,
      email,
    });

    // 2. Hash Password
    const passwordHash = await bcrypt.hash(password, 10);

    // 3. Determine Sector Enum
    const specLower = specialty.toLowerCase();
    let sector: 'curtain' | 'restaurant' | 'auto' = 'curtain';
    if (specLower.includes('oto') || specLower.includes('araç')) sector = 'auto';
    if (specLower.includes('restoran') || specLower.includes('yemek')) sector = 'restaurant';

    // 4. Create Tenant DB Record
    const [newTenant] = await db
      .insert(tenants)
      .values({
        slug,
        name: businessName,
        sector,
        plan: 'free',
        active: true,
        config: { city, district, specialty, phone, email },
      })
      .returning();

    // 5. Create Owner User DB Record
    await db.insert(users).values({
      tenantId: newTenant.id,
      email: email.toLowerCase(),
      passwordHash,
      role: 'owner',
    });

    // 6. Create Home Page with AI Generated Blocks
    await db.insert(pages).values({
      tenantId: newTenant.id,
      slug: 'home',
      title: seo.title,
      blocks,
      seo,
      published: true,
    });

    revalidatePath(`/${slug}`);
    revalidatePath(`/admin/pages`);

    return { success: true, slug, tenantName: businessName };
  } catch (err: any) {
    console.error('Onboarding Action Error:', err);
    return { error: err.message || 'Kayıt işlemi sırasında bir hata oluştu.' };
  }
}
