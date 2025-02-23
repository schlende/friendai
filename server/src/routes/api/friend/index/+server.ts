import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { friends } from '$lib/server/db/schema';
import { z } from 'zod';
import { eq, sql } from 'drizzle-orm';

// Validation schema for new friend
const friendSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  birthday: z.string().optional(),
  interests: z.string().optional(),
  priority: z.enum(['low', 'med', 'high']).default('med'),
});

// Helper to get user from session
async function getUserFromSession(cookies: any) {
  const sessionCookie = cookies.get('session');
  if (!sessionCookie) return null;
  
  try {
    return JSON.parse(sessionCookie);
  } catch {
    return null;
  }
}

export const GET: RequestHandler = async ({ cookies }) => {
  const user = await getUserFromSession(cookies);
  
  if (!user) {
    return json({ error: 'Authentication required' }, { status: 401 });
  }

  try {
    const friendsList = await db.select().from(friends).where(
      eq(friends.userId, user.id)
    );

    return json({ friends: friendsList });
  } catch (error) {
    console.error('Error fetching friends:', error);
    return json({ error: 'Failed to fetch friends' }, { status: 500 });
  }
};

export const POST: RequestHandler = async ({ request, cookies }) => {
  const user = await getUserFromSession(cookies);

  if (!user) {
    return json({ error: 'Authentication required' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const validatedData = friendSchema.parse(body);

    const newFriend = await db.insert(friends).values({
      name: validatedData.name,
      userId: user.id,
      birthday: validatedData.birthday ? new Date(validatedData.birthday) : null,
      interests: validatedData.interests,
      priority: validatedData.priority
    }).returning();

    return json({
      success: true,
      friend: newFriend[0]
    }, { status: 201 });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return json({
        error: 'Invalid input',
        details: error.errors
      }, { status: 400 });
    }

    console.error('Error creating friend:', error);
    return json({ error: 'Failed to create friend' }, { status: 500 });
  }
}; 