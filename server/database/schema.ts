import { sqliteTable } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', (t) => ({
  id: t.integer().primaryKey({ autoIncrement: true }),
  email: t.text().notNull().unique(),
  name: t.text().notNull(),
  password: t.text().notNull(),
  created_at: t.integer({ mode: 'timestamp_ms' }).$defaultFn(() => new Date()).notNull(),
  updated_at: t.integer({ mode: 'timestamp_ms' }).$defaultFn(() => new Date()).$onUpdateFn(() => new Date()).notNull(),
}));
