import { pgEnum, pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", ["ROLE_ADMIN", "ROLE_STUDENT"]);

export const userTable = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  applicationNo: varchar("register").notNull().unique(),
  password: varchar("password").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  emailId: varchar("email").notNull(),
  mobile: varchar("mobile").notNull(),
  role: roleEnum("role").notNull(),
});
