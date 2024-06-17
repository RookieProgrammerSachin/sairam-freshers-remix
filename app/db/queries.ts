import { eq } from "drizzle-orm";
import crypto from "node:crypto";
import { db } from ".";
import {
  addressTable,
  AddressType,
  educationTable,
  EducationType,
  familyDetailsTable,
  FamilyDetailsType,
  indianStatesTable,
  parentDetailsTable,
  ParentDetailsType,
  personalDetailsTable,
  PersonalDetailsType,
  userTable,
} from "./schema";

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

/** Add admin user */
async function admin_addAdminUser() {
  await db.insert(userTable).values({
    applicationNo: "1",
    emailId: "brindha.it@sairam.edu.in",
    mobile: "8754582225",
    name: "Brindha Devi",
    password: crypto.createHash("sha256").update("freshers@123").digest("hex"),
    role: "ROLE_ADMIN",
  });
}

/** NOTE: following are the actualy queries to be used and are exported from here */

// HELPER TYPES:
export type PersonalDetails = Omit<PersonalDetailsType, "userId" | "id">;
export type EducationDetails = Omit<EducationType, "userId" | "id">;
export type CurrentAddressDetails = Omit<AddressType, "userId" | "id"> & {
  type: "current";
};
export type PermanentAddressDetails = Omit<AddressType, "userId" | "id"> & {
  type: "permanent";
};
export type FamilyDetails = Omit<FamilyDetailsType, "userId" | "id">;
export type MotherDetails = Omit<ParentDetailsType, "userId" | "id"> & {
  parentType: "mother";
};
export type FatherDetails = Omit<ParentDetailsType, "userId" | "id"> & {
  parentType: "father";
};

/** Query DB to get user data with register no */
export function getUserDataFromRegisterNo(applicationNo: string) {
  const data = db
    .select()
    .from(userTable)
    .where(eq(userTable.applicationNo, applicationNo));
  return data;
}

export async function insertProfileDetails(
  applicationNo: string,
  personalDetails: PersonalDetails,
  educationDetails: EducationDetails,
  currentAddressDetails: CurrentAddressDetails,
  permanentAddressDetails: PermanentAddressDetails,
  familyDetails: FamilyDetails,
  motherDetails: MotherDetails,
  fatherDetails: FatherDetails,
) {
  const user = await db
    .select({ id: userTable.id })
    .from(userTable)
    .where(eq(userTable.applicationNo, applicationNo));
  if (user.length !== 1) return null;

  const userId = user[0].id;

  await db.transaction(async (tx) => {
    await tx.insert(personalDetailsTable).values({
      userId,
      ...personalDetails,
    });

    // similarly keep inserting into tables and return finally every table with joint values
    await tx.insert(educationTable).values({
      userId,
      ...educationDetails,
    });

    // /**
    await tx.insert(addressTable).values([
      {
        userId,
        ...currentAddressDetails,
      },
      {
        userId,
        ...permanentAddressDetails,
      },
    ]);

    await tx.insert(familyDetailsTable).values({
      userId,
      ...familyDetails,
    });

    await tx.insert(parentDetailsTable).values([
      {
        userId,
        ...motherDetails,
      },
      {
        userId,
        ...fatherDetails,
      },
    ]);
    // */
  });
  return `data`;
}
export type ProfileDetails = {
  id: string;
  applicationNo: string;
  password: string;
  name: string;
  emailId: string;
  mobile: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  appliedDegree: string;
  lastQualifying: string;
  schoolBranch: string;
  schoolName: string;
  boardName: string;
  langMedium: string;
  regNo: string;
  gradePercentage: string;
  dateOfPassing: string;
  schoolAddress: string;
  schoolCity: string;
  schoolPincode: string;
  noOfBrothers: string;
  noOfSisters: string;
  siblingStudyingCount: string;
  siblingStudyingDetails: string;
  dateOfBirth: string;
  motherTongue: string;
  bloodGroup: string;
  nationality: string;
  religion: string;
  community: string;
  hostelRequired: string;
  currentId: string;
  currentUserId: string;
  currentType: string;
  currentAddressLine1: string;
  currentAddressLine2: string;
  currentCity: string;
  currentPincode: string;
  currentState: string;
  currentCountry: string;
  currentPhoneNo: string;
  currentMobileNumber: string;
  currentEmailId: string;
  permanentId: string;
  permanentUserId: string;
  permanentType: string;
  permanentAddressLine1: string;
  permanentAddressLine2: string;
  permanentCity: string;
  permanentPincode: string;
  permanentState: string;
  permanentCountry: string;
  permanentPhoneNo: string;
  permanentMobileNumber: string;
  permanentEmailId: string;
  fatherId: string;
  fatherUserId: string;
  fatherParentType: string;
  fatherParentName: string;
  fatherParentQualification: string;
  fatherParentOccupation: string;
  fatherParentOrganization: string;
  fatherParentDesignation: string;
  fatherParentEmpId: string;
  fatherParentMobileNo: string;
  fatherParentEmailId: string;
  fatherParentAnnualIncome: string;
  fatherParentAddress: string;
  fatherParentCity: string;
  fatherParentState: string;
  fatherParentPincode: string;
  fatherParentPhoneNo: string;
  motherId: string;
  motherUserId: string;
  motherParentType: string;
  motherParentName: string;
  motherParentQualification: string;
  motherParentOccupation: string;
  motherParentOrganization: string;
  motherParentDesignation: string;
  motherParentEmpId: string;
  motherParentMobileNo: string;
  motherParentEmailId: string;
  motherParentAnnualIncome: string;
  motherParentAddress: string;
  motherParentCity: string;
  motherParentState: string;
  motherParentPincode: string;
  motherParentPhoneNo: string;
};

