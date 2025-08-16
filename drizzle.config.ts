import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './server/database/schema.ts',
  out: './server/database/drizzle',
  dialect: 'sqlite',
  dbCredentials: {
    url: 'file:database.sqlite',
  }
})
