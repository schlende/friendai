import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { dailyRecommended } from '$lib/server/db/schema';
import { and, eq, gte } from 'drizzle-orm';
import { getUserFromSession } from '$lib/utils';
import { z } from 'zod';

// Validation schema for recommendation updates
const recommendationSchema = z.object({
  status: z.enum(['new', 'used', 'dismissed']),
});

export const GET: RequestHandler = async ({ cookies }) => {
  const user = await getUserFromSession(cookies);
  if (!user) {
    return json({ error: 'Authentication required' }, { status: 401 });
  }

  try {
    // Get recommendations from the past 2 days
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

    const recommendations = await db
      .select()
      .from(dailyRecommended)
      .where(
        and(
          eq(dailyRecommended.userId, user.id),
          gte(dailyRecommended.datetime, twoDaysAgo)
        )
      )
      .orderBy(dailyRecommended.datetime);

    return json({ 
      recommendations,
      count: recommendations.length
    });

  } catch (error) {
    console.error('Error fetching recommendations:', error);
    return json({ error: 'Failed to fetch recommendations' }, { status: 500 });
  }
}; 