export async function getAllProfileDetails(userId: string) {
  let result = {};
  const data = await db
    .select()
    .from(userTable)
    .innerJoin(
      personalDetailsTable,
      eq(personalDetailsTable.userId, userTable.id),
    )
    .innerJoin(addressTable, eq(addressTable.userId, userTable.id))
    .innerJoin(educationTable, eq(educationTable.userId, userTable.id))
    .innerJoin(familyDetailsTable, eq(familyDetailsTable.userId, userTable.id))
    .innerJoin(parentDetailsTable, eq(parentDetailsTable.userId, userTable.id))
    .where(eq(userTable.id, userId));

  /** Joins are kind of wild in here, so i wanted them to be flattened af so that i can directly start using it */
  result = {
    ...data[0].users,
    ...data[0].education,
    ...data[0].family,
    ...data[0].personal_details,
  };

  const currentAddress = {};
  const permanentAddress = {};
  const fatherDetails = {};
  const motherDetails = {};

  const currentAddressFromData = data.find(
    (x) => x.address.type === "current",
  )?.address;

  const permanentAddressFromData = data.find(
    (x) => x.address.type === "permanent",
  )?.address;

  const fatherDetailsFromData = data.find(
    (x) => x.parents.parentType === "father",
  )?.parents;
  const motherDetailsFromData = data.find(
    (x) => x.parents.parentType === "mother",
  )?.parents;

  Object.keys(currentAddressFromData).forEach((key) => {
    const newKey = "current" + key.at(0)?.toUpperCase() + key.slice(1);
    currentAddress[newKey as keyof typeof currentAddressFromData] =
      currentAddressFromData[key as keyof typeof currentAddressFromData];
  });

  Object.keys(permanentAddressFromData).forEach((key) => {
    permanentAddress[
      ("permanent" +
        key.at(0)?.toUpperCase() +
        key.slice(1)) as keyof typeof permanentAddressFromData
    ] = permanentAddressFromData[key as keyof typeof permanentAddressFromData];
  });

  Object.keys(fatherDetailsFromData).forEach((key) => {
    fatherDetails[
      ("father" +
        key.at(0)?.toUpperCase() +
        key.slice(1)) as keyof typeof fatherDetailsFromData
    ] = fatherDetailsFromData[key as keyof typeof fatherDetailsFromData];
  });

  Object.keys(motherDetailsFromData).forEach((key) => {
    motherDetails[
      ("mother" +
        key.at(0)?.toUpperCase() +
        key.slice(1)) as keyof typeof motherDetailsFromData
    ] = motherDetailsFromData[key as keyof typeof motherDetailsFromData];
  });

  result = {
    ...result,
    ...currentAddress,
    ...permanentAddress,
    ...fatherDetails,
    ...motherDetails,
  };

  /** Do i really have to go through all this mess? for real? */
  return result as ProfileDetails;
}
