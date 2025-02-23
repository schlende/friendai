import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import { DATABASE_URL } from '$env/static/private';

// Get DATABASE_URL from environment for scripts
if (!DATABASE_URL) {
  throw new Error('DATABASE_URL is not set');
}

export function getDb() {
  const client = postgres(DATABASE_URL, {
    prepare: false,
    max: 1,
    idle_timeout: 20
  });
  
  return drizzle(client, { schema });
}

export const db = {
  get instance() {
    return getDb();
  }
};
