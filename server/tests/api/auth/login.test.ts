import { expect, test } from '@playwright/test';

test.describe('Login API', () => {
  const LOGIN_URL = '/api/auth/login';
  const REGISTER_URL = '/api/auth/register';

  // Helper to register a test user
  async function registerTestUser(request: any) {
    const testUser = {
      username: 'logintest',
      fullName: 'Login Test User',
      email: 'logintest@example.com',
      password: 'testpassword123',
    };

    await request.post(REGISTER_URL, {
      data: testUser
    });

    return testUser;
  }

  test('successfully logs in a user', async ({ request, context }) => {
    // First register a test user
    const testUser = await registerTestUser(request);

    // Attempt login
    const response = await request.post(LOGIN_URL, {
      data: {
        email: testUser.email,
        password: testUser.password
      }
    });

    console.log(response.status() + " is the response status");

    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(data.success).toBeTruthy();
    expect(data.message).toBe('Login successful. Redirecting...');
    expect(data.user.email).toBe(testUser.email);
    expect(data.user.username).toBe(testUser.username);
    expect(data.user.password).toBeUndefined();

    // Verify cookie was set
    // const cookies = await context.cookies();

    // console.log(cookies + " is the cookies");

    // const sessionCookie = cookies.find(c => c.name === 'session');
    // expect(sessionCookie).toBeDefined();
    // expect(sessionCookie?.httpOnly).toBeTruthy();
    // expect(sessionCookie?.secure).toBeTruthy();
  });

  test('rejects invalid credentials', async ({ request }) => {
    const response = await request.post(LOGIN_URL, {
      data: {
        email: 'wrong@example.com',
        password: 'wrongpassword'
      }
    });

    expect(response.ok()).toBeFalsy();
    expect(response.status()).toBe(400);
    const data = await response.json();
    expect(data.error).toBe('Invalid credentials. Please try again.');
  });

  test('validates required fields', async ({ request }) => {
    const response = await request.post(LOGIN_URL, {
      data: {
        email: 'notanemail',
        password: ''
      }
    });

    expect(response.ok()).toBeFalsy();
    expect(response.status()).toBe(400);
    const data = await response.json();
    expect(data.error).toBe('Invalid input');
    expect(data.details).toBeDefined();
  });
}); 