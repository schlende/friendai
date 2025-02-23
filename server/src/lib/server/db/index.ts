import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { DATABASE_URL } from '$env/static/private';
import * as schema from './schema';

// Create a new connection function instead of a singleton
export function getDb() {
  // Configure connection for serverless environment
  const client = postgres(DATABASE_URL, {
    prepare: false,
    max: 1,
    idle_timeout: 20
  });
  
  // Create and return new drizzle instance
  return drizzle(client, { schema });
}

// Update the db export to be a getter function
export const db = {
  get instance() {
    return getDb();
  }
};
