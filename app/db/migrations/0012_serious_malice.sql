ALTER TABLE "schedule" ADD COLUMN "created_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "schedule" ADD COLUMN "updated_at" timestamp;