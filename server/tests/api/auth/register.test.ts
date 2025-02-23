import { expect, test } from '@playwright/test';

test.describe('Registration API', () => {
  const REGISTER_URL = '/api/auth/register';

  test('successfully registers a new user', async ({ request }) => {
    const newUser = {
      username: 'testuser',
      fullName: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      interests: 'testing',
      city: 'Test City',
      country: 'Test Country'
    };

    const response = await request.post(REGISTER_URL, {
      data: newUser
    });

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(201);

    const data = await response.json();
    expect(data.success).toBeTruthy();
    expect(data.message).toBe('Registration successful. Welcome aboard!');
    expect(data.user).toMatchObject({
      username: newUser.username,
      email: newUser.email
    });
    expect(data.user.id).toBeDefined();
    // Ensure password is not returned
    expect(data.user.password).toBeUndefined();
  });

  test('prevents duplicate email registration', async ({ request }) => {
    const duplicateUser = {
      username: 'uniqueuser',
      fullName: 'Another User',
      email: 'test@example.com', // Same email as previous test
      password: 'password123'
    };

    const response = await request.post(REGISTER_URL, {
      data: duplicateUser
    });

    expect(response.ok()).toBeFalsy();
    expect(response.status()).toBe(400);
    
    const data = await response.json();
    expect(data.error).toBe('User with this email or username already exists');
  });

  test('validates required fields', async ({ request }) => {
    const invalidUser = {
      username: 'te', // too short
      email: 'invalid-email',
      password: '123' // too short
    };

    const response = await request.post(REGISTER_URL, {
      data: invalidUser
    });

    expect(response.ok()).toBeFalsy();
    expect(response.status()).toBe(400);
    
    const data = await response.json();
    expect(data.error).toBe('Invalid input');
    expect(data.details).toBeDefined();
  });
}); 