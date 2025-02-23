import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { z } from 'zod';
import { eq } from 'drizzle-orm';
import { getUserFromSession } from '$lib/utils';

// Validation schema for profile updates
const profileSchema = z.object({
  username: z.string().min(1).max(50).optional(),
  fullName: z.string().min(1).max(100).optional(),
  interests: z.string().optional(),
  address: z.string().max(255).optional(),
  city: z.string().max(100).optional(),
  country: z.string().max(100).optional(),
}).strict(); // Prevents additional properties like password or id

export const PUT: RequestHandler = async ({ request, cookies }) => {
  const user = await getUserFromSession(cookies);
  
  if (!user) {
    return json({ error: 'Authentication required' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const validatedData = profileSchema.parse(body);

    const updatedUser = await db.update(users)
      .set(validatedData)
      .where(eq(users.id, user.id))
      .returning();

    return json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        id: updatedUser[0].id,
        username: updatedUser[0].username,
        email: updatedUser[0].email,
        fullName: updatedUser[0].fullName,
        interests: updatedUser[0].interests,
        address: updatedUser[0].address,
        city: updatedUser[0].city,
        country: updatedUser[0].country
      }
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return json({
        error: 'Invalid input',
        details: error.errors
      }, { status: 400 });
    }

    console.error('Profile update error:', error);
    return json({ error: 'Failed to update profile' }, { status: 500 });
  }
}; 