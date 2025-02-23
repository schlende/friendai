CREATE TYPE "public"."priority" AS ENUM('low', 'med', 'high');--> statement-breakpoint
CREATE TYPE "public"."recommendation_reason" AS ENUM('longtimenosee', 'firstcontact', 'strengthenties');--> statement-breakpoint
CREATE TYPE "public"."recommendation_status" AS ENUM('new', 'used', 'dismissed');--> statement-breakpoint
CREATE TABLE "daily_recommended" (
	"id" integer PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"friend_id" integer NOT NULL,
	"reason" "recommendation_reason" NOT NULL,
	"datetime" timestamp DEFAULT now() NOT NULL,
	"action_date" timestamp,
	"status" "recommendation_status" DEFAULT 'new' NOT NULL,
	"recommendations" json NOT NULL
);
--> statement-breakpoint
CREATE TABLE "friends" (
	"id" integer PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"birthday" timestamp,
	"interests" text,
	"last_recommended" timestamp,
	"priority" "priority" DEFAULT 'med' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" varchar(50) NOT NULL,
	"full_name" varchar(100) NOT NULL,
	"interests" text,
	"address" varchar(255),
	"city" varchar(100),
	"country" varchar(100),
	"password" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "daily_recommended" ADD CONSTRAINT "daily_recommended_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "daily_recommended" ADD CONSTRAINT "daily_recommended_friend_id_friends_id_fk" FOREIGN KEY ("friend_id") REFERENCES "public"."friends"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "friends" ADD CONSTRAINT "friends_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;