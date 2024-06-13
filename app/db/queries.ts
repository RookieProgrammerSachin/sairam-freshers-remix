import { eq, sql } from "drizzle-orm";
import { db } from ".";
import { userTable } from "./schema";
import crypto from "node:crypto";

async function insertSample() {
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

export async function getUserDataFromRegisterNo(applicationNo: string) {
  const data = db
    .select()
    .from(userTable)
    .where(eq(userTable.applicationNo, applicationNo));
  return data;
}

const user = await getUserDataFromRegisterNo("20230151385");
const pwd =
  user[0].password ===
  crypto.createHash("sha256").update("24/09/2005").digest("hex");

console.log("🚀 ~ pwd:", pwd);
