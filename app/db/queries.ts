import { and, eq } from "drizzle-orm";
// import crypto from "node:crypto";
import { db } from ".";
import {
  addressTable,
  AddressType,
  declarationTable,
  DeclarationType,
  editPermissionTable,
  EditPermissionType,
  educationTable,
  EducationType,
  eventGuests,
  familyDetailsTable,
  FamilyDetailsType,
  parentDetailsTable,
  ParentDetailsType,
  personalDetailsTable,
  PersonalDetailsType,
  scheduleTable,
  ScheduleType,
  userTable,
} from "./schema";
// import { userData } from ".local/user-data";
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { nanoid } from "nanoid";

/** NOTE: functions with prefix "admin_" must only be used by admin to manipulate data manually and NOT to be exported to be used by
 * server or client or such
 * Also, commenting all such admin_ function because I dont event want to accidentally call and to totally make sure what I am doing with admin_ functions
 */

/** Insert sample user data */
/* async function admin_insertSample() {
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
  */

// /** Insert to DB for states */
/** async function admin_insertStates() {
  const data = await db
    .insert(indianStatesTable)
    .values(INDIAN_STATES.map((state, i) => ({ id: i + 1, state: state })))
    .returning();
  console.log(data);
} */

// /** insert date for user created_at and updated_at */
/** async function admin_setUserDates() {
  const data = await db
    .update(userTable)
    .set({ createdAt: new Date(), updatedAt: new Date() });
  console.log("🚀 ~ admin_setUserDates ~ data:", data);
}
  */

/** Add admin user */
/** async function admin_addAdminUser() {
  await db.insert(userTable).values({
    applicationNo: "someid",
    emailId: "somemail",
    mobile: "99999999",
    name: "name",
    password: crypto.createHash("sha256").update("password").digest("hex"),
    role: "ROLE_ADMIN",
  });
}
  I*/

/** Update all user info to have department and college */
/* async function admin_updateUser() {
  const users = await db.query.userTable.findMany();
  for (let i = 0; i < users.length; i++) {
    console.log("🚀 ~ admin_updateUser ~ appNo:", users[i].applicationNo);
    const currUser = userData.find(
      (user) => String(user.Application_Number) === users[i].applicationNo,
    );
    console.log("🚀 ~ admin_updateUser ~ currUser:", currUser);
    if (!currUser) continue;
    await db
      .update(userTable)
      .set({
        college: currUser?.College_Allocated as typeof collegeEnum.schema,
        department: currUser?.Department_Allocated as typeof deptEnum.schema,
      })
      .where(eq(userTable.applicationNo, String(currUser?.Application_Number)));
  }
  console.log("done");
}
*/

/** Change the "obfuscation" back to normal to have correct functionaly -- change update(noasdfk) to update(user.somekeytogivepwd) */
// const dataToExport = userData.map((user) => ({
//   name: user.Student_Name,
//   password: crypto.createHash("sha256").update("fasdfaf").digest("hex"),
//   applicationNo: String(user.Application_Number),
//   emailId: user.Email_ID,
//   mobile: String(user.Mobile_Number),
//   role: "ROLE_STUDENT" as const,
//   college: user.College_Allocated as unknown as typeof collegeEnum,
//   department: user.Department_Allocated as unknown as typeof deptEnum,
// }));
// console.log("🚀 ~ dataToExport ~ dataToExport:", dataToExport);

/** Function to add all users from JSON */
// async function insertUserData() {
//   await db.insert(userTable).values(dataToExport);
// }

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
  parentSignature: string;
  candidateSignature: string;
  place: string;
  canEdit: boolean;
  hasRequested: boolean;
};
export type EventDetails = Omit<ScheduleType, "id" | "createdBy"> & {
  eventGuest: string;
};
export type DeclarationDetails = Omit<
  DeclarationType,
  "id" | "userId" | "createdAt" | "updatedAt"
>;

/** Query DB to get user data with register no */
export function getUserDataFromRegisterNo(applicationNo: string) {
  const data = db
    .select()
    .from(userTable)
    .where(eq(userTable.applicationNo, applicationNo));
  return data;
}

/** Get all users list */
export async function getAllUsers() {
  return await db.query.userTable.findMany({ orderBy: userTable.name });
}

const slugify = (str: string) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-.]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

export async function uploadImage(imageFile: File) {
  try {
    const firebaseConfig = {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID,
    };

    const app = initializeApp(firebaseConfig);
    const storage = getStorage(app);
    const slugifiedName = slugify(imageFile.name);
    const signatureRef = ref(
      storage,
      `signatures/${slugifiedName}_${nanoid(16)}`,
    );
    await uploadBytes(signatureRef, imageFile, {
      contentType: imageFile.type,
    });
    const downloadURL = await getDownloadURL(signatureRef);
    return downloadURL;
  } catch (error) {
    console.log("🚀 ~ uploadImage ~ error:", error);
    return null;
  }
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
  declarationDetails: DeclarationDetails,
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

    await tx.insert(declarationTable).values({
      candidateSignature: declarationDetails.candidateSignature,
      parentSignature: declarationDetails.parentSignature,
      place: declarationDetails.place,
      userId,
    });

    await tx.insert(editPermissionTable).values({
      userId,
    });
    // */
  });
  return `data`;
}

