# Project Overview

Positioning ~ friendship personal assistant

You are building a friendship personal assistant mobile app that helps maintain and improve personal relationships.
This is the backend codebase.

You will be using: 
- SvelteKit with Svelte 5
- Tailwind 4 for the visual styling
- Shadcn-svelte for the UI kit
- Typescript
- lucide-svelte for icons
- drizzle orm as the query builder for the postgres database
- Graphile worker as the job runner - https://worker.graphile.org
- Postgres as the backend database
- Cloudflare as the deployment host

# Core functionalities

## A postgres database with the following tables
1. users table
    1. id field - primary key, uuid type
    2. username - unique, no spaces
    2. User's full name
    3. Users interests - free form text
    4. Users location
        - Address
        - City
        - Country

2. friends table
    1. id field - primary key, sequential
    2. user_id - foreign key that points to users table
    3. birthday - datetime field
    4. interests - text
    5. lastrecommended - datetime - the last time we made a recommendation about this person
    6. priority - enum (low,med,high)

3. recommendations table
    1. id field - primary key, sequential
    2. user_id - foreign key that shows who the recommendation belongs to
    3. friend_id - foreign key that shows which friend the recommendation is for
    4. type - recommendation type (activity, gift, message)
    5. datetime - date and time of the recommendation
    6. actiondate - date and time that the action was taken
    7. status - enum new, used, dismissed

## APIs (JSON)
1. Registration api
    - takes in username and password
    - creates a new user in the database
2. Authentication api 
    - takes in a username and password
    - sets a cookie in the users browser in the format - {userid: value, username: value}
3. User Recommended actions API
    - returns a list of recommendations for logged in user (user who has current cookie)
    - defaults to recommendations from the past 2 days
    - can return recommendations from earlier with optional start date parameter
4. View friend API
    - returns friend record as JSON
    - includes all recommendations made to friend
5. New friend API
    - takes in JSON for a new friend record
    - creates a new friend record connected to current signed in user (user with current cookie)
6. Update friend API
    - takes a friend id
    - takes in JSON for all fields in the friends table
7. Delete friend API
    - takes in friend id
    - deletes friend with friend id provided that friend's user_id matches cookie value of current user id
8. Update profile API - updates users' profile
    - uses the id from the cookie
    - takes in JSON for all fields in users table
    - updates database with JSON values

## Database connection

1. We will connect to the database using drizzle ORM - https://orm.drizzle.team

## Landing Page
1. A navbar
    1. Product name: Friend AI
    2. CTA: Download app

1. A header section
    1. Positioning: Friendship Personal Assistant
    2. Headline: Build And Strengthen your Relationships
    3. Subheadline: Our AI agent turns new acquaintances into life-long friends by helping you set up chances to get together
    and do nice things for eachother...
    4. CTA: Sign Up Now

2. A stakes section
    1. It's hard to make new friends as an adult and friends are one of the joys of life. If your life is busy you're missing out on turning those chance encounters into rewarding relationships.

3. Value proposition section
    1. Turn new acquaintances into friends
        1. Our AI uses "relationship science" to pick the perfect time and place for follow-up meetings with a new acquaintance
        2. We use social network information and event calendars in your area to make "smart suggestions" for activities you'll both enjoy
    2. Strengthen existing relationships
        1. We suggest friends with similar interests to participate in activites they'd be interested in (that you're already going to)
        2. Never miss a birthday + send relationship-strengthing gifts
        3. Know exactly who to connect with when you're traveling... all on autopilot
    3. Maintain important long-term relationships
        1. Schedule occasional check-ins
        2. Monitor life-events
        3. Send birthday cards and gifts via Uber?
    4. Focus on building relationships with the people who matter most
        1. Our "inner circle" system helps you focus on the relationships you want the most

4. A guide section
    1. Our team is a bunch of expats that moved to Kaohsuing, and when you move you have to make new friends. We always wanted something that would ease the complex process of getting to know new people and keeping in touch with old friends and that's why we came up with Friend AI.

5. A how to buy plan section
    1. Download the app
    2. Pick people want to turn into closer friend
    3. Friend AI goes to work to build you stronger relationship

6. A pricing section
    1. Plans
        1. Free
        2. Pro connector (10 inner-circle people) - $30 / month
        3. Master connector (unlimited inner-circle people) - $100 / month

7. Footer
    1. About us link
    2. Privacy policy link

# Documentation

```
```

# Current file structure

