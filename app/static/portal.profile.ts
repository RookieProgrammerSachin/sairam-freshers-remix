export const COMMUNITIES = ["OC", "BC", "BCM", "MBC", "SC", "ST", "SCA"];

export const INDIAN_STATES = [
  { id: 1, state: "Andhra Pradesh" },
  { id: 2, state: "Arunachal Pradesh" },
  { id: 3, state: "Assam" },
  { id: 4, state: "Bihar" },
  { id: 5, state: "Chhattisgarh" },
  { id: 6, state: "Delhi" },
  { id: 7, state: "Goa" },
  { id: 8, state: "Gujarat" },
  { id: 9, state: "Haryana" },
  { id: 10, state: "Himachal Pradesh" },
  { id: 11, state: "Jammu & Kashmir" },
  { id: 12, state: "Jharkhand" },
  { id: 13, state: "Karnataka" },
  { id: 14, state: "Kerala" },
  { id: 15, state: "Maharashtra" },
  { id: 16, state: "Madhya Pradesh" },
  { id: 17, state: "Manipur" },
  { id: 18, state: "Meghalaya" },
  { id: 19, state: "Mizoram" },
  { id: 20, state: "Nagaland" },
  { id: 21, state: "Odisha" },
  { id: 22, state: "Punjab" },
  { id: 23, state: "Rajasthan" },
  { id: 24, state: "Sikkim" },
  { id: 25, state: "Tamil Nadu" },
  { id: 26, state: "Tripura" },
  { id: 27, state: "Telangana" },
  { id: 28, state: "Uttar Pradesh" },
  { id: 29, state: "Uttarakhand" },
  { id: 30, state: "West Bengal" },
  { id: 31, state: "Andaman & Nicobar (UT)" },
  { id: 32, state: "Chandigarh (UT)" },
  { id: 33, state: "Dadra & Nagar Haveli (UT)" },
  { id: 34, state: "Daman & Diu (UT)" },
  { id: 35, state: "Lakshadweep (UT)" },
  { id: 36, state: "Puducherry (UT)" },
];

export const DB_TO_FORM_MAP = {
  bloodGroup: "bloodGroup",
  community: "community",
  dateOfBirth: "dob",
  hostelRequired: "hostelRequired",
  motherTongue: "motherTongue",
  name: "name",
  nationality: "nationality",
  religion: "religion",
  appliedDegree: "appliedDegree",
  lastQualifying: "lastQualifying",
  schoolBranch: "schoolBranch",
  schoolName: "schoolName",
  boardName: "boardName",
  langMedium: "langMedium",
  regNo: "regNo",
  gradePercentage: "gradePercentage",
  dateOfPassing: "dateOfPassing",
  schoolAddress: "schoolAddress",
  schoolCity: "schoolCity",
  schoolPincode: "schoolPincode",
  noOfBrothers: "noOfBrothers",
  noOfSisters: "noOfSisters",
  siblingStudyingCount: "siblingStudyingCount",
  siblingStudyingDetails: "siblingStudyingDetails",
  currentAddressLine1: "currentAddress",
  currentAddressLine2: "currentArea",
  currentCity: "currentCity",
  currentPincode: "currentPincode",
  currentState: "currentState",
  currentCountry: "currentCountry",
  currentPhoneNo: "currentLandLine",
  currentMobileNumber: "currentMobile",
  currentEmailId: "currentEmail",
  permanentAddressLine1: "permanentAddress",
  permanentAddressLine2: "permanentArea",
  permanentCity: "permanentCity",
  permanentPincode: "permanentPincode",
  permanentState: "permanentState",
  permanentCountry: "permanentCountry",
  permanentPhoneNo: "permanentLandLine",
  permanentMobileNumber: "permanentMobile",
  permanentEmailId: "permanentEmail",
  fatherParentName: "fatherName",
  fatherParentQualification: "fatherQualification",
  fatherParentOccupation: "fatherOccupation",
  fatherParentOrganization: "fatherOrganization",
  fatherParentDesignation: "fatherDesignation",
  fatherParentEmpId: "fatherEmpId",
  fatherParentMobileNo: "fatherMobile",
  fatherParentEmailId: "fatherEmail",
  fatherParentAnnualIncome: "fatherAnnualIncome",
  fatherParentAddress: "fatherAddress",
  fatherParentCity: "fatherCityName",
  fatherParentState: "fatherState",
  fatherParentPincode: "fatherPincode",
  fatherParentPhoneNo: "fatherPhoneNo",
  motherParentName: "motherName",
  motherParentQualification: "motherQualification",
  motherParentOccupation: "motherOccupation",
  motherParentOrganization: "motherOrganization",
  motherParentDesignation: "motherDesignation",
  motherParentEmpId: "motherEmpId",
  motherParentMobileNo: "motherMobile",
  motherParentEmailId: "motherEmail",
  motherParentAnnualIncome: "motherAnnualIncome",
  motherParentAddress: "motherAddress",
  motherParentCity: "motherCityName",
  motherParentState: "motherState",
  motherParentPincode: "motherPincode",
  motherParentPhoneNo: "motherPhoneNo",
  place: "place",
  candidateSignature: "candidateSignature",
  parentSignature: "parentSignature",
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
  fatherType: string;
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
