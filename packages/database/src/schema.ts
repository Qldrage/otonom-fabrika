import { pgTable, uuid, text, jsonb, boolean, timestamp, pgEnum } from 'drizzle-orm/pg-core'

// Sektör enum — her yeni sektörde buraya eklenir
export const sectorEnum = pgEnum('sector', ['curtain', 'restaurant', 'auto'])
export const planEnum = pgEnum('plan', ['free', 'pro', 'enterprise'])
export const roleEnum = pgEnum('role', ['owner', 'editor', 'viewer'])

// ─── TENANTS ──────────────────────────────────────────────
export const tenants = pgTable('tenants', {
  id: uuid('id').defaultRandom().primaryKey(),
  slug: text('slug').unique().notNull(),         // domain.com/[slug]
  customDomain: text('custom_domain').unique(),  // ahmettesisat.com
  name: text('name').notNull(),
  sector: sectorEnum('sector').notNull(),
  plan: planEnum('plan').default('free').notNull(),
  active: boolean('active').default(true).notNull(),

  // Sektöre özgü config — perdeci için örnek:
  // { city: "Ankara", district: "Çankaya", specialty: "stor perde",
  //   phone: "0312...", address: "...", years: 15 }
  config: jsonb('config').default({}).notNull(),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// ─── USERS ────────────────────────────────────────────────
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id').references(() => tenants.id, { onDelete: 'cascade' }).notNull(),
  email: text('email').notNull(),
  passwordHash: text('password_hash').notNull(),
  role: roleEnum('role').default('owner').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

// ─── PAGES ────────────────────────────────────────────────
export const pages = pgTable('pages', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id').references(() => tenants.id, { onDelete: 'cascade' }).notNull(),
  slug: text('slug').notNull(),                  // 'home' | 'products' | 'contact'
  title: text('title').notNull(),
  blocks: jsonb('blocks').default([]).notNull(), // Puck block builder çıktısı
  seo: jsonb('seo').default({}).notNull(),       // AI SEO cache (strict template)
  published: boolean('published').default(false).notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// ─── TENANT TEMPLATES ─────────────────────────────────────
export const tenantTemplates = pgTable('tenant_templates', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id').references(() => tenants.id, { onDelete: 'cascade' }).notNull(),
  templateKey: text('template_key').notNull(),   // 'curtain-v1' | 'restaurant-v1'
  active: boolean('active').default(true).notNull(),
})

// ─── EVENTS (Plugin Socket Log) ───────────────────────────
export const events = pgTable('events', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id').references(() => tenants.id, { onDelete: 'cascade' }).notNull(),
  type: text('type').notNull(),                  // 'contact.form.submitted' | 'order.placed'
  payload: jsonb('payload').default({}).notNull(),
  source: text('source').notNull(),              // Hangi plugin fırlattı
  processed: boolean('processed').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

// ─── PLUGIN REGISTRY ──────────────────────────────────────
export const plugins = pgTable('plugins', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id').references(() => tenants.id, { onDelete: 'cascade' }).notNull(),
  name: text('name').notNull(),
  webhookUrl: text('webhook_url').notNull(),     // Core buraya POST atar
  secret: text('secret').notNull(),              // İmza doğrulama
  events: jsonb('events').default([]).notNull(), // Hangi event'leri dinliyor
  active: boolean('active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})
