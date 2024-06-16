ALTER TABLE "declaration" ADD CONSTRAINT "declaration_user_id_unique" UNIQUE("user_id");--> statement-breakpoint
ALTER TABLE "education" ADD CONSTRAINT "education_user_id_unique" UNIQUE("user_id");--> statement-breakpoint
ALTER TABLE "family" ADD CONSTRAINT "family_user_id_unique" UNIQUE("user_id");--> statement-breakpoint
ALTER TABLE "personal_details" ADD CONSTRAINT "personal_details_user_id_unique" UNIQUE("user_id");