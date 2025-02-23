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

    // Create a pool of recommendation ideas
    const recommendationIdeas = [
      {
        idea: "Go hiking at Monkey Mountain",
        reason: "You both enjoy hiking and outdoor activities",
        invitetext: "Hey, would you like to go hiking at Monkey Mountain this weekend? The weather looks perfect!"
      },
      {
        idea: "Visit the local night market",
        reason: "Great way to experience local culture together",
        invitetext: "Want to explore the night market together? We could try some street food and check out the vendors!"
      },
      {
        idea: "Photography walk in old town",
        reason: "You both have an interest in photography",
        invitetext: "The light in the old town is amazing in the late afternoon. Want to do a photo walk?"
      },
      {
        idea: "Coffee tasting at a local roastery",
        reason: "Shared interest in coffee culture",
        invitetext: "There's this great coffee roastery I discovered. Would you be interested in doing a tasting session?"
      },
      {
        idea: "Visit the Dome of Light at Formosa Boulevard",
        reason: "You both appreciate light shows and art",
        invitetext: "Have you seen the Dome of Light? It's spectacular! Want to check it out together?"
      },
      {
        idea: "Sunset photography session at Love River",
        reason: "Combines photography and outdoor interests",
        invitetext: "The sunsets at Love River are amazing for photos. Want to capture some shots together?"
      },
      {
        idea: "Visit a traditional tea house",
        reason: "Cultural experience that pairs well with coffee interests",
        invitetext: "Would you like to experience a traditional Taiwanese tea ceremony with me?"
      },
      {
        idea: "Join a local photography meetup",
        reason: "Shared interest in photography and meeting people",
        invitetext: "There's a photography meetup this weekend. Want to join together?"
      },
      {
        idea: "Morning hike and coffee",
        reason: "Combines hiking and coffee interests",
        invitetext: "How about an early morning hike followed by coffee at that new café?"
      },
      {
        idea: "Visit Cijin Island",
        reason: "Great for photography and outdoor exploration",
        invitetext: "Want to take the ferry to Cijin Island? We could explore and take some great photos!"
      },
      {
        idea: "Check out the Pier-2 Art Center",
        reason: "Interesting venue for photography and culture",
        invitetext: "Have you been to Pier-2 Art Center? They have some amazing installations right now!"
      },
      {
        idea: "Visit local temples at night",
        reason: "Great for night photography and cultural experience",
        invitetext: "The temples are beautifully lit at night. Want to do some night photography?"
      },
      {
        idea: "Join a weekend hiking group",
        reason: "Matches hiking interests and social activities",
        invitetext: "I found a great hiking group that meets on weekends. Want to join their next trip?"
      },
      {
        idea: "Explore Dragon and Tiger Pagodas",
        reason: "Perfect for photography and cultural interests",
        invitetext: "Would you like to visit the Dragon and Tiger Pagodas? They're amazing for photos!"
      },
      {
        idea: "Visit a local coffee farm",
        reason: "Combines coffee interest with outdoor activity",
        invitetext: "There's a coffee farm in the mountains that offers tours. Interested in checking it out?"
      },
      {
        idea: "Attend a cultural festival",
        reason: "Great opportunity for photography and cultural experience",
        invitetext: "There's a cultural festival coming up. Want to go together and take some photos?"
      },
      {
        idea: "Explore urban photography spots",
        reason: "Perfect for street photography enthusiasts",
        invitetext: "I know some great spots for urban photography. Want to explore them together?"
      },
      {
        idea: "Visit the Kaohsiung Museum of Fine Arts",
        reason: "Combines cultural interests with photography opportunities",
        invitetext: "Would you like to visit the art museum? They have a new exhibition that looks interesting!"
      },
      {
        idea: "Sunset viewing at 85 Sky Tower",
        reason: "Great for photography and city views",
        invitetext: "Want to catch the sunset from 85 Sky Tower? The views are incredible!"
      },
      {
        idea: "Join a coffee brewing workshop",
        reason: "Perfect for coffee enthusiasts",
        invitetext: "There's a coffee brewing workshop this weekend. Want to learn some new techniques together?"
      }
    ];

    // Create recommendations
    const recommendations = createdFriends.map(friend => ({
      userId: user.id,
      friendId: friend.id,
      reason: 'firstcontact' as const,
      status: 'new' as const,
      recommendations: JSON.stringify(
        recommendationIdeas
          .sort(() => Math.random() - 0.5)
          .slice(0, 4)
      )
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



