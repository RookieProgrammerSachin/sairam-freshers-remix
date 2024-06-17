CREATE TABLE IF NOT EXISTS "event_guests" (
	"id" "smallserial" PRIMARY KEY NOT NULL,
	"event_id" smallint NOT NULL,
	"guest_name" text,
	CONSTRAINT "event_guests_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "schedule" (
	"id" "smallserial" PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"event_name" text NOT NULL,
	"event_time" timestamp,
	"event_link" text,
	"event_feedback_link" text,
	"event_dept" text,
	"event_description" text,
	"event_conductor" text,
	"event_conductor_contact" text,
	"event_coordinator" text,
	"event_coordinator_contact" text,
	"event_requirements" text,
	CONSTRAINT "schedule_id_unique" UNIQUE("id"),
	CONSTRAINT "schedule_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "event_guests" ADD CONSTRAINT "event_guests_event_id_schedule_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."schedule"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "schedule" ADD CONSTRAINT "schedule_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