export async function updateProfileDetails(
  applicationNo: string,
  personalDetails: PersonalDetails,
  educationDetails: EducationDetails,
  currentAddressDetails: CurrentAddressDetails,
  permanentAddressDetails: PermanentAddressDetails,
  familyDetails: FamilyDetails,
  motherDetails: MotherDetails,
  fatherDetails: FatherDetails,
  declarationDetails: DeclarationDetails,
) {
  const user = await db
    .select({ id: userTable.id })
    .from(userTable)
    .where(eq(userTable.applicationNo, applicationNo));
  if (user.length !== 1) return null;

  const userId = user[0].id;

  await db.transaction(async (tx) => {
    await tx
      .update(personalDetailsTable)
      .set({
        ...personalDetails,
      })
      .where(eq(personalDetailsTable.userId, userId));

    await tx
      .update(educationTable)
      .set({
        ...educationDetails,
      })
      .where(eq(educationTable.userId, userId));

    await tx
      .update(addressTable)
      .set({
        ...currentAddressDetails,
      })
      .where(
        and(eq(addressTable.type, "current"), eq(addressTable.userId, userId)),
      );

    await tx
      .update(addressTable)
      .set({
        ...permanentAddressDetails,
      })
      .where(
        and(
          eq(addressTable.type, "permanent"),
          eq(addressTable.userId, userId),
        ),
      );

    await tx
      .update(familyDetailsTable)
      .set({
        ...familyDetails,
      })
      .where(eq(familyDetailsTable.userId, userId));

    await tx
      .update(parentDetailsTable)
      .set({
        ...motherDetails,
      })
      .where(
        and(
          eq(parentDetailsTable.parentType, "mother"),
          eq(parentDetailsTable.userId, userId),
        ),
      );

    await tx
      .update(parentDetailsTable)
      .set({
        ...fatherDetails,
      })
      .where(
        and(
          eq(parentDetailsTable.parentType, "father"),
          eq(parentDetailsTable.userId, userId),
        ),
      );

    await tx
      .update(declarationTable)
      .set({ ...declarationDetails })
      .where(eq(declarationTable.userId, userId));

    await tx
      .update(editPermissionTable)
      .set({ canEdit: false })
      .where(eq(editPermissionTable.userId, userId));
  });

  return "edit";
}

export async function requestEdit(userId: string) {
  if (!userId) throw new Error("No user id found!");
  let permissions: EditPermissionType[];
  permissions = await db
    .select()
    .from(editPermissionTable)
    .where(eq(editPermissionTable.userId, userId));
  if (permissions.length !== 1) {
    permissions = await db
      .insert(editPermissionTable)
      .values({ userId })
      .returning();
  }
  if (permissions[0].canEdit || permissions[0].hasRequested) return false;
  const updatedPermissions = await db
    .update(editPermissionTable)
    .set({ hasRequested: true })
    .where(eq(editPermissionTable.userId, userId))
    .returning();
  return updatedPermissions;
}

export async function processRequestEdit(userId: string, value: boolean) {
  const permissions = await db
    .select()
    .from(editPermissionTable)
    .where(eq(editPermissionTable.userId, userId));

  if (permissions[0].hasRequested && !permissions[0].canEdit) {
    return await db
      .update(editPermissionTable)
      .set({ canEdit: value, hasRequested: false })
      .where(eq(editPermissionTable.userId, userId))
      .returning();
  }
  return false;
}

