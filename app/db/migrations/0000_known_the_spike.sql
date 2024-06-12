DO $$ BEGIN
 CREATE TYPE "public"."role" AS ENUM('ROLE_ADMIN', 'ROLE_STUDENT');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"register" varchar NOT NULL,
	"password" varchar NOT NULL,
	"firstName" varchar(255) NOT NULL,
	"lastName" varchar(255) NOT NULL,
	"role" "role" NOT NULL,
	CONSTRAINT "users_register_unique" UNIQUE("register")
);
