import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { friends } from '$lib/server/db/schema';
import { z } from 'zod';
import { eq } from 'drizzle-orm';

// Validation schema
const recommendSchema = z.object({
  text: z.string().min(1, 'Activity description is required')
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

// Helper to calculate relevance score based on interests match
function calculateRelevance(friendInterests: string, activityText: string): number {
  const activityWords = activityText.toLowerCase().split(/[\s,]+/);
  const interestWords = friendInterests.toLowerCase().split(/[\s,]+/);
  
  let matches = 0;
  activityWords.forEach(word => {
    if (interestWords.some(interest => interest.includes(word) || word.includes(interest))) {
      matches++;
    }
  });

  return matches;
}

export const POST: RequestHandler = async ({ request, cookies }) => {
  const user = await getUserFromSession(cookies);
  if (!user) {
    return json({ error: 'Authentication required' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { text } = recommendSchema.parse(body);

    // Get all friends for the user
    const userFriends = await db.select()
      .from(friends)
      .where(eq(friends.userId, user.id));

    // Calculate relevance scores and sort friends
    const recommendedFriends = userFriends
      .map(friend => ({
        ...friend,
        relevance: calculateRelevance(friend.interests || '', text),
        matchReason: friend.interests ? `Shares interests in ${friend.interests}` : undefined
      }))
      .filter(friend => friend.relevance > 0)
      .sort((a, b) => {
        // Sort by relevance first, then by priority
        if (b.relevance !== a.relevance) {
          return b.relevance - a.relevance;
        }
        const priorityOrder = { high: 3, med: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      });

    return json({
      friends: recommendedFriends.map(({ id, name, interests, matchReason }) => ({
        id,
        name,
        interests,
        matchReason
      })),
      count: recommendedFriends.length
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return json({
        error: 'Invalid input',
        details: error.errors
      }, { status: 400 });
    }

    console.error('Error recommending friends:', error);
    return json({ error: 'Failed to get recommendations' }, { status: 500 });
  }
}; 