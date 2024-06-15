DO $$ BEGIN
 CREATE TYPE "public"."address_type" AS ENUM('current', 'permanent');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."parent_type" AS ENUM('father', 'mother', 'guardian');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."role" AS ENUM('ROLE_ADMIN', 'ROLE_STUDENT');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "address" (
	"id" "smallserial" PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"address_type" "address_type" NOT NULL,
	"address_line_1" text NOT NULL,
	"address_line_2" text,
	"city" varchar(255) NOT NULL,
	"pincode" varchar(255) NOT NULL,
	"state_id" "smallserial" NOT NULL,
	"country" varchar(255) NOT NULL,
	"phone_no" varchar(255),
	"mobile_number" varchar(255) NOT NULL,
	"email_id" varchar(255) NOT NULL,
	CONSTRAINT "address_id_unique" UNIQUE("id"),
	CONSTRAINT "address_state_id_unique" UNIQUE("state_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "education" (
	"id" "smallserial" PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"applied_degree" varchar(255) NOT NULL,
	"last_qualifying" varchar(255) NOT NULL,
	"branch" varchar(255) NOT NULL,
	"school_name" varchar(255) NOT NULL,
	"board_name" varchar(255) NOT NULL,
	"medium" varchar(255) NOT NULL,
	"reg_no" varchar(255) NOT NULL,
	"grade_percentage" varchar(255) NOT NULL,
	"date_of_passing" varchar(255) NOT NULL,
	"school_address_area" varchar(255) NOT NULL,
	"school_address_city" varchar(255) NOT NULL,
	"school_address_pincode" varchar(255) NOT NULL,
	CONSTRAINT "education_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "family" (
	"id" "smallserial" PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"no_of_brothers" integer NOT NULL,
	"no_of_sisters" integer NOT NULL,
	"brother_sister_studying_sairam" integer NOT NULL,
	"studying_details" text,
	CONSTRAINT "family_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "states" (
	"id" "smallserial" PRIMARY KEY NOT NULL,
	"state" varchar NOT NULL,
	CONSTRAINT "states_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "parents" (
	"id" "smallserial" PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"parent_type" "parent_type" NOT NULL,
	"parent_name" varchar(255) NOT NULL,
	"parent_qualification" varchar(255) NOT NULL,
	"parent_occupation" varchar(255) NOT NULL,
	"parent_organization" varchar(255),
	"parent_designation" varchar(255),
	"parent_emp_id" varchar(255),
	"parent_mobile_no" varchar(255) NOT NULL,
	"parent_email_id" varchar(255),
	"parent_annual_income" varchar(255) NOT NULL,
	"parent_address" varchar(255) NOT NULL,
	"parent_city" varchar(255) NOT NULL,
	"state_id" "smallserial" NOT NULL,
	"parent_pincode" varchar(255) NOT NULL,
	"parent_phone_no" varchar(255),
	CONSTRAINT "parents_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "personal_details" (
	"id" "smallserial" PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"name" varchar(255) NOT NULL,
	"date_of_birth" date NOT NULL,
	"mother_tongue" varchar(255),
	"blood_group" varchar(10),
	"nationality" varchar(255) NOT NULL,
	"religion" varchar(255),
	"community" varchar(255),
	"hostel_required" boolean NOT NULL,
	CONSTRAINT "personal_details_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"register" varchar NOT NULL,
	"password" varchar NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar NOT NULL,
	"mobile" varchar NOT NULL,
	"role" "role" NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp,
	CONSTRAINT "users_register_unique" UNIQUE("register")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "address" ADD CONSTRAINT "address_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "address" ADD CONSTRAINT "address_state_id_states_id_fk" FOREIGN KEY ("state_id") REFERENCES "public"."states"("id") ON DELETE no action ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "education" ADD CONSTRAINT "education_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "family" ADD CONSTRAINT "family_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "parents" ADD CONSTRAINT "parents_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "parents" ADD CONSTRAINT "parents_state_id_states_id_fk" FOREIGN KEY ("state_id") REFERENCES "public"."states"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "personal_details" ADD CONSTRAINT "personal_details_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
