import { relations } from 'drizzle-orm';
import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  integer,
  pgEnum,
  json,
  serial
} from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  username: varchar('username', { length: 50 }).unique().notNull(),
  fullName: varchar('full_name', { length: 100 }).notNull(),
  interests: text('interests'),
  address: varchar('address', { length: 255 }),
  city: varchar('city', { length: 100 }),
  country: varchar('country', { length: 100 }),
  // Adding password field for authentication (not in PRD schema but needed)
  password: varchar('password', { length: 255 }).notNull(),
  // Adding email field for authentication (not in PRD schema but needed)
  email: varchar('email', { length: 255 }).unique().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull()
});

// Create priority enum for friends table
export const priorityEnum = pgEnum('priority', ['low', 'med', 'high']);

export const friends = pgTable('friends', {
  id: serial('id').primaryKey(),
  userId: uuid('user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  name: varchar('name', { length: 100 }).notNull(),
  howwemet: text(),
  birthday: timestamp('birthday'),
  interests: text('interests'),
  lastRecommended: timestamp('last_recommended'),
  priority: priorityEnum('priority').default('med').notNull()
});

// Create enum for recommendation reason
export const recommendationReasonEnum = pgEnum('recommendation_reason', [
  'longtimenosee',
  'firstcontact',
  'strengthenties'
]);

// Create enum for recommendation status
export const recommendationStatusEnum = pgEnum('recommendation_status', [
  'new',
  'used',
  'dismissed'
]);

export const dailyRecommended = pgTable('daily_recommended', {
  id: serial('id').primaryKey(),
  userId: uuid('user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  friendId: integer('friend_id')
    .references(() => friends.id, { onDelete: 'cascade' })
    .notNull(),
  reason: recommendationReasonEnum('reason').notNull(),
  datetime: timestamp('datetime').defaultNow().notNull(),
  actionDate: timestamp('action_date'),
  status: recommendationStatusEnum('status').default('new').notNull(),
  recommendations: json('recommendations').notNull() // Array of recommended ideas with duration classifications
});

// Then define the relations
export const friendsRelations = relations(friends, ({ many }) => ({
  recommendations: many(dailyRecommended)
}));

export const dailyRecommendationsRelations = relations(dailyRecommended, ({ one }) => ({
  friend: one(friends, {
    fields: [dailyRecommended.friendId],
    references: [friends.id],
  })
}));

// Export type for TypeScript usage
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Friend = typeof friends.$inferSelect;
export type NewFriend = typeof friends.$inferInsert;
export type DailyRecommended = typeof dailyRecommended.$inferSelect;
export type NewDailyRecommended = typeof dailyRecommended.$inferInsert;
