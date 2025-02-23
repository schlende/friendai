import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { eq, or } from 'drizzle-orm';
import type { PgSelect } from 'drizzle-orm/pg-core';

// Validation schema for registration payload
const registerSchema = z.object({
  username: z.string().min(3).max(50),
  fullName: z.string().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(8).max(100),
  interests: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
});

export const POST: RequestHandler = async ({ request }) => {

  return json({
    error: "Not valid",
    details: "Can't register new users"
  }, { status: 401 });

  try {
    // Parse and validate the request body
    const body = await request.json();
    const validatedData = registerSchema.parse(body);

    // Check if user already exists
    const existingUser = await db.instance.select().from(users).where(
      or(
        eq(users.email, validatedData.email),
        eq(users.username, validatedData.username)
      )
    ).limit(1);

    if (existingUser.length > 0) {
      return json({
        error: 'User with this email or username already exists'
      }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    // Create the user
    const newUser = await db.instance.insert(users).values({
      ...validatedData,
      password: hashedPassword,
    }).returning();

    // Return success response without sensitive data
    return json({
      success: true,
      message: "Registration successful. Welcome aboard!",
      user: {
        id: newUser[0].id,
        username: newUser[0].username,
        email: newUser[0].email
      }
    }, { status: 201 });

  } catch (error) {
    // Handle validation errors
    if (error instanceof z.ZodError) {
      return json({
        error: "Invalid input",
        details: error.errors
      }, { status: 400 });
    }

    // Handle other errors
    console.error('Registration error:', error);
    return json({
      error: "An error occurred during registration"
    }, { status: 500 });
  }
};
