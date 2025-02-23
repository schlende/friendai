import { expect, test } from '@playwright/test';

test.describe('Recommend People API', () => {
  const REGISTER_URL = '/api/auth/register';
  const LOGIN_URL = '/api/auth/login';
  const FRIENDS_URL = '/api/friend/index';
  const RECOMMEND_PEOPLE_URL = '/api/recommendpeople';

  // Helper to create a test user and login
  async function setupTestUser(request: any) {
    const testUser = {
      username: 'rectest',
      fullName: 'Recommendations Test User',
      email: 'rectest@example.com',
      password: 'testpassword123',
      interests: 'hiking, photography, coffee'
    };

    await request.post(REGISTER_URL, { data: testUser });
    const loginResponse = await request.post(LOGIN_URL, {
      data: {
        email: testUser.email,
        password: testUser.password
      }
    });

    const data = await loginResponse.json();
    return { user: data.user, sessionCookie: loginResponse.headers()['set-cookie'] };
  }

  // Helper to create test friends using the API
  async function createTestFriends(request: any, sessionCookie: string) {
    const testFriends = [
      {
        name: 'Hiking Friend',
        birthday: '1990-01-01T00:00:00.000Z',
        interests: 'hiking, outdoor photography, nature',
        priority: 'high' as const
      },
      {
        name: 'Coffee Friend',
        birthday: '1992-01-01T00:00:00.000Z',
        interests: 'coffee, cafes, reading',
        priority: 'med' as const
      },
      {
        name: 'Other Friend',
        birthday: '1991-01-01T00:00:00.000Z',
        interests: 'gaming, movies',
        priority: 'low' as const
      }
    ];

    const createdFriends = await Promise.all(
      testFriends.map(friend => 
        request.post(FRIENDS_URL, {
          data: friend,
          headers: { Cookie: sessionCookie }
        }).then((res: { json(): Promise<{ friend: any }> }) => res.json())
      )
    );

    return createdFriends.map(res => res.friend);
  }

  test('recommends relevant friends based on activity', async ({ request }) => {
    const { sessionCookie } = await setupTestUser(request);
    await createTestFriends(request, sessionCookie);

    const response = await request.post(RECOMMEND_PEOPLE_URL, {
      data: {
        text: "I'm going hiking this afternoon in the mountains"
      },
      headers: { Cookie: sessionCookie }
    });

    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(Array.isArray(data.friends)).toBeTruthy();
    expect(data.count).toBeGreaterThan(0);

    // First recommended friend should be the hiking friend
    expect(data.friends[0].name).toBe('Hiking Friend');
    expect(data.friends[0].matchReason).toBeDefined();
  });

  test('requires authentication', async ({ request }) => {
    const response = await request.post(RECOMMEND_PEOPLE_URL, {
      data: {
        text: "Let's grab coffee"
      }
    });

    expect(response.status()).toBe(401);
    const data = await response.json();
    expect(data.error).toBe('Authentication required');
  });

  test('handles empty friend list', async ({ request }) => {
    const { sessionCookie } = await setupTestUser(request);

    const response = await request.post(RECOMMEND_PEOPLE_URL, {
      data: {
        text: "Let's go hiking"
      },
      headers: { Cookie: sessionCookie }
    });

    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(data.friends).toEqual([]);
    expect(data.count).toBe(0);
  });

  test('validates input text', async ({ request }) => {
    const { sessionCookie } = await setupTestUser(request);

    const response = await request.post(RECOMMEND_PEOPLE_URL, {
      data: {
        text: "" // Empty text should be invalid
      },
      headers: { Cookie: sessionCookie }
    });

    expect(response.ok()).toBeFalsy();
    expect(response.status()).toBe(400);
    const data = await response.json();
    expect(data.error).toBe('Invalid input');
  });

  test('recommends multiple relevant friends', async ({ request }) => {
    const { sessionCookie } = await setupTestUser(request);
    await createTestFriends(request, sessionCookie);

    const response = await request.post(RECOMMEND_PEOPLE_URL, {
      data: {
        text: "Looking for someone to get coffee and take photos with"
      },
      headers: { Cookie: sessionCookie }
    });

    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(data.count).toBeGreaterThan(1);
    
    // Should include both hiking friend (photography) and coffee friend
    const friendNames = data.friends.map((f: any) => f.name);
    expect(friendNames).toContain('Hiking Friend');
    expect(friendNames).toContain('Coffee Friend');
  });
}); 