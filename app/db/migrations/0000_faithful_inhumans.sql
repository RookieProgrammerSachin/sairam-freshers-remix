DO $$ BEGIN
 CREATE TYPE "public"."role" AS ENUM('ROLE_ADMIN', 'ROLE_STUDENT');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"register" varchar NOT NULL,
	"password" varchar NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar NOT NULL,
	"mobile" varchar NOT NULL,
	"role" "role" NOT NULL,
	CONSTRAINT "users_register_unique" UNIQUE("register"),
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_mobile_unique" UNIQUE("mobile")
);
