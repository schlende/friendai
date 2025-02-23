import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { friends } from '$lib/server/db/schema';
import { z } from 'zod';
import { eq, and } from 'drizzle-orm';

// Validation schema for friend updates
const friendUpdateSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  birthday: z.string().optional(),
  interests: z.string().optional(),
  priority: z.enum(['low', 'med', 'high']).default('med'),
}).strict();

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

export const GET: RequestHandler = async ({ params, cookies }) => {
  const user = await getUserFromSession(cookies);
  if (!user) {
    return json({ error: 'Authentication required' }, { status: 401 });
  }

  try {
    const friend = await db.select().from(friends).where(
      and(
        eq(friends.id, parseInt(params.id)),
        eq(friends.userId, user.id)
      )
    ).limit(1);

    if (friend.length === 0) {
      return json({ error: 'Friend not found' }, { status: 404 });
    }

    return json({ friend: friend[0] });
  } catch (error) {
    console.error('Error fetching friend:', error);
    return json({ error: 'Failed to fetch friend' }, { status: 500 });
  }
};

export const PUT: RequestHandler = async ({ params, request, cookies }) => {
  const user = await getUserFromSession(cookies);
  if (!user) {
    return json({ error: 'Authentication required' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const validatedData = friendUpdateSchema.parse(body);

    const updatedFriend = await db.update(friends)
      .set({
        ...validatedData,
        birthday: validatedData.birthday ? new Date(validatedData.birthday) : undefined,
      })
      .where(
        and(
          eq(friends.id, parseInt(params.id)),
          eq(friends.userId, user.id)
        )
      )
      .returning();

    if (updatedFriend.length === 0) {
      return json({ error: 'Friend not found' }, { status: 404 });
    }

    return json({
      success: true,
      message: 'Friend updated successfully',
      friend: updatedFriend[0]
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return json({
        error: 'Invalid input',
        details: error.errors
      }, { status: 400 });
    }
    console.error('Error updating friend:', error);
    return json({ error: 'Failed to update friend' }, { status: 500 });
  }
};

export const DELETE: RequestHandler = async ({ params, cookies }) => {
  const user = await getUserFromSession(cookies);
  if (!user) {
    return json({ error: 'Authentication required' }, { status: 401 });
  }

  try {
    const deletedFriend = await db.delete(friends)
      .where(
        and(
          eq(friends.id, parseInt(params.id)),
          eq(friends.userId, user.id)
        )
      )
      .returning();

    if (deletedFriend.length === 0) {
      return json({ error: 'Friend not found' }, { status: 404 });
    }

    return json({
      success: true,
      message: 'Friend removed successfully'
    });
  } catch (error) {
    console.error('Error deleting friend:', error);
    return json({ error: 'Failed to delete friend' }, { status: 500 });
  }
}; 