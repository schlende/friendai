// This is a utility script to seed the database with a user, friends and recommendations

import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { users, friends, dailyRecommended } from '$lib/server/db/schema';
import bcrypt from 'bcryptjs';

export const GET: RequestHandler = async () => {
  try {
    const userid = '0e6168df-8198-4ee3-8202-eef10eb84be9';
    
    // Delete all existing data
    await db.instance.delete(friends);
    await db.instance.delete(dailyRecommended);
    await db.instance.delete(users);

    // Create test user
    const hashedPassword = await bcrypt.hash('testpassword123', 10);
    const [user] = await db.instance.insert(users).values({
      id: userid,
      username: 'walt',
      fullName: 'Walt',
      email: 'walt@testing.com',
      password: hashedPassword,
      interests: 'hiking, photography, coffee, light shows',
      city: 'Kaohsiung',
      country: 'Taiwan'
    }).returning();

    console.log('Created wendall user:', user.username);

    // Create test friends
    const testFriends = [
      {
        userId: user.id,
        name: '金華',
        howwemet: 'Met at a hiking meetup',
        interests: 'hiking, outdoor photography, nature',
        priority: 'high' as const
      },
      {
        userId: user.id,
        name: 'Bob Ronby',
        howwemet: 'Met at a local coffee shop',
        interests: 'coffee, cafes, reading',
        priority: 'med' as const
      },
      {
        userId: user.id,
        name: 'Dan Gilbert',
        howwemet: 'Through mutual friends',
        interests: 'snoring, loud music, loud talking',
        priority: 'low' as const
      }
    ];

    const createdFriends = await db.instance.insert(friends)
      .values(testFriends)
      .returning();

    console.log('Created test friends:', createdFriends.map(f => f.name));

    // Create recommendations
    const recommendations = createdFriends.map(friend => ({
      userId: user.id,
      friendId: friend.id,
      reason: 'firstcontact' as const,
      status: 'new' as const,
      recommendations: JSON.stringify([
        {"idea": "Go to the light festival in Taidong","reason":"You both like Chinese Culture","invitetext":"Hey there Joe, do you wanna go to the light festival in Taidong?"},
        {"idea": "Send a check-in message","reason":"It's quick and easy","invitetext":"Hey there Joe, hope you've been well. We should hang out some time..."}
      ])
    }));

    await db.instance.insert(dailyRecommended)
      .values(recommendations)
      .returning();

    console.log('Created recommendations:', recommendations.length);

    return json({ 
      success: true,
      message: 'Database seeded successfully',
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    });

  } catch (error) {
    console.error('Error seeding database:', error);
    return json({ error: 'Failed to seed database' }, { status: 500 });
  }
};



