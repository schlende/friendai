<script lang="ts">
  interface LoginResponse {
    success: boolean;
    error?: string;
    message?: string;
    user?: {
      id: string;
      username: string;
      email: string;
    };
  }

  let email = 'logintest@example.com';
  let password = 'testpassword123';
  let error = '';
  let successMessage = '';

  async function handleSubmit() {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json() as LoginResponse;

      if (data.success) {
        successMessage = data.message || 'Successfully logged in!';
        error = '';
      } else {
        error = data.error || 'Login failed';
        successMessage = '';
      }
    } catch (e) {
      error = 'An error occurred during login';
      successMessage = '';
    }
  }

  async function handleLogout() {
    try {
      const res = await fetch('/api/auth/logout', {
        method: 'POST'
      });
      const data = await res.json() as LoginResponse;
      if (data.success) {
        successMessage = 'Logged out successfully';
        error = '';
      }
    } catch (e) {
      error = 'Error logging out';
      successMessage = '';
    }
  }
</script>

<div class="login-container">
  <h1>Login</h1>
  
  <form on:submit|preventDefault={handleSubmit} class="login-form">
    {#if error}
      <div class="error">{error}</div>
    {/if}
    {#if successMessage}
      <div class="success">{successMessage}</div>
    {/if}

    <div class="form-group">
      <label for="email">Email</label>
      <input
        type="email"
        id="email"
        bind:value={email}
        required
        placeholder="Enter your email"
      />
    </div>

    <div class="form-group">
      <label for="password">Password</label>
      <input
        type="password"
        id="password"
        bind:value={password}
        required
        placeholder="Enter your password"
      />
    </div>

    <div class="button-group">
      <button type="button" form="loginForm" on:click={handleSubmit}>Login</button>
      <button type="button" class="logout" on:click={handleLogout}>Logout</button>
    </div>
  </form>
</div>

<style>
  .login-container {
    max-width: 400px;
    margin: 2rem auto;
    padding: 2rem;
  }

  .login-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .error {
    color: red;
    margin-bottom: 1rem;
  }

  .success {
    color: green;
    margin-bottom: 1rem;
  }

  input {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  button {
    padding: 0.5rem;
    background: #0066cc;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button:hover {
    background: #0052a3;
  }

  .button-group {
    display: flex;
    gap: 1rem;
  }

  .logout {
    background: #dc3545;
  }

  .logout:hover {
    background: #c82333;
  }
</style>
