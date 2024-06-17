DO $$ BEGIN
 CREATE TYPE "public"."college" AS ENUM('SRI SAIRAM INSTITUTE OF TECHNOLOGY', 'SRI SAIRAM ENGINEERING COLLEGE');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."department" AS ENUM('Artificial Intelligence and Data Science', 'Electronics and Communication Engineering', 'Electrical and Electronics Engineering', 'Information Technology', 'Civil Engineering', 'Computer Science and Engineering', 'Electronics and Instrumentation Engineering', 'Integrated Computer Science and Engineering', 'Mechanical and Automation Engineering', 'Mechanical Engineering', 'Computer Science and Business System', 'AIML', 'ANY', 'Computer and Communication Engineering', 'Instrumentation and Control Engineering', 'Cyber Security', 'Internet of Things');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "college" "college";--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "department" "department";