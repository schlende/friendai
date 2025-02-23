import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { eq } from 'drizzle-orm';

// Validation schema for login payload
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, 'Password is required'),
});

export const POST: RequestHandler = async ({ request, cookies }) => {
  try {
    // Parse and validate the request body
    const body = await request.json();
    const validatedData = loginSchema.parse(body);

    // Find user by email
    const user = await db.instance.select().from(users).where(
      eq(users.email, validatedData.email)
    ).limit(1);

    if (user.length === 0) {
      return json({
        error: 'Invalid credentials. Please try again.'
      }, { status: 400 });
    }

    // Verify password
    const validPassword = await bcrypt.compare(validatedData.password, user[0].password);
    if (!validPassword) {
      return json({
        error: 'Invalid credentials. Please try again.'
      }, { status: 400 });
    }

    // Create session data
    const sessionData = {
      id: user[0].id,
      username: user[0].username,
      email: user[0].email
    };

    // Set secure HTTP-only cookie
    cookies.set('session', JSON.stringify(sessionData), {
      path: '/',
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    // console.log("Set the session cookie");
    
    return json({
      success: true,
      message: 'Login successful. Redirecting...',
      user: sessionData
    });

  } catch (error) {
    // Handle validation errors
    if (error instanceof z.ZodError) {
      return json({
        error: 'Invalid input',
        details: error.errors
      }, { status: 400 });
    }

    // Handle other errors
    console.error('Login error:', error);
    return json({
      error: 'An error occurred during login'
    }, { status: 500 });
  }
}; 