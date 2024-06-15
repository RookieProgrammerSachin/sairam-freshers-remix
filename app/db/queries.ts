import { eq } from "drizzle-orm";
import { db } from ".";
import { indianStatesTable, userTable } from "./schema";

/** NOTE: functions with prefix "admin_" must only be used by admin to manipulate data manually and NOT to be exported to be used by
 * server or client or such
 */

const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu & Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Maharashtra",
  "Madhya Pradesh",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Tripura",
  "Telangana",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman & Nicobar (UT)",
  "Chandigarh (UT)",
  "Dadra & Nagar Haveli (UT)",
  "Daman & Diu (UT)",
  "Lakshadweep (UT)",
  "Puducherry (UT)",
];

/** Insert sample user data */
async function admin_insertSample() {
  const data = await db
    .insert(userTable)
    .values({
      name: "2sachin",
      password: "TF?",
      applicationNo: "102349",
      emailId: "asda2@aFSDASF",
      mobile: "942822342",
      role: "ROLE_STUDENT",
    })
    .returning();
  console.log("🚀 ~ data ~ data:", data);
}

/** Insert to DB for states */
async function admin_insertStates() {
  const data = await db
    .insert(indianStatesTable)
    .values(INDIAN_STATES.map((state) => ({ state })))
    .returning();
  console.log(data);
}

/** insert date for user created_at and updated_at */
async function admin_setUserDates() {
  const data = await db
    .update(userTable)
    .set({ createdAt: new Date(), updatedAt: new Date() });
  console.log("🚀 ~ admin_setUserDates ~ data:", data);
}

/** NOTE: following are the actualy queries to be used and are exported from here */

/** Query DB to get user data with register no */
export function getUserDataFromRegisterNo(applicationNo: string) {
  const data = db
    .select()
    .from(userTable)
    .where(eq(userTable.applicationNo, applicationNo));
  return data;
}
