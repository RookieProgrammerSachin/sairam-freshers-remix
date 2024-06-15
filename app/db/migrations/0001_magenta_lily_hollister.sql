CREATE TABLE IF NOT EXISTS "declaration" (
	"id" "smallserial" PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"place" varchar NOT NULL,
	"date" timestamp DEFAULT now(),
	"parent_signature" text NOT NULL,
	"candidate_signature" text NOT NULL,
	CONSTRAINT "declaration_id_unique" UNIQUE("id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "declaration" ADD CONSTRAINT "declaration_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
