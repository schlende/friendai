import { expect, test } from '@playwright/test';

test.describe('Friends List API', () => {
  const REGISTER_URL = '/api/auth/register';
  const LOGIN_URL = '/api/auth/login';
  const FRIENDS_URL = '/api/friend/index';

  // Helper to create a test user and login
  async function setupTestUser(request: any) {
    const testUser = {
      username: 'friendtest',
      fullName: 'Friend Test User',
      email: 'friendtest@example.com',
      password: 'testpassword123',
    };

    // Register user
    await request.post(REGISTER_URL, {
      data: testUser
    });

    // Login to get session
    const loginResponse = await request.post(LOGIN_URL, {
      data: {
        email: testUser.email,
        password: testUser.password
      }
    });

    const data = await loginResponse.json();
    return { user: data.user, sessionCookie: loginResponse.headers()['set-cookie'] };
  }

  test('lists friends for authenticated user', async ({ request }) => {
    // Setup test user and get session
    const { sessionCookie } = await setupTestUser(request);

    // Add a test friend
    const newFriend = {
      birthday: '1990-01-01',
      interests: 'Testing, Programming',
      priority: 'high'
    };

    await request.post(FRIENDS_URL, {
      data: newFriend,
      headers: {
        Cookie: sessionCookie
      }
    });

    // Get friends list
    const response = await request.get(FRIENDS_URL, {
      headers: {
        Cookie: sessionCookie
      }
    });

    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(Array.isArray(data.friends)).toBeTruthy();
    
    const friend = data.friends[0];
    expect(friend).toBeDefined();
    expect(friend.interests).toBe(newFriend.interests);
    expect(friend.priority).toBe(newFriend.priority);
  });

  test('requires authentication', async ({ request }) => {
    const response = await request.get(FRIENDS_URL);
    
    expect(response.status()).toBe(401);
    const data = await response.json();
    expect(data.error).toBe('Authentication required');
  });

  test('adds new friend successfully', async ({ request }) => {
    const { sessionCookie } = await setupTestUser(request);

    const newFriend = {
      name: 'Friend Test User',
      birthday: '1990-01-01T00:00:00.000Z',
      interests: 'Testing, Programming',
      priority: 'high'
    };

    const response = await request.post(FRIENDS_URL, {
      data: newFriend,
      headers: {
        Cookie: sessionCookie
      }
    });

    const body = await response.json();
    console.log(JSON.stringify(body));

    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(data.success).toBeTruthy();
    expect(data.friend).toBeDefined();
    expect(data.friend.interests).toBe(newFriend.interests);
    expect(data.friend.priority).toBe(newFriend.priority);
  });

  test('validates friend data on creation', async ({ request }) => {
    const { sessionCookie } = await setupTestUser(request);

    const invalidFriend = {
      priority: 'invalid_priority' // Should be low, med, or high
    };

    const response = await request.post(FRIENDS_URL, {
      data: invalidFriend,
      headers: {
        Cookie: sessionCookie
      }
    });

    expect(response.ok()).toBeFalsy();
    expect(response.status()).toBe(400);
    const data = await response.json();
    expect(data.error).toBe('Invalid input');
  });
}); 