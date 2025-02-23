# Friend AI Server - Product Requirements Document (PRD)

**Version:** 1.0  
**Date:** October 2023  
**Author:** Walt Schlender

---

## 1. Overview

**Friend AI Server** is a web application designed to help users manage their friend network through registration, authentication, friend management, profile updating, and recommendations. The server will be built using SvelteKit with TypeScript, leveraging PostgreSQL via Drizzle ORM for persistent storage. Deployment will be on Cloudflare with the option of utilizing Graphile Worker for background tasks.

**Key Goals:**

- Provide a secure and user-friendly API for user registration and authentication.
- Offer robust endpoints to enable the creation, update, deletion, and retrieval of friend records.
- Enable users to update their personal profile information.
- Deliver recommendations based on user data.
- Use a minimal file structure that is both lean and scalable.

---

## 2. Objectives

- **User Management:** Allow users to securely register and log in.
- **Friend Operations:** Enable users to add, update, delete, and view friends.
- **Profile Management:** Support user modifications to their profile information.
- **Recommendations:** Provide endpoints for fetching and submitting recommendations.
- **Scalable Architecture:** Implement a file structure that minimizes complexity while maintaining clear separations of concern.

---

## 3. Functional Requirements

### 3.1. User Registration and Authentication

- **Registration Endpoint:**
  - **URL:** `/api/auth/register`
  - **Method:** `POST`
  - **Payload:** JSON containing user details (e.g., name, email, password).
  - **Response:** JSON object with a success flag and user identifier if registration succeeds.
  - **Notes:** Validate all inputs and return clear error messages for invalid or missing data.

- **Login Endpoint:**
  - **URL:** `/api/auth/login`
  - **Method:** `POST`
  - **Payload:** JSON with user credentials (e.g., email and password).
  - **Response:** JSON object containing a success flag and an authentication token or session cookie.
  - **Notes:** Ensure secure handling of passwords and proper session management.

### 3.2. Friend Management

- **List and Add Friends Endpoint:**
  - **URL:** `/api/friend/index`
  - **Methods:**
    - `GET` – Return a list of friends associated with the user.
    - `POST` – Accept JSON data to add a new friend.
  - **Response:** 
    - For `GET`: JSON array of friend records.
    - For `POST`: JSON object with details of the added friend and a confirmation message.

- **Friend Detail and Update/Delete Endpoint:**
  - **URL:** `/api/friend/[id]`
  - **Methods:**
    - `GET` – Retrieve details about a specified friend (where `[id]` is the friend identifier).
    - `PUT` – Update specific friend information with a JSON payload.
    - `DELETE` – Remove a friend identified by `[id]`.
  - **Response:** 
    - For `GET`: JSON object with friend details.
    - For `PUT` and `DELETE`: JSON confirmation with a success message.

### 3.3. Profile Management

- **Profile Update Endpoint:**
  - **URL:** `/api/profile`
  - **Method:** `PUT`
  - **Payload:** JSON with fields to update (e.g., display name, bio, avatar URL).
  - **Response:** JSON object returning the updated profile information.
  - **Notes:** Enforce authentication and authorization to ensure profile security.

### 3.4. Recommendations

- **Daily Recommendations Endpoint:**
  - **URL:** `/api/recommendation`
  - **Methods:**
    - `GET` – Fetch a list of recommendations based on user data for the past 2 days.

- **Recommendation Update Endpoint:**
  - **URL:** `/api/recommendation/[id]`
  - **Methods:**
    - `PUT` – Update recommendation status and action date
    - `DELETE` – Remove a recommendation
  - **Payload (for POST):** JSON containing recommendation details.
  - **Response:** 
    - For `PUT/DELETE`: JSON confirmation message.
  - **Notes:** Maintain a consistent response structure for both GET and POST methods.

---

## 4. Database Schema

The Postgres database is structured around three main tables to manage users, friends, and recommendations.

### 4.1. Users Table

- **id:** Primary key, UUID type.
- **username:** Unique string with no spaces.
- **full_name:** User's full name.
- **interests:** Free-form text describing the user's interests.
- **location:**  
  - **address:** Street address.
  - **city:** City of residence.
  - **country:** Country of residence.

### 4.2. Friends Table

- **id:** Primary key, sequential.
- **user_id:** Foreign key linking to the Users table. Make this a reference type to users with onDelete cascade.
- **name** Required - the name of the friend first and last
- **birthday:** Datetime field.
- **interests:** Free-form text describing the friend's interests.
- **lastrecommended:** Datetime marking the last time a recommendation was generated for this friend.
- **priority:** Enum with values `low`, `med`, or `high`.

### 4.3. DailyRecommended Table

- **id:** Primary key, sequential.
- **user_id:** Foreign key indicating who the recommendation belongs to. Make this a reference type to users with onDelete cascade.
- **friend_id:** Foreign key linking to the corresponding friend.
Make this a reference type to friends with onDelete cascade.
- **reason:** Enum indicating the type of recommendation (e.g., `longtimenosee`, `firstcontact`, `strengthenties`).
- **datetime:** Datetime of when the recommendation was generated.
- **actiondate:** Datetime of when the recommended action was taken.
- **status:** Enum with values `new`, `used`, or `dismissed`.
- **recommendations:** JSON containing an array of recommended ideas along with duration classifications (short, med, long).

