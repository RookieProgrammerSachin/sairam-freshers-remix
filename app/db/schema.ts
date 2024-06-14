import { relations } from "drizzle-orm";
import {
  boolean,
  date,
  pgEnum,
  pgTable,
  smallserial,
  timestamp,
  uuid,
  varchar,
  text,
  integer,
} from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", ["ROLE_ADMIN", "ROLE_STUDENT"]);
export const addressTypeEnum = pgEnum("address_type", ["current", "permanent"]);
export const parentTypeEnum = pgEnum("parent_type", [
  "father",
  "mother",
  "guardian",
]);

export const userTable = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  applicationNo: varchar("register").notNull().unique(),
  password: varchar("password").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  emailId: varchar("email").notNull(),
  mobile: varchar("mobile").notNull(),
  role: roleEnum("role").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdateFn(() => new Date()),
});

export const personalDetailsTable = pgTable("personal_details", {
  id: smallserial("id").primaryKey(),
  userId: uuid("user_id")
    .references(() => userTable.id, {
      onUpdate: "cascade",
    })
    .notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  dateOfBirth: date("date_of_birth").notNull(),
  motherTongue: varchar("mother_tongue", { length: 255 }), // I've explicitly ignored using notNull() method to see what could break if not set
  bloodGroup: varchar("blood_group", { length: 10 }),
  nationality: varchar("nationality", { length: 255 }).notNull(),
  religion: varchar("religion", { length: 255 }),
  community: varchar("community", { length: 255 }),
  hostelRequired: boolean("hostel_required").notNull(),
});

/** Per person 2 addresses, one temporary, another permanent.. hence insert twice per user */
export const addressTable = pgTable("address", {
  id: smallserial("id").primaryKey(),
  userId: uuid("user_id")
    .references(() => userTable.id, {
      onUpdate: "cascade",
    })
    .notNull(),
  type: addressTypeEnum("address_type").notNull(), // 'residential' or 'permanent'
  addressLine1: text("address_line_1").notNull(),
  addressLine2: text("address_line_2"),
  city: varchar("city", { length: 255 }).notNull(),
  pincode: varchar("pincode", { length: 255 }).notNull(),
  state: varchar("state", { length: 255 }).notNull(),
  country: varchar("country", { length: 255 }).notNull(),
  phoneNo: varchar("phone_no", { length: 255 }),
  mobileNumber: varchar("mobile_number", { length: 255 }).notNull(),
  emailId: varchar("email_id", { length: 255 }).notNull(),
});

export const educationTable = pgTable("education", {
  id: smallserial("id").primaryKey(),
  userId: uuid("user_id")
    .references(() => userTable.id, {
      onUpdate: "cascade",
    })
    .notNull(),
  appliedDegree: varchar("applied_degree", { length: 255 }).notNull(),
  lastQualifying: varchar("last_qualifying", { length: 255 }).notNull(),
  schoolBranch: varchar("branch", { length: 255 }).notNull(),
  schoolName: varchar("school_name", { length: 255 }).notNull(),
  boardName: varchar("board_name", { length: 255 }).notNull(),
  langMedium: varchar("medium", { length: 255 }).notNull(),
  regNo: varchar("reg_no", { length: 255 }).notNull(),
  gradePercentage: varchar("grade_percentage", { length: 255 }).notNull(),
  dateOfPassing: varchar("date_of_passing", { length: 255 }).notNull(),
  schoolAddress: varchar("school_address_area", { length: 255 }).notNull(),
  schoolCity: varchar("school_address_city", { length: 255 }).notNull(),
  schoolPincode: varchar("school_address_pincode", {
    length: 255,
  }).notNull(),
});

export const familyDetailsTable = pgTable("family", {
  id: smallserial("id").primaryKey(),
  userId: uuid("user_id")
    .references(() => userTable.id, {
      onUpdate: "cascade",
    })
    .notNull(),
  noOfBrothers: integer("no_of_brothers").notNull(),
  noOfSisters: integer("no_of_sisters").notNull(),
  siblingStudyingCount: integer("brother_sister_studying_sairam").notNull(),
  siblingStudyingDetails: text("studying_details"),
});

/** Similar to ```addressTable``` need to create one pair of entry for each user with alternating parent type */
export const parentDetailsTable = pgTable("parents", {
  id: smallserial("id").primaryKey(),
  userId: uuid("user_id")
    .references(() => userTable.id, {
      onUpdate: "cascade",
    })
    .notNull(),
  parentType: parentTypeEnum("parent_type").notNull(),
  parentName: varchar("parent_name", { length: 255 }).notNull(),
  parentQualification: varchar("parent_qualification", {
    length: 255,
  }).notNull(),
  parentOccupation: varchar("parent_occupation", { length: 255 }).notNull(),
  parentOrganization: varchar("parent_organization", { length: 255 }),
  parentDesignation: varchar("parent_designation", { length: 255 }),
  parentEmpId: varchar("parent_emp_id", { length: 255 }),
  parentMobileNo: varchar("parent_mobile_no", { length: 255 }).notNull(),
  parentEmailId: varchar("parent_email_id", { length: 255 }),
  parentAnnualIncome: varchar("parent_annual_income", {
    length: 255,
  }).notNull(),
  parentAddress: varchar("parent_address", { length: 255 }).notNull(),
  parentCity: varchar("parent_city", { length: 255 }).notNull(),
  parentState: varchar("parent_state", { length: 255 }).notNull(),
  parentPincode: varchar("parent_pincode", { length: 255 }).notNull(),
  parentPhoneNo: varchar("parent_phone_no", { length: 255 }),
});

/** Im not even sure if I need these types anywhere, let's see anyway */
export type personalDetailsType = typeof personalDetailsTable.$inferSelect;
export type EducationType = typeof educationTable.$inferSelect;
export type AddressType = typeof addressTable.$inferSelect;
export type FamilyDetailsType = typeof familyDetailsTable.$inferSelect;

/** RELATIONS FOR TABLES
 * ``only`` used if I use db.query.<tableName>. so on
 * Not necessary to mention if i use sql style db.select().from(<tableName>), which i am probably gonna do
 * hence, stop with these relations for now, maybe add later?
 */
export const userTableRelations = relations(userTable, ({ many, one }) => ({
  personalDetails: one(personalDetailsTable),
  educationDetails: one(educationTable),
  addressDetails: many(addressTable),
}));

export const personalDetailsTableRelations = relations(
  personalDetailsTable,
  ({ one }) => ({
    userDetails: one(userTable, {
      fields: [personalDetailsTable.userId],
      references: [userTable.id],
    }),
  }),
);
