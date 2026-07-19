import { pgTable, text, serial, vector, jsonb, timestamp } from 'drizzle-orm/pg-core';

/**
 * Faz 12: Kurumsal Hafıza (Agentic RAG) Veritabanı Şeması
 * Ajanların daha önce yazdıkları kodları ve bu kodların "Vektör" karşılıklarını tutar.
 */
export const agentMemories = pgTable('agent_memories', {
  id: serial('id').primaryKey(),
  
  // Ajanın yazdığı kod bloğu veya öğrenilen bilgi
  content: text('content').notNull(),
  
  // Vektör uzayındaki sayısal karşılığı (768 boyutlu yerel embedding modeli için)
  embedding: vector('embedding', { dimensions: 768 }),
  
  // Kodun hangi dosyaya ait olduğu veya hangi dille yazıldığı gibi meta veriler
  metadata: jsonb('metadata').default('{}'),
  
  createdAt: timestamp('created_at').defaultNow(),
});

/**
 * Orkestratör: Kullanıcı siparişlerini takip eden ana iş akışları
 */
export const workflows = pgTable('workflows', {
  id: serial('id').primaryKey(),
  userPrompt: text('user_prompt').notNull(),
  status: text('status').notNull().default('pending'), // pending, running, awaiting_approval, completed, failed
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

/**
 * GenFSM: Aktörlerin Durable Suspend durumlarını kalıcı tutan tablo
 */
export const actorStates = pgTable('actor_states', {
  id: serial('id').primaryKey(),
  workflowId: serial('workflow_id').references(() => workflows.id),
  actorId: text('actor_id').notNull(),
  fsmState: text('fsm_state').notNull().default('idle'),
  suspendReason: text('suspend_reason'),
  stateData: jsonb('state_data').default('{}'),
  updatedAt: timestamp('updated_at').defaultNow(),
});