**Database Connection:**  
Drizzle ORM is used for managing the Postgres database connection, providing a type-safe query builder for robust data operations.

---


## 5. Non-Functional Requirements

- **Performance & Scalability:**  
  The API must efficiently handle increased traffic. Cloudflare deployment and Graphile Worker (for background tasks) should be leveraged as needed.

- **Security:**  
  - Use HTTPS for all endpoints.
  - Secure password handling through hashing.
  - Protect endpoints via authentication and proper authorization.
  - Use JWT token-based authentication or secure cookie sessions.

- **Maintainability:**  
  Clear modular design with a minimal file structure will be followed, ensuring well-documented code, consistent code style, and inline comments.

- **Testing:**  
  Implement unit and integration tests, especially for the critical areas like authentication and friend management endpoints.

---

## 6. Architecture & File Structure

Below is the proposed minimal file structure that organizes the code by concern while keeping the overall design lean:

friendaiserver/
├── README.md
├── package.json
├── tsconfig.json
├── svelte.config.js
├── tailwind.config.ts
├── vite.config.ts
├── drizzle.config.ts          // Drizzle ORM configuration
├── wrangler.jsonc             // Cloudflare deployment configuration
├── static/
│   └── favicon.png
├── instructions/
│   └── instructions.md        // Project overview & setup instructions
└── src/
    ├── app.html
    ├── app.css
    ├── lib/
    |   ├── server/
    |   |   ├── db/
    │   |   |    ├── index.ts              // Database connection / ORM file
    │   └── worker.ts          // (Optional) Graphile Worker setup
    └── routes/
        ├── +layout.svelte     // Global layout (header, footer, etc.)
        ├── +page.svelte       // Landing page
        └── api/
            ├── auth/
            │   ├── register/+server.ts    // POST: Register a new user
            │   └── login/+server.ts       // POST: Authenticate an existing user
            ├── friend/
            │   ├── index/+server.ts       // GET: List friends, POST: Add friend
            │   └── [id]/+server.ts        // GET: Retrieve, PUT: Update, DELETE: Remove friend by id
            ├── profile/
            │   └── +server.ts             // PUT: Update user profile
            └── recommendations/
                └── +server.ts             // GET: List recommendations, POST: Create a new recommendation


**Explanation of Key Files:**

- **Global Configuration Files:**  
  These include files such as `package.json`, `tsconfig.json`, `svelte.config.js`, etc., which are necessary for building, testing, and deploying the project.

- **Static Assets & Documentation:**  
  - The `static/` directory contains publicly accessible assets (e.g., the favicon).  
  - The `instructions/` directory holds additional guidance and setup instructions.

- **Source Code (`src/`):**  
  - `app.html` and `app.css` define the main structure and styling for the application.
  - `lib/` contains shared functionality (e.g., the database connection via Drizzle ORM and an optional Graphile Worker setup).
  - `routes/` is split into UI components (global layout and landing page) and clearly organized API endpoints:
    - **Auth:** Contains separate endpoints for registration (`register/+server.ts`) and authentication (`login/+server.ts`).
    - **Friend:**  
      - The `index/+server.ts` file handles list creation (`GET`) and friend addition (`POST`).
      - The `[id]/+server.ts` file facilitates retrieval, updating, or deletion of individual friend records.
    - **Profile & Recommendations:** Each has a dedicated endpoint to separate their specific logic.

---

## 7. Copy and Messaging

### UI & API Response Copy

- **Registration:**  
  - **Success:** `"Registration successful. Welcome aboard!"`
  - **Failure:** Return appropriate JSON error detailing missing or invalid fields.

- **Login:**  
  - **Success:** `"Login successful. Redirecting…"`
  - **Failure:** `"Invalid credentials. Please try again."`

- **Friend Operations:**  
  - Add friend: `"Friend added successfully."`
  - Update friend: `"Friend updated successfully."`
  - Delete friend: `"Friend removed successfully."`

- **Profile Updates:**  
  - `"Your profile has been updated successfully."`

- **Recommendations:**  
  - **GET:** `"Loading recommendations…"`
  - **POST:** `"Recommendation submitted. Thank you for your input."`

### Error Handling

- Use a consistent JSON error response format:
  
  ```json
  {
    "error": "Detailed error message explaining the issue."
  }
  ```

- All endpoints should return clear messages for validation failures, missing fields, or unauthorized actions.

---

## 8. Developer Guidelines

- **Modular Structure:**  
  Despite the minimal file count, each API endpoint should encapsulate its own logic to improve clarity, testing, and future enhancements.

- **Documentation:**  
  Document functions within the API endpoints with inline comments describing:
  - Purpose
  - Expected inputs and outputs
  - Error conditions

- **Consistency:**  
  Maintain a consistent coding style and follow the file structure as a guideline. Additional endpoints should extend this structure in a modular way.

- **Security:**  
  Implement proper authentication middleware for protected endpoints. Use secure practices for password hashing and more sensitive operations.

- **Version Control:**  
  Use branch-based development for each major feature (authentication, friend management, etc.) with thorough reviews before merging into the main branch.