export async function getAllProfileDetails(
  userId?: string,
  applicationNo?: string,
) {
  let result = {};
  // if (!userId && !applicationNo) return result;
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
    .leftJoin(declarationTable, eq(declarationTable.userId, userTable.id))
    .leftJoin(editPermissionTable, eq(editPermissionTable.userId, userTable.id))
    .where(
      eq(
        applicationNo ? userTable.applicationNo : userTable.id,
        applicationNo ? applicationNo : userId!,
      ),
    );

  if (data.length === 0) {
    return false;
  }

  /** Joins are kind of wild in here, so i wanted them to be flattened af so that i can directly start using it */
  result = {
    ...data[0].users,
    ...data[0].education,
    ...data[0].family,
    ...data[0].personal_details,
    ...data[0].declaration,
    ...data[0].edit_permission,
    name: data[0].users.name,
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

  // @ts-expect-error profile details big error
  Object.keys(currentAddressFromData).forEach((key) => {
    const newKey = "current" + key.at(0)?.toUpperCase() + key.slice(1);
    currentAddress[newKey as keyof typeof currentAddressFromData] =
      // @ts-expect-error profile details big error
      currentAddressFromData[key as keyof typeof currentAddressFromData];
  });

  // @ts-expect-error profile details big error
  Object.keys(permanentAddressFromData).forEach((key) => {
    permanentAddress[
      ("permanent" +
        key.at(0)?.toUpperCase() +
        key.slice(1)) as keyof typeof permanentAddressFromData
      // @ts-expect-error profile details big error
    ] = permanentAddressFromData[key as keyof typeof permanentAddressFromData];
  });

  // @ts-expect-error profile details big error
  Object.keys(fatherDetailsFromData).forEach((key) => {
    fatherDetails[
      ("father" +
        key.at(0)?.toUpperCase() +
        key.slice(1)) as keyof typeof fatherDetailsFromData
      // @ts-expect-error profile details big error
    ] = fatherDetailsFromData[key as keyof typeof fatherDetailsFromData];
  });

  // @ts-expect-error profile details big error
  Object.keys(motherDetailsFromData).forEach((key) => {
    motherDetails[
      ("mother" +
        key.at(0)?.toUpperCase() +
        key.slice(1)) as keyof typeof motherDetailsFromData
      // @ts-expect-error profile details big error
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

export async function createEvent(userId: string, eventData: EventDetails) {
  const schedule = await db
    .insert(scheduleTable)
    .values({
      createdBy: userId,
      eventName: eventData.eventName,
      eventConductor: eventData.eventConductor,
      eventConductorContact: eventData.eventConductorContact,
      eventCoordinator:
        eventData.eventCoordinator === "" ? null : eventData.eventCoordinator,
      eventCoordinatorContact:
        eventData.eventCoordinatorContact === ""
          ? null
          : eventData.eventCoordinatorContact,
      eventDept: eventData.eventDept,
      eventDescription: eventData.eventDescription,
      eventFeedbackLink:
        eventData.eventFeedbackLink === "" ? null : eventData.eventFeedbackLink,
      eventLink: eventData.eventLink === "" ? null : eventData.eventLink,
      eventTiming: eventData.eventTiming === "" ? null : eventData.eventTiming,
    })
    .returning();
  const guests = eventData.eventGuest;
  if (guests.trim() !== "")
    await db.insert(eventGuests).values(
      guests.split(",").map((guest) => ({
        guestName: guest,
        eventId: schedule[0].id,
      })),
    );
  return "data";
}

export async function getAllEvents() {
  const data = await db
    .select()
    .from(scheduleTable)
    .fullJoin(eventGuests, eq(eventGuests.eventId, scheduleTable.id))
    .orderBy(scheduleTable.createdAt); // changed from rightJoin or innerJoin to  fullJoin, cus whichever schedule table did not have any guests, were neglected

  const allScheduleIds: number[] = [];
  data.forEach((record) => {
    if (!allScheduleIds.includes(record.schedule!.id))
      allScheduleIds.push(record.schedule!.id);
  });

  const allEventGuests = data.map((record) => record.event_guests);
  const response = allScheduleIds.map((id) => {
    const currentSchedule = data.find((d) => d.schedule!.id === id)?.schedule;
    const currentScheduleGuests = allEventGuests.filter(
      (guests) => guests?.eventId === id,
    );
    if (currentSchedule) {
      return {
        ...currentSchedule,
        eventGuests: currentScheduleGuests,
      };
    }
  });
  return response.reverse();
}

export async function getEventById(scheduleId: number) {
  const data = await db
    .select()
    .from(scheduleTable)
    .where(eq(scheduleTable.id, scheduleId))
    .fullJoin(eventGuests, eq(eventGuests.eventId, scheduleTable.id));
  const response = {
    ...data[0].schedule,
    eventGuest: data.map((d) => d.event_guests),
  };
  return response;
}

export async function deleteEventById(scheduleId: number) {
  await db.delete(scheduleTable).where(eq(scheduleTable.id, scheduleId));
  return true;
}

export async function updateEvent(eventId: number, eventData: EventDetails) {
  const data = await db
    .update(scheduleTable)
    .set({
      eventName: eventData.eventName,
      eventConductor: eventData.eventConductor,
      eventConductorContact: eventData.eventConductorContact,
      eventCoordinator:
        eventData.eventCoordinator === "" ? null : eventData.eventCoordinator,
      eventCoordinatorContact:
        eventData.eventCoordinatorContact === ""
          ? null
          : eventData.eventCoordinatorContact,
      eventDept: eventData.eventDept,
      eventDescription: eventData.eventDescription,
      eventFeedbackLink:
        eventData.eventFeedbackLink === "" ? null : eventData.eventFeedbackLink,
      eventLink: eventData.eventLink === "" ? null : eventData.eventLink,
      eventTiming: eventData.eventTiming === "" ? null : eventData.eventTiming,
    })
    .where(eq(scheduleTable.id, eventId))
    .returning();
  const guests = eventData.eventGuest;
  if (guests.trim() !== "") {
    await db.delete(eventGuests).where(eq(eventGuests.eventId, data[0].id));
    await db.insert(eventGuests).values(
      guests.split(",").map((guest) => ({
        guestName: guest,
        eventId: data[0].id,
      })),
    );
  }
  return data;
}
