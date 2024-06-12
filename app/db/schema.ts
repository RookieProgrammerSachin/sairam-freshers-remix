import { pgEnum, pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", ["ROLE_ADMIN", "ROLE_STUDENT"]);

export const userTable = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  registerNo: varchar("register").notNull().unique(),
  password: varchar("password").notNull(),
  firstName: varchar("firstName", { length: 255 }).notNull(),
  lastName: varchar("lastName", { length: 255 }).notNull(),
  role: roleEnum("role").notNull(),
});
