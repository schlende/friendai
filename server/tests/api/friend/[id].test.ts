import { expect, test } from '@playwright/test';

test.describe('Friend Detail API', () => {
  const REGISTER_URL = '/api/auth/register';
  const LOGIN_URL = '/api/auth/login';
  const FRIENDS_URL = '/api/friend/index';

  // Helper to create a test user and login
  async function setupTestUser(request: any) {
    const testUser = {
      username: 'frienddetailtest',
      fullName: 'Friend Detail Test User',
      howwemet: 'At a dance class',
      email: 'frienddetail@example.com',
      password: 'testpassword123',
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

  // Helper to create a test friend and return its ID
  async function createTestFriend(request: any, sessionCookie: string) {
    const newFriend = {
      name: 'Test Friend',
      birthday: '1990-01-01T00:00:00.000Z',
      interests: 'Testing, Programming',
      priority: 'high'
    };

    const response = await request.post(FRIENDS_URL, {
      data: newFriend,
      headers: { Cookie: sessionCookie }
    });

    const data = await response.json();
    return data.friend.id;
  }

  test('gets friend details', async ({ request }) => {
    const { sessionCookie } = await setupTestUser(request);
    const friendId = await createTestFriend(request, sessionCookie);

    const response = await request.get(`/api/friend/${friendId}`, {
      headers: { Cookie: sessionCookie }
    });

    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(data.friend).toBeDefined();
    expect(data.friend.name).toBe('Test Friend');
    expect(data.friend.interests).toBe('Testing, Programming');
    expect(data.friend.priority).toBe('high');
  });

  test('updates friend details', async ({ request }) => {
    const { sessionCookie } = await setupTestUser(request);
    const friendId = await createTestFriend(request, sessionCookie);

    const updates = {
      name: 'Updated Friend Name',
      interests: 'Updated Interests',
      priority: 'low'
    };

    const response = await request.put(`/api/friend/${friendId}`, {
      data: updates,
      headers: { Cookie: sessionCookie }
    });

    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(data.success).toBeTruthy();
    expect(data.friend.name).toBe(updates.name);
    expect(data.friend.interests).toBe(updates.interests);
    expect(data.friend.priority).toBe(updates.priority);
  });

  test('deletes friend', async ({ request }) => {
    const { sessionCookie } = await setupTestUser(request);
    const friendId = await createTestFriend(request, sessionCookie);

    const response = await request.delete(`/api/friend/${friendId}`, {
      headers: { Cookie: sessionCookie }
    });

    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(data.success).toBeTruthy();
    expect(data.message).toBe('Friend removed successfully');

    // Verify friend is deleted
    const getResponse = await request.get(`/api/friend/${friendId}`, {
      headers: { Cookie: sessionCookie }
    });
    expect(getResponse.status()).toBe(404);
  });

  test('requires authentication', async ({ request }) => {
    const response = await request.get('/api/friend/1');
    expect(response.status()).toBe(401);
    const data = await response.json();
    expect(data.error).toBe('Authentication required');
  });

  test('validates friend updates', async ({ request }) => {
    const { sessionCookie } = await setupTestUser(request);
    const friendId = await createTestFriend(request, sessionCookie);

    const invalidUpdates = {
      name: '', // Empty name should be invalid
      priority: 'invalid' // Invalid priority
    };

    const response = await request.put(`/api/friend/${friendId}`, {
      data: invalidUpdates,
      headers: { Cookie: sessionCookie }
    });

    expect(response.ok()).toBeFalsy();
    expect(response.status()).toBe(400);
    const data = await response.json();
    expect(data.error).toBe('Invalid input');
  });

  test('prevents accessing other users friends', async ({ request }) => {
    // Create first user and friend
    const { sessionCookie: cookie1 } = await setupTestUser(request);
    const friendId = await createTestFriend(request, cookie1);

    // Create second user
    const testUser2 = {
      username: 'otheruser',
      fullName: 'Other User',
      email: 'other@example.com',
      password: 'testpassword123',
    };
    await request.post(REGISTER_URL, { data: testUser2 });
    const loginResponse = await request.post(LOGIN_URL, {
      data: {
        email: testUser2.email,
        password: testUser2.password
      }
    });
    const cookie2 = loginResponse.headers()['set-cookie'];

    // Try to access first user's friend with second user's session
    const response = await request.get(`/api/friend/${friendId}`, {
      headers: { Cookie: cookie2 }
    });

    expect(response.status()).toBe(404);
    const data = await response.json();
    expect(data.error).toBe('Friend not found');
  });
}); 