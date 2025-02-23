import { expect, test } from '@playwright/test';

test.describe('Profile Update API', () => {
  const REGISTER_URL = '/api/auth/register';
  const LOGIN_URL = '/api/auth/login';
  const PROFILE_URL = '/api/profile';

  // Helper to create and login a test user
  async function setupTestUser(request: any) {
    const testUser = {
      username: 'profiletest',
      fullName: 'Profile Test User',
      email: 'profiletest@example.com',
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

  test('successfully updates user profile', async ({ request }) => {
    const { sessionCookie } = await setupTestUser(request);

    const updates = {
      fullName: 'Updated Name',
      interests: 'Coding, Testing',
      address: '123 Test St',
      city: 'Test City',
      country: 'Test Country'
    };

    const response = await request.put(PROFILE_URL, {
      data: updates,
      headers: {
        Cookie: sessionCookie
      }
    });

    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(data.success).toBeTruthy();
    expect(data.user).toBeDefined();
    expect(data.user.fullName).toBe(updates.fullName);
    expect(data.user.interests).toBe(updates.interests);
    expect(data.user.address).toBe(updates.address);
    expect(data.user.city).toBe(updates.city);
    expect(data.user.country).toBe(updates.country);
  });

  test('requires authentication', async ({ request }) => {
    const updates = {
      fullName: 'Updated Name'
    };

    const response = await request.put(PROFILE_URL, {
      data: updates
    });

    expect(response.status()).toBe(401);
    const data = await response.json();
    expect(data.error).toBe('Authentication required');
  });

  test('validates update data', async ({ request }) => {
    const { sessionCookie } = await setupTestUser(request);

    const invalidUpdates = {
      fullName: '', // Empty name should be invalid
      email: 'invalid-email' // Invalid email format
    };

    const response = await request.put(PROFILE_URL, {
      data: invalidUpdates,
      headers: {
        Cookie: sessionCookie
      }
    });

    expect(response.ok()).toBeFalsy();
    expect(response.status()).toBe(400);
    const data = await response.json();
    expect(data.error).toBe('Invalid input');
  });

  test('prevents updating sensitive fields', async ({ request }) => {
    const { sessionCookie } = await setupTestUser(request);

    const updates = {
      password: 'newpassword123', // Should not be allowed via profile update
      id: 'some-other-id' // Should not be allowed to change ID
    };

    const response = await request.put(PROFILE_URL, {
      data: updates,
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