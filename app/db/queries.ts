import { db } from ".";
import { userTable } from "./schema";

async function insertSample() {
  const data = await db
    .insert(userTable)
    .values({
      firstName: "2sachin",
      lastName: "Bruh",
      password: "TF?",
      registerNo: "102349",
      role: "ROLE_STUDENT",
    })
    .returning();
  console.log("🚀 ~ data ~ data:", data);
}

await insertSample();
