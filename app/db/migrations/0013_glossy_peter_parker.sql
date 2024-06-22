CREATE TABLE IF NOT EXISTS "edit_permission" (
	"id" "smallserial" PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"can_edit" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp,
	CONSTRAINT "edit_permission_id_unique" UNIQUE("id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "edit_permission" ADD CONSTRAINT "edit_permission_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
